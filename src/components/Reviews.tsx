"use client";

import React from "react";

interface ReviewCardProps {
  name: string;
  stars: number;
  text: string;
  source: string;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= count ? "text-accent" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, stars, text, source }: ReviewCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[16px] px-[30px] py-[20px] flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-normal3">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-normal3 font-semibold text-white">{name}</p>
          <p className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
            {source}
          </p>
        </div>
      </div>
      <StarRating count={stars} />
      <p className="text-normal3 leading-relaxed" style={{ color: "var(--tt-color-text-gray)" }}>
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

const reviews: ReviewCardProps[] = [
  {
    name: "Sarah M.",
    stars: 5,
    text: "Best pizza in Salisbury, hands down. The stone-baked base is incredible and the truffle mushroom pizza is to die for. We come here every week now.",
    source: "Google Review",
  },
  {
    name: "James T.",
    stars: 5,
    text: "Took the family to The Lamb on the Strand — great pub atmosphere with genuinely excellent Italian food. The Wednesday buffet is unbeatable value.",
    source: "Google Review",
  },
  {
    name: "Emily K.",
    stars: 4,
    text: "Quick delivery from the Westbury Express and the pizza arrived hot and fresh. BOGO deal is amazing value. Will definitely order again!",
    source: "Just Eat Review",
  },
];

export default function Reviews() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-accent text-normal3 font-semibold tracking-wider uppercase">
          Guest Reviews
        </span>
      </div>
      <h2 className="text-h3 sm:text-h2 font-semibold text-center mb-[30px]">
        What Our Guests Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
    </div>
  );
}
