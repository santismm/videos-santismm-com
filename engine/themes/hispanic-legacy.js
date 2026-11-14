/* Tema del canal HISPANIC LEGACY · Historia en 60s (hispanic-legacy.com).
 * Se carga después de lib.js/components.js y antes de las escenas del vídeo ("theme" en script.json).
 * Aporta: paleta de carta náutica (verde de la web + pergamino + oro), tipografía Fraunces,
 * fondo propio, mapa del Pacífico con cámara (EUREKA.hl.map), barco y tarjeta final.
 */
(function () {
  const E = EUREKA;
  const { C, S, add, Ease, lerp, prog, spring, appear, clamp01 } = E;

  // El verde #0b6e4f es el acento de hispanic-legacy.com; el resto lo acompaña en clave "carta náutica nocturna".
  Object.assign(C, {
    bg: '#081310', surface: '#0f211b', surface2: '#142b23', line: '#1f3a30', lineStrong: '#3a5c4f',
    fg: '#eadfc6', ink: '#f8f0dc', muted: '#aab7a6', faint: '#74867a',
    cyan: '#f0b94a',   // acento principal del motor (palabra activa, barra de progreso): oro
    amber: '#ff7d4d',  // palabras clave: bermellón
    blue: '#0b6e4f', green: '#35b98a', red: '#e5484d', rose: '#ff8a7a', violet: '#c9a0ff', sky: '#7fd6cf',
    gold: '#f0b94a', parch: '#e2d1a6', sea: '#0c2a31', teal: '#49c5c9', brand: '#0b6e4f',
  });

  const st = document.createElement('style');
  st.textContent = `
    @font-face { font-family: 'Fraunces'; src: url(fonts/Fraunces-latin.woff2) format('woff2'); font-weight: 100 900; }
    html, body, #stage { background: ${C.bg} !important; }
    #stage { color: ${C.fg}; }
    .display { font-family: 'Fraunces', Georgia, serif !important; }
    .hl-pin { position: absolute; left: 0; top: 0; white-space: nowrap; will-change: transform, opacity; }
    .hl-lbl { font: 700 25px 'JetBrains Mono', monospace; letter-spacing: .12em; color: ${C.ink};
              padding: 5px 12px; border-radius: 10px; background: rgba(8,19,16,.86); }`;
  document.head.appendChild(st);

  const SHIP = (sail = C.ink) => `<svg viewBox="0 0 120 110" width="100%" height="100%" style="overflow:visible">
      <path d="M8 70 L112 70 Q106 92 90 96 L30 96 Q14 92 8 70Z" fill="#7a4a22" stroke="#2c170a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M8 70 L2 56 L24 62 M112 70 L118 52 L98 60" fill="#7a4a22" stroke="#2c170a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M40 70V10M74 70V4" stroke="#2c170a" stroke-width="4" stroke-linecap="round"/>
      <path d="M22 20 Q44 26 60 20 Q54 40 60 58 Q42 52 22 58 Q30 40 22 20Z" fill="${sail}" stroke="#2c170a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M58 12 Q80 18 98 12 Q91 34 98 54 Q78 48 58 54 Q66 34 58 12Z" fill="${sail}" stroke="#2c170a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M74 4 L92 0 L74 -4Z" fill="${C.amber}"/>
    </svg>`;

  // ---------- Fondo ----------
  function buildBg(bg) {
    bg.innerHTML = `
      <div class="layer" id="glowA" style="background: radial-gradient(650px 650px at 50% 50%, rgba(240,185,74,.16), transparent 70%)"></div>
      <div class="layer" id="glowB" style="background: radial-gradient(750px 750px at 50% 50%, rgba(11,110,79,.38), transparent 70%)"></div>
      <div class="layer" id="backdrop"></div>
      <div class="layer" style="background: radial-gradient(1100px 1500px at 50% 42%, transparent 55%, rgba(0,0,0,.6) 100%)"></div>`;
    if (S.video.backdrop) S.backdropUpdate = S.video.backdrop(document.getElementById('backdrop'));
  }
  function renderBg(t) {
    document.getElementById('glowA').style.transform = `translate(${Math.sin(t * 0.35) * 220 - 160}px, ${Math.cos(t * 0.27) * 260 + 500}px)`;
    document.getElementById('glowB').style.transform = `translate(${Math.cos(t * 0.3) * 240 + 180}px, ${Math.sin(t * 0.22) * 200 + 620}px)`;
    if (S.backdropUpdate) S.backdropUpdate(t);
  }

  // ---------- Mapa del Pacífico con cámara ----------
  const NS = 'http://www.w3.org/2000/svg';
  function mk(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  /** Interpolación Catmull-Rom remuestreada a n puntos equidistantes. pts: [[lon,lat],…] */
  function curve(pts, n = 300) {
    const dense = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < 24; k++) {
        const u = k / 24, u2 = u * u, u3 = u2 * u;
        dense.push([0, 1].map((a) => 0.5 * (2 * p1[a] + (-p0[a] + p2[a]) * u + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * u2 + (-p0[a] + 3 * p1[a] - 3 * p2[a] + p3[a]) * u3)));
      }
    }
    dense.push(pts[pts.length - 1]);
    const acc = [0];
    for (let i = 1; i < dense.length; i++) acc.push(acc[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
    const out = [];
    let j = 0;
    for (let i = 0; i < n; i++) {
      const d = (i / (n - 1)) * acc[acc.length - 1];
      while (j < acc.length - 2 && acc[j + 1] < d) j++;
      const k = (d - acc[j]) / Math.max(1e-9, acc[j + 1] - acc[j]);
      out.push([lerp(dense[j][0], dense[j + 1][0], k), lerp(dense[j][1], dense[j + 1][1], k)]);
    }
    return out;
  }

  function map(parent, { height = 1300, centerY = 740 } = {}) {
    const M = window.HL_MAP, U = 10;
    const P = (lon, lat) => [((lon < 0 ? lon + 360 : lon) - M.lon0) * U, (M.lat0 - lat) * U];
    const wrap = add(parent, `<div class="abs" style="left:0;top:0;width:1080px;height:${height}px;overflow:hidden"></div>`);
    const svg = mk('svg', { width: 1080, height, viewBox: '0 0 100 100', preserveAspectRatio: 'none' }, wrap);
    svg.style.cssText = 'position:absolute;left:0;top:0;overflow:hidden';
    mk('rect', { x: -4000, y: -4000, width: 10000, height: 9000, fill: C.sea }, svg);
    let g = '';
    for (let lon = 60; lon <= 300; lon += 10) { const [x] = P(lon, 0); g += `M${x},-400V1400`; }
    for (let lat = -60; lat <= 80; lat += 10) { const [, y] = P(100, lat); g += `M-400,${y}H2300`; }
    mk('path', { d: g, fill: 'none', stroke: 'rgba(226,209,166,.09)', 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke' }, svg);
    mk('path', { d: M.d, fill: C.parch }, svg);
    mk('rect', { x: -4000, y: -4000, width: 10000, height: 4000 + P(0, 77)[1], fill: C.sea }, svg); // sin recorte recto en el Ártico
    const layer = mk('g', {}, svg);
    const pins = add(parent, `<div class="layer"></div>`);
    add(parent, `<div class="abs" style="left:0;top:0;width:1080px;height:640px;background:linear-gradient(${C.bg} 8%, rgba(8,19,16,.9) 45%, rgba(8,19,16,.6) 72%, transparent)"></div>`);
    add(parent, `<div class="abs" style="left:0;top:${height - 300}px;width:1080px;height:300px;background:linear-gradient(transparent, ${C.bg} 92%)"></div>`);
    const dim = add(parent, `<div class="layer" style="background:${C.bg};opacity:0"></div>`);
    const vb = { x: 0, y: 0, w: 1, h: 1 };
    const pinList = [];
    const api = {
      P, layer, curve,
      /** Cámara: centro (lon, lat) y grados de longitud visibles a lo ancho. */
      view(lon, lat, span) {
        const [cx, cy] = P(lon, lat);
        vb.w = span * U; vb.h = vb.w * height / 1080; vb.x = cx - vb.w / 2; vb.y = cy - vb.h * (centerY / height);
        svg.setAttribute('viewBox', `${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`);
        for (const p of pinList) {
          const [x, y] = api.screen(p.lon, p.lat);
          p.el.style.transform = `translate(${(x + p.dx).toFixed(1)}px, ${(y + p.dy).toFixed(1)}px) ${p.extra || ''}`;
        }
      },
      screen(lon, lat) { const [X, Y] = P(lon, lat); return [(X - vb.x) / vb.w * 1080, (Y - vb.y) / vb.h * height]; },
      d(pts) { return pts.length < 2 ? '' : 'M' + pts.map(([lo, la]) => P(lo, la).map((v) => v.toFixed(1)).join(',')).join('L'); },
      path(attrs) { return mk('path', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke', ...attrs }, layer); },
      /** Elemento HTML anclado a una coordenada (tamaño constante al hacer zoom). */
      pin(html, lon, lat, dx = 0, dy = 0) {
        const el = add(pins, `<div class="hl-pin">${html}</div>`);
        const p = { el, lon, lat, dx, dy };
        pinList.push(p);
        return p;
      },
      label(txt, lon, lat, { dx = 18, dy = -18, color = C.ink, dot = C.gold, size = 25 } = {}) {
        return api.pin(`${dot ? `<span style="position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:50%;background:${dot};border:3px solid ${C.bg};box-shadow:0 0 14px ${dot}"></span>` : ''}
          <span class="hl-lbl" style="position:absolute;left:${dx}px;top:${dy}px;color:${color};font-size:${size}px">${txt}</span>`, lon, lat);
      },
      ship(size = 96, sail) {
        const p = api.pin(`<div style="position:absolute;left:${-size / 2}px;top:${-size * 0.8}px;width:${size}px;height:${size * 0.92}px;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${SHIP(sail)}</div>`, 0, 0);
        p.inner = p.el.firstElementChild;
        /** Coloca el barco en el punto u∈[0,1] de una ruta; `dir` fuerza hacia dónde mira (1 este, -1 oeste). */
        p.along = (pts, u, t = 0, dir = null) => {
          const f = clamp01(u) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), k = f - i;
          p.lon = lerp(pts[i][0], pts[i + 1][0], k); p.lat = lerp(pts[i][1], pts[i + 1][1], k);
          const d = dir != null ? dir : (pts[i + 1][0] >= pts[i][0] ? 1 : -1);
          p.inner.style.transform = `scaleX(${d}) rotate(${Math.sin(t * 2.6) * 4}deg) translateY(${Math.sin(t * 3.4) * 3}px)`;
        };
        return p;
      },
      /** Rachas de viento que cruzan una banda de latitudes. dir: 1 hacia el este, -1 hacia el oeste. */
      wind({ lonA, lonB, latA, latB, n = 14, dir = -1, color = C.ink, seed = 5, speed = 0.11, len = 9 }) {
        const rnd = E.ui.rng(seed);
        const items = Array.from({ length: n }, (_, i) => ({
          lat: lerp(latA, latB, (i + 0.5) / n + (rnd() - 0.5) * 0.06), ph: rnd(), sp: speed * (0.8 + rnd() * 0.5),
          el: api.path({ stroke: color, 'stroke-width': 5 }),
        }));
        return (t, alpha) => {
          for (const w of items) {
            const f = ((w.ph + t * w.sp) % 1 + 1) % 1;
            const lon = dir > 0 ? lerp(lonA, lonB, f) : lerp(lonB, lonA, f);
            const [x, y] = P(lon, w.lat), L = len * U * dir, hd = 2.2 * U;
            w.el.setAttribute('d', `M${x - L},${y}H${x}M${x - hd * dir},${y - hd * 0.7}L${x},${y}L${x - hd * dir},${y + hd * 0.7}`);
            w.el.style.opacity = (alpha * Math.sin(Math.PI * f) ** 0.7 * 0.85).toFixed(3);
          }
        };
      },
      dim(k) { dim.style.opacity = k; },
    };
    return api;
  }

  /** Interpolación por tramos con suavizado. kfs: [[t, valor], …] ordenados por t. */
  function kf(kfs, t, ease = Ease.inOutCubic) {
    if (t <= kfs[0][0]) return kfs[0][1];
    for (let i = 1; i < kfs.length; i++) {
      if (t < kfs[i][0]) return lerp(kfs[i - 1][1], kfs[i][1], ease(prog(t, kfs[i - 1][0], kfs[i][0] - kfs[i - 1][0])));
    }
    return kfs[kfs.length - 1][1];
  }

  /** Tiempo absoluto de una palabra del guion: T('escena', 'palabra', n). Sin palabra: inicio de la escena. */
  function T(id, word, n = 0) {
    const sc = S.tl.scenes.find((s) => s.id === id);
    if (!sc) throw new Error('escena desconocida: ' + id);
    if (!word) return sc.start;
    const hits = sc.words.filter((w) => E.norm(w.w).startsWith(E.norm(word)));
    if (!hits[n]) throw new Error(`palabra "${word}" no encontrada en ${id}`);
    return hits[n].s;
  }

  /** Tarjeta final del canal. */
  function endCard(x, { url = 'hispanic-legacy.com', tCompartir = 0.3 } = {}) {
    const r = x.root;
    const logo = add(r, `<div class="abs display" style="left:0;right:0;top:350px;text-align:center;font-size:104px;font-weight:900;line-height:.98;color:${C.ink};letter-spacing:.01em">HISPANIC<br><span style="color:${C.gold}">LEGACY</span></div>`);
    const tag = add(r, `<div class="abs mono" style="left:0;right:0;top:590px;text-align:center;font-size:29px;font-weight:700;color:${C.muted};letter-spacing:.14em">HISTORIA CON FUENTES · EN 60s</div>`);
    const btn = (icon, label, color, left) => add(r, `<div class="abs" style="left:${left}px;top:690px;width:390px;height:136px;border-radius:34px;background:${C.surface2};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:20px;box-shadow:0 0 50px ${color}44">
        <div style="width:60px;height:60px;color:${color}">${icon}</div><span class="display" style="font-size:46px;font-weight:700;color:${C.ink}">${label}</span></div>`);
    const b1 = btn(E.I.share, 'Compártelo', C.gold, 125);
    const b2 = btn(E.I.bookmark, 'Sígueme', C.green, 565);
    const site = add(r, `<div class="abs display" style="left:0;right:0;top:900px;text-align:center;font-size:58px;font-weight:700;color:${C.gold}">hispanic-legacy.com</div>`);
    const subs = add(r, `<div class="abs mono" style="left:0;right:0;top:990px;text-align:center;font-size:25px;font-weight:500;color:${C.muted}">${url}</div>`);
    const disc = add(r, `<div class="abs mono" style="left:0;right:0;top:1090px;text-align:center;font-size:22px;line-height:1.5;font-weight:500;color:${C.muted}">Datos y fuentes: hispanic-legacy.com (CC BY 4.0)<br>Voz y animación generadas con IA</div>`);
    x.cue(0.1, 'ding', 0.4); x.cue(tCompartir, 'pop', 0.8); x.cue(tCompartir + 0.9, 'pop', 0.8);
    return (lt) => {
      const l = spring(lt, 0.05, 0.5); logo.style.opacity = l > 0 ? 1 : 0; logo.style.transform = `scale(${lerp(0.7, 1, l)})`;
      tag.style.opacity = appear(lt, 0.3, 0.4);
      [[b1, tCompartir], [b2, tCompartir + 0.9]].forEach(([b, t]) => {
        const s = spring(lt, t - 0.05, 0.4);
        b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.5, 1, s) * (1 + 0.025 * Math.sin((lt - t) * 7) * (s >= 1 ? 1 : 0))})`;
      });
      site.style.opacity = appear(lt, tCompartir + 1.3, 0.4); subs.style.opacity = appear(lt, tCompartir + 1.5, 0.4);
      disc.style.opacity = appear(lt, 0.6, 0.5);
    };
  }

  E.theme = {
    brand: { name: 'HISPANIC LEGACY', tagline: 'HISTORIA EN 60s' },
    fonts: ['700 80px "Fraunces"', '900 80px "Fraunces"', '500 40px "Fraunces"'],
    buildBg, renderBg,
  };
  E.hl = { map, curve, kf, T, endCard, SHIP };
})();
