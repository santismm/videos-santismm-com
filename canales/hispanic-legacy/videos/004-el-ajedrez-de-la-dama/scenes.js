/* HISPANIC LEGACY #04 · "La dama del ajedrez fue durante siglos la pieza más débil" (ES / EN)
 * Fuente: hispanic-legacy.com/k/ajedrez-de-la-dama (verificada el 19-08-2026; se apoya en la monografía de
 * T. von der Lasa, Leipzig, 1897):
 *  resumen · En el último cuarto del siglo XV la dama y el alfil reciben los movimientos largos actuales.
 *  c2 · El libro de Lucena se imprime en Salamanca, donde era estudiante; 150 problemas con grabados y aperturas
 *       "a la manera nueva".
 *  c3 · Lucena llama al juego nuevo "De la Dama"; en Italia se llamó "alla rabiosa" (ediciones de Damiano
 *       desde 1512).
 *  c5 · Sin año impreso: se fecha por la dedicatoria a un príncipe que murió el 4-10-1497.
 *  c8 · Primera mención escrita de la captura al paso.
 *  c11 · La pieza medieval que la dama sustituye era una consejera débil ("Ferzia").
 *  c10/c14 · No está establecido quién movió así la dama por primera vez ni dónde; el ajedrez no es un invento
 *       español: llegó a Iberia desde el mundo islámico. Lucena es el tratado impreso más antiguo del juego nuevo.
 * Conocimiento general (no está en la ficha): la pieza medieval movía una casilla en diagonal; una dama en d4
 * domina 27 casillas en un tablero vacío.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn } = EUREKA.ui;
  const { endCard, stamp, stampIn, plate, plateIn, DARK, L } = EUREKA.hl;

  EUREKA.video = { keywords: L(['poderosa', 'débil', 'paso', 'consejera', 'dama', 'alfil', 'Lucena', '1497', 'rabiosa', 'sabe', 'imprimió'],
    ['powerful', 'weakest', 'one', 'counsellor', 'queen', 'bishop', 'Lucena', '1497', 'rabiosa', 'furious', 'nobody', 'printed']) };
  const row = (r, top, html, size = 30) => add(r, `<div class="abs" style="left:0;right:0;top:${top}px;text-align:center;font-size:${size}px">${html}</div>`);
  const PAPER = '#f8f0dc', INK = '#1a1814', SEPIA = '#4a4638';
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  /** Tablero 8×8. Casillas (f, r) con f, r ∈ 0..7 y r = 0 abajo. */
  function board(r, { x = 220, y = 490, size = 640 } = {}) {
    const c = size / 8;
    const el = add(r, `<div class="abs" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:14px;overflow:hidden;box-shadow:0 0 0 8px #3a2c18, 0 30px 70px rgba(0,0,0,.65)"></div>`);
    const hl = [];
    for (let rr = 7; rr >= 0; rr--) for (let f = 0; f < 8; f++) {
      const cell = add(el, `<div style="position:absolute;left:${f * c}px;top:${(7 - rr) * c}px;width:${c}px;height:${c}px;background:${(f + rr) % 2 ? '#e2d1a6' : '#5f7a63'}"><div style="position:absolute;inset:0;opacity:0"></div></div>`);
      hl[rr * 8 + f] = cell.firstElementChild;
    }
    const api = {
      el, c,
      /** Ilumina una casilla. */
      mark(f, rr, color, a) { const h = hl[rr * 8 + f]; h.style.background = color; h.style.opacity = a; },
      clear() { hl.forEach((h) => { h.style.opacity = 0; }); },
      piece(glyph, color = '#141210') {
        const p = add(el, `<div style="position:absolute;left:0;top:0;width:${c}px;height:${c}px;display:flex;align-items:center;justify-content:center;font:${c * 0.86}px 'DejaVu Sans',sans-serif;color:${color};text-shadow:0 0 3px #f8f0dc, 0 0 3px #f8f0dc, 0 4px 8px rgba(0,0,0,.5)">${glyph}</div>`);
        p.at = (f, rr, extra = '') => { p.style.transform = `translate(${f * c}px, ${(7 - rr) * c}px) ${extra}`; };
        return p;
      },
      /** Casillas alcanzables desde (f, r) en las direcciones dadas, con su distancia. */
      rays(f, rr, dirs = DIRS, max = 8) {
        const out = [];
        for (const [df, dr] of dirs) for (let k = 1; k <= max; k++) {
          const a = f + df * k, b = rr + dr * k;
          if (a < 0 || a > 7 || b < 0 || b > 7) break;
          out.push([a, b, k]);
        }
        return out;
      },
    };
    return api;
  }
  const DIAG = DIRS.slice(4);

  // ───────────────────────── 1 · HOOK: 27 casillas… o 4 ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const p1 = row(r, 330, pill(L('HOY: LA PIEZA MÁS PODEROSA', 'TODAY: THE MOST POWERFUL PIECE'), C.gold), 30);
    const p2 = row(r, 330, pill(L('DURANTE SIGLOS: LA MÁS DÉBIL', 'FOR CENTURIES: THE WEAKEST'), C.amber), 30);
    const cnt = add(r, `<div class="abs display" style="left:0;right:0;top:390px;text-align:center;font-size:58px;font-weight:900;color:${C.ink};text-shadow:0 6px 20px rgba(0,0,0,.8)"><span class="n" style="color:${C.gold}">0</span> ${L('casillas', 'squares')}</div>`);
    const b = board(r), q = b.piece('♛');
    const all = b.rays(3, 3), near = b.rays(3, 3, DIAG, 1);
    const tP = x.at(L('poderosa', 'powerful')), tB = x.at(L('pero', 'but')), tD = x.at(L('débil', 'weakest'));
    x.cue(0.1, 'pop', 0.6); x.cue(tP - 0.1, 'rise', 0.6); x.cue(tP + 0.35, 'ding', 0.7); x.cue(tB, 'swipe', 0.6); x.cue(tD + 0.05, 'boom', 0.9); x.shake(tD + 0.05, 14);
    return (lt) => {
      const weak = lt >= tD;
      p1.style.opacity = appear(lt, 0.15, 0.3) * (1 - prog(lt, tB, 0.3)); popIn(p2, lt, tB + 0.1, 0.7);
      b.clear();
      const fade = 1 - prog(lt, tB, 0.5);
      let n = 0;
      all.forEach(([f, rr, k]) => { const a = appear(lt, tP - 0.1 + k * 0.07, 0.2); if (a > 0.5) n++; b.mark(f, rr, C.gold, a * 0.78 * fade); });
      if (weak) near.forEach(([f, rr]) => b.mark(f, rr, C.amber, 0.85 * appear(lt, tD, 0.2)));
      const num = cnt.querySelector('.n');
      num.textContent = weak ? 4 : n; num.style.color = weak ? C.amber : C.gold;
      cnt.style.opacity = appear(lt, tP - 0.1, 0.2);
      cnt.style.transform = `scale(${1 + 0.18 * Math.sin(Math.PI * prog(lt, tD, 0.4))})`;
      q.at(3, 3, `scale(${1 + 0.06 * Math.sin(lt * 4)})`);
    };
  });

  // ───────────────────────── 2 · LA PIEZA MEDIEVAL ─────────────────────────
  scene('vieja', (x) => {
    const r = x.root;
    const p1 = row(r, 330, pill(L('AJEDREZ MEDIEVAL · 1 PASO EN DIAGONAL', 'MEDIEVAL CHESS · 1 DIAGONAL STEP'), C.ink), 28);
    const p2 = row(r, 398, pill(L('CONSEJERA, NO REINA', 'A COUNSELLOR, NOT A QUEEN'), C.amber), 30);
    const b = board(r), q = b.piece('♛', '#3a2c18');
    const path = [[3, 3], [4, 4], [3, 5], [2, 4], [3, 3], [4, 2], [3, 1], [2, 2], [3, 3]];
    const tS = x.at(L('paso', 'one')), tC = x.at(L('consejera', 'counsellor'));
    x.cue(0.2, 'pop', 0.6); for (let i = 0; i < 6; i++) x.cue(tS + i * 0.62 + 0.3, 'tick', 0.5); x.cue(tC, 'pop', 0.8);
    return (lt) => {
      popIn(p1, lt, 0.15, 0.7); popIn(p2, lt, tC - 0.1, 0.7);
      const u = Math.max(0, (lt - tS) / 0.62), i = Math.min(path.length - 2, Math.floor(u)), k = Ease.inOutCubic(Math.min(1, (u - i) * 1.5));
      const f = lerp(path[i][0], path[i + 1][0], k), rr = lerp(path[i][1], path[i + 1][1], k);
      b.clear();
      b.rays(path[i][0], path[i][1], DIAG, 1).forEach(([a, c]) => b.mark(a, c, C.amber, 0.7 * appear(lt, tS - 0.2, 0.3)));
      q.at(f, rr, `translateY(${-Math.sin(Math.PI * k) * 22}px)`);
    };
  });

  // ───────────────────────── 3 · EL CAMBIO ─────────────────────────
  scene('cambio', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs display" style="left:0;right:0;top:318px;text-align:center;font-size:${L(68, 66)}px;font-weight:900;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('FINALES DEL SIGLO XV', 'LATE 15TH CENTURY')}</div>`);
    const b = board(r), q = b.piece('♛'), bi = b.piece('♝');
    const qr = b.rays(3, 3), br = b.rays(5, 0, DIAG);
    const tQ = x.at(L('dama', 'queen')), tB = x.at(L('alfil', 'bishop')), tL = x.at(L('largos', 'long')), tC = x.at(L('cambia', 'changes'));
    x.cue(0.15, 'ding', 0.6); x.cue(tC, 'boom', 0.8); x.shake(tC, 10); x.cue(tQ, 'rise', 0.6); x.cue(tB, 'pop', 0.8); x.cue(tL, 'ding', 0.7);
    return (lt) => {
      popIn(head, lt, 0.1, 0.7);
      b.clear();
      qr.forEach(([f, rr, k]) => b.mark(f, rr, C.gold, 0.75 * appear(lt, tQ + k * 0.09, 0.2)));
      br.forEach(([f, rr, k]) => b.mark(f, rr, C.teal, 0.85 * appear(lt, tB + 0.1 + k * 0.09, 0.2)));
      q.at(3, 3, `scale(${1 + 0.25 * Math.sin(Math.PI * prog(lt, tQ, 0.4))})`);
      const s = spring(lt, tB - 0.05, 0.4); bi.style.opacity = s > 0 ? 1 : 0; bi.at(5, 0, `scale(${lerp(0.3, 1, s)})`);
    };
  });

  // ───────────────────────── 4 · LUCENA, SALAMANCA ─────────────────────────
  scene('lucena', (x) => {
    const r = x.root;
    const pl = plate(r, 'Lucena', L('ESTUDIANTE EN SALAMANCA', 'STUDENT AT SALAMANCA'), 330);
    const yr = add(r, `<div class="abs display" style="right:100px;top:336px;font-size:118px;font-weight:900;line-height:1;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.8)">1497</div>`);
    const items = L(['150 PROBLEMAS CON GRABADOS', 'APERTURAS «A LA MANERA NUEVA»', 'LA CAPTURA AL PASO, POR ESCRITO'], ['150 PROBLEMS WITH WOODCUTS', 'OPENINGS “IN THE NEWER MANNER”', 'EN PASSANT, FIRST WRITTEN DOWN']);
    const paper = add(r, `<div class="abs" style="left:130px;top:540px;width:820px;height:620px;border-radius:14px;background:${PAPER};box-shadow:0 30px 70px rgba(0,0,0,.65);transform-origin:50% 0">
        <div class="mono" style="padding:26px 40px 0;font-size:23px;font-weight:700;letter-spacing:.12em;color:${SEPIA};text-align:center">${L('SALAMANCA · COMO MUY TARDE, 1497', 'SALAMANCA · 1497 AT THE LATEST')}</div>
        <div style="margin:14px 40px 0;height:3px;background:${SEPIA}"></div>
        <div class="display" style="padding:18px 40px 0;font-size:44px;font-weight:700;color:${INK};text-align:center;line-height:1.1">${L('El primer libro impreso<br>sobre el ajedrez nuevo', 'The first printed book<br>on the new chess')}</div>
        <div style="margin:24px 44px 0;display:flex;flex-direction:column;gap:16px">
          ${items.map((t) => `<div class="it" style="display:flex;align-items:center;gap:18px"><div style="width:50px;height:50px;border-radius:10px;background:${C.brand};color:${PAPER};padding:8px;box-sizing:border-box;flex:none">${I.check}</div><span class="mono" style="font-size:29px;font-weight:700;letter-spacing:.03em;color:${INK}">${t}</span></div>`).join('')}
        </div>
        <div class="nm" style="position:absolute;left:40px;right:40px;bottom:30px;border-radius:16px;background:${INK};padding:16px 0;text-align:center">
          <span class="mono" style="font-size:24px;font-weight:700;letter-spacing:.12em;color:#b9ad92">${L('LO LLAMA', 'HE CALLS IT')}</span><br><span class="display" style="font-size:70px;font-weight:900;color:${C.gold};line-height:1.1">«De la Dama» ♛</span></div></div>`);
    const its = [...paper.querySelectorAll('.it')], nm = paper.querySelector('.nm');
    const tB = x.at(L('libro', 'book')), tLu = x.at('lucena'), tY = x.at('1497'), tN = x.at(L('llama', 'calls'));
    const tw = [tLu + 0.7, tLu + 1.7, tY + 0.4];
    x.cue(tB - 0.2, 'whoosh', 0.8); x.cue(tLu - 0.15, 'swipe', 0.6); x.cue(tY, 'ding', 0.7); tw.forEach((t) => x.cue(t, 'pop', 0.6)); x.cue(tN - 0.3, 'rise', 0.7); x.cue(tN + 0.1, 'boom', 0.9); x.shake(tN + 0.1, 10);
    return (lt) => {
      plateIn(pl, lt, tLu - 0.2); popIn(yr, lt, tY - 0.1, 0.6);
      const k = Ease.outCubic(prog(lt, tB - 0.3, 0.5));
      paper.style.opacity = k; paper.style.transform = `translateY(${(1 - k) * 140}px) rotate(${lerp(4, -1, k)}deg)`;
      its.forEach((e, i) => { const s = spring(lt, tw[i], 0.35); e.style.opacity = s > 0 ? 1 : 0.12; });
      const s = spring(lt, tN + 0.1, 0.4); nm.style.opacity = s > 0 ? 1 : 0; nm.style.transform = `scale(${lerp(0.7, 1, s)})`;
    };
  });

  // ───────────────────────── 5 · «ALLA RABIOSA» ─────────────────────────
  scene('rabiosa', (x) => {
    const r = x.root;
    const card = (top, where, name, color, sub) => add(r, `<div class="abs" style="left:110px;top:${top}px;width:860px;height:250px;border-radius:28px;background:${DARK};border:4px solid ${color};padding:26px 40px;box-sizing:border-box">
        <div class="mono" style="font-size:27px;font-weight:700;letter-spacing:.14em;color:${C.muted}">${where}</div>
        <div class="display" style="font-size:96px;font-weight:900;color:${color};line-height:1.1">${name}</div>
        ${sub ? `<div class="mono" style="font-size:23px;font-weight:500;color:${C.muted}">${sub}</div>` : ''}</div>`);
    const a = card(350, L('EN ESPAÑA', 'IN SPAIN'), '«De la Dama»', C.gold);
    const b = card(650, L('EN ITALIA', 'IN ITALY'), '«Alla rabiosa»', C.amber, L('ediciones de Damiano, desde 1512', 'Damiano’s editions, from 1512'));
    const st = stamp(r, L('A LA RABIOSA', 'THE FURIOUS WAY'), 985, C.amber, L(96, 80));
    const tI = x.at(L('italia', 'italy')), tA = x.at('alla'), tR = x.at(L('rabiosa', 'furious'), L(1, 0));
    x.cue(0.15, 'pop', 0.6); x.cue(tI, 'swipe', 0.6); x.cue(tA, 'boom', 0.9); x.shake(tA, 16); x.cue(tR, 'stamp', 1); x.shake(tR, 12);
    return (lt) => {
      popIn(a, lt, 0.1, 0.8);
      const s = popIn(b, lt, tA - 0.05, 0.6);
      if (s >= 1) b.style.transform = `translate(${Math.sin(lt * 47) * 3}px, ${Math.cos(lt * 39) * 3}px)`;
      stampIn(st, lt, tR, -5);
    };
  });

  // ───────────────────────── 6 · EL MATIZ ─────────────────────────
  scene('matiz', (x) => {
    const r = x.root;
    const qn = add(r, `<div class="abs display" style="left:0;right:0;top:326px;text-align:center;font-size:${L(70, 60)}px;font-weight:900;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('¿INVENTO ESPAÑOL?', 'A SPANISH INVENTION?')}</div>`);
    const rw = (top, label, value, color, icon) => add(r, `<div class="abs" style="left:96px;top:${top}px;width:888px;height:230px;border-radius:28px;background:${DARK};border:4px solid ${color};padding:28px 36px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:20px">
        <div><div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.1em;color:${C.muted};line-height:1.35">${label}</div>
          <div class="display" style="font-size:68px;font-weight:900;color:${color};line-height:1.15;white-space:nowrap">${value}</div></div>
        <div style="width:110px;height:110px;color:${color};flex:none;display:flex;align-items:center;justify-content:center">${icon}</div></div>`);
    const r1 = rw(480, L('QUIÉN MOVIÓ ASÍ LA DAMA<br>POR PRIMERA VEZ', 'WHO FIRST MOVED<br>THE QUEEN THAT WAY'), L('No se sabe', 'Nobody knows'), C.amber, `<span class="display" style="font-size:120px;font-weight:900">?</span>`);
    const r2 = rw(740, L('PRIMER LIBRO IMPRESO<br>SOBRE EL JUEGO NUEVO', 'FIRST PRINTED BOOK<br>ON THE NEW GAME'), 'Lucena · Salamanca', C.green, I.check);
    const fn = add(r, `<div class="abs mono" style="left:96px;right:96px;top:1010px;text-align:center;font-size:25px;line-height:1.45;font-weight:700;color:${C.muted}">${L('El ajedrez no es un invento español:<br>llegó a Iberia desde el mundo islámico.', 'Chess is not a Spanish invention:<br>it reached Iberia from the Islamic world.')}</div>`);
    const tK = x.at(L('sabe', 'knows')), tW = x.at(L('sabemos', 'what')), tP = x.at(L('imprimió', 'printed'));
    x.cue(0.15, 'swipe', 0.6); x.cue(tK, 'buzz', 0.5); x.cue(tW, 'pop', 0.6); x.cue(tP - 0.3, 'rise', 0.6); x.cue(tP, 'ding', 0.9);
    return (lt) => {
      popIn(qn, lt, 0.1, 0.7);
      popIn(r1, lt, tK - 0.2, 0.75);
      popIn(r2, lt, tP - 0.25, 0.75);
      fn.style.opacity = appear(lt, tW, 0.5);
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/ajedrez-de-la-dama', tCompartir: 0.3 }));
})();
