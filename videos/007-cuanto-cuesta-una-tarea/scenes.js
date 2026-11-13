/* EUREKA #07 · "¿Cuánto cuesta de verdad un agente de IA?" (coste por resultado)
 * Fuente: labs.santismm.com/agent-economics (calculadora "Economía real de un agente", escenario Soporte con
 * los supuestos por defecto, verificados el 13-11-2026): 10.000 casos/mes, 2.200/450 tokens por intento a 2/10 €/M,
 * 0,003 €/intento en herramientas, +12 % reintentos (11.200 intentos), 86 % de éxito (1.400 fallos),
 * 25 % revisados × 3 min, retrabajo 6 min/fallo, 38 €/h.
 * Resultado: modelo+herramientas 133 €, supervisión 4.750 €, retrabajo 5.320 €, total 10.203 € (1,0203 €/caso
 * resuelto) frente a 50.667 € del proceso manual. Tesis de santismm.com: "El coste por resultado decidirá qué
 * agentes sobreviven". Lema de la calculadora: "Coste por resultado, no por token".
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;

  EUREKA.video = { keywords: ['1%', '99%', 'humano', 'sobreviven', 'barato', 'correcto'] };
  const eur = (v) => Math.round(v).toLocaleString('es-ES').replace(/,/g, '.') + ' €';
  const TAG = 'EJEMPLO: SUPUESTOS POR DEFECTO DE LA CALCULADORA';
  const PERSON = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><circle cx="32" cy="20" r="11"/><path d="M12 58c0-12 9-20 20-20s20 8 20 20"/></svg>`;

  // ───────────────────────── 1 · HOOK: la moneda de un céntimo ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const coin = add(r, `<div class="abs" style="left:290px;top:380px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle at 35% 30%, #ffd98a, ${C.amber} 45%, #b26b00);box-shadow:0 30px 90px rgba(245,158,11,.45), inset 0 0 0 18px rgba(255,255,255,.18);display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div class="display" style="font-size:150px;font-weight:700;color:#3d2600;line-height:1">1,2 ¢</div>
        <div class="mono" style="font-size:30px;font-weight:700;color:#5a3a00;letter-spacing:.1em;margin-top:10px">POR INTENTO</div></div>`);
    const tag = add(r, `<div class="abs display" style="left:640px;top:330px;padding:14px 28px;border-radius:20px;background:${C.green};color:${C.bg};font-size:54px;font-weight:700;box-shadow:0 20px 50px rgba(16,185,129,.4)">¡BARATO!</div>`);
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:930px;text-align:center;font-size:26px;font-weight:700;color:${C.muted}">modelo + herramientas · 0,0119 € por intento</div>`);
    const tC = x.at('centimo'), tS = x.at('seguro'), tB = x.at('barato');
    x.cue(tC, 'ding', 0.7); x.cue(tS, 'swipe', 0.6); x.cue(tB + 0.1, 'stamp', 0.9); x.shake(tB + 0.1, 16);
    return (lt) => {
      const spin = lt < tC ? lt * 5 : tC * 5 + (1 - Math.exp(-(lt - tC) * 4)) * 2;
      coin.style.transform = `scaleX(${Math.abs(Math.cos(spin * Math.PI)) * 0.85 + 0.15})`;
      coin.style.opacity = 1;
      const s = spring(lt, 0.6, 0.45);
      tag.style.opacity = s > 0 ? 1 : 0;
      const q = lt > tB + 0.1;
      tag.textContent = q ? '¿BARATO?' : '¡BARATO!';
      tag.style.background = q ? C.amber : C.green;
      tag.style.transform = `rotate(${q ? -10 : 8}deg) scale(${lerp(0.4, 1, s) * (q ? lerp(1.4, 1, Ease.outBack(prog(lt, tB + 0.1, 0.35))) : 1)})`;
      sub.style.opacity = appear(lt, 1.0, 0.4);
    };
  });

  // ───────────────────────── 2 · LA CUENTA: contadores ─────────────────────────
  scene('intento', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:325px;text-align:center;font-size:24px">${pill('EJEMPLO · SOPORTE · labs.santismm.com', C.ink)}</div>`);
    const counter = (top, label, color) => add(r, `<div class="abs" style="left:110px;width:860px;top:${top}px;height:230px;border-radius:30px;background:${C.surface};border:3px solid ${color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px">
        <div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.muted}">${label}</div>
        <div class="v display" style="font-size:120px;font-weight:700;color:${color};line-height:1;font-variant-numeric:tabular-nums">0</div></div>`);
    const A = counter(430, 'CASOS AL MES', C.sky);
    const B = counter(700, 'MODELO + HERRAMIENTAS', C.green);
    const f = add(r, `<div class="abs mono" style="left:0;right:0;top:960px;text-align:center;font-size:26px;font-weight:700;color:${C.muted}">0,0119 € × 11.200 intentos (con reintentos)</div>`);
    const tCa = x.at('calculadora'), tD = x.at('diez'), tM = x.at('modelo'), tU = x.at('unos');
    for (let i = 0; i < 8; i++) x.cue(tD + i * 0.08, 'tick', 0.3);
    x.cue(tU + 0.4, 'ding', 0.8);
    return (lt) => {
      popIn(head, lt, tCa - 0.3, 0.7);
      popIn(A, lt, tD - 0.3, 0.7);
      const ka = Ease.outCubic(prog(lt, tD - 0.1, 0.8));
      A.querySelector('.v').textContent = Math.round(10000 * ka).toLocaleString('es-ES').replace(/,/g, '.');
      popIn(B, lt, tM - 0.25, 0.7);
      const kb = Ease.outCubic(prog(lt, tU - 0.1, 0.7));
      B.querySelector('.v').textContent = eur(133 * kb);
      f.style.opacity = appear(lt, tU + 0.3, 0.4);
    };
  });

  // ───────────────────────── 3 · REINTENTOS Y FALLOS ─────────────────────────
  scene('fallos', (x) => {
    const r = x.root;
    const tag = add(r, `<div class="abs mono" style="left:0;right:0;top:325px;text-align:center;font-size:20px;font-weight:700;color:${C.faint}">${TAG}</div>`);
    const W = 860, X0 = 110;
    const row = (top, label) => add(r, `<div class="abs" style="left:${X0}px;width:${W}px;top:${top}px">
        <div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.1em;color:${C.muted};margin-bottom:12px">${label}</div>
        <div class="bar" style="position:relative;height:90px;border-radius:18px;background:${C.line};overflow:hidden"></div>
        <div class="lbl" style="position:relative;height:60px;margin-top:10px"></div></div>`);
    const R1 = row(400, 'INTENTOS');
    const R2 = row(680, 'RESULTADOS');
    const seg = (row, left, width, color, txt) => add(row.querySelector('.bar'), `<div style="position:absolute;left:${left}%;top:0;bottom:0;width:0;background:${color};display:flex;align-items:center;justify-content:center;overflow:hidden;font:700 34px 'Space Grotesk';color:${C.bg};white-space:nowrap" data-w="${width}">${txt}</div>`);
    const total = 11200;
    const a1 = seg(R1, 0, 10000 / total * 100, C.sky, '10.000 casos');
    const a2 = seg(R1, 10000 / total * 100, 1200 / total * 100, C.amber, '+12%');
    const b1 = seg(R2, 0, 86, C.green, '8.600 correctos · 86%');
    const b2 = seg(R2, 86, 14, C.red, '');
    const fl = add(R2.querySelector('.lbl'), `<div class="display" style="position:absolute;right:0;top:0;font-size:46px;font-weight:700;color:${C.red}">1.400 fallos</div>`);
    const re = add(r, `<div class="abs" style="left:250px;width:580px;top:950px;height:140px;border-radius:28px;background:${C.surface2};border:3px solid ${C.red};display:flex;align-items:center;justify-content:center;gap:22px">
        <div style="width:80px;height:80px;color:${C.red}">${PERSON}</div><span class="display" style="font-size:44px;font-weight:700;color:${C.ink}">alguien lo rehace</span></div>`);
    const t12 = x.at('12'), t86 = x.at('86'), t14 = x.at('1400'), tR = x.at('rehacer');
    x.cue(t12, 'pop', 0.6); x.cue(t86, 'ding', 0.6); x.cue(t14, 'buzz', 0.6); x.cue(tR, 'stamp', 0.8); x.shake(tR, 12);
    const grow = (el, t, lt) => { const k = Ease.outCubic(prog(lt, t, 0.6)); el.style.width = (parseFloat(el.dataset.w) * k) + '%'; };
    return (lt) => {
      tag.style.opacity = appear(lt, 0, 0.3);
      R1.style.opacity = appear(lt, 0, 0.3);
      grow(a1, 0.1, lt); grow(a2, t12 - 0.1, lt);
      R2.style.opacity = appear(lt, t86 - 0.6, 0.3);
      grow(b1, t86 - 0.2, lt); grow(b2, t14 - 0.2, lt);
      popIn(fl, lt, t14, 0.6);
      popIn(re, lt, tR - 0.3, 0.6);
    };
  });

  // ───────────────────────── 4 · EL ICEBERG ─────────────────────────
  scene('iceberg', (x) => {
    const r = x.root;
    const WL = 560; // línea de flotación
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <rect x="0" y="${WL}" width="1080" height="620" fill="rgba(59,130,246,.16)"/>
        <line x1="0" y1="${WL}" x2="1080" y2="${WL}" stroke="${C.sky}" stroke-width="4" stroke-dasharray="18 10"/>
        <path class="tip" d="M470 ${WL} L520 ${WL - 120} L560 ${WL - 80} L610 ${WL}" fill="#e9eef6" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path class="deep" d="M470 ${WL} L610 ${WL} L760 ${WL + 120} L840 ${WL + 330} L700 ${WL + 520} L420 ${WL + 560} L240 ${WL + 380} L300 ${WL + 140} Z" fill="rgba(233,238,246,.85)" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></svg>`);
    const tipL = add(r, `<div class="abs" style="left:630px;width:300px;top:${WL - 230}px"><div class="display" style="font-size:32px;font-weight:700;color:${C.ink};line-height:1.1">Modelo +<br>herramientas</div><div class="display" style="font-size:52px;font-weight:700;color:${C.green}">133 € · 1%</div></div>`);
    const d1 = add(r, `<div class="abs" style="left:330px;top:${WL + 150}px;width:420px;text-align:center"><div class="display" style="font-size:36px;font-weight:700;color:#0b0f19">Supervisión</div><div class="display" style="font-size:58px;font-weight:700;color:#0b0f19">4.750 €</div></div>`);
    const d2 = add(r, `<div class="abs" style="left:330px;top:${WL + 320}px;width:420px;text-align:center"><div class="display" style="font-size:36px;font-weight:700;color:#0b0f19">Retrabajo</div><div class="display" style="font-size:58px;font-weight:700;color:#0b0f19">5.320 €</div></div>`);
    const big = add(r, `<div class="abs display" style="left:110px;top:${WL - 220}px;font-size:120px;font-weight:700;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.6)">99%</div>`);
    const bigL = add(r, `<div class="abs mono" style="left:120px;top:${WL - 90}px;font-size:24px;font-weight:700;color:${C.amber};letter-spacing:.08em">TRABAJO HUMANO</div>`);
    const tP = x.at('persona'), tC = x.at('cuatro'), t1 = x.at('1'), t99 = x.at('99'), tH = x.at('humano');
    x.cue(0.2, 'pop', 0.5); x.cue(tP, 'whoosh', 0.6); x.cue(tC, 'pop', 0.5); x.cue(t1, 'tick', 0.6); x.cue(t99, 'boom', 0.9); x.shake(t99, 18);
    return (lt) => {
      svg.style.opacity = 1;
      tipL.style.opacity = appear(lt, 0.2, 0.4);
      const reveal = appear(lt, tP - 0.2, 0.9);
      svg.querySelector('.deep').setAttribute('opacity', 0.12 + 0.88 * reveal);
      d1.style.opacity = appear(lt, tP + 0.3, 0.4); d2.style.opacity = appear(lt, tC, 0.4);
      tipL.style.transform = `scale(${lt > t1 - 0.05 ? lerp(1.2, 1, Ease.outBack(prog(lt, t1 - 0.05, 0.35))) : 1})`;
      popIn(big, lt, t99 - 0.1, 0.5); bigL.style.opacity = appear(lt, tH - 0.2, 0.3);
    };
  });

  // ───────────────────────── 5 · LA BALANZA ─────────────────────────
  scene('balanza', (x) => {
    const r = x.root;
    const CX = 540, PY = 470;
    const beam = add(r, `<div class="abs" style="left:${CX - 270}px;top:${PY}px;width:540px;height:16px;border-radius:8px;background:${C.ink};transform-origin:50% 50%"></div>`);
    const post = add(r, `<div class="abs" style="left:${CX - 10}px;top:${PY}px;width:20px;height:520px;background:${C.lineStrong};border-radius:10px"></div>`);
    const base = add(r, `<div class="abs" style="left:${CX - 140}px;top:${PY + 510}px;width:280px;height:24px;border-radius:12px;background:${C.lineStrong}"></div>`);
    const pan = (label, val, color) => add(r, `<div class="abs" style="left:0;top:0;width:300px;height:220px;border-radius:30px;background:${C.surface};border:4px solid ${color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">
        <div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.1em;color:${C.muted}">${label}</div>
        <div class="display" style="font-size:66px;font-weight:700;color:${color}">${val}</div>
        <div class="mono" style="font-size:22px;font-weight:700;color:${C.faint}">al mes</div></div>`);
    const L = pan('AGENTE', '10.203 €', C.green), R = pan('MANUAL', '50.667 €', C.red);
    const sav = add(r, `<div class="abs" style="left:0;right:0;top:1070px;text-align:center;font-size:28px">${pill('AHORRO ≈ 40.000 € AL MES · CON ESTOS SUPUESTOS', C.green)}</div>`);
    const tU = x.at('unos'), tM = x.at('manual');
    x.cue(tU, 'pop', 0.6); x.cue(tM, 'stamp', 0.8); x.shake(tM, 10);
    return (lt) => {
      post.style.opacity = base.style.opacity = beam.style.opacity = appear(lt, 0, 0.3);
      const k = Ease.outBack(prog(lt, tM - 0.1, 0.8));
      const ang = lerp(0, 16, k) * Math.PI / 180;
      beam.style.transform = `rotate(${ang * 180 / Math.PI}deg)`;
      const lx = CX - Math.cos(ang) * 250, ly = PY - Math.sin(ang) * 250, rx = CX + Math.cos(ang) * 250, ry = PY + Math.sin(ang) * 250;
      L.style.transform = `translate(${lx - 150}px, ${ly + 40}px)`; R.style.transform = `translate(${rx - 150}px, ${ry + 40}px)`;
      L.style.opacity = appear(lt, tU - 0.3, 0.3); R.style.opacity = appear(lt, tM - 0.5, 0.3);
      popIn(sav, lt, tM + 0.5, 0.6);
    };
  });

  // ───────────────────────── 6 · LA LECCIÓN: precio por resultado, no por token ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const tagCard = (top, txt, sub, color) => add(r, `<div class="abs" style="left:150px;width:780px;top:${top}px;height:230px;border-radius:30px 90px 90px 30px;background:${C.surface};border:5px solid ${color};display:flex;flex-direction:column;justify-content:center;padding-left:60px;box-sizing:border-box;box-shadow:0 0 50px ${color}33">
        <div class="display" style="font-size:${txt.length > 12 ? 50 : 64}px;font-weight:700;color:${C.ink}">${txt}</div>
        <div class="mono" style="font-size:26px;font-weight:700;color:${color};margin-top:8px">${sub}</div>
        <div class="abs" style="right:34px;top:95px;width:40px;height:40px;border-radius:50%;background:${C.bg};border:5px solid ${color}"></div></div>`);
    const A = tagCard(380, '€ / token', 'lo que dice la tarifa', C.red);
    const strike = add(r, `<svg class="abs" width="1080" height="300" style="left:0;top:360px"><line x1="170" y1="200" x2="900" y2="70" stroke="${C.red}" stroke-width="14" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const B = tagCard(680, '€ / resultado correcto', '≈ 1,02 € por caso resuelto · todo incluido', C.green);
    const tT = x.at('token'), tCo = x.at('compara'), tCr = x.at('correcto');
    x.cue(tT, 'swipe', 0.6); x.cue(tCr, 'ding', 0.8);
    return (lt) => {
      popIn(A, lt, 0, 0.7);
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tT, 0.3)));
      A.style.filter = lt > tT + 0.2 ? 'opacity(.45)' : 'none';
      popIn(B, lt, tCo - 0.1, 0.6);
    };
  });

  // ───────────────────────── 7 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, 'EL COSTE<br>POR RESULTADO', `top:380px;font-size:110px;line-height:1.02;color:${C.ink}`);
    const l2 = add(r, `<div class="abs mono" style="left:0;right:0;top:640px;text-align:center;font-size:40px;font-weight:700;letter-spacing:.1em;color:${C.muted}">DECIDIRÁ QUÉ AGENTES</div>`);
    const l3 = popText(r, 'SOBREVIVEN', `top:710px;font-size:150px;color:${C.amber};text-shadow:0 0 60px rgba(245,158,11,.6)`);
    const tC = x.at('coste'), tS = x.at('sobreviven');
    x.cue(tS - 0.15, 'rise', 0.6); x.cue(tS, 'boom', 1); x.shake(tS, 22);
    return (lt) => {
      popIn(l1, lt, tC - 0.2, 0.7);
      l2.style.opacity = appear(lt, tC + 0.6, 0.3);
      const s = spring(lt, tS - 0.05, 0.5); l3.style.opacity = s > 0 ? 1 : 0; l3.style.transform = `scale(${lerp(1.8, 1, s)})`;
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['labs.santismm.com'], sub: 'haz tu cuenta: «Economía real de un agente»' }));
})();
