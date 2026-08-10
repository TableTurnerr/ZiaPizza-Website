# Zia Pizza: Full-Site SEO Implementation Report

**Audit date:** 11 August 2026  
**Repository:** `ZiaPizza-Website`  
**Framework:** Next.js 16.2.2 App Router  
**Intended canonical domain:** `https://ziapizza.co.uk`  
**Audience:** The AI agent or developer implementing the next SEO release

---

## 1. Purpose and implementation rule

This is an implementation handoff, not a generic SEO checklist. It is based on:

- the current repository and content data;
- a successful production build (`next build`, 138 generated routes);
- inspection of representative prerendered HTML;
- live HTTP checks of the apex and `www` hosts;
- current Google Search Central and Next.js 16 documentation.

The next agent should treat the confirmed production-domain problem as the first release gate. Adding more copy while Google is being directed to the wrong host will not solve the site's main indexing problem.

Do not invent product ingredients, allergens, awards, founder history, opening hours, delivery areas, review totals, deal terms, or origin stories to fill content. Every operational claim must be confirmed by the business. SEO copy must be useful to customers first and must not be keyword-stuffed.

---

## 2. Executive summary

The repository is substantially better than the older SEO reports suggest: it now uses Next.js server rendering/static generation, has a text menu, has location pages, emits a sitemap, and includes some structured data. The current build is crawlable.

However, production currently undermines those improvements:

1. `https://ziapizza.co.uk` and `https://www.ziapizza.co.uk` serve two different websites with no redirect.
2. The current Next.js site is served from `www`, but all of its canonicals, structured-data URLs, robots sitemap reference, and sitemap entries point to the apex host.
3. The apex host serves a legacy nginx site and returns the same legacy homepage with HTTP `200` for paths such as `/menu` and a deliberately nonexistent URL. This is a sitewide soft-404/duplicate-host condition.
4. The apex `/sitemap.xml` returns HTML rather than an XML sitemap. The valid XML sitemap is on `www`, but it lists apex URLs.
5. Eight real public routes inherit the homepage canonical because the root layout defines a canonical and those pages do not override it.
6. The default `/og-image.jpg` referenced throughout metadata and structured data does not exist and returns `404`.
7. The catalogue creates 103 location-product URLs from 85 products. The unique product description averages only 8.6 words; all 85 descriptions contain fewer than 20 words. Eighteen products are duplicated across both location URL trees with the same description.
8. The two active location descriptions contain only 22 and 34 words. Useful location fields already in the data, including galleries and features, are not rendered on the location pages.
9. The sitemap contains 115 URLs but omits seven intended public routes: two format hubs, catering, loyalty, and three blog posts. It also gives every URL a build-time `lastModified`, even when nothing changed.
10. Blog posts have incorrect homepage canonicals, are absent from the sitemap, lack article schema, have no visible modified date, contain little internal linking, and the newest post is from March 2025. The January 2025 offers post may now be stale.
11. The loyalty page has no `<h1>`. The order page is a client-only page that inherits homepage title, description, and canonical.
12. Westbury's `Restaurant` schema claims the same opening hours seven days a week even though the visible data says Monday is closed and hours vary by day.

The recommended strategy is:

- unify production on one host before all other releases;
- decide which catalogue items deserve indexable pages instead of padding every drink, dip, and size variant;
- centralize shared products into one canonical product URL where possible;
- build genuinely useful, verified product and location content from structured fields;
- fix metadata, sitemaps, structured data, internal linking, social images, and performance as shared template work;
- connect the final architecture to Google Business Profiles and Search Console.

---

## 3. Confirmed current-state evidence

### 3.1 Production host split — P0

Live checks on 10 August 2026 UTC found:

| Request | Observed response |
|---|---|
| `https://ziapizza.co.uk/` | `200`, nginx, 1.6 KB legacy HTML, old title mentioning Westbury, Salisbury, and Trowbridge |
| `https://www.ziapizza.co.uk/` | `200`, Vercel/Next.js, current site |
| `https://ziapizza.co.uk/menu` | `200`, but returns the legacy homepage |
| `https://www.ziapizza.co.uk/menu` | `200`, current text menu |
| `https://ziapizza.co.uk/not-a-real-page-12345` | `200`, legacy homepage — soft 404 |
| `https://www.ziapizza.co.uk/not-a-real-page-12345` | proper `404` |
| `https://ziapizza.co.uk/sitemap.xml` | `200 text/html`, legacy HTML rather than XML |
| `https://www.ziapizza.co.uk/sitemap.xml` | `200 application/xml`, 115 entries, but every `<loc>` uses the apex host |
| `https://www.ziapizza.co.uk/og-image.jpg` | `404` |

The current `www` homepage emits a canonical of `https://ziapizza.co.uk`; `/menu` emits `https://ziapizza.co.uk/menu`. Therefore, the current site explicitly tells crawlers that the legacy soft-404 host is authoritative.

One CLI pass also encountered an intermittent certificate-name/SNI failure on the apex host. Re-test TLS from multiple networks after the domain migration.

### 3.2 Build and crawl surface

The production build succeeds and prerenders the marketing site:

- 2 format hub pages;
- 2 active location pages;
- 2 location menu pages;
- 103 location-product pages;
- 3 blog posts;
- 9 other public static pages;
- robots and sitemap routes.

The public marketing surface is approximately 122 indexable HTML routes before exclusions. The sitemap contains 115 entries.

### 3.3 Product content measurements

| Measure | Current value |
|---|---:|
| Products in `products.json` | 85 |
| Generated location-product URLs | 103 |
| Products available at both branches | 18 |
| Average product-description length | 8.6 words |
| Descriptions under 10 words | 54 |
| Descriptions under 20 words | 85 |
| Shortest / longest description | 3 / 17 words |

Average description by category:

| Category | Products | Average words |
|---|---:|---:|
| Pizzas | 19 | 10.6 |
| Pastas | 8 | 11.1 |
| Starters | 19 | 9.1 |
| Desserts | 14 | 8.4 |
| Drinks | 16 | 6.2 |
| Dips | 9 | 5.4 |

