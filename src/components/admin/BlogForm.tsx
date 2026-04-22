"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import type { BlogRecord } from "@/lib/content";

type Props = {
  initial: BlogRecord;
  mode: "create" | "edit";
};

export default function BlogForm({ initial, mode }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<BlogRecord>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  function set<K extends keyof BlogRecord>(k: K, v: BlogRecord[K]) {
    setPost((prev) => ({ ...prev, [k]: v }));
  }

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/admin/preview-markdown", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: post.content }),
        });
        const data = await res.json();
        if (!cancelled) setPreviewHtml(data.html ?? "");
      } catch {
        // ignore
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [post.content]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${initial.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete post "${initial.title}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${initial.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-5">
      <Row>
        <Field label="Title">
          <TextInput value={post.title} onChange={(v) => set("title", v)} />
        </Field>
        <Field label="Slug">
          <TextInput value={post.slug} onChange={(v) => set("slug", v)} disabled={mode === "edit"} />
        </Field>
      </Row>
      <Row>
        <Field label="Date (YYYY-MM-DD)">
          <TextInput value={post.date} onChange={(v) => set("date", v)} />
        </Field>
        <Field label="Author">
          <TextInput value={post.author} onChange={(v) => set("author", v)} />
        </Field>
      </Row>
      <Field label="Excerpt">
        <textarea value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={inputCls} />
      </Field>
      <Field label="Tags (comma separated)">
        <TextInput
          value={post.tags.join(", ")}
          onChange={(v) => set("tags", v.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      </Field>
      <ImagePicker value={post.cover} onChange={(v) => set("cover", v)} label="Cover image" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Field label="Content (Markdown)">
          <textarea
            value={post.content}
            onChange={(e) => set("content", e.target.value)}
            rows={22}
            className={`${inputCls} font-mono text-[13px]`}
            spellCheck={false}
          />
        </Field>
        <div className="flex flex-col gap-1.5 flex-1">
          <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
            Preview
          </span>
          <div
            className="prose-zia bg-white/[0.03] border border-white/10 rounded-lg p-4 overflow-auto max-h-[560px] text-normal3"
            style={{ color: "var(--tt-color-text-gray)" }}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      {error && <p className="text-primary text-normal3">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold px-5 py-2.5 rounded-lg">
          {saving ? "Saving..." : mode === "create" ? "Publish" : "Save changes"}
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

function TextInput({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className={inputCls} />;
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
