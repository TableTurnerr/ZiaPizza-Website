import React from "react";
import Link from "next/link";
import { products } from "@/data/products";

const FEATURED_SLUGS = ["garlic-dough-balls", "hot-honey-pepperoni", "loaded-fries", "tiramisu"];

function pickFeatured() {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const picked = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(Boolean) as typeof products;
  if (picked.length >= 4) return picked;
  const popular = products.filter((p) => p.tags.includes("popular"));
  const extras = popular.filter((p) => !picked.includes(p)).slice(0, 4 - picked.length);
  return [...picked, ...extras];
}

export default function FeaturedProductsSection() {
  const featured = pickFeatured();

  return (
    <section
      id="Featured"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3 justify-center">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          I Favoriti
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 text-center mb-3 italic">
        Customer Favourites
      </h2>
      <p className="text-normal2 text-center max-w-xl mx-auto mb-[44px]" style={{ color: "var(--tt-color-text-gray)" }}>
        The dishes our regulars order on repeat.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {featured.map((p) => (
          <div
            key={p.slug}
            className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden flex flex-col"
          >
            <div className="relative h-[160px] sm:h-[200px] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {p.tags.includes("popular") && (
                <span className="absolute top-3 right-3 bg-accent/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col gap-1 flex-1">
              <h3 className="text-normal2 font-semibold text-white">{p.name}</h3>
              <p className="text-normal4 line-clamp-2 flex-1" style={{ color: "var(--tt-color-text-gray)" }}>
                {p.description}
              </p>
              <div className="text-primary-light font-bold text-normal2 mt-1">{p.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Order Now
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
