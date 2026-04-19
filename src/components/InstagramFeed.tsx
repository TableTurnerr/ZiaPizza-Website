"use client";

import React, { useState } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  title: string;
  image: string;
  url: string;
  description?: string;
}

const POSTS: InstagramPost[] = [
  {
    id: "1",
    title: "ziapizza.salisbury",
    image: "/photos/JOE01015.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Stone-baked, slow-proofed, straight from our oven. Authentic Italian pizza made the Zia way.",
  },
  {
    id: "2",
    title: "ziapizza.salisbury",
    image: "/photos/JOE01044.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Fresh dough, San Marzano tomatoes, fior di latte — simple ingredients done right.",
  },
  {
    id: "3",
    title: "ziapizza.salisbury",
    image: "/photos/JOE00706.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Pasta the way Zia Maria made it. Creamy, comforting, unforgettable.",
  },
  {
    id: "4",
    title: "ziapizza.salisbury",
    image: "/photos/JOE00788.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Golden, pillowy, impossible to stop at one — our famous dough balls.",
  },
  {
    id: "5",
    title: "ziapizza.salisbury",
    image: "/photos/JOE01048.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Gourmet truffle & mushroom — a slice of Italian luxury in Wiltshire.",
  },
  {
    id: "6",
    title: "ziapizza.salisbury",
    image: "/photos/JOE01090.jpeg",
    url: "https://instagram.com/ziapizza.salisbury",
    description:
      "Follow @ziapizza.salisbury for daily specials, behind-the-scenes, and everything Italian.",
  },
];

const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
  </svg>
);

function InstagramCard({ post }: { post: InstagramPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block rounded-[16px] overflow-hidden border border-white/10 hover:border-accent/40 shadow-lg transition-all duration-300 h-[320px] sm:h-[360px]"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 968px) 45vw, 30vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-70"
        }`}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-normal3 font-semibold truncate">
            @{post.title}
          </span>
          <InstagramIcon className="text-white/90 group-hover:text-accent transition-colors" />
        </div>

        {post.description && (
          <p
            className={`text-normal3 text-white/85 leading-snug transition-all duration-300 ${
              hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {post.description}
          </p>
        )}
      </div>
    </a>
  );
}

export default function InstagramFeed() {
  return (
    <section className="w-full px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span
          className="text-accent text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
        >
          @ziapizza.salisbury
        </span>
      </div>
      <h2 className="text-h3 sm:text-h2 text-center mb-2 text-white italic">
        Follow us on Instagram
      </h2>
      <p
        className="text-normal2 text-center mb-[30px] max-w-2xl mx-auto"
        style={{ color: "var(--tt-color-text-gray)" }}
      >
        Daily specials, fresh bakes, and behind-the-scenes moments from our
        kitchen.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] max-w-6xl mx-auto">
        {POSTS.map((post) => (
          <InstagramCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center mt-[30px]">
        <a
          href="https://instagram.com/ziapizza.salisbury"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-dark text-white border-2 border-primary-dark hover:bg-primary-dark/90 transition-colors text-normal3 font-semibold"
        >
          <InstagramIcon />
          View on Instagram
        </a>
      </div>
    </section>
  );
}
