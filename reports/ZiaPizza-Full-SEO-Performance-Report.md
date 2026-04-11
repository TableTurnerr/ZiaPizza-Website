# Zia Pizza (ziapizza.co.uk) -- Comprehensive SEO, Performance & UI/UX Audit Report

**Date:** April 1, 2026
**Prepared for:** Zia Pizza Ltd
**Domain:** ziapizza.co.uk
**Scope:** Full technical SEO audit, site performance analysis, UI/UX evaluation, competitive analysis, and actionable improvement roadmap

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Overview](#2-business-overview)
3. [Technical SEO Audit](#3-technical-seo-audit)
4. [On-Page SEO Analysis](#4-on-page-seo-analysis)
5. [Site Performance & Core Web Vitals](#5-site-performance--core-web-vitals)
6. [UI/UX Evaluation](#6-uiux-evaluation)
7. [Competitive Analysis](#7-competitive-analysis)
8. [Local SEO & Google Business Profile](#8-local-seo--google-business-profile)
9. [Content Strategy Assessment](#9-content-strategy-assessment)
10. [Social Media & Online Presence](#10-social-media--online-presence)
11. [Review & Reputation Analysis](#11-review--reputation-analysis)
12. [Privacy & Legal Compliance](#12-privacy--legal-compliance)
13. [Improvement Roadmap & Solutions](#13-improvement-roadmap--solutions)
14. [Sources & References](#14-sources--references)

---

## 1. Executive Summary

Zia Pizza operates a React-based single-page application (SPA) website serving two locations in Wiltshire, England -- Westbury and Salisbury. While the brand has a solid product offering with authentic Italian pizza and positive customer reviews (96% recommendation rate at Westbury), the website suffers from **critical technical SEO deficiencies** that severely limit its search visibility and organic traffic potential.

### Key Findings at a Glance

| Category | Score | Status |
|----------|-------|--------|
| Technical SEO | 2/10 | Critical |
| On-Page SEO | 3/10 | Poor |
| Site Performance | 3/10 | Poor |
| UI/UX Design | 5/10 | Average |
| Local SEO | 3/10 | Poor |
| Content Strategy | 2/10 | Critical |
| Mobile Experience | 4/10 | Below Average |
| Accessibility | 2/10 | Critical |
| Privacy Compliance | 1/10 | Critical |
| Social Media | 3/10 | Poor |

### Top 5 Critical Issues

1. **No Server-Side Rendering (SSR)** -- The entire site is a client-rendered SPA. Search engines that don't execute JavaScript (Bing, social crawlers) see a completely blank page.
2. **GDPR Non-Compliance** -- 5 tracking scripts (including session recording via Microsoft Clarity) fire without any user consent mechanism.
3. **No Sitemap or Structured Data** -- No XML sitemap exists, and zero schema markup is implemented despite being a multi-location restaurant.
4. **11.6 MB Image Payload** -- Unoptimized images with no WebP/AVIF, no lazy loading, and no responsive image markup.
5. **Domain Fragmentation** -- Brand presence is split across 3+ domains (ziapizza.co.uk, ziapizzaonline.co.uk, ziapizzaltd.com, westbury.ziapizza.co.uk), severely diluting SEO authority.

---

## 2. Business Overview

### Company Profile

| Detail | Information |
|--------|-------------|
| **Legal Entity** | Zia Pizza Ltd |
| **Companies House #** | 07485174 |
| **Founded** | 2011 (under Chef Vittorio Capetti) |
| **Current Ownership** | Nidhin Sajeev & Aleena (acquired 2024) |
| **Locations** | 2 (Westbury, Salisbury) |
| **Cuisine** | Authentic Italian pizza and pasta |
| **USP** | 24-hour cold-fermented dough, imported Italian ingredients |

### Location Details

| Location | Type | Address | Phone | Email |
|----------|------|---------|-------|-------|
| **Salisbury** | Express Restaurant | 46 Silver St, Salisbury, SP1 2NE | 01722 433829 | salisbury@ziapizza.com |
| **Westbury** | Express Restaurant | 15 Palomino Pl, Westbury, BA13 3SD | +44 1373 865271 | westbury@ziapizza.com |

### Service Channels
- Dine-in at both locations
- Online ordering via food-order.net (EPOS Hybrid)
- Delivery via Just Eat, Uber Eats, and Deliveroo
- Table booking via eposhybrid.uk

---

## 3. Technical SEO Audit

### 3.1 Architecture & Rendering

**Platform:** React Single Page Application (SPA)
**Build Tool:** Vite
**Server:** nginx 1.29.0

#### CRITICAL: No Server-Side Rendering

The site uses client-side rendering (CSR) exclusively. Every URL -- including `/`, `/menu`, `/about`, `/contact`, and even `/sitemap.xml` -- returns the identical HTML shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Zia Pizza - Premium Italian Pizza & Dining | Westbury & Salisbury</title>
  <!-- static meta tags -->
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index-CeYCaLYc.js"></script>
</body>
</html>
```

**Impact:**
- Googlebot can render JavaScript but does so in a deferred "second wave" of indexing, making it slower and less reliable
- Bing, Yandex, social media crawlers (Facebook, Twitter/X, LinkedIn), and most other bots see a **completely blank page**
- All client-side meta tags (per-page titles, descriptions) are invisible to non-JS crawlers
- Core Web Vitals scores are severely impacted (nothing renders until 544 KB of JS is downloaded and executed)

### 3.2 Indexation & Crawlability

| Element | Status | Issue |
|---------|--------|-------|
| **Indexed Pages** | ~6 pages | Extremely thin for a 2-location business |
| **robots.txt** | Present, allows all | Missing `Sitemap:` directive |
| **sitemap.xml** | Does not exist | Returns SPA HTML shell instead of XML |
| **Canonical Tags** | Missing | No `<link rel="canonical">` on any page |
| **404 Handling** | Soft 404s | Non-existent URLs return HTTP 200 (SPA shell), not proper 404 |
| **URL Structure** | Clean | Good human-readable paths (/menu, /about, /location/salisbury) |

### 3.3 Domain & Redirect Issues

| Issue | Details |
|-------|---------|
| **www vs non-www** | Both `https://ziapizza.co.uk` and `https://www.ziapizza.co.uk` serve identical content -- no redirect between them. **Duplicate content issue.** |
| **HTTP to HTTPS** | Correctly redirects via 301. |
| **Domain Fragmentation** | Brand is split across: `ziapizza.co.uk`, `westbury.ziapizza.co.uk`, `ziapizzaonline.co.uk`, `ziapizzaltd.com` -- link equity and authority are severely diluted. |
| **ziapizzaonline.co.uk** | Contains only a JavaScript redirect with zero indexable content. |

### 3.4 Security Headers

| Header | Status | Value |
|--------|--------|-------|
| Strict-Transport-Security | Present | `max-age=15768000` (~6 months) |
| X-Frame-Options | Present | `SAMEORIGIN` |
| X-XSS-Protection | Present | `1; mode=block` (deprecated) |
| X-Content-Type-Options | Present | `nosniff` |
| Referrer-Policy | Present | `strict-origin-when-cross-origin` |
| Content-Security-Policy | **Missing** | -- |
| Permissions-Policy | **Missing** | -- |

### 3.5 Solutions: Technical SEO

#### CRITICAL PRIORITY

1. **Implement Server-Side Rendering (SSR) or Static Site Generation (SSG)**
   - Migrate from pure client-side React to **Next.js** or **Remix** for SSR/SSG capabilities
   - Alternatively, implement **pre-rendering** using tools like `react-snap` or `prerender.io` to generate static HTML for each route
   - This single change would fix: blank pages for crawlers, static meta tags, soft 404s, missing canonical tags, and broken sitemap
   - **Expected impact:** 200-400% improvement in indexable content and search visibility

2. **Generate a proper XML sitemap**
   - Create a static `sitemap.xml` listing all pages:
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url><loc>https://ziapizza.co.uk/</loc><priority>1.0</priority></url>
       <url><loc>https://ziapizza.co.uk/menu</loc><priority>0.9</priority></url>
       <url><loc>https://ziapizza.co.uk/location/salisbury</loc><priority>0.8</priority></url>
       <url><loc>https://ziapizza.co.uk/location/westbury</loc><priority>0.8</priority></url>
       <!-- etc -->
     </urlset>
     ```
   - Add `Sitemap: https://ziapizza.co.uk/sitemap.xml` to robots.txt
   - Submit sitemap to Google Search Console and Bing Webmaster Tools

3. **Consolidate domains**
   - 301 redirect `ziapizzaonline.co.uk` -> `ziapizza.co.uk/order`
   - 301 redirect `westbury.ziapizza.co.uk` -> `ziapizza.co.uk/location/westbury`
   - 301 redirect `ziapizzaltd.com` -> `ziapizza.co.uk`
   - All link equity flows to a single domain

4. **Fix www/non-www duplication**
   - Add nginx redirect: `www.ziapizza.co.uk` -> `ziapizza.co.uk` (301)
   - Or vice versa -- pick one canonical version

5. **Implement canonical tags**
   - Add `<link rel="canonical" href="https://ziapizza.co.uk/[path]">` to every page
   - With SSR this becomes trivial; without it, must be done via nginx headers or a pre-rendering solution

6. **Fix 404 handling**
   - Configure nginx to return proper HTTP 404 status for non-existent routes
   - Or implement a catch-all in the SSR framework that returns 404 status with a custom error page

#### HIGH PRIORITY

7. **Add structured data (JSON-LD schema markup)**
   - Implement per-location `Restaurant` schema:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Restaurant",
     "name": "Zia Pizza Salisbury",
     "image": "https://ziapizza.co.uk/images/salisbury.jpg",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "46 Silver St",
       "addressLocality": "Salisbury",
       "postalCode": "SP1 2NE",
       "addressCountry": "GB"
     },
     "telephone": "+441722433829",
     "servesCuisine": ["Italian", "Pizza"],
     "priceRange": "$$",
     "openingHours": "Tu-Su 11:30-23:00",
     "url": "https://ziapizza.co.uk/location/salisbury",
     "menu": "https://ziapizza.co.uk/menu"
   }
   ```
   - Add `FAQPage` schema to location pages (content already exists, just needs markup)
   - Add `BreadcrumbList` schema for navigation hierarchy

8. **Implement proper meta tags per page**
   - Each route needs unique `<title>` and `<meta name="description">`
   - Location pages already have `metaTitle` and `metaDescription` in the JS data -- these need to be rendered server-side

---

## 4. On-Page SEO Analysis

### 4.1 Title Tags

| Page | Current Title | Issues |
|------|--------------|--------|
| All pages (HTML) | "Zia Pizza - Premium Italian Pizza & Dining \| Westbury & Salisbury" | Same title for every URL (slightly over 60 char ideal) |
| Salisbury (JS) | "Pizza Delivery in Salisbury \| Best Pizza in Salisbury" | Only visible after JS execution |
| Westbury (JS) | "Best Pizza in Westbury \| Pizza Delivery in Westbury" | Only visible after JS execution |

### 4.2 Meta Descriptions

| Page | Current Meta Description | Issues |
|------|------------------------|--------|
| All pages (HTML) | "Experience authentic Italian pizza at Zia Pizza. Two premium locations..." (205 chars) | Too long (max 155 chars), same for every URL |
| Salisbury (JS) | "Enjoy fast Pizza Delivery in Salisbury..." | Client-side only |
| Westbury (JS) | "Enjoy the best pizza in Westbury..." | Client-side only |

### 4.3 Heading Hierarchy

**Homepage:**
- H1: "Welcome to Zia Pizza" (good -- single H1)
- H2: "Where Italy Meets Britain", "Choose Your Location", "Special Offers" (x3 duplicate), "A Slice Above the Rest"
- H3: Long paragraph used as H3 (incorrect), "Two Ways to Experience Zia Pizza", "All Current Offers"

**Issues:**
- H3 contains a full paragraph of text (should be body text, not a heading)
- "Special Offers" H2 is duplicated 3 times on the same page
- Heading hierarchy is inconsistent across pages

### 4.4 Image SEO

| Metric | Count | Status |
|--------|-------|--------|
| Total images referenced | 22+ | -- |
| Images with alt text | 3 | Critical |
| Images with descriptive filenames | ~5 | Poor |
| Images with lazy loading | 3 (iframes only) | Critical |
| Images in modern formats (WebP/AVIF) | 0 | Critical |
| Images with srcset/responsive | 0 | Critical |

**Filename issues found:**
- `resturant_image_salisbury` (typo: "resturant")
- `resturant_imgae_westbury` (double typo: "resturant", "imgae")
- `100004.jpg`, `100006.jpg`, `image1.jpg` (non-descriptive)

### 4.5 Open Graph & Social Tags

| Tag | Value | Issue |
|-----|-------|-------|
| og:title | "Zia Pizza - Premium Italian Pizza & Dining" | Static -- same for all pages |
| og:description | "Experience authentic Italian pizza at Zia Pizza..." | Static -- same for all pages |
| og:type | "website" | OK |
| og:image | "/logo.png" | **Uses relative path -- won't work on social platforms** |
| og:url | "https://ziapizza.co.uk" | Static -- always points to homepage |
| twitter:card | "summary_large_image" | OK |
| twitter:site | "@ziapizza" | OK |
| twitter:image | "/logo.png" | **Uses relative path** |
| twitter:title | Missing | -- |
| twitter:description | Missing | -- |

### 4.6 Internal Linking

The site has a reasonable internal link structure:
- Global navigation: Home, Locations, Menu, Deals, About, Blog, Contact
- Footer: Quick Links, Location links, Legal pages (Privacy, Terms, Cookies)
- CTAs: "Order Online", "Book a Table" per location
- Location pages cross-link to order and booking pages

**Issues:**
- Blog page exists in navigation but has no content
- No breadcrumb navigation
- No contextual internal links within body content

### 4.7 Solutions: On-Page SEO

1. **Unique title tags per page** (with SSR):
   - Homepage: "Zia Pizza | Authentic Italian Pizza in Westbury & Salisbury"
   - Menu: "Our Menu | Zia Pizza - Italian Pizza, Pasta & More"
   - Salisbury: "Zia Pizza Salisbury | Pizza Delivery & Dine-In on Silver Street"
   - Keep all titles under 60 characters

2. **Unique meta descriptions per page** (under 155 characters):
   - Homepage: "Award-winning Italian pizza in Wiltshire. Order online for delivery, book a table, or visit us in Westbury & Salisbury."
   - Location pages: Focus on local keywords and CTAs

3. **Fix heading hierarchy:**
   - One H1 per page (already done for most pages)
   - Remove duplicate H2s (deduplicate "Special Offers")
   - Convert paragraph-length H3s to regular `<p>` elements
   - Use H2 for major sections, H3 for subsections consistently

4. **Image optimization:**
   - Add descriptive `alt` text to every image (e.g., `alt="Margherita pizza with fresh basil at Zia Pizza Salisbury"`)
   - Fix filename typos ("resturant" -> "restaurant", "imgae" -> "image")
   - Rename non-descriptive files (100004.jpg -> zia-pizza-interior-westbury.jpg)
   - Convert all images to WebP with JPEG fallback
   - Add `width` and `height` attributes to prevent CLS
   - Implement native `loading="lazy"` on all below-the-fold images
   - Use `<picture>` element with `srcset` for responsive images

5. **Fix Open Graph tags:**
   - Change `og:image` from `/logo.png` to `https://ziapizza.co.uk/logo.png`
   - Make all OG tags dynamic per page (requires SSR)
   - Add missing `twitter:title` and `twitter:description`
   - Use a high-quality food photograph (1200x630px) as the OG image instead of the logo

6. **Enhance internal linking:**
   - Add breadcrumb navigation (Home > Locations > Salisbury)
   - Add contextual links in body content (e.g., "See our full [menu](/menu)" within location pages)
   - Remove the Blog link from navigation until content exists, or populate the blog

---

## 5. Site Performance & Core Web Vitals

### 5.1 Asset Analysis

| Asset | Uncompressed | Gzipped | Notes |
|-------|-------------|---------|-------|
| HTML Shell | 4 KB | ~1.5 KB | Serves for all routes |
| Main JS Bundle | 544 KB | 159 KB | Single monolithic bundle |
| CSS Bundle | 85 KB | 14 KB | Tailwind output |
| **Total Code** | **633 KB** | **176 KB** | -- |
| **Total Images** | **~11.6 MB** | N/A | 22+ images, unoptimized |

### 5.2 Connection Timing

| Metric | Value |
|--------|-------|
| DNS Lookup | 21ms |
| TCP Connect | 235ms |
| TLS Handshake | 456ms |
| Time to First Byte (TTFB) | 671ms |

### 5.3 Font Loading Impact

**5 Google Font families loaded via CSS @import (render-blocking chain):**

| Font | Weights | Est. File Size |
|------|---------|---------------|
| Playfair Display | 400, 500, 600, 700 | ~120 KB |
| Inter | 300, 400, 500, 600 | ~100 KB |
| Italiana | 400 | ~25 KB |
| Raleway | 300, 400, 500, 600, 700 | ~125 KB |
| Poppins | 300, 400, 500, 600, 700, 800, 900 | ~175 KB |
| **Total** | **~25 variants** | **~545 KB** |

**Loading chain:** HTML -> CSS download -> Google Fonts CSS download -> Font file downloads
This creates a 3-hop waterfall before text becomes visible.

### 5.4 Core Web Vitals Risk Assessment

| Metric | Target | Estimated Score | Risk Level |
|--------|--------|----------------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 5-8s (estimated) | CRITICAL |
| **INP** (Interaction to Next Paint) | < 200ms | 200-400ms (estimated) | HIGH |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.2-0.5 (estimated) | HIGH |

**LCP factors:** SPA requires full JS download + parse + execute before any content renders. No SSR. Font loading chain adds ~1-2s. Large unoptimized hero images add further delay.

**INP factors:** Single large JS bundle (544 KB) may block main thread during parse. Framer Motion animations add overhead.

**CLS factors:** No image `width`/`height` attributes, font swapping across 5 font families (FOUT), SPA route transitions with no skeleton/placeholder.

### 5.5 Compression & Caching

| Feature | Status |
|---------|--------|
| Gzip compression | Enabled |
| Brotli compression | **Not enabled** |
| Static asset caching | 1 year (good, with content-hashed filenames) |
| HTML caching | No cache (correct for SPA) |
| CDN | **Not used** |
| Code splitting | **Minimal** (~2 chunks only) |
| Tree shaking | Assumed via Vite |

### 5.6 Solutions: Site Performance

#### CRITICAL

1. **Implement SSR/SSG** (as mentioned in Section 3.5) -- eliminates the blank-page-until-JS-loads problem

2. **Optimize images (save ~9 MB)**
   - Convert all images to WebP (70-80% size reduction):
     - `About Us - Lasagne.png` (1,106 KB PNG -> ~150 KB WebP)
     - `image1.jpg` (785 KB -> ~120 KB WebP)
     - Logo (277 KB PNG -> ~30 KB WebP or convert to SVG)
   - Implement responsive images with `srcset`:
     ```html
     <img srcset="pizza-400w.webp 400w, pizza-800w.webp 800w, pizza-1200w.webp 1200w"
          sizes="(max-width: 768px) 100vw, 50vw"
          src="pizza-800w.webp" alt="Margherita pizza" width="800" height="600" loading="lazy">
     ```
   - Add `loading="lazy"` to all below-the-fold images
   - Use a build plugin like `vite-plugin-image-optimizer` or `sharp` for automated optimization
   - Target: Total image payload under 1.5 MB

3. **Implement code splitting**
   - Split the 544 KB bundle per route using `React.lazy()` and `Suspense`:
     ```jsx
     const MenuPage = React.lazy(() => import('./pages/Menu'));
     const AboutPage = React.lazy(() => import('./pages/About'));
     ```
   - This could reduce initial JS payload by 50-70% for any given page
   - Use Vite's built-in chunk splitting configuration

4. **Optimize font loading**
   - Reduce from 5 font families to 2-3 maximum (e.g., Poppins for body, Playfair Display for headings)
   - Reduce weight variants: Poppins only needs 400, 600, 700 (not all 7 weights)
   - Replace `@import` with `<link rel="preload">`:
     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap">
     ```
   - Self-host fonts for better performance and privacy
   - Use `font-display: optional` for non-critical fonts to eliminate layout shift

#### HIGH PRIORITY

5. **Enable Brotli compression**
   - Add to nginx config:
     ```nginx
     brotli on;
     brotli_types text/html text/css application/javascript application/json;
     brotli_comp_level 6;
     ```
   - Expected 15-20% additional savings over gzip (~25-30 KB saved on JS bundle)

6. **Add a CDN**
   - Use Cloudflare (free tier) or AWS CloudFront
   - Benefits: global edge caching, automatic Brotli, DDoS protection, additional security headers
   - Expected 40-60% improvement in TTFB for users outside the server's region

7. **Add resource hints to HTML head:**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="preconnect" href="https://www.googletagmanager.com">
   <link rel="dns-prefetch" href="https://food-order.net">
   ```

8. **Defer non-critical tracking scripts**
   - Load Google Analytics, Clarity, and Facebook Pixel after the page is interactive
   - Use `requestIdleCallback` or load after `DOMContentLoaded`

---

## 6. UI/UX Evaluation

### 6.1 Design System

| Element | Details |
|---------|---------|
| **Theme** | Dark theme (navy/black background) |
| **Primary Color** | Red (`hsl(357, 78%, 50%)`) |
| **Accent Color** | Gold (`hsl(42, 35%, 70%)`) |
| **Text Color** | Near-white (`hsl(0, 0%, 96%)`) |
| **Body Font** | Poppins (sans-serif) |
| **Heading Font** | Playfair Display (serif) |
| **CSS Framework** | Tailwind CSS |
| **UI Components** | Radix UI (headless) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

### 6.2 Design Strengths

- **Visual appeal:** The dark theme with red/gold accents creates an upscale, Italian restaurant atmosphere
- **Typography contrast:** Serif headings (Playfair Display) paired with sans-serif body (Poppins) creates elegant visual hierarchy
- **Component library:** Radix UI provides accessible, well-tested interactive components
- **Responsive layout:** Tailwind breakpoints are properly implemented (sm/md/lg/xl/2xl)
- **Animations:** Framer Motion adds polish with page transitions and micro-interactions

### 6.3 Design Weaknesses

| Issue | Impact | Severity |
|-------|--------|----------|
| **Dark theme only** -- no light mode option | Accessibility concern for users with visual impairments; may cause readability issues in bright environments | Medium |
| **5 different font families** | Inconsistent typography, slower loading, visual noise | Medium |
| **Gold text on dark background** | Potential contrast ratio issues (WCAG AA requires 4.5:1 minimum) | High |
| **Menu as scanned images** | Cannot zoom, search, or interact with menu items; terrible mobile experience | Critical |
| **No skeleton screens/loading states** | Blank white flash during SPA route transitions and initial load | High |
| **Excessive animations** | Multiple animation types (bounce, pulse, enter/exit) may feel overwhelming and harm performance | Low |

### 6.4 Navigation & Information Architecture

**Global Navigation:**
Home | Locations | Menu | Deals | About | Blog | Contact

**Assessment:**
- Navigation structure is logical and covers key user journeys
- **Blog link leads to an empty page** -- should be removed until populated
- Location pages have clear sub-navigation to order/book for each location
- Footer contains quick links, location info, and legal pages
- Missing: Search functionality, language selector

### 6.5 User Journeys

**Journey 1: "I want to order pizza for delivery"**
1. Land on homepage -> 2. See "Order Online" CTA -> 3. Choose location -> 4. Redirected to food-order.net (external)

**Issues:** The ordering flow exits the ziapizza.co.uk domain entirely. User loses brand continuity. Any SEO value from ordering pages goes to food-order.net.

**Journey 2: "I want to see the menu"**
1. Click "Menu" in nav -> 2. See scanned menu images (JPEG)

**Issues:** Menu images cannot be zoomed on mobile, text is small and hard to read, no way to search for specific items, no dietary filters, no pricing searchability.

**Journey 3: "I want to book a table"**
1. Land on homepage -> 2. Click "Book a Table" -> 3. Choose location -> 4. Redirected to eposhybrid.uk (external)

**Issues:** Same as ordering -- exits the domain.

### 6.6 Mobile Experience

- Tailwind responsive classes are used throughout (mobile-first approach)
- Viewport meta tag is correctly set
- Touch targets appear appropriately sized (based on CSS analysis)

**Issues:**
- 544 KB JS bundle is punishing on mobile connections (3G: ~15-20 seconds to render)
- Menu scan images are essentially illegible on mobile screens
- No PWA capabilities (no offline support, no "Add to Home Screen")
- Large unoptimized images waste mobile data

### 6.7 Accessibility Audit

| WCAG Criterion | Status | Notes |
|----------------|--------|-------|
| 1.1.1 Non-text Content | FAIL | Most images lack alt text; menu is images-only |
| 1.3.1 Info and Relationships | FAIL | SPA HTML has no semantic landmarks |
| 1.4.3 Contrast (Minimum) | UNCERTAIN | Gold-on-dark needs verification |
| 2.1.1 Keyboard | PARTIAL | Radix UI components are keyboard-accessible, custom components unknown |
| 2.3.1 Three Flashes | PASS | No flashing content observed |
| 2.4.1 Bypass Blocks | FAIL | No skip navigation link |
| 2.4.2 Page Titled | FAIL | Same title for all pages |
| 3.1.1 Language of Page | PASS | `lang="en"` is set |
| 4.1.2 Name, Role, Value | PARTIAL | Radix UI provides ARIA; custom elements unknown |

**ARIA usage (from bundle analysis):**
- 11 `aria-label` instances
- 5 `aria-hidden` instances
- 4 `aria-live` regions
- Most ARIA comes from Radix UI, not custom implementation

**Missing accessibility features:**
- No `prefers-reduced-motion` support (despite using Framer Motion animations)
- No dark/light mode toggle
- Only 1 `sr-only` class instance (insufficient for screen reader support)
- No skip navigation link
- No `<main>`, `<nav>`, `<header>`, `<footer>` landmarks in static HTML

### 6.8 Solutions: UI/UX

#### CRITICAL

1. **Convert menu from images to interactive HTML**
   - Create a structured, searchable HTML menu with:
     - Category filters (Pizza, Pasta, Burgers, Drinks, Desserts)
     - Dietary labels (V, VG, GF) with filter functionality
     - Pricing clearly displayed
     - Item descriptions with ingredients
     - High-quality food photos per item (optimized WebP, max 50 KB each)
   - Implement `Menu` schema markup for each item
   - This is the single highest-impact UI/UX improvement

2. **Add loading states and skeleton screens**
   - Show placeholder content shapes during route transitions
   - Display a branded loading spinner for initial SPA load
   - Prevents blank screen / FOUT

3. **Fix accessibility:**
   - Add descriptive `alt` text to all images
   - Add skip navigation link: `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>`
   - Add semantic landmarks in React components (`<header>`, `<nav>`, `<main>`, `<footer>`)
   - Implement `prefers-reduced-motion` to disable Framer Motion for users who prefer reduced motion
   - Test and fix color contrast ratios (especially gold on dark)

#### HIGH PRIORITY

4. **Reduce font families** from 5 to 2-3:
   - Keep: Poppins (body), Playfair Display (headings)
   - Consider keeping: Inter or Raleway (not both)
   - Remove: Italiana (single weight, low usage)
   - Remove excess weights from Poppins (keep 400, 600, 700 only)

5. **Improve ordering/booking UX:**
   - Embed ordering interface within ziapizza.co.uk using iframes or API integration
   - If external redirect is unavoidable, open in new tab with clear messaging
   - Add order tracking capability

6. **Remove empty blog page** from navigation until content is ready

7. **Add a light/dark mode toggle** for accessibility

---

## 7. Competitive Analysis

### 7.1 Local Competitors

#### Caprinos Pizza -- Westbury

| Metric | Caprinos | Zia Pizza |
|--------|----------|-----------|
| Just Eat Rating | 5.0/5 | 4.77/5 |
| Just Eat Reviews | 1,400+ | 610+ |
| Instagram Followers | 9,000+ | ~189 |
| Website | Professional, own ordering | SPA with external ordering |
| Stores (national) | 119 | 2 |
| SEO Advantage | Chain authority, local pages | -- |

#### Nole Pizza -- Salisbury

| Metric | Nole Pizza | Zia Pizza |
|--------|------------|-----------|
| Schema Markup | Yes (WebPage, BreadcrumbList, Organization) | None |
| Meta Descriptions | Per-page, optimized | Single static |
| Heading Hierarchy | Proper H1/H2/H3 | Inconsistent |
| Newsletter Signup | Yes | No |
| Instagram Feed | Embedded on site | Not present |
| E-commerce | WooCommerce integration | External redirect |

#### Pizza Venti -- Salisbury
- Previously #1 restaurant in Wiltshire on TripAdvisor
- Strong local authority and review presence

#### PizzaExpress -- Salisbury
- National brand with massive domain authority
- Professional local pages for every location
- Strong loyalty program (PizzaExpress Club)

### 7.2 National Competitor Benchmarks

| Brand | UK Stores | Monthly Visits | Key Digital Strength |
|-------|-----------|---------------|---------------------|
| **Domino's** | 1,300+ | Millions | 1,200 SEO-optimized local pages, content hub, average 1st position in local rankings |
| **Pizza Hut** | 350+ | 1.3M | Strong brand, full local SEO |
| **Papa John's** | 400+ | High | Early online ordering pioneer |
| **PizzaExpress** | 350+ | High | Premium dining brand, loyalty program |
| **Franco Manca** | 70+ | Growing | Artisan positioning, strong content |
| **Zia Pizza** | 2 | <1K (est.) | Authentic product, but minimal digital presence |

### 7.3 Competitive SEO Gap Analysis

| SEO Factor | Domino's / National Chains | Nole Pizza (Local) | Zia Pizza |
|------------|---------------------------|-------------------|-----------|
| Server-Side Rendering | Yes | Yes (WordPress) | No (SPA) |
| Schema Markup | Comprehensive | Basic (3 types) | None |
| Local Pages | Per-store pages | Per-location | Minimal |
| Blog/Content | Active content hub | Some content | Empty blog |
| Sitemap | Yes | Yes | No |
| Backlink Profile | Very strong | Moderate | Weak |
| Google Business Profile | Fully optimized | Moderate | Basic |
| Review Volume | Massive | Growing | Low (Salisbury: 8 TA reviews) |
| Indexed Pages | Thousands | 20-50 | ~6 |

### 7.4 Competitive Keyword Landscape

**High-value local keywords Zia Pizza should target:**

| Keyword | Search Intent | Estimated Monthly Volume | Competition |
|---------|--------------|------------------------|-------------|
| "pizza delivery Salisbury" | Transactional | 100-500 | Medium |
| "pizza delivery Westbury" | Transactional | 50-200 | Low |
| "best pizza Salisbury" | Commercial | 50-200 | Medium |
| "Italian restaurant Salisbury" | Commercial | 100-300 | Medium |
| "pizza near me" (local pack) | Transactional | 10,000+ | Very High |
| "Italian restaurant Westbury" | Commercial | 20-100 | Low |
| "pizza delivery BA13" | Transactional | 10-50 | Very Low |
| "halal pizza Salisbury" | Commercial | 10-50 | Very Low |
| "vegan pizza Wiltshire" | Commercial | 10-50 | Low |

### 7.5 Solutions: Competitive Positioning

1. **Own the "Westbury pizza" niche** -- low competition, Zia Pizza can realistically rank #1 with basic SEO improvements

2. **Create dedicated, content-rich location pages:**
   - `/location/salisbury` -- 500+ words of unique content about the Salisbury restaurant, its neighborhood (Silver Street), parking, nearby attractions, and what makes it special
   - `/location/westbury` -- Focus on "best pizza in Westbury", the Express concept, the refurbishment story
   - Include customer testimonials, unique photos, and embedded Google Maps

3. **Content marketing strategy:**
   - Publish 2-4 blog posts per month targeting long-tail keywords:
     - "What Makes Neapolitan Pizza Different? Our 24-Hour Dough Process"
     - "Best Family Restaurants in Westbury: A Local Guide"
     - "Pizza Delivery in Salisbury: How We Keep It Fresh"
   - Each post should be 800-1,500 words with internal links to relevant location/menu pages

4. **Build local backlinks:**
   - Partner with Wiltshire tourism sites (e.g., Experience Salisbury already lists Zia Pizza)
   - Sponsor local events and get listed on event pages
   - Reach out to local food bloggers and invite them for a complimentary meal in exchange for a review/feature
   - Get listed on more local directories and ensure NAP consistency

---

## 8. Local SEO & Google Business Profile

### 8.1 Current Google Business Profile Status

| Location | GBP | Google Rating | Google Reviews |
|----------|-----|---------------|---------------|
| Westbury | Exists | 4.5/5 | 79 reviews |
| Salisbury | Exists | Unknown | Very few |

### 8.2 NAP Consistency Issues

| Platform | Salisbury Phone | Notes |
|----------|----------------|-------|
| Website | 01722 433829 | -- |
| Website (generic) | +44 123 456 7890 | **PLACEHOLDER -- appears in codebase** |

Inconsistent NAP (Name, Address, Phone) across platforms confuses search engines and reduces local ranking potential.

### 8.3 Citation Profile

**Known citations/directory listings:**
- TripAdvisor (both locations)
- Facebook (both locations)
- Instagram (2 accounts)
- Just Eat, Deliveroo, Uber Eats
- Google Business Profile
- Restaurant Guru
- Quandoo
- Experience Salisbury
- Yably
- Gourmet Society
- Sluurpy
- Food Hygiene Ratings (food.gov.uk)
- Companies House

**Estimated Domain Authority:** 5-15/100 (very low due to thin content, fragmented domains, and limited backlink profile)

### 8.4 Solutions: Local SEO

#### CRITICAL

1. **Fully optimize both Google Business Profiles:**
   - Complete every attribute (hours, services, amenities, payment methods, accessibility features)
   - Upload 20+ high-quality photos per location (interior, exterior, food, staff, menu)
   - Write a compelling business description with target keywords
   - Add all menu items with prices
   - Post updates at least twice per week (offers, new dishes, events)
   - Respond to every review within 24 hours
   - Enable messaging and booking features

2. **Fix NAP consistency:**
   - Create a master NAP document for each location
   - Audit and update every citation to match exactly
   - Remove the placeholder phone number from the codebase

3. **Implement review generation strategy:**
   - Train staff to ask satisfied customers for Google reviews
   - Add QR codes on receipts/table tents linking to Google review pages
   - Follow up with online order customers via email requesting reviews
   - Target: Salisbury needs 50+ Google reviews within 6 months
   - Target: Westbury needs 150+ Google reviews to match Just Eat presence

#### HIGH PRIORITY

4. **Submit to additional directories:**
   - Yelp UK, Foursquare, Yell.com, Thomson Local, Scoot
   - Local Wiltshire directories and tourism sites
   - Ensure consistent NAP across all listings

5. **Create a Google Posts strategy:**
   - Post weekly offers (already have deals content)
   - Share seasonal menu updates
   - Highlight events (e.g., Wednesday Buffet, Thursday Steak Night)
   - Google Posts now influence local pack rankings more than ever in 2026

---

## 9. Content Strategy Assessment

### 9.1 Current Content Inventory

| Page | Word Count (est.) | Content Quality |
|------|-------------------|----------------|
| Homepage | 300-400 | Good copy, well-structured |
| About | 500-700 | Strong storytelling, good keyword usage |
| Location/Salisbury | 300-500 | Good local content with FAQs |
| Location/Westbury | 300-500 | Good local content with FAQs |
| Menu | 0 (images only) | No indexable content |
| Deals | 200-300 | Basic offer listings |
| Blog | 0 | Empty page |
| Contact | 100-200 | Minimal |
| Privacy/Terms/Cookies | 2000+ each | Legal content, not SEO-relevant |

### 9.2 Content Strengths

- The About page has compelling brand storytelling (origin story with Chef Vittorio and Zia Maria)
- Location pages include local keywords naturally ("best pizza in Salisbury", "restaurant in Westbury")
- FAQ content exists and covers relevant questions
- Deals content is regularly updated per location

### 9.3 Content Weaknesses

- **Total indexable content is extremely thin** -- estimated <2,000 words across the entire site (excluding legal pages)
- **Menu content is zero** -- the most important content for a restaurant website is trapped in scan images
- **Blog is empty** -- a wasted SEO opportunity
- **No content differentiation by location** -- much of the location content is templated with city names swapped
- **No user-generated content integration** -- no customer reviews, testimonials, or social proof on the site itself

### 9.4 Solutions: Content Strategy

1. **Build an HTML menu** (highest priority -- see Section 6.8)

2. **Launch the blog with a content calendar:**

   **Month 1 (Foundation):**
   - "The Story Behind Zia Pizza: From Naples to Wiltshire" (brand story, targets "Italian restaurant Wiltshire")
   - "Our 24-Hour Cold-Fermented Dough: Why It Makes the Best Pizza" (targets "best pizza" queries)
   - "A Guide to Dining Out in Salisbury: Top Restaurants & Hidden Gems" (targets "restaurants Salisbury", positions as local authority)

   **Month 2 (Local SEO):**
   - "Pizza Delivery in Salisbury: How We Keep It Fresh from Oven to Door"
   - "Best Family Restaurants in Westbury: Where to Take the Kids"
   - "Vegetarian & Vegan Pizza Options at Zia Pizza"

   **Ongoing (2-4 posts/month):**
   - Seasonal menu features
   - Behind-the-scenes content (dough making, ingredient sourcing)
   - Local event coverage and community involvement
   - Food and pizza education content
   - Customer spotlight stories

3. **Enrich location pages:**
   - Each location page should have 500+ words of genuinely unique content
   - Include: neighborhood description, parking information, nearby attractions, what makes this location unique
   - Embed Google reviews or testimonials
   - Add a photo gallery of the interior, food, and team

4. **Implement FAQ schema** on existing FAQ content (already on location pages)

---

## 10. Social Media & Online Presence

### 10.1 Current Social Media Accounts

| Platform | Account | Followers | Activity |
|----------|---------|-----------|----------|
| Facebook (Westbury) | @ZiaPizza | 934 likes | Active |
| Facebook (Salisbury) | @ziapizzasalisbury | Unknown | Active |
| Instagram (Westbury) | @ziapizza_westbury | Unknown | Unknown |
| Instagram (Salisbury) | @ziapizza.salisbury | 189 | Active |
| Twitter/X | @ziapizza | Unknown | Unknown |
| TikTok | Not found | N/A | N/A |

### 10.2 Social Media Issues

- **Fragmented presence:** Multiple separate accounts across 2 platforms for 2 locations
- **Low follower counts:** 189 Instagram followers vs Caprinos Pizza's 9,000+
- **Inconsistent branding:** Different naming conventions per location account
- **No TikTok presence** -- missing the fastest-growing platform for food content
- **No social proof on website** -- Instagram feed not embedded, no review widgets

### 10.3 Key Opportunity: Instagram SEO (2025+)

Since July 2025, Google indexes Instagram posts from professional accounts. This means:
- Every Instagram post is a potential Google search result
- Keyword-rich captions become discoverable via Google
- Location tags on posts improve local SEO
- Food photography posts can appear in Google Image search

### 10.4 Solutions: Social Media

1. **Consider consolidating to 1 main account per platform** with location highlights, or ensure all accounts are set to "Professional" for Google indexing

2. **Instagram growth strategy:**
   - Post 4-5 times per week (food photos, behind-the-scenes, customer stories)
   - Use Reels for pizza-making videos, kitchen tours, deal announcements
   - Use location tags on every post (tag the specific restaurant location)
   - Write keyword-rich captions: "Freshly baked Margherita pizza at our Salisbury restaurant. The best pizza in Salisbury, made with 24-hour cold-fermented dough and imported Italian mozzarella. #SalisburyFood #PizzaSalisbury #ItalianRestaurant"
   - Engage with local food accounts and cross-promote

3. **Launch TikTok:**
   - Pizza-making process videos (dough stretching, oven shots) perform extremely well
   - "Day in the life" content at each location
   - React to food trends
   - Potential for viral reach that Instagram no longer provides organically

4. **Embed Instagram feed on website** -- adds social proof and fresh content to pages

---

## 11. Review & Reputation Analysis

### 11.1 Review Ratings Across Platforms

#### Westbury

| Platform | Rating | Reviews |
|----------|--------|---------|
| Google | 4.5/5 | 79 |
| TripAdvisor | 4.7/5 | 130 |
| Facebook | 4.7/5 | 44 |
| Just Eat | 4.77/5 | 610 |
| Restaurant Guru | 4.6/5 | 330 |

#### Salisbury

| Platform | Rating | Reviews |
|----------|--------|---------|
| TripAdvisor | 4.4/5 | 8 |
| TripAdvisor Rank | #70 of 164 restaurants | -- |

### 11.2 Review Sentiment Analysis

**Positive themes:**
- Authentic thin-crust pizza
- Fresh, quality ingredients
- Friendly and attentive service
- Good value (especially Wednesday buffet and deals)
- 96% recommendation rate (Westbury TripAdvisor)

**Negative themes:**
- Occasional complaints about bland flavors
- Pre-grated cheese reported at times
- Some delivery timing issues

### 11.3 Review Gap Analysis

| Location | Google Reviews | Target (6 months) | Gap |
|----------|---------------|-------------------|-----|
| Westbury | 79 | 200 | 121 |
| Salisbury | ~5-10 | 75 | ~65 |

**Why this matters:** Google's 2026 local algorithm weighs "popularity signals" including review interactions more heavily than before. Review volume directly impacts local pack rankings.

### 11.4 Solutions: Review & Reputation

1. **Implement a systematic review collection process:**
   - Train staff to ask for Google reviews specifically (not just TripAdvisor)
   - Add QR code table tents at each location linking to the Google review page
   - Include review request cards with takeaway/delivery orders
   - Send automated post-order email with review link (via EPOS system)

2. **Respond to every review within 24 hours:**
   - Thank positive reviewers and mention them by name
   - Address negative reviews professionally with a resolution offer
   - Use keywords naturally in responses ("Thank you for visiting our Salisbury restaurant...")

3. **Monitor reviews across all platforms:**
   - Set up Google Alerts for "Zia Pizza"
   - Check TripAdvisor, Google, Facebook, and Just Eat weekly
   - Track trends and address recurring complaints

---

## 12. Privacy & Legal Compliance

### 12.1 Current Tracking Scripts

All of the following fire **immediately on page load without any consent mechanism:**

| Script | Purpose | Privacy Impact |
|--------|---------|---------------|
| Google Tag Manager | Tag management | Loads all other tags |
| Google Analytics 4 (G-34HBQJ92JF) | Website analytics | Collects browsing behavior |
| Google Ads (AW-16919570722) | Ad conversion tracking | Tracks cross-site behavior |
| Microsoft Clarity (va1q26fm34) | Session recording & heatmaps | **Records mouse movements, clicks, scrolls, form inputs** |
| Facebook/Meta Pixel (1593283908574605) | Ad retargeting | Tracks cross-site behavior, builds ad profiles |

### 12.2 Compliance Issues

| Requirement | Status | Issue |
|-------------|--------|-------|
| UK GDPR Cookie Consent | FAIL | No consent banner or CMP detected |
| PECR (UK ePrivacy) | FAIL | Non-essential cookies set without consent |
| Cookie Policy | Exists (route) | /cookies page exists but content unknown without JS |
| Privacy Policy | Exists (route) | /privacy page exists with comprehensive content |
| Microsoft Clarity Consent | FAIL | Session recording requires explicit opt-in consent |

### 12.3 Risk Assessment

**This is the highest-risk issue on the entire website.** Under UK GDPR and PECR:
- Fines of up to 4% of annual turnover or GBP 17.5 million (whichever is higher)
- ICO can issue enforcement notices
- Microsoft Clarity recording sessions without consent is particularly problematic as it captures detailed user behavior
- Facebook Pixel tracking without consent violates both UK GDPR and Meta's own terms of service

### 12.4 Solutions: Privacy Compliance

#### IMMEDIATE (Fix within days)

1. **Implement a Cookie Consent Management Platform (CMP):**
   - Use a GDPR/UK-compliant solution like Cookiebot, OneTrust, or CookieYes
   - Must block ALL non-essential scripts until user gives explicit consent
   - Must provide granular consent options (Necessary, Analytics, Marketing, Session Recording)
   - Must be accessible and not use dark patterns
   - Free options: CookieYes (free up to 100 pages), Osano (free tier)

2. **Configure GTM consent mode:**
   - Use Google Consent Mode v2 to conditionally load GA4 and Google Ads
   - Only fire Microsoft Clarity after explicit "Session Recording" consent
   - Only fire Facebook Pixel after "Marketing" consent
   - Ensure GTM `consent_default` is set to `denied` for all non-essential categories

3. **Update Privacy Policy and Cookie Policy:**
   - List all cookies and tracking technologies specifically
   - Explain what Microsoft Clarity records and how data is processed
   - Include clear opt-out instructions
   - Reference the legal basis for each type of processing

---

## 13. Improvement Roadmap & Solutions

### Phase 1: Critical Fixes (Weeks 1-2)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Implement cookie consent CMP and block all tracking until consent | Legal compliance | Low |
| 2 | Fix www/non-www redirect (301 redirect one to the other) | Duplicate content elimination | Low |
| 3 | Fix OG image paths (relative -> absolute) | Social sharing | Low |
| 4 | Remove placeholder phone number from codebase | NAP accuracy | Low |
| 5 | Generate and deploy static sitemap.xml | Crawlability | Low |
| 6 | Add Sitemap directive to robots.txt | Discovery | Low |
| 7 | Remove empty Blog page from navigation | UX | Low |

### Phase 2: Technical Foundation (Weeks 3-6)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 8 | Migrate to Next.js or implement pre-rendering for SSR/SSG | SEO visibility (200-400% improvement) | High |
| 9 | Implement per-page meta tags (title, description, canonical, OG) | On-page SEO | Medium |
| 10 | Add JSON-LD structured data (Restaurant, LocalBusiness, FAQPage) | Rich results | Medium |
| 11 | 301 redirect all secondary domains to ziapizza.co.uk | Domain consolidation | Low |
| 12 | Fix 404 handling (proper HTTP status codes) | Crawl quality | Medium |
| 13 | Implement code splitting (React.lazy per route) | Performance | Medium |
| 14 | Add Content-Security-Policy and Permissions-Policy headers | Security | Low |

### Phase 3: Performance Optimization (Weeks 7-10)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 15 | Convert all images to WebP with responsive srcset | LCP, bandwidth (~9 MB savings) | Medium |
| 16 | Add lazy loading to all below-fold images | LCP, bandwidth | Low |
| 17 | Reduce fonts from 5 families to 2-3, preload critical fonts | LCP, CLS | Low |
| 18 | Enable Brotli compression on nginx | Transfer size | Low |
| 19 | Add CDN (Cloudflare free tier) | Global performance, TTFB | Low |
| 20 | Add image width/height attributes | CLS | Low |
| 21 | Defer non-critical third-party scripts | INP, LCP | Medium |

### Phase 4: Content & Local SEO (Weeks 11-16)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 22 | Build interactive HTML menu (replace scan images) | SEO, UX, accessibility | High |
| 23 | Enrich location pages to 500+ unique words each | Local SEO | Medium |
| 24 | Fully optimize both Google Business Profiles | Local pack rankings | Medium |
| 25 | Launch blog with 4 foundation articles | Content authority | Medium |
| 26 | Implement review generation strategy | Review volume, local SEO | Low |
| 27 | Audit and fix NAP consistency across all citations | Local SEO | Medium |
| 28 | Submit to additional local directories | Citations | Low |

### Phase 5: Growth & Ongoing (Month 4+)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 29 | Publish 2-4 blog posts per month | Organic traffic growth | Ongoing |
| 30 | Instagram growth strategy (4-5 posts/week, Reels) | Social SEO, brand awareness | Ongoing |
| 31 | Launch TikTok with pizza-making content | Viral potential, brand awareness | Ongoing |
| 32 | Build local backlinks (bloggers, tourism sites, events) | Domain authority | Ongoing |
| 33 | GBP weekly posts and photo updates | Local pack maintenance | Ongoing |
| 34 | Review response within 24 hours | Reputation management | Ongoing |
| 35 | Quarterly content audit and keyword research refresh | SEO maintenance | Ongoing |

### Expected Results Timeline

| Timeframe | Expected Outcome |
|-----------|-----------------|
| **1 month** | Legal compliance achieved; duplicate content eliminated; sitemap indexed |
| **3 months** | SSR live; indexed pages increase from ~6 to 20+; rich results appearing; CWV scores improve from ~30 to 70+ |
| **6 months** | Ranking on page 1 for "pizza delivery Westbury" and "Italian restaurant Westbury"; Google reviews double; blog generating organic traffic |
| **12 months** | Ranking on page 1 for Salisbury keywords; domain authority 25+; 50% increase in organic traffic; strong local pack presence for both locations |

---

## 14. Sources & References

### Primary Data Sources
- Website technical analysis via HTTP requests and source code inspection
- Google search results and SERP analysis
- TripAdvisor, Facebook, Just Eat, Deliveroo, and Uber Eats platform data

### Competitor & Market Research
- [Zia Pizza Official Website](https://ziapizza.co.uk/)
- [Zia Pizza Westbury -- TripAdvisor](https://www.tripadvisor.co.uk/Restaurant_Review-g950934-d1027223-Reviews-Zia_Pizza-Westbury_Wiltshire_England.html)
- [Zia Pizza Salisbury -- TripAdvisor](https://www.tripadvisor.com/Restaurant_Review-g186414-d33056231-Reviews-Zia_Pizza_Salisbury-Salisbury_Wiltshire_England.html)
- [Zia Pizza Ltd -- Companies House](https://find-and-update.company-information.service.gov.uk/company/07485174)
- [Westbury Pizza Restaurant Thriving After Major Refurbishment -- White Horse News](https://whitehorsenews.co.uk/westbury-pizza-restaurant-thriving-after-major-refurbishment/)
- [Zia Pizza -- Experience Salisbury](https://www.experiencesalisbury.co.uk/listing/zia-pizza/)
- [Nole Pizza Website](https://www.nolepizza.co.uk/)
- [Caprinos Pizza Westbury](https://www.westbury.caprinospizza.co.uk/)
- [Top Pizza Chains UK -- ScrapeHero](https://www.scrapehero.com/location-reports/5-largest-pizza-chains-in-the-uk/)
- [UK Pizza Market -- Restaurant Online](https://www.restaurantonline.co.uk/Article/2025/02/13/what-are-the-uks-biggest-pizza-restaurant-and-pizza-delivery-brands-dominos-pizza-express-pizza-hut/)

### SEO & Industry Best Practices
- [Restaurant SEO Checklist 2026 -- The Digital Restaurant](https://thedigitalrestaurant.com/restaurant-seo-checklist/)
- [Local SEO for Multi-Location Restaurants 2026](https://thedigitalrestaurant.com/local-seo-multi-location-restaurant/)
- [Restaurant SEO Trends 2026 -- Malou](https://www.malou.io/en-us/blog/restaurant-seo-trends)
- [Local SEO for Restaurants 2026 -- Causal Funnel](https://www.causalfunnel.com/blog/local-seo-for-restaurants-9-smart-strategies-to-rank-1-in-2026/)
- [Restaurant Marketing Ideas 2026 -- Local Restaurant SEO](https://localrestaurantseo.com/restaurant-marketing-ideas-for-2026-ai-and-seo/)
- [Pizza SEO Tips -- Seopital](https://www.seopital.co/blog/pizza-seo)
- [Multi-Location Local SEO 2026 -- Entrepreneur](https://www.entrepreneur.com/growing-a-business/the-real-playbook-for-multi-location-local-seo-in-2026/502959)
- [Domino's SEO Case Study -- Netpeak](https://netpeak.us/cases/dominos-seo-growth-organic-traffic/)
- [Core Web Vitals Optimization 2026 -- SkySEO](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/)
- [ADA Compliance for Restaurants -- accessiBe](https://accessibe.com/blog/knowledgebase/ada-compliance-for-restaurants)
- [Restaurant Website Guide 2026 -- Trayful](https://www.gotrayful.com/en/blog/complete-restaurant-website-guide-2026)

---

*This report was prepared on April 1, 2026, and reflects the state of ziapizza.co.uk at the time of analysis. SEO and web standards evolve continuously; recommendations should be reviewed quarterly.*
