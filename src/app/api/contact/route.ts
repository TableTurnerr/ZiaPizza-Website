import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // TODO: wire up email delivery (Resend, Postmark, etc.)
  console.log("[contact message]", body);
  return NextResponse.json({ ok: true });
}
