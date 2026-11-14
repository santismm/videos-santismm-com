/* MYTHOS #05 · "Hestia: la diosa sin historias que en Roma lo era todo" / "Hestia: the goddess with no stories who was everything in Rome"
 * Versiones: es (este directorio) y en (videos/mythos-005-hestia-vesta-en, comparte este archivo vía "scenesFile").
 * Todo texto en pantalla y cada palabra de sincronización x.at() sale del diccionario TT según EUREKA.lang.
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/hestia-vs-vesta c1–c5: primogénita de Cronos (Teog. 453–458; Apollod. 1.1.5), "first-born … and youngest too" (HH5 21–32);
 *    juramento sobre la cabeza de Zeus, "a maiden all her days", "her place in the midst of the house" (HH5 21–32);
 *    "The Greek texts here give her no story beyond this"; sin sacerdocio en los textos leídos (c5);
 *    Numa: vestales con sueldo público, "sacred and inviolable" (Livio 1.20.3); Rea Silvia, madre de Rómulo, vestal (Livio 1.3.11; 1.4.2);
 *    fuego de Troya: Héctor se lo da a Eneas (Eneida 2.268–297); equivalencia por función, no por relato (c5).
 *  - /k/hestia c3: vino "a Hestia, primero y lo último" en cada banquete (HH29 4–6).
 */
