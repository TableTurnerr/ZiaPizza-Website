import React from "react";
import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlog } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-1">Edit post</h1>
      <div className="text-normal4 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>{post.slug}</div>
      <BlogForm initial={post} mode="edit" />
    </div>
  );
}