There are also repeated descriptions among wing sizes, chicken-strip sizes, energy drinks, and large-bottle variants. Those should generally be variants of one item rather than separate SEO landing pages.

### 3.4 Location content measurements

| Location | Active | Location description | Product count | Deals | Gallery images | Features |
|---|---:|---:|---:|---:|---:|---:|
| Salisbury | Yes | 34 words | 34 | 4 | 4 | 4 |
| Westbury | Yes | 22 words | 69 | 6 | 4 | 4 |
| Southport | Coming soon | 21 words | 0 | 0 | 0 | 4 |

The location template currently does not render the saved gallery or feature list, leaving valuable local content unused.

### 3.5 Metadata and schema evidence from built HTML

- `/about`, `/catering`, `/loyalty`, `/blog`, `/order`, and all three blog posts canonicalize to the homepage.
- `/order` uses the homepage title and description.
- `/loyalty` has zero `<h1>` elements.
- The default `FoodEstablishment` JSON-LD appears on every public page, including blog posts and individual menu items.
- Location pages add `Restaurant` and `BreadcrumbList`; most other templates have no page-specific schema.
- Child `openGraph` objects replace the root object due to Next.js shallow metadata merging. Several format/menu routes therefore lose the shared image, locale, site name, and type fields.
- Routes that do not define `openGraph` inherit homepage social copy even when their HTML title and description are page-specific.

### 3.6 Performance evidence

Google PageSpeed API data was unavailable because the public API quota was exhausted, so this report does not invent a Lighthouse score. The build still provides useful risk evidence:

- representative pages reference about 671–684 KB of raw JavaScript before compression;
- the shared stylesheet is about 83 KB raw;
- `/menu` produces roughly 364 KB of HTML because it renders the full catalogue and Next.js payload in one document;
- a full-screen splash blocks the page for at least 1.2 seconds plus a 640 ms exit, and may remain until a 4-second fallback;
- the splash logo, header logo, and homepage hero are all requested with high priority/preload behaviour, creating competition for the meaningful LCP image;
- `SmoothScroll` runs a continuous `requestAnimationFrame` loop on every non-admin page;
- public media totals about 19.7 MB, though most page images are passed through `next/image`.

These are risks, not field CWV results. Measure field data in Search Console and lab data per template after the domain is fixed.

---

## 4. Prioritized implementation backlog

### P0 — release blockers

| ID | Task | Why it blocks SEO |
|---|---|---|
| P0-01 | Unify apex and `www` on one current site | Crawlers are currently sent to a different legacy site |
| P0-02 | Eliminate apex soft 404s and make unknown routes return `404`/`410` | Legacy fallback returns `200` for every path |
| P0-03 | Align canonical URLs, sitemap URLs, robots sitemap reference, OG URLs, and JSON-LD URLs to the chosen host | Current signals conflict |
| P0-04 | Correct inherited homepage canonicals | Eight real pages tell Google they are duplicates of home |
| P0-05 | Decide the indexable catalogue set and canonical product architecture | Publishing more copy before this decision may amplify duplication |

### P1 — high-impact template and content work

| ID | Task |
|---|---|
| P1-01 | Expand index-worthy product content from verified structured fields |
| P1-02 | Expand Salisbury and Westbury location pages with genuinely local content |
| P1-03 | Rebuild the sitemap using only canonical, indexable URLs and real modification dates |
| P1-04 | Add valid per-template metadata and real OG images |
| P1-05 | Correct and expand structured data, especially location hours |
| P1-06 | Link central menu cards and category pages to indexable products |
| P1-07 | Correct stale or unsupported claims, offers, ratings, and blog content |
| P1-08 | Remove or radically shorten the splash and reduce shared client JavaScript |
| P1-09 | Give every indexable page one descriptive H1 and useful visible content |

### P2 — growth and authority

| ID | Task |
|---|---|
| P2-01 | Build high-intent category/dietary landing pages after allergen verification |
| P2-02 | Develop a first-hand local/editorial content programme |
| P2-03 | Align each Google Business Profile with its dedicated location page and action URLs |
| P2-04 | Earn local citations and links through real partnerships, press, suppliers, events, and community work |
| P2-05 | Add automated SEO regression tests and monitoring |

---

## 5. Required implementation sequence

### Phase 0: confirm business facts before copy generation

Create a short, owner-approved source-of-truth document or data set covering:

- legal and public-facing brand names for Restaurant versus Express;
- active locations and whether Trowbridge still belongs to the brand;
- Southport launch status, address, opening date, contact details, and whether it should be public;
- exact hours by day and holiday-hour process;
- dine-in, takeaway, collection, and delivery availability per location;
- direct ordering and booking URLs per location;
- verified ingredients, recipes, dough fermentation time, oven temperature, and supplier/origin claims;
- all allergens and cross-contamination wording approved by operations;
- dietary classifications and whether “gluten-free” means ingredient choice, preparation environment, or coeliac-safe;
- offer dates, channels, exclusions, minimum spend, age/party restrictions, and location eligibility;
- real loyalty rules and tiers;
- founder story, founding year, Naples/Zia Maria claims, and company history;
- current Google review rating/count for each location, source URL, and date captured;
- official social profiles.

Do not proceed with bulk content generation until this verification step is complete. Existing copy makes specific claims about 2009, Naples, Zia Maria, 48-hour dough, 400°C ovens, San Marzano tomatoes, and Fior di latte. These may be excellent trust signals only if they are true.

### Phase 1: repair production routing and canonical host

Recommended target: retain `https://ziapizza.co.uk` as the canonical host because the repository already uses it consistently, but make the apex serve the current Vercel/Next.js application. Configure `www` to issue a permanent path-preserving redirect to apex.

Required behaviour:

```text
http://ziapizza.co.uk/menu?x=1      -> 308 https://ziapizza.co.uk/menu?x=1
http://www.ziapizza.co.uk/menu?x=1  -> 308 https://ziapizza.co.uk/menu?x=1
https://www.ziapizza.co.uk/menu?x=1 -> 308 https://ziapizza.co.uk/menu?x=1
https://ziapizza.co.uk/menu?x=1     -> 200 current Next.js menu
https://ziapizza.co.uk/fake-path    -> 404 current Next.js not-found page
```

