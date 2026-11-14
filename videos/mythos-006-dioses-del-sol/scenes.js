/* MYTHOS #06 · "4 dioses del sol… y solo 3 son el sol" / "4 sun gods… and only 3 are the sun"
 * Versiones: es (este directorio) y en (videos/mythos-006-dioses-del-sol-en, comparte este archivo vía "scenesFile").
 * Todo texto en pantalla y cada palabra de sincronización x.at() sale del diccionario T según EUREKA.lang.
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/sun-gods-compared c1: Helios hijo de Hiperión (Theog. 371–374), carro y casco de oro (HH31 1–16),
 *    "que todo lo ve y todo lo oye" (Od. 12.320–323; Il. 3.276–277); amenaza con "bajar al Hades y brillar
 *    entre los muertos" cuando se comen sus vacas (Od. 12.374–388).
 *  - c2: Apolo no es el sol en Homero, Hesíodo ni los Himnos: arquero nacido en Delos junto a una palmera
 *    (HH3), flechas de peste (Il. 1.43–52), oráculo de Pito/Delfos.
 *  - c3: Sol es Helios en latín; en el palacio del Sol, Ovidio llama Febo al padre de Faetonte (Met. 2.1–102),
 *    el nombre que Homero da a Apolo (Il. 1.43): "el poeta latino funde lo que los griegos separan".
 *  - c4: Ra, "rey de los dioses", Khepera por la mañana, Ra al mediodía, Temu por la tarde (Budge cap. VII);
 *    cada noche cruza la Tuat en su barca (Libro del Am Tuat, Budge cap. XV).
 *  - takeaways: "¿quién lo ve todo? (Helios, Sol) ¿quién lo gobierna todo? (Ra) — Apolo no responde a ninguna".
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, popIn, eye, human, citation, mythosEndCard } = EUREKA.ui;

  const TT = {
    es: {
      kw: ['sol', 'tres', 'apolo', 'helios', 'muertos', 'febo', 'mezclan', 'rey', 'ninguno', 'texto'],
      a: { four: ['cuatro'], textos: ['textos'], tres: ['tres'], sunEnd: ['sol', 2], griego: ['griego'], apolo: ['apolo'],
        homero: ['homero'], himnos: ['himnos'], arquero: ['arquero'], delos: ['delos'], delfos: ['delfos'], no: ['no'],
        helios: ['helios'], hiperion: ['hiperion'], cruza: ['cruza'], carro: ['carro'], ve: ['ve'], oye: ['oye'],
        odiseo: ['odiseo'], comen: ['comen'], vacas: ['vacas'], amenaza: ['amenaza'], bajar: ['bajar'], muertos: ['muertos'],
        sol: ['sol'], latin: ['latin'], ovidio: ['ovidio'], febo: ['febo'], apolo2: ['apolo'], mezclan: ['mezclan'],
        ra: ['ra'], rey: ['rey'], noche: ['noche'], inframundo: ['inframundo'], barca: ['barca'],
        rVe: ['ve'], rHelios: ['helios'], rSol: ['sol'], gobierna: ['gobierna'], rRa: ['ra'], rApolo: ['apolo'], ninguno: ['ninguno'],
        pregunta: ['pregunta'], que: ['que'], texto: ['texto'] },
      kicker: 'GRECIA · ROMA · EGIPTO', names: ['HELIOS', 'APOLO', 'SOL', 'RA'], lands: ['GRECIA', 'GRECIA', 'ROMA', 'EGIPTO'],
      quizQ: '¿Dios griego<br>del sol?', usual: 'la respuesta de siempre',
      apHead: 'APOLO en Homero y los Himnos', tiles: [['ARQUERO', 'sus flechas traen la peste · Ilíada 1'], ['DELOS', 'nace junto a una palmera · Himno a Apolo'], ['DELFOS', 'el dios del oráculo']],
      notSun: 'NO ES EL SOL', son: 'hijo de Hiperión', seesAll: 'LO VE TODO', hearsAll: 'LO OYE TODO',
      odyssey: 'ODISEA 12', hades: 'HADES', amongDead: 'BRILLAR ENTRE LOS MUERTOS',
      greek: 'griego', latin: 'latín', ovid: 'Ovidio · Metamorfosis 2', homerTag: 'Homero · Ilíada 1', blend: 'AHÍ SE MEZCLAN',
      king: 'REY DE LOS DIOSES', forms: [['KHEPERA', 'mañana'], ['RA', 'mediodía'], ['TEMU', 'tarde']], tuat: 'TUAT · el inframundo',
      q1: '¿Quién lo ve todo?', q2: '¿Quién lo gobierna todo?', none: 'NINGUNO',
      which: '¿QUÉ TEXTO<br>LO DICE?', citeTitle: 'Himnos homéricos, Homero y Ovidio',
      cite: ['Himno a Helios · Odisea 12 · Ilíada 1 y 3', 'Ovidio, Metamorfosis 2 · Budge (1914), cap. VII', 'ficha: mythosdata.dev/k/sun-gods-compared'],
      scrolls: ['Himno 31', 'Odisea 12', 'Ovidio'],
      endSub: 'griegos · romanos · nórdicos · egipcios · con su fuente',
    },
    en: {
      kw: ['sun', 'three', 'apollo', 'helios', 'dead', 'phoebus', 'blend', 'king', 'neither', 'text'],
      a: { four: ['four'], textos: ['texts'], tres: ['three'], sunEnd: ['sun', 1], griego: ['greek'], apolo: ['apollo'],
        homero: ['homer'], himnos: ['hymns'], arquero: ['archer'], delos: ['delos'], delfos: ['delphi'], no: ['not'],
        helios: ['helios'], hiperion: ['hyperion'], cruza: ['crosses'], carro: ['chariot'], ve: ['sees'], oye: ['hears'],
        odiseo: ['odysseus'], comen: ['eat'], vacas: ['cattle'], amenaza: ['threatens'], bajar: ['down'], muertos: ['dead'],
        sol: ['sol'], latin: ['latin'], ovidio: ['ovid'], febo: ['phoebus'], apolo2: ['apollo'], mezclan: ['blend'],
        ra: ['ra'], rey: ['king'], noche: ['night'], inframundo: ['underworld'], barca: ['boat'],
        rVe: ['sees'], rHelios: ['helios'], rSol: ['sol'], gobierna: ['rules'], rRa: ['ra'], rApolo: ['apollo'], ninguno: ['neither'],
        pregunta: ['ask'], que: ['which'], texto: ['text'] },
      kicker: 'GREECE · ROME · EGYPT', names: ['HELIOS', 'APOLLO', 'SOL', 'RA'], lands: ['GREECE', 'GREECE', 'ROME', 'EGYPT'],
      quizQ: 'Greek god<br>of the sun?', usual: 'the usual answer',
      apHead: 'APOLLO in Homer and the Hymns', tiles: [['ARCHER', 'his arrows bring the plague · Iliad 1'], ['DELOS', 'born beside a palm tree · Hymn to Apollo'], ['DELPHI', 'the god of the oracle']],
      notSun: 'NOT THE SUN', son: 'son of Hyperion', seesAll: 'SEES ALL', hearsAll: 'HEARS ALL',
      odyssey: 'ODYSSEY 12', hades: 'HADES', amongDead: 'SHINE AMONG THE DEAD',
      greek: 'Greek', latin: 'Latin', ovid: 'Ovid · Metamorphoses 2', homerTag: 'Homer · Iliad 1', blend: 'THEY BLEND',
      king: 'KING OF THE GODS', forms: [['KHEPERA', 'morning'], ['RA', 'noon'], ['TEMU', 'evening']], tuat: 'TUAT · the underworld',
      q1: 'Who sees everything?', q2: 'Who rules everything?', none: 'NEITHER',
      which: 'WHICH TEXT<br>SAYS SO?', citeTitle: 'The Homeric Hymns, Homer and Ovid',
      cite: ['Hymn to Helios · Odyssey 12 · Iliad 1 and 3', 'Ovid, Metamorphoses 2 · Budge (1914), ch. VII', 'entry: mythosdata.dev/k/sun-gods-compared'],
      scrolls: ['Hymn 31', 'Odyssey 12', 'Ovid'],
      endSub: 'Greek · Roman · Norse · Egyptian · with sources',
    },
  };
  const T = TT[EUREKA.lang] || TT.es;
  const at = (x, k) => x.at(T.a[k][0], T.a[k][1] || 0);

  EUREKA.video = { keywords: T.kw };

  // ───────── utilidades locales ─────────
  const kicker = (r, txt, color = C.gold, top = 318) => add(r, `<div class="abs mono" style="left:110px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.16em;color:${color}">${txt}</div>`);
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.06em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.6);white-space:nowrap">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };
  const css = (e, o) => { for (const k in o) e.style[k] = o[k]; };
  const recolor = (el, col) => el.querySelectorAll('circle,path').forEach((n) => { n.setAttribute('stroke', col); if (n.tagName === 'circle') n.setAttribute('fill', col); });

  // Iconos propios del episodio
  const SUNI = (col = C.gold, core = '#ffd36b') => `<svg viewBox="0 0 100 100"><g stroke="${col}" stroke-width="6" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${50 + Math.cos(a) * 34}" y1="${50 + Math.sin(a) * 34}" x2="${50 + Math.cos(a) * 46}" y2="${50 + Math.sin(a) * 46}"/>`; }).join('')}</g><circle cx="50" cy="50" r="26" fill="${core}" stroke="${col}" stroke-width="4"/></svg>`;
  const BOW = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 Q50 32 18 58"/><path d="M18 6 L18 58" stroke-width="2"/><path d="M8 32 H58 M50 25 L58 32 L50 39"/></svg>`;
  const PALM = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><path d="M32 60 Q29 42 33 22"/><path d="M33 22 q-14 -8 -25 3 M33 22 q14 -8 25 3 M33 22 q-6 -14 -19 -15 M33 22 q6 -14 19 -15"/></svg>`;
  const TRIPOD = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22 Q32 34 50 22 Z"/><path d="M20 26 L12 58 M44 26 L52 58 M32 30 V58"/><path d="M26 16 q2 -6 0 -10 M38 16 q2 -6 0 -10" stroke-width="3"/></svg>`;
  const COW = (col) => `<svg viewBox="0 0 70 48" fill="${col}"><rect x="6" y="14" width="44" height="20" rx="9"/><rect x="48" y="9" width="14" height="14" rx="4"/><path d="M50 9 l-4 -7 M60 9 l4 -7" stroke="${col}" stroke-width="3" stroke-linecap="round"/><rect x="10" y="30" width="5" height="15" rx="2"/><rect x="20" y="30" width="5" height="15" rx="2"/><rect x="34" y="30" width="5" height="15" rx="2"/><rect x="43" y="30" width="5" height="15" rx="2"/></svg>`;
  const BOAT = `<svg viewBox="0 0 220 90" fill="none" stroke="${C.gold}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 52 Q110 92 200 52 Q178 64 110 66 Q42 64 20 52 Z" fill="${C.oxblood}"/><path d="M20 52 q-12 -20 4 -34 M200 52 q12 -20 -4 -34"/><path d="M80 56 V40 M140 56 V40"/><path d="M70 40 H150" /></svg>`;
  const CROWN = `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M8 50 L12 18 L24 32 L32 10 L40 32 L52 18 L56 50 Z"/><rect x="8" y="52" width="48" height="6" rx="2"/></svg>`;

  // ───────────────────────── 1 · HOOK: cuatro soles ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const k = kicker(r, T.kicker);
    const cells = T.names.map((n, i) => {
      const cx = 300 + (i % 2) * 480, cy = 560 + Math.floor(i / 2) * 400;
      const el = add(r, `<div class="abs" style="left:${cx - 190}px;top:${cy - 190}px;width:380px;height:380px;display:flex;flex-direction:column;align-items:center">
        <div class="sun" style="width:230px;height:230px">${SUNI()}</div>
        <div class="display" style="font-size:62px;font-weight:900;color:${C.ink};margin-top:6px">${n}</div>
        <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.14em;color:${C.muted}">${T.lands[i]}</div></div>`);
      const q = add(r, `<div class="abs display" style="left:${cx - 60}px;top:${cy - 170}px;width:120px;text-align:center;font-size:190px;font-weight:900;color:${C.red};opacity:0;text-shadow:0 0 40px rgba(208,69,44,.7)">?</div>`);
      return { el, q, i };
    });
    const tF = at(x, 'four'), tT = at(x, 'tres'), tS = at(x, 'sunEnd');
    x.cue(0.05, 'gong', 0.5); cells.forEach((_, i) => x.cue(tF + 0.1 + i * 0.16, 'pop', 0.5));
    x.cue(tT, 'buzz', 0.7); x.shake(tT, 10); x.cue(tS, 'ding', 0.5);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      cells.forEach((c) => {
        popIn(c.el, lt, tF + c.i * 0.16, 0.4);
        const sun = c.el.querySelector('.sun');
        const odd = c.i === 1, off = prog(lt, tT - 0.05, 0.3);
        sun.style.transform = `rotate(${lt * (odd ? 8 : 20)}deg) scale(${1 + (!odd && lt > tT ? 0.06 * Math.sin(lt * 6 + c.i) : 0)})`;
        sun.style.filter = odd ? `grayscale(${off}) brightness(${1 - off * 0.55})` : `drop-shadow(0 0 ${lt > tT ? 40 : 14}px rgba(255,211,107,.7))`;
        if (odd) { const q = popIn(c.q, lt, tT, 0.4); c.q.style.transform += ` rotate(${Math.sin(lt * 5) * 6 * (q >= 1 ? 1 : 0)}deg)`; }
      });
    };
  });

  // ───────────────────────── 2 · QUIZ: la respuesta de siempre ─────────────────────────
  scene('quiz', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:340px;border-radius:30px;background:${C.papyrus};padding:44px 46px 40px;box-sizing:border-box;box-shadow:0 30px 80px rgba(0,0,0,.55)">
      <div class="display" style="font-size:78px;font-weight:900;color:#1d1a17;line-height:1.05">${T.quizQ}</div>
      <div class="oA" style="margin-top:36px;display:flex;align-items:center;gap:24px;padding:22px 30px;border-radius:22px;border:4px solid #e0d6c2;background:#fff"><span class="mono" style="font-size:34px;color:#6b6259">A</span><span class="display" style="font-size:54px;font-weight:900;color:#1d1a17">HELIOS</span></div>
      <div class="oB" style="margin-top:20px;display:flex;align-items:center;gap:24px;padding:22px 30px;border-radius:22px;border:4px solid #e0d6c2;background:#fff"><span class="mono" style="font-size:34px;color:#6b6259">B</span><span class="display" style="flex:1;font-size:54px;font-weight:900;color:#1d1a17">${T.names[1]}</span><span class="ck display" style="font-size:54px;color:${C.bg};opacity:0">✓</span></div>
      <div class="us mono" style="margin-top:22px;font-size:24px;font-weight:700;color:${C.oxblood};letter-spacing:.08em;opacity:0;text-align:right">${T.usual} ↑</div></div>`);
    const cur = add(r, `<div class="abs" style="left:0;top:0;width:90px;height:90px">${I.cursor}</div>`);
    const tA = at(x, 'apolo');
    x.cue(tA, 'pop', 0.8); x.cue(tA + 0.05, 'ding', 0.35);
    return (lt) => {
      popIn(card, lt, -0.05, 0.85);
      const m = Ease.inOutCubic(prog(lt, 0.6, tA - 0.6));
      css(cur, { transform: `translate(${lerp(900, 760, m)}px, ${lerp(1150, 830, m)}px) scale(${lt > tA && lt < tA + 0.15 ? 0.85 : 1})`, opacity: appear(lt, 0.4, 0.3) });
      const on = lt > tA;
      const b = card.querySelector('.oB');
      b.style.background = on ? C.gold : '#fff'; b.style.borderColor = on ? C.gold : '#e0d6c2';
      b.style.transform = `scale(${on ? 1 + 0.05 * Math.exp(-(lt - tA) * 6) : 1})`;
      card.querySelector('.ck').style.opacity = on ? 1 : 0;
      card.querySelector('.us').style.opacity = appear(lt, tA + 0.3, 0.3);
    };
  });

  // ───────────────────────── 3 · APOLO: arquero, Delos, Delfos ─────────────────────────
  scene('apolo', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:110px;top:330px;width:860px"><div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.14em;color:${C.gold}">${T.apHead.toUpperCase()}</div></div>`);
    const icons = [BOW, PALM, TRIPOD], cols = [C.red, C.turquoise, C.violet];
    const tiles = T.tiles.map(([a, b], i) => add(r, `<div class="abs" style="left:110px;width:860px;top:${400 + i * 150}px;height:130px;border-radius:26px;background:${C.surface2};border:3px solid ${cols[i]};display:flex;align-items:center;gap:26px;padding:0 28px;box-sizing:border-box">
        <div style="width:84px;height:84px;color:${cols[i]};flex:none">${icons[i]}</div>
        <div><div class="display" style="font-size:52px;font-weight:900;color:${C.ink};line-height:1">${a}</div><div class="mono" style="font-size:22px;font-weight:500;color:${C.muted};margin-top:6px">${b}</div></div></div>`));
    const sun = add(r, `<div class="abs" style="left:400px;top:870px;width:280px;height:280px">${SUNI(C.faint, '#4a3a29')}<svg class="abs" viewBox="0 0 100 100" style="left:0;top:0;width:100%;height:100%"><path class="x" d="M14 86 L86 14" stroke="${C.red}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg></div>`);
    const st = stamp(r, T.notSun, C.red, 240, 960, -8, 76);
    const ts = [at(x, 'arquero'), at(x, 'delos'), at(x, 'delfos')], tN = at(x, 'no');
    ts.forEach((t, i) => x.cue(t - 0.05, i === 0 ? 'swipe' : 'pop', 0.6));
    x.cue(tN, 'stamp', 0.9); x.shake(tN, 12);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      tiles.forEach((t, i) => { const s = popIn(t, lt, ts[i] - 0.2, 0.6); t.style.transform += ` translateX(${(1 - Math.min(1, s)) * -80}px)`; });
      popIn(sun, lt, tN - 0.6, 0.5);
      sun.firstElementChild.style.transform = `rotate(${lt * 10}deg)`;
      sun.querySelector('.x').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tN - 0.1, 0.25)));
      stampIn(st, lt, tN + 0.05, -8);
    };
  });

  // ───────────────────────── 4 · HELIOS: el carro y el ojo que todo lo ve ─────────────────────────
  scene('helios', (x) => {
    const r = x.root;
    const A0 = [140, 960], A1 = [940, 960], R = 400, CX = 540, CY = 960;
    const arc = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><path d="M${A0[0]} ${CY} A ${R} ${R} 0 0 1 ${A1[0]} ${CY}" fill="none" stroke="${C.gold}" stroke-width="5" stroke-dasharray="14 16" opacity=".55"/><line x1="90" y1="${CY}" x2="990" y2="${CY}" stroke="${C.lineStrong}" stroke-width="4"/></svg>`);
    const sun = add(r, `<div class="abs" style="left:0;top:0;width:220px;height:220px"><div class="s" style="width:100%;height:100%">${SUNI()}</div></div>`);
    const E = eye(sun, { x: 55, y: 74, w: 110, iris: C.gold });
    const wheel = add(r, `<div class="abs" style="left:0;top:0;width:90px;height:90px;color:${C.gold}">${I.wheel}</div>`);
    const trail = Array.from({ length: 10 }, () => add(r, `<div class="abs" style="width:26px;height:26px;border-radius:50%;background:#ffd36b;opacity:0"></div>`));
    const plate = add(r, `<div class="abs" style="left:110px;width:860px;top:1030px;text-align:center"><span class="display" style="font-size:96px;font-weight:900;color:${C.ink}">HELIOS</span><span class="serif" style="font-size:44px;font-style:italic;color:${C.papyrus};margin-left:22px">${T.son}</span></div>`);
    const pv = add(r, `<div class="abs" style="left:150px;top:350px">${pill('👁 ' + T.seesAll, C.gold, 'font-size:28px')}</div>`);
    const po = add(r, `<div class="abs" style="left:590px;top:350px">${pill('◎ ' + T.hearsAll, C.turquoise, 'font-size:28px')}</div>`);
    const tH = at(x, 'helios'), tHi = at(x, 'hiperion'), tC = at(x, 'cruza'), tV = at(x, 've'), tO = at(x, 'oye');
    x.cue(tH, 'gong', 0.5); x.cue(tC, 'whoosh', 0.9); x.cue(tV, 'ding', 0.45); x.cue(tO, 'ding', 0.35);
    const pos = (k) => { const a = Math.PI - k * Math.PI; return [CX + Math.cos(a) * R, CY - Math.sin(a) * R]; };
    return (lt) => {
      arc.style.opacity = appear(lt, 0, 0.4);
      const k = Ease.inOutCubic(prog(lt, tC - 0.2, x.dur - tC + 0.1)) * 0.92 + 0.04;
      const [sx, sy] = pos(k);
      const s = popIn(sun, lt, tH - 0.3, 0.4);
      sun.style.transform = `translate(${sx - 110}px, ${sy - 110}px) scale(${Math.max(0.4, s)})`;
      sun.querySelector('.s').style.transform = `rotate(${lt * 30}deg)`;
      sun.querySelector('.s').style.filter = `drop-shadow(0 0 ${30 + 12 * Math.sin(lt * 4)}px rgba(255,211,107,.8))`;
      E.set({ draw: prog(lt, tV - 0.15, 0.35), glow: 0.2, look: Math.sin(lt * 3) * 0.8 });
      E.el.style.opacity = lt > tV - 0.2 ? 1 : 0;
      wheel.style.opacity = appear(lt, tC, 0.3) * Math.min(1, Math.max(0, (Math.min(k, 1 - k) - 0.1) / 0.08));
      wheel.style.transform = `translate(${sx - 45}px, ${sy + 100}px) rotate(${lt * 400}deg)`;
      trail.forEach((d, i) => { const kk = Math.max(0.04, k - (i + 1) * 0.018); const [tx, ty] = pos(kk); d.style.opacity = lt > tC ? (0.5 - i * 0.045) : 0; d.style.transform = `translate(${tx - 13}px, ${ty - 13}px) scale(${1 - i * 0.07})`; });
      plate.style.opacity = appear(lt, tH, 0.3);
      plate.lastElementChild.style.opacity = appear(lt, tHi, 0.3);
      popIn(pv, lt, tV - 0.1, 0.5); popIn(po, lt, tO - 0.1, 0.5);
    };
  });

  // ───────────────────────── 5 · LAS VACAS DE HELIOS ─────────────────────────
  scene('vacas', (x) => {
    const r = x.root;
    const HZ = 820;
    const under = add(r, `<div class="abs" style="left:0;right:0;top:${HZ}px;height:${1180 - HZ}px;background:linear-gradient(#1b1430,#0a0712);border-top:4px solid ${C.lineStrong}"></div>`);
    const hl = add(r, `<div class="abs display" style="left:110px;top:${HZ + 20}px;font-size:40px;font-weight:900;letter-spacing:.2em;color:${C.violet};opacity:.8">${T.hades}</div>`);
    const R = rng(6);
    const ghosts = Array.from({ length: 9 }, (_, i) => ({ el: add(r, `<div class="abs" style="left:${150 + i * 90}px;top:${HZ + 110 + (i % 3) * 50}px;width:40px;height:80px;opacity:.25">${human('#6c5a9c')}</div>`), d: R() }));
    const cows = [];
    for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) cows.push({ el: add(r, `<div class="abs" style="left:${130 + i * 140 + (row % 2) * 40}px;top:${520 + row * 92}px;width:110px;height:76px">${COW(C.papyrus)}</div>`), d: R() });
    const sun = add(r, `<div class="abs" style="left:430px;top:330px;width:220px;height:220px"><div class="s" style="width:100%;height:100%">${SUNI()}</div></div>`);
    const src = add(r, `<div class="abs" style="left:110px;top:330px">${pill(T.odyssey, C.papyrus, 'font-size:24px')}</div>`);
    const shine = add(r, `<div class="abs" style="left:0;right:0;top:${HZ + 300}px;text-align:center;opacity:0">${pill(T.amongDead, C.gold, 'font-size:30px')}</div>`);
    const tCo = at(x, 'comen'), tA = at(x, 'amenaza'), tB = at(x, 'bajar'), tM = at(x, 'muertos');
    for (let i = 0; i < 6; i++) x.cue(tCo + i * 0.12, 'pop', 0.4);
    x.cue(tA, 'buzz', 0.7); x.shake(tA, 12); x.cue(tB, 'rise', 0.6); x.cue(tM, 'boom', 0.8); x.shake(tM, 14);
    return (lt) => {
      src.style.opacity = appear(lt, 0, 0.3);
      cows.forEach((c, i) => {
        popIn(c.el, lt, 0.05 + i * 0.03, 0.5, 0.3);
        const eat = prog(lt, tCo + c.d * 0.9, 0.2);
        if (eat > 0) { c.el.style.opacity = (1 - eat).toFixed(2); c.el.style.transform = `scale(${1 + eat * 0.4})`; recolor(c.el, C.red); c.el.querySelectorAll('rect').forEach((n) => n.setAttribute('fill', C.red)); }
      });
      const angry = prog(lt, tA - 0.1, 0.3);
      const down = Ease.inOutCubic(prog(lt, tB - 0.1, tM - tB + 0.3));
      sun.style.transform = `translateY(${down * (HZ + 40 - 330)}px) translateX(${angry > 0 && down < 0.1 ? Math.sin(lt * 40) * 6 : 0}px)`;
      sun.querySelector('.s').style.transform = `rotate(${lt * 30}deg)`;
      sun.querySelector('.s').style.filter = `hue-rotate(${-angry * 30}deg) saturate(${1 + angry}) drop-shadow(0 0 ${30 + down * 40}px ${angry > 0.5 ? 'rgba(208,69,44,.9)' : 'rgba(255,211,107,.8)'})`;
      under.style.background = `linear-gradient(rgba(${lerp(27, 120, down)},${lerp(20, 80, down)},${lerp(48, 30, down)},1), #0a0712)`;
      ghosts.forEach((g) => { const lit = prog(lt, tM - 0.2 + g.d * 0.4, 0.3); g.el.style.opacity = (0.25 + lit * 0.75).toFixed(2); recolor(g.el, lit > 0.5 ? '#ffd36b' : '#6c5a9c'); });
      hl.style.opacity = 0.5 + 0.5 * appear(lt, tB, 0.3);
      shine.style.opacity = appear(lt, tM + 0.15, 0.3);
    };
  });

  // ───────────────────────── 6 · FEBO: donde se mezclan los nombres ─────────────────────────
  scene('febo', (x) => {
    const r = x.root;
    const tag = (txt, sub, col, l, t, w = 380) => add(r, `<div class="abs" style="left:${l}px;top:${t}px;width:${w}px;height:150px;border-radius:26px;background:${C.surface2};border:4px solid ${col};display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box">
        <div class="nm display" style="font-size:60px;font-weight:900;color:${C.ink};line-height:1">${txt}</div><div class="mono" style="font-size:22px;font-weight:700;color:${col};letter-spacing:.12em;margin-top:8px">${sub}</div></div>`);
    const tHe = tag('HELIOS', T.greek.toUpperCase(), C.gold, 110, 340);
    const eq = add(r, `<div class="abs display" style="left:490px;top:360px;width:100px;text-align:center;font-size:100px;font-weight:900;color:${C.ink}">=</div>`);
    const tSo = tag('SOL', T.latin.toUpperCase(), C.amber, 590, 340);
    const book = add(r, `<div class="abs" style="left:560px;top:510px;width:420px;text-align:center;white-space:nowrap">${pill(T.ovid, C.papyrus, 'font-size:21px')}</div>`);
    const febo = add(r, `<div class="abs display" style="left:580px;top:590px;width:400px;text-align:center;font-size:56px;font-weight:900;color:${C.gold};font-style:italic">«FEBO»</div>`);
    if (EUREKA.lang === 'en') febo.textContent = '“PHOEBUS”';
    const tAp = tag(T.names[1], T.homerTag.toUpperCase(), C.lapis, 110, 640, 440);
    const line = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><path d="M640 640 C 600 700, 580 715, 552 715" fill="none" stroke="${C.gold}" stroke-width="6" stroke-dasharray="1" pathLength="1" stroke-dashoffset="1"/></svg>`);
    const bl = add(r, `<div class="abs" style="left:0;top:830px;width:1080px;height:300px;filter:blur(2px)"><div class="c1 abs" style="width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#ffd36b,#d9a94a 70%);mix-blend-mode:screen;opacity:.9"></div><div class="c2 abs" style="width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#7fa7e8,#2f5fa8 70%);mix-blend-mode:screen;opacity:.9"></div></div>`);
    const blT = add(r, `<div class="abs" style="left:0;right:0;top:1100px;text-align:center"></div>`);
    const st = stamp(r, T.blend, C.gold, EUREKA.lang === 'en' ? 290 : 250, 905, -5, 62);
    const tS = at(x, 'sol'), tL = at(x, 'latin'), tO = at(x, 'ovidio'), tF = at(x, 'febo'), tH = at(x, 'homero'), tA = at(x, 'apolo2'), tM = at(x, 'mezclan');
    x.cue(tS, 'pop', 0.6); x.cue(tL, 'ding', 0.4); x.cue(tO, 'swipe', 0.6); x.cue(tF, 'stamp', 0.6); x.cue(tA, 'pop', 0.6); x.cue(tM - 0.4, 'rise', 0.5); x.cue(tM, 'boom', 0.7); x.shake(tM, 10);
    return (lt) => {
      popIn(tHe, lt, -0.1, 0.6); popIn(tSo, lt, tS - 0.15, 0.6);
      eq.style.opacity = appear(lt, tL - 0.1, 0.25);
      book.style.opacity = appear(lt, tO - 0.1, 0.3);
      const f = popIn(febo, lt, tF - 0.1, 0.4);
      popIn(tAp, lt, tH - 0.2, 0.6);
      line.querySelector('path').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tA - 0.2, 0.4)));
      const mk = Ease.inOutCubic(prog(lt, tM - 0.6, 0.7));
      const c1 = bl.querySelector('.c1'), c2 = bl.querySelector('.c2');
      bl.style.opacity = appear(lt, tA + 0.2, 0.4);
      c1.style.transform = `translate(${lerp(180, 330, mk)}px, 10px)`; c2.style.transform = `translate(${lerp(640, 490, mk)}px, 10px)`;
      stampIn(st, lt, tM + 0.1, -5);
      tSo.style.boxShadow = f >= 1 ? `0 0 40px ${C.gold}66` : 'none';
    };
  });

  // ───────────────────────── 7 · RA: el rey y la barca nocturna ─────────────────────────
  scene('ra', (x) => {
    const r = x.root;
    const HZ = 800;
    const night = add(r, `<div class="abs" style="left:0;right:0;top:0;bottom:0;background:#05040a;opacity:0"></div>`);
    const tuat = add(r, `<div class="abs" style="left:90px;right:90px;top:${HZ}px;height:330px;border-radius:30px;background:linear-gradient(#1c1430,#0b0816);border:3px solid ${C.lineStrong};overflow:hidden">
        <div class="glyphs" style="position:absolute;left:30px;right:30px;top:24px;font-size:52px;letter-spacing:.3em;color:${C.gold};opacity:.18;white-space:nowrap;overflow:hidden">𓇳 𓁹 𓆣 𓋹 𓇳 𓂀 𓆣 𓋹 𓇳</div>
        <div class="mono" style="position:absolute;left:30px;bottom:22px;font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.violet}">${T.tuat.toUpperCase()}</div></div>`);
    const forms = T.forms.map(([a, b], i) => add(r, `<div class="abs" style="left:${130 + i * 290}px;top:${640 - (i === 1 ? 70 : 0)}px;width:240px;text-align:center"><div class="display" style="font-size:40px;font-weight:900;color:${i === 1 ? C.gold : C.papyrus}">${a}</div><div class="mono" style="font-size:20px;color:${C.muted}">${b}</div></div>`));
    const sun = add(r, `<div class="abs" style="left:430px;top:330px;width:220px;height:220px"><div class="s" style="width:100%;height:100%">${SUNI()}</div></div>`);
    const crown = add(r, `<div class="abs" style="left:480px;top:250px;width:120px;height:120px;color:${C.gold};opacity:0">${CROWN}</div>`);
    const name = add(r, `<div class="abs" style="left:110px;top:400px;width:300px"><div class="display" style="font-size:110px;font-weight:900;color:${C.ink};line-height:1">RA</div><div class="kg mono" style="font-size:22px;font-weight:700;letter-spacing:.12em;color:${C.gold};opacity:0">${T.king}</div></div>`);
    const boat = add(r, `<div class="abs" style="left:0;top:${HZ + 140}px;width:300px;height:123px"><div class="abs" style="left:100px;top:-70px;width:100px;height:100px">${SUNI()}</div>${BOAT}</div>`);
    const tR = at(x, 'ra'), tK = at(x, 'rey'), tN = at(x, 'noche'), tI = at(x, 'inframundo'), tB = at(x, 'barca');
    x.cue(tR, 'gong', 0.5); x.cue(tK, 'stamp', 0.6); x.cue(tN, 'whoosh', 0.8); x.cue(tB, 'drum', 0.7);
    return (lt) => {
      popIn(sun, lt, -0.1, 0.5);
      sun.querySelector('.s').style.transform = `rotate(${lt * 25}deg)`;
      name.style.opacity = appear(lt, tR - 0.1, 0.3);
      name.querySelector('.kg').style.opacity = appear(lt, tK, 0.3);
      popIn(crown, lt, tK - 0.1, 0.4);
      forms.forEach((f, i) => { f.style.opacity = appear(lt, 1.0 + i * 0.25, 0.3) * (1 - appear(lt, tN, 0.4) * 0.6); });
      const nk = appear(lt, tN - 0.1, 0.5);
      night.style.opacity = nk * 0.55;
      sun.style.transform = `translateY(${nk * 600}px) scale(${1 - nk * 0.4})`; sun.style.opacity = 1 - nk;
      crown.style.opacity = Math.min(+crown.style.opacity || 0, 1 - nk);
      popIn(tuat, lt, tN - 0.3, 0.7);
      const bk = prog(lt, tI - 0.3, x.dur - tI + 0.3);
      boat.style.opacity = appear(lt, tI - 0.3, 0.3);
      boat.style.transform = `translate(${lerp(820, 60, bk)}px, ${Math.sin(lt * 3) * 8}px)`;
    };
  });

  // ───────────────────────── 8 · LA REGLA: ver todo / gobernar todo ─────────────────────────
  scene('regla', (x) => {
    const r = x.root;
    const row = (q, icon, col, top) => add(r, `<div class="abs" style="left:110px;width:860px;top:${top}px;border-radius:28px;background:${C.surface2};border:3px solid ${col};padding:24px 30px;box-sizing:border-box">
        <div style="display:flex;align-items:center;gap:20px"><div style="width:64px;height:64px;color:${col}">${icon}</div><div class="display" style="font-size:48px;font-weight:900;color:${C.ink}">${q}</div></div>
        <div class="chips" style="display:flex;gap:18px;margin-top:20px;min-height:84px"></div></div>`);
    const EYEI = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5"><path d="M4 32s10-18 28-18 28 18 28 18-10 18-28 18S4 32 4 32z"/><circle cx="32" cy="32" r="8" fill="currentColor"/></svg>`;
    const r1 = row(T.q1, EYEI, C.gold, 340), r2 = row(T.q2, CROWN, C.red, 620);
    const chip = (parent, txt, col) => add(parent, `<div class="display" style="padding:14px 34px;border-radius:999px;background:${col};color:${C.bg};font-size:48px;font-weight:900;opacity:0">${txt}</div>`);
    const cH = chip(r1.querySelector('.chips'), 'HELIOS', C.gold), cS = chip(r1.querySelector('.chips'), 'SOL', C.amber), cR = chip(r2.querySelector('.chips'), 'RA', C.red);
    const ap = add(r, `<div class="abs" style="left:110px;width:860px;top:930px;height:150px;border-radius:28px;border:4px dashed ${C.faint};display:flex;align-items:center;justify-content:center;gap:30px">
        <div style="width:90px;height:90px;color:${C.faint}">${BOW}</div><div class="display" style="font-size:66px;font-weight:900;color:${C.faint}">${T.names[1]}</div></div>`);
    const st = stamp(r, T.none, C.red, 560, 980, -8, 60);
    const tV = at(x, 'rVe'), tH = at(x, 'rHelios'), tS = at(x, 'rSol'), tG = at(x, 'gobierna'), tR = at(x, 'rRa'), tA = at(x, 'rApolo'), tN = at(x, 'ninguno');
    x.cue(tV - 0.2, 'swipe', 0.6); x.cue(tH, 'pop', 0.6); x.cue(tS, 'pop', 0.6); x.cue(tG - 0.2, 'swipe', 0.6); x.cue(tR, 'pop', 0.8); x.cue(tA, 'tick', 0.6); x.cue(tN, 'stamp', 0.9); x.shake(tN, 10);
    return (lt) => {
      popIn(r1, lt, tV - 0.4, 0.8); popIn(r2, lt, tG - 0.4, 0.8);
      popIn(cH, lt, tH - 0.1, 0.4); popIn(cS, lt, tS - 0.1, 0.4); popIn(cR, lt, tR - 0.1, 0.4);
      popIn(ap, lt, tA - 0.2, 0.8);
      stampIn(st, lt, tN, -8);
    };
  });

  // ───────────────────────── 9 · MORALEJA: los textos ─────────────────────────
  scene('moraleja', (x) => {
    const r = x.root;
    const tP = at(x, 'pregunta'), tQ = at(x, 'que'), tT = at(x, 'texto');
    const scrolls = T.scrolls.map((s, i) => add(r, `<div class="abs" style="left:${170 + i * 250}px;top:620px;width:230px;height:300px;border-radius:18px;background:${C.papyrus};box-shadow:0 20px 50px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:20px;box-sizing:border-box;transform-origin:50% 100%">
        ${Array.from({ length: 6 }, (_, j) => `<div style="height:8px;border-radius:4px;background:#cad5e2;width:${60 + ((i * 3 + j * 7) % 30)}%;margin-bottom:12px"></div>`).join('')}
        <div class="display" style="font-size:25px;font-weight:900;color:${C.oxblood};text-align:center;line-height:1.1;max-width:190px;overflow-wrap:anywhere">${s}</div></div>`));
    const q = big(r, T.which, 340, 104, C.gold);
    const cit = add(r, `<div class="abs" style="left:110px;width:860px;top:640px;transform-origin:50% 0">${citation(T.citeTitle, T.cite)}</div>`);
    x.cue(tP, 'pop', 0.4); x.cue(tQ, 'stamp', 0.7); x.cue(tT + 0.3, 'swipe', 0.6);
    return (lt) => {
      scrolls.forEach((s, i) => { const k = popIn(s, lt, 0.1 + i * 0.15, 0.4); s.style.transform += ` rotate(${(i - 1) * 7}deg)`; s.style.opacity = Math.min(k > 0 ? 1 : 0, 1 - appear(lt, tT + 0.1, 0.3)); });
      popIn(q, lt, tQ - 0.25, 0.6);
      const k = Ease.outCubic(prog(lt, tT + 0.15, 0.45));
      cit.style.opacity = k > 0 ? 1 : 0; cit.style.transform = `scaleY(${lerp(0.05, 1, k)})`;
    };
  });

  // ───────────────────────── 10 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: T.endSub }));
})();
