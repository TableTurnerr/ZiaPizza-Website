"use client";

import React, { useState } from "react";
import Link from "next/link";
import { locations } from "@/data/locations";

export default function LocationFinder() {
  const [query, setQuery] = useState("");

  const filtered = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
      <div className="text-accent text-normal3 font-semibold tracking-wider uppercase text-center mb-2">
        Locations
      </div>
      <h2 className="text-h3 sm:text-h2 text-center mb-[30px]">
        Find Your Nearest Zia
      </h2>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-[30px] flex gap-3">
        <input
          type="text"
          placeholder="Search by name or area..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-[9px] px-5 py-3 text-normal2 text-white placeholder-gray-500 outline-none focus:border-accent/50 transition-colors"
        />
        <button className="bg-primary-dark hover:bg-primary text-white font-bold px-6 py-3 rounded-[9px] transition-colors text-normal2">
          Search
        </button>
      </div>

      {/* Location cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] max-w-6xl mx-auto">
        {filtered.map((location) => (
          <Link
            key={location.slug}
            href={`/${location.type}/${location.slug}`}
            className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-accent/40 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary-dark/80 text-white text-normal4 font-semibold px-3 py-1 rounded-full">
                  {location.type === "zia-pizza"
                    ? "Zia Pizza"
                    : location.type === "zia-pizza-express"
                      ? "Express"
                      : "Country Pub"}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-normal1 font-semibold text-white mb-1 group-hover:text-accent transition-colors">
                {location.name}
              </h3>
              <p
                className="text-normal3 mb-3"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                {location.address}
              </p>
              <p className="text-normal4 text-gray-500">{location.hours}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