Prefer the hosting provider's primary-domain redirect over application code. The apex request currently reaches nginx, so a redirect added only to the Next.js app cannot fix apex traffic until DNS/hosting is changed.

Retire the old nginx SPA or place it on a non-indexable archive/staging hostname. Create a redirect map for any valuable legacy routes before removal. Preserve paths and query strings.

After the change:

1. Re-test TLS for apex and `www` from multiple networks.
2. Confirm the apex `/robots.txt` is plain text.
3. Confirm the apex `/sitemap.xml` is valid XML.
4. Confirm every sitemap URL returns the current page, not the legacy homepage.
5. Confirm a random unknown URL returns `404`.
6. Add and verify a Search Console Domain property so both host variants are visible during migration.

### Phase 2: establish the indexable URL architecture

#### 2.1 Product architecture — recommended

Do not retain one indexable page for every product-location combination when the product is identical. Create one canonical product entity and URL, for example:

```text
/menu/pizzas/hot-honey-pepperoni
/menu/pastas/carbonara
/menu/starters/garlic-dough-balls
```

The page should show location availability, location-specific price/size differences, and direct links to the applicable location menu/order experience.

Redirect existing location-product URLs to the central product URL when the item is the same:

```text
/zia-pizza/salisbury/menu/margherita
/zia-pizza-express/westbury/menu/margherita
    -> /menu/pizzas/margherita
```

If an item is materially different by location—different recipe, size, price structure, photos, or service—use a variant model on one product page first. Maintain separate indexable location pages only when the visible content and user intent are genuinely different.

Before changing routes, generate a complete old-to-new redirect CSV/JSON and ensure every current sitemap URL has a destination.

#### 2.2 Do not create SEO pages for every commodity

The next agent must create an explicit `indexable` decision per item.

Good candidates for indexable, enriched pages:

- signature and popular pizzas;
- distinctive pasta dishes;
- branded/unique starters and loaded fries;
- house-made or signature desserts;
- verified vegan and gluten-free offerings with safe wording;
- items that receive impressions in Search Console.

Poor candidates for standalone indexable pages unless search data proves demand:

- Coca-Cola, Sprite, Fanta, bottled water, and energy drinks;
- individual dip flavours;
- separate 4/6/12 wing pages;
- separate 4/6 chicken-strip pages;
- separate bottle-size pages;
- near-identical variants with only quantity or price changed.

Combine size variants into one page or leave commodity items on the menu/category page. If legacy routes must remain temporarily, use `noindex, follow`, remove them from the sitemap, and stop linking them as SEO destinations. Prefer consolidation/redirects over maintaining a large noindex catalogue.

#### 2.3 Format hub pages

`/zia-pizza` currently competes with Salisbury's location page for “Italian restaurant Salisbury,” and `/zia-pizza-express` competes with Westbury for takeaway/delivery intent. Each format currently has only one active branch.

Choose one of these approaches:

- **Recommended until a format has multiple active branches:** redirect the format hub to its active location, or make it a non-indexable navigation page.
- **When multiple branches exist:** retain the hub but target format-level intent, explain Restaurant versus Express, list all branches, and avoid city-specific title copy.

The `/zia-pizza` hub currently includes the coming-soon Southport record because `getLocationsByType` does not filter it, while its metadata refers only to Salisbury. Fix that inconsistency regardless of the chosen strategy.

#### 2.4 Location URLs

The existing location URLs can remain if redirects and indexing history make stability preferable. A clearer future structure would be `/locations/salisbury`, but do not migrate solely for aesthetics. If changed, use permanent one-to-one redirects and update all internal links, GBP links, canonicals, sitemaps, and structured data in the same release.

### Phase 3: shared metadata and crawl controls

#### 3.1 Root metadata

In `src/app/layout.tsx`:

- keep `metadataBase`;
- change `title` to `{ default, template: "%s | Zia Pizza" }` and remove duplicated branding from page titles;
- remove the root canonical; a root canonical is inherited by pages that do not override it;
- remove the `keywords` field; Google does not use the meta keywords tag;
- replace the broken default OG reference with a real file or generated image;
- keep only truly global metadata in the root;
- replace the generic sitewide `FoodEstablishment` with a verified `Organization`/brand entity on the homepage, then define each `Restaurant` on its location page;
- sanitize JSON-LD by replacing `<` with `\u003c` after `JSON.stringify`.

Create a single shared SEO helper, for example `src/lib/seo.ts`, containing:

- `SITE_URL` and brand constants;
- `absoluteUrl(path)`;
- title/description normalization;
- page metadata builder;
- OG/Twitter defaults;
- `safeJsonLd(data)`;
- reusable breadcrumb builder;
- indexability flags.

Do not manually repeat `const BASE = ...` across route files.

#### 3.2 Canonicals

Every indexable route must emit one self-referencing canonical on the chosen host. Every consolidated/duplicate route must redirect or canonicalize to the true equivalent. Canonical targets must:

- return `200`;
- contain equivalent visible content;
- be indexable;
- use the same host as the sitemap;
- be linked internally.

Do not canonicalize distinct pages such as About, Catering, Loyalty, or a blog article to Home.

#### 3.3 Open Graph and Twitter

Add a real 1200×630 default image with branded food photography and readable safe-area text. Recommended implementation:

- `src/app/opengraph-image.tsx` for a generated default; or
- `src/app/opengraph-image.jpg` if a fixed asset is approved.

Add route-specific images for:

- each location;
- signature product pages;
- blog posts;
- catering;
- offers when a current campaign image exists.

Next.js metadata objects merge shallowly. A route that defines `openGraph` must explicitly include or spread shared `siteName`, `locale`, `type`, and image fields. Ensure Twitter has an image too. Remove `@ziapizza` unless the business confirms that it owns and uses that handle.

#### 3.4 Sitemap

Update `src/app/sitemap.ts` so it:

- uses the chosen canonical host;
- includes only `200`, canonical, indexable URLs;
- includes catering, loyalty, valid blog posts, and any retained format/category hubs;
- imports blog data and emits each article URL;
- excludes admin/API routes, redirects, noindex pages, coming-soon pages without launch value, and commodity product routes that are not indexable;
- uses actual `updatedAt`/`dateModified` values;
- does not set `new Date()` on every URL at every build;
- optionally includes representative image URLs for location/product/article pages.

