import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import ThemeButton from "@/components/ThemeBtn";
import PlatformButton from "@/components/PlatformButton";
import { locations, getLocation, getLocationType, type DayOfWeek } from "@/data/locations";
import { categories, getProductsByLocation, productPath } from "@/data/products";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
    title: location.seoTitle ?? `${location.name} | Italian Pizza in ${location.city}`,
    description: location.seoDescription ?? location.description,
    pathname: `/${type}/${slug}`,
    image: location.image,
    imageAlt: location.name,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ type: string; location: string }>;
}) {
  const { type, location: locationSlug } = await params;
  const location = getLocation(locationSlug);
  const typeInfo = getLocationType(type);

  if (!location || !typeInfo || location.comingSoon || location.type !== type) notFound();

  const locationProducts = getProductsByLocation(locationSlug);
  const availableCategories = categories.filter((category) => locationProducts.some((product) => product.category === category.slug));
  const locationPath = `/${type}/${locationSlug}`;
  const openingHoursSpecification = DAYS.flatMap((day) => {
    const hours = location.hoursByDay?.[day];
    if (!hours || hours.closed || !("opens" in hours) || !("closes" in hours)) return [];
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens: hours.opens, closes: hours.closes }];
  });
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absoluteUrl(locationPath)}#restaurant`,
    name: location.name,
    url: absoluteUrl(locationPath),
    image: absoluteUrl(location.image),
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
    menu: absoluteUrl(`${locationPath}/menu`),
    sameAs: [location.instagram, location.facebook].filter(Boolean),
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  };
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", pathname: "/" },
    { name: typeInfo.name, pathname: `/${type}` },
    { name: location.name, pathname: locationPath },
  ]);

  return (
    <div className="p-[10px]">
      <JsonLd data={locationSchema} />
      <JsonLd data={breadcrumbs} />
      <Header />

      <div className="h-[65px] sm:h-[80px]" />

      <main className="px-[10px] sm:px-[40px] md:px-[70px] lg:px-[80px]">
        <nav aria-label="Breadcrumb" className="text-normal4 mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type}`} className="hover:text-white transition-colors">{typeInfo.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{location.name}</span>
        </nav>

        <section className="relative rounded-[24px] overflow-hidden mb-[50px] h-64 sm:h-80">
          <SmartImage src={location.image} alt={location.name} fill sizes="100vw" className="object-cover brightness-[0.4]" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10">
            <div>
              <span className="bg-primary-dark/80 text-white text-normal4 font-semibold px-3 py-1 rounded-full mb-3 inline-block">{typeInfo.name}</span>
              <h1 className="text-h3 sm:text-h2 text-white">{location.name}</h1>
              <p className="text-normal2" style={{ color: "var(--tt-color-text-gray)" }}>{location.address}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] mb-[60px]">
          <div className="lg:col-span-2">
            <h2 className="text-h4 mb-4">About {location.name}</h2>
            <p className="text-normal1 leading-relaxed mb-[30px]" style={{ color: "var(--tt-color-text-gray)" }}>{location.description}</p>
            <div className="flex flex-wrap gap-[12px]">
              <ThemeButton text="Order Online" href={location.orderUrl} textClassname="pr-[8px] pl-[14px] text-white" className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors" />
              {location.justEat && <PlatformButton platform="justEat" href={location.justEat} />}
              {location.uberEats && <PlatformButton platform="uberEats" href={location.uberEats} />}
              {location.deliveroo && <PlatformButton platform="deliveroo" href={location.deliveroo} />}
            </div>
          </div>

          <aside className="bg-white/5 border border-white/10 rounded-[16px] p-6">
            <h2 className="text-h5 font-semibold mb-4">Visit details</h2>
            <div className="space-y-4 text-normal3">
              <div>
                <p className="text-gray-500 mb-2">Opening hours</p>
                <dl className="space-y-1" style={{ color: "var(--tt-color-text-gray)" }}>
                  {DAYS.map((day) => {
                    const hours = location.hoursByDay?.[day];
                    const label = hours?.closed ? "Closed" : hours && "opens" in hours ? `${hours.opens} - ${hours.closes}` : location.hours;
                    return <div key={day} className="flex justify-between gap-4"><dt>{day}</dt><dd>{label}</dd></div>;
                  })}
                </dl>
              </div>
              {location.phone && <div><p className="text-gray-500 mb-1">Phone</p><a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">{location.phone}</a></div>}
              {location.email && <div><p className="text-gray-500 mb-1">Email</p><a href={`mailto:${location.email}`} className="text-accent hover:underline">{location.email}</a></div>}
              <div className="flex gap-3 pt-2">
                {location.instagram && <a href={location.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" style={{ color: "var(--tt-color-text-gray)" }}>Instagram</a>}
                {location.facebook && <a href={location.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" style={{ color: "var(--tt-color-text-gray)" }}>Facebook</a>}
              </div>
            </div>
          </aside>
        </section>

        {location.features.length > 0 && (
          <section className="mb-[60px]">
            <h2 className="text-h4 mb-[20px]">At this location</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
              {location.features.map((feature) => <li key={feature} className="bg-white/5 border border-white/10 rounded-[16px] p-5 text-normal3 text-white">{feature}</li>)}
            </ul>
          </section>
        )}

        {location.deals.length > 0 && (
          <section className="mb-[60px]">
            <h2 className="text-h4 mb-[20px]">Current deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {location.deals.map((deal, index) => <div key={`${deal.name}-${index}`} className="bg-white/5 border border-white/10 rounded-[16px] p-5"><div className="flex items-center justify-between mb-2"><span className="text-accent text-normal4 font-semibold uppercase">{deal.day}</span>{deal.price && <span className="text-white font-bold text-normal2">{deal.price}</span>}</div><h3 className="text-normal1 font-semibold text-white mb-1">{deal.name}</h3><p className="text-normal3" style={{ color: "var(--tt-color-text-gray)" }}>{deal.description}</p></div>)}
            </div>
          </section>
        )}

        <section className="mb-[60px]">
          <div className="flex items-center justify-between mb-[20px]">
            <h2 className="text-h4">Menu at {location.name}</h2>
            <Link href={`${locationPath}/menu`} className="text-accent font-semibold text-normal3 hover:underline">View full menu</Link>
          </div>
          {availableCategories.slice(0, 3).map((category) => {
            const categoryProducts = locationProducts.filter((product) => product.category === category.slug).slice(0, 4);
            return <div key={category.slug} className="mb-[30px]"><h3 className="text-h5 font-semibold text-white mb-[16px]">{category.name}</h3><div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">{categoryProducts.map((product) => <Link key={product.slug} href={productPath(product)} className="group bg-white/5 border border-white/10 rounded-[16px] overflow-hidden hover:border-accent/40 transition-all"><div className="relative h-32 overflow-hidden"><SmartImage src={product.image} alt={product.imageAlt ?? product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" /></div><div className="p-3"><p className="text-normal3 font-semibold text-white truncate group-hover:text-accent transition-colors">{product.name}</p><p className="text-normal4 text-accent font-bold">{product.price}</p></div></Link>)}</div></div>;
          })}
        </section>

        {location.gallery.length > 0 && (
          <section className="mb-[60px]">
            <h2 className="text-h4 mb-[20px]">Inside {location.name}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">{location.gallery.map((image, index) => <div key={image} className="relative aspect-[4/3] rounded-[16px] overflow-hidden"><SmartImage src={image} alt={`${location.name} gallery image ${index + 1}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" /></div>)}</div>
          </section>
        )}

        {location.mapEmbed && <section className="rounded-[24px] overflow-hidden h-[400px] sm:h-[400px]"><iframe src={location.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${location.name} map`} /></section>}
      </main>

      <div className="h-[100px]" />
      <Footer />
    </div>
  );
}
