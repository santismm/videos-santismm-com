/* EUREKA #09 · "La IA frente a 44 profesiones" (GDPval)
 * Fuente primaria: OpenAI, "GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks"
 * (arXiv 2510.04374, 5-10-2025) y el post "Measuring the performance of our models on real-world tasks" (25-9-2025):
 * 1.320 tareas (30 por ocupación) de 44 ocupaciones en los 9 sectores que más aportan al PIB de EE. UU.; expertos con
 * 14 años de experiencia media; comparación por pares a ciegas por expertos del mismo oficio (subconjunto gold de 220
 * tareas). Fig. 5: ganan o empatan GPT-4o 12,4 %, GPT-5 high 38,8 %, Claude Opus 4.1 47,6 %; línea de paridad al 50 %.
 * Limitaciones: "precisely-specified and one-shot, not interactive"; fuera de alcance el conocimiento tácito y la
 * comunicación entre personas; "most jobs are more than just a collection of tasks that can be written down".
 * Después (datos del propio fabricante): anuncio de GPT-5.2 (11-12-2025): GPT-5.2 Thinking "beats or ties top industry
 * professionals on 70.9% of comparisons on GDPval knowledge work tasks, according to expert human judges"; anuncio de
 * GPT-5.5 (23-4-2026): "GPT-5.5 scores 84.9%" (fila "GDPval (wins or ties)" de su tabla; GPT-5.4: 83,0 %).
 * Tesis: articles.santismm.com/el-cronometro-y-el-examen: "El benchmark más honesto es el trabajo por el que se paga
 * a un profesional."
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;
  const L = EUREKA.L;

  EUREKA.video = { keywords: ['44', 'ciegas', '48%', '50%', '71%', '85%', 'fabricante', 'experto', 'honesto', 'paridad', 'tus'] };
  const PERSON = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><circle cx="32" cy="20" r="11"/><path d="M12 58c0-12 9-20 20-20s20 8 20 20"/></svg>`;
  const CHIP = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="32" height="32" rx="5"/><rect x="25" y="25" width="14" height="14" rx="2"/><path d="M24 6v10M32 6v10M40 6v10M24 48v10M32 48v10M40 48v10M6 24h10M6 32h10M6 40h10M48 24h10M48 32h10M48 40h10"/></svg>`;
  const int = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, L('.', ','));
  const pct = (v, d = 1) => v.toFixed(d).replace('.', L(',', '.')) + '%';

  // ───────────────────────── 1 · HOOK: cartel de combate ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const ai = add(r, `<div class="abs" style="left:340px;top:320px;width:400px;height:220px;border-radius:36px;background:${C.surface2};border:5px solid ${C.cyan};box-shadow:0 0 70px rgba(34,211,238,.35);display:flex;align-items:center;justify-content:center;gap:26px">
        <div style="width:110px;height:110px;color:${C.cyan}">${CHIP}</div><div class="display" style="font-size:120px;font-weight:700;color:${C.ink}">${L('IA', 'AI')}</div></div>`);
    const vs = add(r, `<div class="abs display" style="left:0;right:0;top:560px;text-align:center;font-size:110px;font-weight:700;color:${C.amber};text-shadow:0 0 50px rgba(245,158,11,.7);font-style:italic">VS</div>`);
    const names = L(['ABOGADOS', 'ENFERMERAS', 'CONTABLES'], ['LAWYERS', 'NURSES', 'ACCOUNTANTS']);
    const cols = [C.violet, C.rose, C.green];
    const badge = (i) => add(r, `<div class="abs" style="left:${200 + i * 230}px;top:730px;width:220px;height:300px;transform-origin:50% -60px">
        <div class="abs" style="left:100px;top:-70px;width:20px;height:80px;background:${cols[i]};opacity:.7;border-radius:4px"></div>
        <div class="abs" style="inset:0;border-radius:24px;background:#e9eef6;box-shadow:0 24px 60px rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;padding-top:22px;box-sizing:border-box">
          <div style="width:70px;height:12px;border-radius:6px;background:#93a1b8"></div>
          <div style="width:110px;height:110px;border-radius:50%;background:${cols[i]};margin-top:22px;display:flex;align-items:center;justify-content:center;color:#0b0f19"><div style="width:72px;height:72px">${PERSON}</div></div>
          <div class="mono" style="font-size:${names[i].length > 10 ? 21 : 25}px;font-weight:700;color:#0b0f19;margin-top:26px;letter-spacing:.04em">${names[i]}</div>
          <div style="width:120px;height:10px;border-radius:5px;background:#cad5e2;margin-top:14px"></div></div></div>`);
    const B = [0, 1, 2].map(badge);
    const count = add(r, `<div class="abs" style="left:0;right:0;top:1065px;text-align:center;font-size:30px">${pill(L('+ OTRAS 41 PROFESIONES', '+ 41 MORE PROFESSIONS'), C.muted)}</div>`);
    const q = add(r, `<div class="abs display" style="left:780px;top:300px;width:150px;height:150px;border-radius:50%;background:${C.amber};color:${C.bg};font-size:110px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(245,158,11,.5)">?</div>`);
    const tP = x.at('44'), tN = [L('abogados', 'lawyers'), L('enfermeras', 'nurses'), L('contables', 'accountants')].map((w) => x.at(w)), tQ = x.at(L('quien', 'who'));
    x.cue(0.2, 'boom', 0.8); x.shake(0.25, 14); tN.forEach((t) => x.cue(t, 'pop', 0.6)); x.cue(tQ, 'ding', 0.7);
    return (lt) => {
      popIn(ai, lt, 0.05, 0.5);
      const v = spring(lt, 0.3, 0.4); vs.style.opacity = v > 0 ? 1 : 0; vs.style.transform = `scale(${lerp(2.2, 1, v) * (1 + 0.04 * Math.sin(lt * 6))})`;
      B.forEach((b, i) => {
        const s = spring(lt, tN[i] - 0.15, 0.5);
        b.style.opacity = s > 0 ? 1 : 0;
        b.style.transform = `translateY(${(1 - s) * 200}px) rotate(${(i - 1) * 7 + Math.sin(lt * 2 + i) * 2}deg)`;
      });
      count.style.opacity = appear(lt, tP + 0.2, 0.4);
      popIn(q, lt, tQ - 0.1, 0.3);
    };
  });

  // ───────────────────────── 2 · 1.320 TAREAS: el archivador de 9 sectores ─────────────────────────
  scene('tareas', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:310px;text-align:center">
        <div class="v display" style="font-size:170px;font-weight:700;color:${C.ink};line-height:1;font-variant-numeric:tabular-nums">0</div>
        <div class="mono" style="font-size:30px;font-weight:700;color:${C.cyan};letter-spacing:.12em;margin-top:6px">${L('TAREAS REALES · 44 PROFESIONES × 30', 'REAL TASKS · 44 PROFESSIONS × 30')}</div></div>`);
    const sectors = L(['Inmobiliario', 'Industria', 'Servicios prof.', 'Sector público', 'Sanidad', 'Finanzas', 'Comercio minorista', 'Comercio mayorista', 'Información'],
      ['Real estate', 'Manufacturing', 'Prof. services', 'Government', 'Health care', 'Finance', 'Retail', 'Wholesale', 'Information']);
    const cab = add(r, `<div class="abs" style="left:150px;top:560px;width:780px;height:440px;border-radius:24px;background:${C.surface};border:4px solid ${C.lineStrong};box-shadow:0 30px 80px rgba(0,0,0,.5)"></div>`);
    const D = sectors.map((s, i) => add(cab, `<div class="abs" style="left:${20 + (i % 3) * 250}px;top:${20 + Math.floor(i / 3) * 138}px;width:236px;height:124px;border-radius:14px;background:${C.surface2};border:3px solid ${C.line};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
        <div style="width:70px;height:12px;border-radius:6px;background:${C.lineStrong}"></div>
        <div class="mono" style="font-size:${s.length > 15 ? 18 : 22}px;font-weight:700;color:${C.fg};text-align:center">${s}</div></div>`));
    const cap = add(r, `<div class="abs mono" style="left:0;right:0;top:1010px;text-align:center;font-size:22px;font-weight:700;color:${C.faint}">${L('LOS 9 SECTORES QUE MÁS APORTAN AL PIB DE EE. UU.', 'THE 9 SECTORS THAT ADD MOST TO US GDP')}</div>`);
    const exp = add(r, `<div class="abs" style="left:0;right:0;top:1062px;text-align:center;font-size:28px">${pill(`<span style="width:34px;height:34px;display:inline-block">${I.star}</span>${L('EXPERTOS · 14 AÑOS DE OFICIO DE MEDIA', 'EXPERTS · 14 YEARS ON THE JOB, ON AVERAGE')}`, C.amber)}</div>`);
    const tG = x.at('gdpval'), tN = x.at('1320'), tE = x.at(L('expertos', 'experts'));
    x.cue(tG, 'whoosh', 0.6); for (let i = 0; i < 9; i++) x.cue(tN - 0.2 + i * 0.09, 'tick', 0.3); x.cue(tN + 0.9, 'ding', 0.7); x.cue(tE, 'pop', 0.6);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      const k = Ease.outCubic(prog(lt, tN - 0.2, 1.0));
      head.querySelector('.v').textContent = int(Math.round(1320 * k));
      cab.style.opacity = appear(lt, 0.2, 0.4);
      D.forEach((d, i) => {
        const s = spring(lt, tN - 0.3 + i * 0.09, 0.35);
        d.style.transform = `translateY(${Math.sin(Math.min(1, s) * Math.PI) * -16}px)`;
        d.style.borderColor = s > 0 ? C.cyan : C.line;
      });
      cap.style.opacity = appear(lt, tN + 0.5, 0.4);
      popIn(exp, lt, tE - 0.1, 0.6);
    };
  });

  // ───────────────────────── 3 · CATA A CIEGAS: dos campanas ─────────────────────────
  scene('cata', (x) => {
    const r = x.root;
    const judge = add(r, `<div class="abs" style="left:0;right:0;top:310px;display:flex;flex-direction:column;align-items:center">
        <div style="position:relative;width:150px;height:150px;border-radius:50%;background:${C.surface2};border:4px solid ${C.violet};display:flex;align-items:center;justify-content:center;color:${C.violet}">
          <div style="width:100px;height:100px">${PERSON}</div>
          <div class="mask" style="position:absolute;left:18px;right:18px;top:38px;height:30px;border-radius:15px;background:${C.ink}"></div></div>
        <div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};letter-spacing:.1em;margin-top:12px">${L('EXPERTO DEL MISMO OFICIO', 'EXPERT FROM THE SAME FIELD')}</div></div>`);
    const plate = (cx, lbl) => {
      const el = add(r, `<div class="abs" style="left:${cx - 190}px;top:560px;width:380px;height:360px">
          <div class="doc abs" style="left:110px;top:90px;width:160px;height:200px;border-radius:10px;background:#e9eef6;padding:20px;box-sizing:border-box;display:flex;flex-direction:column;gap:14px">
            ${[90, 70, 85, 60, 75].map((w) => `<div style="height:12px;border-radius:6px;background:#93a1b8;width:${w}%"></div>`).join('')}</div>
          <div class="dome abs" style="left:30px;top:30px;width:320px;height:260px;transform-origin:15% 100%">
            <div class="abs" style="left:0;top:40px;width:320px;height:220px;border-radius:160px 160px 10px 10px;background:linear-gradient(160deg,#f8fafc,#93a1b8 60%,#5d6b85);box-shadow:inset -20px -10px 40px rgba(0,0,0,.25)"></div>
            <div class="abs" style="left:135px;top:10px;width:50px;height:40px;border-radius:25px 25px 6px 6px;background:#cad5e2"></div>
            <div class="abs display" style="left:0;right:0;top:110px;text-align:center;font-size:90px;font-weight:700;color:#0b0f19">${lbl}</div></div>
          <div class="abs" style="left:0;top:290px;width:380px;height:26px;border-radius:13px;background:${C.lineStrong}"></div>
          <div class="tag abs mono" style="left:0;right:0;top:330px;text-align:center;font-size:26px;font-weight:700;color:${C.muted}">${L('sin firma', 'unsigned')}</div></div>`);
      return el;
    };
    const A = plate(310, 'A'), B = plate(770, 'B');
    const who = (txt, col) => add(r, `<div class="abs mono" style="left:0;top:0;padding:10px 22px;border-radius:999px;background:${col};color:${C.bg};font-size:30px;font-weight:700;white-space:nowrap">${txt}</div>`);
    const wH = who(L('HUMANO', 'HUMAN'), C.amber), wI = who(L('IA', 'AI'), C.cyan);
    const opts = L(['GANA', 'EMPATA', 'PIERDE'], ['WIN', 'TIE', 'LOSS']);
    const O = opts.map((o, i) => add(r, `<div class="abs display" style="left:${130 + i * 280}px;top:1000px;width:260px;height:110px;border-radius:24px;border:4px solid ${[C.green, C.sky, C.red][i]};background:${C.surface};color:${C.ink};font-size:46px;font-weight:700;display:flex;align-items:center;justify-content:center">${o}</div>`));
    const tD = x.at(L('entregables', 'deliverables')), tH = x.at(L('humano', 'human')), tI = x.at(L('ia', 'ai'), L(0, 0)), tE = x.at(L('elige', 'picks')), tC = x.at(L('ciegas', 'blind'));
    x.cue(tD, 'pop', 0.6); x.cue(tH, 'tick', 0.5); x.cue(tI, 'tick', 0.5); x.cue(tI + 0.5, 'swipe', 0.6); x.cue(tE + 0.1, 'ding', 0.8); x.cue(tC, 'stamp', 0.7);
    return (lt) => {
      judge.style.opacity = appear(lt, 0, 0.3);
      judge.querySelector('.mask').style.transform = `scaleX(${Ease.outBack(prog(lt, tC - 0.15, 0.35))})`;
      popIn(A, lt, tD - 0.2, 0.6); popIn(B, lt, tD - 0.05, 0.6);
      // Las etiquetas aparecen y se barajan: el experto no sabe cuál es cuál.
      const sh = Ease.inOutCubic(prog(lt, tI + 0.45, 0.6));
      const swap = Math.sin(sh * Math.PI);
      const hide = appear(lt, tI + 1.0, 0.3);
      [[wH, 310, tH], [wI, 770, tI]].forEach(([w, cx, t], i) => {
        const px = lerp(cx, i ? 310 : 770, sh) - w.offsetWidth / 2;
        w.style.transform = `translate(${px}px, ${560 - 40 * swap * (i ? -1 : 1)}px) scale(${lerp(0.5, 1, Ease.outBack(prog(lt, t - 0.1, 0.3)))})`;
        w.style.opacity = (lt > t - 0.1 ? 1 : 0) * (1 - hide);
      });
      [A, B].forEach((p) => { p.querySelector('.tag').textContent = hide > 0.5 ? '¿?' : L('sin firma', 'unsigned'); });
      const lift = Ease.outBack(prog(lt, tE - 0.1, 0.5));
      A.querySelector('.dome').style.transform = `translate(${-60 * lift}px, ${-120 * lift}px) rotate(${-25 * lift}deg)`;
      A.querySelector('.doc').style.boxShadow = lift > 0.5 ? `0 0 0 6px ${C.green}, 0 0 50px rgba(16,185,129,.5)` : 'none';
      O.forEach((o, i) => {
        const s = spring(lt, tE - 0.2 + i * 0.08, 0.35);
        o.style.opacity = s > 0 ? (i === 2 ? 0.5 : 1) : 0;
        o.style.transform = `scale(${lerp(0.5, 1, s)})`;
      });
    };
  });

  // ───────────────────────── Tira y afloja (escenas 4 y 5) ─────────────────────────
  // El nudo marca el % de tareas en que la IA gana o empata. El centro (50 %) es la paridad.
  const X0 = 140, X1 = 940, RY = 680;
  const px = (v) => X0 + (X1 - X0) * v / 100;
  function rope(r) {
    add(r, `<div class="abs" style="left:${X0}px;top:${RY - 6}px;width:${X1 - X0}px;height:12px;border-radius:6px;background:repeating-linear-gradient(60deg,#c9a46a 0 14px,#8a6a3a 14px 22px)"></div>`);
    const ticks = add(r, `<div class="abs" style="left:0;top:${RY + 160}px;width:1080px;height:60px"></div>`);
    [0, 25, 50, 75, 100].forEach((v) => add(ticks, `<div class="abs mono" style="left:${px(v) - 50}px;width:100px;top:0;text-align:center;font-size:24px;font-weight:700;color:${C.faint}">${v}%</div>`));
    add(r, `<div class="abs" style="left:${X0}px;top:${RY + 145}px;width:${X1 - X0}px;height:3px;background:${C.lineStrong}"></div>`);
    const par = add(r, `<div class="abs" style="left:${px(50) - 3}px;top:${RY - 190}px;width:6px;height:340px;background:repeating-linear-gradient(${C.red} 0 18px, transparent 18px 30px)"></div>`);
    const parL = add(r, `<div class="abs display" style="left:${px(50) - 160}px;width:320px;top:${RY - 250}px;text-align:center;font-size:40px;font-weight:700;color:${C.red}">${L('PARIDAD · 50%', 'PARITY · 50%')}</div>`);
    add(r, `<div class="abs mono" style="left:${X0}px;top:${RY + 205}px;font-size:23px;font-weight:700;color:${C.amber}">${L('← GANA EL EXPERTO', '← EXPERT WINS')}</div>`);
    add(r, `<div class="abs mono" style="right:${1080 - X1}px;top:${RY + 205}px;font-size:23px;font-weight:700;color:${C.cyan};text-align:right">${L('LA IA GANA O EMPATA →', 'AI WINS OR TIES →')}</div>`);
    const knot = add(r, `<div class="abs" style="left:0;top:${RY - 34}px;width:68px;height:68px;border-radius:50%;background:${C.cyan};border:6px solid ${C.ink};box-shadow:0 0 40px ${C.cyan}"></div>`);
    const val = add(r, `<div class="abs display" style="left:0;top:${RY - 175}px;width:300px;text-align:center;font-size:96px;font-weight:700;color:${C.cyan};text-shadow:0 0 40px rgba(34,211,238,.5)">0%</div>`);
    return { par, parL, knot, val, place(v, txt) { knot.style.transform = `translateX(${px(v) - 34}px)`; val.style.transform = `translateX(${Math.min(Math.max(px(v) - 150, 90), 930 - 300)}px)`; val.textContent = txt; } };
  }

  // ───────────────────────── 4 · MARCADOR: 47,6 % ─────────────────────────
  scene('marcador', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:310px;text-align:center;font-size:26px">${pill(L('% DE TAREAS EN QUE LA IA GANA O EMPATA', '% OF TASKS WHERE AI WINS OR TIES'), C.ink)}</div>`);
    const R = rope(r);
    const ghosts = [['GPT-4o', 12.4], ['GPT-5 high', 38.8]].map(([n, v]) => add(r, `<div class="abs mono" style="left:${px(v) - 90}px;width:180px;top:${RY + 40}px;text-align:center;font-size:20px;font-weight:700;color:${C.muted};background:${C.bg};border-radius:8px;padding-bottom:4px"><div style="width:4px;height:26px;background:${C.muted};margin:0 auto 6px"></div>${n}<br>${pct(v)}</div>`));
    const who = add(r, `<div class="abs mono" style="left:0;right:0;top:${RY + 265}px;text-align:center;font-size:26px;font-weight:700;color:${C.fg}">${L('Mejor modelo: Claude Opus 4.1 · sept. 2025', 'Best model: Claude Opus 4.1 · Sept 2025')}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:${RY + 310}px;text-align:center;font-size:21px;font-weight:700;color:${C.faint}">${L('OpenAI · GDPval · 220 tareas evaluadas por expertos', 'OpenAI · GDPval · 220 tasks graded by experts')}</div>`);
    const t48 = x.at('48'), tPa = x.at(L('paridad', 'parity')), tM = x.at(L('mejor', 'best'));
    for (let i = 0; i < 7; i++) x.cue(tM + i * 0.15, 'tick', 0.3);
    x.cue(t48, 'ding', 0.8); x.cue(tPa, 'buzz', 0.5); x.shake(tPa + 0.1, 8);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      const k = Ease.outCubic(prog(lt, tM - 0.1, t48 - tM + 0.2));
      const v = 47.6 * k;
      R.place(v, pct(v));
      ghosts.forEach((g, i) => { g.style.opacity = appear(lt, tM + i * 0.5, 0.3) * 0.9; });
      who.style.opacity = appear(lt, t48 + 0.2, 0.4); src.style.opacity = appear(lt, t48 + 0.5, 0.4);
      const p = appear(lt, tPa - 0.2, 0.3);
      R.par.style.opacity = 0.35 + 0.65 * p; R.parL.style.opacity = 0.35 + 0.65 * p;
      R.parL.style.transform = `scale(${lt > tPa - 0.2 ? lerp(1.3, 1, Ease.outBack(prog(lt, tPa - 0.2, 0.4))) : 1})`;
    };
  });

  // ───────────────────────── 5 · EL SALTO: 70,9 % → 84,9 % (datos del fabricante) ─────────────────────────
  scene('salto', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:310px;text-align:center;font-size:26px">${pill(L('% DE TAREAS EN QUE LA IA GANA O EMPATA', '% OF TASKS WHERE AI WINS OR TIES'), C.ink)}</div>`);
    const R = rope(r);
    const mark = (v, when) => add(r, `<div class="abs mono" style="left:${px(v) - 80}px;width:160px;top:${RY + 40}px;text-align:center;font-size:20px;font-weight:700;color:${C.muted};background:${C.bg};border-radius:8px;padding-bottom:4px"><div style="width:4px;height:26px;background:${C.muted};margin:0 auto 6px"></div>${when}<br>${pct(v)}</div>`);
    const g1 = mark(47.6, L('sept. 2025', 'Sept 2025')), g2 = mark(70.9, L('dic. 2025', 'Dec 2025'));
    const whoTxt = [L('GPT-5.2 Thinking · OpenAI · dic. 2025', 'GPT-5.2 Thinking · OpenAI · Dec 2025'), L('GPT-5.5 · OpenAI · abr. 2026', 'GPT-5.5 · OpenAI · Apr 2026')];
    const who = add(r, `<div class="abs mono" style="left:0;right:0;top:${RY + 265}px;text-align:center;font-size:26px;font-weight:700;color:${C.fg}">${whoTxt[0]}</div>`);
    const stamp = add(r, `<div class="abs display" style="left:170px;top:${RY + 330}px;width:740px;padding:10px 0;text-align:center;white-space:nowrap;border:6px solid ${C.amber};border-radius:18px;color:${C.amber};font-size:40px;font-weight:700;letter-spacing:.04em;background:rgba(11,15,25,.85)">${L('DATOS DEL PROPIO FABRICANTE', "THE MAKER'S OWN NUMBERS")}</div>`);
    const t71 = x.at('71'), t85 = x.at('85'), tO = x.at(L('datos', 'numbers'));
    x.cue(t71 - 0.3, 'rise', 0.6); x.cue(t71, 'ding', 0.8); x.cue(t85 - 0.3, 'rise', 0.6); x.cue(t85, 'boom', 0.9); x.shake(t85 + 0.05, 16);
    x.cue(tO + 0.1, 'stamp', 0.9); x.shake(tO + 0.1, 10);
    return (lt) => {
      head.style.opacity = 1;
      const k1 = Ease.outBack(prog(lt, t71 - 0.5, 0.7)), k2 = Ease.outBack(prog(lt, t85 - 0.5, 0.7));
      const v = lt < t85 - 0.5 ? lerp(47.6, 70.9, k1) : lerp(70.9, 84.9, k2);
      const shown = lt < t71 - 0.5 ? 47.6 : lt < t85 - 0.5 ? (k1 > 0.97 ? 70.9 : Math.min(v, 70.9)) : (k2 > 0.97 ? 84.9 : Math.min(v, 84.9));
      R.place(v, pct(shown));
      R.knot.style.background = v > 50 ? C.green : C.cyan; R.val.style.color = v > 50 ? C.green : C.cyan;
      g1.style.opacity = appear(lt, t71 - 0.3, 0.3);
      g2.style.opacity = appear(lt, t85 - 0.3, 0.3);
      who.style.opacity = appear(lt, t71 + 0.1, 0.3);
      who.textContent = lt < t85 - 0.2 ? whoTxt[0] : whoTxt[1];
      const s = spring(lt, tO + 0.05, 0.35);
      stamp.style.opacity = s > 0 ? 1 : 0; stamp.style.transform = `rotate(-4deg) scale(${lerp(1.8, 1, s)})`;
    };
  });

  // ───────────────────────── 6 · EL PUZLE: una tarea no es un trabajo ─────────────────────────
  scene('puzle', (x) => {
    const r = x.root;
    const S = 220, GX = 540 - S * 1.5, GY = 380;
    const piece = (i, filled, label) => {
      const col = filled ? C.cyan : 'transparent';
      const bd = filled ? `4px solid ${C.cyan}` : `4px dashed ${C.lineStrong}`;
      const el = add(r, `<div class="abs" style="left:${GX + (i % 3) * S}px;top:${GY + Math.floor(i / 3) * S}px;width:${S - 16}px;height:${S - 16}px">
          <div class="abs" style="inset:0;border-radius:18px;border:${bd};background:${filled ? 'rgba(34,211,238,.18)' : 'rgba(15,21,37,.6)'}"></div>
          ${i % 3 < 2 ? `<div class="abs" style="right:-30px;top:${(S - 16) / 2 - 26}px;width:52px;height:52px;border-radius:50%;border:${bd};background:${filled ? 'rgba(34,211,238,.18)' : C.bg};clip-path:inset(0 0 0 45%)"></div>` : ''}
          <div class="abs mono" style="inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:16px;font-size:${filled ? 26 : 22}px;font-weight:700;color:${filled ? C.ink : C.muted};line-height:1.25">${label}</div></div>`);
      return el;
    };
    const labels = L(['buscar el contexto', 'iterar con otros', 'conocimiento tácito', 'reuniones y llamadas', 'TAREA<br>GDPval', 'decidir qué hacer', 'herramientas propias', 'trabajo físico', 'datos privados'],
      ['finding the context', 'iterating with others', 'tacit knowledge', 'meetings and calls', 'GDPval<br>TASK', 'deciding what to do', 'in-house tools', 'physical work', 'private data']);
    const P = labels.map((l, i) => piece(i, i === 4, l));
    const chips = L(['✓ bien definida', '✓ todo el contexto', '✓ un solo intento'], ['✓ well-defined', '✓ full context given', '✓ one shot']);
    const CH = chips.map((c, i) => add(r, `<div class="abs" style="left:0;right:0;top:${380 + i * 110}px;text-align:center;font-size:36px">${pill(c, C.cyan)}</div>`));
    const title = add(r, `<div class="abs display" style="left:0;right:0;top:${GY + 3 * S + 10}px;text-align:center;font-size:58px;font-weight:700;color:${C.amber}">${L('UN TRABAJO', 'A JOB')}</div>`);
    const tB = x.at(L('bien', 'well')), tCo = x.at(L('contexto', 'context')), tS = x.at(L('solo', 'one')), tT = x.at(L('trabajo', 'job'));
    x.cue(tB, 'tick', 0.5); x.cue(tCo, 'tick', 0.5); x.cue(tS, 'tick', 0.5); x.cue(tT - 0.1, 'whoosh', 0.8); x.cue(tT + 0.5, 'pop', 0.6);
    return (lt) => {
      // Fase 1: la pieza sola, en grande, con sus tres condiciones.
      const z = Ease.inOutCubic(prog(lt, tT - 0.25, 0.7));
      const big = lerp(1.6, 1, z);
      const centre = P[4];
      centre.style.opacity = appear(lt, 0, 0.3);
      centre.style.transform = `translateY(${lerp(150, 0, z)}px) scale(${big})`;
      CH.forEach((c, i) => {
        const s = popIn(c, lt, [tB, tCo, tS][i] - 0.15, 0.6);
        c.style.opacity = (s > 0 ? 1 : 0) * (1 - z);
        c.style.transform += ` translateY(${-z * 80}px)`;
      });
      // Fase 2: zoom out → el resto del puzle está vacío.
      P.forEach((p, i) => { if (i !== 4) { const s = appear(lt, tT + 0.1 + i * 0.05, 0.35); p.style.opacity = s; p.style.transform = `scale(${lerp(0.7, 1, s)})`; } });
      title.style.opacity = appear(lt, tT + 0.4, 0.4);
    };
  });

  // ───────────────────────── 7 · LA LECCIÓN: cambia la pregunta ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const bubble = (top, txt, color, tail) => add(r, `<div class="abs" style="left:130px;width:820px;top:${top}px;min-height:200px;border-radius:40px;background:${C.surface};border:5px solid ${color};display:flex;align-items:center;justify-content:center;text-align:center;padding:24px 40px;box-sizing:border-box;box-shadow:0 0 50px ${color}33">
        <div class="display" style="font-size:${txt.length > 40 ? 46 : 54}px;font-weight:700;color:${C.ink};line-height:1.15">${txt}</div>
        <div class="abs" style="${tail}:70px;bottom:-34px;width:60px;height:60px;background:${C.surface};border-right:5px solid ${color};border-bottom:5px solid ${color};transform:rotate(45deg)"></div></div>`);
    const A = bubble(360, L('¿Aprueba un examen?', 'Does it pass an exam?'), C.red, 'left');
    const strike = add(r, `<svg class="abs" width="1080" height="300" style="left:0;top:330px"><line x1="160" y1="230" x2="920" y2="60" stroke="${C.red}" stroke-width="14" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const B = bubble(680, L('¿Gana o empata a un experto…<br>en <span class="tus" style="color:' + C.amber + '">TUS</span> tareas?', 'Does it win or tie against an expert…<br>on <span class="tus" style="color:' + C.amber + '">YOUR</span> tasks?'), C.green, 'right');
    const tEx = x.at(L('examen', 'exam')), tP = x.at(L('pregunta', 'ask')), tT = x.at(L('tus', 'your'));
    x.cue(tEx + 0.1, 'swipe', 0.7); x.cue(tP, 'pop', 0.6); x.cue(tT, 'ding', 0.8);
    return (lt) => {
      popIn(A, lt, 0.1, 0.7);
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tEx + 0.1, 0.3)));
      A.style.filter = lt > tEx + 0.3 ? 'opacity(.45)' : 'none';
      popIn(B, lt, tP - 0.15, 0.6);
      const tus = B.querySelector('.tus');
      tus.style.display = 'inline-block';
      tus.style.transform = `scale(${lt > tT - 0.05 ? lerp(1.6, 1, Ease.outBack(prog(lt, tT - 0.05, 0.4))) : 1})`;
    };
  });

  // ───────────────────────── 8 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, L('EL BENCHMARK<br>MÁS HONESTO', 'THE MOST HONEST<br>BENCHMARK'), `top:360px;font-size:104px;line-height:1.02;color:${C.ink}`);
    const l2 = add(r, `<div class="abs mono" style="left:0;right:0;top:610px;text-align:center;font-size:36px;font-weight:700;letter-spacing:.06em;color:${C.muted}">${L('ES EL TRABAJO POR EL QUE SE PAGA', 'IS THE WORK YOU PAY')}</div>`);
    const l3 = popText(r, L('A UN<br>PROFESIONAL', 'A PROFESSIONAL<br>TO DO'), `top:690px;font-size:130px;line-height:1;color:${C.amber};text-shadow:0 0 60px rgba(245,158,11,.6)`);
    const tB = x.at('benchmark'), tTr = x.at(L('trabajo', 'work')), tPr = x.at(L('profesional', 'professional'));
    x.cue(tPr - 0.15, 'rise', 0.6); x.cue(tPr, 'boom', 1); x.shake(tPr, 20);
    return (lt) => {
      popIn(l1, lt, tB - 0.3, 0.7);
      l2.style.opacity = appear(lt, tTr - 0.2, 0.3);
      const s = spring(lt, tPr - 0.05, 0.5); l3.style.opacity = s > 0 ? 1 : 0; l3.style.transform = `scale(${lerp(1.8, 1, s)})`;
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['benchmarks.santismm.com'], sub: L('el tracker: GDPval y más benchmarks, con sus fuentes', 'the tracker: GDPval and more benchmarks, with sources') }));
})();