Google does not need arbitrary sitemap `priority` or `changeFrequency` values to understand importance. Internal links, canonicals, freshness, and content matter more. It is acceptable to omit those fields.

#### 3.5 Robots and status codes

Keep `/admin/` and `/api/` disallowed. Confirm admin layouts continue to emit `noindex`. Add the canonical host if desired through the supported robots `host` field, but do not rely on it instead of redirects/canonicals.

Add a branded `src/app/not-found.tsx` with links to menu, locations, order, and home. Ensure missing products, locations, blog posts, and arbitrary dynamic paths return HTTP `404`, not a soft 404.

### Phase 4: product content redesign

#### 4.1 Product data model

Replace the single short `description` as the only content source. Expand the product record and the admin product form to support:

```text
name
slug
category
shortDescription          card/menu summary, approximately 15–30 useful words
longDescription           unique customer-facing explanation
ingredients[]             verified ingredients only
base / sauce / cheese / toppings
preparation               verified preparation and texture
flavourProfile[]
heatLevel
sizes[]                    size, price, location, SKU/variant
locationAvailability[]
dietary                    vegetarian/vegan/gluten-free option with definitions
allergens[]                operations-approved only
crossContaminationNote     operations-approved only
customisations[]
pairingProductSlugs[]
relatedProductSlugs[]
image
imageAlt
gallery[]                  optional, with alt/caption
popular / signature
indexable
canonicalProductSlug       only if merging records
seoTitle
seoDescription
primaryKeyword
secondaryKeywords[]
updatedAt
```

Price should not be one global string if it may vary by location or size. Store numeric values/currency in a structured variant model and format them for display.

#### 4.2 Product page template

For an indexable signature product, the template should contain:

1. One H1 with the dish name.
2. A concise intro explaining what it is and why it is distinctive.
3. Visible price/size/availability per location.
4. Verified ingredients and preparation.
5. Flavour and texture description.
6. Dietary/allergen information with approved cross-contamination wording.
7. Customisation options, where available.
8. “Available at” links to dedicated location pages and menus.
9. Direct order links that preserve location context; ideally deep-link to the item.
10. Pairings or related dishes selected manually, not random filler.
11. A short, useful FAQ only where customers actually ask those questions.
12. Breadcrumbs and breadcrumb JSON-LD.

Recommended unique-copy QA ranges—not ranking rules:

- signature pizza/pasta/dessert: approximately 150–300 useful words across sections;
- simpler house item: approximately 100–180 words;
- category page: approximately 300–600 words plus the catalogue;
- commodity item: no standalone index page unless proven by data.

Do not turn ingredients into padded prose. Completeness, uniqueness, and decision-support are the goals.

#### 4.3 Product keyword pattern

Use one primary topic and a small natural set of related terms. Example for Hot Honey Pepperoni:

- primary: `hot honey pepperoni pizza`;
- related: `stone-baked pepperoni pizza`, `spicy pizza`, `hot honey pizza at Zia Pizza`;
- local availability within the body: `available in Salisbury and Westbury`;
- title example: `Hot Honey Pepperoni Pizza | Zia Pizza`;
- description example: describe the verified toppings, flavour, available locations, and order action in one natural sentence.

Do not repeat “pizza Salisbury” in every heading. Location pages should own broad city intent; product pages should own dish intent and mention availability naturally.

#### 4.4 Product schema

Restaurant menu items do not automatically need Google merchant-listing schema. The current pages link to a generic external ordering platform rather than allowing purchase of the exact item on the page, so they may not meet Google's merchant-listing eligibility.

Recommended approach:

- use Schema.org `Menu`, `MenuSection`, `MenuItem`, and `Offer` semantics where the visible page supports them;
- add `BreadcrumbList` to product pages;
- use Google's `Product`/merchant markup only if the exact item can be purchased and all required visible price/availability/offer data is truthful;
- never add fake ratings, inventory, SKUs, or reviews solely to satisfy validators;
- validate with Schema Markup Validator and Google Rich Results Test, understanding that `MenuItem` may aid entity understanding without producing a Google rich result.

### Phase 5: location and local SEO content

#### 5.1 Location data model

Expand each location record with:

```text
shortDescription
intro
uniqueStory
address components
latitude / longitude
googleMapsUrl / place ID
hoursByDay[]
specialHours[]
phone / email
serviceModes[]            dine-in, takeaway, delivery, collection
deliveryAreas[]           only genuinely served areas/postcodes
parking
publicTransport
walkingDirections
nearbyLandmarks[]         verified and genuinely helpful
accessibility[]
seating / groupCapacity
familyFacilities
bookingPolicy
orderUrl / bookingUrl
platform URLs
features[]
gallery[]                 image, alt, caption
reviewSourceUrl
reviewRatingSnapshot
reviewCountSnapshot
reviewCheckedAt
priceRange
acceptedPayments[]
seo fields
updatedAt
```

Replace `openTime`/`closeTime` plus a free-text `hours` string with a day-by-day structure. Westbury's current structured data is wrong because one time range is applied to all seven days.

#### 5.2 Location page content outline

Each active location page should include:

- H1: the actual branch name and city;
- a unique 80–150 word introduction;
- clear order/book actions appropriate to that branch;
- complete day-by-day opening hours;
- phone, email, and postal address in consistent NAP format;
- menu highlights linked to canonical product/category pages;
- verified dine-in/takeaway/delivery/collection options;
- parking, accessibility, public transport, and useful directions;
- delivery/collection areas where operationally accurate;
- branch-specific deals with terms and validity;
- the existing location features rendered visibly;
- the existing real-photo gallery with meaningful alt text/captions;
- branch-specific reviews with source links and “checked on” dates;
- map and directions link;
- a short local FAQ;
- related catering, loyalty, offers, and blog links.

Recommended total unique-copy QA range: roughly 700–1,200 words across these useful sections. This is not a requirement to pad the page. A shorter page that answers all branch-specific questions is better than templated city-name substitution.

