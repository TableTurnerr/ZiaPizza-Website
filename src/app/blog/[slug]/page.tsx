import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import { getAllBlogPosts, getBlogPost } from "@/data/blog";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { robots: { index: false, follow: false } };
  return createPageMetadata({ title: post.title, description: post.excerpt, pathname: `/blog/${post.slug}`, image: post.cover || undefined, imageAlt: post.coverAlt, type: "article" });
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const relatedPosts = getAllBlogPosts().filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag))).slice(0, 3);
  const breadcrumbs = createBreadcrumbJsonLd([{ name: "Home", pathname: "/" }, { name: "Blog", pathname: "/blog" }, { name: post.title, pathname: path }]);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Zia Pizza" },
    ...(post.cover ? { image: absoluteUrl(post.cover) } : {}),
  };
  return (
    <div className="p-[10px] pb-[80px] md:pb-[10px]">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={articleSchema} />
      <Header />
      <div className="h-[65px] sm:h-[80px]" />
      <article className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px] max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}><Link href="/" className="hover:text-white transition-colors">Home</Link><span className="mx-2">/</span><Link href="/blog" className="hover:text-white transition-colors">Blog</Link><span className="mx-2">/</span><span className="text-white">{post.title}</span></nav>
        <div className="text-normal4 tracking-wider uppercase mb-3" style={{ color: "var(--tt-color-text-gray)" }}>{formatDate(post.date)} {post.author && `· ${post.author}`}{post.updatedAt && post.updatedAt !== post.date && ` · Updated ${formatDate(post.updatedAt)}`}</div>
        <h1 className="text-h2 sm:text-h1 italic text-white mb-5">{post.title}</h1>
        {post.cover && <div className="relative w-full h-[280px] sm:h-[400px] rounded-[20px] overflow-hidden mb-8"><SmartImage src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 640px) 100vw, 960px" className="object-cover" /></div>}
        <div className="prose-zia text-normal1 leading-[1.75]" style={{ color: "var(--tt-color-text-gray)" }} dangerouslySetInnerHTML={{ __html: post.html }} />
        <aside className="mt-10 p-5 bg-white/5 border border-white/10 rounded-[16px]"><h2 className="text-h5 text-white mb-2">Plan your next order</h2><p className="text-normal3 mb-3" style={{ color: "var(--tt-color-text-gray)" }}>Browse the current menu or find a Zia Pizza location near you.</p><div className="flex gap-4"><Link href="/menu" className="text-accent hover:text-white transition-colors">View menu</Link><Link href="/locations" className="text-accent hover:text-white transition-colors">Find locations</Link></div></aside>
        {relatedPosts.length > 0 && <section className="mt-12"><h2 className="text-h4 italic text-white mb-4">Related stories</h2><div className="grid gap-3">{relatedPosts.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="p-4 bg-white/5 border border-white/10 hover:border-accent/40 rounded-[12px] transition-colors"><h3 className="text-normal2 text-white">{item.title}</h3><p className="text-normal3 mt-1" style={{ color: "var(--tt-color-text-gray)" }}>{item.excerpt}</p></Link>)}</div></section>}
        <div className="mt-12"><Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors">Back to blog</Link></div>
      </article>
      <Footer />
    </div>
  );
}
