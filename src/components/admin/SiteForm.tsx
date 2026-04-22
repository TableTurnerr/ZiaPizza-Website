"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImagePicker from "./ImagePicker";
import type { SiteRecord } from "@/lib/content";

export default function SiteForm({ initial }: { initial: SiteRecord }) {
  const router = useRouter();
  const [s, setS] = useState<SiteRecord>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patch<K extends keyof SiteRecord>(k: K, v: Partial<SiteRecord[K]>) {
    setS((prev) => ({ ...prev, [k]: { ...prev[k], ...v } }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-10">
      <Section title="Hero">
        <Row>
          <Field label="Eyebrow">
            <TextInput value={s.hero.eyebrow} onChange={(v) => patch("hero", { eyebrow: v })} />
          </Field>
        </Row>
        <Row>
          <Field label="Headline">
            <TextInput value={s.hero.headline} onChange={(v) => patch("hero", { headline: v })} />
          </Field>
          <Field label="Headline accent">
            <TextInput value={s.hero.headlineAccent} onChange={(v) => patch("hero", { headlineAccent: v })} />
          </Field>
        </Row>
        <Field label="Subtext">
          <textarea value={s.hero.subtext} onChange={(e) => patch("hero", { subtext: e.target.value })} rows={2} className={inputCls} />
        </Field>
        <ImagePicker value={s.hero.image} onChange={(v) => patch("hero", { image: v })} label="Hero image" />
      </Section>

      <Section title="Loyalty">
        <Field label="Heading">
          <TextInput value={s.loyalty.heading} onChange={(v) => patch("loyalty", { heading: v })} />
        </Field>
        <Field label="Body">
          <textarea value={s.loyalty.body} onChange={(e) => patch("loyalty", { body: e.target.value })} rows={3} className={inputCls} />
        </Field>
        <Field label="Perks (one per line)">
          <textarea
            value={s.loyalty.perks.join("\n")}
            onChange={(e) => patch("loyalty", { perks: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })}
            rows={4}
            className={inputCls}
          />
        </Field>
        <Row>
          <Field label="iOS app URL">
            <TextInput value={s.loyalty.appStoreUrl} onChange={(v) => patch("loyalty", { appStoreUrl: v })} />
          </Field>
          <Field label="Android app URL">
            <TextInput value={s.loyalty.playStoreUrl} onChange={(v) => patch("loyalty", { playStoreUrl: v })} />
          </Field>
        </Row>
      </Section>

      <Section title="Cross-brand (Zia Gastro Pubs)">
        <Field label="Heading">
          <TextInput value={s.crossBrand.heading} onChange={(v) => patch("crossBrand", { heading: v })} />
        </Field>
        <Field label="Body">
          <textarea value={s.crossBrand.body} onChange={(e) => patch("crossBrand", { body: e.target.value })} rows={3} className={inputCls} />
        </Field>
        <Row>
          <Field label="CTA label">
            <TextInput value={s.crossBrand.ctaLabel} onChange={(v) => patch("crossBrand", { ctaLabel: v })} />
          </Field>
          <Field label="CTA URL">
            <TextInput value={s.crossBrand.ctaUrl} onChange={(v) => patch("crossBrand", { ctaUrl: v })} />
          </Field>
        </Row>
      </Section>

      <Section title="About page">
        <Field label="Headline">
          <TextInput value={s.about.headline} onChange={(v) => patch("about", { headline: v })} />
        </Field>
        <Field label="Body">
          <textarea value={s.about.body} onChange={(e) => patch("about", { body: e.target.value })} rows={6} className={inputCls} />
        </Field>
      </Section>

      <Section title="Footer">
        <Field label="Tagline">
          <textarea value={s.footer.tagline} onChange={(e) => patch("footer", { tagline: e.target.value })} rows={2} className={inputCls} />
        </Field>
        <Field label="Legal line">
          <TextInput value={s.footer.legal} onChange={(v) => patch("footer", { legal: v })} />
        </Field>
      </Section>

      {error && <p className="text-primary text-normal3">{error}</p>}
      {saved && <p className="text-green-400 text-normal3">Saved.</p>}

      <div className="sticky bottom-0 bg-[#0D0D0D]/95 backdrop-blur-md border-t border-white/10 py-3 -mx-5 sm:-mx-8 px-5 sm:px-8">
        <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold px-5 py-2.5 rounded-lg">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

const inputCls = "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary";

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white/[0.03] border border-white/10 rounded-[14px] p-5 flex flex-col gap-4">
      <h2 className="text-h5 italic text-white">{title}</h2>
      {children}
    </section>
  );
}
