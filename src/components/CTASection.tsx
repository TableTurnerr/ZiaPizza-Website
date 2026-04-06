import React from "react";
import ThemeButton from "@/components/ThemeBtn";

export default function CTASection() {
  return (
    <div className="w-full py-[60px] px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] bg-gradient-to-b from-primary-dark/30 to-primary-dark/60 rounded-[24px]">
      <div className="text-center">
        <h2 className="text-h3 sm:text-h2 text-white mb-4">
          Book a Table or Order Online
        </h2>
        <p
          className="text-normal1 max-w-xl mx-auto mb-[30px]"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          Whether you&rsquo;re dining in for a special evening or ordering from
          the comfort of home, Zia Pizza has you covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-[20px] justify-center">
          <ThemeButton
            text="Order Online"
            href="https://ziapizza.food-order.net/en?code=RENMV0lX"
            textClassname="pr-[8px] pl-[14px] text-white"
            className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
          />
          <ThemeButton
            text="Book a Table"
            href="https://eposhybrid.uk"
            textClassname="pr-[8px] pl-[14px]"
            textColor="text-[var(--tt-color-text-gray)]"
            className="bg-transparent border-2 transition-all duration-200 hover:bg-primary-dark hover:text-white border-white/20 hover:border-primary-dark"
            iconBgColor="bg-white/10"
            iconColor="text-white"
          />
        </div>
      </div>
    </div>
  );
}
