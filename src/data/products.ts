import productsData from "@/content/products.json";
import { productLongDescriptions } from "@/content/productLongDescriptions";

export type ProductCategory =
  | "pizzas"
  | "pastas"
  | "starters"
  | "desserts"
  | "drinks"
  | "dips";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  image: string;
  tags: string[];
  locationSlugs: string[];
  /** Verified editorial fields; do not populate from inference. */
  longDescription?: string;
  ingredientSummary?: string;
  allergenInfo?: string;
  dietaryInfo?: string;
  imageAlt?: string;
  primaryKeyword?: string;
  updatedAt?: string;
  /** Override the default sitemap/indexing decision when editorially reviewed. */
  indexable?: boolean;
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  image?: string;
}

export const categories: CategoryInfo[] = [
  {
    slug: "pizzas",
    name: "Stone-Baked Pizzas",
    description: "Hand-stretched, slow-proofed dough baked on stone with homemade sauce and premium toppings.",
    image: "/photos/JOE01044.webp",
  },
  {
    slug: "starters",
    name: "Starters & Sides",
    description: "Perfectly prepared starters and sides to kick off your meal.",
    image: "/products/starters/hot honey Dough Balls.webp",
  },
  {
    slug: "pastas",
    name: "Signature Pastas",
    description: "Classic Italian pasta dishes made with fresh ingredients and rich, authentic sauces.",
    image: "/products/pastas/truffle.webp",
  },
  {
    slug: "desserts",
    name: "Desserts",
    description: "Finish your meal on a sweet note with our gelato and Italian treats.",
    image: "/products/desserts/tiramisu.webp",
  },
  {
    slug: "drinks",
    name: "Drinks",
    description: "Soft drinks and refreshments to complement your meal.",
    image: "/products/drinks/Coca cola.webp",
  },
  {
    slug: "dips",
    name: "Dips & Sauces",
    description: "The perfect accompaniment for every bite.",
    image: "/products/dips/Garlic mayo.webp",
  },
];

export const products: Product[] = productsData.map((product) => {
  const longDescription = productLongDescriptions[product.slug];

  return longDescription ? { ...product, longDescription } : product;
}) as Product[];

const NON_INDEXABLE_PRODUCT_CATEGORIES: ProductCategory[] = ["drinks", "dips"];
const SIZE_VARIANT_SLUG = /^(chicken-(wings|strips)-\d+|large-bottle-)/;

/**
 * Product routes remain useful to customers, but generic add-ons and size
 * variants are deliberately kept out of the search index unless explicitly
 * approved in the CMS data.
 */
export function isProductIndexable(product: Product): boolean {
  if (typeof product.indexable === "boolean") return product.indexable;
  return (
    !NON_INDEXABLE_PRODUCT_CATEGORIES.includes(product.category) &&
    !SIZE_VARIANT_SLUG.test(product.slug)
  );
}

export function productPath(product: Pick<Product, "category" | "slug">): string {
  return `/menu/${product.category}/${product.slug}`;
}

export function getProductsByLocation(locationSlug: string): Product[] {
  return products.filter((p) => p.locationSlugs.includes(locationSlug));
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByLocationAndCategory(
  locationSlug: string,
  category: ProductCategory
): Product[] {
  return products.filter(
    (p) => p.locationSlugs.includes(locationSlug) && p.category === category
  );
}
