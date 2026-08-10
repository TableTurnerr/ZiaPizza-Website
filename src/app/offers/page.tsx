import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import { locations } from "@/data/locations";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pizza Deals & Weekly Offers in Salisbury & Westbury",
  description: "View the current Zia Pizza offers and location-specific deals in Salisbury and Westbury.",
  pathname: "/offers",
});

export default function OffersPage() {
  const activeLocations = locations.filter((location) => !location.comingSoon);
  const breadcrumbs = createBreadcrumbJsonLd([{ name: "Home", pathname: "/" }, { name: "Offers", pathname: "/offers" }]);

  return (
    <div className="p-[10px] pb-[120px]" style={{ background: "var(--tt-bg-color)" }}>
      <JsonLd data={breadcrumbs} />
      <Header />
      <div className="h-[65px] sm:h-[80px]" />
      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[20px] text-white/40"><Link href="/" className="hover:text-white transition-colors">Home</Link><span className="mx-2">/</span><span className="text-white/70 font-medium">Offers</span></nav>
        <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-accent text-[13px] font-semibold" style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Offerte della Settimana</span></div>
        <h1 className="text-h1 italic text-white mb-3">Current Offers</h1>
        <p className="text-normal2 max-w-2xl mb-10 text-white/60">Location-specific pizza deals, family bundles and direct-order promotions. Check each offer for its stated availability.</p>

        <div className="flex flex-col gap-12">
          {activeLocations.map((location) => (
            <section key={location.slug}>
              <div className="w-8 h-px mb-5" style={{ background: "#BDA277" }} />
              <div className="flex items-end justify-between mb-5"><div><h2 className="text-h2 text-white italic">{location.name}</h2><p className="text-normal4 text-white/40 mt-0.5">{location.address}</p></div><Link href={`/${location.type}/${location.slug}`} className="text-normal4 text-accent font-semibold hover:text-white transition-colors">View location</Link></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {location.deals.map((deal, index) => (
                  <article key={`${deal.name}-${index}`} className="border border-[#EE1D27]/30 rounded-[14px] overflow-hidden flex flex-col" style={{ background: "linear-gradient(135deg, #0E1824 0%, #1a2535 100%)" }}>
                    {deal.image && <div className="relative h-[200px] overflow-hidden"><SmartImage src={deal.image} alt={deal.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />{deal.price && <div className="absolute bottom-3 right-3 bg-primary text-white text-normal2 font-bold px-3 py-1 rounded-lg">{deal.price}</div>}</div>}
                    <div className="p-5 flex flex-col flex-1"><div className="text-[13px] font-semibold uppercase mb-2" style={{ color: "#BDA277", letterSpacing: "0.08em", fontFamily: "var(--font-heading), 'Montserrat', sans-serif" }}>{deal.day}</div><h3 className="text-h3 font-semibold text-white mb-2">{deal.name}</h3><p className="text-normal3 flex-1 text-white/60">{deal.description}</p>{!deal.image && deal.price && <div className="text-h3 font-bold text-accent mt-3">{deal.price}</div>}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
