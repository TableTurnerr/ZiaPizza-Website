import fs from "node:fs";
import path from "node:path";

const APP_OUTPUT = path.join(process.cwd(), ".next", "server", "app");
const SITE_URL = "https://ziapizza.co.uk";
const failures = [];

function findHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(entryPath);
    return entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

if (!fs.existsSync(APP_OUTPUT)) {
  console.error("SEO audit requires a production build. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = findHtmlFiles(APP_OUTPUT);
let auditedRoutes = 0;
let redirectRoutes = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const label = path.relative(APP_OUTPUT, file).replace(/\\/g, "/");
  if (label.startsWith("admin/") || label.startsWith("_")) continue;
  if (html.includes("__next-page-redirect")) {
    redirectRoutes += 1;
    if (!html.includes("NEXT_REDIRECT") || !html.includes(";308")) {
      failures.push(`${label}: expected a permanent Next.js redirect`);
    }
    continue;
  }
  if (html.includes('name="robots" content="noindex')) continue;
  auditedRoutes += 1;
  const titleCount = (html.match(/<title>/g) ?? []).length;
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  const canonicalMatches = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  const ogImageCount = (html.match(/property="og:image"/g) ?? []).length;

  if (titleCount !== 1) failures.push(`${label}: expected one title, found ${titleCount}`);
  if (h1Count !== 1) failures.push(`${label}: expected one h1, found ${h1Count}`);
  if (canonicalMatches.length !== 1) {
    failures.push(`${label}: expected one canonical, found ${canonicalMatches.length}`);
  } else if (!canonicalMatches[0][1].startsWith(SITE_URL)) {
    failures.push(`${label}: canonical must use ${SITE_URL}`);
  }
  if (ogImageCount !== 1) failures.push(`${label}: expected one og:image, found ${ogImageCount}`);
}

if (failures.length > 0) {
  console.error("SEO audit failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`SEO audit passed for ${auditedRoutes} indexable routes and ${redirectRoutes} permanent redirects.`);
