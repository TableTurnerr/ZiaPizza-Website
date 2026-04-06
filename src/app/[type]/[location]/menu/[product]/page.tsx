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
          <Link href={`/${type}/${locationSlug}/menu`} className="hover:text-white transition-colors">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] mb-[60px]">
          {/* Image */}
          <div className="relative rounded-[24px] overflow-hidden h-72 sm:h-96">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.tags.map((tag) => (
                <span key={tag}
                  className="bg-black/60 backdrop-blur text-white text-normal4 font-semibold px-3 py-1 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {categoryInfo && (
              <p className="text-accent text-normal3 font-semibold tracking-wider uppercase mb-2">
                {categoryInfo.name}
              </p>
            )}
            <h1 className="text-h3 sm:text-h2 mb-4">{product.name}</h1>
            <p className="text-h4 text-accent font-bold mb-[20px]">{product.price}</p>
            <p className="text-normal1 leading-relaxed mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
              {product.description}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-5 mb-[20px]">
              <p className="text-normal3 text-gray-500 mb-1">Available at</p>
              <p className="text-normal2 text-white font-semibold">{location.name}</p>
              <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{location.address}</p>
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
            <h2 className="text-h4 mb-[20px]">More {categoryInfo?.name || "items"}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
              {related.map((item) => (
                <Link key={item.slug} href={`/${type}/${locationSlug}/menu/${item.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-accent/40 transition-all">
                  <div className="relative h-36 overflow-hidden">
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-normal3 font-semibold text-white truncate group-hover:text-accent transition-colors">{item.name}</p>
                    <p className="text-normal4 text-accent font-bold">{item.price}</p>
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
