import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-8 lg:px-16 pt-16 pb-6 bg-navy">
      {/* Top section */}
      <div className="text-h3 sm:text-h2 font-semibold text-white mb-4">
        Zia Pizza
      </div>
      <p className="text-normal2 text-gray-400 max-w-3xl mb-10">
        More than a restaurant &mdash; it&rsquo;s a legacy of love, stone, and
        flavour. Born in a sunlit kitchen in Naples and reborn in the heart of
        Wiltshire, we exist to revive community pubs and fill them with Italian
        warmth, great food, and honest value.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Logo & Social */}
        <div className="flex items-start gap-4">
          <Image
            src="/logo/logo.png"
            alt="Zia Pizza"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2 mt-2">
            <a
              href="https://instagram.com/ziapizza.salisbury"
              target="_blank"
              rel="noopener noreferrer"
              className="text-normal3 text-gray-400 hover:text-accent transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/19tVr2C1Gy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-normal3 text-gray-400 hover:text-accent transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-h5 font-semibold text-white mb-4">Locations</h4>
          <div className="flex flex-col gap-2 text-normal3 text-gray-400">
            <Link
              href="/zia-pizza/salisbury"
              className="hover:text-white transition-colors"
            >
              Salisbury
            </Link>
            <Link
              href="/zia-pizza-express/westbury"
              className="hover:text-white transition-colors"
            >
              Westbury
            </Link>
            <Link
              href="/country-pubs/trowbridge"
              className="hover:text-white transition-colors"
            >
              Trowbridge
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-h5 font-semibold text-white mb-4">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2 text-normal3 text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/#pillars"
              className="hover:text-white transition-colors"
            >
              Our Brands
            </Link>
            <Link
              href="/#dishes"
              className="hover:text-white transition-colors"
            >
              Menu
            </Link>
            <Link href="/#cta" className="hover:text-white transition-colors">
              Order Online
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-h5 font-semibold text-white mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-normal3 text-gray-400">
            <a
              href="mailto:info@ziapizza.com"
              className="hover:text-accent transition-colors"
            >
              info@ziapizza.com
            </a>
            <a
              href="tel:01722433829"
              className="hover:text-accent transition-colors"
            >
              01722 433829
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary-dark rounded-full text-white py-3 px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center text-normal4 gap-2">
          <p className="hidden sm:block">
            Zia Pizza 2025. All Rights Reserved
          </p>
          <p>
            Made with{" "}
            <a
              target="_blank"
              href="http://tableturnerr.com"
              className="hover:underline"
              rel="noopener noreferrer"
            >
              <u>TableTurnerr.com</u>
            </a>
          </p>
        </div>
      </div>
      <p className="block sm:hidden w-full text-center text-[10px] mt-2 text-gray-500">
        Zia Pizza 2025. All Rights Reserved
      </p>
    </footer>
  );
}
