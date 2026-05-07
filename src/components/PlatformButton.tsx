import React from "react";
import Image from "next/image";

type Platform = "justEat" | "uberEats" | "deliveroo";

type Props = {
  platform: Platform;
  href: string;
  size?: "sm" | "md";
  className?: string;
};

const config: Record<Platform, { src: string; alt: string; ariaLabel: string; scale: number; bg: string; filter?: string }> = {
  justEat: {
    src: "/platform-logos/just-eat-orange-logo.svg",
    alt: "Just Eat",
    ariaLabel: "Order on Just Eat",
    scale: 2.5,
    bg: "#FF8000",
    filter: "brightness(0) invert(1)",
  },
  uberEats: {
    src: "/platform-logos/uber-eats.svg",
    alt: "Uber Eats",
    ariaLabel: "Order on Uber Eats",
    scale: 1,
    bg: "#ffffffec",
  },
  deliveroo: {
    src: "/platform-logos/deliveroo-logo.svg",
    alt: "Deliveroo",
    ariaLabel: "Order on Deliveroo",
    scale: 1,
    bg: "#00CCBC",
    filter: "brightness(0) invert(1)",

  },
};

export default function PlatformButton({ platform, href, size = "md", className = "" }: Props) {
  const c = config[platform];
  const dims = size === "sm" ? { h: 40, w: 130, boxH: 22 } : { h: 52, w: 168, boxH: 30 };
  const innerW = dims.w - 24;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.ariaLabel}
      title={c.ariaLabel}
      className={`inline-flex items-center justify-center rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all ${className}`}
      style={{ height: dims.h, width: dims.w, backgroundColor: c.bg }}
    >
      <span
        className="flex items-center justify-center overflow-hidden"
        style={{ height: dims.boxH, width: innerW }}
      >
        <Image
          src={c.src}
          alt={c.alt}
          height={dims.boxH}
          width={innerW}
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            transform: `scale(${c.scale})`,
            transformOrigin: "center",
            filter: c.filter,
          }}
          unoptimized
        />
      </span>
    </a>
  );
}
