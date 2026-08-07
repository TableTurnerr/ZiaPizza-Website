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
    <div className="p-[10px] pb-[120px]" style={{ background: "var(--tt-bg-color)" }}>
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px] text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70 font-medium">Offers</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-accent text-[13px] font-semibold"
            style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Offerte della Settimana
          </span>
        </div>
        <h1 className="text-h1 italic text-white mb-3">All Offers</h1>
        <p className="text-normal2 max-w-2xl mb-10 text-white/60">
          Weekday specials, family bundles, and limited-time promotions across our locations.
        </p>

        <div className="flex flex-col gap-12">
          {locations.filter((loc) => !loc.comingSoon).map((loc) => (
            <section key={loc.slug}>
              {/* Gold rule separator per brand Section 08 */}
              <div className="w-8 h-px mb-5" style={{ background: "#BDA277" }} />
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-h2 text-white italic">{loc.name}</h2>
                  <p className="text-normal4 text-white/40 mt-0.5">{loc.address}</p>
                </div>
                <Link
                  href={`/${loc.type}/${loc.slug}`}
                  className="text-normal4 text-accent font-semibold hover:text-white transition-colors"
                >
                  View location →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loc.deals.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="border border-[#EE1D27]/30 rounded-[14px] overflow-hidden flex flex-col"
                    style={{ background: "linear-gradient(135deg, #0E1824 0%, #1a2535 100%)" }}
                  >
                    {d.image && (
                      <div className="relative h-[200px] overflow-hidden">
                        <img
                          src={d.image}
                          alt={d.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {d.price && (
                          <div className="absolute bottom-3 right-3 bg-primary text-white text-normal2 font-bold px-3 py-1 rounded-lg">
                            {d.price}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="text-[13px] font-semibold uppercase mb-2"
                        style={{ color: "#BDA277", letterSpacing: "0.08em", fontFamily: "var(--font-heading), 'Montserrat', sans-serif" }}
                      >
                        {d.day}
                      </div>
                      <h3 className="text-h3 font-semibold text-white mb-2">{d.name}</h3>
                      <p className="text-normal3 flex-1 text-white/60">{d.description}</p>
                      {!d.image && d.price && (
                        <div className="text-h3 font-bold text-accent mt-3">{d.price}</div>
                      )}
                    </div>
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
