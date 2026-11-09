/* EUREKA #03 · "Funciona una vez ≠ funciona siempre" (consistencia: pass^k)
 * Fuentes: articles.santismm.com · "El cronómetro y el examen" (pass^k = probabilidad de acertar todos los
 * intentos; "exige pass^k y una auditoría de fallos") y τ-bench, Yao et al. 2024 (arXiv 2406.12045):
 * "succeed on <50% of the tasks… pass^8 <25% in retail". El 0,9^8 ≈ 43 % es un ejemplo ilustrativo.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;

  EUREKA.video = { keywords: ['siempre', '43%', '50%', '25%', 'falla', 'error'] };

  // Círculo de intento: estado '?', 'ok', 'ko' o vacío
  function attempt(parent, x, y, size) {
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;border:4px solid ${C.lineStrong};background:${C.surface};display:flex;align-items:center;justify-content:center;box-sizing:border-box;color:${C.faint}">
        <div class="in display" style="width:58%;height:58%;display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px;font-weight:700"></div></div>`);
    let cur = null;
    return {
      el,
      set(state) {
        if (state === cur) return;
        cur = state;
        const inn = el.querySelector('.in');
        const col = state === 'ok' ? C.green : state === 'ko' ? C.red : state === '?' ? C.amber : C.lineStrong;
        el.style.borderColor = col;
        el.style.background = state === 'ok' ? 'rgba(16,185,129,.15)' : state === 'ko' ? 'rgba(251,44,54,.15)' : C.surface;
        el.style.boxShadow = state === 'ok' || state === 'ko' ? `0 0 26px ${col}66` : 'none';
        inn.style.color = col;
        inn.innerHTML = state === 'ok' ? I.check : state === 'ko' ? I.cross : state === '?' ? '?' : '';
      },
    };
  }

  // ───────────────────────── 1 · HOOK: la demo y los 8 intentos ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:150px;width:780px;top:350px;height:400px;border-radius:34px;background:${C.surface};border:3px solid ${C.lineStrong};box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div class="mono" style="position:absolute;left:34px;top:28px;font-size:26px;font-weight:700;letter-spacing:.14em;color:${C.muted}">DEMO · INTENTO 1</div>
        <div class="mono" style="position:absolute;right:34px;top:28px;font-size:24px;font-weight:700;color:${C.rose};display:flex;align-items:center;gap:10px"><i style="width:16px;height:16px;border-radius:50%;background:${C.rose}"></i>EN DIRECTO</div></div>`);
    const big = attempt(card, 290, 110, 200);
    const spin = add(card, `<svg class="abs" width="200" height="200" viewBox="0 0 200 200" style="left:290px;top:110px"><circle cx="100" cy="100" r="84" fill="none" stroke="${C.cyan}" stroke-width="12" stroke-linecap="round" stroke-dasharray="140 400"/></svg>`);
    const wait = add(card, `<div class="abs mono" style="left:0;right:0;top:330px;text-align:center;font-size:28px;font-weight:700;letter-spacing:.1em;color:${C.muted}">EJECUTANDO TAREA…</div>`);
    const okTxt = add(card, `<div class="abs display" style="left:0;right:0;top:322px;text-align:center;font-size:44px;font-weight:700;color:${C.green}">¡Funciona!</div>`);
    const slots = Array.from({ length: 8 }, (_, i) => attempt(r, 131 + i * 104, 840, 88));
    const ask = add(r, `<div class="abs display" style="left:0;right:0;top:960px;text-align:center;font-size:64px;font-weight:700;color:${C.amber}">¿Y las 8 siguientes?</div>`);
    const tD = x.at('demo'), tO = x.at('ocho'), tS = x.at('siguientes');
    x.cue(tD, 'ding', 0.8);
    slots.forEach((_, i) => x.cue(tO - 0.1 + i * 0.07, 'tick', 0.4));
    x.cue(tS + 0.2, 'pop', 0.6);
    return (lt) => {
      card.style.opacity = 1;
      const s = spring(lt, tD - 0.1, 0.45);
      big.set(s > 0 ? 'ok' : null);
      big.el.style.transform = `scale(${s > 0 ? lerp(0.4, 1, s) : 1})`;
      okTxt.style.opacity = appear(lt, tD + 0.2, 0.3);
      spin.style.opacity = s > 0 ? 0 : 1; spin.style.transform = `rotate(${lt * 420}deg)`;
      wait.style.opacity = s > 0 ? 0 : 1;
      slots.forEach((sl, i) => {
        const k = spring(lt, tO - 0.15 + i * 0.07, 0.35);
        sl.el.style.opacity = k > 0 ? 1 : 0;
        sl.set(k > 0 ? '?' : null);
        sl.el.style.transform = `scale(${lerp(0.3, 1, k) * (1 + 0.06 * Math.sin(lt * 6 + i))})`;
      });
      popIn(ask, lt, tS - 0.1, 0.6);
    };
  });

  // ───────────────────────── 2 · DOS MÉTRICAS ─────────────────────────
  scene('metricas', (x) => {
    const r = x.root;
    const col = (left, color, title, sub, foot) => add(r, `<div class="abs" style="left:${left}px;top:360px;width:400px;height:660px;border-radius:34px;background:${C.surface};border:3px solid ${color};box-shadow:0 0 50px ${color}33;display:flex;flex-direction:column;align-items:center;padding-top:40px;box-sizing:border-box">
        <div class="mono" style="font-size:66px;font-weight:700;color:${color}">${title}</div>
        <div class="display" style="font-size:38px;font-weight:700;color:${C.ink};margin-top:14px;text-align:center;line-height:1.1">${sub}</div>
        <div class="viz" style="position:relative;width:320px;height:250px;margin-top:30px"></div>
        <div class="mono" style="font-size:22px;font-weight:700;color:${C.muted};text-align:center;line-height:1.35;letter-spacing:.04em;margin-top:18px">${foot}</div></div>`);
    const L = col(110, C.cyan, 'pass@1', 'acertar<br>una vez', 'LO QUE MIDEN<br>LOS RANKINGS');
    const R = col(570, C.amber, 'pass<sup style="font-size:.6em">k</sup>', 'acertar<br>todas las veces', 'LO QUE IMPORTA<br>EN PRODUCCIÓN');
    const one = attempt(L.querySelector('.viz'), 85, 50, 150);
    const many = Array.from({ length: 8 }, (_, i) => attempt(R.querySelector('.viz'), 10 + (i % 4) * 78, 30 + Math.floor(i / 4) * 100, 66));
    const tR = x.at('rankings'), tU = x.at('una'), tE = x.at('empresa'), tS = x.at('siempre');
    x.cue(tU, 'ding', 0.6); x.cue(tE, 'pop', 0.6);
    many.forEach((_, i) => x.cue(tS - 0.1 + i * 0.06, 'tick', 0.4));
    return (lt) => {
      popIn(L, lt, tR - 0.3, 0.7);
      one.set(lt > tU ? 'ok' : null);
      popIn(R, lt, tE - 0.2, 0.7);
      many.forEach((m, i) => m.set(lt > tS - 0.1 + i * 0.06 ? 'ok' : null));
      L.style.filter = lt > tE + 0.2 ? 'opacity(.45)' : 'none';
    };
  });

  // ───────────────────────── 3 · LA CUENTA: 0,9⁸ ≈ 43 % ─────────────────────────
  scene('cuenta', (x) => {
    const r = x.root;
    const tag = add(r, `<div class="abs" style="left:0;right:0;top:322px;text-align:center;font-size:24px">${pill('EJEMPLO ILUSTRATIVO', C.muted)}</div>`);
    const num = add(r, `<div class="abs display" style="left:0;right:0;top:400px;text-align:center;font-size:210px;font-weight:700;letter-spacing:-.04em;line-height:1;color:${C.green}">90%</div>`);
    const lbl = add(r, `<div class="abs mono" style="left:0;right:0;top:620px;text-align:center;font-size:28px;font-weight:700;letter-spacing:.06em;color:${C.muted}">PROBABILIDAD DE ACERTAR <span class="n" style="color:${C.ink}">1</span> SEGUIDA<span class="pl"></span></div>`);
    const dots = Array.from({ length: 8 }, (_, i) => attempt(r, 154 + i * 98, 700, 84));
    const bar = add(r, `<div class="abs" style="left:154px;width:772px;top:830px;height:30px;border-radius:15px;background:${C.line};overflow:hidden"><div style="height:100%;width:90%;border-radius:15px;background:${C.green}"></div></div>`);
    const formula = add(r, `<div class="abs mono" style="left:0;right:0;top:900px;text-align:center;font-size:34px;font-weight:700;color:${C.fg}">0,9 × 0,9 × … <span style="color:${C.muted}">(8 veces)</span> = <span style="color:${C.amber}">0,43</span></div>`);
    const t90 = x.at('90'), tO = x.at('ocho'), t43 = x.at('43');
    const steps = [t90, ...Array.from({ length: 7 }, (_, i) => lerp(tO, t43 - 0.1, (i + 1) / 7))];
    steps.forEach((t, i) => x.cue(t, i ? 'tick' : 'ding', i ? 0.45 : 0.6));
    x.cue(t43 + 0.05, 'stamp', 1); x.shake(t43 + 0.05, 18);
    return (lt) => {
      tag.style.opacity = appear(lt, 0, 0.3);
      let n = 0; steps.forEach((t) => { if (lt >= t) n++; });
      const v = n === 0 ? 90 : Math.round(Math.pow(0.9, n) * 100);
      num.textContent = v + '%';
      const k = n / 8;
      num.style.color = n >= 8 ? C.amber : (k > 0.5 ? C.sky : C.green);
      num.style.textShadow = n >= 8 ? '0 0 60px rgba(245,158,11,.6)' : 'none';
      num.style.opacity = appear(lt, t90 - 0.4, 0.3);
      num.style.transform = n >= 8 ? `scale(${lerp(1.25, 1, Ease.outBack(prog(lt, t43, 0.35)))})` : 'none';
      lbl.querySelector('.n').textContent = Math.max(1, n);
      lbl.querySelector('.pl').textContent = n > 1 ? 'S' : '';
      lbl.style.opacity = appear(lt, t90, 0.3);
      dots.forEach((d, i) => { d.set(i < n ? 'ok' : null); d.el.style.opacity = appear(lt, 0.1 + i * 0.05, 0.25); });
      bar.firstElementChild.style.width = (n === 0 ? 90 : v) + '%';
      bar.firstElementChild.style.background = n >= 8 ? C.amber : C.green;
      bar.style.opacity = appear(lt, t90, 0.3);
      formula.style.opacity = appear(lt, t43 + 0.2, 0.4);
    };
  });

  // ───────────────────────── 4 · τ-BENCH: atención al cliente ─────────────────────────
  scene('taubench', (x) => {
    const r = x.root;
    const chat = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;height:400px;border-radius:30px;background:${C.surface};border:2px solid ${C.lineStrong};overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div class="mono" style="height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:2px solid ${C.line};background:${C.surface2};font-size:24px;font-weight:700;color:${C.muted}"><span>τ-bench · atención al cliente</span><span style="color:${C.faint}">tienda · aerolínea</span></div>
        <div class="msgs" style="position:relative;padding:22px 26px;display:flex;flex-direction:column;gap:16px"></div></div>`);
    const msgs = chat.querySelector('.msgs');
    const bubble = (html, me) => add(msgs, `<div style="align-self:${me ? 'flex-end' : 'flex-start'};max-width:80%;padding:16px 22px;border-radius:22px;${me ? `background:${C.blue};color:${C.ink};border-bottom-right-radius:6px` : `background:${C.surface2};color:${C.fg};border:2px solid ${C.line};border-bottom-left-radius:6px`};font-size:30px;font-weight:600">${html}</div>`);
    const b1 = bubble('Quiero cambiar la talla de mi pedido', true);
    const b2 = bubble(`<span class="mono" style="font-size:22px;color:${C.cyan}">⚙ buscar_pedido(#4821)</span><br>Claro, reviso la política de cambios…`, false);
    const b3 = bubble('¿Y me devolvéis la diferencia?', true);
    const tag = add(r, `<div class="abs" style="left:110px;top:770px;font-size:24px">${pill('MEJORES AGENTES DE 2024', C.ink)}</div>`);
    const mkBar = (top, label, color) => add(r, `<div class="abs" style="left:110px;width:860px;top:${top}px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
          <span class="mono" style="font-size:26px;font-weight:700;color:${C.fg}">${label}</span>
          <span class="val display" style="font-size:58px;font-weight:700;color:${color}"></span></div>
        <div style="height:30px;border-radius:15px;background:${C.line};overflow:hidden;position:relative"><div class="fill" style="height:100%;width:0;border-radius:15px;background:${color};box-shadow:0 0 20px ${color}"></div></div></div>`);
    const A = mkBar(845, 'ACIERTAN UNA VEZ', C.sky);
    const B = mkBar(975, 'ACIERTAN 8 VECES SEGUIDAS (tienda)', C.red);
    const src = add(r, `<div class="abs mono" style="left:110px;top:1115px;font-size:20px;font-weight:500;color:${C.faint}">Fuente: τ-bench, Yao et al. 2024 (arXiv 2406.12045)</div>`);
    const tT = x.at('tau'), tAt = x.at('atencion'), t24 = x.at('2024'), t50 = x.at('50'), t25 = x.at('25');
    [tT, tAt, tAt + 0.6].forEach((t) => x.cue(t + 0.1, 'pop', 0.4));
    x.cue(t50, 'ding', 0.6); x.cue(t25, 'buzz', 0.5); x.shake(t25, 10, 6);
    return (lt) => {
      chat.style.opacity = appear(lt, 0, 0.3);
      [[b1, tT], [b2, tAt], [b3, tAt + 0.6]].forEach(([b, t]) => {
        const a = Ease.outBack(prog(lt, t, 0.35));
        b.style.opacity = a > 0 ? 1 : 0; b.style.transform = `translateY(${(1 - a) * 30}px) scale(${lerp(0.8, 1, a)})`;
      });
      popIn(tag, lt, t24 - 0.1, 0.6);
      const ka = Ease.outCubic(prog(lt, t50 - 0.2, 0.7)), kb = Ease.outCubic(prog(lt, t25 - 0.2, 0.7));
      A.style.opacity = appear(lt, t24, 0.3); B.style.opacity = appear(lt, t50 + 0.4, 0.3);
      A.querySelector('.fill').style.width = 50 * ka + '%'; A.querySelector('.val').textContent = ka > 0 ? '< 50%' : '';
      B.querySelector('.fill').style.width = 25 * kb + '%'; B.querySelector('.val').textContent = kb > 0 ? '< 25%' : '';
      src.style.opacity = appear(lt, t50, 0.4);
    };
  });

  // ───────────────────────── 5 · EL CAMINO: un error lo tira todo ─────────────────────────
  scene('camino', (x) => {
    const r = x.root;
    const h1 = add(r, `<div class="abs mono" style="left:110px;right:110px;top:325px;display:flex;justify-content:space-between;font-size:28px;font-weight:700;letter-spacing:.04em"><span style="color:${C.muted}">EXAMEN</span><span style="color:${C.fg}">puntúa <b style="color:${C.cyan}">una respuesta</b></span></div>`);
    const h2 = add(r, `<div class="abs mono" style="left:110px;right:110px;top:380px;display:flex;justify-content:space-between;font-size:28px;font-weight:700;letter-spacing:.04em"><span style="color:${C.muted}">AGENTE</span><span style="color:${C.fg}">puntúa <b style="color:${C.amber}">un camino</b></span></div>`);
    const P = [[170, 1040], [400, 1010], [560, 900], [380, 790], [540, 670], [780, 650], [880, 520]];
    const seg = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1]));
    const total = seg.reduce((a, b) => a + b, 0);
    const at = (d) => { let acc = 0; for (let i = 0; i < seg.length; i++) { if (d <= acc + seg[i]) { const k = (d - acc) / seg[i]; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)]; } acc += seg[i]; } return P[P.length - 1]; };
    const nodeD = P.map((_, i) => seg.slice(0, i).reduce((a, b) => a + b, 0));
    const pts = P.map((p) => p.join(',')).join(' ');
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <polyline points="${pts}" fill="none" stroke="${C.lineStrong}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline class="done" points="${pts}" fill="none" stroke="${C.green}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${total}" stroke-dashoffset="${total}"/></svg>`);
    const ERR = 4;
    const nodes = P.map((p, i) => attempt(r, p[0] - 38, p[1] - 38, 76));
    const flag = add(r, `<div class="abs display" style="left:${P[6][0] - 70}px;top:${P[6][1] + 46}px;width:140px;text-align:center;font-size:30px;font-weight:700;color:${C.green}">META</div>`);
    const runner = add(r, `<div class="abs" style="left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;background:${C.cyan};box-shadow:0 0 30px ${C.cyan}"></div>`);
    const boom = add(r, `<div class="abs display" style="left:${P[ERR][0] - 220}px;top:${P[ERR][1] - 160}px;width:440px;text-align:center;font-size:52px;font-weight:700;color:${C.red}">1 ERROR</div>`);
    const tPr = x.at('pregunta'), tC = x.at('camino'), tE = x.at('error'), tT = x.at('todo');
    x.cue(tPr, 'pop', 0.5); x.cue(tC, 'pop', 0.5);
    const tArrive = (i) => lerp(tC, tE, nodeD[i] / nodeD[ERR]);
    for (let i = 0; i < ERR; i++) x.cue(tArrive(i), 'tick', 0.45);
    x.cue(tE, 'buzz', 0.7); x.shake(tE, 16); x.cue(tT, 'stamp', 0.8);
    return (lt) => {
      h1.style.opacity = appear(lt, tPr - 0.3, 0.3);
      h2.style.opacity = appear(lt, tC - 0.3, 0.3);
      svg.style.opacity = appear(lt, 0, 0.4);
      const d = lerp(0, nodeD[ERR], Ease.linear(prog(lt, tC, tE - tC)));
      svg.querySelector('.done').setAttribute('stroke-dashoffset', total - d);
      const [rx, ry] = at(d);
      runner.style.transform = `translate(${rx}px, ${ry}px)`;
      runner.style.opacity = lt > tC - 0.2 && lt < tE + 0.1 ? 1 : 0;
      nodes.forEach((n, i) => {
        n.el.style.opacity = appear(lt, 0.1 + i * 0.06, 0.3);
        if (i === ERR && lt >= tE) n.set('ko');
        else if (i < ERR && lt >= tArrive(i)) n.set('ok');
        else n.set(null);
        n.el.style.transform = i === ERR && lt >= tE ? `scale(${lerp(1.6, 1.15, Ease.outBack(prog(lt, tE, 0.35)))})` : 'none';
      });
      const fail = prog(lt, tT - 0.05, 0.3);
      svg.querySelector('.done').setAttribute('stroke', fail > 0.5 ? C.red : C.green);
      flag.style.color = lt > tE ? C.faint : C.green;
      flag.style.textDecoration = lt > tT ? 'line-through' : 'none';
      popIn(boom, lt, tE, 0.5);
    };
  });

  // ───────────────────────── 6 · ANTES DE COMPRAR UN AGENTE ─────────────────────────
  scene('compra', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;height:760px;border-radius:34px;background:${C.surface};border:3px solid ${C.lineStrong};box-shadow:0 30px 80px rgba(0,0,0,.5);padding:36px 40px;box-sizing:border-box">
        <div class="mono" style="font-size:28px;font-weight:700;letter-spacing:.12em;color:${C.muted}">ANTES DE COMPRAR UN AGENTE</div>
        <div class="items" style="display:flex;flex-direction:column;gap:24px;margin-top:30px"></div></div>`);
    const item = (q, chip, color) => add(card.querySelector('.items'), `<div style="display:flex;align-items:center;gap:26px;padding:24px 26px;border-radius:24px;background:${C.surface2};border:3px solid ${C.line}">
        <div class="bx" style="width:64px;height:64px;flex:none;border-radius:16px;border:4px solid ${C.lineStrong};padding:8px;box-sizing:border-box;color:${color}"></div>
        <div><div class="q display" style="font-size:42px;font-weight:700;color:${C.ink};line-height:1.1">${q}</div>
        ${chip ? `<div class="mono" style="margin-top:10px;font-size:22px;font-weight:700;color:${color};letter-spacing:.06em">${chip}</div>` : ''}</div></div>`);
    const A = item('¿Cuánto acierta?', 'solo pass@1', C.faint);
    const B = item('¿Cuántas veces seguidas acierta?', 'pass^k · varios intentos', C.green);
    const D = item('¿Qué pasa cuando falla?', 'auditoría de fallos', C.green);
    const tCo = x.at('comprar'), tCu = x.at('cuanto'), tPr = x.at('pregunta'), tCs = x.at('cuantas'), tF = x.at('falla');
    x.cue(tCu, 'pop', 0.5); x.cue(tPr, 'swipe', 0.6); x.cue(tCs + 0.3, 'ding', 0.6); x.cue(tF + 0.1, 'ding', 0.8);
    return (lt) => {
      popIn(card, lt, tCo - 0.5, 0.85);
      [[A, tCu], [B, tCs], [D, tF - 0.25]].forEach(([el, t]) => {
        const a = Ease.outBack(prog(lt, t - 0.1, 0.4));
        el.style.opacity = a > 0 ? 1 : 0; el.style.transform = `translateX(${(1 - a) * 80}px)`;
      });
      const struck = lt > tPr;
      A.querySelector('.q').style.textDecoration = struck ? 'line-through' : 'none';
      A.querySelector('.q').style.textDecorationColor = C.red;
      A.style.opacity = struck ? 0.45 : A.style.opacity;
      A.querySelector('.bx').innerHTML = struck ? I.cross : '';
      A.querySelector('.bx').style.color = C.red;
      [[B, tCs + 0.3], [D, tF + 0.1]].forEach(([el, t]) => {
        const on = lt >= t;
        el.querySelector('.bx').innerHTML = on ? I.check : '';
        el.querySelector('.bx').style.borderColor = on ? C.green : C.lineStrong;
        el.style.borderColor = on ? C.green : C.line;
      });
    };
  });

  // ───────────────────────── 7 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const a1 = add(r, `<div class="abs mono" style="left:0;right:0;top:350px;text-align:center;font-size:40px;font-weight:700;letter-spacing:.12em;color:${C.muted}">UNA DEMO ES</div>`);
    const a2 = popText(r, 'UNA VEZ', `top:410px;font-size:150px;color:${C.cyan};text-shadow:0 0 50px rgba(34,211,238,.5)`);
    const one = attempt(r, 498, 600, 84);
    const b1 = add(r, `<div class="abs mono" style="left:0;right:0;top:730px;text-align:center;font-size:40px;font-weight:700;letter-spacing:.12em;color:${C.muted}">PRODUCCIÓN ES</div>`);
    const b2 = popText(r, 'SIEMPRE', `top:790px;font-size:180px;color:${C.amber};text-shadow:0 0 70px rgba(245,158,11,.6)`);
    const stream = Array.from({ length: 16 }, (_, i) => attempt(r, 0, 1010, 70));
    const tD = x.at('demo'), tV = x.at('vez'), tP = x.at('produccion'), tS = x.at('siempre');
    x.cue(tV, 'ding', 0.6); x.cue(tS - 0.15, 'rise', 0.6); x.cue(tS, 'boom', 1); x.shake(tS, 24);
    return (lt) => {
      a1.style.opacity = appear(lt, tD - 0.3, 0.3);
      popIn(a2, lt, tV - 0.15, 0.6);
      const o = spring(lt, tV, 0.4); one.set(o > 0 ? 'ok' : null); one.el.style.opacity = o > 0 ? 1 : 0; one.el.style.transform = `scale(${o})`;
      b1.style.opacity = appear(lt, tP - 0.2, 0.3);
      const s = spring(lt, tS - 0.05, 0.5);
      b2.style.opacity = s > 0 ? 1 : 0; b2.style.transform = `scale(${lerp(1.8, 1, s)})`;
      stream.forEach((d, i) => {
        const run = Math.max(0, lt - tS);
        const xpos = 1100 - ((run * 420 + i * 88) % (16 * 88));
        d.el.style.transform = `translateX(${xpos}px)`;
        d.el.style.opacity = s > 0 ? 1 : 0;
        d.set('ok');
      });
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['articles.santismm.com'], sub: '“El cronómetro y el examen”' }));
})();
