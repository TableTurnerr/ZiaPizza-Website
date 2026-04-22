import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getSite, saveSite, SiteRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  return NextResponse.json(getSite());
}

export async function PUT(request: Request) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const body = (await request.json()) as SiteRecord;
  saveSite(body);
  return NextResponse.json({ ok: true });
}
