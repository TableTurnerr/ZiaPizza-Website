import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import ThemeButton from "@/components/ThemeBtn";
import { getLocation } from "@/data/locations";
import {
  getCategory,
  getProduct,
  getProductsByCategory,
  isProductIndexable,
  productPath,
  products,
} from "@/data/products";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type ProductParams = { category: string; product: string };

function formatList(values: string[]) {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

function getProductSeoDescription(
  product: (typeof products)[number],
  categoryName: string,
) {
  const shortDescription = product.description;
  const expandedDescription = product.longDescription ?? shortDescription;
  const labels = formatList(
    product.tags.map((tag) => tag.replaceAll("-", " ")),
  );

  return [
    `${product.name} from the Zia Pizza ${categoryName.toLowerCase()} menu.`,
    expandedDescription,
    `Current listed menu price: ${product.price}.`,
    labels ? `Menu labels: ${labels}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function generateStaticParams(): ProductParams[] {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductParams>;
}): Promise<Metadata> {
  const { category, product: productSlug } = await params;
  const product = getProduct(productSlug);
  const categoryInfo = getCategory(category);

  if (!product || !categoryInfo || product.category !== categoryInfo.slug) {
    return { robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: `${product.name} | ${categoryInfo.name}`,
    description: getProductSeoDescription(product, categoryInfo.name),
    pathname: productPath(product),
    image: product.image || undefined,
    imageAlt: product.imageAlt ?? product.name,
    robots: isProductIndexable(product)
      ? { index: true, follow: true }
      : { index: false, follow: true },
  });
}

export default async function CanonicalProductPage({
  params,
}: {
  params: Promise<ProductParams>;
}) {
  const { category, product: productSlug } = await params;
  const product = getProduct(productSlug);
  const categoryInfo = getCategory(category);

  if (!product || !categoryInfo || product.category !== categoryInfo.slug) notFound();

  const path = productPath(product);
  const availableLocations = product.locationSlugs
    .map(getLocation)
    .filter((location) => location && !location.comingSoon);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug && isProductIndexable(item))
    .slice(0, 4);
  const shortDescription = product.description;
  const expandedDescription = product.longDescription ?? shortDescription;
  const locationNames = availableLocations.flatMap((location) =>
    location ? [location.name] : [],
  );
  const menuLabels = formatList(
    product.tags.map((tag) => tag.replaceAll("-", " ")),
  );
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "@id": `${absoluteUrl(path)}#menuitem`,
    name: product.name,
    description: expandedDescription,
    url: absoluteUrl(path),
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
  };
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", pathname: "/" },
    { name: "Menu", pathname: "/menu" },
    { name: categoryInfo.name, pathname: `/menu#${product.category}` },
    { name: product.name, pathname: path },
  ]);

  return (
    <div className="p-[10px]">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbs} />
      <Header />

      <div className="h-[65px] sm:h-[80px]" />

      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/menu" className="hover:text-white transition-colors">Menu</Link>
          <span className="mx-2">/</span>
          <a href={`/menu#${product.category}`} className="hover:text-white transition-colors">{categoryInfo.name}</a>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px] mb-[70px] items-stretch">
          <div className="relative rounded-[24px] overflow-hidden min-h-72 sm:min-h-[420px] lg:min-h-[480px] border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <SmartImage
              src={product.image}
              alt={product.imageAlt ?? product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {product.tags.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-black/60 backdrop-blur text-white text-normal4 font-semibold px-3 py-1 rounded-full border border-white/10 capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <a href={`/menu#${product.category}`} className="inline-flex self-start text-accent text-normal4 font-semibold tracking-[0.15em] uppercase mb-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/15 transition-colors">
              {categoryInfo.name}
            </a>
            <h1 className="text-h3 sm:text-h2 mb-3 leading-tight font-bold" style={{ fontFamily: "var(--default-font-family)", letterSpacing: 0 }}>
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-[22px]">
              <p className="text-h4 text-accent font-bold">{product.price}</p>
              <span className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>Listed menu price</span>
            </div>
            <p className="text-normal1 leading-relaxed mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>
              {shortDescription}
            </p>
            {product.ingredientSummary && (
              <div className="mb-[20px]">
                <h2 className="text-normal2 text-white font-semibold mb-2">Ingredients</h2>
                <p className="text-normal3 leading-relaxed" style={{ color: "var(--tt-color-text-gray)" }}>{product.ingredientSummary}</p>
              </div>
            )}
            {product.dietaryInfo && (
              <p className="text-normal3 mb-[20px]" style={{ color: "var(--tt-color-text-gray)" }}>{product.dietaryInfo}</p>
            )}
            {product.allergenInfo && (
              <p className="text-normal4 mb-[24px]" style={{ color: "var(--tt-color-text-gray)" }}>{product.allergenInfo}</p>
            )}
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-5 mb-[24px]">
              <h2 className="text-normal2 text-white font-semibold mb-3">Available at</h2>
              <ul className="space-y-2">
                {availableLocations.map((location) => location && (
                  <li key={location.slug}>
                    <Link href={`/${location.type}/${location.slug}`} className="text-accent hover:text-white transition-colors">
                      {location.name} <span className="text-normal4" style={{ color: "var(--tt-color-text-gray)" }}>- {location.address}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              <ThemeButton
                text="Choose a Location to Order"
                href="/order"
                textClassname="pr-[8px] pl-[14px] text-white"
                className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
              />
              <ThemeButton
                text="Back to Menu"
                href={`/menu#${product.category}`}
                showArrow={false}
                textClassname="pr-[14px] pl-[14px]"
                textColor="text-[var(--tt-color-text-gray)]"
                className="bg-transparent border-2 border-white/10 hover:border-primary-dark transition-all"
              />
            </div>
          </div>
        </section>

        <section className="mb-[60px] max-w-4xl">
          <h2 className="text-h4 sm:text-h3 italic mb-4">About {product.name}</h2>
          <div className="space-y-4 text-normal2 leading-relaxed" style={{ color: "var(--tt-color-text-gray)" }}>
            <p>
              {expandedDescription}
            </p>
            <p>
              The current listed menu price is {product.price}.
              {locationNames.length > 0
                ? ` It is currently available at ${formatList(locationNames)}.`
                : ""}
              {menuLabels
                ? ` The menu currently labels it ${menuLabels}.`
                : ""}
            </p>
            <p>{categoryInfo.description}</p>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mb-[50px]">
            <div className="flex items-end justify-between mb-[20px] gap-4">
              <h2 className="text-h4 sm:text-h3 italic">More {categoryInfo.name}</h2>
              <Link href={`/menu#${product.category}`} className="text-normal3 text-accent hover:text-white transition-colors whitespace-nowrap">View the full menu</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
              {relatedProducts.map((item) => (
                <Link key={item.slug} href={productPath(item)} className="dish-card group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden">
                  <div className="relative h-[140px] sm:h-[180px] overflow-hidden">
                    <SmartImage src={item.image} alt={item.imageAlt ?? item.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-normal3 sm:text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate" style={{ fontFamily: "var(--default-font-family)" }}>{item.name}</h3>
                    <p className="text-normal3 text-accent font-bold">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
