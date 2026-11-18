// Exporta los recursos de marca del canal Hispanic Legacy: avatar 800×800 y banners de YouTube (ES y EN).
// Uso: node canales/hispanic-legacy/brand/render.mjs   (genera brand/out/*.png)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
fs.mkdirSync(out, { recursive: true });

const jobs = [
  { q: 'mode=avatar', w: 800, h: 800, file: 'avatar-800.png' },
  { q: 'mode=banner&lang=es', w: 2560, h: 1440, file: 'youtube-banner-es-2560x1440.png' },
  { q: 'mode=banner&lang=en', w: 2560, h: 1440, file: 'youtube-banner-en-2560x1440.png' },
  { q: 'mode=banner&lang=es&guides=1', w: 2560, h: 1440, file: 'guia-zona-segura-banner.png' },
];

const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  await page.goto(pathToFileURL(path.join(here, 'brand.html')).href + '?' + j.q);
  await page.evaluate(async () => { await document.fonts.load('900 100px "Fraunces"'); await document.fonts.ready; });
  await page.screenshot({ path: path.join(out, j.file) });
  console.log('OK →', path.join(out, j.file));
  await page.close();
}
await browser.close();
