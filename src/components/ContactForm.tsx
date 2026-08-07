"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-[16px] p-6 flex flex-col gap-4">
      {status === "sent" ? (
        <div className="py-10 text-center">
          <div className="text-accent text-h5 mb-2">Thanks, we got it.</div>
          <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>We&apos;ll come back to you within a day.</p>
        </div>
      ) : (
        <>
          <label className="flex flex-col gap-1.5">
            <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Message</span>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary resize-y" />
          </label>
          {status === "error" && (
            <p className="text-primary text-normal4">Something went wrong. Please email us directly at info@ziapizza.com.</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold py-3 rounded-lg transition-colors"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </>
      )}
    </form>
  );
}
