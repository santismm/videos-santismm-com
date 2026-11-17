/* MYTHOS #03 · "Solo una mitología cuenta el fin del mundo" / "Only one mythology tells how the world ends"
 * Versiones: es (este directorio) y en (videos/mythos-003-fin-del-mundo-en, comparte este archivo vía "scenesFile").
 * Todo texto en pantalla y cada palabra de sincronización x.at() sale del diccionario T según EUREKA.lang.
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/end-of-the-world-myths-compared c1–c6 y takeaways: solo los textos nórdicos narran el fin; Hesíodo acaba una
 *    raza, no el mundo (WD 174–201); los textos egipcios leídos prometen "millones de millones de años" (BD 175 en el
 *    extracto de Budge, cap. IV); Ovidio, Met. 1.253–261: fuego fijado por el destino; señal común: lucha entre
 *    hermanos (WD 182–184; Völuspá 45).
 *  - /k/ragnarok c1–c5: Völuspá 44 (cadenas, lobo), 46 (Heimdall, cuerno), 53 (Odín y el lobo), 55–56 (Thor, la
 *    serpiente, "nueve pasos"), 57 (sol negro, tierra al mar, estrellas), 59–62 (tierra verde, Baldr vuelve).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, popIn, human, citation, mythosEndCard } = EUREKA.ui;

  const TT = {
    es: {
      kw: ['mundo', 'apocalipsis', 'raza', 'tampoco', 'fuego', 'estrofa', 'cadenas', 'muere', 'negro', 'verde', 'baldr', 'hermanos', 'texto'],
      a: { mitos: 'mitologias', solo: 'solo', mundo: 'mundo', griegos: 'griegos', apoc: 'apocalipsis', hesiodo: 'hesiodo', raza: 'raza', dioses: 'dioses',
        egipcios: 'egipcios', tampoco: 'tampoco', muerto: 'muerto', millones: 'millones', ovidio: 'ovidio', frase: 'frase', fuego: 'fuego', universo: 'universo',
        voluspa: 'voluspa', estrofa: 'estrofa', lobo: 'lobo', rompe: 'rompe', heimdall: 'heimdall', cuerno: 'cuerno', odin: 'odin', thor: 'thor',
        serpiente: 'serpiente', nueve: 'nueve', muere: 'muere', sol: 'sol', negro: 'negro', tierra: 'tierra', hunde: 'hunde', estrellas: 'estrellas',
        surgir: 'surgir', verde: 'verde', baldr: 'baldr', senal: 'senal', hermanos: 'hermanos', que: 'que', edda: 'edda' },
      q: '¿CÓMO ACABA<br>EL MUNDO?', cards: ['GRIEGA', 'ROMANA', 'EGIPCIA', 'NÓRDICA'], onlyOne: 'SOLO ESTA',
      noApoc: 'SIN APOCALIPSIS', wd: 'HESÍODO · TRABAJOS Y DÍAS', races: ['ORO', 'PLATA', 'BRONCE', 'HÉROES', 'HIERRO'], raceEnd: 'FIN DE UNA RAZA',
      gods: 'DIOSES', world: 'MUNDO', goOn: 'SIGUEN',
      egypt: 'EGIPTO', millions: 'MILLONES DE<br>MILLONES DE AÑOS', noEnd: 'SIN FINAL', bd: 'Libro de los Muertos, cap. 175 · extracto de Budge',
      one: '1 FRASE', ovid: 'OVIDIO · ROMA', quote: '«…el mar, la tierra y el cielo se fundirán, y el fuego destruirá el universo.»', met: 'Metamorfosis 1.253–261',
      byStanza: 'ESTROFA A<br>ESTROFA', st: 'VÖLUSPÁ', freed: 'EL LOBO, LIBRE',
      deaths: [['ODÍN', 'EL LOBO', '53'], ['THOR', 'LA SERPIENTE', '55–56']], paces: 'pasos', vs: 'VS',
      sunBlack: 'SOL NEGRO', rises: 'VUELVE A<br>EMPEZAR',
      same: 'MISMA SEÑAL', hes: ['HESÍODO', 'Trabajos y días 182–184'], vol: ['VÖLUSPÁ', 'estrofa 45'],
      which: '¿QUÉ TEXTO<br>LO DICE?', citeTitle: 'Völuspá · Edda poética',
      cite: ['Estrofas 44–57: el fin · 59–64: la renovación', 'trad. H. A. Bellows (1923)', 'mythosdata.dev/k/end-of-the-world-myths-compared'],
      endSub: 'griegos · romanos · nórdicos · egipcios · con su fuente',
    },
    en: {
      kw: ['world', 'apocalypse', 'race', 'none', 'fire', 'stanza', 'fetters', 'dies', 'black', 'green', 'baldr', 'brother', 'text'],
      a: { mitos: 'mythologies', solo: 'only', mundo: 'world', griegos: 'greeks', apoc: 'apocalypse', hesiodo: 'hesiod', raza: 'race', dioses: 'gods',
        egipcios: 'egyptian', tampoco: 'none', muerto: 'dead', millones: 'millions', ovidio: 'ovid', frase: 'sentence', fuego: 'fire', universo: 'universe',
        voluspa: 'voluspa', estrofa: 'stanza', lobo: 'wolf', rompe: 'breaks', heimdall: 'heimdall', cuerno: 'horn', odin: 'odin', thor: 'thor',
        serpiente: 'serpent', nueve: 'nine', muere: 'dies', sol: 'sun', negro: 'black', tierra: 'earth', hunde: 'sinks', estrellas: 'stars',
        surgir: 'rises', verde: 'green', baldr: 'baldr', senal: 'sign', hermanos: 'brother', que: 'which', edda: 'edda' },
      q: 'HOW DOES THE<br>WORLD END?', cards: ['GREEK', 'ROMAN', 'EGYPTIAN', 'NORSE'], onlyOne: 'ONLY THIS ONE',
      noApoc: 'NO APOCALYPSE', wd: 'HESIOD · WORKS AND DAYS', races: ['GOLD', 'SILVER', 'BRONZE', 'HEROES', 'IRON'], raceEnd: 'END OF A RACE',
      gods: 'GODS', world: 'WORLD', goOn: 'GO ON',
      egypt: 'EGYPT', millions: 'MILLIONS OF<br>MILLIONS OF YEARS', noEnd: 'NO ENDING', bd: 'Book of the Dead, ch. 175 · Budge’s extract',
      one: '1 SENTENCE', ovid: 'OVID · ROME', quote: '“…the sea and earth and Heavens shall melt, and fire destroy the universe.”', met: 'Metamorphoses 1.253–261',
      byStanza: 'STANZA BY<br>STANZA', st: 'VÖLUSPÁ', freed: 'THE WOLF RUNS FREE',
      deaths: [['ODIN', 'THE WOLF', '53'], ['THOR', 'THE SERPENT', '55–56']], paces: 'paces', vs: 'VS',
      sunBlack: 'BLACK SUN', rises: 'IT BEGINS<br>AGAIN',
      same: 'SAME SIGN', hes: ['HESIOD', 'Works and Days 182–184'], vol: ['VÖLUSPÁ', 'stanza 45'],
      which: 'WHICH TEXT<br>SAYS SO?', citeTitle: 'Völuspá · Poetic Edda',
      cite: ['Stanzas 44–57: the end · 59–64: the renewal', 'tr. H. A. Bellows (1923)', 'mythosdata.dev/k/end-of-the-world-myths-compared'],
      endSub: 'Greek · Roman · Norse · Egyptian · with sources',
    },
  };
  const T = TT[EUREKA.lang] || TT.es, A = T.a;
  EUREKA.video = { keywords: T.kw };

  const css = (e, o) => { for (const k in o) e.style[k] = o[k]; };
  const kicker = (r, txt, color = C.gold, top = 318) => add(r, `<div class="abs mono" style="left:110px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.16em;color:${color}">${txt}</div>`);
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.06em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.6);white-space:nowrap">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };
  const tag = (r, txt, x, y, color = C.sky) => add(r, `<div class="abs mono" style="left:${x}px;top:${y}px;padding:10px 20px;border-radius:12px;border:2px solid ${color};color:${color};font-size:24px;font-weight:700;letter-spacing:.1em;background:rgba(15,11,8,.7)">${txt}</div>`);

  // ── Iconos propios del episodio ──
  const TEMPLE = (c) => `<svg viewBox="0 0 100 90" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round"><path d="M8 30 L50 8 L92 30 Z"/><path d="M14 34h72M20 38v38M40 38v38M60 38v38M80 38v38M10 80h80"/></svg>`;
  const RUNE = (c) => `<svg viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M50 8 L78 36 L50 64 L22 36 Z M50 64 L20 94 M50 64 L80 94"/></svg>`;
  const WOLF = (c, f = '#1a140f') => `<svg viewBox="0 0 120 100"><path d="M8 62 L30 42 L26 8 L48 30 L62 26 L72 4 L82 30 L102 44 L116 58 L98 62 L90 74 L72 76 L60 94 L44 80 L22 78 Z" fill="${f}" stroke="${c}" stroke-width="4" stroke-linejoin="round"/><circle cx="82" cy="44" r="5" fill="${c}"/><path d="M98 62 L104 70 M90 74 L94 82" stroke="${c}" stroke-width="3"/></svg>`;
  const SERPENT = (c) => `<svg viewBox="0 0 160 90" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"><path d="M10 50 Q30 10 50 50 T90 50 T130 40"/><circle cx="138" cy="36" r="13" fill="${c}" stroke="none"/><circle cx="142" cy="32" r="3" fill="#0f0b08" stroke="none"/></svg>`;
  const HAMMER = (c) => `<svg viewBox="0 0 100 100"><rect x="14" y="14" width="72" height="34" rx="6" fill="${c}"/><rect x="43" y="46" width="14" height="46" rx="5" fill="${c}"/></svg>`;
  const ODIN = (c) => `<svg viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"><path d="M20 46 Q50 4 80 46"/><path d="M14 46h72M8 30 L20 40M92 30 L80 40"/><circle cx="50" cy="62" r="24"/><path d="M34 54 L48 62 M36 64h10" stroke-width="6"/><circle cx="60" cy="58" r="4" fill="${c}"/><path d="M38 80 Q50 96 62 80"/></svg>`;
  const HORN = (c) => `<svg viewBox="0 0 140 100"><path d="M10 74 Q70 92 118 22 L130 30 Q80 108 10 92 Z" fill="${c}"/><path d="M40 82 l4 -10 M64 76 l6 -10 M88 62 l8 -8" stroke="#0f0b08" stroke-width="4"/></svg>`;
  const STEP = (c) => `<svg viewBox="0 0 40 60"><ellipse cx="20" cy="22" rx="11" ry="17" fill="${c}"/><ellipse cx="20" cy="50" rx="8" ry="8" fill="${c}"/></svg>`;

  // ───────────────────────── 1 · HOOK: cuatro libros, un final ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const q = big(r, T.q, 330, 84);
    const icons = [TEMPLE(C.papyrus), `<div class="display" style="font-size:78px;font-weight:900;color:${C.papyrus};letter-spacing:.06em">SPQR</div>`, `<div class="glyphs" style="font-size:120px;color:${C.papyrus};line-height:1">𓋹</div>`, RUNE(C.papyrus)];
    const cards = T.cards.map((name, i) => add(r, `<div class="abs" style="left:${110 + (i % 2) * 450}px;top:${540 + Math.floor(i / 2) * 310}px;width:410px;height:280px;border-radius:28px;background:${C.surface2};border:4px solid ${C.lineStrong};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;box-sizing:border-box">
        <div class="ic" style="width:130px;height:120px;display:flex;align-items:center;justify-content:center">${icons[i]}</div>
        <div class="display" style="font-size:44px;font-weight:900;color:${C.ink}">${name}</div>
        <div class="x abs display" style="inset:0;display:flex;align-items:center;justify-content:center;font-size:200px;color:${C.red};opacity:0">✗</div></div>`));
    const only = add(r, `<div class="abs" style="left:560px;top:1120px;width:410px;text-align:center">${pill(T.onlyOne, C.red, 'font-size:26px')}</div>`);
    const tS = x.at(A.solo), tM = x.at(A.mundo);
    x.cue(0.05, 'drum', 0.9); cards.forEach((_, i) => x.cue(0.2 + i * 0.12, 'pop', 0.4));
    x.cue(tS, 'swipe', 0.7); x.cue(tM, 'boom', 0.9); x.shake(tM, 16);
    return (lt) => {
      popIn(q, lt, 0, 0.7);
      cards.forEach((c, i) => {
        popIn(c, lt, 0.2 + i * 0.12, 0.6);
        const dead = i < 3 && lt > tS + i * 0.15;
        c.style.opacity = dead ? 0.35 : c.style.opacity;
        c.querySelector('.x').style.opacity = dead ? 0.9 : 0;
        if (i === 3 && lt > tM - 0.05) {
          const g = 0.5 + 0.5 * Math.sin(lt * 8);
          c.style.borderColor = C.red; c.style.boxShadow = `0 0 ${40 + g * 40}px rgba(208,69,44,.7)`;
          c.style.transform += ` scale(${1.06 + 0.02 * g})`;
          c.querySelector('.ic').style.filter = `drop-shadow(0 0 20px ${C.red})`;
        }
      });
      popIn(only, lt, tM - 0.05, 0.5);
    };
  });

  // ───────────────────────── 2 · GRECIA: las cinco razas de Hesíodo ─────────────────────────
  scene('grecia', (x) => {
    const r = x.root;
    const tG = x.at(A.griegos), tA = x.at(A.apoc), tH = x.at(A.hesiodo), tR = x.at(A.raza), tD = x.at(A.dioses), tW = x.at(A.mundo);
    const head = add(r, `<div class="abs" style="left:110px;top:330px;width:860px;display:flex;align-items:center;gap:24px"><div style="width:110px;height:100px">${TEMPLE(C.gold)}</div><div class="display" style="font-size:72px;font-weight:900;color:${C.ink}">${T.cards[0]}</div></div>`);
    const st = stamp(r, T.noApoc, C.red, 590, 365, -5, 38);
    const wd = add(r, `<div class="abs mono" style="left:110px;top:480px;font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.gold}">${T.wd}</div>`);
    const grads = ['linear-gradient(90deg,#ffe28a,#c8901c)', 'linear-gradient(90deg,#eef2f6,#9aa3ad)', 'linear-gradient(90deg,#d9a06b,#8a5a2c)', 'linear-gradient(90deg,#c9b38c,#7d6f5b)', 'linear-gradient(90deg,#7b8691,#3c444c)'];
    const bars = T.races.map((n, i) => add(r, `<div class="abs" style="left:110px;top:${530 + i * 108}px;width:540px;height:90px;border-radius:18px;background:${grads[i]};display:flex;align-items:center;padding:0 26px;box-sizing:border-box;transform-origin:0 50%">
        <span class="mono" style="font-size:22px;font-weight:700;color:rgba(15,11,8,.6);width:46px">${i + 1}ª</span><span class="display" style="font-size:40px;font-weight:900;color:#140d08">${n}</span></div>`));
    if (EUREKA.lang === 'en') bars.forEach((b, i) => (b.querySelector('.mono').textContent = ['1st', '2nd', '3rd', '4th', '5th'][i]));
    const crack = add(r, `<svg class="abs" style="left:110px;top:962px" width="540" height="90"><path d="M300 0 L280 30 L310 45 L285 90 M300 0 L330 26 L318 52" fill="none" stroke="${C.red}" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const endLbl = add(r, `<div class="abs" style="left:110px;top:1075px;width:540px;text-align:center">${pill(T.raceEnd, C.red, 'font-size:24px')}</div>`);
    const ok = (txt, y) => add(r, `<div class="abs" style="left:690px;top:${y}px;width:280px;height:180px;border-radius:26px;background:${C.surface2};border:4px solid ${C.turquoise};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px">
        <div class="display" style="font-size:44px;font-weight:900;color:${C.ink}">${txt}</div><div class="display" style="font-size:34px;font-weight:900;color:${C.turquoise}">✓ ${T.goOn}</div></div>`);
    const g1 = ok(T.gods, 560), g2 = ok(T.world, 790);
    x.cue(tG, 'pop', 0.5); x.cue(tA, 'stamp', 0.9); x.shake(tA, 10); bars.forEach((_, i) => x.cue(tH + i * 0.1, 'tick', 0.4));
    x.cue(tR, 'boom', 0.7); x.shake(tR, 12); x.cue(tD, 'ding', 0.4); x.cue(tW, 'ding', 0.4);
    return (lt) => {
      popIn(head, lt, tG - 0.2, 0.7);
      stampIn(st, lt, tA, -6);
      wd.style.opacity = appear(lt, tH - 0.2, 0.3);
      bars.forEach((b, i) => {
        const k = Ease.outCubic(prog(lt, tH - 0.1 + i * 0.1, 0.35));
        b.style.opacity = k > 0 ? 1 : 0; b.style.transform = `scaleX(${k})`;
        if (i === 4 && lt > tR) { b.style.transform += ` translateX(${Math.sin(lt * 50) * 6 * Math.exp(-(lt - tR) * 5)}px)`; b.style.boxShadow = `0 0 30px rgba(208,69,44,.6)`; }
      });
      crack.querySelector('path').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tR, 0.3)));
      endLbl.style.opacity = appear(lt, tR + 0.1, 0.3);
      popIn(g1, lt, tD - 0.1, 0.6); popIn(g2, lt, tW - 0.1, 0.6);
    };
  });

  // ───────────────────────── 3 · EGIPTO: millones de millones de años ─────────────────────────
  scene('egipto', (x) => {
    const r = x.root;
    const tE = x.at(A.egipcios), tN = x.at(A.tampoco), tD = x.at(A.muerto), tMi = x.at(A.millones);
    const k = kicker(r, T.egypt);
    const ankh = add(r, `<div class="abs glyphs" style="left:0;right:0;top:330px;text-align:center;font-size:330px;line-height:1;color:${C.gold};text-shadow:0 0 60px rgba(217,169,74,.6)">𓋹</div>`);
    const st = stamp(r, T.noEnd, C.red, 300, 560, -8, 64);
    const mil = big(r, T.millions, 780, 70, C.ink);
    const digits = Array.from({ length: 12 }, (_, i) => add(r, `<div class="abs display" style="left:${118 + i * 71}px;top:960px;width:60px;height:86px;border-radius:12px;background:${C.surface2};border:2px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:900;color:${C.gold}">0</div>`));
    const note = add(r, `<div class="abs mono" style="left:0;right:0;top:1075px;text-align:center;font-size:22px;font-weight:500;color:${C.muted}">${T.bd}</div>`);
    x.cue(tN, 'stamp', 0.8); x.cue(tMi, 'rise', 0.6); x.cue(tMi + 0.6, 'ding', 0.4);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      popIn(ankh, lt, tE - 0.3, 0.6);
      ankh.style.transform += ` translateY(${Math.sin(lt * 2) * 8}px)`;
      stampIn(st, lt, tN - 0.05, -8);
      st.style.opacity = Math.min(+st.style.opacity, 1 - appear(lt, tMi - 0.2, 0.3));
      popIn(mil, lt, tMi - 0.15, 0.6);
      digits.forEach((d, i) => {
        popIn(d, lt, tD + i * 0.04, 0.4, 0.25);
        const sp = lt > tMi ? Math.floor((lt - tMi) * (40 - i * 3) + i * 7) % 10 : 0;
        d.textContent = String(i === 0 && lt > tMi ? 1 : sp);
      });
      note.style.opacity = appear(lt, tMi + 0.4, 0.4);
    };
  });

  // ───────────────────────── 4 · ROMA: una sola frase de Ovidio ─────────────────────────
  scene('roma', (x) => {
    const r = x.root;
    const tO = x.at(A.ovidio), tF = x.at(A.frase), tFi = x.at(A.fuego), tU = x.at(A.universo);
    const k = kicker(r, T.ovid);
    const one = big(r, T.one, 380, 120, C.gold);
    const paper = add(r, `<div class="abs" style="left:110px;top:580px;width:860px;height:420px;border-radius:24px;background:${C.papyrus};box-shadow:0 30px 70px rgba(0,0,0,.55);overflow:hidden">
        <div class="q serif" style="position:absolute;left:46px;right:46px;top:40px;font-size:52px;font-style:italic;line-height:1.25;color:#1d1a17"></div>
        <div class="mono" style="position:absolute;left:46px;bottom:28px;font-size:22px;font-weight:700;color:#8a2d1c;letter-spacing:.08em">OVIDIO · ${T.met}</div>
        <div class="burn" style="position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(transparent,rgba(208,69,44,.85) 45%,#2a0c06)"></div></div>`);
    if (EUREKA.lang === 'en') paper.querySelector('.mono').textContent = 'OVID · ' + T.met;
    const R = rng(21);
    const flames = Array.from({ length: 26 }, () => ({ e: add(r, `<div class="abs" style="width:26px;height:40px;border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;background:radial-gradient(circle at 50% 70%,#ffe28a,#e3732a 55%,rgba(208,69,44,0) 75%)"></div>`), x: 120 + R() * 840, v: 160 + R() * 220, d: R() * 1.2, s: 0.6 + R() * 0.9 }));
    x.cue(tF, 'stamp', 0.6); x.cue(tFi, 'boom', 0.6); x.cue(tFi + 0.1, 'rise', 0.5); x.shake(tU, 8);
    const q = T.quote;
    return (lt) => {
      k.style.opacity = appear(lt, tO - 0.2, 0.3);
      popIn(one, lt, tF - 0.2, 0.5);
      popIn(paper, lt, 0.1, 0.9);
      paper.querySelector('.q').textContent = q.slice(0, Math.floor(prog(lt, tF + 0.3, tU + 0.4 - tF) * q.length));
      const b = Ease.outCubic(prog(lt, tFi, 1.4));
      paper.querySelector('.burn').style.height = b * 160 + 'px';
      flames.forEach((f) => {
        const kk = ((lt - tFi - f.d) % 1.3 + 1.3) % 1.3 / 1.3;
        const on = lt > tFi + f.d;
        f.e.style.opacity = on ? Math.sin(kk * Math.PI) * 0.95 : 0;
        f.e.style.transform = `translate(${f.x}px, ${1000 - kk * f.v}px) scale(${f.s * (1 - kk * 0.5)})`;
      });
    };
  });

  // ───────────────────────── 5 · VÖLUSPÁ: estrofa a estrofa (lobo y cuerno) ─────────────────────────
  scene('voluspa', (x) => {
    const r = x.root;
    const tV = x.at(A.voluspa), tE = x.at(A.estrofa), tL = x.at(A.lobo), tR = x.at(A.rompe), tH = x.at(A.heimdall), tC = x.at(A.cuerno);
    const by = big(r, T.byStanza, 330, 78, C.sky);
    const stTag = tag(r, '', 110, 520);
    const wolf = add(r, `<div class="abs" style="left:150px;top:560px;width:420px;height:350px">${WOLF(C.sky)}</div>`);
    const links = Array.from({ length: 12 }, (_, i) => add(r, `<div class="abs" style="left:${100 + i * 72}px;top:${930 + (i % 2) * 6}px;width:${i % 2 ? 80 : 84}px;height:${i % 2 ? 26 : 44}px;border:9px solid #8f98a3;border-radius:30px;box-sizing:border-box"></div>`));
    const freed = add(r, `<div class="abs" style="left:110px;top:1040px;width:460px;text-align:center">${pill(T.freed, C.red, 'font-size:24px')}</div>`);
    const horn = add(r, `<div class="abs" style="left:620px;top:600px;width:330px;height:236px">${HORN(C.gold)}</div>`);
    const waves = [0, 1, 2, 3].map(() => add(r, `<div class="abs" style="border:6px solid ${C.gold};border-radius:50%;opacity:0"></div>`));
    const hd = add(r, `<div class="abs display" style="left:600px;top:860px;width:370px;text-align:center;font-size:48px;font-weight:900;color:${C.gold}">HEIMDALL</div>`);
    x.cue(tE, 'pop', 0.5); x.cue(tE + 0.4, 'pop', 0.5); x.cue(tL, 'drum', 0.8); x.cue(tR, 'boom', 0.9); x.shake(tR, 18); x.cue(tC, 'gong', 0.8);
    return (lt) => {
      popIn(by, lt, tE - 0.2, 0.6);
      const num = lt > tH - 0.1 ? '46' : '44';
      stTag.textContent = `${T.st} · ${num}`;
      stTag.style.opacity = appear(lt, tV, 0.3);
      popIn(wolf, lt, tL - 0.25, 0.6);
      const growl = lt > tL ? Math.sin(lt * 30) * 3 * Math.exp(-(lt - tL) * 2) : 0;
      wolf.style.transform += ` translateX(${growl}px)`;
      wolf.style.filter = lt > tR ? `drop-shadow(0 0 30px ${C.red})` : 'none';
      const br = Ease.outCubic(prog(lt, tR, 0.7));
      links.forEach((l, i) => {
        l.style.opacity = appear(lt, tL - 0.3 + i * 0.02, 0.2) * (1 - br * 0.9);
        const dir = i < 6 ? -1 : 1;
        l.style.transform = `translate(${dir * br * (120 + (i % 3) * 60)}px, ${br * (i % 2 ? 140 : -60)}px) rotate(${dir * br * 120}deg)`;
      });
      freed.style.opacity = appear(lt, tR + 0.15, 0.3);
      popIn(horn, lt, tH - 0.2, 0.6);
      hd.style.opacity = appear(lt, tH, 0.3);
      waves.forEach((w, i) => {
        const p = ((lt - tC - i * 0.3) % 1.2 + 1.2) % 1.2 / 1.2;
        const on = lt > tC + i * 0.3;
        const s = 60 + p * 240;
        w.style.opacity = on ? (1 - p) * 0.8 : 0;
        css(w, { left: (900 - s / 2) + 'px', top: (640 - s / 2) + 'px', width: s + 'px', height: s + 'px' });
      });
    };
  });

  // ───────────────────────── 6 · MUERTES: dos duelos y nueve pasos ─────────────────────────
  scene('muertes', (x) => {
    const r = x.root;
    const tO = x.at(A.odin), tL = x.at(A.lobo), tT = x.at(A.thor), tS = x.at(A.serpiente), tN = x.at(A.nueve), tM = x.at(A.muere);
    const duel = (y, a, b, st, iconA, iconB) => add(r, `<div class="abs" style="left:110px;top:${y}px;width:860px;height:300px;border-radius:28px;background:${C.surface2};border:3px solid ${C.lineStrong};box-sizing:border-box">
        <div class="mono" style="position:absolute;right:24px;top:18px;font-size:22px;font-weight:700;color:${C.sky};letter-spacing:.1em">VÖLUSPÁ ${st}</div>
        <div class="A" style="position:absolute;left:50px;top:50px;width:240px;text-align:center"><div style="width:150px;height:150px;margin:0 auto">${iconA}</div><div class="display" style="font-size:40px;font-weight:900;color:${C.ink}">${a}</div>
          <div class="xa display" style="position:absolute;inset:-20px 0 0 0;font-size:220px;color:${C.red};opacity:0;line-height:1">✗</div></div>
        <div class="display" style="position:absolute;left:380px;top:110px;width:100px;text-align:center;font-size:56px;font-weight:900;color:${C.faint}">${T.vs}</div>
        <div class="B" style="position:absolute;right:30px;top:50px;width:330px;text-align:center"><div style="width:200px;height:150px;margin:0 auto;display:flex;align-items:center;justify-content:center">${iconB}</div><div class="display" style="font-size:36px;font-weight:900;color:${C.ink};white-space:nowrap">${b}</div>
          <div class="xb display" style="position:absolute;inset:-20px 0 0 0;font-size:220px;color:${C.red};opacity:0;line-height:1">✗</div></div></div>`);
    const d1 = duel(350, T.deaths[0][0], T.deaths[0][1], T.deaths[0][2], ODIN(C.gold), WOLF(C.sky));
    const d2 = duel(690, T.deaths[1][0], T.deaths[1][1], T.deaths[1][2], `<div style="width:130px;height:130px;margin:10px auto">${HAMMER(C.gold)}</div>`, SERPENT(C.turquoise));
    const steps = Array.from({ length: 9 }, (_, i) => add(r, `<div class="abs" style="left:${130 + i * 92}px;top:${1020 + (i % 2) * 34}px;width:34px;height:52px;transform:rotate(90deg)">${STEP(C.papyrus)}</div>`));
    const cnt = add(r, `<div class="abs display" style="left:110px;top:1000px;width:860px;text-align:right;font-size:60px;font-weight:900;color:${C.gold}"></div>`);
    x.cue(tO, 'drum', 0.7); x.cue(tL, 'boom', 0.8); x.shake(tL, 14); x.cue(tT, 'drum', 0.7); x.cue(tS, 'stamp', 0.7);
    steps.forEach((_, i) => x.cue(tN + i * 0.07, 'tick', 0.45)); x.cue(tM, 'boom', 0.9); x.shake(tM, 16);
    return (lt) => {
      popIn(d1, lt, tO - 0.2, 0.8);
      d1.querySelector('.xa').style.opacity = lt > tL ? 0.9 : 0;
      popIn(d2, lt, tT - 0.25, 0.8);
      d2.querySelector('.xb').style.opacity = lt > tS + 0.1 ? 0.9 : 0;
      d2.querySelector('.xa').style.opacity = lt > tM ? 0.9 : 0;
      const n = Math.min(9, Math.floor(prog(lt, tN - 0.05, 0.65) * 9 + 0.001));
      steps.forEach((s, i) => { s.style.opacity = i < n ? 1 : 0; });
      cnt.textContent = n > 0 ? `${n}` : '';
      cnt.style.opacity = lt < tM + 0.1 ? 1 : 0.4;
      d2.style.borderColor = lt > tM ? C.red : C.lineStrong;
      d1.style.opacity = lt > tT ? 0.55 : d1.style.opacity;
    };
  });

  // ───────────────────────── 7 · EL FINAL: sol negro, tierra al mar, estrellas ─────────────────────────
  scene('final', (x) => {
    const r = x.root;
    const tS = x.at(A.sol), tN = x.at(A.negro), tT = x.at(A.tierra), tH = x.at(A.hunde), tE = x.at(A.estrellas);
    const R = rng(33);
    const stars = Array.from({ length: 34 }, () => ({ e: add(r, `<div class="abs" style="width:6px;height:6px;border-radius:50%;background:#fff6dc;box-shadow:0 0 10px #fff6dc"></div>`), x: 100 + R() * 880, y: 330 + R() * 300, d: R() * 0.8, v: 600 + R() * 500 }));
    const sun = add(r, `<div class="abs" style="left:390px;top:380px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,#ffd36b,#d9a94a 70%,#8a5a1c)"></div>`);
    const lbl = tag(r, `${T.st} · 57`, 110, 330);
    const sb = add(r, `<div class="abs" style="left:0;right:0;top:700px;text-align:center">${pill(T.sunBlack, C.red, 'font-size:26px')}</div>`);
    const land = add(r, `<svg class="abs" style="left:0;top:820px" width="1080" height="400"><path d="M60 140 L180 60 L300 110 L430 20 L560 100 L700 40 L840 110 L1020 70 L1020 400 L60 400Z" fill="#3a2c1e" stroke="${C.gold}" stroke-width="4"/></svg>`);
    const sea = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><defs><linearGradient id="seaF" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="${C.lapis}"/><stop offset=".75" stop-color="#0d1a33"/></linearGradient></defs><path class="w" fill="url(#seaF)" opacity=".95"/></svg>`);
    const glow = add(r, `<div class="abs" style="left:0;right:0;top:300px;height:900px;background:radial-gradient(60% 50% at 50% 100%,rgba(208,69,44,.55),transparent 70%);opacity:0"></div>`);
    x.cue(tN, 'boom', 0.8); x.shake(tN, 10); x.cue(tH, 'whoosh', 0.9); x.cue(tH + 0.2, 'pour', 0.6); x.cue(tE, 'rise', 0.6);
    return (lt) => {
      lbl.style.opacity = appear(lt, 0, 0.3);
      popIn(sun, lt, tS - 0.3, 0.6);
      const b = Ease.inOutCubic(prog(lt, tN - 0.1, 0.6));
      sun.style.background = `radial-gradient(circle, rgb(${lerp(255, 15, b)},${lerp(211, 11, b)},${lerp(107, 8, b)}), rgb(${lerp(217, 20, b)},${lerp(169, 12, b)},${lerp(74, 8, b)}) 70%, ${b > 0.5 ? '#2a0c06' : '#8a5a1c'})`;
      sun.style.boxShadow = `0 0 ${60 + b * 60}px ${b > 0.3 ? 'rgba(208,69,44,.9)' : 'rgba(255,211,107,.6)'}`;
      sb.style.opacity = appear(lt, tN + 0.1, 0.3);
      land.style.opacity = appear(lt, tT - 0.4, 0.3);
      const sink = Ease.inCubic(prog(lt, tH - 0.1, 1.4));
      land.style.transform = `translateY(${sink * 360}px)`;
      const top = 1080 - Ease.outCubic(prog(lt, tT - 0.2, 0.8)) * 80;
      let d = `M0 ${top}`;
      for (let xx = 0; xx <= 1080; xx += 30) d += ` L${xx} ${top + Math.sin(xx / 80 + lt * 4) * 14}`;
      sea.querySelector('.w').setAttribute('d', d + ' L1080 1920 L0 1920Z');
      glow.style.opacity = appear(lt, tN, 0.6) * (0.7 + 0.3 * Math.sin(lt * 6));
      stars.forEach((s) => {
        const k = Math.max(0, lt - tE - s.d);
        s.e.style.opacity = appear(lt, 0, 0.5) * (k > 0 ? Math.max(0, 1 - k * 0.8) : 0.8);
        s.e.style.transform = `translate(${s.x + k * 120}px, ${s.y + k * s.v}px)`;
        s.e.style.width = (6 + (k > 0 ? 3 : 0)) + 'px';
        s.e.style.height = (6 + Math.min(80, k * 160)) + 'px';
      });
    };
  });

  // ───────────────────────── 8 · RENACE: la tierra verde y Baldr ─────────────────────────
  scene('renace', (x) => {
    const r = x.root;
    const tT = x.at(A.tierra), tS = x.at(A.surgir), tV = x.at(A.verde), tB = x.at(A.baldr);
    const title = big(r, T.rises, 330, 78, C.turquoise);
    const lbl = tag(r, `${T.st} · 59–62`, 110, 520, C.turquoise);
    const sun = add(r, `<div class="abs" style="left:640px;top:600px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,#ffe9a8,#e3b75a 70%,rgba(227,183,90,0));opacity:0"></div>`);
    const land = add(r, `<svg class="abs" style="left:0;top:780px" width="1080" height="440"><path d="M40 160 Q200 60 360 120 T700 90 T1040 130 L1040 440 L40 440Z" class="ld" fill="#3a2c1e" stroke="#7bd88f" stroke-width="5"/>${Array.from({ length: 26 }, (_, i) => `<path class="gr" d="M${70 + i * 36} ${150 - Math.sin(i) * 30} l-6 -26 M${70 + i * 36} ${150 - Math.sin(i) * 30} l8 -22" stroke="#7bd88f" stroke-width="5" stroke-linecap="round" opacity="0"/>`).join('')}</svg>`);
    const sea = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><defs><linearGradient id="seaR" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="${C.lapis}"/><stop offset=".75" stop-color="#0d1a33"/></linearGradient></defs><path class="w" fill="url(#seaR)" opacity=".9"/></svg>`);
    const baldr = add(r, `<div class="abs" style="left:470px;top:690px;width:120px;text-align:center"><div style="width:70px;height:140px;margin:0 auto;filter:drop-shadow(0 0 24px #ffe9a8)">${human('#ffe9a8')}</div><div class="display" style="font-size:42px;font-weight:900;color:${C.gold}">BALDR</div></div>`);
    x.cue(tS, 'whoosh', 0.8); x.cue(tV, 'ding', 0.6); x.cue(tB, 'gong', 0.6);
    return (lt) => {
      popIn(title, lt, 0.05, 0.6); lbl.style.opacity = appear(lt, 0.3, 0.3);
      const up = Ease.outCubic(prog(lt, tS - 0.1, 1.0));
      land.style.transform = `translateY(${(1 - up) * 380}px)`;
      land.style.opacity = appear(lt, tT - 0.2, 0.3);
      const g = prog(lt, tV - 0.1, 0.4);
      land.querySelector('.ld').setAttribute('fill', g > 0 ? `rgb(${lerp(58, 46, g)},${lerp(44, 110, g)},${lerp(30, 60, g)})` : '#3a2c1e');
      land.querySelectorAll('.gr').forEach((p, i) => p.setAttribute('opacity', g > i / 26 ? 1 : 0));
      sun.style.opacity = appear(lt, tV, 0.6); sun.style.transform = `translateY(${(1 - appear(lt, tV, 1)) * 80}px)`;
      const top = 1010;
      let d = `M0 ${top}`;
      for (let xx = 0; xx <= 1080; xx += 30) d += ` L${xx} ${top + Math.sin(xx / 80 + lt * 3) * 12}`;
      sea.querySelector('.w').setAttribute('d', d + ' L1080 1920 L0 1920Z');
      popIn(baldr, lt, tB - 0.15, 0.4);
    };
  });

  // ───────────────────────── 9 · HERMANOS: la misma señal en dos textos ─────────────────────────
  scene('hermanos', (x) => {
    const r = x.root;
    const tH = x.at(A.hesiodo), tV = x.at(A.voluspa), tS = x.at(A.senal), tB = x.at(A.hermanos);
    const panel = (left, head, sub, icon, color) => add(r, `<div class="abs" style="left:${left}px;top:380px;width:410px;height:560px;border-radius:28px;background:${C.surface2};border:4px solid ${color};box-sizing:border-box;text-align:center">
        <div style="width:90px;height:90px;margin:30px auto 0">${icon}</div>
        <div class="display" style="font-size:44px;font-weight:900;color:${C.ink};margin-top:10px">${head}</div>
        <div class="serif" style="font-size:30px;font-style:italic;color:${C.muted}">${sub}</div>
        <div class="duo" style="position:absolute;left:0;right:0;top:300px;height:200px">
          <div class="h1" style="position:absolute;left:90px;top:0;width:80px;height:160px">${human(C.papyrus, false)}</div>
          <div class="h2" style="position:absolute;right:90px;top:0;width:80px;height:160px;transform:scaleX(-1)">${human(C.papyrus, false)}</div>
          <svg style="position:absolute;left:150px;top:20px" width="110" height="110"><path class="sw" d="M10 100 L100 10 M10 10 L100 100" stroke="${C.red}" stroke-width="9" stroke-linecap="round" opacity="0"/></svg></div></div>`);
    const p1 = panel(110, T.hes[0], T.hes[1], TEMPLE(C.gold), C.gold);
    const p2 = panel(560, T.vol[0], T.vol[1], RUNE(C.sky), C.sky);
    const same = add(r, `<div class="abs" style="left:0;right:0;top:990px;text-align:center"><div class="display" style="display:inline-block;padding:18px 40px;border-radius:999px;background:${C.red};color:${C.ink};font-size:52px;font-weight:900;letter-spacing:.04em">${T.same}</div></div>`);
    x.cue(tH, 'pop', 0.5); x.cue(tV, 'pop', 0.5); x.cue(tB, 'boom', 0.8); x.shake(tB, 12); x.cue(tB + 0.3, 'stamp', 0.6);
    return (lt) => {
      popIn(p1, lt, tH - 0.15, 0.7); popIn(p2, lt, tV - 0.15, 0.7);
      const fight = lt > tB;
      [p1, p2].forEach((p) => {
        const j = fight ? Math.sin(lt * 18) * 8 : 0;
        p.querySelector('.h1').style.transform = `translateX(${fight ? 20 + j : 0}px)`;
        p.querySelector('.h2').style.transform = `scaleX(-1) translateX(${fight ? 20 + j : 0}px)`;
        p.querySelector('.sw').setAttribute('opacity', fight ? 1 : 0);
        p.querySelectorAll('.duo circle, .duo path').forEach((n) => {
          if (n.classList.contains('sw')) return;
          n.setAttribute('stroke', fight ? C.red : C.papyrus); if (n.tagName === 'circle') n.setAttribute('fill', fight ? C.red : C.papyrus);
        });
      });
      popIn(same, lt, tS - 0.1, 0.5);
      same.firstElementChild.style.background = fight ? C.red : C.lineStrong;
    };
  });

  // ───────────────────────── 10 · FUENTE ─────────────────────────
  scene('fuente', (x) => {
    const r = x.root;
    const tQ = x.at(A.que), tV = x.at(A.voluspa), tE = x.at(A.edda);
    const q = big(r, T.which, 340, 104, C.gold);
    const cit = add(r, `<div class="abs" style="left:110px;width:860px;top:640px;transform-origin:50% 0">${citation(T.citeTitle, T.cite, C.sky)}</div>`);
    const runes = add(r, `<div class="abs" style="left:850px;top:590px;width:120px;height:120px;border-radius:50%;background:${C.sky};padding:22px;box-sizing:border-box;box-shadow:0 0 40px ${C.sky}">${RUNE(C.bg)}</div>`);
    x.cue(tQ, 'stamp', 0.7); x.cue(tV, 'swipe', 0.6); x.cue(tE, 'ding', 0.5);
    return (lt) => {
      popIn(q, lt, tQ - 0.2, 0.6);
      const k = Ease.outCubic(prog(lt, tV - 0.1, 0.5));
      cit.style.opacity = k > 0 ? 1 : 0; cit.style.transform = `scaleY(${lerp(0.05, 1, k)})`;
      popIn(runes, lt, tE, 0.3);
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: T.endSub }));
})();
