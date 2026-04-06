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
  getProductsByLocation,
  categories,
  type ProductCategory,
} from "@/data/products";

export function generateStaticParams() {
  return locations.map((l) => ({
    type: l.type,
    location: l.slug,
  }));
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
          <span className="text-white">{location.name}</span>
        </div>

        {/* Hero area */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-64 sm:h-80">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10">
            <div>
              <span className="bg-primary-dark/80 text-white text-normal4 font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                {typeInfo.name}
              </span>
              <h1 className="text-h3 sm:text-h2 font-semibold text-white">
                {location.name}
              </h1>
              <p className="text-normal2 text-gray-300 mt-1">
                {location.address}
              </p>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-h4 font-semibold mb-4">About</h2>
            <p className="text-normal1 text-gray-400 leading-relaxed mb-6">
              {location.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <ThemeBtn
                text="Order Online"
                href={location.orderUrl}
                className="bg-primary-dark border-primary-dark hover:bg-primary hover:border-primary"
                textClassName="text-white pr-2 pl-4"
              />
              {location.justEat && (
                <ThemeBtn
                  text="Just Eat"
                  href={location.justEat}
                  className="bg-transparent border-white/10 hover:bg-white/5"
                  textClassName="text-gray-300 pr-2 pl-4"
                  showArrow={false}
                />
              )}
              {location.uberEats && (
                <ThemeBtn
                  text="Uber Eats"
                  href={location.uberEats}
                  className="bg-transparent border-white/10 hover:bg-white/5"
                  textClassName="text-gray-300 pr-2 pl-4"
                  showArrow={false}
                />
              )}
              {location.deliveroo && (
                <ThemeBtn
                  text="Deliveroo"
                  href={location.deliveroo}
                  className="bg-transparent border-white/10 hover:bg-white/5"
                  textClassName="text-gray-300 pr-2 pl-4"
                  showArrow={false}
                />
              )}
            </div>
          </div>

          {/* Contact card */}
          <div className="bg-navy-card border border-navy-border rounded-2xl p-6">
            <h3 className="text-h5 font-semibold mb-4">Details</h3>
            <div className="space-y-4 text-normal3">
              <div>
                <p className="text-gray-500 mb-1">Hours</p>
                <p className="text-gray-300">{location.hours}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className="text-accent hover:underline"
                >
                  {location.phone}
                </a>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <a
                  href={`mailto:${location.email}`}
                  className="text-accent hover:underline"
                >
                  {location.email}
                </a>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={location.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors text-normal3"
                >
                  Instagram
                </a>
                <a
                  href={location.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors text-normal3"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Deals */}
        {location.deals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-h4 font-semibold mb-6">Weekly Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {location.deals.map((deal, i) => (
                <div
                  key={i}
                  className="bg-navy-card border border-navy-border rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent text-normal4 font-semibold uppercase">
                      {deal.day}
                    </span>
                    {deal.price && (
                      <span className="text-white font-bold text-normal2">
                        {deal.price}
                      </span>
                    )}
                  </div>
                  <h3 className="text-normal1 font-semibold text-white mb-1">
                    {deal.name}
                  </h3>
                  <p className="text-normal3 text-gray-400">
                    {deal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu preview by category */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h4 font-semibold">Menu</h2>
            <Link
              href={`/${type}/${locationSlug}/menu`}
              className="text-accent font-semibold text-normal3 hover:underline flex items-center gap-1"
            >
              View Full Menu
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {availableCategories.slice(0, 3).map((cat) => {
            const catProducts = locationProducts
              .filter((p) => p.category === cat.slug)
              .slice(0, 4);
            return (
              <div key={cat.slug} className="mb-10">
                <h3 className="text-h5 font-semibold text-white mb-4">
                  {cat.name}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {catProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/${type}/${locationSlug}/menu/${product.slug}`}
                      className="group bg-navy-card border border-navy-border rounded-xl overflow-hidden hover:border-accent/40 transition-all"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-normal3 font-semibold text-white truncate group-hover:text-accent transition-colors">
                          {product.name}
                        </p>
                        <p className="text-normal4 text-accent font-semibold">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden h-80">
          <iframe
            src={location.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${location.name} Map`}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