#### 5.3 Local keyword map

Use Search Console and a commercial keyword tool to validate volume and wording. Until those exports exist, use the following intent map without fabricated volume claims.

| Route/topic | Primary intent | Natural supporting terms |
|---|---|---|
| Home | Zia Pizza; stone-baked pizza/Italian dining brand | Italian pizza restaurant, takeaway and delivery, Wiltshire, Salisbury, Westbury |
| Salisbury location | pizza Salisbury; Italian restaurant Salisbury | pizza delivery Salisbury, pizza takeaway Salisbury, family restaurant Salisbury, stone-baked pizza Salisbury, pasta Salisbury, Silver Street, SP1 |
| Westbury location | pizza Westbury Wiltshire; pizza takeaway Westbury | pizza delivery Westbury, order pizza Westbury, stone-baked pizza Westbury, Italian takeaway Westbury, BA13, pizza deals Westbury |
| Salisbury menu | Zia Pizza Salisbury menu | pizza menu Salisbury, pasta menu Salisbury, vegetarian options Salisbury |
| Westbury menu | Zia Pizza Westbury menu | takeaway menu Westbury, vegan pizza Westbury, gluten-free pizza Westbury, pizza deals Westbury |
| Catering | pizza catering Salisbury/Westbury | corporate catering Wiltshire, office lunch catering, group pizza orders, party catering |
| Offers | pizza deals Salisbury/Westbury | family pizza deal, Tuesday pizza deal Salisbury, direct order bundle Westbury |
| Loyalty | Zia Pizza rewards/app | pizza loyalty programme, restaurant rewards app |
| Product pages | exact dish intent | ingredients, flavour, dietary properties, available locations, order intent |
| Blog/local guides | informational first-hand intent | dough process, ingredient stories, local events, family dining, catering planning |

Avoid trying to rank by repeatedly writing “near me.” Google derives proximity through the searcher's location, GBP, address consistency, and local relevance.

Westbury is ambiguous internationally. Use “Westbury, Wiltshire,” “BA13,” and the complete address where natural so search engines and users do not confuse it with Westbury, New York or other places.

#### 5.4 Google Business Profile and local citations

For each active branch:

- maintain one owner-controlled profile unless Google's business rules require otherwise;
- match the real-world business name and category, not an SEO-stuffed name;
- use the exact same address, phone, and hours shown on the location page;
- set the website URL to the dedicated canonical location page;
- set order/reservation links to location-specific action pages that complete the action;
- upload real current photos and publish updates/offers with full terms;
- review Google-suggested edits regularly;
- build a review-request process that follows platform rules and never gates unhappy customers;
- reconcile Apple Maps/Bing Places, Facebook, Instagram, TripAdvisor, Just Eat, Deliveroo, Uber Eats, local directories, and food-hygiene listings.

The apex legacy page currently advertises Trowbridge while the new site contains coming-soon Southport. Resolve this entity/NAP conflict before requesting re-indexing.

### Phase 6: page-by-page content and SEO requirements

#### Homepage `/`

Current strengths:

- one H1;
- substantial rendered text;
- clear location and conversion sections;
- server-rendered content.

Required improvements:

- shorten the overlong title/description without losing Salisbury and Westbury relevance;
- verify “since 2009” and all ingredient/process claims;
- link featured product cards to canonical product pages, not only `/order`;
- replace the static combined review number with sourced per-location or clearly aggregated data and a checked date;
- replace the roast-dinner review if it refers to a different/legacy venue and does not describe the current pizza business;
- add `Organization` schema with verified logo, legal name, contact point, and official `sameAs` links;
- remove Southport's green “active” dot while it is coming soon;
- filter coming-soon social/footer links that contain placeholders;
- remove the full-screen splash or make it non-blocking.

#### Menu hub `/menu`

Current strengths:

- full text menu rather than scanned images;
- headings and category descriptions;
- server rendering.

Required improvements:

- make every indexable product card a link to its canonical product page;
- show which branch(es) stock each item and any location/size price differences;
- do not imply every displayed item is available at both branches;
- split high-value categories into crawlable routes if Search Console shows demand;
- add useful location/dietary filters without hiding core links from HTML;
- include an allergen information link and approved wording;
- reduce the 364 KB HTML payload by moving to category routes or limiting hydrated data;
- add `Menu`/`MenuSection` semantic schema where visible data supports it.

#### Location pages

Use the outline in section 5. Render the currently unused gallery and features. Add location-specific menu, offers, reviews, directions, accessibility, and service-area information. Correct Westbury hours schema.

#### Location menu pages

- keep one H1 and unique branch introduction;
- add branch-specific offer/order context;
- link item cards to canonical central product pages;
- add breadcrumbs in both UI and JSON-LD;
- include last-updated date and an allergen notice;
- ensure exclusive items and prices are clear;
- avoid competing with the location page for the same broad city keyword.

#### Offers `/offers`

Current metadata mentions “student discounts,” but no student discount exists in the current location deal data. Remove unsupported copy.

Expand the offer model and UI to include:

- `validFrom` and `validThrough`;
- applicable locations;
- eligible days/times;
- dine-in/takeaway/direct-order/platform channel;
- included items and size restrictions;
- exclusions and minimum spend;
- redemption instructions;
- terms URL or visible terms;
- active/expired status;
- offer-specific order link.

Expired offers should be removed, marked expired with alternatives, or redirected when a clear successor exists. Do not leave old promotions ranking without current terms.

#### Catering `/catering`

This page has a useful 454-word foundation but currently canonicalizes to home and is absent from the sitemap.

Add verified:

- branch/coverage area;
- guest-count ranges;
- lead times and order deadlines;
- collection/delivery/setup options;
- package examples or pricing guidance;
- dietary/allergen process;
- corporate-account/invoicing process;
- cancellation/change terms;
- case studies or real client examples with permission;
- FAQs and a direct phone/email fallback;
- links to relevant menu items and location pages.

Use `Service`/`FoodService` semantics only where accurate. Do not invent clients or testimonial quotes.

#### Loyalty `/loyalty`

