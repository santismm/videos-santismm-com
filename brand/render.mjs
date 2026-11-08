// Exporta los recursos de marca del canal: avatar 800×800 y banner 2560×1440 de YouTube.
// Uso: node brand/render.mjs   (genera brand/out/*.png)
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
  { mode: 'avatar', w: 800, h: 800, file: 'youtube-avatar-800.png' },
  { mode: 'banner', w: 2560, h: 1440, file: 'youtube-banner-2560x1440.png' },
  { mode: 'banner', w: 2560, h: 1440, file: 'guia-zona-segura-banner.png', guides: 1 },
];

const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  const url = pathToFileURL(path.join(here, 'brand.html')).href + `?mode=${j.mode}${j.guides ? '&guides=1' : ''}`;
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, j.file) });
  console.log('OK →', path.join(out, j.file));
  await page.close();
}
await browser.close();
