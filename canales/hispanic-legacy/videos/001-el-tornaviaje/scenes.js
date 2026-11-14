/* HISPANIC LEGACY #01 · "El tornaviaje: para volver de Asia había que poner rumbo al norte"
 * Fuente: hispanic-legacy.com/k/andres-de-urdaneta (verificada el 09-08-2026) y /k/manila-galleon:
 *  c1 · Salida de Cebú el 1-6-1565 y llegada a Acapulco el 8-10-1565 a bordo del San Pedro (unos cuatro meses).
 *  c2 · Rumbo nordeste hasta aprox. 39°N 170°E y después al este con la corriente de Kuroshio.
 *  c3 · El Galeón de Manila usó la ruta unos dos siglos y medio (1571-1815 según /k/manila-galleon).
 *  c4 · Flynn y Giráldez (1995): el enlace Acapulco-Manila (1571) cierra el primer circuito comercial global.
 * Conocimiento general no tomado de la web: Magallanes cruza el Pacífico en 1521; los alisios soplan hacia el
 * oeste en el trópico y los vientos del oeste en latitudes medias; nadie completó el regreso antes de 1565.
 * Los trazados del mapa son esquemáticos (ilustran la maniobra, no reproducen las derrotas reales).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene, clamp01 } = EUREKA;
  const { pill, popText, popIn } = EUREKA.ui;
  const { kf, T, endCard } = EUREKA.hl;

  EUREKA.video = {
    keywords: ['volver', 'viento', 'oeste', 'fracasaron', 'absurdo', 'norte', 'revés', 'Kuroshio', 'tornaviaje', 'global', 'moderno'],
    backdrop,
  };

  // ───────────────────────── Mapa persistente (detrás de todas las escenas) ─────────────────────────
  function backdrop(host) {
    const m = EUREKA.hl.map(host);
    const t0 = (id) => T(id);
    // Rutas (esquemáticas)
    const MAG = m.curve([[285, -52.5], [278, -45], [265, -30], [240, -15], [210, -2], [180, 7], [160, 12], [144.8, 13.4], [125.7, 10.7]], 260);
    const BACK = m.curve([[127, 11.5], [140, 13], [156, 12], [172, 12.5]], 80);
    const TORNA = m.curve([[123.9, 10.3], [125.6, 12.7], [133, 21], [148, 31.5], [170, 39], [190, 40.2], [210, 38.8], [227, 36], [237.5, 33], [243.5, 27], [248.6, 21.8], [255, 18.2], [260.1, 16.85]], 500);
    const IDA = m.curve([[260.1, 16.85], [240, 12.5], [205, 11.5], [170, 12.5], [144.8, 13.4], [128, 13], [121, 14.6]], 400);
    const KURO = m.curve([[123.5, 21], [127, 26], [133, 31], [142, 35.5], [157, 37.5], [176, 39.5], [198, 41.5]], 160);
    const uN = TORNA.reduce((b, p, i) => (Math.hypot(p[0] - 170, p[1] - 39) < Math.hypot(TORNA[b][0] - 170, TORNA[b][1] - 39) ? i : b), 0) / (TORNA.length - 1);
    const cut = (pts, u) => pts.slice(0, Math.max(0, Math.round(clamp01(u) * pts.length)));

    // Capas vectoriales (orden = profundidad)
    const kuro = m.path({ stroke: 'rgba(73,197,201,.42)', 'stroke-width': 30 });
    const kuroFlow = m.path({ stroke: 'rgba(220,250,250,.75)', 'stroke-width': 5, 'stroke-dasharray': '6 30' });
    const par39 = m.path({ d: m.d([[110, 39], [262, 39]]), stroke: C.ink, 'stroke-width': 2.5, 'stroke-dasharray': '10 12', opacity: 0 });
    const trades = m.wind({ lonA: 118, lonB: 262, latA: 4, latB: 23, n: 15, dir: -1, color: '#ffd9c2', seed: 11 });
    const wester = m.wind({ lonA: 132, lonB: 246, latA: 35, latB: 47, n: 11, dir: 1, color: '#c9f3ef', seed: 23 });
    const mag = m.path({ stroke: C.ink, 'stroke-width': 6, 'stroke-dasharray': '2 14' });
    const back = m.path({ stroke: C.amber, 'stroke-width': 6, 'stroke-dasharray': '2 14' });
    const east = m.path({ d: m.d([[125.5, 10.3], [149, 10.3]]), stroke: C.faint, 'stroke-width': 6, 'stroke-dasharray': '2 14', opacity: 0 });
    const ida = m.path({ stroke: '#cfd8dc', 'stroke-width': 7 });
    const tornaGlow = m.path({ stroke: 'rgba(240,185,74,.28)', 'stroke-width': 22 });
    const torna = m.path({ stroke: C.gold, 'stroke-width': 8 });

    // Etiquetas y barcos
    const big = (txt, color, size = 44) => `<span class="display" style="position:absolute;transform:translate(-50%,-50%);font-size:${size}px;font-weight:900;color:${color};text-shadow:0 4px 16px rgba(0,0,0,.9);letter-spacing:.02em">${txt}</span>`;
    const L = {
      fil: m.label('FILIPINAS', 123, 12.5, { dx: 20, dy: 18 }),
      q: m.pin(big('?', C.amber, 150), 180, 12.5),
      ali: m.pin(big('◀ ALISIOS', '#ffd9c2', 46), 190, 27.5),
      cebu: m.label('CEBÚ', 123.9, 10.3, { dx: 20, dy: 14 }),
      este: m.pin(big('ESTE ✕', C.muted, 44), 158, 10.3),
      norte: m.pin(big('NORTE', C.gold, 64), 127, 27),
      p39: m.pin(big('39° N', C.ink, 44), 189, 44.2),
      jap: m.label('JAPÓN', 138.5, 36.3, { dx: -150, dy: -52, dot: null }),
      wes: m.pin(big('VIENTOS DEL OESTE ▶', '#c9f3ef', 38), 186, 50.5),
      kur: m.pin(big('KUROSHIO', C.teal, 40), 150, 31),
      aca: m.label('ACAPULCO', 260.1, 16.85, { dx: -190, dy: 22 }),
      man: m.label('MANILA', 121, 14.6, { dx: 14, dy: 20 }),
      chi: m.label('CHINA', 108, 31, { dx: 10, dy: -14, dot: null }),
      plata: m.pin(`<span class="mono" style="position:absolute;transform:translate(-50%,-50%);font-size:30px;font-weight:700;padding:8px 20px;border-radius:999px;background:rgba(8,19,16,.85);border:3px solid #cfd8dc;color:#eef3f5;letter-spacing:.1em">◀ PLATA</span>`, 195, 3),
      seda: m.pin(`<span class="mono" style="position:absolute;transform:translate(-50%,-50%);font-size:30px;font-weight:700;padding:8px 20px;border-radius:999px;background:rgba(8,19,16,.85);border:3px solid ${C.gold};color:${C.gold};letter-spacing:.1em">SEDA · PORCELANA ▶</span>`, 196, 29),
    };
    const show = (p, k) => { p.el.style.opacity = k; };
    const xs = [[141, 6], [147, 16], [158, 9.5], [168, 14]].map(([lo, la]) => m.pin(big('✕', C.red, 84), lo, la));
    const ghosts = xs.map(() => m.ship(70, '#c8cdbf'));
    const shipMag = m.ship(100), shipFail = m.ship(92), shipU = m.ship(112);
    const loopE = [0, 1, 2].map(() => m.ship(64)), loopW = [0, 1, 2].map(() => m.ship(64, '#dfe6ea'));
    const coins = Array.from({ length: 9 }, () => m.pin(`<span style="position:absolute;left:-11px;top:-11px;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#b9c4ca 60%,#7d8a91);box-shadow:0 0 10px rgba(255,255,255,.6)"></span>`, 0, 0));
    const goods = Array.from({ length: 9 }, (_, i) => m.pin(`<span style="position:absolute;left:-10px;top:-10px;width:20px;height:20px;border-radius:5px;transform:rotate(45deg);background:${i % 2 ? '#f4f7ff' : C.amber};border:2px solid ${i % 2 ? '#3b6fd4' : '#7a1f0a'};box-shadow:0 0 10px rgba(240,185,74,.5)"></span>`, 0, 0));

    // Tiempos clave
    const tV = t0('vientos'), tI = t0('intentos'), tU = t0('urdaneta'), tN = t0('norte'), tL = t0('llegada'), tG = t0('galeon'), tC = t0('cta');
    const tSub = T('norte', 'subió'), tEmp = T('norte', 'empuja'), tAca = T('llegada', 'acapulco');
    const cam = {
      lon: [[0, 189], [tV - 0.3, 189], [tV + 0.9, 184], [tU + 0.1, 184], [tU + 1.5, 141], [tSub, 141], [tSub + 2.4, 158], [tEmp - 0.2, 158], [tEmp + 1.4, 184], [tL, 190], [tAca + 0.2, 236], [tG - 0.1, 236], [tG + 1.3, 189]],
      lat: [[0, 13], [tV - 0.3, 13], [tV + 0.9, 15], [tU + 0.1, 15], [tU + 1.5, 21], [tSub, 21], [tSub + 2.4, 28], [tEmp + 1.4, 30], [tL, 30], [tAca + 0.2, 27], [tG - 0.1, 27], [tG + 1.3, 17]],
      span: [[0, 162], [tV - 0.3, 162], [tV + 0.9, 128], [tU + 0.1, 128], [tU + 1.5, 74], [tSub, 74], [tSub + 2.4, 86], [tEmp + 1.4, 94], [tL, 94], [tAca + 0.2, 84], [tG - 0.1, 84], [tG + 1.3, 162]],
    };
    const tFail = T('vientos', 'volver'), tTry = T('intentos', 'todos') - 0.5;
    const tNorte = T('urdaneta', 'norte');
    EUREKA.hl.times = { tFail, tTry, uN }; // para sincronizar efectos de sonido desde las escenas

    return (t) => {
      // — Hook: Magallanes cruza hacia el oeste; ¿y la vuelta? —
      const kM = 0.16 + 0.84 * Ease.inOutCubic(prog(t, 0.1, T('hook', 'pacífico') + 0.55 - 0.1));
      const fM = 1 - prog(t, tV - 0.1, 0.6);
      mag.setAttribute('d', m.d(cut(MAG, kM))); mag.style.opacity = fM * 0.9;
      shipMag.along(MAG, kM, t, -1); show(shipMag, fM);
      show(L.fil, appear(t, T('hook', 'pacífico') + 0.2, 0.3) * (1 - prog(t, tU, 0.5)));
      const kB = Ease.outCubic(prog(t, T('hook', 'lo'), 1.3));
      back.setAttribute('d', m.d(cut(BACK, kB))); back.style.opacity = fM;
      const sQ = spring(t, T('hook', 'era') - 0.05, 0.4);
      show(L.q, (sQ > 0 ? 1 : 0) * fM); L.q.extra = `scale(${lerp(0.3, 1, sQ) * (1 + 0.05 * Math.sin(t * 6))})`;

      // — Vientos: alisios hacia el oeste; el barco que intenta volver retrocede —
      const aT = appear(t, T('vientos', 'viento') - 0.15, 0.6) * kf([[tN, 1], [tN + 1, 0.55], [tG, 0.55], [tG + 1, 0.4], [tC, 0.4], [tC + 0.5, 0]], t);
      trades(t, aT);
      show(L.ali, appear(t, T('vientos', 'alisios') - 0.1, 0.3) * (1 - prog(t, tU - 0.2, 0.4)));
      const lf = t - tFail;
      const lonF = 127 + (lf < 1.5 ? 17 * Ease.outCubic(prog(lf, 0, 1.5)) : 17 * (1 - Ease.inOutCubic(prog(lf, 1.5, 2.2))));
      shipFail.lon = lonF; shipFail.lat = 11.5 + Math.sin(t * 3) * 0.25;
      shipFail.inner.style.transform = `rotate(${Math.sin(t * 2.6) * 5 + (lf > 1.5 ? -8 : 0)}deg)`;
      show(shipFail, appear(t, tFail - 0.15, 0.3) * (1 - prog(t, tI + 0.2, 0.4)));

      // — Intentos: cuatro barcos fantasma, cuatro cruces —
      xs.forEach((p, i) => {
        const a = tTry + i * 0.62, lg = t - a;
        const g = ghosts[i];
        g.lon = lerp(126, p.lon, Ease.outCubic(prog(lg, 0, 0.6))); g.lat = p.lat;
        g.inner.style.transform = `rotate(${Math.sin(t * 3 + i) * 5}deg)`;
        show(g, appear(lg, 0, 0.15) * (1 - prog(lg, 0.6, 0.35)));
        const s = spring(lg, 0.58, 0.3);
        show(p, (s > 0 ? 1 : 0) * (1 - prog(t, tU - 0.1, 0.5))); p.extra = `scale(${lerp(2.2, 1, s)})`;
      });

      // — Urdaneta: al este no; al norte —
      show(L.cebu, appear(t, tU + 1.2, 0.3) * (1 - prog(t, tL, 0.5)));
      const kE = appear(t, T('urdaneta', 'este') - 0.25, 0.4) * (1 - prog(t, tN + 0.6, 0.6));
      east.style.opacity = kE; show(L.este, kE);
      const sN = spring(t, tNorte - 0.05, 0.45);
      show(L.norte, (sN > 0 ? 1 : 0) * (1 - prog(t, tN + 1.6, 0.5))); L.norte.extra = `scale(${lerp(0.4, 1, sN)})`;

      // — La maniobra: norte hasta 39°, viento y corriente a favor, y hasta Acapulco —
      const u = kf([[tNorte, 0], [tSub, 0.035], [T('norte', 'japón') + 0.5, uN], [tEmp, uN], [tL, uN + 0.14], [tAca + 0.25, 1]], t);
      const inLoop = t > tG + 0.4;
      torna.setAttribute('d', m.d(inLoop ? TORNA : cut(TORNA, u)));
      tornaGlow.setAttribute('d', torna.getAttribute('d'));
      shipU.along(TORNA, u, t); show(shipU, appear(t, tU + 0.9, 0.4) * (1 - prog(t, tG + 0.2, 0.4)));
      par39.style.opacity = appear(t, T('norte', 'paralelo') - 0.1, 0.4) * 0.6 * (1 - prog(t, tG, 0.6));
      show(L.p39, appear(t, T('norte', '39') - 0.1, 0.3) * (1 - prog(t, tL - 0.3, 0.4)));
      show(L.jap, appear(t, T('norte', 'japón') - 0.1, 0.3) * (1 - prog(t, tL + 1.5, 0.5)));
      const aW = appear(t, T('norte', 'viento') - 0.2, 0.6) * kf([[tG, 1], [tG + 1, 0.45], [tC, 0.45], [tC + 0.5, 0]], t);
      wester(t, aW);
      show(L.wes, appear(t, T('norte', 'revés') - 0.2, 0.3) * (1 - prog(t, tL - 0.3, 0.4)));
      const kK = Ease.outCubic(prog(t, T('norte', 'corriente') - 0.1, 1.3)), fK = 1 - prog(t, tG, 0.8);
      kuro.setAttribute('d', m.d(cut(KURO, kK))); kuro.style.opacity = fK;
      kuroFlow.setAttribute('d', kuro.getAttribute('d')); kuroFlow.style.opacity = fK; kuroFlow.setAttribute('stroke-dashoffset', (-t * 70).toFixed(1));
      show(L.kur, appear(t, T('norte', 'kuroshio') - 0.1, 0.3) * (1 - prog(t, tL - 0.2, 0.4)));
      show(L.aca, appear(t, tAca - 0.1, 0.3));

      // — El Galeón de Manila: el circuito completo —
      const kI = Ease.inOutCubic(prog(t, tG + 0.5, 1.4));
      ida.setAttribute('d', m.d(cut(IDA, kI)));
      show(L.man, appear(t, T('galeon', 'manila') - 0.1, 0.3));
      show(L.chi, appear(t, T('galeon', 'china') - 0.1, 0.3));
      const aLoop = appear(t, tG + 1.6, 0.5);
      loopE.forEach((s, i) => { const f = (Math.max(0, t - tG) * 0.075 + i / 3) % 1; s.along(TORNA, f, t + i); show(s, aLoop * Math.min(1, Math.sin(Math.PI * f) * 6)); });
      loopW.forEach((s, i) => { const f = (Math.max(0, t - tG) * 0.075 + i / 3 + 0.16) % 1; s.along(IDA, f, t + i); show(s, aLoop * Math.min(1, Math.sin(Math.PI * f) * 6)); });
      const aP = appear(t, T('galeon', 'plata') - 0.15, 0.4), aS = appear(t, T('galeon', 'seda') - 0.15, 0.4);
      coins.forEach((c, i) => { const f = (Math.max(0, t - tG) * 0.13 + i / coins.length) % 1; const p = IDA[Math.floor(f * (IDA.length - 1))]; c.lon = p[0]; c.lat = p[1] - 2.6; show(c, aP * Math.min(1, Math.sin(Math.PI * f) * 5)); });
      goods.forEach((c, i) => { const f = (Math.max(0, t - tG) * 0.13 + i / goods.length) % 1; const p = TORNA[Math.floor(f * (TORNA.length - 1))]; c.lon = p[0]; c.lat = p[1] + 2.6; show(c, aS * Math.min(1, Math.sin(Math.PI * f) * 5)); });
      show(L.plata, aP); show(L.seda, aS);

      m.dim(0.92 * Ease.outCubic(prog(t, tC - 0.1, 0.6)));
      m.view(kf(cam.lon, t), kf(cam.lat, t), kf(cam.span, t));
    };
  }

  // ───────────────────────── Capas de texto por escena ─────────────────────────
  const year = (r, txt, sub) => add(r, `<div class="abs" style="left:96px;top:318px">
      <div class="display" style="font-size:170px;font-weight:900;line-height:.95;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.8);font-variant-numeric:tabular-nums">${txt}</div>
      <div class="mono" style="font-size:27px;font-weight:700;letter-spacing:.12em;color:${C.ink};margin-top:10px;display:inline-block;padding:6px 14px;border-radius:10px;background:rgba(8,19,16,.86)">${sub}</div></div>`);
  const stamp = (r, txt, top, color = C.amber, size = 120) => add(r, `<div class="abs display" style="left:0;right:0;top:${top}px;text-align:center;"><span style="display:inline-block;padding:14px 44px;border:9px solid ${color};border-radius:26px;color:${color};font-size:${size}px;font-weight:900;background:rgba(8,19,16,.82);letter-spacing:.02em">${txt}</span></div>`);
  const stampIn = (el, lt, t, rot = -6) => {
    const s = spring(lt, t, 0.35);
    el.style.opacity = s > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.4, 1, s)})`;
  };

  scene('hook', (x) => {
    const y = year(x.root, '1521', 'MAGALLANES CRUZA EL PACÍFICO');
    const st = stamp(x.root, '¿VOLVER?', 930);
    const tV = x.at('volver');
    x.cue(0.25, 'rise', 0.5); x.cue(x.at('lo'), 'swipe', 0.6); x.cue(tV + 0.05, 'boom', 0.9); x.shake(tV + 0.05, 16);
    return (lt) => { popIn(y, lt, 0.1, 0.7); stampIn(st, lt, tV + 0.05); };
  });

  scene('vientos', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center;font-size:30px">${pill('EL CULPABLE: EL VIENTO', C.amber)}</div>`);
    // Analogía: escalera mecánica que baja
    const W = 660, Hc = 290;
    const card = add(r, `<div class="abs" style="left:${(1080 - W) / 2}px;top:880px;width:${W}px;height:${Hc}px;border-radius:30px;background:rgba(8,19,16,.9);border:3px solid ${C.lineStrong};overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.6)">
        <svg viewBox="0 0 ${W} ${Hc}" width="${W}" height="${Hc}">
          <path d="M40 250 L620 60" stroke="${C.lineStrong}" stroke-width="54" stroke-linecap="round"/>
          <g class="steps"></g>
          <g class="man" stroke="${C.gold}" stroke-width="9" stroke-linecap="round" fill="none">
            <circle cx="0" cy="-92" r="15" fill="${C.gold}" stroke="none"/><path d="M0 -76V-34"/><path class="l1" d="M0 -34L-16 0"/><path class="l2" d="M0 -34L18 -4"/><path class="a1" d="M0 -64L22 -44"/><path class="a2" d="M0 -64L-18 -46"/>
          </g>
          <path class="arr" d="M250 80 L160 110 M160 110 l22 -22 M160 110 l28 8" stroke="${C.amber}" stroke-width="9" stroke-linecap="round" fill="none"/>
        </svg>
        <div class="mono" style="position:absolute;right:28px;bottom:20px;text-align:right;font-size:25px;font-weight:700;letter-spacing:.1em;color:${C.muted}">COMO SUBIR UNA ESCALERA<br>MECÁNICA QUE BAJA</div></div>`);
    const steps = card.querySelector('.steps'), man = card.querySelector('.man');
    const NS = 'http://www.w3.org/2000/svg';
    const st = Array.from({ length: 9 }, () => { const e = document.createElementNS(NS, 'rect'); e.setAttribute('width', 46); e.setAttribute('height', 12); e.setAttribute('rx', 4); e.setAttribute('fill', C.parch); steps.appendChild(e); return e; });
    const tC = x.at('culpable'), tE = x.at('como');
    x.cue(tC, 'pop', 0.7); x.cue(x.at('viento') - 0.1, 'whoosh', 0.9); x.cue(x.at('alisios'), 'whoosh', 0.6); x.cue(tE - 0.1, 'swipe', 0.6);
    x.cue(x.at('volver') + 1.5, 'buzz', 0.6);
    return (lt) => {
      popIn(head, lt, tC - 0.1, 0.7);
      const s = popIn(card, lt, tE - 0.25, 0.75);
      if (!s) return;
      st.forEach((e, i) => {
        const f = ((i / st.length - lt * 0.22) % 1 + 1) % 1; // bajan: de arriba-derecha a abajo-izquierda
        e.setAttribute('x', lerp(40, 620, f) - 23); e.setAttribute('y', lerp(250, 60, f) - 36);
        e.setAttribute('opacity', Math.min(1, Math.sin(Math.PI * f) * 5));
      });
      const w = Math.sin(lt * 9), b = Math.abs(Math.cos(lt * 9)) * 6;
      man.setAttribute('transform', `translate(${330 + Math.sin(lt * 1.7) * 14}, ${128 - Math.sin(lt * 1.7) * 5 - b})`);
      man.querySelector('.l1').setAttribute('d', `M0 -34L${-16 * w} 0`); man.querySelector('.l2').setAttribute('d', `M0 -34L${18 * w} -4`);
      man.querySelector('.a1').setAttribute('d', `M0 -64L${22 * -w} -44`); man.querySelector('.a2').setAttribute('d', `M0 -64L${18 * w} -46`);
    };
  });

  scene('intentos', (x) => {
    const y = year(x.root, '+0', 'AÑOS SIN CAMINO DE VUELTA');
    const num = y.firstElementChild;
    const st = stamp(x.root, 'SIN RETORNO', 930, C.red, 104);
    const tF = x.at('fracasaron');
    const { tTry } = EUREKA.hl.times || {};
    for (let i = 0; i < 4; i++) x.cue((tTry - x.start) + i * 0.62 + 0.58, 'buzz', 0.55);
    for (let i = 0; i < 8; i++) x.cue(x.at('más') + i * 0.07, 'tick', 0.3);
    x.cue(tF + 0.1, 'stamp', 1); x.shake(tF + 0.1, 16);
    return (lt) => {
      popIn(y, lt, 0.1, 0.7);
      num.textContent = '+' + Math.round(40 * Ease.outCubic(prog(lt, x.at('más') - 0.1, 0.9)));
      stampIn(st, lt, tF + 0.1, 5);
    };
  });

  scene('urdaneta', (x) => {
    const r = x.root;
    const y = year(r, '1565', 'CEBÚ, FILIPINAS');
    const plate = add(r, `<div class="abs" style="left:96px;top:590px;padding:20px 30px;border-left:8px solid ${C.gold};background:rgba(8,19,16,.86);border-radius:0 18px 18px 0">
        <div class="display" style="font-size:58px;font-weight:700;color:${C.ink};line-height:1.05">Andrés de Urdaneta</div>
        <div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.12em;color:${C.muted};margin-top:8px">FRAILE AGUSTINO · COSMÓGRAFO</div></div>`);
    const tA = x.at('andrés'), tN = x.at('norte');
    x.cue(0.3, 'ding', 0.6); x.cue(tA - 0.15, 'swipe', 0.6); x.cue(x.at('este') - 0.1, 'buzz', 0.35); x.cue(tN - 0.5, 'rise', 0.7); x.cue(tN, 'boom', 0.8); x.shake(tN, 12);
    return (lt) => {
      popIn(y, lt, 0.15, 0.7);
      const k = Ease.outCubic(prog(lt, tA - 0.2, 0.45));
      plate.style.opacity = k * (1 - prog(lt, x.at('para') - 0.2, 0.4)); plate.style.transform = `translateX(${(1 - k) * -80}px)`;
    };
  });

  scene('norte', (x) => {
    const head = add(x.root, `<div class="abs" style="left:0;right:0;top:330px;text-align:center;font-size:30px">${pill('LA MANIOBRA: SUBIR PARA VOLVER', C.gold)}</div>`);
    x.cue(x.at('subió'), 'swipe', 0.6); x.cue(x.at('39') , 'ding', 0.6); x.cue(x.at('japón'), 'pop', 0.6);
    x.cue(x.at('viento') - 0.15, 'whoosh', 0.9); x.cue(x.at('revés'), 'pop', 0.7); x.cue(x.at('corriente'), 'whoosh', 0.7); x.cue(x.at('empuja'), 'rise', 0.5);
    return (lt) => { popIn(head, lt, 0.2, 0.7); };
  });

  scene('llegada', (x) => {
    const r = x.root;
    const box = add(r, `<div class="abs" style="left:96px;top:322px;display:flex;align-items:flex-end;gap:26px">
        <div style="width:230px;border-radius:22px;overflow:hidden;background:${C.ink};box-shadow:0 20px 50px rgba(0,0,0,.6)">
          <div class="mono mo" style="background:${C.amber};color:${C.bg};font-size:30px;font-weight:700;letter-spacing:.14em;text-align:center;padding:8px 0">JUNIO</div>
          <div class="display dd" style="font-size:128px;font-weight:900;color:${C.bg};text-align:center;line-height:1.05;font-variant-numeric:tabular-nums">1</div>
          <div class="mono" style="color:#5b665f;font-size:26px;font-weight:700;text-align:center;padding-bottom:10px">1565</div></div>
        <div><div class="display dn" style="font-size:112px;font-weight:900;color:${C.gold};line-height:1;text-shadow:0 8px 30px rgba(0,0,0,.8);font-variant-numeric:tabular-nums">DÍA 1</div>
          <div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.ink};margin-top:10px;display:inline-block;padding:6px 14px;border-radius:10px;background:rgba(8,19,16,.86)">A BORDO DEL SAN PEDRO</div></div></div>`);
    const mo = box.querySelector('.mo'), dd = box.querySelector('.dd'), dn = box.querySelector('.dn');
    const months = [['JUNIO', 30], ['JULIO', 31], ['AGOSTO', 31], ['SEPTIEMBRE', 30], ['OCTUBRE', 31]];
    const tS = x.at('salió'), tA = x.at('acapulco');
    for (let i = 0; i < 14; i++) x.cue(lerp(x.at('junio') + 0.4, tA, i / 14), 'tick', 0.25);
    x.cue(tA + 0.25, 'ding', 0.9); x.cue(tA + 0.25, 'pop', 0.7);
    return (lt) => {
      popIn(box, lt, tS - 0.1, 0.8);
      const day = 1 + Math.round(128 * Ease.inOutCubic(prog(lt, 0.3, tA + 0.25 - 0.3)));
      let d = day, mi = 0;
      while (d > months[mi][1]) { d -= months[mi][1]; mi++; }
      mo.textContent = months[mi][0]; mo.style.fontSize = months[mi][0].length > 7 ? '23px' : '30px';
      dd.textContent = d; dn.textContent = 'DÍA ' + day;
    };
  });

  scene('galeon', (x) => {
    const r = x.root;
    const title = add(r, `<div class="abs display" style="left:0;right:0;top:318px;text-align:center;font-size:104px;font-weight:900;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.85);letter-spacing:.01em">EL TORNAVIAJE</div>`);
    const cnt = add(r, `<div class="abs" style="left:0;right:0;top:452px;text-align:center;font-size:30px">${pill('GALEÓN DE MANILA ·&nbsp;<span class="n">0</span>&nbsp;AÑOS · HASTA 1815', C.ink)}</div>`);
    const big = add(r, `<div class="abs display" style="left:0;right:0;top:905px;text-align:center;font-size:92px;font-weight:900;line-height:1.02;color:${C.ink};text-shadow:0 8px 34px rgba(0,0,0,.95), 0 0 8px rgba(0,0,0,.8)">ASÍ NACIÓ EL<br><span style="color:${C.amber}">COMERCIO GLOBAL</span></div>`);
    const cite = add(r, `<div class="abs mono" style="left:0;right:0;top:1118px;text-align:center;font-size:22px;font-weight:700;color:${C.muted};text-shadow:0 2px 8px rgba(0,0,0,.9)">Flynn y Giráldez (1995), «Born with a “Silver Spoon”»</div>`);
    const tT = x.at('tornaviaje'), tD = x.at('durante'), tS = x.at('según'), tN = x.at('nació');
    x.cue(tT - 0.05, 'ding', 0.8); for (let i = 0; i < 10; i++) x.cue(tD + i * 0.08, 'tick', 0.3);
    x.cue(x.at('plata'), 'pop', 0.7); x.cue(x.at('seda'), 'pop', 0.7); x.cue(tN - 0.45, 'rise', 0.7); x.cue(tN, 'boom', 1); x.shake(tN, 12);
    return (lt) => {
      popIn(title, lt, tT - 0.1, 0.6);
      popIn(cnt, lt, tD - 0.2, 0.7);
      const k = Ease.outCubic(prog(lt, tD, 1.1));
      cnt.querySelector('.n').textContent = Math.round(250 * k);
      cite.style.opacity = appear(lt, tS, 0.4);
      popIn(big, lt, tN - 0.05, 0.6);
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/andres-de-urdaneta', tCompartir: 0.35 }));
})();
