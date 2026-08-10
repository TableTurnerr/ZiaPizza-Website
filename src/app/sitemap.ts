import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blog";
import { locations } from "@/data/locations";
import { isProductIndexable, productPath, products } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE_URL}/menu`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/offers`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE_URL}/locations`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/catering`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/loyalty`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${SITE_URL}/order`, priority: 0.5, changeFrequency: "monthly" },
  ];
  const activeLocations = locations.filter((location) => !location.comingSoon);
  const locationRoutes: MetadataRoute.Sitemap = activeLocations.flatMap((location) => [
    { url: `${SITE_URL}/${location.type}/${location.slug}`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/${location.type}/${location.slug}/menu`, priority: 0.8, changeFrequency: "weekly" as const },
  ]);
  const productRoutes: MetadataRoute.Sitemap = products
    .filter(isProductIndexable)
    .map((product) => ({
      url: `${SITE_URL}${productPath(product)}`,
      ...(product.updatedAt ? { lastModified: product.updatedAt } : {}),
      priority: product.tags.includes("signature") || product.tags.includes("popular") ? 0.7 : 0.6,
      changeFrequency: "monthly" as const,
    }));
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.date,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
  return [...staticRoutes, ...locationRoutes, ...productRoutes, ...blogRoutes];
}
