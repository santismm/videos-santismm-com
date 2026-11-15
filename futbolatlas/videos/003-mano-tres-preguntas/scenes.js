/* FÚTBOL EN 60s #03 · "¿Es mano? Las 3 preguntas de la Regla 12"
 * Fuente: futbolatlas.app/k/how-handball-actually-works y /k/handball-misconceptions (Regla 12, Reglas de Juego
 * 2026/27 de The IFAB; verificado en la web el 2026-08-08):
 *  - El límite superior del brazo está a la altura de la parte inferior de la axila; el hombro no es mano.
 *  - Es infracción tocar el balón deliberadamente con la mano o el brazo (p. ej., moverlos hacia el balón).
 *  - Es infracción tocarlo con la mano o el brazo cuando han agrandado el cuerpo de forma antinatural
 *    (posición no justificable por el movimiento del cuerpo), aunque no sea deliberado.
 *  - Es infracción marcar directamente con la mano o el brazo, o inmediatamente después de que el balón los
 *    toque, aunque sea accidental. Solo se aplica a quien marca.
 *  - El área no cambia los criterios: solo cambia la reanudación (penalti en vez de libre directo).
 *  - El portero está exento dentro de su área; fuera tiene las mismas restricciones que cualquier jugador.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { tr, header, pitch, token, ball, tag, stamp, verdict, endCard } = EUREKA.fa;

  EUREKA.video = { footer: tr('Regla 12 · IFAB 2026/27 · futbolatlas.app', 'Law 12 · IFAB 2026/27 · futbolatlas.app'),
    keywords: tr(['existe', 'tres', 'hombro', 'voluntaria', 'siempre', 'antinatural', 'anulado', 'accidental', 'siga', 'castigo', 'fuera'], ['thing', 'three', 'shoulder', 'deliberate', 'always', 'unnaturally', 'disallowed', 'accidental', 'play', 'punishment', 'outside']) };
  const PY = 500, PH = 510, BAD = '#ff6b5e', SKIN = '#e8ece8';
  const pop = (el, lt, t, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };

  /** Panel con una figura de frente. arms(aL, aR): grados de apertura de cada brazo (0 = pegado al cuerpo). */
  function body(r, extraSvg = '') {
    const el = add(r, `<div class="abs" style="left:90px;top:${PY}px;width:840px;height:${PH}px;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${C.lineStrong};background:radial-gradient(600px 420px at 50% 40%, #174a28, #0c2a15)">
      <svg class="abs" viewBox="0 0 840 ${PH}" style="inset:0;width:100%;height:100%" stroke-linecap="round">
        <g class="ghost" opacity="0" stroke="${SKIN}" stroke-width="5" stroke-dasharray="10 12" fill="none">
          <line x1="338" y1="190" x2="302" y2="392"/><line x1="502" y1="190" x2="538" y2="392"/></g>
        <line x1="388" y1="395" x2="380" y2="540" stroke="${SKIN}" stroke-width="56"/><line x1="452" y1="395" x2="460" y2="540" stroke="${SKIN}" stroke-width="56"/>
        <g class="aL"><line x1="338" y1="190" x2="338" y2="395" stroke="${SKIN}" stroke-width="46"/></g>
        <g class="aR"><line x1="502" y1="190" x2="502" y2="395" stroke="${SKIN}" stroke-width="46"/></g>
        <rect x="345" y="160" width="150" height="250" rx="44" fill="${SKIN}"/>
        <circle cx="420" cy="95" r="48" fill="${SKIN}"/>${extraSvg}</svg></div>`);
    const aL = el.querySelector('.aL'), aR = el.querySelector('.aR');
    return {
      el, ghost: el.querySelector('.ghost'),
      arms(l, r2) { aL.setAttribute('transform', `rotate(${l} 338 190)`); aR.setAttribute('transform', `rotate(${-r2} 502 190)`); },
      color(side, c) { (side === 'L' ? aL : aR).firstElementChild.setAttribute('stroke', c); },
      label: (txt, left, top, col) => add(el, `<div class="abs mono" style="left:${left}px;top:${top}px;white-space:nowrap;padding:6px 14px;border-radius:10px;background:rgba(18,20,20,.92);border:2px solid ${col};color:${col};font-size:21px;font-weight:700;letter-spacing:.05em">${txt}</div>`),
      ball() {
        const b = add(el, `<div class="abs" style="left:-23px;top:-23px;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%, #fff, #cfd6cf 70%);border:4px solid #121414;box-shadow:0 6px 14px rgba(0,0,0,.6)"></div>`);
        b.at = (px, py) => { b.style.transform = `translate(${px}px, ${py}px)`; };
        return b;
      },
    };
  }

  // ───────────────────────── 1 · GANCHO ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const q = add(r, `<div class="abs display" style="left:0;right:0;top:350px;text-align:center;font-size:${tr(150, 128)}px;line-height:1;font-weight:700;font-style:italic;color:${C.ink}">${tr('«Mano<br>es mano»', '“Handball<br>is handball”')}</div>`);
    const st = stamp(r, tr('No existe', 'Not a thing'), { x: 280, y: 650, size: 92, rot: -6 });
    const qs = [0, 1, 2].map((i) => add(r, `<div class="abs caption" style="left:${150 + i * 270}px;top:840px;width:210px;height:210px;border-radius:50%;background:${C.cyan};color:#121414;display:flex;align-items:center;justify-content:center;font-size:130px;font-weight:900;box-shadow:0 0 60px ${C.cyan}55">${i + 1}</div>`));
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:1085px;text-align:center;font-size:34px;font-weight:700;letter-spacing:.14em;color:${C.fg}">${tr('PREGUNTAS · REGLA 12', 'QUESTIONS · LAW 12')}</div>`);
    const tN = x.at(tr('no', 'isnt')), tT = x.at(tr('tres', 'three'));
    x.cue(0.02, 'whistle', 0.9); x.cue(tN, 'stamp', 1); x.shake(tN, 16);
    qs.forEach((_, i) => x.cue(tT + i * 0.14, 'pop', 0.7));
    return (lt) => {
      q.style.transform = `scale(${lerp(1.12, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`;
      q.style.color = lt > tN ? C.muted : C.ink;
      st.set(lt, tN);
      qs.forEach((el, i) => { const s = pop(el, lt, tT + i * 0.14 - 0.05); el.style.transform = `scale(${lerp(0.3, 1, s)})`; });
      sub.style.opacity = appear(lt, tT + 0.4, 0.3);
    };
  });

  // ───────────────────────── 2 · PASO 0: ¿dónde tocó? ─────────────────────────
  scene('zona', (x) => {
    const r = x.root;
    const head = header(x, tr('ANTES DE NADA', 'FIRST OF ALL'), tr('REGLA 12', 'LAW 12'), tr('¿Dónde tocó?', 'Where did it hit?'), C.amber);
    const f = body(r, `<line class="ax" x1="230" y1="236" x2="610" y2="236" stroke="${C.amber}" stroke-width="6" stroke-dasharray="18 12"/>
      <g class="sh" fill="rgba(61,220,132,.35)" stroke="${C.green}" stroke-width="6"><circle cx="338" cy="196" r="40"/><circle cx="502" cy="196" r="40"/></g>`);
    f.arms(20, 20);
    const ax = f.el.querySelector('.ax'), sh = f.el.querySelector('.sh');
    const lAx = f.label(tr('LÍNEA DE LA AXILA', 'ARMPIT LINE'), 590, 196, C.amber), lSh = f.label(tr('HOMBRO ✓', 'SHOULDER ✓'), 110, 130, C.green), lBr = f.label(tr('BRAZO Y MANO', 'ARM AND HAND'), 610, 330, BAD);
    const b = f.ball();
    const v = verdict(r, tr('EL HOMBRO NO ES MANO', 'SHOULDER IS NOT HANDBALL'), { size: tr(54, 46) });
    const tB = x.at(tr('brazo', 'arm')), tA = x.at(tr('axila', 'armpit')), tH = x.at(tr('hombro', 'shoulder')), tN = x.at(tr('no', 'not'));
    x.cue(tB, 'pop', 0.6); x.cue(tA, 'swipe', 0.7); x.cue(tH + 0.1, 'kick', 0.8); x.cue(tN + 0.2, 'ding', 0.9);
    return (lt) => {
      head(lt);
      const red = prog(lt, tB, 0.3) > 0;
      f.color('L', red ? BAD : SKIN); f.color('R', red ? BAD : SKIN);
      lBr.style.opacity = appear(lt, tB, 0.25);
      ax.style.opacity = appear(lt, tA - 0.1, 0.3); lAx.style.opacity = appear(lt, tA, 0.3);
      const s = spring(lt, tH - 0.1, 0.4); sh.style.opacity = s > 0 ? 1 : 0; lSh.style.opacity = s > 0 ? 1 : 0; lSh.style.transform = `scale(${lerp(0.5, 1, s)})`;
      const u = prog(lt, tH - 0.5, 0.6), d = prog(lt, tH + 0.1, 1.2);
      b.at(lerp(760, 520, u) + 170 * d, lerp(-30, 150, u * u) - 340 * d + 260 * d * d);
      b.style.opacity = lt > tH - 0.5 ? 1 : 0;
      v.set(lt, tN + 0.2);
    };
  });

  // ───────────────────────── 3 · PREGUNTA 1: ¿voluntaria? ─────────────────────────
  scene('p1', (x) => {
    const r = x.root;
    const head = header(x, tr('PREGUNTA 1/3', 'QUESTION 1/3'), tr('REGLA 12', 'LAW 12'), tr('¿Fue voluntaria?', 'Was it deliberate?'));
    const f = body(r);
    const lab = f.label(tr('EL BRAZO VA A BUSCAR EL BALÓN', 'THE ARM GOES TO THE BALL'), 40, 40, BAD);
    const b = f.ball();
    const v = verdict(r, tr('VOLUNTARIA = FALTA SIEMPRE', 'DELIBERATE = ALWAYS A FOUL'), { color: BAD, size: 46, icon: I.cross });
    const tL = x.at(tr('llevas', 'move')), tM = x.at(tr('mano', 'hand')), tF = x.at(tr('falta', 'always'));
    const tHit = tM + 0.35;
    x.cue(tL, 'swipe', 0.7); x.cue(tHit, 'kick', 0.9); x.shake(tHit, 8); x.cue(tF, 'stamp', 0.9);
    return (lt) => {
      head(lt);
      const a = Ease.inOutCubic(prog(lt, tL, tHit - tL));
      f.arms(12, lerp(12, 78, a));
      f.color('R', lt >= tHit ? BAD : SKIN);
      const u = prog(lt, tHit - 0.9, 0.9), d = prog(lt, tHit, 1.4);
      b.at(lerp(860, 730, u) - 30 * d, lerp(20, 215, u) + 260 * d * d);
      b.style.opacity = lt > tHit - 0.9 ? 1 : 0;
      lab.style.opacity = appear(lt, tM, 0.25);
      v.set(lt, tF);
    };
  });

  // ───────────────────────── 4 · PREGUNTA 2: ¿agrandaba el cuerpo? ─────────────────────────
  scene('p2', (x) => {
    const r = x.root;
    const head = header(x, tr('PREGUNTA 2/3', 'QUESTION 2/3'), tr('REGLA 12', 'LAW 12'), tr('¿Agrandaba el cuerpo?', 'Did it make the body bigger?'));
    const f = body(r);
    const lab = f.label(tr('POSICIÓN NO JUSTIFICADA POR EL MOVIMIENTO', 'POSITION NOT JUSTIFIED BY THE MOVEMENT'), 150, 452, BAD);
    const nat = f.label(tr('POSICIÓN NATURAL', 'NATURAL POSITION'), 560, 400, C.muted);
    const b = f.ball();
    const v = verdict(r, tr('FALTA, AUNQUE SEA SIN QUERER', 'A FOUL, EVEN IF UNINTENDED'), { color: BAD, size: 44, icon: I.cross });
    const tA = x.at(tr('agrandaba', 'make')), tN = x.at(tr('antinatural', 'unnaturally')), tE = x.at(tr('entonces', 'then')), tF = x.at(tr('falta', 'foul'));
    const tHit = tE - 0.25;
    x.cue(tA, 'rise', 0.5); x.cue(tN, 'buzz', 0.5); x.cue(tHit, 'kick', 0.9); x.shake(tHit, 8); x.cue(tF, 'stamp', 0.9);
    return (lt) => {
      head(lt);
      const a = Ease.outBack(prog(lt, tA - 0.2, 0.6));
      f.arms(lerp(10, 86, a), lerp(10, 86, a));
      f.ghost.style.opacity = appear(lt, tA + 0.3, 0.3) * 0.7; nat.style.opacity = appear(lt, tA + 0.3, 0.3);
      const red = lt >= tN;
      f.color('L', red ? BAD : SKIN); f.color('R', red ? BAD : SKIN);
      lab.style.opacity = appear(lt, tN, 0.25);
      const u = prog(lt, tHit - 0.8, 0.8), d = prog(lt, tHit, 1.4);
      b.at(lerp(-40, 150, u) - 60 * d, lerp(40, 168, u) - 120 * d + 420 * d * d);
      b.style.opacity = lt > tHit - 0.8 ? 1 : 0;
      v.set(lt, tF);
    };
  });

  // ───────────────────────── 5 · PREGUNTA 3: ¿marcas justo después? ─────────────────────────
  scene('p3', (x) => {
    const r = x.root;
    const head = header(x, tr('PREGUNTA 3/3', 'QUESTION 3/3'), tr('REGLA 12', 'LAW 12'), tr('¿Marcas justo después?', 'Do you score right after?'));
    const p = pitch(r, { y: PY, h: PH });
    token(p, 'def').at(27, 9); token(p, 'def').at(43, 12); token(p, 'def').at(52, 16);
    const gk = token(p, 'gk'), seven = token(p, 'atk', '7'), nine = token(p, 'atk', '9'), b = ball(p);
    seven.at(61, 15);
    const hit = add(p.items, `<div class="abs" style="left:${35.4 * p.s - 55}px;top:${8.6 * p.s - 55}px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle, rgba(255,182,39,.95), transparent 70%)"></div>`);
    const tH = tag(p, 35, 8.6, tr('LE DA EN LA MANO · SIN QUERER', 'HITS THE HAND · ACCIDENTAL'), C.amber, 42), tG = tag(p, 34, 5, tr('¡GOL!', 'GOAL!'), C.cyan, -100);
    const st = stamp(p.el, tr('Anulado', 'Disallowed'), { x: tr(215, 150), y: 280, size: tr(96, 80), rot: -7 });
    const v = verdict(r, tr('ACCIDENTAL, PERO GOL ANULADO', 'ACCIDENTAL, BUT NO GOAL'), { color: BAD, size: 42, icon: I.cross });
    const tM = x.at(tr('marcas', 'score')), tT = x.at(tr('toque', 'touches')), tGo = x.at(tr('gol', 'goal')), tA = x.at(tr('anulado', 'disallowed')), tAc = x.at(tr('aunque', 'even'));
    const tShot = tT + 0.5;
    x.cue(tM, 'kick', 0.8); x.cue(tT, 'pop', 0.8); x.cue(tShot, 'kick', 1); x.cue(tShot + 0.35, 'ding', 0.7);
    x.cue(tA, 'stamp', 1); x.shake(tA, 16); x.cue(tA, 'buzz', 0.5);
    return (lt) => {
      head(lt);
      const c = prog(lt, tM, tT - tM), s = Ease.outCubic(prog(lt, tShot, 0.35));
      nine.at(lerp(38, 36, c), lerp(13, 9.4, c));
      gk.at(34 + 2.2 * s, 2.6);
      const bx = lerp(59.5, 35.4, c), by = lerp(14, 8.4, c) - 5 * Math.sin(c * Math.PI);
      b.at(lerp(bx, 31.6, s), lerp(by, -0.4, s), 1 + 0.6 * Math.sin(c * Math.PI));
      hit.style.opacity = lt >= tT ? Math.max(0, 1 - (lt - tT) * 1.6) : 0;
      tH.style.opacity = appear(lt, tT, 0.2);
      const g = spring(lt, tShot + 0.35, 0.35); tG.style.opacity = g > 0 && lt < tA ? 1 : 0;
      st.set(lt, tA);
      v.set(lt, tAc);
    };
  });

  // ───────────────────────── 6 · TRES NOES: siga el juego ─────────────────────────
  scene('no', (x) => {
    const r = x.root;
    const rows = tr(['¿Voluntaria?', '¿Agrandaba el cuerpo?', '¿Marca justo después?'], ['Deliberate?', 'Body made bigger?', 'Scores right after?']).map((t, i) => add(r, `<div class="abs" style="left:90px;width:840px;top:${330 + i * 116}px;height:100px;border-radius:22px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:22px;padding:0 24px;box-sizing:border-box">
        <div class="caption" style="width:60px;height:60px;border-radius:50%;background:${C.cyan};color:#121414;display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900;flex:none">${i + 1}</div>
        <div class="caption" style="font-size:42px;font-weight:800;color:${C.ink};flex:1">${t}</div>
        <div class="res caption" style="padding:6px 22px;border-radius:14px;border:4px solid ${C.fg};color:${C.fg};font-size:38px;font-weight:900">NO</div></div>`));
    const v = verdict(r, tr('SIGA EL JUEGO', 'PLAY ON'), { top: 690, size: 64 });
    const q = add(r, `<div class="abs mono" style="left:0;right:0;top:858px;text-align:center;font-size:27px;font-weight:700;letter-spacing:.1em;color:${C.muted}">${tr('¿Y DENTRO DEL ÁREA?', 'AND INSIDE THE BOX?')} <span style="color:${C.ink}">${tr('LA MISMA REGLA', 'THE SAME LAW')}</span></div>`);
    const chips = tr([['FUERA DEL ÁREA', 'LIBRE DIRECTO', C.fg], ['DENTRO DEL ÁREA', 'PENALTI', C.amber]], [['OUTSIDE THE BOX', 'DIRECT FREE KICK', C.fg], ['INSIDE THE BOX', 'PENALTY', C.amber]]).map(([a, b, col], i) => add(r, `<div class="abs" style="left:${90 + i * 430}px;top:920px;width:410px;height:170px;border-radius:22px;background:${C.surface};border:3px solid ${col};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">
        <div class="mono" style="font-size:24px;font-weight:700;letter-spacing:.1em;color:${C.muted}">${a}</div>
        <div class="caption" style="font-size:${tr(50, 38)}px;font-weight:900;color:${col}">${b}</div></div>`));
    const tN = x.at('noes'), tS = x.at(tr('siga', 'play')), tD = x.at(tr('dentro', 'inside')), tC = x.at(tr('solo', 'only'));
    rows.forEach((_, i) => x.cue(0.15 + i * 0.12, 'pop', 0.5)); x.cue(tN, 'stamp', 0.7); x.cue(tS, 'whistle', 0.5); x.cue(tS, 'ding', 0.8);
    x.cue(tD, 'swipe', 0.6); x.cue(tC, 'pop', 0.7); x.cue(tC + 0.15, 'pop', 0.7);
    return (lt) => {
      rows.forEach((el, i) => {
        const a = pop(el, lt, 0.1 + i * 0.12); el.style.transform = `translateX(${(1 - a) * -120}px)`;
        const b = spring(lt, tN + i * 0.1 - 0.1, 0.35); const res = el.querySelector('.res');
        res.style.opacity = b > 0 ? 1 : 0; res.style.transform = `scale(${lerp(1.8, 1, b)})`;
      });
      v.set(lt, tS);
      q.style.opacity = appear(lt, tD, 0.3);
      chips.forEach((el, i) => { const s = pop(el, lt, tC + i * 0.15); el.style.transform = `scale(${lerp(0.6, 1, s)})`; });
    };
  });

  // ───────────────────────── 7 · EL PORTERO ─────────────────────────
  scene('portero', (x) => {
    const r = x.root;
    const head = header(x, tr('EXTRA', 'BONUS'), tr('REGLA 12', 'LAW 12'), tr('¿Y el portero?', 'And the goalkeeper?'), C.amber);
    const p = pitch(r, { y: PY, h: PH });
    const zone = add(p.items, `<div class="abs" style="left:${(34 - 20.16) * p.s}px;top:2px;width:${40.32 * p.s}px;height:${16.5 * p.s}px;background:rgba(202,243,0,.22);border:4px solid ${C.cyan};box-sizing:border-box"></div>`);
    const tIn = tag(p, 34, 3.2, tr('EN SU ÁREA: PUEDE USAR LAS MANOS', 'IN HIS AREA: HANDS ALLOWED'), C.cyan, -20);
    const gk = token(p, 'gk', '1'), b = ball(p);
    const hit = add(p.items, `<div class="abs" style="left:${34 * p.s - 70}px;top:${25 * p.s - 70}px;width:140px;height:140px;border-radius:50%;border:6px solid ${BAD};background:rgba(255,107,94,.25)"></div>`);
    const tOut = tag(p, 34, 25, tr('FUERA: ES MANO', 'OUTSIDE: HANDBALL'), BAD, 78);
    const v = verdict(r, tr('FUERA DE SU ÁREA, UNO MÁS', 'OUTSIDE: JUST ANOTHER PLAYER'), { size: tr(48, 42) });
    const tP = x.at(tr('portero', 'goalkeeper')), tF = x.at(tr('fuera', 'outside')), tJ = x.at(tr('jugador', 'player'));
    x.cue(tP, 'pop', 0.6); x.cue(tF, 'swipe', 0.7); x.cue(tF + 0.5, 'buzz', 0.7); x.shake(tF + 0.5, 10); x.cue(tJ, 'ding', 0.9);
    return (lt) => {
      head(lt);
      zone.style.opacity = appear(lt, tP, 0.3); tIn.style.opacity = appear(lt, tP + 0.2, 0.3);
      const u = Ease.inOutCubic(prog(lt, tF - 0.1, 0.6));
      gk.at(34, lerp(9, 25, u), 1.15); b.at(35.8, lerp(7.6, 23.6, u));
      const s = spring(lt, tF + 0.5, 0.35); hit.style.opacity = s > 0 ? 1 : 0; hit.style.transform = `scale(${lerp(1.8, 1, s)})`;
      tOut.style.opacity = s > 0 ? 1 : 0;
      v.set(lt, tJ);
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { ref: tr('Regla 12 · Reglas de Juego 2026/27 (IFAB)', 'Law 12 · Laws of the Game 2026/27 (IFAB)') }));
})();
