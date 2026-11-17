/* FÚTBOL EN 60s #05 · "«Último hombre» no es una regla: cuándo es roja" (ES + EN)
 * Fuente: futbolatlas.app/k/dogso y /k/law-12-fouls-and-misconduct (Regla 12, Reglas de Juego 2026/27 de The IFAB;
 * verificado en la web el 2026-08-08):
 *  - Evitar un gol o una ocasión manifiesta de gol, también con una mano deliberada, es expulsión.
 *  - Desde 2026/27, las consideraciones incluyen la ubicación y el número de defensores y atacantes.
 *  - Si la infracción es en el área propia y se pita penalti, el infractor es amonestado (no expulsado) cuando
 *    intentaba jugar el balón o disputarlo; en el resto de casos (agarrar, tirar, empujar, sin posibilidad de
 *    jugar el balón, mano) es expulsado.
 *  - Desde 2026/27, si se da ventaja y el equipo marca como resultado, no hay sanción disciplinaria.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { tr, header, card, pitch, token, ball, tag, stamp, verdict, endCard } = EUREKA.fa;

  EUREKA.video = {
    footer: tr('Regla 12 · IFAB 2026/27 · futbolatlas.app', 'Law 12 · IFAB 2026/27 · futbolatlas.app'),
    keywords: tr(['roja', 'regla', 'manifiesta', 'amarilla', 'penalti', 'tarjeta', 'ocasion', 'ultimo'], ['red', 'law', 'obvious', 'yellow', 'penalty', 'card', 'chance', 'last']),
  };
  const PY = 500, PH = 510, YEL = '#ffd400', RED = '#ff3b30', BAD = '#ff6b5e';
  const LAW = tr('REGLA 12', 'LAW 12');
  const pop = (el, lt, t, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };
  const flashAt = (p, mx, md, col = 'rgba(255,77,77,.9)') => add(p.items, `<div class="abs" style="left:${mx * p.s - 60}px;top:${md * p.s - 60}px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle, ${col}, transparent 70%)"></div>`);
  const fade = (el, lt, t) => { el.style.opacity = lt >= t ? Math.max(0, 1 - (lt - t) * 2) : 0; };

  // ───────────────────────── 1 · GANCHO ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const q = add(r, `<div class="abs display" style="left:96px;width:834px;top:340px;font-size:112px;line-height:1.04;font-weight:700;font-style:italic;color:${C.ink}">${tr('«Era el último hombre: ¡roja!»', '“He was the last man: red card!”')}</div>`);
    const cd = card(r, RED, { x: 700, y: 700, w: 170, rot: 12 });
    const st = stamp(r, tr('No es la regla', 'Not the law'), { x: tr(110, 150), y: 880, size: 84, rot: -6 });
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:1090px;text-align:center;font-size:30px;font-weight:700;letter-spacing:.12em;color:${C.fg}">${tr('REGLA 12 · OCASIÓN MANIFIESTA DE GOL', 'LAW 12 · DENYING AN OBVIOUS CHANCE')}</div>`);
    const tR = x.at(tr('roja', 'red')), tL = x.at(tr('regla', 'law')) + 0.3;
    x.cue(0.02, 'whistle', 0.9); x.cue(tR, 'pop', 0.9); x.cue(tL, 'stamp', 1); x.shake(tL, 16);
    return (lt) => {
      q.style.transform = `scale(${lerp(1.1, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`; q.style.transformOrigin = '0 0';
      q.style.color = lt > tL ? C.muted : C.ink;
      const c = pop(cd, lt, tR - 0.05); cd.style.transform = `rotate(12deg) scale(${lerp(0.3, 1, c)})`;
      st.set(lt, tL);
      sub.style.opacity = appear(lt, tL + 0.3, 0.3);
    };
  });

  // ───────────────────────── 2 · LA REGLA ─────────────────────────
  scene('regla', (x) => {
    const r = x.root;
    const head = header(x, tr('LO QUE DICE', 'WHAT IT SAYS'), LAW, tr('Ocasión manifiesta de gol', 'Obvious goal-scoring chance'));
    const p = pitch(r, { y: PY, h: PH });
    token(p, 'def').at(9, 23); token(p, 'def').at(59, 25);
    const path = add(p.items, `<div class="abs" style="left:${34 * p.s - 3}px;top:${3 * p.s}px;width:6px;height:${15 * p.s}px;background:repeating-linear-gradient(180deg, ${C.cyan} 0 18px, transparent 18px 30px);box-shadow:0 0 16px ${C.cyan}"></div>`);
    const gk = token(p, 'gk'), def = token(p, 'def'), nine = token(p, 'atk', '9'), b = ball(p);
    gk.at(34, 2.6);
    const hit = flashAt(p, 33.2, 21.4);
    const tO = tag(p, 34, 11, tr('OCASIÓN MANIFIESTA', 'OBVIOUS CHANCE'), C.cyan, -18);
    const tH = tag(p, 34, 36.5, tr('TAMBIÉN CON MANO VOLUNTARIA', 'ALSO BY DELIBERATE HANDBALL'), C.amber, -18);
    const cd = card(p.el, RED, { x: 700, y: 250, w: 100, rot: 10 });
    const v = verdict(r, tr('EVITAR LA OCASIÓN = ROJA', 'DENYING THE CHANCE = RED'), { color: BAD, size: 48, icon: I.cross });
    const tR = x.at(tr('roja', 'red')), tOc = x.at(tr('ocasion', 'obvious')), tM = x.at(tr('mano', 'handball'));
    x.cue(tR, 'stamp', 0.9); x.shake(tR, 14); x.cue(tR + 0.25, 'pop', 0.8); x.cue(tOc, 'swipe', 0.7); x.cue(tOc + 0.9, 'ding', 0.8); x.cue(tM, 'pop', 0.7);
    return (lt) => {
      head(lt);
      const u = Ease.outCubic(prog(lt, 0.15, tR - 0.15));
      nine.at(34, lerp(31, 20.5, u)); b.at(34.8, lerp(29, 18.4, u));
      def.at(lerp(24, 32.2, u), lerp(36, 22.6, u));
      fade(hit, lt, tR);
      const c = pop(cd, lt, tR + 0.25); cd.style.transform = `rotate(10deg) scale(${lerp(0.3, 1, c)})`;
      path.style.opacity = appear(lt, tOc, 0.3); path.style.transform = `scaleY(${Ease.outCubic(prog(lt, tOc, 0.5))})`; path.style.transformOrigin = '50% 100%';
      tO.style.opacity = appear(lt, tOc + 0.2, 0.25);
      v.set(lt, tOc + 0.9);
      tH.style.opacity = appear(lt, tM, 0.25);
    };
  });

  // ───────────────────────── 3 · QUÉ VALORA EL ÁRBITRO (2026/27) ─────────────────────────
  scene('cuenta', (x) => {
    const r = x.root;
    const head = header(x, tr('NUEVO 2026/27', 'NEW 2026/27'), LAW, tr('¿Qué valora el árbitro?', 'What the referee weighs'), C.amber);
    const p = pitch(r, { y: PY, h: PH });
    token(p, 'gk').at(34, 2.6);
    const D = [[25, 17], [41, 16], [37, 27]], A = [[31, 24], [46, 22]];
    const ringAt = ([mx, md], col) => add(p.items, `<div class="abs" style="left:${mx * p.s - 44}px;top:${md * p.s - 44}px;width:88px;height:88px;border-radius:50%;border:6px solid ${col};box-shadow:0 0 22px ${col}"></div>`);
    const rd = D.map((d) => ringAt(d, '#ffffff')), ra = A.map((a) => ringAt(a, C.cyan));
    D.forEach(([a, b]) => token(p, 'def').at(a, b));
    token(p, 'atk', '9').at(31, 24); token(p, 'atk', '7').at(46, 22); ball(p).at(32, 22);
    const chip = (i, t, col) => add(r, `<div class="abs" style="left:${90 + i * 430}px;top:1040px;width:410px;height:128px;border-radius:24px;background:${C.surface};border:4px solid ${col};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px">
        <div class="caption" style="font-size:46px;font-weight:900;color:${col}">${t}</div>
        <div class="mono" style="font-size:23px;font-weight:700;letter-spacing:.08em;color:${C.fg}">${tr('DÓNDE Y CUÁNTOS', 'WHERE AND HOW MANY')}</div></div>`);
    const cD = chip(0, tr('DEFENSORES', 'DEFENDERS'), '#ffffff'), cA = chip(1, tr('ATACANTES', 'ATTACKERS'), C.cyan);
    const tD = x.at(tr('defensores', 'defenders')), tA = x.at(tr('atacantes', 'attackers'));
    rd.forEach((_, i) => x.cue(tD + i * 0.12, 'tick', 0.8)); ra.forEach((_, i) => x.cue(tA + i * 0.12, 'tick', 0.8));
    x.cue(tD, 'pop', 0.7); x.cue(tA, 'pop', 0.7);
    return (lt) => {
      head(lt);
      rd.forEach((el, i) => { const s = pop(el, lt, tD + i * 0.12 - 0.05, 0.35); el.style.transform = `scale(${lerp(2, 1, s)})`; });
      ra.forEach((el, i) => { const s = pop(el, lt, tA + i * 0.12 - 0.05, 0.35); el.style.transform = `scale(${lerp(2, 1, s)})`; });
      [[cD, tD], [cA, tA]].forEach(([c, t]) => { const s = pop(c, lt, t - 0.05); c.style.transform = `scale(${lerp(0.6, 1, s)})`; });
    };
  });

  // ───────────────────────── 4 · EN EL ÁREA: PENALTI + AMARILLA ─────────────────────────
  scene('area', (x) => {
    const r = x.root;
    const head = header(x, tr('DENTRO DEL ÁREA', 'INSIDE THE BOX'), LAW, tr('Si intentaba jugar el balón', 'If he was going for the ball'), C.amber);
    const p = pitch(r, { y: PY, h: PH });
    const zone = add(p.items, `<div class="abs" style="left:${(34 - 20.16) * p.s}px;top:2px;width:${40.32 * p.s}px;height:${16.5 * p.s}px;background:rgba(255,182,39,.16);border:4px solid ${C.amber};box-sizing:border-box"></div>`);
    const gk = token(p, 'gk'), def = token(p, 'def'), nine = token(p, 'atk', '9'), b = ball(p);
    gk.at(34, 2.6);
    const hit = flashAt(p, 36.4, 10.6, 'rgba(255,182,39,.95)');
    const tP = tag(p, 34, 11, tr('PENALTI', 'PENALTY'), C.amber, 34), tT = tag(p, 47, 10.5, tr('IBA AL BALÓN', 'GOING FOR THE BALL'), C.cyan, -76);
    const cd = add(p.el, `<div class="abs" style="left:690px;top:270px;width:110px;height:154px;border-radius:12px;box-shadow:0 18px 40px rgba(0,0,0,.55), inset 0 0 0 3px rgba(255,255,255,.25)"></div>`);
    const v = verdict(r, tr('PENALTI + AMARILLA', 'PENALTY + YELLOW'), { color: C.amber });
    const tAr = x.at(tr('area', 'box')), tPe = x.at(tr('penalti', 'penalty')), tTr = x.at(tr('intentaba', 'trying')), tY = x.at(tr('amarilla', 'yellow'));
    const tF = tPe - 0.45;
    x.cue(tAr, 'swipe', 0.6); x.cue(tF, 'kick', 0.8); x.shake(tF, 10); x.cue(tPe, 'whistle', 0.7); x.cue(tTr, 'pop', 0.7); x.cue(tY - 0.2, 'swipe', 0.6); x.cue(tY, 'ding', 0.9);
    return (lt) => {
      head(lt);
      zone.style.opacity = appear(lt, tAr - 0.1, 0.3);
      const u = Ease.outCubic(prog(lt, 0.3, tF - 0.3));
      nine.at(lerp(33, 35.2, u), lerp(21, 11.6, u)); b.at(lerp(33.8, 36, u), lerp(19, 9.8, u));
      def.at(lerp(50, 38.4, u), lerp(13, 10.4, u));
      fade(hit, lt, tF);
      tP.style.opacity = appear(lt, tPe, 0.2); tT.style.opacity = appear(lt, tTr, 0.2);
      const c = pop(cd, lt, tPe + 0.2), f = prog(lt, tY - 0.2, 0.4);
      cd.style.background = f < 0.5 ? RED : YEL;
      cd.style.transform = `rotate(8deg) scale(${lerp(0.3, 1, c)}) scaleX(${Math.abs(Math.cos(f * Math.PI))})`;
      v.set(lt, tY);
    };
  });

  // ───────────────────────── 5 · EL RESTO: ROJA Y PENALTI ─────────────────────────
  scene('resto', (x) => {
    const r = x.root;
    const pill = add(r, `<div class="abs mono" style="left:96px;top:318px;padding:10px 22px;border-radius:999px;background:${BAD};color:#121414;font-size:27px;font-weight:700;letter-spacing:.12em;transform-origin:0 50%">${tr('EN EL RESTO DE CASOS', 'ANYTHING ELSE')}</div>`);
    const labels = tr(['AGARRAR', 'EMPUJAR', 'TIRAR DE ÉL', 'SIN OPCIÓN AL BALÓN', 'MANO'], ['HOLDING', 'PULLING', 'PUSHING', 'NO CHANCE OF THE BALL', 'HANDBALL']);
    const pos = [[90, 410, 410], [520, 410, 410], [90, 535, 410], [520, 535, 410], [305, 660, 410]];
    const chips = labels.map((t, i) => add(r, `<div class="abs caption" style="left:${pos[i][0]}px;top:${pos[i][1]}px;width:${pos[i][2]}px;height:105px;border-radius:20px;background:${C.surface};border:3px solid ${BAD};display:flex;align-items:center;justify-content:center;text-align:center;font-size:${t.length > 12 ? 32 : 44}px;font-weight:900;color:${C.ink}">${t}</div>`));
    const cd = card(r, RED, { x: 150, y: 830, w: 150, rot: -8 });
    const big = add(r, `<div class="abs caption" style="left:360px;top:835px;font-weight:900;line-height:1"><div style="font-size:130px;color:${BAD}">${tr('ROJA', 'RED')}</div><div style="font-size:70px;color:${C.ink};margin-top:6px">+ ${tr('PENALTI', 'PENALTY')}</div></div>`);
    const w = tr(['agarra', 'empuja', 'tira', 'no'], ['holding', 'pulling', 'pushing', 'no']);
    const ts = w.map((k) => x.at(k)); ts.push(ts[3] + 0.45);
    const tR = x.at(tr('roja', 'red'));
    ts.forEach((t) => x.cue(t, 'pop', 0.7)); x.cue(tR, 'stamp', 1); x.shake(tR, 16);
    return (lt) => {
      const a = spring(lt, 0.05, 0.4); pill.style.opacity = a > 0 ? 1 : 0; pill.style.transform = `scale(${lerp(0.6, 1, a)})`;
      chips.forEach((c, i) => { const s = pop(c, lt, ts[i] - 0.08); c.style.transform = `scale(${lerp(0.5, 1, s)})`; });
      const c = pop(cd, lt, tR - 0.05); cd.style.transform = `rotate(-8deg) scale(${lerp(2.2, 1, Ease.outCubic(prog(lt, tR - 0.05, 0.25)))})`;
      const b = pop(big, lt, tR); big.style.transform = `scale(${lerp(0.6, 1, b)})`; big.style.transformOrigin = '0 50%';
    };
  });

  // ───────────────────────── 6 · VENTAJA Y GOL: SIN TARJETA ─────────────────────────
  scene('ventaja', (x) => {
    const r = x.root;
    const head = header(x, tr('NUEVO 2026/27', 'NEW 2026/27'), LAW, tr('Ventaja y gol', 'Advantage and a goal'), C.amber);
    const p = pitch(r, { y: PY, h: PH });
    const gk = token(p, 'gk'), def = token(p, 'def'), nine = token(p, 'atk', '9'), b = ball(p);
    const hit = flashAt(p, 34.6, 25);
    const tV = tag(p, 15, 20, tr('VENTAJA ▶', 'ADVANTAGE ▶'), C.cyan, -20), tG = tag(p, 34, 5, tr('¡GOL!', 'GOAL!'), C.cyan, 6);
    const cd = card(p.el, RED, { x: 700, y: 40, w: 96, rot: 10 });
    const cross = add(p.el, `<div class="abs" style="left:678px;top:36px;width:140px;height:140px;color:#fff">${I.cross}</div>`);
    const v = verdict(r, tr('VENTAJA + GOL = SIN TARJETA', 'ADVANTAGE + GOAL = NO CARD'), { size: 44 });
    const tF = 0.55, tVe = x.at(tr('ventaja', 'advantage')), tGo = x.at(tr('gol', 'goal')), tNo = x.at(tr('sin', 'no'));
    const tSh = tGo - 0.38;
    x.cue(tF, 'stamp', 0.8); x.shake(tF, 12); x.cue(tVe, 'pop', 0.8); x.cue(tSh, 'kick', 1); x.cue(tGo, 'ding', 0.9); x.cue(tNo, 'stamp', 0.9);
    return (lt) => {
      head(lt);
      const u1 = Ease.outCubic(prog(lt, 0.1, tF - 0.1)), u2 = Ease.inOutCubic(prog(lt, tF + 0.2, tSh - tF - 0.25)), sh = Ease.outCubic(prog(lt, tSh, 0.38));
      const nx = 34 - 1.5 * u2 + Math.sin(lt * 20) * 0.5 * (u2 > 0 && u2 < 0.4 ? 1 : 0), ny = lerp(32, 25.5, u1) - 12 * u2;
      nine.at(nx, ny); def.at(lerp(44, 36.6, u1), lerp(22, 24.6, u1)); gk.at(34 + 2.5 * sh, 2.6);
      b.at(lerp(nx + 0.6, 30.2, sh), lerp(ny - 2, -0.4, sh));
      fade(hit, lt, tF);
      tV.style.opacity = appear(lt, tVe, 0.2);
      const g = spring(lt, tGo, 0.35); tG.style.opacity = g > 0 ? 1 : 0;
      const c = pop(cd, lt, tF + 0.15); cd.style.transform = `rotate(10deg) scale(${lerp(0.3, 1, c)})`;
      const no = prog(lt, tNo, 0.25);
      cd.style.filter = `grayscale(${no}) brightness(${lerp(1, 0.55, no)})`;
      cross.style.opacity = no > 0 ? 1 : 0; cross.style.transform = `scale(${lerp(2.2, 1, Ease.outCubic(no))})`;
      v.set(lt, tNo + 0.2);
    };
  });

  // ───────────────────────── 7 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const a = add(r, `<div class="abs display" style="left:96px;width:834px;top:350px;font-size:84px;line-height:1.08;font-weight:700;color:${C.ink}"><span style="background-image:linear-gradient(${C.red},${C.red});background-repeat:no-repeat;background-position:0 56%;background-size:0% 7px">${tr('No importa quién es el último.', 'It doesn’t matter who is last.')}</span></div>`);
    const b = add(r, `<div class="abs display" style="left:96px;width:834px;top:640px;font-size:112px;line-height:1.04;font-weight:700;font-style:italic;color:${C.cyan};transform-origin:0 50%">${tr('Importa la ocasión que quitas.', 'What matters is the chance you take away.')}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1130px;text-align:center;font-size:23px;font-weight:500;color:${C.muted}">${tr('Regla 12 · Reglas de Juego 2026/27 (IFAB)', 'Law 12 · Laws of the Game 2026/27 (IFAB)')}</div>`);
    const tU = x.at(tr('ultimo', 'last')), tI = x.at(tr('importa', 'what'), tr(1, 0));
    x.cue(tI - 0.4, 'rise', 0.6); x.cue(tI, 'boom', 0.8); x.shake(tI, 12);
    return (lt) => {
      a.style.opacity = appear(lt, 0.1, 0.3);
      const k = Ease.outCubic(prog(lt, tU + 0.35, 0.35));
      a.firstElementChild.style.backgroundSize = `${k * 100}% 7px`; a.style.color = k > 0 ? C.muted : C.ink;
      const s = pop(b, lt, tI - 0.05, 0.5); b.style.transform = `scale(${lerp(0.7, 1, s)})`;
      src.style.opacity = appear(lt, tI + 0.8, 0.4);
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { ref: tr('Regla 12 · Reglas de Juego 2026/27 (IFAB)', 'Law 12 · Laws of the Game 2026/27 (IFAB)') }));
})();
