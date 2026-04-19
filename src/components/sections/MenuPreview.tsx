import React from "react";
import Link from "next/link";
import { categories } from "@/data/products";

const PREVIEW_CATEGORIES = ["pizzas", "starters", "pastas", "desserts"] as const;

export default function MenuPreviewSection() {
  const cats = PREVIEW_CATEGORIES
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories;

  return (
    <section
      id="MenuPreview"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3 justify-center">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          Il Nostro Menu
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 text-center mb-3 italic">
        Our Menu
      </h2>
      <p className="text-normal2 text-center max-w-xl mx-auto mb-[44px]" style={{ color: "var(--tt-color-text-gray)" }}>
        Short, deliberate, and all-Italian. Browse the categories or open the full menu.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {cats.map((cat) => (
          <Link
            key={cat.slug}
            href={`/menu#${cat.slug}`}
            className="group relative h-[200px] sm:h-[240px] rounded-[16px] overflow-hidden border border-white/10 hover:border-accent/40 transition-colors"
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-h5 text-white font-semibold">{cat.name}</h3>
              <p className="text-normal4 line-clamp-2" style={{ color: "var(--tt-color-text-gray)" }}>
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 border-2 border-white/15 hover:border-accent text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          View Full Menu
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
