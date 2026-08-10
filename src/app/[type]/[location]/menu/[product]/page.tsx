import { notFound, permanentRedirect } from "next/navigation";
import { locations, getLocation } from "@/data/locations";
import { getProduct, productPath, products } from "@/data/products";

/**
 * Legacy location-specific product URLs previously created duplicate copies of
 * each product. Keep their links working while permanently consolidating them
 * on /menu/[category]/[product].
 */
export function generateStaticParams() {
  return locations
    .filter((location) => !location.comingSoon)
    .flatMap((location) =>
      products
        .filter((product) => product.locationSlugs.includes(location.slug))
        .map((product) => ({
          type: location.type,
          location: location.slug,
          product: product.slug,
        }))
    );
}

export default async function LegacyProductRedirect({
  params,
}: {
  params: Promise<{ type: string; location: string; product: string }>;
}) {
  const { type, location: locationSlug, product: productSlug } = await params;
  const location = getLocation(locationSlug);
  const product = getProduct(productSlug);

  if (
    !location ||
    location.comingSoon ||
    location.type !== type ||
    !product ||
    !product.locationSlugs.includes(location.slug)
  ) {
    notFound();
  }

  permanentRedirect(productPath(product));
}
