import React from "react";
import { site } from "@/data/site";

export default function LoyaltySection() {
  return (
    <section
      id="Loyalty"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent/10 to-white/[0.03] border border-accent/20 rounded-[24px] p-8 sm:p-12 flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span
              className="text-accent text-[20px] sm:text-[22px]"
              style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
            >
              Zia Rewards
            </span>
          </div>
          <h2 className="text-white text-h3 sm:text-h2 italic mb-4">{site.loyalty.heading}</h2>
          <p className="text-normal2 mb-5" style={{ color: "var(--tt-color-text-gray)" }}>
            {site.loyalty.body}
          </p>
          <ul className="flex flex-col gap-2 mb-6">
            {site.loyalty.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-normal3 text-white/85">
                <span className="text-accent mt-0.5">◆</span>
                {perk}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
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

        <div className="w-full max-w-[280px] aspect-[9/16] rounded-[28px] bg-gradient-to-br from-primary/30 to-primary-dark/60 border border-white/10 flex items-center justify-center relative overflow-hidden">
          <div className="text-center px-6">
            <div className="text-[72px] font-black text-white leading-none">Zia</div>
            <div className="text-[14px] tracking-[0.3em] uppercase text-white/70 mt-2">Rewards App</div>
            <div className="mt-6 text-h5 text-white">Coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}
