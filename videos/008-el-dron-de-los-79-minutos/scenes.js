/* EUREKA #08 · "El dron que ahorró 79 minutos… o 19" (¿comparado con qué?)
 * Fuente: physicalai.santismm.com · caso CS-06 "Zipline en Ruanda" (evidencia A), verificado el 14-11-2026
 * contra el texto completo de Nisingizwe et al., The Lancet Global Health 2022;10:e564–69 (copia de acceso abierto, UGent):
 *  - 12.733 pedidos por dron a 20 centros, 17-03-2017 → 31-12-2019; media 49,6 min (IC 95 % 49,1–50,2) con preparación.
 *  - Mediana del dron 41 min (sin preparación) frente a 120 min por carretera (ida y vuelta, tiempo ESTIMADO) → 79 min.
 *  - Análisis de sensibilidad, mejor caso (cada centro de transfusión con su vehículo, solo ida): 60 min → 19 min.
 *  - Caducidades: −7,1 unidades por centro y mes, −67 % a 12 meses; series temporales interrumpidas, sin grupo de control.
 *  - Tiempos por carretera estimados (la recogida de datos reales se suspendió por la COVID-19); sin análisis de costes.
 * Niveles de evidencia A–D: physicalai.santismm.com/es/methodology.
 * Los textos usan L('es', 'en') para que la versión inglesa sólo cambie el guion.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene, L } = EUREKA;
  const { pill, endCard, popText, popIn, rng } = EUREKA.ui;

  EUREKA.video = {
    keywords: L(['79 minutos', '79', '19', 'mediana', 'volvía', 'ida', '67%', 'comparado', 'evidencia', 'media'],
      ['79 minutes', '79', '19', 'median', 'back', 'one-way', '67%', 'compared', 'evidence', 'half']),
  };
  const intFmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, L('.', ','));

  // Dron de ala fija (vista cenital, mirando a la derecha) con cruz sanitaria
  const DRONE = `<svg viewBox="0 0 200 120" fill="none" stroke-linejoin="round">
      <path d="M92 60 L78 6 L100 6 L120 60 L100 114 L78 114 Z" fill="${C.ink}" stroke="${C.bg}" stroke-width="3"/>
      <path d="M30 60 L18 32 L32 32 L46 60 L32 88 L18 88 Z" fill="${C.ink}" stroke="${C.bg}" stroke-width="3"/>
      <rect x="16" y="50" width="160" height="20" rx="10" fill="${C.ink}" stroke="${C.bg}" stroke-width="3"/>
      <path d="M176 60 l14 0" stroke="${C.muted}" stroke-width="4"/>
      <ellipse class="prop" cx="190" cy="60" rx="4" ry="22" fill="${C.muted}" opacity=".6"/>
      <rect x="128" y="54" width="20" height="12" rx="2" fill="${C.red}"/><rect x="134" y="48" width="8" height="24" rx="2" fill="${C.red}"/></svg>`;
  // Coche del hospital (lateral, mirando a la derecha)
  const CAR = `<svg viewBox="0 0 120 70" fill="none" stroke-linejoin="round">
      <path d="M8 50 V32 L24 30 L38 12 H84 L100 30 L112 34 V50 Z" fill="${C.ink}" stroke="${C.bg}" stroke-width="3"/>
      <path d="M44 18 H66 V30 H34 Z M72 18 H82 L94 30 H72 Z" fill="${C.sky}" opacity=".7"/>
      <rect x="52" y="34" width="16" height="6" fill="${C.red}"/><rect x="57" y="29" width="6" height="16" fill="${C.red}"/>
      <circle cx="32" cy="52" r="11" fill="${C.surface}" stroke="${C.ink}" stroke-width="5"/><circle cx="90" cy="52" r="11" fill="${C.surface}" stroke="${C.ink}" stroke-width="5"/></svg>`;
  // Bolsa de sangre
  const BAG = (w = 150) => `<svg viewBox="0 0 150 210" width="${w}" height="${w * 1.4}">
      <path d="M62 4 h26 v20 h-26 z" fill="${C.lineStrong}"/>
      <path d="M20 24 h110 a14 14 0 0 1 14 14 v140 a26 26 0 0 1 -26 26 h-86 a26 26 0 0 1 -26 -26 v-140 a14 14 0 0 1 14 -14z" fill="#e9eef6" stroke="${C.ink}" stroke-width="4"/>
      <path d="M12 88 h126 v90 a24 24 0 0 1 -24 24 h-78 a24 24 0 0 1 -24 -24z" fill="${C.red}" opacity=".9"/>
      <rect x="34" y="40" width="82" height="34" rx="6" fill="#fff" stroke="${C.muted}" stroke-width="2"/>
      <path d="M44 52 h50 M44 62 h34" stroke="${C.muted}" stroke-width="4"/></svg>`;
  const PERSON = (color) => `<svg viewBox="0 0 60 160" preserveAspectRatio="none" style="width:100%;height:100%"><circle cx="30" cy="16" r="14" fill="${color}"/><path d="M8 40 Q30 30 52 40 L48 98 H40 L38 158 H22 L20 98 H12 Z" fill="${color}"/></svg>`;

  // ───────────────────────── 1 · HOOK: el dron y el panel de llegadas 79 → 19 ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    // Colinas en curvas de nivel + dron cruzando
    const hills = add(r, `<svg class="abs" width="1080" height="300" style="left:0;top:330px">
        ${[0, 1, 2, 3].map((i) => `<path class="h${i}" d="${Array.from({ length: 14 }, (_, k) => `${k ? 'L' : 'M'}${k * 180 - 180} ${170 + i * 32 + Math.sin(k * 1.7 + i) * 40}`).join(' ')}" stroke="${[C.green, C.sky, C.blue, C.lineStrong][i]}" stroke-width="4" fill="none" opacity="${0.55 - i * 0.1}"/>`).join('')}</svg>`);
    const drone = add(r, `<div class="abs" style="left:0;top:340px;width:220px;height:132px">${DRONE}</div>`);
    const board = add(r, `<div class="abs" style="left:150px;top:640px;width:780px;height:390px;border-radius:34px;background:${C.surface};border:4px solid ${C.lineStrong};box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div class="mono" style="position:absolute;left:0;right:0;top:26px;text-align:center;font-size:28px;font-weight:700;letter-spacing:.14em;color:${C.muted}">${L('TIEMPO AHORRADO', 'TIME SAVED')}</div></div>`);
    const tile = (left) => add(board, `<div class="abs" style="left:${left}px;top:90px;width:200px;height:250px;border-radius:22px;background:#111a2e;border:3px solid ${C.line};overflow:hidden">
        <div class="d display" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:230px;font-weight:700;color:${C.green};line-height:1">7</div>
        <div style="position:absolute;left:0;right:0;top:123px;height:4px;background:${C.bg}"></div></div>`);
    const T1 = tile(70), T2 = tile(290);
    T2.querySelector('.d').textContent = '9';
    const unit = add(board, `<div class="abs display" style="left:520px;top:200px;font-size:96px;font-weight:700;color:${C.ink}">min</div>`);
    const q = add(board, `<div class="abs display" style="left:520px;top:80px;font-size:120px;font-weight:700;color:${C.amber};line-height:1">¿?</div>`);
    const same = add(r, `<div class="abs" style="left:0;right:0;top:1070px;text-align:center;font-size:26px">${pill(L('MISMO ESTUDIO · THE LANCET GLOBAL HEALTH 2022', 'SAME STUDY · THE LANCET GLOBAL HEALTH 2022'), C.ink)}</div>`);
    const t79 = x.at('79'), t19 = x.at('19'), tE = x.at(L('estudio', 'study'));
    x.cue(t79, 'ding', 0.7); x.cue(t19 - 0.1, 'swipe', 0.7); x.cue(t19 + 0.15, 'stamp', 0.9); x.shake(t19 + 0.15, 14); x.cue(tE, 'pop', 0.6);
    return (lt) => {
      // Dron: entra por la izquierda, cruza y suelta una leve ondulación
      const dx = lerp(-240, 1100, (lt % 4.2) / 4.2);
      drone.style.transform = `translate(${dx}px, ${Math.sin(lt * 2.2) * 10}px)`;
      drone.querySelector('.prop').setAttribute('ry', 8 + Math.abs(Math.sin(lt * 40)) * 16);
      [0, 1, 2, 3].forEach((i) => hills.querySelector('.h' + i).setAttribute('transform', `translate(${-((lt * (30 + i * 12)) % 180)} 0)`));
      popIn(board, lt, 0.15, 0.8, 0.45);
      // Panel tipo aeropuerto: el 7 gira hasta 1
      const k = prog(lt, t19 - 0.15, 0.4);
      const d1 = T1.querySelector('.d');
      d1.textContent = k < 0.5 ? '7' : '1';
      T1.style.transform = `scaleY(${k > 0 && k < 1 ? Math.max(0.04, Math.abs(Math.cos(k * Math.PI))) : 1})`;
      const col = k >= 0.5 ? C.amber : C.green;
      d1.style.color = col; T2.querySelector('.d').style.color = col;
      const n = appear(lt, t79 - 0.1, 0.3);
      T1.style.opacity = T2.style.opacity = n; unit.style.opacity = n;
      popIn(q, lt, t19 + 0.15, 0.4);
      popIn(same, lt, tE - 0.4, 0.7);
    };
  });

  // ───────────────────────── 2 · EL ESTUDIO: mapa esquemático con 20 hospitales ─────────────────────────
  scene('estudio', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:22px">${pill(L('THE LANCET GLOBAL HEALTH · 2022 · REVISADO POR PARES', 'THE LANCET GLOBAL HEALTH · 2022 · PEER-REVIEWED'), C.green)}</div>`);
    const rand = rng(8);
    const hubs = [[430, 640], [690, 590]];
    const pins = [];
    while (pins.length < 20) {
      const p = [130 + rand() * 800, 470 + rand() * 330];
      if (hubs.some((h) => Math.hypot(h[0] - p[0], h[1] - p[1]) < 90)) continue;
      if (pins.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 70)) continue;
      pins.push(p);
    }
    const near = (p) => hubs.reduce((a, h) => (Math.hypot(h[0] - p[0], h[1] - p[1]) < Math.hypot(a[0] - p[0], a[1] - p[1]) ? h : a));
    const map = add(r, `<svg class="abs" width="1080" height="900" style="left:0;top:0">
        <text x="110" y="420" font-family="Space Grotesk" font-weight="700" font-size="54" fill="${C.ink}" opacity=".9">${L('RUANDA', 'RWANDA')}</text>
        ${pins.map((p, i) => { const h = near(p); const mx = (h[0] + p[0]) / 2, my = (h[1] + p[1]) / 2 - 60; return `<path class="arc" data-i="${i}" d="M${h[0]} ${h[1]} Q${mx} ${my} ${p[0]} ${p[1]}" stroke="${C.cyan}" stroke-width="3" fill="none" stroke-dasharray="8 8" opacity="0"/>`; }).join('')}
        ${pins.map((p, i) => `<g class="pin" data-i="${i}" transform="translate(${p[0]} ${p[1]})" opacity="0"><circle r="20" fill="${C.surface}" stroke="${C.red}" stroke-width="4"/><rect x="-9" y="-3" width="18" height="6" fill="${C.red}"/><rect x="-3" y="-9" width="6" height="18" fill="${C.red}"/></g>`).join('')}
        ${hubs.map((h) => `<g transform="translate(${h[0]} ${h[1]})"><circle r="30" fill="${C.cyan}" opacity=".25"/><circle r="16" fill="${C.cyan}"/></g>`).join('')}</svg>`);
    const hubL = add(r, `<div class="abs mono" style="left:470px;top:676px;font-size:20px;font-weight:700;color:${C.cyan}">${L('centros de drones', 'drone hubs')}</div>`);
    const cnt = add(r, `<div class="abs" style="left:110px;width:860px;top:840px;height:190px;border-radius:30px;background:${C.surface};border:3px solid ${C.red};display:flex;align-items:center;justify-content:space-around">
        <div style="text-align:center"><div class="v display" style="font-size:96px;font-weight:700;color:${C.ink};line-height:1;font-variant-numeric:tabular-nums">0</div><div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};letter-spacing:.08em;margin-top:8px">${L('PEDIDOS POR DRON', 'DRONE ORDERS')}</div></div>
        <div style="width:3px;height:120px;background:${C.line}"></div>
        <div class="h" style="text-align:center"><div class="display" style="font-size:96px;font-weight:700;color:${C.red};line-height:1">20</div><div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};letter-spacing:.08em;margin-top:8px">${L('HOSPITALES', 'HOSPITALS')}</div></div></div>`);
    const dates = add(r, `<div class="abs mono" style="left:0;right:0;top:1060px;text-align:center;font-size:24px;font-weight:700;color:${C.faint}">${L('marzo 2017 – diciembre 2019 · esquema, no a escala', 'March 2017 – December 2019 · schematic, not to scale')}</div>`);
    const wN = x.words.find((w) => /12/.test(w.w)); // «12.733 pedidos» llega como una sola palabra
    const tN = wN.ls, tP = wN.le, tH = x.at('20');
    for (let i = 0; i < 8; i++) x.cue(tN + i * 0.1, 'tick', 0.3);
    x.cue(tH, 'ding', 0.7);
    return (lt) => {
      popIn(head, lt, 0.1, 0.7);
      map.querySelectorAll('.arc').forEach((a) => { const i = +a.dataset.i; a.style.opacity = appear(lt, 0.3 + i * 0.13, 0.3) * 0.8; a.setAttribute('stroke-dashoffset', -lt * 30); });
      map.querySelectorAll('.pin').forEach((p) => { const i = +p.dataset.i; const s = spring(lt, 0.4 + i * 0.13, 0.4); p.setAttribute('opacity', s > 0 ? 1 : 0); const pulse = lt > tH ? 1 + 0.25 * Math.max(0, Math.sin((lt - tH) * 9)) * Math.exp(-(lt - tH) * 2) : 1; p.querySelector('circle').setAttribute('r', 20 * Math.min(1.2, s) * pulse); });
      hubL.style.opacity = appear(lt, 0.4, 0.4);
      popIn(cnt, lt, tN - 0.4, 0.7);
      cnt.querySelector('.v').textContent = intFmt(12733 * Ease.outCubic(prog(lt, tN - 0.1, Math.max(0.6, tP - tN + 0.4))));
      const h = cnt.querySelector('.h'); h.style.opacity = appear(lt, tH - 0.15, 0.25);
      h.style.transform = `scale(${lt > tH - 0.15 ? lerp(1.4, 1, Ease.outBack(prog(lt, tH - 0.15, 0.4))) : 1})`;
      dates.style.opacity = appear(lt, tN, 0.4);
    };
  });

  // ───────────────────────── 3-4 · LA CARRERA: dron contra carretera, en minutos ─────────────────────────
  function race(x, best) {
    const r = x.root;
    const X0 = 150, X1 = 900, PX = (X1 - X0) / 120;
    const mx = (m) => X0 + m * PX;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:24px"></div>`);
    const setHead = (txt, col) => { if (head.dataset.t !== txt) { head.innerHTML = pill(txt, col); head.dataset.t = txt; } };
    const lane = (top, icon, label, color) => add(r, `<div class="abs" style="left:${X0}px;top:${top}px;width:${X1 - X0}px">
        <div style="display:flex;align-items:center;gap:16px;height:60px"><div style="width:90px;height:56px">${icon}</div><span class="mono" style="font-size:26px;font-weight:700;letter-spacing:.1em;color:${color}">${label}</span><span class="val display" style="margin-left:auto;font-size:52px;font-weight:700;color:${color};opacity:0"></span></div>
        <div class="trk" style="position:relative;height:76px;margin-top:14px;border-radius:16px;background:${C.line}"></div></div>`);
    const D = lane(420, DRONE, L('DRON', 'DRONE'), C.cyan);
    const R = lane(610, CAR, L('CARRETERA (ESTIMADA)', 'ROAD (ESTIMATED)'), C.violet);
    const seg = (row, from, to, color, txt) => add(row.querySelector('.trk'), `<div style="position:absolute;left:${from * PX}px;top:0;bottom:0;width:${(to - from) * PX}px;background:${color};border-radius:16px;display:flex;align-items:center;justify-content:center;font:700 32px 'Space Grotesk';color:${C.bg};white-space:nowrap;overflow:hidden;transform-origin:0 50%">${txt}</div>`);
    const dBar = seg(D, 0, 41, C.cyan, '');
    const ida = seg(R, 0, 60, C.violet, L('ida →', 'there →'));
    const vuelta = seg(R, 60, 120, '#7d63c9', L('← vuelta', '← back'));
    const dIcon = add(D.querySelector('.trk'), `<div style="position:absolute;top:-6px;left:0;width:120px;height:88px">${DRONE}</div>`);
    const cIcon = add(R.querySelector('.trk'), `<div style="position:absolute;top:4px;left:0;width:110px;height:66px">${CAR}</div>`);
    // Eje de minutos
    const axis = add(r, `<svg class="abs" width="1080" height="200" style="left:0;top:800px">
        <line x1="${X0}" y1="20" x2="${X1}" y2="20" stroke="${C.lineStrong}" stroke-width="4"/>
        ${[0, 30, 60, 90, 120].map((m) => `<line x1="${mx(m)}" y1="20" x2="${mx(m)}" y2="34" stroke="${C.muted}" stroke-width="3"/><text x="${mx(m)}" y="66" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="${C.muted}">${m}</text>`).join('')}
        <text x="${X1}" y="100" text-anchor="end" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="${C.faint}">${L('minutos (mediana)', 'minutes (median)')}</text></svg>`);
    // Guía en 41 y corchete de la ventaja
    const guide = add(r, `<div class="abs" style="left:${mx(41) - 2}px;top:500px;width:4px;height:200px;background:repeating-linear-gradient(${C.cyan} 0 10px, transparent 10px 18px)"></div>`);
    const br = add(r, `<div class="abs" style="left:${mx(41)}px;top:712px;height:30px;border:5px solid ${C.green};border-top:none;border-radius:0 0 10px 10px;box-sizing:border-box"></div>`);
    const brL = add(r, `<div class="abs display" style="left:0;top:910px;width:300px;text-align:center;font-size:110px;font-weight:700;color:${C.green};line-height:1;text-shadow:0 0 40px rgba(16,185,129,.5)"></div>`);
    const brS = add(r, `<div class="abs mono" style="left:0;top:1026px;width:300px;text-align:center;font-size:24px;font-weight:700;color:${C.green};letter-spacing:.1em">${L('MIN DE VENTAJA', 'MIN SAVED')}</div>`);
    const note = add(r, `<div class="abs mono" style="left:110px;right:110px;top:1086px;text-align:center;font-size:20px;font-weight:500;color:${C.muted};line-height:1.35"></div>`);
    const setBr = (end, val, col) => {
      const w = mx(end) - mx(41); br.style.width = Math.max(0, w) + 'px'; br.style.borderColor = col;
      const c = mx(41) + w / 2; brL.style.left = (c - 150) + 'px'; brS.style.left = (c - 150) + 'px';
      brL.textContent = val; brL.style.color = col; brS.style.color = col;
      brL.style.textShadow = `0 0 40px ${col}88`;
    };
    const valD = D.querySelector('.val'), valR = R.querySelector('.val');
    valD.textContent = '41 min'; valR.textContent = '120 min';

    if (!best) {
      const tDr = x.at(L('dron', 'drone')), t41 = x.at('41'), tC = x.at(L('coche', 'hospital')), t120 = x.at('120');
      const tIda = x.at(L('iba', 'drive')), tV = x.at(L('volvía', 'back')), tVen = x.at(L('ventaja', 'gap')), t79 = x.at('79');
      x.cue(t41, 'ding', 0.6); x.cue(t120, 'buzz', 0.5); x.cue(tVen, 'swipe', 0.5); x.cue(t79, 'stamp', 0.9); x.shake(t79, 14);
      note.innerHTML = L('Dron: mediana sin preparación (con preparación, media de 49,6 min).<br>Carretera: tiempo estimado, no medido.', 'Drone: median without preparation (mean with preparation: 49.6 min).<br>Road: estimated time, not measured.');
      return (lt) => {
        setHead(L('MEDIANA POR ENTREGA', 'MEDIAN PER DELIVERY'), C.cyan);
        popIn(head, lt, 0, 0.7);
        D.style.opacity = appear(lt, 0, 0.3);
        const kd = Ease.outCubic(prog(lt, tDr, t41 - tDr + 0.3));
        dBar.style.transform = `scaleX(${kd})`; dIcon.style.left = (41 * PX * kd - 70) + 'px';
        valD.style.opacity = appear(lt, t41, 0.3);
        R.style.opacity = appear(lt, tC - 0.5, 0.3);
        const kr = prog(lt, tC - 0.2, t120 - tC + 0.4);
        ida.style.transform = `scaleX(${Ease.outCubic(Math.min(1, kr * 2))})`;
        vuelta.style.transform = `scaleX(${Ease.outCubic(Math.max(0, kr * 2 - 1))})`;
        cIcon.style.left = (120 * PX * Ease.inOutCubic(kr) - 60) + 'px';
        cIcon.style.transform = `scaleX(${kr > 0.5 ? -1 : 1})`;
        valR.style.opacity = appear(lt, t120, 0.3);
        ida.style.filter = lt > tIda && lt < tV ? 'brightness(1.35)' : 'none';
        vuelta.style.filter = lt > tV && lt < tV + 0.8 ? 'brightness(1.5)' : 'none';
        axis.style.opacity = appear(lt, 0.2, 0.4);
        guide.style.opacity = appear(lt, tVen - 0.2, 0.3);
        const kb = Ease.outCubic(prog(lt, tVen, 0.6));
        setBr(41 + 79 * kb, '79', C.green);
        br.style.opacity = kb > 0 ? 1 : 0;
        brL.style.opacity = brS.style.opacity = 0;
        const s = spring(lt, t79 - 0.05, 0.45); brL.style.opacity = s > 0 ? 1 : 0; brS.style.opacity = s > 0 ? 1 : 0;
        brL.style.transform = `scale(${lerp(1.6, 1, s)})`;
        note.style.opacity = appear(lt, t41 + 0.4, 0.4);
      };
    }
    // Mejor caso: el coche sólo hace la ida (60 min) → la ventaja cae de 79 a 19
    const tM = x.at(L('mejor', 'best')), tIda = x.at(L('ida', 'one')), tH = x.at(L('hora', 'hour')), tVen = x.at(L('ventaja', 'gap')), t19 = x.at('19');
    x.cue(tM, 'whoosh', 0.6); x.cue(tIda + 0.1, 'swipe', 0.7); x.cue(tH, 'pop', 0.6); x.cue(t19, 'buzz', 0.8); x.shake(t19, 12);
    note.innerHTML = L('Análisis de sensibilidad del estudio: cada centro de sangre<br>con su propio vehículo, que sólo hace la ida.', 'The study\'s sensitivity analysis: each blood centre<br>has its own vehicle, so the trip is one-way only.');
    return (lt) => {
      const isBest = lt > tM - 0.1;
      setHead(isBest ? L('MEJOR CASO POR CARRETERA', 'BEST CASE BY ROAD') : L('MEDIANA POR ENTREGA', 'MEDIAN PER DELIVERY'), isBest ? C.amber : C.cyan);
      head.style.transform = `scale(${isBest ? lerp(1.25, 1, Ease.outBack(prog(lt, tM - 0.1, 0.4))) : 1})`;
      dIcon.style.left = (41 * PX - 70) + 'px';
      const kv = Ease.inOutCubic(prog(lt, tIda, 0.5));
      vuelta.style.transform = `scaleX(${1 - kv})`; vuelta.style.opacity = 1 - kv * 0.6;
      cIcon.style.left = (lerp(120, 60, kv) * PX - 60) + 'px';
      cIcon.style.transform = 'scaleX(1)';
      valR.textContent = lt > tH - 0.05 ? '60 min' : '120 min';
      valR.style.color = lt > tH - 0.05 ? C.amber : C.violet;
      valR.style.transform = `scale(${lt > tH - 0.05 ? lerp(1.4, 1, Ease.outBack(prog(lt, tH - 0.05, 0.35))) : 1})`;
      valD.style.opacity = valR.style.opacity = 1;
      const kb = Ease.inOutCubic(prog(lt, tVen - 0.1, Math.max(0.4, t19 - tVen + 0.1)));
      const v = Math.round(lerp(79, 19, kb));
      setBr(lerp(120, 60, kb), String(v), kb >= 1 ? C.amber : C.green);
      brL.style.transform = `scale(${lt > t19 ? lerp(1.5, 1, Ease.outBack(prog(lt, t19, 0.4))) : 1})`;
      note.style.opacity = appear(lt, tIda + 0.3, 0.4);
    };
  }
  scene('carrera', (x) => race(x, false));
  scene('mejorcaso', (x) => race(x, true));

  // ───────────────────────── 5 · ANALOGÍA: ¿alto al lado de quién? ─────────────────────────
  scene('analogia', (x) => {
    const r = x.root;
    const FLOOR = 1040, PXCM = 2.9; // 1 cm = 2,9 px
    const wall = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <line x1="110" y1="${FLOOR}" x2="970" y2="${FLOOR}" stroke="${C.lineStrong}" stroke-width="6"/>
        ${Array.from({ length: 22 }, (_, i) => { const y = FLOOR - i * 10 * PXCM; return `<line x1="110" y1="${y}" x2="${i % 5 ? 132 : 150}" y2="${y}" stroke="${C.muted}" stroke-width="3"/>${i % 5 ? '' : `<text x="160" y="${y + 8}" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="${C.faint}">${i * 10}</text>`}`; }).join('')}</svg>`);
    const fig = (left, cm, color, label) => add(r, `<div class="abs" style="left:${left}px;top:${FLOOR - cm * PXCM}px;width:${cm * PXCM * 0.375}px;height:${cm * PXCM}px;transform-origin:50% 100%">${PERSON(color)}
        <div class="mono" style="position:absolute;left:-60px;right:-60px;top:-50px;text-align:center;font-size:26px;font-weight:700;color:${color}">${label}</div></div>`);
    const me = fig(470, 175, C.cyan, L('TÚ', 'YOU'));
    const kid = fig(280, 110, C.green, L('NIÑO', 'KID'));
    const pro = fig(680, 215, C.amber, L('PÍVOT', 'NBA CENTER'));
    const tag = add(r, `<div class="abs display" style="left:0;right:0;top:340px;text-align:center;font-size:84px;font-weight:700;color:${C.ink}"></div>`);
    const tA = x.at(L('alto', 'tall')), tQ = x.at(L('quién', 'next'));
    x.cue(tA, 'pop', 0.7); x.cue(tQ, 'boom', 0.7); x.shake(tQ, 10);
    return (lt) => {
      wall.style.opacity = appear(lt, 0, 0.3);
      popIn(me, lt, 0.1, 0.6);
      popIn(kid, lt, tA - 0.2, 0.3);
      popIn(pro, lt, tQ - 0.1, 0.3);
      const big = lt > tQ - 0.1;
      tag.textContent = lt < tA - 0.2 ? '' : big ? L('¿ALTO?', 'TALL?') : L('¡ALTO!', 'TALL!');
      tag.style.color = big ? C.amber : C.green;
      tag.style.transform = `scale(${lerp(1.3, 1, Ease.outBack(prog(lt, big ? tQ - 0.1 : tA - 0.2, 0.35)))})`;
    };
  });

  // ───────────────────────── 6 · CADUCIDAD −67 % … y la letra pequeña ─────────────────────────
  scene('caducada', (x) => {
    const r = x.root;
    const bags = [0, 1, 2].map((i) => add(r, `<div class="abs" style="left:${130 + i * 165}px;top:340px;width:150px;height:210px">${BAG(150)}
        <div class="st abs display" style="left:-14px;top:110px;padding:4px 10px;border:4px solid ${C.amber};border-radius:8px;color:${C.amber};font-size:24px;font-weight:700;transform:rotate(-14deg);background:rgba(7,10,19,.75);opacity:0">${L('CADUCADA', 'EXPIRED')}</div></div>`));
    const big = add(r, `<div class="abs display" style="left:640px;top:330px;font-size:150px;font-weight:700;color:${C.green};line-height:1;text-shadow:0 0 50px rgba(16,185,129,.5)">−67%</div>`);
    const sub = add(r, `<div class="abs mono" style="left:640px;width:330px;top:490px;font-size:22px;font-weight:700;color:${C.muted};line-height:1.35">${L('sangre caducada a los 12 meses<br>(−7,1 unidades por hospital y mes)', 'expired blood at 12 months<br>(−7.1 units per hospital per month)')}</div>`);
    const ill = add(r, `<div class="abs mono" style="left:130px;top:570px;font-size:18px;font-weight:500;color:${C.faint}">${L('bolsas: ilustración de "dos tercios menos"', 'bags: illustration of "two-thirds fewer"')}</div>`);
    // Letra pequeña con lupa
    const fine = add(r, `<div class="abs" style="left:110px;width:860px;top:640px;height:430px;border-radius:30px;background:${C.surface};border:3px dashed ${C.lineStrong}"></div>`);
    const title = add(fine, `<div class="abs mono" style="left:40px;top:28px;font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.amber}">${L('LETRA PEQUEÑA', 'FINE PRINT')}</div>`);
    const lens = add(r, `<div class="abs" style="left:780px;top:600px;width:120px;height:120px;color:${C.amber}">${I.search}</div>`);
    const rows = L(
      [['Sin grupo de control', 'series temporales interrumpidas'], ['Carretera: tiempos estimados', 'no medidos: la COVID-19 frenó la recogida'], ['Coste por entrega', 'no publicado']],
      [['No control group', 'interrupted time series'], ['Road: estimated times', 'not measured: COVID-19 halted data collection'], ['Cost per delivery', 'not published']]);
    const R = rows.map(([a, b], i) => add(fine, `<div class="abs" style="left:40px;right:40px;top:${90 + i * 110}px;display:flex;align-items:center;gap:22px">
        <div style="width:54px;height:54px;flex:none;color:${C.amber}">${I.cross}</div>
        <div><div class="display" style="font-size:40px;font-weight:700;color:${C.ink};line-height:1.1">${a}</div><div class="mono" style="font-size:22px;font-weight:500;color:${C.muted};margin-top:4px">${b}</div></div></div>`));
    const t67 = x.at('67'), tMe = x.at(L('menos', 'less')), tCad = x.at(L('caducada', 'expired')), tLe = x.at(L('letra', 'fine'));
    const tR = [x.at(L('grupo', 'control')), x.at(L('estimados', 'estimated')), x.at(L('coste', 'cost'))];
    x.cue(0.3, 'stamp', 0.5); x.cue(t67, 'boom', 0.8); x.shake(t67, 14); x.cue(tLe, 'swipe', 0.6); tR.forEach((t) => x.cue(t, 'pop', 0.6));
    return (lt) => {
      bags.forEach((b, i) => {
        popIn(b, lt, 0.1 + i * 0.12, 0.6);
        b.querySelector('.st').style.opacity = appear(lt, 0.4 + i * 0.12, 0.2);
        if (i > 0) { const k = Ease.inCubic(prog(lt, tMe + (i - 1) * 0.15, 0.5)); b.style.opacity = 1 - k; b.style.transform = `translateY(${k * 120}px) rotate(${k * 25}deg)`; }
      });
      popIn(big, lt, t67 - 0.05, 0.5);
      sub.style.opacity = appear(lt, tCad, 0.4);
      ill.style.opacity = appear(lt, t67 + 0.6, 0.4);
      fine.style.opacity = appear(lt, tLe - 0.3, 0.3);
      title.style.opacity = appear(lt, tLe - 0.2, 0.3);
      R.forEach((row, i) => { row.style.opacity = appear(lt, tR[i] - 0.2, 0.3); row.style.transform = `translateX(${(1 - appear(lt, tR[i] - 0.2, 0.4)) * 40}px)`; });
      // la lupa recorre las filas
      const ly = lt < tR[0] ? 640 : lt < tR[1] ? 700 : lt < tR[2] ? 810 : 920;
      lens.style.opacity = appear(lt, tLe - 0.2, 0.3);
      lens.style.transform = `translate(${Math.sin(lt * 2) * 14}px, ${ly - 600 + Math.cos(lt * 2.4) * 8}px)`;
    };
  });

  // ───────────────────────── 7 · LECCIÓN: ¿comparado con qué? + etiqueta de evidencia A–D ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const q = popText(r, L('¿COMPARADO<br>CON QUÉ?', 'COMPARED<br>TO WHAT?'), `top:330px;font-size:104px;line-height:1.02;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.45)`);
    const levels = L(
      [['A', 'Documentada', 'revisada por pares u oficial', C.green], ['B', 'Fabricante / operador', 'lo dice quien lo vende', C.sky], ['C', 'Terceros sin revisión', 'medios, analistas', C.amber], ['D', 'Estimación editorial', 'supuesto o modelo', C.red]],
      [['A', 'Documented', 'peer-reviewed or official', C.green], ['B', 'Manufacturer / operator', 'says the seller', C.sky], ['C', 'Third party, not reviewed', 'media, analysts', C.amber], ['D', 'Editorial estimate', 'assumption or model', C.red]]);
    const bars = levels.map(([k, a, b, col], i) => add(r, `<div class="abs" style="left:110px;top:${570 + i * 120}px;height:100px;width:${560 + i * 70}px;display:flex;align-items:center;transform-origin:0 50%">
        <div style="flex:1;height:100%;background:${col};clip-path:polygon(0 0, calc(100% - 50px) 0, 100% 50%, calc(100% - 50px) 100%, 0 100%);display:flex;align-items:center;gap:22px;padding-left:26px;box-sizing:border-box">
          <span class="display" style="font-size:66px;font-weight:700;color:${C.bg};width:50px">${k}</span>
          <span><span class="display" style="display:block;font-size:34px;font-weight:700;color:${C.bg};line-height:1.05;white-space:nowrap">${a}</span><span class="mono" style="display:block;font-size:20px;font-weight:700;color:rgba(7,10,19,.75)">${b}</span></span></div></div>`));
    const mark = add(r, `<div class="abs mono" style="left:700px;top:598px;font-size:26px;font-weight:700;color:${C.green};display:flex;align-items:center;gap:10px;white-space:nowrap">◆ ${L('este estudio', 'this study')}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1070px;text-align:center;font-size:22px;font-weight:700;color:${C.faint}">${L('niveles de evidencia de physicalai.santismm.com', 'evidence levels from physicalai.santismm.com')}</div>`);
    const tCo = x.at(L('comparado', 'compared')), tEv = x.at(L('evidencia', 'evidence')), tA = x.at('A');
    x.cue(tCo, 'stamp', 0.8); x.shake(tCo, 10); x.cue(tEv, 'swipe', 0.5); x.cue(tA, 'ding', 0.8);
    return (lt) => {
      popIn(q, lt, tCo - 0.15, 0.6);
      bars.forEach((b, i) => {
        const k = Ease.outCubic(prog(lt, tEv - 0.3 + i * 0.12, 0.45));
        b.style.opacity = k > 0 ? 1 : 0; b.style.transform = `scaleX(${k})`;
        if (i > 0) b.style.filter = lt > tA ? 'saturate(.35) brightness(.7)' : 'none';
      });
      const s = spring(lt, tA, 0.4);
      bars[0].style.transform = `scaleX(${Ease.outCubic(prog(lt, tEv - 0.3, 0.45))}) scale(${lt > tA ? 1 + 0.04 * Math.sin((lt - tA) * 8) * Math.exp(-(lt - tA) * 1.5) : 1})`;
      mark.style.opacity = s > 0 ? 1 : 0; mark.style.transform = `translateX(${lerp(40, 0, Math.min(1, s))}px)`;
      src.style.opacity = appear(lt, tEv, 0.4);
    };
  });

  // ───────────────────────── 8 · TESIS: media cifra ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, L('UNA CIFRA SIN<br>SU COMPARACIÓN', 'A NUMBER WITHOUT<br>ITS COMPARISON'), `top:340px;font-size:86px;line-height:1.05;color:${C.ink}`);
    const l2 = popText(r, L('ES MEDIA CIFRA', 'IS HALF A NUMBER'), `top:540px;font-size:84px;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.5)`);
    const num = (cls, clip) => add(r, `<div class="abs display ${cls}" style="left:0;right:0;top:640px;height:420px;text-align:center;font-size:400px;font-weight:700;line-height:420px;color:${C.green};clip-path:${clip}">79</div>`);
    const top = num('t', 'inset(0 0 50% 0)'), bot = num('b', 'inset(50% 0 0 0)');
    const tC = x.at(L('cifra', 'number')), tM = x.at(L('media', 'half'));
    x.cue(tM, 'boom', 0.9); x.shake(tM, 18);
    return (lt) => {
      popIn(l1, lt, tC - 0.2, 0.7);
      top.style.opacity = bot.style.opacity = appear(lt, 0.1, 0.3);
      const k = Ease.inCubic(prog(lt, tM, 0.6));
      bot.style.transform = `translate(${k * 120}px, ${k * 260}px) rotate(${k * 18}deg)`;
      bot.style.opacity = appear(lt, 0.1, 0.3) * (1 - k);
      top.style.transform = `translateY(${-k * 20}px)`;
      const s = spring(lt, tM - 0.05, 0.45); l2.style.opacity = s > 0 ? 1 : 0; l2.style.transform = `scale(${lerp(1.6, 1, s)})`;
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['physicalai.santismm.com'], sub: L('casos reales, cada cifra con su nivel de evidencia', 'real cases, every figure with its evidence level') }));
})();
