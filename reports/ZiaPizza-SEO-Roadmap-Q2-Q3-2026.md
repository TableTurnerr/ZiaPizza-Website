# Zia Pizza -- 3-Month SEO Roadmap

**Period:** April 2026 -- July 2026
**Domain:** ziapizza.co.uk
**Baseline Score:** 2.8/10 (from April 1 audit)
**Target Score:** 6.5--7.5/10 by end of July 2026

---

## Current State Summary

The April 2026 audit scored ziapizza.co.uk at **2.8/10 overall**. The single biggest issue -- no server-side rendering -- has already been resolved by migrating from a Vite/React SPA to **Next.js 16**. This gives the site SSR out of the box, proper per-page meta tags, and a real crawlable HTML response for every route.

**What's already done:**

- Next.js 16 migration (SSR/SSG now available)
- Clean URL structure (/menu, /about, /location/salisbury, etc.)
- HTTPS with 301 redirect from HTTP
- Basic analytics stack (GA4, GTM, Clarity, Meta Pixel, Google Ads)
- Location pages with FAQ content
- Responsive Tailwind CSS layout

**What still needs to happen** -- organized below into three monthly sprints.

---

## Month 1: Technical Foundation (April 14 -- May 11, 2026)

The goal of Month 1 is to fix every technical SEO blocker so that search engines can properly crawl, index, and understand the site.

### Week 1--2: Crawlability & Indexation

| Task | Priority | Details |
|------|----------|---------|
| Generate XML sitemap | Critical | Use Next.js built-in `sitemap.ts` to auto-generate sitemap.xml listing all pages. Submit to Google Search Console and Bing Webmaster Tools. |
| Add `Sitemap:` directive to robots.txt | Critical | `Sitemap: https://ziapizza.co.uk/sitemap.xml` |
| Implement canonical tags | Critical | Add `<link rel="canonical">` to every page via Next.js metadata API. Each page gets its own canonical URL. |
| Fix 404 handling | Critical | Next.js `not-found.tsx` should return proper HTTP 404 status codes instead of soft 200s. |
| Set up Google Search Console | Critical | Verify ownership, submit sitemap, monitor index coverage. Request indexing for all key pages. |
| Set up Bing Webmaster Tools | High | Same as above for Bing. Import from GSC if possible. |

### Week 2--3: Domain Consolidation

| Task | Priority | Details |
|------|----------|---------|
| 301 redirect www to non-www | Critical | `www.ziapizza.co.uk` -> `ziapizza.co.uk` (or vice versa). Pick one canonical version. Configure in hosting/DNS. |
| 301 redirect ziapizzaonline.co.uk | Critical | -> `ziapizza.co.uk/order` |
| 301 redirect westbury.ziapizza.co.uk | Critical | -> `ziapizza.co.uk/location/westbury` |
| 301 redirect ziapizzaltd.com | High | -> `ziapizza.co.uk` |
| Audit all external links | High | Update links on Just Eat, Deliveroo, Uber Eats, Facebook, Instagram bios to point to `ziapizza.co.uk`. |

### Week 3--4: Structured Data & Meta Tags

| Task | Priority | Details |
|------|----------|---------|
| Unique title tags per page | Critical | Homepage: "Zia Pizza | Authentic Italian Pizza in Westbury & Salisbury" (under 60 chars). Each page gets a unique, keyword-rich title. |
| Unique meta descriptions per page | Critical | Under 155 chars each, with local keywords and CTAs. |
| Restaurant schema (JSON-LD) | Critical | Add `Restaurant` schema for each location with address, phone, hours, cuisine, price range, menu URL. |
| FAQPage schema | High | Mark up existing FAQ content on location pages with `FAQPage` structured data. |
| BreadcrumbList schema | High | Add breadcrumb schema for navigation hierarchy (Home > Locations > Salisbury). |
| Fix Open Graph tags | High | Make all OG tags dynamic per page via Next.js metadata. Change `og:image` to absolute URL. Use a food photo (1200x630px) instead of the logo. |
| Fix Twitter Card tags | High | Add `twitter:title`, `twitter:description`. Fix `twitter:image` to absolute URL. |

### Month 1 KPIs

