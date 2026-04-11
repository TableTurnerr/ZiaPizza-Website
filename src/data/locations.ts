export interface Location {
  slug: string;
  name: string;
  type: LocationType;
  address: string;
  phone: string;
  email: string;
  hours: string;
  description: string;
  image: string;
  instagram: string;
  facebook: string;
  orderUrl: string;
  justEat?: string;
  uberEats?: string;
  deliveroo?: string;
  mapEmbed: string;
  deals: Deal[];
}

export interface Deal {
  day: string;
  name: string;
  description: string;
  price?: string;
}

export type LocationType = "zia-pizza" | "zia-pizza-express";

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
    name: "Zia Pizza",
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

export const locations: Location[] = [
  {
    slug: "salisbury",
    name: "Zia Pizza Salisbury",
    type: "zia-pizza",
    address: "46 Silver St, Salisbury, SP1 2NE",
    phone: "01722 433829",
    email: "salisbury@ziapizza.com",
    hours: "12:30 PM - 10:30 PM (Mon-Sun)",
    description:
      "At Zia Pizza Salisbury, every pizza is crafted with passion and precision. From classic Margherita to gourmet specialties, we use only the finest ingredients to ensure every bite is bursting with authentic Italian flavour.",
    image: "/photos/JOE00551.jpeg",
    instagram: "https://instagram.com/ziapizza.salisbury",
    facebook: "https://www.facebook.com/share/19tVr2C1Gy/",
    orderUrl: "https://ziapizza.food-order.net/en?code=RENMV0lX",
    justEat: "https://www.just-eat.co.uk/restaurants-zia-pizza-salisbury/menu",
    uberEats:
      "https://www.ubereats.com/gb/store/zia-pizza-salisbury/ZKw0-eTvTOuXhb6bwZkLyg",
    deliveroo:
      "https://deliveroo.co.uk/menu/Salisbury/salisbury/zia-pizza-salisbury-46-silver-street",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.5!2d-1.7946!3d51.0693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA0JzA5LjUiTiAxwrA0NycyMy4yIlc!5e0!3m2!1sen!2suk!4v1",
    deals: [
      {
        day: "Monday",
        name: "Monday Funday",
        description: "Carlsberg & Thatchers Gold at just \u00A32.95/pint",
      },
      {
        day: "Tuesday",
        name: "Burger & Drink",
        description: "Any burger with one drink",
        price: "\u00A314.95",
      },
      {
        day: "Wednesday",
        name: "Italian Buffet",
        description: "Unlimited pizza & pasta buffet, 6-9 PM",
        price: "\u00A316.90",
      },
      {
        day: "Thursday",
        name: "Steak Night",
        description: "Sirloin steak with chips & salad, 5:30-9:30 PM",
        price: "\u00A319.95",
      },
      {
        day: "Friday",
        name: "Kids Eat for \u00A31",
        description: "Kids dine for just \u00A31 with a full-price adult main",
      },
      {
        day: "Sunday",
        name: "Sunday Roast",
        description: "Traditional Sunday roast served until sold out",
        price: "from \u00A314.95",
      },
    ],
  },
  {
    slug: "westbury",
    name: "Zia Pizza Express Westbury",
    type: "zia-pizza-express",
    address: "15 Palomino Pl, Westbury BA13 3SD",
    phone: "+44 1373 865271",
    email: "westbury@ziapizza.com",
    hours: "12:30 PM - 10:30 PM (Mon-Sun)",
    description:
      "Welcome to Zia Pizza Express Westbury, where authentic Italian flavour meets local charm. Crafted from fresh ingredients, hand-stretched dough, and time-honoured Italian recipes.",
    image: "/photos/JOE00574.jpeg",
    instagram: "https://instagram.com/ziapizzaexpress_westbury",
    facebook: "https://www.facebook.com/share/1CkvTGuMtM/",
    orderUrl: "https://ziapizza.food-order.net/en?code=SUdQS1lF",
    justEat: "https://www.just-eat.co.uk/restaurants-ziapizza-ba13/menu",
    uberEats:
      "https://www.ubereats.com/gb/store/zia-pizza-15-palomino-pl/LTFu_grXQcW0Qb7VSyYmQw",
    deliveroo:
      "https://deliveroo.co.uk/menu/Bath/westbury-leigh/zia-pizza-westbury-15-palomino-pl",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.5!2d-2.1813!3d51.2601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE1JzM2LjQiTiAywrAxMCc1Mi43Ilc!5e0!3m2!1sen!2suk!4v1",
    deals: [
      {
        day: "Every Day",
        name: "BOGO Pizza",
        description: "Buy 1, Get 1 Free on all pizzas (equal or lesser value)",
      },
      {
        day: "Every Day",
        name: "50% Off 2nd Pizza",
        description: "Buy one pizza, get the second at half price",
      },
    ],
  },
];

export function getLocationsByType(type: LocationType): Location[] {
  return locations.filter((l) => l.type === type);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationType(slug: string): LocationTypeInfo | undefined {
  return locationTypes.find((t) => t.slug === slug);
}
