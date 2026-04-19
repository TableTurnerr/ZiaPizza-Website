import siteData from "@/content/site.json";

export interface SiteCopy {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subtext: string;
    image: string;
  };
  loyalty: {
    heading: string;
    body: string;
    perks: string[];
    appStoreUrl: string;
    playStoreUrl: string;
  };
  crossBrand: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  about: {
    headline: string;
    body: string;
  };
  footer: {
    legal: string;
    tagline: string;
  };
}

export const site = siteData as SiteCopy;
