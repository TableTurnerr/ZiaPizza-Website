import productsData from "@/content/products.json";

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
    image: "/photos/JOE01015.jpeg",
  },
  {
    slug: "starters",
    name: "Starters & Sides",
    description: "Perfectly prepared starters and sides to kick off your meal.",
    image: "/products/starters/Garlic Dough Balls.jpg",
  },
  {
    slug: "pastas",
    name: "Signature Pastas",
    description: "Classic Italian pasta dishes made with fresh ingredients and rich, authentic sauces.",
    image: "/products/pastas/carbonara.jpg",
  },
  {
    slug: "desserts",
    name: "Desserts",
    description: "Finish your meal on a sweet note with our gelato and Italian treats.",
    image: "/products/desserts/gelato-thiramisu.jpg",
  },
  {
    slug: "drinks",
    name: "Drinks",
    description: "Soft drinks and refreshments to complement your meal.",
    image: "/products/drinks/Coca cola.jpg",
  },
  {
    slug: "dips",
    name: "Dips & Sauces",
    description: "The perfect accompaniment for every bite.",
    image: "/products/dips/Garlic mayo.jpg",
  },
];

export const products: Product[] = productsData as Product[];

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
