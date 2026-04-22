import React from "react";
import { notFound } from "next/navigation";
import LocationForm from "@/components/admin/LocationForm";
import { getLocations } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocations().find((l) => l.slug === slug);
  if (!loc) notFound();
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-1">Edit location</h1>
      <div className="text-normal4 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>{loc.slug}</div>
      <LocationForm initial={loc} mode="edit" />
    </div>
  );
}
