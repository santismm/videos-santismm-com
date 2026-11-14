/* EUREKA · motor de vídeo vertical (1080x1920) determinista.
 * Todo se calcula como función pura del tiempo t, así cada fotograma es reproducible.
 * Cada vídeo define sus escenas con EUREKA.scene(id, build) en videos/<id>/scenes.js.
 */
(function () {
  const W = 1080, H = 1920;

  // Paleta y tipografías tomadas de santismm.com
  const C = {
    bg: '#070a13', surface: '#0b0f19', surface2: '#0f1525', line: '#1b2336', lineStrong: '#2a3550',
    fg: '#dbe2ee', ink: '#f8fafc', muted: '#93a1b8', faint: '#5d6b85',
    cyan: '#22d3ee', blue: '#3b82f6', green: '#10b981', amber: '#f59e0b', red: '#fb2c36',
    rose: '#ff667f', violet: '#a685ff', sky: '#77d4ff',
  };

  // Marcas: cada canal redefine paleta, tipografías, cabecera y fondo. 'eureka' es el valor por defecto.
  const BRANDS = {
    eureka: { name: 'EUREKA', series: 'IA EN 60s', bg: 'grid', caption: { font: 'Space Grotesk', size: 82, hi: 'cyan', key: 'amber' } },
    mythos: {
      name: 'MYTHOS', series: { es: 'MITO VS TEXTO', en: 'MYTH VS TEXT' }, bg: 'papyrus',
      C: { bg: '#0f0b08', surface: '#1a140f', surface2: '#221a13', line: '#33281d', lineStrong: '#4a3a29',
           fg: '#efe6d4', ink: '#fbf8f1', muted: '#b3a48c', faint: '#7d6f5b',
           cyan: '#d9a94a', blue: '#4f7fd1', green: '#3fb8a8', amber: '#e3b75a', red: '#d0452c',
           rose: '#e8806a', violet: '#9a7fd1', sky: '#7fb7d9',
           gold: '#d9a94a', oxblood: '#8a2d1c', blood: '#b3261e', papyrus: '#f2ecdd', parchment: '#fbf8f1',
           lapis: '#2f5fa8', turquoise: '#3fb8a8', silver: '#c9cfd6' },
      fonts: { display: "'Cinzel', serif", body: "'EB Garamond', serif" },
      caption: { font: 'Cinzel', size: 78, hi: 'gold', key: 'red', weight: 900 },
    },
  };
  function setBrand(id) {
    const b = BRANDS[id || 'eureka'];
    if (!b) throw new Error('marca desconocida: ' + id);
    S.brand = b;
    if (b.C) Object.assign(C, b.C);
    const st = document.getElementById('stage');
    if (b.fonts) { st.style.setProperty('--f-display', b.fonts.display); st.style.setProperty('--f-body', b.fonts.body); }
    st.style.background = C.bg; document.body.style.background = C.bg;
    return b;
  }

  // Zonas seguras (TikTok / Reels / Shorts): arriba ~290px, abajo ~480px, derecha ~160px.
  const SAFE = { top: 290, bottom: H - 500, left: 90, right: W - 150 };

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const prog = (t, a, d) => clamp01((t - a) / d);
  const Ease = {
    linear: (x) => x,
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    inCubic: (x) => x * x * x,
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outQuint: (x) => 1 - Math.pow(1 - x, 5),
    outBack: (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
    outElastic: (x) => (x === 0 || x === 1) ? x : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
  };
  // Muelle amortiguado: 0 → 1 con un pequeño rebote.
  const spring = (t, a, d = 0.5) => (t <= a ? 0 : Math.max(0.0001, Ease.outBack(prog(t, a, d))));
  const appear = (t, a, d = 0.35) => Ease.outCubic(prog(t, a, d));

  function h(htmlStr) {
    const d = document.createElement('div');
    d.innerHTML = htmlStr.trim();
    return d.firstElementChild;
  }
  function add(parent, htmlStr) { const e = h(htmlStr); parent.appendChild(e); return e; }
  function css(e, obj) { for (const k in obj) e.style[k] = obj[k]; }
  const fmt = (x, dec = 0) => x.toFixed(dec).replace('.', ',');
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w%]/g, '');

  // ---------- Iconos (SVG trazados a mano, stroke = currentColor) ----------
  const I = {
    wrench: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M41 8a14 14 0 0 0-13 19L9 46a5.5 5.5 0 0 0 8 8l19-19A14 14 0 0 0 55 22l-8 8-9-2-2-9 8-8a14 14 0 0 0-3-3z"/></svg>`,
    memory: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><ellipse cx="32" cy="14" rx="20" ry="7"/><path d="M12 14v36c0 3.9 9 7 20 7s20-3.1 20-7V14"/><path d="M12 26c0 3.9 9 7 20 7s20-3.1 20-7M12 38c0 3.9 9 7 20 7s20-3.1 20-7"/></svg>`,
    doc: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12M24 30h18M24 39h18M24 48h11"/></svg>`,
    loop: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M50 26a19 19 0 0 0-34-6"/><path d="M14 8v12h12"/><path d="M14 38a19 19 0 0 0 34 6"/><path d="M50 56V44H38"/></svg>`,
    wheel: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5"><circle cx="32" cy="32" r="25"/><circle cx="32" cy="32" r="9"/><path d="M32 7v16M32 41v16M7 32h16M41 32h16" stroke-linecap="round"/></svg>`,
    steering: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><circle cx="32" cy="32" r="25"/><circle cx="32" cy="34" r="6"/><path d="M8 28c8-3 16-4 24-4s16 1 24 4M32 40v17"/></svg>`,
    brake: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="6"/><circle cx="32" cy="18" r="2.5" fill="currentColor"/><circle cx="44" cy="38" r="2.5" fill="currentColor"/><circle cx="20" cy="38" r="2.5" fill="currentColor"/><path d="M50 14a26 26 0 0 1 4 22" stroke-width="8"/></svg>`,
    bookmark: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><path d="M16 6h32v52L32 46 16 58z"/></svg>`,
    share: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M36 10l20 18-20 18V35c-14 0-22 4-28 17 1-18 9-30 28-31z"/></svg>`,
    check: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 34l13 13 27-29"/></svg>`,
    cross: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M16 16l32 32M48 16L16 48"/></svg>`,
    cursor: `<svg viewBox="0 0 64 64"><path d="M10 6l40 22-17 4-8 17z" fill="#f8fafc" stroke="#070a13" stroke-width="3" stroke-linejoin="round"/></svg>`,
  };

  // ---------- Estado global ----------
  const S = { brand: null, tl: null, scenes: [], defs: {}, cues: [], shakes: [], chunks: [], video: {} };

  function scene(id, build) { S.defs[id] = build; }

  // ---------- Fondo: rejilla del site + resplandores que respiran ----------
  function buildBg() {
    const bg = document.getElementById('bg');
    if (S.brand.bg === 'papyrus') {
      // Fondo cálido de tumba: resplandores de antorcha, textura de papiro con ruido y polvo dorado flotando.
      bg.innerHTML = `
      <div class="layer" id="glowA" style="background: radial-gradient(620px 620px at 50% 50%, rgba(217,169,74,.22), transparent 70%)"></div>
      <div class="layer" id="glowB" style="background: radial-gradient(720px 720px at 50% 50%, rgba(138,45,28,.30), transparent 70%)"></div>
      <svg class="layer" width="1080" height="1920" style="opacity:.16;mix-blend-mode:overlay"><filter id="pap"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .95  0 0 0 0 .85  0 0 0 0 .65  0 0 0 1.2 -.2"/></filter><rect width="1080" height="1920" filter="url(#pap)"/></svg>
      <div class="layer" id="dust"></div>
      <div class="layer" style="background: radial-gradient(1100px 1500px at 50% 45%, transparent 50%, rgba(0,0,0,.65) 100%)"></div>`;
      const dust = document.getElementById('dust');
      let a = 99;
      const r = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
      S.dust = Array.from({ length: 46 }, () => {
        const sz = 2 + r() * 5;
        const e = add(dust, `<div class="abs" style="width:${sz}px;height:${sz}px;border-radius:50%;background:#f3d58e;box-shadow:0 0 ${sz * 3}px #f3d58e"></div>`);
        return { e, x: r() * 1080, y: r() * 1920, v: 12 + r() * 30, ph: r() * 6.28, o: 0.15 + r() * 0.45 };
      });
      return;
    }
    bg.innerHTML = `
      <div class="layer" id="glowA" style="background: radial-gradient(600px 600px at 50% 50%, rgba(34,211,238,.20), transparent 70%)"></div>
      <div class="layer" id="glowB" style="background: radial-gradient(700px 700px at 50% 50%, rgba(59,130,246,.18), transparent 70%)"></div>
      <div class="layer" style="background-image:
          linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px);
          background-size: 72px 72px; background-position: 36px 24px; opacity:.55;
          -webkit-mask-image: radial-gradient(900px 1300px at 50% 45%, #000 30%, transparent 85%);"></div>
      <div class="layer" style="background: radial-gradient(1100px 1500px at 50% 45%, transparent 55%, rgba(0,0,0,.55) 100%)"></div>`;
  }
  function renderBg(t) {
    const a = document.getElementById('glowA'), b = document.getElementById('glowB');
    a.style.transform = `translate(${Math.sin(t * 0.35) * 220 - 160}px, ${Math.cos(t * 0.27) * 260 - 300}px)`;
    b.style.transform = `translate(${Math.cos(t * 0.3) * 240 + 180}px, ${Math.sin(t * 0.22) * 300 + 320}px)`;
    if (S.dust) S.dust.forEach((d) => {
      const y = ((d.y - t * d.v) % 1920 + 1920) % 1920;
      d.e.style.transform = `translate(${d.x + Math.sin(t * 0.6 + d.ph) * 30}px, ${y}px)`;
      d.e.style.opacity = (d.o * (0.6 + 0.4 * Math.sin(t * 1.3 + d.ph))).toFixed(3);
    });
    const tint = S.video.tint ? S.video.tint(t) : null;
    if (tint) a.style.filter = `hue-rotate(${tint}deg)`;
  }

  // ---------- Cabecera de serie + barra de progreso por escenas ----------
  function buildChrome() {
    const ch = document.getElementById('chrome');
    const tl = S.tl;
    ch.innerHTML = `
      <div class="abs mono" id="hdr" style="left:${SAFE.left + 6}px; top:196px; display:flex; align-items:center; gap:18px; font-size:27px; font-weight:700; letter-spacing:.14em;">
        <span style="display:flex;align-items:center;gap:12px;padding:12px 20px;border:2px solid ${C.lineStrong};border-radius:999px;background:rgba(11,15,25,.75);color:${C.ink}">
          <span style="width:14px;height:14px;border-radius:50%;background:${C.cyan};box-shadow:0 0 18px ${C.cyan}"></span>${S.brand.name}</span>
        <span style="color:${C.muted}">${typeof S.brand.series === 'object' ? (S.brand.series[EUREKA.lang] || S.brand.series.es) : S.brand.series} · #${String(tl.episode).padStart(2, '0')}</span>
      </div>
      <div class="abs" id="prog" style="left:${SAFE.left + 6}px; top:268px; width:${SAFE.right - SAFE.left - 6}px; height:6px; display:flex; gap:8px;"></div>`;
    const prog = document.getElementById('prog');
    S.progSegs = S.scenes.map((sc) => {
      const seg = add(prog, `<div style="flex:${(sc.end - sc.start).toFixed(3)}; background:${C.line}; border-radius:3px; overflow:hidden;"><div style="height:100%; width:0; background:${C.cyan}; box-shadow:0 0 10px ${C.cyan}"></div></div>`);
      return seg.firstElementChild;
    });
  }
  function renderChrome(t) {
    S.scenes.forEach((sc, i) => { S.progSegs[i].style.width = (prog(t, sc.start, sc.end - sc.start) * 100) + '%'; });
    const hdr = document.getElementById('hdr');
    hdr.style.opacity = S.video.hideHeader && S.video.hideHeader(t) ? 0 : 1;
  }

  // ---------- Subtítulos palabra a palabra ----------
  function buildChunks() {
    const kw = (S.video.keywords || []).map(norm);
    const chunks = [];
    for (const sc of S.tl.scenes) {
      let cur = [];
      const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
      sc.words.forEach((w) => {
        const token = w.t || w.w;
        const chars = cur.reduce((n, x) => n + (x.t || x.w).length + 1, 0) + token.length;
        if (cur.length && (cur.length >= 3 || chars > 17)) flush();
        cur.push({ ...w, key: kw.includes(norm(w.w)) || kw.includes(norm(token)) });
        if (/[.,:;?!…]$/.test(token)) flush();
      });
      flush();
    }
    chunks.forEach((c, i) => {
      c.s = c[0].s - 0.04;
      const next = chunks[i + 1];
      const natural = c[c.length - 1].e + 0.35;
      c.end = next ? Math.min(natural, next[0].s - 0.04) : natural;
    });
    S.chunks = chunks;
    const cap = document.getElementById('captions');
    const cb = S.brand.caption;
    S.capBox = add(cap, `<div class="abs" style="font-family:'${cb.font}', sans-serif; left:${SAFE.left}px; width:${SAFE.right - SAFE.left}px; top:1210px; text-align:center; font-weight:${cb.weight || 700}; font-size:${cb.size}px; line-height:1.12; letter-spacing:-.01em; text-transform:uppercase; color:${C.ink}"></div>`);
    S.capCache = -1;
  }
  function renderCaptions(t) {
    const idx = S.chunks.findIndex((c) => t >= c.s && t < c.end);
    const box = S.capBox;
    if (idx < 0 || (S.video.hideCaptions && S.video.hideCaptions(t))) { box.style.opacity = 0; return; }
    const c = S.chunks[idx];
    if (S.capCache !== idx) {
      box.innerHTML = c.map((w) => `<span style="display:inline-block; position:relative; margin:0 10px; padding:2px 14px; border-radius:16px;">${(w.t || w.w).replace(/[,.;:]$/, '')}</span>`).join('');
      S.capCache = idx;
    }
    const k = Ease.outBack(prog(t, c.s, 0.22));
    box.style.opacity = 1;
    box.style.transform = `scale(${lerp(0.82, 1, k)}) translateY(${(1 - k) * 18}px)`;
    const spans = box.children;
    c.forEach((w, i) => {
      const sp = spans[i];
      const nextS = c[i + 1] ? c[i + 1].s : c.end;
      const active = t >= w.s - 0.02 && t < nextS;
      const shown = t >= w.s - 0.06;
      sp.style.opacity = shown ? 1 : 0.18;
      sp.style.transform = `scale(${active ? 1.08 : 1})`;
      const cb = S.brand.caption;
      sp.style.background = active ? (w.key ? C[cb.key] : C[cb.hi]) : 'transparent';
      sp.style.color = active ? C.bg : (w.key ? C[cb.key] : C.ink);
      sp.style.textShadow = active ? 'none' : '0 6px 28px rgba(0,0,0,.85), 0 0 2px rgba(0,0,0,.9)';
    });
  }

  // ---------- Escenas ----------
  function buildScenes() {
    const host = document.getElementById('scenes');
    S.scenes = S.tl.scenes.map((sc) => {
      const root = add(host, `<div class="scene"><div class="layer inner"></div></div>`);
      const inner = root.firstElementChild;
      const words = sc.words.map((w) => ({ ...w, ls: w.s - sc.start, le: w.e - sc.start }));
      const ctx = {
        root: inner, words, start: sc.start, end: sc.end, dur: sc.end - sc.start, text: sc.text,
        at(word, n = 0) {
          const q = norm(word);
          const hits = words.filter((w) => norm(w.w).startsWith(q));
          if (!hits[n]) throw new Error(`palabra "${word}" no encontrada en escena ${sc.id}`);
          return hits[n].ls;
        },
        cue(lt, type, gain = 1) { S.cues.push({ t: +(sc.start + lt).toFixed(3), type, gain }); },
        shake(lt, amp = 14, decay = 9) { S.shakes.push({ t: sc.start + lt, amp, decay }); },
      };
      const build = S.defs[sc.id];
      if (!build) throw new Error('escena sin definir: ' + sc.id);
      const update = build(ctx) || (() => {});
      return { ...sc, root, inner, ctx, update };
    });
    // Whoosh de transición entre escenas
    S.scenes.slice(1).forEach((sc) => S.cues.push({ t: +(sc.start - 0.12).toFixed(3), type: 'whoosh', gain: 0.8 }));
  }
  function renderScenes(t) {
    for (const sc of S.scenes) {
      const lt = t - sc.start;
      const visible = t >= sc.start - 0.001 && t < sc.end + 0.3;
      sc.root.style.display = visible ? 'block' : 'none';
      if (!visible) continue;
      const first = sc === S.scenes[0];
      const enter = first ? 1 : Ease.outCubic(prog(lt, 0, 0.38));
      const last = sc === S.scenes[S.scenes.length - 1];
      const exit = last ? 0 : Ease.inCubic(prog(t, sc.end - 0.04, 0.3));
      sc.root.style.opacity = (enter * (1 - exit)).toFixed(3);
      const push = 1 + 0.035 * prog(lt, 0, sc.ctx.dur + 0.3);
      sc.root.style.transform = `translateY(${(1 - enter) * 70 - exit * 60}px) scale(${(0.96 + 0.04 * enter) * push - exit * 0.04})`;
      sc.update(lt, t);
    }
  }
  function renderCamera(t) {
    let x = 0, y = 0, r = 0;
    for (const s of S.shakes) {
      const dt = t - s.t;
      if (dt < 0 || dt > 0.8) continue;
      const a = s.amp * Math.exp(-s.decay * dt);
      x += a * Math.sin(dt * 71); y += a * Math.cos(dt * 57); r += a * 0.04 * Math.sin(dt * 43);
    }
    document.getElementById('camera').style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  function init(timeline) {
    S.tl = timeline;
    if (!S.brand) setBrand(timeline.brand);
    buildBg();
    buildScenes();
    buildChrome();
    buildChunks();
    render(0);
    return { duration: timeline.duration, cues: S.cues.sort((a, b) => a.t - b.t), chunks: S.chunks.length };
  }
  function render(t) {
    renderBg(t);
    renderScenes(t);
    renderCamera(t);
    renderChrome(t);
    renderCaptions(t);
  }

  // Portada: congela un fotograma y sustituye los subtítulos por un titular.
  function cover(t, title) {
    S.video.hideCaptions = () => true;
    const cap = document.getElementById('captions');
    add(cap, `<div class="abs display" style="left:${SAFE.left}px;width:${SAFE.right - SAFE.left}px;top:1180px;text-align:center;font-weight:700;font-size:96px;line-height:1.05;text-transform:uppercase;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.8)">${title}</div>`);
    render(t);
  }

  window.EUREKA = { lang: 'es', W, H, C, SAFE, BRANDS, setBrand, I, Ease, clamp01, lerp, prog, spring, appear, h, add, css, fmt, norm, scene, init, render, cover, S,
    set video(v) { S.video = v; }, get video() { return S.video; } };
  window.__render = render;
})();
