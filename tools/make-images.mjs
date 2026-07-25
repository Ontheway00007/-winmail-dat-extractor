#!/usr/bin/env node
/**
 * Renders the PNG raster assets from the SVG sources.
 *
 * Open Graph, Twitter and PWA icons must be raster images: Google, Facebook,
 * Slack and iOS all ignore or mishandle SVG here, which is why the generated
 * PNGs are committed alongside the SVG sources.
 *
 * Requires @resvg/resvg-js (not a runtime dependency of the site):
 *   npm i --no-save @resvg/resvg-js && node tools/make-images.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, 'src');

let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch {
  console.error('@resvg/resvg-js is not installed. Run: npm i --no-save @resvg/resvg-js');
  process.exit(1);
}

const targets = [
  { from: 'social-card.svg', to: 'social-card.png', width: 1200 },
  { from: 'favicon.svg', to: 'icon-192.png', width: 192 },
  { from: 'favicon.svg', to: 'icon-512.png', width: 512 },
  { from: 'favicon.svg', to: 'apple-touch-icon.png', width: 180 }
];

for (const target of targets) {
  const svg = await readFile(path.join(src, target.from), 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: target.width },
    background: 'rgba(7,16,31,1)',
    font: { loadSystemFonts: true, defaultFontFamily: 'Noto Sans' }
  });
  const png = resvg.render().asPng();
  await writeFile(path.join(src, target.to), png);
  console.log(`${target.to}  ${(png.length / 1024).toFixed(1)} kB`);
}
