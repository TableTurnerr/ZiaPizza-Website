"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import type { LocationRecord } from "@/lib/content";

type Props = {
  initial: LocationRecord;
  mode: "create" | "edit";
};

const EMPTY_DEAL = { day: "", name: "", description: "", price: "" };

export default function LocationForm({ initial, mode }: Props) {
  const router = useRouter();
  const [loc, setLoc] = useState<LocationRecord>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  function set<K extends keyof LocationRecord>(k: K, v: LocationRecord[K]) {
    setLoc((prev) => ({ ...prev, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url =
        mode === "create" ? "/api/admin/locations" : `/api/admin/locations/${initial.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loc),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/locations");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete location "${initial.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/locations/${initial.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/locations");
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
          <TextInput value={loc.name} onChange={(v) => set("name", v)} />
        </Field>
        <Field label="Slug">
          <TextInput
            value={loc.slug}
            onChange={(v) => set("slug", v)}
            disabled={mode === "edit"}
          />
        </Field>
      </Row>
      <Row>
        <Field label="Type">
          <select
            value={loc.type}
            onChange={(e) => set("type", e.target.value as LocationRecord["type"])}
            className={inputCls}
          >
            <option value="zia-pizza">Zia Pizza Restaurant</option>
            <option value="zia-pizza-express">Zia Pizza Express</option>
          </select>
        </Field>
        <Field label="City">
          <TextInput value={loc.city} onChange={(v) => set("city", v)} />
        </Field>
      </Row>
      <Row>
        <Field label="Address">
          <TextInput value={loc.address} onChange={(v) => set("address", v)} />
        </Field>
        <Field label="Postcode">
          <TextInput value={loc.postcode} onChange={(v) => set("postcode", v)} />
        </Field>
      </Row>
      <Field label="Postcode prefixes (comma separated — matches these to this location)">
        <TextInput
          value={loc.postcodePrefixes.join(", ")}
          onChange={(v) => set("postcodePrefixes", v.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </Field>
      <Row>
        <Field label="Phone">
          <TextInput value={loc.phone} onChange={(v) => set("phone", v)} />
        </Field>
        <Field label="Email">
          <TextInput value={loc.email} onChange={(v) => set("email", v)} />
        </Field>
      </Row>
      <Row>
        <Field label="Hours (display)">
          <TextInput value={loc.hours} onChange={(v) => set("hours", v)} />
        </Field>
        <Field label="Open time (HH:MM)">
          <TextInput value={loc.openTime} onChange={(v) => set("openTime", v)} />
        </Field>
        <Field label="Close time (HH:MM)">
          <TextInput value={loc.closeTime} onChange={(v) => set("closeTime", v)} />
        </Field>
      </Row>
      <Field label="Description">
        <textarea
          value={loc.description}
          onChange={(e) => set("description", e.target.value)}
          rows={4}
          className={inputCls}
        />
      </Field>
      <ImagePicker value={loc.image} onChange={(v) => set("image", v)} label="Cover image" />

      <Field label="Gallery (one image URL per line)">
        <textarea
          value={loc.gallery.join("\n")}
          onChange={(e) => set("gallery", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          rows={3}
          className={inputCls}
        />
      </Field>
      <Field label="Features (one per line)">
        <textarea
          value={loc.features.join("\n")}
          onChange={(e) => set("features", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          rows={3}
          className={inputCls}
        />
      </Field>

      <Row>
        <Field label="Order URL">
          <TextInput value={loc.orderUrl} onChange={(v) => set("orderUrl", v)} />
        </Field>
        <Field label="Google Map embed URL">
          <TextInput value={loc.mapEmbed} onChange={(v) => set("mapEmbed", v)} />
        </Field>
      </Row>
      <Row>
        <Field label="Instagram URL">
          <TextInput value={loc.instagram} onChange={(v) => set("instagram", v)} />
        </Field>
        <Field label="Facebook URL">
          <TextInput value={loc.facebook} onChange={(v) => set("facebook", v)} />
        </Field>
      </Row>
      <Row>
        <Field label="Just Eat">
          <TextInput value={loc.justEat ?? ""} onChange={(v) => set("justEat", v || undefined)} />
        </Field>
        <Field label="Uber Eats">
          <TextInput value={loc.uberEats ?? ""} onChange={(v) => set("uberEats", v || undefined)} />
        </Field>
        <Field label="Deliveroo">
          <TextInput value={loc.deliveroo ?? ""} onChange={(v) => set("deliveroo", v || undefined)} />
        </Field>
      </Row>

      <div>
        <h3 className="text-h5 italic text-white mb-2">Deals</h3>
        <div className="flex flex-col gap-2">
          {loc.deals.map((d, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-[12px] p-3 grid grid-cols-1 sm:grid-cols-[110px_1fr_1fr_90px_40px] gap-2 items-center">
              <TextInput value={d.day} onChange={(v) => set("deals", loc.deals.map((x, j) => j === i ? { ...x, day: v } : x))} placeholder="Day" />
              <TextInput value={d.name} onChange={(v) => set("deals", loc.deals.map((x, j) => j === i ? { ...x, name: v } : x))} placeholder="Name" />
              <TextInput value={d.description} onChange={(v) => set("deals", loc.deals.map((x, j) => j === i ? { ...x, description: v } : x))} placeholder="Description" />
              <TextInput value={d.price ?? ""} onChange={(v) => set("deals", loc.deals.map((x, j) => j === i ? { ...x, price: v || undefined } : x))} placeholder="Price" />
              <button
                type="button"
                onClick={() => set("deals", loc.deals.filter((_, j) => j !== i))}
                className="text-white/50 hover:text-primary text-h5"
                aria-label="Remove deal"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("deals", [...loc.deals, { ...EMPTY_DEAL }])}
            className="self-start bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-md text-normal4 text-white"
          >
            + Add deal
          </button>
        </div>
      </div>

      {error && <p className="text-primary text-normal3">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          {saving ? "Saving..." : mode === "create" ? "Create" : "Save changes"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={remove}
            disabled={deleting}
            className="bg-transparent border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-lg text-normal3"
          >
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
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 flex-1">
      <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col sm:flex-row gap-4">{children}</div>;
}