- [ ] All pages returning proper HTTP status codes (200 for real pages, 404 for non-existent)
- [ ] Sitemap live and submitted to GSC + Bing
- [ ] All 4 fragmented domains redirecting to ziapizza.co.uk
- [ ] Structured data validated via Google Rich Results Test (0 errors)
- [ ] Google Search Console showing 10+ indexed pages (up from ~6)

---

## Month 2: Performance & Content (May 12 -- June 8, 2026)

With the technical foundation solid, Month 2 focuses on site speed (Core Web Vitals) and building the content that will drive organic rankings.

### Week 1--2: Image & Performance Optimization

| Task | Priority | Details |
|------|----------|---------|
| Convert all images to WebP/AVIF | Critical | Use Next.js `<Image>` component for automatic optimization. Target: total image payload under 1.5 MB (down from 11.6 MB). |
| Add responsive images | Critical | Use `srcset` and `sizes` via Next.js Image. Serve appropriately sized images per viewport. |
| Lazy load below-the-fold images | Critical | Native `loading="lazy"` on all images except hero/LCP image. |
| Add `width` and `height` to all images | High | Prevents CLS (Cumulative Layout Shift). |
| Fix image filenames and alt text | High | Rename `resturant_imgae_westbury` -> `zia-pizza-restaurant-westbury`. Add descriptive alt text to every image (e.g., "Margherita pizza with fresh basil at Zia Pizza Salisbury"). |
| Reduce font families to 2--3 | High | Keep Poppins (body) + Playfair Display (headings). Drop Italiana, reduce Raleway/Inter to one. Cut Poppins to 400, 600, 700 only. |
| Self-host fonts or use `<link rel="preload">` | High | Replace `@import` in CSS. Eliminates the 3-hop render-blocking waterfall. Use `font-display: swap`. |
| Enable Brotli compression | Medium | Configure on server/CDN. 15--20% savings over gzip. |
| Add CDN (Cloudflare free tier) | Medium | Global edge caching, automatic Brotli, DDoS protection, improved TTFB. |

### Week 2--3: HTML Menu Build

| Task | Priority | Details |
|------|----------|---------|
| Build interactive HTML menu | Critical | Replace scanned JPEG menu images with structured, searchable HTML. Categories: Pizza, Pasta, Burgers, Sides, Drinks, Desserts. |
| Add dietary labels & filters | High | Vegetarian (V), Vegan (VG), Gluten-Free (GF) tags with filter functionality. |
| Add `Menu` schema markup | High | `MenuItem` structured data for key items with name, description, price. |
| Per-location menu variations | Medium | Show correct menu per location with accurate pricing. |

### Week 3--4: Blog Launch & First Content

| Task | Priority | Details |
|------|----------|---------|
| Build blog infrastructure | High | Create `/blog` route with proper Next.js pages, pagination, and category tags. |
| Blog Post 1 | High | "The Story Behind Zia Pizza: From Naples to Wiltshire" -- brand story targeting "Italian restaurant Wiltshire" (800--1,200 words). |
| Blog Post 2 | High | "Our 24-Hour Cold-Fermented Dough: Why It Makes the Best Pizza" -- targets "best pizza" queries (800--1,200 words). |
| Blog Post 3 | Medium | "A Guide to Dining Out in Salisbury: Top Restaurants & Hidden Gems" -- positions Zia as local authority, targets "restaurants Salisbury" (1,000--1,500 words). |
| Add breadcrumb navigation | Medium | Visible breadcrumbs on all inner pages (Home > Menu, Home > Locations > Salisbury). |

### Month 2 KPIs

- [ ] Core Web Vitals in "Good" range: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Total page weight under 2 MB (down from 12+ MB)
- [ ] HTML menu live with schema markup
- [ ] Blog live with 3 published posts
- [ ] Google PageSpeed Insights score: 80+ mobile, 90+ desktop

---

## Month 3: Local SEO & Content Scaling (June 9 -- July 6, 2026)

Month 3 shifts focus to local search dominance in Westbury and Salisbury, plus building a sustainable content engine.

### Week 1--2: Google Business Profile Optimization

