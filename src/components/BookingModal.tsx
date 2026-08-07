"use client";

import React, { useState, useEffect } from "react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

const BOOKING_URLS: Record<string, string> = {
  salisbury: "https://www.eposhybrid.uk/index.php/online-table-booking/RENMV0lX",
};

const LOCATION_LABELS: Record<string, string> = {
  salisbury: "Salisbury",
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  defaultLocationSlug?: string;
};

export default function BookingModal({ open, onClose, defaultLocationSlug }: BookingModalProps) {
  const defaultSlug = defaultLocationSlug && BOOKING_URLS[defaultLocationSlug]
    ? defaultLocationSlug
    : "salisbury";
  const [locationSlug, setLocationSlug] = useState(defaultSlug);

  useEffect(() => {
    if (defaultLocationSlug && BOOKING_URLS[defaultLocationSlug]) {
      setLocationSlug(defaultLocationSlug);
    }
  }, [defaultLocationSlug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lockScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      unlockScroll();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#141414] border border-white/10 rounded-[20px] overflow-hidden flex flex-col"
        style={{ height: "min(90vh, 760px)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] flex-shrink-0">
          <h3 id="booking-title" className="text-white font-semibold text-[17px]">
            Book a Table
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[13px]">Zia Pizza Salisbury</span>

            <button
              onClick={onClose}
              aria-label="Close"
              className="text-white/50 hover:text-white w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Iframe */}
        <iframe
          key={locationSlug}
          src={BOOKING_URLS[locationSlug]}
          title={`Book a table at Zia Pizza ${LOCATION_LABELS[locationSlug]}`}
          className="w-full flex-1 border-0 bg-white"
          allow="payment"
        />
      </div>
    </div>
  );
}
