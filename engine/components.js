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

  EUREKA.ui = { rng, pill, examPaper, endCard, popText, popIn };
})();
