/* FÚTBOL ATLAS #02 · "5 cambios del reglamento 2026/27"
 * Fuente: futbolatlas.app/k/what-changed-in-2026-27 (lista oficial de cambios de The IFAB; verificado en la web el 2026-08-08):
 *  - Reglas 15 y 16: retrasar un saque de banda o de meta activa una cuenta atrás pitada de 5 s; el saque de banda
 *    pasa al adversario y el de meta se convierte en saque de esquina.
 *  - Regla 3: el sustituido debe salir en 10 s desde que se muestra el cartel; si no, el relevo no entra hasta la
 *    primera interrupción pasado un minuto.
 *  - Regla 12: si se da ventaja en una ocasión manifiesta de gol (DOGSO) y el equipo marca, no hay sanción disciplinaria.
 *  - Reglas 10 y 14: doble toque accidental del lanzador en un penalti: si entra, se repite.
 *  - Protocolo VAR: es revisable una segunda amonestación claramente incorrecta que acaba en roja.
 *  - Aviso: el protocolo "solo el capitán" será obligatorio en todas las competiciones desde el 1 de julio de 2027.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { change, ring, card, pitch, token, ball, tag, stamp, verdict, endCard } = EUREKA.fa;

  EUREKA.video = { footer: 'Reglas de Juego 2026/27 (IFAB) · futbolatlas.app', keywords: ['corner', 'cinco', 'diez', 'minuto', 'tarjeta', 'repite', 'var', 'capitan', '2027'] };
  const PY = 520, PH = 490, YEL = '#ffd400', RED = '#ff3b30';
  const pop = (el, lt, t, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };

  // ───────────────────────── 1 · GANCHO: 5 segundos o córner ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const pill = add(r, `<div class="abs mono" style="left:0;right:0;top:322px;text-align:center;font-size:27px;font-weight:700;letter-spacing:.12em"><span style="padding:10px 22px;border-radius:999px;background:${C.cyan};color:#121414">REGLAS NUEVAS 2026/27</span></div>`);
    const title = add(r, `<div class="abs display" style="left:0;right:0;top:400px;text-align:center;font-size:76px;font-weight:700;font-style:italic;color:${C.ink}">Saque de puerta</div>`);
    const rg = ring(r, { x: 350, y: 505, size: 380, from: 5, unit: 'SEGUNDOS' });
    const st = stamp(r, 'Córner', { x: 335, y: 905, size: 104, rot: -6 });
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:1122px;text-align:center;font-size:30px;font-weight:700;letter-spacing:.12em;color:${C.red}">PARA EL RIVAL</div>`);
    const tC = x.at('cinco'), tK = x.at('corner'), tR = x.at('para');
    x.cue(0.02, 'whistle', 0.9);
    for (let i = 0; i < 5; i++) x.cue(tC + i * 0.23, 'tick', 0.7);
    x.cue(tK, 'stamp', 1); x.shake(tK, 18); x.cue(tK, 'buzz', 0.5);
    return (lt) => {
      title.style.transform = `scale(${lerp(1.15, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`;
      const k = prog(lt, tC, 1.15);
      rg.set(k, k >= 1 ? C.red : C.cyan);
      rg.style.transform = `scale(${1 + 0.03 * Math.sin(lt * 27) * (k > 0 && k < 1 ? 1 : 0)})`;
      st.set(lt, tK);
      sub.style.opacity = appear(lt, tR, 0.25);
    };
  });

  // ───────────────────────── 2 · CAMBIO 1: cuenta atrás en saques ─────────────────────────
  scene('saques', (x) => {
    const r = x.root;
    const head = change(x, 1, 5, 'REGLAS 15 Y 16', 'Cuenta atrás en los saques');
    const rg = ring(r, { x: 100, y: 500, size: 280, from: 5 });
    const big = add(r, `<div class="abs" style="left:420px;top:520px;width:510px">
      <div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.1em;color:${C.muted}">SI RETRASAS EL SAQUE</div>
      <div class="caption" style="font-size:88px;font-weight:900;color:${C.cyan};line-height:1.1;white-space:nowrap">5 segundos</div>
      <div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.06em;color:${C.fg};margin-top:6px">CUENTA ATRÁS PITADA<br>POR EL ÁRBITRO</div></div>`);
    const rows = [['Saque de puerta', 'CÓRNER'], ['Saque de banda', 'PARA EL RIVAL']].map(([a, b], i) => add(r, `<div class="abs" style="left:90px;width:840px;top:${830 + i * 150}px;height:126px;border-radius:24px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;padding:0 30px;box-sizing:border-box;gap:20px">
        <div class="caption" style="font-size:46px;font-weight:800;color:${C.ink};flex:1">${a}</div>
        <div class="arrow" style="width:54px;height:54px;color:${C.muted}"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 32h46M36 14l18 18-18 18"/></svg></div>
        <div class="res caption" style="padding:10px 22px;border-radius:16px;background:${C.red};color:#fff;font-size:40px;font-weight:900">${b}</div></div>`));
    const tS = x.at('si'), tCu = x.at('cuenta'), tr = [x.at('puerta', 1) - 0.3, x.at('banda', 1) - 0.2], tres = [x.at('corner'), x.at('rival')];
    x.cue(tCu - 0.3, 'whistle', 0.7);
    for (let i = 0; i < 5; i++) x.cue(tCu + 0.2 + i * 0.36, 'tick', 0.6);
    tr.forEach((t) => x.cue(t, 'pop', 0.6)); tres.forEach((t) => x.cue(t, 'stamp', 0.8)); x.shake(tres[0], 10);
    return (lt) => {
      head(lt);
      const s = pop(rg, lt, tS - 0.2); const k = prog(lt, tCu + 0.2, 1.8);
      rg.style.transform = `scale(${lerp(0.6, 1, s)})`; rg.set(k, k >= 1 ? C.red : C.cyan);
      big.style.opacity = appear(lt, tS, 0.35); big.style.transform = `translateX(${(1 - appear(lt, tS, 0.35)) * 60}px)`;
      rows.forEach((el, i) => {
        const a = pop(el, lt, tr[i]); el.style.transform = `translateX(${(1 - a) * -120}px)`;
        const b = spring(lt, tres[i] - 0.05, 0.35); const res = el.querySelector('.res');
        res.style.opacity = b > 0 ? 1 : 0; res.style.transform = `scale(${lerp(1.8, 1, b)})`;
        el.style.borderColor = b > 0 ? C.red : C.lineStrong;
      });
    };
  });

  // ───────────────────────── 3 · CAMBIO 2: 10 s para salir ─────────────────────────
  scene('cambio', (x) => {
    const r = x.root;
    const head = change(x, 2, 5, 'REGLA 3', '10 segundos para salir');
    const board = add(r, `<div class="abs" style="left:110px;top:505px;width:400px;height:250px;border-radius:26px;background:#0a0a0a;border:6px solid #2b2b2b;box-shadow:0 24px 60px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:space-around;transform-origin:50% 100%">
      ${[['9', RED, '▼'], ['14', '#35e06f', '▲']].map(([n, c, a]) => `<div style="text-align:center"><div class="mono" style="font-size:120px;font-weight:700;color:${c};line-height:1;text-shadow:0 0 26px ${c}">${n}</div><div style="font-size:34px;color:${c};margin-top:4px">${a}</div></div>`).join('')}</div>`);
    const rg = ring(r, { x: 620, y: 495, size: 270, from: 10 });
    const strip = add(r, `<div class="abs" style="left:90px;top:800px;width:840px;height:200px;border-radius:22px;overflow:hidden;background:${C.pitchAlt};box-shadow:0 0 0 3px ${C.lineStrong}">
      <div class="abs" style="left:660px;top:0;bottom:0;width:6px;background:rgba(255,255,255,.7)"></div>
      <div class="abs" style="left:666px;top:0;bottom:0;right:0;background:#1a1d1b"></div>
      <div class="abs mono" style="left:20px;top:14px;font-size:20px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.6)">CAMPO</div>
      <div class="abs mono" style="left:686px;top:14px;font-size:20px;font-weight:700;letter-spacing:.1em;color:${C.muted}">BANDA</div>
      <div class="abs items" style="inset:0"></div></div>`);
    const fake = { items: strip.querySelector('.items'), P: (a, b) => [a, b] };
    const out = token(fake, 'atk', '9'), inn = token(fake, 'atk', '14');
    const wait = add(strip, `<div class="abs mono" style="left:676px;top:150px;width:154px;text-align:center;font-size:21px;font-weight:700;color:${C.amber};letter-spacing:.06em">⏱ ESPERA</div>`);
    const v = verdict(r, `EL RELEVO ESPERA FUERA<div class="mono" style="font-size:23px;font-weight:700;letter-spacing:.02em;margin-top:6px">hasta la 1.ª interrupción pasado 1 minuto</div>`, { color: C.amber, size: 44, icon: I.cross });
    const tD = x.at('diez'), tN = x.at('si'), tE = x.at('espera');
    x.cue(0.4, 'pop', 0.6);
    for (let i = 0; i < 10; i++) x.cue(tD + 0.1 + i * 0.22, 'tick', 0.5);
    x.cue(tN, 'buzz', 0.7); x.shake(tN, 10); x.cue(tE, 'stamp', 0.8);
    return (lt) => {
      head(lt);
      const b = pop(board, lt, 0.35); board.style.transform = `scale(${lerp(0.5, 1, b)}) rotate(-3deg)`;
      const s = pop(rg, lt, tD - 0.25); const k = prog(lt, tD + 0.1, 2.2);
      rg.style.transform = `scale(${lerp(0.6, 1, s)})`; rg.set(k, k >= 1 ? C.red : C.cyan);
      strip.style.opacity = appear(lt, 0.8, 0.35);
      out.at(lerp(110, 470, prog(lt, tD, 3.4)), 110, 1.15);
      inn.at(753, 95, 1.15 * (1 + 0.05 * Math.sin(lt * 9) * (lt < tN ? 1 : 0)));
      wait.style.opacity = appear(lt, tN + 0.1, 0.25);
      v.set(lt, tE);
    };
  });

  // ───────────────────────── 4 · CAMBIO 3: ventaja y gol, sin tarjeta ─────────────────────────
  scene('dogso', (x) => {
    const r = x.root;
    const head = change(x, 3, 5, 'REGLA 12', 'Ventaja y gol: sin tarjeta');
    const p = pitch(r, { y: PY, h: PH });
    const gk = token(p, 'gk'), def = token(p, 'def'), nine = token(p, 'atk', '9'), b = ball(p);
    const hit = add(p.items, `<div class="abs" style="left:${34.6 * p.s - 60}px;top:${25 * p.s - 60}px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle, rgba(255,77,77,.9), transparent 70%)"></div>`);
    const tF = tag(p, 34.6, 25, 'FALTA', C.red, 44), tV = tag(p, 16, 20, 'VENTAJA ▶', C.cyan, -20), tG = tag(p, 34, 5, '¡GOL!', C.cyan, 6);
    const cd = card(p.el, RED, { x: 700, y: 40, w: 96, rot: 10 });
    const cross = add(p.el, `<div class="abs" style="left:678px;top:36px;width:140px;height:140px;color:#fff">${I.cross}</div>`);
    const v = verdict(r, 'GOL CON VENTAJA = SIN TARJETA', { size: 44 });
    const tFr = x.at('frenan'), tO = x.at('ocasion'), tVe = x.at('ventaja'), tM = x.at('marcas'), tNo = x.at('ya');
    x.cue(tFr, 'stamp', 0.8); x.shake(tFr, 14); x.cue(tO, 'swipe', 0.6); x.cue(tVe, 'pop', 0.8);
    x.cue(tM, 'kick', 1); x.cue(tM + 0.4, 'ding', 0.9); x.cue(tNo + 0.2, 'stamp', 0.9);
    return (lt) => {
      head(lt);
      const u1 = Ease.outCubic(prog(lt, 0.2, tFr - 0.2)), u2 = Ease.inOutCubic(prog(lt, tFr + 0.25, tM - tFr - 0.3)), sh = Ease.outCubic(prog(lt, tM, 0.38));
      const nx = lerp(34, 34, u1) - 1.5 * u2 + Math.sin(lt * 20) * 0.5 * (u2 > 0 && u2 < 0.4 ? 1 : 0), ny = lerp(34, 25.5, u1) - 12 * u2;
      nine.at(nx, ny);
      def.at(lerp(45, 36.6, u1), lerp(21, 24.6, u1));
      gk.at(34 + 2.5 * sh, 2.6);
      b.at(lerp(nx + 0.6, 30.2, sh), lerp(ny - 2, -0.4, sh));
      hit.style.opacity = lt >= tFr ? Math.max(0, 1 - (lt - tFr) * 2) : 0;
      tF.style.opacity = appear(lt, tFr, 0.2); tV.style.opacity = appear(lt, tVe, 0.2);
      const g = spring(lt, tM + 0.38, 0.35); tG.style.opacity = g > 0 ? 1 : 0;
      const c = pop(cd, lt, tO); cd.style.transform = `rotate(10deg) scale(${lerp(0.3, 1, c)})`;
      const no = prog(lt, tNo + 0.2, 0.25);
      cd.style.filter = `grayscale(${no}) brightness(${lerp(1, 0.55, no)})`;
      cross.style.opacity = no > 0 ? 1 : 0; cross.style.transform = `scale(${lerp(2.2, 1, Ease.outCubic(no))})`;
      v.set(lt, tNo + 0.45);
    };
  });

  // ───────────────────────── 5 · CAMBIO 4: doble toque en el penalti ─────────────────────────
  scene('penalti', (x) => {
    const r = x.root;
    const head = change(x, 4, 5, 'REGLA 14', 'Doble toque accidental');
    const p = pitch(r, { y: PY, h: PH });
    const gk = token(p, 'gk'), nine = token(p, 'atk', '9'), b = ball(p);
    const t1 = tag(p, 24, 11, '1.er TOQUE', C.amber, -20), t2 = tag(p, 44, 11, '2.º TOQUE', C.amber, -20), tG = tag(p, 44, 4, 'ENTRA…', C.cyan, 0);
    const loop = add(p.items, `<div class="abs" style="left:${34 * p.s - 70}px;top:${11 * p.s - 70}px;width:140px;height:140px;color:${C.cyan}">${I.loop}</div>`);
    const v = verdict(r, 'SI ENTRA, SE REPITE', { icon: I.loop });
    const tD = x.at('doble'), tS = x.at('si'), tR = x.at('repite');
    x.cue(tD, 'kick', 0.8); x.cue(tD + 0.22, 'kick', 0.6); x.cue(tS + 0.2, 'ding', 0.7); x.cue(tR - 0.15, 'rise', 0.5); x.cue(tR + 0.1, 'stamp', 0.9); x.shake(tR + 0.1, 10);
    return (lt) => {
      head(lt);
      const run = Ease.outCubic(prog(lt, 0.3, tD - 0.3)), sh = Ease.outCubic(prog(lt, tD + 0.25, 0.7)), back = Ease.inOutCubic(prog(lt, tR - 0.1, 0.5));
      nine.at(34 - 0.6 * run, lerp(17, 13.2, run));
      gk.at(34 - 3.2 * sh * (1 - back), 1.4);
      const k = sh * (1 - back);
      b.at(lerp(34, 37.2, k), lerp(11, 0.2, k));
      t1.style.opacity = appear(lt, tD, 0.15); t2.style.opacity = appear(lt, tD + 0.22, 0.15);
      tG.style.opacity = appear(lt, tS, 0.2) * (1 - back);
      const l = spring(lt, tR, 0.4); loop.style.opacity = l > 0 ? 0.9 : 0; loop.style.transform = `rotate(${-lt * 140}deg) scale(${lerp(0.4, 1, l)})`;
      v.set(lt, tR + 0.1);
    };
  });

  // ───────────────────────── 6 · CAMBIO 5: el VAR y la segunda amarilla ─────────────────────────
  scene('var', (x) => {
    const r = x.root;
    const head = change(x, 5, 5, 'PROTOCOLO VAR', 'Segunda amarilla, revisable');
    const y0 = 580;
    const c1 = card(r, YEL, { x: 120, y: y0, w: 190, rot: -4 }), c2 = card(r, YEL, { x: 420, y: y0, w: 190, rot: 3 }), c3 = card(r, RED, { x: 720, y: y0, w: 190, rot: 5 });
    const sym = (t, left) => add(r, `<div class="abs caption" style="left:${left}px;top:${y0 + 80}px;width:110px;text-align:center;font-size:96px;font-weight:900;color:${C.muted}">${t}</div>`);
    const s1 = sym('+', 310), s2 = sym('=', 610);
    const lab = (t, left) => add(r, `<div class="abs mono" style="left:${left}px;top:${y0 + 290}px;width:190px;text-align:center;font-size:22px;font-weight:700;letter-spacing:.08em;color:${C.muted}">${t}</div>`);
    lab('1.ª AMARILLA', 120); lab('2.ª AMARILLA', 420); lab('ROJA', 720);
    const scan = add(r, `<div class="abs" style="left:392px;top:${y0 - 44}px;width:246px;height:356px;border:6px solid ${C.cyan};border-radius:22px;box-shadow:0 0 40px ${C.cyan}66;overflow:hidden">
      <div class="abs mono" style="left:0;top:0;padding:4px 14px;background:${C.cyan};color:#121414;font-size:24px;font-weight:700;letter-spacing:.1em;border-bottom-right-radius:12px">VAR</div>
      <div class="abs ln" style="left:0;right:0;height:5px;background:${C.cyan};box-shadow:0 0 18px ${C.cyan}"></div></div>`);
    const cross = add(r, `<div class="abs" style="left:430px;top:${y0 + 48}px;width:170px;height:170px;color:${C.red}">${I.cross}</div>`);
    const v = verdict(r, 'EL VAR PUEDE CORREGIRLA');
    const tV = x.at('var'), tC = x.at('corregir'), tE = x.at('erronea');
    [0.25, 0.45, 0.65].forEach((t) => x.cue(t, 'pop', 0.6)); x.cue(tV, 'swipe', 0.7); x.cue(tE, 'buzz', 0.6); x.cue(tE + 0.3, 'ding', 0.9);
    return (lt) => {
      head(lt);
      [[c1, -4, 0.25], [c2, 3, 0.45], [c3, 5, 0.65]].forEach(([c, rot, t]) => { const s = pop(c, lt, t); c.style.transform = `rotate(${rot}deg) scale(${lerp(0.4, 1, s)})`; });
      s1.style.opacity = appear(lt, 0.4, 0.2); s2.style.opacity = appear(lt, 0.6, 0.2);
      const sc = pop(scan, lt, tV); scan.style.transform = `scale(${lerp(1.3, 1, sc)})`;
      scan.querySelector('.ln').style.top = `${(0.5 + 0.5 * Math.sin((lt - tV) * 5)) * 340}px`;
      const no = prog(lt, tE, 0.25);
      cross.style.opacity = no > 0 ? 1 : 0; cross.style.transform = `scale(${lerp(2.2, 1, Ease.outCubic(no))})`;
      c3.style.opacity = c3.style.opacity * lerp(1, 0.25, no); s2.style.opacity = s2.style.opacity * lerp(1, 0.3, no);
      v.set(lt, tE + 0.3);
    };
  });

  // ───────────────────────── 7 · AVISO: solo el capitán (2027) ─────────────────────────
  scene('capitan', (x) => {
    const r = x.root;
    const pill = add(r, `<div class="abs mono" style="left:96px;top:318px;padding:10px 22px;border-radius:999px;background:${C.amber};color:#121414;font-size:27px;font-weight:700;letter-spacing:.1em;transform-origin:0 50%">PRÓXIMAMENTE · 1 JULIO 2027</div>`);
    const title = add(r, `<div class="abs display" style="left:96px;top:392px;font-size:58px;font-weight:700;color:${C.ink}">Solo el capitán</div>`);
    const p = pitch(r, { y: PY, h: PH });
    const zone = add(p.items, `<div class="abs" style="left:${34 * p.s - 105}px;top:${17 * p.s - 105}px;width:210px;height:210px;border-radius:50%;border:5px dashed ${C.amber};background:rgba(255,182,39,.10)"></div>`);
    const ref = token(p, 'ref', 'Á'); ref.at(34, 17);
    const cap = token(p, 'atk', 'C');
    const others = [[8, 26], [60, 26], [16, 37], [52, 37]].map(([a, b]) => ({ el: token(p, 'atk'), a, b }));
    const v = verdict(r, 'SOLO SE ACERCA EL CAPITÁN', { size: 48 });
    const tJ = x.at('julio'), tS = x.at('solo'), tC = x.at('capitan');
    x.cue(0.3, 'whistle', 0.6); x.cue(tS, 'buzz', 0.5); x.cue(tC, 'ding', 0.9);
    return (lt) => {
      const a = spring(lt, 0.05, 0.4); pill.style.opacity = a > 0 ? 1 : 0; pill.style.transform = `scale(${lerp(0.6, 1, a)})`;
      title.style.opacity = appear(lt, tS - 0.2, 0.3);
      const inn = Ease.outCubic(prog(lt, 0.4, tS - 0.4)), outk = Ease.outBack(prog(lt, tS, 0.5));
      others.forEach(({ el, a, b }) => {
        const k = inn * 0.5 - outk * 0.3;
        el.at(lerp(a, 34, k), lerp(b, 17, k));
      });
      const c = Ease.inOutCubic(prog(lt, 0.4, tC - 0.2));
      cap.at(34, lerp(34, 22.6, c), 1.15);
      zone.style.opacity = appear(lt, tS - 0.1, 0.25); zone.style.transform = `scale(${1 + 0.04 * Math.sin(lt * 6)})`;
      v.set(lt, tC + 0.1);
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { ref: 'Cambios en las Reglas de Juego 2026/27 (IFAB)' }));
})();
