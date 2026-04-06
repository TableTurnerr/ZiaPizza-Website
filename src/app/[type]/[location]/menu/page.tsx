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

      <div className="h-[40px]" />

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

        <div className="mb-[50px]">
          <div className="text-accent text-normal3 font-semibold tracking-wider uppercase mb-2">
            {location.name}
          </div>
          <h1 className="text-h3 sm:text-h2 mb-4">Full Menu</h1>
          <p className="text-normal1" style={{ color: "var(--tt-color-text-gray)" }}>
            Explore our complete selection. Every dish made with fresh ingredients and Italian passion.
          </p>
        </div>

        {/* Menu by category */}
        {categories.map((cat) => {
          const catProducts = getProductsByLocationAndCategory(locationSlug, cat.slug);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat.slug} className="mb-[50px]">
              <div className="mb-[20px]">
                <h2 className="text-h4 text-white">{cat.name}</h2>
                <p className="text-normal3 text-gray-500 mt-1">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {catProducts.map((product) => (
                  <Link key={product.slug} href={`/${type}/${locationSlug}/menu/${product.slug}`}
                    className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-accent/40 transition-all duration-300 flex">
                    <div className="relative w-28 sm:w-32 flex-shrink-0 overflow-hidden">
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col justify-center min-w-0">
                      <h3 className="text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-normal4 text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold text-normal2">{product.price}</span>
                        {product.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] text-gray-500 border border-white/10 rounded-full px-2 py-0.5">
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
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-center">
          <h2 className="text-h4 text-white mb-3">Ready to order?</h2>
          <p className="text-normal2 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
            Order directly from {location.name} for collection or delivery.
          </p>
          <a href={location.orderUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary-dark hover:bg-primary text-white font-bold px-8 py-3 rounded-[9px] transition-colors">
            Order Now
          </a>
        </div>
      </div>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
