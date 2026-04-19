import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

      <MenuPreview />
      <div className={SECTION_GAP} />

      <Locations />
      <div className={SECTION_GAP} />

      <Loyalty />
      <div className={SECTION_GAP} />

      <Reviews />
      <div className={SECTION_GAP} />

      <CrossBrand />
      <div className={SECTION_GAP} />

      <FinalCTA />
      <div className="h-[60px]" />

      <Footer />
    </div>
  );
}
