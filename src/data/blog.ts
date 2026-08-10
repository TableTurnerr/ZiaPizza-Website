import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt: string;
  cover: string;
  coverAlt: string;
  author: string;
  tags: string[];
  content: string;
  html: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function readPostFile(filename: string): BlogPost | null {
  if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return null;
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) ?? filename.replace(/\.(md|mdx)$/, "");
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? "",
    date: (data.date as string) ?? "",
    updatedAt: (data.updatedAt as string) ?? (data.date as string) ?? "",
    cover: (data.cover as string) ?? "",
    coverAlt: (data.coverAlt as string) ?? (data.title as string) ?? slug,
    author: (data.author as string) ?? "Zia Pizza",
    tags: (data.tags as string[]) ?? [],
    content,
    html,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .map((f) => readPostFile(f))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}