(function () {
  const { C, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn, human, citation, mythosEndCard } = EUREKA.ui;

  const TT = {
    es: {
      kw: ['historias', 'troya', 'primera', 'ultima', 'doncella', 'primero', 'ultimo', 'sacerdotes', 'vestales', 'intocables', 'vestal', 'mito', 'texto'],
      a: { greek: 'griega', stories: 'historias', rome: 'roma', fire: 'fuego', troy: 'troya',
        first: 'primera', swallow: 'traga', last: 'ultima', spit: 'vomita',
        poseidon: 'poseidon', apollo: 'apolo', head: 'cabeza', zeus: 'zeus', swear: 'jura', maiden: 'doncella',
        reward: 'premio', centre: 'centro', banquet: 'banquete', wine: 'vino', pFirst: 'primero', pLast: 'ultimo',
        all: 'todo', gtexts: 'griegos', story: 'historia', priests: 'sacerdotes',
        rome2: 'roma', vesta: 'vesta', vestals: 'vestales', numa: 'numa', salary: 'sueldo', untouch: 'intocables',
        troy2: 'troya', ghost: 'fantasma', aeneas: 'eneas', burns: 'llamas',
        mother: 'madre', romulus: 'romulo', rhea: 'rea', vestal: 'vestal',
        func: 'funcion', hearth: 'hogar', virgin: 'virginidad', myth: 'mito',
        same: 'misma', ask: 'pregunta', which: ['que', 1], text: 'texto' },
      greece: 'GRECIA', rome: 'ROMA', fromTroy: 'FUEGO DE TROYA', myths: 'mitos', cronus: 'CRONOS', names: ['HESTIA', 'DEMÉTER', 'HERA', '…'],
      firstIn: '1.ª EN ENTRAR', lastOut: 'ÚLTIMA EN SALIR', oath: 'JURAMENTO', quote: '«sería doncella todos sus días»', quoteSrc: 'Himno homérico a Afrodita, 21–32',
      centre: 'EL CENTRO DE LA CASA', forHestia: 'VINO PARA HESTIA', cFirst: 'PRIMERO', cLast: 'ÚLTIMO',
      index: 'HESTIA · SUS MITOS', rows: ['Nace la primera', 'Jura ser doncella', 'Centro de la casa'], none: 'NADA MÁS', priests: 'SACERDOTES', read: 'EN LOS TEXTOS LEÍDOS',
      vestals: 'VÍRGENES VESTALES', salary: 'SUELDO PÚBLICO', untouch: 'INTOCABLES', numa: 'NUMA · LIVIO 1.20',
      troy: 'TROYA', hector: 'HÉCTOR', aeneas: 'ENEAS', italy: 'ROMA', aen: 'Eneida 2.293–297',
      rhea: 'REA SILVIA', romulus: 'RÓMULO', remus: 'REMO', vestalB: 'VESTAL', livy: 'Livio 1.3.11 · 1.4.2',
      hearth: 'HOGAR', virgin: 'VIRGINIDAD', shared: 'MITOS COMPARTIDOS: 0', lOnly: 'un himno', rOnly: 'vestales · Troya · Rómulo',
      which: '¿QUÉ TEXTO<br>LO DICE?', label: 'FUENTE PRIMARIA',
      cH: ['Hestia', ['Himno homérico a Afrodita, 21–32', 'Teogonía 453–458 · Himno 29']],
      cV: ['Vesta', ['Livio, Ab urbe condita 1.3 · 1.20', 'Virgilio, Eneida 2.293–297']],
      endSub: 'griegos · romanos · nórdicos · egipcios · con su fuente',
    },
    en: {
      kw: ['stories', 'troy', 'first', 'last', 'maiden', 'priests', 'vestal', 'untouchable', 'myth', 'text'],
      a: { greek: 'greek', stories: 'stories', rome: 'rome', fire: 'fire', troy: 'troy',
        first: ['first', 1], swallow: 'swallows', last: 'last', spit: 'spits',
        poseidon: 'poseidon', apollo: 'apollo', head: 'head', zeus: 'zeus', swear: 'swears', maiden: 'maiden',
        reward: 'reward', centre: 'centre', banquet: 'banquet', wine: 'wine', pFirst: 'first', pLast: 'last',
        all: 'all', gtexts: 'greek', story: 'story', priests: 'priests',
        rome2: 'rome', vesta: 'vesta', vestals: 'vestal', numa: 'numa', salary: 'salary', untouch: 'untouchable',
        troy2: 'troy', ghost: 'ghost', aeneas: 'aeneas', burns: 'burns',
        mother: 'mother', romulus: 'romulus', rhea: 'rhea', vestal: 'vestal',
        func: 'function', hearth: 'hearth', virgin: 'virginity', myth: 'myth',
        same: 'same', ask: 'ask', which: 'which', text: 'text' },
      greece: 'GREECE', rome: 'ROME', fromTroy: 'FIRE OF TROY', myths: 'myths', cronus: 'CRONUS', names: ['HESTIA', 'DEMETER', 'HERA', '…'],
      firstIn: 'FIRST IN', lastOut: 'LAST OUT', oath: 'THE OATH', quote: '"a maiden all her days"', quoteSrc: 'Homeric Hymn to Aphrodite, 21–32',
      centre: 'THE CENTRE OF THE HOUSE', forHestia: 'WINE FOR HESTIA', cFirst: 'FIRST', cLast: 'LAST',
      index: 'HESTIA · HER MYTHS', rows: ['Born first', 'Swears to stay a maiden', 'Centre of the house'], none: 'THAT’S ALL', priests: 'PRIESTS', read: 'IN THE TEXTS READ',
      vestals: 'VESTAL VIRGINS', salary: 'PUBLIC SALARY', untouch: 'UNTOUCHABLE', numa: 'NUMA · LIVY 1.20',
      troy: 'TROY', hector: 'HECTOR', aeneas: 'AENEAS', italy: 'ROME', aen: 'Aeneid 2.293–297',
      rhea: 'RHEA SILVIA', romulus: 'ROMULUS', remus: 'REMUS', vestalB: 'VESTAL', livy: 'Livy 1.3.11 · 1.4.2',
      hearth: 'HEARTH', virgin: 'VIRGINITY', shared: 'SHARED MYTHS: 0', lOnly: 'one hymn', rOnly: 'Vestals · Troy · Romulus',
      which: 'WHICH TEXT<br>SAYS SO?', label: 'PRIMARY SOURCE',
      cH: ['Hestia', ['Homeric Hymn to Aphrodite, 21–32', 'Theogony 453–458 · Hymn 29']],
      cV: ['Vesta', ['Livy, History of Rome 1.3 · 1.20', 'Virgil, Aeneid 2.293–297']],
      endSub: 'Greek · Roman · Norse · Egyptian · with sources',
    },
  };
  const T = TT[EUREKA.lang] || TT.es, A = T.a;
  const at = (x, k) => (Array.isArray(A[k]) ? x.at(A[k][0], A[k][1]) : x.at(A[k]));

  EUREKA.video = { keywords: T.kw };

  // ───────── helpers locales ─────────
  const css = (e, o) => { for (const k in o) e.style[k] = o[k]; };
  const label = (r, html, x, y, w, size = 30, color = C.gold, align = 'center') => add(r, `<div class="abs mono" style="left:${x}px;top:${y}px;width:${w}px;text-align:${align};font-size:${size}px;font-weight:700;letter-spacing:.12em;color:${color}">${html}</div>`);
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.06em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.6);white-space:nowrap;text-align:center">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };

  let fN = 0;
  /** Llama viva: set(lt, k) con k = tamaño 0..1 */
  function flame(parent, { x, y, w = 120 }) {
    const id = 'fl' + fN++;
    const el = add(parent, `<div class="abs" style="left:${x - w / 2}px;top:${y - w * 1.4}px;width:${w}px;height:${w * 1.4}px;transform-origin:50% 100%">
      <svg viewBox="0 0 100 140" width="${w}" height="${w * 1.4}" style="overflow:visible"><defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d0452c"/><stop offset=".55" stop-color="#f08a2c"/><stop offset="1" stop-color="#ffd36b"/></linearGradient></defs>
      <g style="filter:drop-shadow(0 0 ${w * 0.25}px #f08a2c)"><path class="o" d="M50 4 C62 30 88 52 86 88 C84 118 66 136 50 136 C34 136 16 118 14 88 C12 60 34 44 40 22 C44 40 52 44 50 4Z" fill="url(#${id})"/>
      <path class="i" d="M50 50 C58 66 70 80 68 100 C66 120 58 128 50 128 C42 128 34 120 32 102 C30 86 44 76 50 50Z" fill="#ffe9a8"/></g></svg></div>`);
    const o = el.querySelector('.o'), i = el.querySelector('.i');
    return {
      el,
      set(lt, k = 1) {
        const f = 1 + 0.06 * Math.sin(lt * 17) + 0.04 * Math.sin(lt * 29 + 1);
        el.style.opacity = k > 0.01 ? 1 : 0;
        el.style.transform = `scale(${k * (0.97 + 0.03 * Math.sin(lt * 11))}, ${k * f}) skewX(${4 * Math.sin(lt * 7)}deg)`;
        i.setAttribute('transform', `translate(0 ${4 * Math.sin(lt * 13)})`);
        o.setAttribute('opacity', 0.92 + 0.08 * Math.sin(lt * 23));
      },
    };
  }
  /** Templo redondo de Vesta (tholos). */
  const TEMPLE = (w) => `<svg viewBox="0 0 300 250" width="${w}" height="${w * 250 / 300}">
      <path d="M38 92 Q150 -8 262 92Z" fill="#3a2c1d" stroke="${C.gold}" stroke-width="5"/>
      <rect x="28" y="90" width="244" height="22" rx="3" fill="#2a2016" stroke="${C.gold}" stroke-width="5"/>
      ${[48, 88, 128, 158, 198, 238].map((cx) => `<rect x="${cx}" y="112" width="15" height="98" fill="#e9dcc0" opacity=".9"/>`).join('')}
      <rect x="18" y="210" width="264" height="14" fill="#2a2016" stroke="${C.gold}" stroke-width="4"/>
      <rect x="6" y="224" width="288" height="16" fill="#2a2016" stroke="${C.gold}" stroke-width="4"/></svg>`;
  const TRIDENT = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><path d="M32 60V14M18 8v14a14 14 0 0 0 28 0V8M32 4v10"/></svg>`;
  const LYRE = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><path d="M18 8c-8 14-4 30 6 40h16c10-10 14-26 6-40M14 14h36M26 18v30M32 18v30M38 18v30M20 56h24"/></svg>`;
  const BOLT = `<svg viewBox="0 0 64 64"><path d="M36 4 14 36h14l-6 24 28-34H34z" fill="currentColor"/></svg>`;
  const COIN = `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="#e3b75a" stroke="#8a5a1c" stroke-width="4"/><circle cx="32" cy="32" r="18" fill="none" stroke="#8a5a1c" stroke-width="3" stroke-dasharray="3 4"/><text x="32" y="40" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="22" fill="#8a5a1c">SPQR</text></svg>`;
  const SHIELD = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z"/><path d="M22 32l7 7 13-14" stroke-linecap="round"/></svg>`;
  const CUP = `<svg viewBox="0 0 120 70"><path d="M8 14 H112 Q104 46 60 48 Q16 46 8 14Z" fill="#c26a2c" stroke="${C.gold}" stroke-width="4"/><path d="M56 48v12h8V48M36 64h48" stroke="${C.gold}" stroke-width="5" fill="none" stroke-linecap="round"/><path class="wine" d="M14 18 H106 Q100 40 60 42 Q20 40 14 18Z" fill="#7a1020" opacity="0"/></svg>`;
  const VEILED = (color) => `<svg viewBox="0 0 40 80" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"><path d="M8 26 Q8 4 20 4 Q32 4 32 26" fill="${color}" opacity=".35" stroke="none"/><circle cx="20" cy="12" r="7" fill="${color}"/><path d="M8 26 Q20 16 32 26 L36 78 H4Z" fill="${color}" opacity=".85" stroke="none"/></svg>`;

  // ───────────────────────── 1 · HOOK: Grecia vacía / Roma en llamas ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const tS = at(x, 'stories'), tR = at(x, 'rome'), tF = at(x, 'fire'), tT = at(x, 'troy');
    const L = add(r, `<div class="abs" style="left:100px;top:340px;width:420px;height:780px;border-radius:28px;background:${C.papyrus};box-shadow:0 30px 70px rgba(0,0,0,.55);overflow:hidden">
      <div class="mono" style="position:absolute;left:0;right:0;top:30px;text-align:center;font-size:26px;font-weight:700;letter-spacing:.16em;color:${C.oxblood}">${T.greece}</div>
      <div class="display" style="position:absolute;left:0;right:0;top:80px;text-align:center;font-size:62px;font-weight:900;color:#1d1a17">HESTIA</div>
      ${Array.from({ length: 9 }, (_, i) => `<div class="ln" style="position:absolute;left:50px;top:${200 + i * 58}px;height:12px;border-radius:6px;background:#cfc3a8;width:${[300, 250, 320, 280, 200, 310, 260, 230, 290][i]}px"></div>`).join('')}
      <div class="cnt mono" style="position:absolute;left:0;right:0;bottom:36px;text-align:center;font-size:30px;font-weight:700;color:#6b6259;opacity:0">${T.myths}: ≈ 0</div></div>`);
    const R = add(r, `<div class="abs" style="left:560px;top:340px;width:420px;height:780px;border-radius:28px;background:linear-gradient(#2a1810,#140d08);border:3px solid ${C.lineStrong};overflow:hidden">
      <div class="mono" style="position:absolute;left:0;right:0;top:30px;text-align:center;font-size:26px;font-weight:700;letter-spacing:.16em;color:${C.gold}">${T.rome}</div>
      <div style="position:absolute;left:30px;top:330px">${TEMPLE(360)}</div></div>`);
    const fl = flame(R, { x: 210, y: 520, w: 130 });
    const tag = add(r, `<div class="abs" style="left:560px;width:420px;top:1010px;text-align:center">${pill(T.fromTroy, C.red, 'font-size:26px')}</div>`);
    const sparks = Array.from({ length: 16 }, (_, i) => add(R, `<div class="abs" style="width:8px;height:8px;border-radius:50%;background:#ffd36b;box-shadow:0 0 12px #f08a2c;opacity:0"></div>`));
    x.cue(0.05, 'drum', 0.8); x.cue(tS, 'swipe', 0.7); x.cue(tR, 'whoosh', 0.7); x.cue(tF, 'rise', 0.6); x.cue(tT, 'gong', 0.6); x.shake(tT, 8);
    return (lt) => {
      popIn(L, lt, 0.05, 0.85); popIn(R, lt, tR - 0.35, 0.85);
      const er = prog(lt, tS - 0.1, 0.7);
      L.querySelectorAll('.ln').forEach((l, i) => { l.style.opacity = 1 - Ease.outCubic(Math.min(1, er * 1.6 - i * 0.06)); });
      L.querySelector('.cnt').style.opacity = appear(lt, tS + 0.4, 0.3);
      fl.set(lt, Ease.outBack(prog(lt, tF - 0.1, 0.5)) * (lt > tT ? 1.25 : 1));
      popIn(tag, lt, tT - 0.05, 0.5);
      sparks.forEach((s, i) => { const k = ((lt - tT) * 0.8 + i * 0.13) % 1; const on = lt > tT; css(s, { opacity: on ? (1 - k) : 0, transform: `translate(${210 + Math.sin(i * 2.3) * 120 * k}px, ${470 - k * 300}px)` }); });
    };
  });

  // ───────────────────────── 2 · PRIMERA EN ENTRAR, ÚLTIMA EN SALIR ─────────────────────────
  scene('primera', (x) => {
    const r = x.root;
    const tFi = at(x, 'first'), tSw = at(x, 'swallow'), tL = at(x, 'last'), tSp = at(x, 'spit');
    const belly = add(r, `<div class="abs" style="left:360px;top:420px;width:360px;height:700px;border-radius:60px 60px 160px 160px;background:linear-gradient(#2a1c12,#1a120c);border:5px solid ${C.lineStrong};box-shadow:inset 0 0 80px rgba(0,0,0,.7)"></div>`);
    const name = label(r, T.cronus, 360, 340, 360, 40, C.muted);
    const mouth = add(r, `<div class="abs" style="left:470px;top:404px;width:140px;height:34px;border-radius:0 0 70px 70px;background:#0a0705;border:4px solid ${C.lineStrong}"></div>`);
    const toks = T.names.map((n, i) => add(r, `<div class="abs display" style="left:450px;top:0;width:180px;height:180px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${n.length > 6 ? 30 : 38}px;font-weight:900;background:${i === 0 ? C.gold : C.surface2};color:${i === 0 ? C.bg : C.papyrus};border:4px solid ${i === 0 ? '#ffe28a' : C.lineStrong};box-shadow:${i === 0 ? '0 0 40px rgba(217,169,74,.6)' : 'none'}">${n}</div>`));
    const fIn = label(r, T.firstIn, 90, 960, 260, 26, C.gold, 'right');
    const lOut = label(r, T.lastOut, 700, 640, 300, 30, C.gold, 'center');
    const tIn = toks.map((_, i) => tFi + 0.05 + i * 0.22);
    const nOut = toks.length;
    const tOut = toks.map((_, i) => (i === 0 ? tSp : tL - 0.05 + (nOut - 1 - i) * 0.12));
    toks.forEach((_, i) => x.cue(tIn[i], 'pop', 0.5)); toks.forEach((_, i) => x.cue(tOut[i], i === 0 ? 'ding' : 'swipe', i === 0 ? 0.6 : 0.4));
    x.cue(tSw, 'drum', 0.6);
    return (lt) => {
      popIn(belly, lt, -0.1, 0.9); name.style.opacity = appear(lt, 0, 0.3); mouth.style.opacity = appear(lt, 0, 0.3);
      toks.forEach((tk, i) => {
        const restY = 920 - i * 165, inK = Ease.inOutCubic(prog(lt, tIn[i], 0.35)), outK = Ease.inCubic(prog(lt, tOut[i], 0.35));
        const endY = i === 0 ? 420 : 330, endX = i === 0 ? 290 : 0;
        const y = lerp(300, restY, inK) + outK * (endY - restY);
        tk.style.opacity = lt < tIn[i] - 0.05 ? 0 : (i === 0 ? 1 : 1 - outK);
        tk.style.transform = `translate(${outK * endX}px, ${y}px) scale(${i === 0 && outK > 0 ? 1 + outK * 0.15 : 1})`;
      });
      fIn.style.opacity = appear(lt, tIn[0] + 0.3, 0.3) * (1 - appear(lt, tL, 0.2));
      lOut.style.opacity = appear(lt, tSp, 0.3);
    };
  });

  // ───────────────────────── 3 · EL JURAMENTO ─────────────────────────
  scene('juramento', (x) => {
    const r = x.root;
    const tP = at(x, 'poseidon'), tA = at(x, 'apollo'), tH = at(x, 'head'), tZ = at(x, 'zeus'), tS = at(x, 'swear'), tM = at(x, 'maiden');
    const zeus = add(r, `<div class="abs" style="left:440px;top:330px;width:200px;height:200px;border-radius:50%;background:radial-gradient(#ffe28a,#c8901c);border:6px solid #8a5a1c;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#5a3a10;box-shadow:0 0 50px rgba(217,169,74,.5)"><div style="width:70px;height:70px">${BOLT}</div><div class="display" style="font-size:36px;font-weight:900">ZEUS</div></div>`);
    const line = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1300"><path d="M540 540 L540 640" stroke="${C.gold}" stroke-width="6" stroke-dasharray="10 12" pathLength="1" opacity="0"/></svg>`).querySelector('path');
    const hest = add(r, `<div class="abs" style="left:430px;top:650px;width:220px;height:220px;border-radius:50%;background:${C.surface2};border:5px solid ${C.gold};display:flex;align-items:flex-end;justify-content:center"><div class="display" style="font-size:34px;font-weight:900;color:${C.ink};margin-bottom:22px">HESTIA</div></div>`);
    const hf = flame(hest, { x: 110, y: 150, w: 80 });
    const suitor = (txt, icon, color, left) => add(r, `<div class="abs" style="left:${left}px;top:700px;width:240px;height:130px;border-radius:26px;background:${C.surface};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:14px"><div style="width:56px;height:56px;color:${color}">${icon}</div><span class="display" style="font-size:${txt.length > 7 ? 28 : 32}px;font-weight:900;color:${C.ink}">${txt}</span></div>`);
    const sP = suitor(EUREKA.lang === 'en' ? 'POSEIDON' : 'POSEIDÓN', TRIDENT, C.blue, 120);
    const sA = suitor(EUREKA.lang === 'en' ? 'APOLLO' : 'APOLO', LYRE, C.gold, 720);
    const seal = stamp(r, T.oath, C.gold, 330, 900, -6, 60);
    const quote = add(r, `<div class="abs" style="left:110px;width:860px;top:1030px;text-align:center"><div class="serif" style="font-size:46px;font-style:italic;color:${C.papyrus}">${T.quote}</div><div class="mono" style="font-size:22px;color:${C.muted};margin-top:6px">${T.quoteSrc}</div></div>`);
    x.cue(tP, 'whoosh', 0.6); x.cue(tA, 'whoosh', 0.6); x.cue(tZ, 'gong', 0.6); x.cue(tS, 'stamp', 0.9); x.shake(tS, 12); x.cue(tM, 'ding', 0.4);
    return (lt) => {
      popIn(hest, lt, -0.1, 0.7); hf.set(lt, 1);
      const out = Ease.outCubic(prog(lt, tS, 0.45));
      [[sP, tP, -1], [sA, tA, 1]].forEach(([s, t, d]) => {
        const k = Ease.outBack(prog(lt, t - 0.1, 0.45));
        s.style.opacity = (k > 0 ? 1 : 0) * (1 - out * 0.8);
        s.style.transform = `translateX(${d * (1 - k) * 320 + d * out * 120}px) rotate(${d * out * 12}deg)`;
      });
      popIn(zeus, lt, tH - 0.1, 0.5);
      line.setAttribute('opacity', appear(lt, tZ, 0.2)); line.setAttribute('stroke-dashoffset', -lt * 0.6);
      stampIn(seal, lt, tS - 0.05, -6);
      quote.style.opacity = appear(lt, tM - 0.1, 0.35);
    };
  });

  // ───────────────────────── 4 · EL PREMIO: centro de la casa y vino ─────────────────────────
  scene('premio', (x) => {
    const r = x.root;
    const tC = at(x, 'centre'), tB = at(x, 'banquet'), tW = at(x, 'wine'), tF = at(x, 'pFirst'), tL = at(x, 'pLast');
    const plan = add(r, `<svg class="abs" style="left:140px;top:350px" width="800" height="560" viewBox="0 0 800 560">
      <rect x="10" y="10" width="780" height="540" fill="#1a140f" stroke="${C.papyrus}" stroke-width="8"/>
      <path d="M10 180 H250 M550 180 H790 M10 380 H250 M550 380 H790 M250 10 V180 M550 10 V180 M250 380 V550 M550 380 V550 M360 550 V500 M440 550 V500" stroke="${C.papyrus}" stroke-width="6" fill="none" opacity=".75"/>
      <rect class="court" x="250" y="180" width="300" height="200" fill="rgba(217,169,74,0)" stroke="${C.gold}" stroke-width="4" stroke-dasharray="12 10"/></svg>`);
    const hf = flame(r, { x: 540, y: 690, w: 110 });
    const cLbl = add(r, `<div class="abs" style="left:0;right:0;top:930px;text-align:center">${pill(T.centre, C.gold, 'font-size:28px')}</div>`);
    const ban = add(r, `<div class="abs" style="left:110px;width:860px;top:360px;height:760px"></div>`);
    const head = label(ban, T.forHestia, 0, 0, 860, 34, C.gold);
    const cup = (left, txt) => add(ban, `<div class="abs" style="left:${left}px;top:300px;width:300px;text-align:center"><div class="pour" style="position:absolute;left:146px;top:-220px;width:10px;height:0;background:#7a1020;border-radius:5px"></div><div style="width:300px">${CUP}</div><div class="display" style="font-size:48px;font-weight:900;color:${C.ink};margin-top:16px">${txt}</div></div>`);
    const c1 = cup(40, T.cFirst), c2 = cup(520, T.cLast);
    const hf2 = flame(ban, { x: 430, y: 330, w: 70 });
    x.cue(tC, 'ding', 0.5); x.cue(tB, 'whoosh', 0.7); x.cue(tF, 'pour', 0.6); x.cue(tL, 'pour', 0.6);
    return (lt) => {
      const swap = Ease.inOutCubic(prog(lt, tB - 0.3, 0.4));
      popIn(plan, lt, -0.1, 0.9); plan.style.opacity = 1 - swap;
      plan.querySelector('.court').setAttribute('fill', `rgba(217,169,74,${0.25 * appear(lt, tC, 0.4)})`);
      hf.set(lt, Ease.outBack(prog(lt, tC - 0.15, 0.4)) * (1 - swap)); hf.el.style.opacity = (1 - swap) * (lt > tC - 0.15 ? 1 : 0);
      cLbl.style.opacity = appear(lt, tC + 0.1, 0.3) * (1 - swap);
      ban.style.opacity = swap; head.style.opacity = 1;
      hf2.set(lt, swap);
      [[c1, tF], [c2, tL]].forEach(([c, t]) => {
        const k = prog(lt, t - 0.25, 0.5);
        c.querySelector('.pour').style.height = (k > 0 && k < 1 ? 220 : 0) + 'px';
        c.querySelector('.wine').setAttribute('opacity', Ease.outCubic(k));
        c.style.transform = `scale(${1 + 0.06 * Math.sin(Math.PI * k)})`;
      });
    };
  });

  // ───────────────────────── 5 · NADA MÁS ─────────────────────────
  scene('nada', (x) => {
    const r = x.root;
    const tA = at(x, 'all'), tG = at(x, 'gtexts'), tS = at(x, 'story'), tP = at(x, 'priests');
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:340px;height:760px;border-radius:28px;background:${C.papyrus};box-shadow:0 30px 70px rgba(0,0,0,.55);padding:40px 46px;box-sizing:border-box">
      <div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.14em;color:${C.oxblood}">${T.index}</div>
      ${T.rows.map((t, i) => `<div class="row" style="display:flex;align-items:center;gap:22px;margin-top:${i ? 22 : 34}px;font-size:40px;color:#1d1a17" class="serif"><span style="color:#2a7a6f;font-weight:900">✓</span><span class="serif" style="font-weight:700">${t}</span></div>`).join('')}
      ${[0, 1, 2].map(() => `<div class="empty" style="height:14px;border-radius:7px;background:#ddd2bb;margin-top:44px;width:520px"></div>`).join('')}
      <div class="pr" style="display:flex;align-items:center;gap:20px;margin-top:50px;font-size:38px;color:${C.oxblood}"><span class="mono" style="font-weight:700;letter-spacing:.1em">${T.priests}:</span><span class="display" style="font-size:56px;font-weight:900">—</span></div></div>`);
    const st = stamp(r, T.none, C.red, 290, 690, -8, 72);
    const read = add(r, `<div class="abs" style="left:0;right:0;top:1120px;text-align:center">${pill(T.read, C.papyrus, 'font-size:24px')}</div>`);
    x.cue(tS, 'stamp', 0.8); x.shake(tS, 10); x.cue(tP, 'buzz', 0.6);
    return (lt) => {
      popIn(card, lt, -0.1, 0.9);
      card.querySelectorAll('.row').forEach((rw, i) => { rw.style.opacity = appear(lt, 0.1 + i * 0.25, 0.3); });
      card.querySelectorAll('.empty').forEach((e, i) => { e.style.opacity = appear(lt, tG + i * 0.15, 0.3) * 0.9; });
      stampIn(st, lt, tS, -8);
      card.querySelector('.pr').style.opacity = appear(lt, tP - 0.1, 0.3);
      read.style.opacity = appear(lt, tG, 0.3);
    };
  });

  // ───────────────────────── 6 · ROMA: las vestales ─────────────────────────
  scene('roma', (x) => {
    const r = x.root;
    const tR = at(x, 'rome2'), tV = at(x, 'vesta'), tVs = at(x, 'vestals'), tN = at(x, 'numa'), tSa = at(x, 'salary'), tU = at(x, 'untouch');
    const ttl = big(r, 'ROMA'.replace('ROMA', T.rome), 330, 110, C.gold);
    const tmp = add(r, `<div class="abs" style="left:300px;top:470px">${TEMPLE(480)}</div>`);
    const vName = label(r, 'VESTA', 300, 880, 480, 34, C.papyrus);
    const fl = flame(r, { x: 540, y: 760, w: 100 });
    const ves = [0, 1, 2, 3].map((i) => add(r, `<div class="abs" style="left:${230 + i * 170}px;top:930px;width:70px;height:140px">${VEILED(C.papyrus)}</div>`));
    const vLbl = add(r, `<div class="abs" style="left:0;right:0;top:1090px;text-align:center">${pill(T.vestals, C.papyrus, 'font-size:26px')}</div>`);
    const badge = (icon, txt, left, color) => add(r, `<div class="abs" style="left:${left}px;top:490px;width:230px;text-align:center"><div style="width:110px;height:110px;margin:0 auto;color:${color}">${icon}</div><div class="mono" style="font-size:24px;font-weight:700;color:${color};margin-top:8px;letter-spacing:.06em">${txt}</div></div>`);
    const bS = badge(COIN, T.salary, 90, C.gold), bU = badge(SHIELD, T.untouch, 760, C.turquoise);
    const numa = add(r, `<div class="abs" style="left:0;right:0;top:440px;text-align:center">${pill(T.numa, C.muted, 'font-size:22px')}</div>`);
    x.cue(tR, 'gong', 0.5); x.cue(tVs, 'pop', 0.5); x.cue(tSa, 'ding', 0.5); x.cue(tU, 'stamp', 0.8); x.shake(tU, 8);
    return (lt) => {
      popIn(ttl, lt, tR - 0.25, 0.6); ttl.style.opacity = Math.min(1, +ttl.style.opacity) * (1 - appear(lt, tN - 0.2, 0.3));
      popIn(tmp, lt, tR, 0.8); vName.style.opacity = appear(lt, tV, 0.3);
      fl.set(lt, Ease.outBack(prog(lt, tV - 0.1, 0.4)));
      ves.forEach((v, i) => popIn(v, lt, tVs - 0.2 + i * 0.1, 0.5));
      vLbl.style.opacity = appear(lt, tVs + 0.2, 0.3);
      numa.style.opacity = appear(lt, tN - 0.1, 0.3);
      popIn(bS, lt, tSa - 0.1, 0.5); popIn(bU, lt, tU - 0.1, 0.5);
    };
  });

  // ───────────────────────── 7 · EL FUEGO DE TROYA ─────────────────────────
  scene('troya', (x) => {
    const r = x.root;
    const tT = at(x, 'troy2'), tG = at(x, 'ghost'), tA = at(x, 'aeneas'), tB = at(x, 'burns');
    const city = add(r, `<svg class="abs" style="left:560px;top:330px" width="420" height="330" viewBox="0 0 420 330"><defs><linearGradient id="burn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d0452c" stop-opacity=".9"/><stop offset="1" stop-color="#d0452c" stop-opacity="0"/></linearGradient></defs>
      <rect class="glow" x="0" y="40" width="420" height="290" fill="url(#burn)" opacity="0"/>
      <path d="M0 330 V200 H40 V150 H70 V200 H110 V120 H130 V90 H150 V120 H170 V210 H220 V160 H260 V210 H300 V130 H320 V100 H340 V130 H360 V220 H420 V330Z" fill="#140d08" stroke="${C.gold}" stroke-width="4"/></svg>`);
    const tLbl = label(r, T.troy, 560, 680, 420, 34, C.red);
    const R = rng(5);
    const embers = Array.from({ length: 18 }, () => ({ e: add(r, `<div class="abs" style="width:9px;height:9px;border-radius:50%;background:#ffb347;box-shadow:0 0 12px #f08a2c;opacity:0"></div>`), x: 580 + R() * 380, s: R() }));
    const ghost = add(r, `<div class="abs" style="left:640px;top:760px;width:90px;height:180px;filter:blur(1.5px);opacity:0">${human('#9fd9ff', false)}</div>`);
    const gL = label(r, T.hector, 560, 950, 260, 26, '#9fd9ff');
    const aen = add(r, `<div class="abs" style="left:430px;top:760px;width:90px;height:180px">${human(C.papyrus, false)}</div>`);
    const aL = label(r, T.aeneas, 345, 950, 260, 26, C.papyrus);
    const path = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1300"><path d="M475 740 Q300 560 200 900" fill="none" stroke="${C.gold}" stroke-width="6" stroke-dasharray="14 14" opacity="0"/></svg>`).querySelector('path');
    const rome = add(r, `<div class="abs" style="left:110px;top:910px;width:180px;text-align:center"><div style="width:22px;height:22px;margin:0 auto;border-radius:50%;background:${C.gold};box-shadow:0 0 20px ${C.gold}"></div><div class="mono" style="font-size:30px;font-weight:700;color:${C.gold};margin-top:8px;letter-spacing:.12em">${T.italy}</div></div>`);
    const fl = flame(r, { x: 0, y: 0, w: 70 });
    const src = add(r, `<div class="abs mono" style="left:110px;top:1110px;width:860px;text-align:center;font-size:22px;color:${C.muted}">${T.aen}</div>`);
    const P = (k) => { const a = [475, 740], c = [300, 560], b = [200, 900]; const u = 1 - k; return [u * u * a[0] + 2 * u * k * c[0] + k * k * b[0], u * u * a[1] + 2 * u * k * c[1] + k * k * b[1]]; };
    x.cue(tT, 'boom', 0.6); x.shake(tT, 10); x.cue(tG, 'rise', 0.5); x.cue(tA, 'ding', 0.5); x.cue(tB, 'whoosh', 0.8);
    return (lt) => {
      popIn(city, lt, -0.1, 0.8); city.querySelector('.glow').setAttribute('opacity', appear(lt, tT - 0.1, 0.4) * (0.8 + 0.2 * Math.sin(lt * 9)));
      tLbl.style.opacity = appear(lt, tT, 0.3);
      embers.forEach((m, i) => { const k = ((lt * 0.6 + m.s) % 1); m.e.style.opacity = lt > tT ? (1 - k) : 0; m.e.style.transform = `translate(${m.x + Math.sin(lt * 2 + i) * 20}px, ${640 - k * 320}px)`; });
      ghost.style.opacity = appear(lt, tG - 0.1, 0.4) * (0.65 + 0.15 * Math.sin(lt * 6)); gL.style.opacity = appear(lt, tG, 0.3);
      popIn(aen, lt, tA - 0.3, 0.5); aL.style.opacity = appear(lt, tA - 0.2, 0.3);
      // la llama: sale del fantasma, pasa a Eneas y viaja a Roma
      const hand = Ease.inOutCubic(prog(lt, tG + 0.2, tA - tG));
      const trip = Ease.inOutCubic(prog(lt, tB - 0.2, 0.9));
      let px = lerp(690, 475, hand), py = lerp(780, 740, hand);
      if (trip > 0) [px, py] = P(trip);
      fl.el.style.left = (px - 35) + 'px'; fl.el.style.top = (py - 98) + 'px';
      fl.set(lt, lt > tG ? 1 : 0);
      path.setAttribute('opacity', appear(lt, tB - 0.3, 0.3));
      popIn(rome, lt, tB - 0.3, 0.5); src.style.opacity = appear(lt, tA, 0.3);
    };
  });

  // ───────────────────────── 8 · LA MADRE DE RÓMULO ─────────────────────────
  scene('romulo', (x) => {
    const r = x.root;
    const tM = at(x, 'mother'), tR = at(x, 'romulus'), tRh = at(x, 'rhea'), tV = at(x, 'vestal');
    const node = (txt, cx, cy, w, color) => add(r, `<div class="abs" style="left:${cx - w / 2}px;top:${cy}px;width:${w}px;height:96px;border-radius:24px;background:${C.surface2};border:4px solid ${color};display:flex;align-items:center;justify-content:center"><span class="display" style="font-size:40px;font-weight:900;color:${C.ink}">${txt}</span></div>`);
    const mom = node(T.rhea, 540, 600, 460, C.papyrus);
    const veil = add(r, `<div class="abs" style="left:490px;top:400px;width:100px;height:190px">${VEILED(C.papyrus)}</div>`);
    const lines = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1300"><path d="M540 696 V780 M300 780 H780 M300 780 V850 M780 780 V850" stroke="${C.papyrus}" stroke-width="5" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`).querySelector('path');
    const rom = node(T.romulus, 300, 850, 340, C.gold), rem = node(T.remus, 780, 850, 340, C.lineStrong);
    const st = stamp(r, T.vestalB, C.red, 700, 470, 8, 54);
    const src = add(r, `<div class="abs mono" style="left:110px;top:1000px;width:860px;text-align:center;font-size:22px;color:${C.muted}">${T.livy}</div>`);
    x.cue(tR, 'pop', 0.6); x.cue(tRh, 'pop', 0.6); x.cue(tV, 'stamp', 0.9); x.shake(tV, 10);
    return (lt) => {
      popIn(rom, lt, tM - 0.2, 0.6); popIn(rem, lt, tM - 0.1, 0.6);
      rom.style.boxShadow = lt > tR ? `0 0 40px ${C.gold}` : 'none';
      lines.setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tR, 0.4)));
      popIn(mom, lt, tRh - 0.15, 0.6); popIn(veil, lt, tRh - 0.05, 0.5);
      stampIn(st, lt, tV - 0.05, 8); src.style.opacity = appear(lt, tV, 0.3);
    };
  });

  // ───────────────────────── 9 · VENN: misma función, cero mitos compartidos ─────────────────────────
  scene('venn', (x) => {
    const r = x.root;
    const tF = at(x, 'func'), tH = at(x, 'hearth'), tV = at(x, 'virgin'), tM = at(x, 'myth');
    const circ = (txt, color, cx) => add(r, `<div class="abs" style="left:${cx - 260}px;top:420px;width:520px;height:520px;border-radius:50%;border:6px solid ${color};background:${color}22;display:flex;align-items:flex-start;justify-content:center"><span class="display" style="margin-top:60px;font-size:52px;font-weight:900;color:${color}">${txt}</span></div>`);
    const cH = circ('HESTIA', C.gold, 540), cV = circ('VESTA', C.red, 540);
    const o1 = add(r, `<div class="abs mono" style="left:390px;width:300px;top:620px;text-align:center;font-size:30px;font-weight:700;color:${C.ink};opacity:0">${T.hearth}</div>`);
    const o2 = add(r, `<div class="abs mono" style="left:390px;width:300px;top:680px;text-align:center;font-size:30px;font-weight:700;color:${C.ink};opacity:0">${T.virgin}</div>`);
    const lO = add(r, `<div class="abs serif" style="left:100px;width:250px;top:740px;text-align:center;font-size:36px;font-style:italic;color:${C.papyrus};opacity:0">${T.lOnly}</div>`);
    const rO = add(r, `<div class="abs serif" style="left:730px;width:250px;top:720px;text-align:center;font-size:32px;font-style:italic;color:${C.papyrus};opacity:0">${T.rOnly}</div>`);
    const st = stamp(r, T.shared, C.red, 0, 990, -4, 52);
    st.style.left = '50%'; st.style.marginLeft = (EUREKA.lang === 'en' ? -250 : -320) + 'px';
    x.cue(tF, 'whoosh', 0.7); x.cue(tH, 'pop', 0.5); x.cue(tV, 'pop', 0.5); x.cue(tM, 'stamp', 0.9); x.shake(tM, 12);
    return (lt) => {
      const j = Ease.inOutCubic(prog(lt, tF - 0.4, 0.6));
      const d = lerp(320, 190, j);
      const showH = spring(lt, 0, 0.5), showV = spring(lt, 0.15, 0.5);
      cH.style.opacity = showH > 0 ? 1 : 0; cV.style.opacity = showV > 0 ? 1 : 0;
      cH.style.transform = `translateX(${-d}px) scale(${lerp(0.6, 1, showH)})`;
      cV.style.transform = `translateX(${d}px) scale(${lerp(0.6, 1, showV)})`;
      o1.style.opacity = appear(lt, tH - 0.1, 0.3); o2.style.opacity = appear(lt, tV - 0.1, 0.3);
      lO.style.opacity = appear(lt, tF + 0.2, 0.4); rO.style.opacity = appear(lt, tF + 0.35, 0.4);
      const k = prog(lt, tM - 0.05, 0.22); st.style.opacity = k > 0 ? 1 : 0; st.style.transform = `rotate(-4deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`;
    };
  });

  // ───────────────────────── 10 · ¿QUÉ TEXTO LO DICE? ─────────────────────────
  scene('moraleja', (x) => {
    const r = x.root;
    const tS = at(x, 'same'), tW = at(x, 'which'), tT = at(x, 'text');
    const q = big(r, T.which, 330, 104, C.gold);
    const c1 = add(r, `<div class="abs" style="left:110px;width:860px;top:600px;transform-origin:50% 0">${citation(T.cH[0], T.cH[1], C.gold, T.label)}</div>`);
    const c2 = add(r, `<div class="abs" style="left:110px;width:860px;top:870px;transform-origin:50% 0">${citation(T.cV[0], T.cV[1], C.red, T.label)}</div>`);
    x.cue(tW, 'stamp', 0.7); x.cue(tT + 0.25, 'swipe', 0.6); x.cue(tT + 0.55, 'swipe', 0.5);
    return (lt) => {
      popIn(q, lt, Math.min(tS, tW - 0.6), 0.6);
      [[c1, tT + 0.15], [c2, tT + 0.45]].forEach(([c, t]) => { const k = Ease.outCubic(prog(lt, t, 0.45)); c.style.opacity = k > 0 ? 1 : 0; c.style.transform = `scaleY(${lerp(0.05, 1, k)})`; });
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: T.endSub }));

  // rng local (EUREKA.ui.rng está disponible, pero lo tomamos aquí para no depender del orden de carga)
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
})();
