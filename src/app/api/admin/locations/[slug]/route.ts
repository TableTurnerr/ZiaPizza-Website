import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getLocations, upsertLocation, deleteLocation, LocationRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const { slug } = await params;
  const body = (await request.json()) as LocationRecord;
  if (body.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }
  const all = getLocations();
  if (!all.find((l) => l.slug === slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  upsertLocation(body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const { slug } = await params;
  deleteLocation(slug);
  return NextResponse.json({ ok: true });
}
