import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog | Zia Pizza",
  description: "News, offers, and stories from the Zia Pizza kitchen.",
};

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-5xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Blog</span>
        </div>

        <h1 className="text-h2 sm:text-h1 italic text-white mb-3">From the Kitchen</h1>
        <p className="text-normal2 max-w-2xl mb-10" style={{ color: "var(--tt-color-text-gray)" }}>
          Stories, offers, and the occasional recipe. Written by the people who make the pizza.
        </p>

        {posts.length === 0 ? (
          <p className="text-normal2" style={{ color: "var(--tt-color-text-gray)" }}>No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white/5 border border-white/10 hover:border-accent/40 rounded-[16px] overflow-hidden transition-colors"
              >
                {p.cover && (
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-normal4 tracking-wider uppercase mb-2" style={{ color: "var(--tt-color-text-gray)" }}>
                    {formatDate(p.date)} {p.author && `· ${p.author}`}
                  </div>
                  <h2 className="text-h5 text-white font-semibold mb-2 group-hover:text-accent transition-colors">{p.title}</h2>
                  <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
