/* EUREKA #11 (EN) · "Model, agent or harness?" — the three layers and how to tell them apart.
 * The lab is Spanish-only: every on-screen quote in the English version is our translation (labelled "translated").
 * Fuente primaria: SANTISMM Labs, juego «¿Modelo, agente o arnés?» (https://labs.santismm.com/model-agent-harness,
 * v1.0 de agosto de 2026, leído el 18-11-2026). Definiciones literales de los tres botones:
 *   Modelo: "La capacidad que predice y genera" · Agente: "La entidad que percibe, decide y actúa"
 *   Arnés: "El sistema que conecta contexto y herramientas".
 * Casos del juego usados en el quiz (texto y explicación literales del lab): n.º 2 (PRODUCTO, Codex → Agente),
 * n.º 6 (CONTROL → Arnés) y n.º 9 (ARQUITECTURA, Claude Sonnet 4.6 → Modelo).
 * Matiz del pie del juego: "Clasifica el sujeto descrito, no la marca completa. Productos como Codex, Devin o
 * Claude Code integran modelo, agente y arnés en distintas proporciones."
 * Resumen final del juego: "modelo es capacidad; agente, conducta orientada a objetivos; arnés, el sistema que la
 * hace posible y gobernable". Descripción del lab: "Clasifica las capas de un sistema de IA y entiende sus
 * responsabilidades."
 * Contexto: santismm.com/es/harness-engineering (definición de la ingeniería de harness).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;
  const L = EUREKA.L;

  // El idioma solo se conoce en init(): todo lo que usa L() se calcula dentro de las escenas.
  EUREKA.video = { keywords: [] };

  // Iconos de los tres botones del lab (lucide: brain-circuit, bot, boxes).
  const sv = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const BRAIN = sv('<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/>');
  const BOT = sv('<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>');
  const BOXES = sv('<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>');

  let LAYERS, CASES;
  function data() {
    if (LAYERS) return;
    EUREKA.video.keywords = L(['ia', 'capas', 'modelo', 'agente', 'arnés', 'codex', 'claude', 'responsabilidades', 'culpes', 'aplaudas'],
      ['ai', 'layers', 'model', 'agent', 'harness', 'codex', 'claude', 'responsibilities', 'blame', 'praise']);
    LAYERS = [
    { name: L('Modelo', 'Model'), def: L('La capacidad que predice y genera', 'The capability that predicts and generates'), role: L('capacidad', 'capability'), col: C.violet, icon: BRAIN },
    { name: L('Agente', 'Agent'), def: L('La entidad que percibe, decide y actúa', 'The entity that perceives, decides and acts'), role: L('conducta orientada a objetivos', 'goal-directed behavior'), col: C.cyan, icon: BOT },
    { name: L('Arnés', 'Harness'), def: L('El sistema que conecta contexto y herramientas', 'The system that connects context and tools'), role: L('el sistema que la hace posible y gobernable', 'the system that makes it possible and governable'), col: C.amber, icon: BOXES },
  ];
    CASES = CASES_();
  }
  const GREY = '#5d6b85';
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, k) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})`; };

  // Losa isométrica (cara superior + dos laterales). w = ancho; el color se cambia con el.style.color.
  function slab(parent, cx, cy, w, col) {
    const h = w / 2, d = Math.round(w * 0.075);
    const el = add(parent, `<div class="abs" style="left:${cx - w / 2 - 4}px;top:${cy - h / 2 - 4}px;width:${w + 8}px;height:${h + d + 8}px;color:${col}">
      <svg width="${w + 8}" height="${h + d + 8}" viewBox="-4 -4 ${w + 8} ${h + d + 8}" style="overflow:visible">
        <path d="M0 ${h / 2} L${w / 2} ${h} L${w / 2} ${h + d} L0 ${h / 2 + d} Z" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${w} ${h / 2} L${w / 2} ${h} L${w / 2} ${h + d} L${w} ${h / 2 + d} Z" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${w / 2} 0 L${w} ${h / 2} L${w / 2} ${h} L0 ${h / 2} Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
        <path d="M${w / 2} ${h * 0.16} L${w * 0.84} ${h / 2} L${w / 2} ${h * 0.84} L${w * 0.16} ${h / 2} Z" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>
      </svg></div>`);
    return el;
  }

  // Las escenas de pregunta y respuesta del quiz se ven como una sola: anulamos el desplazamiento y el zoom
  // automáticos del motor entre ellas (keepEnter/keepExit conservan la transición con la escena vecina).
  function settle(x, lt, keepEnter, keepExit) {
    const t = x.start + lt;
    const enter = Ease.outCubic(prog(lt, 0, 0.38));
    const exit = Ease.inCubic(prog(t, x.end - 0.04, 0.3));
    const push = 1 + 0.035 * prog(lt, 0, x.dur + 0.3);
    const ty = (1 - enter) * 70 - exit * 60, s = (0.96 + 0.04 * enter) * push - exit * 0.04;
    const e2 = keepEnter ? enter : 1, x2 = keepExit ? exit : 0;
    const dty = (1 - e2) * 70 - x2 * 60, ds = (0.96 + 0.04 * e2) - x2 * 0.04;
    x.root.style.transform = `scale(${1 / s}) translateY(${-ty}px) translateY(${dty}px) scale(${ds})`;
  }
  // El motor pone un "whoosh" en cada cambio de escena; entre pregunta y respuesta lo quitamos (es la cuenta atrás).
  const DROP = [];
  let dropped = false;
  function dropWhooshes() {
    if (dropped) return; dropped = true;
    const cues = EUREKA.S.cues;
    for (let i = cues.length - 1; i >= 0; i--) if (cues[i].type === 'whoosh' && DROP.some((d) => Math.abs(cues[i].t - d) < 0.02)) cues.splice(i, 1);
  }

  // ───────────────────────── 1 · HOOK: «la IA» son tres capas ─────────────────────────
  scene('hook', (x) => {
    data();
    const r = x.root;
    const word = add(r, `<div class="abs display" style="left:0;right:0;top:318px;text-align:center;font-size:118px;font-weight:700;color:${C.ink};line-height:1">${L('«LA IA»', '“THE AI”')}</div>`);
    const strike = add(r, `<svg class="abs" width="1080" height="160" style="left:0;top:300px"><line x1="230" y1="92" x2="850" y2="62" stroke="${C.red}" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const three = add(r, `<div class="abs display" style="left:0;right:0;top:330px;text-align:center;font-size:96px;font-weight:700;color:${C.amber};line-height:1;text-shadow:0 0 50px rgba(245,158,11,.5)">${L('3 CAPAS', '3 LAYERS')}</div>`);
    const Y0 = [700, 742, 784], Y1 = [540, 740, 940];
    const S = [2, 1, 0].map((i) => ({ i, el: slab(r, 540, Y0[i], 520, GREY) }));   // de abajo arriba para el orden de pintado
    const Q = LAYERS.map((ly, i) => add(r, `<div class="abs display" style="left:${540 - 50}px;top:${Y1[i] - 58}px;width:100px;height:100px;text-align:center;font-size:92px;font-weight:700;color:${ly.col};line-height:100px;text-shadow:0 0 30px ${ly.col}">?</div>`));
    const tLa = x.at(L('la', 'the')), tPe = x.at(L('pero', 'but')), tT = x.at(L('tres', 'three')), tC = x.at(L('capas', 'layers')), tS = x.at(L('sabrias', 'can'));
    x.cue(tLa, 'boom', 0.6); x.shake(tLa + 0.05, 10);
    x.cue(tPe + 0.1, 'swipe', 0.6); x.cue(tT, 'whoosh', 0.7); x.cue(tC, 'ding', 0.7);
    Q.forEach((_, i) => x.cue(tS + i * 0.14, 'pop', 0.6));
    return (lt) => {
      dropWhooshes();
      const w = spring(lt, tLa - 0.2, 0.5);
      word.style.opacity = (w > 0 ? 1 : 0) * (1 - appear(lt, tT, 0.3));
      word.style.transform = `scale(${lerp(1.5, 1, w)})`;
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tPe + 0.1, 0.3)));
      strike.style.opacity = 1 - appear(lt, tT, 0.3);
      popIn(three, lt, tT + 0.05, 0.5);
      const st = spring(lt, 0.05, 0.5);
      const sp = Ease.outBack(prog(lt, tT - 0.05, 0.6));
      S.forEach(({ i, el }) => {
        el.style.opacity = st > 0 ? 1 : 0;
        el.style.transform = `translateY(${lerp(Y0[i], Y1[i], sp) - Y0[i] + (1 - Math.min(1, st)) * 200}px)`;
        el.style.color = mix(GREY, LAYERS[i].col, appear(lt, tC - 0.1, 0.4));
        el.style.filter = lt > tC ? `drop-shadow(0 0 ${22 + 8 * Math.sin(lt * 5 + i)}px ${LAYERS[i].col}88)` : 'none';
      });
      Q.forEach((q, i) => { popIn(q, lt, tS - 0.05 + i * 0.14, 0.3); q.style.transform += ` rotate(${Math.sin(lt * 4 + i) * 8}deg)`; });
    };
  });

  // ───────────────────────── 2 · LAS TRES CAPAS: definiciones del lab ─────────────────────────
  scene('capas', (x) => {
    data();
    const r = x.root;
    const rows = LAYERS.map((ly, i) => add(r, `<div class="abs" style="left:90px;top:${318 + i * 258}px;width:840px;height:232px;border-radius:30px;background:${C.surface2};border:4px solid ${ly.col};box-shadow:0 0 40px ${ly.col}33;display:flex;align-items:center;gap:30px;padding:0 34px;box-sizing:border-box">
        <div style="width:132px;height:132px;border-radius:28px;background:${ly.col}22;border:3px solid ${ly.col};color:${ly.col};flex:none;display:flex;align-items:center;justify-content:center"><div style="width:84px;height:84px">${ly.icon}</div></div>
        <div style="flex:1">
          <div class="display" style="font-size:68px;font-weight:700;color:${ly.col};line-height:1">${ly.name}</div>
          <div class="def display" style="font-size:37px;font-weight:600;color:${C.ink};line-height:1.2;margin-top:12px">${ly.def}</div>
        </div></div>`));
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1100px;text-align:center;font-size:22px;font-weight:700;color:${C.faint}">${L('Definiciones literales del juego «¿Modelo, agente o arnés?» · labs.santismm.com', 'Definitions from the game “¿Modelo, agente o arnés?” (translated) · labs.santismm.com')}</div>`);
    const tN = [x.at(L('modelo', 'model')), x.at(L('agente', 'agent')), x.at(L('arnes', 'harness'))];
    const tD = [x.at(L('capacidad', 'capability')), x.at(L('entidad', 'entity')), x.at(L('sistema', 'system'))];
    tN.forEach((t, i) => { x.cue(t - 0.05, 'pop', 0.7); x.cue(tD[i], 'tick', 0.4); });
    x.cue(x.at(L('herramientas', 'tools')), 'ding', 0.6);
    return (lt) => {
      rows.forEach((row, i) => {
        const s = spring(lt, tN[i] - 0.2, 0.45);
        row.style.opacity = s > 0 ? 1 : 0;
        row.style.transform = `translateX(${(1 - Math.min(1, s)) * (i % 2 ? 140 : -140)}px)`;
        row.querySelector('.def').style.opacity = appear(lt, tD[i] - 0.2, 0.4);
        const on = lt > tN[i] - 0.1 && (i === 2 || lt < tN[i + 1] - 0.1);
        row.style.background = on ? `${LAYERS[i].col}1c` : C.surface2;
      });
      src.style.opacity = appear(lt, tD[2], 0.4);
    };
  });

  // ───────────────────────── 3–8 · EL QUIZ: tres casos reales del lab ─────────────────────────
  const CASES_ = () => [
    { tag: L('PRODUCTO', 'PRODUCT'), ans: 1,
      prompt: L('Codex recibe una tarea, inspecciona un repositorio, edita archivos y ejecuta pruebas hasta cerrarla.', 'Codex receives a task, inspects a repository, edits files and runs tests until the task is done.'),
      explain: L('Hay objetivo, percepción del entorno, decisiones encadenadas y acciones. Puede usar un modelo y vivir dentro de un arnés.', 'There is a goal, perception of the environment, chained decisions and actions. It can use a model and live inside a harness.') },
    { tag: L('CONTROL', 'CONTROL'), ans: 2,
      prompt: L('Una capa inyecta instrucciones, limita permisos, registra trazas y corta acciones de alto impacto.', 'A layer injects instructions, limits permissions, logs traces and cuts off high-impact actions.'),
      explain: L('La capa gobierna cómo se usa el modelo o el agente. Es el arnés, no la inteligencia base.', 'The layer governs how the model or the agent is used. It is the harness, not the base intelligence.') },
    { tag: L('ARQUITECTURA', 'ARCHITECTURE'), ans: 0,
      prompt: L('Claude Sonnet 4.6 ejecutado sin memoria, herramientas ni bucle exterior.', 'Claude Sonnet 4.6 run without memory, tools or an outer loop.'),
      explain: L('Sin el sistema que le da persistencia o capacidad de actuar, sigue siendo una inferencia de modelo.', 'Without the system that gives it persistence or the ability to act, it is still model inference.') },
  ];
  const QZ = [{}, {}, {}];   // tiempos absolutos compartidos entre la pregunta y la respuesta
  const CH_Y = 712, BTN_W = 266;

  function quiz(x, n, phase) {
    data();
    const r = x.root, c = CASES[n], q = QZ[n];
    const head = add(r, `<div class="abs" style="left:90px;right:150px;top:300px;display:flex;justify-content:space-between;align-items:center;font-size:26px">
        ${pill(`${L('CASO', 'CASE')} ${n + 1} / 3`, C.ink)}${pill(c.tag, C.muted)}</div>`);
    const card = add(r, `<div class="abs" style="left:90px;top:384px;width:840px;height:300px;border-radius:30px;background:${C.surface};border:3px solid ${C.lineStrong};box-shadow:0 30px 70px rgba(0,0,0,.5);padding:30px 40px 0 92px;box-sizing:border-box">
        <div class="abs display" style="left:28px;top:6px;font-size:120px;font-weight:700;color:${C.lineStrong};line-height:1">“</div>
        <div class="display" style="font-size:${c.prompt.length > 80 ? 41 : 46}px;font-weight:600;color:${C.ink};line-height:1.22">${c.prompt}</div>
        <div class="abs mono" style="left:40px;right:30px;bottom:22px;font-size:21px;font-weight:700;color:${C.muted}">${L('¿Qué capa es el sujeto principal de esta descripción?', 'Which layer is the main subject of this description?')}</div></div>`);
    const B = LAYERS.map((ly, i) => add(r, `<div class="abs" style="left:${90 + i * 287}px;top:${CH_Y}px;width:${BTN_W}px;height:170px;border-radius:26px;background:${C.surface2};border:4px solid ${C.lineStrong};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;box-sizing:border-box">
        <div style="width:66px;height:66px;color:${ly.col}">${ly.icon}</div>
        <div class="display" style="font-size:42px;font-weight:700;color:${C.ink};line-height:1">${ly.name}</div>
        <div class="mk abs" style="right:-14px;top:-14px;width:56px;height:56px;border-radius:50%;background:${C.green};color:${C.bg};display:flex;align-items:center;justify-content:center;opacity:0"><div style="width:34px;height:34px">${I.check}</div></div></div>`));
    const timer = add(r, `<div class="abs" style="left:90px;top:912px;width:840px">
        <div style="height:14px;border-radius:7px;background:${C.line};overflow:hidden"><div class="bar" style="height:100%;width:100%;background:${C.amber};box-shadow:0 0 16px ${C.amber}"></div></div>
        <div class="lab mono" style="margin-top:22px;text-align:center;font-size:30px;font-weight:700;color:${C.amber};letter-spacing:.1em">${L('¿TÚ QUÉ DICES?', 'YOUR GUESS?')}</div></div>`);
    const ok = LAYERS[c.ans];
    const fb = add(r, `<div class="abs" style="left:90px;top:910px;width:840px;border-radius:26px;background:rgba(16,185,129,.12);border:4px solid ${C.green};padding:22px 30px;box-sizing:border-box">
        <div class="mono" style="font-size:20px;font-weight:700;color:${C.green};letter-spacing:.12em">${L('EXPLICACIÓN DEL LAB', "THE LAB'S EXPLANATION (TRANSLATED)")}</div>
        <div class="display" style="font-size:31px;font-weight:600;color:${C.ink};line-height:1.28;margin-top:8px"><b style="color:${ok.col}">${ok.name}.</b> ${c.explain}</div></div>`);

    if (phase === 'q') {
      q.t0 = x.start + x.words[x.words.length - 1].le + 0.05;   // empieza la cuenta atrás
      DROP.push(+(x.end - 0.12).toFixed(3));
      x.cue(0.15, 'pop', 0.6);
      B.forEach((_, i) => x.cue(0.5 + i * 0.1, 'tick', 0.4));
    } else {
      q.t1 = x.start + x.words[0].ls - 0.06;                    // se revela la respuesta
      for (let k = 0, t = q.t0 + 0.05; t < q.t1 - 0.1; k++, t += 0.36) x.cue(t - x.start, 'tick', 0.55);
      x.cue(q.t1 - x.start, 'ding', 0.9); x.cue(q.t1 - x.start + 0.02, 'pop', 0.7); x.shake(q.t1 - x.start + 0.03, 9);
    }
    const tFb = phase === 'a' ? x.words[0].ls + 0.35 : 99;
    // En el caso 1, "usa un modelo dentro de un arnés": se iluminan las otras dos capas sin marcarlas.
    const nuance = phase === 'a' && n === 0 ? [x.at(L('modelo', 'model')), x.at(L('arnes', 'harness'))] : null;
    if (nuance) nuance.forEach((t) => x.cue(t, 'tick', 0.5));

    return (lt, t) => {
      settle(x, lt, phase === 'q', phase === 'a');
      const intro = phase === 'q';
      head.style.opacity = intro ? appear(lt, 0.05, 0.3) : 1;
      if (intro) popIn(card, lt, 0.1, 0.85, 0.45); else { card.style.opacity = 1; card.style.transform = 'none'; }
      const k = prog(t, q.t0, q.t1 - q.t0);                    // 0 → 1 durante la pausa para pensar
      const revealed = t >= q.t1;
      const rv = spring(t, q.t1, 0.4);
      B.forEach((b, i) => {
        if (intro) { const s = spring(lt, 0.45 + i * 0.1, 0.4); b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `translateY(${(1 - Math.min(1, s)) * 60}px)`; }
        else b.style.opacity = 1;
        const right = i === c.ans;
        let border = C.lineStrong, glow = 'none', bg = C.surface2, sc = 1, op = 1;
        if (!revealed && k > 0) {                                // el resaltado salta de botón en botón mientras piensas
          const hot = Math.floor(k * 6) % 3 === i;
          if (hot) { border = LAYERS[i].col; glow = `0 0 30px ${LAYERS[i].col}66`; }
        }
        if (revealed) {
          if (right) { border = C.green; glow = `0 0 ${40 + 12 * Math.sin(t * 6)}px rgba(16,185,129,.6)`; bg = 'rgba(16,185,129,.16)'; sc = lerp(1, 1.06, Math.min(1, rv)); }
          else {
            op = 0.35;
            if (nuance) { const j = i === 0 ? 0 : 1; const on = appear(lt, nuance[j] - 0.1, 0.25); op = lerp(0.35, 1, on); if (on > 0.5) { border = LAYERS[i].col; glow = `0 0 26px ${LAYERS[i].col}55`; } }
          }
        }
        b.style.borderColor = border; b.style.boxShadow = glow; b.style.background = bg;
        if (!intro) b.style.transform = `scale(${sc})`;
        b.style.opacity = (intro ? b.style.opacity : 1) * op;
        b.querySelector('.mk').style.opacity = revealed && right ? 1 : 0;
        b.querySelector('.mk').style.transform = `scale(${lerp(0.3, 1, Math.min(1, rv))})`;
      });
      timer.style.opacity = (intro ? appear(lt, 0.6, 0.3) : 1) * (1 - appear(t, q.t1, 0.2));
      timer.querySelector('.bar').style.width = ((1 - k) * 100) + '%';
      timer.querySelector('.lab').style.transform = `scale(${k > 0 && k < 1 ? 1 + 0.06 * Math.sin(t * 14) : 1})`;
      const f = spring(lt, tFb, 0.45);
      fb.style.opacity = f > 0 ? 1 : 0; fb.style.transform = `translateY(${(1 - Math.min(1, f)) * 70}px)`;
    };
  }
  scene('q1', (x) => quiz(x, 0, 'q'));
  scene('a1', (x) => quiz(x, 0, 'a'));
  scene('q2', (x) => quiz(x, 1, 'q'));
  scene('a2', (x) => quiz(x, 1, 'a'));
  scene('q3', (x) => quiz(x, 2, 'q'));
  scene('a3', (x) => quiz(x, 2, 'a'));

  // ───────────────────────── 9 · LA LECCIÓN: el selector de capa ─────────────────────────
  scene('leccion', (x) => {
    data();
    const r = x.root;
    const ev = (left, ic, txt, col) => add(r, `<div class="abs" style="left:${left}px;top:306px;width:405px;height:116px;border-radius:24px;background:${col}1e;border:4px solid ${col};display:flex;align-items:center;justify-content:center;gap:18px">
        <div style="width:54px;height:54px;color:${col}">${ic}</div><div class="display" style="font-size:44px;font-weight:700;color:${C.ink}">${txt}</div></div>`);
    const UP = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M32 54V12M14 30l18-18 18 18"/></svg>`;
    const eF = ev(90, I.cross, L('Algo falla', 'It fails'), C.red), eM = ev(525, UP, L('Algo mejora', 'It improves'), C.green);
    const ia = add(r, `<div class="abs" style="left:0;right:0;top:456px;text-align:center"><span class="display" style="display:inline-block;position:relative;font-size:76px;font-weight:700;color:${C.muted};padding:4px 40px;border:4px dashed ${C.lineStrong};border-radius:22px">${L('«la IA»', '“the AI”')}
        <svg class="abs" viewBox="0 0 100 40" preserveAspectRatio="none" style="left:-4%;top:10%;width:108%;height:80%;overflow:visible"><line x1="2" y1="34" x2="98" y2="6" stroke="${C.red}" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:12px" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg></span></div>`);
    const KX = 540, KY = 940, KR = 118, LR = 262, ANG = [-56, 0, 56];
    const knob = add(r, `<div class="abs" style="left:${KX - KR}px;top:${KY - KR}px;width:${KR * 2}px;height:${KR * 2}px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#26314d,#0f1525 70%);border:6px solid ${C.lineStrong};box-shadow:0 30px 70px rgba(0,0,0,.6)">
        <div class="ptr abs" style="left:${KR - 9}px;top:14px;width:18px;height:${KR - 14}px;border-radius:9px;background:${C.ink};transform-origin:50% 100%"></div>
        <div class="abs" style="left:${KR - 22}px;top:${KR - 22}px;width:44px;height:44px;border-radius:50%;background:${C.lineStrong}"></div></div>`);
    const ticks = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0;overflow:visible">${ANG.map((a, i) => {
      const s = Math.sin(a * Math.PI / 180), c = Math.cos(a * Math.PI / 180);
      return `<line x1="${KX + s * (KR + 14)}" y1="${KY - c * (KR + 14)}" x2="${KX + s * (KR + 44)}" y2="${KY - c * (KR + 44)}" stroke="${LAYERS[i].col}" stroke-width="8" stroke-linecap="round"/>`;
    }).join('')}</svg>`);
    const labs = LAYERS.map((ly, i) => {
      const s = Math.sin(ANG[i] * Math.PI / 180), c = Math.cos(ANG[i] * Math.PI / 180);
      return add(r, `<div class="abs" style="left:${KX + s * LR - 130}px;top:${KY - c * LR - 40}px;width:260px;height:80px;border-radius:40px;border:4px solid ${ly.col};background:${C.surface2};display:flex;align-items:center;justify-content:center;gap:12px">
        <div style="width:40px;height:40px;color:${ly.col}">${ly.icon}</div><div class="display" style="font-size:38px;font-weight:700;color:${C.ink}">${ly.name}</div></div>`);
    });
    const ask = add(r, `<div class="abs mono" style="left:0;right:0;top:1092px;text-align:center;font-size:28px;font-weight:700;color:${C.muted};letter-spacing:.12em">${L('¿QUÉ CAPA HA SIDO?', 'WHICH LAYER WAS IT?')}</div>`);
    const tF = x.at(L('falla', 'fails')), tM = x.at(L('mejora', 'improves')), tCu = x.at(L('culpes', 'blame')), tIA = x.at(L('ia', 'ai')), tP = x.at(L('pregunta', 'ask'));
    const tL = [x.at(L('modelo', 'model')), x.at(L('agente', 'agent')), x.at(L('arnes', 'harness'))];
    x.cue(tF, 'buzz', 0.6); x.cue(tM, 'ding', 0.6); x.cue(tCu, 'swipe', 0.7); x.cue(tIA, 'stamp', 0.6); x.cue(tP, 'pop', 0.7);
    tL.forEach((t) => { x.cue(t - 0.08, 'swipe', 0.5); x.cue(t, 'tick', 0.7); });
    return (lt) => {
      popIn(eF, lt, tF - 0.15, 0.6); popIn(eM, lt, tM - 0.15, 0.6);
      popIn(ia, lt, tF + 0.3, 0.7);
      ia.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tCu, 0.5)));
      const kn = spring(lt, tP - 0.25, 0.5); knob.style.opacity = kn > 0 ? 1 : 0; knob.style.transform = `scale(${lerp(0.5, 1, kn)})`;
      ticks.style.opacity = appear(lt, tP - 0.1, 0.3); ask.style.opacity = appear(lt, tP, 0.3);
      // El puntero gira de una capa a otra al nombrarlas.
      let a = -100;
      tL.forEach((t, i) => { const p = Ease.outBack(prog(lt, t - 0.12, 0.3)); if (lt > t - 0.12) a = lerp(i ? ANG[i - 1] : -100, ANG[i], p); });
      knob.querySelector('.ptr').style.transform = `rotate(${a}deg)`;
      labs.forEach((lb, i) => {
        const s = spring(lt, tP - 0.1 + i * 0.08, 0.4); lb.style.opacity = s > 0 ? 1 : 0;
        const on = lt > tL[i] - 0.08 && (i === 2 || lt < tL[i + 1] - 0.08);
        lb.style.transform = `scale(${lerp(0.6, 1, Math.min(1, s)) * (on ? 1.1 : 1)})`;
        lb.style.background = on ? `${LAYERS[i].col}33` : C.surface2;
        lb.style.boxShadow = on ? `0 0 40px ${LAYERS[i].col}` : 'none';
      });
    };
  });

  // ───────────────────────── 10 · TESIS: tres capas, tres responsabilidades ─────────────────────────
  scene('tesis', (x) => {
    data();
    const r = x.root;
    const l1 = popText(r, L('TRES CAPAS,', 'THREE LAYERS,'), `top:306px;font-size:84px;line-height:1;color:${C.ink}`);
    const l2 = popText(r, L('TRES RESPONSABILIDADES', 'THREE RESPONSIBILITIES'), `top:404px;font-size:${L(60, 58)}px;line-height:1;color:${C.amber};text-shadow:0 0 40px rgba(245,158,11,.5)`);
    const YS = [620, 800, 980];
    const S = [2, 1, 0].map((i) => ({ i, el: slab(r, 275, YS[i], 300, LAYERS[i].col) }));
    const ic = LAYERS.map((ly, i) => add(r, `<div class="abs" style="left:${275 - 34}px;top:${YS[i] - 34}px;width:68px;height:68px;color:${ly.col}">${ly.icon}</div>`));
    const R = LAYERS.map((ly, i) => add(r, `<div class="abs" style="left:480px;top:${YS[i] - 62}px;width:450px">
        <div class="display" style="font-size:50px;font-weight:700;color:${ly.col};line-height:1">${ly.name}</div>
        <div class="display" style="font-size:32px;font-weight:600;color:${C.ink};line-height:1.2;margin-top:8px">${ly.role}</div></div>`));
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1104px;text-align:center;font-size:21px;font-weight:700;color:${C.faint}">${L('Resumen final del juego · labs.santismm.com', "The game's closing summary (translated) · labs.santismm.com")}</div>`);
    const tT = x.at(L('tres', 'three')), tC = x.at(L('capas', 'layers')), tR = x.at(L('responsabilidades', 'responsibilities'));
    x.cue(tT, 'pop', 0.6); S.forEach((_, i) => x.cue(tC + i * 0.1, 'tick', 0.5)); x.cue(tR, 'boom', 0.8); x.shake(tR + 0.05, 12);
    return (lt) => {
      popIn(l1, lt, tT - 0.15, 0.7);
      const s2 = spring(lt, tR - 0.2, 0.45); l2.style.opacity = s2 > 0 ? 1 : 0; l2.style.transform = `scale(${lerp(1.5, 1, s2)})`;
      S.forEach(({ i, el }) => { const s = spring(lt, tC - 0.25 + (2 - i) * 0.0 + i * 0.1, 0.45); el.style.opacity = s > 0 ? 1 : 0; el.style.transform = `translateY(${(1 - Math.min(1, s)) * -120}px)`; el.style.filter = `drop-shadow(0 0 20px ${LAYERS[i].col}66)`; });
      ic.forEach((e, i) => { e.style.opacity = appear(lt, tC + i * 0.1, 0.3); });
      R.forEach((e, i) => { const s = spring(lt, tR + i * 0.12, 0.4); e.style.opacity = s > 0 ? 1 : 0; e.style.transform = `translateX(${(1 - Math.min(1, s)) * 80}px)`; });
      src.style.opacity = appear(lt, tR + 0.5, 0.4);
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => (data(), endCard(x, { links: ['labs.santismm.com'], sub: L('juega los 12 casos: ¿cuántos aciertas?', 'play all 12 cases: how many can you get?') })));
})();
