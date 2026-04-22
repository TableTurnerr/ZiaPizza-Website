"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import type { ProductRecord, LocationRecord } from "@/lib/content";

type Props = {
  initial: ProductRecord;
  mode: "create" | "edit";
  locations: LocationRecord[];
};

const CATEGORIES: ProductRecord["category"][] = [
  "pizzas",
  "starters",
  "pastas",
  "desserts",
  "drinks",
  "dips",
];

export default function ProductForm({ initial, mode, locations }: Props) {
  const router = useRouter();
  const [p, setP] = useState<ProductRecord>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  function set<K extends keyof ProductRecord>(k: K, v: ProductRecord[K]) {
    setP((prev) => ({ ...prev, [k]: v }));
  }

  function toggleLocation(slug: string) {
    const has = p.locationSlugs.includes(slug);
    set("locationSlugs", has ? p.locationSlugs.filter((s) => s !== slug) : [...p.locationSlugs, slug]);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${initial.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete product "${initial.name}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${initial.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <Row>
        <Field label="Name">
          <TextInput value={p.name} onChange={(v) => set("name", v)} />
        </Field>
        <Field label="Slug">
          <TextInput value={p.slug} onChange={(v) => set("slug", v)} disabled={mode === "edit"} />
        </Field>
      </Row>
      <Row>
        <Field label="Category">
          <select
            value={p.category}
            onChange={(e) => set("category", e.target.value as ProductRecord["category"])}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Price (display)">
          <TextInput value={p.price} onChange={(v) => set("price", v)} placeholder="£8.95" />
        </Field>
      </Row>
      <Field label="Description">
        <textarea
          value={p.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className={inputCls}
        />
      </Field>
      <ImagePicker value={p.image} onChange={(v) => set("image", v)} label="Image" />
      <Field label="Tags (comma separated — e.g. popular, spicy, vegetarian)">
        <TextInput
          value={p.tags.join(", ")}
          onChange={(v) => set("tags", v.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </Field>
      <Field label="Served at">
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => {
            const checked = p.locationSlugs.includes(loc.slug);
            return (
              <label key={loc.slug} className={`cursor-pointer px-3 py-2 rounded-lg border transition-colors ${checked ? "bg-primary/15 border-primary/40 text-white" : "bg-white/5 border-white/10 text-white/70 hover:border-white/25"}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleLocation(loc.slug)} className="hidden" />
                {loc.name}
              </label>
            );
          })}
        </div>
      </Field>

      {error && <p className="text-primary text-normal3">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold px-5 py-2.5 rounded-lg">
          {saving ? "Saving..." : mode === "create" ? "Create" : "Save changes"}
        </button>
        {mode === "edit" && (
          <button type="button" onClick={remove} disabled={deleting} className="bg-transparent border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-lg text-normal3">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

const inputCls = "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary disabled:opacity-60";

function TextInput({ value, onChange, disabled, placeholder }: { value: string; onChange: (v: string) => void; disabled?: boolean; placeholder?: string }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} placeholder={placeholder} className={inputCls} />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 flex-1">
      <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>{label}</span>
      {children}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col sm:flex-row gap-4">{children}</div>;
}
