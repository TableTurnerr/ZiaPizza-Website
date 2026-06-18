"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Use `as="div"` to make the reveal BE a grid/flex item. */
  as?: React.ElementType;
  /** Direction / style of the entrance. */
  variant?: RevealVariant;
  /** Delay before the entrance starts, in ms. Use for staggering siblings. */
  delay?: number;
  /** Transition duration, in ms. */
  duration?: number;
  /** Portion of the element that must be visible to trigger (0–1). */
  threshold?: number;
  /** Re-animate every time it enters the viewport instead of only once. */
  once?: boolean;
}

/**
 * Reveals its content with a scroll-triggered transition the first time it
 * enters the viewport. Pure CSS transitions + IntersectionObserver, so it is
 * cheap and plays nicely with Lenis (which scrolls the real document).
 *
 * Honours `prefers-reduced-motion` by rendering the content visible up front.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion users are handled purely in CSS (.reveal is forced
    // visible via a prefers-reduced-motion media query), so no JS branch
    // is needed here.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal reveal--${variant}${visible ? " is-visible" : ""}${
        className ? " " + className : ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
