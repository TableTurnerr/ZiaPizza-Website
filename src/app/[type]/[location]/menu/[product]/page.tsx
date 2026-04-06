import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeBtn from "@/components/ThemeBtn";
import {
  locations,
  getLocation,
  getLocationType,
} from "@/data/locations";
import {
  products,
  getProduct,
  getCategory,
  getProductsByLocationAndCategory,
} from "@/data/products";

export function generateStaticParams() {
  const params: { type: string; location: string; product: string }[] = [];
  for (const loc of locations) {
    for (const prod of products) {
      if (prod.locationSlugs.includes(loc.slug)) {
        params.push({
          type: loc.type,
          location: loc.slug,
          product: prod.slug,
        });
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

  if (
    !location ||
    !typeInfo ||
    !product ||
    location.type !== type ||
    !product.locationSlugs.includes(locationSlug)
  ) {
    notFound();
  }

  const categoryInfo = getCategory(product.category);

  // Related products from same category at same location
  const related = getProductsByLocationAndCategory(
    locationSlug,
    product.category
  )
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div>
      <Header />

      <section className="w-full px-4 sm:px-8 lg:px-16 py-16">
        {/* Breadcrumb */}
        <div className="text-normal3 text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${type}`}
            className="hover:text-white transition-colors"
          >
            {typeInfo.name}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${type}/${locationSlug}`}
            className="hover:text-white transition-colors"
          >
            {location.name}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${type}/${locationSlug}/menu`}
            className="hover:text-white transition-colors"
          >
            Menu
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-navy/80 backdrop-blur text-white text-normal4 font-semibold px-3 py-1 rounded-full border border-navy-border"
                >
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
            <h1 className="text-h3 sm:text-h2 font-semibold mb-4">
              {product.name}
            </h1>
            <p className="text-h4 text-accent font-bold mb-6">
              {product.price}
            </p>
            <p className="text-normal1 text-gray-400 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-navy-card border border-navy-border rounded-xl p-5 mb-6">
              <p className="text-normal3 text-gray-500 mb-1">Available at</p>
              <p className="text-normal2 text-white font-semibold">
                {location.name}
              </p>
              <p className="text-normal3 text-gray-400">{location.address}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ThemeBtn
                text="Order This Item"
                href={location.orderUrl}
                className="bg-primary-dark border-primary-dark hover:bg-primary hover:border-primary"
                textClassName="text-white pr-2 pl-4"
              />
              <ThemeBtn
                text="Back to Menu"
                href={`/${type}/${locationSlug}/menu`}
                className="bg-transparent border-white/10 hover:bg-white/5"
                textClassName="text-gray-300 pr-2 pl-4"
                showArrow={false}
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-h4 font-semibold mb-6">
              More {categoryInfo?.name || "items"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${type}/${locationSlug}/menu/${item.slug}`}
                  className="group bg-navy-card border border-navy-border rounded-xl overflow-hidden hover:border-accent/40 transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-normal3 font-semibold text-white truncate group-hover:text-accent transition-colors">
                      {item.name}
                    </p>
                    <p className="text-normal4 text-accent font-semibold">
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