- add one H1;
- set a self canonical and include the page in the sitemap;
- verify every tier, point threshold, birthday reward, and “free every month” claim;
- explain earning rate, redemption, expiry, participating channels/locations, exclusions, account support, and terms;
- include links to the real app listings and privacy/terms;
- remove placeholder or speculative tiers if they are not the current programme.

#### Order `/order`

Split the page into a Server Component wrapper that exports route metadata and a child client component for the location picker.

Recommended indexable positioning if the page remains useful:

- title around `Order Pizza Online in Salisbury & Westbury | Zia Pizza`;
- self canonical;
- short, visible explanation of collection/delivery options by location;
- links to each location menu and order platform;
- a graceful no-JavaScript fallback with normal links.

If the page remains only a thin redirect utility, use `noindex, follow` and remove it from the sitemap instead of pretending it is a substantive landing page.

#### Locations `/locations`

- add a concise comparison of Restaurant versus Express;
- show services, hours summary, and branch-specific links;
- add a text list that remains useful if maps fail;
- add a map/directions link for each branch;
- use `ItemList` only if it truthfully represents visible location cards;
- avoid duplicating entire location-page copy.

#### About `/about`

- correct the canonical;
- verify the Naples/Zia Maria/founding story;
- add a factual timeline, people/team, sourcing/process, group relationship, and real photography;
- link claims to supporting pages where appropriate;
- add press/community/supplier details only when real;
- use `AboutPage` plus the homepage `Organization` entity rather than another generic Restaurant entity.

#### Contact `/contact`

- retain the self canonical;
- make each NAP block link to its location page and maps directions;
- identify response-time expectations and which channel handles bookings/orders;
- ensure forms expose success/error states and work without misleading users;
- consider `ContactPage` schema, but prioritize accurate NAP over extra markup.

#### Blog hub and posts

Current issues:

- hub and all posts canonicalize to home;
- posts are omitted from the sitemap;
- no `BlogPosting`/`Article` JSON-LD;
- no `dateModified`;
- very short articles with little internal linking;
- latest publication is March 2025;
- January 2025 offer copy may be expired and conflicts with current deals.

Implementation:

- add self canonicals and article-specific OG images;
- add `BlogPosting` schema with headline, description, image, author, publisher, datePublished, dateModified, and mainEntityOfPage;
- give authors real profile/about information rather than generic labels where possible;
- add topic/category pages only after enough content exists;
- add contextual links to locations, categories, products, catering, and offers;
- add related posts selected by topic;
- update, expire, redirect, or remove stale offer articles;
- display published and updated dates;
- add `updatedAt`, `coverAlt`, `canonical`, `relatedLocationSlugs`, `relatedProductSlugs`, and optional `expiresAt` to frontmatter.

Suggested first-hand topic clusters:

1. Dough and craft: verified fermentation process, stone baking, chef technique.
2. Ingredient stories: verified tomato, cheese, flour, chilli, truffle, or local supplier features.
3. Menu guides: choosing a pizza by flavour, vegetarian/vegan options, pairing starters/desserts.
4. Local dining: genuinely useful Salisbury/Westbury family dining, event, parking, or pre-theatre guides based on first-hand knowledge.
5. Catering: group quantity planning, office lunch planning, serving logistics, and real event examples.
6. Seasonal/offer content: only with dates, terms, and expiry handling.

Do not publish generic “best restaurants in Salisbury” listicles that exist only to insert keywords. The brand has stronger first-hand subjects.

#### Southport coming-soon page

Current code internally links to the Southport record from the footer and format hub while metadata noindexes it; the homepage hero also shows Southport with a green dot.

Choose one state:

- **Not ready/public:** remove crawlable footer/type links, placeholder social/contact links, and green status indicators; return 404 until launch content exists.
- **Real pre-launch campaign:** build a dedicated page with a confirmed location, genuine launch information, signup/contact purpose, opening target, real images, and self canonical. Index only if it provides meaningful public value.

Never publish fake opening hours, `#` order links, or empty map/social fields in structured data.

### Phase 7: structured data implementation map

| Template | Recommended schema | Notes |
|---|---|---|
| Homepage | `Organization` (or the most accurate brand entity), `WebSite` | Verified logo/contact/sameAs; no fake search action |
| Location page | `Restaurant`, `BreadcrumbList` | Correct day-by-day hours, NAP, geo, menu, acceptsReservations, hasMap, priceRange |
| Locations hub | `ItemList` optional | Only for visible location list |
| Menu page | `Menu`, `MenuSection` | Semantic benefit; no guaranteed rich result |
| Product page | `MenuItem`, `Offer`, `BreadcrumbList` | Use `Product` only when Google eligibility and visible data are satisfied |
| Blog post | `BlogPosting`, `BreadcrumbList` | Published/modified dates and real author/publisher |
| Catering | `Service` optional, `BreadcrumbList` | Must match visible service and area data |
| Offers | `Offer` optional | Only when terms, dates, location, and price are visible |
| About | `AboutPage`, shared Organization ID | Avoid duplicating unrelated business entities |
| Contact | `ContactPage` optional | NAP accuracy is more important |

Use stable `@id` references, for example:

```text
https://ziapizza.co.uk/#organization
https://ziapizza.co.uk/locations/salisbury#restaurant
https://ziapizza.co.uk/menu/pizzas/margherita#menuitem
```

Do not add `AggregateRating` to the business solely from copied Google/Just Eat reviews. Google does not display self-serving LocalBusiness/Organization review snippets, and all marked-up ratings must be visible, current, sourced, and policy-compliant.

### Phase 8: internal linking and information architecture

Implement the following predictable paths:

```text
Home
  -> Locations hub
      -> Salisbury location -> Salisbury menu/order/offers/catering
      -> Westbury location  -> Westbury menu/order/offers
  -> Menu hub
      -> Category pages
          -> Indexable product pages
              -> Available locations and related items
  -> Offers
      -> Applicable location/product/order link
  -> Catering
      -> Relevant packages/menu/location
  -> Blog
      -> Contextual product/location/category links
```

Rules:

