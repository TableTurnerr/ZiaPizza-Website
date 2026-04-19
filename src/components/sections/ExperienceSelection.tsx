"use client";

import React from "react";
import Link from "next/link";
import { locations } from "@/data/locations";
import BookTableButton from "@/components/BookTableButton";

export default function ExperienceSelection() {
  return (
    <section
      id="Experience"
      className="w-full flex items-center justify-center text-center flex-col px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          Come trovare la tua Zia
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 w-full mb-3 italic">
        How would you like to enjoy Zia Pizza?
      </h2>
      <p className="text-normal2 max-w-xl mb-[44px]" style={{ color: "var(--tt-color-text-gray)" }}>
        Pick your nearest venue to dine in, book a table, or start an order for takeaway and delivery.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full max-w-5xl">
        {locations.map((loc, index) => (
          <div
            key={loc.slug}
            className="group relative bg-white/[0.03] border border-white/[0.08] rounded-[20px] p-6 sm:p-8 hover:border-primary/25 hover:bg-white/[0.06] transition-all duration-300 text-left overflow-hidden"
          >
            <div
              className="absolute top-4 right-5 text-[52px] font-black leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.035)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="text-accent text-normal4 font-semibold tracking-wider uppercase mb-2">
              {loc.type === "zia-pizza" ? "Zia Pizza Restaurant" : "Zia Pizza Express"}
            </div>
            <h3 className="text-h5 sm:text-h4 text-white font-semibold mb-2">{loc.name}</h3>
            <p className="text-normal3 mb-1" style={{ color: "var(--tt-color-text-gray)" }}>
              {loc.address}
            </p>
            <p className="text-normal4 text-white/50 mb-4">{loc.hours}</p>
            <p className="text-normal3 mb-5 line-clamp-3" style={{ color: "var(--tt-color-text-gray)" }}>
              {loc.description}
            </p>

            <div className="flex flex-wrap gap-2">
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
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-normal3 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Book Table
              </BookTableButton>
              <Link
                href={`/${loc.type}/${loc.slug}`}
                className="bg-transparent border border-white/10 hover:border-white/40 text-white text-normal3 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                View Location
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
