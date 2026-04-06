"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Animated menu button (hamburger → X) - matches GrillShack Menu_Header_btn
function AnimatedMenuButton({
  menuItems,
}: {
  menuItems: { name: string; onclick: () => void }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-[5px] p-2 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[180px] z-50">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onclick();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-black text-normal3 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// CTA button group - matches GrillShack CTA_header_btn
function AnimatedCTAButton({
  leftLabel,
  leftHref,
  rightLabel,
  rightHref,
}: {
  leftLabel: string;
  leftHref: string;
  rightLabel: string;
  rightHref: string;
}) {
  return (
    <div className="flex items-center bg-primary-dark rounded-[10px] overflow-hidden group">
      <a
        href={leftHref}
        className="text-white text-normal4 font-bold px-4 py-2.5 hover:bg-primary transition-colors"
      >
        {leftLabel}
      </a>
      <div className="w-[1px] h-6 bg-white/20" />
      <a
        href={rightHref}
        className="text-white text-normal4 font-bold px-4 py-2.5 hover:bg-primary transition-colors"
      >
        {rightLabel}
      </a>
    </div>
  );
}

export default function Header({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const attemptScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (pathname === "/") {
      attemptScroll();
    } else {
      router.push("/");
      setTimeout(attemptScroll, 100);
      if (typeof onClick === "function") onClick();
    }
  };

  return (
    <div className="p-[20px] w-full">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left Section - Desktop Menu */}
        <div className="hidden md:flex justify-start">
          <AnimatedMenuButton
            menuItems={[
              { name: "Our Brands", onclick: () => scrollToSection("Pillars") },
              { name: "Menu", onclick: () => scrollToSection("Menu") },
              { name: "Locations", onclick: () => scrollToSection("Locations") },
              { name: "FAQ's", onclick: () => scrollToSection("FAQs") },
            ]}
          />
        </div>

        {/* Center Section - Logo */}
        <div className="flex justify-start md:justify-center">
          <div
            className="relative text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span
              className="absolute inset-0 rounded-full border-[0.5px]"
              style={{ borderColor: "rgba(0,0,0,0.15)", pointerEvents: "none" }}
            />
            <Image
              src="/logo/logo.png"
              alt="Zia Pizza Logo"
              width={140}
              height={140}
              className="object-cover border-[4px] border-black rounded-[2px]"
              priority
            />
          </div>
        </div>

        {/* Right Section - CTA */}
        <div className="flex justify-end items-center gap-3">
          {/* Mobile hamburger */}
          <div className="md:hidden">
            <AnimatedMenuButton
              menuItems={[
                { name: "Our Brands", onclick: () => scrollToSection("Pillars") },
                { name: "Menu", onclick: () => scrollToSection("Menu") },
                { name: "Locations", onclick: () => scrollToSection("Locations") },
                { name: "FAQ's", onclick: () => scrollToSection("FAQs") },
              ]}
            />
          </div>
          <AnimatedCTAButton
            leftLabel="Call us"
            leftHref="tel:01722433829"
            rightLabel="Order"
            rightHref="https://ziapizza.food-order.net/en?code=RENMV0lX"
          />
        </div>
      </div>
    </div>
  );
}
