import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationsSection from "@/components/sections/Locations";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations | Zia Pizza",
  description: "Find your nearest Zia Pizza restaurant or Express in Salisbury and Westbury.",
};

export default function LocationsPage() {
  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Locations</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">Our Locations</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          Two kitchens across Wiltshire — one full-service restaurant, one fast-casual Express.
        </p>
      </div>

      <LocationsSection />

      <div className="h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {locations.map((loc) => (
            <div key={loc.slug} className="bg-white/5 border border-white/10 rounded-[16px] overflow-hidden">
              <div className="relative w-full h-[260px]">
                <iframe
                  src={loc.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.name} map`}
                />
              </div>
              <div className="p-5">
                <h3 className="text-h5 text-white font-semibold mb-1">{loc.name}</h3>
                <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
