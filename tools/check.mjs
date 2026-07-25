#!/usr/bin/env node
/**
 * Post-build SEO and integrity checks.
 *   node tools/check.mjs
 *
 * Fails (exit 1) on broken internal links, invalid JSON-LD, duplicate titles or
 * descriptions, missing canonicals and sitemap/page mismatches.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, pages } from './content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const warnings = [];

const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'tools', '_extract'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html') && entry.name !== SITE.googleVerificationFile) htmlFiles.push(full);
  }
}
await walk(root);

const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(root, file);
  const html = await readFile(file, 'utf8');
  const pick = (re) => (html.match(re) || [])[1];

  // structured data
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(block[1]);
      if (!parsed['@context']) problems.push(`${rel}: JSON-LD missing @context`);
    } catch (error) {
      problems.push(`${rel}: invalid JSON-LD (${error.message})`);
    }
  }

  const title = pick(/<title>([\s\S]*?)<\/title>/);
  const description = pick(/<meta name="description" content="([^"]*)"/);
  const canonical = pick(/<link rel="canonical" href="([^"]*)"/);
  const robots = pick(/<meta name="robots" content="([^"]*)"/);

  if (!title) problems.push(`${rel}: no <title>`);
  if (!description) problems.push(`${rel}: no meta description`);
  if (!canonical) problems.push(`${rel}: no canonical`);
  if (!/^https:\/\//.test(canonical || '')) problems.push(`${rel}: canonical is not absolute`);

  const indexable = !/noindex/.test(robots || '');
  if (indexable && title) {
    if (titles.has(title)) problems.push(`${rel}: duplicate title with ${titles.get(title)}`);
    else titles.set(title, rel);
    if (title.length > 62) warnings.push(`${rel}: title is ${title.length} chars (>62 may truncate)`);
    if (title.length < 20) warnings.push(`${rel}: title is very short (${title.length})`);
  }
  if (indexable && description) {
    if (descriptions.has(description)) problems.push(`${rel}: duplicate description with ${descriptions.get(description)}`);
    else descriptions.set(description, rel);
    if (description.length > 165) warnings.push(`${rel}: description is ${description.length} chars (>165 may truncate)`);
    if (description.length < 70) warnings.push(`${rel}: description is short (${description.length})`);
  }

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) problems.push(`${rel}: expected exactly one <h1>, found ${h1Count}`);

  if (!/<meta property="og:image" content="[^"]+\.png"/.test(html)) problems.push(`${rel}: og:image is not a PNG`);
  if (!/lang="en"/.test(html)) problems.push(`${rel}: missing lang attribute`);
  if (/<img (?![^>]*alt=)/.test(html)) problems.push(`${rel}: <img> without alt`);

  // internal links
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = match[1];
    const candidates = target.endsWith('/')
      ? [path.join(root, target, 'index.html')]
      : [path.join(root, target)];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      problems.push(`${rel}: broken internal link ${target}`);
    }
  }

  const bytes = (await stat(file)).size;
  if (bytes > 120 * 1024) warnings.push(`${rel}: page is ${(bytes / 1024).toFixed(0)} kB`);
}

// sitemap coverage
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expected = pages.filter((page) => !page.noindex).map((page) => (page.slug ? `${SITE.origin}/${page.slug}/` : `${SITE.origin}/`));
for (const url of expected) if (!locs.includes(url)) problems.push(`sitemap.xml: missing ${url}`);
for (const url of locs) if (!expected.includes(url)) problems.push(`sitemap.xml: unexpected ${url}`);
const noindexed = pages.filter((page) => page.noindex).map((page) => page.slug);
for (const slug of noindexed) if (locs.some((loc) => loc.includes(`/${slug}`))) problems.push(`sitemap.xml: contains noindex page ${slug}`);

// robots + assets
const robotsTxt = await readFile(path.join(root, 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`${SITE.origin}/sitemap.xml`)) problems.push('robots.txt: sitemap URL missing');
for (const asset of ['assets/social-card.png', 'assets/icon-512.png', 'assets/apple-touch-icon.png', 'assets/extractor.js', 'site.webmanifest', 'llms.txt', 'vercel.json']) {
  if (!existsSync(path.join(root, asset))) problems.push(`missing ${asset}`);
}
JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
JSON.parse(await readFile(path.join(root, 'site.webmanifest'), 'utf8'));

console.log(`Checked ${htmlFiles.length} HTML files.`);
for (const warning of warnings) console.log(`  warn  ${warning}`);
if (problems.length) {
  for (const problem of problems) console.error(`  FAIL  ${problem}`);
  process.exit(1);
}
console.log('All checks passed.');
