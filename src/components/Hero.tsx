import React from "react";
import Image from "next/image";
import ThemeButton from "@/components/ThemeBtn";

export default function Hero() {
  return (
    <div
      id="Home"
      className="h-[500px] sm:h-[500px] w-full relative flex flex-row items-center"
    >
      {/* Hero background image - Mobile */}
      <div className="absolute inset-0 w-full h-full -z-10 sm:hidden">
        <Image
          src="/photos/JOE00760.jpeg"
          alt="Home Page Image Mobile"
          fill
          className="object-cover rounded-[24px]"
        />
      </div>
      {/* Hero background image - Desktop */}
      <div className="hidden sm:block absolute pt-4 mr-[-10px] right-0 h-[125%] w-1/2 -z-10">
        <Image
          src="/photos/JOE00760.jpeg"
          alt="Home Page Image"
          fill
          className="object-contain object-right"
        />
      </div>
      <div className="text-left pl-2 sm:pl-[60px] pb-8 flex flex-col items-start justify-center gap-2.5 relative z-10">
        <div className="text-normal1 sm:text-normal2 sm:font-bold border-l-3 border-primary-dark pl-[20px]">
          Authentic Italian &middot; Made Fresh Daily
        </div>
        <div className="text-[32px] sm:text-h2 lg:text-h1 sm:font-medium leading-[1.2]">
          A Slice Above
          <br />
          The Rest
        </div>
        <p
          className="text-normal3 max-w-md mt-2"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          Stone-baked pizzas crafted with love in Salisbury, Westbury &amp;
          Trowbridge. Serving the finest Italian flavours in Wiltshire since
          2009.
        </p>
        <div className="mt-[20px] gap-[20px] flex flex-col sm:flex-row items-center justify-center">
          <ThemeButton
            text="Order Online"
            href="https://ziapizza.food-order.net/en?code=RENMV0lX"
            textClassname="pr-[8px] pl-[14px] text-white"
            className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
          />
          <ThemeButton
            text="View Menu"
            textClassname="pr-[8px] pl-[14px]"
            textColor="text-[var(--tt-color-text-gray)]"
            className="bg-transparent border-2 transition-all duration-200 hover:bg-primary-dark hover:text-white border-white/10 hover:border-primary-dark"
            iconBgColor="bg-white/10"
            iconColor="text-white"
            href="#Menu"
          />
        </div>
      </div>
    </div>
  );
}
