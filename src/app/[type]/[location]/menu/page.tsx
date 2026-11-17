import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import { locations, getLocation, getLocationType } from "@/data/locations";
import {
  categories,
  getProductsByLocationAndCategory,
  productPath,
} from "@/data/products";
import { salisburyMenuSections, type SalisburyMenuSection, type SalisburyMenuItem } from "@/data/salisburyMenu";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

function SalisburyItemCard({ item }: { item: SalisburyMenuItem }) {
  const TAG_ICONS: Record<string, string> = { vegetarian: "V", vegan: "Ve", "gluten-free": "GF", spicy: "🌶", signature: "★" };
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-[14px] p-5 flex flex-col gap-3">
      {item.note && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent/80 border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full self-start">
          {item.note}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-normal2 font-bold text-white leading-snug">{item.name}</h3>
        <span className="text-accent font-bold text-normal2 whitespace-nowrap flex-shrink-0">{item.price}</span>
      </div>
      <p className="text-normal4 text-white/60 leading-relaxed flex-1">{item.description}</p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
              {TAG_ICONS[tag] ? `${TAG_ICONS[tag]} ${tag}` : tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SalisburyMenuSection({ section }: { section: SalisburyMenuSection }) {
  return (
    <section id={section.id} className="mb-[60px] scroll-mt-[100px]">
      <div className="w-8 h-px mb-4" style={{ background: "#BDA277" }} />
      <h2 className="text-h4 sm:text-h3 text-white italic mb-2">{section.name}</h2>
      {section.note && (
        <p className="text-normal4 text-white/50 mb-6 max-w-2xl leading-relaxed whitespace-pre-line border-l-2 pl-3" style={{ borderColor: "#BDA277" }}>
          {section.note}
        </p>
      )}
      {!section.note && <div className="mb-6" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.items.map((item) => (
          <SalisburyItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return locations
    .filter((location) => !location.comingSoon)
    .map((location) => ({ type: location.type, location: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}): Promise<Metadata> {
  const { type, location: slug } = await params;
  const location = getLocation(slug);
  if (!location || location.comingSoon || location.type !== type) {
    return { robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: `Menu at ${location.name}`,
    description: `Browse the current menu at ${location.name} in ${location.city}, including pizzas, pasta, starters, desserts and drinks.`,
    pathname: `/${type}/${slug}/menu`,
    image: location.image,
    imageAlt: `${location.name} menu`,
  });
}

export default async function LocationMenuPage({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}) {
  const { type, location: locationSlug } = await params;
  const location = getLocation(locationSlug);
  const typeInfo = getLocationType(type);

  if (!location || !typeInfo || location.comingSoon || location.type !== type) notFound();

  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", pathname: "/" },
    { name: typeInfo.name, pathname: `/${type}` },
    { name: location.name, pathname: `/${type}/${location.slug}` },
    { name: "Menu", pathname: `/${type}/${location.slug}/menu` },
  ]);

  return (
    <div className="p-[10px]">
      <JsonLd data={breadcrumbs} />
      <Header />

      <div className="h-[65px] sm:h-[80px]" />

      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}`} className="hover:text-white transition-colors">{typeInfo.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}/${locationSlug}`} className="hover:text-white transition-colors">{location.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Menu</span>
        </nav>

        <section className="mb-[40px] max-w-3xl">
          <div className="text-accent text-[20px] sm:text-[22px] mb-1" style={{ fontFamily: "var(--font-heading), 'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {location.name}
          </div>
          <h1 className="text-h3 sm:text-h2 mb-4 italic">Full Menu</h1>
          <p className="text-normal1" style={{ color: "var(--tt-color-text-gray)" }}>
            Explore dishes currently listed for {location.name}. Select any item to see its description and the locations where it is available.
          </p>
        </section>

        {locationSlug === "salisbury" ? (
          <>
            <div className="mb-6 p-4 rounded-xl border border-accent/20 bg-accent/5 flex gap-3 items-start max-w-2xl">
              <span className="text-accent text-xl flex-shrink-0">🍽</span>
              <div>
                <p className="text-white font-semibold text-normal3 mb-0.5">Dine-in Restaurant Menu</p>
                <p className="text-white/55 text-normal4 leading-relaxed">
                  This is the full dine-in menu at Zia Pizza Salisbury, 46 Silver Street. To order online for collection or delivery, visit our{" "}
                  <Link href="/order" className="text-accent hover:underline">online ordering page</Link>.
                </p>
              </div>
            </div>
            <nav aria-label="Menu sections" className="flex flex-wrap gap-2 mb-[40px] pb-[20px] border-b border-white/10">
              {salisburyMenuSections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="text-normal4 font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-accent/20 hover:border-accent/60 hover:text-accent transition-all">{section.name}</a>
              ))}
            </nav>
            {salisburyMenuSections.map((section) => (
              <SalisburyMenuSection key={section.id} section={section} />
            ))}
          </>
        ) : (
          <>
            <nav aria-label="Menu categories" className="flex flex-wrap gap-2 mb-[40px] pb-[20px] border-b border-white/10">
              {categories.map((category) => {
                const hasProducts = getProductsByLocationAndCategory(locationSlug, category.slug).length > 0;
                if (!hasProducts) return null;
                return <a key={category.slug} href={`#${category.slug}`} className="text-normal4 font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-accent/20 hover:border-accent/60 hover:text-accent transition-all">{category.name}</a>;
              })}
            </nav>
            {categories.map((category) => {
              const categoryProducts = getProductsByLocationAndCategory(locationSlug, category.slug);
              if (categoryProducts.length === 0) return null;
              return (
                <section key={category.slug} id={category.slug} className="mb-[60px] scroll-mt-[100px]">
                  <div className="mb-[22px] flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-h4 sm:text-h3 text-white italic">{category.name}</h2>
                      <p className="text-normal3 text-gray-500 mt-1 max-w-xl">{category.description}</p>
                    </div>
                    <span className="hidden sm:inline-block text-normal4 text-gray-500 whitespace-nowrap">{categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    {categoryProducts.map((product) => (
                      <Link key={product.slug} href={productPath(product)} className="dish-card group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden flex">
                        <div className="relative w-28 sm:w-32 flex-shrink-0 overflow-hidden">
                          <SmartImage src={product.image} alt={product.imageAlt ?? product.name} fill sizes="128px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                        </div>
                        <div className="p-4 flex flex-col justify-center min-w-0 flex-1">
                          <h3 className="text-normal2 font-semibold text-white mb-1 group-hover:text-accent transition-colors truncate" style={{ fontFamily: "var(--default-font-family)" }}>{product.name}</h3>
                          <p className="text-normal3 text-gray-400 line-clamp-3 mb-2 leading-snug">{product.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-accent font-bold text-normal2">{product.price}</span>
                            {product.tags.filter((tag) => tag !== "popular").slice(0, 2).map((tag) => <span key={tag} className="text-[10px] text-gray-400 border border-white/10 rounded-full px-2 py-0.5 capitalize">{tag}</span>)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}

        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark/30 via-white/5 to-accent/10 border border-white/10 rounded-[24px] p-8 sm:p-10 text-center">
          <h2 className="text-h4 sm:text-h3 text-white mb-3 italic">Ready to order?</h2>
          <p className="text-normal2 mb-[24px] max-w-lg mx-auto" style={{ color: "var(--tt-color-text-gray)" }}>Order directly from {location.name} for collection or delivery.</p>
          <a href={location.orderUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-dark hover:bg-primary-dark/90 text-white font-bold px-8 py-3 rounded-[9px] transition-colors border-2 border-primary-dark">Order Now</a>
        </section>
      </main>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
