import React from "react";

type Review = {
  name: string;
  stars: number;
  text: string;
  source: string;
};

const GOOGLE_RATING = 4.8;
const GOOGLE_REVIEW_COUNT = 520;

const reviews: Review[] = [
  {
    name: "Sarah M.",
    stars: 5,
    text: "Best pizza in Salisbury, hands down. The stone-baked base is incredible and the truffle mushroom pizza is to die for. We come here every week now.",
    source: "Google Review",
  },
  {
    name: "James T.",
    stars: 5,
    text: "Ordered from Westbury Express for the first time and was blown away. Fresh, hot, and the dough was perfect. The BOGO deal made it even better.",
    source: "Google Review",
  },
  {
    name: "Emily K.",
    stars: 4,
    text: "Quick delivery from Westbury Express and the pizza arrived hot and fresh. BOGO is amazing value. Will definitely order again!",
    source: "Just Eat Review",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= count ? "text-accent" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      id="Reviews"
      className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]"
    >
      <div className="flex items-center gap-2 mb-3 justify-center">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          Recensioni
        </span>
      </div>
      <h2 className="text-white text-h3 sm:text-h2 text-center mb-3 italic">
        What Our Guests Say
      </h2>

      <div className="flex items-center justify-center gap-2 mb-[40px]">
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white font-bold text-h5">{GOOGLE_RATING.toFixed(1)}</span>
        </div>
        <span className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
          · {GOOGLE_REVIEW_COUNT}+ Google reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white/5 border border-white/10 rounded-[16px] p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold">
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="text-normal3 font-semibold text-white">{r.name}</p>
                <p className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>{r.source}</p>
              </div>
            </div>
            <StarRating count={r.stars} />
            <p className="text-normal3 leading-relaxed" style={{ color: "var(--tt-color-text-gray)" }}>
              &ldquo;{r.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
