import React from "react";
import Link from "next/link";
import { getAllBlog } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const posts = getAllBlog();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h3 italic text-white">Blog</h1>
        <Link href="/admin/blog/new" className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-4 py-2 rounded-lg transition-colors">
          + New post
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {posts.length === 0 ? (
          <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>No posts yet.</p>
        ) : (
          posts.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/blog/${p.slug}`}
              className="bg-white/[0.03] border border-white/10 hover:border-accent/40 rounded-[12px] p-4 flex items-center justify-between transition-colors"
            >
              <div>
                <div className="text-white font-semibold text-normal2">{p.title}</div>
                <div className="text-normal4 mt-0.5" style={{ color: "var(--tt-color-text-gray)" }}>{p.excerpt}</div>
              </div>
              <div className="text-normal4 text-white/50 whitespace-nowrap ml-4">{p.date}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
