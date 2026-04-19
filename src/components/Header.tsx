"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBooking } from "./BookingProvider";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "Offers", href: "/offers" },
  { label: "Loyalty", href: "/loyalty" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer flex-shrink-0 hover:opacity-75 transition-opacity duration-200"
            aria-label="Zia Pizza Home"
          >
            <Image
              src="/logo.png"
              alt="Zia Pizza Logo"
              width={50}
              height={50}
              className="object-contain rounded-sm flex-shrink-0 h-auto w-auto"
              priority
            />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-white font-bold text-[15px] tracking-wide leading-none">Zia Pizza</span>
              <span
                className="text-[10px] tracking-[0.14em] uppercase mt-[3px] leading-none"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                A Slice Above The Rest
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden sm:inline-flex bg-transparent border border-white/15 hover:border-white/40 text-white text-[13px] font-bold px-4 py-[9px] rounded-lg transition-colors"
            >
              Book Table
            </button>
            <Link
              href="/order"
              className="bg-primary hover:bg-primary-dark text-white text-[13px] font-bold px-5 py-[9px] rounded-lg transition-colors leading-none whitespace-nowrap"
            >
              Order Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer rounded-md hover:bg-white/[0.08] transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span className={`block w-[20px] h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-[20px] h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-[20px] h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(13, 13, 13, 0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="px-4 pb-5 pt-2 border-t border-white/[0.06] space-y-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium transition-colors duration-200 hover:text-white hover:bg-white/[0.05]"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-white/[0.06] flex gap-2">
            <button
              type="button"
              onClick={() => { setMobileOpen(false); openBooking(); }}
              className="flex-1 bg-white/5 border border-white/10 text-white text-normal3 font-bold py-2.5 rounded-lg"
            >
              Book Table
            </button>
            <Link
              href="/order"
              onClick={() => setMobileOpen(false)}
              className="flex-1 bg-primary text-white text-normal3 font-bold py-2.5 rounded-lg text-center"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
