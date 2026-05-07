import React from "react";
import SmartImage from "@/components/SmartImage";
import ThemeButton from "@/components/ThemeBtn";

export default function Hero() {
  return (
    <div
      id="Home"
      className="min-h-[600px] lg:min-h-[680px] w-full relative flex items-center rounded-[20px] overflow-hidden"
    >
      {/* Full-bleed background image */}
      <SmartImage
        src="/photos/JOE01050.webp"
        alt="Zia Pizza - Stone baked pizza"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_center]"
      />

      {/* Left dark gradient — keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/75 to-[#0D0D0D]/10" />
      {/* Top + bottom vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#0D0D0D]/70" />

      {/* Text Content */}
      <div className="relative z-10 pl-6 sm:pl-12 lg:pl-20 pr-4 py-20 flex flex-col items-start gap-4 max-w-[560px]">

        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-[18px] sm:text-[20px] font-script"
            style={{
              color: "var(--tt-color-text-orange)",
              fontFamily: "var(--font-script), 'Dancing Script', cursive",
            }}
          >
            Autentica Italiana &middot; Made Fresh Daily
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-white text-[40px] sm:text-h2 lg:text-h1 font-bold leading-[1.08] -mt-1">
          A Slice Above
          <br />
          <span className="text-primary italic">The Rest</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-[14px] sm:text-normal3 leading-[1.7] max-w-[400px]"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          Stone-baked pizzas crafted with love in Salisbury &amp; Westbury.
          Serving the finest Italian flavours in Wiltshire since 2009.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-7 py-1">
          {[
            { value: "14+", label: "Years" },
            { value: "2", label: "Locations" },
            { value: "500+", label: "Reviews" },
          ].map(({ value, label }, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[22px] leading-none">{value}</span>
                <span
                  className="text-[11px] tracking-widest uppercase mt-[5px]"
                  style={{ color: "var(--tt-color-text-gray)" }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && <div className="w-px h-8 bg-white/10" />}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start gap-[14px] mt-1">
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
