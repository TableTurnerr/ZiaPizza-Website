import React from "react";
import Link from "next/link";
import { locationTypes } from "@/data/locations";

function PillarIcon({ icon }: { icon: string }) {
  if (icon === "pizza") {
    return (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-3.5 3.5m5-3.5v5l3.5-3.5M12 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
      </svg>
    );
  }
  if (icon === "bolt") {
    return (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export default function BrandPillars() {
  return (
    <div className="w-full flex items-center justify-center text-center flex-col px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
      <div className="text-accent text-normal3 font-semibold tracking-wider uppercase mb-2">
        Our Brands
      </div>
      <div className="text-h3 sm:text-h2 w-full mb-[30px]">Brand Pillars</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] w-full max-w-6xl">
        {locationTypes.map((type) => (
          <Link
            key={type.slug}
            href={`/${type.slug}`}
            className="group bg-white/5 border border-white/10 rounded-[16px] p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-lg text-left"
          >
            <div className="mb-5">
              <PillarIcon icon={type.icon} />
            </div>
            <h3 className="text-h5 font-semibold text-white mb-2 group-hover:text-accent transition-colors">
              {type.name}
            </h3>
            <p
              className="text-normal3 mb-1"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              {type.tagline}
            </p>
            <p className="text-normal4 text-gray-500 mb-6 leading-relaxed">
              {type.description}
            </p>
            <div className="flex items-center gap-2 text-normal3 text-accent font-semibold">
              View Locations
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
