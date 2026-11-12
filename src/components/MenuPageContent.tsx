"use client";

import React, { useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import MenuCategoryNav from "@/components/MenuCategoryNav";
import type { Product, CategoryInfo } from "@/data/products";
import { productPath } from "@/data/products";
import { salisburyMenuSections, type SalisburyMenuSection, type SalisburyMenuItem } from "@/data/salisburyMenu";

type Location = "westbury" | "salisbury";

const LOCATIONS: { id: Location; label: string; city: string }[] = [
  { id: "westbury", label: "Westbury", city: "Westbury, BA13" },
  { id: "salisbury", label: "Salisbury", city: "Salisbury, SP1" },
];

const TAG_ICONS: Record<string, string> = {
  vegetarian: "V",
  vegan: "Ve",
  "gluten-free": "GF",
  spicy: "🌶",
  signature: "★",
  popular: "♥",
  kids: "🧒",
};

function SalisburyItemCard({ item }: { item: SalisburyMenuItem }) {
  const hasTags = item.tags && item.tags.length > 0;

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-[14px] p-5 flex flex-col gap-3 hover:border-accent/40 transition-colors">
      {item.note && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent/80 border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full self-start">
          {item.note}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-normal2 font-bold text-white leading-snug">{item.name}</h3>
        <span className="text-accent font-bold text-normal2 whitespace-nowrap flex-shrink-0">{item.price}</span>
      </div>
      <p className="text-normal4 text-white/60 leading-relaxed flex-1">{item.description}</p>
      {hasTags && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {item.tags!.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60"
            >
              {TAG_ICONS[tag] ? `${TAG_ICONS[tag]} ${tag}` : tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SalisburySection({ section }: { section: SalisburyMenuSection }) {
  return (
    <section id={section.id} className="mb-[60px] scroll-mt-[140px]">
      <div className="w-8 h-px mb-4" style={{ background: "#BDA277" }} />
      <h2 className="text-h2 italic text-white mb-2">{section.name}</h2>
      {section.note && (
        <p className="text-normal4 text-white/50 mb-6 max-w-2xl leading-relaxed whitespace-pre-line border-l-2 pl-3" style={{ borderColor: "#BDA277" }}>
          {section.note}
        </p>
      )}
      {!section.note && <div className="mb-6" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <SalisburyItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

function SalisburyMenuNav() {
  const [active, setActive] = useState(salisburyMenuSections[0]?.id ?? "");

  React.useEffect(() => {
    const sections = salisburyMenuSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: [0, 0.1, 0.25] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Salisbury menu sections"
      className="sticky top-[68px] z-30 -mx-[10px] mb-10 border-y border-white/[0.08] px-[10px] py-3 backdrop-blur-md sm:-mx-[40px] sm:px-[40px] md:-mx-[70px] md:px-[70px] lg:-mx-[80px] lg:px-[80px]"
      style={{ background: "rgba(14,24,36,0.95)" }}
    >
      <div className="flex gap-2 overflow-x-auto">
        {salisburyMenuSections.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-normal4 font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-white/[0.05] text-white hover:border-accent/60 hover:bg-primary hover:text-white"
              }`}
            >
              {section.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

type Props = {
  westburyCategories: CategoryInfo[];
  westburyGrouped: Record<string, Product[]>;
};

export default function MenuPageContent({ westburyCategories, westburyGrouped }: Props) {
  const [location, setLocation] = useState<Location>("westbury");

  return (
    <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
      <nav aria-label="Breadcrumb" className="text-normal4 mb-[20px] text-white/40">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-white/70 font-medium">Menu</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-accent text-[13px] font-semibold" style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Il Menu</span>
      </div>
      <h1 className="text-h1 italic text-white mb-3">Our Menu</h1>
      <p className="text-normal2 max-w-2xl mb-6 text-white/60">
        Browse the menu for your nearest Zia Pizza. Select a location to see what&apos;s available.
      </p>

      {/* Location picker */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {LOCATIONS.map((loc) => {
          const isActive = location === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setLocation(loc.id)}
              className={`flex flex-col items-start px-5 py-3 rounded-xl border transition-all duration-200 ${
                isActive
                  ? "border-accent bg-accent/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              <span className="text-[14px] font-bold leading-tight">{loc.label}</span>
              <span className={`text-[12px] leading-tight ${isActive ? "text-accent" : "text-white/40"}`}>{loc.city}</span>
            </button>
          );
        })}
      </div>

      {/* Westbury menu */}
      {location === "westbury" && (
        <>
          <MenuCategoryNav categories={westburyCategories} />
          {westburyCategories.map((category) => {
            const items = westburyGrouped[category.slug] ?? [];
            if (items.length === 0) return null;
            return (
              <section key={category.slug} id={category.slug} className="mb-[60px] scroll-mt-[140px]">
                <div className="w-8 h-px mb-4" style={{ background: "#BDA277" }} />
                <h2 className="text-h2 italic text-white mb-2">{category.name}</h2>
                <p className="text-normal3 max-w-2xl mb-6 text-white/60">{category.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((product) => (
                    <Link
                      key={product.slug}
                      href={productPath(product)}
                      className="group bg-white/[0.04] border border-white/10 rounded-[14px] overflow-hidden flex flex-col hover:border-accent/40 transition-colors"
                    >
                      <div className="relative h-[230px] overflow-hidden bg-[#2b2b2b]">
                        <SmartImage
                          src={product.image}
                          alt={product.imageAlt ?? product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full transform-gpu object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
                        />
                        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0E1824]/90 via-[#0E1824]/25 to-transparent" />
                        {product.tags.length > 0 && (
                          <div className="absolute left-3 top-3 z-[2] flex max-w-[calc(100%-24px)] flex-wrap gap-1.5">
                            {product.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-normal2 font-bold text-white group-hover:text-accent transition-colors">{product.name}</h3>
                          <span className="text-accent font-bold text-normal2 whitespace-nowrap">{product.price}</span>
                        </div>
                        <p className="text-normal4 flex-1 text-white/60 leading-relaxed">{product.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* Salisbury menu */}
      {location === "salisbury" && (
        <>
          <div className="mb-6 p-4 rounded-xl border border-accent/20 bg-accent/5 flex gap-3 items-start max-w-2xl">
            <span className="text-accent text-xl flex-shrink-0">🍽</span>
            <div>
              <p className="text-white font-semibold text-normal3 mb-0.5">Dine-in Restaurant Menu</p>
              <p className="text-white/55 text-normal4 leading-relaxed">
                This is the full dine-in menu at Zia Pizza Salisbury, 46 Silver Street. To order online for collection or delivery, visit our{" "}
                <Link href="/order" className="text-accent hover:underline">online ordering page</Link>.
              </p>
            </div>
          </div>
          <SalisburyMenuNav />
          {salisburyMenuSections.map((section) => (
            <SalisburySection key={section.id} section={section} />
          ))}
        </>
      )}
    </main>
  );
}
