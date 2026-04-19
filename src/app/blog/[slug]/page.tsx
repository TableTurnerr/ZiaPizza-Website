import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllBlogPosts, getBlogPost } from "@/data/blog";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post | Zia Pizza" };
  return {
    title: `${post.title} | Zia Pizza`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.cover ? [post.cover] : undefined },
  };
}

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="p-[10px] pb-[120px]">
      <Header />
      <div className="h-[65px] sm:h-[80px]" />

      <article className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-3xl mx-auto">
        <div className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{post.title}</span>
        </div>

        <div className="text-normal4 tracking-wider uppercase mb-3" style={{ color: "var(--tt-color-text-gray)" }}>
          {formatDate(post.date)} {post.author && `· ${post.author}`}
        </div>
        <h1 className="text-h2 sm:text-h1 italic text-white mb-5">{post.title}</h1>

        {post.cover && (
          <div className="relative w-full h-[280px] sm:h-[400px] rounded-[20px] overflow-hidden mb-8">
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="prose-zia text-normal1 leading-[1.75]"
          style={{ color: "var(--tt-color-text-gray)" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors">
            ← Back to blog
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
