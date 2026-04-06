export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  image: string;
  tags: string[];
  locationSlugs: string[]; // which locations serve this
}

export type ProductCategory =
  | "pizzas"
  | "pastas"
  | "starters"
  | "desserts"
  | "drinks"
  | "dips";

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    slug: "pizzas",
    name: "Stone-Baked Pizzas",
    description:
      "Hand-stretched, slow-proofed dough baked on stone with homemade sauce and premium toppings.",
  },
  {
    slug: "pastas",
    name: "Signature Pastas",
    description:
      "Classic Italian pasta dishes made with fresh ingredients and rich, authentic sauces.",
  },
  {
    slug: "starters",
    name: "Street Bites & Starters",
    description:
      "Perfectly prepared starters and sides to kick off your meal.",
  },
  {
    slug: "desserts",
    name: "Desserts",
    description:
      "Finish your meal on a sweet note with our gelato and Italian treats.",
  },
  {
    slug: "drinks",
    name: "Drinks",
    description: "Soft drinks and refreshments to complement your meal.",
  },
  {
    slug: "dips",
    name: "Dips & Sauces",
    description: "The perfect accompaniment for every bite.",
  },
];

export const products: Product[] = [
  // Pizzas
  {
    slug: "margherita",
    name: "Classic Margherita",
    category: "pizzas",
    description:
      "San Marzano tomato sauce, fior di latte mozzarella, fresh basil, and extra virgin olive oil on our signature stone-baked base. Simple, timeless, perfection.",
    price: "\u00A38.95",
    image: "/photos/JOE01015.jpeg",
    tags: ["vegetarian", "classic"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "pepperoni",
    name: "Pepperoni",
    category: "pizzas",
    description:
      "Loaded with spicy pepperoni slices over our homemade tomato sauce and melted mozzarella. A timeless favourite with a kick.",
    price: "\u00A310.95",
    image: "/photos/JOE01020.jpeg",
    tags: ["popular", "spicy"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "bbq-chicken",
    name: "BBQ Chicken",
    category: "pizzas",
    description:
      "Smoky BBQ base with tender chicken pieces, red onion, mixed peppers, and mozzarella. A crowd favourite with a bold, sweet-smoky flavour.",
    price: "\u00A311.95",
    image: "/photos/JOE01024.jpeg",
    tags: ["popular"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "meat-feast",
    name: "Meat Feast",
    category: "pizzas",
    description:
      "For the meat lovers. Pepperoni, ham, chicken, beef, and sausage piled high on tomato sauce with melted mozzarella.",
    price: "\u00A312.95",
    image: "/photos/JOE01044.jpeg",
    tags: ["popular"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "vegetarian-supreme",
    name: "Vegetarian Supreme",
    category: "pizzas",
    description:
      "Roasted peppers, mushrooms, red onion, sweetcorn, olives, and fresh tomato on a bed of mozzarella and tomato sauce.",
    price: "\u00A310.95",
    image: "/photos/JOE01048.jpeg",
    tags: ["vegetarian"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "calzone",
    name: "Calzone",
    category: "pizzas",
    description:
      "Folded pizza pocket stuffed with ham, mushrooms, mozzarella, and ricotta, baked until golden. Served with a side of marinara sauce.",
    price: "\u00A311.95",
    image: "/photos/JOE01050.jpeg",
    tags: ["signature"],
    locationSlugs: ["salisbury", "trowbridge"],
  },
  {
    slug: "truffle-pizza",
    name: "Truffle & Mushroom",
    category: "pizzas",
    description:
      "White truffle cream base with sauteed wild mushrooms, mozzarella, parmesan shavings, and rocket. An indulgent gourmet experience.",
    price: "\u00A313.95",
    image: "/photos/JOE01090.jpeg",
    tags: ["gourmet", "vegetarian"],
    locationSlugs: ["salisbury", "trowbridge"],
  },
  {
    slug: "half-roast-chicken",
    name: "Half Roast Chicken",
    category: "pizzas",
    description:
      "Succulent half roast chicken served with your choice of side. Slow-roasted to perfection with Mediterranean herbs.",
    price: "\u00A312.95",
    image: "/photos/JOE00788.jpeg",
    tags: ["signature"],
    locationSlugs: ["salisbury", "trowbridge"],
  },

  // Pastas
  {
    slug: "bolognese",
    name: "Spaghetti Bolognese",
    category: "pastas",
    description:
      "Rich, slow-cooked beef ragout served over perfectly al dente spaghetti, finished with a dusting of parmesan.",
    price: "\u00A310.95",
    image: "/products/pastas/Bolognese.jpg",
    tags: ["classic"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "carbonara",
    name: "Carbonara",
    category: "pastas",
    description:
      "Creamy egg and parmesan sauce tossed with crispy pancetta and spaghetti. A Roman classic done right.",
    price: "\u00A311.95",
    image: "/products/pastas/carbonara.jpg",
    tags: ["classic", "popular"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "chicken-alfredo",
    name: "Chicken Alfredo",
    category: "pastas",
    description:
      "Tender grilled chicken in a velvety alfredo cream sauce with penne pasta, finished with cracked black pepper.",
    price: "\u00A311.95",
    image: "/products/pastas/Chicken Alfredo.jpg",
    tags: ["popular"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "lasagne",
    name: "Lasagne Al Forno",
    category: "pastas",
    description:
      "Layers of pasta, rich beef ragu, creamy bechamel sauce, and melted mozzarella, baked until golden and bubbling.",
    price: "\u00A311.95",
    image: "/products/pastas/Lasagne Al Forno.jpg",
    tags: ["classic"],
    locationSlugs: ["salisbury", "trowbridge"],
  },
  {
    slug: "truffle-pasta",
    name: "Truffle Pasta",
    category: "pastas",
    description:
      "Tagliatelle in a luxurious truffle cream sauce with sauteed mushrooms and parmesan. Pure indulgence.",
    price: "\u00A313.95",
    image: "/products/pastas/truffle.jpg",
    tags: ["gourmet"],
    locationSlugs: ["salisbury", "trowbridge"],
  },

  // Starters
  {
    slug: "garlic-dough-balls",
    name: "Garlic Dough Balls",
    category: "starters",
    description:
      "Soft, pillowy dough balls baked with garlic butter. Served with a rich marinara dipping sauce.",
    price: "\u00A35.95",
    image: "/products/starters/Garlic Dough Balls.jpg",
    tags: ["vegetarian", "popular"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "hot-honey-dough-balls",
    name: "Hot Honey Dough Balls",
    category: "starters",
    description:
      "Our signature dough balls drizzled with hot honey and a pinch of chilli flakes. Sweet heat at its best.",
    price: "\u00A36.95",
    image: "/products/starters/hot honey Dough Balls.jpg",
    tags: ["spicy", "signature"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "classic-fries",
    name: "Classic Fries",
    category: "starters",
    description:
      "Golden, crispy fries seasoned with sea salt. The perfect side to any meal.",
    price: "\u00A33.95",
    image: "/products/starters/Classic Fries.jpg",
    tags: ["vegetarian", "vegan"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },

  // Desserts
  {
    slug: "gelato-chocolate",
    name: "Chocolate Gelato",
    category: "desserts",
    description:
      "Rich, velvety Italian chocolate gelato made with real cocoa. A decadent finish to any meal.",
    price: "\u00A34.50",
    image: "/products/desserts/gelato-chocolate.jpg",
    tags: ["vegetarian"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "gelato-strawberry",
    name: "Strawberry Gelato",
    category: "desserts",
    description:
      "Smooth, fruity gelato bursting with real strawberry flavour. Light, refreshing, and naturally delicious.",
    price: "\u00A34.50",
    image: "/products/desserts/gelato-strawberry.jpg",
    tags: ["vegetarian"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "gelato-tiramisu",
    name: "Tiramisu Gelato",
    category: "desserts",
    description:
      "The classic Italian dessert reimagined as gelato. Coffee, mascarpone, and a hint of cocoa in every spoonful.",
    price: "\u00A34.50",
    image: "/products/desserts/gelato-thiramisu.jpg",
    tags: ["signature"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "gelato-vanilla",
    name: "Vanilla Gelato",
    category: "desserts",
    description:
      "Silky smooth vanilla gelato made with real vanilla bean. A timeless classic that pairs with everything.",
    price: "\u00A34.50",
    image: "/products/desserts/gelato-vanilla.jpg",
    tags: ["vegetarian"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "profiteroles-chocolate",
    name: "Chocolate Profiteroles",
    category: "desserts",
    description:
      "Light choux pastry puffs filled with cream and drizzled with rich Belgian chocolate sauce.",
    price: "\u00A35.95",
    image: "/products/desserts/profiteroles-chocolate.jpg",
    tags: ["popular"],
    locationSlugs: ["salisbury", "trowbridge"],
  },
  {
    slug: "profiteroles-lemon",
    name: "Lemon Profiteroles",
    category: "desserts",
    description:
      "Delicate profiteroles filled with zesty lemon cream and finished with a light citrus glaze.",
    price: "\u00A35.95",
    image: "/products/desserts/profiteroles-lemon.jpg",
    tags: [],
    locationSlugs: ["salisbury", "trowbridge"],
  },
  {
    slug: "profiteroles-pistachio",
    name: "Pistachio Profiteroles",
    category: "desserts",
    description:
      "Choux pastry puffs filled with pistachio cream and topped with crushed pistachios. A nutty delight.",
    price: "\u00A35.95",
    image: "/products/desserts/profiteroles-pistachio.jpg",
    tags: ["gourmet"],
    locationSlugs: ["salisbury", "trowbridge"],
  },

  // Drinks
  {
    slug: "coca-cola",
    name: "Coca Cola",
    category: "drinks",
    description: "The classic refreshment. Served chilled.",
    price: "\u00A32.50",
    image: "/products/drinks/Coca cola.jpg",
    tags: [],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "diet-coke",
    name: "Diet Coke",
    category: "drinks",
    description: "All the taste, zero sugar. Refreshingly crisp.",
    price: "\u00A32.50",
    image: "/products/drinks/Diet coke.jpg",
    tags: [],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "fanta",
    name: "Fanta Orange",
    category: "drinks",
    description: "Bright and bubbly with a burst of orange flavour.",
    price: "\u00A32.50",
    image: "/products/drinks/Fanta.jpg",
    tags: [],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "sprite",
    name: "Sprite",
    category: "drinks",
    description: "Crisp, clear, and refreshingly lemon-lime.",
    price: "\u00A32.50",
    image: "/products/drinks/Sprite.jpg",
    tags: [],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },

  // Dips
  {
    slug: "garlic-mayo",
    name: "Garlic Mayo",
    category: "dips",
    description:
      "Creamy garlic mayonnaise, perfect for dipping fries or drizzling on pizza.",
    price: "\u00A30.75",
    image: "/products/dips/Garlic mayo.jpg",
    tags: ["vegetarian"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "bbq-dip",
    name: "BBQ Sauce",
    category: "dips",
    description: "Sweet, smoky BBQ sauce. A classic companion to any meal.",
    price: "\u00A30.75",
    image: "/products/dips/bbq.jpg",
    tags: ["vegan"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "truffle-mayo",
    name: "Truffle Mayo",
    category: "dips",
    description:
      "Luxurious truffle-infused mayonnaise for the gourmet touch.",
    price: "\u00A31.25",
    image: "/products/dips/Truffle mayo.jpg",
    tags: ["gourmet"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
  {
    slug: "hot-chilli",
    name: "Hot Chilli Sauce",
    category: "dips",
    description: "Fiery chilli sauce for those who like it hot.",
    price: "\u00A30.75",
    image: "/products/dips/Hot chilli.jpg",
    tags: ["spicy", "vegan"],
    locationSlugs: ["salisbury", "westbury", "trowbridge"],
  },
];

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
