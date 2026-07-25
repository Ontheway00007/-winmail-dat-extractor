#!/usr/bin/env node
/**
 * Static site generator for winmail-dat-extractor.
 *
 * Reads page content from ./content.mjs and writes plain static HTML into the
 * repository root so Vercel can serve it with zero configuration.
 *
 *   node tools/build.mjs
 */

import { mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, pages } from './content.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const src = path.join(here, 'src');

const css = (await readFile(path.join(src, 'site.css'), 'utf8'));

/* ------------------------------------------------------------------ helpers */

const esc = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const stripTags = (html) => String(html).replace(/<[^>]*>/g, '');

const urlFor = (slug) => (slug ? `${SITE.origin}/${slug}/` : `${SITE.origin}/`);
const pathFor = (slug) => (slug ? `/${slug}/` : '/');

const bySlug = new Map(pages.map((page) => [page.slug, page]));
const articles = pages.filter((page) => page.kind === 'article');

const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')}</script>`;

const minifyCss = (text) => text
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .replace(/\s+/g, ' ')
  .trim();

const inlineCss = minifyCss(css);

const humanDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
});

const brandMark = `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="3.4"><path d="M8 12h32v24H8z"/><path d="m9 14 15 12 15-12" stroke-linejoin="round"/></svg></span>`;

/* ----------------------------------------------------------------- fragments */

const NAV = [
  { href: '/#extract', label: 'Extractor' },
  { href: '/guides/', label: 'Guides' },
  { href: '/how-to-open-winmail-dat-on-iphone/', label: 'iPhone' },
  { href: '/how-to-open-winmail-dat-on-windows/', label: 'Windows' },
  { href: '/how-to-stop-outlook-sending-winmail-dat/', label: 'Stop winmail.dat' }
];

const header = () => `<header class="site-head"><div class="wrap nav"><a class="brand" href="/">${brandMark}<span>${SITE.name}</span></a><nav class="navlinks" aria-label="Main">${
  NAV.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')
}</nav></div></header>`;

const footer = () => `<footer class="site-foot"><div class="wrap footgrid"><div><strong>${SITE.name}</strong><div class="muted">Private, browser-based recovery of Outlook TNEF attachments.</div></div><nav class="footlinks" aria-label="Footer"><a href="/guides/">Guides</a><a href="/about/">About</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/sitemap.xml">Sitemap</a><a href="${SITE.repo}" rel="noopener">Source code</a></nav></div></footer>`;

const breadcrumbTrail = (page) => {
  const trail = [{ name: 'Home', url: pathFor('') }];
  if (page.kind === 'article') trail.push({ name: 'Guides', url: '/guides/' });
  trail.push({ name: page.crumb || page.h1, url: pathFor(page.slug) });
  return trail;
};

const breadcrumbHtml = (trail) => `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${
  trail.map((item, index) => {
    const last = index === trail.length - 1;
    return `<li>${last ? `<span aria-current="page">${item.name}</span>` : `<a href="${item.url}">${item.name}</a>`}</li>`;
  }).join('')
}</ol></nav>`;

const breadcrumbSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE.origin}${item.url}`
  }))
});

const faqHtml = (faqs) => `<section id="faq"><h2>Frequently asked questions</h2><div class="faq">${
  faqs.map((item) => `<details><summary>${item.q}</summary><p>${item.a}</p></details>`).join('')
}</div></section>`;

const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: stripTags(item.q),
    acceptedAnswer: { '@type': 'Answer', text: stripTags(item.a) }
  }))
});

// `anchored` is only true where the steps are also rendered as elements with
// matching ids, so the step URLs always point at something that exists.
const howToSchema = (howTo, page, anchored = false) => ({
  '@type': 'HowTo',
  name: howTo.name,
  description: howTo.description || page.description,
  totalTime: howTo.totalTime || 'PT3M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  tool: (howTo.tools || ['A web browser', 'The winmail.dat attachment']).map((name) => ({ '@type': 'HowToTool', name })),
  step: howTo.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: stripTags(step.text),
    ...(anchored ? { url: `${urlFor(page.slug)}#${step.id || `step-${index + 1}`}` } : {})
  }))
});

