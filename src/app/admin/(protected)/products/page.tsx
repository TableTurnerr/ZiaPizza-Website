import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getProducts();
  const byCat = products.reduce<Record<string, typeof products>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});
  const orderedCategories = Object.keys(byCat).sort();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h3 italic text-white">Products</h1>
        <Link href="/admin/products/new" className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-4 py-2 rounded-lg transition-colors">
          + New product
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {orderedCategories.map((cat) => (
          <div key={cat}>
            <h2 className="text-h5 text-white font-semibold mb-2 capitalize">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {byCat[cat].map((p) => (
                <Link
                  key={p.slug}
                  href={`/admin/products/${p.slug}`}
                  className="bg-white/[0.03] border border-white/10 hover:border-accent/40 rounded-[10px] p-3 flex items-center gap-3 transition-colors"
                >
                  <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                    {p.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-normal3 truncate">{p.name}</div>
                    <div className="text-normal4 text-white/50">{p.price} · {p.locationSlugs.length} location{p.locationSlugs.length === 1 ? "" : "s"}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
