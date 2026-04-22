import React from "react";
import Link from "next/link";
import { getLocations } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function AdminLocationsPage() {
  const locations = getLocations();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h3 italic text-white">Locations</h1>
        <Link
          href="/admin/locations/new"
          className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-4 py-2 rounded-lg transition-colors"
        >
          + New location
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/admin/locations/${loc.slug}`}
            className="bg-white/[0.03] border border-white/10 hover:border-accent/40 rounded-[12px] p-4 flex items-center justify-between transition-colors"
          >
            <div>
              <div className="text-white font-semibold text-normal2">{loc.name}</div>
              <div className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>{loc.address}</div>
            </div>
            <div className="text-normal4 text-white/50">{loc.type}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
