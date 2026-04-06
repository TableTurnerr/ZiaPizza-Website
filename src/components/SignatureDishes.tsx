import React from "react";
import Link from "next/link";
import { products } from "@/data/products";

const featured = products
  .filter((p) => p.category === "pizzas" || p.category === "pastas" || p.category === "starters")
  .slice(0, 8);

export default function SignatureDishes() {
  return (
    <section id="dishes" className="w-full px-4 sm:px-8 lg:px-16 py-20">
      <div className="text-center mb-12">
        <p className="text-accent text-normal3 font-semibold tracking-wider uppercase mb-2">
          Our Menu
        </p>
        <h2 className="text-h3 sm:text-h2 font-semibold italic">
          Signature Dishes
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {featured.map((product) => (
          <Link
            key={product.slug}
            href={`/zia-pizza/salisbury/menu/${product.slug}`}
            className="group bg-navy-card border border-navy-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300"
          >
            <div className="relative h-36 sm:h-44 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-card/80 to-transparent" />
              {product.tags.includes("popular") && (
                <span className="absolute top-3 right-3 bg-accent/90 text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-normal3 sm:text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate">
                {product.name}
              </h3>
              <p className="text-normal3 text-accent font-semibold">
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
