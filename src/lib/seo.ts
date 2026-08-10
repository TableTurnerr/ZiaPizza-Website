import type { Metadata } from "next";

export const SITE_URL = "https://ziapizza.co.uk";
export const SITE_NAME = "Zia Pizza";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Zia Pizza",
  type = "website",
  robots,
}: PageMetadataOptions): Metadata {
  const pageTitle = `${title} | ${SITE_NAME}`;
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: pathname },
    robots,
    openGraph: {
      title: pageTitle,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: "en_GB",
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; pathname: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}
