import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MenuCategoryNav from "@/components/MenuCategoryNav";
import SmartImage from "@/components/SmartImage";
import { categories, products, Product, ProductCategory, productPath } from "@/data/products";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pizza Menu | Stone-Baked Italian Pizzas, Pasta & More",
  description: "Browse the Zia Pizza menu, including stone-baked pizzas, pasta, starters, desserts and drinks in Salisbury and Westbury.",
  pathname: "/menu",
});

const CATEGORY_ORDER: ProductCategory[] = ["pizzas", "starters", "pastas", "desserts", "drinks", "dips"];

function orderedCategories() {
  return CATEGORY_ORDER.map((slug) => categories.find((category) => category.slug === slug)).filter(Boolean) as typeof categories;
}

function groupByCategory() {
  const groups = new Map<ProductCategory, Product[]>();
  for (const product of products) {
    groups.set(product.category, [...(groups.get(product.category) ?? []), product]);
  }
  return groups;
}

export default function MenuPage() {
  const grouped = groupByCategory();
  const menuCategories = orderedCategories();
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", pathname: "/" },
    { name: "Menu", pathname: "/menu" },
  ]);

  return (
    <div className="p-[10px] pb-[120px]" style={{ background: "var(--tt-bg-color)" }}>
      <JsonLd data={breadcrumbs} />
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[20px] text-white/40"><Link href="/" className="hover:text-white transition-colors">Home</Link><span className="mx-2">/</span><span className="text-white/70 font-medium">Menu</span></nav>
        <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-accent text-[13px] font-semibold" style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Il Menu</span></div>
        <h1 className="text-h1 italic text-white mb-3">Our Menu</h1>
        <p className="text-normal2 max-w-2xl mb-10 text-white/60">Browse the current Zia Pizza menu. Select an item for its description and the locations where it is available.</p>

        <MenuCategoryNav categories={menuCategories} />

        {menuCategories.map((category) => {
          const items = grouped.get(category.slug) ?? [];
          if (items.length === 0) return null;
          return (
            <section key={category.slug} id={category.slug} className="mb-[60px] scroll-mt-[140px]">
              <div className="w-8 h-px mb-4" style={{ background: "#BDA277" }} />
              <h2 className="text-h2 italic text-white mb-2">{category.name}</h2>
              <p className="text-normal3 max-w-2xl mb-6 text-white/60">{category.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((product) => (
                  <Link key={product.slug} href={productPath(product)} className="group bg-white/[0.04] border border-white/10 rounded-[14px] overflow-hidden flex flex-col hover:border-accent/40 transition-colors">
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
                    <div className="p-4 flex-1 flex flex-col"><div className="flex items-start justify-between gap-2 mb-1.5"><h3 className="text-normal2 font-bold text-white group-hover:text-accent transition-colors">{product.name}</h3><span className="text-accent font-bold text-normal2 whitespace-nowrap">{product.price}</span></div><p className="text-normal4 flex-1 text-white/60 leading-relaxed">{product.description}</p></div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
