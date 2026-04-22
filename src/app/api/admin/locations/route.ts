import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getLocations, upsertLocation, slugify, LocationRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  return NextResponse.json(getLocations());
}

export async function POST(request: Request) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const body = (await request.json()) as Partial<LocationRecord>;
  if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const slug = body.slug ? slugify(body.slug) : slugify(body.name);
  const record: LocationRecord = {
    slug,
    name: body.name,
    type: body.type ?? "zia-pizza",
    city: body.city ?? "",
    postcode: body.postcode ?? "",
    postcodePrefixes: body.postcodePrefixes ?? [],
    address: body.address ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    hours: body.hours ?? "",
    openTime: body.openTime ?? "12:00",
    closeTime: body.closeTime ?? "22:00",
    description: body.description ?? "",
    image: body.image ?? "",
    gallery: body.gallery ?? [],
    features: body.features ?? [],
    instagram: body.instagram ?? "",
    facebook: body.facebook ?? "",
    orderUrl: body.orderUrl ?? "",
    justEat: body.justEat,
    uberEats: body.uberEats,
    deliveroo: body.deliveroo,
    mapEmbed: body.mapEmbed ?? "",
    deals: body.deals ?? [],
  };
  upsertLocation(record);
  return NextResponse.json({ ok: true, slug: record.slug });
}
