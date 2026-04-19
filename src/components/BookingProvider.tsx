"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import BookingModal from "./BookingModal";

type BookingContextValue = {
  openBooking: (locationSlug?: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    return { openBooking: () => {} };
  }
  return ctx;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [locationSlug, setLocationSlug] = useState<string | undefined>(undefined);

  const openBooking = useCallback((slug?: string) => {
    setLocationSlug(slug);
    setOpen(true);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        defaultLocationSlug={locationSlug}
      />
    </BookingContext.Provider>
  );
}
