import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Pizza Deals & Weekly Offers | Zia Pizza Salisbury & Westbury",
  description: "Weekly pizza deals and restaurant offers at Zia Pizza — half-price pasta nights, family bundles, student discounts, and more across Salisbury and Westbury.",
  alternates: { canonical: "https://ziapizza.co.uk/offers" },
};

export default function OffersPage() {
  return (
    <div className="p-[10px] pb-[120px] bg-white">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px] text-[#666]">
          <Link href="/" className="hover:text-[#0D0D0D] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0D0D0D] font-medium">Offers</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-[#0D0D0D] mb-3">All Offers</h1>
        <p className="text-normal2 max-w-2xl mb-10 text-[#444]">
          Weekday specials, family bundles, and limited-time promotions across our locations.
        </p>

        <div className="flex flex-col gap-12">
          {locations.filter((loc) => !loc.comingSoon).map((loc) => (
            <section key={loc.slug}>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-h4 text-[#0D0D0D] italic">{loc.name}</h2>
                  <p className="text-normal4 text-[#666] mt-0.5">{loc.address}</p>
                </div>
                <Link
                  href={`/${loc.type}/${loc.slug}`}
                  className="text-normal4 text-primary font-semibold hover:text-[#0D0D0D] transition-colors"
                >
                  View location →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loc.deals.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="border border-red-900/40 rounded-[14px] p-5 flex flex-col"
                    style={{ background: "linear-gradient(135deg, #4a0c0e 0%, #1c0507 100%)" }}
                  >
                    <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">{d.day}</div>
                    <h3 className="text-h5 font-semibold text-white mb-2">{d.name}</h3>
                    <p className="text-normal3 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>{d.description}</p>
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
