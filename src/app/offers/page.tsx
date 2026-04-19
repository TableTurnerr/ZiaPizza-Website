import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Offers & Deals | Zia Pizza",
  description: "Current deals at Zia Pizza — weekly specials, lunch combos and BOGO at Westbury Express.",
};

export default function OffersPage() {
  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Offers</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">All Offers</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          Weekday specials, family bundles, and limited-time promotions across our locations.
        </p>

        <div className="flex flex-col gap-10">
          {locations.map((loc) => (
            <section key={loc.slug}>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2 className="text-h4 text-white italic">{loc.name}</h2>
                  <p className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</p>
                </div>
                <Link
                  href={`/${loc.type}/${loc.slug}`}
                  className="text-normal3 text-accent hover:text-white transition-colors"
                >
                  View location →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loc.deals.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="bg-gradient-to-br from-primary-dark/30 to-white/[0.03] border border-primary/20 rounded-[14px] p-5"
                  >
                    <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">{d.day}</div>
                    <h3 className="text-h5 font-semibold text-white mb-2">{d.name}</h3>
                    <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{d.description}</p>
                    {d.price && (
                      <div className="text-h4 font-bold text-primary-light mt-3">{d.price}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
