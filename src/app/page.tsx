import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Hero from "@/components/sections/Hero";
import ExperienceSelection from "@/components/sections/ExperienceSelection";
import Offers from "@/components/sections/Offers";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import MenuPreview from "@/components/sections/MenuPreview";
import Locations from "@/components/sections/Locations";
import Loyalty from "@/components/sections/Loyalty";
import Reviews from "@/components/sections/Reviews";
import CrossBrand from "@/components/sections/CrossBrand";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Zia Pizza | Authentic Stone-Baked Italian Pizza in Salisbury & Westbury",
  description:
    "Zia Pizza — the best Italian pizza restaurant in Salisbury and Westbury. Authentic hand-stretched, stone-baked pizzas, fresh pasta, and family dining. Dine-in, takeaway, or delivery.",
  alternates: { canonical: "https://ziapizza.co.uk/" },
  keywords: [
    "best pizza Salisbury", "best pizza Westbury", "Italian restaurant Wiltshire",
    "stone baked pizza", "pizza delivery Salisbury", "pizza delivery Westbury",
    "authentic Italian pizza UK", "hand stretched pizza",
  ],
};

const SECTION_GAP = "h-[80px] sm:h-[100px]";

export default function HomePage() {
  return (
    <div className="p-[10px] pt-[80px] pb-[100px]">
      <Header />

      <Hero />
      <div className={SECTION_GAP} />

      <ExperienceSelection />
      <div className={SECTION_GAP} />

      <Offers />
      <div className={SECTION_GAP} />

      <FeaturedProducts />
      <div className={SECTION_GAP} />

      <Reveal>
        <MenuPreview />
      </Reveal>
      <div className={SECTION_GAP} />

      <Reveal>
        <Locations />
      </Reveal>
      <div className={SECTION_GAP} />

      <Reveal variant="scale" duration={800}>
        <Loyalty />
      </Reveal>
      <div className={SECTION_GAP} />

      <Reveal>
        <Reviews />
      </Reveal>
      <div className={SECTION_GAP} />

      <Reveal variant="scale" duration={800}>
        <CrossBrand />
      </Reveal>
      <div className={SECTION_GAP} />

      <Reveal>
        <FinalCTA />
      </Reveal>
      <div className="h-[60px]" />

      <Footer />
    </div>
  );
}
