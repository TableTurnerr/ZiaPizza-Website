---
pdf_options:
  format: A4
  margin:
    top: 25mm
    bottom: 30mm
    left: 15mm
    right: 15mm
  displayHeaderFooter: true
  headerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#999;font-family:sans-serif;padding-top:5mm;">Zia Pizza SEO & Performance Audit &mdash; Confidential</div>'
  footerTemplate: '<div style="width:100%;display:flex;justify-content:space-between;align-items:center;font-size:8px;color:#666;font-family:sans-serif;padding:0 15mm 0 15mm;"><a href="https://tableturnerr.com" target="_blank" style="font-weight:600;color:#0D0D0D;text-decoration:none;">Report By Tableturnerr.com</a><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'
stylesheet: pdf-styles.css
---

<div class="watermark-layer"></div>

<div class="branding-banner">
  <img src="tt-logo-nobg.svg" class="branding-logo" alt="" />
  <a href="https://tableturnerr.com" target="_blank" class="branding-text">Report By Tableturnerr.com</a>
</div>

# Zia Pizza (ziapizza.co.uk) -- Current SEO, Performance & UI/UX Standings Report

**Date:** April 1, 2026
**Prepared for:** Zia Pizza Ltd
**Domain:** ziapizza.co.uk
**Scope:** Current state assessment of SEO health, site performance, UI/UX quality, and competitive positioning

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Overview](#2-business-overview)
3. [Technical SEO Standing](#3-technical-seo-standing)
4. [On-Page SEO Standing](#4-on-page-seo-standing)
5. [Site Performance & Core Web Vitals](#5-site-performance--core-web-vitals)
6. [UI/UX Standing](#6-uiux-standing)
7. [Competitive Analysis](#7-competitive-analysis)
8. [Local SEO & Google Business Profile](#8-local-seo--google-business-profile)
9. [Content Standing](#9-content-standing)
10. [Social Media & Online Presence](#10-social-media--online-presence)
11. [Review & Reputation Standing](#11-review--reputation-standing)
12. [Privacy & Legal Compliance](#12-privacy--legal-compliance)
13. [Overall Health Scorecard](#13-overall-health-scorecard)
14. [Sources & References](#14-sources--references)

---

## 1. Executive Summary

Zia Pizza operates a React-based single-page application (SPA) website serving two locations in Wiltshire, England -- Westbury and Salisbury. While the brand has a solid product offering with authentic Italian pizza and strong customer reviews (96% recommendation rate at Westbury), the website suffers from **critical technical SEO deficiencies** that severely limit its search visibility and organic traffic potential.

### Health Scorecard at a Glance

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
| **Overall** | **2.8/10** | **Critical** |

### Top 5 Critical Findings

1. **No Server-Side Rendering (SSR)** -- The entire site is a client-rendered SPA. Search engines that don't execute JavaScript see a completely blank page.
2. **GDPR Non-Compliance** -- 5 tracking scripts (including Microsoft Clarity session recording) fire without any user consent mechanism.
3. **No Sitemap or Structured Data** -- No XML sitemap exists, and zero schema markup is implemented despite being a multi-location restaurant.
4. **11.6 MB Image Payload** -- Unoptimized images with no modern formats, no lazy loading, and no responsive image markup.
5. **Domain Fragmentation** -- Brand presence is split across 3+ domains, severely diluting SEO authority.

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

| Location | Type | Address | Phone |
|----------|------|---------|-------|
| **Salisbury** | Express Restaurant | 46 Silver St, Salisbury, SP1 2NE | 01722 433829 |
| **Westbury** | Express Restaurant | 15 Palomino Pl, Westbury, BA13 3SD | +44 1373 865271 |

### Service Channels
- Dine-in at both locations
- Online ordering via food-order.net (EPOS Hybrid)
- Delivery via Just Eat, Uber Eats, and Deliveroo
- Table booking via eposhybrid.uk

---

## 3. Technical SEO Standing

### 3.1 Architecture & Rendering

| Element | Current State |
|---------|--------------|
| **Platform** | React Single Page Application (SPA) |
| **Build Tool** | Vite |
| **Server** | nginx 1.29.0 |
| **CSS Framework** | Tailwind CSS |
| **UI Library** | Radix UI |
| **Animation** | Framer Motion |
| **Server-Side Rendering** | None -- client-side only |

**Critical Finding:** Every URL returns the identical HTML shell containing only `<div id="root"></div>` with zero content. All page content is generated via JavaScript after the 544 KB bundle downloads and executes. Search engines that don't execute JavaScript (Bing, social media crawlers, most bots) see a completely blank page.

### 3.2 Indexation & Crawlability

| Element | Status | Assessment |
|---------|--------|------------|
| **Indexed Pages** | ~6 pages | Extremely thin for a 2-location business |
| **robots.txt** | Present, allows all crawlers | Missing `Sitemap:` directive |
| **sitemap.xml** | Does not exist | Returns SPA HTML shell instead of XML |
| **Canonical Tags** | Missing entirely | No `<link rel="canonical">` on any page |
| **404 Handling** | Soft 404s | All non-existent URLs return HTTP 200 |
| **URL Structure** | Clean, human-readable | Good paths: /menu, /about, /location/salisbury |

### 3.3 Domain & Redirect Status

| Issue | Current State |
|-------|--------------|
| **www vs non-www** | Both serve identical content -- no redirect between them (duplicate content) |
| **HTTP to HTTPS** | Correctly redirects via 301 |
| **Domain Fragmentation** | Brand split across: `ziapizza.co.uk`, `westbury.ziapizza.co.uk`, `ziapizzaonline.co.uk`, `ziapizzaltd.com` |
| **ziapizzaonline.co.uk** | Contains only a JavaScript redirect with zero indexable content |

### 3.4 Security Headers

| Header | Status | Value |
|--------|--------|-------|
| Strict-Transport-Security | Present | `max-age=15768000` (~6 months) |
| X-Frame-Options | Present | `SAMEORIGIN` |
| X-XSS-Protection | Present | `1; mode=block` (deprecated) |
| X-Content-Type-Options | Present | `nosniff` |
| Referrer-Policy | Present | `strict-origin-when-cross-origin` |
| Content-Security-Policy | **Missing** | Not implemented |
| Permissions-Policy | **Missing** | Not implemented |

### 3.5 Analytics & Tracking Implementation

| Tool | ID | Status |
|------|-----|--------|
| Google Tag Manager | GTM-MX6F7W6M | Active |
| Google Analytics 4 | G-34HBQJ92JF | Active |
| Google Ads | AW-16919570722 | Active |
| Microsoft Clarity | va1q26fm34 | Active (session recording) |
| Facebook/Meta Pixel | 1593283908574605 | Active |

All tracking is well-implemented from a technical standpoint, but fires without consent (see Section 12).

---

## 4. On-Page SEO Standing

### 4.1 Title Tags

| Page | Current Title | Length | Assessment |
|------|--------------|--------|------------|
| All pages (HTML) | "Zia Pizza - Premium Italian Pizza & Dining \| Westbury & Salisbury" | 67 chars | Same title for every URL (over 60 char ideal) |
| Salisbury (JS only) | "Pizza Delivery in Salisbury \| Best Pizza in Salisbury" | 55 chars | Good, but invisible to non-JS crawlers |
| Westbury (JS only) | "Best Pizza in Westbury \| Pizza Delivery in Westbury" | 53 chars | Good, but invisible to non-JS crawlers |

### 4.2 Meta Descriptions

| Page | Current Description | Length | Assessment |
|------|-------------------|--------|------------|
| All pages (HTML) | "Experience authentic Italian pizza at Zia Pizza. Two premium locations in Westbury & Salisbury..." | 193 chars | Too long (max 155), identical for all URLs |
| Location pages (JS only) | Unique per location | Appropriate | Invisible to non-JS crawlers |

### 4.3 Heading Hierarchy

**Homepage:**
| Level | Content | Assessment |
|-------|---------|------------|
| H1 | "Welcome to Zia Pizza" | Good -- single H1 |
| H2 | "Where Italy Meets Britain", "Choose Your Location", "Special Offers" (x3 duplicate), "A Slice Above the Rest" | Duplicate H2s |
| H3 | Full paragraph used as H3; "Two Ways to Experience Zia Pizza"; "All Current Offers" | Incorrect -- paragraph as heading |

### 4.4 Image SEO Status

| Metric | Value | Assessment |
|--------|-------|------------|
| Total images referenced | 22+ | -- |
| Images with alt text | 3 of 22+ | Critical gap |
| Images with descriptive filenames | ~5 of 22+ | Poor |
| Images with lazy loading | 3 (iframes only) | No content image lazy loading |
| Images in WebP/AVIF | 0 | Not using modern formats |
| Images with srcset/responsive | 0 | No responsive images |

**Notable filename issues:**
- `resturant_imgae_westbury` (double typo: "resturant", "imgae")
- `100004.jpg`, `100006.jpg`, `image1.jpg` (non-descriptive names)

### 4.5 Open Graph & Social Tags

| Tag | Value | Issue |
|-----|-------|-------|
| og:title | "Zia Pizza - Premium Italian Pizza & Dining" | Static for all pages |
| og:description | Present | Static for all pages |
| og:type | "website" | OK |
| og:image | "/logo.png" | Relative path -- broken on social platforms |
| og:url | "https://ziapizza.co.uk" | Static -- always homepage |
| twitter:card | "summary_large_image" | OK |
| twitter:site | "@ziapizza" | OK |
| twitter:image | "/logo.png" | Relative path -- broken |
| twitter:title | Missing | Not set |
| twitter:description | Missing | Not set |

### 4.6 Internal Linking

| Element | Status |
|---------|--------|
| Global navigation | Present: Home, Locations, Menu, Deals, About, Blog, Contact |
| Footer links | Present: Quick Links, Locations, Legal pages |
| Breadcrumbs | Not implemented |
| Contextual body links | Minimal |
| Blog link | Points to empty page |
| Cross-linking between locations | Present via order/booking CTAs |

---

## 5. Site Performance & Core Web Vitals

### 5.1 Asset Sizes

| Asset | Uncompressed | Gzipped | Assessment |
|-------|-------------|---------|------------|
| HTML Shell | 4 KB | ~1.5 KB | Minimal (but empty) |
| Main JS Bundle | 544 KB | 159 KB | Large single bundle |
| CSS Bundle | 85 KB | 14 KB | Acceptable |
| **Total Code** | **633 KB** | **176 KB** | -- |
| **Total Images** | **~11.6 MB** | N/A | Critical -- far too large |

### Largest Images

| Image | Size | Format |
|-------|------|--------|
| About Us - Lasagne | 1,106 KB | PNG (should be JPEG/WebP) |
| image1 | 785 KB | JPEG |
| About Us - Calzone | 645 KB | JPEG |
| Menu scan page 1 | 635 KB | JPEG |
| Menu scan page 4 | 615 KB | JPEG |
| Offer - Tuesday BOGO | 609 KB | JPEG |
| westbury restaurant | 500 KB | JPEG |
| logo1.png | 394 KB | PNG |
| logo.png | 277 KB | PNG |

### 5.2 Connection Timing

| Metric | Value |
|--------|-------|
| DNS Lookup | 21ms |
| TCP Connect | 235ms |
| TLS Handshake | 456ms |
| Time to First Byte (TTFB) | 671ms |

### 5.3 Font Loading Impact

| Font Family | Weights Loaded | Est. Size |
|-------------|---------------|-----------|
| Poppins | 300, 400, 500, 600, 700, 800, 900 (7 weights) | ~175 KB |
| Raleway | 300, 400, 500, 600, 700 (5 weights) | ~125 KB |
| Playfair Display | 400, 500, 600, 700 (4 weights) | ~120 KB |
| Inter | 300, 400, 500, 600 (4 weights) | ~100 KB |
| Italiana | 400 (1 weight) | ~25 KB |
| **Total** | **~25 weight variants** | **~545 KB** |

**Loading method:** `@import` inside CSS (render-blocking chain: HTML -> CSS -> Google Fonts CSS -> Font files)

### 5.4 Core Web Vitals Risk Assessment

| Metric | Google Target | Estimated Score | Risk Level |
|--------|--------------|----------------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 5-8s | CRITICAL |
| **INP** (Interaction to Next Paint) | < 200ms | 200-400ms | HIGH |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.2-0.5 | HIGH |

### 5.5 Infrastructure

| Feature | Status |
|---------|--------|
| Gzip compression | Enabled |
| Brotli compression | Not enabled |
| CDN | Not used |
| Code splitting | Minimal (2 chunks) |
| Static asset caching | 1 year (good) |
| HTML caching | No cache (correct) |
| Service Worker / PWA | Not implemented |
| Manifest file | Returns SPA HTML (not actual manifest) |

---

## 6. UI/UX Standing

### 6.1 Design System

| Element | Current State |
|---------|--------------|
| **Theme** | Dark only (navy/black background) |
| **Primary Color** | Red (hsl(357, 78%, 50%)) |
| **Accent Color** | Gold (hsl(42, 35%, 70%)) |
| **Text Color** | Near-white (hsl(0, 0%, 96%)) |
| **Body Font** | Poppins (sans-serif) |
| **Heading Font** | Playfair Display (serif) |
| **CSS Framework** | Tailwind CSS |
| **UI Components** | Radix UI (headless accessible components) |
| **Animations** | Framer Motion (bounce, pulse, enter/exit, accordion) |
| **Icons** | Lucide React (36 icon references) |

### 6.2 Design Quality Assessment

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Visual Appeal** | 7/10 | Dark theme with red/gold accents creates upscale Italian atmosphere |
| **Typography** | 5/10 | Serif + sans-serif pairing is elegant, but 5 font families is excessive and inconsistent |
| **Color Consistency** | 6/10 | Consistent palette, but gold-on-dark contrast may not meet WCAG AA |
| **Layout Structure** | 6/10 | Responsive grid layouts work well on desktop; mobile needs testing |
| **Animation Quality** | 5/10 | Framer Motion adds polish, but multiple animation types may feel overwhelming |
| **Brand Consistency** | 6/10 | Strong on the site, but fragmented across social media and third-party platforms |

### 6.3 Navigation & Information Architecture

| Element | Assessment |
|---------|------------|
| **Main Nav** | Home, Locations, Menu, Deals, About, Blog, Contact -- logical structure |
| **Footer** | Quick Links, Locations, Legal -- comprehensive |
| **Mobile Nav** | Hamburger menu (responsive) |
| **Breadcrumbs** | Not present |
| **Search** | Not present |
| **Blog Link** | Points to empty page |

### 6.4 User Journey Analysis

**Journey: "I want to order pizza"**
Homepage -> "Order Online" CTA -> Choose location -> Exits to food-order.net (external domain)

**Issue:** User leaves ziapizza.co.uk entirely for the ordering flow. Brand continuity is broken.

**Journey: "I want to see the menu"**
Click "Menu" -> See scanned JPEG images of physical menus

**Issue:** Menu images cannot be zoomed on mobile, text is small, items are not searchable, no dietary filters available.

**Journey: "I want to book a table"**
Homepage -> "Book a Table" -> Choose location -> Exits to eposhybrid.uk (external domain)

**Issue:** Same domain exit as ordering.

### 6.5 Menu Page -- Critical UX Issue

The menu page displays **scanned photographs of physical menus** as JPEG images:
- Salisbury: 6 pages of scanned menus
- Westbury: 4 pages of scanned menus

**Problems:**
- Text is small and unreadable on mobile devices
- Cannot search, filter, or interact with menu items
- No dietary information filtering (vegetarian, vegan, gluten-free)
- Not accessible to screen readers
- Not indexable by search engines
- Each scan image is 300-650 KB (total ~7 MB for all menu images)

### 6.6 Accessibility Standing

| WCAG 2.2 AA Criterion | Status | Details |
|------------------------|--------|---------|
| 1.1.1 Non-text Content | FAIL | Most images lack alt text; menu is image-only |
| 1.3.1 Info and Relationships | FAIL | Static HTML has no semantic landmarks |
| 1.4.3 Contrast (Minimum) | UNCERTAIN | Gold-on-dark needs verification |
| 2.1.1 Keyboard | PARTIAL | Radix UI is accessible; custom components unknown |
| 2.4.1 Bypass Blocks | FAIL | No skip navigation link |
| 2.4.2 Page Titled | FAIL | Same title for all pages |
| 3.1.1 Language of Page | PASS | `lang="en"` is set |

**ARIA usage in bundle:**
- 11 `aria-label`, 5 `aria-hidden`, 4 `aria-live`, 3 `aria-expanded` instances
- Most ARIA comes from Radix UI library, not custom implementation
- Only 1 `sr-only` class usage (insufficient screen reader support)
- No `prefers-reduced-motion` support despite using animations
- No light/dark mode toggle

### 6.7 Mobile Experience

| Aspect | Status |
|--------|--------|
| Viewport meta tag | Correctly set |
| Responsive breakpoints | sm/md/lg/xl/2xl (Tailwind defaults) |
| Touch targets | Appear appropriate (CSS analysis) |
| JS bundle on 3G | ~15-20 seconds to first render |
| Menu readability on mobile | Illegible (scanned images) |
| PWA support | None |
| Add to Home Screen | Not supported |

---

## 7. Competitive Analysis

### 7.1 Direct Local Competitors

| Competitor | Location | Key Metrics |
|------------|----------|-------------|
| **Caprinos Pizza** | Westbury | 5.0/5 Just Eat (1,400+ reviews), national chain (119 stores), own ordering system, 9,000+ Instagram followers |
| **Nole Pizza** | Salisbury | Professional website with schema markup, part of Chickpea Group, strong Instagram, sourdough specialist |
| **Pizza Venti** | Salisbury | Previously #1 restaurant in Wiltshire on TripAdvisor |
| **PizzaExpress** | Salisbury | National brand, massive SEO authority, loyalty program |
| **Nerano** | Devizes (10.7 mi) | Italian cuisine competitor in broader Wiltshire area |

### 7.2 Competitive SEO Comparison

| SEO Factor | Domino's (National) | Nole Pizza (Local) | Zia Pizza |
|------------|---------------------|-------------------|-----------|
| Server-Side Rendering | Yes | Yes (WordPress) | No (SPA) |
| Schema Markup | Comprehensive | Basic (3 types) | None |
| Dedicated Location Pages | 1,200+ local pages | Per-location | Minimal |
| Blog / Content Hub | Active | Some content | Empty |
| XML Sitemap | Yes | Yes | No |
| Backlink Profile | Very strong | Moderate | Weak |
| Google Business Profile | Fully optimized | Moderate | Basic |
| Review Volume (Google) | Massive | Growing | Low |
| Indexed Pages | Thousands | 20-50 | ~6 |

### 7.3 National Market Context

| Brand | UK Stores | Key Digital Advantage |
|-------|-----------|----------------------|
| **Domino's** | 1,300+ | 1,200 SEO-optimized local pages, content hub, #1 in local rankings |
| **Pizza Hut** | 350+ | 1.3M monthly website visits |
| **Papa John's** | 400+ | Established online ordering |
| **PizzaExpress** | 350+ | Strongest high-street brand |
| **Franco Manca** | 70+ | Artisan/Neapolitan positioning |
| **Zia Pizza** | 2 | Authentic product, but minimal digital presence |

### 7.4 Keyword Landscape

**Key target keywords and competitive difficulty:**

| Keyword | Est. Monthly Volume | Competition | Zia Pizza Ranking |
|---------|-------------------|-------------|-------------------|
| "pizza delivery Salisbury" | 100-500 | Medium | Not ranking |
| "pizza delivery Westbury" | 50-200 | Low | Unknown |
| "best pizza Salisbury" | 50-200 | Medium | Not ranking |
| "Italian restaurant Salisbury" | 100-300 | Medium | Not ranking |
| "pizza near me" (local pack) | 10,000+ | Very High | Not in local pack |
| "Italian restaurant Westbury" | 20-100 | Low | Unknown |

### 7.5 Estimated Domain Authority

Based on analysis of indexed pages (~6), domain fragmentation, limited backlink profile, and thin content, the estimated domain authority of ziapizza.co.uk is **5-15 out of 100** -- significantly below local competitors.

---

## 8. Local SEO & Google Business Profile

### 8.1 Google Business Profile Status

| Location | GBP Exists | Google Rating | Google Reviews | Assessment |
|----------|-----------|---------------|---------------|------------|
| Westbury | Yes | 4.5/5 | 79 | Moderate presence |
| Salisbury | Yes | Unknown | Very few | Needs development |

### 8.2 NAP (Name, Address, Phone) Consistency

| Issue Found | Details |
|-------------|---------|
| Placeholder phone in codebase | `+44 123 456 7890` appears in site code |
| Name variations | "Zia Pizza", "Zia Pizza Express" -- different branding per location |

### 8.3 Citation Profile

**Confirmed directory listings:**
TripAdvisor (2), Facebook (2), Instagram (2), Just Eat, Deliveroo, Uber Eats, Google Business Profile, Restaurant Guru, Quandoo, Experience Salisbury, Yably, Gourmet Society, Sluurpy, Food Hygiene Ratings (food.gov.uk), Companies House, White Horse News (press)

### 8.4 Local Pack Visibility

Based on research, Zia Pizza does **not appear consistently in the Google Local Pack** (map results) for high-value queries like "pizza delivery [city]" or "Italian restaurant [city]" for either of its two locations.

---

## 9. Content Standing

### 9.1 Content Inventory

| Page | Est. Word Count | Content Quality | Indexable |
|------|----------------|----------------|-----------|
| Homepage | 300-400 | Good copy, well-structured | Only with JS |
| About | 500-700 | Strong storytelling, good keywords | Only with JS |
| Location/Salisbury | 300-500 | Good local content with 7 FAQs | Only with JS |
| Location/Westbury | 300-500 | Good local content with 7 FAQs | Only with JS |
| Menu | 0 (images only) | No text content | Not indexable |
| Deals | 200-300 | Basic offer listings | Only with JS |
| Blog | 0 | Completely empty | Nothing to index |
| Contact | 100-200 | Minimal | Only with JS |
| Privacy | 2000+ | Comprehensive legal | Only with JS |
| Terms | 2000+ | 17 sections covered | Only with JS |

**Total indexable content (excluding legal pages): <2,000 words** -- extremely thin for a multi-location restaurant business.

### 9.2 Content Strengths

- Compelling brand storytelling on the About page (origin story with Chef Vittorio and Zia Maria)
- Location pages include local keywords naturally
- FAQ content exists for all locations
- Deals content is regularly updated per location branch

### 9.3 Content Weaknesses

- Menu content is zero (trapped in scan images)
- Blog is empty (wasted SEO opportunity)
- Much location content is templated (city names swapped)
- No user-generated content (reviews, testimonials) on the site
- FAQ content is not marked up with schema

### 9.4 Deals & Offers Content

| Deal | Description | Location |
|------|-------------|----------|
| Sunday Roast | From GBP 14.95, served until sold out | -- |
| Monday Funday | Carlsberg & Thatchers Gold GBP 2.95/pint | -- |
| Tuesday Burger & Drink | Any burger + one drink for GBP 14.95 | -- |
| Wednesday Italian Buffet | Unlimited pizza & pasta, GBP 16.90/person | -- |
| Thursday Steak Night | Sirloin steak + chips + salad for GBP 19.95 | -- |
| BOGO Pizza | Buy 1 Get 1 Free (equal/lesser value) | -- |
| Half Price Pizza | Second pizza at half price | -- |
| Kids Eat for GBP 1 | Family-friendly Fridays | -- |
| Double the Drinks | 2 cocktails GBP 13.95, from 5 PM | -- |

---

## 10. Social Media & Online Presence

### 10.1 Current Accounts

| Platform | Account | Followers | Status |
|----------|---------|-----------|--------|
| Facebook (Westbury) | @ZiaPizza | 934 likes | Active |
| Facebook (Salisbury) | @ziapizzasalisbury | Unknown | Active |
| Instagram (Westbury) | @ziapizza_westbury | Unknown | Unknown |
| Instagram (Salisbury) | @ziapizza.salisbury | 189 | Active |
| Twitter/X | @ziapizza | Unknown | Unknown |
| TikTok | Not found | N/A | Not present |

### 10.2 Social Media Assessment

| Aspect | Assessment |
|--------|------------|
| **Account Fragmentation** | 4+ separate accounts across 2 platforms for 2 locations |
| **Follower Counts** | Very low (189 Instagram vs competitor's 9,000+) |
| **Branding Consistency** | Different naming conventions per location |
| **TikTok Presence** | None -- missing fastest-growing food content platform |
| **Social Proof on Website** | None -- no embedded feeds or review widgets |
| **Instagram Indexing (since July 2025)** | Unknown if accounts are set to Professional (required for Google indexing) |

### 10.3 Third-Party Platform Presence

| Platform | Status |
|----------|--------|
| Just Eat | Active -- Westbury has 610+ reviews, 4.77/5 rating |
| Uber Eats | Active across locations |
| Deliveroo | Active (Westbury confirmed, 32-min delivery estimate) |
| food-order.net | Direct ordering -- both locations |
| eposhybrid.uk | Table booking -- both locations |

---

## 11. Review & Reputation Standing

### 11.1 Review Ratings by Platform

#### Westbury (Flagship)

| Platform | Rating | Review Count |
|----------|--------|-------------|
| Google | 4.5/5 | 79 |
| TripAdvisor | 4.7/5 | 130 |
| Facebook | 4.7/5 | 44 |
| Just Eat | 4.77/5 | 610 |
| Restaurant Guru | 4.6/5 | 330 |
| **Recommendation Rate** | **96%** | -- |

#### Salisbury

| Platform | Rating | Review Count |
|----------|--------|-------------|
| TripAdvisor | 4.4/5 | 8 |
| TripAdvisor Ranking | #70 of 164 restaurants | -- |

### 11.2 Review Sentiment Summary

| Theme | Sentiment | Frequency |
|-------|-----------|-----------|
| Pizza quality (thin crust, fresh) | Positive | High |
| Fresh ingredients | Positive | High |
| Friendly service | Positive | High |
| Good value (especially deals) | Positive | Medium |
| Bland flavors | Negative | Low |
| Pre-grated cheese | Negative | Low |
| Delivery timing | Negative | Low |

### 11.3 Review Volume Gap vs Competitors

| Metric | Zia Pizza Westbury | Caprinos Pizza Westbury |
|--------|-------------------|------------------------|
| Just Eat Reviews | 610 | 1,400+ |
| Just Eat Rating | 4.77/5 | 5.0/5 |
| Google Reviews | 79 | Unknown (likely higher) |

---

## 12. Privacy & Legal Compliance

### 12.1 Tracking Scripts Firing Without Consent

| Script | Purpose | Privacy Impact |
|--------|---------|---------------|
| Google Tag Manager | Loads all other tags | Gateway for all tracking |
| Google Analytics 4 | Browsing behavior collection | Moderate |
| Google Ads | Cross-site conversion tracking | High |
| Microsoft Clarity | **Session recording** (mouse, clicks, scrolls, forms) | **Very High** |
| Facebook/Meta Pixel | Cross-site retargeting | High |

**All 5 scripts fire immediately on page load with NO consent mechanism.**

### 12.2 Compliance Assessment

| Requirement | Status |
|-------------|--------|
| UK GDPR Cookie Consent | **FAIL** -- No consent banner or CMP detected |
| PECR (UK ePrivacy Regulations) | **FAIL** -- Non-essential cookies set without consent |
| Microsoft Clarity Consent | **FAIL** -- Session recording requires explicit opt-in |
| Facebook Pixel Consent | **FAIL** -- Ad tracking without consent violates GDPR and Meta's ToS |
| Cookie Policy Page | Exists at /cookies route (content requires JS to view) |
| Privacy Policy Page | Exists at /privacy route -- comprehensive content |
| Terms Page | Exists at /terms route -- covers 17 legal sections |

### 12.3 Risk Level

This represents the **highest-risk finding** in this audit. Under UK GDPR and PECR:
- Potential fines of up to 4% of annual turnover or GBP 17.5 million
- ICO enforcement notices possible
- Microsoft Clarity recording user sessions without consent is particularly high-risk

---

## 13. Overall Health Scorecard

### Category Scores

| Category | Score | Weight | Weighted Score | Key Issue |
|----------|-------|--------|---------------|-----------|
| Technical SEO | 2/10 | 20% | 0.40 | No SSR, no sitemap, no canonical tags |
| On-Page SEO | 3/10 | 15% | 0.45 | Static meta tags, missing alt text, broken OG |
| Site Performance | 3/10 | 15% | 0.45 | 544 KB JS bundle, 11.6 MB images, no CDN |
| UI/UX Design | 5/10 | 15% | 0.75 | Good visual design, terrible menu UX |
| Local SEO | 3/10 | 10% | 0.30 | Unoptimized GBP, NAP inconsistency |
| Content | 2/10 | 10% | 0.20 | Empty blog, image-only menu, thin content |
| Accessibility | 2/10 | 5% | 0.10 | No alt text, no landmarks, menu inaccessible |
| Privacy Compliance | 1/10 | 5% | 0.05 | 5 tracking scripts, zero consent |
| Social Media | 3/10 | 5% | 0.15 | Fragmented, low followers, no TikTok |
| **Overall** | | **100%** | **2.85/10** | **Critical attention needed** |

### Summary by Severity

#### Critical Issues (Immediate Attention Required)
1. GDPR non-compliance -- 5 tracking scripts without consent
2. No server-side rendering -- blank pages for most crawlers
3. No XML sitemap
4. No structured data / schema markup
5. Domain fragmentation across 3+ domains
6. www/non-www duplicate content
7. Menu pages as scanned images (inaccessible, not indexable)

#### High-Priority Issues
8. 11.6 MB unoptimized image payload
9. 544 KB monolithic JS bundle with minimal code splitting
10. 5 font families with 25 weight variants
11. Missing canonical tags on all pages
12. Open Graph images using relative paths
13. Soft 404s (HTTP 200 for non-existent pages)
14. No CDN or Brotli compression
15. Missing Content-Security-Policy header

#### Medium-Priority Issues
16. Empty blog page in navigation
17. Low review volume (Salisbury: 8 TripAdvisor reviews)
18. NAP inconsistencies across platforms
19. Placeholder phone number in codebase
20. No breadcrumb navigation
21. No prefers-reduced-motion support
22. No PWA / service worker
23. Fragmented social media accounts

---

## 14. Sources & References

### Primary Data Sources
- Website technical analysis via HTTP requests and source code inspection (April 2026)
- Google search results and SERP analysis
- TripAdvisor, Facebook, Just Eat, Deliveroo, and Uber Eats platform data

### Key References
- [Zia Pizza Official Website](https://ziapizza.co.uk/)
- [Zia Pizza Westbury -- TripAdvisor](https://www.tripadvisor.co.uk/Restaurant_Review-g950934-d1027223-Reviews-Zia_Pizza-Westbury_Wiltshire_England.html)
- [Zia Pizza Salisbury -- TripAdvisor](https://www.tripadvisor.com/Restaurant_Review-g186414-d33056231-Reviews-Zia_Pizza_Salisbury-Salisbury_Wiltshire_England.html)
- [Zia Pizza Ltd -- Companies House](https://find-and-update.company-information.service.gov.uk/company/07485174)
- [Westbury Pizza Restaurant Thriving -- White Horse News](https://whitehorsenews.co.uk/westbury-pizza-restaurant-thriving-after-major-refurbishment/)
- [Zia Pizza -- Experience Salisbury](https://www.experiencesalisbury.co.uk/listing/zia-pizza/)
- [Nole Pizza Website](https://www.nolepizza.co.uk/)
- [Caprinos Pizza Westbury](https://www.westbury.caprinospizza.co.uk/)
- [Top Pizza Chains UK -- ScrapeHero](https://www.scrapehero.com/location-reports/5-largest-pizza-chains-in-the-uk/)
- [UK Pizza Market -- Restaurant Online](https://www.restaurantonline.co.uk/Article/2025/02/13/what-are-the-uks-biggest-pizza-restaurant-and-pizza-delivery-brands-dominos-pizza-express-pizza-hut/)
- [Restaurant SEO Checklist 2026 -- The Digital Restaurant](https://thedigitalrestaurant.com/restaurant-seo-checklist/)
- [Local SEO Multi-Location Restaurants 2026](https://thedigitalrestaurant.com/local-seo-multi-location-restaurant/)
- [Restaurant SEO Trends 2026 -- Malou](https://www.malou.io/en-us/blog/restaurant-seo-trends)
- [Core Web Vitals Optimization 2026 -- SkySEO](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/)
- [Multi-Location Local SEO 2026 -- Entrepreneur](https://www.entrepreneur.com/growing-a-business/the-real-playbook-for-multi-location-local-seo-in-2026/502959)

---

*This report reflects the state of ziapizza.co.uk as of April 1, 2026. All scores are based on technical analysis, competitive benchmarking, and current industry best practices.*
