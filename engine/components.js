/* Componentes reutilizables entre episodios (EUREKA.ui) e iconos extra.
 * Cargado después de lib.js. Los episodios antiguos no dependen de este archivo.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add } = EUREKA;

  Object.assign(I, {
    bulb: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 44c-6-4-11-10-11-18a20 20 0 0 1 40 0c0 8-5 14-11 18v6H23z"/><path d="M25 57h14M32 20v10l-5 5M32 30l5 5"/></svg>`,
    key: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="32" r="12"/><path d="M32 32h26M50 32v10M58 32v7"/></svg>`,
    issue: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5"><circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="6" fill="currentColor"/></svg>`,
    stairs: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 56h14V44h14V32h14V20h10"/><path d="M40 8h14v14M54 8L38 24"/></svg>`,
    envelope: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="16" width="52" height="36" rx="5"/><path d="M6 19l26 19 26-19"/><circle cx="50" cy="16" r="8" fill="currentColor" stroke="none"/></svg>`,
    star: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4l8 18 20 2-15 13 5 20-18-10-18 10 5-20L4 24l20-2z"/></svg>`,
    eyeOff: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><path d="M4 32s10-18 28-18 28 18 28 18-10 18-28 18S4 32 4 32z"/><circle cx="32" cy="32" r="8"/><path d="M10 54L54 10"/></svg>`,
    search: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><circle cx="27" cy="27" r="18"/><path d="M40 40l18 18"/></svg>`,
  });

  // Generador pseudoaleatorio con semilla: mismas partículas en cada render.
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  const pill = (txt, color = C.cyan, extra = '') =>
    `<div class="mono" style="display:inline-flex;align-items:center;gap:12px;padding:12px 24px;border-radius:999px;border:2px solid ${color};color:${color};background:rgba(11,15,25,.8);font-weight:700;letter-spacing:.08em;${extra}">${txt}</div>`;

  /** Hoja de examen en papel con nota rodeada a mano. Devuelve {el, set(lt)} */
  function examPaper(parent, { x, y, w = 380, h = 540, title, sub, grade, gradeColor = C.red, rot = 0, lines = 6 }) {
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg);">
      <div class="abs" style="inset:0;border-radius:18px;background:#e9eef6;box-shadow:0 30px 70px rgba(0,0,0,.55);overflow:hidden">
        <div style="padding:${w * 0.07}px ${w * 0.08}px 0">
          <div class="mono" style="font-size:${w * 0.06}px;font-weight:700;color:#5d6b85;letter-spacing:.14em">EXAMEN</div>
          <div class="display" style="font-size:${w * 0.085}px;font-weight:700;color:#0b0f19;line-height:1.1;margin-top:6px">${title}</div>
          ${sub ? `<div class="mono" style="font-size:${w * 0.048}px;font-weight:500;color:#5d6b85;margin-top:6px">${sub}</div>` : ''}
          <div class="ls" style="margin-top:${w * 0.06}px;display:flex;flex-direction:column;gap:${w * 0.045}px">
            ${Array.from({ length: lines }, (_, i) => `<div style="display:flex;gap:12px;align-items:center"><div class="bx" style="width:${w * 0.055}px;height:${w * 0.055}px;border:3px solid #93a1b8;border-radius:5px;flex:none"></div><div style="height:${w * 0.03}px;border-radius:6px;background:#cad5e2;width:${55 + ((i * 37) % 40)}%"></div></div>`).join('')}
          </div>
        </div>
      </div>
      ${grade != null ? `<div class="grade abs display" style="right:${w * 0.06}px;bottom:${w * 0.05}px;width:${w * 0.56}px;height:${w * 0.36}px;display:flex;align-items:center;justify-content:center;font-size:${w * 0.2}px;font-weight:700;color:${gradeColor};transform:rotate(-7deg)">
          <svg class="abs" viewBox="0 0 200 130" style="inset:0;width:100%;height:100%"><path d="M30 70 C 25 25, 175 15, 185 60 C 192 105, 40 125, 22 80 C 15 55, 60 30, 110 28" fill="none" stroke="${gradeColor}" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
          <span class="gv">${grade}</span></div>` : ''}
    </div>`);
    return {
      el,
      /** k: progreso de corrección 0..1 (aparece la nota y se dibuja el círculo) */
      grade(k) {
        const g = el.querySelector('.grade');
        if (!g) return;
        g.querySelector('.gv').style.opacity = k > 0 ? 1 : 0;
        g.querySelector('.gv').style.transform = `scale(${lerp(1.8, 1, Ease.outBack(Math.min(1, k * 1.6)))})`;
        g.querySelector('path').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(k));
      },
    };
  }

  /** Tarjeta final de serie, común a los episodios. */
  function endCard(x, { links = ['santismm.com'], sub = 'articles · benchmarks · labs · physicalai' } = {}) {
    const r = x.root;
    const logo = add(r, `<div class="abs display" style="left:0;right:0;top:340px;text-align:center;font-size:150px;font-weight:700;color:${C.ink};letter-spacing:.06em;display:flex;align-items:center;justify-content:center;gap:28px">
        <span style="width:44px;height:44px;border-radius:50%;background:${C.cyan};box-shadow:0 0 50px ${C.cyan}"></span>EUREKA</div>`);
    const tag = add(r, `<div class="abs mono" style="left:0;right:0;top:530px;text-align:center;font-size:30px;font-weight:700;color:${C.muted};letter-spacing:.12em">IA COMPLEJA, EXPLICADA EN 60s</div>`);
    const btn = (icon, label, color, left) => add(r, `<div class="abs" style="left:${left}px;top:640px;width:390px;height:140px;border-radius:34px;background:${C.surface2};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:22px;box-shadow:0 0 50px ${color}44">
        <div style="width:64px;height:64px;color:${color}">${icon}</div><span class="display" style="font-size:44px;font-weight:700;color:${C.ink}">${label}</span></div>`);
    const b1 = btn(I.bookmark, 'Guárdalo', C.amber, 125);
    const b2 = btn(I.share, 'Compártelo', C.cyan, 565);
    const site = add(r, `<div class="abs display" style="left:0;right:0;top:850px;text-align:center;font-size:${links[0].length > 16 ? 56 : 72}px;font-weight:700;color:${C.cyan}">${links[0]}</div>`);
    const subs = add(r, `<div class="abs mono" style="left:0;right:0;top:955px;text-align:center;font-size:27px;font-weight:500;color:${C.muted}">${sub}</div>`);
    const disc = add(r, `<div class="abs mono" style="left:0;right:0;top:1080px;text-align:center;font-size:21px;font-weight:500;color:${C.faint}">Basado en los artículos de Santi Santa María · voz y animación generadas con IA</div>`);
    const tG = x.at('guárdalo'), tC = x.at('compártelo');
    x.cue(tG, 'pop', 0.8); x.cue(tC, 'pop', 0.8); x.cue(0.1, 'ding', 0.4);
    return (lt) => {
      const l = spring(lt, 0.05, 0.5); logo.style.opacity = l > 0 ? 1 : 0; logo.style.transform = `scale(${lerp(0.7, 1, l)})`;
      tag.style.opacity = appear(lt, 0.3, 0.4);
      [[b1, tG], [b2, tC]].forEach(([b, t]) => {
        const s = spring(lt, t - 0.05, 0.4);
        b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.5, 1, s) * (1 + 0.025 * Math.sin((lt - t) * 7) * (s >= 1 ? 1 : 0))})`;
      });
      site.style.opacity = appear(lt, tC + 0.4, 0.4); subs.style.opacity = appear(lt, tC + 0.6, 0.4);
      disc.style.opacity = appear(lt, 0.6, 0.5);
    };
  }

  /** Línea grande de tipografía cinética que entra con muelle. */
  function popText(parent, html, style) {
    return add(parent, `<div class="abs display" style="left:0;right:0;text-align:center;font-weight:700;${style}">${html}</div>`);
  }
  function popIn(el, lt, t, from = 0.6, d = 0.4) {
    const s = spring(lt, t, d);
    el.style.opacity = s > 0 ? 1 : 0;
    el.style.transform = `scale(${lerp(from, 1, s)})`;
    return s;
  }

  // ───────────── Canal MYTHOS (mythosdata.dev) ─────────────
  let eyeN = 0;
  /** Ojo de Ra (udjat) con párpado. set({draw, iris, lid, glow, tilt}) */
  function eye(parent, { x, y, w = 600, color = C.gold, iris = C.red }) {
    const id = 'eyeclip' + (eyeN++);
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 0.65}px">
      <svg viewBox="0 0 200 130" width="${w}" height="${w * 0.65}" style="overflow:visible">
        <defs><clipPath id="${id}"><path d="M28 58 Q100 8 172 58 Q100 98 28 58 Z"/></clipPath>
          <radialGradient id="${id}g"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity=".9"/></radialGradient></defs>
        <g class="glow" style="filter:drop-shadow(0 0 0px ${iris})">
          <path class="d" d="M22 30 Q100 -6 182 26" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          <path class="d white" d="M28 58 Q100 8 172 58 Q100 98 28 58 Z" fill="${C.parchment}" fill-opacity="0" stroke="${color}" stroke-width="7" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          <g clip-path="url(#${id})">
            <circle class="iris" cx="100" cy="56" r="22" fill="url(#${id}g)" style="color:${iris}" opacity="0"/>
            <circle class="pupil" cx="100" cy="56" r="8" fill="#140d08" opacity="0"/>
            <rect class="lid" x="0" y="0" width="200" height="0" fill="${C.surface2}"/>
            <rect class="lidline" x="0" y="0" width="200" height="5" fill="${color}" opacity="0"/>
          </g>
          <path class="d" d="M172 58 L198 60" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          <path class="d" d="M96 84 L88 126" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          <path class="d" d="M116 84 Q126 120 156 113 Q173 106 163 94 Q156 87 149 96" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        </g></svg></div>`);
    const ds = el.querySelectorAll('.d'), ir = el.querySelector('.iris'), pu = el.querySelector('.pupil');
    const lid = el.querySelector('.lid'), ll = el.querySelector('.lidline'), white = el.querySelector('.white'), g = el.querySelector('.glow');
    return {
      el,
      set({ draw = 1, iris: ic = null, lid: lk = 0, glow = 0, look = 0 } = {}) {
        ds.forEach((d, i) => d.setAttribute('stroke-dashoffset', 1 - Ease.outCubic(Math.max(0, Math.min(1, draw * 1.6 - i * 0.12)))));
        const on = draw >= 0.6 ? 1 : 0;
        white.setAttribute('fill-opacity', (0.12 * on).toFixed(2));
        ir.setAttribute('opacity', on); pu.setAttribute('opacity', on);
        if (ic) ir.style.color = ic;
        ir.setAttribute('cx', 100 + look * 18); pu.setAttribute('cx', 100 + look * 18);
        const hgt = 30 + lk * 52;
        lid.setAttribute('height', lk > 0.001 ? hgt : 0);
        ll.setAttribute('y', hgt - 3); ll.setAttribute('opacity', lk > 0.001 ? 1 : 0);
        g.style.filter = `drop-shadow(0 0 ${glow * 40}px ${ic || iris})`;
      },
    };
  }

  /** Jeroglífico de persona (de pie, brazos en alto). */
  const human = (color, up = true) => `<svg viewBox="0 0 40 80" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"><circle cx="20" cy="10" r="7" fill="${color}"/><path d="M20 19v31M20 50l-10 27M20 50l10 27${up ? 'M20 29L6 15M20 29l14-14' : 'M20 29L8 44M20 29l12 15'}"/></svg>`;
  /** Jarra de cerveza egipcia con nivel de líquido (0..1). */
  let jarN = 0;
  function jar(parent, { x, y, w = 80, liquid = C.amber }) {
    const id = 'jar' + (jarN++);
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 1.5}px;transform-origin:50% 90%">
      <svg viewBox="0 0 60 90" width="${w}" height="${w * 1.5}"><defs><clipPath id="${id}"><path d="M20 12c-10 6-15 18-15 32 0 24 11 40 25 40s25-16 25-40c0-14-5-26-15-32z"/></clipPath></defs>
        <g clip-path="url(#${id})"><rect class="liq" x="0" y="90" width="60" height="90" fill="${liquid}"/></g>
        <path d="M20 12c-10 6-15 18-15 32 0 24 11 40 25 40s25-16 25-40c0-14-5-26-15-32z" fill="none" stroke="${C.papyrus}" stroke-width="4"/>
        <path d="M17 4h26v8H17z" fill="${C.papyrus}"/><path d="M14 40h32" stroke="${C.papyrus}" stroke-width="2.5" opacity=".5"/></svg></div>`);
    const liq = el.querySelector('.liq');
    return { el, fill(k, color) { liq.setAttribute('y', 90 - 76 * k); if (color) liq.setAttribute('fill', color); } };
  }
  /** Ficha de cita: el texto primario del que sale cada afirmación. */
  const citation = (title, lines, color = C.gold, label = EUREKA.lang === 'en' ? 'PRIMARY SOURCE' : 'FUENTE PRIMARIA') => `<div style="background:${C.papyrus};border-radius:22px;padding:30px 36px;box-shadow:0 30px 70px rgba(0,0,0,.55);border-left:12px solid ${color}">
      <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.14em;color:${C.oxblood}">${label}</div>
      <div class="serif" style="font-size:50px;font-weight:700;color:#1d1a17;line-height:1.08;margin-top:8px">${title}</div>
      ${lines.map((l) => `<div class="mono" style="font-size:24px;font-weight:500;color:#6b6259;margin-top:10px">${l}</div>`).join('')}</div>`;

  const END = {
    es: { tag: 'MITOS CON FUENTE', save: 'Guárdalo', share: 'Compártelo', aSave: 'guárdalo', aShare: 'compártelo',
          sub: 'griegos · romanos · nórdicos · egipcios', note: 'Basado en mythosdata.dev (CC BY 4.0) · voz y animación generadas con IA' },
    en: { tag: 'MYTHS, SOURCED', save: 'Save it', share: 'Send it', aSave: 'save', aShare: 'send',
          sub: 'Greek · Roman · Norse · Egyptian', note: 'Based on mythosdata.dev (CC BY 4.0) · voice and animation generated with AI' },
  };
  function mythosEndCard(x, opts = {}) {
    const L = { ...END[EUREKA.lang] || END.es, ...opts };
    const { site = 'mythosdata.dev', sub, note } = L;
    const r = x.root;
    const mark = eye(r, { x: 390, y: 330, w: 300, iris: C.gold });
    const logo = add(r, `<div class="abs display" style="left:0;right:0;top:540px;text-align:center;font-size:140px;font-weight:900;color:${C.ink};letter-spacing:.1em">MYTHOS</div>`);
    const tag = add(r, `<div class="abs mono" style="left:0;right:0;top:710px;text-align:center;font-size:30px;font-weight:700;color:${C.gold};letter-spacing:.16em">${L.tag}</div>`);
    const btn = (icon, label, color, left) => add(r, `<div class="abs" style="left:${left}px;top:790px;width:390px;height:130px;border-radius:30px;background:${C.surface2};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:22px;box-shadow:0 0 50px ${color}44">
        <div style="width:60px;height:60px;color:${color}">${icon}</div><span class="display" style="font-size:40px;font-weight:700;color:${C.ink}">${label}</span></div>`);
    const b1 = btn(I.bookmark, L.save, C.gold, 125);
    const b2 = btn(I.share, L.share, C.turquoise, 565);
    const siteEl = add(r, `<div class="abs display" style="left:0;right:0;top:965px;text-align:center;font-size:66px;font-weight:700;color:${C.gold}">${site}</div>`);
    const subs = add(r, `<div class="abs mono" style="left:0;right:0;top:1055px;text-align:center;font-size:26px;font-weight:500;color:${C.muted}">${sub}</div>`);
    const disc = add(r, `<div class="abs mono" style="left:0;right:0;top:1110px;text-align:center;font-size:20px;font-weight:500;color:${C.faint}">${note}</div>`);
    const tG = x.at(L.aSave), tC = x.at(L.aShare);
    x.cue(tG, 'pop', 0.8); x.cue(tC, 'pop', 0.8); x.cue(0.05, 'gong', 0.5);
    return (lt) => {
      mark.set({ draw: prog(lt, 0, 0.8), iris: C.gold, glow: 0.4 + 0.2 * Math.sin(lt * 3) });
      const l = spring(lt, 0.25, 0.5); logo.style.opacity = l > 0 ? 1 : 0; logo.style.transform = `scale(${lerp(0.7, 1, l)})`;
      tag.style.opacity = appear(lt, 0.5, 0.4);
      [[b1, tG], [b2, tC]].forEach(([b, t]) => {
        const s = spring(lt, t - 0.05, 0.4);
        b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.5, 1, s) * (1 + 0.025 * Math.sin((lt - t) * 7) * (s >= 1 ? 1 : 0))})`;
      });
      siteEl.style.opacity = appear(lt, tC + 0.3, 0.4); subs.style.opacity = appear(lt, tC + 0.5, 0.4);
      disc.style.opacity = appear(lt, 0.8, 0.5);
    };
  }

  EUREKA.ui = { rng, pill, examPaper, endCard, popText, popIn, eye, human, jar, citation, mythosEndCard };
})();
