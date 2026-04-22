import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-guard";
import { getAllBlog, upsertBlog, slugify, BlogRecord } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  return NextResponse.json(getAllBlog());
}

export async function POST(request: Request) {
  const unauth = await requireAdminApi();
  if (unauth) return unauth;
  const body = (await request.json()) as Partial<BlogRecord>;
  if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const slug = body.slug ? slugify(body.slug) : slugify(body.title);
  const record: BlogRecord = {
    slug,
    title: body.title,
    excerpt: body.excerpt ?? "",
    date: body.date ?? new Date().toISOString().slice(0, 10),
    cover: body.cover ?? "",
    author: body.author ?? "",
    tags: body.tags ?? [],
    content: body.content ?? "",
  };
  upsertBlog(record);
  return NextResponse.json({ ok: true, slug: record.slug });
}
