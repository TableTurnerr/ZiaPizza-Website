import React from "react";
import { site } from "@/data/site";

export default function CrossBrandSection() {
  return (
    <section
      id="CrossBrand"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="relative max-w-5xl mx-auto rounded-[24px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 sm:p-12 text-center">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-accent text-[20px] sm:text-[22px]"
            style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
          >
            La Famiglia
          </span>
        </div>
        <h2 className="text-white text-h3 sm:text-h2 italic mb-4">{site.crossBrand.heading}</h2>
        <p className="text-normal2 max-w-2xl mx-auto mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
          {site.crossBrand.body}
        </p>
        <a
          href={site.crossBrand.ctaUrl}
          className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-accent text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          {site.crossBrand.ctaLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
