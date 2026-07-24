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
          className="text-accent text-[13px] font-semibold"
          style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          Il Nostro Menu
        </span>
      </div>
      <h2 className="text-[#1A1F2E] text-h3 sm:text-h2 text-center mb-2 italic">
        Our Menu
      </h2>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-[#1A1F2E] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Zia Pizza Westbury
        </span>
      </div>
      <p className="text-normal2 text-center max-w-xl mx-auto mb-[44px]" style={{ color: "#767570" }}>
        Stone-baked and all-Italian. Salisbury menu coming soon.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {cats.map((cat) => (
          <Link
            key={cat.slug}
            href={`/zia-pizza-express/westbury/menu#${cat.slug}`}
            className="group relative h-[200px] sm:h-[240px] rounded-[16px] overflow-hidden border border-[#E8E2D9] hover:border-accent transition-colors"
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
          href="/zia-pizza-express/westbury/menu"
          className="inline-flex items-center gap-2 border-2 border-[#BDA277] hover:border-accent text-[#1A1F2E] text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
        >
          View Westbury Menu
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
