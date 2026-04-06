import React from "react";
import ThemeBtn from "./ThemeBtn";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="w-full py-20 bg-gradient-to-b from-primary-dark/40 to-primary-dark/80"
    >
      <div className="px-4 sm:px-8 lg:px-16 text-center">
        <h2 className="text-h3 sm:text-h2 font-semibold text-white mb-4 italic">
          Book a Table or Order Online
        </h2>
        <p className="text-normal1 text-gray-300 max-w-xl mx-auto mb-8">
          Whether you&rsquo;re dining in for a special evening or ordering from
          the comfort of home, Zia Pizza has you covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ThemeBtn
            text="Order Online"
            href="https://ziapizza.food-order.net/en?code=RENMV0lX"
            className="bg-primary-dark border-primary hover:bg-primary"
            textClassName="text-white pr-2 pl-4"
          />
          <ThemeBtn
            text="Book a Table"
            href="https://eposhybrid.uk"
            className="bg-transparent border-white/20 hover:bg-white/5"
            textClassName="text-white pr-2 pl-4"
          />
        </div>
      </div>
    </section>
  );
}
