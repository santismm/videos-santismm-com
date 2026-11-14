/* FÚTBOL ATLAS #06 · "Libre directo vs indirecto" (ES + EN con el mismo archivo: tr('español', 'English'))
 * Fuente: futbolatlas.app/k/direct-vs-indirect-free-kick, /k/direct-free-kick y /k/indirect-free-kick
 * (Reglas 12 y 13, Reglas de Juego 2026/27 de The IFAB; verificado en la web el 2026-08-08):
 *  - Directo: se puede marcar directamente. Indirecto: solo vale si otro jugador (de cualquier equipo) toca el balón.
 *  - El árbitro señala el indirecto con el brazo levantado hasta que el balón toca a otro jugador o sale.
 *  - Un indirecto que entra sin tocar a nadie se reanuda con saque de meta.
 *  - Directo: infracciones con contacto (imprudentes, temerarias o con fuerza excesiva), manos, agarrones…
 *    Indirecto: juego peligroso, obstaculizar sin contacto, protestar, fuera de juego e infracciones de mano del portero.
 *  - En el área propia, la infracción de directo es penalti; la de indirecto sigue siendo libre indirecto.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { tr, header, pitch, token, ball, tag, stamp, verdict, endCard } = EUREKA.fa;
  const en = EUREKA.lang === 'en';

  EUREKA.video = {
    footer: tr('Reglas 12 y 13 · IFAB 2026/27 · futbolatlas.app', 'Laws 12 and 13 · IFAB 2026/27 · futbolatlas.app'),
    keywords: en ? ['arm', 'straight', 'another', 'not', 'goal', 'penalty', 'indirect', 'handball'] : ['brazo', 'directo', 'otro', 'gol', 'puerta', 'penalti', 'indirecto', 'manos'],
  };
  const DIR = C.cyan, IND = C.amber, BAD = '#ff6b5e', SKIN = '#e8ece8';
  const pop = (el, lt, t, d = 0.4) => { const s = spring(lt, t, d); el.style.opacity = s > 0 ? 1 : 0; return s; };
  const T = { dir: tr('DIRECTO', 'DIRECT'), ind: tr('INDIRECTO', 'INDIRECT') };

  /** Árbitro de frente (genérico). up(k): levanta el brazo derecho de la imagen de 0 a 1. */
  function referee(parent, { x, y, w = 420 }) {
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 1.45}px">
      <svg viewBox="0 0 420 610" style="width:100%;height:100%" stroke-linecap="round">
        <line x1="180" y1="455" x2="172" y2="600" stroke="${SKIN}" stroke-width="44"/><line x1="240" y1="455" x2="248" y2="600" stroke="${SKIN}" stroke-width="44"/>
        <rect x="140" y="400" width="140" height="92" rx="24" fill="#111"/>
        <line x1="132" y1="262" x2="104" y2="440" stroke="#ffd400" stroke-width="44"/><circle cx="103" cy="452" r="24" fill="${SKIN}"/>
        <g class="arm"><line x1="288" y1="262" x2="288" y2="440" stroke="#ffd400" stroke-width="44"/><circle cx="288" cy="456" r="26" fill="${SKIN}"/></g>
        <rect x="132" y="230" width="156" height="210" rx="42" fill="#ffd400"/>
        <rect x="222" y="270" width="34" height="42" rx="6" fill="#111"/>
        <circle cx="210" cy="168" r="50" fill="${SKIN}"/></svg></div>`);
    const arm = el.querySelector('.arm');
    el.up = (k) => arm.setAttribute('transform', `rotate(${-172 * k} 288 262)`);
    return el;
  }

  /** Etiqueta de columna (DIRECTO / INDIRECTO). */
  const colTag = (parent, txt, col, left, top, w = 400) => add(parent, `<div class="abs caption" style="left:${left}px;top:${top}px;width:${w}px;height:66px;border-radius:16px;background:${col};color:#121414;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:900;letter-spacing:.04em">${txt}</div>`);
  const chip = (parent, txt, col, left, top, w = 400) => add(parent, `<div class="abs caption" style="left:${left}px;top:${top}px;width:${w}px;height:84px;border-radius:16px;background:${C.surface};border:3px solid ${col};color:${C.ink};display:flex;align-items:center;justify-content:center;font-size:${txt.length > 15 ? 34 : 40}px;font-weight:800;text-align:center;box-sizing:border-box">${txt}</div>`);

  // ───────────────────────── 1 · GANCHO: el brazo arriba ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const pill = add(r, `<div class="abs mono" style="left:0;right:0;top:322px;text-align:center;font-size:27px;font-weight:700;letter-spacing:.12em"><span style="padding:10px 22px;border-radius:999px;background:${IND};color:#121414">${tr('LIBRE DIRECTO VS INDIRECTO', 'DIRECT VS INDIRECT FREE KICK')}</span></div>`);
    const ref = referee(r, { x: 330, y: 400, w: 420 });
    const armTag = add(r, `<div class="abs mono" style="left:120px;top:470px;padding:8px 18px;border-radius:12px;background:rgba(18,20,20,.92);border:3px solid ${IND};color:${IND};font-size:30px;font-weight:700;letter-spacing:.06em">${tr('BRAZO ARRIBA', 'ARM UP')} ▶</div>`);
    const st = stamp(r, tr('No entra directo', 'Not straight in'), { x: en ? 215 : 190, y: 1050, size: 68, rot: -4 });
    const tA = x.at(tr('levanta', 'raises')), tN = x.at(tr('no', 'cannot'));
    x.cue(0.02, 'whistle', 0.9); x.cue(tA, 'swipe', 0.7); x.cue(tN, 'stamp', 1); x.shake(tN, 16);
    return (lt) => {
      ref.up(Ease.outBack(prog(lt, 0.05, 0.5)));
      ref.style.transform = `scale(${lerp(1.08, 1, Ease.outCubic(prog(lt, 0, 0.5)))})`;
      const s = pop(armTag, lt, tA); armTag.style.transform = `scale(${lerp(0.5, 1, s)})`;
      st.set(lt, tN);
    };
  });

  // ───────────────────────── 2 · DIFERENCIA 1: el gol ─────────────────────────
  scene('marcar', (x) => {
    const r = x.root;
    const head = header(x, tr('DIFERENCIA 1/3', 'DIFFERENCE 1/3'), tr('REGLA 13', 'LAW 13'), tr('El gol', 'Scoring'));
    const cA = colTag(r, T.dir, DIR, 90, 480), cB = colTag(r, T.ind, IND, 530, 480);
    const pA = pitch(r, { x: 90, y: 566, w: 400, h: 330 }), pB = pitch(r, { x: 530, y: 566, w: 400, h: 330 });
    const mk = (p) => { const g = token(p, 'gk'); const k = token(p, 'atk'); const b = ball(p); return { g, k, b }; };
    const A = mk(pA), B = mk(pB);
    const mate = token(pB, 'atk');
    const t2 = tag(pB, 46, 34, tr('2.º TOQUE', '2nd TOUCH'), IND, 34);
    const gA = tag(pA, 34, 12, tr('¡GOL!', 'GOAL!'), DIR, 20), gB = tag(pB, 34, 12, tr('¡GOL!', 'GOAL!'), IND, 20);
    const rA = chip(r, tr('Directo a la red', 'Straight into the net'), DIR, 90, 916), rB = chip(r, tr('Necesita otro toque', 'Needs another touch'), IND, 530, 916);
    const tDir = x.at(tr('directo', 'direct')), tD = x.at(tr('derecho', 'straight')), tInd = x.at(tr('indirecto', 'indirect')), tO = x.at(tr('otro', 'another'));
    x.cue(tDir, 'pop', 0.6); x.cue(tD, 'kick', 1); x.cue(tD + 0.45, 'ding', 0.8); x.cue(tInd, 'pop', 0.6);
    x.cue(tO - 0.2, 'kick', 0.7); x.cue(tO + 0.35, 'kick', 1); x.cue(tO + 0.8, 'ding', 0.8);
    return (lt) => {
      head(lt);
      const a = pop(cA, lt, tDir - 0.1), b2 = pop(cB, lt, tInd - 0.1);
      cA.style.transform = `scale(${lerp(0.6, 1, a)})`; cB.style.transform = `scale(${lerp(0.6, 1, b2)})`;
      pA.el.style.opacity = appear(lt, 0.5, 0.35); pB.el.style.opacity = appear(lt, 0.5, 0.35) * (lt < tInd - 0.1 ? 0.45 : 1);
      const s = Ease.outCubic(prog(lt, tD, 0.45));
      A.k.at(34, 36, 0.75); A.g.at(34 - 6 * s, 4.5, 0.75); A.b.at(lerp(34, 44, s), lerp(31, -0.5, s));
      gA.style.opacity = s >= 1 ? 1 : 0; pop(rA, lt, tD + 0.45);
      const p1 = Ease.inOutCubic(prog(lt, tO - 0.2, 0.5)), p2 = Ease.outCubic(prog(lt, tO + 0.35, 0.45));
      B.k.at(24, 36, 0.75); mate.at(50, 34, 0.75); B.g.at(34 + 6 * p2, 4.5, 0.75);
      B.b.at(lerp(lerp(24, 48, p1), 22, p2), lerp(lerp(31, 29.5, p1), -0.5, p2));
      t2.style.opacity = p1 >= 1 ? 1 : 0; gB.style.opacity = p2 >= 1 ? 1 : 0; pop(rB, lt, tO + 0.8);
    };
  });

  // ───────────────────────── 3 · INDIRECTO SIN TOCAR: saque de puerta ─────────────────────────
  scene('saque', (x) => {
    const r = x.root;
    const head = header(x, tr('OJO', 'WATCH OUT'), tr('REGLA 13', 'LAW 13'), tr('Indirecto que nadie toca', 'Indirect, untouched'), IND);
    const p = pitch(r, { y: 520, h: 490 });
    const gk = token(p, 'gk'), k = token(p, 'atk'), b = ball(p);
    [[24, 20], [30, 20], [36, 20]].forEach(([a, c]) => token(p, 'def').at(a, c));
    const q = tag(p, 34, 6, tr('¿GOL?', 'GOAL?'), IND, 30);
    const st = stamp(p.el, tr('No es gol', 'No goal'), { x: en ? 250 : 215, y: 250, size: 88, rot: -7 });
    const gkTag = tag(p, 34, 5.5, tr('SAQUE DE PUERTA', 'GOAL KICK'), DIR, 34);
    const v = verdict(r, tr('SIN TOCAR = SAQUE DE PUERTA', 'UNTOUCHED = GOAL KICK'), { size: 46 });
    const tE = x.at(tr('entra', 'flies')), tN = x.at(tr('no', 'not')), tS = en ? x.at('goal', 1) : x.at('saque');
    x.cue(tE - 0.3, 'kick', 1); x.cue(tN, 'stamp', 1); x.shake(tN, 14); x.cue(tN, 'buzz', 0.5); x.cue(tS, 'ding', 0.9);
    return (lt) => {
      head(lt);
      const s = Ease.outCubic(prog(lt, tE - 0.3, 0.6)), back = Ease.inOutCubic(prog(lt, tS - 0.2, 0.4));
      k.at(40, 30); gk.at(34 - 4 * s * (1 - back), 2.6);
      b.at(lerp(lerp(40, 44, s), 36, back), lerp(lerp(27.5, -0.4, s), 5.5, back));
      q.style.opacity = s >= 1 && lt < tN ? 1 : 0;
      st.set(lt, tN); st.style.opacity = st.style.opacity * (1 - prog(lt, tS - 0.2, 0.3));
      gkTag.style.opacity = appear(lt, tS, 0.2);
      v.set(lt, tS);
    };
  });

  // ───────────────────────── 4 · DIFERENCIA 2: la falta ─────────────────────────
  scene('faltas', (x) => {
    const r = x.root;
    const head = header(x, tr('DIFERENCIA 2/3', 'DIFFERENCE 2/3'), tr('REGLA 12', 'LAW 12'), tr('La falta', 'The offence'));
    const cA = colTag(r, T.dir, DIR, 90, 480), cB = colTag(r, T.ind, IND, 530, 480);
    const sub = (txt, col, left) => add(r, `<div class="abs mono" style="left:${left}px;top:558px;width:400px;text-align:center;font-size:23px;font-weight:700;letter-spacing:.08em;color:${col}">${txt}</div>`);
    const sA = sub(tr('CONTACTO Y MANOS', 'CONTACT AND HANDBALL'), DIR, 90), sB = sub(tr('TÉCNICAS, SIN CONTACTO', 'TECHNICAL, NO CONTACT'), IND, 530);
    const LA = en ? ['Trip', 'Push', 'Holding', 'Handball'] : ['Zancadilla', 'Empujón', 'Agarrón', 'Mano'];
    const LB = en ? ['Dangerous play', 'Offside', 'Back-pass to the keeper'] : ['Juego peligroso', 'Fuera de juego', 'Cesión al portero'];
    const WA = en ? ['trips', 'pushes', 'holding', 'handball'] : ['zancadillas', 'empujones', 'agarrones', 'manos'];
    const WB = en ? ['dangerous', 'offside', 'back'] : ['peligroso', 'fuera', 'cesion'];
    const chA = LA.map((t, i) => chip(r, t, DIR, 90, 610 + i * 100)), chB = LB.map((t, i) => chip(r, t, IND, 530, 610 + i * 100));
    const tA = WA.map((w) => x.at(w)), tB = WB.map((w) => x.at(w));
    const tDir = x.at(tr('directo', 'direct')), tInd = x.at(tr('indirecto', 'indirect'));
    x.cue(tDir, 'stamp', 0.7); x.cue(tInd, 'stamp', 0.7); [...tA, ...tB].forEach((t) => x.cue(t, 'pop', 0.7));
    return (lt) => {
      head(lt);
      const a = pop(cA, lt, tDir - 0.1), b = pop(cB, lt, tInd - 0.1);
      cA.style.transform = `scale(${lerp(0.6, 1, a)})`; cB.style.transform = `scale(${lerp(0.6, 1, b)})`;
      sA.style.opacity = appear(lt, tDir + 0.6, 0.3); sB.style.opacity = appear(lt, tInd + 0.6, 0.3);
      chA.forEach((c, i) => { const s = pop(c, lt, tA[i] - 0.08); c.style.transform = `translateX(${(1 - s) * -80}px)`; });
      chB.forEach((c, i) => { const s = pop(c, lt, tB[i] - 0.08); c.style.transform = `translateX(${(1 - s) * 80}px)`; });
    };
  });

  // ───────────────────────── 5 · DIFERENCIA 3: dentro del área ─────────────────────────
  scene('area', (x) => {
    const r = x.root;
    const head = header(x, tr('DIFERENCIA 3/3', 'DIFFERENCE 3/3'), tr('REGLAS 13 Y 14', 'LAWS 13 AND 14'), tr('Dentro del área', 'Inside the box'));
    const p = pitch(r, { y: 500, h: 310 });
    const zone = add(p.items, `<div class="abs" style="left:${(34 - 20.16) * p.s}px;top:2px;width:${40.32 * p.s}px;height:${16.5 * p.s}px;background:rgba(255,255,255,.10);border:4px solid #fff;box-sizing:border-box"></div>`);
    token(p, 'gk').at(34, 1.6);
    const hitA = add(p.items, `<div class="abs" style="left:${44 * p.s - 50}px;top:${12 * p.s - 50}px;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle, ${DIR}, transparent 70%)"></div>`);
    const hitB = add(p.items, `<div class="abs" style="left:${20 * p.s - 50}px;top:${8 * p.s - 50}px;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle, ${IND}, transparent 70%)"></div>`);
    const bA = ball(p), bB = ball(p);
    const tgA = tag(p, 34, 11, tr('PENALTI', 'PENALTY'), DIR, 26), tgB = tag(p, 20, 8, tr('INDIRECTO AQUÍ', 'INDIRECT HERE'), IND, -64);
    const row = (lab, col, res, top) => add(r, `<div class="abs" style="left:90px;width:840px;top:${top}px;height:112px;border-radius:22px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:20px;padding:0 24px;box-sizing:border-box">
        <div class="caption" style="padding:8px 18px;border-radius:14px;background:${col};color:#121414;font-size:34px;font-weight:900">${lab}</div>
        <div style="width:50px;height:50px;color:${C.muted}"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 32h46M36 14l18 18-18 18"/></svg></div>
        <div class="res caption" style="font-size:${res.length > 16 ? 40 : 52}px;font-weight:900;color:${col};flex:1">${res}</div></div>`);
    const rA = row(T.dir, DIR, tr('PENALTI', 'PENALTY'), 836), rB = row(T.ind, IND, tr('LIBRE INDIRECTO', 'INDIRECT FREE KICK'), 964);
    const tF = x.at(tr('directo', 'direct')), tP = x.at(tr('penalti', 'penalty')), tI = x.at(tr('indirecto', 'indirect')), tL = x.at(tr('sigue', 'stays'));
    x.cue(tF, 'stamp', 0.7); x.shake(tF, 8); x.cue(tP, 'whistle', 0.7); x.cue(tP, 'ding', 0.8); x.cue(tI, 'stamp', 0.6); x.cue(tL, 'pop', 0.8);
    return (lt) => {
      head(lt);
      zone.style.opacity = appear(lt, 1.3, 0.3);
      hitA.style.opacity = lt >= tF ? Math.max(0.25, 1 - (lt - tF) * 1.5) : 0;
      hitB.style.opacity = lt >= tI ? Math.max(0.25, 1 - (lt - tI) * 1.5) : 0;
      const m = Ease.inOutCubic(prog(lt, tP - 0.3, 0.4));
      bA.at(lerp(44, 34, m), lerp(12, 11, m)); bA.style.opacity = lt >= tF ? 1 : 0;
      bB.at(20, 8); bB.style.opacity = lt >= tI ? 1 : 0;
      tgA.style.opacity = appear(lt, tP, 0.2); tgB.style.opacity = appear(lt, tL, 0.2);
      const a = pop(rA, lt, tF - 0.1), b = pop(rB, lt, tI - 0.1);
      rA.style.transform = `translateX(${(1 - a) * -100}px)`; rB.style.transform = `translateX(${(1 - b) * -100}px)`;
      const ra = spring(lt, tP, 0.35), rb = spring(lt, tL, 0.35);
      rA.querySelector('.res').style.opacity = ra > 0 ? 1 : 0; rA.querySelector('.res').style.transform = `scale(${lerp(1.5, 1, ra)})`; rA.querySelector('.res').style.transformOrigin = '0 50%';
      rB.querySelector('.res').style.opacity = rb > 0 ? 1 : 0; rB.querySelector('.res').style.transform = `scale(${lerp(1.5, 1, rb)})`; rB.querySelector('.res').style.transformOrigin = '0 50%';
    };
  });

  // ───────────────────────── 6 · TESIS: mira el brazo ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const t1 = add(r, `<div class="abs display" style="left:0;right:0;top:330px;text-align:center;font-size:72px;font-weight:700;font-style:italic;color:${C.ink}">${tr('Mira el brazo', 'Watch the arm')}</div>`);
    const ref = referee(r, { x: 345, y: 440, w: 390 });
    const v = verdict(r, tr('BRAZO ARRIBA = INDIRECTO', 'ARM UP = INDIRECT'), { top: 1010, color: IND, size: 50 });
    const sub = add(r, `<div class="abs mono" style="left:90px;width:840px;top:1150px;text-align:center;font-size:23px;font-weight:700;color:${C.muted}">${tr('hasta que otro jugador toca el balón o sale del campo', 'until another player touches the ball or it goes out of play')}</div>`);
    const tB = x.at(tr('brazo', 'arm'), 1), tI = x.at(tr('indirecto', 'indirect'));
    x.cue(tB, 'rise', 0.6); x.cue(tI, 'boom', 0.8); x.shake(tI, 12);
    return (lt) => {
      t1.style.opacity = appear(lt, 0.15, 0.3);
      ref.up(Ease.outBack(prog(lt, tB - 0.1, 0.5)));
      v.set(lt, tI);
      sub.style.opacity = appear(lt, tI + 0.4, 0.3);
    };
  });

  // ───────────────────────── 7 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { ref: tr('Reglas 12 y 13 · Reglas de Juego 2026/27 (IFAB)', 'Laws 12 and 13 · Laws of the Game 2026/27 (IFAB)') }));
})();
