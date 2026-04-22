import React from "react";
import ProductForm from "@/components/admin/ProductForm";
import { getLocations, ProductRecord } from "@/lib/content";

const EMPTY: ProductRecord = {
  slug: "",
  name: "",
  category: "pizzas",
  description: "",
  price: "",
  image: "",
  tags: [],
  locationSlugs: [],
};

export default function NewProductPage() {
  const locations = getLocations();
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-6">New product</h1>
      <ProductForm initial={EMPTY} mode="create" locations={locations} />
    </div>
  );
}
