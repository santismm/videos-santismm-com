/* HISPANIC LEGACY #06 · "«El mayor imperio de la historia» es una frase sobre mapas" (ES / EN)
 * Fuente: hispanic-legacy.com/k/cartographic-extent-vs-effective-control (verificada el 09-08-2026):
 *  c1 · Las series de tamaño de imperios se construyen con atlas históricos: Taagepera define los estados como
 *       "the different colored patches in historical atlases". Miden convención cartográfica, no administración.
 *  c2 · En la reconstrucción de Taagepera, el Imperio británico alcanza unos 35 Mm² hacia 1920; España,
 *       13-14 Mm² hacia 1780.
 *  c3 · La estadística británica de 1921 suma dominios, colonias, protectorados y mandatos en un solo total.
 *  c4 · Las cifras "efectivas" alternativas (España 8-10 Mm², Gran Bretaña 12-15 Mm²…) tampoco son
 *       reproducibles: les faltan año, polígonos, reglas de clasificación y fuentes.
 *  c5 · Alternativa: informar por separado de cada tipo de estatus (reclamación, control directo, indirecto…)
 *       en lugar de un único número.
 * Los cuadrados de la escena "cifras" tienen áreas proporcionales a 35 y 13,5.
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn } = EUREKA.ui;
  const { endCard, stamp, stampIn, DARK, L } = EUREKA.hl;

  EUREKA.video = { keywords: L(['mayor', 'gobiernos', 'mapas', 'atlas', 'mancha', '35', '13', '14', 'gobernarlo', 'reclamaciones', 'tampoco', 'año', 'reglas', 'dónde', 'cuándo'],
    ['largest', 'governments', 'maps', 'atlases', 'patch', '35', '13', '14', 'governing', 'claims', 'either', 'year', 'rules', 'where', 'when']) };
  const row = (r, top, html, size = 30) => add(r, `<div class="abs" style="left:0;right:0;top:${top}px;text-align:center;font-size:${size}px">${html}</div>`);
  const PAPER = '#f8f0dc', INK = '#1a1814', SEPIA = '#4a4638';
  const BLOB = 'M170 250 Q120 150 230 110 Q330 60 430 120 Q540 90 600 180 Q690 230 640 330 Q660 440 540 460 Q450 520 340 470 Q210 480 180 380 Q130 320 170 250Z';

  // ───────────────────────── 1 · HOOK ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const q = add(r, `<div class="abs display" style="left:90px;right:90px;top:340px;text-align:center;font-size:${L(92, 80)}px;font-weight:900;line-height:1.06;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('«El mayor imperio<br>de la historia»', '“The largest empire<br>in history”')}</div>`);
    const g = add(r, `<div class="abs" style="left:0;right:0;top:680px;text-align:center"><span class="display" style="position:relative;display:inline-block;padding:10px 44px;border-radius:22px;border:4px solid ${C.lineStrong};background:${DARK};font-size:72px;font-weight:900;color:${C.muted}">${L('GOBIERNOS', 'GOVERNMENTS')}
        <span class="strike" style="position:absolute;left:-12px;top:50%;height:10px;width:0;margin-top:-5px;border-radius:5px;background:${C.red}"></span></span></div>`);
    const m = add(r, `<div class="abs" style="left:0;right:0;top:860px;text-align:center"><span class="display" style="display:inline-block;padding:14px 70px;border-radius:26px;border:8px solid ${C.gold};background:${DARK};font-size:150px;font-weight:900;line-height:1.1;color:${C.gold};box-shadow:0 0 70px ${C.gold}55">${L('MAPAS', 'MAPS')}</span></div>`);
    const strike = g.querySelector('.strike');
    const tG = x.at(L('gobiernos', 'governments')), tM = x.at(L('mapas', 'maps'));
    x.cue(0.1, 'rise', 0.5); x.cue(0.5, 'ding', 0.6); x.cue(tG - 0.4, 'swipe', 0.6); x.cue(tG + 0.2, 'buzz', 0.6); x.cue(tM - 0.35, 'rise', 0.7); x.cue(tM, 'boom', 1); x.shake(tM, 16);
    return (lt) => {
      popIn(q, lt, 0.1, 0.7);
      popIn(g, lt, tG - 0.4, 0.7);
      strike.style.width = `calc(${Ease.outCubic(prog(lt, tG + 0.2, 0.35)) * 100}% + 24px)`;
      const s = spring(lt, tM, 0.4); m.style.opacity = s > 0 ? 1 : 0; m.style.transform = `scale(${lerp(2.2, 1, s)})`;
    };
  });

  // ───────────────────────── 2 · LA MANCHA DEL ATLAS ─────────────────────────
  scene('atlas', (x) => {
    const r = x.root;
    const head = row(r, 330, pill(L('¿DE DÓNDE SALEN LAS CIFRAS?', 'WHERE DO THE NUMBERS COME FROM?'), C.gold), 30);
    const page = add(r, `<div class="abs" style="left:110px;top:430px;width:860px;height:640px;border-radius:16px;background:${PAPER};box-shadow:0 30px 70px rgba(0,0,0,.65);overflow:hidden">
        <div class="mono" style="padding:18px 34px;background:#d8ccb0;color:${SEPIA};font-size:24px;font-weight:700;letter-spacing:.14em">${L('ATLAS HISTÓRICO', 'HISTORICAL ATLAS')}</div>
        <svg viewBox="60 40 700 500" width="860" height="560" style="position:absolute;left:0;top:64px">
          <defs><clipPath id="sweep"><rect class="cl" x="60" y="40" width="0" height="500"/></clipPath></defs>
          <path d="M60 140H760M60 240H760M60 340H760M60 440H760M200 40V540M340 40V540M480 40V540M620 40V540" stroke="#d8ccb0" stroke-width="2"/>
          <path d="M80 90 Q150 60 190 110 Q160 170 100 150Z M660 420 Q730 400 740 470 Q700 520 650 480Z M610 70 Q700 50 720 110 Q680 150 620 130Z" fill="#e5d9bd" stroke="${SEPIA}" stroke-width="3"/>
          <path d="${BLOB}" fill="#e5d9bd" stroke="${SEPIA}" stroke-width="4"/>
          <path d="${BLOB}" fill="${C.amber}" stroke="#7a1f0a" stroke-width="4" clip-path="url(#sweep)"/>
        </svg>
        <div class="area display" style="position:absolute;left:0;right:0;top:300px;text-align:center;font-size:74px;font-weight:900;color:${INK}">= km²</div></div>`);
    const cl = page.querySelector('.cl'), area = page.querySelector('.area');
    const cite = add(r, `<div class="abs mono" style="left:110px;right:110px;top:1096px;text-align:center;font-size:23px;line-height:1.4;font-weight:700;color:${C.muted}">Taagepera: «the different colored patches in historical atlases»</div>`);
    const tA = x.at('atlas'), tM = x.at(L('mancha', 'patch')), tP = x.at(L('pinta', 'paints'));
    x.cue(0.15, 'pop', 0.6); x.cue(tA - 0.2, 'whoosh', 0.8); x.cue(tM - 0.1, 'rise', 0.7); x.cue(tP, 'ding', 0.8);
    return (lt) => {
      popIn(head, lt, 0.15, 0.7);
      const k = Ease.outCubic(prog(lt, tA - 0.3, 0.5));
      page.style.opacity = k; page.style.transform = `translateY(${(1 - k) * 120}px) rotate(${lerp(3, -0.8, k)}deg)`;
      cl.setAttribute('width', 700 * Ease.inOutCubic(prog(lt, tM - 0.2, 1.1)));
      const s = spring(lt, tP, 0.4); area.style.opacity = s > 0 ? 1 : 0; area.style.transform = `scale(${lerp(0.5, 1, s)})`;
      cite.style.opacity = appear(lt, tM + 0.4, 0.5);
    };
  });

  // ───────────────────────── 3 · LAS CIFRAS ─────────────────────────
  scene('cifras', (x) => {
    const r = x.root;
    const head = row(r, 330, pill(L('MILLONES DE km² · SEGÚN LOS ATLAS', 'MILLION km² · ACCORDING TO ATLASES'), C.ink), 28);
    const A = 400, B = Math.round(A * Math.sqrt(13.5 / 35)), BASE = 870;
    const sq = (left, side, color, name, when) => add(r, `<div class="abs" style="left:${left}px;top:${BASE - side}px;width:${side}px;height:${side}px">
        <div class="s" style="position:absolute;left:0;bottom:0;width:100%;height:100%;border-radius:14px;background:${color};transform-origin:0 100%;box-shadow:0 20px 50px rgba(0,0,0,.5)"></div>
        <div class="mono" style="position:absolute;left:0;bottom:${side + 16}px;white-space:nowrap;font-size:27px;font-weight:700;letter-spacing:.08em;color:${C.ink}">${name}</div>
        <div style="position:absolute;left:0;top:${side + 14}px;white-space:nowrap"><span class="display n" style="font-size:112px;font-weight:900;color:${color};line-height:1"></span>
          <div class="mono" style="font-size:27px;font-weight:700;color:${C.muted};letter-spacing:.06em;margin-top:2px">${when}</div></div></div>`);
    const gb = sq(96, A, C.sky, L('IMPERIO BRITÁNICO', 'BRITISH EMPIRE'), L('HACIA 1920', 'AROUND 1920'));
    const es = sq(600, B, C.gold, L('IMPERIO ESPAÑOL', 'SPANISH EMPIRE'), L('HACIA 1780', 'AROUND 1780'));
    const tB = x.at(L('británico', 'british')), t35 = x.at('35'), tE = x.at(L('español', 'spanish')), t13 = x.at('13');
    x.cue(0.15, 'pop', 0.6); x.cue(tB, 'swipe', 0.6); for (let i = 0; i < 8; i++) x.cue(t35 + i * 0.07, 'tick', 0.3); x.cue(x.at('1920'), 'ding', 0.7);
    x.cue(tE, 'swipe', 0.6); for (let i = 0; i < 6; i++) x.cue(t13 + i * 0.07, 'tick', 0.3); x.cue(x.at('1780'), 'ding', 0.7);
    return (lt) => {
      popIn(head, lt, 0.15, 0.7);
      const ka = Ease.outCubic(prog(lt, t35 - 0.15, 0.8)), kb = Ease.outCubic(prog(lt, t13 - 0.15, 0.7));
      gb.style.opacity = appear(lt, tB - 0.1, 0.25); es.style.opacity = appear(lt, tE - 0.1, 0.25);
      gb.querySelector('.s').style.transform = `scale(${Math.max(0.02, Math.sqrt(ka))})`;
      es.querySelector('.s').style.transform = `scale(${Math.max(0.02, Math.sqrt(kb))})`;
      gb.querySelector('.n').textContent = '≈ ' + Math.round(35 * ka);
      es.querySelector('.n').textContent = kb < 1 ? Math.round(13.5 * kb) : '13–14';
    };
  });

  // ───────────────────────── 4 · PINTAR NO ES GOBERNAR ─────────────────────────
  scene('problema', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs display" style="left:0;right:0;top:322px;text-align:center;font-size:${L(84, 76)}px;font-weight:900;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.85)">${L('PINTAR <span style="color:' + C.amber + '">≠</span> GOBERNAR', 'PAINTING <span style="color:' + C.amber + '">≠</span> GOVERNING')}</div>`);
    // Una misma mancha, repartida en zonas de estatus distinto
    const zones = [
      ['M60 40H420V300H60Z', L('COLONIAS', 'COLONIES'), 240, 170, 'none'],
      ['M420 40H760V230H420Z', L('PROTECTORADOS', 'PROTECTORATES'), 590, 135, 'url(#h1)'],
      ['M420 230H760V540H420Z', L('RECLAMACIONES', 'CLAIMS'), 590, 385, 'url(#h2)'],
      ['M60 300H420V540H60Z', L('DOMINIOS · MANDATOS', 'DOMINIONS · MANDATES'), 240, 420, 'url(#h3)'],
    ];
    const box = add(r, `<div class="abs" style="left:110px;top:470px;width:860px;height:610px">
        <svg viewBox="60 40 700 500" width="860" height="610">
          <defs>
            <clipPath id="blob"><path d="${BLOB}"/></clipPath>
            <pattern id="h1" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="22" height="22" fill="${C.amber}"/><rect width="9" height="22" fill="#b34a26"/></pattern>
            <pattern id="h2" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#3a2a22"/><circle cx="13" cy="13" r="5" fill="${C.amber}"/></pattern>
            <pattern id="h3" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="${C.amber}"/><rect width="22" height="7" fill="#7a2f14"/></pattern>
          </defs>
          <g clip-path="url(#blob)"><rect x="60" y="40" width="700" height="500" fill="${C.amber}"/>
            ${zones.map(([d, , , , f]) => `<path class="z" d="${d}" fill="${f === 'none' ? C.amber : f}" stroke="${C.bg}" stroke-width="7" opacity="0"/>`).join('')}</g>
          <path d="${BLOB}" fill="none" stroke="${C.ink}" stroke-width="5"/>
        </svg>
        ${zones.map(([, name, zx, zy]) => `<div class="lb mono" style="position:absolute;left:${(zx - 60) / 700 * 860}px;top:${(zy - 40) / 500 * 610}px;transform:translate(-50%,-50%);white-space:nowrap;padding:8px 16px;border-radius:12px;background:${DARK};font-size:25px;font-weight:700;letter-spacing:.06em;color:${C.ink}">${name}</div>`).join('')}</div>`);
    const zs = [...box.querySelectorAll('.z')], lbs = [...box.querySelectorAll('.lb')];
    const one = row(r, 1100, pill(L('UN SOLO COLOR EN EL MAPA', 'ONE COLOUR ON THE MAP'), C.amber), 28);
    const tG = x.at(L('gobernarlo', 'governing')), tC = x.at(L('colonias', 'colonies')), tP = x.at(L('protectorados', 'protectorates')), tR = x.at(L('reclamaciones', 'claims'));
    const tz = [tC, tP, tR, tR + 0.45];
    x.cue(0.15, 'pop', 0.6); x.cue(tG, 'boom', 0.8); x.shake(tG, 10); tz.forEach((t) => x.cue(t, 'pop', 0.75));
    return (lt) => {
      popIn(head, lt, tG - 0.5, 0.7);
      box.style.opacity = appear(lt, 0.1, 0.4);
      zs.forEach((z, i) => z.setAttribute('opacity', appear(lt, tz[i], 0.25)));
      lbs.forEach((l, i) => { const s = spring(lt, tz[i], 0.35); l.style.opacity = s > 0 ? 1 : 0; l.style.transform = `translate(-50%,-50%) scale(${lerp(0.5, 1, s)})`; });
      one.style.opacity = appear(lt, x.at(L('color', 'colour')) - 0.2, 0.3);
    };
  });

  // ───────────────────────── 5 · LAS CIFRAS ALTERNATIVAS ─────────────────────────
  scene('alternativas', (x) => {
    const r = x.root;
    const post = add(r, `<div class="abs" style="left:110px;top:340px;width:860px;height:330px;border-radius:30px;background:${DARK};border:3px solid ${C.lineStrong};padding:30px 36px;box-sizing:border-box">
        <div style="display:flex;align-items:center;gap:18px"><div style="width:66px;height:66px;border-radius:50%;background:${C.lineStrong}"></div><div><div style="width:220px;height:18px;border-radius:9px;background:${C.lineStrong}"></div><div style="width:140px;height:14px;border-radius:7px;background:${C.line};margin-top:10px"></div></div></div>
        <div class="display" style="font-size:${L(62, 60)}px;font-weight:900;line-height:1.15;color:${C.ink};margin-top:26px">${L('«Control efectivo real:<br>8-10 millones de km²»', '“Real effective control:<br>8–10 million km²”')}</div></div>`);
    const qs = L(['¿QUÉ AÑO MIDE?', '¿CON QUÉ REGLAS?', '¿CON QUÉ FUENTES?'], ['WHICH YEAR?', 'BY WHAT RULES?', 'FROM WHAT SOURCES?']);
    const rows = qs.map((t, i) => add(r, `<div class="abs" style="left:110px;top:${730 + i * 132}px;width:860px;height:112px;border-radius:24px;background:${DARK};border:4px solid ${C.red};display:flex;align-items:center;justify-content:space-between;padding:0 36px;box-sizing:border-box">
        <span class="display" style="font-size:56px;font-weight:900;color:${C.ink}">${t}</span><div style="width:76px;height:76px;color:${C.red}">${I.cross}</div></div>`));
    const st = stamp(r, L('TAMPOCO VALEN', 'NO BETTER'), 575, C.red, L(80, 96));
    const tA = x.at(L('alternativas', 'alternative')), tT = x.at(L('tampoco', 'hold')), tY = x.at(L('año', 'year')), tR = x.at(L('reglas', 'rules'));
    const tr = [tY - 0.2, tR - 0.35, tR + 0.25];
    x.cue(tA - 0.2, 'swipe', 0.6); x.cue(tT + 0.05, 'stamp', 1); x.shake(tT + 0.05, 14); tr.forEach((t) => x.cue(t, 'buzz', 0.5));
    return (lt) => {
      popIn(post, lt, tA - 0.25, 0.8);
      stampIn(st, lt, tT + 0.05, -7);
      rows.forEach((e, i) => popIn(e, lt, tr[i], 0.75));
    };
  });

  // ───────────────────────── 6 · LA PREGUNTA ÚTIL ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const old = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center"><span class="display" style="position:relative;display:inline-block;font-size:${L(58, 68)}px;font-weight:900;color:${C.muted}">${L('¿CUÁL FUE MÁS GRANDE?', 'WHICH WAS BIGGER?')}
        <span class="strike" style="position:absolute;left:-12px;top:52%;height:10px;width:0;border-radius:5px;background:${C.red}"></span></span></div>`);
    const strike = old.querySelector('.strike');
    const qs = [[L('¿QUÉ', 'WHAT'), L('controlaba de verdad', 'did it really control')], [L('¿DÓNDE', 'WHERE'), L('y con qué estatus', 'and under what status')], [L('¿CUÁNDO', 'WHEN'), L('en qué año concreto', 'in which exact year')]];
    const cards = qs.map(([a, b], i) => add(r, `<div class="abs" style="left:110px;top:${500 + i * 210}px;width:860px;height:180px;border-radius:28px;background:${DARK};border:5px solid ${C.gold};display:flex;align-items:center;gap:30px;padding:0 40px;box-sizing:border-box;box-shadow:0 0 50px ${C.gold}33">
        <span class="display" style="font-size:${L(92, 96)}px;font-weight:900;color:${C.gold};white-space:nowrap">${a}${L('?', '?')}</span><span class="mono" style="font-size:27px;font-weight:700;letter-spacing:.06em;color:${C.ink};line-height:1.35">${b.toUpperCase()}</span></div>`));
    const tG = x.at(L('grande', 'bigger')), tw = [x.at(L('qué', 'what')), x.at(L('dónde', 'where')), x.at(L('cuándo', 'when'))];
    x.cue(0.15, 'pop', 0.6); x.cue(tG, 'buzz', 0.6); tw.forEach((t, i) => x.cue(t, i === 2 ? 'boom' : 'ding', 0.9)); x.shake(tw[2], 10);
    return (lt) => {
      popIn(old, lt, x.at(L('cuál', 'which')) - 0.3, 0.7);
      strike.style.width = `calc(${Ease.outCubic(prog(lt, tG, 0.35)) * 100}% + 24px)`;
      cards.forEach((c, i) => popIn(c, lt, tw[i] - 0.08, 0.7));
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/cartographic-extent-vs-effective-control', tCompartir: 0.3 }));
})();
