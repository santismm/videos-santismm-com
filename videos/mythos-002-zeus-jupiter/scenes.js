/* MYTHOS #02 · "¿Zeus y Júpiter son el mismo dios?" / "Are Zeus and Jupiter the same god?"
 * Versiones: es (este directorio) y en (videos/mythos-002-zeus-jupiter-en, comparte este archivo vía "scenesFile").
 * Todo texto en pantalla y cada palabra de sincronización x.at() sale del diccionario TT según EUREKA.lang.
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/zeus-vs-jupiter c1: mismos mitos — el Júpiter de Ovidio es "el Hijo de Saturno" con el rayo (Met. 1.163–252),
 *    el mismo de Hesíodo (Theog. 501–506) y Homero (Il. 15.187–193). Takeaway: nacimiento, rayo, reinado, amores;
 *    "Ovid is Hesiod and Homer in Latin dress".
 *  - c2: política distinta — "imperio sin fin" (Aen. 1.278–279); Feretrio y Stator (Livio 1.10.5–7; 1.12.4–7);
 *    el Zeus de Hesíodo reina porque los dioses se lo pidieron (Theog. 881–885) y no promete nada a ninguna ciudad.
 *  - c3: el nombre va en una dirección: los textos griegos nunca llaman a Zeus "Júpiter".
 *  - /k/jupiter c1 ("Thunder-bolt Controller", Met. 1.163–252), c3 (primer templo de Roma, Feretrio, spolia opima),
 *    c4 (Stator, "el que detiene", voto en plena huida ante los sabinos).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, popIn, human, citation, mythosEndCard } = EUREKA.ui;

  const TT = {
    es: {
      kw: ['mito', 'roma', 'saturno', 'rayo', 'nunca', 'culto', 'primer', 'detiene', 'fin', 'pidieron', 'religion', 'texto'],
      a: { zeus: 'zeus', jupiter: 'jupiter', myth: 'mito', rome: 'roma', ovid: 'ovidio', saturn: 'saturno', bolt: 'rayo',
        birth: 'nacimiento', bolt2: 'rayo', king: 'reinado', loves: 'amores', hesiod: 'hesiodo', dress: 'romano',
        way: 'direccion', greek: 'griegos', never: 'nunca', cult: 'culto', other: 'otro', first: 'primer', feretrius: 'feretrio',
        romulus: 'romulo', spoils: 'botin', kingk: 'rey', flee: 'huida', stator: 'stator', stops: 'detiene',
        virgil: 'virgilio', empire: 'imperio', end: 'fin', zeusH: 'zeus', asked: 'pidieron', city: 'ciudad',
        stories: 'historias', religion: 'religion', romeEnd: ['roma', 1], which: 'que', text: 'texto', ovidS: 'ovidio', livy: 'livio' },
      kicker: 'GRECIA ✕ ROMA', myth: 'MITO', rome: 'ROMA', jup: 'JÚPITER',
      ovidHead: 'OVIDIO · METAMORFOSIS 1', ovidSub: 'el Júpiter de Ovidio es…', son: '«el Hijo de Saturno»', ctrl: '«el Controlador del Rayo»',
      greekCol: 'GRIEGO', latinCol: 'LATÍN', rows: ['Nacimiento', 'Rayo', 'Reinado', 'Amores'], dress: 'Hesíodo + Homero, vestidos de romano',
      oneWay: 'SENTIDO ÚNICO', latinOk: 'en textos latinos', greekNo: 'en textos griegos: nunca',
      cultTitle: 'EN EL CULTO', firstTemple: 'PRIMER TEMPLO DE ROMA', feretrius: 'JÚPITER FERETRIO', spoils: 'el botín del rey vencido',
      statorName: 'JÚPITER STATOR', statorMean: '«EL QUE DETIENE»', flee: 'huida', livy: 'Livio 1.12',
      imperium: 'IMPERIUM SINE FINE', imperiumT: '«imperio sin fin» · Eneida 1.278', hesiodZeus: 'EL ZEUS DE HESÍODO',
      acclaim: 'rey por aclamación · Teogonía 881', noCity: 'NINGUNA PROMESA A NINGUNA CIUDAD',
      rule: 'REGLA RÁPIDA', storiesL: 'HISTORIAS', storiesR: 'Júpiter = Zeus', relL: 'RELIGIÓN', relR: 'Júpiter = dios de Roma',
      which: '¿QUÉ TEXTO<br>LO DICE?', citeA: ['El mito: Ovidio y Hesíodo', ['Metamorfosis 1.163–252', 'Teogonía 501–506 · 881–885']],
      citeB: ['Roma: Livio y Virgilio', ['Livio 1.10.5–7 · 1.12.4–7', 'Eneida 1.278–279']], src: 'FUENTES PRIMARIAS',
      endSub: 'griegos · romanos · nórdicos · egipcios · con su fuente',
    },
    en: {
      kw: ['myth', 'rome', 'saturn', 'thunderbolt', 'never', 'cult', 'first', 'stayer', 'end', 'asked', 'religion', 'text'],
      a: { zeus: 'zeus', jupiter: 'jupiter', myth: 'myth', rome: 'rome', ovid: 'ovid', saturn: 'saturn', bolt: 'thunderbolt',
        birth: 'birth', bolt2: 'thunderbolt', king: 'kingship', loves: 'love', hesiod: 'hesiod', dress: 'dress',
        way: 'way', greek: 'greek', never: 'never', cult: 'cult', other: 'different', first: 'first', feretrius: 'feretrius',
        romulus: 'romulus', spoils: 'spoils', kingk: 'king', flee: 'flees', stator: 'stator', stops: 'stayer',
        virgil: 'virgil', empire: 'empire', end: 'end', zeusH: 'zeus', asked: 'asked', city: 'city',
        stories: 'stories', religion: 'religion', romeEnd: 'rome', which: 'which', text: 'text', ovidS: 'ovid', livy: 'livy' },
      kicker: 'GREECE ✕ ROME', myth: 'MYTH', rome: 'ROME', jup: 'JUPITER',
      ovidHead: 'OVID · METAMORPHOSES 1', ovidSub: "Ovid's Jupiter is…", son: '"the Son of Saturn"', ctrl: '"the Thunder-bolt Controller"',
      greekCol: 'GREEK', latinCol: 'LATIN', rows: ['Birth', 'Thunderbolt', 'Kingship', 'Love affairs'], dress: 'Hesiod + Homer, in Roman dress',
      oneWay: 'ONE WAY', latinOk: 'in Latin texts', greekNo: 'in Greek texts: never',
      cultTitle: 'IN CULT', firstTemple: "ROME'S FIRST TEMPLE", feretrius: 'JUPITER FERETRIUS', spoils: 'the spoils of a slain king',
      statorName: 'JUPITER STATOR', statorMean: '"THE STAYER"', flee: 'rout', livy: 'Livy 1.12',
      imperium: 'IMPERIUM SINE FINE', imperiumT: '"empire without end" · Aeneid 1.278', hesiodZeus: "HESIOD'S ZEUS",
      acclaim: 'king by acclamation · Theogony 881', noCity: 'NO PROMISE TO ANY CITY',
      rule: 'RULE OF THUMB', storiesL: 'STORIES', storiesR: 'Jupiter = Zeus', relL: 'RELIGION', relR: 'Jupiter = god of Rome',
      which: 'WHICH TEXT<br>SAYS SO?', citeA: ['The myth: Ovid and Hesiod', ['Metamorphoses 1.163–252', 'Theogony 501–506 · 881–885']],
      citeB: ['Rome: Livy and Virgil', ['Livy 1.10.5–7 · 1.12.4–7', 'Aeneid 1.278–279']], src: 'PRIMARY SOURCES',
      endSub: 'Greek · Roman · Norse · Egyptian · with sources',
    },
  };
  const T = TT[EUREKA.lang] || TT.es, A = T.a;
  const at = (x, a) => (Array.isArray(a) ? x.at(a[0], a[1]) : x.at(a));

  EUREKA.video = { keywords: T.kw };

  const GR = C.lapis, RO = C.red;
  const BOLT = (col) => `<svg viewBox="0 0 64 64"><path d="M38 2 L10 36 H28 L20 62 L54 22 H34 Z" fill="${col}" stroke="#fff6dc" stroke-width="2" stroke-linejoin="round"/></svg>`;
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const mono = (r, txt, left, top, color = C.muted, size = 26, extra = '') => add(r, `<div class="abs mono" style="left:${left}px;top:${top}px;font-size:${size}px;font-weight:700;letter-spacing:.12em;color:${color};${extra}">${txt}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58, w = 0) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;${w ? `width:${w}px;box-sizing:border-box;text-align:center;` : 'white-space:nowrap;'}padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;line-height:1.1;letter-spacing:.04em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.82)">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };
  // Placa de mármol con nombre de dios
  const plaque = (r, name, color, left, top, w = 400) => add(r, `<div class="abs" style="left:${left}px;top:${top}px;width:${w}px;height:200px;border-radius:22px;background:linear-gradient(160deg,#f6f1e6,#d9d0bf);border:8px solid ${color};box-shadow:0 30px 70px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center">
      <span class="display" style="font-size:${name.length > 6 ? 70 : 84}px;font-weight:900;color:#1d1a17;letter-spacing:.04em">${name}</span></div>`);
  // Templo romano construido por piezas
  function temple(r, cx, base, w, col = C.papyrus) {
    const n = 6, colW = w * 0.09, colH = w * 0.62;
    const g = add(r, `<div class="abs" style="left:${cx - w / 2}px;top:${base - colH - w * 0.42}px;width:${w}px;height:${colH + w * 0.5}px"></div>`);
    const ped = add(g, `<svg class="abs" style="left:-${w * 0.04}px;top:0" width="${w * 1.08}" height="${w * 0.3}"><path d="M0 ${w * 0.3} L${w * 0.54} 4 L${w * 1.08} ${w * 0.3}Z" fill="${col}" stroke="${C.gold}" stroke-width="5"/></svg>`);
    const lint = add(g, `<div class="abs" style="left:-${w * 0.02}px;top:${w * 0.3}px;width:${w * 1.04}px;height:${w * 0.08}px;background:${col};border:4px solid ${C.gold};box-sizing:border-box"></div>`);
    const cols = Array.from({ length: n }, (_, i) => add(g, `<div class="abs" style="left:${w * 0.04 + i * (w * 0.92 - colW) / (n - 1)}px;top:${w * 0.38}px;width:${colW}px;height:${colH}px;transform-origin:50% 100%;background:repeating-linear-gradient(90deg,${col} 0 ${colW / 5}px,#cfc6b4 ${colW / 5}px ${colW / 5 + 3}px)"></div>`));
    const step = add(g, `<div class="abs" style="left:-${w * 0.05}px;top:${w * 0.38 + colH}px;width:${w * 1.1}px;height:${w * 0.07}px;background:${col};border:4px solid ${C.gold};box-sizing:border-box"></div>`);
    return {
      g, set(k) { // 0..1: escalón → columnas → dintel → frontón
        const s = Ease.outCubic(Math.min(1, k * 4)); step.style.opacity = s; step.style.transform = `scaleX(${s})`;
        cols.forEach((c, i) => { const q = Ease.outBack(Math.max(0, Math.min(1, k * 4 - 0.6 - i * 0.12))); c.style.transform = `scaleY(${q})`; c.style.opacity = q > 0 ? 1 : 0; });
        const l = Ease.outCubic(Math.max(0, Math.min(1, k * 4 - 2))); lint.style.opacity = l; lint.style.transform = `translateY(${(1 - l) * -60}px)`;
        const p = Ease.outBack(Math.max(0, Math.min(1, k * 4 - 2.6))); ped.style.opacity = p > 0 ? 1 : 0; ped.style.transform = `translateY(${(1 - p) * -120}px)`;
      },
    };
  }

  // ───────────────────────── 1 · HOOK: ¿= o ≠? ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const k = mono(r, T.kicker, 110, 318, C.gold);
    const z = plaque(r, 'ZEUS', GR, 110, 400, 380), j = plaque(r, T.jup, RO, 590, 400, 380);
    const bz = add(r, `<div class="abs" style="left:250px;top:560px;width:100px;height:100px">${BOLT(GR)}</div>`);
    const bj = add(r, `<div class="abs" style="left:730px;top:560px;width:100px;height:100px">${BOLT(RO)}</div>`);
    const q = add(r, `<div class="abs display" style="left:490px;top:440px;width:100px;text-align:center;font-size:110px;font-weight:900;color:${C.gold}">?</div>`);
    const row = (label, sym, col, top) => add(r, `<div class="abs" style="left:110px;width:860px;top:${top}px;height:150px;border-radius:28px;background:${C.surface2};border:4px solid ${col};display:flex;align-items:center;justify-content:space-between;padding:0 50px;box-sizing:border-box">
        <span class="display" style="font-size:66px;font-weight:900;color:${C.ink}">${label}</span><span class="display" style="font-size:120px;font-weight:900;color:${col}">${sym}</span></div>`);
    const r1 = row(T.myth, '=', C.turquoise, 760), r2 = row(T.rome, '≠', C.red, 940);
    const tZ = at(x, A.zeus), tJ = at(x, A.jupiter), tM = at(x, A.myth), tR = at(x, A.rome);
    x.cue(tZ, 'drum', 0.8); x.cue(tJ, 'drum', 0.8); x.cue(tM, 'ding', 0.5); x.cue(tR, 'stamp', 0.9); x.shake(tR, 14);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      popIn(z, lt, tZ - 0.15, 0.5); popIn(j, lt, tJ - 0.15, 0.5);
      [bz, bj].forEach((b, i) => { const s = spring(lt, (i ? tJ : tZ) + 0.05, 0.35); b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.2, 1, s)}) rotate(${Math.sin(lt * 9 + i) * 6}deg)`; });
      popIn(q, lt, tJ + 0.4, 0.4); q.style.transform += ` translateY(${Math.sin(lt * 4) * 8}px)`;
      popIn(r1, lt, tM - 0.12, 0.7); popIn(r2, lt, tR - 0.12, 0.7);
      const split = Ease.outCubic(prog(lt, tR, 0.4));
      z.style.transform += ` translateX(${-split * 20}px) rotate(${-split * 3}deg)`; j.style.transform += ` translateX(${split * 20}px) rotate(${split * 3}deg)`;
    };
  });

  // ───────────────────────── 2 · MITO: el rollo de Ovidio ─────────────────────────
  scene('mito', (x) => {
    const r = x.root;
    const scroll = add(r, `<div class="abs" style="left:130px;width:820px;top:340px;height:780px;transform-origin:50% 0">
      <div style="height:44px;border-radius:22px;background:linear-gradient(#b48a3c,#7a5a22)"></div>
      <div class="body" style="margin:0 24px;height:690px;background:${C.papyrus};box-shadow:0 30px 80px rgba(0,0,0,.55);padding:36px 44px;box-sizing:border-box;overflow:hidden">
        <div class="mono" style="font-size:24px;font-weight:700;letter-spacing:.14em;color:${C.oxblood}">${T.ovidHead}</div>
        <div class="serif" style="font-size:40px;font-style:italic;color:#6b6259;margin-top:18px">${T.ovidSub}</div>
        <div class="l1 serif" style="font-size:56px;font-weight:700;color:#1d1a17;margin-top:40px;opacity:0;transform-origin:0 50%"><span style="-webkit-box-decoration-break:clone">${T.son}</span></div>
        <div class="l2 serif" style="font-size:52px;font-weight:700;color:#1d1a17;margin-top:30px;opacity:0;line-height:1.15;transform-origin:0 50%"><span style="-webkit-box-decoration-break:clone">${T.ctrl}</span></div>
        ${Array.from({ length: 4 }, (_, i) => `<div style="height:16px;border-radius:8px;background:#ddd2bd;margin-top:26px;width:${90 - i * 12}%"></div>`).join('')}
      </div>
      <div style="height:44px;border-radius:22px;background:linear-gradient(#b48a3c,#7a5a22)"></div></div>`);
    const bolt = add(r, `<div class="abs" style="left:800px;top:330px;width:150px;height:150px;opacity:0">${BOLT(C.gold)}</div>`);
    const tO = at(x, A.ovid), tS = at(x, A.saturn), tB = at(x, A.bolt);
    x.cue(tO, 'swipe', 0.7); x.cue(tS, 'pop', 0.6); x.cue(tB, 'boom', 0.7); x.shake(tB, 14);
    return (lt) => {
      const u = Ease.outCubic(prog(lt, tO - 0.2, 0.6));
      scroll.style.opacity = u > 0 ? 1 : 0; scroll.querySelector('.body').style.height = 690 * u + 'px';
      const l1 = scroll.querySelector('.l1'), l2 = scroll.querySelector('.l2');
      popIn(l1, lt, tS - 0.15, 0.7); popIn(l2, lt, tB - 0.2, 0.7);
      l1.firstElementChild.style.background = lt > tS ? 'linear-gradient(transparent 60%, rgba(217,169,74,.55) 60%)' : 'none';
      l2.firstElementChild.style.background = lt > tB ? 'linear-gradient(transparent 60%, rgba(208,69,44,.35) 60%)' : 'none';
      const b = spring(lt, tB - 0.05, 0.35); bolt.style.opacity = b > 0 ? 1 : 0;
      bolt.style.transform = `scale(${lerp(2.5, 1, Math.min(1, b))}) rotate(-12deg)`;
      bolt.style.filter = `drop-shadow(0 0 ${30 + 20 * Math.sin(lt * 18)}px ${C.gold})`;
    };
  });

  // ───────────────────────── 3 · MISMO: tabla de coincidencias ─────────────────────────
  scene('mismo', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;display:flex;justify-content:flex-end;gap:40px;padding-right:30px;box-sizing:border-box">
      <span class="display" style="width:170px;text-align:center;font-size:38px;font-weight:900;color:${GR}">${T.greekCol}</span>
      <span class="display" style="width:170px;text-align:center;font-size:38px;font-weight:900;color:${RO}">${T.latinCol}</span></div>`);
    const ts = [A.birth, A.bolt2, A.king, A.loves].map((a) => at(x, a));
    const rows = T.rows.map((lbl, i) => add(r, `<div class="abs" style="left:110px;width:860px;top:${410 + i * 130}px;height:110px;border-radius:24px;background:${C.surface2};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:40px;padding:0 30px;box-sizing:border-box">
        <span class="display" style="flex:1;font-size:44px;font-weight:900;color:${C.ink}">${lbl}</span>
        <span class="c1" style="width:170px;display:flex;justify-content:center"><span style="width:64px;height:64px;color:${C.turquoise};opacity:0">${I.check}</span></span>
        <span class="c2" style="width:170px;display:flex;justify-content:center"><span style="width:64px;height:64px;color:${C.turquoise};opacity:0">${I.check}</span></span></div>`));
    const dress = add(r, `<div class="abs" style="left:0;right:0;top:960px;text-align:center">${pill(T.dress, C.gold, 'font-size:30px')}</div>`);
    ts.forEach((t) => { x.cue(t, 'tick', 0.6); x.cue(t + 0.15, 'tick', 0.5); });
    const tH = at(x, A.hesiod); x.cue(tH, 'ding', 0.5);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      rows.forEach((row, i) => {
        popIn(row, lt, ts[i] - 0.2, 0.7);
        row.querySelectorAll('.c1 span, .c2 span').forEach((c, j) => { const s = spring(lt, ts[i] + j * 0.15, 0.3); c.style.opacity = s > 0 ? 1 : 0; c.style.transform = `scale(${lerp(0.3, 1, s)})`; });
      });
      popIn(dress, lt, tH - 0.15, 0.6);
    };
  });

  // ───────────────────────── 4 · NOMBRE: calle de sentido único ─────────────────────────
  scene('nombre', (x) => {
    const r = x.root;
    const road = add(r, `<div class="abs" style="left:0;right:0;top:600px;height:240px;background:#211913;border-top:6px solid ${C.lineStrong};border-bottom:6px solid ${C.lineStrong}"><div class="dash abs" style="left:0;top:114px;width:2400px;height:12px;background:repeating-linear-gradient(90deg,${C.gold} 0 70px,transparent 70px 130px)"></div></div>`);
    const sign = add(r, `<div class="abs" style="left:150px;top:350px;width:780px;height:170px;border-radius:20px;background:#f6f1e6;border:8px solid #1d1a17;display:flex;align-items:center;gap:20px;padding:0 30px;box-sizing:border-box">
      <span class="display" style="font-size:58px;font-weight:900;color:${GR}">ZEUS</span>
      <svg width="200" height="60" viewBox="0 0 200 60"><path d="M0 30 H170 M140 6 L190 30 L140 54" fill="none" stroke="#1d1a17" stroke-width="12" stroke-linejoin="round"/></svg>
      <span class="display" style="font-size:58px;font-weight:900;color:${RO}">${T.jup}</span></div>`);
    const ow = add(r, `<div class="abs mono" style="left:0;right:0;top:530px;text-align:center;font-size:28px;font-weight:700;color:${C.gold};letter-spacing:.2em">${T.oneWay}</div>`);
    const ok = add(r, `<div class="abs" style="left:110px;top:880px;display:flex;align-items:center;gap:22px"><span style="width:70px;height:70px;color:${C.turquoise}">${I.check}</span><span class="display" style="font-size:42px;font-weight:900;color:${C.ink}">${T.latinOk}</span></div>`);
    const no = add(r, `<div class="abs" style="left:110px;top:990px;display:flex;align-items:center;gap:22px">
      <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="${C.red}"/><rect x="14" y="33" width="52" height="14" rx="3" fill="#fff"/></svg>
      <span class="display" style="font-size:42px;font-weight:900;color:${C.ink}">${T.greekNo}</span></div>`);
    const tW = at(x, A.way), tG = at(x, A.greek), tN = at(x, A.never);
    x.cue(0.1, 'whoosh', 0.6); x.cue(tW, 'pop', 0.6); x.cue(tG, 'tick', 0.5); x.cue(tN, 'buzz', 0.7); x.shake(tN, 10);
    return (lt) => {
      road.style.opacity = appear(lt, 0, 0.3);
      road.querySelector('.dash').style.transform = `translateX(${-((lt * 260) % 130)}px)`;
      popIn(sign, lt, 0.15, 0.6); ow.style.opacity = appear(lt, tW, 0.3);
      popIn(ok, lt, tW + 0.3, 0.6); popIn(no, lt, tN - 0.15, 0.5);
    };
  });

  // ───────────────────────── 5 · TEMPLO: primer templo de Roma ─────────────────────────
  scene('templo', (x) => {
    const r = x.root;
    const tC = at(x, A.cult), tF = at(x, A.first), tFe = at(x, A.feretrius), tRo = at(x, A.romulus), tSp = at(x, A.spoils), tK = at(x, A.kingk);
    const head = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center">${pill(T.cultTitle, RO, 'font-size:32px')}</div>`);
    const tp = temple(r, 540, 980, 480);
    const first = add(r, `<div class="abs display" style="left:0;right:0;top:400px;text-align:center;font-size:60px;font-weight:900;color:${C.gold}">${T.firstTemple}</div>`);
    const name = add(r, `<div class="abs display" style="left:0;right:0;top:1018px;text-align:center;font-size:54px;font-weight:900;color:${C.ink}">${T.feretrius}</div>`);
    const SHIELD = `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="${C.oxblood}" stroke="${C.gold}" stroke-width="5"/><circle cx="32" cy="32" r="9" fill="${C.gold}"/></svg>`;
    const HELM = `<svg viewBox="0 0 64 64"><path d="M10 40 C10 16, 54 16, 54 40 L54 50 L40 50 L40 38 L24 38 L24 50 L10 50Z" fill="${C.silver}" stroke="#7d6f5b" stroke-width="3"/><path d="M32 8 C40 2, 54 6, 56 14 C46 12, 38 14, 32 20Z" fill="${C.red}"/></svg>`;
    const spoils = [SHIELD, HELM, SHIELD].map((s, i) => add(r, `<div class="abs" style="left:${370 + i * 120}px;top:700px;width:100px;height:110px;transform-origin:50% 0">${s}</div>`));
    const sp = add(r, `<div class="abs mono" style="left:0;right:0;top:1100px;text-align:center;font-size:26px;color:${C.muted}">${T.spoils} · ${T.livy.replace('12', '10')}</div>`);
    x.cue(tC, 'stamp', 0.6); x.cue(tF - 0.1, 'drum', 0.8); x.cue(tF + 0.4, 'drum', 0.5); x.cue(tFe, 'gong', 0.4); spoils.forEach((_, i) => x.cue(tSp + i * 0.15, 'pop', 0.5));
    return (lt) => {
      popIn(head, lt, tC - 0.15, 0.6);
      tp.set(prog(lt, tF - 0.3, 1.6));
      popIn(first, lt, tF + 0.2, 0.6);
      popIn(name, lt, tFe - 0.1, 0.6);
      spoils.forEach((s, i) => { const k = spring(lt, tSp - 0.1 + i * 0.15, 0.45); s.style.opacity = k > 0 ? 1 : 0; s.style.transform = `translateY(${(1 - Math.min(1, k)) * -200}px) rotate(${Math.sin(lt * 3 + i) * 5 * (k >= 1 ? 1 : 0)}deg)`; });
      sp.style.opacity = appear(lt, tK, 0.4);
    };
  });

  // ───────────────────────── 6 · STATOR: el que detiene la huida ─────────────────────────
  scene('stator', (x) => {
    const r = x.root;
    const tFl = at(x, A.flee), tSt = at(x, A.stator), tS = at(x, A.stops);
    const R = rng(21);
    const men = Array.from({ length: 9 }, (_, i) => ({ el: add(r, `<div class="abs" style="left:0;top:0;width:56px;height:112px">${human(C.papyrus, false)}</div>`), x0: 760 + (i % 3) * 70 + R() * 40, y: 640 + Math.floor(i / 3) * 130 + R() * 30, ph: R() * 6 }));
    const wall = add(r, `<div class="abs" style="left:150px;top:600px;width:26px;height:470px;border-radius:13px;background:${C.gold};box-shadow:0 0 40px ${C.gold};opacity:0"></div>`);
    const name = add(r, `<div class="abs display" style="left:0;right:0;top:350px;text-align:center;font-size:76px;font-weight:900;color:${C.ink}">${T.statorName}</div>`);
    const mean = add(r, `<div class="abs display" style="left:0;right:0;top:450px;text-align:center;font-size:58px;font-weight:900;color:${C.gold}">${T.statorMean}</div>`);
    const fl = add(r, `<div class="abs mono" style="left:600px;top:560px;font-size:26px;color:${C.red};letter-spacing:.14em">← ${T.flee.toUpperCase()}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1100px;text-align:center;font-size:24px;color:${C.muted}">${T.livy}</div>`);
    x.cue(tFl, 'whoosh', 0.8); x.cue(tSt, 'drum', 0.8); x.cue(tS, 'stamp', 1); x.shake(tS, 18);
    return (lt) => {
      const run = Ease.inOutCubic(prog(lt, 0.1, tS - 0.1));
      const stopK = lt > tS ? Ease.outBack(prog(lt, tS, 0.4)) : 0;
      men.forEach((m, i) => {
        const xx = m.x0 - run * 520 + stopK * 60;
        const bob = lt < tS ? Math.abs(Math.sin(lt * 14 + m.ph)) * -14 : 0;
        m.el.style.transform = `translate(${xx}px, ${m.y + bob}px) scaleX(${lt > tS ? -1 : 1})`;
        m.el.style.opacity = appear(lt, 0.05 + i * 0.03, 0.2);
      });
      fl.style.opacity = appear(lt, tFl - 0.1, 0.2) * (1 - appear(lt, tS, 0.2));
      const w = spring(lt, tS - 0.08, 0.3); wall.style.opacity = w > 0 ? 1 : 0; wall.style.transform = `scaleY(${w})`;
      popIn(name, lt, tSt - 0.15, 0.6); popIn(mean, lt, tS - 0.05, 0.5);
      src.style.opacity = appear(lt, tS + 0.4, 0.3);
    };
  });

  // ───────────────────────── 7 · IMPERIO SIN FIN ─────────────────────────
  scene('imperio', (x) => {
    const r = x.root;
    const tV = at(x, A.virgil), tE = at(x, A.empire), tF = at(x, A.end);
    const rings = Array.from({ length: 6 }, () => add(r, `<div class="abs" style="left:540px;top:740px;border-radius:50%;border:5px solid ${C.gold};opacity:0"></div>`));
    const core = add(r, `<div class="abs display" style="left:440px;top:700px;width:200px;height:80px;border-radius:40px;background:${RO};display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:900;color:${C.ink}">${T.rome}</div>`);
    const lat = add(r, `<div class="abs display" style="left:0;right:0;top:350px;text-align:center;font-size:76px;font-weight:900;color:${C.gold};letter-spacing:.04em">${T.imperium}</div>`);
    const tr = add(r, `<div class="abs" style="left:0;right:0;top:455px;text-align:center"><span class="serif" style="display:inline-block;padding:6px 26px;border-radius:14px;background:rgba(15,11,8,.85);font-size:44px;font-style:italic;color:${C.papyrus}">${T.imperiumT}</span></div>`);
    const inf = add(r, `<svg class="abs" style="left:390px;top:960px" width="300" height="150" viewBox="0 0 300 150"><path d="M150 75 C110 15, 30 15, 30 75 C30 135, 110 135, 150 75 C190 15, 270 15, 270 75 C270 135, 190 135, 150 75Z" fill="none" stroke="${C.gold}" stroke-width="12" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    x.cue(tV, 'swipe', 0.6); x.cue(tE, 'rise', 0.6); x.cue(tF, 'gong', 0.6);
    return (lt) => {
      popIn(core, lt, 0.1, 0.5);
      rings.forEach((g, i) => {
        const p = ((lt - tE) * 0.55 - i / 6);
        const on = lt > tE;
        const ph = ((p % 1) + 1) % 1, d = 120 + ph * 900;
        g.style.opacity = on && p > 0 ? (1 - ph) * 0.8 : 0;
        Object.assign(g.style, { width: d + 'px', height: d + 'px', transform: `translate(${-d / 2}px, ${-d / 2}px)` });
      });
      popIn(lat, lt, tE - 0.15, 0.6); tr.style.opacity = appear(lt, tE + 0.3, 0.3);
      inf.querySelector('path').setAttribute('stroke-dashoffset', 1 - Ease.inOutCubic(prog(lt, tF - 0.3, 0.8)));
    };
  });

  // ───────────────────────── 8 · EL ZEUS DE HESÍODO ─────────────────────────
  scene('zeus', (x) => {
    const r = x.root;
    const tZ = at(x, A.zeusH), tA = at(x, A.asked), tC = at(x, A.city);
    const title = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center">${pill(T.hesiodZeus, GR, 'font-size:32px')}</div>`);
    const gods = Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI * (0.12 + i * 0.152), cx = 540 - Math.cos(a) * 340, cy = 740 - Math.sin(a) * 200;
      return add(r, `<div class="abs" style="left:${cx - 30}px;top:${cy}px;width:60px;height:120px">${human(C.papyrus, true)}</div>`);
    });
    const zeus = add(r, `<div class="abs" style="left:490px;top:640px;width:100px;height:200px">${human(GR, false)}</div>`);
    const crown = add(r, `<svg class="abs" style="left:495px;top:560px" width="90" height="60" viewBox="0 0 90 60"><path d="M5 55 L10 15 L30 35 L45 5 L60 35 L80 15 L85 55Z" fill="${C.gold}"/></svg>`);
    const acc = add(r, `<div class="abs mono" style="left:0;right:0;top:900px;text-align:center;font-size:26px;color:${C.muted}">${T.acclaim}</div>`);
    const cities = Array.from({ length: 4 }, (_, i) => add(r, `<div class="abs" style="left:${170 + i * 200}px;top:960px;width:140px;height:110px;opacity:.9">
      <svg viewBox="0 0 140 110" width="140" height="110"><path d="M10 40 L70 8 L130 40Z" fill="none" stroke="${C.faint}" stroke-width="5"/>${[0, 1, 2, 3].map((k) => `<rect x="${22 + k * 28}" y="46" width="12" height="50" fill="${C.faint}"/>`).join('')}<rect x="10" y="96" width="120" height="8" fill="${C.faint}"/></svg></div>`));
    const nope = stamp(r, T.noCity, C.red, 190, 945, -4, 44, 700);
    x.cue(tZ, 'drum', 0.6); gods.forEach((_, i) => x.cue(tA + i * 0.06, 'pop', 0.35)); x.cue(tA + 0.5, 'ding', 0.5); x.cue(tC, 'stamp', 0.8);
    return (lt) => {
      popIn(title, lt, 0, 0.6); popIn(zeus, lt, tZ - 0.1, 0.5);
      gods.forEach((g, i) => { popIn(g, lt, 0.2 + i * 0.06, 0.4); const up = lt > tA ? Math.abs(Math.sin(lt * 8 + i)) * -16 : 0; g.style.transform += ` translateY(${up}px)`; });
      const c = Ease.outBack(prog(lt, tA + 0.3, 0.5)); crown.style.opacity = c > 0 ? 1 : 0; crown.style.transform = `translateY(${(1 - c) * -150}px)`;
      acc.style.opacity = appear(lt, tA + 0.5, 0.3);
      cities.forEach((ct, i) => popIn(ct, lt, tC - 0.6 + i * 0.08, 0.5));
      stampIn(nope, lt, tC + 0.1, -4);
    };
  });

  // ───────────────────────── 9 · REGLA RÁPIDA ─────────────────────────
  scene('regla', (x) => {
    const r = x.root;
    const tS = at(x, A.stories), tR = at(x, A.religion), tRo = at(x, A.romeEnd);
    const head = add(r, `<div class="abs mono" style="left:0;right:0;top:330px;text-align:center;font-size:30px;font-weight:700;letter-spacing:.2em;color:${C.gold}">${T.rule}</div>`);
    const card = (y, l, rr, col) => add(r, `<div class="abs" style="left:110px;width:860px;top:${y}px;height:270px;border-radius:30px;background:${C.surface2};border:5px solid ${col};padding:34px 40px;box-sizing:border-box">
      <div class="mono" style="font-size:28px;font-weight:700;letter-spacing:.16em;color:${col}">${l}</div>
      <div class="display" style="font-size:54px;font-weight:900;color:${C.ink};margin-top:30px;white-space:nowrap">${rr}</div></div>`);
    const c1 = card(420, T.storiesL, T.storiesR, C.turquoise), c2 = card(740, T.relL, T.relR, RO);
    x.cue(tS, 'pop', 0.7); x.cue(tR, 'pop', 0.7); x.cue(tRo, 'ding', 0.5);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      popIn(c1, lt, tS - 0.15, 0.7); popIn(c2, lt, tR - 0.15, 0.7);
      c2.style.boxShadow = lt > tRo ? `0 0 ${40 + 15 * Math.sin(lt * 6)}px ${RO}88` : 'none';
    };
  });

  // ───────────────────────── 10 · ¿QUÉ TEXTO LO DICE? ─────────────────────────
  scene('fuente', (x) => {
    const r = x.root;
    const tQ = at(x, A.which), tO = at(x, A.ovidS), tL = at(x, A.livy);
    const q = big(r, T.which, 330, 96, C.gold);
    const cA = add(r, `<div class="abs" style="left:110px;width:860px;top:580px;transform-origin:50% 0">${citation(T.citeA[0], T.citeA[1], GR, T.src)}</div>`);
    const cB = add(r, `<div class="abs" style="left:110px;width:860px;top:870px;transform-origin:50% 0">${citation(T.citeB[0], T.citeB[1], RO, T.src)}</div>`);
    x.cue(tQ, 'stamp', 0.7); x.cue(tO, 'swipe', 0.6); x.cue(tL, 'swipe', 0.6);
    return (lt) => {
      popIn(q, lt, tQ - 0.2, 0.6);
      [[cA, tO], [cB, tL]].forEach(([c, t]) => { const k = Ease.outCubic(prog(lt, t - 0.2, 0.4)); c.style.opacity = k > 0 ? 1 : 0; c.style.transform = `scaleY(${lerp(0.05, 1, k)})`; });
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: T.endSub }));
})();
