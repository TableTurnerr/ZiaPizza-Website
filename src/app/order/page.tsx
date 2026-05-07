"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformButton from "@/components/PlatformButton";
import { locations, findLocationByPostcode, Location } from "@/data/locations";

type Step = "postcode" | "pick" | "redirect";

export default function OrderPage() {
  const [step, setStep] = useState<Step>("pick");
  const [postcode, setPostcode] = useState("");
  const [selected, setSelected] = useState<Location | null>(null);

  function onPostcodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const match = findLocationByPostcode(postcode);
    if (match) {
      setSelected(match);
      setStep("redirect");
    } else {
      setStep("pick");
    }
  }

  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-3xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Order</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">Order Online</h1>
        <p className="text-normal2 mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
          Takeaway or delivery — we&apos;ll send you to the right location&apos;s order page.
        </p>

        {step === "postcode" && (
          <form onSubmit={onPostcodeSubmit} className="bg-white/5 border border-white/10 rounded-[16px] p-6">
            <label className="flex flex-col gap-2 mb-4">
              <span className="text-normal3 font-semibold text-white">Your postcode</span>
              <input
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. SP1 2NE"
                className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-normal3 placeholder-white/40 focus:outline-none focus:border-primary"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-5 py-3 rounded-lg transition-colors"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setStep("pick")}
                className="bg-white/10 hover:bg-white/20 text-white text-normal3 font-bold px-5 py-3 rounded-lg transition-colors"
              >
                Skip &mdash; pick a location
              </button>
            </div>
          </form>
        )}

        {step === "pick" && (
          <div className="flex flex-col gap-3">
            <h2 className="text-h5 text-white mb-2">Pick a location</h2>
            {locations.map((loc) => (
              <button
                key={loc.slug}
                type="button"
                onClick={() => { setSelected(loc); setStep("redirect"); }}
                className="bg-white/5 border border-white/10 hover:border-primary/40 rounded-[14px] p-5 text-left transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-normal2">{loc.name}</div>
                    <div className="text-normal3 mt-0.5" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</div>
                  </div>
                  <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === "redirect" && selected && (
          <div className="bg-white/5 border border-white/10 rounded-[16px] p-8 text-center">
            <div className="text-accent font-bold text-normal4 uppercase tracking-wider mb-2">Continue to order</div>
            <h2 className="text-h4 text-white mb-2">{selected.name}</h2>
            <p className="text-normal3 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
              You&apos;ll be redirected to our ordering platform to finish checkout.
            </p>
            <a
              href={selected.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-primary hover:bg-primary-dark text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Open order page
            </a>
            <div className="mt-5 flex justify-center gap-2 flex-wrap">
              {selected.justEat && <PlatformButton platform="justEat" href={selected.justEat} size="sm" />}
              {selected.uberEats && <PlatformButton platform="uberEats" href={selected.uberEats} size="sm" />}
              {selected.deliveroo && <PlatformButton platform="deliveroo" href={selected.deliveroo} size="sm" />}
            </div>
            <button
              type="button"
              onClick={() => { setStep("pick"); setSelected(null); setPostcode(""); }}
              className="mt-6 text-normal4 underline"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              Start over
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
