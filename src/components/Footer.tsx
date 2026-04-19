"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { locations } from "@/data/locations";

const FOOTER_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Locations", href: "/locations" },
  { label: "Offers", href: "/offers" },
  { label: "Loyalty", href: "/loyalty" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer
    className="w-full px-[10px] md:px-[50px] lg:px-[70px] pb-[20px] sm:pb-[10px] pt-[40px]"
    style={{ background: "var(--tt-bg-color)" }}
  >
    <div className="w-full h-px bg-white/[0.07] mb-[48px]" />

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/logo/logo.png"
            alt="Zia Pizza"
            width={56}
            height={56}
            className="object-contain rounded-full"
          />
          <div>
            <div className="text-white font-bold text-h5 italic">Zia Pizza</div>
            <div className="text-[11px] tracking-[0.14em] uppercase mt-0.5" style={{ color: "var(--tt-color-text-gray)" }}>
              A Slice Above The Rest
            </div>
          </div>
        </div>
        <p className="text-normal3 max-w-md" style={{ color: "var(--tt-color-text-gray)" }}>
          {site.footer.tagline}
        </p>
        <div className="flex gap-2 mt-5">
          {locations.map((loc) => (
            <a
              key={loc.slug}
              href={loc.instagram}
              aria-label={`${loc.name} Instagram`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-normal4 text-white/80"
            >
              @{loc.city.toLowerCase()}
            </a>
          ))}
        </div>
      </div>

      <div>
        <div className="text-white font-semibold text-normal2 mb-3">Explore</div>
        <ul className="flex flex-col gap-2">
          {FOOTER_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-normal3 hover:text-white transition-colors"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-white font-semibold text-normal2 mb-3">Our Locations</div>
        <ul className="flex flex-col gap-3">
          {locations.map((loc) => (
            <li key={loc.slug}>
              <Link
                href={`/${loc.type}/${loc.slug}`}
                className="block text-normal3 hover:text-white transition-colors"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                <span className="block text-white font-semibold">{loc.name}</span>
                <span className="block text-normal4">{loc.address}</span>
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="block text-normal4 mt-0.5 hover:text-primary transition-colors"
                >
                  {loc.phone}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="h-[40px]" />
    <div className="w-full h-px bg-white/[0.07] mb-[16px]" />
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-normal4 max-w-7xl mx-auto" style={{ color: "var(--tt-color-text-gray)" }}>
      <p>© Zia Pizza {new Date().getFullYear()}. All rights reserved.</p>
      <p className="text-center">{site.footer.legal}</p>
      <p className="text-nowrap">
        Made with{" "}
        <a
          target="_blank"
          href="http://tableturnerr.com"
          className="hover:text-white hover:underline transition-colors"
          rel="noopener noreferrer"
        >
          TableTurnerr.com
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