- use descriptive anchors such as “Salisbury pizza menu,” not repeated “View” or “Click here” alone;
- link every indexable page from at least one crawlable HTML page;
- do not rely on client-side filters as the only path to products;
- do not link to redirecting/noindex URLs in primary navigation or sitemaps;
- add breadcrumb UI and JSON-LD to product, menu, blog, catering, offers, about, loyalty, order, and contact pages;
- related products should be editorially relevant and not always the first four array items;
- footer location lists must filter coming-soon/placeholder records appropriately.

### Phase 9: image SEO and performance

#### Image SEO

- Create the missing default OG asset first.
- Add `imageAlt` and optional `caption` to content models rather than deriving all alt text from product names.
- Alt text should identify what is visible and its useful context, for example “Hot honey pepperoni pizza with chilli honey and Parmesan,” not a keyword list.
- Use empty alt text only for genuinely decorative images.
- Keep real filenames lowercase, hyphenated, and stable for new uploads; existing files contain spaces and inconsistent case.
- Add width/height or `fill` plus accurate `sizes` to every image. Current `SmartImage` usage is generally good.
- Add location/gallery images to an image sitemap only after captions/alt and canonical pages are ready.

#### Performance implementation

1. Remove the mandatory splash overlay. If the brand insists on an animation, make it non-blocking, under a few hundred milliseconds, and never wait for `window.load`.
2. Remove the manual root logo preload unless measurement proves it is the LCP resource.
3. Do not mark the header logo, splash logo, and hero image all high priority. Prioritize only the true above-the-fold LCP image.
4. Convert `Header` and `Footer` to Server Components where possible; isolate only mobile menu/path/booking behaviour into small client children.
5. Load Lenis only where it produces measured value, or remove it. A continuous RAF loop on every page is unnecessary for SEO/conversion.
6. Keep `Reveal` progressive: core content must be visible without hydration and to reduced-motion users.
7. Reduce `/menu` document size using server-rendered category pages and smaller client islands.
8. Audit fonts/subsets; the build contains multiple Latin-ext/Cyrillic font files despite an English-only site.
9. Keep below-fold media lazy and reserve dimensions to protect CLS.
10. Run mobile Lighthouse on Home, a location, menu, product, catering, blog article, and order—not only Home.

Acceptance targets at the 75th percentile of real users:

- LCP ≤ 2.5 seconds;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

Do not claim these targets are achieved until Search Console/CrUX field data confirms them.

---

## 6. File-by-file implementation map

| File/area | Required work |
|---|---|
| Hosting/DNS/Vercel/nginx | Serve one current site; permanent path-preserving host redirects; retire legacy fallback; fix TLS |
| `src/app/layout.tsx` | Remove inherited root canonical/meta keywords; add title template; real OG; homepage Organization strategy; safe JSON-LD; remove redundant preload |
| `src/lib/seo.ts` (new) | Central URL, metadata, OG, breadcrumb, and JSON-LD helpers |
| `src/components/JsonLd.tsx` (new) | Safe reusable JSON-LD rendering |
| `src/app/sitemap.ts` | Canonical host, real dates, full valid coverage, indexable-product filter, blog entries |
| `src/app/robots.ts` | Correct sitemap host; keep private paths blocked |
| `src/app/not-found.tsx` (new) | Branded useful 404 |
| `src/app/opengraph-image.tsx` or image asset | Replace missing `/og-image.jpg` |
| `src/content/products.json` | Expanded product model, variants, indexability, SEO, update dates, verified dietary/allergen data |
| `src/data/products.ts` | New types/selectors; central route helpers; variant/availability support |
| `src/lib/content.ts` | Update record types and admin persistence fields |
| `src/components/admin/ProductForm.tsx` | Editors for new verified content/SEO/indexability fields |
| Product route(s) | Central canonical route, rich content sections, breadcrumbs/schema, old route redirects |
| `src/app/menu/page.tsx` | Product links, availability, filters, category routes, allergen link, smaller payload |
| Location menu template | Link canonical products; branch intro; last-updated/allergen info; breadcrumbs/schema |
| `src/content/locations.json` | Day-by-day hours, geo, directions, accessibility, service areas, review snapshot, richer unique copy, update dates |
| `src/data/locations.ts` | New structured types; active/coming-soon selectors; correct hours logic |
| `src/components/admin/LocationForm.tsx` | Editors for structured location fields |
| Location page template | Render features/gallery/local content; correct Restaurant schema; reviews/directions/FAQs |
| Type hub template | Redirect/noindex until multi-location, or unique format intent; filter coming-soon records |
| `src/app/order/page.tsx` | Move interactive UI to child client component; add server metadata/content or noindex decision |
| `src/app/loyalty/page.tsx` | H1, canonical, verified programme content, terms |
| `src/app/catering/page.tsx` | Canonical, local intent, packages/logistics/FAQ, relevant schema |
| `src/app/offers/page.tsx` and deal model | Remove student-discount claim; dates/terms/channels/expiry/deep links |
| Blog data/frontmatter/routes | Self canonicals, sitemap, Article schema, modified dates, author data, related links, stale-content handling |
| Homepage sections | Link products; verify ratings/claims; coming-soon state; remove misleading review |
| `Header.tsx` / `Footer.tsx` | Smaller client islands; filter placeholder/coming-soon links; descriptive location links |
| `SplashScreen.tsx` | Remove from root layout or make non-blocking |
| `SmoothScroll.tsx` | Remove or scope based on measurement |
| `scripts/seo-audit.mjs` (new) | Automated crawl/metadata/schema/link assertions against build or local server |

---

## 7. Automated acceptance tests for the next agent

The implementation is not complete when the code compiles. Add a repeatable SEO audit script and pass all of the following.

### 7.1 Build and route checks

- `npm run build` passes without new warnings.
- Every intended indexable route returns `200`.
- Every removed/consolidated route returns one permanent redirect to its final URL, without chains.
- Every nonexistent route returns `404`.
- No indexable page depends on client-side JavaScript to expose its primary text or links.

### 7.2 Per-page HTML assertions

For every indexable URL:

