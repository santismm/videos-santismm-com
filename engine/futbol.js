/* Pizarra de fútbol (EUREKA.fa): medio campo a escala visto desde arriba, fichas, balón,
 * línea de fuera de juego y piezas de la serie "mitos". Ataque hacia arriba; coordenadas en metros
 * (mx: 0..68 de izquierda a derecha, md: distancia a la línea de meta).
 * Equipos genéricos por colores: sin escudos, equipaciones ni jugadores reales.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add } = EUREKA;

  function pitch(parent, { x = 90, y = 490, w = 840, h = 520 } = {}) {
    const s = w / 68, cx = w / 2;
    const L = `stroke="rgba(255,255,255,.55)" stroke-width="4" fill="none"`;
    const stripes = Array.from({ length: Math.ceil(h / (5.5 * s)) }, (_, i) =>
      `<rect x="0" y="${i * 5.5 * s}" width="${w}" height="${5.5 * s}" fill="${i % 2 ? C.pitch : C.pitchAlt}"/>`).join('');
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:22px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${C.lineStrong}">
      <svg class="abs" viewBox="0 0 ${w} ${h}" style="inset:0;width:100%;height:100%">${stripes}
        <path d="M0 2H${w}" ${L}/>
        <rect x="${cx - 20.16 * s}" y="2" width="${40.32 * s}" height="${16.5 * s}" ${L}/>
        <rect x="${cx - 9.16 * s}" y="2" width="${18.32 * s}" height="${5.5 * s}" ${L}/>
        <path d="M${cx - 7.3 * s} ${16.5 * s + 2} A ${9.15 * s} ${9.15 * s} 0 0 0 ${cx + 7.3 * s} ${16.5 * s + 2}" ${L}/>
        <circle cx="${cx}" cy="${11 * s}" r="5" fill="rgba(255,255,255,.7)"/>
        <rect x="${cx - 3.66 * s}" y="-6" width="${7.32 * s}" height="10" fill="#fff"/>
      </svg><div class="abs items" style="inset:0"></div></div>`);
    const items = el.querySelector('.items');
    return { el, items, s, w, h, x, y, P: (mx, md) => [mx * s, md * s] };
  }

  const TEAM = () => ({ atk: [C.cyan, '#171e00'], def: ['#ffffff', '#121414'], gk: [C.amber, '#121414'], ref: ['#1b1b1b', '#ffd400'] });

  /** Ficha de jugador. Devuelve el elemento con .at(mx, md, escala=1). */
  function token(p, team, label = '') {
    const [bg, fg] = TEAM()[team];
    const R = 27;
    const el = add(p.items, `<div class="abs caption" style="left:${-R}px;top:${-R}px;width:${R * 2}px;height:${R * 2}px;border-radius:50%;background:${bg};color:${fg};display:flex;align-items:center;justify-content:center;font-size:27px;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.55), inset 0 -5px 0 rgba(0,0,0,.18)">${label}</div>`);
    el.at = (mx, md, k = 1) => { const [px, py] = p.P(mx, md); el.style.transform = `translate(${px}px, ${py}px) scale(${k})`; };
    return el;
  }

  function ball(p) {
    const R = 13;
    const el = add(p.items, `<div class="abs" style="left:${-R}px;top:${-R}px;width:${R * 2}px;height:${R * 2}px;border-radius:50%;background:radial-gradient(circle at 35% 30%, #fff, #cfd6cf 70%);border:3px solid #121414;box-shadow:0 4px 10px rgba(0,0,0,.6)"></div>`);
    el.at = (mx, md, k = 1) => { const [px, py] = p.P(mx, md); el.style.transform = `translate(${px}px, ${py}px) scale(${k})`; };
    return el;
  }

  /** Línea de fuera de juego a md metros de la meta. set(k) la dibuja de 0 a 1. */
  function offsideLine(p, md, color = C.cyan, text = 'LÍNEA DE FUERA DE JUEGO') {
    const y = md * p.s;
    const el = add(p.items, `<div class="abs" style="left:0;top:${y - 3}px;width:${p.w}px;height:6px;transform-origin:0 50%;background:repeating-linear-gradient(90deg, ${color} 0 22px, transparent 22px 36px);box-shadow:0 0 18px ${color}"></div>`);
    const lab = add(p.items, `<div class="abs mono" style="left:14px;top:${y - 34}px;font-size:19px;font-weight:700;letter-spacing:.08em;color:${color};text-shadow:0 2px 8px #000">${text}</div>`);
    return { el, lab, set(k) { el.style.transform = `scaleX(${k})`; el.style.opacity = k > 0 ? 1 : 0; lab.style.opacity = k >= 1 ? 1 : 0; } };
  }

  /** Etiqueta flotante sobre el campo (coordenadas en metros). */
  function tag(p, mx, md, text, color = C.cyan, dy = -62) {
    const [px, py] = p.P(mx, md);
    return add(p.items, `<div class="abs mono" style="left:${px}px;top:${py + dy}px;transform:translateX(-50%);white-space:nowrap;padding:6px 14px;border-radius:10px;background:rgba(18,20,20,.9);border:2px solid ${color};color:${color};font-size:20px;font-weight:700;letter-spacing:.05em">${text}</div>`);
  }

  /** Cabecera de mito: píldora "MITO n/4" + la frase entre comillas, que acaba tachada. */
  function myth(x, n, total, quote) {
    const r = x.root;
    const pillEl = add(r, `<div class="abs mono" style="left:96px;top:318px;padding:10px 22px;border-radius:999px;background:${C.red};color:#fff;font-size:27px;font-weight:700;letter-spacing:.12em">MITO ${n}/${total}</div>`);
    const q = add(r, `<div class="abs display" style="left:96px;width:830px;top:398px;font-size:48px;line-height:1.14;font-weight:600;font-style:italic;color:${C.ink}"><span style="position:relative;display:inline;background-image:linear-gradient(${C.red},${C.red});background-repeat:no-repeat;background-position:0 55%;background-size:0% 6px">«${quote}»</span></div>`);
    const span = q.firstElementChild;
    return {
      /** tStrike: instante local en que se tacha */
      update(lt, tStrike) {
        const a = spring(lt, 0.05, 0.4);
        pillEl.style.opacity = a > 0 ? 1 : 0; pillEl.style.transform = `scale(${lerp(0.6, 1, a)})`; pillEl.style.transformOrigin = '0 50%';
        q.style.opacity = appear(lt, 0.2, 0.35); q.style.transform = `translateX(${(1 - appear(lt, 0.2, 0.35)) * -40}px)`;
        const k = Ease.outCubic(prog(lt, tStrike, 0.3));
        span.style.backgroundSize = `${k * 100}% 6px`;
        span.style.color = k > 0 ? C.muted : C.ink;
      },
    };
  }

  /** Sello inclinado (FALSO, NO…). */
  function stamp(parent, text, { x, y, color = C.red, size = 84, rot = -9 }) {
    const el = add(parent, `<div class="abs caption" style="left:${x}px;top:${y}px;padding:4px 30px;border:8px solid ${color};border-radius:18px;color:${color};font-size:${size}px;font-weight:900;letter-spacing:.04em;background:rgba(18,20,20,.88);text-transform:uppercase">${text}</div>`);
    el.set = (lt, t) => {
      const k = prog(lt, t, 0.22);
      el.style.opacity = k > 0 ? 1 : 0;
      el.style.transform = `rotate(${rot}deg) scale(${lerp(2.6, 1, Ease.outCubic(k))})`;
    };
    return el;
  }

  /** Barra de veredicto bajo el campo. */
  function verdict(parent, html, { top = 1040, color = C.cyan, size = 54, icon = I.check } = {}) {
    const el = add(parent, `<div class="abs caption" style="left:90px;width:840px;top:${top}px;height:128px;border-radius:24px;background:${color};color:#121414;display:flex;align-items:center;justify-content:center;gap:18px;font-size:${size}px;font-weight:900;letter-spacing:.01em;text-align:center;line-height:1.05;box-shadow:0 0 60px ${color}55">
      <div style="width:58px;height:58px;flex:none">${icon}</div><div>${html}</div></div>`);
    el.set = (lt, t) => { const s = spring(lt, t, 0.45); el.style.opacity = s > 0 ? 1 : 0; el.style.transform = `scale(${lerp(0.7, 1, s)})`; };
    return el;
  }

  /** Banderín de árbitro asistente (cuadros rojos y amarillos). */
  const flagSvg = `<svg viewBox="0 0 200 240"><rect x="14" y="6" width="12" height="230" rx="6" fill="#d9d9d9"/><g class="cloth"><rect x="26" y="10" width="75" height="60" fill="#ffd400"/><rect x="101" y="10" width="75" height="60" fill="#ff3b30"/><rect x="26" y="70" width="75" height="60" fill="#ff3b30"/><rect x="101" y="70" width="75" height="60" fill="#ffd400"/></g></svg>`;

  /** Tarjeta final del canal. El texto debe contener «guárdalo» y «compártelo». */
  function endCard(x, { ref = 'Regla 11 · Reglas de Juego 2026/27 (IFAB)' } = {}) {
    const r = x.root;
    const logo = add(r, `<div class="abs display" style="left:0;right:0;top:350px;text-align:center;font-size:132px;font-weight:700;color:${C.ink};line-height:1">Fútbol <span style="color:${C.cyan};font-style:italic">Atlas</span></div>`);
    const tagl = add(r, `<div class="abs mono" style="left:0;right:0;top:520px;text-align:center;font-size:27px;font-weight:700;color:${C.muted};letter-spacing:.12em">EL FÚTBOL, CON EL REGLAMENTO EN LA MANO</div>`);
    const btn = (icon, label, color, left) => add(r, `<div class="abs" style="left:${left}px;top:630px;width:390px;height:140px;border-radius:34px;background:${C.surface};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:22px;box-shadow:0 0 50px ${color}44">
        <div style="width:64px;height:64px;color:${color}">${icon}</div><span class="caption" style="font-size:44px;font-weight:800;color:${C.ink}">${label}</span></div>`);
    const b1 = btn(I.bookmark, 'Guárdalo', C.amber, 125), b2 = btn(I.share, 'Compártelo', C.cyan, 565);
    const site = add(r, `<div class="abs caption" style="left:0;right:0;top:845px;text-align:center;font-size:74px;font-weight:800;color:${C.cyan}">futbolatlas.app</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:960px;text-align:center;font-size:25px;font-weight:500;color:${C.muted}">Fuente: ${ref}</div>`);
    const disc = add(r, `<div class="abs mono" style="left:0;right:0;top:1070px;text-align:center;font-size:21px;font-weight:500;color:${C.faint}">Guion basado en futbolatlas.app · voz y animación generadas con IA</div>`);
    const tG = x.at('guardalo'), tC = x.at('compartelo');
    x.cue(tG, 'pop', 0.8); x.cue(tC, 'pop', 0.8); x.cue(0.1, 'ding', 0.4);
    return (lt) => {
      const l = spring(lt, 0.05, 0.5); logo.style.opacity = l > 0 ? 1 : 0; logo.style.transform = `scale(${lerp(0.7, 1, l)})`;
      tagl.style.opacity = appear(lt, 0.3, 0.4);
      [[b1, tG], [b2, tC]].forEach(([b, t]) => {
        const s = spring(lt, t - 0.05, 0.4);
        b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.5, 1, s) * (1 + 0.025 * Math.sin((lt - t) * 7) * (s >= 1 ? 1 : 0))})`;
      });
      site.style.opacity = appear(lt, tC + 0.4, 0.4); src.style.opacity = appear(lt, tC + 0.6, 0.4);
      disc.style.opacity = appear(lt, 0.6, 0.5);
    };
  }

  /** Cabecera de la serie "Regla nueva": píldora CAMBIO n/total, referencia de la regla y titular. */
  function change(x, n, total, law, title) {
    const r = x.root;
    const row = add(r, `<div class="abs mono" style="left:96px;top:318px;display:flex;align-items:center;gap:18px;font-size:27px;font-weight:700;letter-spacing:.12em;transform-origin:0 50%">
      <span style="padding:10px 22px;border-radius:999px;background:${C.cyan};color:#121414">CAMBIO ${n}/${total}</span><span style="color:${C.muted}">${law}</span></div>`);
    const t = add(r, `<div class="abs display" style="left:96px;width:834px;top:392px;font-size:58px;line-height:1.1;font-weight:700;color:${C.ink}">${title}</div>`);
    return (lt) => {
      const a = spring(lt, 0.05, 0.4); row.style.opacity = a > 0 ? 1 : 0; row.style.transform = `scale(${lerp(0.6, 1, a)})`;
      const k = appear(lt, 0.2, 0.35); t.style.opacity = k; t.style.transform = `translateX(${(1 - k) * -40}px)`;
    };
  }

  /** Anillo de cuenta atrás. set(k, color): k = 0 (lleno, muestra `from`) → 1 (vacío, muestra 0). */
  function ring(parent, { x, y, size = 260, from = 5, unit = 's' }) {
    const R = 44, L = 2 * Math.PI * R;
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px">
      <svg viewBox="0 0 100 100" style="width:100%;height:100%;transform:rotate(-90deg)"><circle cx="50" cy="50" r="${R}" fill="rgba(10,42,18,.85)" stroke="${C.lineStrong}" stroke-width="7"/>
        <circle class="arc" cx="50" cy="50" r="${R}" fill="none" stroke="${C.cyan}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="0"/></svg>
      <div class="abs caption num" style="inset:0;display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px;font-weight:900;color:${C.ink};font-variant-numeric:tabular-nums;line-height:1">${from}</div>
      <div class="abs mono" style="left:0;right:0;bottom:${size * 0.13}px;text-align:center;font-size:${size * 0.085}px;font-weight:700;color:${C.muted};letter-spacing:.1em">${unit}</div></div>`);
    const arc = el.querySelector('.arc'), num = el.querySelector('.num');
    el.set = (k, color = C.cyan) => {
      arc.setAttribute('stroke-dashoffset', L * k); arc.setAttribute('stroke', color);
      num.textContent = Math.ceil(from * (1 - k) - 1e-6); num.style.color = k >= 1 ? color : C.ink;
    };
    return el;
  }

  /** Tarjeta de árbitro. */
  function card(parent, color, { x, y, w = 150, rot = 0 }) {
    return add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 1.4}px;border-radius:${w * 0.11}px;background:linear-gradient(160deg, ${color}, ${color}cc);box-shadow:0 18px 40px rgba(0,0,0,.55), inset 0 0 0 3px rgba(255,255,255,.25);transform:rotate(${rot}deg)"></div>`);
  }

  EUREKA.fa = { change, ring, card, pitch, token, ball, offsideLine, tag, myth, stamp, verdict, flagSvg, endCard };
})();
