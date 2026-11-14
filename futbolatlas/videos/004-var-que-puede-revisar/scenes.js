/* FÚTBOL ATLAS #04 · "Lo que el VAR no puede revisar" (ES) / "What VAR can't review" (EN)
 * Fuente: futbolatlas.app/k/var-misconceptions, /k/var y /k/var-vs-goal-line-technology (Protocolo VAR, Reglas de
 * Juego 2026/27 de The IFAB; verificado en la web el 2026-08-08):
 *  - El VAR solo asiste ante un error claro y manifiesto o un incidente grave inadvertido en una lista cerrada:
 *    gol/no gol, penalti/no penalti, roja directa y confusión de identidad.
 *  - Una falta en el centro del campo que no lleva a nada no es revisable, por muy errónea que sea.
 *  - Solo el árbitro puede iniciar una revisión; no existe petición de los equipos y el gesto de la pantalla
 *    arriesga amonestación.
 *  - El VAR recomienda; la decisión final es siempre del árbitro.
 *  - Desde 2026/27 es revisable una segunda amonestación claramente incorrecta que acaba en roja.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { tr, header, token, tag, stamp, verdict, card, endCard } = EUREKA.fa;

  EUREKA.video = {
    footer: tr('Protocolo VAR · IFAB 2026/27 · futbolatlas.app', 'VAR protocol · IFAB 2026/27 · futbolatlas.app'),
    keywords: tr(['todo', 'cuatro', 'revisable', 'claro', 'manifiesto', 'arbitro', 'amarilla', 'recomienda', 'final'],
      ['everything', 'four', 'reviewable', 'clear', 'obvious', 'referee', 'yellow', 'recommends', 'final']),
  };
  const PY = 500, BAD = '#ff6b5e', YEL = '#ffd400', RED = '#ff3b30';
  const pop = (el, lt, t, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };

  /** Monitor de la sala VAR. Devuelve el elemento; .screen es el interior. */
  function monitor(parent, { x, y, w, h, text = 'VAR', size = 190, stand = true }) {
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      <div class="abs screen" style="inset:0;border-radius:${Math.min(28, h * 0.12)}px;background:#07130b;border:${Math.max(4, w * 0.012)}px solid ${C.cyan};box-shadow:0 0 70px ${C.cyan}44, 0 30px 70px rgba(0,0,0,.6);overflow:hidden;display:flex;align-items:center;justify-content:center">
        <div class="abs" style="inset:0;background:repeating-linear-gradient(180deg, rgba(202,243,0,.07) 0 3px, transparent 3px 9px)"></div>
        <div class="abs ln" style="left:0;right:0;height:5px;background:${C.cyan};box-shadow:0 0 18px ${C.cyan};opacity:.8"></div>
        <div class="caption txt" style="position:relative;font-size:${size}px;font-weight:900;letter-spacing:.04em;color:${C.ink};text-shadow:0 0 40px ${C.cyan}88">${text}</div></div>
      ${stand ? `<div class="abs" style="left:${w / 2 - w * 0.06}px;top:${h}px;width:${w * 0.12}px;height:${h * 0.09}px;background:${C.lineStrong}"></div>
      <div class="abs" style="left:${w / 2 - w * 0.2}px;top:${h * 1.09}px;width:${w * 0.4}px;height:${Math.max(8, h * 0.03)}px;border-radius:8px;background:${C.lineStrong}"></div>` : ''}</div>`);
    el.screen = el.querySelector('.screen'); const ln = el.querySelector('.ln');
    el.scan = (lt) => { ln.style.top = `${(0.5 + 0.5 * Math.sin(lt * 3.2)) * (h - 14)}px`; };
    return el;
  }
  const panel = (r, h = 440, bg = `radial-gradient(600px 420px at 50% 40%, #174a28, #0c2a15)`) =>
    add(r, `<div class="abs" style="left:90px;top:${PY}px;width:840px;height:${h}px;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${C.lineStrong};background:${bg}"><div class="abs items" style="inset:0"></div></div>`);
  const fake = (el) => ({ el, items: el.querySelector('.items'), P: (a, b) => [a, b], s: 1 });

  // ───────────────────────── 1 · GANCHO ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const m = monitor(r, { x: 190, y: 330, w: 700, h: 390 });
    const st = stamp(r, tr('No todo', 'Not everything'), { x: tr(330, 215), y: 610, size: tr(96, 70), rot: -7 });
    const four = add(r, `<div class="abs caption" style="left:130px;top:850px;width:240px;height:240px;border-radius:50%;background:${C.cyan};color:#121414;display:flex;align-items:center;justify-content:center;font-size:170px;font-weight:900;box-shadow:0 0 70px ${C.cyan}66">4</div>`);
    const txt = add(r, `<div class="abs" style="left:410px;top:880px;width:520px">
      <div class="caption" style="font-size:68px;font-weight:900;line-height:1.04;color:${C.ink}">${tr('tipos de<br>jugada', 'kinds of<br>decision')}</div>
      <div class="mono" style="font-size:24px;font-weight:700;letter-spacing:.1em;color:${C.muted};margin-top:12px">${tr('LISTA CERRADA · PROTOCOLO VAR', 'A CLOSED LIST · VAR PROTOCOL')}</div></div>`);
    const tT = x.at(tr('todo', 'everything')), t4 = x.at(tr('cuatro', 'four'));
    x.cue(0.02, 'whistle', 0.9); x.cue(tT, 'stamp', 1); x.shake(tT, 16); x.cue(t4, 'pop', 0.9); x.cue(t4 + 0.2, 'ding', 0.6);
    return (lt) => {
      m.style.transform = `scale(${lerp(1.1, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`; m.scan(lt);
      st.set(lt, tT);
      const s = pop(four, lt, t4 - 0.05); four.style.transform = `scale(${lerp(0.3, 1, s)})`;
      const k = appear(lt, t4 + 0.15, 0.3); txt.style.opacity = k; txt.style.transform = `translateX(${(1 - k) * 50}px)`;
    };
  });

  // ───────────────────────── 2 · LA LISTA CERRADA ─────────────────────────
  scene('lista', (x) => {
    const r = x.root;
    const head = header(x, tr('LISTA CERRADA', 'CLOSED LIST'), tr('PROTOCOLO VAR', 'VAR PROTOCOL'), tr('Solo 4 categorías', 'Only 4 categories'));
    const S = `fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      `<svg viewBox="0 0 64 64" ${S}><path d="M8 54V14h48v40M8 28h48M8 42h48M24 14v40M40 14v40"/></svg>`,
      `<svg viewBox="0 0 64 64" ${S}><path d="M6 10h52v30H6zM22 40a11 11 0 0 0 20 0"/><circle cx="32" cy="28" r="3.5" fill="currentColor"/></svg>`,
      `<svg viewBox="0 0 64 64"><rect x="17" y="6" width="30" height="46" rx="5" fill="${RED}" transform="rotate(8 32 30)"/></svg>`,
      `<svg viewBox="0 0 64 64" ${S}><circle cx="18" cy="18" r="9"/><path d="M4 50c0-9 6-15 14-15"/><circle cx="46" cy="18" r="9"/><path d="M60 50c0-9-6-15-14-15"/><path d="M24 46h16M34 40l6 6-6 6M30 40l-6 6 6 6"/></svg>`,
    ];
    const data = [
      [tr('Gol / no gol', 'Goal / no goal'), tr('incluidas las infracciones en la jugada previa', 'including offences in the build-up')],
      [tr('Penalti / no penalti', 'Penalty / no penalty'), ''],
      [tr('Roja directa', 'Direct red card'), ''],
      [tr('Confusión de identidad', 'Mistaken identity'), tr('se amonesta al jugador equivocado', 'the wrong player is booked')],
    ];
    const rows = data.map(([t, s], i) => add(r, `<div class="abs" style="left:90px;width:840px;top:${490 + i * 132}px;height:116px;border-radius:22px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:22px;padding:0 24px;box-sizing:border-box">
        <div class="caption" style="width:62px;height:62px;border-radius:50%;background:${C.cyan};color:#121414;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;flex:none">${i + 1}</div>
        <div style="width:66px;height:66px;color:${C.cyan};flex:none">${icons[i]}</div>
        <div style="flex:1"><div class="caption" style="font-size:46px;font-weight:800;color:${C.ink};line-height:1.05">${t}</div>
        ${s ? `<div class="mono sub" style="font-size:20px;font-weight:700;color:${C.muted};margin-top:6px;letter-spacing:.02em">${s}</div>` : ''}</div></div>`));
    const ts = [x.at(tr('gol', 'goal')), x.at(tr('penalti', 'penalty')), x.at(tr('roja', 'direct')), x.at(tr('confusion', 'mistaken'))];
    ts.forEach((t, i) => x.cue(t, i === 3 ? 'ding' : 'pop', 0.8));
    return (lt) => {
      head(lt);
      rows.forEach((el, i) => {
        const s = pop(el, lt, ts[i] - 0.1); el.style.transform = `translateX(${(1 - s) * 140}px)`;
        el.style.borderColor = lt >= ts[i] && (i === 3 || lt < ts[i + 1] - 0.1) ? C.cyan : C.lineStrong;
      });
    };
  });

  // ───────────────────────── 3 · FUERA DE LA LISTA ─────────────────────────
  scene('fuera', (x) => {
    const r = x.root;
    const head = header(x, tr('FUERA DE LA LISTA', 'NOT ON THE LIST'), '', tr('Falta en el centro del campo', 'A foul in midfield'), BAD);
    const pn = panel(r, 440, `repeating-linear-gradient(180deg, ${C.pitch} 0 68px, ${C.pitchAlt} 68px 136px)`);
    add(pn, `<svg class="abs" viewBox="0 0 840 440" style="inset:0;width:100%;height:100%;z-index:0" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"><path d="M0 220H840"/><circle cx="420" cy="220" r="113"/><circle cx="420" cy="220" r="5" fill="rgba(255,255,255,.7)"/></svg>`);
    pn.querySelector('.items').style.zIndex = 1;
    const p = fake(pn);
    [[120, 110], [690, 330], [540, 110]].forEach(([a, b]) => token(p, 'def').at(a, b));
    [[180, 340], [720, 150]].forEach(([a, b]) => token(p, 'atk').at(a, b));
    const def = token(p, 'def'), atk = token(p, 'atk', '8');
    const hit = add(p.items, `<div class="abs" style="left:${400 - 70}px;top:${250 - 70}px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle, rgba(255,77,77,.9), transparent 70%)"></div>`);
    const tF = tag(p, 400, 250, tr('FALTA', 'FOUL'), C.red, 44), tNt = tag(p, 420, 400, tr('NO ACABA EN NADA', 'LEADS TO NOTHING'), C.muted, -22);
    const m = monitor(pn, { x: 640, y: 24, w: 170, h: 100, size: 50, stand: false });
    const cross = add(pn, `<div class="abs" style="left:665px;top:14px;width:120px;height:120px;color:${BAD}">${I.cross}</div>`);
    const v = verdict(r, tr('NO ES REVISABLE', 'NOT REVIEWABLE'), { top: 970, color: BAD, icon: I.cross });
    const tFa = x.at(tr('falta', 'foul')), tN = x.at(tr('nada', 'nothing')), tNo = x.at(tr('no', 'not'), 1);
    x.cue(tFa, 'stamp', 0.8); x.shake(tFa, 12); x.cue(tN, 'swipe', 0.5); x.cue(tNo, 'buzz', 0.7); x.cue(tNo + 0.3, 'stamp', 0.9);
    return (lt) => {
      head(lt);
      const u = Ease.outCubic(prog(lt, 0.15, Math.max(0.2, tFa - 0.15)));
      atk.at(lerp(330, 392, u), lerp(330, 262, u)); def.at(lerp(520, 418, u), lerp(170, 238, u));
      hit.style.opacity = lt >= tFa ? Math.max(0, 1 - (lt - tFa) * 1.6) : 0;
      tF.style.opacity = appear(lt, tFa, 0.2); tNt.style.opacity = appear(lt, tN, 0.25);
      m.style.opacity = appear(lt, tN - 0.2, 0.3); m.scan(lt);
      const no = prog(lt, tNo, 0.25); cross.style.opacity = no > 0 ? 1 : 0; cross.style.transform = `scale(${lerp(2.2, 1, Ease.outCubic(no))})`;
      v.set(lt, tNo + 0.3);
    };
  });

  // ───────────────────────── 4 · EL LISTÓN: error claro y manifiesto ─────────────────────────
  scene('umbral', (x) => {
    const r = x.root;
    const top = add(r, `<div class="abs mono" style="left:0;right:0;top:330px;text-align:center;font-size:28px;font-weight:700;letter-spacing:.14em;color:${C.muted}">${tr('Y ADEMÁS, HAY UN LISTÓN', 'AND THERE IS A THRESHOLD')}</div>`);
    const q = add(r, `<div class="abs display" style="left:90px;width:840px;top:385px;text-align:center;font-size:66px;line-height:1.08;font-weight:700;font-style:italic;color:${C.ink}">${tr('¿Cómo de claro<br>es el error?', 'How clear<br>is the error?')}</div>`);
    const bar = add(r, `<div class="abs" style="left:110px;top:600px;width:800px;height:74px;border-radius:37px;overflow:hidden;display:flex;box-shadow:0 0 0 3px ${C.lineStrong}">
      <div style="flex:62;background:#2a312c"></div><div style="flex:38;background:${C.cyan}"></div></div>`);
    const needle = add(r, `<div class="abs" style="left:110px;top:574px;width:0;height:0"><div class="abs" style="left:-9px;top:0;width:18px;height:126px;border-radius:9px;background:#fff;box-shadow:0 0 22px rgba(255,255,255,.8), 0 0 0 4px #121414"></div></div>`);
    const zone = (t, sub, left, w, col) => add(r, `<div class="abs" style="left:${left}px;top:735px;width:${w}px;height:170px;border-radius:22px;background:${C.surface};border:4px solid ${col};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;box-sizing:border-box">
      <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.08em;color:${C.muted}">${t}</div>
      <div class="caption" style="font-size:40px;font-weight:900;color:${col};text-align:center;line-height:1.05">${sub}</div></div>`);
    const zA = zone(tr('DUDOSO · DISCUTIBLE', 'DEBATABLE'), tr('VAR NO<br>INTERVIENE', 'VAR STAYS<br>OUT'), 110, 480, C.fg);
    const zB = zone(tr('CLARO', 'CLEAR'), tr('PUEDE<br>INTERVENIR', 'MAY<br>STEP IN'), 610, 300, C.cyan);
    const v = verdict(r, tr('SOLO ERRORES CLAROS Y MANIFIESTOS', 'ONLY CLEAR AND OBVIOUS ERRORS'), { top: 960, size: 36 });
    const t0 = x.at(tr('tiene', 'it')), tC = x.at(tr('claro', 'clear')), tM = x.at(tr('manifiesto', 'obvious'));
    x.cue(t0, 'rise', 0.6); x.cue(tC, 'ding', 0.9); x.cue(tM, 'stamp', 0.8); x.shake(tM, 8);
    return (lt) => {
      top.style.opacity = appear(lt, 0.1, 0.3);
      const a = pop(q, lt, 0.2); q.style.transform = `scale(${lerp(0.7, 1, a)})`;
      bar.style.opacity = appear(lt, 0.5, 0.3);
      const k = lerp(0.12, 0.22, 0.5 + 0.5 * Math.sin(lt * 5)) * (1 - Ease.inOutCubic(prog(lt, t0, tC - t0))) + 0.84 * Ease.inOutCubic(prog(lt, t0, tC - t0));
      needle.style.transform = `translateX(${k * 800}px)`; needle.style.opacity = appear(lt, 0.5, 0.3);
      const on = k > 0.62;
      zA.style.opacity = appear(lt, 0.7, 0.3) * (on ? 0.35 : 1); zB.style.opacity = appear(lt, 0.8, 0.3) * (on ? 1 : 0.35);
      zB.style.boxShadow = on ? `0 0 50px ${C.cyan}66` : 'none';
      v.set(lt, tM);
    };
  });

  // ───────────────────────── 5 · NO SE PUEDE PEDIR ─────────────────────────
  scene('pedir', (x) => {
    const r = x.root;
    const head = header(x, tr('MITO', 'MYTH'), '', tr('«¡VAR, VAR!»', '“VAR! VAR!”'), BAD);
    const pn = panel(r, 440);
    const p = fake(pn);
    const players = [[150, 350], [270, 380], [390, 350]].map(([a, b]) => { const t = token(p, 'atk'); t.at(a, b, 1.2); return [t, a, b]; });
    const bubbles = [[95, 250], [230, 285], [345, 250]].map(([a, b], i) => add(pn, `<div class="abs caption" style="left:${a}px;top:${b}px;padding:4px 14px;border-radius:14px;background:#fff;color:#121414;font-size:30px;font-weight:900;transform-origin:50% 100%">${tr('¡VAR!', 'VAR!')}</div>`));
    const gest = add(pn, `<svg class="abs" viewBox="0 0 840 440" style="inset:0;width:100%;height:100%"><rect x="150" y="70" width="240" height="140" rx="10" fill="rgba(202,243,0,.08)" stroke="${C.cyan}" stroke-width="7" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1"/></svg>`);
    const gl = add(pn, `<div class="abs mono" style="left:150px;top:28px;font-size:20px;font-weight:700;letter-spacing:.08em;color:${C.cyan}">${tr('EL GESTO DE LA PANTALLA', 'THE SCREEN GESTURE')}</div>`);
    const yc = card(pn, YEL, { x: 420, y: 80, w: 84, rot: 9 });
    const ref = token(p, 'ref', tr('Á', 'R'));
    const tR = tag(p, 640, 220, tr('SOLO EL ÁRBITRO INICIA', 'ONLY THE REF CAN START'), C.cyan, 70);
    const st = stamp(r, tr('No se pide', 'No requests'), { x: tr(520, 500), y: 288, size: 52 });
    const v = verdict(r, tr('EL GESTO PUEDE COSTAR AMARILLA', 'THE GESTURE RISKS A YELLOW'), { top: 970, color: C.amber, size: 42, icon: I.cross });
    const tP = x.at(tr('pedirlo', 'ask')), tS = x.at(tr('solo', 'only')), tG = x.at(tr('gesto', 'screen')), tY = x.at(tr('amarilla', 'yellow'));
    bubbles.forEach((_, i) => x.cue(0.25 + i * 0.12, 'pop', 0.6));
    x.cue(tP, 'stamp', 1); x.shake(tP, 14); x.cue(tS, 'whistle', 0.6); x.cue(tG, 'swipe', 0.7); x.cue(tY, 'ding', 0.8); x.cue(tY + 0.2, 'stamp', 0.7);
    return (lt) => {
      head(lt);
      players.forEach(([t, a, b], i) => t.at(a, b - Math.abs(Math.sin(lt * 7 + i)) * 12 * (lt < tP ? 1 : 0.2), 1.2));
      bubbles.forEach((bb, i) => { const s = spring(lt, 0.2 + i * 0.12, 0.35); bb.style.opacity = s > 0 ? lerp(1, 0.3, prog(lt, tP, 0.3)) : 0; bb.style.transform = `scale(${lerp(0.3, 1, s)}) rotate(${(i - 1) * 6}deg)`; });
      st.set(lt, tP);
      const rs = spring(lt, tS - 0.1, 0.45); ref.style.opacity = rs > 0 ? 1 : 0; ref.at(640, 220, lerp(0.4, 1.5, rs)); tR.style.opacity = appear(lt, tS + 0.2, 0.3);
      gest.querySelector('rect').setAttribute('stroke-dashoffset', 1 - Ease.inOutCubic(prog(lt, tG - 0.1, 0.7)));
      gl.style.opacity = appear(lt, tG, 0.3);
      const c = pop(yc, lt, tY - 0.05); yc.style.transform = `rotate(9deg) scale(${lerp(0.3, 1, c)})`;
      v.set(lt, tY + 0.2);
    };
  });

  // ───────────────────────── 6 · QUIÉN DECIDE ─────────────────────────
  scene('decide', (x) => {
    const r = x.root;
    const head = header(x, tr('QUIÉN DECIDE', 'WHO DECIDES'), '', tr('El VAR no manda', 'VAR doesn’t decide'));
    const box = (left, col) => add(r, `<div class="abs" style="left:${left}px;top:${PY + 10}px;width:370px;height:400px;border-radius:26px;background:${C.surface};border:4px solid ${col};box-sizing:border-box"></div>`);
    const bA = box(90, C.lineStrong), bB = box(560, C.lineStrong);
    const m = monitor(bA, { x: 45, y: 46, w: 272, h: 160, size: 84 });
    const cap = (b, t, col) => add(b, `<div class="abs caption" style="left:0;right:0;bottom:34px;text-align:center;font-size:${tr(46, 44)}px;font-weight:900;color:${col}">${t}</div>`);
    const cA = cap(bA, tr('RECOMIENDA', 'RECOMMENDS'), C.fg), cB = cap(bB, tr('DECIDE', 'DECIDES'), C.cyan);
    const refEl = add(bB, `<div class="abs caption" style="left:105px;top:50px;width:160px;height:160px;border-radius:50%;background:#1b1b1b;color:${YEL};display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;letter-spacing:.04em;box-shadow:0 0 0 6px ${YEL}, 0 14px 30px rgba(0,0,0,.5)">${tr('ÁRBITRO', 'REF')}</div>`);
    const arrow = add(r, `<div class="abs" style="left:470px;top:${PY + 160}px;width:80px;height:80px;color:${C.cyan}"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 32h48M36 14l18 18-18 18"/></svg></div>`);
    const v = verdict(r, tr('DECISIÓN FINAL: EL ÁRBITRO', 'FINAL DECISION: THE REFEREE'), { top: 960, size: 46 });
    const tV = x.at('var'), tR = x.at(tr('recomienda', 'recommends')), tD = x.at(tr('decision', 'final')), tA = x.at(tr('arbitro', 'referee'));
    x.cue(tV, 'pop', 0.6); x.cue(tR, 'swipe', 0.7); x.cue(tD, 'rise', 0.5); x.cue(tA, 'whistle', 0.5); x.cue(tA, 'ding', 0.9);
    return (lt) => {
      head(lt);
      const a = pop(bA, lt, tV - 0.2); bA.style.transform = `scale(${lerp(0.6, 1, a)})`; m.scan(lt);
      cA.style.opacity = appear(lt, tR, 0.25);
      const ar = appear(lt, tR + 0.2, 0.3); arrow.style.opacity = ar; arrow.style.transform = `translateX(${(1 - ar) * -30 + Math.sin(lt * 6) * 5}px)`;
      const b = pop(bB, lt, tD - 0.2); bB.style.transform = `scale(${lerp(0.6, 1, b)})`;
      const on = lt >= tA;
      bB.style.borderColor = on ? C.cyan : C.lineStrong; bB.style.boxShadow = on ? `0 0 60px ${C.cyan}66` : 'none';
      cB.style.opacity = appear(lt, tA, 0.2); refEl.style.transform = `scale(${1 + 0.05 * Math.sin(lt * 7) * (on ? 1 : 0)})`;
      v.set(lt, tA + 0.15);
    };
  });

  // ───────────────────────── 7 · NOVEDAD 2026/27 ─────────────────────────
  scene('nuevo', (x) => {
    const r = x.root;
    const head = header(x, tr('NUEVO 2026/27', 'NEW 2026/27'), tr('PROTOCOLO VAR', 'VAR PROTOCOL'), tr('La segunda amarilla', 'The second yellow'), C.amber);
    const m = monitor(r, { x: 90, y: PY, w: 840, h: 400, text: '', stand: false });
    const c1 = card(m.screen, YEL, { x: 110, y: 90, w: 150, rot: -4 }), c2 = card(m.screen, YEL, { x: 345, y: 90, w: 150, rot: 3 }), c3 = card(m.screen, RED, { x: 580, y: 90, w: 150, rot: 5 });
    const sym = (t, left) => add(m.screen, `<div class="abs caption" style="left:${left}px;top:140px;width:85px;text-align:center;font-size:84px;font-weight:900;color:${C.muted}">${t}</div>`);
    sym('+', 260); sym('=', 495);
    const badge = add(m.screen, `<div class="abs mono" style="left:0;top:0;padding:6px 18px;background:${C.cyan};color:#121414;font-size:26px;font-weight:700;letter-spacing:.1em;border-bottom-right-radius:14px">VAR</div>`);
    const ring = add(m.screen, `<div class="abs" style="left:322px;top:66px;width:196px;height:258px;border:6px solid ${C.cyan};border-radius:20px;box-shadow:0 0 30px ${C.cyan}"></div>`);
    const cross = add(m.screen, `<div class="abs" style="left:350px;top:125px;width:140px;height:140px;color:${RED}">${I.cross}</div>`);
    const v = verdict(r, tr('CLARAMENTE ERRÓNEA: REVISABLE', 'CLEARLY WRONG: REVIEWABLE'), { top: 960, size: 44 });
    const tS = x.at(tr('segunda', 'second')), tE = x.at(tr('erronea', 'reviewed'));
    [0.25, 0.4, 0.55].forEach((t) => x.cue(t, 'pop', 0.6)); x.cue(tS, 'swipe', 0.7); x.cue(tE, 'buzz', 0.5); x.cue(tE + 0.25, 'ding', 0.9);
    return (lt) => {
      head(lt); m.scan(lt);
      [[c1, -4, 0.25], [c2, 3, 0.4], [c3, 5, 0.55]].forEach(([c, rot, t]) => { const s = pop(c, lt, t); c.style.transform = `rotate(${rot}deg) scale(${lerp(0.4, 1, s)})`; });
      const s = pop(ring, lt, tS); ring.style.transform = `scale(${lerp(1.4, 1, s)})`;
      const no = prog(lt, tE, 0.25); cross.style.opacity = no > 0 ? 1 : 0; cross.style.transform = `scale(${lerp(2.2, 1, Ease.outCubic(no))})`;
      c3.style.filter = `grayscale(${no}) brightness(${lerp(1, 0.5, no)})`;
      v.set(lt, tE + 0.25);
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { ref: tr('Protocolo VAR · Reglas de Juego 2026/27 (IFAB)', 'VAR protocol · Laws of the Game 2026/27 (IFAB)') }));
})();
