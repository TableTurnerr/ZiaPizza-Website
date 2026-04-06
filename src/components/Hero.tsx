import React from "react";
import Image from "next/image";
import ThemeBtn from "./ThemeBtn";

export default function Hero() {
  return (
    <section
      id="Home"
      className="relative w-full min-h-[500px] sm:min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/photos/JOE00760.jpeg"
          alt="Zia Pizza hero"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 py-16">
        <div className="max-w-2xl">
          <p className="text-accent text-normal2 font-semibold tracking-wider uppercase mb-4">
            Authentic Italian &middot; Made Fresh Daily
          </p>
          <h1 className="text-[36px] sm:text-h2 lg:text-h1 font-bold leading-[1.1] mb-6">
            A Slice Above
            <br />
            The Rest
          </h1>
          <p className="text-gray-300 text-normal1 max-w-lg mb-2">
            Stone-baked pizzas crafted with love in Salisbury, Westbury &amp;
            Trowbridge. Hand-stretched dough, homemade sauce, premium toppings.
          </p>
          <p className="text-gray-500 text-normal3 mb-8">
            Serving the finest pizzas and Italian flavours in Wiltshire since
            2009.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ThemeBtn
              text="Order Online"
              href="/#cta"
              className="bg-primary-dark border-primary-dark hover:bg-primary hover:border-primary"
              textClassName="text-white pr-2 pl-4"
            />
            <ThemeBtn
              text="View Menu"
              href="/#dishes"
              className="bg-transparent border-white/10 hover:bg-white/5"
              textClassName="text-gray-300 pr-2 pl-4"
            />
            <ThemeBtn
              text="Find Your Nearest Zia"
              href="/#locations"
              className="bg-transparent border-white/10 hover:bg-white/5"
              textClassName="text-gray-300 pr-2 pl-4"
              showArrow={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
