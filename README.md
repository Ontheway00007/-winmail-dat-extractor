# Winmail.dat Extractor

A private, browser-based extractor for Microsoft Outlook TNEF (`winmail.dat`) attachments, plus a small
SEO-focused content site around it. The selected file is parsed **in the browser** — there is no upload
endpoint and no server-side processing.

Live site: <https://winmail-dat-extractor.vercel.app/>

## Repository layout

```
/                       generated static site (this is what Vercel serves)
├── index.html          extractor + homepage
├── guides/             guide index
├── <guide-slug>/       17 indexable pages in total
├── assets/             extractor.js, site.css, favicon.svg, social card + PNG icons
├── sitemap.xml  robots.txt  llms.txt  site.webmanifest  vercel.json  404.html
└── tools/              source of truth — not deployed (see .vercelignore)
    ├── build.mjs       static site generator (no dependencies)
    ├── content.mjs     all page copy, FAQs, HowTo steps, internal links
    ├── check.mjs       post-build SEO / link / structured-data checks
    ├── make-images.mjs renders the PNG raster assets from the SVG sources
    └── src/            site.css, extractor.js, SVG + generated PNG sources
```

Edit content in `tools/content.mjs`, styles in `tools/src/site.css` and the extractor logic in
`tools/src/extractor.js`, then regenerate. Do not hand-edit the generated HTML at the repository root.

## Build

Node 18+ and no runtime dependencies:

```bash
node tools/build.mjs     # regenerate every page, sitemap, robots.txt, manifest, vercel.json
node tools/check.mjs     # fail on broken links, invalid JSON-LD, duplicate titles, sitemap drift
```.

Raster assets (Open Graph card and PWA icons) are committed, so they only need regenerating when the
SVG sources change:

```bash
npm i --no-save @resvg/resvg-js && node tools/make-images.mjs && node tools/build.mjs
```

## Deploy to Vercel

The repository root is a plain static site, so no build step is required.

1. In Vercel choose **Add New → Project** and import this repository.
2. Framework preset: **Other**. Leave the build command empty and the output directory as the root.
3. Deploy. `vercel.json` supplies clean URLs, trailing slashes, redirects, caching and security headers.

If you point a custom domain at the project, update `SITE.origin` in `tools/content.mjs` and rerun
`node tools/build.mjs` so canonicals, Open Graph URLs, the sitemap and `robots.txt` all match.

## What the extractor supports

- Standard by-value TNEF file attachments (PDF, Office documents, images, text, nested archives)
- Original filenames, decoded from Windows-1252 or UTF-16, sanitised and de-duplicated
- All recovered files packaged into one ZIP, written in the browser
- Clear failure messages for containers holding only Rich Text, meeting requests, embedded Outlook
  items or damaged data

## SEO implementation notes

- One `<h1>`, unique title and meta description, and a self-referencing canonical on every page
- `@graph` structured data: `WebSite`, `Organization`, `SoftwareApplication`, `Article`, `HowTo`,
  `FAQPage`, `BreadcrumbList`, `CollectionPage`
- Visible breadcrumbs, on-page table of contents, related-guide links and a consistent internal link graph
- CSS inlined into every page for a render-blocking-free first paint; JS deferred
- Raster (PNG) Open Graph and Twitter card images, sized 1200×630, plus PWA icons
- `sitemap.xml` with `lastmod`/`changefreq`/`priority`, `robots.txt`, `llms.txt`, and a `noindex` 404
- Permanent redirects for common misspelled and legacy paths

## Search Console

A URL-prefix property for `https://winmail-dat-extractor.vercel.app/` is verified two ways: the
`google-site-verification` meta tag on every page and the `google5d93febf81e26a1b.html` file.

## Licence

Provided as-is, without warranty. Not affiliated with Microsoft, Apple or Google; product names are used
only to describe compatibility.