const sourcesHtml = (sources) => `<section id="sources"><h2>Official references</h2><ul class="source-list">${
  sources.map((item) => `<li><a href="${item.url}" rel="nofollow noopener" target="_blank">${item.label}</a></li>`).join('')
}</ul></section>`;

const relatedHtml = (slugs) => {
  const items = slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  if (!items.length) return '';
  return `<section class="related"><h2>Related guides</h2><ul class="related-list">${
    items.map((item) => `<li><a href="${pathFor(item.slug)}">${item.linkLabel || item.h1}</a><span>${item.cardDesc || item.description}</span></li>`).join('')
  }</ul></section>`;
};

const ctaHtml = () => `<div class="cta"><h2>Extract your winmail.dat file now</h2><p>The extractor runs in your browser, finds the standard attachments inside the TNEF container and packages them into one ZIP. Nothing is uploaded to a server.</p><p><a class="button" href="/#extract">Open the free extractor</a></p></div>`;

const tocHtml = (entries) => `<aside class="toc" aria-label="On this page"><strong>On this page</strong>${
  entries.map((entry) => `<a href="#${entry.id}">${entry.label}</a>`).join('')
}</aside>`;

/* -------------------------------------------------------------------- layout */

function layout(page, bodyHtml, schemaNodes) {
  const url = urlFor(page.slug);
  // Keep titles inside Google's ~60 character display width: the brand suffix is
  // only appended when the combined string still fits.
  const withBrand = `${page.title} | ${SITE.name}`;
  const title = page.metaTitle || (page.slug && withBrand.length <= 60 ? withBrand : page.title);
  const noindex = page.noindex === true;
  const robots = noindex
    ? 'noindex,follow'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  const graph = [{ '@type': 'WebPage', '@id': `${url}#webpage`, url, name: stripTags(title), description: page.description, inLanguage: 'en', isPartOf: { '@id': `${SITE.origin}/#website` } }, ...schemaNodes];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
${noindex ? '' : `<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
`}<meta name="google-site-verification" content="${SITE.googleVerification}">
<meta name="theme-color" content="#07101f">
<meta name="color-scheme" content="dark light">
<meta name="author" content="${SITE.name}">
<meta property="og:type" content="${page.kind === 'article' ? 'article' : 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.origin}/assets/social-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta property="og:image:alt" content="${esc(SITE.name)} — open winmail.dat and recover attachments in your browser">
${page.kind === 'article' ? `<meta property="article:published_time" content="${page.published}">
<meta property="article:modified_time" content="${page.updated}">
` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${SITE.origin}/assets/social-card.png">
<meta name="twitter:image:alt" content="${esc(SITE.name)} social preview">
<meta name="apple-mobile-web-app-title" content="Winmail Extractor">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<style>${inlineCss}</style>
${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header()}
<main id="main">
${bodyHtml}
</main>
${footer()}
</body>
</html>
`;
}

/* --------------------------------------------------------------- page bodies */

function renderArticle(page) {
  const trail = breadcrumbTrail(page);
  const tocEntries = page.sections.map((section) => ({ id: section.id, label: section.tocLabel || stripTags(section.h2) }));
  if (page.faqs?.length) tocEntries.push({ id: 'faq', label: 'Frequently asked questions' });
  if (page.sources?.length) tocEntries.push({ id: 'sources', label: 'Official references' });

  const body = `<div class="wrap">
${breadcrumbHtml(trail)}
<header class="article-hero"><span class="eyebrow">Updated ${humanDate(page.updated)}</span><h1>${page.h1}</h1><p class="lead">${page.lead || page.description}</p><p class="byline"><span>By the ${SITE.name} team</span><span>·</span><span>${page.readingTime || '4 min read'}</span></p></header>
<div class="article">
<article class="prose">
${page.keyFacts ? `<div class="keyfacts"><strong>${page.keyFacts.title}</strong><ul>${page.keyFacts.items.map((item) => `<li>${item}</li>`).join('')}</ul></div>` : ''}
${page.sections.map((section) => `<section id="${section.id}"><h2>${section.h2}</h2>${section.html}</section>`).join('\n')}
${page.faqs?.length ? faqHtml(page.faqs) : ''}
${page.sources?.length ? sourcesHtml(page.sources) : ''}
${ctaHtml()}
${relatedHtml(page.related || [])}
</article>
${tocHtml(tocEntries)}
</div>
</div>`;

  const schema = [
    breadcrumbSchema(trail),
    {
      '@type': 'Article',
      headline: page.h1,
      description: page.description,
      datePublished: page.published,
      dateModified: page.updated,
      inLanguage: 'en',
      mainEntityOfPage: { '@id': `${urlFor(page.slug)}#webpage` },
      author: { '@id': `${SITE.origin}/#organization` },
      publisher: { '@id': `${SITE.origin}/#organization` },
      image: `${SITE.origin}/assets/social-card.png`,
      about: page.about || ['winmail.dat', 'Transport Neutral Encapsulation Format']
    }
  ];
  if (page.howTo) schema.push(howToSchema(page.howTo, page));
  if (page.faqs?.length) schema.push(faqSchema(page.faqs));

  return layout(page, body, schema);
}

