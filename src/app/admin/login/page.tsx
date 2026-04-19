"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Login failed" }));
        throw new Error(data.error ?? "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--tt-bg-color)" }}>
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-[16px] p-8"
      >
        <div className="mb-6">
          <div className="text-accent text-normal4 tracking-[0.2em] uppercase font-bold">Zia Pizza</div>
          <h1 className="text-h4 italic text-white mt-1">Admin</h1>
        </div>
        <label className="flex flex-col gap-1.5 mb-4">
          <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary"
          />
        </label>
        {error && <p className="text-primary text-normal4 mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold py-3 rounded-lg transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
