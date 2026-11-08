/* EUREKA #02 · "Tu IA se sabía el examen: la contaminación"
 * Fuente: articles.santismm.com · "El cronómetro y el examen" (secciones sobre saturación/contaminación,
 * Konwinski Prize 7,5 % vs ~75 % de sistemas comparables en SWE-bench Verified; filtraciones de hasta el 45 %).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, examPaper, endCard, popText, popIn } = EUREKA.ui;

  EUREKA.video = { keywords: ['contaminación', '75%', '7,5%', '45%', 'memoria', 'Konwinski'] };

  // ───────────────────────── 1 · HOOK: dos exámenes, dos notas ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const top = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center;font-size:30px">${pill('MISMO TIPO DE EXAMEN: PROGRAMAR', C.ink)}</div>`);
    const A = examPaper(r, { x: 120, y: 420, w: 380, h: 520, title: 'SWE-bench Verified', sub: 'examen antiguo', grade: '75%', gradeColor: '#0e9f6e', rot: -3 });
    const B = examPaper(r, { x: 545, y: 420, w: 380, h: 520, title: 'Premio Konwinski', sub: 'problemas nuevos', grade: '7,5%', gradeColor: C.red, rot: 3 });
    const noteA = add(r, `<div class="abs mono" style="left:120px;width:380px;top:965px;text-align:center;font-size:22px;font-weight:500;color:${C.muted}">~75% · sistemas comparables</div>`);
    const noteB = add(r, `<div class="abs mono" style="left:545px;width:380px;top:965px;text-align:center;font-size:22px;font-weight:500;color:${C.muted}">7,5% · ganador</div>`);
    const badge = add(r, `<div class="abs display" style="left:390px;top:610px;width:300px;padding:6px 0;text-align:center;border-radius:28px;background:${C.amber};color:${C.bg};font-size:110px;font-weight:700;box-shadow:0 20px 70px rgba(245,158,11,.55)">÷10</div>`);
    const tA = x.at('75'), tB = x.at('75', 1), tM = x.at('mismo'), tQ = x.at('que');
    x.cue(tA + 0.05, 'swipe', 0.7); x.cue(tB + 0.05, 'swipe', 0.7);
    x.cue(tM, 'pop', 0.5); x.cue(tQ - 0.1, 'stamp', 1); x.shake(tQ - 0.1, 24);
    return (lt) => {
      A.el.style.opacity = 1;
      const bIn = Ease.outCubic(prog(lt, 0.0, 0.35));
      B.el.style.opacity = bIn; B.el.style.transform = `rotate(3deg) translateY(${(1 - bIn) * 40}px)`;
      A.grade(prog(lt, tA - 0.05, 0.5));
      B.grade(prog(lt, tB - 0.05, 0.5));
      noteA.style.opacity = appear(lt, tA + 0.4, 0.3); noteB.style.opacity = appear(lt, tB + 0.4, 0.3);
      popIn(top, lt, tM - 0.05);
      const s = spring(lt, tQ - 0.1, 0.45);
      badge.style.opacity = s > 0 ? 1 : 0; badge.style.transform = `rotate(-8deg) scale(${lerp(2.6, 1, s)})`;
    };
  });

  // ───────────────────────── 2 · CONTAMINACIÓN ─────────────────────────
  scene('contamina', (x) => {
    const r = x.root;
    const title = popText(r, 'CONTAMINACIÓN', `top:320px;font-size:96px;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.5)`);
    const box = add(r, `<div class="abs" style="left:110px;top:560px;width:480px;height:440px;border-radius:30px;background:${C.surface};border:3px solid ${C.blue};box-shadow:0 0 50px rgba(59,130,246,.25)">
        <div class="mono" style="padding:20px 0 0;text-align:center;font-size:23px;font-weight:700;letter-spacing:.1em;color:${C.sky}">DATOS DE ENTRENAMIENTO</div></div>`);
    const COLS = 6, ROWS = 5, TS = 56, GAP = 14;
    const gx = 110 + (480 - (COLS * TS + (COLS - 1) * GAP)) / 2, gy = 625;
    const tiles = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const tx = gx + (i % COLS) * (TS + GAP), ty = gy + Math.floor(i / COLS) * (TS + GAP);
      tiles.push({ x: tx, y: ty, el: add(r, `<div class="abs" style="left:${tx}px;top:${ty}px;width:${TS}px;height:${TS}px;border-radius:12px;background:${C.blue}33;border:2px solid ${C.blue}88"></div>`) });
    }
    const paper = examPaper(r, { x: 670, y: 480, w: 250, h: 300, title: 'Preguntas', lines: 4, rot: 4 });
    const slots = [8, 15, 21, 26];
    const qs = slots.map((s, i) => add(r, `<div class="abs display" style="left:0;top:0;width:${TS}px;height:${TS}px;border-radius:12px;background:${C.amber};color:${C.bg};font-size:40px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px ${C.amber}">?</div>`));
    const chip = add(r, `<div class="abs" style="left:700px;top:830px;width:190px;height:190px;border-radius:32px;background:linear-gradient(145deg,${C.surface2},${C.surface});border:4px solid ${C.cyan};display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:${C.ink}" class="display"><span class="display">MODELO</span></div>`);
    const arrow = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0"><path d="M600 915 H684" stroke="${C.cyan}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path d="M668 897 L688 915 L668 933" fill="none" stroke="${C.cyan}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>`);
    const tC = x.at('contaminacion'), tP = x.at('preguntas'), tCu = x.at('cuelan'), tE = x.at('entrena'), tMo = x.at('modelo');
    x.cue(tC, 'stamp', 0.6); x.shake(tC, 10);
    qs.forEach((_, i) => { x.cue(tP + i * 0.08, 'tick', 0.4); x.cue(tCu + 0.15 + i * 0.12 + 0.45, 'pop', 0.45); });
    x.cue(tE, 'swipe', 0.6);
    // Posición de cada "?" en la hoja del examen (coordenadas de escenario)
    const start = qs.map((_, i) => ({ x: 700 + (i % 2) * 110, y: 610 + Math.floor(i / 2) * 75 }));
    return (lt) => {
      popIn(title, lt, tC - 0.1, 0.5);
      box.style.opacity = appear(lt, 0, 0.3);
      tiles.forEach((t, i) => {
        const a = appear(lt, 0.05 + i * 0.012, 0.25);
        t.el.style.opacity = a;
        const hit = slots.indexOf(i);
        const landed = hit >= 0 && lt >= tCu + 0.15 + hit * 0.12 + 0.45;
        t.el.style.background = landed ? `${C.amber}55` : `${C.blue}33`;
        t.el.style.borderColor = landed ? C.amber : `${C.blue}88`;
      });
      qs.forEach((q, i) => {
        const s = spring(lt, tP - 0.1 + i * 0.08, 0.35);
        const f0 = tCu + 0.15 + i * 0.12;
        const k = Ease.inOutCubic(prog(lt, f0, 0.45));
        const end = tiles[slots[i]];
        const px = lerp(start[i].x, end.x, k), py = lerp(start[i].y, end.y, k) - Math.sin(k * Math.PI) * 160;
        q.style.opacity = s > 0 ? 1 : 0;
        q.style.transform = `translate(${px}px, ${py}px) scale(${s * (1 - 0.15 * Math.sin(k * Math.PI))}) rotate(${k * 360}deg)`;
      });
      const a = Ease.outCubic(prog(lt, tE - 0.1, 0.35));
      const ps = arrow.querySelectorAll('path');
      ps[0].setAttribute('stroke-dashoffset', 1 - a); ps[1].setAttribute('opacity', a >= 1 ? 1 : 0);
      const c = spring(lt, tMo - 0.15, 0.4);
      chip.style.opacity = c > 0 ? 1 : 0; chip.style.transform = `scale(${lerp(0.4, 1, c)})`;
      const infected = appear(lt, tMo + 0.25, 0.4);
      chip.style.borderColor = infected > 0.5 ? C.amber : C.cyan;
      chip.style.boxShadow = `0 0 ${40 + 30 * infected}px ${infected > 0.5 ? 'rgba(245,158,11,.5)' : 'rgba(34,211,238,.35)'}`;
    };
  });

  // ───────────────────────── 3 · EL ALUMNO QUE VIO EL EXAMEN ─────────────────────────
  scene('alumno', (x) => {
    const r = x.root;
    const stu = add(r, `<svg class="abs" width="260" height="300" viewBox="0 0 200 290" style="left:250px;top:330px">
        <path d="M18 290 Q18 196 100 196 Q182 196 182 290" fill="${C.surface2}" stroke="${C.cyan}" stroke-width="6"/>
        <circle cx="100" cy="128" r="58" fill="${C.surface2}" stroke="${C.cyan}" stroke-width="6"/>
        <g class="eyes"><circle cx="80" cy="128" r="8" fill="${C.ink}"/><circle cx="120" cy="128" r="8" fill="${C.ink}"/></g>
        <path d="M84 156 Q100 166 116 156" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <path d="M24 66 L100 34 L176 66 L100 98 Z" fill="${C.cyan}"/><path d="M60 82 V106 Q100 124 140 106 V82" fill="${C.cyan}" opacity=".6"/>
        <path d="M176 66 V108" stroke="${C.amber}" stroke-width="5"/><circle cx="176" cy="112" r="7" fill="${C.amber}"/></svg>`);
    const key = add(r, `<div class="abs" style="left:610px;top:380px;width:250px;height:230px;border-radius:20px;background:#e9eef6;box-shadow:0 20px 60px rgba(0,0,0,.5);padding:20px 24px;box-sizing:border-box">
        <div class="mono" style="font-size:20px;font-weight:700;color:${C.red};letter-spacing:.1em">RESPUESTAS</div>
        ${['1·B', '2·D', '3·A', '4·C'].map((t) => `<div class="mono" style="font-size:30px;font-weight:700;color:#0b0f19;margin-top:4px">${t}</div>`).join('')}</div>`);
    const look = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0"><path d="M470 470 Q540 420 600 470" fill="none" stroke="${C.amber}" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/></svg>`);
    const card = (left, icon, color, line1, line2) => add(r, `<div class="abs" style="left:${left}px;top:720px;width:390px;height:290px;border-radius:30px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">
        <div class="ic" style="width:96px;height:96px;color:${color}">${icon}</div>
        <div class="display" style="font-size:40px;font-weight:700;color:${C.ink};text-align:center;line-height:1.1">${line1}<br><span style="color:${color}">${line2}</span></div></div>`);
    const cA = card(110, I.bulb, C.cyan, '¿Entiende', 'la materia?');
    const cB = card(540, I.key, C.amber, '¿Se sabe', 'las respuestas?');
    const qm = add(r, `<div class="abs display" style="left:440px;top:770px;width:200px;text-align:center;font-size:150px;font-weight:700;color:${C.muted}">?</div>`);
    const tAl = x.at('alumno'), tV = x.at('visto'), tS = x.at('sabes'), tMa = x.at('materia'), tR = x.at('respuestas');
    x.cue(tAl, 'pop', 0.5); x.cue(tV, 'swipe', 0.7); x.cue(tMa, 'pop', 0.6); x.cue(tR, 'pop', 0.7);
    return (lt) => {
      popIn(stu, lt, tAl - 0.35, 0.5);
      const kIn = Ease.outBack(prog(lt, tV - 0.2, 0.45));
      key.style.opacity = kIn > 0 ? 1 : 0; key.style.transform = `translateX(${(1 - kIn) * 300}px) rotate(${6 - 2 * kIn}deg)`;
      look.style.opacity = appear(lt, tV + 0.2, 0.3);
      const eyeShift = Ease.inOutCubic(prog(lt, tV, 0.3)) * (1 - Ease.inOutCubic(prog(lt, tS, 0.3)));
      stu.querySelector('.eyes').setAttribute('transform', `translate(${eyeShift * 9} ${-eyeShift * 3})`);
      const a = popIn(cA, lt, tMa - 0.1, 0.6), b = popIn(cB, lt, tR - 0.1, 0.6);
      cA.style.borderColor = lt > tMa && lt < tR ? C.cyan : C.lineStrong;
      cB.style.borderColor = lt > tR ? C.amber : C.lineStrong;
      cB.style.boxShadow = lt > tR ? '0 0 50px rgba(245,158,11,.35)' : 'none';
      const q = popIn(qm, lt, tS - 0.1, 0.4);
      qm.style.transform += ` rotate(${Math.sin(lt * 5) * 8}deg)`;
      qm.style.opacity = q > 0 ? (a > 0 && b > 0 ? 0.8 : 1) : 0;
    };
  });

  // ───────────────────────── 4 · HASTA UN 45 % (waffle 10×10) ─────────────────────────
  scene('dato45', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:318px;display:flex;align-items:baseline;justify-content:center;gap:24px">
        <span class="mono" style="font-size:40px;font-weight:700;color:${C.muted};letter-spacing:.1em">HASTA</span>
        <span class="num display" style="font-size:150px;font-weight:700;color:${C.amber};line-height:1;text-shadow:0 0 50px rgba(245,158,11,.5)">0%</span></div>`);
    const S = 44, G = 9, N = 10, W0 = N * S + (N - 1) * G, x0 = (1080 - W0) / 2, y0 = 515;
    const cells = [];
    // Orden de relleno en espiral suave (más orgánico que fila a fila)
    const rand = rng(45);
    const order = Array.from({ length: 100 }, (_, i) => i).sort(() => rand() - 0.5);
    const amberSet = new Set(order.slice(0, 45));
    const rank = new Map(order.map((v, i) => [v, i]));
    for (let i = 0; i < 100; i++) {
      cells.push(add(r, `<div class="abs" style="left:${x0 + (i % N) * (S + G)}px;top:${y0 + Math.floor(i / N) * (S + G)}px;width:${S}px;height:${S}px;border-radius:9px;background:${C.line}"></div>`));
    }
    const legend = add(r, `<div class="abs mono" style="left:110px;width:860px;top:1060px;display:flex;justify-content:center;gap:36px;font-size:24px;font-weight:700">
        <span style="display:flex;align-items:center;gap:12px;color:${C.sky}"><i style="width:26px;height:26px;border-radius:6px;background:${C.blue}"></i>datos de entrenamiento</span>
        <span style="display:flex;align-items:center;gap:12px;color:${C.amber}"><i style="width:26px;height:26px;border-radius:6px;background:${C.amber}"></i>examen filtrado</span></div>`);
    const tEs = x.at('estudios'), t45 = x.at('45'), tF = x.at('filtrado');
    for (let k = 0; k < 10; k++) x.cue(t45 - 0.25 + k * 0.07, 'tick', 0.35);
    x.cue(t45 + 0.5, 'ding', 0.7); x.cue(tF, 'buzz', 0.4);
    return (lt) => {
      head.style.opacity = appear(lt, t45 - 0.6, 0.3);
      const kAmb = Ease.inOutCubic(prog(lt, t45 - 0.25, 0.75));
      head.querySelector('.num').textContent = Math.round(45 * kAmb) + '%';
      cells.forEach((c, i) => {
        const rk = rank.get(i);
        const blue = prog(lt, 0.1 + i * 0.012, 0.2);
        const amb = amberSet.has(i) && kAmb * 45 > rk;
        c.style.background = amb ? C.amber : (blue > 0 ? (lt > tEs ? C.blue : C.lineStrong) : C.line);
        c.style.boxShadow = amb ? `0 0 16px ${C.amber}` : 'none';
        c.style.transform = `scale(${amb ? 1 : lerp(0.5, 1, Ease.outBack(blue))})`;
      });
      legend.style.opacity = appear(lt, tEs, 0.4);
    };
  });

  // ───────────────────────── 5 · PREMIO KONWINSKI: línea temporal ─────────────────────────
  scene('kprize', (x) => {
    const r = x.root;
    const title = popText(r, 'PREMIO KONWINSKI', `top:320px;font-size:76px;color:${C.ink}`);
    const Y = 610, X0 = 120, XC = 560, X1 = 960;
    const tl = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="${C.lineStrong}" stroke-width="6" stroke-linecap="round"/>
        <rect class="train" x="${X0}" y="${Y - 22}" width="0" height="44" rx="22" fill="${C.blue}"/>
        <line class="cut" x1="${XC}" y1="${Y - 150}" x2="${XC}" y2="${Y + 90}" stroke="${C.ink}" stroke-width="5" stroke-dasharray="14 10" opacity="0"/>
        <path class="arrow" d="M${X1 - 22} ${Y - 16} L${X1 + 4} ${Y} L${X1 - 22} ${Y + 16}" fill="none" stroke="${C.lineStrong}" stroke-width="6" stroke-linecap="round"/></svg>`);
    const lblT = add(r, `<div class="abs mono" style="left:${X0}px;width:${XC - X0}px;top:${Y + 40}px;text-align:center;font-size:25px;font-weight:700;color:${C.sky}">ENTRENAMIENTO</div>`);
    const lblC = add(r, `<div class="abs mono" style="left:${XC - 150}px;width:300px;top:${Y - 200}px;text-align:center;font-size:24px;font-weight:700;color:${C.ink}">CORTE DE DATOS</div>`);
    const issues = [0, 1, 2, 3, 4].map((i) => add(r, `<div class="abs" style="left:${600 + i * 66}px;top:${Y - 120 + (i % 2) * 150}px;width:58px;height:58px;color:${C.green}">${I.issue}</div>`));
    const lblN = add(r, `<div class="abs mono" style="left:${XC + 10}px;width:${X1 - XC}px;top:${Y + 100}px;text-align:center;font-size:25px;font-weight:700;color:${C.green}">PROBLEMAS NUEVOS<br>DE GITHUB</div>`);
    const never = add(r, `<div class="abs" style="left:640px;top:${Y - 50}px;padding:10px 22px;border-radius:16px;border:4px solid ${C.green};color:${C.green};background:rgba(7,10,19,.9);display:flex;align-items:center;gap:12px">
        <div style="width:44px;height:44px">${I.eyeOff}</div><span class="display" style="font-size:36px;font-weight:700">NUNCA VISTOS</span></div>`);
    const res = add(r, `<div class="abs" style="left:110px;width:860px;top:810px;height:250px;border-radius:30px;background:${C.surface};border:3px solid ${C.red};display:flex;align-items:center;justify-content:center;gap:40px;box-shadow:0 0 60px rgba(251,44,54,.25)">
        <div class="mono" style="font-size:26px;font-weight:700;color:${C.muted};letter-spacing:.08em;line-height:1.4">NOTA DEL<br>GANADOR</div>
        <div class="v display" style="font-size:150px;font-weight:700;color:${C.red};line-height:1">7,5%</div>
        <div class="mono" style="font-size:21px;font-weight:500;color:${C.faint};line-height:1.4">vs ~75% de<br>sistemas<br>comparables<br>en el antiguo</div></div>`);
    const tPr = x.at('premio'), tPb = x.at('problemas'), tGh = x.at('github'), tD = x.at('despues'), tEn = x.at('entrenamiento'),
      tIm = x.at('imposible'), tG = x.at('ganador'), tV = x.at('75');
    x.cue(tPr, 'pop', 0.5); x.cue(tD, 'swipe', 0.7);
    issues.forEach((_, i) => x.cue(tGh - 0.1 + i * 0.09, 'tick', 0.4));
    x.cue(tIm, 'stamp', 0.7); x.shake(tIm, 10); x.cue(tV, 'stamp', 1); x.shake(tV, 20);
    return (lt) => {
      popIn(title, lt, tPr - 0.3, 0.6);
      const tr = Ease.outCubic(prog(lt, 0.2, 0.9));
      tl.querySelector('.train').setAttribute('width', (XC - X0) * tr);
      lblT.style.opacity = appear(lt, 0.6, 0.3);
      const cut = appear(lt, tD - 0.1, 0.3);
      tl.querySelector('.cut').setAttribute('opacity', cut);
      lblC.style.opacity = cut;
      issues.forEach((el, i) => popIn(el, lt, tGh - 0.15 + i * 0.09, 0.2));
      lblN.style.opacity = appear(lt, tPb, 0.3);
      const nv = popIn(never, lt, tIm - 0.05, 1.6);
      never.style.transform += ' rotate(-5deg)';
      const rs = popIn(res, lt, tG - 0.25, 0.7);
      const v = res.querySelector('.v');
      v.style.opacity = lt >= tV - 0.05 ? 1 : 0;
      v.style.transform = `scale(${lerp(2, 1, Ease.outBack(prog(lt, tV - 0.05, 0.35)))})`;
    };
  });

  // ───────────────────────── 6 · DIAGNÓSTICO → REMEDIO ─────────────────────────
  scene('remedio', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:325px;text-align:center;font-size:30px">${pill('LA LECCIÓN', C.ink)}</div>`);
    const row = (top, diag, color, icon, l1, l2) => {
      const d = add(r, `<div class="abs display" style="left:110px;top:${top + 70}px;width:330px;height:150px;border-radius:26px;border:4px solid ${color};color:${color};display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:700;background:rgba(11,15,25,.85)">${diag}</div>`);
      const ar = add(r, `<svg class="abs" width="120" height="60" style="left:448px;top:${top + 115}px"><path d="M6 30 H100" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path d="M84 12 L106 30 L84 48" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>`);
      const rem = add(r, `<div class="abs" style="left:575px;top:${top}px;width:355px;height:290px;border-radius:30px;background:${C.surface2};border:3px solid ${color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;box-shadow:0 0 50px ${color}33">
          <div style="width:92px;height:92px;color:${color}">${icon}</div>
          <div class="display" style="font-size:36px;font-weight:700;color:${C.ink};text-align:center;line-height:1.12">${l1}<br><span style="color:${color}">${l2}</span></div></div>`);
      return { d, ar, rem };
    };
    const A = row(400, 'SATURADO', C.blue, I.stairs, 'Examen', 'más difícil');
    const B = row(730, 'CONTAMINADO', C.amber, I.envelope, 'Examen que', 'nunca ha visto');
    const tS = x.at('saturado'), tDi = x.at('dificil'), tC = x.at('contaminado'), tN = x.at('nunca');
    x.cue(tS, 'pop', 0.6); x.cue(tDi, 'ding', 0.5); x.cue(tC, 'pop', 0.6); x.cue(tN, 'ding', 0.7);
    const anim = (R, t1, t2, lt) => {
      popIn(R.d, lt, t1 - 0.1, 0.6);
      const a = Ease.outCubic(prog(lt, t2 - 0.45, 0.35));
      const ps = R.ar.querySelectorAll('path');
      ps[0].setAttribute('stroke-dashoffset', 1 - a); ps[1].setAttribute('opacity', a >= 1 ? 1 : 0);
      popIn(R.rem, lt, t2 - 0.1, 0.5);
    };
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      anim(A, tS, tDi, lt);
      anim(B, tC, tN, lt);
      A.d.style.filter = A.rem.style.filter = lt > tC ? 'opacity(.5)' : 'none';
    };
  });

  // ───────────────────────── 7 · "¡NUEVO RÉCORD!" → ¿ESTABA EN SU ENTRENAMIENTO? ─────────────────────────
  scene('pregunta', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:150px;width:780px;top:420px;height:430px;border-radius:34px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div style="display:flex;align-items:center;gap:16px"><div style="width:52px;height:52px;color:${C.amber}">${I.star}</div><span class="mono" style="font-size:32px;font-weight:700;color:${C.amber};letter-spacing:.12em">¡NUEVO RÉCORD!</span></div>
        <div class="display" style="font-size:56px;font-weight:700;color:${C.fg}">Modelo X</div>
        <div class="display v" style="font-size:190px;font-weight:700;color:${C.green};line-height:1;text-shadow:0 0 50px rgba(16,185,129,.5)">96%</div></div>`);
    const rand = rng(7);
    const conf = Array.from({ length: 34 }, (_, i) => ({
      x: 540 + (rand() - 0.5) * 120, y: 640, vx: (rand() - 0.5) * 1500, vy: -600 - rand() * 900, rot: rand() * 720,
      c: [C.amber, C.cyan, C.green, C.rose, C.violet][i % 5],
      el: add(r, `<div class="abs" style="left:0;top:0;width:${14 + (i % 3) * 6}px;height:${8 + (i % 2) * 6}px;border-radius:3px;background:${[C.amber, C.cyan, C.green, C.rose, C.violet][i % 5]}"></div>`),
    }));
    const lens = add(r, `<div class="abs" style="left:0;top:0;width:180px;height:180px;color:${C.ink}">${I.search}</div>`);
    const stamp = add(r, `<div class="abs display" style="left:90px;width:900px;top:860px;text-align:center;font-size:62px;line-height:1.12;font-weight:700;color:${C.amber};border:8px solid ${C.amber};border-radius:28px;padding:20px 0;background:rgba(7,10,19,.92);box-shadow:0 30px 90px rgba(0,0,0,.6),0 0 60px rgba(245,158,11,.35)">¿ESTABA ESTE EXAMEN<br>EN SU ENTRENAMIENTO?</div>`);
    const tN = x.at('nota'), tE = x.at('espectacular'), tP = x.at('pregunta'), tPu = x.at('pudo'), tEn = x.at('entrenamiento');
    x.cue(tE, 'ding', 0.7); x.cue(tP, 'swipe', 0.5); x.cue(tEn - 0.05, 'stamp', 1); x.shake(tEn - 0.05, 20);
    return (lt) => {
      popIn(card, lt, tN - 0.3, 0.7);
      conf.forEach((p) => {
        const dt = lt - tE;
        if (dt < 0 || dt > 2.2) { p.el.style.opacity = 0; return; }
        p.el.style.opacity = Math.max(0, 1 - dt / 2.2);
        p.el.style.transform = `translate(${p.x + p.vx * dt}px, ${p.y + p.vy * dt + 1100 * dt * dt}px) rotate(${p.rot + dt * 600}deg)`;
      });
      // La lupa inspecciona la nota
      const lk = prog(lt, tP - 0.1, 1.6);
      lens.style.opacity = lk > 0 && lt < tEn + 0.1 ? 1 : 0;
      lens.style.transform = `translate(${lerp(820, 470, Ease.inOutCubic(lk)) + Math.sin(lk * 9) * 30}px, ${640 + Math.cos(lk * 7) * 40}px)`;
      card.querySelector('.v').style.color = lt > tEn ? C.faint : C.green;
      const s = spring(lt, tEn - 0.05, 0.4);
      stamp.style.opacity = s > 0 ? 1 : 0; stamp.style.transform = `rotate(-4deg) scale(${lerp(2.2, 1, s)})`;
    };
  });

  // ───────────────────────── 8 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, 'UNA NOTA ALTA', `top:360px;font-size:104px;color:${C.ink}`);
    const l2 = add(r, `<div class="abs mono" style="left:0;right:0;top:500px;text-align:center;font-size:42px;font-weight:700;color:${C.muted};letter-spacing:.12em">NO SIEMPRE ES</div>`);
    const l3 = popText(r, 'INTELIGENCIA', `top:560px;font-size:132px;color:${C.cyan};text-shadow:0 0 50px rgba(34,211,238,.5)`);
    const l4 = add(r, `<div class="abs mono" style="left:0;right:0;top:790px;text-align:center;font-size:42px;font-weight:700;color:${C.muted};letter-spacing:.12em">A VECES, ES</div>`);
    const l5 = popText(r, 'MEMORIA', `top:845px;font-size:176px;color:${C.amber};text-shadow:0 0 70px rgba(245,158,11,.7)`);
    const tN = x.at('nota'), tS = x.at('siempre'), tI = x.at('inteligencia'), tV = x.at('veces'), tM = x.at('memoria');
    x.cue(tI, 'pop', 0.6); x.cue(tM - 0.15, 'rise', 0.6); x.cue(tM, 'boom', 1); x.shake(tM, 26);
    return (lt) => {
      popIn(l1, lt, tN - 0.25, 0.7);
      l2.style.opacity = appear(lt, tS - 0.1, 0.3);
      popIn(l3, lt, tI - 0.1, 0.6);
      l3.style.filter = lt > tM ? 'opacity(.4)' : 'none';
      l4.style.opacity = appear(lt, tV - 0.1, 0.3);
      const s = spring(lt, tM - 0.05, 0.5);
      l5.style.opacity = s > 0 ? 1 : 0; l5.style.transform = `scale(${lerp(1.9, 1, s)})`;
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['benchmarks.santismm.com'], sub: 'tracker de 96 benchmarks de agentes' }));
})();
