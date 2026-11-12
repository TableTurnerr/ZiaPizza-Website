import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MenuPageContent from "@/components/MenuPageContent";
import { categories, products, type Product, type ProductCategory } from "@/data/products";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pizza Menu | Stone-Baked Italian Pizzas, Pasta & More",
  description: "Browse the Zia Pizza menu, including stone-baked pizzas, pasta, starters, desserts and drinks in Salisbury and Westbury.",
  pathname: "/menu",
});

const CATEGORY_ORDER: ProductCategory[] = ["pizzas", "starters", "pastas", "desserts", "drinks", "dips"];

function orderedCategories() {
  return CATEGORY_ORDER
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories;
}

function groupByLocation(locationSlug: string): Record<string, Product[]> {
  const groups: Record<string, Product[]> = {};
  for (const product of products) {
    if (!product.locationSlugs.includes(locationSlug)) continue;
    if (!groups[product.category]) groups[product.category] = [];
    groups[product.category].push(product);
  }
  return groups;
}

export default function MenuPage() {
  const westburyCategories = orderedCategories();
  const westburyGrouped = groupByLocation("westbury");

  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", pathname: "/" },
    { name: "Menu", pathname: "/menu" },
  ]);

  return (
    <div className="p-[10px] pb-[120px]" style={{ background: "var(--tt-bg-color)" }}>
      <JsonLd data={breadcrumbs} />
      <Header />
      <div className="h-[65px] sm:h-[80px]" />
      <MenuPageContent
        westburyCategories={westburyCategories}
        westburyGrouped={westburyGrouped}
      />
      <Footer />
    </div>
  );
}
