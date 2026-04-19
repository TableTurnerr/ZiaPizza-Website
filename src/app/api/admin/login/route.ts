import { NextResponse } from "next/server";
import { getAdminPassword, issueSessionToken, passwordsMatch, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const expected = getAdminPassword();
    if (!body?.password || !passwordsMatch(body.password, expected)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = issueSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: sessionCookie.name,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: sessionCookie.maxAge,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server misconfigured";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
