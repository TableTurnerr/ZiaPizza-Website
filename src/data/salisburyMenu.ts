export interface SalisburyMenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
  note?: string;
}

export interface SalisburyMenuSection {
  id: string;
  name: string;
  note?: string;
  items: SalisburyMenuItem[];
}

export const salisburyMenuSections: SalisburyMenuSection[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      {
        name: "Marinated Olives",
        description: "A selection of mixed olives marinated in garlic and extra virgin Italian olive oil.",
        price: "£4.75",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "Antipasto di Terra",
        description: "A fine selection of Italian cured meats with bread, dips, extra virgin olive oil, and marinated olives.",
        price: "£13.95",
        note: "To Share",
      },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    items: [
      {
        name: "Bruschetta al Pomodoro",
        description: "Toasted bread topped with chopped tomatoes marinated in olive oil, pesto, red onion, and garlic.",
        price: "£7.45",
        tags: ["vegetarian"],
      },
      {
        name: "Bruschetta al Pollo",
        description: "Toasted bread topped with marinated chicken, roasted sweet peppers, onions, and chopped parsley.",
        price: "£8.45",
      },
      {
        name: "Caprese Tricolore",
        description: "Slices of fresh mozzarella cheese layered with ripe tomatoes, garnished with basil and a drizzle of olive oil.",
        price: "£7.95",
        tags: ["vegetarian"],
      },
      {
        name: "Calamari Fritti",
        description: "Crispy squid, deep-fried and served with fresh homemade lemon tartar sauce.",
        price: "£8.45",
      },
      {
        name: "Pâté della Zia",
        description: "Homemade chicken liver pâté served with house chutney and artisan crusty bread.",
        price: "£8.00",
      },
      {
        name: "Parmigiana Toscana",
        description: "Traditional Tuscan-style fried aubergine layered with a rich Napoletana sauce and 30-month-aged Parmigiano Reggiano cheese. Gluten-free and vegan options available.",
        price: "£7.95",
        tags: ["vegetarian"],
      },
      {
        name: "Polpette della Nonna Pina",
        description: "Homemade meatballs in a savoury Napoletana sauce with melted cheese, served with crusty bread.",
        price: "£8.45",
      },
      {
        name: "Southern Fried Chicken Goujons",
        description: "Tender strips of chicken breast coated in a seasoned southern-style batter, fried until golden, accompanied by a dipping sauce.",
        price: "£7.45",
        note: "4 pieces",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    items: [
      {
        name: "Tomato and Onion Salad",
        description: "Juicy tomato slices paired with thinly sliced onions, drizzled with olive oil and a hint of balsamic vinegar.",
        price: "£4.75",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "House Salad",
        description: "A combination of mixed leaves, tomatoes, cucumbers, onions, and olives, dressed with aromatic olive oil.",
        price: "£5.00",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "Garlic Pizza Bread",
        description: "Garlic pizza bread with homemade garlic butter. Add cheese for an additional £1.",
        price: "£3.95",
        tags: ["vegetarian"],
      },
      {
        name: "Classic Fries",
        description: "Golden, crispy fries lightly salted to perfection. Add cheese for an additional £1.",
        price: "£4.75",
        tags: ["vegetarian", "vegan"],
      },
    ],
  },
  {
    id: "mains",
    name: "Main Courses",
    note: "Gluten-free pasta available on request — £1.95 extra. Add garlic bread for £1.95.",
    items: [
      {
        name: "Lasagne al Emilia-Romagna",
        description: "Real traditional Italian lasagna made from slow-cooked beef mince.",
        price: "£13.95",
      },
      {
        name: "Cannelloni Ricotta e Spinaci",
        description: "Fresh homemade cannelloni with ricotta and spinach cooked in Napoli sauce. Served with mixed leaves.",
        price: "£13.95",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    note: "Choice of Spaghetti (long) or Penne (short). Gluten-free pasta available on request — £1.95 extra.",
    items: [
      {
        name: "Arrabbiata",
        description: "Spicy homemade tomato sauce with a kick of chilli peppers.",
        price: "£10.95",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "Napoli",
        description: "Fresh and vegan San Marzano Italian tomato sauce blended with basil, carrot, celery, and organic white onion, cooked with pure Italian extra virgin olive oil.",
        price: "£10.95",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "Bolognese della Zia",
        description: "Slow-cooked beef mince in a rich Napoletana sauce, prepared traditionally.",
        price: "£12.95",
      },
      {
        name: "Carbonara della Zia",
        description: "A classic Italian favourite cooked with fresh free-range eggs, 30-month-aged Parmesan, and locally sourced bacon lardons in a creamy sauce.",
        price: "£14.95",
      },
      {
        name: "Amatriciana della Zia",
        description: "A classic Italian pasta with Zia's special sauce, fresh chilli, 30-month-aged Parmesan, and locally sourced bacon lardons.",
        price: "£14.95",
      },
      {
        name: "Alfredo",
        description: "Iconic Italian pasta with New Forest mushrooms, chicken, and 30-month-aged Parmesan in a creamy sauce.",
        price: "£14.95",
      },
      {
        name: "Seafood Lovers",
        description: "A delicious seafood mix cooked in La Zia's special sauce.",
        price: "£15.95",
      },
    ],
  },
  {
    id: "risotto",
    name: "Risotto",
    items: [
      {
        name: "Seafood Risotto",
        description: "Arborio rice cooked with tiger prawns, calamari, mussels, garlic, chilli, tomatoes, and white wine sauce.",
        price: "£15.95",
      },
      {
        name: "Vegetable Risotto",
        description: "Arborio rice cooked with mixed vegetables and tomato sauce, finished with Parmesan cheese. Vegan cheese available.",
        price: "£13.95",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "pizzas",
    name: "Stone-Baked Pizzas",
    note: "Gluten-free pizza available on request — £1.95 extra. Vegan cheese available.",
    items: [
      {
        name: "Queen Margherita",
        description: "Tomato, mozzarella.",
        price: "£10.95",
        tags: ["vegetarian"],
      },
      {
        name: "Funghi",
        description: "Tomato, mozzarella, double mushrooms.",
        price: "£11.95",
        tags: ["vegetarian"],
      },
      {
        name: "American Pepperoni",
        description: "Tomato, mozzarella, double pepperoni.",
        price: "£13.95",
      },
      {
        name: "Tonno e Cipolla",
        description: "Tomato, mozzarella, red onion, double tuna.",
        price: "£13.95",
      },
      {
        name: "Hawaiiana",
        description: "Tomato, mozzarella, ham, pineapple.",
        price: "£13.45",
      },
      {
        name: "Romana",
        description: "Tomato, mozzarella, anchovies, capers.",
        price: "£13.95",
      },
      {
        name: "D'Avola Pizza",
        description: "Tomato, mozzarella, chilli, pepperoni.",
        price: "£14.45",
        tags: ["spicy"],
      },
      {
        name: "Bolognese",
        description: "Tomato, mozzarella, rich Bolognese sauce.",
        price: "£14.45",
      },
      {
        name: "Quattro Formaggi",
        description: "Tomato, mozzarella, Dolcelatte, goat's cheese, Parmesan.",
        price: "£14.95",
        tags: ["vegetarian"],
      },
      {
        name: "Lady Vegetariana",
        description: "Tomato, mozzarella, red onions, mushrooms, peppers, spinach, and black olives.",
        price: "£14.95",
        tags: ["vegetarian"],
      },
      {
        name: "Pollo Barbecue",
        description: "Tomato, mozzarella, BBQ chicken, red onion, jalapeños.",
        price: "£14.95",
      },
      {
        name: "Milano",
        description: "Tomato, mozzarella, chicken, fresh peppers, mushrooms, ham.",
        price: "£14.95",
      },
      {
        name: "La Parmigiana",
        description: "Tomato, mozzarella, ham, fresh tomatoes, Parmesan.",
        price: "£14.95",
      },
      {
        name: "Al Prosciutto",
        description: "Tomato, mozzarella, prosciutto, artichoke.",
        price: "£15.45",
      },
      {
        name: "Polpette della Zia",
        description: "Tomato, mozzarella, homemade meatballs, rich ragù sauce.",
        price: "£15.45",
      },
      {
        name: "Vitto Special",
        description: "Tomato, mozzarella, fresh tomatoes, blue cheese, caramelised onions.",
        price: "£15.45",
      },
      {
        name: "Zia Special",
        description: "Tomato, mozzarella, ham, bacon, pepperoni.",
        price: "£15.95",
      },
      {
        name: "Frutti di Mare",
        description: "Tomato, mozzarella, prawns, mussels, squid.",
        price: "£15.95",
      },
    ],
  },
  {
    id: "calzone",
    name: "Calzone",
    note: "Extra toppings £1.95 each — anchovies, artichokes, bacon, chicken, fresh tomatoes, ham, jalapeños, mozzarella, mushrooms, olives, pepperoni, pineapple, prosciutto, red onions, spinach, sweet peppers, sweetcorn, tuna, prawns.\nDips 30p each — garlic mayonnaise, sweet chilli, hot chilli, barbecue.",
    items: [
      {
        name: "Calzone Cremoso",
        description: "Chicken, ham, mushrooms, and mozzarella in a golden-baked calzone with a rich, velvety béchamel sauce.",
        price: "£15.95",
      },
      {
        name: "Pollo Barbecue Calzone",
        description: "Tomato, mozzarella, BBQ chicken, red onion, jalapeños.",
        price: "£15.45",
      },
      {
        name: "Zia Special Calzone",
        description: "Tomato, mozzarella, ham, bacon, pepperoni.",
        price: "£16.45",
      },
      {
        name: "Vitto Special Calzone",
        description: "Tomato, mozzarella, fresh tomatoes, blue cheese, caramelised onions.",
        price: "£16.45",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        name: "Tiramisu",
        description: "Fresh homemade tiramisu with Italian espresso and creamy Baileys.",
        price: "£6.45",
        tags: ["signature"],
      },
      {
        name: "Cheesecake",
        description: "Homemade, delicious cheesecake.",
        price: "£6.45",
        tags: ["vegetarian"],
      },
      {
        name: "Profiteroles",
        description: "Served with delicious hot Nutella sauce.",
        price: "£5.50",
        tags: ["vegetarian"],
      },
      {
        name: "Italian Affogato",
        description: "Served with delicious hot Nutella sauce.",
        price: "£5.50",
        tags: ["vegetarian"],
      },
      {
        name: "Bread and Butter Pudding",
        description: "A classic warm dessert made with soft, buttery brioche soaked in rich, creamy custard, baked to perfection and studded with sweet, plump raisins.",
        price: "£5.50",
        tags: ["vegetarian"],
      },
      {
        name: "Italian Ice Cream — Gelato",
        description: "Madagascar Vanilla, King Chocolate, New Forest Strawberry. 1 scoop £2.49 · 2 scoops £3.99 · 3 scoops £5.49",
        price: "from £2.49",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "kids",
    name: "Kids' Menu",
    note: "Kids Meal Deal — any main + 1 scoop of ice cream for £7.90",
    items: [
      {
        name: "Baby Margherita",
        description: "Stone-baked mini pizza with tomato and mozzarella.",
        price: "£5.95",
        tags: ["vegetarian"],
      },
      {
        name: "Baby Pepperoni",
        description: "Stone-baked mini pizza with tomato, mozzarella and pepperoni.",
        price: "£6.50",
      },
      {
        name: "Baby Bolognese",
        description: "Pasta in a slow-cooked beef Bolognese sauce.",
        price: "£6.95",
      },
      {
        name: "Baby Napoli",
        description: "Pasta in a fresh tomato and basil Napoli sauce.",
        price: "£6.95",
        tags: ["vegetarian", "vegan"],
      },
      {
        name: "Scampi & Fries",
        description: "Golden crispy scampi with chips.",
        price: "£6.50",
      },
      {
        name: "Chicken Goujons & Fries",
        description: "Crispy chicken goujons with golden chips.",
        price: "£5.95",
      },
    ],
  },
];
