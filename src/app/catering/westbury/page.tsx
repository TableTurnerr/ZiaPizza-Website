"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WHATSAPP_URL = `https://wa.me/441373865271?text=${encodeURIComponent(
  "Hi Zia Pizza Westbury, I am interested in catering. My event date is [date], and I expect approximately [number] guests. Please send me your catering options."
)}`;

const packages = [
  {
    name: "Pizza Party",
    description: "Multiple stone-baked pizzas with varied toppings. Perfect for casual gatherings.",
    includes: ["Choice of 4 pizzas", "Garlic dough balls", "Paper plates & napkins"],
    icon: "🍕",
  },
  {
    name: "Pizza & Sides",
    description: "Pizzas with fries, dough balls and a selection of dipping sauces.",
    includes: ["Choice of 3 pizzas", "Classic or loaded fries", "3 dipping sauces"],
    icon: "🍟",
  },
  {
    name: "Complete Italian Feast",
    description: "The full spread — pizza, pasta, sides, desserts and drinks for a memorable event.",
    includes: ["Pizzas & pasta", "Sides & desserts", "Soft drinks included"],
    icon: "🇮🇹",
  },
  {
    name: "Custom Package",
    description: "Tell us your guest count and budget and we'll build a bespoke menu for your event.",
    includes: ["Fully tailored menu", "Dietary options catered for", "Quote within 1 working day"],
    icon: "✨",
  },
];

const occasions = [
  { icon: "💼", label: "Office Lunches" },
  { icon: "🎂", label: "Birthday Parties" },
  { icon: "👨‍👩‍👧‍👦", label: "Family Celebrations" },
  { icon: "🎉", label: "Children's Parties" },
  { icon: "🏫", label: "Schools & Clubs" },
  { icon: "🎊", label: "Community Events" },
];

const steps = [
  { number: "01", title: "Submit your requirements", body: "Fill in the quick enquiry form or message us on WhatsApp with your event date, guest count and location." },
  { number: "02", title: "Receive your quotation", body: "We'll confirm the menu, pricing, delivery or collection options and any dietary requirements within one working day." },
  { number: "03", title: "Confirm and deposit", body: "Confirm your menu selection. A deposit may be required for larger orders." },
  { number: "04", title: "Collect or receive delivery", body: "Freshly prepared in Westbury and ready at the agreed time. Sit back and enjoy the food." },
];

const whyUs = [
  { title: "Freshly prepared in Westbury", body: "Every order is made fresh to order at our Palomino Place kitchen." },
  { title: "Authentic stone-baked pizza", body: "The same quality you get dining in — slow-proofed dough on stone." },
  { title: "Flexible group sizes", body: "We cater for groups of 10 and above. No event too big or small." },
  { title: "Collection or scheduled delivery", body: "Pick up from us or have it delivered to your venue at a set time." },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function CateringWestburyPage() {
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", eventDate: "", guests: "",
    deliveryType: "collection", postcode: "", budget: "", dietary: "", message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/catering-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="p-[10px]">
      <Header />
      <div className="h-[68px]" />

      {/* 01 HERO */}
      <section className="relative min-h-[520px] flex items-center rounded-[20px] overflow-hidden mb-[60px]">
        <img
          src="/photos/JOE01044.webp"
          alt="Catering for parties, offices and events"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1824] via-[#0E1824]/80 to-[#0E1824]/20" />
        <div className="relative z-10 pl-8 sm:pl-14 lg:pl-20 pr-6 py-16 max-w-[620px]">
          <span className="inline-flex items-center gap-2 mb-4 text-accent text-[13px] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Zia Pizza Westbury · Catering
          </span>
          <h1 className="text-h2 sm:text-hero text-white font-bold leading-[1.05] mb-4">
            Catering Made Easy<br />
            <span className="text-primary italic">with Zia Pizza</span>
          </h1>
          <p className="text-normal2 mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
            Stone-baked pizzas, handmade pasta, sides and desserts — freshly prepared for your party, office lunch or special event.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#enquiry" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-normal2 px-7 py-3.5 rounded-xl transition-colors">
              Get My Catering Quote
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white text-normal2 px-5 py-3.5 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.847L0 24l6.335-1.56A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.214-3.726.917.979-3.63-.235-.373A9.818 9.818 0 1112 21.818z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] space-y-[80px]">

        {/* 02 OCCASIONS */}
        <section>
          <div className="text-center mb-10">
            <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Occasions</span>
            <h2 className="text-h3 sm:text-h2 text-white mt-2 italic">We Cater For Every Event</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((o) => (
              <div key={o.label} className="flex flex-col items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-[16px] p-5 text-center">
                <span className="text-3xl">{o.icon}</span>
                <span className="text-normal3 font-medium text-white">{o.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 03 PACKAGE PREVIEWS */}
        <section>
          <div className="text-center mb-10">
            <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Packages</span>
            <h2 className="text-h3 sm:text-h2 text-white mt-2 italic">Choose Your Package</h2>
            <p className="text-normal2 mt-3 max-w-xl mx-auto" style={{ color: "var(--tt-color-text-gray)" }}>
              All packages are priced on request. We'll confirm pricing once we know your guest count, menu and delivery requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-6 flex flex-col">
                <span className="text-3xl mb-3">{pkg.icon}</span>
                <h3 className="text-h5 font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-normal3 mb-4 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>{pkg.description}</p>
                <ul className="space-y-1.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-normal4 text-white/70">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-normal4 mt-6" style={{ color: "var(--tt-color-text-gray)" }}>
            Pricing confirmed once food, delivery costs and guest count are agreed. Minimum 10 guests.
          </p>
        </section>

        {/* 04 WHY CHOOSE US */}
        <section>
          <div className="text-center mb-10">
            <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Why Zia</span>
            <h2 className="text-h3 sm:text-h2 text-white mt-2 italic">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w) => (
              <div key={w.title} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-6">
                <h3 className="text-normal1 font-bold text-white mb-2">{w.title}</h3>
                <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 HOW IT WORKS */}
        <section>
          <div className="text-center mb-10">
            <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Process</span>
            <h2 className="text-h3 sm:text-h2 text-white mt-2 italic">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.number} className="relative bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-6">
                <span className="text-[40px] font-bold text-white/[0.06] leading-none block mb-3">{s.number}</span>
                <h3 className="text-normal1 font-bold text-white mb-2">{s.title}</h3>
                <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 06 QUICK ENQUIRY FORM */}
        <section id="enquiry" className="scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-accent text-[13px] font-bold tracking-widest uppercase">Enquire</span>
              <h2 className="text-h3 sm:text-h2 text-white mt-2 italic">Get Your Catering Quote</h2>
              <p className="text-normal2 mt-3" style={{ color: "var(--tt-color-text-gray)" }}>
                Complete in under a minute. We aim to respond within one working day.
              </p>
            </div>

            {formState === "success" ? (
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-h4 text-white mb-2">Enquiry Received!</h3>
                <p className="text-normal2 mb-2" style={{ color: "var(--tt-color-text-gray)" }}>
                  Thanks for getting in touch. This is not yet a confirmed booking.
                </p>
                <p className="text-normal3 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
                  We'll respond within one working day.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-normal2 px-5 py-3 rounded-xl transition-colors">
                    WhatsApp for urgent enquiries
                  </a>
                  <a href="tel:01373865271" className="text-accent hover:underline self-center text-normal3">
                    Call 01373 865271
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-7 sm:p-10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Name *</label>
                    <input required name="name" value={form.name} onChange={update} placeholder="Your full name"
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Mobile number *</label>
                    <input required name="mobile" value={form.mobile} onChange={update} type="tel" placeholder="07700 000000"
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-normal4 font-medium text-white/70 mb-1.5">Email address *</label>
                  <input required name="email" value={form.email} onChange={update} type="email" placeholder="your@email.com"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Event date *</label>
                    <input required name="eventDate" value={form.eventDate} onChange={update} type="date"
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Number of guests *</label>
                    <input required name="guests" value={form.guests} onChange={update} type="number" min="10" placeholder="e.g. 30"
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Collection or delivery? *</label>
                    <select required name="deliveryType" value={form.deliveryType} onChange={update}
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 focus:outline-none focus:border-primary/60 transition-colors">
                      <option value="collection">Collection from Westbury</option>
                      <option value="delivery">Delivery to venue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-normal4 font-medium text-white/70 mb-1.5">Event postcode *</label>
                    <input required name="postcode" value={form.postcode} onChange={update} placeholder="e.g. BA13 3SD"
                      className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-normal4 font-medium text-white/70 mb-1.5">Estimated budget <span className="text-white/40">(optional)</span></label>
                  <input name="budget" value={form.budget} onChange={update} placeholder="e.g. £300"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                </div>
                <div>
                  <label className="block text-normal4 font-medium text-white/70 mb-1.5">Dietary requirements <span className="text-white/40">(optional)</span></label>
                  <input name="dietary" value={form.dietary} onChange={update} placeholder="e.g. 2 vegetarian, 1 gluten-free"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors" />
                </div>
                <div>
                  <label className="block text-normal4 font-medium text-white/70 mb-1.5">Additional message <span className="text-white/40">(optional)</span></label>
                  <textarea name="message" value={form.message} onChange={update} rows={3} placeholder="Anything else we should know?"
                    className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-normal3 placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors resize-none" />
                </div>

                {formState === "error" && (
                  <p className="text-primary text-normal4">Something went wrong. Please try WhatsApp or call us instead.</p>
                )}

                <button type="submit" disabled={formState === "submitting"}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold text-normal2 py-4 rounded-xl transition-colors">
                  {formState === "submitting" ? "Sending…" : "Get My Catering Quote"}
                </button>

                <p className="text-center text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
                  This is an enquiry only — not a confirmed booking. We aim to respond within one working day.
                </p>
              </form>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-normal3 hover:text-white transition-colors" style={{ color: "var(--tt-color-text-gray)" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.847L0 24l6.335-1.56A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.214-3.726.917.979-3.63-.235-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
                WhatsApp the Westbury team
              </a>
              <span className="text-white/20 hidden sm:block">·</span>
              <a href="tel:01373865271" className="text-normal3 text-accent hover:underline">Call 01373 865271</a>
            </div>
          </div>
        </section>

        {/* 07 TRUST */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "📍", title: "Westbury based", body: "Prepared fresh at 15 Palomino Pl, Westbury BA13 3SD." },
            { icon: "⭐", title: "Loved locally", body: "Hundreds of happy customers across Westbury and Wiltshire." },
            { icon: "🚐", title: "Delivery coverage", body: "Delivery available across the BA13 and surrounding areas." },
            { icon: "🌿", title: "Allergen aware", body: "We cater for vegetarian, vegan and gluten-free diets. Ask us about allergens." },
          ].map((t) => (
            <div key={t.title} className="bg-white/[0.04] border border-white/[0.08] rounded-[20px] p-6">
              <span className="text-3xl block mb-3">{t.icon}</span>
              <h3 className="text-normal1 font-bold text-white mb-2">{t.title}</h3>
              <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{t.body}</p>
            </div>
          ))}
        </section>

        {/* 08 FINAL CTA */}
        <section className="relative rounded-[24px] overflow-hidden text-center py-16 px-6">
          <img src="/photos/JOE01044.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0E1824]/80" />
          <div className="relative z-10">
            <h2 className="text-h3 sm:text-h2 text-white italic mb-3">Let Us Take Care of the Food</h2>
            <p className="text-normal2 max-w-xl mx-auto mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
              Focus on your guests. We'll handle everything from the kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#enquiry" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-normal2 px-7 py-3.5 rounded-xl transition-colors">
                Get My Catering Quote
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white text-normal2 px-5 py-3.5 rounded-xl transition-colors">
                WhatsApp the Westbury Team
              </a>
            </div>
          </div>
        </section>

      </div>

      <div className="h-[80px]" />
      <Footer />
    </div>
  );
}