function renderLegal(page) {
  const trail = breadcrumbTrail(page);
  const body = `<div class="wrap legal">
${breadcrumbHtml(trail)}
<h1>${page.h1}</h1>
${page.html}
</div>`;
  return layout(page, body, [breadcrumbSchema(trail)]);
}

function renderGuides(page) {
  const trail = breadcrumbTrail(page);
  const body = `<div class="wrap legal">
${breadcrumbHtml(trail)}
<h1>${page.h1}</h1>
<p class="lead" style="margin-left:0">${page.lead}</p>
<div class="grid" style="margin-top:34px">${
    articles.map((item) => `<a class="card" href="${pathFor(item.slug)}"><span class="tag">${item.cardTag || 'Guide'}</span><h3>${item.linkLabel || item.h1}</h3><p>${item.cardDesc || item.description}</p></a>`).join('')
  }</div>
${ctaHtml()}
</div>`;

  const schema = [
    breadcrumbSchema(trail),
    {
      '@type': 'CollectionPage',
      name: page.title,
      description: page.description,
      hasPart: articles.map((item) => ({ '@type': 'Article', headline: item.h1, url: urlFor(item.slug) }))
    }
  ];
  return layout(page, body, schema);
}

function renderHome(page) {
  const featured = page.featured.map((slug) => bySlug.get(slug)).filter(Boolean);

  const body = `<section class="hero wrap">
<span class="eyebrow">Runs in your browser · Nothing is uploaded</span>
<h1 class="gradient">${page.h1}</h1>
<p class="lead">${page.lead}</p>
<ul class="trustrow"><li>Free, no sign-up</li><li>Works on iPhone, Android, Windows and Mac</li><li>Files never leave your device</li><li>Open source</li></ul>
</section>

<section id="extract" class="tool" aria-label="Winmail.dat extractor">
<input id="fileInput" class="file-input" type="file" aria-label="Choose a winmail.dat file">
<div class="dropzone" id="dropzone">
<div><svg class="upload-icon" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="#7cc0ff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h36v24H6z"/><path d="m7 14 17 13 17-13"/><path d="M24 24v13m-6-6 6 6 6-6"/></svg><h2>Choose your winmail.dat file</h2><p class="muted">It may also be called win.dat, ATT00001.dat or “Part 1.2”. Drag and drop works on desktop.</p><label class="button" for="fileInput">Choose file</label></div>
</div>
<div id="status" class="status" role="status" aria-live="assertive"></div>
<div id="files" class="files">
<div class="files-head"><h2 id="filesTitle">Extracted files</h2><button class="button secondary" id="resetButton" type="button">Choose another file</button></div>
<div id="fileList" class="file-list"></div>
<button class="button full" id="downloadButton" type="button">Download ZIP</button>
</div>
<p class="privacy-note">The selected file is read on your device only. Standard by-value TNEF attachments are supported.</p>
</section>

<section class="section wrap" id="how-it-works">
<h2>How to open a winmail.dat file in 3 steps</h2>
<p class="section-intro">The steps are identical on iPhone, Android, Windows and macOS because everything happens inside your browser.</p>
<div class="steps">${
    page.howTo.steps.map((step) => `<div class="step" id="${step.id}"><h3>${step.name}</h3><p>${step.text}</p></div>`).join('')
  }</div>
</section>

<section class="section wrap" id="why">
<h2>Why this extractor is different</h2>
<p class="section-intro">Most winmail.dat converters upload your email attachment to a server you do not control. This one does not.</p>
<div class="grid">${
    page.benefits.map((item) => `<div class="card"><span class="tag">${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p></div>`).join('')
  }</div>
</section>

<section class="section wrap" id="guides">
<h2>Winmail.dat guides for every device</h2>
<p class="section-intro">Step-by-step help for recipients, plus the permanent fix for Outlook senders.</p>
<div class="grid">${
    featured.map((item) => `<a class="card" href="${pathFor(item.slug)}"><span class="tag">${item.cardTag || 'Guide'}</span><h3>${item.linkLabel || item.h1}</h3><p>${item.cardDesc || item.description}</p></a>`).join('')
  }</div>
<p style="margin-top:22px"><a href="/guides/">Browse all winmail.dat guides →</a></p>
</section>

<section class="section wrap" id="supported">
<h2>What the extractor can and cannot recover</h2>
<div class="grid two">
<div class="card"><span class="tag">Supported</span><h3>Standard file attachments</h3><p>PDF, Word, Excel, PowerPoint, images, text files, ZIP archives and other ordinary documents stored as by-value TNEF attachments keep their original bytes and filenames.</p></div>
<div class="card"><span class="tag">Not supported</span><h3>Outlook-only objects</h3><p>Meeting requests, embedded Outlook items, voting buttons, custom MAPI properties, OLE objects and damaged containers cannot be turned into normal files. Ask the sender to resend as HTML.</p></div>
</div>
</section>

<section class="section wrap" id="faq">
<h2>Winmail.dat questions, answered</h2>
<div class="faq">${
    page.faqs.map((item) => `<details><summary>${item.q}</summary><p>${item.a}</p></details>`).join('')
  }</div>
</section>
<script src="/assets/extractor.js" defer></script>`;

  const schema = [
    {
      '@type': 'WebSite',
      '@id': `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      description: page.description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.origin}/#organization` }
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.origin}/#organization`,
      name: SITE.name,
      url: `${SITE.origin}/`,
      logo: { '@type': 'ImageObject', url: `${SITE.origin}/assets/icon-512.png`, width: 512, height: 512 },
      sameAs: [SITE.repo]
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE.origin}/#app`,
      name: SITE.name,
      alternateName: ['Winmail.dat opener', 'TNEF extractor', 'winmail.dat viewer'],
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File converter',
      operatingSystem: 'Any device with a modern web browser (iOS, Android, Windows, macOS, Linux, ChromeOS)',
      browserRequirements: 'Requires JavaScript and the File API',
      url: `${SITE.origin}/`,
      description: page.description,
      isAccessibleForFree: true,
      featureList: [
        'Extract attachments from Outlook winmail.dat (TNEF) files',
        'Download all recovered attachments as a single ZIP',
        'Client-side processing: files are never uploaded',
        'No account, installation or file size upload limit'
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE.origin}/#organization` }
    },
    howToSchema(page.howTo, page, true),
    faqSchema(page.faqs)
  ];

  return layout(page, body, schema);
}

