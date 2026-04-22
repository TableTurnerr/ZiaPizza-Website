import React from "react";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getLocations, getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProducts().find((p) => p.slug === slug);
  if (!product) notFound();
  const locations = getLocations();
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-1">Edit product</h1>
      <div className="text-normal4 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>{product.slug}</div>
      <ProductForm initial={product} mode="edit" locations={locations} />
    </div>
  );
}
