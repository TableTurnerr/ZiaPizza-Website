import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { products } from "@/data/products";

const BASE = "https://ziapizza.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/menu`, lastModified: new Date(), priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/offers`, lastModified: new Date(), priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/locations`, lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/contact`, lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, lastModified: new Date(), priority: 0.6, changeFrequency: "weekly" },
    { url: `${BASE}/order`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
  ];

  const activeLocations = locations.filter((l) => !l.comingSoon);

  const locationRoutes: MetadataRoute.Sitemap = activeLocations.flatMap((loc) => [
    {
      url: `${BASE}/${loc.type}/${loc.slug}`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      url: `${BASE}/${loc.type}/${loc.slug}/menu`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
  ]);

  const productRoutes: MetadataRoute.Sitemap = activeLocations.flatMap((loc) =>
    products
      .filter((p) => p.locationSlugs.includes(loc.slug))
      .map((p) => ({
        url: `${BASE}/${loc.type}/${loc.slug}/menu/${p.slug}`,
        lastModified: new Date(),
        priority: 0.6,
        changeFrequency: "monthly" as const,
      }))
  );

  return [...staticRoutes, ...locationRoutes, ...productRoutes];
}
