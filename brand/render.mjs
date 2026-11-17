// Exporta los recursos de marca de los canales: avatar 800×800 y banner 2560×1440 de YouTube.
// Uso: node brand/render.mjs   (genera brand/out/*.png: EUREKA y MYTHOS en español e inglés)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(path.join(out, 'en'), { recursive: true });
fs.mkdirSync(path.join(out, 'instagram-destacadas'), { recursive: true });

const jobs = [
  // Español
  { mode: 'avatar', w: 800, h: 800, file: 'youtube-avatar-800.png' },
  { mode: 'banner', w: 2560, h: 1440, file: 'youtube-banner-2560x1440.png' },
  { mode: 'banner', w: 2560, h: 1440, file: 'guia-zona-segura-banner.png', guides: 1 },
  // Inglés
  { mode: 'avatar', w: 800, h: 800, file: 'en/avatar-800-en.png', lang: 'en' },
  { mode: 'banner', w: 2560, h: 1440, file: 'en/youtube-banner-2560x1440-en.png', lang: 'en' },
  // Portadas de destacadas de Instagram (sin texto: valen para ambos idiomas)
  ...['agentes', 'benchmarks', 'robots', 'seguridad', 'coste'].map((hl) => ({ mode: 'highlight', w: 1080, h: 1920, file: `instagram-destacadas/${hl}.png`, hl })),
  // MYTHOS (mythosdata.dev): avatar común y banners ES/EN
  { html: 'mythos.html', mode: 'avatar', w: 800, h: 800, file: 'mythos-avatar-800.png' },
  { html: 'mythos.html', mode: 'banner', lang: 'es', w: 2560, h: 1440, file: 'mythos-es-banner-2560x1440.png' },
  { html: 'mythos.html', mode: 'banner', lang: 'en', w: 2560, h: 1440, file: 'mythos-en-banner-2560x1440.png' },
  { html: 'mythos.html', mode: 'banner', lang: 'es', w: 2560, h: 1440, file: 'mythos-guia-zona-segura-banner.png', guides: 1 },
];

const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  const url = pathToFileURL(path.join(here, j.html || 'brand.html')).href + `?mode=${j.mode}${j.guides ? '&guides=1' : ''}${j.lang ? '&lang=' + j.lang : ''}${j.hl ? '&hl=' + j.hl : ''}`;
  await page.goto(url);
  await page.evaluate(async () => { await document.fonts.load('900 80px "Cinzel"'); await document.fonts.load('40px "Noto Hieroglyphs"', '𓂀'); await document.fonts.ready; });
  await page.screenshot({ path: path.join(out, j.file) });
  console.log('OK →', path.join(out, j.file));
  await page.close();
}
await browser.close();
