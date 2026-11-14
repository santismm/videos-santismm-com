/* MYTHOS #01 · "La diosa que casi extermina a la humanidad… y la pararon con cerveza"
 * Fuentes (mythosdata.dev, corpus 2026.903, verificado 2026-09-03):
 *  - /k/hathor c1–c2: Ra envía a "su Ojo (Hathor)"; "por tres noches Hathor-Sekhmet chapoteó en la sangre de los
 *    hombres"; 7.000 jarras de cerveza; "se puso muy alegre… olvidó a los hombres y no mató más"; "en cada fiesta
 *    de Hathor se hacía 'cerveza del sueño'" (Budge, Lit. of the Ancient Egyptians, 1914, cap. VII).
 *  - /k/ra c?: "sus huesos se han vuelto plata, su carne oro, su pelo lapislázuli"; tumba de Seti I.
 *  - /k/flood-myths-compared c4: la cerveza teñida de rojo (ocre) "derramada por los campos"; "no es un diluvio".
 *  - /k/love-goddesses-compared: "the identification of Hathor with love is Greek".
 *  - /k/sekhmet: la única leyenda del corpus que une los dos nombres.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, popIn, eye, human, jar, citation, mythosEndCard } = EUREKA.ui;

  EUREKA.video = { keywords: ['extermina', 'cerveza', 'griegos', 'lapislazuli', 'todos', 'sangre', 'rojo', 'dormida', 'sueno', 'diluvio', 'texto'] };

  const kicker = (r, txt, color = C.gold, top = 318) => add(r, `<div class="abs mono" style="left:110px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.16em;color:${color}">${txt}</div>`);
  const big = (r, html, top, size = 96, color = C.ink) => add(r, `<div class="abs display" style="left:60px;right:60px;top:${top}px;text-align:center;font-size:${size}px;font-weight:900;line-height:1.02;color:${color};text-shadow:0 10px 40px rgba(0,0,0,.6)">${html}</div>`);
  const stamp = (r, txt, color, x, y, rot = -8, size = 58) => add(r, `<div class="abs display" style="left:${x}px;top:${y}px;padding:14px 30px;border:7px solid ${color};border-radius:16px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.06em;transform:rotate(${rot}deg);opacity:0;background:rgba(15,11,8,.55)">${txt}</div>`);
  const stampIn = (el, lt, t, rot) => { const k = prog(lt, t, 0.22); el.style.opacity = k > 0 ? 1 : 0; el.style.transform = `rotate(${rot}deg) scale(${lerp(2.2, 1, Ease.outCubic(k))})`; };
  const SUN = (c1 = '#ffd36b', c2 = '#d9a94a') => `<svg viewBox="0 0 200 200"><defs><radialGradient id="sunG"><stop offset="0" stop-color="${c1}"/><stop offset=".7" stop-color="${c2}"/><stop offset="1" stop-color="#8a5a1c"/></radialGradient></defs><circle cx="100" cy="100" r="80" fill="url(#sunG)"/></svg>`;
  const MOON = `<svg viewBox="0 0 64 64"><path d="M40 6a26 26 0 1 0 18 40A22 22 0 0 1 40 6z" fill="${C.papyrus}"/></svg>`;

  // ───────────────────────── 1 · HOOK: el Ojo y la humanidad ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const k = kicker(r, 'EGIPTO · LA DESTRUCCIÓN DE LA HUMANIDAD');
    const E = eye(r, { x: 180, y: 380, w: 720 });
    const R = rng(3);
    const people = [];
    for (let row = 0; row < 3; row++) for (let i = 0; i < 11; i++) {
      const px = 120 + i * 76 + (row % 2) * 30, py = 880 + row * 104;
      people.push({ el: add(r, `<div class="abs" style="left:${px}px;top:${py}px;width:42px;height:84px">${human(C.papyrus)}</div>`), d: R() * 0.9, keep: [5, 16, 27].includes(row * 11 + i) });
    }
    const J = jar(r, { x: 470, y: 820, w: 140 });
    const tE = x.at('extermina'), tH = x.at('humanidad'), tP = x.at('pararon'), tC = x.at('cerveza');
    x.cue(0.05, 'drum', 0.9); x.cue(tE, 'boom', 0.9); x.shake(tE + 0.05, 16);
    x.cue(tC, 'stamp', 0.9); x.cue(tC + 0.1, 'pour', 0.6);
    return (lt) => {
      k.style.opacity = appear(lt, 0, 0.3);
      const angry = lt > tE && lt < tC;
      const sleepy = Ease.inOutCubic(prog(lt, tC + 0.2, 0.6)) * 0.55;
      E.set({ draw: prog(lt, 0, 0.7), iris: lt >= tC ? C.gold : (angry ? C.red : C.gold), glow: angry ? 0.8 + 0.2 * Math.sin(lt * 20) : 0.3, lid: sleepy });
      E.el.style.transform = `scale(${1 + (angry ? 0.04 * Math.sin(lt * 25) : 0)})`;
      people.forEach((p, i) => {
        popIn(p.el, lt, 0.15 + i * 0.012, 0.5, 0.3);
        const kill = prog(lt, tE + 0.1 + p.d * (tH - tE + 0.5), 0.25);
        if (p.keep) { p.el.style.filter = ''; return; }
        if (kill > 0) {
          p.el.style.opacity = (1 - kill * 0.85).toFixed(2);
          p.el.style.transform = `translateY(${kill * 30}px) rotate(${kill * 80}deg)`;
          p.el.firstElementChild.style.filter = `drop-shadow(0 0 0 ${C.red})`;
          p.el.querySelectorAll('circle,path').forEach((n) => { n.setAttribute('stroke', C.red); if (n.tagName === 'circle') n.setAttribute('fill', C.red); });
        }
      });
      const j = spring(lt, tC - 0.12, 0.45);
      J.el.style.opacity = j > 0 ? 1 : 0;
      J.el.style.transform = `scale(${lerp(0.3, 1.25, j)}) rotate(${Math.sin(lt * 6) * 4 * (j >= 1 ? 1 : 0)}deg)`;
      J.fill(Ease.outCubic(prog(lt, tC, 0.6)), C.amber);
    };
  });

  // ───────────────────────── 2 · LA ETIQUETA: lo que dice internet ─────────────────────────
  scene('etiqueta', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;border-radius:28px;background:${C.papyrus};box-shadow:0 30px 80px rgba(0,0,0,.55);padding:34px 40px;box-sizing:border-box">
      <div style="display:flex;align-items:center;gap:18px;padding:18px 26px;border-radius:999px;background:#fff;border:2px solid #e0d6c2">
        <div style="width:44px;height:44px;color:#6b6259">${I.search}</div><span class="q" style="font-family:Inter,sans-serif;font-size:40px;color:#1d1a17"></span></div>
      <div class="serif" style="font-size:58px;font-weight:700;color:#1d1a17;margin-top:30px">Hathor</div>
      <div style="font-family:Inter,sans-serif;font-size:31px;color:#6b6259;margin-top:6px">Diosa egipcia · resultado típico</div>
      <div style="display:flex;gap:20px;margin-top:30px">
        <div class="t1 display" style="padding:16px 30px;border-radius:999px;background:#f7d6dc;color:#8a2d1c;font-size:40px;font-weight:700;opacity:0">♥ Amor</div>
        <div class="t2 display" style="padding:16px 30px;border-radius:999px;background:#e5dcf7;color:#4b2d8a;font-size:40px;font-weight:700;opacity:0">♪ Música</div></div></div>`);
    const tag = add(r, `<div class="abs" style="left:520px;top:700px;width:430px;transform-origin:50% 0">
      <div style="width:6px;height:90px;margin-left:212px;background:${C.papyrus}"></div>
      <div style="border-radius:22px;background:${C.gold};padding:24px 22px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.5);border:5px dashed rgba(15,11,8,.35)">
        <div class="display" style="font-size:46px;font-weight:900;color:${C.bg}">HECHO EN<br>GRECIA</div>
        <div class="serif" style="font-size:34px;font-style:italic;color:${C.bg};margin-top:6px">Hathor ≈ Afrodita</div></div></div>`);
    const note = add(r, `<div class="abs mono" style="left:110px;top:800px;width:400px;font-size:32px;font-weight:700;color:${C.muted};line-height:1.5">en los textos egipcios<br>no es una diosa<br><span style="color:${C.red}">del amor</span></div>`);
    const tHa = x.at('hathor'), tA = x.at('amor'), tM = x.at('musica'), tEt = x.at('etiqueta'), tG = x.at('griegos');
    x.cue(tA, 'pop', 0.6); x.cue(tM, 'pop', 0.6); x.cue(tEt, 'swipe', 0.8); x.cue(tG, 'stamp', 0.8);
    const q = 'Hathor';
    return (lt) => {
      popIn(card, lt, -0.1, 0.85);
      card.querySelector('.q').textContent = q.slice(0, Math.floor(prog(lt, 0.1, tHa + 0.3) * q.length + 0.001)) + (Math.floor(lt * 3) % 2 && lt < tHa + 0.6 ? '|' : '');
      popIn(card.querySelector('.t1'), lt, tA - 0.08, 0.4);
      popIn(card.querySelector('.t2'), lt, tM - 0.08, 0.4);
      const d = prog(lt, tEt - 0.1, 0.3);
      const sw = d > 0 ? 18 * Math.exp(-(lt - tEt) * 2.2) * Math.sin((lt - tEt) * 9) : 0;
      tag.style.opacity = d > 0 ? 1 : 0;
      tag.style.transform = `translateY(${(1 - Ease.outBack(d)) * -500}px) rotate(${sw}deg)`;
      note.style.opacity = appear(lt, tG + 0.1, 0.4);
    };
  });

  // ───────────────────────── 3 · RA SE HACE VIEJO ─────────────────────────
  scene('ra', (x) => {
    const r = x.root;
    const tRa = x.at('ra'), tV = x.at('viejo'), tB = x.at('burlan'), tPl = x.at('plata'), tO = x.at('oro'), tL = x.at('lapislazuli');
    // Fase A: la tumba
    const wall = add(r, `<div class="abs" style="left:110px;width:860px;top:340px;height:760px;border-radius:30px;background:linear-gradient(#2a2016,#1a140f);border:3px solid ${C.lineStrong};overflow:hidden">
      ${Array.from({ length: 7 }, (_, i) => `<div class="glyphs" style="position:absolute;left:40px;right:40px;top:${60 + i * 96}px;font-size:56px;letter-spacing:.3em;color:${C.gold};opacity:.18;white-space:nowrap;overflow:hidden">𓂀 𓆣 𓋹 𓇳 𓁹 𓃭 𓆓 𓂀 𓇋</div>`).join('')}
      <div class="cart abs" style="left:230px;top:220px;width:400px;height:300px;border-radius:150px;border:8px solid ${C.gold};display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(15,11,8,.75)">
        <div class="mono" style="font-size:24px;font-weight:700;color:${C.muted};letter-spacing:.14em">TUMBA DE</div>
        <div class="display" style="font-size:96px;font-weight:900;color:${C.gold}">SETI I</div></div>
      <div class="abs mono" style="left:0;right:0;bottom:50px;text-align:center;font-size:26px;font-weight:700;color:${C.papyrus};letter-spacing:.1em">"LA DESTRUCCIÓN DE LA HUMANIDAD"</div></div>`);
    // Fase B: Ra viejo y las burlas
    const sun = add(r, `<div class="abs" style="left:110px;top:330px;width:330px;height:330px">${SUN()}</div>`);
    const raLbl = add(r, `<div class="abs" style="left:110px;top:670px;width:330px;text-align:center"><div class="display" style="font-size:64px;font-weight:900;color:${C.ink}">RA</div><div class="mono" style="font-size:22px;font-weight:700;color:${C.muted};letter-spacing:.1em">REY DE LOS DIOSES</div></div>`);
    const age = add(r, `<div class="abs mono" style="left:150px;top:470px;width:250px;text-align:center;font-size:30px;font-weight:700;color:${C.bg}">ya es viejo</div>`);
    const mock = [0, 1, 2].map((i) => add(r, `<div class="abs" style="left:${560 + i * 130}px;top:${520 + (i % 2) * 30}px;width:60px;height:120px">${human(C.papyrus)}</div>`));
    const bubbles = ['¡jaja!', '¡viejo!', '¡jaja!'].map((t, i) => add(r, `<div class="abs display" style="left:${520 + i * 130}px;top:${400 + (i % 2) * 30}px;padding:8px 18px;border-radius:20px;background:${C.papyrus};color:${C.oxblood};font-size:30px;font-weight:900">${t}</div>`));
    const swatches = [['HUESOS', 'PLATA', 'linear-gradient(135deg,#eef2f6,#9aa3ad 55%,#e3e8ee)', tPl], ['CARNE', 'ORO', 'linear-gradient(135deg,#ffe28a,#c8901c 55%,#ffd36b)', tO], ['PELO', 'LAPISLÁZULI', 'linear-gradient(135deg,#2f5fa8,#1a2f6b 50%,#3e6fc0),radial-gradient(#d9a94a 1.5px,transparent 2px)', tL]]
      .map(([a, b, g, t], i) => ({ t, el: add(r, `<div class="abs" style="left:110px;width:860px;top:${800 + i * 125}px;height:105px;border-radius:24px;background:${C.surface2};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:26px;padding:0 26px;box-sizing:border-box">
        <span class="display" style="width:230px;font-size:40px;font-weight:900;color:${C.muted}">${a}</span><span style="font-size:40px;color:${C.faint}">→</span>
        <div style="width:150px;height:62px;border-radius:14px;background:${g};background-size:cover,9px 9px;box-shadow:0 0 30px rgba(255,255,255,.12)"></div>
        <span class="display" style="font-size:44px;font-weight:900;color:${C.ink}">${b}</span></div>`) }));
    x.cue(x.at('seti'), 'stamp', 0.6); x.cue(tRa, 'gong', 0.45); x.cue(tB, 'pop', 0.5); x.cue(tB + 0.2, 'pop', 0.5);
    swatches.forEach((s) => x.cue(s.t - 0.05, 'ding', 0.25));
    return (lt) => {
      const outA = Ease.inCubic(prog(lt, tRa - 0.35, 0.35));
      popIn(wall, lt, -0.1, 0.9);
      wall.style.opacity = (wall.style.opacity === '0' ? 0 : 1) * (1 - outA);
      wall.style.display = outA >= 1 ? 'none' : 'block';
      popIn(wall.querySelector('.cart'), lt, x.at('seti') - 0.15, 0.4);
      const inB = lt > tRa - 0.1;
      [sun, raLbl, age].forEach((e) => (e.style.display = inB ? 'block' : 'none'));
      if (!inB) { mock.concat(bubbles).forEach((e) => (e.style.opacity = 0)); swatches.forEach((s) => (s.el.style.opacity = 0)); return; }
      popIn(sun, lt, tRa - 0.1, 0.6);
      raLbl.style.opacity = appear(lt, tRa, 0.3);
      const old = prog(lt, tV - 0.1, 0.6);
      sun.style.filter = `saturate(${1 - old * 0.75}) brightness(${1 - old * 0.35})`;
      sun.style.transform += ` translateY(${old * 30}px)`;
      age.style.opacity = appear(lt, tV, 0.3);
      mock.forEach((m, i) => { popIn(m, lt, tB - 0.4 + i * 0.1, 0.5); m.style.transform += ` translateY(${Math.abs(Math.sin(lt * 9 + i)) * -14}px)`; });
      bubbles.forEach((b, i) => popIn(b, lt, tB + i * 0.15, 0.4));
      swatches.forEach((s) => popIn(s.el, lt, s.t - 0.2, 0.7));
    };
  });

  // ───────────────────────── 4 · EL OJO DE RA ─────────────────────────
  scene('ojo', (x) => {
    const r = x.root;
    const tO = x.at('ojo'), tH = x.at('hathor'), tP = x.at('persigue'), tB = x.at('blasfemos'), tMo = x.at('montanas'), tM = x.at('mata'), tT = x.at('todos');
    const sun = add(r, `<div class="abs" style="left:110px;top:330px;width:200px;height:200px;filter:saturate(.4) brightness(.7)">${SUN()}</div>`);
    const E = eye(r, { x: 140, y: 360, w: 140, iris: C.red });
    const name = add(r, `<div class="abs" style="left:330px;top:350px;width:640px"><div class="display" style="font-size:110px;font-weight:900;color:${C.red};line-height:1">HATHOR</div><div class="serif" style="font-size:42px;font-style:italic;color:${C.papyrus}">= el Ojo de Ra</div></div>`);
    const mount = add(r, `<svg class="abs" style="left:0;top:740px" width="1080" height="460"><path d="M0 460 L0 300 L170 120 L300 260 L470 40 L640 250 L780 110 L1080 360 L1080 460Z" fill="${C.surface2}" stroke="${C.lineStrong}" stroke-width="4"/></svg>`);
    const spots = [[150, 870], [260, 950], [420, 830], [520, 940], [640, 1000], [760, 880], [880, 1010], [330, 1060], [980, 1080]];
    const ppl = spots.map(([px, py]) => add(r, `<div class="abs" style="left:${px}px;top:${py}px;width:44px;height:88px">${human(C.papyrus)}</div>`));
    const bl = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center">${pill('LOS BLASFEMOS', C.red, 'font-size:30px')}</div>`);
    const ko = stamp(r, 'TODOS', C.red, 330, 1000, -10, 80);
    x.cue(tO, 'rise', 0.6); x.cue(tH, 'boom', 0.7); x.shake(tH, 10); x.cue(tP, 'whoosh', 1); x.cue(tM, 'boom', 0.9); x.shake(tM, 18); x.cue(tT, 'stamp', 0.8);
    return (lt) => {
      sun.style.opacity = appear(lt, -0.2, 0.3);
      // El ojo sale del sol, crece y luego persigue
      const g = Ease.outBack(prog(lt, tO - 0.2, 0.5));
      const chase = Ease.inOutCubic(prog(lt, tP, tM - tP));
      const w = lerp(1, 3.4, g) * lerp(1, 0.75, chase);
      const ex = lerp(lerp(0, 220, g), 420 + Math.sin(lt * 5) * 240, chase);
      const ey = lerp(lerp(0, 110, g), 300 + Math.cos(lt * 4) * 40, chase);
      E.el.style.transform = `translate(${ex}px, ${ey}px) scale(${w})`;
      E.el.style.transformOrigin = '50% 50%';
      E.set({ draw: prog(lt, tO - 0.3, 0.4), glow: 0.6 + 0.3 * Math.sin(lt * 14), look: Math.sin(lt * 6) * chase });
      const nk = appear(lt, tH - 0.1, 0.3) * (1 - appear(lt, tP, 0.3));
      name.style.opacity = nk; name.style.transform = `translateY(${(1 - appear(lt, tH - 0.1, 0.3)) * 30 + 380}px)`;
      mount.style.opacity = appear(lt, tP - 0.2, 0.4);
      bl.style.opacity = appear(lt, tB - 0.1, 0.3);
      ppl.forEach((p, i) => {
        popIn(p, lt, tB - 0.1 + i * 0.05, 0.5);
        const kk = Ease.outCubic(prog(lt, tM + i * 0.06, 0.3));
        if (kk > 0) {
          p.style.transform = `rotate(${kk * 90}deg) translate(${kk * 20}px, ${kk * 10}px)`;
          p.querySelectorAll('circle,path').forEach((n) => { n.setAttribute('stroke', C.red); if (n.tagName === 'circle') n.setAttribute('fill', C.red); });
        } else p.querySelectorAll('circle,path').forEach((n) => { n.setAttribute('stroke', C.papyrus); if (n.tagName === 'circle') n.setAttribute('fill', C.papyrus); });
      });
      stampIn(ko, lt, tT - 0.05, -10);
    };
  });

  // ───────────────────────── 5 · TRES NOCHES DE SANGRE ─────────────────────────
  scene('sangre', (x) => {
    const r = x.root;
    const tTr = x.at('tres'), tH = x.at('hathor'), tS = x.at('sekhmet'), tCh = x.at('chapotea'), tSa = x.at('sangre');
    const pool = add(r, `<div class="abs" style="left:0;right:0;bottom:0;height:0;background:linear-gradient(${C.blood},#5a0f0a);box-shadow:0 -20px 80px rgba(179,38,30,.6)"></div>`);
    const moons = [0, 1, 2].map((i) => add(r, `<div class="abs" style="left:${300 + i * 180}px;top:340px;width:120px;height:120px">${MOON}</div>`));
    const three = big(r, '3 NOCHES', 480, 130);
    const nA = add(r, `<div class="abs display" style="left:0;top:690px;width:540px;text-align:right;font-size:96px;font-weight:900;color:${C.gold}">HATHOR</div>`);
    const nB = add(r, `<div class="abs display" style="left:540px;top:690px;width:540px;text-align:left;font-size:96px;font-weight:900;color:${C.red}">SEKHMET</div>`);
    const dash = add(r, `<div class="abs display" style="left:510px;top:690px;width:60px;text-align:center;font-size:96px;font-weight:900;color:${C.ink};opacity:0">-</div>`);
    const note = add(r, `<div class="abs" style="left:0;right:0;top:830px;text-align:center">${pill('LA ÚNICA LEYENDA QUE UNE LOS DOS NOMBRES', C.papyrus, 'font-size:24px')}</div>`);
    const ripples = [0, 1, 2, 3].map(() => add(r, `<div class="abs" style="border:5px solid rgba(255,190,170,.6);border-radius:50%;opacity:0"></div>`));
    moons.forEach((_, i) => x.cue(tTr + i * 0.15, 'tick', 0.6)); x.cue(tS, 'stamp', 0.6); x.cue(tCh, 'pour', 0.7); x.cue(tSa, 'boom', 0.6);
    return (lt) => {
      moons.forEach((m, i) => popIn(m, lt, tTr - 0.1 + i * 0.15, 0.3));
      popIn(three, lt, tTr + 0.1, 0.6);
      const j = Ease.outCubic(prog(lt, tS - 0.15, 0.35));
      nA.style.opacity = appear(lt, tH - 0.1, 0.25); nB.style.opacity = appear(lt, tS - 0.15, 0.25);
      nA.style.transform = `translateX(${lerp(-200, -30, Ease.outCubic(prog(lt, tH - 0.1, 0.35)))}px)`;
      nB.style.transform = `translateX(${lerp(200, 30, j)}px)`;
      dash.style.opacity = j >= 1 ? 1 : 0;
      note.style.opacity = appear(lt, tS + 0.3, 0.3);
      const h = Ease.outCubic(prog(lt, tCh - 0.3, 1.4)) * 720;
      pool.style.height = h + 'px';
      ripples.forEach((rp, i) => {
        const p = ((lt - tCh - i * 0.35) % 1.4 + 1.4) % 1.4 / 1.4;
        const on = lt > tCh + i * 0.35;
        const w = 80 + p * 520;
        rp.style.opacity = on ? (1 - p) * 0.9 : 0;
        css(rp, { left: (240 + i * 180 - w / 2) + 'px', top: (1920 - h + 140 + (i % 2) * 120 - w * 0.12) + 'px', width: w + 'px', height: w * 0.24 + 'px' });
      });
    };
  });
  const css = (e, o) => { for (const k in o) e.style[k] = o[k]; };

  // ───────────────────────── 6 · EL TRUCO: 7.000 JARRAS ─────────────────────────
  scene('cerveza', (x) => {
    const r = x.root;
    const tTr = x.at('truco'), tS = x.at('siete'), tJ = x.at('jarras'), tCv = x.at('cerveza'), tR = x.at('rojo'), tD = x.at('derramadas'), tCa = x.at('campos');
    const head = add(r, `<div class="abs" style="left:110px;top:330px">${pill('EL TRUCO DE RA', C.gold, 'font-size:30px')}</div>`);
    const count = add(r, `<div class="abs display" style="left:0;right:0;top:400px;text-align:center;font-size:190px;font-weight:900;color:${C.ink};line-height:1">0</div>`);
    const unit = add(r, `<div class="abs mono" style="left:0;right:0;top:600px;text-align:center;font-size:30px;font-weight:700;color:${C.muted};letter-spacing:.14em">JARRAS DE CERVEZA</div>`);
    const jars = [];
    for (let row = 0; row < 4; row++) for (let i = 0; i < 10; i++) jars.push({ J: jar(r, { x: 118 + i * 84, y: 680 + row * 118, w: 64 }), row, i });
    const each = add(r, `<div class="abs mono" style="left:0;right:0;top:1160px;text-align:center;font-size:22px;color:${C.faint}">cada jarra = 175</div>`);
    const flood = add(r, `<div class="abs" style="left:0;right:0;bottom:0;height:0;background:linear-gradient(${C.red},#6b130c)"></div>`);
    x.cue(tTr, 'ding', 0.5); x.cue(tCv, 'pour', 0.5); x.cue(tR, 'swipe', 0.6); x.cue(tD, 'pour', 0.9); x.cue(tD + 0.5, 'pour', 0.7);
    for (let k = 0; k < 8; k++) x.cue(tS + k * 0.09, 'tick', 0.35);
    return (lt) => {
      popIn(head, lt, tTr - 0.15, 0.6);
      const c = Ease.outCubic(prog(lt, tS, tJ + 0.4 - tS));
      count.textContent = Math.round(c * 7000).toLocaleString('es-ES').replace(',', '.').replace(/^(\d)(\d{3})$/, '$1.$2');
      count.style.opacity = appear(lt, tS - 0.15, 0.2);
      count.style.color = lt > tR ? C.red : (lt > tCv ? C.amber : C.ink);
      unit.style.opacity = appear(lt, tJ, 0.3);
      const tip = Ease.inOutCubic(prog(lt, tD, 0.4));
      jars.forEach(({ J, row, i }, n) => {
        popIn(J.el, lt, tS + n * 0.018, 0.4, 0.25);
        const f = Ease.outCubic(prog(lt, tCv + n * 0.006, 0.35));
        J.fill(f * (1 - tip * 0.9), lt > tR + (i + row) * 0.02 ? C.red : C.amber);
        if (tip > 0) { J.el.style.transform += ` rotate(${tip * (i % 2 ? 40 : -40)}deg) translateY(${tip * (260 + row * 40)}px)`; J.el.style.opacity = (1 - tip * 0.9).toFixed(2); }
      });
      each.style.opacity = appear(lt, tJ + 0.3, 0.3) * (1 - tip);
      flood.style.height = Ease.outCubic(prog(lt, tD + 0.15, tCa + 0.8 - tD)) * 640 + 'px';
    };
  });

  // ───────────────────────── 7 · SE DUERME ─────────────────────────
  scene('duerme', (x) => {
    const r = x.root;
    const tBe = x.at('bebe'), tA = x.at('alegre'), tDo = x.at('dormida'), tN = x.at('no'), tM = x.at('mata');
    const field = add(r, `<div class="abs" style="left:0;right:0;bottom:0;height:640px;background:linear-gradient(${C.red},#6b130c)"></div>`);
    const E = eye(r, { x: 190, y: 420, w: 700, iris: C.red });
    const zz = ['Z', 'z', 'z'].map((z, i) => add(r, `<div class="abs display" style="left:${760 + i * 60}px;top:${420 - i * 60}px;font-size:${90 - i * 18}px;font-weight:900;color:${C.papyrus};opacity:0">${z}</div>`));
    const hic = add(r, `<div class="abs display" style="left:120px;top:360px;font-size:54px;font-weight:900;color:${C.amber};transform:rotate(-12deg);opacity:0">¡hip!</div>`);
    const st = stamp(r, 'HUMANIDAD<br>SALVADA', C.turquoise, 250, 860, -6, 70);
    st.style.textAlign = 'center';
    x.cue(tBe, 'pour', 0.6); x.cue(tA, 'pop', 0.6); x.cue(tA + 0.25, 'pop', 0.4); x.cue(tDo, 'ding', 0.4); x.cue(tM, 'stamp', 0.9); x.shake(tM, 10);
    return (lt) => {
      const drain = Ease.inOutCubic(prog(lt, tBe, 1.2));
      field.style.height = 640 * (1 - drain * 0.85) + 'px';
      const happy = prog(lt, tA - 0.1, 0.3);
      const lid = Ease.inOutCubic(prog(lt, tDo - 0.3, 0.7));
      E.set({ draw: 1, iris: happy > 0 ? C.amber : C.red, glow: 0.3 + (1 - happy) * 0.5, lid: Math.min(1, lid * 1.05 + happy * 0.25 * Math.max(0, Math.sin(lt * 5))) });
      const wob = happy * (1 - lid) * 7 * Math.sin(lt * 6);
      E.el.style.transform = `rotate(${wob}deg) translateY(${lid * 40}px)`;
      hic.style.opacity = happy * (1 - lid);
      zz.forEach((z, i) => { const k = prog(lt, tDo + i * 0.25, 1.2); z.style.opacity = k > 0 ? Math.sin(k * Math.PI) : 0; z.style.transform = `translateY(${-k * 90}px)`; });
      stampIn(st, lt, tN - 0.05, -6);
    };
  });

  // ───────────────────────── 8 · LA FIESTA: el mito explica la costumbre ─────────────────────────
  scene('fiesta', (x) => {
    const r = x.root;
    const tF = x.at('fiesta'), tC = x.at('cerveza'), tS = x.at('sueno');
    const garland = add(r, `<svg class="abs" style="left:0;top:300px" width="1080" height="200"><path d="M40 30 Q540 170 1040 30" fill="none" stroke="${C.papyrus}" stroke-width="3"/>${Array.from({ length: 12 }, (_, i) => { const t = (i + 0.5) / 12, px = 40 + 1000 * t, py = 30 + 140 * 4 * t * (1 - t) * 0.5 * 2 / 2; return `<path d="M${px - 22} ${py} L${px + 22} ${py} L${px} ${py + 46}Z" fill="${[C.gold, C.turquoise, C.red, C.lapis][i % 4]}"/>`; }).join('')}</svg>`);
    const J = jar(r, { x: 380, y: 470, w: 320 });
    const label = add(r, `<div class="abs" style="left:290px;top:770px;width:500px;padding:18px;border-radius:18px;background:${C.papyrus};text-align:center;transform:rotate(-4deg);box-shadow:0 20px 50px rgba(0,0,0,.5)"><div class="display" style="font-size:48px;font-weight:900;color:${C.oxblood}">CERVEZA<br>DEL SUEÑO</div></div>`);
    const ait = add(r, `<div class="abs" style="left:0;right:0;top:1010px;text-align:center"><div class="display" style="font-size:52px;font-weight:900;color:${C.gold}">EL MITO EXPLICA LA FIESTA</div><div class="mono" style="font-size:22px;color:${C.muted};margin-top:8px">aitiología: un relato que justifica una costumbre</div></div>`);
    const R = rng(11);
    const conf = Array.from({ length: 40 }, () => ({ e: add(r, `<div class="abs" style="width:14px;height:22px;border-radius:3px;background:${[C.gold, C.turquoise, C.red, C.papyrus][Math.floor(R() * 4)]}"></div>`), x: R() * 1080, v: 300 + R() * 400, d: R() * 0.6, s: R() * 6 }));
    x.cue(tF - 0.1, 'drum', 0.8); x.cue(tF + 0.3, 'drum', 0.5); x.cue(tC, 'pop', 0.6); x.cue(tS, 'ding', 0.5);
    return (lt) => {
      garland.style.opacity = appear(lt, 0, 0.4);
      const j = spring(lt, 0.05, 0.5); J.el.style.opacity = j > 0 ? 1 : 0; J.el.style.transform = `scale(${lerp(0.5, 1, j)}) rotate(${Math.sin(lt * 4) * 3}deg)`;
      J.fill(0.85, C.amber);
      popIn(label, lt, tC - 0.1, 0.5);
      label.style.transform += ' rotate(-4deg)';
      popIn(ait, lt, tS + 0.35, 0.7);
      conf.forEach((c) => { const k = lt - tF - c.d; c.e.style.opacity = k > 0 ? 1 : 0; c.e.style.transform = `translate(${c.x + Math.sin(k * 3 + c.s) * 40}px, ${300 + k * c.v}px) rotate(${k * 300 + c.s * 50}deg)`; });
    };
  });

  // ───────────────────────── 9 · ¿MITO DEL DILUVIO? ─────────────────────────
  scene('diluvio', (x) => {
    const r = x.root;
    const tD = x.at('diluvio'), tI = x.at('inunda'), tCa = x.at('campos'), tC = x.at('cerveza');
    const ttl = big(r, '¿MITO DEL<br>DILUVIO?', 330, 104);
    const card = (y, a, b, c) => add(r, `<div class="abs" style="left:110px;width:860px;top:${y}px;height:130px;border-radius:26px;background:${C.surface2};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:24px;padding:0 30px;box-sizing:border-box">
        <span class="mono" style="font-size:24px;font-weight:700;color:${C.muted};width:150px;letter-spacing:.08em">${a}</span><span class="display" style="flex:1;font-size:40px;font-weight:900;color:${C.ink}">${b}</span><span class="v display" style="font-size:44px;font-weight:900">${c}</span></div>`);
    const gr = card(580, 'GRIEGO', 'Deucalión: agua', '');
    const eg = card(730, 'EGIPCIO', 'Ra y Hathor: ¿agua?', '');
    const st = stamp(r, 'NO ES UN DILUVIO', C.red, 210, 650, -7, 64);
    const W = add(r, `<svg class="abs" style="left:0;top:0" width="1080" height="1920"><path class="wv" fill="${C.lapis}" d=""/><path class="fm" fill="none" stroke="#fff6dc" stroke-width="18" stroke-linecap="round" d="" opacity="0"/></svg>`);
    const wv = W.querySelector('.wv'), fm = W.querySelector('.fm');
    const bub = Array.from({ length: 18 }, (_, i) => add(r, `<div class="abs" style="width:${8 + (i % 4) * 5}px;height:${8 + (i % 4) * 5}px;border-radius:50%;border:3px solid rgba(255,246,220,.8);opacity:0"></div>`));
    x.cue(tD, 'whoosh', 0.8); x.cue(tI, 'pour', 0.8); x.cue(tC, 'stamp', 0.9); x.shake(tC, 10); x.cue(tC + 0.1, 'pop', 0.5);
    return (lt) => {
      popIn(ttl, lt, 0.2, 0.7);
      popIn(gr, lt, tD + 0.15, 0.7); popIn(eg, lt, tD + 0.35, 0.7);
      gr.querySelector('.v').textContent = lt > tD + 0.5 ? '✓' : ''; gr.querySelector('.v').style.color = C.turquoise;
      const beer = Ease.inOutCubic(prog(lt, tC - 0.15, 0.4));
      const top = 1920 - Ease.outCubic(prog(lt, tI - 0.2, tCa + 0.4 - tI)) * 680;
      let d = `M0 ${top}`;
      for (let xx = 0; xx <= 1080; xx += 30) d += ` L${xx} ${top + Math.sin(xx / 90 + lt * 4) * 18 + Math.sin(xx / 37 - lt * 6) * 6}`;
      wv.setAttribute('d', d + ' L1080 1920 L0 1920Z');
      const col = beer > 0 ? `rgb(${lerp(47, 227, beer)},${lerp(95, 167, beer)},${lerp(168, 60, beer)})` : C.lapis;
      wv.setAttribute('fill', col); wv.setAttribute('opacity', 0.92);
      fm.setAttribute('d', d.replace(/L(\d+) ([\d.]+)/g, (m, a, b) => `L${a} ${(+b - 4).toFixed(1)}`)); fm.setAttribute('opacity', beer);
      bub.forEach((b, i) => { const k = ((lt * 0.7 + i * 0.137) % 1); b.style.opacity = beer * (1 - k) * 0.9; b.style.transform = `translate(${60 + i * 56}px, ${top + 560 - k * 520}px)`; });
      const v = eg.querySelector('.v'); v.textContent = lt > tC ? '✗' : ''; v.style.color = C.red;
      stampIn(st, lt, tC + 0.05, -7);
    };
  });

  // ───────────────────────── 10 · MORALEJA: ¿QUÉ TEXTO LO DICE? ─────────────────────────
  scene('moraleja', (x) => {
    const r = x.root;
    const tP = x.at('pregunta'), tQ = x.at('que'), tT = x.at('texto');
    const q = big(r, '¿QUÉ TEXTO<br>LO DICE?', 340, 110, C.gold);
    const cit = add(r, `<div class="abs" style="left:110px;width:860px;top:640px;transform-origin:50% 0">${citation('La Destrucción de la Humanidad', ['Tumba de Seti I · Egipto, s. XIII a. C.', 'trad. E. A. Wallis Budge (1914), cap. VII', 'ficha: mythosdata.dev/k/hathor'])}</div>`);
    const chk = add(r, `<div class="abs" style="left:850px;top:600px;width:110px;height:110px;border-radius:50%;background:${C.turquoise};color:${C.bg};padding:20px;box-sizing:border-box;box-shadow:0 0 40px ${C.turquoise}">${I.check}</div>`);
    x.cue(tQ, 'stamp', 0.7); x.cue(tT + 0.4, 'swipe', 0.6); x.cue(tT + 0.8, 'ding', 0.5);
    return (lt) => {
      popIn(q, lt, tQ - 0.25, 0.6);
      const k = Ease.outCubic(prog(lt, tT + 0.2, 0.5));
      cit.style.opacity = k > 0 ? 1 : 0; cit.style.transform = `scaleY(${lerp(0.05, 1, k)})`;
      popIn(chk, lt, tT + 0.75, 0.3);
    };
  });

  // ───────────────────────── 11 · CTA ─────────────────────────
  scene('cta', (x) => mythosEndCard(x, { sub: 'griegos · romanos · nórdicos · egipcios · con su fuente' }));
})();
