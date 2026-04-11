"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Menu", id: "Menu" },
  { label: "Our Brands", id: "Pillars" },
  { label: "Reviews", id: "Reviews" },
  { label: "Locations", id: "Locations" },
  { label: "FAQ's", id: "FAQs" },
];

export default function Header({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    const attemptScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1020]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo + Brand Name */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            aria-label="Zia Pizza Home"
          >
            <Image
              src="/logo/logo.png"
              alt="Zia Pizza Logo"
              width={50}
              height={50}
              className="object-contain rounded-sm flex-shrink-0 h-auto w-auto"
              priority
            />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-white font-bold text-[15px] tracking-wide leading-none">
                Zia Pizza
              </span>
              <span
                className="text-[10px] tracking-[0.14em] uppercase mt-[3px] leading-none"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                A Slice Above The Rest
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[13px] font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:text-white hover:bg-white/[0.06]"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Phone + Order CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:01722433829"
              className="hidden lg:flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 hover:text-white"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              01722 433829
            </a>

            <a
              href="https://ziapizza.food-order.net/en?code=RENMV0lX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white text-[13px] font-bold px-5 py-[9px] rounded-lg transition-colors duration-200 leading-none whitespace-nowrap"
            >
              Order Online
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-[20px] h-[1.5px] bg-white origin-center transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-[20px] h-[1.5px] bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-[20px] h-[1.5px] bg-white origin-center transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(10, 16, 32, 0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="px-4 pb-5 pt-2 border-t border-white/[0.06] space-y-0.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium transition-colors duration-200 cursor-pointer hover:text-white hover:bg-white/[0.05]"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-white/[0.06]">
            <a
              href="tel:01722433829"
              className="flex items-center gap-2 px-4 py-3 text-[15px] font-medium transition-colors hover:text-white"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              01722 433829
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