- exactly one non-empty H1;
- unique, descriptive title;
- useful meta description;
- exactly one canonical;
- canonical equals the final preferred URL;
- canonical target returns `200` and is indexable;
- `index, follow` or no conflicting robots directive;
- absolute, working OG image;
- Twitter card/image where desired;
- one or more internal inlinks;
- no broken internal links/images;
- page-specific breadcrumb UI and matching JSON-LD where applicable;
- valid JSON-LD whose facts are visible on the page;
- no placeholder `#` action/social URLs.

For every noindex URL:

- excluded from sitemap;
- not used in primary internal navigation;
- no indexable page canonicalizes to it.

### 7.3 Sitemap/robots assertions

- apex `/sitemap.xml` is `application/xml` or valid XML content;
- every sitemap URL is canonical, indexable, current-host, and returns `200`;
- no redirects, 404s, admin/API routes, soft 404s, or noindex URLs in sitemap;
- blog and relevant static pages included;
- modification dates reflect content, not build time;
- robots references the exact working sitemap URL.

### 7.4 External validation

After deployment:

1. Crawl the canonical host with a desktop/mobile crawler.
2. Run Google Rich Results Test on homepage, both locations, one product, one article, and catering.
3. Run Schema Markup Validator for `MenuItem`/`Menu` semantics.
4. Use Search Console URL Inspection on the same templates.
5. Submit the sitemap in Search Console and Bing Webmaster Tools.
6. Request indexing only after canonicals and host redirects are correct.
7. Test mobile Lighthouse on all representative templates.
8. Test GBP website/order/reservation links for each branch.
9. Re-crawl after 7–14 days and compare indexed canonical selection.

---

## 8. Measurement plan and KPIs

No current Search Console export was available in the repository. Older reports contain estimates, not a reliable August 2026 baseline. The next agent should not claim ranking or traffic gains without account data.

### Baseline exports before release

Export 16 months where available:

- clicks, impressions, CTR, and average position by query and page;
- country and device;
- branded versus non-branded query groups;
- Salisbury versus Westbury query groups;
- product/category/catering query groups;
- Page Indexing report and exclusion reasons;
- submitted versus indexed sitemap counts;
- Core Web Vitals by URL group;
- structured-data enhancement reports;
- top landing-page conversions from privacy-compliant analytics;
- GBP calls, directions, website clicks, bookings, and orders per location.

### Post-release checkpoints

| Timing | Review |
|---|---|
| 48 hours | Host redirects, TLS, robots, sitemap parsing, status codes, broken assets |
| 1–2 weeks | Google-selected canonicals, crawl errors, sitemap discovery, schema errors |
| 4 weeks | Indexation by template, early impressions, CWV lab/field movement |
| 8–12 weeks | Non-brand clicks, local query visibility, product/category landing performance, conversions |
| Quarterly | Content decay, offer expiry, hours/NAP, stale reviews, orphan/redirect checks |

Suggested outcome KPIs:

- 100% of indexable sitemap URLs return `200` and self-canonicalize;
- zero indexable URLs on the legacy host;
- zero real pages canonicalized to home by mistake;
- zero sitemap URLs that redirect, noindex, 404, or soft-404;
- all active location structured data valid and consistent with visible hours/NAP;
- all indexable signature product pages meet the approved content-field completeness threshold;
- rising non-branded local impressions/clicks for Salisbury and Westbury clusters;
- measurable order/booking/catering leads from organic landing pages;
- “Good” CWV at the 75th percentile for major URL groups.

Do not set a target like “rank #1 in 30 days.” Rankings are competitive and not guaranteed.

---

## 9. Guardrails for AI-generated implementation

The next AI agent must follow these rules:

1. Do not bulk-write copy before the URL/indexability architecture is approved.
2. Do not create facts. Use `TODO: BUSINESS VERIFICATION REQUIRED` when source data is missing.
3. Do not use the meta keywords tag as an SEO deliverable.
4. Do not keyword-stuff headings, alt text, titles, or paragraphs.
5. Do not create one thin page per city, postcode, dietary tag, or product variant merely to increase page count.
6. Do not mark content with schema that is not visibly present and accurate.
7. Do not add fake or copied `AggregateRating` markup.
8. Do not call a base “gluten-free” or “coeliac-safe” beyond operations-approved wording.
9. Do not leave expired offers or changing review counts hard-coded without a date/process.
10. Do not change URLs without a full redirect map and sitemap/internal-link migration.
11. Do not declare SEO complete after `next build`; run the acceptance tests above.
12. Read the repository's Next.js 16 documentation in `node_modules/next/dist/docs/` before implementing framework-specific metadata, redirects, or route conventions.

---

## 10. Definition of done

The SEO implementation is complete only when:

- the current Next.js site is served on the chosen canonical host;
- all alternate host/protocol variants permanently redirect with path/query preservation;
- the legacy SPA no longer answers canonical paths;
- real 404s return `404`;
- canonicals, robots, sitemap, OG, and JSON-LD agree on one host;
- the sitemap contains only canonical/indexable `200` URLs with real dates;
- the product catalogue has a documented index/merge/variant strategy;
- signature products have verified, useful, unique content and structured availability;
- commodity/variant pages are consolidated or excluded appropriately;
- location pages have unique local content, correct daily hours, features, gallery, directions, services, and valid Restaurant schema;
- About, Blog, Catering, Loyalty, Order, and blog posts have correct canonical/indexing decisions;
- Loyalty has an H1;
- the broken OG image is replaced;
- stale offers/reviews/claims are corrected or removed;
- automated metadata/link/sitemap/status checks pass;
- representative templates pass schema and mobile performance validation;
- Search Console and GBP monitoring are configured.

---

## 11. Primary references

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: Review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Google Business Profile representation guidelines](https://support.google.com/business/answer/3038177)
- [Google Business Profile business-link policies](https://support.google.com/business/answer/13769188)
- [Next.js 16: Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js 16: `generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js 16: JSON-LD](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js 16: sitemap file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

---

## 12. Final handoff note

The highest-leverage move is not “add keywords everywhere.” It is to make one current site authoritative, reduce duplicate/thin catalogue URLs, and then publish verified content that helps a customer choose a branch, dish, offer, or service. Once that foundation is correct, location pages, signature products, catering, and first-hand editorial content can build durable local search visibility.
