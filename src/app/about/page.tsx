import React from "react";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About | Zia Pizza",
  description: "The story behind Zia Pizza — a family recipe rooted in Naples, grown in Wiltshire, part of the ZIA Hospitality Group.",
};

export default function AboutPage() {
  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-4xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">About</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-4">{site.about.headline}</h1>
        <p className="text-normal1 leading-[1.7] mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          {site.about.body}
        </p>

        <div className="relative w-full h-[320px] sm:h-[440px] rounded-[20px] overflow-hidden mb-10">
          <SmartImage src="/photos/JOE01050.webp" alt="Zia Pizza kitchen" fill className="object-cover" sizes="100vw" />
        </div>

        <h2 className="text-h3 italic text-white mb-3">What we stand for</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { title: "Slow dough", body: "48-hour cold fermentation. Every base, every day." },
            { title: "Real ingredients", body: "San Marzano tomatoes, fior di latte, extra virgin olive oil. No shortcuts." },
            { title: "Family hospitality", body: "Run like Zia Maria's kitchen — generous, warm, and uncompromising." },
          ].map((v) => (
            <div key={v.title} className="bg-white/5 border border-white/10 rounded-[14px] p-5">
              <h3 className="text-h5 text-white italic mb-2">{v.title}</h3>
              <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{v.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[14px] p-6 text-center">
          <div className="text-accent text-normal4 uppercase tracking-wider font-bold mb-1">Parent company</div>
          <p className="text-normal2 text-white">{site.footer.legal}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
