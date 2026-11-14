/* HISPANIC LEGACY #05 · "La vacuna que cruzó el océano de brazo en brazo" (ES / EN)
 * Fuente: hispanic-legacy.com/k/balmis-expedition (verificada el 08-08-2026):
 *  c1 · Carlos IV ordena estudiar el envío de la vacuna en marzo de 1803; la expedición, dirigida por Balmis,
 *       zarpa de La Coruña en la corbeta María Pita el 30-11-1803.
 *  c2 · Sin refrigeración, la vacuna viva se mantiene por inoculación en serie, brazo a brazo, en 22 niños
 *       expósitos de 3 a 9 años, al cuidado de Isabel Zendal, rectora de la inclusa de La Coruña.
 *  c3 · Vacunan en Canarias, Puerto Rico, Venezuela, Cuba, México, Guatemala y Filipinas, y llevan la vacuna
 *       a Macao y Cantón (la subexpedición de Salvany cubre Sudamérica).
 *  c4 · Solo en Venezuela, más de 12.000 vacunados en menos de un mes y primera junta central de vacunación.
 *  c5 · La literatura la identifica como la primera campaña internacional de vacunación.
 * Simplificación: el vídeo muestra el paso de un niño al siguiente; la ficha dice "en serie, brazo a brazo"
 * sin detallar cuántos niños se vacunaban cada vez. El recorrido se dibuja como esquema, no como mapa.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn } = EUREKA.ui;
  const { endCard, year, stamp, stampIn, plate, plateIn, DARK, L, SHIP } = EUREKA.hl;

  EUREKA.video = { keywords: L(['neveras', 'vacuna', 'brazo', 'veintidós', 'cadena', 'siguiente', 'Zendal', 'China', 'doce', 'mil', 'primera'],
    ['refrigerators', 'vaccine', 'arm', 'twenty-two', 'chain', 'next', 'Zendal', 'China', 'twelve', 'thousand', 'first']) };
  const row = (r, top, html, size = 30) => add(r, `<div class="abs" style="left:0;right:0;top:${top}px;text-align:center;font-size:${size}px">${html}</div>`);
  /** Figura de niño; el punto del brazo se enciende cuando lleva la vacuna. */
  const kid = (w, color = C.parch) => `<svg viewBox="0 0 60 100" width="${w}" height="${w * 100 / 60}" style="overflow:visible"><circle cx="30" cy="20" r="15" fill="${color}"/><path d="M10 96V58a20 20 0 0 1 40 0v38z" fill="${color}"/><circle class="arm" cx="13" cy="62" r="8" fill="${C.teal}" opacity="0"/></svg>`;
  const VIAL = (fill) => `<svg viewBox="0 0 64 96" width="100%" height="100%"><path d="M20 6h24M24 6v30L8 78a10 10 0 0 0 9 14h30a10 10 0 0 0 9-14L40 36V6" fill="rgba(248,240,220,.14)" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path class="liq" d="M19 58h26l9 22a6 6 0 0 1-6 8H16a6 6 0 0 1-6-8z" fill="${fill}"/></svg>`;

  // ───────────────────────── 1 · HOOK ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const y = year(r, '1803', L('SIN NEVERAS', 'NO REFRIGERATORS'));
    const fr = add(r, `<div class="abs" style="left:690px;top:330px;width:230px;height:270px">
        <svg viewBox="0 0 230 270" width="230" height="270"><rect x="45" y="10" width="140" height="250" rx="18" fill="${C.surface2}" stroke="${C.ink}" stroke-width="7"/><path d="M45 100h140M70 45v30M70 130v50" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
          <path class="no" d="M20 20L210 250M210 20L20 250" stroke="${C.red}" stroke-width="16" stroke-linecap="round"/></svg></div>`);
    const vial = add(r, `<div class="abs" style="left:440px;top:610px;width:200px;height:300px;filter:drop-shadow(0 16px 24px rgba(0,0,0,.6))">${VIAL(C.teal)}</div>`);
    const sea = add(r, `<svg class="abs" style="left:0;top:900px" width="1080" height="120" viewBox="0 0 1080 120"><path class="w" d="" fill="none" stroke="${C.sky}" stroke-width="7" stroke-linecap="round" opacity=".7"/></svg>`);
    const st = stamp(r, L('¿CÓMO?', 'HOW?'), 1000, C.amber, 100);
    const tN = x.at(L('neveras', 'refrigerators')), tC = x.at(L('cómo', 'how')), tE = x.at(L('estropee', 'spoiling'));
    x.cue(0.15, 'ding', 0.6); x.cue(tN, 'buzz', 0.6); x.cue(tC, 'swipe', 0.6); x.cue(tE - 0.3, 'rise', 0.6); x.cue(tE + 0.1, 'stamp', 1); x.shake(tE + 0.1, 14);
    return (lt) => {
      popIn(y, lt, 0.1, 0.7);
      popIn(fr, lt, tN - 0.35, 0.7);
      fr.querySelector('.no').style.opacity = appear(lt, tN, 0.15);
      const s = popIn(vial, lt, tC - 0.1, 0.6);
      vial.style.transform = `scale(${lerp(0.6, 1, s)}) rotate(${Math.sin(lt * 2.2) * 7}deg) translateY(${Math.sin(lt * 3) * 8}px)`;
      const bad = prog(lt, tE - 0.2, 0.5);
      vial.querySelector('.liq').setAttribute('fill', bad > 0 ? `color-mix(in srgb, #6b6f66 ${bad * 100}%, ${C.teal})` : C.teal);
      let d = '';
      for (let i = 0; i <= 54; i++) d += `${i ? 'L' : 'M'}${i * 20},${60 + Math.sin(i * 0.55 + lt * 3) * 16}`;
      sea.querySelector('.w').setAttribute('d', d); sea.style.opacity = appear(lt, tC + 0.3, 0.4);
      stampIn(st, lt, tE + 0.1, -5);
    };
  });

  // ───────────────────────── 2 · 22 NIÑOS, UNA CADENA ─────────────────────────
  scene('idea', (x) => {
    const r = x.root;
    const head = row(r, 330, pill(L('EXPEDICIÓN BALMIS · 1803', 'BALMIS EXPEDITION · 1803'), C.gold), 30);
    const big = add(r, `<div class="abs display" style="left:0;right:0;top:410px;text-align:center;font-size:${L(74, 100)}px;font-weight:900;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('DENTRO DE <span style="color:' + C.teal + '">UN BRAZO</span>', 'INSIDE <span style="color:' + C.teal + '">AN ARM</span>')}</div>`);
    const W = 70, X0 = (1080 - 11 * W) / 2;
    const chain = add(r, `<svg class="abs" style="left:0;top:600px" width="1080" height="330" viewBox="0 0 1080 330"><path d="M${X0 + 20} 96H${X0 + 11 * W - 20}M${X0 + 20} 246H${X0 + 11 * W - 20}" stroke="${C.gold}" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 16"/></svg>`);
    const kids = Array.from({ length: 22 }, (_, i) => add(r, `<div class="abs" style="left:${X0 + (i % 11) * W + 8}px;top:${610 + Math.floor(i / 11) * 150}px">${kid(54)}</div>`));
    const n = add(r, `<div class="abs display" style="left:0;right:0;top:920px;text-align:center;font-size:150px;font-weight:900;line-height:1;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.85)">0</div>`);
    const sub = row(r, 1090, pill(L('NIÑOS DE LA INCLUSA DE LA CORUÑA · 3 A 9 AÑOS', 'CORUNNA FOUNDLING HOME · AGED 3 TO 9'), C.ink), 25);
    const tB = x.at(L('brazo', 'arm')), tV = x.at(L('veintidós', 'twenty')), tI = x.at(L('inclusa', 'foundling')), tC = x.at(L('cadena', 'chain'));
    x.cue(0.2, 'pop', 0.6); x.cue(tB - 0.15, 'boom', 0.8); for (let i = 0; i < 11; i++) x.cue(tV + i * 0.1, 'tick', 0.35);
    x.cue(tI, 'pop', 0.6); x.cue(tC - 0.2, 'rise', 0.6); x.cue(tC + 0.1, 'ding', 0.9);
    return (lt) => {
      popIn(head, lt, 0.15, 0.7); popIn(big, lt, tB - 0.2, 0.6);
      let c = 0;
      kids.forEach((k, i) => { const s = spring(lt, tV + i * 0.05, 0.3); if (s > 0) c++; k.style.opacity = s > 0 ? 1 : 0; k.style.transform = `scale(${lerp(0.3, 1, s)}) translateY(${Math.sin(lt * 3 + i) * 2}px)`; });
      n.textContent = c; n.style.opacity = appear(lt, tV - 0.05, 0.2);
      popIn(sub, lt, tI - 0.1, 0.8);
      chain.style.opacity = appear(lt, tC, 0.4);
    };
  });

  // ───────────────────────── 3 · BRAZO A BRAZO ─────────────────────────
  scene('cadena', (x) => {
    const r = x.root;
    const head = row(r, 330, pill(L('SIN NEVERA: UNA CADENA VIVA', 'NO FRIDGE: A LIVING CHAIN'), C.gold), 30);
    const N = 6, W = 150, X0 = (1080 - N * W) / 2;
    const kids = Array.from({ length: N }, (_, i) => add(r, `<div class="abs" style="left:${X0 + i * W + 27}px;top:520px">${kid(96)}</div>`));
    const arms = kids.map((k) => k.querySelector('.arm'));
    const dot = add(r, `<div class="abs" style="left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;background:${C.teal};box-shadow:0 0 34px ${C.teal}, 0 0 8px #fff"></div>`);
    const lab = add(r, `<div class="abs display" style="left:0;right:0;top:730px;text-align:center;font-size:104px;font-weight:900;color:${C.teal};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('BRAZO A BRAZO', 'ARM TO ARM')}</div>`);
    const sea = add(r, `<svg class="abs" style="left:0;top:1010px" width="1080" height="120" viewBox="0 0 1080 120"><path class="w" d="" fill="none" stroke="${C.sky}" stroke-width="7" stroke-linecap="round" opacity=".7"/></svg>`);
    const ship = add(r, `<div class="abs" style="left:0;top:930px;width:130px;height:120px;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${SHIP()}</div>`);
    const tU = x.at(L('uno', 'vaccinated')), tS = x.at(L('siguiente', 'next')), tA = x.at(L('así', 'so'));
    // Momento en que la vacuna llega a cada niño
    const tk = [tU, tS, tA + 0.3, tA + 0.8, tA + 1.3, tA + 1.8];
    const pos = (i) => [X0 + i * W + 27 + 96 * 13 / 60, 520 + 96 * 62 / 60];
    tk.forEach((t, i) => x.cue(t, i < 2 ? 'ding' : 'pop', 0.7)); x.cue(x.at(L('después', 'later')), 'swipe', 0.5); x.cue(tA + 0.2, 'rise', 0.5);
    return (lt) => {
      popIn(head, lt, 0.15, 0.7);
      kids.forEach((k, i) => { k.style.opacity = appear(lt, 0.1 + i * 0.06, 0.3); k.style.transform = `translateY(${Math.sin(lt * 2.5 + i) * 3}px)`; });
      let i = -1; tk.forEach((t, j) => { if (lt >= t) i = j; });
      arms.forEach((a, j) => a.setAttribute('opacity', j <= i ? 1 : 0));
      // El punto salta al siguiente niño durante los 0,35 s previos a su momento
      let px, py, vis = lt >= tU - 0.35;
      const nx = i + 1 < N ? tk[i + 1] : Infinity;
      if (i < 0) { const k = Ease.outCubic(prog(lt, tU - 0.35, 0.35)); [px, py] = pos(0); py -= (1 - k) * 220; }
      else if (lt > nx - 0.35) { const k = Ease.inOutCubic(prog(lt, nx - 0.35, 0.35)); const a = pos(i), b = pos(i + 1); px = lerp(a[0], b[0], k); py = lerp(a[1], b[1], k) - Math.sin(Math.PI * k) * 90; }
      else [px, py] = pos(i);
      dot.style.opacity = vis ? 1 : 0; dot.style.transform = `translate(${px}px, ${py}px) scale(${1 + 0.15 * Math.sin(lt * 8)})`;
      popIn(lab, lt, x.at(L('brazo', 'arm'), 1) - 0.1, 0.6);
      let d = '';
      for (let k = 0; k <= 54; k++) d += `${k ? 'L' : 'M'}${k * 20},${60 + Math.sin(k * 0.55 + lt * 3) * 16}`;
      sea.querySelector('.w').setAttribute('d', d);
      ship.style.transform = `translate(${lerp(40, 900, prog(lt, 0, x.dur + 0.3))}px, ${Math.sin(lt * 3) * 6}px) rotate(${Math.sin(lt * 2.6) * 4}deg)`;
    };
  });

  // ───────────────────────── 4 · ISABEL ZENDAL ─────────────────────────
  scene('zendal', (x) => {
    const r = x.root;
    const pl = plate(r, 'Isabel Zendal', L('RECTORA DE LA INCLUSA DE LA CORUÑA', 'HEAD OF THE CORUNNA FOUNDLING HOME'), 360);
    const adult = add(r, `<div class="abs" style="left:450px;top:620px">${kid(180, C.gold)}</div>`);
    const ks = [150, 250, 350, 650, 750, 850].map((l, i) => add(r, `<div class="abs" style="left:${l}px;top:${790 + (i % 2) * 24}px">${kid(72)}</div>`));
    const tI = x.at('isabel');
    x.cue(tI - 0.15, 'swipe', 0.6); x.cue(tI + 0.1, 'ding', 0.7);
    return (lt) => {
      plateIn(pl, lt, tI - 0.25);
      popIn(adult, lt, 0.1, 0.7);
      ks.forEach((k, i) => { popIn(k, lt, 0.2 + i * 0.07, 0.5); });
    };
  });

  // ───────────────────────── 5 · LA RUTA ─────────────────────────
  scene('ruta', (x) => {
    const r = x.root;
    const S = [[140, 420, L('LA CORUÑA', 'CORUNNA'), '30·11·1803'], [390, 420, L('CANARIAS', 'CANARIES')], [640, 420, 'PUERTO RICO'], [880, 420, 'VENEZUELA'],
      [780, 620, 'CUBA'], [500, 620, L('MÉXICO', 'MEXICO')], [220, 620, L('FILIPINAS', 'PHILIPPINES')], [500, 820, 'CHINA', L('MACAO Y CANTÓN', 'MACAO & CANTON')]];
    // Línea en zigzag que pasa por todas las paradas
    const pts = [[140, 420], [390, 420], [640, 420], [880, 420], [985, 420], [985, 620], [780, 620], [500, 620], [220, 620], [100, 620], [100, 820], [500, 820]];
    const stopIdx = [0, 1, 2, 3, 6, 7, 8, 11];
    const acc = [0]; for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const total = acc[acc.length - 1], dStr = 'M' + pts.map((p) => p.join(',')).join('L');
    const svg = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1200" viewBox="0 0 1080 1200">
        <path d="${dStr}" fill="none" stroke="${C.line}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
        <path class="p" d="${dStr}" fill="none" stroke="${C.gold}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="${total}" stroke-dashoffset="${total}"/></svg>`);
    const line = svg.querySelector('.p');
    const stops = S.map(([sx, sy, name, sub]) => add(r, `<div class="abs" style="left:${sx}px;top:${sy}px"><div style="position:absolute;left:-17px;top:-17px;width:34px;height:34px;border-radius:50%;background:${C.bg};border:7px solid ${C.gold};box-sizing:border-box"></div>
        <div class="mono" style="position:absolute;left:-150px;width:300px;top:28px;text-align:center;font-size:27px;font-weight:700;letter-spacing:.06em;color:${C.ink}">${name}${sub ? `<br><span style="font-size:21px;color:${C.muted};font-weight:500">${sub}</span>` : ''}</div></div>`));
    const ship = add(r, `<div class="abs" style="left:-48px;top:-92px;width:96px;height:90px;filter:drop-shadow(0 8px 10px rgba(0,0,0,.55))">${SHIP()}</div>`);
    const card = add(r, `<div class="abs" style="left:110px;top:965px;width:860px;height:190px;border-radius:28px;background:${DARK};border:4px solid ${C.teal};display:flex;align-items:center;gap:30px;padding:0 36px;box-sizing:border-box">
        <div class="display n" style="font-size:96px;font-weight:900;color:${C.teal};line-height:1;font-variant-numeric:tabular-nums">+0</div>
        <div class="mono" style="font-size:23px;font-weight:700;letter-spacing:.04em;color:${C.ink};line-height:1.4;white-space:nowrap">${L('VACUNADOS EN VENEZUELA<br>EN MENOS DE UN MES', 'VACCINATED IN VENEZUELA<br>IN UNDER A MONTH')}</div></div>`);
    const ws = L(['canarias', 'puerto', 'venezuela', 'cuba', 'méxico', 'filipinas', 'china'], ['canaries', 'puerto', 'venezuela', 'cuba', 'mexico', 'philippines', 'china']);
    const ts = [0.05, ...ws.map((w) => x.at(w))];
    const tD = x.at(L('doce', 'twelve')), tSolo = x.at('venezuela', 1) - 0.4;
    ts.forEach((t, i) => x.cue(t, i === 7 ? 'ding' : 'pop', 0.7)); for (let i = 0; i < 8; i++) x.cue(tD + i * 0.08, 'tick', 0.3); x.cue(tSolo, 'swipe', 0.6); x.cue(x.at(L('mes', 'month')), 'ding', 0.7);
    // Distancia recorrida en función del tiempo: llega a cada parada cuando se nombra
    const kfs = ts.map((t, i) => [t, acc[stopIdx[i]]]);
    return (lt) => {
      let dist = 0;
      for (let i = 1; i < kfs.length; i++) if (lt >= kfs[i - 1][0]) dist = lerp(kfs[i - 1][1], kfs[i][1], Ease.inOutCubic(prog(lt, kfs[i - 1][0], Math.min(0.45, kfs[i][0] - kfs[i - 1][0]) || 0.45)));
      if (lt >= kfs[7][0]) dist = lerp(kfs[6][1], kfs[7][1], Ease.inOutCubic(prog(lt, kfs[7][0] - 0.01, 0.45)));
      line.setAttribute('stroke-dashoffset', total - dist);
      let j = 0; while (j < acc.length - 2 && acc[j + 1] < dist) j++;
      const k = (dist - acc[j]) / Math.max(1e-6, acc[j + 1] - acc[j]);
      const sx = lerp(pts[j][0], pts[j + 1][0], k), sy = lerp(pts[j][1], pts[j + 1][1], k);
      ship.style.transform = `translate(${sx}px, ${sy}px) scaleX(${pts[j + 1][0] < pts[j][0] ? -1 : 1}) rotate(${Math.sin(lt * 2.6) * 4}deg)`;
      stops.forEach((s, i) => { const a = spring(lt, ts[i] + (i ? 0.3 : 0), 0.35); s.style.opacity = a > 0 ? 1 : 0.25; s.firstElementChild.style.transform = `scale(${lerp(0.5, 1, Math.max(a, 0.001))})`; s.firstElementChild.style.background = a > 0 ? C.gold : C.bg; });
      popIn(card, lt, tSolo, 0.8);
      card.querySelector('.n').textContent = '+' + Math.round(12000 * Ease.outCubic(prog(lt, tD - 0.1, 0.9))).toLocaleString(L('es-ES', 'en-US')).replace(/,/g, L('.', ','));
    };
  });

  // ───────────────────────── 6 · EL LEGADO ─────────────────────────
  scene('legado', (x) => {
    const r = x.root;
    const head = row(r, 330, pill(L('JUNTAS DE VACUNACIÓN', 'VACCINATION BOARDS'), C.teal), 30);
    const B = `<svg viewBox="0 0 100 100" width="110" height="110"><path d="M8 40L50 12l42 28z" fill="${C.teal}"/><path d="M16 46h68v40H16z" fill="none" stroke="${C.teal}" stroke-width="7"/><path d="M34 52v28M50 52v28M66 52v28" stroke="${C.teal}" stroke-width="7"/><path d="M6 92h88" stroke="${C.teal}" stroke-width="8" stroke-linecap="round"/></svg>`;
    const bs = [0, 1, 2, 3, 4].map((i) => add(r, `<div class="abs" style="left:${150 + i * 168}px;top:420px">${B}</div>`));
    const big = add(r, `<div class="abs display" style="left:0;right:0;top:610px;text-align:center;font-size:${L(82, 66)}px;font-weight:900;line-height:1.08;color:${C.ink};text-shadow:0 8px 34px rgba(0,0,0,.95)">${L('LA PRIMERA CAMPAÑA<br><span style="color:' + C.gold + '">INTERNACIONAL</span><br>DE VACUNACIÓN', 'THE FIRST<br><span style="color:' + C.gold + '">INTERNATIONAL</span><br>VACCINATION CAMPAIGN')}</div>`);
    const yrs = row(r, 920, pill('1803 – 1813', C.gold), 40);
    const cite = add(r, `<div class="abs mono" style="left:110px;right:110px;top:1040px;text-align:center;font-size:22px;line-height:1.45;font-weight:700;color:${C.muted}">«The World’s First Immunization Campaign: The Spanish Smallpox Vaccine Expedition, 1803-1813»</div>`);
    const tJ = x.at(L('juntas', 'vaccination')), tP = x.at(L('primera', 'first')), tLt = x.at(L('literatura', 'medical'));
    x.cue(0.2, 'pop', 0.6); bs.forEach((_, i) => x.cue(tJ + i * 0.13, 'pop', 0.55)); x.cue(tLt, 'swipe', 0.6); x.cue(tP - 0.35, 'rise', 0.7); x.cue(tP, 'boom', 1); x.shake(tP, 12);
    return (lt) => {
      popIn(head, lt, 0.15, 0.7);
      bs.forEach((b, i) => popIn(b, lt, tJ + i * 0.13, 0.4));
      popIn(big, lt, tP - 0.05, 0.6);
      popIn(yrs, lt, tP + 0.7, 0.7);
      cite.style.opacity = appear(lt, tLt, 0.5);
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/balmis-expedition', tCompartir: 0.3 }));
})();
