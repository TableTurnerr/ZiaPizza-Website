import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeButton from "@/components/ThemeBtn";
import { locations, getLocation, getLocationType } from "@/data/locations";
import { products, getProduct, getCategory, getProductsByLocationAndCategory } from "@/data/products";

export function generateStaticParams() {
  const params: { type: string; location: string; product: string }[] = [];
  for (const loc of locations) {
    for (const prod of products) {
      if (prod.locationSlugs.includes(loc.slug)) {
        params.push({ type: loc.type, location: loc.slug, product: prod.slug });
      }
    }
  }
  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ type: string; location: string; product: string }>;
}) {
  const { type, location: locationSlug, product: productSlug } = await params;
  const location = getLocation(locationSlug);
  const typeInfo = getLocationType(type);
  const product = getProduct(productSlug);

  if (!location || !typeInfo || !product || location.type !== type || !product.locationSlugs.includes(locationSlug)) {
    notFound();
  }

  const categoryInfo = getCategory(product.category);
  const related = getProductsByLocationAndCategory(locationSlug, product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

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
          <Link href={`/${type}/${locationSlug}/menu`} className="hover:text-white transition-colors">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px] mb-[70px] items-stretch">
          {/* Image */}
          <div className="relative rounded-[24px] overflow-hidden h-72 sm:h-[420px] lg:h-[480px] border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {product.tags.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-black/60 backdrop-blur text-white text-normal4 font-semibold px-3 py-1 rounded-full border border-white/10 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {categoryInfo && (
              <Link
                href={`/${type}/${locationSlug}/menu`}
                className="inline-flex self-start items-center gap-2 text-accent text-normal4 font-semibold tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/15 hover:border-accent/40 hover:text-accent transition-colors"
              >
                {categoryInfo.name}
              </Link>
            )}
            <h1
              className="text-h3 sm:text-h2 mb-3 leading-tight font-bold"
              style={{ fontFamily: "var(--default-font-family)", letterSpacing: "-0.02em" }}
            >
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-[22px]">
              <p className="text-h4 text-accent font-bold">{product.price}</p>
              <span className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>
                incl. VAT
              </span>
            </div>
            <p
              className="text-normal1 leading-relaxed mb-[28px]"
              style={{ color: "var(--tt-color-text-gray)" }}
            >
              {product.description}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-5 mb-[24px] flex items-start gap-4">
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-accent/15 border border-accent/30 text-accent"
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-normal4 uppercase tracking-wider text-gray-500 mb-1">Available at</p>
                <p className="text-normal2 text-white font-semibold">{location.name}</p>
                <p className="text-normal3 truncate" style={{ color: "var(--tt-color-text-gray)" }}>
                  {location.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-[12px]">
              <ThemeButton
                text="Order This Item"
                href={location.orderUrl}
                textClassname="pr-[8px] pl-[14px] text-white"
                className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
              />
              <ThemeButton
                text="Back to Menu"
                href={`/${type}/${locationSlug}/menu`}
                showArrow={false}
                textClassname="pr-[14px] pl-[14px]"
                textColor="text-[var(--tt-color-text-gray)]"
                className="bg-transparent border-2 border-white/10 hover:border-primary-dark transition-all"
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mb-[50px]">
            <div className="flex items-end justify-between mb-[20px] gap-4">
              <h2 className="text-h4 sm:text-h3 italic">
                More {categoryInfo?.name || "items"}
              </h2>
              <Link
                href={`/${type}/${locationSlug}/menu`}
                className="text-normal3 text-accent hover:text-white transition-colors whitespace-nowrap"
              >
                View full menu →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${type}/${locationSlug}/menu/${item.slug}`}
                  className="dish-card group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden"
                >
                  <div className="relative h-[140px] sm:h-[180px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {item.tags.includes("popular") && (
                      <span className="absolute top-3 right-3 bg-accent/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3
                      className="text-normal3 sm:text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate"
                      style={{ fontFamily: "var(--default-font-family)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-normal3 text-accent font-bold">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
