"use client";

import React, { useState } from "react";
import SmartImage from "@/components/SmartImage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookTableButton from "@/components/BookTableButton";
import { site } from "@/data/site";
import { findLocationByPostcode, locations } from "@/data/locations";

export default function HeroSection() {
  const router = useRouter();
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState<string | null>(null);
  function findMyZia(e: React.FormEvent) {
    e.preventDefault();
    const match = findLocationByPostcode(postcode.trim());
    if (match) {
      setError(null);
      router.push(`/${match.type}/${match.slug}`);
    } else {
      setError(
        `We couldn't match "${postcode}" to a location yet. Try browsing all locations below.`
      );
    }
  }

  return (
    <section
      id="Home"
      className="min-h-[640px] lg:min-h-[720px] w-full relative flex items-center rounded-[20px] overflow-hidden"
    >
      <SmartImage
        src="/products/pizzas/hot-honey-pepperoni.jpg"
        alt="Zia Pizza - stone baked hot honey pepperoni pizza"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E1824] via-[#0E1824]/75 to-[#0E1824]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1824]/30 via-transparent to-[#0E1824]/70" />

      <div className="relative z-10 pl-6 sm:pl-12 lg:pl-20 pr-4 py-20 flex flex-col items-start gap-4 max-w-[600px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-[13px]"
            style={{
              color: "#BDA277",
              fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em",
            }}
          >
            {site.hero.eyebrow}
          </span>
        </div>

        <h1 className="text-white text-h1 sm:text-hero font-bold leading-[1.05] -mt-1">
          {site.hero.headline}
          <br />
          <span className="text-primary italic">{site.hero.headlineAccent}</span>
        </h1>

        <p
          className="text-[14px] sm:text-normal3 leading-[1.7] max-w-[440px]"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          {site.hero.subtext}
        </p>

        {/* Unified pill postcode finder */}
        <form onSubmit={findMyZia} className="mt-2 w-full max-w-[480px]">
          <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1.5 gap-2 focus-within:border-primary/60 transition-colors duration-200">
            <div className="flex items-center gap-2 flex-1 pl-3">
              <svg className="w-4 h-4 flex-shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter your postcode (e.g. SP1 2NE)"
                className="flex-1 bg-transparent text-white text-normal3 placeholder-white/40 focus:outline-none py-1.5 min-w-0"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
            >
              Find My Zia
            </button>
          </div>
          {error && (
            <p className="flex items-start gap-2 text-normal4 text-primary mt-2.5 pl-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-[2px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </form>

        {/* Location chips */}
        <div className="flex flex-wrap items-center gap-2">
          {locations.map((loc) => (
            <span
              key={loc.slug}
              className="flex items-center gap-1.5 bg-white/[0.07] border border-white/10 rounded-full px-3 py-1 text-[12px] font-medium"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              {loc.city}
            </span>
          ))}
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>+ growing</span>
        </div>

        {/* CTAs */}
        <div className="hidden sm:flex flex-row items-center gap-3 mt-1">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-[14px] font-bold px-6 py-3 rounded-[10px] transition-colors duration-200"
          >
            Order Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <BookTableButton className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 bg-white/[0.06] hover:bg-white/[0.12] text-white text-[14px] font-bold px-6 py-3 rounded-[10px] transition-colors duration-200">
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Table
          </BookTableButton>
        </div>

        {/* Brand differentiators */}
        <div className="flex items-stretch gap-0 mt-2 pt-5 border-t border-white/[0.08] w-full max-w-[520px]">
          {[
            {
              label: "Stone Baked",
              sub: "Perfect crust & flavour",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              ),
            },
            {
              label: "Hand Stretched",
              sub: "Every pizza, every time",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              ),
            },
            {
              label: "Fior di Latte",
              sub: "Premium mozzarella",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 flex-1">
              <div className="flex items-start gap-2.5 flex-1">
                <div className="mt-[1px] flex-shrink-0" style={{ color: "#BDA277" }}>
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white leading-tight whitespace-nowrap"
                    style={{ fontFamily: "var(--font-heading, sans-serif)" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-[11px] leading-snug mt-[3px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {item.sub}
                  </div>
                </div>
              </div>
              {i < 2 && <div className="w-px self-stretch bg-white/10 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
