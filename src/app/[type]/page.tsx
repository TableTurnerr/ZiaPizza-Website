import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  locationTypes,
  getLocationsByType,
  getLocationType,
  type LocationType,
} from "@/data/locations";

export function generateStaticParams() {
  return locationTypes.map((t) => ({ type: t.slug }));
}

export default async function LocationTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const typeInfo = getLocationType(type);
  if (!typeInfo) notFound();

  const typeLocations = getLocationsByType(type as LocationType);

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
          <span className="text-white">{typeInfo.name}</span>
        </div>

        <div className="max-w-4xl mb-12">
          <p className="text-accent text-normal3 font-semibold tracking-wider uppercase mb-2">
            {typeInfo.tagline}
          </p>
          <h1 className="text-h3 sm:text-h2 font-semibold mb-4">
            {typeInfo.name}
          </h1>
          <p className="text-normal1 text-gray-400 max-w-2xl">
            {typeInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typeLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/${type}/${location.slug}`}
              className="group bg-navy-card border border-navy-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-card/90 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-h5 font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {location.name}
                </h2>
                <p className="text-normal3 text-gray-400 mb-2">
                  {location.address}
                </p>
                <p className="text-normal4 text-gray-500 mb-4">
                  {location.hours}
                </p>
                <p className="text-normal3 text-gray-400 line-clamp-2">
                  {location.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-normal3 text-accent font-semibold">
                  View Location
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
