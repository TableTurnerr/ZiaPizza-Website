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
import JsonLd from "@/components/JsonLd";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Authentic Stone-Baked Italian Pizza in Salisbury & Westbury",
  description:
    "Zia Pizza serves hand-stretched, stone-baked pizzas, pasta and more in Salisbury and Westbury for dine-in, takeaway and delivery.",
  pathname: "/",
});

const SECTION_GAP = "h-[48px] sm:h-[64px]";

export default function HomePage() {
  return (
    <div className="p-[10px] pt-[80px] pb-[80px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Zia Pizza",
          legalName: "ZIA Hospitality Group Ltd",
          url: SITE_URL,
          logo: `${SITE_URL}/logo/logo.webp`,
        }}
      />
      <Header />

      <Hero />
      <div className={SECTION_GAP} />

      <ExperienceSelection />
      <div className={SECTION_GAP} />

      <div className="rounded-[20px] bg-[#F5EFE6] py-10 sm:py-14">
        <Offers />
        <div className={SECTION_GAP} />
        <FeaturedProducts />
        <div className={SECTION_GAP} />
        <Reveal>
          <MenuPreview />
        </Reveal>
      </div>
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
