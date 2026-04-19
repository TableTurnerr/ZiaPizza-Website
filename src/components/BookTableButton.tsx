"use client";

import React from "react";
import { useBooking } from "./BookingProvider";

type Props = {
  locationSlug?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function BookTableButton({ locationSlug, children, className }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => openBooking(locationSlug)}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 border-2 border-white/15 hover:border-primary bg-transparent hover:bg-primary text-white text-normal3 font-bold px-5 py-[9px] rounded-lg transition-colors"
      }
    >
      {children ?? "Book Table"}
    </button>
  );
}
