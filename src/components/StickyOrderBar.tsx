"use client";

import React from "react";
import Link from "next/link";
import { useBooking } from "./BookingProvider";

export default function StickyOrderBar() {
  const { openBooking } = useBooking();
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-3 py-2.5 flex gap-2 border-t border-white/10"
      style={{
        background: "rgba(13,13,13,0.95)",
        backdropFilter: "blur(14px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
      }}
    >
      <Link
        href="/order"
        className="flex-1 bg-primary hover:bg-primary-dark text-white text-normal3 font-bold py-3 rounded-lg text-center transition-colors"
      >
        Order Now
      </Link>
      <button
        type="button"
        onClick={() => openBooking()}
        className="flex-1 bg-white/10 hover:bg-white/20 text-white text-normal3 font-bold py-3 rounded-lg transition-colors"
      >
        Book Table
      </button>
    </div>
  );
}
