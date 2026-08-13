import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import CateringQuoteForm from "@/components/CateringQuoteForm";

export const metadata: Metadata = {
  title: "Catering & Corporate Orders",
  alternates: { canonical: "/catering" },
  description:
    "Freshly prepared food for businesses, meetings, events and group gatherings from Zia Pizza.",
};

const SERVICES = [
  {
    title: "Office Lunches",
    body: "Keep your team fuelled with freshly prepared food delivered directly to your workplace. Perfect for team lunches, staff meetings, training days, office celebrations and workplace events. Available for one-off orders or regular deliveries.",
  },
  {
    title: "Corporate Catering",
    body: "Professional catering solutions for corporate events, conferences, workshops, networking events, staff appreciation days, business launches and client meetings.",
  },
  {
    title: "Group Orders",
    body: "Perfect for birthday parties, family gatherings, sports teams, community groups, charity events and private celebrations. Suitable for groups from 10 to 100+ guests.",
  },
  {
    title: "Corporate Accounts",
    body: "Priority ordering, dedicated account support, scheduled deliveries, weekly office lunch programmes, flexible ordering solutions and corporate invoicing.",
  },
];

const REASONS = [
  "48-Hour Fermented Dough",
  "Stone-Baked Fresh to Order",
  "Authentic Fior di Latte Mozzarella",
  "Premium Italian Ingredients",
  "Authentic Italian Recipes",
  "Professional & Reliable Service",
  "Flexible Group Ordering Solutions",
  "Delivery Available",
  "Suitable for Small & Large Groups",
  "Corporate Accounts Available",
];

export default function CateringPage() {
  return (
    <div className="p-[10px] pb-[80px] md:pb-[10px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Catering</span>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 lg:gap-12 items-center mb-[70px]">
            <div>
              <p className="text-accent text-normal4 font-bold tracking-wider uppercase mb-3">
                Freshly Prepared Food for Businesses, Meetings, Events &amp; Group Gatherings
              </p>
              <h1 className="text-h2 sm:text-h1 italic text-white mb-5">Zia Pizza &ndash; Catering &amp; Corporate Orders</h1>
              <div className="space-y-5 text-normal1 leading-[1.7] max-w-3xl" style={{ color: "var(--tt-color-text-gray)" }}>
                <p>At Zia Pizza, we believe great catering starts with great ingredients.</p>
                <p>
                  Our signature stone-baked pizzas are crafted using our 48-hour fermented dough, premium Italian ingredients
                  and authentic Fior di Latte mozzarella, delivering exceptional flavour and quality for every occasion.
                </p>
                <p>
                  Whether you&apos;re organising a team lunch, business meeting, training day, staff celebration or private
                  event, Zia Pizza offers reliable catering and group ordering solutions designed to make hosting simple while
                  impressing your guests.
                </p>
              </div>
            </div>

            <div className="relative h-[340px] sm:h-[460px] lg:h-[540px] rounded-[18px] overflow-hidden border border-white/10">
              <SmartImage
                src="/photos/JOE01044.webp"
                alt="Zia Pizza catering"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 44vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-[70px]">
            {SERVICES.map((service) => (
              <article key={service.title} className="bg-white/5 border border-white/10 rounded-[14px] p-6">
                <h2 className="text-h5 text-white italic mb-3">{service.title}</h2>
                <p className="text-normal3 leading-[1.65]" style={{ color: "var(--tt-color-text-gray)" }}>{service.body}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 mb-[70px]">
            <div>
              <h2 className="text-h3 italic text-white mb-4">The Zia Difference</h2>
              <p className="text-normal1 leading-[1.7]" style={{ color: "var(--tt-color-text-gray)" }}>
                Unlike standard takeaway catering, every Zia Pizza is prepared using our signature 48-hour fermented dough
                and stone-baked fresh to order. Combined with premium Italian ingredients and authentic Fior di Latte
                mozzarella, our food delivers the quality, flavour and consistency expected from a true Italian pizzeria.
              </p>
            </div>

            <div>
              <h2 className="text-h3 italic text-white mb-4">Why Choose Zia Pizza Catering?</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REASONS.map((reason) => (
                  <li key={reason} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-normal3 text-white">
                    <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-[16px] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-10 items-start">
              <div>
                <p className="text-accent text-normal4 font-bold tracking-wider uppercase mb-2">Request a Quote</p>
                <h2 className="text-h3 italic text-white mb-3">Request a Quote</h2>
                <p className="text-normal3 leading-[1.7]" style={{ color: "var(--tt-color-text-gray)" }}>
                  Name, Company Name (Optional), Email Address, Telephone Number, Event Date, Number of Guests, Order Type,
                  Delivery Address and Additional Requirements.
                </p>
              </div>

              <CateringQuoteForm />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
