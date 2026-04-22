import React from "react";
import BlogForm from "@/components/admin/BlogForm";
import type { BlogRecord } from "@/lib/content";

const EMPTY: BlogRecord = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  cover: "",
  author: "",
  tags: [],
  content: "# New post\n\nStart writing…",
};

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-6">New post</h1>
      <BlogForm initial={EMPTY} mode="create" />
    </div>
  );
}
