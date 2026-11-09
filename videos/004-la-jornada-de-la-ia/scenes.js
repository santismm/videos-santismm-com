/* EUREKA #04 · "La IA dobla su jornada cada 7 meses" (horizonte temporal de METR)
 * Datos: METR, archivo benchmark_results_1_1.yaml (time horizons v1.1, página actualizada 2026-09-08).
 * Horizonte al 50 %: GPT-2 0,054 min (≈3 s), GPT-4 3,99 min, Claude 3.7 Sonnet 60,4 min,
 * Claude Opus 4.6 718,8 min (≈12 h, IC 95 % 5,3–60,6 h); al 80 %: Opus 4.6 69,9 min.
 * Duplicación ≈7 meses 2019–2025 (METR) y ≈129 días desde 2023 (archivo de datos).
 * Marco: articles.santismm.com · "El cronómetro y el examen".
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;

  EUREKA.video = { keywords: ['doce', 'siete', 'cuatro', '80%', 'veredicto', 'fiabilidad'] };

  const SRC = 'Datos: METR · time horizons v1.1 (sept. 2026)';
  const fmtMin = (m) => { if (m < 1) return `${Math.round(m * 60)} s`; if (m < 59.5) return `${Math.round(m)} min`; const h = m / 60; return (h >= 10 || Math.abs(h - Math.round(h)) < 0.06) ? `${Math.round(h)} h` : `${h.toFixed(1).replace('.', ',')} h`; };

  // Cronómetro SVG reutilizable
  const stopwatch = (size) => `<svg viewBox="0 0 400 440" width="${size}" height="${size * 1.1}" style="overflow:visible">
      <rect x="170" y="0" width="60" height="34" rx="8" fill="${C.lineStrong}"/><rect x="186" y="30" width="28" height="22" fill="${C.lineStrong}"/>
      <rect x="318" y="62" width="40" height="22" rx="6" fill="${C.lineStrong}" transform="rotate(45 338 73)"/>
      <circle cx="200" cy="250" r="180" fill="${C.surface}" stroke="${C.cyan}" stroke-width="14"/>
      ${Array.from({ length: 60 }, (_, i) => { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 160 : 148; return `<line x1="${200 + Math.sin(a) * r1}" y1="${250 - Math.cos(a) * r1}" x2="${200 + Math.sin(a) * 168}" y2="${250 - Math.cos(a) * 168}" stroke="${i % 5 ? C.lineStrong : C.muted}" stroke-width="${i % 5 ? 3 : 5}"/>`; }).join('')}
      <circle class="arc" cx="200" cy="250" r="130" fill="none" stroke="${C.amber}" stroke-width="18" stroke-dasharray="0 1000" transform="rotate(-90 200 250)" stroke-linecap="round" opacity=".85"/>
      <line class="hand" x1="200" y1="250" x2="200" y2="96" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="200" cy="250" r="14" fill="${C.cyan}"/></svg>`;

  // ───────────────────────── 1 · HOOK: 3 segundos → 12 horas ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const year = add(r, `<div class="abs display" style="left:0;right:0;top:318px;text-align:center;font-size:110px;font-weight:700;color:${C.muted};letter-spacing:.02em">2019</div>`);
    const sw = add(r, `<div class="abs" style="left:300px;top:470px;width:480px;height:528px">${stopwatch(480)}</div>`);
    const read = add(r, `<div class="abs display" style="left:390px;width:300px;top:820px;padding:8px 0;border-radius:24px;background:rgba(7,10,19,.88);text-align:center;font-size:96px;font-weight:700;color:${C.ink};line-height:1">3 s</div>`);
    const lbl = add(r, `<div class="abs mono" style="left:0;right:0;top:1040px;text-align:center;font-size:26px;font-weight:700;letter-spacing:.08em;color:${C.muted}">DURACIÓN DE LAS TAREAS QUE COMPLETA</div>`);
    const t3 = x.at('tres'), tH = x.at('hoy'), t12 = x.at('doce');
    x.cue(t3, 'tick', 0.6); for (let i = 0; i < 10; i++) x.cue(tH + i * 0.07, 'tick', 0.35);
    x.cue(t12 + 0.1, 'stamp', 1); x.shake(t12 + 0.1, 20);
    const C_ARC = 2 * Math.PI * 130;
    return (lt) => {
      const k = Ease.inOutCubic(prog(lt, tH - 0.1, t12 + 0.15 - tH));
      year.textContent = k > 0.5 ? 'HOY' : '2019';
      year.style.color = k > 0.5 ? C.cyan : C.muted;
      // 3 s → 12 h en escala logarítmica para el contador
      const m = Math.pow(10, lerp(Math.log10(0.05), Math.log10(720), k));
      read.textContent = k >= 1 ? '12 h' : k <= 0 ? '3 s' : fmtMin(m);
      read.style.color = k >= 1 ? C.cyan : C.ink;
      read.style.textShadow = k >= 1 ? '0 0 50px rgba(34,211,238,.6)' : 'none';
      const spin = lt < tH ? lt * 90 : (tH * 90 + (lt - tH) * (k < 1 ? 2200 : 60));
      sw.querySelector('.hand').setAttribute('transform', `rotate(${spin % 360} 200 250)`);
      // Arco: fracción de un día (3 s ≈ 0; 12 h = media vuelta)
      const frac = k >= 1 ? 0.5 : (m / 1440);
      sw.querySelector('.arc').setAttribute('stroke-dasharray', `${C_ARC * frac} 1000`);
      lbl.style.opacity = appear(lt, 0.2, 0.4);
      sw.style.transform = `scale(${k >= 1 ? lerp(1.08, 1, Ease.outBack(prog(lt, t12 + 0.1, 0.4))) : 1})`;
    };
  });

  // ───────────────────────── 2 · DEFINICIÓN: curva de éxito y horizonte ─────────────────────────
  scene('definicion', (x) => {
    const r = x.root;
    const X0 = 200, X1 = 920, Y0 = 940, Y1 = 470; // ejes
    const lx = (min) => lerp(X0, X1, (Math.log10(min) - Math.log10(1 / 60)) / (Math.log10(1440) - Math.log10(1 / 60)));
    const ly = (p) => lerp(Y0, Y1, p);
    const H = 60; // horizonte ilustrativo: 1 h
    const curve = Array.from({ length: 80 }, (_, i) => {
      const lm = lerp(Math.log10(1 / 60), Math.log10(1440), i / 79);
      const p = 1 / (1 + Math.exp(2.4 * (lm - Math.log10(H)) * 2.3));
      return [lerp(X0, X1, i / 79), ly(0.03 + 0.94 * p)];
    });
    const d = 'M' + curve.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L');
    const ticks = [[1 / 60, '1 s'], [1, '1 min'], [60, '1 h'], [1440, '1 día']];
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <line x1="${X0}" y1="${Y0}" x2="${X1 + 10}" y2="${Y0}" stroke="${C.lineStrong}" stroke-width="4"/>
        <line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1 - 20}" stroke="${C.lineStrong}" stroke-width="4"/>
        ${ticks.map(([m, t]) => `<line x1="${lx(m)}" y1="${Y0}" x2="${lx(m)}" y2="${Y0 + 12}" stroke="${C.muted}" stroke-width="3"/><text x="${lx(m)}" y="${Y0 + 48}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="${C.muted}">${t}</text>`).join('')}
        ${[[0, '0%'], [0.5, '50%'], [1, '100%']].map(([p, t]) => `<text x="${X0 - 18}" y="${ly(p) + 9}" text-anchor="end" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="${C.muted}">${t}</text>`).join('')}
        <line class="half" x1="${X0}" y1="${ly(0.5)}" x2="${X1}" y2="${ly(0.5)}" stroke="${C.amber}" stroke-width="4" stroke-dasharray="14 10" opacity="0"/>
        <path class="curve" d="${d}" fill="none" stroke="${C.cyan}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <line class="drop" x1="${lx(H)}" y1="${ly(0.5)}" x2="${lx(H)}" y2="${Y0}" stroke="${C.amber}" stroke-width="5" opacity="0"/>
        <circle class="pt" cx="${lx(H)}" cy="${ly(0.5)}" r="16" fill="${C.amber}" opacity="0"/></svg>`);
    const yl = add(r, `<div class="abs mono" style="left:110px;top:400px;font-size:24px;font-weight:700;color:${C.cyan};letter-spacing:.06em">ÉXITO DE LA IA</div>`);
    const xl = add(r, `<div class="abs" style="left:110px;right:110px;top:1040px;display:flex;align-items:center;justify-content:center;gap:16px">
        <svg width="54" height="54" viewBox="0 0 64 64" fill="none" stroke="${C.ink}" stroke-width="5"><circle cx="32" cy="20" r="11"/><path d="M12 58c0-12 9-20 20-20s20 8 20 20"/></svg>
        <span class="mono" style="font-size:25px;font-weight:700;color:${C.ink};letter-spacing:.04em">DURACIÓN = TIEMPO DE UNA PERSONA EXPERTA</span></div>`);
    const tag = add(r, `<div class="abs display" style="left:${lx(H) + 24}px;top:${ly(0.5) - 96}px;font-size:46px;font-weight:700;color:${C.amber}">HORIZONTE</div>`);
    const title = add(r, `<div class="abs" style="left:0;right:0;top:318px;text-align:center;font-size:28px">${pill('METR · HORIZONTE TEMPORAL', C.ink)}</div>`);
    const tM = x.at('metr'), tP = x.at('persona'), tC = x.at('completa'), tMi = x.at('mitad');
    x.cue(tM, 'pop', 0.5); x.cue(tP, 'pop', 0.5); x.cue(tMi, 'ding', 0.8);
    return (lt) => {
      popIn(title, lt, tM - 0.3, 0.7);
      svg.style.opacity = appear(lt, 0, 0.3);
      yl.style.opacity = appear(lt, 0.2, 0.3);
      svg.querySelector('.curve').setAttribute('stroke-dashoffset', 1 - Ease.inOutCubic(prog(lt, tC - 0.6, 1.0)));
      popIn(xl, lt, tP - 0.1, 0.7);
      const h = appear(lt, tMi - 0.2, 0.3);
      svg.querySelector('.half').setAttribute('opacity', h);
      const p2 = spring(lt, tMi + 0.1, 0.4);
      svg.querySelector('.pt').setAttribute('opacity', p2 > 0 ? 1 : 0);
      svg.querySelector('.pt').setAttribute('r', 16 * p2);
      svg.querySelector('.drop').setAttribute('opacity', appear(lt, tMi + 0.2, 0.3));
      popIn(tag, lt, tMi + 0.2, 0.5);
    };
  });

  // ───────────────────────── 3 · CURVA: ×2 cada ~7 meses (y ~4 desde 2023) ─────────────────────────
  scene('curva', (x) => {
    const r = x.root;
    const pts = [ // [año decimal, minutos, etiqueta]  — modelos SOTA en el archivo de METR
      [2019.12, 0.054, 'GPT-2'], [2020.41, 0.144], [2022.2, 0.60], [2023.2, 3.99, 'GPT-4'], [2024.36, 6.99], [2024.47, 11.4],
      [2024.7, 20.3], [2024.93, 38.8], [2025.15, 60.4, 'Claude 3.7 Sonnet'], [2025.29, 119.7], [2025.6, 203],
      [2025.9, 293], [2025.95, 352], [2026.1, 718.8, 'Claude Opus 4.6']];
    const X0 = 170, X1 = 920, Y0 = 1010, Y1 = 420;
    const lx = (y) => lerp(X0, X1, (y - 2019) / (2026.5 - 2019));
    const lmin = Math.log10(1 / 60), lmax = Math.log10(1440);
    const ly = (m) => lerp(Y0, Y1, (Math.log10(m) - lmin) / (lmax - lmin));
    const yt = [[1 / 60, '1 s'], [1, '1 min'], [60, '1 h'], [1440, '1 día']];
    const xt = [2019, 2021, 2023, 2025];
    const P = (i) => [lx(pts[i][0]), ly(pts[i][1])];
    const ext = (a, b, y) => { const [x1, y1] = P(a), [x2, y2] = P(b); const k = (lx(y) - x1) / (x2 - x1); return [lx(y), y1 + (y2 - y1) * k]; };
    const [aS, aE] = [P(0), ext(0, 3, 2024.2)];
    const [bS, bE] = [P(3), ext(3, 13, 2026.4)];
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        ${yt.map(([m, t]) => `<line x1="${X0}" y1="${ly(m)}" x2="${X1}" y2="${ly(m)}" stroke="${C.line}" stroke-width="2"/><text x="${X0 - 14}" y="${ly(m) + 8}" text-anchor="end" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="${C.muted}">${t}</text>`).join('')}
        ${xt.map((y) => `<text x="${lx(y)}" y="${Y0 + 44}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="${C.muted}">${y}</text>`).join('')}
        <line class="tA" x1="${aS[0]}" y1="${aS[1]}" x2="${aE[0]}" y2="${aE[1]}" stroke="${C.cyan}" stroke-width="6" stroke-dasharray="16 12" opacity="0"/>
        <line class="tB" x1="${bS[0]}" y1="${bS[1]}" x2="${bE[0]}" y2="${bE[1]}" stroke="${C.amber}" stroke-width="7" stroke-dasharray="16 12" opacity="0"/>
        ${pts.map((p, i) => `<circle class="p" cx="${P(i)[0]}" cy="${P(i)[1]}" r="${p[2] ? 13 : 9}" fill="${p[2] ? C.ink : C.sky}" opacity="0"/>`).join('')}</svg>`);
    const labels = pts.map((p, i) => p[2] ? add(r, `<div class="abs mono" style="left:${P(i)[0] + ({ 0: 18, 3: -225, 8: -330, 13: -300 })[i]}px;top:${P(i)[1] + ({ 0: -40, 3: -12, 8: -14, 13: -52 })[i]}px;font-size:22px;font-weight:700;color:${C.ink};white-space:nowrap">${p[2]} · ${fmtMin(p[1])}</div>`) : null);
    const lA = add(r, `<div class="abs" style="left:150px;top:330px;font-size:26px">${pill('×2 CADA ~7 MESES', C.cyan)}</div>`);
    const lB = add(r, `<div class="abs" style="left:555px;top:330px;font-size:26px">${pill('DESDE 2023: ~4', C.amber)}</div>`);
    const src = add(r, `<div class="abs mono" style="left:110px;top:1100px;font-size:20px;font-weight:500;color:${C.faint}">${SRC} · escala logarítmica</div>`);
    const tD = x.at('duplica'), tS = x.at('siete'), t23 = x.at('2023'), t4 = x.at('cuatro');
    pts.forEach((_, i) => x.cue(lerp(tD - 0.6, t23, i / (pts.length - 1)), 'tick', 0.3));
    x.cue(tS, 'swipe', 0.6); x.cue(t4, 'rise', 0.6); x.cue(t4 + 0.4, 'stamp', 0.7);
    return (lt) => {
      svg.style.opacity = appear(lt, 0, 0.3);
      const cs = svg.querySelectorAll('.p');
      pts.forEach((p, i) => {
        const t = lerp(tD - 0.6, t23, i / (pts.length - 1));
        const s = spring(lt, t, 0.35);
        cs[i].setAttribute('opacity', s > 0 ? 1 : 0);
        cs[i].setAttribute('r', (p[2] ? 13 : 9) * s);
        if (labels[i]) labels[i].style.opacity = appear(lt, t + 0.1, 0.3);
      });
      svg.querySelector('.tA').setAttribute('opacity', appear(lt, tS - 0.1, 0.4) * (lt > t23 ? 0.5 : 1));
      svg.querySelector('.tB').setAttribute('opacity', appear(lt, t4 - 0.1, 0.4));
      popIn(lA, lt, tS - 0.1, 0.6); popIn(lB, lt, t4, 0.6);
      src.style.opacity = appear(lt, 0.4, 0.4);
    };
  });

  // ───────────────────────── 4 · LA JORNADA: reloj de 24 h ─────────────────────────
  scene('jornada', (x) => {
    const r = x.root;
    const R = 280, CX = 540, CY = 725, CIRC = 2 * Math.PI * R;
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${C.line}" stroke-width="44"/>
        <circle class="arc" cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${C.cyan}" stroke-width="44" stroke-dasharray="0 ${CIRC}" transform="rotate(-90 ${CX} ${CY})"/>
        ${[6, 12, 18].map((hh) => { const a = hh / 24 * 2 * Math.PI; return `<text x="${CX + Math.sin(a) * (R + 56)}" y="${CY - Math.cos(a) * (R + 56) + 9}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="26" fill="${C.muted}">${hh}h</text>`; }).join('')}
        <circle class="tip" r="18" fill="${C.ink}"/></svg>`);
    const v = add(r, `<div class="abs display" style="left:${CX - 240}px;width:480px;top:${CY - 110}px;text-align:center;font-size:130px;font-weight:700;color:${C.ink};line-height:1">3 s</div>`);
    const who = add(r, `<div class="abs mono" style="left:${CX - 240}px;width:480px;top:${CY + 40}px;text-align:center;font-size:26px;font-weight:700;color:${C.muted};line-height:1.4">GPT-2<br>2019</div>`);
    const head = add(r, `<div class="abs" style="left:0;right:0;top:318px;text-align:center;font-size:26px">${pill('LA JORNADA DE LA IA · DE 24 H', C.ink)}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1112px;text-align:center;font-size:20px;font-weight:500;color:${C.faint}">${SRC} · éxito del 50%</div>`);
    const steps = [
      [x.at('gpt2'), 0.054, 'GPT-2<br>2019'], [x.at('gpt4'), 3.99, 'GPT-4<br>2023'],
      [x.at('hora'), 60.4, 'Claude 3.7 Sonnet<br>febrero 2025'], [x.at('doce'), 718.8, 'Claude Opus 4.6<br>febrero 2026'],
    ];
    steps.forEach(([t], i) => x.cue(t, i === 3 ? 'stamp' : 'pop', i === 3 ? 0.9 : 0.6));
    x.shake(steps[3][0], 16);
    return (lt) => {
      popIn(head, lt, -0.2, 0.7);
      svg.style.opacity = appear(lt, 0, 0.3);
      let i = 0; steps.forEach(([t], j) => { if (lt >= t - 0.05) i = j; });
      const [t, m, label] = steps[i];
      const prev = i ? steps[i - 1][1] : 0.054;
      const k = Ease.outCubic(prog(lt, t - 0.05, 0.6));
      const mm = Math.pow(10, lerp(Math.log10(prev), Math.log10(m), k));
      const frac = Math.max(0.004, mm / 1440);
      svg.querySelector('.arc').setAttribute('stroke-dasharray', `${CIRC * frac} ${CIRC}`);
      svg.querySelector('.arc').setAttribute('stroke', i === 3 ? C.amber : C.cyan);
      const a = frac * 2 * Math.PI;
      svg.querySelector('.tip').setAttribute('cx', CX + Math.sin(a) * R); svg.querySelector('.tip').setAttribute('cy', CY - Math.cos(a) * R);
      v.textContent = k >= 1 ? fmtMin(m) : fmtMin(mm);
      v.style.color = i === 3 ? C.amber : C.ink;
      who.innerHTML = label;
      src.style.opacity = appear(lt, 0.5, 0.4);
    };
  });

  // ───────────────────────── 5 · LETRA PEQUEÑA: 50 % vs 80 % ─────────────────────────
  scene('letra', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:330px;display:flex;justify-content:center;align-items:center;gap:18px">
        <div style="width:70px;height:70px;color:${C.amber}">${I.search}</div><span class="display" style="font-size:64px;font-weight:700;color:${C.amber}">LETRA PEQUEÑA</span></div>`);
    const model = add(r, `<div class="abs mono" style="left:0;right:0;top:450px;text-align:center;font-size:26px;font-weight:700;color:${C.muted}">mismo modelo · Claude Opus 4.6</div>`);
    const bar = (top, label, color) => add(r, `<div class="abs" style="left:110px;width:860px;top:${top}px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">
          <span class="display" style="font-size:40px;font-weight:700;color:${C.ink}">${label}</span>
          <span class="val display" style="font-size:72px;font-weight:700;color:${color}"></span></div>
        <div style="height:56px;border-radius:16px;background:${C.line};overflow:hidden"><div class="fill" style="height:100%;width:0;border-radius:16px;background:${color};box-shadow:0 0 30px ${color}"></div></div></div>`);
    const A = bar(560, 'Acertando el 50%', C.cyan);
    const B = bar(800, 'Acertando el 80%', C.amber);
    const src = add(r, `<div class="abs mono" style="left:110px;top:1040px;font-size:20px;font-weight:500;color:${C.faint}">${SRC} · 12,0 h vs 70 min</div>`);
    const tO = x.at('ojo'), tMi = x.at('mitad'), t80 = x.at('80'), tB = x.at('baja');
    x.cue(tO, 'swipe', 0.6); x.cue(tMi, 'ding', 0.6); x.cue(tB, 'buzz', 0.5); x.shake(tB, 10, 6);
    return (lt) => {
      popIn(head, lt, tO - 0.15, 0.6);
      model.style.opacity = appear(lt, tO + 0.3, 0.3);
      const ka = Ease.outCubic(prog(lt, tMi - 0.2, 0.7));
      A.style.opacity = appear(lt, tMi - 0.3, 0.3);
      A.querySelector('.fill').style.width = 100 * ka + '%';
      A.querySelector('.val').textContent = ka > 0 ? fmtMin(lerp(1, 718.8, ka)).replace('12 h', '12 h') : '';
      B.style.opacity = appear(lt, t80 - 0.2, 0.3);
      const kb = Ease.inOutCubic(prog(lt, tB - 0.1, 0.8));
      const wB = lerp(100, 69.9 / 718.8 * 100, kb);
      B.querySelector('.fill').style.width = (lt > t80 ? wB : 0) + '%';
      B.querySelector('.val').textContent = lt > t80 ? (kb >= 1 ? '70 min' : fmtMin(lerp(718.8, 69.9, kb))) : '';
      src.style.opacity = appear(lt, tB + 0.4, 0.4);
    };
  });

  // ───────────────────────── 6 · MARGEN: tareas limpias y error enorme ─────────────────────────
  scene('margen', (x) => {
    const r = x.root;
    const card = (left, title, color, body) => add(r, `<div class="abs" style="left:${left}px;top:330px;width:400px;height:300px;border-radius:30px;background:${C.surface};border:3px solid ${color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
        ${body}<div class="display" style="font-size:36px;font-weight:700;color:${C.ink};text-align:center;line-height:1.1">${title}</div></div>`);
    const neat = `<svg width="170" height="120" viewBox="0 0 170 120">${Array.from({ length: 12 }, (_, i) => `<rect x="${(i % 4) * 44}" y="${Math.floor(i / 4) * 42}" width="34" height="32" rx="7" fill="${C.cyan}" opacity=".8"/>`).join('')}</svg>`;
    const messy = `<svg width="170" height="120" viewBox="0 0 170 120" fill="none" stroke="${C.amber}" stroke-width="7" stroke-linecap="round"><path d="M10 80 C 30 10, 60 110, 85 50 S 130 0, 160 70"/><path d="M20 30 L 60 40 L 40 100"/><circle cx="125" cy="95" r="16"/><path d="M95 20 l 20 14 l -8 20"/></svg>`;
    const A = card(110, 'Tareas de software<br>de test', C.cyan, neat);
    const B = card(570, 'Trabajo real<br>(más “desordenado”)', C.amber, messy);
    const neq = add(r, `<div class="abs display" style="left:510px;width:60px;top:430px;text-align:center;font-size:80px;font-weight:700;color:${C.muted}">≠</div>`);
    const X0 = 150, X1 = 930, Y = 860;
    const lx = (h) => lerp(X0, X1, (Math.log10(h) - Math.log10(1)) / (Math.log10(100) - Math.log10(1)));
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="${C.lineStrong}" stroke-width="4"/>
        ${[[1, '1 h'], [10, '10 h'], [100, '100 h']].map(([h, t]) => `<line x1="${lx(h)}" y1="${Y - 10}" x2="${lx(h)}" y2="${Y + 10}" stroke="${C.muted}" stroke-width="3"/><text x="${lx(h)}" y="${Y + 50}" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="24" fill="${C.muted}">${t}</text>`).join('')}
        <g class="ci" opacity="0"><line x1="${lx(5.3)}" y1="${Y - 70}" x2="${lx(60.6)}" y2="${Y - 70}" stroke="${C.amber}" stroke-width="12" stroke-linecap="round"/>
          <line x1="${lx(5.3)}" y1="${Y - 100}" x2="${lx(5.3)}" y2="${Y - 40}" stroke="${C.amber}" stroke-width="8" stroke-linecap="round"/>
          <line x1="${lx(60.6)}" y1="${Y - 100}" x2="${lx(60.6)}" y2="${Y - 40}" stroke="${C.amber}" stroke-width="8" stroke-linecap="round"/></g>
        <circle class="pt" cx="${lx(12)}" cy="${Y - 70}" r="22" fill="${C.ink}" opacity="0"/></svg>`);
    const lbl = (h, t, color, dy) => add(r, `<div class="abs display" style="left:${lx(h) - 90}px;width:180px;top:${Y - 70 + dy}px;text-align:center;font-size:44px;font-weight:700;color:${color}">${t}</div>`);
    const l5 = lbl(5.3, '5 h', C.amber, -110), l12 = lbl(12, '12 h', C.ink, -150), l60 = lbl(60.6, '60 h', C.amber, -110);
    const cap = add(r, `<div class="abs mono" style="left:0;right:0;top:965px;text-align:center;font-size:24px;font-weight:700;color:${C.muted}">INTERVALO DE CONFIANZA 95% · ${SRC.replace('Datos: ', '')}</div>`);
    const tS = x.at('software'), tL = x.at('limpias'), tM = x.at('margen'), t5 = x.at('5');
    x.cue(tS, 'pop', 0.5); x.cue(tL, 'pop', 0.5); x.cue(tM, 'swipe', 0.6); x.cue(t5, 'stamp', 0.8); x.shake(t5, 12);
    return (lt) => {
      popIn(A, lt, tS - 0.2, 0.6); popIn(B, lt, tL - 0.1, 0.6); neq.style.opacity = appear(lt, tL + 0.2, 0.3);
      svg.style.opacity = appear(lt, tM - 0.4, 0.3);
      const p = spring(lt, tM - 0.1, 0.4); svg.querySelector('.pt').setAttribute('opacity', p > 0 ? 1 : 0);
      l12.style.opacity = appear(lt, tM, 0.3);
      const ci = Ease.outBack(prog(lt, t5 - 0.05, 0.45));
      const g = svg.querySelector('.ci'); g.setAttribute('opacity', ci > 0 ? 1 : 0);
      g.style.transformOrigin = `${lx(12)}px ${Y - 70}px`; g.style.transform = `scaleX(${Math.max(0.01, ci)})`;
      l5.style.opacity = l60.style.opacity = appear(lt, t5 + 0.2, 0.3);
      cap.style.opacity = appear(lt, t5 + 0.3, 0.4);
    };
  });

  // ───────────────────────── 7 · LA PREGUNTA ÚTIL ─────────────────────────
  scene('pregunta', (x) => {
    const r = x.root;
    const old = add(r, `<div class="abs display" style="left:110px;width:860px;top:350px;text-align:center;font-size:56px;font-weight:700;color:${C.ink};line-height:1.15">¿La IA puede hacer<br>mi trabajo?</div>`);
    const strike = add(r, `<svg class="abs" width="1080" height="200" style="left:0;top:350px"><line x1="150" y1="120" x2="930" y2="40" stroke="${C.red}" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const chip = (top, txt, color) => add(r, `<div class="abs display" style="left:160px;width:760px;top:${top}px;height:130px;border-radius:30px;border:4px solid ${color};background:${C.surface2};display:flex;align-items:center;justify-content:center;font-size:54px;font-weight:700;color:${C.ink};box-shadow:0 0 50px ${color}33">${txt}</div>`);
    const c1 = chip(590, '¿Qué tareas?', C.cyan), c2 = chip(750, '¿De cuántas horas?', C.blue), c3 = chip(910, '¿Con qué fiabilidad?', C.amber);
    const tP = x.at('preguntes'), tS = x.at('sino'), tT = x.at('tareas'), tC = x.at('cuantas'), tF = x.at('fiabilidad');
    x.cue(tS, 'swipe', 0.7); [tT, tC, tF].forEach((t) => x.cue(t, 'pop', 0.6));
    return (lt) => {
      popIn(old, lt, tP - 0.4, 0.8);
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tS - 0.1, 0.3)));
      old.style.color = lt > tS ? C.faint : C.ink;
      popIn(c1, lt, tT - 0.1, 0.6); popIn(c2, lt, tC - 0.1, 0.6); popIn(c3, lt, tF - 0.1, 0.6);
    };
  });

  // ───────────────────────── 8 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const sw = add(r, `<div class="abs" style="left:430px;top:320px;width:220px;height:242px">${stopwatch(220)}</div>`);
    const l1 = popText(r, 'EL INSTRUMENTO<br>CORRECTO', `top:610px;font-size:100px;line-height:1.02;color:${C.cyan};text-shadow:0 0 50px rgba(34,211,238,.5)`);
    const l2 = add(r, `<div class="abs mono" style="left:0;right:0;top:840px;text-align:center;font-size:40px;font-weight:700;letter-spacing:.12em;color:${C.muted}">PERO</div>`);
    const l3 = popText(r, 'NO ES UN VEREDICTO', `top:895px;font-size:92px;color:${C.amber};text-shadow:0 0 60px rgba(245,158,11,.6)`);
    const tCr = x.at('cronometro'), tCo = x.at('correcto'), tV = x.at('veredicto');
    x.cue(tCo, 'ding', 0.7); x.cue(tV - 0.15, 'rise', 0.6); x.cue(tV, 'boom', 1); x.shake(tV, 24);
    return (lt) => {
      popIn(sw, lt, tCr - 0.3, 0.5);
      sw.querySelector('.hand').setAttribute('transform', `rotate(${(lt * 240) % 360} 200 250)`);
      popIn(l1, lt, tCo - 0.15, 0.7);
      l2.style.opacity = appear(lt, tV - 0.6, 0.3);
      const s = spring(lt, tV - 0.05, 0.5);
      l3.style.opacity = s > 0 ? 1 : 0; l3.style.transform = `scale(${lerp(1.8, 1, s)})`;
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['articles.santismm.com'], sub: '“El cronómetro y el examen” · datos de METR' }));
})();
