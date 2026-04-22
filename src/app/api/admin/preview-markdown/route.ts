import { NextResponse } from "next/server";
import { marked } from "marked";
import { requireAdminApi } from "@/lib/admin-guard";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const { content } = (await request.json()) as { content?: string };
  const html = marked.parse(content ?? "", { async: false }) as string;
  return NextResponse.json({ html });
}