| Task | Priority | Details |
|------|----------|---------|
| Fully optimize Westbury GBP | Critical | Complete every attribute: hours, services, amenities, payment methods, accessibility. Upload 20+ photos (interior, exterior, food, staff). Write keyword-rich description. Add all menu items with prices. |
| Fully optimize Salisbury GBP | Critical | Same as above. Salisbury is the weaker profile and needs more attention. |
| Fix NAP consistency | Critical | Remove placeholder phone number (`+44 123 456 7890`) from codebase. Create master NAP document. Audit and update every citation across all platforms. |
| Google Posts strategy | High | Post 2x/week minimum: weekly offers, seasonal items, events (Wednesday Buffet, Thursday Steak Night, Kids Eat for GBP 1 Friday). |
| Enable GBP messaging & booking | Medium | Allow customers to message and book directly from Google. |

### Week 2--3: Review Generation

| Task | Priority | Details |
|------|----------|---------|
| Launch review generation campaign | Critical | Train staff to ask for Google reviews after positive interactions. |
| QR codes for reviews | High | Print QR codes on receipts and table tents linking directly to Google review page for each location. |
| Email follow-up for online orders | High | Request reviews from delivery/collection customers via email. |
| Respond to all existing reviews | High | Reply to every Google, TripAdvisor, and Facebook review within 24 hours. Personalized responses, not templates. |
| **Targets** | -- | Salisbury: 30+ new Google reviews by end of July. Westbury: 50+ new Google reviews by end of July. |

### Week 2--3: Citation Building & Backlinks

| Task | Priority | Details |
|------|----------|---------|
| Submit to additional directories | High | Yelp UK, Foursquare, Yell.com, Thomson Local, Scoot. Ensure NAP is identical everywhere. |
| Local backlink outreach | Medium | Partner with Wiltshire tourism sites (Experience Salisbury already lists Zia). Sponsor local events for listing on event pages. |
| Food blogger outreach | Medium | Invite 3--5 local food bloggers for complimentary meals in exchange for a review/feature with backlink. |
| Verify existing citations | Medium | Check TripAdvisor, Restaurant Guru, Quandoo, Yably, Gourmet Society, Sluurpy, food.gov.uk -- ensure correct NAP, hours, and website URL. |

### Week 3--4: Content Scaling & Social Integration

| Task | Priority | Details |
|------|----------|---------|
| Blog Post 4 | High | "Pizza Delivery in Salisbury: How We Keep It Fresh from Oven to Door" -- local SEO play (800--1,200 words). |
| Blog Post 5 | High | "Best Family Restaurants in Westbury: Where to Take the Kids" -- community content targeting "restaurants Westbury" (1,000--1,500 words). |
| Blog Post 6 | Medium | "Vegetarian & Vegan Pizza Options at Zia Pizza" -- dietary niche targeting (800--1,000 words). |
| Enrich location pages | High | Expand each location page to 500+ words of genuinely unique content. Include: neighborhood description, parking info, nearby attractions, why this location is special. Embed Google reviews or testimonials. |
| Embed Instagram feed on site | Medium | Show latest posts on homepage or location pages. Social proof + fresh content signal. |
| Add customer testimonials section | Medium | Pull best reviews from Google/TripAdvisor onto the site with proper attribution. |

### Month 3 KPIs

- [ ] Both Google Business Profiles fully optimized (100% completion)
- [ ] 30+ new Google reviews for Salisbury, 50+ for Westbury
- [ ] NAP consistent across all 15+ citation sources
- [ ] 6 blog posts published (2 per month target achieved)
- [ ] Appearing in Google Local Pack for at least 1 target keyword per location
- [ ] 15+ indexed pages in Google Search Console (up from ~6)

---

## GDPR & Compliance (Parallel Track -- All 3 Months)

This runs alongside the SEO work but is legally critical and affects trust signals.

| Task | Timeline | Details |
|------|----------|---------|
| Implement cookie consent banner | Month 1, Week 1 | No tracking scripts should fire before consent. Use a CMP (Consent Management Platform) like CookieYes or Osano. |
| Block GA4, Clarity, Meta Pixel pre-consent | Month 1, Week 1 | Configure GTM to gate all tags behind consent. |
| Add Content-Security-Policy header | Month 1 | Protect against XSS, restrict which scripts can run. |
| Add Permissions-Policy header | Month 1 | Restrict browser features (camera, microphone, etc.). |
| Review and update Privacy Policy | Month 1 | Ensure it accurately describes all data collection (Clarity session recording, Meta Pixel, etc.). |
| Cookie policy page with granular controls | Month 2 | Allow users to manage cookie preferences at any time. |

