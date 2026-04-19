import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoyaltySection from "@/components/sections/Loyalty";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Loyalty & Rewards | Zia Pizza",
  description: "Earn points on every order and redeem them for free sides, pizzas and exclusive perks.",
};

const TIERS = [
  { name: "Dough", points: "0 – 99 pts", perks: "Welcome offer · birthday dough balls" },
  { name: "Stone", points: "100 – 299 pts", perks: "Free starter every month · early access to new menu items" },
  { name: "Flame", points: "300+ pts", perks: "Free pizza on your birthday · priority bookings · surprise drops" },
];

export default function LoyaltyPage() {
  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Loyalty</span>
        </div>
      </div>

      <LoyaltySection />

      <div className="h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <h2 className="text-h3 italic text-white text-center mb-3">How it works</h2>
        <p className="text-normal2 text-center max-w-xl mx-auto mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          Earn points on every order — in-store, online, or on the app. Redeem them for free sides, pizzas, and exclusive rewards.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((t, i) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-[16px] p-6">
              <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">Tier {i + 1}</div>
              <h3 className="text-h4 text-white italic mb-1">{t.name}</h3>
              <div className="text-normal3 mb-3" style={{ color: "var(--tt-color-text-gray)" }}>{t.points}</div>
              <p className="text-normal3 text-white/80">{t.perks}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={site.loyalty.appStoreUrl}
              className="bg-black border border-white/20 hover:border-white/40 text-white text-normal3 font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Download on iOS
            </a>
            <a
              href={site.loyalty.playStoreUrl}
              className="bg-black border border-white/20 hover:border-white/40 text-white text-normal3 font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Get it on Android
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
