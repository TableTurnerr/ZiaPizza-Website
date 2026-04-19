import React from "react";
import Link from "next/link";
import BookTableButton from "@/components/BookTableButton";

export default function FinalCTASection() {
  return (
    <section
      id="FinalCTA"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="w-full py-[60px] px-6 sm:px-10 bg-gradient-to-b from-primary-dark/30 to-primary-dark/60 rounded-[24px] text-center max-w-6xl mx-auto">
        <h2 className="text-h3 sm:text-h2 text-white italic mb-4">
          Order now or book your table
        </h2>
        <p className="text-normal2 max-w-xl mx-auto mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
          Takeaway, delivery or a relaxed sit-down — we&apos;ll take care of the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/order"
            className="bg-primary hover:bg-primary-dark text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Order Now
          </Link>
          <BookTableButton className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-normal2 font-bold px-6 py-3 rounded-lg transition-colors">
            Book Table
          </BookTableButton>
        </div>
      </div>
    </section>
  );
}
