import React from "react";
import Link from "next/link";
import { locations } from "@/data/locations";
import Reveal from "@/components/Reveal";

type OfferCardData = {
  locationName: string;
  locationSlug: string;
  locationType: string;
  day: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
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
      <Reveal>
        <div className="flex items-center gap-2 mb-3 justify-center">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-accent text-[13px] font-semibold"
            style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Le Nostre Offerte
          </span>
        </div>
        <h2 className="text-h3 sm:text-h2 text-center mb-3 italic" style={{ color: "#1a1a1a" }}>
          Today&apos;s Offers
        </h2>
        <p className="text-normal2 text-center max-w-xl mx-auto mb-8" style={{ color: "#6b6b6b" }}>
          Combo deals, family bundles and weekly specials across our locations.
        </p>
      </Reveal>

      <div className="flex md:grid md:grid-cols-3 gap-4 max-w-6xl mx-auto overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-[10px] px-[10px] md:mx-0 md:px-0 pb-2 md:pb-0">
        {offers.map((offer, i) => (
          <Reveal
            as="div"
            key={`${offer.locationSlug}-${offer.name}-${i}`}
            delay={i * 110}
            className="relative rounded-[16px] overflow-hidden flex flex-col border border-white/[0.06] bg-[#0E1824] flex-shrink-0 w-[80vw] md:w-auto snap-start"
          >
            {offer.image && (
              <div className="relative h-[180px] overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {offer.price && (
                  <div className="absolute bottom-3 right-3 bg-primary text-white text-normal2 font-bold px-3 py-1 rounded-lg">
                    {offer.price}
                  </div>
                )}
              </div>
            )}
            <div className="p-6 flex flex-col flex-1">
              <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">
                {offer.day}
              </div>
              <h3 className="text-h5 font-semibold text-white mb-2">{offer.name}</h3>
              <p className="text-normal3 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>
                {offer.description}
              </p>
              {!offer.image && offer.price && (
                <div className="text-h4 font-bold text-primary-light mt-3">{offer.price}</div>
              )}
              <div className="mt-4 text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
                Available at {offer.locationName}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex justify-center mt-8" delay={120}>
        <Link
          href="/offers"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          View All Offers
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
