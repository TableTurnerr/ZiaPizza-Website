import React from "react";
import FAQ from "./FAQ";

const faqItems = [
  {
    question: "What are your opening hours?",
    answer:
      "Our Salisbury and Westbury locations are open daily from 12:30 PM to 10:30 PM. The Lamb on the Strand in Trowbridge is open Tuesday to Sunday from 11:30 AM to 11:00 PM (closed Mondays).",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes! You can order delivery directly through our website, or via Just Eat, Uber Eats, and Deliveroo. Delivery availability varies by location.",
  },
  {
    question: "Can I book a table online?",
    answer:
      "Absolutely. You can book a table at any of our locations through our online booking system. Walk-ins are also welcome subject to availability.",
  },
  {
    question: "Do you have vegetarian or vegan options?",
    answer:
      "Yes, we offer a range of vegetarian pizzas, pastas, and sides. We can also accommodate vegan requests — just ask your server or mention it when ordering online.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, all major credit and debit cards, Apple Pay, Google Pay, and contactless payments at all locations.",
  },
  {
    question: "What is the Buy One Get One Free offer?",
    answer:
      "Our BOGO deal lets you buy one pizza and get a second pizza of equal or lesser value completely free. Available for dine-in, takeaway, and delivery (web & phone orders).",
  },
  {
    question: "Do you cater for large groups or events?",
    answer:
      "Yes! We can accommodate large groups and private events at our Salisbury and Trowbridge locations. Please call ahead to arrange group bookings.",
  },
  {
    question: "Is The Lamb on the Strand a pub or a restaurant?",
    answer:
      "It's both! The Lamb on the Strand is a traditional community pub serving Zia Pizza's Italian menu alongside a full drinks selection, including cocktails, beers, and wines.",
  },
  {
    question: "Where do you source your ingredients?",
    answer:
      "We use fresh, locally sourced ingredients wherever possible. Our dough is made fresh daily, our sauce is homemade, and we use premium mozzarella and toppings for authentic Italian quality.",
  },
  {
    question: "What makes Zia Pizza different?",
    answer:
      "We're a family story. Every recipe traces back to our founder's Zia Maria in Naples. Hand-stretched, slow-proofed dough baked on stone — not mass-produced, never frozen. It's Italian food made with real love.",
  },
  {
    question: "Do you have a kids menu?",
    answer:
      "Yes! We offer kid-friendly options at all locations. Don't forget our Friday deal — kids eat for just £1 with a full-price adult main (under 12s).",
  },
  {
    question: "Can I customise my pizza?",
    answer:
      "Of course. You can add or remove toppings on any pizza. Just let us know when ordering online or in person. Additional toppings may carry a small charge.",
  },
];

export default function FAQSection() {
  return <FAQ items={faqItems} title="Frequently Asked Questions" />;
}
