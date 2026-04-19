import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { sessionCookie, verifySessionToken } from "./auth";

export async function requireAdminPage(): Promise<void> {
  const store = await cookies();
  const token = store.get(sessionCookie.name)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }
}

export async function requireAdminApi(): Promise<NextResponse | null> {
  const store = await cookies();
  const token = store.get(sessionCookie.name)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
