import React from "react";
import Link from "next/link";
import { products } from "@/data/products";

const featured = products
  .filter(
    (p) =>
      p.category === "pizzas" ||
      p.category === "pastas" ||
      p.category === "starters"
  )
  .slice(0, 8);

export default function SignatureDishes() {
  return (
    <div className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
      <div
        className="text-accent text-[20px] sm:text-[22px] text-center mb-2"
        style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
      >
        Il Nostro Menu
      </div>
      <h2 className="text-h3 sm:text-h2 text-center mb-[30px] italic">
        Signature Dishes
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px] max-w-6xl mx-auto">
        {featured.map((product) => (
          <Link
            key={product.slug}
            href={`/zia-pizza/salisbury/menu/${product.slug}`}
            className="dish-card group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden"
          >
            <div className="relative h-[140px] sm:h-[180px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {product.tags.includes("popular") && (
                <span className="absolute top-3 right-3 bg-accent/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h3
                className="text-normal3 sm:text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate"
                style={{ fontFamily: "var(--default-font-family)" }}
              >
                {product.name}
              </h3>
              <p className="text-normal3 text-accent font-bold">
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
