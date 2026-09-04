import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeButton from "@/components/ThemeBtn";
import PlatformButton from "@/components/PlatformButton";
import { locations, getLocation, getLocationType } from "@/data/locations";
import { getProductsByLocation, categories } from "@/data/products";

const BASE = "https://ziapizza.co.uk";

export function generateStaticParams() {
  return locations
    .filter((l) => !l.comingSoon)
    .map((l) => ({ type: l.type, location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}): Promise<Metadata> {
  const { type, location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc || loc.comingSoon) return { robots: { index: false } };
  const url = `${BASE}/${type}/${slug}`;
  const title = loc.seoTitle ?? `${loc.name} | Stone-Baked Italian Pizza in ${loc.city}`;
  const description = loc.seoDescription ?? loc.description;
  return {
    title,
    description,
    keywords: loc.seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: loc.image.startsWith("/") ? `${BASE}${loc.image}` : loc.image, alt: loc.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}) {
  const { type, location: locationSlug } = await params;
  const location = getLocation(locationSlug);
  const typeInfo = getLocationType(type);

  if (!location || !typeInfo || location.type !== type) notFound();

  const locationProducts = getProductsByLocation(locationSlug);
  const availableCategories = categories.filter((cat) =>
    locationProducts.some((p) => p.category === cat.slug)
  );

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: location.name,
    url: `${BASE}/${type}/${locationSlug}`,
    image: location.image.startsWith("/") ? `${BASE}${location.image}` : location.image,
    telephone: location.phone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(",")[0]?.trim(),
      addressLocality: location.city,
      postalCode: location.postcode,
      addressCountry: "GB",
    },
    servesCuisine: ["Italian", "Pizza", "Pasta"],
    priceRange: "££",
    menu: `${BASE}/${type}/${locationSlug}/menu`,
    sameAs: [location.instagram, location.facebook].filter(Boolean),
    openingHoursSpecification: location.openTime && location.closeTime ? [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: location.openTime,
      closes: location.closeTime,
    }] : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: typeInfo.name, item: `${BASE}/${type}` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${BASE}/${type}/${locationSlug}` },
    ],
  };

  return (
    <div className="p-[10px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <div className="h-[65px] sm:h-[80px]" />

      <div className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        {/* Breadcrumb */}
        <div className="text-normal4 mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}`} className="hover:text-white transition-colors">{typeInfo.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{location.name}</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-[24px] overflow-hidden mb-[50px] h-64 sm:h-80">
          <img src={location.image} alt={location.name} className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10">
            <div>
              <span className="bg-primary-dark/80 text-white text-normal4 font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                {typeInfo.name}
              </span>
              <h1 className="text-h3 sm:text-h2 text-white">{location.name}</h1>
              <p className="text-normal2" style={{ color: "var(--tt-color-text-gray)" }}>
                {location.address}
              </p>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] mb-[60px]">
          <div className="lg:col-span-2">
            <h2 className="text-h4 mb-4">About</h2>
            <p className="text-normal1 leading-relaxed mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
              {location.description}
            </p>
            <div className="flex flex-wrap gap-[12px]">
              <ThemeButton
                text="Order Online"
                href={location.orderUrl}
                textClassname="pr-[8px] pl-[14px] text-white"
                className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
              />
              {location.justEat && <PlatformButton platform="justEat" href={location.justEat} />}
              {location.uberEats && <PlatformButton platform="uberEats" href={location.uberEats} />}
              {location.deliveroo && <PlatformButton platform="deliveroo" href={location.deliveroo} />}
            </div>

            {locationSlug === "westbury" && (
              <div className="mt-6 relative rounded-[20px] overflow-hidden border border-white/10 bg-[#0E1824]">
                <img
                  src="/photos/JOE01044.webp"
                  alt="Catering for groups"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 p-6 sm:p-8">
                  <span className="inline-block text-accent text-[12px] font-bold tracking-widest uppercase mb-3">
                    Catering
                  </span>
                  <h3 className="text-h4 text-white mb-2">
                    Planning a Party, Office Lunch or Special Event?
                  </h3>
                  <p className="text-normal3 mb-4" style={{ color: "var(--tt-color-text-gray)" }}>
                    Fresh stone-baked pizzas, pasta, sides and desserts prepared for groups of 10 or more.
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-6">
                    {["Groups of 10+", "Collection or scheduled delivery", "Vegetarian and dietary options"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-normal3 text-white/80">
                        <svg className="w-4 h-4 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link
                      href="/catering/westbury"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-normal2 px-6 py-3 rounded-xl transition-colors"
                    >
                      Get My Catering Quote
                    </Link>
                    <a
                      href={`https://wa.me/441373865271?text=${encodeURIComponent("Hi Zia Pizza Westbury, I am interested in catering. My event date is [date], and I expect approximately [number] guests. Please send me your catering options.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-normal2 px-5 py-3 rounded-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.847L0 24l6.335-1.56A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.214-3.726.917.979-3.63-.235-.373A9.818 9.818 0 1112 21.818z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:01373865271"
                      className="text-normal3 text-accent hover:underline self-center"
                    >
                      Call 01373 865271
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact card */}
          <div className="bg-white/5 border border-white/10 rounded-[16px] p-6">
            <h3 className="text-h5 font-semibold mb-4">Details</h3>
            <div className="space-y-4 text-normal3">
              <div>
                <p className="text-gray-500 mb-1">Hours</p>
                <p style={{ color: "var(--tt-color-text-gray)" }}>{location.hours}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">
                  {location.phone}
                </a>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <a href={`mailto:${location.email}`} className="text-accent hover:underline">
                  {location.email}
                </a>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={location.instagram} target="_blank" rel="noopener noreferrer"
                  className="hover:text-accent transition-colors text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
                  Instagram
                </a>
                <a href={location.facebook} target="_blank" rel="noopener noreferrer"
                  className="hover:text-accent transition-colors text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Deals */}
        {location.deals.length > 0 && (
          <div className="mb-[60px]">
            <h2 className="text-h4 mb-[20px]">Weekly Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {location.deals.map((deal, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[16px] p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent text-normal4 font-semibold uppercase">{deal.day}</span>
                    {deal.price && <span className="text-white font-bold text-normal2">{deal.price}</span>}
                  </div>
                  <h3 className="text-normal1 font-semibold text-white mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)", fontStyle: "normal" }}>{deal.name}</h3>
                  <p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{deal.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu preview */}
        <div className="mb-[50px]">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-h4">Menu</h2>
            <Link href={`/${type}/${locationSlug}/menu`} className="text-accent font-semibold text-normal3 hover:underline flex items-center gap-1">
              View Full Menu
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {availableCategories.slice(0, 3).map((cat) => {
            const catProducts = locationProducts.filter((p) => p.category === cat.slug).slice(0, 4);
            return (
              <div key={cat.slug} className="mb-[30px]">
                <h3 className="text-h5 font-semibold text-white mb-[16px]">{cat.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
                  {catProducts.map((product) => (
                    <Link key={product.slug} href={`/${type}/${locationSlug}/menu/${product.slug}`}
                      className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-accent/40 transition-all">
                      <div className="relative h-32 overflow-hidden">
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="text-normal3 font-semibold text-white truncate group-hover:text-accent transition-colors">{product.name}</p>
                        <p className="text-normal4 text-accent font-bold">{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="rounded-[24px] overflow-hidden h-[400px] sm:h-[400px]">
          <iframe src={location.mapEmbed} width="100%" height="100%"
            style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title={`${location.name} Map`} />
        </div>
      </div>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
