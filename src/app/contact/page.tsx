"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export default function ContactPage() {
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
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Contact</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">Get in touch</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          For table bookings, please use the Book Table button. For everything else, drop us a line.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-6">
              <h2 className="text-h5 text-white font-semibold mb-3">General</h2>
              <p className="text-normal3 mb-1.5" style={{ color: "var(--tt-color-text-gray)" }}>
                <a href="mailto:info@ziapizza.com" className="hover:text-white transition-colors">info@ziapizza.com</a>
              </p>
            </div>
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-white/5 border border-white/10 rounded-[16px] p-6">
                <h2 className="text-h5 text-white font-semibold mb-1">{loc.name}</h2>
                <p className="text-normal3 mb-1.5" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</p>
                <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
                  <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{loc.phone}</a>
                  {" · "}
                  <a href={`mailto:${loc.email}`} className="hover:text-white transition-colors">{loc.email}</a>
                </p>
                <p className="text-normal4 text-white/50 mt-2">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
