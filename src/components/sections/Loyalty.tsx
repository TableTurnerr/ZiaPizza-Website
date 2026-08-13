import React from "react";
import Image from "next/image";
import { site } from "@/data/site";
import AppStoreButtons from "@/components/AppStoreButtons";

export default function LoyaltySection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section
      id="Loyalty"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="max-w-5xl mx-auto border border-white/[0.08] rounded-[24px] p-7 sm:p-10 flex flex-col lg:flex-row gap-8 items-center bg-white/[0.03]">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span
              className="text-accent text-[13px] font-semibold"
              style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Zia Rewards
            </span>
          </div>
          <Heading className="text-white text-h3 sm:text-h2 italic mb-4">{site.loyalty.heading}</Heading>
          <p className="text-normal2 mb-5" style={{ color: "var(--tt-color-text-gray)" }}>
            {site.loyalty.body}
          </p>
          <ul className="flex flex-col gap-2 mb-6">
            {site.loyalty.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-normal3 text-white/85">
                <svg className="w-4 h-4 flex-shrink-0 mt-[2px] text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
          <AppStoreButtons />
        </div>

        <div className="hidden sm:flex w-full max-w-[260px] rounded-[24px] border border-white/10 flex-col items-center justify-center relative overflow-hidden p-5 gap-4 bg-white/[0.04]">
          <div className="bg-white rounded-2xl p-0.5">
            <Image
              src="/rewards-qr.svg"
              alt="Scan to download the Zia Rewards app"
              width={220}
              height={220}
              unoptimized
              className="w-[220px] h-[220px]"
            />
          </div>
          <div className="text-center">
            <div className="text-[14px] tracking-[0.3em] uppercase text-white/70">Scan to download</div>
            <div className="mt-1 text-h6 text-white">Zia Rewards App</div>
          </div>
        </div>
      </div>
    </section>
  );
}
