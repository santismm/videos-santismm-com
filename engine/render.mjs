// Renderiza un vídeo fotograma a fotograma con Chromium (Playwright) y ffmpeg.
// Uso:
//   node engine/render.mjs videos/<id>                  → build/video_silent.mp4 + build/cues.json
//   node engine/render.mjs videos/<id> --stills 1,5.2   → build/stills/*.png (revisión rápida)
//   opciones: --fps 30  --workers 3  --cover <t>
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const vdir = path.resolve(args[0]);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const fps = +opt('fps', 30);
const workers = +opt('workers', 3);
const stills = opt('stills', null);
const build = path.join(vdir, 'build');
const timeline = JSON.parse(fs.readFileSync(path.join(build, 'timeline.json'), 'utf8'));
const scenesSrc = pathToFileURL(path.join(vdir, 'scenes.js')).href;
const pageUrl = pathToFileURL(path.join(here, 'page.html')).href;

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => { console.error('[page]', e.message); process.exitCode = 1; });
  page.on('console', (m) => { if (m.type() === 'error') console.error('[console]', m.text()); });
  await page.goto(pageUrl);
  const info = await page.evaluate(([tl, src]) => window.__boot(tl, src), [timeline, scenesSrc]);
  return { page, info };
}

function ffmpegSink(out) {
  const p = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(fps), out],
    { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c)))));
  return { stdin: p.stdin, done };
}

async function renderRange(browser, a, b, out, label) {
  const { page } = await openPage(browser);
  const sink = ffmpegSink(out);
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    await page.evaluate((t) => window.__render(t), f / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!sink.stdin.write(buf)) await new Promise((r) => sink.stdin.once('drain', r));
    if ((f - a) % 150 === 0) console.log(`  [${label}] ${f - a}/${b - a} fotogramas · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  sink.stdin.end();
  await sink.done;
  await page.close();
}

const browser = await chromium.launch();
try {
  if (opt('cover', null)) {
    const { page } = await openPage(browser);
    const meta = JSON.parse(fs.readFileSync(path.join(vdir, 'script.json'), 'utf8'));
    await page.evaluate(([t, title]) => EUREKA.cover(t, title), [parseFloat(opt('cover')), meta.cover || meta.title]);
    const out = path.join(build, 'cover.png');
    await page.screenshot({ path: out });
    console.log('OK →', out);
  } else if (stills) {
    const dir = path.join(build, 'stills');
    fs.mkdirSync(dir, { recursive: true });
    const { page } = await openPage(browser);
    for (const s of stills.split(',')) {
      const t = parseFloat(s);
      await page.evaluate((t) => window.__render(t), t);
      const f = path.join(dir, `t${t.toFixed(2).padStart(6, '0')}.png`);
      await page.screenshot({ path: f });
      console.log(f);
    }
  } else {
    const { page, info } = await openPage(browser);
    fs.writeFileSync(path.join(build, 'cues.json'), JSON.stringify(info.cues, null, 1));
    await page.close();
    const total = Math.ceil(timeline.duration * fps);
    console.log(`Renderizando ${total} fotogramas a ${fps} fps con ${workers} workers…`);
    const per = Math.ceil(total / workers);
    const segs = [];
    const jobs = [];
    for (let i = 0; i < workers; i++) {
      const a = i * per, b = Math.min(total, (i + 1) * per);
      if (a >= b) break;
      const out = path.join(build, `seg${i}.mp4`);
      segs.push(out);
      jobs.push(renderRange(browser, a, b, out, 'w' + i));
    }
    await Promise.all(jobs);
    const list = path.join(build, 'segs.txt');
    fs.writeFileSync(list, segs.map((s) => `file '${s}'`).join('\n'));
    await new Promise((res, rej) => spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy',
      path.join(build, 'video_silent.mp4')], { stdio: 'inherit' }).on('close', (c) => (c ? rej(new Error('concat')) : res())));
    segs.forEach((s) => fs.unlinkSync(s));
    fs.unlinkSync(list);
    console.log('OK →', path.join(build, 'video_silent.mp4'));
  }
} finally {
  await browser.close();
}
