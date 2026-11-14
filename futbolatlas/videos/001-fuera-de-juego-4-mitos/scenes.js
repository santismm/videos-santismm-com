/* FÚTBOL ATLAS #01 · "4 mitos del fuera de juego"
 * Fuente: futbolatlas.app/k/offside-misconceptions y /k/how-offside-actually-works (Regla 11, Reglas de Juego
 * 2026/27 de The IFAB; verificado en la web el 2026-08-08):
 *  - En línea con el penúltimo adversario (o con los dos últimos) NO es posición de fuera de juego.
 *  - Manos y brazos de todos los jugadores, porteros incluidos, no se tienen en cuenta.
 *  - La posición se juzga cuando un compañero juega o toca el balón, no cuando se recibe.
 *  - Estar en posición de fuera de juego no es infracción: hace falta participar en el juego activo.
 *  - No hay infracción si el balón se recibe directamente de saque de meta, de banda o de esquina.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pitch, token, ball, offsideLine, tag, myth, stamp, verdict, flagSvg, endCard } = EUREKA.fa;

  EUREKA.video = { footer: 'Regla 11 · IFAB 2026/27 · futbolatlas.app', keywords: ['falso', 'tampoco', 'legal', 'nunca', 'existen', 'igual', 'participar', 'extra'] };
  const PY = 520, PH = 490;
  const show = (el, k) => { el.style.opacity = k; };
  const pop = (el, lt, t, from = 0.5, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };

  // ───────────────────────── 1 · GANCHO ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const flag = add(r, `<div class="abs" style="left:420px;top:300px;width:250px;height:300px;transform-origin:20px 290px">${flagSvg}</div>`);
    const cloth = flag.querySelector('.cloth');
    const title = add(r, `<div class="abs display" style="left:0;right:0;top:600px;text-align:center;font-size:128px;line-height:.98;font-weight:700;color:${C.ink}">Fuera<br><span style="font-style:italic;color:${C.cyan}">de juego</span></div>`);
    const chips = ['«Estaba en línea»', '«Tenía el brazo»', '«Recibió solo»', '«Estar ahí ya es falta»'].map((q, i) =>
      add(r, `<div class="abs display" style="left:${i % 2 ? 525 : 95}px;top:${890 + Math.floor(i / 2) * 120}px;width:400px;height:96px;border-radius:18px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:36px;font-style:italic;font-weight:600;color:${C.ink}">
        <span style="background-image:linear-gradient(${C.red},${C.red});background-repeat:no-repeat;background-position:0 55%;background-size:0% 5px">${q}</span></div>`));
    const st = stamp(r, 'No existen', { x: 255, y: 930, size: 92 });
    const tC = x.at('cuatro'), tN = x.at('no');
    x.cue(0.02, 'whistle', 0.9);
    chips.forEach((_, i) => x.cue(tC + i * 0.13, 'pop', 0.6));
    x.cue(tN + 0.05, 'stamp', 1); x.shake(tN + 0.05, 16);
    return (lt) => {
      const up = Ease.outBack(prog(lt, 0, 0.45));
      flag.style.transform = `rotate(${8 + Math.sin(lt * 5) * 2}deg) scale(${lerp(0.75, 1, up)})`;
      cloth.style.transform = `skewY(${Math.sin(lt * 9) * 5}deg)`;
      title.style.transform = `scale(${lerp(1.12, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`;
      chips.forEach((c, i) => {
        const s = pop(c, lt, tC + i * 0.13 - 0.05);
        c.style.transform = `scale(${lerp(0.5, 1, s)}) rotate(${(i % 2 ? 1 : -1) * 1.5}deg)`;
        c.firstElementChild.style.backgroundSize = `${Ease.outCubic(prog(lt, tN - 0.05 + i * 0.04, 0.25)) * 100}% 5px`;
      });
      st.set(lt, tN + 0.05);
    };
  });

  // ───────────────────────── 2 · MITO 1: en línea ─────────────────────────
  scene('mito1', (x) => {
    const r = x.root;
    const m = myth(x, 1, 4, 'Estaba en línea: fuera de juego');
    const p = pitch(r, { y: PY, h: PH });
    const line = offsideLine(p, 20);
    const defs = [[12, 23], [30, 20], [46, 22.5], [58, 24]].map(([a, b]) => { const t = token(p, 'def'); t.at(a, b); return t; });
    const gk = token(p, 'gk'); gk.at(34, 2.6);
    const passer = token(p, 'atk', '8'); passer.at(22, 33);
    const nine = token(p, 'atk', '9');
    const b = ball(p);
    const ring = add(p.items, `<div class="abs" style="left:${30 * p.s - 42}px;top:${20 * p.s - 42}px;width:84px;height:84px;border-radius:50%;border:5px solid ${C.amber}"></div>`);
    const tg = tag(p, 30, 20, 'PENÚLTIMO RIVAL', C.amber, -78);
    const tg2 = tag(p, 34, 2.6, 'ÚLTIMO', C.muted, 34);
    const st = stamp(r, 'Falso', { x: 590, y: 292, size: 60 });
    const v = verdict(r, 'EN LÍNEA = POSICIÓN LEGAL');
    const tL = x.at('linea'), tF = x.at('falso'), tP = x.at('penultimo'), tV = x.at('legal');
    x.cue(tL, 'swipe', 0.7); x.cue(tF, 'stamp', 1); x.shake(tF, 14); x.cue(tP, 'pop', 0.7);
    x.cue(tV, 'ding', 0.9); x.cue(tV + 0.45, 'kick', 0.9);
    return (lt) => {
      m.update(lt, tF);
      line.set(Ease.outCubic(prog(lt, tL, 0.5)));
      st.set(lt, tF);
      const s = pop(ring, lt, tP - 0.1); ring.style.transform = `scale(${lerp(1.8, 1, s) * (1 + 0.06 * Math.sin(lt * 8))})`;
      tg.style.opacity = appear(lt, tP, 0.3); tg2.style.opacity = appear(lt, tP + 0.5, 0.3);
      v.set(lt, tV);
      const u = Ease.inOutCubic(prog(lt, tV + 0.45, 1.3));
      nine.at(40 - 3 * u, 20 - 9 * u, 1 + 0.08 * Math.sin(lt * 6) * (lt < tF ? 1 : 0));
      b.at(lerp(23.5, 37.5, u), lerp(31.5, 9.3, u));
    };
  });

  // ───────────────────────── 3 · MITO 2: el brazo ─────────────────────────
  scene('mito2', (x) => {
    const r = x.root;
    const m = myth(x, 2, 4, 'Tenía el brazo adelantado');
    const W = 840, H = PH, G = 440, LX = 540;
    const fig = (cx, col, reach, id) => {
      const sw = `stroke="${col}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
      return `<g id="${id}">
        <path class="arm" d="M${cx} ${G - 268} L${cx - 62} ${G - 200}" ${sw} stroke-width="24"/>
        <path d="M${cx - 8} ${G - 170} L${cx - 52} ${G - 86} L${cx - 96} ${G - 22}" ${sw} stroke-width="30"/>
        <path d="M${cx - 8} ${G - 170} L${cx + 44} ${G - 96} L${cx + 30} ${G - 14}" ${sw} stroke-width="30"/>
        <path d="M${cx + 4} ${G - 282} L${cx - 8} ${G - 176}" ${sw} stroke-width="52"/>
        <circle cx="${cx + 14}" cy="${G - 338}" r="32" fill="${col}"/>
        <path class="arm" d="M${cx + 4} ${G - 270} L${cx + reach} ${G - 246}" ${sw} stroke-width="24"/></g>`;
    };
    const panel = add(r, `<div class="abs" style="left:90px;top:${PY}px;width:${W}px;height:${H}px;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${C.lineStrong};background:linear-gradient(180deg, #10201a 0%, #123222 ${G - 10}px, ${C.pitchAlt} ${G - 10}px)">
      <svg class="abs" viewBox="0 0 ${W} ${H}" style="inset:0;width:100%;height:100%">
        <text x="${W - 24}" y="44" text-anchor="end" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="${C.muted}" letter-spacing="2">PORTERÍA →</text>
        <text x="24" y="44" font-family="JetBrains Mono" font-weight="700" font-size="22" fill="${C.muted}" letter-spacing="2">VISTA LATERAL</text>
        ${fig(250, C.cyan, 330, 'atk')}${fig(478, '#ffffff', 58, 'def')}
        <line id="ol" x1="${LX}" y1="60" x2="${LX}" y2="${H}" stroke="${C.amber}" stroke-width="6" stroke-dasharray="20 13"/>
        <g id="hl" fill="none" stroke="${C.cyan}" stroke-width="5">
          <circle cx="264" cy="${G - 338}" r="48"/><rect x="204" y="${G - 300}" width="86" height="140" rx="28"/><rect x="140" y="${G - 46}" width="170" height="52" rx="22"/></g>
      </svg></div>`);
    const q = (s) => panel.querySelector(s);
    const arms = [...panel.querySelectorAll('.arm')], hl = [...q('#hl').children];
    const lab = (txt, left, top, col) => add(panel, `<div class="abs mono" style="left:${left}px;top:${top}px;white-space:nowrap;padding:6px 14px;border-radius:10px;background:rgba(18,20,20,.92);border:2px solid ${col};color:${col};font-size:21px;font-weight:700;letter-spacing:.05em">${txt}</div>`);
    const lArm = lab('¿FUERA DE JUEGO?', 500, 120, C.red), lNo = lab('NO CUENTA', 560, 120, C.muted);
    const parts = [lab('CABEZA ✓', 40, 70, C.cyan), lab('CUERPO ✓', 30, 200, C.cyan), lab('PIES ✓', 20, 350, C.cyan)];
    const st = stamp(r, 'Tampoco', { x: 540, y: 292, size: 60 });
    const v = verdict(r, 'BRAZOS Y MANOS NO CUENTAN', { size: 48 });
    const tB = x.at('brazo'), tT = x.at('tampoco'), tM = x.at('manos'), tCa = x.at('cabeza'), tCu = x.at('cuerpo'), tPi = x.at('pies');
    x.cue(tB, 'swipe', 0.6); x.cue(tT, 'stamp', 1); x.shake(tT, 14); x.cue(tM, 'buzz', 0.5);
    [tCa, tCu, tPi].forEach((t) => x.cue(t, 'pop', 0.7)); x.cue(tPi + 0.45, 'ding', 0.9);
    return (lt) => {
      m.update(lt, tT);
      q('#ol').style.opacity = appear(lt, 0.5, 0.3);
      q('#atk').style.transform = `translateX(${(1 - Ease.outCubic(prog(lt, 0.3, 0.6))) * -200}px)`;
      const off = prog(lt, tM, 0.3);
      lArm.style.opacity = appear(lt, tB, 0.25) * (1 - off);
      lNo.style.opacity = off;
      arms.forEach((a) => { a.style.opacity = lerp(1, 0.32, off); a.setAttribute('stroke-dasharray', off > 0.5 ? '4 30' : 'none'); });
      [tCa, tCu, tPi].forEach((t, i) => {
        const s = spring(lt, t - 0.05, 0.35);
        hl[i].style.opacity = s > 0 ? 1 : 0; parts[i].style.opacity = s > 0 ? 1 : 0;
        parts[i].style.transform = `scale(${lerp(0.5, 1, s)})`;
      });
      st.set(lt, tT);
      v.set(lt, tPi + 0.45);
    };
  });

  // ───────────────────────── 4 · MITO 3: el momento ─────────────────────────
  scene('mito3', (x) => {
    const r = x.root;
    const m = myth(x, 3, 4, 'Cuando recibió estaba solo');
    const p = pitch(r, { y: PY, h: PH });
    const line = offsideLine(p, 20, C.cyan, 'LÍNEA AL PASE');
    const defs = [[12, 23], [30, 20], [46, 22.5], [58, 24]].map(([a, b]) => { const t = token(p, 'def'); t.at(a, b); return t; });
    const gk = token(p, 'gk'); gk.at(34, 2.6);
    const passer = token(p, 'atk', '8'); passer.at(22, 33);
    const ghost = add(p.items, `<div class="abs" style="left:${41 * p.s - 30}px;top:${21 * p.s - 30}px;width:60px;height:60px;border-radius:50%;border:5px dashed ${C.cyan};background:rgba(202,243,0,.15)"></div>`);
    const gTag = tag(p, 41, 21, 'AL PASE: POSICIÓN LEGAL ✓', C.cyan, 40);
    const nine = token(p, 'atk', '9');
    const b = ball(p);
    const solo = tag(p, 37, 8, '¡SOLO!', C.red, -66);
    const flash = add(p.el, `<div class="abs" style="inset:0;background:#fff;pointer-events:none"></div>`);
    const cam = add(r, `<div class="abs caption" style="left:640px;top:${PY + 18}px;padding:8px 20px;border-radius:12px;background:#fff;color:#121414;font-size:30px;font-weight:900;letter-spacing:.06em">📸 FOTO</div>`);
    const st = stamp(r, 'Da igual', { x: 530, y: 292, size: 60 });
    const v = verdict(r, 'CUENTA EL PASE,<br>NO LA RECEPCIÓN', { size: 46 });
    const tA = x.at('cuando') - 0.25, tD = x.at('da'), tFo = x.at('foto'), tTo = x.at('toca'), tN = x.at('no'), tV = x.at('llega');
    x.cue(tA, 'kick', 0.9); x.cue(tD, 'stamp', 1); x.shake(tD, 14);
    x.cue(tFo - 0.3, 'swipe', 0.7); x.cue(tFo, 'shutter', 1); x.cue(tTo, 'pop', 0.6); x.cue(tN, 'kick', 0.9); x.cue(tV, 'ding', 0.9);
    return (lt) => {
      m.update(lt, tD);
      let u;
      if (lt < tFo - 0.35) u = prog(lt, tA, 1.3);
      else if (lt < tN) u = 1 - Ease.inOutCubic(prog(lt, tFo - 0.35, 0.3));
      else u = prog(lt, tN, 1.3);
      const e = Ease.inOutCubic(u);
      nine.at(lerp(41, 37, e), lerp(21, 8, e));
      b.at(lerp(23.5, 37.6, Math.pow(u, 0.8)), lerp(31.5, 9.8, Math.pow(u, 0.8)));
      defs.forEach((d, i) => d.at([12, 30, 46, 58][i], [23, 20, 22.5, 24][i] - 1.5 * e));
      solo.style.opacity = u > 0.9 && lt < tFo - 0.35 ? 1 : 0;
      const f = lt >= tFo ? 1 : 0;
      flash.style.opacity = lt >= tFo ? Math.max(0, 0.85 - (lt - tFo) * 3.2) : 0;
      ghost.style.opacity = f; line.set(f ? Ease.outCubic(prog(lt, tFo, 0.4)) : 0);
      gTag.style.opacity = appear(lt, tTo, 0.25);
      const cs = spring(lt, tFo, 0.35); cam.style.opacity = cs > 0 ? 1 : 0; cam.style.transform = `scale(${lerp(0.4, 1, cs)}) rotate(4deg)`;
      st.set(lt, tD);
      v.set(lt, tV);
    };
  });

  // ───────────────────────── 5 · MITO 4: posición ≠ infracción ─────────────────────────
  scene('mito4', (x) => {
    const r = x.root;
    const m = myth(x, 4, 4, 'Estar en fuera de juego ya es falta');
    const p = pitch(r, { y: PY, h: PH });
    const line = offsideLine(p, 20);
    [[12, 23], [30, 20], [46, 22.5], [58, 24]].forEach(([a, b]) => token(p, 'def').at(a, b));
    token(p, 'gk').at(34, 2.6);
    const passer = token(p, 'atk', '8'); passer.at(32, 29.5);
    const seven = token(p, 'atk', '7');
    const nine = token(p, 'atk', '9'); nine.at(50, 11);
    const b = ball(p);
    const t9 = tag(p, 50, 11, 'EN POSICIÓN DE FUERA DE JUEGO', C.amber, -70);
    const t9b = tag(p, 50, 11, 'NO PARTICIPA', C.muted, 38);
    const chips = add(p.items, `<div class="abs mono" style="left:0;right:0;bottom:16px;display:flex;justify-content:center;gap:10px;font-size:19px;font-weight:700;letter-spacing:.03em">
      ${['JUGAR EL BALÓN', 'ESTORBAR A UN RIVAL', 'SACAR VENTAJA'].map((t) => `<span style="padding:7px 12px;border-radius:9px;background:rgba(18,20,20,.92);border:2px solid ${C.cyan};color:${C.cyan}">${t}</span>`).join('')}</div>`);
    const st = stamp(r, 'No', { x: 660, y: 292, size: 60 });
    const v = verdict(r, 'POSICIÓN ≠ INFRACCIÓN');
    const tE = x.at('estar'), tN = x.at('no'), tP = x.at('posicion'), tS = x.at('sanciona'), tPa = x.at('participar');
    x.cue(tE, 'swipe', 0.6); x.cue(tN, 'stamp', 1); x.shake(tN, 14); x.cue(tP, 'kick', 0.9);
    x.cue(tS, 'ding', 0.9); x.cue(tPa, 'pop', 0.7);
    return (lt) => {
      m.update(lt, tN);
      line.set(Ease.outCubic(prog(lt, 0.5, 0.5)));
      t9.style.opacity = appear(lt, tE, 0.3);
      st.set(lt, tN);
      const u = prog(lt, tP, 1.1), e = Ease.inOutCubic(u), d = Ease.inOutCubic(prog(lt, tP + 1.1, 1.6));
      seven.at(lerp(15, 13, e) + 7 * d, lerp(28, 27, e) - 0.5 * d);
      b.at(lerp(30.6, 15.4, e) + 7 * d, lerp(28.4, 25.2, e) - 0.5 * d);
      t9b.style.opacity = appear(lt, tP + 0.6, 0.3);
      v.set(lt, tS);
      const cs = spring(lt, tPa - 0.1, 0.4); chips.style.opacity = cs > 0 ? 1 : 0; chips.style.transform = `translateY(${(1 - cs) * 30}px)`;
    };
  });

  // ───────────────────────── 6 · EXTRA: saques sin fuera de juego ─────────────────────────
  scene('bonus', (x) => {
    const r = x.root;
    const L = `stroke="rgba(255,255,255,.75)" stroke-width="5" fill="none" stroke-linecap="round"`;
    const B = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="11" fill="#fff" stroke="#121414" stroke-width="3"/>`;
    const A = (d) => `<path d="${d}" stroke="${C.cyan}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    const icons = [
      `<path d="M20 10V130" ${L}/>${A('M34 70H110M92 52l18 18-18 18')}${B(20, 70)}`,
      `<path d="M10 124H130M30 124V70H110V124" ${L}/>${A('M70 84V20M52 38l18-18 18 18')}${B(70, 96)}`,
      `<path d="M16 10V124H130M16 96A28 28 0 0 1 44 124" ${L}/>${A('M34 106L104 36M80 34h26v26')}${B(16, 124)}`,
    ];
    const head = add(r, `<div class="abs mono" style="left:96px;top:318px;padding:10px 22px;border-radius:999px;background:${C.cyan};color:#121414;font-size:27px;font-weight:700;letter-spacing:.12em">EXTRA</div>`);
    const sub = add(r, `<div class="abs display" style="left:96px;top:382px;font-size:50px;font-weight:600;font-style:italic;color:${C.ink}">Si el balón te llega directo de…</div>`);
    const cards = ['Saque de banda', 'Saque de puerta', 'Córner'].map((t, i) => add(r, `<div class="abs" style="left:90px;width:840px;top:${480 + i * 180}px;height:156px;border-radius:24px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:28px;padding:0 28px;box-sizing:border-box">
        <svg viewBox="0 0 140 140" style="width:112px;height:112px;flex:none;background:${C.pitchAlt};border-radius:16px">${icons[i]}</svg>
        <div class="caption" style="font-size:54px;font-weight:800;color:${C.ink};flex:1">${t}</div>
        <div class="ok" style="width:76px;height:76px;border-radius:50%;background:${C.cyan};color:#121414;display:flex;align-items:center;justify-content:center"><div style="width:48px;height:48px">${I.check}</div></div></div>`));
    const v = verdict(r, 'NO HAY FUERA DE JUEGO', { top: 1030 });
    const ts = [x.at('banda'), x.at('puerta'), x.at('corner')], tN = x.at('no');
    ts.forEach((t) => x.cue(t - 0.1, 'pop', 0.7)); x.cue(tN, 'ding', 0.9); x.cue(0.1, 'swipe', 0.5);
    return (lt) => {
      const a = spring(lt, 0.05, 0.4); head.style.opacity = a > 0 ? 1 : 0; head.style.transform = `scale(${lerp(0.6, 1, a)})`; head.style.transformOrigin = '0 50%';
      sub.style.opacity = appear(lt, x.at('si') - 0.1, 0.35);
      cards.forEach((c, i) => {
        const s = pop(c, lt, ts[i] - 0.15); c.style.transform = `translateX(${(1 - s) * 120}px)`;
        const o = spring(lt, tN + i * 0.1, 0.35); const ok = c.querySelector('.ok'); ok.style.opacity = o > 0 ? 1 : 0; ok.style.transform = `scale(${lerp(0.3, 1, o)})`;
        c.style.borderColor = o > 0 ? C.cyan : C.lineStrong;
      });
      v.set(lt, tN + 0.15);
    };
  });

  // ───────────────────────── 7 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const a = add(r, `<div class="abs mono" style="left:0;right:0;top:340px;text-align:center;font-size:34px;font-weight:700;letter-spacing:.14em;color:${C.muted}">EL FUERA DE JUEGO NO ES SOLO</div>`);
    const b = add(r, `<div class="abs display" style="left:0;right:0;top:395px;text-align:center;font-size:104px;font-weight:700;color:${C.ink}"><span style="background-image:linear-gradient(${C.red},${C.red});background-repeat:no-repeat;background-position:0 58%;background-size:0% 8px">dónde estás</span></div>`);
    const rows = [['Cuándo', 'EN EL MOMENTO DEL PASE'], ['Con qué', 'CABEZA, CUERPO O PIES'], ['Qué haces', 'PARTICIPAR EN LA JUGADA']].map(([w, s], i) =>
      add(r, `<div class="abs" style="left:90px;width:840px;top:${580 + i * 185}px;height:160px;border-radius:24px;background:${C.surface};border-left:12px solid ${C.cyan};display:flex;flex-direction:column;justify-content:center;padding-left:40px;box-sizing:border-box">
        <div class="display" style="font-size:84px;font-weight:700;font-style:italic;color:${C.cyan};line-height:1">${w}</div>
        <div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.1em;color:${C.fg};margin-top:8px">${s}</div></div>`));
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1140px;text-align:center;font-size:23px;font-weight:500;color:${C.muted}">Regla 11 · Reglas de Juego 2026/27 (IFAB)</div>`);
    const tD = x.at('donde'), ts = [x.at('cuando'), x.at('con'), x.at('haces') - 0.25];
    x.cue(ts[0] - 0.5, 'rise', 0.6); ts.forEach((t, i) => x.cue(t, i === 2 ? 'boom' : 'stamp', i === 2 ? 0.8 : 0.7)); x.shake(ts[2], 12);
    return (lt) => {
      show(a, appear(lt, 0.1, 0.3));
      const s = pop(b, lt, tD - 0.15); b.style.transform = `scale(${lerp(0.6, 1, s)})`;
      b.firstElementChild.style.backgroundSize = `${Ease.outCubic(prog(lt, ts[0] - 0.45, 0.3)) * 100}% 8px`;
      b.style.color = lt > ts[0] - 0.3 ? C.muted : C.ink;
      rows.forEach((el, i) => { const k = pop(el, lt, ts[i] - 0.05); el.style.transform = `translateX(${(1 - k) * -140}px)`; });
      show(src, appear(lt, ts[2] + 0.5, 0.4));
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x));
})();