/* ---------------------------------------------------------------- write pass */

async function writeOut(relPath, contents) {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents);
  return relPath;
}

const written = [];

for (const page of pages) {
  let html;
  if (page.kind === 'home') html = renderHome(page);
  else if (page.kind === 'guides') html = renderGuides(page);
  else if (page.kind === 'article') html = renderArticle(page);
  else html = renderLegal(page);

  const file = page.file || (page.slug ? `${page.slug}/index.html` : 'index.html');
  written.push(await writeOut(file, html));
}

/* ------------------------------------------------------------------- assets */

await mkdir(path.join(root, 'assets'), { recursive: true });
for (const asset of ['extractor.js', 'favicon.svg', 'social-card.svg', 'social-card.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']) {
  const from = path.join(src, asset);
  if (existsSync(from)) {
    await copyFile(from, path.join(root, 'assets', asset));
    written.push(`assets/${asset}`);
  } else {
    console.warn(`! missing source asset: ${asset} (run: node tools/make-images.mjs)`);
  }
}
// site.css is inlined into every page for faster first render; ship it too so
// the source of truth is browsable and cacheable for anyone reusing it.
await writeFile(path.join(root, 'assets', 'site.css'), css);
written.push('assets/site.css');

/* -------------------------------------------------- sitemap / robots / misc */

