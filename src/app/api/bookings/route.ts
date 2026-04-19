import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.phone || !body.date || !body.time || !body.locationSlug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // TODO: wire up a real booking provider (eposhybrid, ResDiary, etc.)
  console.log("[booking request]", body);
  return NextResponse.json({ ok: true });
}
