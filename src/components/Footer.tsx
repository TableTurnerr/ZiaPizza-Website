"use client";

import React from "react";
import Image from "next/image";

const Footer = ({
  scrollToSection,
}: {
  scrollToSection?: (sectionId: string) => void;
}) => (
  <footer
    className="w-full px-[10px] md:px-[50px] lg:px-[70px] pb-[20px] sm:pb-[10px]"
    style={{ background: "var(--tt-bg-color)" }}
  >
    {/* Top divider */}
    <div className="w-full h-px bg-white/[0.07] mb-[48px]" />
    <div className="text-white text-h3 sm:text-h2 w-full">Zia Pizza</div>
    <div
      className="mb-[32px] mx-2 text-normal2"
      style={{ color: "var(--tt-color-text-gray)" }}
    >
      More than a restaurant &mdash; it&rsquo;s a legacy of love, stone, and
      flavour. Born in a sunlit kitchen in Naples and reborn in the heart of
      Wiltshire, we exist to revive community pubs and fill them with Italian
      warmth, great food, and honest value. Whether you&rsquo;re grabbing a
      quick slice, sitting down for a family meal, or enjoying a pint at the
      pub, Zia Pizza has you covered. Come hungry, leave happy.
    </div>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[100px] lg:grid-cols-3 gap-[10px] lg:gap-8">
        {/* Logo and Social Icons */}
        <div className="col-span-2 lg:col-span-1 mx-auto flex flex-row items-center lg:items-start gap-4">
          <Image
            src="/logo/logo.png"
            alt="Zia Pizza Logo"
            width={100}
            height={100}
            className="object-contain w-auto h-[200px] md:h-[230px] aspect-square rounded-full"
          />
          <div className="flex h-[120px] justify-evenly gap-[10px] flex-col my-auto max-w-100">
            <a
              href="https://instagram.com/ziapizza.salisbury"
              aria-label="Instagram"
              className="min-w-[100px] p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-all"
              style={{
                background:
                  "color-mix(in oklab, var(--color-white) 5%, transparent)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in oklab, black 30%, transparent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in oklab, var(--color-white) 5%, transparent)")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                <defs>
                  <linearGradient
                    id="insta-gradient"
                    x1="0"
                    y1="0"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#f9ce34" />
                    <stop offset="50%" stopColor="#ee2a7b" />
                    <stop offset="100%" stopColor="#6228d7" />
                  </linearGradient>
                </defs>
                <path
                  d="M15.9287 0H6.07107C2.72349 0 0 2.72362 0 6.07121V15.9288C0 19.2765 2.72349 22 6.07107 22H15.9287C19.2765 22 22 19.2764 22 15.9288V6.07121C22.0001 2.72362 19.2765 0 15.9287 0ZM20.0482 15.9288C20.0482 18.2002 18.2002 20.0481 15.9288 20.0481H6.07107C3.79979 20.0482 1.95195 18.2002 1.95195 15.9288V6.07121C1.95195 3.79992 3.79979 1.95195 6.07107 1.95195H15.9287C18.2001 1.95195 20.0481 3.79992 20.0481 6.07121V15.9288H20.0482Z"
                  fill="currentColor"
                  className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                />
                <path
                  d="M10.9999 5.33008C7.87405 5.33008 5.33105 7.87307 5.33105 10.9989C5.33105 14.1246 7.87405 16.6675 10.9999 16.6675C14.1257 16.6675 16.6687 14.1246 16.6687 10.9989C16.6687 7.87307 14.1257 5.33008 10.9999 5.33008ZM10.9999 14.7154C8.95048 14.7154 7.283 13.0482 7.283 10.9988C7.283 8.94925 8.95035 7.28189 10.9999 7.28189C13.0494 7.28189 14.7168 8.94925 14.7168 10.9988C14.7168 13.0482 13.0493 14.7154 10.9999 14.7154Z"
                  fill="currentColor"
                  className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                />
                <path
                  d="M16.9065 3.67773C16.5305 3.67773 16.161 3.82999 15.8954 4.09675C15.6285 4.36222 15.4751 4.73179 15.4751 5.10916C15.4751 5.48537 15.6287 5.85481 15.8954 6.12157C16.1609 6.38704 16.5305 6.54059 16.9065 6.54059C17.2839 6.54059 17.6522 6.38704 17.9189 6.12157C18.1857 5.85481 18.338 5.48524 18.338 5.10916C18.338 4.73179 18.1857 4.36222 17.9189 4.09675C17.6535 3.82999 17.2839 3.67773 16.9065 3.67773Z"
                  fill="currentColor"
                  className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/19tVr2C1Gy/"
              aria-label="Facebook"
              className="p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-all"
              style={{
                background:
                  "color-mix(in oklab, var(--color-white) 5%, transparent)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in oklab, black 30%, transparent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in oklab, var(--color-white) 5%, transparent)")
              }
            >
              <svg
                height="22"
                width="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                <path
                  fill="currentColor"
                  className="fill-opacity-60 group-hover:fill-[#1877F2] group-hover:fill-opacity-100 transition-all"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 flex flex-row justify-evenly w-full mb-8 lg:mb-0">
          {/* Contact Us */}
          <div className="col-span-1 text-center h-full lg:mr-10 mr-0">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="text-h5 font-semibold mb-[22px] text-[var(--white)]">
                Contact Us
              </div>
              <div
                className="text-normal4"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                <div className="flex flex-col items-center">
                  <a
                    href="tel:01722433829"
                    className="mb-[10px] hover:text-primary hover:underline cursor-pointer transition-colors"
                  >
                    01722 433829
                  </a>
                  <a
                    href="mailto:info@ziapizza.com"
                    className="hover:text-primary hover:underline cursor-pointer transition-colors"
                  >
                    info@ziapizza.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div className="col-span-1 text-center h-full">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="text-h5 text-[var(--white)] font-semibold mb-[22px]">
                Quick Links
              </div>
              <div
                className="text-normal4"
                style={{ color: "var(--tt-color-text-gray)" }}
              >
                <div className="text-center grid grid-cols-2 gap-[10px]">
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("Home")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">Home</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("Menu")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">Menu</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("Reviews")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">Reviews</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("Pillars")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">Our Brands</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("FAQs")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">FAQ&apos;s</span>
                  </button>
                  <button
                    onClick={() =>
                      scrollToSection && scrollToSection("Locations")
                    }
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="hover:underline">Locations</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="h-[48px]" />
    {/* Bottom Bar */}
    <div className="w-full h-px bg-white/[0.07] mb-[20px]" />
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
      <p>© Zia Pizza 2025. All Rights Reserved.</p>
      <p className="text-nowrap">
        Made with{" "}
        <a
          target="_blank"
          href="http://tableturnerr.com"
          className="hover:text-white hover:underline cursor-pointer transition-colors"
          rel="noopener noreferrer"
        >
          TableTurnerr.com
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
