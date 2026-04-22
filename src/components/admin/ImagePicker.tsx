"use client";

import React, { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
};

export default function ImagePicker({ value, onChange, label }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({ error: "Upload failed" }));
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
          {label}
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="w-[96px] h-[96px] rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/30 text-normal4">No image</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or full URL"
            className="bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-normal3 focus:outline-none focus:border-primary"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-normal4 px-3 py-1.5 rounded-md transition-colors"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-normal4 underline text-white/60 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          {error && <p className="text-primary text-normal4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
