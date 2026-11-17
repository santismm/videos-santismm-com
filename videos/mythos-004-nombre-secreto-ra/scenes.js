/* MYTHOS #04 · "El nombre secreto de Ra" / "Ra's secret name"
 * Versiones: es (este directorio) y en (videos/mythos-004-nombre-secreto-ra-en, comparte este archivo vía "scenesFile").
 * Todo texto en pantalla y cada palabra de sincronización x.at() sale del diccionario T según EUREKA.lang.
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/ra c1: "I am Khepera in the morning, Ra at noon, and Temu in the evening"; sus "muchos nombres son desconocidos
 *    incluso por los dioses"; su padre y su madre escondieron su nombre en su cuerpo "para que ningún hechizo lo dominara".
 *  - /k/ra c2 · /k/isis c5: Isis "conocía palabras de poder", quería ser tan grande como Ra, hizo una serpiente con la
 *    saliva de Ra amasada con polvo y la dejó en su camino; el dios anciano fue mordido, "el fuego vivo dejándole el
 *    cuerpo"; solo cuando dejó pasar su nombre de su cuerpo al de ella pronunció el conjuro "Flow poison, come out of
 *    Ra ... Ra liveth! The poison dieth!"; "Isis la gran señora, la Reina de los dioses, que conocía a Ra por su propio
 *    nombre" (Budge, Lit. of the Ancient Egyptians, 1914, cap. VII, Leyenda de Ra e Isis, del papiro de Turín).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, popIn, human, citation, mythosEndCard } = EUREKA.ui;

  const TT = {
    es: {
      kw: ['nombre', 'robo', 'khepera', 'temu', 'secreto', 'hechizo', 'poder', 'serpiente', 'muerde', 'fuego', 'veneno', 'vive', 'muere', 'reina', 'turin'],
      a: { poderoso: 'poderoso', debil: 'debil', nombre: 'nombre', robo: 'robo', khepera: 'khepera', manana: 'manana', noon: 'mediodia', temu: 'temu',
        tarde: 'tarde', secreto: 'secreto', padres: 'padres', cuerpo: 'cuerpo', hechizo: 'hechizo', dominar: 'dominarlo', palabras: 'palabras', poder: 'poder',
        queria: 'queria', grande: 'grande', saliva: 'saliva', viejo: 'viejo', polvo: 'polvo', serpiente: 'serpiente', camino: 'camino', muerde: 'muerde',
        fuego: 'fuego', escapa: 'escapa', cura: 'cura', tNombre: 'nombre', ella: 'ella', conjura: 'conjura', sal: 'sal', vive: 'vive', muere: 'muere',
        isis: 'isis', reina: 'reina', conoce: 'conoce', que: 'que', texto: 'texto', papiro: 'papiro', turin: 'turin' },
      kicker: 'EGIPTO · LA LEYENDA DE RA E ISIS', weak: 'PUNTO DÉBIL: SU NOMBRE', stolen: 'ROBADO', own: 'EN SUS PROPIAS PALABRAS',
      times: [['KHEPERA', 'MAÑANA'], ['RA', 'MEDIODÍA'], ['TEMU', 'TARDE']], father: 'PADRE', mother: 'MADRE', untouch: 'INTOCABLE',
      hidden: 'nombre oculto', words: 'PALABRAS DE PODER', asGreat: 'tan grande como Ra', recipe: 'LA RECETA DE ISIS',
      ing: [['SALIVA', 'del viejo dios'], ['POLVO', 'de la tierra'], ['SERPIENTE', '']], path: 'EL CAMINO DE RA', fire: 'FUEGO DE LA VIDA',
      price: 'EL PRECIO DE LA CURA', nameTo: 'NOMBRE → ISIS', spell: ['¡SAL, VENENO!', '¡RA VIVE!', '¡EL VENENO MUERE!'], powerWords: 'EL CONJURO',
      queen: 'REINA DE LOS DIOSES', quote: '«…que conoce a Ra por su propio nombre»', which: '¿QUÉ TEXTO<br>LO DICE?', papyrus: 'PAPIRO DE TURÍN',
      citeTitle: 'La leyenda de Ra e Isis', cite: ['Papiro de Turín', 'trad. E. A. Wallis Budge (1914), cap. VII', 'fichas: mythosdata.dev/k/ra · /k/isis'],
      endSub: 'griegos · romanos · nórdicos · egipcios · con su fuente',
    },
    en: {
      kw: ['name', 'stole', 'khepera', 'temu', 'secret', 'spell', 'power', 'serpent', 'bites', 'fire', 'poison', 'lives', 'dies', 'queen', 'turin'],
      a: { poderoso: 'mightiest', debil: 'weak', nombre: 'name', robo: 'stole', khepera: 'khepera', manana: 'morning', noon: 'noon', temu: 'temu',
        tarde: 'evening', secreto: 'secret', padres: 'father', cuerpo: 'body', hechizo: 'spell', dominar: 'master', palabras: 'words', poder: 'power',
        queria: 'wanted', grande: 'great', saliva: 'spittle', viejo: 'old', polvo: 'dust', serpiente: 'serpent', camino: 'path', muerde: 'bites',
        fuego: 'fire', escapa: 'leaves', cura: 'heals', tNombre: 'name', ella: 'hers', conjura: 'spell', sal: 'flow', vive: 'lives', muere: 'dies',
        isis: 'isis', reina: 'queen', conoce: 'knows', que: 'which', texto: 'text', papiro: 'papyrus', turin: 'turin' },
      kicker: 'EGYPT · THE LEGEND OF RA AND ISIS', weak: 'WEAK SPOT: HIS NAME', stolen: 'STOLEN', own: 'IN HIS OWN WORDS',
      times: [['KHEPERA', 'MORNING'], ['RA', 'NOON'], ['TEMU', 'EVENING']], father: 'FATHER', mother: 'MOTHER', untouch: 'UNTOUCHABLE',
      hidden: 'hidden name', words: 'WORDS OF POWER', asGreat: 'as great as Ra', recipe: "ISIS'S RECIPE",
      ing: [['SPITTLE', 'of the old god'], ['DUST', 'of the earth'], ['SERPENT', '']], path: "RA'S PATH", fire: 'LIVING FIRE',
      price: 'THE PRICE OF THE CURE', nameTo: 'NAME → ISIS', spell: ['FLOW, POISON!', 'RA LIVES!', 'THE POISON DIES!'], powerWords: 'THE SPELL',
      queen: 'QUEEN OF THE GODS', quote: '"…who knows Ra by his own name"', which: 'WHICH TEXT<br>SAYS SO?', papyrus: 'TURIN PAPYRUS',
      citeTitle: 'The Legend of Ra and Isis', cite: ['Turin papyrus', 'tr. E. A. Wallis Budge (1914), ch. VII', 'entries: mythosdata.dev/k/ra · /k/isis'],
      endSub: 'Greek · Roman · Norse · Egyptian · with sources',
    },
  };
  const T = TT[EUREKA.lang] || TT.es, A = T.a;

  EUREKA.video = { keywords: T.kw };

  // ───────── Utilidades locales ─────────
  const kicker = (r, txt, color = C.gold, top = 318) => add(r, `<div class="abs mono" style="left:110px;right:90px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.16em;color:${color}">${txt}</div>`);
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.06em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.6);white-space:nowrap">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };
  const css = (e, o) => { for (const k in o) e.style[k] = o[k]; };
  const hexMix = (a, b, k) => { const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16)); return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], k))).join(',')})`; };
  /** Figura de dios: jeroglífico de persona con emblema sobre la cabeza (disco solar o trono). */
  function god(r, { x, y, h = 360, color = C.gold, crown = 'sun' }) {
    const w = h / 2;
    const el = add(r, `<div class="abs" style="left:${x - w / 2}px;top:${y}px;width:${w}px;height:${h + h * 0.28}px;transform-origin:50% 100%">
      <div class="crown abs" style="left:${w * 0.18}px;top:0;width:${w * 0.64}px;height:${h * 0.28}px;display:flex;align-items:flex-end;justify-content:center">
        ${crown === 'sun' ? `<div class="disk" style="width:${w * 0.5}px;height:${w * 0.5}px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#ffe08a,${C.gold} 60%,#8a5a1c);box-shadow:0 0 ${w * 0.3}px ${C.gold}"></div>`
          : `<div class="glyphs disk" style="font-size:${w * 0.5}px;line-height:1;color:${color}">𓊨</div>`}</div>
      <div class="body abs" style="left:0;top:${h * 0.28}px;width:${w}px;height:${h}px">${human(color, false)}</div></div>`);
    const paint = (c) => el.querySelectorAll('.body circle,.body path').forEach((n) => { n.setAttribute('stroke', c); if (n.tagName === 'circle') n.setAttribute('fill', c); });
    return { el, w, h, paint, chest: { x, y: y + h * 0.28 + h * 0.42 } };
  }
  /** Cartucho egipcio (anillo de nombre) con contenido. */
  function cartouche(r, { x, y, w, h, color = C.gold, inner = '' }) {
    return add(r, `<div class="abs" style="left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px">
      <svg class="abs" width="${w}" height="${h + 24}" style="left:0;top:0;overflow:visible"><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="${(w - 8) / 2}" fill="rgba(15,11,8,.82)" stroke="${color}" stroke-width="${Math.max(4, w * 0.035)}"/>
        <line x1="${w * 0.2}" y1="${h + 10}" x2="${w * 0.8}" y2="${h + 10}" stroke="${color}" stroke-width="${Math.max(4, w * 0.035)}" stroke-linecap="round"/></svg>
      <div class="in abs" style="inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${h * 0.03}px">${inner}</div></div>`);
  }
  const NAMEGLYPHS = (size, color = C.gold) => `<div class="glyphs" style="font-size:${size}px;line-height:1.15;color:${color};text-align:center;text-shadow:0 0 ${size * 0.4}px ${color}">𓇳<br>𓂋<br>𓈖</div>`;
  const SNAKE = (w, color = C.red) => `<svg viewBox="0 0 600 160" width="${w}" height="${w * 0.27}"><path class="sn" d="M20 110 C 80 30, 140 30, 190 90 S 300 150, 350 80 S 450 20, 500 70 Q 530 100 565 78" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0"/>
      <circle class="hd" cx="570" cy="74" r="20" fill="${color}"/><circle cx="576" cy="68" r="5" fill="${C.bg}"/><path d="M588 78 l18 -4 m-18 4 l16 8" stroke="${color}" stroke-width="4" stroke-linecap="round"/></svg>`;

  // ───────────────────────── 1 · HOOK: el cartucho del nombre ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const k = kicker(r, T.kicker);
    const rays = add(r, `<svg class="abs" style="left:140px;top:350px" width="800" height="800" viewBox="-400 -400 800 800">${Array.from({ length: 24 }, (_, i) => `<path d="M0 -380 L14 -250 L-14 -250Z" fill="${C.gold}" opacity=".35" transform="rotate(${i * 15})"/>`).join('')}</svg>`);
    const cart = cartouche(r, { x: 540, y: 750, w: 290, h: 520, inner: `<div class="nm">${NAMEGLYPHS(110)}</div>` });
    const ra = add(r, `<div class="abs display" style="left:0;right:0;top:370px;text-align:center;font-size:64px;font-weight:900;color:${C.ink}">RA</div>`);
    const tgt = add(r, `<svg class="abs" style="left:340px;top:550px" width="400" height="400" viewBox="-200 -200 400 400"><circle r="170" fill="none" stroke="${C.red}" stroke-width="8"/><circle r="110" fill="none" stroke="${C.red}" stroke-width="6" stroke-dasharray="20 14"/><path d="M-200 0h80M120 0h80M0 -200v80M0 120v80" stroke="${C.red}" stroke-width="8"/></svg>`);
    const weak = add(r, `<div class="abs" style="left:0;right:0;top:1040px;text-align:center">${pill(T.weak, C.red, 'font-size:30px')}</div>`);
    const st = stamp(r, T.stolen, C.red, 300, 640, -10, 96);
    const tP = x.at(A.poderoso), tD = x.at(A.debil), tN = x.at(A.nombre), tR = x.at(A.robo);
    x.cue(0.05, 'gong', 0.6); x.cue(tD, 'buzz', 0.6); x.cue(tN, 'tick', 0.5); x.cue(tR - 0.1, 'whoosh', 1); x.cue(tR + 0.1, 'stamp', 0.9); x.shake(tR + 0.1, 18);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      popIn(cart, lt, 0.05, 0.6);
      ra.style.opacity = appear(lt, 0.2, 0.3);
      rays.style.opacity = appear(lt, tP - 0.2, 0.4) * (1 - appear(lt, tR, 0.3));
      rays.style.transform = `rotate(${lt * 12}deg) scale(${lerp(0.8, 1.05, appear(lt, tP - 0.2, 0.6))})`;
      const tg = appear(lt, tD - 0.1, 0.3);
      tgt.style.opacity = tg * (1 - appear(lt, tR, 0.2)); tgt.style.transform = `scale(${lerp(1.6, 1, tg) * (1 + 0.04 * Math.sin(lt * 10))}) rotate(${lt * 30}deg)`;
      weak.style.opacity = appear(lt, tN - 0.1, 0.3);
      const nm = cart.querySelector('.nm');
      const yank = Ease.inCubic(prog(lt, tR - 0.15, 0.35));
      nm.style.transform = `translate(${yank * 900}px, ${-yank * 200}px) rotate(${yank * 40}deg)`;
      nm.style.opacity = 1 - yank;
      cart.querySelector('rect').setAttribute('stroke', lt > tR ? C.red : C.gold);
      stampIn(st, lt, tR + 0.08, -10);
    };
  });

  // ───────────────────────── 2 · TRES NOMBRES PARA UN DÍA ─────────────────────────
  scene('nombres', (x) => {
    const r = x.root;
    const k = kicker(r, T.own);
    const sky = add(r, `<div class="abs" style="left:90px;top:380px;width:900px;height:640px;border-radius:30px;overflow:hidden;border:3px solid ${C.lineStrong}">
      <div class="g abs" style="inset:0"></div>
      <svg class="abs" width="900" height="640" style="left:0;top:0"><path d="M60 560 A 390 390 0 0 1 840 560" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-dasharray="10 14"/>
        <path d="M0 560 L900 560 L900 640 L0 640Z" fill="#1a120b"/><path d="M110 560 L200 470 L290 560Z M600 560 L690 455 L780 560Z" fill="#2a1d12"/></svg>
      <div class="sun abs" style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff1b8,#ffcf5a 55%,#d9862a);box-shadow:0 0 90px #ffcf5a"></div></div>`);
    const pos = [[-150, 'khepera'], [-90, 'noon'], [-30, 'temu']];
    const glyph = ['𓆣', '𓇳', '𓏏𓍃'];
    const labels = T.times.map(([n, t], i) => {
      const a = pos[i][0] * Math.PI / 180, lx = 90 + 450 + Math.cos(a) * 300, ly = 380 + 560 + Math.sin(a) * 300;
      return add(r, `<div class="abs" style="left:${lx - 130}px;top:${ly - 70}px;width:260px;text-align:center">
        <div class="glyphs" style="font-size:54px;color:${C.ink};line-height:1">${glyph[i]}</div>
        <div class="display" style="font-size:44px;font-weight:900;color:${C.ink};text-shadow:0 4px 18px rgba(0,0,0,.7)">${n}</div>
        <div class="mono" style="font-size:22px;font-weight:700;color:${C.papyrus};letter-spacing:.12em;text-shadow:0 2px 10px rgba(0,0,0,.8)">${t}</div></div>`);
    });
    const ts = [x.at(A.khepera), x.at(A.noon), x.at(A.temu)];
    ts.forEach((t) => x.cue(t, 'ding', 0.35));
    const SKY = [['#3a1d3a', '#e88a5a'], ['#1f4f8a', '#8fc3e8'], ['#2a0f1f', '#c4452c']];
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      popIn(sky, lt, -0.05, 0.92);
      // fase continua 0..2 entre los tres momentos
      const ph = lt < ts[0] ? 0 : lt < ts[1] ? Ease.inOutCubic(prog(lt, ts[0] + 0.3, ts[1] - ts[0] - 0.3)) : 1 + Ease.inOutCubic(prog(lt, ts[1] + 0.3, ts[2] - ts[1] - 0.3));
      const ang = (-165 + ph * 67.5) * Math.PI / 180;
      const sun = sky.querySelector('.sun');
      css(sun, { left: (450 + Math.cos(ang) * 390 - 60) + 'px', top: (560 + Math.sin(ang) * 390 - 60) + 'px' });
      const i0 = Math.min(1, Math.floor(ph)), kk = ph - i0;
      sky.querySelector('.g').style.background = `linear-gradient(${hexMix(SKY[i0][0], SKY[i0 + 1][0], kk)}, ${hexMix(SKY[i0][1], SKY[i0 + 1][1], kk)})`;
      labels.forEach((l, i) => { popIn(l, lt, ts[i] - 0.15, 0.5); l.style.opacity = Math.min(+l.style.opacity, i === Math.round(ph) ? 1 : 0.55); });
    };
  });

  // ───────────────────────── 3 · EL NOMBRE OCULTO EN EL CUERPO ─────────────────────────
  scene('oculto', (x) => {
    const r = x.root;
    const G = god(r, { x: 540, y: 360, h: 560, color: C.gold });
    const tag = add(r, `<div class="abs mono" style="left:610px;top:600px;font-size:30px;font-weight:700;color:${C.gold};letter-spacing:.08em;opacity:0">← ${T.hidden}</div>`);
    const mini = cartouche(r, { x: 540, y: G.chest.y + 30, w: 70, h: 130, inner: NAMEGLYPHS(26) });
    const par = [[200, T.father], [880, T.mother]].map(([px, lbl]) => add(r, `<div class="abs" style="left:${px - 50}px;top:760px;width:100px;text-align:center"><div style="width:70px;height:140px;margin:0 auto">${human(C.papyrus, false)}</div><div class="mono" style="font-size:22px;font-weight:700;color:${C.papyrus};margin-top:6px">${lbl}</div></div>`));
    const links = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0"><path class="l1" d="M240 800 Q 380 640 512 ${G.chest.y + 30}" fill="none" stroke="${C.papyrus}" stroke-width="4" stroke-dasharray="8 10"/><path class="l2" d="M840 800 Q 700 640 568 ${G.chest.y + 30}" fill="none" stroke="${C.papyrus}" stroke-width="4" stroke-dasharray="8 10"/></svg>`);
    const shield = add(r, `<div class="abs" style="left:270px;top:420px;width:540px;height:620px;border-radius:50%;border:6px dashed ${C.turquoise};box-shadow:0 0 60px ${C.turquoise}55 inset;opacity:0"></div>`);
    const R = rng(4);
    const bolts = Array.from({ length: 6 }, (_, i) => {
      const left = i % 2 === 0, y0 = 450 + i * 90;
      return { el: add(r, `<svg class="abs" width="200" height="60" style="left:0;top:0;opacity:0"><path d="M0 30 L40 10 L70 45 L110 12 L140 40 L190 26" fill="none" stroke="${C.violet}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`), left, y0, d: R() * 0.5 };
    });
    const st = stamp(r, T.untouch, C.turquoise, 0, 1060, -5, 64);
    const tS = x.at(A.secreto), tP = x.at(A.padres), tC = x.at(A.cuerpo), tH = x.at(A.hechizo), tD = x.at(A.dominar);
    x.cue(tS, 'rise', 0.5); x.cue(tC, 'ding', 0.4); x.cue(tH, 'buzz', 0.6); bolts.forEach((b) => x.cue(tH + b.d + 0.25, 'tick', 0.5)); x.cue(tD + 0.1, 'stamp', 0.8);
    return (lt) => {
      popIn(G.el, lt, -0.05, 0.85);
      const m = Ease.outBack(prog(lt, tS, 0.4));
      mini.style.opacity = m > 0 ? 1 : 0; mini.style.transform = `scale(${lerp(0.2, 1, m)})`;
      mini.style.filter = `drop-shadow(0 0 ${20 + 10 * Math.sin(lt * 6)}px ${C.gold})`;
      tag.style.opacity = appear(lt, tC - 0.1, 0.3);
      par.forEach((p, i) => popIn(p, lt, tP - 0.1 + i * 0.12, 0.5));
      const lk = appear(lt, tP + 0.1, 0.5);
      links.style.opacity = lk * (1 - appear(lt, tH - 0.1, 0.3));
      shield.style.opacity = appear(lt, tH - 0.1, 0.3); shield.style.transform = `scale(${1 + 0.02 * Math.sin(lt * 8)})`;
      bolts.forEach((b) => {
        const k = prog(lt, tH + b.d, 0.5);
        const hit = Math.min(1, k * 1.6), back = Math.max(0, k * 1.6 - 1);
        const xx = b.left ? lerp(-200, 140, hit) - back * 340 : lerp(1080, 740, hit) + back * 340;
        b.el.style.opacity = k > 0 && k < 1 ? 1 : 0;
        b.el.style.transform = `translate(${xx}px, ${b.y0}px) scaleX(${b.left ? 1 : -1})`;
      });
      st.style.left = (EUREKA.lang === 'en' ? 250 : 320) + 'px';
      stampIn(st, lt, tD + 0.05, -5);
    };
  });

  // ───────────────────────── 4 · ISIS, SEÑORA DE LAS PALABRAS DE PODER ─────────────────────────
  scene('isis', (x) => {
    const r = x.root;
    const IS = god(r, { x: 330, y: 610, h: 340, color: C.turquoise, crown: 'throne' });
    const RA = god(r, { x: 780, y: 380, h: 520, color: C.gold });
    const nIs = add(r, `<div class="abs display" style="left:180px;top:1080px;width:300px;text-align:center;font-size:52px;font-weight:900;color:${C.turquoise}">ISIS</div>`);
    const nRa = add(r, `<div class="abs display" style="left:630px;top:1080px;width:300px;text-align:center;font-size:52px;font-weight:900;color:${C.gold}">RA</div>`);
    const GL = ['𓂋', '𓏏', '𓆑', '𓈖', '𓋴', '𓅓', '𓊃', '𓂝'];
    const orbit = GL.map((g) => add(r, `<div class="abs glyphs" style="left:0;top:0;font-size:56px;color:${C.turquoise};text-shadow:0 0 20px ${C.turquoise};opacity:0">${g}</div>`));
    const lbl = add(r, `<div class="abs" style="left:110px;top:330px">${pill(T.words, C.turquoise, 'font-size:28px')}</div>`);
    const meas = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0;opacity:0"><line class="ml" x1="150" x2="960" y1="380" y2="380" stroke="${C.papyrus}" stroke-width="3" stroke-dasharray="12 10"/></svg>`);
    const as = add(r, `<div class="abs serif" style="left:560px;right:90px;top:322px;text-align:right;font-size:40px;font-style:italic;color:${C.papyrus};opacity:0">${T.asGreat}</div>`);
    const tW = x.at(A.palabras), tPo = x.at(A.poder), tQ = x.at(A.queria), tG = x.at(A.grande);
    x.cue(tW, 'rise', 0.5); x.cue(tPo, 'ding', 0.4); x.cue(tG, 'whoosh', 0.7);
    return (lt) => {
      popIn(IS.el, lt, -0.05, 0.6); popIn(RA.el, lt, 0.1, 0.7);
      nIs.style.opacity = appear(lt, 0.1, 0.3); nRa.style.opacity = appear(lt, 0.25, 0.3);
      lbl.style.opacity = appear(lt, tPo - 0.1, 0.3);
      orbit.forEach((o, i) => {
        const a = lt * 1.6 + i * Math.PI * 2 / GL.length, rr = 210;
        const on = appear(lt, tW - 0.1 + i * 0.06, 0.3);
        o.style.opacity = on;
        o.style.transform = `translate(${330 - 28 + Math.cos(a) * rr}px, ${740 + Math.sin(a) * rr * 0.55}px)`;
      });
      const gr = Ease.inOutCubic(prog(lt, tQ, tG - tQ + 0.5));
      IS.el.style.transform = `scale(${lerp(1, 520 / 340, gr)})`;
      // Isis está anclada por los pies (transform-origin 50% 100%): la cabeza sube con la escala
      meas.style.opacity = appear(lt, tG - 0.1, 0.3);
      as.style.opacity = appear(lt, tG, 0.3);
    };
  });

  // ───────────────────────── 5 · LA RECETA: SALIVA + POLVO = SERPIENTE ─────────────────────────
  scene('serpiente', (x) => {
    const r = x.root;
    const k = kicker(r, T.recipe);
    const DROP = `<svg viewBox="0 0 64 64" width="90" height="90"><path d="M32 6 C 22 24, 14 34, 14 42 a18 18 0 0 0 36 0 c0 -8 -8 -18 -18 -36z" fill="${C.sky}" opacity=".9"/><circle cx="25" cy="42" r="5" fill="#fff" opacity=".7"/></svg>`;
    const DUST = `<svg viewBox="0 0 64 64" width="90" height="90">${Array.from({ length: 28 }, (_, i) => `<circle cx="${10 + ((i * 37) % 44)}" cy="${56 - ((i * 13) % 20) - (i % 7)}" r="${2 + (i % 3)}" fill="#c9a36a"/>`).join('')}<path d="M6 58 Q32 30 58 58Z" fill="#8a6a3e" opacity=".8"/></svg>`;
    const card = (cx, icon, [a, b], col) => add(r, `<div class="abs" style="left:${cx - 150}px;top:420px;width:300px;height:300px;border-radius:30px;background:${C.surface2};border:4px solid ${col};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;box-sizing:border-box">
      ${icon}<div class="display" style="font-size:40px;font-weight:900;color:${C.ink}">${a}</div><div class="serif sub" style="font-size:30px;font-style:italic;color:${C.muted};opacity:0">${b}</div></div>`);
    const c1 = card(270, DROP, T.ing[0], C.sky), c2 = card(810, DUST, T.ing[1], '#c9a36a');
    const plus = add(r, `<div class="abs display" style="left:500px;top:520px;width:80px;text-align:center;font-size:90px;font-weight:900;color:${C.gold}">+</div>`);
    const eq = add(r, `<div class="abs display" style="left:0;right:0;top:745px;text-align:center;font-size:80px;font-weight:900;color:${C.gold}">=</div>`);
    const snake = add(r, `<div class="abs" style="left:110px;top:860px">${SNAKE(860)}</div>`);
    const sname = add(r, `<div class="abs display" style="left:0;right:0;top:1100px;text-align:center;font-size:56px;font-weight:900;color:${C.red};letter-spacing:.08em">${T.ing[2][0]}</div>`);
    const tSa = x.at(A.saliva), tV = x.at(A.viejo), tPo = x.at(A.polvo), tSe = x.at(A.serpiente);
    x.cue(tSa, 'pop', 0.6); x.cue(tPo, 'pop', 0.6); x.cue(tSe - 0.3, 'rise', 0.5); x.cue(tSe, 'boom', 0.6); x.shake(tSe, 10);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      popIn(c1, lt, tSa - 0.15, 0.5); c1.querySelector('.sub').style.opacity = appear(lt, tV - 0.05, 0.3);
      popIn(plus, lt, tPo - 0.3, 0.4);
      popIn(c2, lt, tPo - 0.15, 0.5); c2.querySelector('.sub').style.opacity = appear(lt, tPo + 0.3, 0.3);
      // las dos cartas se funden hacia el centro antes de la serpiente
      const mix = Ease.inOutCubic(prog(lt, tSe - 0.5, 0.4));
      c1.style.transform += ` translateX(${mix * 40}px)`; c2.style.transform += ` translateX(${-mix * 40}px)`;
      popIn(eq, lt, tSe - 0.45, 0.4);
      const d = Ease.outCubic(prog(lt, tSe - 0.25, 0.7));
      snake.querySelector('.sn').setAttribute('stroke-dashoffset', 1 - d);
      snake.querySelector('.hd').setAttribute('opacity', d > 0.95 ? 1 : 0);
      snake.style.opacity = d > 0 ? 1 : 0;
      snake.style.transform = `translateY(${Math.sin(lt * 5) * 6}px)`;
      sname.style.opacity = appear(lt, tSe + 0.3, 0.3);
    };
  });

  // ───────────────────────── 6 · LA MORDEDURA ─────────────────────────
  scene('mordida', (x) => {
    const r = x.root;
    const k = kicker(r, T.path);
    const meter = add(r, `<div class="abs" style="left:110px;top:380px;width:860px">
      <div class="mono" style="font-size:24px;font-weight:700;color:${C.gold};letter-spacing:.12em">${T.fire}</div>
      <div style="margin-top:12px;height:34px;border-radius:17px;background:${C.line};overflow:hidden"><div class="f" style="height:100%;width:100%;background:linear-gradient(90deg,#ff8a3d,${C.gold});box-shadow:0 0 20px ${C.gold}"></div></div></div>`);
    const road = add(r, `<div class="abs" style="left:0;right:0;top:960px;height:90px;background:linear-gradient(#3a2a1a,#241a10);border-top:3px solid ${C.lineStrong}"><div style="position:absolute;left:0;right:0;top:42px;height:6px;background:repeating-linear-gradient(90deg,${C.gold}88 0 40px,transparent 40px 80px)"></div></div>`);
    const RA = god(r, { x: 0, y: 560, h: 320, color: C.gold });
    const sn = add(r, `<div class="abs" style="left:560px;top:880px;transform-origin:100% 50%">${SNAKE(400)}</div>`);
    const flash = add(r, `<div class="abs" style="inset:0;background:${C.red};opacity:0;mix-blend-mode:screen"></div>`);
    const R = rng(9);
    const flames = Array.from({ length: 30 }, () => ({ e: add(r, `<div class="abs" style="width:18px;height:28px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 70%,#fff1b8,#ff9a3d 60%,transparent 70%);opacity:0"></div>`), dx: (R() - 0.5) * 160, v: 160 + R() * 260, d: R() * 1.4, s: R() * 6 }));
    const tC = x.at(A.camino), tM = x.at(A.muerde), tF = x.at(A.fuego), tE = x.at(A.escapa);
    x.cue(0.3, 'drum', 0.6); x.cue(tM - 0.08, 'swipe', 0.9); x.cue(tM, 'boom', 0.9); x.shake(tM, 20); x.cue(tF, 'rise', 0.6);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      meter.style.opacity = appear(lt, 0.1, 0.3);
      road.style.opacity = appear(lt, 0, 0.3);
      sn.querySelector('.sn').setAttribute('stroke-dashoffset', 0); sn.querySelector('.hd').setAttribute('opacity', 1);
      popIn(sn, lt, tC - 0.3, 0.4);
      // Ra camina hacia la serpiente
      const walk = Ease.inOutCubic(prog(lt, 0.1, tM - 0.2));
      const rx = lerp(120, 430, walk);
      const bob = walk < 1 ? Math.abs(Math.sin(lt * 9)) * -10 : 0;
      RA.el.style.left = (rx - RA.w / 2) + 'px';
      RA.el.style.transform = `translateY(${bob}px)`;
      const lunge = prog(lt, tM - 0.1, 0.15) * (1 - prog(lt, tM + 0.2, 0.3));
      sn.style.transform = `translateX(${-lunge * 140}px) scale(${1 + lunge * 0.15})`;
      flash.style.opacity = (prog(lt, tM, 0.05) * (1 - prog(lt, tM + 0.05, 0.35)) * 0.5).toFixed(3);
      const drain = Ease.inOutCubic(prog(lt, tF, tE - tF + 0.9));
      meter.querySelector('.f').style.width = (100 - drain * 92) + '%';
      RA.paint(lt > tM ? hexMix('#d9a94a', '#6b6259', drain) : C.gold);
      RA.el.querySelector('.disk').style.filter = `saturate(${1 - drain * 0.8}) brightness(${1 - drain * 0.4})`;
      flames.forEach((f) => {
        const kk = lt - tF - f.d * 0.8;
        f.e.style.opacity = kk > 0 && kk < 1.6 ? (1 - kk / 1.6) : 0;
        f.e.style.transform = `translate(${rx - 9 + f.dx * Math.min(1, kk) + Math.sin(kk * 4 + f.s) * 14}px, ${720 - kk * f.v}px) scale(${1 - kk * 0.3})`;
      });
    };
  });

  // ───────────────────────── 7 · EL PRECIO: EL NOMBRE PASA A ISIS ─────────────────────────
  scene('trato', (x) => {
    const r = x.root;
    const lbl = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center">${pill(T.price, C.gold, 'font-size:30px')}</div>`);
    const RA = god(r, { x: 250, y: 520, h: 420, color: '#7a6d5e' });
    const IS = god(r, { x: 830, y: 520, h: 420, color: C.turquoise, crown: 'throne' });
    RA.el.querySelector('.disk').style.filter = 'saturate(.25) brightness(.65)';
    const arc = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0"><path d="M250 ${RA.chest.y} Q 540 420 830 ${IS.chest.y}" fill="none" stroke="${C.gold}" stroke-width="5" stroke-dasharray="10 12" pathLength="1"/></svg>`);
    const cart = cartouche(r, { x: 0, y: 0, w: 76, h: 140, inner: NAMEGLYPHS(28) });
    const tag = add(r, `<div class="abs mono" style="left:0;right:0;top:1080px;text-align:center;font-size:30px;font-weight:700;color:${C.gold};letter-spacing:.1em;opacity:0">${T.nameTo}</div>`);
    const tCu = x.at(A.cura), tN = x.at(A.tNombre), tE = x.at(A.ella);
    x.cue(tCu, 'tick', 0.5); x.cue(tN, 'rise', 0.6); x.cue(tE + 0.1, 'ding', 0.6);
    return (lt) => {
      lbl.style.opacity = appear(lt, tCu - 0.2, 0.3);
      popIn(RA.el, lt, -0.05, 0.85); popIn(IS.el, lt, 0.1, 0.85);
      RA.el.style.transform += ` rotate(${-4 + Math.sin(lt * 3) * 2}deg)`;
      const m = Ease.inOutCubic(prog(lt, tN, tE - tN + 0.4));
      // punto sobre la curva cuadrática
      const p0 = [250, RA.chest.y], p1 = [540, 420], p2 = [830, IS.chest.y];
      const bx = (1 - m) ** 2 * p0[0] + 2 * (1 - m) * m * p1[0] + m * m * p2[0], by = (1 - m) ** 2 * p0[1] + 2 * (1 - m) * m * p1[1] + m * m * p2[1];
      css(cart, { left: (bx - 38) + 'px', top: (by - 70) + 'px' });
      cart.style.opacity = appear(lt, 0.2, 0.3);
      cart.style.filter = `drop-shadow(0 0 ${22 + 10 * Math.sin(lt * 7)}px ${C.gold})`;
      cart.style.transform = `scale(${1 + 0.35 * Math.sin(m * Math.PI)})`;
      arc.style.opacity = appear(lt, tN - 0.2, 0.3);
      IS.el.style.filter = `drop-shadow(0 0 ${m * 40}px ${C.turquoise})`;
      tag.style.opacity = appear(lt, tE, 0.3);
    };
  });

  // ───────────────────────── 8 · EL CONJURO ─────────────────────────
  scene('hechizo', (x) => {
    const r = x.root;
    const k = kicker(r, T.powerWords, C.turquoise);
    const ring = add(r, `<div class="abs" style="left:240px;top:480px;width:600px;height:600px;border-radius:50%;border:4px solid ${C.turquoise};opacity:0"></div>`);
    const cols = [C.red, C.gold, C.turquoise];
    const lines = T.spell.map((s, i) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${430 + i * 190}px;text-align:center;font-size:${s.length > 14 ? 76 : 96}px;font-weight:900;color:${cols[i]};text-shadow:0 0 40px ${cols[i]}88;opacity:0">${s}</div>`));
    const sn = add(r, `<div class="abs" style="left:240px;top:1000px">${SNAKE(600)}</div>`);
    const R = rng(21);
    const dots = Array.from({ length: 40 }, () => ({ e: add(r, `<div class="abs" style="width:12px;height:12px;border-radius:50%;background:${C.red};opacity:0"></div>`), x: 260 + R() * 560, y: 1010 + R() * 140, vx: (R() - 0.5) * 300, vy: -100 - R() * 300 }));
    const tS = x.at(A.sal), tV = x.at(A.vive), tM = x.at(A.muere);
    [tS, tV, tM].forEach((t, i) => x.cue(t - 0.05, i === 2 ? 'stamp' : 'pop', 0.8)); x.cue(tM + 0.1, 'whoosh', 0.7); x.shake(tM, 10);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      [tS, tV, tM].forEach((t, i) => popIn(lines[i], lt, t - 0.12, 0.4));
      const p = prog(lt, tS, 1.2);
      ring.style.opacity = (1 - p) * (p > 0 ? 1 : 0); ring.style.transform = `scale(${0.4 + p * 1.2})`;
      sn.querySelector('.sn').setAttribute('stroke-dashoffset', 0); sn.querySelector('.hd').setAttribute('opacity', 1);
      const die = prog(lt, tM, 0.3);
      sn.style.opacity = appear(lt, 0, 0.3) * (1 - die);
      sn.style.transform = `translateY(${Math.sin(lt * 6) * 6}px) scaleY(${1 - die * 0.8})`;
      dots.forEach((d) => { const kk = lt - tM; d.e.style.opacity = kk > 0 ? Math.max(0, 1 - kk / 1.2) : 0; d.e.style.transform = `translate(${d.x + d.vx * kk}px, ${d.y + d.vy * kk}px)`; });
    };
  });

  // ───────────────────────── 9 · ISIS, REINA DE LOS DIOSES ─────────────────────────
  scene('reina', (x) => {
    const r = x.root;
    const rays = add(r, `<svg class="abs" style="left:190px;top:330px" width="700" height="700" viewBox="-350 -350 700 700">${Array.from({ length: 18 }, (_, i) => `<path d="M0 -340 L18 -150 L-18 -150Z" fill="${C.turquoise}" opacity=".28" transform="rotate(${i * 20})"/>`).join('')}</svg>`);
    const IS = god(r, { x: 540, y: 390, h: 400, color: C.turquoise, crown: 'throne' });
    const cart = cartouche(r, { x: 540, y: IS.chest.y + 20, w: 60, h: 110, inner: NAMEGLYPHS(22) });
    const name = add(r, `<div class="abs display" style="left:0;right:0;top:920px;text-align:center;font-size:120px;font-weight:900;color:${C.ink};line-height:1">ISIS</div>`);
    const q = add(r, `<div class="abs" style="left:0;right:0;top:1045px;text-align:center"><div class="mono" style="font-size:28px;font-weight:700;color:${C.turquoise};letter-spacing:.14em">${T.queen}</div>
      <div class="serif" style="font-size:38px;font-style:italic;color:${C.papyrus};margin-top:10px">${T.quote}</div></div>`);
    const tI = x.at(A.isis), tR = x.at(A.reina), tC = x.at(A.conoce);
    x.cue(tI, 'gong', 0.5); x.cue(tR, 'ding', 0.4);
    return (lt) => {
      rays.style.opacity = appear(lt, 0, 0.5); rays.style.transform = `rotate(${lt * 10}deg)`;
      popIn(IS.el, lt, 0, 0.8);
      cart.style.opacity = appear(lt, 0.2, 0.3); cart.style.filter = `drop-shadow(0 0 ${20 + 10 * Math.sin(lt * 6)}px ${C.gold})`;
      popIn(name, lt, tI - 0.1, 0.6);
      q.style.opacity = appear(lt, tR - 0.1, 0.3);
      q.lastElementChild.style.opacity = appear(lt, tC - 0.1, 0.3);
    };
  });

  // ───────────────────────── 10 · ¿QUÉ TEXTO LO DICE? EL PAPIRO DE TURÍN ─────────────────────────
  scene('fuente', (x) => {
    const r = x.root;
    const q = add(r, `<div class="abs display" style="left:60px;right:60px;top:330px;text-align:center;font-size:86px;font-weight:900;line-height:1.02;color:${C.gold}">${T.which}</div>`);
    const scroll = add(r, `<div class="abs" style="left:540px;top:560px;width:0;height:200px;overflow:hidden;background:linear-gradient(90deg,#d8c9a3,${C.papyrus} 20%,#efe3c8 80%,#d8c9a3);border-radius:8px;box-shadow:0 20px 50px rgba(0,0,0,.5)">
      <div class="glyphs" style="position:absolute;left:30px;top:22px;width:800px;font-size:44px;line-height:1.5;color:#5a3a1e;white-space:nowrap;letter-spacing:.12em">𓇳𓂋𓈖 𓊨𓏏𓆇 𓆣𓂋𓏏 𓅓𓄿𓂝𓏏 𓇋𓈖𓂋 𓆑𓂋𓂝 𓋴𓈖𓏏<br>𓂝𓈖𓐍 𓊨𓏏 𓇳 𓆙𓂋𓏏 𓈖𓏏𓂋 𓋴𓇳 𓆣𓂋 𓇋𓏏𓈖</div></div>`);
    const rolls = [0, 1].map(() => add(r, `<div class="abs" style="top:540px;width:34px;height:240px;border-radius:17px;background:linear-gradient(90deg,#7a5a32,#c9a36a,#7a5a32)"></div>`));
    const plab = add(r, `<div class="abs mono" style="left:0;right:0;top:780px;text-align:center;font-size:28px;font-weight:700;color:${C.papyrus};letter-spacing:.14em;opacity:0">${T.papyrus}</div>`);
    const cit = add(r, `<div class="abs" style="left:110px;width:860px;top:840px">${citation(T.citeTitle, T.cite)}</div>`);
    const tQ = x.at(A.que), tP = x.at(A.papiro), tT = x.at(A.turin);
    x.cue(tQ, 'stamp', 0.6); x.cue(tP - 0.1, 'swipe', 0.7); x.cue(tT + 0.1, 'ding', 0.5);
    return (lt) => {
      popIn(q, lt, tQ - 0.2, 0.6);
      const u = Ease.outCubic(prog(lt, tP - 0.2, 0.7));
      const w = u * 820;
      css(scroll, { left: (540 - w / 2) + 'px', width: w + 'px' });
      rolls.forEach((rl, i) => { rl.style.left = (i === 0 ? 540 - w / 2 - 30 : 540 + w / 2 - 4) + 'px'; rl.style.opacity = appear(lt, tP - 0.25, 0.15); });
      plab.style.opacity = appear(lt, tT - 0.1, 0.3);
      const c = spring(lt, tT + 0.15, 0.45);
      cit.style.opacity = c > 0 ? 1 : 0; cit.style.transform = `translateY(${(1 - c) * 120}px)`;
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: T.endSub }));
})();
