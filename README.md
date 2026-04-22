# Zia Pizza Website

Marketing site for [ziapizza.co.uk](https://ziapizza.co.uk), built with Next.js 16 and Tailwind v4.

## Content model

All editable content lives under `src/content/`:

- `src/content/locations.json` — one entry per venue (Salisbury, Westbury, etc.)
- `src/content/products.json` — one entry per menu item
- `src/content/site.json` — hero, loyalty, cross-brand, about, and footer copy
- `src/content/blog/*.md` — blog posts with YAML frontmatter

Every page that shows this content re-imports or re-reads these files at build time, so editing content requires a **rebuild + redeploy** to go live.

## Admin CMS (`/admin`)

`/admin` is a **local-editing tool**: run it on your machine, edit content through the UI, commit the resulting file changes, then rebuild and deploy.

### Setup (one-time)

1. Copy `.env.local.example` to `.env.local` and set:
   - `ADMIN_PASSWORD` — the password you'll type at `/admin/login`
   - `ADMIN_SECRET` — a long random string used to sign the session cookie
     (generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### Daily workflow

```bash
npm run dev                  # starts on http://localhost:3000 (or 3001 if busy)
# visit /admin/login, sign in
# edit locations / products / blog / site copy / upload images
# admin saves directly to src/content/*.json, src/content/blog/*.md, public/uploads/
git add src/content public/uploads
git commit -m "content update"
npm run build                # sanity check
# deploy (push to host / Vercel)
```

### What the admin can edit

| Section | What it writes |
|---|---|
| Locations | `src/content/locations.json` (including deals) |
| Products | `src/content/products.json` |
| Blog | `src/content/blog/<slug>.md` (frontmatter + markdown) |
| Site copy | `src/content/site.json` (hero, loyalty, about, cross-brand, footer) |
| Image uploads | `public/uploads/<timestamp>-<name>.<ext>` |

### Admin will NOT work at runtime on read-only hosts

Hostinger shared hosting and Vercel serverless have a read-only filesystem at runtime, so `/admin` write operations will fail there. Always edit locally.

## Dev commands

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # run the built app
npm run lint     # eslint
```

## Stack

- Next.js 16.2 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- `gray-matter` + `marked` for blog markdown
