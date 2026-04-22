import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getProducts, upsertProduct, slugify, ProductRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  return NextResponse.json(getProducts());
}

export async function POST(request: Request) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const body = (await request.json()) as Partial<ProductRecord>;
  if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const slug = body.slug ? slugify(body.slug) : slugify(body.name);
  const record: ProductRecord = {
    slug,
    name: body.name,
    category: body.category ?? "pizzas",
    description: body.description ?? "",
    price: body.price ?? "",
    image: body.image ?? "",
    tags: body.tags ?? [],
    locationSlugs: body.locationSlugs ?? [],
  };
  upsertProduct(record);
  return NextResponse.json({ ok: true, slug: record.slug });
}
