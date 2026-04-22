import React from "react";
import Link from "next/link";
import { getLocations, getProducts, getAllBlog } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const locations = getLocations();
  const products = getProducts();
  const posts = getAllBlog();

  const cards = [
    { label: "Locations", href: "/admin/locations", count: locations.length },
    { label: "Products", href: "/admin/products", count: products.length },
    { label: "Blog posts", href: "/admin/blog", count: posts.length },
    { label: "Site copy", href: "/admin/site", count: null },
  ];

  return (
    <div>
      <h1 className="text-h3 italic text-white mb-2">Dashboard</h1>
      <p className="text-normal2 mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
        Manage content for ziapizza.co.uk. Changes save to the JSON/MD files under <code className="text-accent">src/content</code>. Commit and redeploy to publish.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-white/[0.04] border border-white/10 hover:border-accent/40 rounded-[14px] p-5 transition-colors block"
          >
            <div className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>
              {c.label}
            </div>
            <div className="text-h3 italic text-white mt-1">
              {c.count ?? "—"}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-[14px] p-5">
        <h2 className="text-h5 text-white font-semibold mb-2">Quick actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/locations/new" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-normal3 text-white">
            + New location
          </Link>
          <Link href="/admin/products/new" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-normal3 text-white">
            + New product
          </Link>
          <Link href="/admin/blog/new" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-normal3 text-white">
            + New blog post
          </Link>
        </div>
      </div>
    </div>
  );
}