---

## Target Keywords & Ranking Goals

Based on the competitive analysis, these are the keywords to target over 3 months, ordered by achievability:

| Keyword | Monthly Volume | Competition | Target | Target Page |
|---------|---------------|-------------|--------|-------------|
| "pizza delivery Westbury" | 50--200 | Low | Page 1 by July | /location/westbury |
| "Italian restaurant Westbury" | 20--100 | Low | Page 1 by July | /location/westbury |
| "best pizza Westbury" | 20--100 | Low | Page 1 by July | /location/westbury |
| "pizza delivery BA13" | 10--50 | Very Low | Page 1 by June | /location/westbury |
| "halal pizza Salisbury" | 10--50 | Very Low | Page 1 by June | Blog post / location page |
| "vegan pizza Wiltshire" | 10--50 | Low | Page 1 by July | Blog post |
| "pizza delivery Salisbury" | 100--500 | Medium | Page 1--2 by July | /location/salisbury |
| "best pizza Salisbury" | 50--200 | Medium | Page 2 by July | /location/salisbury |
| "Italian restaurant Salisbury" | 100--300 | Medium | Page 2 by July | /location/salisbury |
| "pizza near me" (local pack) | 10,000+ | Very High | Local Pack by July | Google Business Profile |

**Strategy:** Own Westbury first (low competition), then compete in Salisbury (medium competition). "Pizza near me" depends on GBP optimization and reviews, not just website SEO.

---

## Budget & Resource Estimates

| Item | Estimated Cost | Notes |
|------|---------------|-------|
| Cloudflare CDN | Free | Free tier covers all needs |
| Cookie consent CMP | Free--GBP 10/mo | CookieYes free tier or similar |
| QR code printing (review cards) | GBP 20--50 | Local print shop |
| Food blogger outreach (comped meals) | GBP 150--300 | 3--5 bloggers x GBP 30--60 per meal |
| Directory submissions | Free--GBP 100 | Most are free; some premium directories charge |
| Food photography (if needed) | GBP 200--500 | Professional shoot for GBP, social, and website |
| **Total estimated budget** | **GBP 370--960** | Over 3 months |

---

## Success Metrics -- End of July 2026

| Metric | Current (April 2026) | Target (July 2026) |
|--------|---------------------|-------------------|
| Overall SEO Score | 2.8/10 | 6.5--7.5/10 |
| Indexed Pages | ~6 | 20+ |
| Google PageSpeed (Mobile) | ~30 (estimated) | 80+ |
| LCP | 5--8s | < 2.5s |
| Total Page Weight | 12+ MB | < 2 MB |
| Google Reviews (Salisbury) | Very few | 30+ |
| Google Reviews (Westbury) | 79 | 130+ |
| Blog Posts Published | 0 | 6+ |
| Structured Data Types | 0 | 4+ (Restaurant, FAQ, Breadcrumb, Menu) |
| Domain Authority (est.) | 5--15 | 20--25 |
| Ranking Keywords | 0 | 5--10 in Page 1--2 |
| Organic Traffic | Minimal | 200--500 monthly visits |

---

## Weekly Cadence

To keep this roadmap on track, follow this weekly rhythm:

- **Monday:** Publish 1 Google Post per location (offer or event)
- **Wednesday:** Publish 1 Google Post per location (food photo or behind-the-scenes)
- **Friday:** Check Google Search Console for index coverage, errors, and new impressions
- **Bi-weekly:** Publish 1 blog post (alternating local SEO and food/brand content)
- **Monthly:** Full audit check-in -- review KPIs, adjust priorities, update this roadmap

---

*This roadmap is based on findings from the Zia Pizza Full SEO & Performance Audit (April 1, 2026) and the Current Standings Report. It accounts for the completed Next.js 16 migration and focuses on the remaining gaps.*
