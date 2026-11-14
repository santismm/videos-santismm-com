/* HISPANIC LEGACY #02 · "El vanadio se descubrió dos veces (y la primera fue en México)"
 * Fuente: hispanic-legacy.com/k/andres-manuel-del-rio (verificada el 08-08-2026), que cita la historia del elemento
 * de la Royal Society of Chemistry (periodic-table.rsc.org/element/23/vanadium, leída el 14-11-2026):
 *  c1 · En 1801, en México, Del Río halla un elemento nuevo en un mineral de plomo y envía una muestra a París;
 *       los químicos franceses concluyen, erróneamente, que es un mineral de cromo, y el hallazgo queda apartado.
 *  c2 · Sefström lo redescubre, lo separa del hierro fundido, demuestra que es nuevo y lo llama vanadio por Vanadis.
 *  c3 · La RSC registra el doble descubrimiento y atribuye el primero a Del Río ("Discovery date 1801 ·
 *       Discovered by Andrés Manuel del Rio").
 * Tomado directamente de la RSC (no está en la ficha): Del Río era profesor de mineralogía en Ciudad de México;
 * el redescubrimiento es de 1831 en Estocolmo; cerca del 80 % del vanadio se usa como aditivo del acero
 * (herramientas, ejes…); número atómico 23 y masa 50,942 (cromo: 24 y 51,996).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn } = EUREKA.ui;
  const { endCard, year, stamp, stampIn, plate, plateIn, tile, DARK } = EUREKA.hl;

  EUREKA.video = { keywords: ['dos', 'veces', 'México', 'nuevo', 'cromo', 'equivocaban', 'vanadio', 'Vanadis', '1801', 'primera'] };
  const row = (r, top, html, size = 30) => add(r, `<div class="abs" style="left:0;right:0;top:${top}px;text-align:center;font-size:${size}px">${html}</div>`);

  // ───────────────────────── 1 · HOOK ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const t = tile(r, { x: 360, y: 400, size: 360, sym: 'V', num: 23, name: 'VANADIO', mass: '50,942' });
    const steel = add(r, `<div class="abs" style="left:0;right:0;top:850px;display:flex;justify-content:center;align-items:center;gap:18px">
        <div style="width:64px;height:64px;color:${C.sky}">${I.wrench}</div>${pill('EL 80 % ACABA EN EL ACERO', C.sky, 'font-size:30px')}</div>`);
    const x2 = add(r, `<div class="abs display" style="left:745px;top:300px;font-size:170px;font-weight:900;color:${C.amber};text-shadow:0 10px 30px rgba(0,0,0,.85)">×2</div>`);
    const mx = row(r, 960, pill('1.ª VEZ · CIUDAD DE MÉXICO, 1801', C.gold), 32);
    const tA = x.at('acero'), tD = x.at('dos'), tM = x.at('méxico');
    x.cue(0.1, 'ding', 0.6); x.cue(tA, 'pop', 0.7); x.cue(tD - 0.35, 'rise', 0.6); x.cue(tD + 0.05, 'boom', 0.9); x.shake(tD + 0.05, 14); x.cue(tM, 'ding', 0.8);
    return (lt) => {
      const s = popIn(t, lt, 0.05, 0.6, 0.5);
      t.style.transform = `scale(${lerp(0.6, 1, s) * (1 + 0.012 * Math.sin(lt * 3))}) rotate(${Math.sin(lt * 1.3) * 1.5}deg)`;
      popIn(steel, lt, tA - 0.15, 0.7);
      const k = spring(lt, tD + 0.05, 0.35);
      x2.style.opacity = k > 0 ? 1 : 0; x2.style.transform = `rotate(12deg) scale(${lerp(2.6, 1, k)})`;
      popIn(mx, lt, tM - 0.1, 0.7);
    };
  });

  // ───────────────────────── 2 · MÉXICO, 1801 ─────────────────────────
  scene('mexico', (x) => {
    const r = x.root;
    const y = year(r, '1801', 'CIUDAD DE MÉXICO');
    const pl = plate(r, 'Andrés Manuel del Río', 'PROFESOR DE MINERALOGÍA', 590);
    // Racimo de cristales hexagonales rojizos sobre roca
    const hex = (cx, cy, w, h, c1, c2, rot) => `<g transform="translate(${cx},${cy}) rotate(${rot})">
        <path d="M${-w / 2},0 L${-w / 4},${-h} L${w / 4},${-h} L${w / 2},0Z" fill="${c1}"/>
        <path d="M${-w / 4},${-h} L0,${-h - w * 0.28} L${w / 4},${-h}Z" fill="${c2}"/>
        <path d="M${-w / 4},${-h} L${-w * 0.05},0 L${-w / 2},0Z" fill="rgba(0,0,0,.22)"/></g>`;
    const rock = add(r, `<div class="abs" style="left:110px;top:770px;width:560px;height:340px">
        <svg viewBox="0 0 560 340" width="560" height="340">
          <path d="M20 330 Q10 250 80 235 L190 215 Q300 190 400 225 L500 245 Q560 270 540 330Z" fill="#3b3a35" stroke="#1d1c19" stroke-width="5"/>
          <path d="M80 235 L190 215 L230 330 L60 330Z" fill="rgba(255,255,255,.05)"/>
          ${hex(150, 240, 80, 120, '#c8452b', '#f08a55', -16)}${hex(250, 225, 96, 170, '#d9532f', '#ffa368', -3)}
          ${hex(345, 232, 84, 140, '#b53a22', '#ea7a48', 12)}${hex(430, 250, 66, 96, '#c8452b', '#f08a55', 24)}${hex(205, 245, 54, 80, '#a8341f', '#e06c3f', -28)}
        </svg></div>`);
    const lbl = add(r, `<div class="abs" style="left:110px;width:560px;top:1120px;text-align:center;font-size:27px">${pill('MINERAL DE PLOMO', C.ink)}</div>`);
    const lens = add(r, `<div class="abs" style="left:0;top:0;width:190px;height:190px;color:${C.ink};filter:drop-shadow(0 10px 16px rgba(0,0,0,.7))">${I.search}</div>`);
    const q = tile(r, { x: 720, y: 790, size: 230, sym: '?', name: 'ELEMENTO NUEVO' });
    const tA = x.at('andrés'), tAn = x.at('analiza'), tE = x.at('encuentra'), tN = x.at('nuevo');
    x.cue(0.25, 'ding', 0.6); x.cue(tA - 0.15, 'swipe', 0.6); x.cue(tAn - 0.1, 'pop', 0.7); x.cue(tE - 0.3, 'rise', 0.7); x.cue(tE + 0.15, 'boom', 0.8); x.cue(tN, 'ding', 0.8);
    return (lt) => {
      popIn(y, lt, 0.15, 0.7);
      plateIn(pl, lt, tA - 0.2);
      popIn(rock, lt, tAn - 0.2, 0.7); popIn(lbl, lt, x.at('mineral', 1) - 0.1, 0.7);
      const k = Ease.inOutCubic(prog(lt, tAn, tE - tAn));
      lens.style.opacity = appear(lt, tAn - 0.05, 0.3) * (1 - prog(lt, tE + 0.2, 0.4));
      lens.style.transform = `translate(${lerp(120, 420, k) + Math.sin(lt * 5) * 10}px, ${lerp(800, 740, k) + Math.cos(lt * 4) * 14}px)`;
      const s = spring(lt, tE + 0.15, 0.45);
      q.style.opacity = s > 0 ? 1 : 0;
      q.style.transform = `scale(${lerp(0.3, 1, s) * (1 + 0.03 * Math.sin(lt * 6))})`;
    };
  });

  // ───────────────────────── 3 · PARÍS SE EQUIVOCA ─────────────────────────
  scene('paris', (x) => {
    const r = x.root;
    const city = (name, left) => add(r, `<div class="abs" style="left:${left}px;top:470px;width:250px;padding:18px 0;border-radius:22px;background:${DARK};border:3px solid ${C.lineStrong};text-align:center">
        <div class="display" style="font-size:50px;font-weight:700;color:${C.ink}">${name}</div></div>`);
    const a = city('México', 96), b = city('París', 734);
    const arc = add(r, `<svg class="abs" style="left:0;top:300px" width="1080" height="220" viewBox="0 0 1080 220"><path d="M221 165 Q540 -70 859 165" fill="none" stroke="${C.gold}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 16"/></svg>`);
    const vial = add(r, `<div class="abs" style="left:-32px;top:-48px;width:64px;height:96px;filter:drop-shadow(0 8px 12px rgba(0,0,0,.7))">
        <svg viewBox="0 0 64 96"><path d="M20 6h24M24 6v30L8 78a10 10 0 0 0 9 14h30a10 10 0 0 0 9-14L40 36V6" fill="rgba(248,240,220,.14)" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M19 58h26l9 22a6 6 0 0 1-6 8H16a6 6 0 0 1-6-8z" fill="#e2643a"/></svg></div>`);
    const card = add(r, `<div class="abs" style="left:110px;top:640px;width:860px;height:270px;border-radius:30px;background:${C.ink};box-shadow:0 30px 70px rgba(0,0,0,.6);overflow:hidden">
        <div class="mono" style="padding:16px 34px;background:#d8ccb0;color:#4a4638;font-size:25px;font-weight:700;letter-spacing:.14em">RESPUESTA DE PARÍS</div>
        <div class="display l1" style="position:absolute;left:34px;top:78px;font-size:66px;font-weight:900;color:#1a1814">«No es nuevo»</div>
        <div class="display l2" style="position:absolute;left:34px;top:170px;font-size:44px;font-weight:500;color:#4a4638">Es un mineral de cromo.</div></div>`);
    const cr = tile(r, { x: 760, y: 668, size: 180, sym: 'Cr', num: 24, name: 'CROMO', color: C.sky });
    const err = stamp(r, 'ERROR', 690, C.red, 130);
    const q = tile(r, { x: 190, y: 950, size: 170, sym: '?', name: '1801' });
    const ap = add(r, `<div class="abs" style="left:400px;top:1010px;font-size:32px">${pill('HALLAZGO APARTADO', C.muted)}</div>`);
    const tE = x.at('envía'), tP = x.at('parís'), tQ = x.at('químicos'), tNo = x.at('no'), tC = x.at('cromo'), tEq = x.at('equivocaban'), tAp = x.at('apartado');
    x.cue(tE, 'whoosh', 0.7); x.cue(tP + 0.2, 'pop', 0.7); x.cue(tQ - 0.1, 'swipe', 0.6); x.cue(tNo, 'buzz', 0.6); x.cue(tC, 'pop', 0.7);
    x.cue(tEq + 0.1, 'stamp', 1); x.shake(tEq + 0.1, 16); x.cue(tAp - 0.1, 'swipe', 0.5);
    return (lt) => {
      popIn(a, lt, 0.05, 0.8); popIn(b, lt, 0.2, 0.8);
      arc.style.opacity = appear(lt, 0.2, 0.4);
      const k = Ease.inOutCubic(prog(lt, tE, tP + 0.3 - tE)), u = 1 - k;
      const vx = u * u * 221 + 2 * u * k * 540 + k * k * 859, vy = 300 + u * u * 165 + 2 * u * k * -70 + k * k * 165;
      vial.style.opacity = appear(lt, tE - 0.1, 0.2) * (1 - prog(lt, tQ - 0.2, 0.3));
      vial.style.transform = `translate(${vx}px, ${vy}px) rotate(${lerp(-25, 25, k)}deg)`;
      popIn(card, lt, tQ - 0.15, 0.8);
      card.querySelector('.l1').style.opacity = appear(lt, tNo - 0.05, 0.25);
      card.querySelector('.l2').style.opacity = appear(lt, x.at('es', 1) - 0.05, 0.25);
      popIn(cr, lt, tC - 0.1, 0.5);
      stampIn(err, lt, tEq + 0.1, -8);
      const f = prog(lt, tAp - 0.1, 0.6);
      popIn(q, lt, x.at('hallazgo') - 0.15, 0.6);
      q.style.filter = `grayscale(${f}) brightness(${lerp(1, 0.55, f)})`;
      popIn(ap, lt, tAp - 0.05, 0.7);
    };
  });

  // ───────────────────────── 4 · SUECIA, 1831 ─────────────────────────
  scene('suecia', (x) => {
    const r = x.root;
    const X0 = 150, X1 = 930;
    const tlb = add(r, `<div class="abs" style="left:0;top:330px;width:1080px;height:170px">
        <div class="display cnt" style="position:absolute;left:0;right:0;top:0;text-align:center;font-size:64px;font-weight:900;color:${C.gold};text-shadow:0 6px 20px rgba(0,0,0,.8)">+0 AÑOS</div>
        <div style="position:absolute;left:${X0}px;top:92px;width:${X1 - X0}px;height:8px;border-radius:4px;background:${C.line}"><div class="fill" style="height:100%;width:0;border-radius:4px;background:${C.gold};box-shadow:0 0 14px ${C.gold}"></div></div>
        <div style="position:absolute;left:${X0 - 13}px;top:83px;width:26px;height:26px;border-radius:50%;background:${C.gold}"></div>
        <div class="n2" style="position:absolute;left:${X1 - 13}px;top:83px;width:26px;height:26px;border-radius:50%;background:${C.line}"></div>
        <div class="mono" style="position:absolute;left:${X0 - 40}px;top:122px;font-size:26px;font-weight:700;letter-spacing:.08em;color:${C.ink}">1801 · MÉXICO</div>
        <div class="mono" style="position:absolute;right:${1080 - X1 - 40}px;top:122px;font-size:26px;font-weight:700;letter-spacing:.08em;color:${C.ink}">1831 · ESTOCOLMO</div></div>`);
    const pl = plate(r, 'Sefström', 'QUÍMICO SUECO', 540);
    const iron = add(r, `<div class="abs" style="left:110px;top:800px;width:340px;text-align:center">
        <svg viewBox="0 0 340 170" width="340" height="170"><path d="M50 30h240l40 110H10z" fill="#7d858a" stroke="#22272a" stroke-width="5" stroke-linejoin="round"/><path d="M50 30h240l-18 34H68z" fill="#aab3b8"/><path d="M10 140l58-76M330 140l-58-76" stroke="#22272a" stroke-width="4"/></svg>
        <div style="font-size:27px;margin-top:10px">${pill('HIERRO FUNDIDO', C.ink)}</div></div>`);
    const arrow = add(r, `<svg class="abs" style="left:462px;top:850px" width="90" height="60" viewBox="0 0 90 60"><path d="M6 30H78M56 8l24 22-24 22" fill="none" stroke="${C.gold}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
    const t = tile(r, { x: 570, y: 690, size: 330, sym: '?', num: '', name: '', mass: '' });
    const sym = t.querySelector('.ts'), num = t.querySelector('.tn'), nm = t.querySelector('.tl'), ms = t.querySelector('.tm');
    const vd = row(r, 1112, pill('VANADIS · DIOSA NÓRDICA', C.teal), 30);
    const tT = x.at('treinta'), tS = x.at('sueco'), tEn = x.at('encuentra'), tH = x.at('hierro'), tN = x.at('nuevo'), tV = x.at('vanadio'), tVs = x.at('vanadis');
    for (let i = 0; i < 9; i++) x.cue(tT + i * 0.09, 'tick', 0.3);
    x.cue(tS - 0.15, 'swipe', 0.6); x.cue(tEn, 'pop', 0.7); x.cue(tH, 'pop', 0.6); x.cue(tN, 'ding', 0.7); x.cue(tV - 0.4, 'rise', 0.7); x.cue(tV, 'boom', 1); x.shake(tV, 12); x.cue(tVs, 'ding', 0.6);
    return (lt) => {
      tlb.style.opacity = appear(lt, 0.05, 0.3);
      const k = Ease.outCubic(prog(lt, tT, 1.0));
      tlb.querySelector('.fill').style.width = k * 100 + '%';
      tlb.querySelector('.cnt').textContent = `+${Math.round(30 * k)} AÑOS`;
      tlb.querySelector('.n2').style.background = k >= 1 ? C.gold : C.line;
      plateIn(pl, lt, tS - 0.2);
      popIn(t, lt, tEn - 0.1, 0.5);
      popIn(iron, lt, tH - 0.15, 0.7); arrow.style.opacity = appear(lt, tH + 0.2, 0.3);
      // Giro de la casilla: de "?" a "V"
      const f = prog(lt, tV - 0.12, 0.36), named = f >= 0.5;
      if (lt > tEn - 0.1) t.style.transform = `scaleX(${Math.max(0.02, Math.abs(Math.cos(f * Math.PI)))}) scale(${1 + 0.06 * Math.sin(Math.PI * f) + 0.02 * Math.sin(lt * 5) * prog(lt, tN, 0.3) * (1 - f)})`;
      sym.textContent = named ? 'V' : '?'; num.textContent = named ? '23' : ''; nm.textContent = named ? 'VANADIO' : ''; ms.textContent = named ? '50,942' : '';
      popIn(vd, lt, tVs - 0.1, 0.7);
    };
  });

  // ───────────────────────── 5 · LO QUE DICE HOY LA FICHA ─────────────────────────
  scene('hoy', (x) => {
    const r = x.root;
    const t = tile(r, { x: 395, y: 335, size: 290, sym: 'V', num: 23, name: 'VANADIO', mass: '50,942' });
    const chip = add(r, `<div class="abs" style="left:0;right:0;top:700px;text-align:center"><span class="display" style="position:relative;display:inline-block;padding:10px 40px;border-radius:20px;border:4px solid ${C.lineStrong};background:${DARK};font-size:66px;font-weight:900;color:${C.ink}">Del Río
        <span class="strike" style="position:absolute;left:-10px;top:50%;height:9px;width:0;margin-top:-4px;border-radius:5px;background:${C.red}"></span></span></div>`);
    const span = chip.firstElementChild, strike = chip.querySelector('.strike');
    const card = add(r, `<div class="abs" style="left:96px;top:852px;width:888px;height:300px;border-radius:28px;background:${C.ink};box-shadow:0 30px 70px rgba(0,0,0,.6);overflow:hidden">
        <div class="mono" style="padding:14px 32px;background:#d8ccb0;color:#4a4638;font-size:23px;font-weight:700;letter-spacing:.1em">ELEMENTO 23 · ROYAL SOCIETY OF CHEMISTRY</div>
        <div class="mono" style="position:absolute;left:32px;top:76px;font-size:24px;font-weight:700;letter-spacing:.08em;color:#6a6555">FECHA DE DESCUBRIMIENTO</div>
        <div class="display v1" style="position:absolute;left:32px;top:102px;font-size:62px;font-weight:900;color:#1a1814">1801</div>
        <div class="mono" style="position:absolute;left:32px;top:186px;font-size:24px;font-weight:700;letter-spacing:.08em;color:#6a6555">DESCUBIERTO POR</div>
        <div class="display v2" style="position:absolute;left:32px;top:212px;font-size:62px;font-weight:900;color:${C.brand}">Andrés Manuel del Río</div>
        <div class="ok" style="position:absolute;right:30px;top:88px;width:110px;height:110px;color:${C.brand}">${I.check}</div></div>`);
    const tD = x.at('del'), tNo = x.at('no'), tP = x.at('pero'), tY = x.at('1801'), tA = x.at('andrés');
    x.cue(0.1, 'pop', 0.6); x.cue(tD - 0.1, 'pop', 0.7); x.cue(tNo, 'buzz', 0.6); x.cue(tP - 0.1, 'whoosh', 0.8); x.cue(tY, 'ding', 0.7);
    x.cue(tA - 0.4, 'rise', 0.7); x.cue(tA, 'boom', 1); x.shake(tA, 12); x.cue(tA + 0.1, 'ding', 0.9);
    return (lt) => {
      popIn(t, lt, 0.05, 0.6);
      popIn(chip, lt, tD - 0.15, 0.6);
      const fix = prog(lt, tA, 0.4);
      strike.style.width = `calc(${Ease.outCubic(prog(lt, tNo, 0.35)) * 100}% + 20px)`; strike.style.opacity = 1 - fix;
      span.style.borderColor = fix > 0 ? C.gold : C.lineStrong; span.style.color = fix > 0 ? C.gold : C.ink;
      span.style.boxShadow = `0 0 ${60 * fix}px ${C.gold}88`;
      span.style.transform = `scale(${1 + 0.1 * Math.sin(Math.PI * fix)})`;
      const k = Ease.outCubic(prog(lt, tP - 0.15, 0.5));
      card.style.opacity = k; card.style.transform = `translateY(${(1 - k) * 120}px)`;
      card.querySelector('.v1').style.opacity = appear(lt, tY - 0.05, 0.25);
      const s = spring(lt, tA - 0.03, 0.4);
      const v2 = card.querySelector('.v2'); v2.style.opacity = s > 0 ? 1 : 0; v2.style.transform = `scale(${lerp(0.8, 1, s)})`; v2.style.transformOrigin = 'left center';
      const ok = card.querySelector('.ok'); const so = spring(lt, tA + 0.25, 0.4); ok.style.opacity = so > 0 ? 1 : 0; ok.style.transform = `scale(${lerp(0.3, 1, so)})`;
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/andres-manuel-del-rio', tCompartir: 0.35 }));
})();