const indexable = pages.filter((page) => !page.noindex);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((page) => `  <url>
    <loc>${urlFor(page.slug)}</loc>
    <lastmod>${page.updated || SITE.buildDate}</lastmod>
    <changefreq>${page.changefreq || (page.kind === 'home' ? 'weekly' : 'monthly')}</changefreq>
    <priority>${page.priority ?? (page.kind === 'home' ? '1.0' : page.kind === 'article' ? '0.8' : '0.5')}</priority>
  </url>`).join('\n')}
</urlset>
`;
written.push(await writeOut('sitemap.xml', sitemap));

written.push(await writeOut('robots.txt', `# ${SITE.name}
User-agent: *
Allow: /
Disallow: /tools/
Disallow: /404.html

# AI answer engines are welcome; see /llms.txt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`));

written.push(await writeOut('site.webmanifest', `${JSON.stringify({
  id: '/',
  name: `${SITE.name} — open winmail.dat online`,
  short_name: 'Winmail Extractor',
  description: SITE.tagline,
  start_url: '/?utm_source=pwa',
  scope: '/',
  display: 'standalone',
  background_color: '#07101f',
  theme_color: '#07101f',
  lang: 'en',
  dir: 'ltr',
  categories: ['utilities', 'productivity'],
  icons: [
    { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2)}\n`));

written.push(await writeOut('llms.txt', `# ${SITE.name}

> ${SITE.tagline} Everything runs client-side in the visitor's browser; the selected winmail.dat file is never uploaded to a server.

## Tool
- [Winmail.dat extractor](${SITE.origin}/): select a winmail.dat / TNEF file, extract the standard attachments and download them as one ZIP.

## Guides
${articles.map((page) => `- [${page.h1}](${urlFor(page.slug)}): ${page.description}`).join('\n')}

## Site information
- [About](${SITE.origin}/about/)
- [Privacy policy](${SITE.origin}/privacy/)
- [Terms of use](${SITE.origin}/terms/)
- Source code: ${SITE.repo}
`));

written.push(await writeOut('vercel.json', `${JSON.stringify({
  $schema: 'https://openapi.vercel.sh/vercel.json',
  cleanUrls: true,
  trailingSlash: true,
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests"
        }
      ]
    },
    {
      source: '/assets/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
    },
    {
      source: '/(.*).html',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' }]
    },
    {
      source: '/sitemap.xml',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }]
    },
    {
      source: '/tools/(.*)',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    }
  ],
  redirects: [
    { source: '/index.html', destination: '/', permanent: true },
    { source: '/winmail', destination: '/', permanent: true },
    { source: '/winmail-dat', destination: '/', permanent: true },
    { source: '/open-winmail-dat', destination: '/', permanent: true },
    { source: '/extract', destination: '/', permanent: true },
    { source: '/guide', destination: '/guides/', permanent: true },
    { source: '/how-to-open-winmail-dat', destination: '/guides/', permanent: true },
    { source: '/what-is-winmail-dat-file', destination: '/what-is-winmail-dat/', permanent: true },
    { source: '/winmail-dat-opener', destination: '/winmail-dat-viewer/', permanent: true },
    { source: '/att00001', destination: '/att00001-dat-file/', permanent: true }
  ]
}, null, 2)}\n`));

written.push(await writeOut('.vercelignore', `tools/\nREADME.md\n.gitignore\n`));

written.push(await writeOut('.gitignore', `.DS_Store\nThumbs.db\n.vercel\nnode_modules/\n*.log\n`));

written.push(await writeOut(`${SITE.googleVerificationFile}`, `google-site-verification: ${SITE.googleVerificationFile}\n`));

/* --------------------------------------------------------------------- done */

// Remove directories from earlier builds that no longer have a page.
const knownDirs = new Set(pages.filter((p) => p.slug).map((p) => p.slug));
for (const stale of SITE.retiredSlugs || []) {
  if (!knownDirs.has(stale) && existsSync(path.join(root, stale))) {
    await rm(path.join(root, stale), { recursive: true, force: true });
    console.log(`- removed retired page /${stale}/`);
  }
}

console.log(`Built ${pages.length} pages (${indexable.length} indexable) + ${written.length - pages.length} support files.`);
for (const file of written) console.log(`  ${file}`);
