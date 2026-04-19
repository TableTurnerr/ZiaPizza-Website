"use client";

import React, { useState, useEffect } from "react";
import { locations } from "@/data/locations";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  defaultLocationSlug?: string;
};

export default function BookingModal({ open, onClose, defaultLocationSlug }: BookingModalProps) {
  const [locationSlug, setLocationSlug] = useState(
    defaultLocationSlug ?? locations[0]?.slug ?? ""
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (defaultLocationSlug) setLocationSlug(defaultLocationSlug);
  }, [defaultLocationSlug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationSlug, name, phone, date, time, partySize, notes }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#141414] border border-white/10 rounded-[20px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 id="booking-title" className="text-h5 text-white font-semibold">Book a Table</h3>
            <p className="text-normal4 mt-1" style={{ color: "var(--tt-color-text-gray)" }}>
              We&apos;ll confirm your booking by phone within 30 minutes during opening hours.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        {status === "sent" ? (
          <div className="py-8 text-center">
            <div className="text-accent text-h5 mb-2">Thanks, {name || "guest"}!</div>
            <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
              Your booking request has been received. We&apos;ll call you back shortly to confirm.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-primary hover:bg-primary-dark text-white text-normal3 font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3.5">
            <Field label="Location">
              <select
                value={locationSlug}
                onChange={(e) => setLocationSlug(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
              >
                {locations.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>{loc.name}</option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Your name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
                />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Date">
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Time">
                <input
                  required
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
                />
              </Field>
              <Field label="Guests">
                <input
                  required
                  type="number"
                  min={1}
                  max={20}
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value || "1", 10))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary"
                />
              </Field>
            </div>

            <Field label="Notes (optional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-normal3 focus:outline-none focus:border-primary resize-none"
                placeholder="Birthday, dietary needs, etc."
              />
            </Field>

            {status === "error" && (
              <p className="text-primary text-normal4">Something went wrong. Please call the restaurant directly.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal3 font-semibold py-3 rounded-lg transition-colors"
            >
              {status === "sending" ? "Sending..." : "Request Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}
