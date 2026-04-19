import locationsData from "@/content/locations.json";

export interface Deal {
  day: string;
  name: string;
  description: string;
  price?: string;
}

export type LocationType = "zia-pizza" | "zia-pizza-express";

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
  city: string;
  postcode: string;
  postcodePrefixes: string[];
  address: string;
  phone: string;
  email: string;
  hours: string;
  openTime: string;
  closeTime: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  instagram: string;
  facebook: string;
  orderUrl: string;
  justEat?: string;
  uberEats?: string;
  deliveroo?: string;
  mapEmbed: string;
  deals: Deal[];
}

export interface LocationTypeInfo {
  slug: LocationType;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

export const locationTypes: LocationTypeInfo[] = [
  {
    slug: "zia-pizza",
    name: "Zia Pizza Restaurant",
    tagline: "Our flagship Italian dining experience",
    description:
      "Full-service Italian restaurants serving hand-stretched, stone-baked pizzas alongside a complete menu of pasta, steak, and more. Dine in, take away, or order delivery.",
    icon: "pizza",
  },
  {
    slug: "zia-pizza-express",
    name: "Zia Pizza Express",
    tagline: "Quick, authentic pizza on the go",
    description:
      "Fast-casual pizza outlets built for speed without compromising on quality. The same stone-baked goodness, optimised for takeaway and delivery.",
    icon: "bolt",
  },
];

export const locations: Location[] = locationsData as Location[];

export function getLocationsByType(type: LocationType): Location[] {
  return locations.filter((l) => l.type === type);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationType(slug: string): LocationTypeInfo | undefined {
  return locationTypes.find((t) => t.slug === slug);
}

export function findLocationByPostcode(postcode: string): Location | undefined {
  const normalised = postcode.replace(/\s+/g, "").toUpperCase();
  return locations.find((loc) =>
    loc.postcodePrefixes.some((prefix) =>
      normalised.startsWith(prefix.replace(/\s+/g, "").toUpperCase())
    )
  );
}

export function isLocationOpen(loc: Location, now: Date = new Date()): boolean {
  const [openH, openM] = loc.openTime.split(":").map(Number);
  const [closeH, closeM] = loc.closeTime.split(":").map(Number);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const openMin = openH * 60 + openM;
  const closeMin = closeH * 60 + closeM;
  return minutesNow >= openMin && minutesNow <= closeMin;
}
