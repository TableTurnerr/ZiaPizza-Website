import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content");

export const FILES = {
  locations: path.join(CONTENT_DIR, "locations.json"),
  products: path.join(CONTENT_DIR, "products.json"),
  site: path.join(CONTENT_DIR, "site.json"),
  blogDir: path.join(CONTENT_DIR, "blog"),
};

function readJson<T>(filepath: string): T {
  const raw = fs.readFileSync(filepath, "utf8");
  return JSON.parse(raw) as T;
}

function writeJson(filepath: string, data: unknown) {
  const tmp = `${filepath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  fs.renameSync(tmp, filepath);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---- Locations ----
export type LocationRecord = {
  slug: string;
  name: string;
  type: "zia-pizza" | "zia-pizza-express";
  city: string;
  postcode: string;
  postcodePrefixes: string[];
  address: string;
  phone: string;
  email: string;
  hours: string;
  openTime: string;
  closeTime: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  instagram: string;
  facebook: string;
  orderUrl: string;
  justEat?: string;
  uberEats?: string;
  deliveroo?: string;
  mapEmbed: string;
  deals: { day: string; name: string; description: string; price?: string }[];
};

export function getLocations(): LocationRecord[] {
  return readJson<LocationRecord[]>(FILES.locations);
}

export function saveLocations(locations: LocationRecord[]) {
  writeJson(FILES.locations, locations);
}

export function upsertLocation(next: LocationRecord) {
  const all = getLocations();
  const i = all.findIndex((l) => l.slug === next.slug);
  if (i >= 0) all[i] = next;
  else all.push(next);
  saveLocations(all);
}

export function deleteLocation(slug: string) {
  const all = getLocations().filter((l) => l.slug !== slug);
  saveLocations(all);
}

// ---- Products ----
export type ProductRecord = {
  slug: string;
  name: string;
  category: "pizzas" | "pastas" | "starters" | "desserts" | "drinks" | "dips";
  description: string;
  price: string;
  image: string;
  tags: string[];
  locationSlugs: string[];
};

export function getProducts(): ProductRecord[] {
  return readJson<ProductRecord[]>(FILES.products);
}

export function saveProducts(products: ProductRecord[]) {
  writeJson(FILES.products, products);
}

export function upsertProduct(next: ProductRecord) {
  const all = getProducts();
  const i = all.findIndex((p) => p.slug === next.slug);
  if (i >= 0) all[i] = next;
  else all.push(next);
  saveProducts(all);
}

export function deleteProduct(slug: string) {
  const all = getProducts().filter((p) => p.slug !== slug);
  saveProducts(all);
}

// ---- Site copy ----
export type SiteRecord = {
  hero: { eyebrow: string; headline: string; headlineAccent: string; subtext: string; image: string };
  loyalty: { heading: string; body: string; perks: string[]; appStoreUrl: string; playStoreUrl: string };
  crossBrand: { heading: string; body: string; ctaLabel: string; ctaUrl: string };
  about: { headline: string; body: string };
  footer: { legal: string; tagline: string };
};

export function getSite(): SiteRecord {
  return readJson<SiteRecord>(FILES.site);
}

export function saveSite(site: SiteRecord) {
  writeJson(FILES.site, site);
}

// ---- Blog ----
export type BlogRecord = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  author: string;
  tags: string[];
  content: string;
};

function blogFilePath(slug: string) {
  return path.join(FILES.blogDir, `${slug}.md`);
}

export function getAllBlog(): BlogRecord[] {
  if (!fs.existsSync(FILES.blogDir)) return [];
  return fs
    .readdirSync(FILES.blogDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => readBlogFile(path.join(FILES.blogDir, f)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readBlogFile(filepath: string): BlogRecord {
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const fileSlug = path.basename(filepath).replace(/\.(md|mdx)$/, "");
  return {
    slug: (data.slug as string) ?? fileSlug,
    title: (data.title as string) ?? fileSlug,
    excerpt: (data.excerpt as string) ?? "",
    date: (data.date as string) ?? "",
    cover: (data.cover as string) ?? "",
    author: (data.author as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getBlog(slug: string): BlogRecord | undefined {
  const fp = blogFilePath(slug);
  if (!fs.existsSync(fp)) return undefined;
  return readBlogFile(fp);
}

export function upsertBlog(record: BlogRecord) {
  if (!fs.existsSync(FILES.blogDir)) {
    fs.mkdirSync(FILES.blogDir, { recursive: true });
  }
  const frontmatter = {
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    date: record.date,
    cover: record.cover,
    author: record.author,
    tags: record.tags,
  };
  const file = matter.stringify(record.content, frontmatter);
  const tmp = `${blogFilePath(record.slug)}.tmp`;
  fs.writeFileSync(tmp, file, "utf8");
  fs.renameSync(tmp, blogFilePath(record.slug));
}

export function deleteBlog(slug: string) {
  const fp = blogFilePath(slug);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
}
