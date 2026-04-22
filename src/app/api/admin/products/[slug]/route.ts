import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getProducts, upsertProduct, deleteProduct, ProductRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const { slug } = await params;
  const body = (await request.json()) as ProductRecord;
  if (body.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }
  if (!getProducts().find((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  upsertProduct(body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const { slug } = await params;
  deleteProduct(slug);
  return NextResponse.json({ ok: true });
}
