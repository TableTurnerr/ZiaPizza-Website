"use client";

import { useEffect, useState } from "react";

type MenuCategory = {
  slug: string;
  name: string;
};

export default function MenuCategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "");

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.slug))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections[0]) {
          setActiveCategory(visibleSections[0].target.id);
        }
      },
      {
        // The active section is the one entering the area beneath the sticky nav.
        rootMargin: "-140px 0px -55% 0px",
        threshold: [0, 0.1, 0.25],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[68px] z-30 -mx-[10px] mb-10 border-y border-white/[0.08] px-[10px] py-3 backdrop-blur-md sm:-mx-[40px] sm:px-[40px] md:-mx-[70px] md:px-[70px] lg:-mx-[80px] lg:px-[80px]"
      style={{ background: "rgba(14,24,36,0.95)" }}
    >
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              aria-current={isActive ? "location" : undefined}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-normal4 font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-white/[0.05] text-white hover:border-accent/60 hover:bg-primary hover:text-white"
              }`}
            >
              {category.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
