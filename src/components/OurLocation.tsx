"use client";

import React from "react";
import { locations } from "@/data/locations";

export default function OurLocation() {
  // Default to Salisbury map
  const primary = locations[0];

  return (
    <div className="w-full">
      <h2 className="text-h3 sm:text-h2 font-semibold text-center mb-[30px]">
        Our Locations
      </h2>

      <div className="relative w-full h-[400px] sm:h-[400px] rounded-[24px] overflow-hidden mx-auto max-w-6xl">
        {/* Map */}
        <iframe
          src={primary.mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zia Pizza Locations"
        />

        {/* Overlay cards - desktop only */}
        <div className="hidden md:flex absolute top-4 left-4 right-4 gap-3 z-10">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="backdrop-blur-[14px] rounded-[16px] px-5 py-4 flex-1"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <h3 className="text-normal2 font-bold text-white mb-1">
                {loc.name}
              </h3>
              <p className="text-normal4 text-white/80 mb-2">{loc.address}</p>
              <p className="text-normal4 text-white/60 mb-3">{loc.hours}</p>
              <div className="flex gap-2">
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="bg-primary-dark hover:bg-primary text-white text-normal4 font-semibold px-3 py-1.5 rounded-md transition-colors"
                >
                  Call
                </a>
                <a
                  href={`/${loc.type}/${loc.slug}`}
                  className="bg-white/10 hover:bg-white/20 text-white text-normal4 font-semibold px-3 py-1.5 rounded-md transition-colors"
                >
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile location cards */}
      <div className="md:hidden mt-4 flex flex-col gap-3 px-[10px]">
        {locations.map((loc) => (
          <a
            key={loc.slug}
            href={`/${loc.type}/${loc.slug}`}
            className="bg-white/5 border border-white/10 rounded-[16px] px-5 py-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-normal2 font-bold text-white">{loc.name}</h3>
              <p className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
                {loc.address}
              </p>
            </div>
            <svg className="w-5 h-5 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
