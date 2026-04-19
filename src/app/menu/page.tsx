import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, products, Product, ProductCategory } from "@/data/products";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Menu | Zia Pizza",
  description: "Browse the full Zia Pizza menu — stone-baked pizzas, fresh pasta, starters, desserts and drinks.",
};

const CATEGORY_ORDER: ProductCategory[] = ["pizzas", "starters", "pastas", "desserts", "drinks", "dips"];

function orderedCategories() {
  return CATEGORY_ORDER
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories;
}

function groupByCategory() {
  const out = new Map<ProductCategory, Product[]>();
  for (const p of products) {
    const arr = out.get(p.category) ?? [];
    arr.push(p);
    out.set(p.category, arr);
  }
  return out;
}

export default function MenuPage() {
  const grouped = groupByCategory();
  const cats = orderedCategories();
  const allDeals = locations.flatMap((l) => l.deals.map((d) => ({ ...d, loc: l.name })));

  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Menu</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">Our Menu</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          Short, deliberate, and all-Italian. Every pizza is stone-baked on a 48-hour slow-proofed base.
        </p>

        {/* Deals strip */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 -mx-2 px-2">
          {allDeals.slice(0, 6).map((d, i) => (
            <div
              key={`${d.name}-${i}`}
              className="flex-shrink-0 w-[260px] bg-gradient-to-br from-primary-dark/30 to-white/[0.03] border border-primary/20 rounded-[14px] p-4"
            >
              <div className="text-accent text-normal4 font-bold tracking-wider uppercase mb-1">{d.day}</div>
              <div className="text-white font-semibold text-normal2 mb-1">{d.name}</div>
              <div className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>{d.description}</div>
              <div className="text-white/50 text-normal4 mt-2">At {d.loc}</div>
            </div>
          ))}
        </div>

        {/* Category nav */}
        <div className="sticky top-[68px] z-30 bg-[#0D0D0D]/90 backdrop-blur-md -mx-[10px] px-[10px] sm:-mx-[40px] sm:px-[40px] md:-mx-[70px] md:px-[70px] lg:-mx-[80px] lg:px-[80px] py-3 border-y border-white/[0.06] mb-10">
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="flex-shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-normal3 font-semibold px-4 py-2 rounded-full transition-colors"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>

        {cats.map((cat) => {
          const items = grouped.get(cat.slug) ?? [];
          if (items.length === 0) return null;
          return (
            <section key={cat.slug} id={cat.slug} className="mb-[60px] scroll-mt-[140px]">
              <h2 className="text-h3 italic text-white mb-2">{cat.name}</h2>
              <p className="text-normal3 max-w-2xl mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
                {cat.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p) => (
                  <div key={p.slug} className="bg-white/5 border border-white/10 rounded-[14px] overflow-hidden flex flex-col">
                    <div className="relative h-[180px]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-normal2 font-semibold text-white">{p.name}</h3>
                        <span className="text-primary-light font-bold text-normal2 whitespace-nowrap">{p.price}</span>
                      </div>
                      <p className="text-normal4 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>{p.description}</p>
                      {p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tags.map((t) => (
                            <span key={t} className="bg-white/5 text-white/70 text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
