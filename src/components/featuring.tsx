"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface FeaturedDishSectionProps {
  title: string;
  description: string;
  price?: string;
  images: string[];
  reverse?: boolean;
}

// Matches GrillShack's FeaturedDishSection with auto-rotating image carousel
function FeaturedDishSection({
  title,
  description,
  price,
  images,
  reverse = false,
}: FeaturedDishSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, images.length]);

  return (
    <div
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-[8px] lg:gap-0 max-w-[1240px] mx-auto mb-[40px]`}
    >
      {/* Image carousel */}
      <div className="relative w-[90vw] h-[300px] sm:w-[400px] sm:h-[350px] lg:w-[540px] lg:h-[420px] rounded-[24px] overflow-hidden flex-shrink-0">
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              transform: i === currentIndex ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <Image
              src={img}
              alt={`${title} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 540px"
            />
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center max-w-[560px] px-4 md:px-8 text-center md:text-left">
        <h3 className="text-h4 sm:text-h3 font-semibold text-white mb-3">
          {title}
        </h3>
        <p
          className="text-normal2 mb-4 leading-relaxed"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          {description}
        </p>
        {price && (
          <p className="text-normal3 font-semibold text-accent mb-4">
            Starting from {price}
          </p>
        )}
      </div>
    </div>
  );
}

// Matches GrillShack's Featuring component - multiple featured sections
export default function Featuring() {
  return (
    <div className="w-full py-[20px]">
      <FeaturedDishSection
        title="Stone-Baked Pizzas"
        description="Hand-stretched, slow-proofed dough baked on stone with our homemade sauce and premium toppings. From classic Margherita to gourmet truffle & mushroom — every pizza tells our story."
        price="£8.95"
        images={[
          "/photos/JOE01015.jpeg",
          "/photos/JOE01020.jpeg",
          "/photos/JOE01024.jpeg",
          "/photos/JOE01044.jpeg",
          "/photos/JOE01048.jpeg",
        ]}
      />

      <FeaturedDishSection
        title="Signature Pastas"
        description="Classic Italian pasta dishes made with fresh ingredients and rich, authentic sauces. From creamy Carbonara to luxurious Truffle Tagliatelle — pasta the way Zia Maria made it."
        price="£10.95"
        images={[
          "/products/pastas/carbonara.jpg",
          "/products/pastas/Bolognese.jpg",
          "/products/pastas/Chicken Alfredo.jpg",
          "/products/pastas/Lasagne Al Forno.jpg",
          "/products/pastas/truffle.jpg",
        ]}
        reverse
      />

      <FeaturedDishSection
        title="Street Bites & Starters"
        description="Perfectly prepared starters to kick off your meal. Our garlic dough balls and hot honey dough balls are crowd favourites — golden, pillowy, and impossible to stop at one."
        price="£3.95"
        images={[
          "/products/starters/Garlic Dough Balls.jpg",
          "/products/starters/hot honey Dough Balls.jpg",
          "/products/starters/Classic Fries.jpg",
        ]}
      />

      <FeaturedDishSection
        title="Desserts & Gelato"
        description="Finish your meal on a sweet note with our Italian gelato and handmade profiteroles. Rich chocolate, zesty lemon, nutty pistachio — something for every sweet tooth."
        price="£4.50"
        images={[
          "/products/desserts/gelato-chocolate.jpg",
          "/products/desserts/gelato-strawberry.jpg",
          "/products/desserts/gelato-thiramisu.jpg",
          "/products/desserts/profiteroles-chocolate.jpg",
          "/products/desserts/profiteroles-pistachio.jpg",
        ]}
        reverse
      />
    </div>
  );
}
