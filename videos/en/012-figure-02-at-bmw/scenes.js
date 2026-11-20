/* EUREKA #12 (EN) · "A humanoid robot spent 11 months at BMW: was it profitable?" (what was measured, by whom, against what)
 * English version of videos/012-figure-02-en-bmw: same scenes, on-screen strings via L('es', 'en'); a few EN-only size tweaks.
 * Fuente: physicalai.santismm.com · caso CS-07 "BMW Spartanburg: humanoides en el taller de chapa" (evidencia C)
 * y ficha de plataforma Figure 02 (retirada, "registro histórico"), comprobadas el 20-11-2026 contra los originales:
 *  - Figure AI, "F.02 Contributed to the Production of 30,000 Cars at BMW" (19-11-2025): "11 month Figure 02 robot
 *    deployment", "Ran 10-hour shift Monday-Friday", "90,000+ parts loaded", "1,250+ hours of runtime",
 *    "Contributed to the production of 30,000+ X3 vehicles". Tarea: "sheet-metal loading … places them on a welding
 *    fixture". KPI definidos (sin resultados publicados): 84 s por ciclo (37 s de carga), >99 % de ciclos con las 3
 *    piezas bien colocadas por turno, cero intervenciones por turno. Tolerancia de 5 mm.
 *  - BMW Group (27-02-2026): repite las cifras ("more than 30,000 BMW X3", "more than 90,000 components",
 *    "around 1,250 operating hours", "Within ten months") y lo llama "pilot"; no da productividad, coste ni ROI.
 *  - BMW Group (06-08-2024): prueba "lasting several weeks" insertando piezas de chapa en utillajes.
 *  - Fortune (06-04-2025): Adcock escribió en feb. 2025 "We currently have a fleet of robots performing end-to-end
 *    operations"; el portavoz de BMW: "only a single Figure robot … at any given time", "during non-production hours",
 *    y en producción "a single robot performing a single task".
 * Niveles A–D: physicalai.santismm.com/es/methodology. Las cifras vienen de Figure (fabricante) y BMW (operador): B.
 * Los textos usan L('es', 'en') para que la versión inglesa solo cambie el guion.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene, L } = EUREKA;
  const { pill, endCard, popText, popIn, rng } = EUREKA.ui;

  EUREKA.video = {
    keywords: L(['humanoide', '11 meses', 'rentable', 'publicado', 'chapa', '1.250', '90.000', '30.000', 'metas', 'publicar', 'flota', 'solo', 'cuentakilómetros', 'midió', 'quién', 'frente', 'independiente', 'resultados'],
      ['humanoid', '11', 'months', 'profitable', 'published', 'sheet-metal', '1,250', '90,000', '30,000', 'targets', 'fleet', 'single', 'odometer', 'measured', 'whom', 'against', 'independent', 'results']),
  };
  const intFmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, L('.', ','));
  const exact = (x, word) => { // palabra exacta (x.at('B') casaría con «BMW»)
    const w = x.words.find((v) => v.w.replace(/[^A-Za-z0-9]/g, '') === word);
    if (!w) throw new Error(`palabra exacta "${word}" no encontrada`);
    return w.ls;
  };

  // Humanoide de frente (estilizado): brazos y piernas en grupos para animarlos
  const ROBOT = (body = C.ink, eye = C.cyan) => `<svg viewBox="0 0 120 260" style="width:100%;height:100%">
      <g class="legL"><rect x="36" y="146" width="20" height="102" rx="10" fill="${body}"/><rect x="31" y="240" width="29" height="14" rx="6" fill="${C.muted}"/></g>
      <g class="legR"><rect x="64" y="146" width="20" height="102" rx="10" fill="${body}"/><rect x="60" y="240" width="29" height="14" rx="6" fill="${C.muted}"/></g>
      <rect x="28" y="62" width="64" height="92" rx="18" fill="${body}"/>
      <rect x="40" y="80" width="40" height="5" rx="2.5" fill="${C.faint}"/><rect x="46" y="92" width="28" height="5" rx="2.5" fill="${C.faint}"/>
      <rect x="52" y="52" width="16" height="14" fill="${C.muted}"/>
      <rect x="36" y="4" width="48" height="52" rx="22" fill="${body}"/>
      <rect x="41" y="16" width="38" height="22" rx="11" fill="${C.bg}"/>
      <rect class="eye" x="47" y="25" width="26" height="4" rx="2" fill="${eye}"/>
      <g class="armL"><rect x="11" y="66" width="17" height="80" rx="8.5" fill="${body}"/><circle cx="19.5" cy="150" r="8" fill="${C.muted}"/></g>
      <g class="armR"><rect x="92" y="66" width="17" height="80" rx="8.5" fill="${body}"/><circle cx="100.5" cy="150" r="8" fill="${C.muted}"/></g></svg>`;
  const pose = (el, { arm = 0, armL = arm, armR = -arm, leg = 0 } = {}) => {
    el.querySelector('.armL').setAttribute('transform', `rotate(${armL} 19.5 70)`);
    el.querySelector('.armR').setAttribute('transform', `rotate(${armR} 100.5 70)`);
    el.querySelector('.legL').setAttribute('transform', `rotate(${leg} 46 150)`);
    el.querySelector('.legR').setAttribute('transform', `rotate(${-leg} 74 150)`);
  };
  // Pieza de chapa (escuadra con agujeros)
  const PART = (fill = '#aeb8c8') => `<svg viewBox="0 0 80 40" style="width:100%;height:100%"><path d="M3 6 H56 L77 20 V37 H50 V24 H3 Z" fill="${fill}" stroke="#4b5870" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="16" cy="15" r="4" fill="#4b5870"/><circle cx="36" cy="15" r="4" fill="#4b5870"/><circle cx="64" cy="29" r="4" fill="#4b5870"/></svg>`;
  const ICON = {
    clock: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><circle cx="32" cy="34" r="24"/><path d="M32 20v14l10 7M26 4h12"/></svg>`,
    car: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"><path d="M6 44V32l6-2 8-12h24l8 12 6 2v12z"/><path d="M22 22h20l5 8H17z"/><circle cx="18" cy="45" r="6" fill="#070a13"/><circle cx="46" cy="45" r="6" fill="#070a13"/></svg>`,
    flag: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"><path d="M14 58V6"/><path d="M14 8h36l-8 11 8 11H14"/></svg>`,
    fuel: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"><path d="M10 58V10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v48M6 58h36M16 16h16v12H16z"/><path d="M38 24h6a4 4 0 0 1 4 4v18a4 4 0 0 0 8 0V20l-8-8"/></svg>`,
  };
  // Sello en tinta
  const STAMP = (txt, col = C.red, size = 54) => `<div class="display" style="display:inline-block;padding:10px 26px;border:7px solid ${col};border-radius:14px;color:${col};font-size:${size}px;font-weight:700;letter-spacing:.04em;background:rgba(7,10,19,.82);white-space:nowrap">${txt}</div>`;

  // ───────────────────────── 1 · HOOK: 11 meses en BMW… ¿rentable? ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const floor = add(r, `<div class="abs" style="left:110px;top:938px;width:820px;height:6px;border-radius:3px;background:${C.lineStrong}"></div>`);
    const halo = add(r, `<div class="abs" style="left:110px;top:430px;width:300px;height:520px;border-radius:50%;background:radial-gradient(closest-side, rgba(34,211,238,.25), transparent)"></div>`);
    const bot = add(r, `<div class="abs" style="left:150px;top:420px;width:240px;height:520px;transform-origin:50% 100%">${ROBOT()}</div>`);
    const months = add(r, `<div class="abs" style="left:450px;top:380px;width:480px;text-align:center">
        <div class="n display" style="font-size:230px;font-weight:700;color:${C.ink};line-height:1;font-variant-numeric:tabular-nums">0</div>
        <div class="display" style="font-size:64px;font-weight:700;color:${C.cyan};margin-top:-6px">${L('MESES', 'MONTHS')}</div>
        <div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};margin-top:10px">${L('en BMW · según Figure', 'at BMW · per Figure')}</div></div>`);
    const card = add(r, `<div class="abs" style="left:470px;top:740px;width:440px;height:200px;border-radius:28px;background:${C.surface};border:3px dashed ${C.lineStrong};text-align:center">
        <div class="display" style="margin-top:28px;font-size:56px;font-weight:700;color:${C.amber}">${L('¿RENTABLE?', 'PROFITABLE?')}</div>
        <div class="mono" style="margin-top:12px;font-size:22px;font-weight:700;color:${C.faint};letter-spacing:.02em;white-space:nowrap">${L('PRODUCTIVIDAD · COSTE · ROI', 'PRODUCTIVITY · COST · ROI')}</div></div>`);
    const stamp = add(r, `<div class="abs" style="left:470px;width:440px;top:852px;text-align:center;transform:rotate(-6deg)">${STAMP(L('NO PUBLICADO', 'NOT PUBLISHED'), C.red, 48)}</div>`);
    const plant = add(r, `<div class="abs" style="left:0;right:0;top:1000px;text-align:center;font-size:24px">${pill(L('PLANTA DE BMW EN SPARTANBURG (EE. UU.)', 'BMW PLANT IN SPARTANBURG (US)'), C.ink)}</div>`);
    const tM = x.at('11'), tR = x.at(L('rentable', 'profitable')), tN = x.at(L('nadie', 'nobody')), tP = x.at(L('publicado', 'published'));
    for (let i = 0; i < 11; i++) x.cue(tM - 0.1 + i * 0.06, 'tick', 0.3);
    x.cue(tM + 0.6, 'ding', 0.7); x.cue(tR, 'pop', 0.7); x.cue(tP, 'stamp', 1); x.shake(tP, 16);
    return (lt) => {
      popIn(bot, lt, 0.1, 0.7, 0.5);
      halo.style.opacity = appear(lt, 0.2, 0.5);
      floor.style.opacity = appear(lt, 0, 0.3);
      pose(bot, { arm: 4 * Math.sin(lt * 2.4), leg: 0 });
      bot.querySelector('.eye').setAttribute('opacity', 0.6 + 0.4 * Math.abs(Math.sin(lt * 3)));
      months.style.opacity = appear(lt, tM - 0.3, 0.3);
      months.querySelector('.n').textContent = Math.max(1, Math.round(11 * Ease.outCubic(prog(lt, tM - 0.1, 0.7))));
      popIn(card, lt, tR - 0.2, 0.7);
      card.style.borderColor = lt > tN ? C.red : C.lineStrong;
      const s = spring(lt, tP - 0.05, 0.35);
      stamp.style.opacity = s > 0 ? 1 : 0; stamp.style.transform = `rotate(-6deg) scale(${lerp(2.2, 1, Math.min(1.1, s))})`;
      popIn(plant, lt, 0.6, 0.7);
    };
  });

  // ───────────────────────── 2 · LA TAREA: del rack al utillaje de soldadura ─────────────────────────
  scene('tarea', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:26px">${pill('FIGURE 02 · FIGURE AI', C.cyan)}</div>`);
    const FLOOR = 870;
    add(r, `<div class="abs" style="left:100px;top:${FLOOR}px;width:840px;height:6px;border-radius:3px;background:${C.lineStrong}"></div>`);
    // Rack con piezas
    const rack = add(r, `<div class="abs" style="left:110px;top:520px;width:190px;height:${FLOOR - 520}px">
        <div class="abs" style="left:0;top:0;width:10px;bottom:0;background:${C.muted};border-radius:4px"></div>
        <div class="abs" style="right:0;top:0;width:10px;bottom:0;background:${C.muted};border-radius:4px"></div>
        ${[0, 1, 2].map((i) => `<div class="abs" style="left:0;right:0;top:${60 + i * 105}px;height:8px;background:${C.muted};border-radius:4px"></div>
          ${[0, 1].map((k) => `<div class="abs" style="left:${28 + k * 10}px;top:${20 + i * 105 - k * 10}px;width:120px;height:60px">${PART()}</div>`).join('')}`).join('')}</div>`);
    // Brazo de soldadura (colgado) + utillaje con 3 huecos
    const welder = add(r, `<svg class="abs" width="1080" height="1000" style="left:0;top:0">
        <rect x="660" y="440" width="270" height="22" rx="8" fill="${C.lineStrong}"/>
        <g class="arm"><rect x="820" y="458" width="40" height="36" rx="6" fill="${C.amber}"/>
          <path d="M840 494 L800 600 L760 680" stroke="${C.amber}" stroke-width="26" stroke-linecap="round" fill="none"/>
          <circle cx="800" cy="600" r="18" fill="${C.surface2}" stroke="${C.amber}" stroke-width="6"/>
          <path d="M760 680 l-14 30" stroke="${C.muted}" stroke-width="10" stroke-linecap="round"/></g>
        <g class="sparks"></g></svg>`);
    const fixture = add(r, `<div class="abs" style="left:640px;top:760px;width:290px;height:${FLOOR - 760}px;border-radius:12px 12px 0 0;background:${C.surface2};border:4px solid ${C.blue}">
        ${[0, 1, 2].map((k) => `<div class="slot abs" style="left:${14 + k * 90}px;top:-40px;width:82px;height:40px;border:3px dashed ${C.sky};border-radius:6px;box-sizing:border-box"></div>`).join('')}
        ${[0, 1, 2].map((k) => `<div class="put abs" style="left:${15 + k * 90}px;top:-40px;width:80px;height:40px;opacity:0">${PART('#d4dbe6')}</div>`).join('')}</div>`);
    const bot = add(r, `<div class="abs" style="left:300px;top:${FLOOR - 368}px;width:170px;height:368px">${ROBOT()}</div>`);
    const carry = add(r, `<div class="abs" style="left:0;top:${FLOOR - 368 + 196}px;width:96px;height:48px;opacity:0">${PART()}</div>`);
    const lRack = add(r, `<div class="abs mono" style="left:70px;width:270px;top:${FLOOR + 22}px;text-align:center;font-size:24px;font-weight:700;color:${C.ink}">${L('PIEZAS DE CHAPA', 'SHEET-METAL PARTS')}</div>`);
    const lFix = add(r, `<div class="abs mono" style="left:600px;width:370px;top:${FLOOR + 22}px;text-align:center;font-size:24px;font-weight:700;color:${C.sky}">${L('UTILLAJE DE SOLDADURA', 'WELDING FIXTURE')}</div>`);
    const tol = add(r, `<div class="abs mono" style="left:600px;width:370px;top:${FLOOR + 58}px;text-align:center;font-size:20px;font-weight:500;color:${C.muted}">${L('3 piezas · tolerancia 5 mm (Figure)', '3 parts · 5 mm tolerance (Figure)')}</div>`);
    const shift = add(r, `<div class="abs" style="left:0;right:0;top:1010px;text-align:center;font-size:26px">${pill(L('TURNOS DE 10 h · DE LUNES A VIERNES', '10-HOUR SHIFTS · MONDAY TO FRIDAY'), C.amber)}</div>`);
    const tF = x.at('figure'), tC = x.at(L('cogía', 'picked')), tCh = x.at(L('chapa', 'sheet')), tU = x.at(L('utillaje', 'welding')), tT = x.at(L('turnos', 'shifts'));
    const P = 1.5, T0 = tC - 0.1; // ciclo del robot
    const XR = 290, XF = 470; // posición junto al rack / junto al utillaje
    const placeAt = (c) => T0 + c * P + 0.62 * P;
    for (let c = 0; c < 4; c++) if (placeAt(c) < x.dur) x.cue(placeAt(c), 'tick', 0.6);
    x.cue(tF, 'pop', 0.6); x.cue(tT, 'swipe', 0.5);
    const sparkR = rng(12);
    const sparks = Array.from({ length: 14 }, () => [sparkR() * 2 - 1, sparkR() * 2 - 1, 0.4 + sparkR() * 0.6]);
    return (lt) => {
      popIn(head, lt, 0.05, 0.7);
      popIn(bot, lt, tF - 0.2, 0.8, 0.4);
      rack.style.opacity = appear(lt, 0.1, 0.4);
      fixture.style.opacity = welder.style.opacity = appear(lt, 0.25, 0.4);
      let bx = XR, holding = false, leg = 0, arm = 0, placed = 0;
      if (lt >= T0) {
        const c = Math.floor((lt - T0) / P), p = ((lt - T0) / P) % 1;
        placed = c + (p >= 0.62 ? 1 : 0);
        if (p < 0.15) { arm = -40 * Math.sin((p / 0.15) * Math.PI); holding = p > 0.08; }
        else if (p < 0.5) { const k = Ease.inOutCubic((p - 0.15) / 0.35); bx = lerp(XR, XF, k); holding = true; leg = 14 * Math.sin(k * Math.PI * 4); arm = -55; }
        else if (p < 0.62) { bx = XF; holding = true; arm = -55 - 25 * Math.sin(((p - 0.5) / 0.12) * Math.PI); }
        else { const k = Ease.inOutCubic((p - 0.62) / 0.38); bx = lerp(XF, XR, k); leg = 14 * Math.sin(k * Math.PI * 4); arm = 6 * Math.sin(k * Math.PI * 4); }
      }
      bot.style.left = bx + 'px';
      pose(bot, { armL: arm, armR: -arm, leg });
      carry.style.opacity = holding ? 1 : 0;
      carry.style.left = (bx + 37) + 'px';
      // 3 huecos: se llenan de uno en uno; al tercero, chispas y se vacía
      const inSet = placed % 3, full = placed > 0 && inSet === 0;
      const lastPlace = placed > 0 ? placeAt(placed - 1) : -9;
      const weld = full && lt - lastPlace < 0.6;
      fixture.querySelectorAll('.put').forEach((e, k) => { e.style.opacity = (k < inSet || weld) ? 1 : 0; });
      const sp = welder.querySelector('.sparks');
      sp.innerHTML = weld ? sparks.map(([a, b, s]) => { const d = (lt - lastPlace) * 300 * s; return `<circle cx="${746 + a * d}" cy="${712 - Math.abs(b) * d}" r="${4 * s}" fill="${C.amber}"/>`; }).join('') : '';
      welder.querySelector('.arm').setAttribute('transform', `rotate(${weld ? 4 * Math.sin(lt * 30) : 0} 840 470)`);
      lRack.style.opacity = appear(lt, tCh - 0.1, 0.3);
      lFix.style.opacity = appear(lt, tU - 0.1, 0.3); tol.style.opacity = appear(lt, tU + 0.3, 0.3);
      popIn(shift, lt, tT - 0.1, 0.7);
    };
  });

  // ───────────────────────── 3 · LAS CIFRAS (según Figure) ─────────────────────────
  scene('cifras', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:24px">${pill(L('LO DICE FIGURE · 19 NOV 2025', 'PER FIGURE · NOV 19, 2025'), C.sky)}</div>`);
    const rows = [
      [ICON.clock, 1250, L('h', 'h'), L('horas de funcionamiento', 'hours of runtime'), C.cyan],
      [PART('#aeb8c8'), 90000, '', L('piezas cargadas', 'parts loaded'), C.ink],
      [ICON.car, 30000, '', L('BMW X3 a cuya producción contribuyó', 'BMW X3s it helped produce'), C.green],
    ].map(([icon, n, u, lab, col], i) => {
      const el = add(r, `<div class="abs" style="left:110px;top:${420 + i * 190}px;width:820px;height:165px;border-radius:30px;background:${C.surface};border:3px solid ${C.line};display:flex;align-items:center;gap:34px;padding:0 40px;box-sizing:border-box">
          <div style="width:${i === 1 ? 120 : 96}px;height:${i === 1 ? 60 : 96}px;color:${col};flex:none">${icon}</div>
          <div><div class="display" style="font-size:92px;font-weight:700;color:${col};line-height:1;font-variant-numeric:tabular-nums"><span class="v">0</span><span style="color:${C.amber}">+</span>${u ? `<span style="font-size:60px"> ${u}</span>` : ''}</div>
          <div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};margin-top:8px">${lab}</div></div></div>`);
      return { el, n };
    });
    const note = add(r, `<div class="abs mono" style="left:110px;right:150px;top:1000px;text-align:center;font-size:22px;font-weight:500;color:${C.muted};line-height:1.4">${L('Cifras del propio fabricante, en 11 meses de despliegue.<br>BMW repitió las mismas en febrero de 2026.', 'The maker\'s own figures, over an 11-month deployment.<br>BMW repeated the same ones in February 2026.')}</div>`);
    const tF = x.at('figure'), tT = [x.at('1250'), x.at('90000'), x.at('30000')];
    x.cue(tF, 'pop', 0.6); tT.forEach((t) => { x.cue(t, 'ding', 0.6); });
    return (lt) => {
      popIn(head, lt, 0.05, 0.7);
      rows.forEach(({ el, n }, i) => {
        const s = spring(lt, tT[i] - 0.25, 0.4);
        el.style.opacity = s > 0 ? 1 : 0; el.style.transform = `translateX(${(1 - Math.min(1, s)) * 80}px)`;
        el.querySelector('.v').textContent = intFmt(n * Ease.outCubic(prog(lt, tT[i] - 0.1, 0.7)));
      });
      note.style.opacity = appear(lt, tT[2] + 0.5, 0.4);
    };
  });

  // ───────────────────────── 4 · LAS METAS: objetivo sí, resultado no ─────────────────────────
  scene('metas', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:24px">${pill(L('LAS METAS QUE SE FIJÓ FIGURE', 'THE TARGETS FIGURE SET'), C.cyan)}</div>`);
    const panel = add(r, `<div class="abs" style="left:110px;top:410px;width:820px;height:560px;border-radius:30px;background:${C.surface};border:3px solid ${C.lineStrong}"></div>`);
    add(panel, `<div class="abs mono" style="left:400px;width:190px;top:28px;text-align:center;font-size:24px;font-weight:700;letter-spacing:.1em;color:${C.cyan}">${L('META', 'TARGET')}</div>`);
    const resH = add(panel, `<div class="abs mono" style="left:600px;width:200px;top:28px;text-align:center;font-size:24px;font-weight:700;letter-spacing:.1em;color:${C.faint}">${L('RESULTADO', 'RESULT')}</div>`);
    const data = L(
      [['Tiempo de ciclo', '37 s de carga', '84 s'], ['Ciclos correctos', 'por turno', '>99%'], ['Intervenciones', 'por turno', '0']],
      [['Cycle time', '37 s load time', '84 s'], ['Correct cycles', 'per shift', '>99%'], ['Interventions', 'per shift', '0']]);
    const rows = data.map(([a, b, v], i) => add(panel, `<div class="abs" style="left:0;right:0;top:${90 + i * 150}px;height:130px">
        <div class="abs" style="left:30px;right:30px;top:0;height:2px;background:${C.line}"></div>
        <div class="abs" style="left:36px;top:26px"><div class="display" style="font-size:40px;font-weight:700;color:${C.ink};line-height:1.1">${a}</div><div class="mono" style="font-size:22px;font-weight:500;color:${C.muted};margin-top:6px">${b}</div></div>
        <div class="abs display" style="left:400px;width:190px;top:22px;text-align:center;font-size:62px;font-weight:700;color:${C.cyan};line-height:1">${v}</div>
        <div class="res abs display" style="left:612px;width:176px;top:20px;height:84px;border-radius:16px;border:3px dashed ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:700;color:${C.faint}">${L('¿?', '?')}</div></div>`));
    const stamp = add(r, `<div class="abs" style="left:${L(712, 698)}px;width:240px;top:655px;text-align:center;transform:rotate(-8deg)">${STAMP(L('SIN<br>PUBLICAR', 'NOT<br>PUBLISHED'), C.red, L(40, 34))}</div>`);
    stamp.firstElementChild.style.lineHeight = '1';
    const note = add(r, `<div class="abs mono" style="left:110px;right:150px;top:1000px;text-align:center;font-size:21px;font-weight:500;color:${C.muted};line-height:1.4">${L('Ciclo correcto: las 3 piezas bien colocadas.<br>Intervención: una persona pausa o reinicia el robot.', 'Correct cycle: all 3 parts placed correctly.<br>Intervention: a person pauses or resets the robot.')}</div>`);
    const tV = [x.at('84'), x.at('99'), x.at(L('cero', 'zero'))], tRe = x.at(L('resultados', 'results')), tS = x.at(L('sin', 'not'));
    tV.forEach((t) => x.cue(t, 'pop', 0.6)); x.cue(tRe, 'swipe', 0.6); x.cue(tS, 'stamp', 1); x.shake(tS, 16);
    return (lt) => {
      popIn(head, lt, 0.05, 0.7);
      panel.style.opacity = appear(lt, 0.1, 0.35);
      rows.forEach((row, i) => { const k = appear(lt, tV[i] - 0.3, 0.35); row.style.opacity = k; row.style.transform = `translateY(${(1 - k) * 30}px)`; });
      const on = lt > tRe - 0.1;
      resH.style.color = on ? C.amber : C.faint;
      rows.forEach((row, i) => {
        const res = row.querySelector('.res');
        res.style.borderColor = on ? C.amber : C.lineStrong;
        res.style.color = on ? C.amber : C.faint;
        res.style.opacity = on ? 0.55 + 0.45 * Math.abs(Math.cos((lt - tRe) * 5 + i)) : 1;
      });
      const s = spring(lt, tS - 0.05, 0.35);
      stamp.style.opacity = s > 0 ? 1 : 0; stamp.style.transform = `rotate(-8deg) scale(${lerp(2.2, 1, Math.min(1.1, s))})`;
      note.style.opacity = appear(lt, tV[2] + 0.5, 0.4);
    };
  });

  // ───────────────────────── 5 · ¿FLOTA O UN ROBOT? ─────────────────────────
  scene('flota', (x) => {
    const r = x.root;
    const quote = add(r, `<div class="abs" style="left:110px;top:330px;width:820px;height:150px;border-radius:30px;background:${C.surface};border:3px solid ${C.violet};box-sizing:border-box;padding:24px 36px">
        <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.08em;color:${C.violet}">${L('FUNDADOR DE FIGURE · FEB. 2025 · TRADUCIDO', 'FIGURE’S FOUNDER · LINKEDIN, FEB 2025')}</div>
        <div class="display" style="font-size:${L(46, 40)}px;font-weight:700;color:${C.ink};margin-top:12px;white-space:nowrap">${L('«Tenemos una flota de robots…»', '“We currently have a fleet of robots…”')}</div></div>`);
    const N = 12, COLS = 6;
    const bots = Array.from({ length: N }, (_, i) => add(r, `<div class="abs" style="left:${133 + (i % COLS) * 130}px;top:${515 + Math.floor(i / COLS) * 200}px;width:84px;height:182px;transform-origin:50% 100%">${ROBOT(i === 2 ? C.ink : '#b9c3d3')}</div>`));
    const ONE = 2;
    const ring = add(r, `<div class="abs" style="left:${133 + ONE * 130 - 38}px;top:${515 - 20}px;width:160px;height:222px;border-radius:30px;border:5px solid ${C.cyan};box-shadow:0 0 40px ${C.cyan}66"></div>`);
    const bmw = add(r, `<div class="abs" style="left:110px;top:935px;width:820px;height:170px;border-radius:30px;background:${C.surface};border:3px solid ${C.cyan};box-sizing:border-box;padding:22px 36px">
        <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.08em;color:${C.cyan}">${L('PORTAVOZ DE BMW · VÍA FORTUNE, ABR. 2025', 'BMW SPOKESPERSON · VIA FORTUNE, APR 2025')}</div>
        <div class="display" style="font-size:44px;font-weight:700;color:${C.ink};margin-top:10px"><span class="a">${L('1 robot a la vez', '1 robot at a time')}</span><span class="b" style="color:${C.amber}"> · ${L('1 sola tarea', '1 single task')}</span></div>
        <div class="mono" style="font-size:20px;font-weight:500;color:${C.muted};margin-top:6px">${L('y hasta marzo, fuera del horario de producción', 'and until March, outside production hours')}</div></div>`);
    const tFu = x.at(L('fundador', 'founder')), tFl = x.at(L('flota', 'fleet')), tB = x.at('bmw'), tSo = x.at(L('solo', 'single')), tTa = x.at(L('tarea', 'task'));
    for (let i = 0; i < N; i++) x.cue(tFl - 0.2 + i * 0.05, 'tick', 0.25);
    x.cue(tFu, 'pop', 0.6); x.cue(tB, 'whoosh', 0.7); x.cue(tSo, 'ding', 0.8); x.cue(tTa, 'pop', 0.6);
    return (lt) => {
      popIn(quote, lt, tFu - 0.3, 0.8);
      const kOut = Ease.inOutCubic(prog(lt, tB, 0.6));
      bots.forEach((b, i) => {
        const s = spring(lt, tFl - 0.2 + i * 0.05, 0.35);
        const other = i !== ONE;
        b.style.opacity = s > 0 ? (other ? 1 - 0.88 * kOut : 1) : 0;
        b.style.transform = `scale(${Math.min(1.1, s) * (other ? 1 - 0.15 * kOut : 1 + 0.08 * spring(lt, tSo - 0.1, 0.4))})`;
        pose(b, { arm: 5 * Math.sin(lt * 3 + i), leg: 0 });
      });
      const sr = spring(lt, tSo - 0.15, 0.4); ring.style.opacity = sr > 0 ? 1 : 0; ring.style.transform = `scale(${lerp(1.4, 1, Math.min(1, sr))})`;
      popIn(bmw, lt, tB - 0.1, 0.8);
      bmw.querySelector('.a').style.opacity = appear(lt, tSo - 0.4, 0.3);
      bmw.querySelector('.b').style.opacity = appear(lt, tTa - 0.25, 0.3);
    };
  });

  // ───────────────────────── 6 · ANALOGÍA: el cuentakilómetros ─────────────────────────
  scene('analogia', (x) => {
    const r = x.root;
    const dash = add(r, `<div class="abs" style="left:110px;top:360px;width:820px;height:640px;border-radius:60px;background:linear-gradient(${C.surface2}, ${C.surface});border:4px solid ${C.lineStrong};box-shadow:0 30px 80px rgba(0,0,0,.55)"></div>`);
    const odoL = add(r, `<div class="abs mono" style="left:110px;width:820px;top:396px;text-align:center;font-size:24px;font-weight:700;letter-spacing:.14em;color:${C.muted}">${L('CUENTAKILÓMETROS', 'ODOMETER')}</div>`);
    const odo = add(r, `<div class="abs" style="left:225px;top:440px;width:590px;height:130px;display:flex;gap:10px;justify-content:center">
        ${Array.from({ length: 6 }, (_, i) => `<div class="dg display" style="width:84px;height:126px;border-radius:14px;background:${i === 5 ? '#e9eef6' : '#111a2e'};border:3px solid ${C.line};overflow:hidden;position:relative;font-size:96px;font-weight:700;color:${i === 5 ? C.bg : C.ink};text-align:center"><div class="col" style="position:absolute;left:0;right:0;top:0;line-height:126px">${Array.from({ length: 11 }, (_, k) => `<div>${k % 10}</div>`).join('')}</div></div>`).join('')}
        <div class="display" style="align-self:flex-end;font-size:44px;font-weight:700;color:${C.muted};margin-left:8px">km</div></div>`);
    const ok = add(r, `<div class="abs mono" style="left:110px;width:820px;top:592px;text-align:center;font-size:28px;font-weight:700;color:${C.green}">✓ ${L('CUÁNTO HAS RODADO', 'HOW FAR YOU\'VE DRIVEN')}</div>`);
    const gauge = (cx, icon, label) => {
      const g = add(r, `<div class="abs" style="left:${cx - 150}px;top:650px;width:300px;height:330px">
          <svg viewBox="0 0 300 200" style="position:absolute;left:0;top:0;width:300px;height:200px">
            <path d="M30 170 A120 120 0 0 1 270 170" stroke="${C.lineStrong}" stroke-width="16" fill="none" stroke-linecap="round"/>
            ${Array.from({ length: 9 }, (_, k) => { const a = Math.PI * (1 - k / 8); return `<line x1="${150 + Math.cos(a) * 96}" y1="${170 - Math.sin(a) * 96}" x2="${150 + Math.cos(a) * 80}" y2="${170 - Math.sin(a) * 80}" stroke="${C.muted}" stroke-width="4"/>`; }).join('')}
            <line class="ndl" x1="150" y1="170" x2="150" y2="78" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/><circle cx="150" cy="170" r="12" fill="${C.ink}"/></svg>
          <div style="position:absolute;left:28px;top:118px;width:46px;height:46px;color:${C.muted}">${icon}</div>
          <div class="q display" style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:110px;font-weight:700;color:${C.amber};opacity:0;text-shadow:0 0 30px rgba(245,158,11,.5)">?</div>
          <div class="mono" style="position:absolute;left:-40px;right:-40px;top:214px;text-align:center;font-size:24px;font-weight:700;color:${C.amber};line-height:1.3">${label}</div></div>`);
      return g;
    };
    const g1 = gauge(320, ICON.flag, L('¿LLEGASTE<br>ANTES?', 'DID YOU GET<br>THERE SOONER?'));
    const g2 = gauge(720, ICON.fuel, L('¿CUÁNTO<br>GASTASTE?', 'HOW MUCH<br>DID YOU SPEND?'));
    const tO = x.at(L('cuentakilómetros', 'odometer')), tRo = x.at(L('rodado', 'driven')), tA = x.at(L('antes', 'sooner')), tG = x.at(L('gastaste', 'spent'));
    x.cue(tO, 'pop', 0.6); x.cue(tRo, 'ding', 0.7); x.cue(tA, 'buzz', 0.5); x.cue(tG, 'buzz', 0.6); x.shake(tG, 10);
    const digits = odo.querySelectorAll('.col');
    return (lt) => {
      popIn(dash, lt, 0.05, 0.9, 0.4);
      odoL.style.opacity = appear(lt, tO - 0.2, 0.3);
      popIn(odo, lt, tO - 0.3, 0.7);
      // el cuentakilómetros gira sin parar (valor ilustrativo)
      const km = 48210 + lt * 9;
      digits.forEach((d, i) => {
        const place = Math.pow(10, 5 - i);
        const v = (km / place) % 10;
        const frac = i === 5 ? v - Math.floor(v) : Math.max(0, (km % place) / place * 10 - 9); // rodillo: solo el último gira continuo
        const shown = Math.floor(v) + (i === 5 ? frac : frac);
        d.style.transform = `translateY(${-shown * 126}px)`;
      });
      ok.style.opacity = appear(lt, tRo - 0.1, 0.3);
      [[g1, tA], [g2, tG]].forEach(([g, t], i) => {
        const s = spring(lt, t - 0.45, 0.4);
        g.style.opacity = s > 0 ? 1 : 0; g.style.transform = `scale(${lerp(0.7, 1, Math.min(1, s))})`;
        const wob = lt > t ? 70 * Math.sin((lt - t) * (7 + i * 2)) * Math.exp(-(lt - t) * 0.4) : -80;
        g.querySelector('.ndl').setAttribute('transform', `rotate(${wob} 150 170)`);
        const q = g.querySelector('.q'); const sq = spring(lt, t, 0.35); q.style.opacity = sq > 0 ? 1 : 0; q.style.transform = `scale(${lerp(1.6, 1, Math.min(1, sq))})`;
      });
    };
  });

  // ───────────────────────── 7 · LECCIÓN: qué, quién y frente a qué + nivel B ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const Q = L(
      [['¿QUÉ SE MIDIÓ?', 'horas, piezas y coches', C.ink], ['¿QUIÉN?', 'Figure, y BMW lo repite', C.sky], ['¿FRENTE A QUÉ?', 'ninguna comparación publicada', C.red]],
      [['WHAT WAS MEASURED?', 'hours, parts and cars', C.ink], ['BY WHOM?', 'Figure, and BMW repeats it', C.sky], ['AGAINST WHAT?', 'no published comparison', C.red]]);
    const rows = Q.map(([q, a, col], i) => add(r, `<div class="abs" style="left:110px;top:${335 + i * 150}px;width:820px">
        <div class="q display" style="font-size:58px;font-weight:700;color:${C.amber};line-height:1">${q}</div>
        <div class="a mono" style="margin-top:12px;font-size:30px;font-weight:700;color:${col};display:flex;align-items:center;gap:14px"><span style="width:14px;height:14px;border-radius:50%;background:${col}"></span>${a}</div></div>`));
    const lv = L(
      [['A', 'Documentada'], ['B', 'Fabricante / operador'], ['C', 'Terceros'], ['D', 'Estimación']],
      [['A', 'Documented'], ['B', 'Maker / operator'], ['C', 'Third party'], ['D', 'Estimate']]);
    const cols = [C.green, C.sky, C.amber, C.red];
    const blocks = lv.map(([k, n], i) => add(r, `<div class="abs" style="left:${110 + i * 207}px;top:805px;width:194px;height:150px;border-radius:22px;background:${cols[i]};text-align:center;transform-origin:50% 100%">
        <div class="display" style="font-size:78px;font-weight:700;color:${C.bg};line-height:1;margin-top:14px">${k}</div>
        <div class="mono" style="font-size:19px;font-weight:700;color:rgba(7,10,19,.8);margin-top:8px;line-height:1.15;padding:0 8px">${n}</div></div>`));
    const lab = add(r, `<div class="abs mono" style="left:110px;width:820px;top:980px;text-align:center;font-size:24px;font-weight:700;color:${C.sky};line-height:1.35">${L('Fiable sobre lo que declara,<br>pero no es una verificación independiente', 'Reliable about what it states,<br>but not independent verification')}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1090px;text-align:center;font-size:20px;font-weight:700;color:${C.faint}">${L('niveles de evidencia de physicalai.santismm.com', 'evidence levels from physicalai.santismm.com')}</div>`);
    const tQ = L(['qué', 'quién', 'frente'], ['what', 'whom', 'against']).map((w) => x.at(w));
    const tA = L(['aquí', 'figure', 'repite'], ['here', 'figure', 'repeats']).map((w) => x.at(w));
    const tN = x.at(L('nivel', 'level')), tB = exact(x, 'B'), tI = x.at(L('verificación', 'independent'));
    tQ.forEach((t) => x.cue(t, 'pop', 0.6)); tA.forEach((t) => x.cue(t, 'tick', 0.5));
    x.cue(tN, 'swipe', 0.5); x.cue(tB, 'ding', 0.9); x.shake(tB, 8);
    return (lt) => {
      rows.forEach((row, i) => {
        popIn(row.querySelector('.q'), lt, tQ[i] - 0.15, 0.8, 0.35);
        row.querySelector('.q').style.transformOrigin = '0 50%';
        const ka = appear(lt, tA[i] - 0.1, 0.3); const a = row.querySelector('.a');
        a.style.opacity = ka; a.style.transform = `translateX(${(1 - ka) * 40}px)`;
      });
      blocks.forEach((b, i) => {
        const k = Ease.outCubic(prog(lt, tN - 0.3 + i * 0.08, 0.4));
        b.style.opacity = k > 0 ? (lt > tB && i !== 1 ? 0.28 : 1) : 0;
        b.style.transform = `scaleY(${k}) ${i === 1 && lt > tB ? `translateY(${-14 * Math.min(1, spring(lt, tB, 0.35))}px) scale(1.06)` : ''}`;
      });
      blocks[1].style.boxShadow = lt > tB ? `0 0 50px ${C.sky}` : 'none';
      lab.style.opacity = appear(lt, tI - 0.3, 0.4);
      src.style.opacity = appear(lt, tN, 0.4);
    };
  });

  // ───────────────────────── 8 · TESIS: contar no es medir ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, L('CONTAR PIEZAS', 'COUNTING PARTS'), `top:350px;font-size:${L(104, 96)}px;color:${C.ink}`);
    const l2 = popText(r, L('NO ES MEDIR<br>RESULTADOS', 'IS NOT MEASURING<br>RESULTS'), `top:480px;font-size:${L(96, 84)}px;line-height:1.02;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.45)`);
    const pile = Array.from({ length: 12 }, (_, i) => add(r, `<div class="abs" style="left:${130 + (i % 4) * 116 + (Math.floor(i / 4) % 2) * 30}px;top:${960 - Math.floor(i / 4) * 56}px;width:110px;height:55px">${PART()}</div>`));
    const cnt = add(r, `<div class="abs display" style="left:170px;width:450px;top:740px;text-align:center;font-size:76px;font-weight:700;color:${C.ink};font-variant-numeric:tabular-nums">0</div>`);
    const res = add(r, `<div class="abs" style="left:660px;top:760px;width:250px;height:260px;border-radius:26px;border:4px dashed ${C.amber};text-align:center;box-sizing:border-box">
        <div class="mono" style="margin-top:30px;font-size:24px;font-weight:700;color:${C.amber};letter-spacing:.08em">${L('RESULTADO', 'RESULT')}</div>
        <div class="display" style="font-size:120px;font-weight:700;color:${C.amber};line-height:1.2">?</div></div>`);
    const tC = x.at(L('contar', 'counting')), tM = x.at(L('medir', 'measuring'));
    for (let i = 0; i < 12; i++) x.cue(tC + i * 0.07, 'tick', 0.25);
    x.cue(tM, 'boom', 0.8); x.shake(tM, 14);
    return (lt) => {
      popIn(l1, lt, tC - 0.2, 0.7);
      const s = spring(lt, tM - 0.1, 0.45); l2.style.opacity = s > 0 ? 1 : 0; l2.style.transform = `scale(${lerp(1.5, 1, Math.min(1.1, s))})`;
      let n = 0;
      pile.forEach((p, i) => { const k = spring(lt, tC + i * 0.07, 0.3); p.style.opacity = k > 0 ? 1 : 0; p.style.transform = `translateY(${(1 - Math.min(1, k)) * -60}px)`; if (k > 0) n++; });
      cnt.textContent = '+' + n;
      cnt.style.opacity = appear(lt, tC, 0.2);
      popIn(res, lt, tM, 0.6);
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['physicalai.santismm.com'], sub: L('casos reales: qué se midió, quién y frente a qué', 'real cases: what was measured, by whom, against what') }));
})();
