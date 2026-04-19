import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations, getLocation, getLocationType } from "@/data/locations";
import { getProductsByLocationAndCategory, categories } from "@/data/products";

export function generateStaticParams() {
  return locations.map((l) => ({ type: l.type, location: l.slug }));
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}) {
  const { type, location: locationSlug } = await params;
  const location = getLocation(locationSlug);
  const typeInfo = getLocationType(type);

  if (!location || !typeInfo || location.type !== type) notFound();

  return (
    <div className="p-[10px]">
      <Header />

      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        {/* Breadcrumb */}
        <div className="text-normal4 mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}`} className="hover:text-white transition-colors">{typeInfo.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}/${locationSlug}`} className="hover:text-white transition-colors">{location.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Menu</span>
        </div>

        {/* Page header */}
        <div className="mb-[40px]">
          <div
            className="text-accent text-[20px] sm:text-[22px] mb-1"
            style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
          >
            {location.name}
          </div>
          <h1 className="text-h3 sm:text-h2 mb-4 italic">Full Menu</h1>
          <p className="text-normal1 max-w-2xl" style={{ color: "var(--tt-color-text-gray)" }}>
            Explore our complete selection. Every dish made with fresh ingredients and Italian passion.
          </p>
        </div>

        {/* Category quick-nav */}
        <div className="flex flex-wrap gap-2 mb-[40px] pb-[20px] border-b border-white/10">
          {categories.map((cat) => {
            const has = getProductsByLocationAndCategory(locationSlug, cat.slug).length > 0;
            if (!has) return null;
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="text-normal4 font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-accent/20 hover:border-accent/60 hover:text-accent hover:scale-[1.04] transition-all duration-200"
              >
                {cat.name}
              </a>
            );
          })}
        </div>

        {/* Menu by category */}
        {categories.map((cat) => {
          const catProducts = getProductsByLocationAndCategory(locationSlug, cat.slug);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat.slug} id={cat.slug} className="mb-[60px] scroll-mt-[100px]">
              <div className="mb-[22px] flex items-end justify-between gap-4">
                <div>
                  <a href={`#${cat.slug}`} className="group/heading">
                    <h2 className="text-h4 sm:text-h3 text-white italic group-hover/heading:text-accent transition-colors duration-200">{cat.name}</h2>
                  </a>
                  <p className="text-normal3 text-gray-500 mt-1 max-w-xl">{cat.description}</p>
                </div>
                <span className="hidden sm:inline-block text-normal4 text-gray-500 whitespace-nowrap">
                  {catProducts.length} {catProducts.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {catProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${type}/${locationSlug}/menu/${product.slug}`}
                    className="dish-card group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden flex"
                  >
                    <div className="relative w-28 sm:w-32 flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                      {product.tags.includes("popular") && (
                        <span className="absolute top-2 left-2 bg-accent/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col justify-center min-w-0 flex-1">
                      <h3
                        className="text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate"
                        style={{ fontFamily: "var(--default-font-family)" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-normal3 text-gray-400 line-clamp-3 mb-2 leading-snug">{product.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-accent font-bold text-normal2">{product.price}</span>
                        {product.tags
                          .filter((t) => t !== "popular")
                          .slice(0, 2)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-gray-400 border border-white/10 rounded-full px-2 py-0.5 capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Order CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark/30 via-white/5 to-accent/10 border border-white/10 rounded-[24px] p-8 sm:p-10 text-center">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary-dark/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <div
              className="text-accent text-[18px] sm:text-[20px] mb-1"
              style={{ fontFamily: "var(--font-script), 'Dancing Script', cursive" }}
            >
              Buon appetito
            </div>
            <h2 className="text-h4 sm:text-h3 text-white mb-3 italic">Ready to order?</h2>
            <p className="text-normal2 mb-[24px] max-w-lg mx-auto" style={{ color: "var(--tt-color-text-gray)" }}>
              Order directly from {location.name} for collection or delivery.
            </p>
            <a
              href={location.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-dark hover:bg-primary-dark/90 text-white font-bold px-8 py-3 rounded-[9px] transition-colors border-2 border-primary-dark"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
