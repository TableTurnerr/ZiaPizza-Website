"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ThemeButton from "@/components/ThemeBtn";
import BrandPillars from "@/components/BrandPillars";
import Featuring from "@/components/featuring";

const Reviews = dynamic(() => import("@/components/Reviews"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQ_section"), { ssr: true });
const LocationComponent = dynamic(() => import("@/components/OurLocation"), { ssr: true });
const SignatureDishes = dynamic(() => import("@/components/SignatureDishes"), { ssr: true });

const Home = React.memo(function Home() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="p-[10px] pt-[80px]">
      <Header onClick={() => {}} />

      {/* Hero section */}
      <Hero />

      <div className="h-[100px]" />

      {/* Brand Pillars section */}
      <div id="Pillars">
        <BrandPillars />
      </div>

      <div className="h-[100px]" />

      {/* Featuring / Menu section */}
      <div id="Menu" className="w-full flex items-center justify-center text-center flex-col">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-accent text-normal3 font-semibold tracking-wider uppercase">
            Our Menu
          </span>
        </div>
        <div className="text-white text-h3 sm:text-h2 w-full">
          Try our most popular items
        </div>

        <div id="Featuring">
          <Featuring />
        </div>

        <div className="h-[80px]" />
        <div
          className="text-normal mt-[20px]"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          Treat yourself with our must-try dishes that everyone in Wiltshire is
          talking about.
        </div>
        <div className="mt-[20px] gap-[20px] flex flex-col sm:flex-row items-center justify-center">
          <ThemeButton
            text="Order Online"
            href="https://ziapizza.food-order.net/en?code=RENMV0lX"
            textClassname="pr-[8px] pl-[14px] text-white"
            className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
          />
          <ThemeButton
            text="Find a Location"
            textClassname="pr-[8px] pl-[14px]"
            textColor="text-[var(--tt-color-text-gray)]"
            className="bg-transparent border-2 transition-all duration-200 hover:bg-primary-dark hover:text-white border-white/10 hover:border-primary-dark"
            iconBgColor="bg-white/10"
            iconColor="text-white"
            href="#Locations"
          />
        </div>
      </div>

      <div className="h-[100px]" />

      {/* Signature Dishes */}
      <div id="Dishes">
        <SignatureDishes />
      </div>

      <div className="h-[100px]" />

      {/* Reviews */}
      <div id="Reviews">
        <Reviews />
      </div>

      <div className="h-[100px]" />

      {/* FAQ */}
      <div id="FAQs">
        <FAQSection />
      </div>

      <div className="h-[100px]" />

      {/* Locations */}
      <div id="Locations">
        <LocationComponent />
      </div>

      <div className="h-[100px]" />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
});

export default Home;
