import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeButton from "@/components/ThemeBtn";
import { locations, getLocation, getLocationType } from "@/data/locations";
import { getProductsByLocation, categories } from "@/data/products";

export function generateStaticParams() {
  return locations.map((l) => ({ type: l.type, location: l.slug }));
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
              {location.justEat && (
                <ThemeButton text="Just Eat" href={location.justEat} showArrow={false}
                  textClassname="pr-[14px] pl-[14px]" textColor="text-[var(--tt-color-text-gray)]"
                  className="bg-transparent border-2 border-white/10 hover:border-primary-dark transition-all" />
              )}
              {location.uberEats && (
                <ThemeButton text="Uber Eats" href={location.uberEats} showArrow={false}
                  textClassname="pr-[14px] pl-[14px]" textColor="text-[var(--tt-color-text-gray)]"
                  className="bg-transparent border-2 border-white/10 hover:border-primary-dark transition-all" />
              )}
              {location.deliveroo && (
                <ThemeButton text="Deliveroo" href={location.deliveroo} showArrow={false}
                  textClassname="pr-[14px] pl-[14px]" textColor="text-[var(--tt-color-text-gray)]"
                  className="bg-transparent border-2 border-white/10 hover:border-primary-dark transition-all" />
              )}
            </div>
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
                  <h3 className="text-normal1 font-semibold text-white mb-1" style={{ fontFamily: "var(--font-geist-sans, sans-serif)", fontStyle: "normal" }}>{deal.name}</h3>
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
