import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Contact Zia Pizza | Get In Touch",
  description:
    "Reach out to Zia Pizza Salisbury or Westbury — reservations, feedback, or general enquiries.",
  alternates: { canonical: "https://ziapizza.co.uk/contact" },
};

export default function ContactPage() {
  const activeLocations = locations.filter((l) => !l.comingSoon);

  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Contact</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">Get in touch</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          For table bookings, please use the Book Table button. For everything else, drop us a line.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />

          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-6">
              <h2 className="text-h5 text-white font-semibold mb-3">General</h2>
              <p className="text-normal3 mb-1.5" style={{ color: "var(--tt-color-text-gray)" }}>
                <a href="mailto:info@ziapizza.com" className="hover:text-white transition-colors">info@ziapizza.com</a>
              </p>
            </div>
            {activeLocations.map((loc) => (
              <div key={loc.slug} className="bg-white/5 border border-white/10 rounded-[16px] p-6">
                <h2 className="text-h5 text-white font-semibold mb-1">{loc.name}</h2>
                <p className="text-normal3 mb-1.5" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</p>
                <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
                  <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{loc.phone}</a>
                  {" · "}
                  <a href={`mailto:${loc.email}`} className="hover:text-white transition-colors">{loc.email}</a>
                </p>
                <p className="text-normal4 text-white/50 mt-2">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
