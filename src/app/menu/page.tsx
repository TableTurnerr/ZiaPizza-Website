import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import { categories, products, Product, ProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Pizza Menu | Stone-Baked Italian Pizzas, Pasta & More | Zia Pizza",
  description: "Browse the full Zia Pizza menu — stone-baked pizzas on a 48-hour slow-proofed base, fresh pasta, starters, desserts and drinks. Available at Salisbury and Westbury.",
  alternates: { canonical: "https://ziapizza.co.uk/menu" },
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
  return (
    <div className="p-[10px] pb-[120px]" style={{ background: "var(--tt-bg-color)" }}>
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <div className="text-normal4 mb-[20px] text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70 font-medium">Menu</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-accent text-[13px] font-semibold"
            style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Il Menu
          </span>
        </div>
        <h1 className="text-h1 italic text-white mb-3">Our Menu</h1>
        <p className="text-normal2 max-w-2xl mb-10 text-white/60">
          Short, deliberate, and all-Italian. Every pizza is stone-baked on a 48-hour slow-proofed base.
        </p>

        {/* Category nav */}
        <div
          className="sticky top-[68px] z-30 backdrop-blur-md -mx-[10px] px-[10px] sm:-mx-[40px] sm:px-[40px] md:-mx-[70px] md:px-[70px] lg:-mx-[80px] lg:px-[80px] py-3 border-y border-white/[0.08] mb-10"
          style={{ background: "rgba(14,24,36,0.95)" }}
        >
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="flex-shrink-0 bg-white/[0.05] hover:bg-primary hover:text-white border border-white/10 text-white text-normal4 font-semibold px-4 py-2 rounded-full transition-colors"
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
              {/* Gold rule separator per brand Section 08 */}
              <div className="w-8 h-px mb-4" style={{ background: "#BDA277" }} />
              <h2 className="text-h2 italic text-white mb-2">{cat.name}</h2>
              <p className="text-normal3 max-w-2xl mb-6 text-white/60">
                {cat.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p) => (
                  <div key={p.slug} className="bg-white/[0.04] border border-white/10 rounded-[14px] overflow-hidden flex flex-col">
                    <div className="relative h-[180px]">
                      <SmartImage src={p.image} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1824]/80 to-transparent" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-normal2 font-bold text-white">{p.name}</h3>
                        <span className="text-accent font-bold text-normal2 whitespace-nowrap">{p.price}</span>
                      </div>
                      <p className="text-normal4 flex-1 text-white/60 leading-relaxed">{p.description}</p>
                      {p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tags.map((t) => (
                            <span key={t} className="bg-white/[0.06] text-white/60 text-[11px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border border-white/10">
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
