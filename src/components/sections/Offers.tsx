import React from "react";
import Link from "next/link";
import { locations } from "@/data/locations";

type OfferCardData = {
  locationName: string;
  locationSlug: string;
  locationType: string;
  day: string;
  name: string;
  description: string;
  price?: string;
};

function getHighlightedOffers(): OfferCardData[] {
  const all: OfferCardData[] = locations.flatMap((loc) =>
    loc.deals.map((deal) => ({
      locationName: loc.name,
      locationSlug: loc.slug,
      locationType: loc.type,
      ...deal,
    }))
  );
  // Take a mix — prefer Every Day / BOGO / Lunch and flagship weekday deals
  const priority = ["BOGO Pizza", "Wednesday", "Lunch Combo", "Kids Eat for £1", "50% Off 2nd Pizza", "Monday Funday"];
  const sorted = [...all].sort((a, b) => {
    const ai = priority.findIndex((p) => a.name.includes(p) || a.day.includes(p));
    const bi = priority.findIndex((p) => b.name.includes(p) || b.day.includes(p));
    const ax = ai === -1 ? 99 : ai;
    const bx = bi === -1 ? 99 : bi;
    return ax - bx;
  });
  return sorted.slice(0, 3);
}

export default function OffersSection() {
  const offers = getHighlightedOffers();

  return (
    <section
      id="Offers"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3 justify-center">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          Le Nostre Offerte
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 text-center mb-3 italic">
        Today&apos;s Offers
      </h2>
      <p className="text-normal2 text-center max-w-xl mx-auto mb-[44px]" style={{ color: "var(--tt-color-text-gray)" }}>
        Combo deals, family bundles and weekly specials across our locations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {offers.map((offer, i) => (
          <div
            key={`${offer.locationSlug}-${offer.name}-${i}`}
            className="relative bg-gradient-to-br from-primary-dark/30 to-white/[0.03] border border-primary/20 rounded-[16px] p-6 flex flex-col"
          >
            <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">
              {offer.day}
            </div>
            <h3 className="text-h5 font-semibold text-white mb-2">{offer.name}</h3>
            <p className="text-normal3 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>
              {offer.description}
            </p>
            {offer.price && (
              <div className="text-h4 font-bold text-primary-light mt-3">{offer.price}</div>
            )}
            <div className="mt-4 text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
              Available at {offer.locationName}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/offers"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          View All Offers
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
