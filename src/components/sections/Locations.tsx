"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { locations, findLocationByPostcode, isLocationOpen, Location } from "@/data/locations";
import BookTableButton from "@/components/BookTableButton";

export default function LocationsSection() {
  const [postcode, setPostcode] = useState("");
  const [filtered, setFiltered] = useState<Location[]>(locations);
  const [message, setMessage] = useState<string | null>(null);

  const now = useMemo(() => new Date(), []);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = postcode.trim();
    if (!trimmed) {
      setFiltered(locations);
      setMessage(null);
      return;
    }
    const match = findLocationByPostcode(trimmed);
    if (match) {
      setFiltered([match]);
      setMessage(`Closest match: ${match.name}`);
    } else {
      setFiltered(locations);
      setMessage(`No location yet for "${trimmed}" — showing all locations.`);
    }
  }

  return (
    <section
      id="Locations"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3 justify-center">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          Dove Siamo
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 text-center mb-3 italic">
        Find Your Nearest Zia Pizza
      </h2>
      <p className="text-normal2 text-center max-w-xl mx-auto mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
        Enter your postcode to jump straight to the nearest location.
      </p>

      <form onSubmit={search} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Your postcode"
          className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-normal3 placeholder-white/40 focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-5 py-3 rounded-lg transition-colors"
        >
          Search
        </button>
      </form>
      {message && (
        <p className="text-center text-normal4 -mt-4 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {filtered.map((loc) => {
          const open = isLocationOpen(loc, now);
          return (
            <div
              key={loc.slug}
              className="bg-white/5 border border-white/10 rounded-[16px] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-h5 text-white font-semibold">{loc.name}</h3>
                <span
                  className={`text-normal4 font-bold px-2.5 py-0.5 rounded-full ${
                    open
                      ? "bg-green-500/15 text-green-400 border border-green-500/30"
                      : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }`}
                >
                  {open ? "Open now" : "Closed"}
                </span>
              </div>
              <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</p>
              <p className="text-normal4 text-white/50 mb-4">{loc.hours}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                <Link
                  href={`/${loc.type}/${loc.slug}`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-normal3 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  View Location
                </Link>
                <a
                  href={loc.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-dark text-white text-normal3 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Order Now
                </a>
                <BookTableButton
                  locationSlug={loc.slug}
                  className="bg-transparent hover:bg-white/10 border border-white/10 text-white text-normal3 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Book Table
                </BookTableButton>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
