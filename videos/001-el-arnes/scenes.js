/* EUREKA #01 · "Mismo modelo, 24 puntos más: el arnés"
 * Fuente: santismm.com · "The Stopwatch and the Exam" (articles.santismm.com) y hub de Harness Engineering.
 * Cada escena recibe ctx (x) con x.root, x.at('palabra') → segundo local en que se dice, x.cue(), x.shake().
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, css, scene } = EUREKA;

  EUREKA.video = {
    keywords: ['arnés', '24', '48', '72%', '80%', '59%'],
  };

  const pill = (txt, color = C.cyan, extra = '') =>
    `<div class="mono" style="display:inline-flex;align-items:center;gap:12px;padding:12px 24px;border-radius:999px;border:2px solid ${color};color:${color};background:rgba(11,15,25,.8);font-weight:700;letter-spacing:.08em;${extra}">${txt}</div>`;

  const modelChip = (size, label = 'MODELO') => {
    const pins = [0.25, 0.5, 0.75].map((p) => `
      <div class="abs" style="left:${p * 100}%;top:-26px;width:14px;height:22px;margin-left:-7px;background:${C.lineStrong};border-radius:4px"></div>
      <div class="abs" style="left:${p * 100}%;bottom:-26px;width:14px;height:22px;margin-left:-7px;background:${C.lineStrong};border-radius:4px"></div>
      <div class="abs" style="top:${p * 100}%;left:-26px;height:14px;width:22px;margin-top:-7px;background:${C.lineStrong};border-radius:4px"></div>
      <div class="abs" style="top:${p * 100}%;right:-26px;height:14px;width:22px;margin-top:-7px;background:${C.lineStrong};border-radius:4px"></div>`).join('');
    return `<div class="abs chip" style="width:${size}px;height:${size}px;margin:-${size / 2}px 0 0 -${size / 2}px;border-radius:${size * 0.16}px;
        background:linear-gradient(145deg,${C.surface2},${C.surface});border:4px solid ${C.cyan};box-shadow:0 0 60px rgba(34,211,238,.35), inset 0 0 40px rgba(34,211,238,.12);">
        ${pins}
        <div class="abs" style="inset:${size * 0.14}px;border:2px dashed ${C.lineStrong};border-radius:${size * 0.1}px"></div>
        <div class="abs display" style="inset:0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${size * 0.17}px;color:${C.ink};letter-spacing:.02em">${label}</div>
      </div>`;
  };

  const icoBox = (icon, color, size) => `<div style="width:${size}px;height:${size}px;color:${color}">${icon}</div>`;

  // ───────────────────────── 1 · HOOK ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const tags = add(r, `<div class="abs" style="left:0;right:0;top:372px;display:flex;justify-content:center;gap:22px;font-size:32px"></div>`);
    const tA = add(tags, pill('MISMA IA'));
    const tB = add(tags, pill('MISMO EXAMEN'));
    const num = add(r, `<div class="abs display" style="left:0;right:0;top:470px;text-align:center;font-size:340px;font-weight:700;letter-spacing:-.05em;line-height:1;color:${C.ink}">48%</div>`);
    const gauge = add(r, `<div class="abs" style="left:150px;width:780px;top:900px;height:30px;border-radius:15px;background:${C.line};overflow:hidden">
        <div style="height:100%;width:48%;background:linear-gradient(90deg,${C.blue},${C.cyan});border-radius:15px;box-shadow:0 0 24px ${C.cyan}"></div></div>`);
    const marks = add(r, `<div class="abs mono" style="left:150px;width:780px;top:950px;display:flex;justify-content:space-between;font-size:24px;color:${C.faint};font-weight:500"><span>0%</span><span>NOTA</span><span>100%</span></div>`);
    const badge = add(r, `<div class="abs display" style="left:700px;top:700px;padding:10px 30px;border-radius:26px;background:${C.amber};color:${C.bg};font-size:100px;font-weight:700;box-shadow:0 20px 60px rgba(245,158,11,.45)">+24</div>`);
    const tM = x.at('mismo'), t24 = x.at('24');
    x.cue(tM, 'pop', 0.5);
    for (let k = 0; k < 9; k++) x.cue(t24 - 0.2 + k * 0.07, 'tick', 0.35);
    x.cue(t24 + 0.45, 'stamp', 1); x.shake(t24 + 0.45, 24);
    return (lt) => {
      tA.style.opacity = 1;
      const b = spring(lt, tM - 0.05, 0.4);
      tB.style.opacity = b > 0 ? 1 : 0; tB.style.transform = `scale(${lerp(0.6, 1, b)})`;
      const k = Ease.inOutCubic(prog(lt, t24 - 0.2, 0.65));
      const v = lerp(48, 72, k);
      num.textContent = Math.round(v) + '%';
      num.style.color = k >= 1 ? C.cyan : C.ink;
      num.style.textShadow = `0 0 ${80 * k}px rgba(34,211,238,${0.55 * k})`;
      gauge.firstElementChild.style.width = v + '%';
      const s = spring(lt, t24 + 0.45, 0.45);
      badge.style.opacity = s > 0 ? 1 : 0;
      badge.style.transform = `rotate(-8deg) scale(${lerp(2.6, 1, s)})`;
      marks.style.opacity = 1;
    };
  });

  // ───────────────────────── 2 · WEBARENA ─────────────────────────
  scene('webarena', (x) => {
    const r = x.root;
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;height:400px;border-radius:28px;background:${C.surface};border:2px solid ${C.lineStrong};overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div style="height:74px;display:flex;align-items:center;gap:14px;padding:0 26px;border-bottom:2px solid ${C.line};background:${C.surface2}">
          <span style="width:18px;height:18px;border-radius:50%;background:${C.rose}"></span><span style="width:18px;height:18px;border-radius:50%;background:${C.amber}"></span><span style="width:18px;height:18px;border-radius:50%;background:${C.green}"></span>
          <span class="mono" style="margin-left:18px;flex:1;padding:10px 20px;border-radius:12px;background:${C.bg};color:${C.muted};font-size:24px;font-weight:500">WebArena · webs reales, tareas reales</span>
        </div>
        <div class="rows" style="padding:22px 30px;display:flex;flex-direction:column;gap:16px"></div>
      </div>`);
    const rowsBox = card.querySelector('.rows');
    const tasks = ['Comprar el producto más barato', 'Responder en un foro', 'Editar un repositorio de código'];
    const rows = tasks.map((tx) => add(rowsBox, `<div style="display:flex;align-items:center;gap:22px;padding:16px 22px;border-radius:16px;background:${C.surface2};border:2px solid ${C.line};font-size:34px;font-weight:600;color:${C.fg}">
        <div class="st" style="width:46px;height:46px;border-radius:12px;border:3px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;padding:6px;box-sizing:border-box"></div><span>${tx}</span></div>`));
    const cursor = add(r, `<div class="abs" style="width:56px;height:56px;left:0;top:0">${I.cursor}</div>`);

    const bars = add(r, `<div class="abs" style="left:110px;width:860px;top:790px;display:flex;flex-direction:column;gap:34px"></div>`);
    const mkBar = (label, color) => add(bars, `<div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px">
          <span class="mono" style="font-size:30px;font-weight:700;color:${C.muted};letter-spacing:.04em">${label}</span>
          <span class="val display" style="font-size:64px;font-weight:700;color:${color}">0%</span></div>
        <div style="height:34px;border-radius:17px;background:${C.line};overflow:hidden"><div class="fill" style="height:100%;width:0;border-radius:17px;background:${color};box-shadow:0 0 24px ${color}"></div></div>
      </div>`);
    const b1 = mkBar('MODELO SOLO', C.faint);
    const b2 = mkBar(`MISMO MODELO + <span style="color:${C.amber}">???</span>`, C.cyan);
    const src = add(r, `<div class="abs mono" style="left:110px;top:1135px;font-size:22px;color:${C.faint};font-weight:500">Fuente: “El cronómetro y el examen” · articles.santismm.com</div>`);

    const tNav = x.at('navega'), t48 = x.at('48'), t72 = x.at('72');
    const tTask = [tNav - 0.6, tNav + 0.25, tNav + 1.0];
    tTask.forEach((t) => x.cue(t + 0.35, 'pop', 0.45));
    x.cue(t48, 'ding', 0.5); x.cue(t72, 'ding', 0.8);
    const okIdx = [true, false, true];
    return (lt) => {
      rows.forEach((row, i) => {
        const a = appear(lt, 0.15 + i * 0.18, 0.35);
        row.style.opacity = a; row.style.transform = `translateX(${(1 - a) * 60}px)`;
        const st = row.querySelector('.st');
        const done = lt >= tTask[i] + 0.35;
        const s = spring(lt, tTask[i] + 0.35, 0.35);
        if (done) {
          st.innerHTML = okIdx[i] ? I.check : I.cross;
          const col = okIdx[i] ? C.green : C.rose;
          st.style.borderColor = col; st.style.color = col;
          st.firstElementChild.style.transform = `scale(${s})`;
        } else { st.innerHTML = ''; st.style.borderColor = C.lineStrong; }
      });
      // El cursor recorre las tareas
      let cx = 900, cy = 640;
      for (let i = 0; i < 3; i++) {
        const k = Ease.inOutCubic(prog(lt, tTask[i] - 0.3, 0.6));
        const tx = 225, ty = 440 + i * 96;
        if (lt >= tTask[i] - 0.3) { cx = lerp(i === 0 ? 900 : 225, tx, k); cy = lerp(i === 0 ? 640 : 440 + (i - 1) * 96, ty, k); }
      }
      const cOut = prog(lt, tTask[2] + 0.7, 0.4);
      css(cursor, { transform: `translate(${cx}px, ${cy}px)`, opacity: (appear(lt, 0.2, 0.3) * (1 - cOut)).toFixed(2) });
      const bShow = appear(lt, t48 - 0.9, 0.4);
      bars.style.opacity = bShow; bars.style.transform = `translateY(${(1 - bShow) * 40}px)`;
      const k1 = Ease.outCubic(prog(lt, t48 - 0.1, 0.7)), k2 = Ease.outCubic(prog(lt, t72 - 0.1, 0.8));
      b1.querySelector('.fill').style.width = 48 * k1 + '%'; b1.querySelector('.val').textContent = Math.round(48 * k1) + '%';
      b2.querySelector('.fill').style.width = 72 * k2 + '%'; b2.querySelector('.val').textContent = Math.round(72 * k2) + '%';
      src.style.opacity = bShow;
    };
  });

  // ───────────────────────── 3 · CEREBRO ─────────────────────────
  scene('cerebro', (x) => {
    const r = x.root;
    const wrap = add(r, `<div class="abs" style="left:540px;top:720px"></div>`);
    const frame = add(wrap, `<svg class="abs" width="600" height="600" viewBox="0 0 600 600" style="left:-300px;top:-300px">
        <rect x="10" y="10" width="580" height="580" rx="90" fill="rgba(34,211,238,.05)" stroke="${C.cyan}" stroke-width="10" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <g stroke="${C.amber}" stroke-width="14" stroke-linecap="round" fill="none" class="clamps">
          <path d="M60 150V60h90"/><path d="M450 60h90v90"/><path d="M540 450v90h-90"/><path d="M150 540H60v-90"/></g></svg>`);
    add(wrap, modelChip(300));
    const same = add(r, `<div class="abs" style="left:0;right:0;top:335px;text-align:center;font-size:34px">${pill('CEREBRO: SIN CAMBIOS', C.muted)}</div>`);
    const tag = add(r, `<div class="abs display" style="left:0;right:0;top:1040px;text-align:center;font-size:96px;font-weight:700;color:${C.cyan};letter-spacing:.04em;text-shadow:0 0 40px rgba(34,211,238,.6)">ARNÉS</div>`);
    const tC = x.at('cerebro'), tA = x.at('arnés');
    x.cue(tC, 'pop', 0.5); x.cue(tA - 0.1, 'rise', 0.6); x.cue(tA + 0.25, 'stamp', 0.8); x.shake(tA + 0.25, 14);
    return (lt) => {
      const chip = wrap.querySelector('.chip');
      const pulse = 1 + 0.03 * Math.sin(lt * 6);
      chip.style.transform = `scale(${pulse * lerp(0.8, 1, appear(lt, 0, 0.4))})`;
      const s = spring(lt, tC - 0.1, 0.4);
      same.style.opacity = s > 0 ? 1 : 0; same.style.transform = `scale(${lerp(0.7, 1, s)})`;
      const k = Ease.inOutCubic(prog(lt, tA - 0.25, 0.55));
      frame.querySelector('rect').setAttribute('stroke-dashoffset', 1 - k);
      const cl = spring(lt, tA + 0.15, 0.4);
      const g = frame.querySelector('.clamps');
      g.style.opacity = cl > 0 ? 1 : 0; g.style.transformOrigin = '300px 300px'; g.style.transform = `scale(${lerp(1.35, 1, cl)})`;
      const tg = spring(lt, tA + 0.15, 0.45);
      tag.style.opacity = tg > 0 ? 1 : 0; tag.style.transform = `scale(${lerp(0.5, 1, tg)})`;
      same.style.filter = lt > tA ? 'opacity(.45)' : 'none';
    };
  });

  // ───────────────────────── 4 · PIEZAS DEL ARNÉS ─────────────────────────
  scene('piezas', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:318px;text-align:center;font-size:28px">${pill('ARNÉS = TODO LO QUE RODEA AL MODELO')}</div>`);
    const CX = 540, CY = 735;
    const mods = [
      { k: 'herramientas', label: 'Herramientas', icon: I.wrench, x: 250, y: 500, color: C.cyan },
      { k: 'memoria', label: 'Memoria', icon: I.memory, x: 830, y: 500, color: C.violet },
      { k: 'instrucciones', label: 'Instrucciones', icon: I.doc, x: 250, y: 975, color: C.green },
      { k: 'bucle', label: 'Bucle: revisa y reintenta', icon: I.loop, x: 830, y: 975, color: C.amber },
    ];
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">${mods.map((m) =>
      `<line x1="${CX}" y1="${CY}" x2="${m.x}" y2="${m.y}" stroke="${m.color}" stroke-width="5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" opacity=".75"/>
       <circle r="9" fill="${m.color}" opacity="0"/>`).join('')}</svg>`);
    const chipWrap = add(r, `<div class="abs" style="left:${CX}px;top:${CY}px"></div>`);
    add(chipWrap, modelChip(220));
    const ring = add(r, `<div class="abs" style="left:${CX - 190}px;top:${CY - 190}px;width:380px;height:380px;border-radius:50%;border:4px solid ${C.amber};opacity:0"></div>`);
    const boxes = mods.map((m) => add(r, `<div class="abs" style="left:${m.x - 105}px;top:${m.y - 95}px;width:210px;display:flex;flex-direction:column;align-items:center;gap:14px">
        <div class="ib" style="width:150px;height:150px;border-radius:36px;background:${C.surface2};border:3px solid ${m.color};display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px ${m.color}55">
          ${icoBox(m.icon, m.color, 84)}</div>
        <div class="display" style="font-size:${m.k === 'bucle' ? 30 : 36}px;font-weight:700;color:${C.ink};text-align:center;line-height:1.1">${m.label}</div></div>`));
    const times = mods.map((m) => x.at(m.k));
    times.forEach((t) => x.cue(t, 'pop', 0.7));
    const tRev = x.at('revisar'), tRe = x.at('reintentar');
    x.cue(tRev, 'tick', 0.5); x.cue(tRe, 'tick', 0.5);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.4);
      const lines = svg.querySelectorAll('line'), dots = svg.querySelectorAll('circle');
      mods.forEach((m, i) => {
        const s = spring(lt, times[i] - 0.05, 0.45);
        boxes[i].style.opacity = s > 0 ? Math.min(1, s * 1.5) : 0;
        boxes[i].style.transform = `scale(${lerp(0.3, 1, s)})`;
        const k = Ease.outCubic(prog(lt, times[i] - 0.1, 0.4));
        lines[i].setAttribute('stroke-dashoffset', 1 - k);
        // Pulsos de datos viajando del arnés al modelo
        if (k >= 1) {
          const ph = ((lt - times[i]) * 0.9 + i * 0.25) % 1;
          dots[i].setAttribute('cx', lerp(m.x, CX, ph)); dots[i].setAttribute('cy', lerp(m.y, CY, ph));
          dots[i].setAttribute('opacity', Math.sin(ph * Math.PI).toFixed(2));
        }
      });
      // El bucle gira y "re-ejecuta" el modelo
      const loopIcon = boxes[3].querySelector('svg');
      loopIcon.style.transform = `rotate(${lt > times[3] ? (lt - times[3]) * 220 : 0}deg)`;
      const it = [tRev, tRe].map((t) => prog(lt, t, 0.7));
      const ph = Math.max(...it.map((p) => (p > 0 && p < 1 ? p : 0)));
      ring.style.opacity = ph > 0 ? (1 - ph).toFixed(2) : 0;
      ring.style.transform = `scale(${lerp(0.7, 1.35, ph)})`;
      const chip = chipWrap.querySelector('.chip');
      chip.style.transform = `scale(${1 + 0.05 * Math.sin(Math.PI * ph)})`;
    };
  });

  // ───────────────────────── 5 · MOTOR vs COCHE ─────────────────────────
  scene('motor', (x) => {
    const r = x.root;
    const h1 = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center;font-size:32px">${pill('EL MODELO = EL MOTOR', C.ink)}</div>`);
    const h2 = add(r, `<div class="abs" style="left:0;right:0;top:330px;text-align:center;font-size:32px">${pill('EL ARNÉS = EL COCHE', C.cyan)}</div>`);
    const speed = add(r, `<div class="abs" style="left:0;top:470px;width:1080px;height:380px;overflow:hidden">${Array.from({ length: 9 }, (_, i) =>
      `<div class="sl" style="position:absolute;height:6px;border-radius:3px;background:linear-gradient(90deg,transparent,${C.cyan});top:${30 + i * 40}px;width:${160 + (i * 53) % 140}px;opacity:.5"></div>`).join('')}</div>`);
    const car = add(r, `<svg class="abs" width="860" height="348" viewBox="0 0 940 380" style="left:110px;top:480px">
        <path class="body" d="M40 270 L40 225 Q42 200 70 194 L230 178 Q300 92 410 84 L600 84 Q690 88 760 176 L870 190 Q910 196 912 232 L912 270 Z"
          fill="rgba(34,211,238,.07)" stroke="${C.cyan}" stroke-width="9" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <path class="body" d="M280 178 Q330 112 412 106 L590 106 Q660 110 710 178 Z" fill="none" stroke="${C.lineStrong}" stroke-width="6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        ${[220, 740].map((cx) => `<g class="wheel" transform="translate(${cx} 280)"><circle r="64" fill="${C.bg}" stroke="${C.cyan}" stroke-width="12"/><circle r="20" fill="${C.cyan}"/>
          <g class="sp" stroke="${C.cyan}" stroke-width="7" stroke-linecap="round"><path d="M0 -44V44M-44 0H44M-31 -31L31 31M31 -31L-31 31"/></g></g>`).join('')}
      </svg>`);
    const eng = add(r, `<div class="abs" style="left:540px;top:650px"><svg width="420" height="300" viewBox="0 0 420 300" style="position:absolute;left:-210px;top:-150px">
        <circle cx="34" cy="200" r="34" fill="${C.surface}" stroke="${C.cyan}" stroke-width="6"/><path d="M34 172v56M6 200h56" stroke="${C.cyan}" stroke-width="5" class="fan"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${78 + i * 74}" y="34" width="58" height="104" rx="10" fill="${C.surface}" stroke="${C.cyan}" stroke-width="5"/>
          <rect class="pis" x="${87 + i * 74}" y="50" width="40" height="24" rx="6" fill="${C.cyan}"/>`).join('')}
        <rect x="60" y="128" width="320" height="146" rx="24" fill="${C.surface2}" stroke="${C.cyan}" stroke-width="7"/>
        <text x="220" y="218" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="50" fill="${C.ink}">MODELO</text></svg></div>`);
    const parts = [
      { k: 'ruedas', label: 'ruedas', icon: I.wheel },
      { k: 'volante', label: 'volante', icon: I.steering },
      { k: 'frenos', label: 'frenos', icon: I.brake },
    ];
    const chips = parts.map((p, i) => add(r, `<div class="abs" style="left:${150 + i * 280}px;top:905px;width:220px;height:190px;border-radius:30px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
        <div class="ic" style="width:86px;height:86px;color:${C.muted}">${p.icon}</div>
        <div class="display" style="font-size:36px;font-weight:700;color:${C.fg}">${p.label}</div>
        <svg class="abs strike" width="220" height="190" style="left:-3px;top:-3px"><line x1="24" y1="166" x2="196" y2="24" stroke="${C.red}" stroke-width="10" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>
        <div class="abs ok" style="right:-18px;top:-18px;width:62px;height:62px;border-radius:50%;background:${C.green};color:${C.bg};padding:12px;box-sizing:border-box;opacity:0">${I.check}</div>
      </div>`));
    const tMotor = x.at('motor'), tCar = x.at('carrera'), tCoche = x.at('coche'), tArn = x.at('arnés');
    const tP = parts.map((p) => x.at(p.k));
    x.cue(tMotor, 'pop', 0.6); tP.forEach((t) => x.cue(t + 0.1, 'swipe', 0.6));
    x.cue(tCar, 'buzz', 0.55); x.shake(tCar, 10, 6);
    x.cue(tArn - 0.15, 'rise', 0.6); x.cue(tCoche, 'stamp', 0.9); x.shake(tCoche, 14);
    [0, 1, 2].forEach((i) => x.cue(tCoche + 0.3 + i * 0.12, 'pop', 0.4));
    return (lt) => {
      const assemble = Ease.inOutCubic(prog(lt, tArn - 0.1, 0.8));
      h1.style.opacity = (1 - prog(lt, tArn - 0.1, 0.25)).toFixed(2);
      const hk = spring(lt, tArn, 0.4); h2.style.opacity = hk > 0 ? 1 : 0; h2.style.transform = `scale(${lerp(0.6, 1, hk)})`;
      // Motor: aparece, ralentí, falla y luego se encaja en el coche
      const ea = spring(lt, tMotor - 0.25, 0.5);
      const fail = prog(lt, tCar, 0.25) * (1 - prog(lt, tArn - 0.2, 0.3));
      const running = lt > tCoche;
      eng.style.transform = `scale(${lerp(0.2, 1, ea) * lerp(1, 0.62, assemble)})`;
      eng.style.opacity = ea > 0 ? 1 : 0;
      eng.style.filter = fail > 0 ? `grayscale(${fail}) brightness(${1 - 0.35 * fail})` : 'none';
      eng.querySelectorAll('.pis').forEach((p, i) => {
        const sp = running ? 26 : 7;
        p.setAttribute('y', 50 + 46 * (0.5 + 0.5 * Math.sin(lt * sp + i * Math.PI / 2)) * (fail > 0.9 ? 0.1 : 1));
      });
      eng.querySelector('.fan').setAttribute('transform', `rotate(${lt * (running ? 900 : 200)} 34 200)`);
      car.querySelectorAll('.body').forEach((b) => { b.setAttribute('stroke-dashoffset', 1 - assemble); b.style.fillOpacity = Ease.inCubic(assemble); });
      car.querySelectorAll('.wheel').forEach((w, i) => {
        const ws = spring(lt, tCoche - 0.1 + i * 0.1, 0.45);
        w.style.opacity = ws > 0 ? 1 : 0;
        const cx = i ? 740 : 220;
        w.setAttribute('transform', `translate(${cx} 280) scale(${ws})`);
        w.querySelector('.sp').setAttribute('transform', `rotate(${running ? (lt - tCoche) * 900 : 0})`);
      });
      const vib = running ? Math.sin(lt * 60) * 2 : 0;
      car.style.transform = `translateY(${vib}px)`;
      speed.style.opacity = running ? Math.min(1, (lt - tCoche) * 3) : 0;
      speed.querySelectorAll('.sl').forEach((s, i) => {
        const v = 1400 + i * 170;
        s.style.left = (1080 - (((lt - tCoche) * v + i * 237) % 1500)) + 'px';
      });
      chips.forEach((c, i) => {
        const s = spring(lt, tP[i] - 0.15, 0.4);
        c.style.opacity = s > 0 ? 1 : 0; c.style.transform = `translateY(${(1 - s) * 60}px)`;
        const st = Ease.outCubic(prog(lt, tP[i] + 0.1, 0.25)) * (1 - prog(lt, tCoche + 0.2, 0.3));
        c.querySelector('.strike line').setAttribute('stroke-dashoffset', 1 - st);
        const ok = spring(lt, tCoche + 0.3 + i * 0.12, 0.35);
        const okEl = c.querySelector('.ok');
        okEl.style.opacity = ok > 0 ? 1 : 0; okEl.style.transform = `scale(${ok})`;
        c.style.borderColor = ok > 0.5 ? C.green : C.lineStrong;
        c.querySelector('.ic').style.color = ok > 0.5 ? C.green : (st > 0.5 ? C.faint : C.muted);
      });
    };
  });

  // ───────────────────────── 6 · SWE-BENCH PRO ─────────────────────────
  scene('swebench', (x) => {
    const r = x.root;
    const title = add(r, `<div class="abs display" style="left:0;right:0;top:318px;text-align:center;font-size:76px;font-weight:700;color:${C.ink}">SWE-bench Pro</div>`);
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:412px;text-align:center;font-size:27px;font-weight:500;color:${C.muted}">test de programación · mismo modelo</div>`);
    const base = 1050, maxH = 500;
    const bars = [
      { v: 80, k: '80', label: 'arnés del<br>fabricante', color: C.cyan, cx: 300 },
      { v: 59, k: '59', label: 'arnés<br>neutral', color: C.blue, cx: 640 },
    ].map((b) => ({ ...b, el: add(r, `<div class="abs" style="left:${b.cx - 115}px;width:230px;top:${base - maxH}px;height:${maxH}px">
          <div class="ghost abs" style="left:0;right:0;bottom:0;top:0;border:3px dashed ${C.lineStrong};border-radius:24px 24px 8px 8px;display:flex;align-items:center;justify-content:center;font-size:120px;font-weight:700;color:${C.lineStrong}" class="display">?</div>
          <div class="val display abs" style="left:-40px;right:-40px;text-align:center;font-size:100px;font-weight:700;color:${b.color}">0%</div>
          <div class="fill abs" style="left:0;right:0;bottom:0;height:0;border-radius:24px 24px 8px 8px;background:linear-gradient(180deg,${b.color},${b.color}55);box-shadow:0 0 50px ${b.color}66"></div>
        </div>`),
      lab: add(r, `<div class="abs mono" style="left:${b.cx - 160}px;width:320px;top:${base + 16}px;text-align:center;font-size:27px;line-height:1.25;font-weight:700;color:${C.fg}">${b.label}</div>`) }));
    add(r, `<div class="abs" style="left:150px;width:640px;top:${base}px;height:4px;background:${C.lineStrong}"></div>`);
    const gap = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <line x1="190" x2="790" y1="${base - maxH * 0.8}" y2="${base - maxH * 0.8}" stroke="${C.amber}" stroke-width="4" stroke-dasharray="14 12"/>
        <path d="M790 ${base - maxH * 0.8} V${base - maxH * 0.59 - 6}" stroke="${C.amber}" stroke-width="7" stroke-linecap="round"/>
        <path d="M776 ${base - maxH * 0.59 - 22} L790 ${base - maxH * 0.59 - 4} L804 ${base - maxH * 0.59 - 22}" fill="none" stroke="${C.amber}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
    const gapLbl = add(r, `<div class="abs display" style="left:812px;top:${base - maxH * 0.7 - 52}px;font-size:66px;font-weight:700;color:${C.amber};line-height:1">−21<div class="mono" style="font-size:24px;letter-spacing:.1em">PUNTOS</div></div>`);
    const tProg = x.at('programación'), t80 = x.at('80'), t59 = x.at('59'), tNeu = x.at('neutral');
    x.cue(t80, 'ding', 0.7); x.cue(t59, 'ding', 0.5); x.cue(tNeu + 0.25, 'stamp', 0.8); x.shake(tNeu + 0.25, 12);
    return (lt) => {
      title.style.opacity = appear(lt, 0, 0.4);
      sub.style.opacity = appear(lt, tProg - 0.3, 0.4);
      bars.forEach((b) => {
        const show = appear(lt, 0.2, 0.4);
        const k = Ease.outCubic(prog(lt, x.at(b.k) - 0.15, 0.8));
        const hgt = maxH * b.v / 100 * k;
        b.el.querySelector('.fill').style.height = hgt + 'px';
        const val = b.el.querySelector('.val');
        val.textContent = Math.round(b.v * k) + '%';
        val.style.top = (maxH - hgt - 120) + 'px';
        val.style.opacity = k > 0 ? 1 : 0;
        b.lab.style.opacity = show;
        const gh = b.el.querySelector('.ghost');
        gh.style.opacity = show * (1 - 0.6 * k);
        gh.style.color = k > 0 ? 'transparent' : C.lineStrong;
      });
      const g = Ease.outCubic(prog(lt, tNeu + 0.05, 0.4));
      gap.style.opacity = g; const gl = spring(lt, tNeu + 0.25, 0.4);
      gapLbl.style.opacity = gl > 0 ? 1 : 0; gapLbl.style.transform = `scale(${lerp(0.4, 1, gl)})`;
    };
  });

  // ───────────────────────── 7 · RANKING ─────────────────────────
  scene('ranking', (x) => {
    const r = x.root;
    const data = [['Modelo A', 81], ['Modelo B', 77], ['Modelo C', 74], ['Modelo D', 70]];
    const card = add(r, `<div class="abs" style="left:110px;width:860px;top:340px;border-radius:30px;background:${C.surface};border:2px solid ${C.lineStrong};padding:26px 30px;box-sizing:border-box;box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div class="mono" style="display:flex;font-size:26px;font-weight:700;color:${C.faint};letter-spacing:.12em;padding:0 10px 18px;border-bottom:2px solid ${C.line}">
          <span style="width:70px">#</span><span style="flex:1">MODELO</span><span style="width:170px;text-align:right">NOTA</span><span style="width:200px;text-align:center">ARNÉS</span></div>
        <div class="rows"></div></div>`);
    const rows = data.map(([m, v], i) => add(card.querySelector('.rows'), `<div style="display:flex;align-items:center;padding:24px 10px;border-bottom:2px solid ${C.line};font-size:44px;font-weight:700" class="display">
        <span style="width:70px;color:${C.faint}">${i + 1}</span><span class="m" style="flex:1;color:${C.ink}">${m}</span>
        <span style="width:170px;text-align:right;color:${C.cyan}">${v}%</span>
        <span class="h" style="width:200px;text-align:center;color:${C.faint}">—</span></div>`));
    const colM = add(card, `<div class="abs" style="left:96px;top:94px;width:290px;bottom:16px;border:4px solid ${C.cyan};border-radius:18px;opacity:0"></div>`);
    const colH = add(card, `<div class="abs" style="right:28px;top:94px;width:196px;bottom:16px;border:4px solid ${C.amber};border-radius:18px;opacity:0;background:rgba(245,158,11,.07)"></div>`);
    const stamp = add(r, `<div class="abs display" style="left:90px;width:900px;top:600px;text-align:center;font-size:96px;font-weight:700;color:${C.amber};border:9px solid ${C.amber};border-radius:30px;padding:20px 0;background:rgba(7,10,19,.88);box-shadow:0 30px 90px rgba(0,0,0,.6), 0 0 60px rgba(245,158,11,.35)">¿CON QUÉ ARNÉS?</div>`);
    const tR = x.at('ranking'), tM = x.at('modelo'), tP = x.at('pregunta'), tA = x.at('arnés');
    rows.forEach((_, i) => x.cue(tR - 0.2 + i * 0.12, 'tick', 0.45));
    x.cue(tM, 'pop', 0.5); x.cue(tP, 'pop', 0.5);
    rows.forEach((_, i) => x.cue(tP + 0.2 + i * 0.1, 'tick', 0.4));
    x.cue(tA, 'stamp', 1); x.shake(tA, 22);
    return (lt) => {
      card.style.opacity = appear(lt, 0, 0.35);
      rows.forEach((row, i) => {
        const a = appear(lt, tR - 0.25 + i * 0.12, 0.35);
        row.style.opacity = a; row.style.transform = `translateY(${(1 - a) * 30}px)`;
        const q = spring(lt, tP + 0.2 + i * 0.1, 0.35);
        const hc = row.querySelector('.h');
        if (q > 0) { hc.textContent = '?'; hc.style.color = C.amber; hc.style.transform = `scale(${lerp(2, 1, q) * (1 + 0.08 * Math.sin(lt * 9 + i))})`; }
        else { hc.textContent = '—'; hc.style.color = C.faint; hc.style.transform = 'none'; }
      });
      colM.style.opacity = (appear(lt, tM - 0.05, 0.25) * (1 - prog(lt, tP, 0.25))).toFixed(2);
      colH.style.opacity = appear(lt, tP, 0.25);
      const s = spring(lt, tA - 0.05, 0.4);
      stamp.style.opacity = s > 0 ? 1 : 0;
      stamp.style.transform = `rotate(-6deg) scale(${lerp(2.2, 1, s)})`;
    };
  });

  // ───────────────────────── 8 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = add(r, `<div class="abs mono" style="left:0;right:0;top:370px;text-align:center;font-size:40px;font-weight:700;color:${C.muted};letter-spacing:.12em">EL CUELLO DE BOTELLA</div>`);
    const l2 = add(r, `<div class="abs display" style="left:0;right:0;top:450px;text-align:center;font-size:110px;font-weight:700;color:${C.ink}">NO ES EL</div>`);
    const l3 = add(r, `<div class="abs display" style="left:0;right:0;top:565px;text-align:center;font-size:170px;font-weight:700;color:${C.ink};letter-spacing:-.02em">MODELO</div>`);
    const strike = add(r, `<svg class="abs" width="1080" height="300" style="left:0;top:560px"><line x1="150" y1="130" x2="930" y2="100" stroke="${C.red}" stroke-width="16" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const l4 = add(r, `<div class="abs display" style="left:0;right:0;top:790px;text-align:center;font-size:150px;font-weight:700;color:${C.cyan};text-shadow:0 0 60px rgba(34,211,238,.7)">ES EL ARNÉS</div>`);
    const l5 = add(r, `<div class="abs mono" style="left:0;right:0;top:1010px;text-align:center;font-size:36px;font-weight:700;color:${C.fg};letter-spacing:.06em">AGENTE = MODELO + <span style="color:${C.cyan}">ARNÉS</span></div>`);
    const tCu = x.at('cuello'), tNo = x.at('no'), tMo = x.at('modelo'), tEs = x.at('es', 1), tAr = x.at('arnés');
    x.cue(tMo + 0.25, 'swipe', 0.8); x.cue(tEs - 0.1, 'rise', 0.7); x.cue(tAr, 'boom', 1); x.shake(tAr, 26);
    return (lt) => {
      const a1 = appear(lt, tCu - 0.2, 0.35); l1.style.opacity = a1; l1.style.transform = `translateY(${(1 - a1) * 30}px)`;
      const a2 = spring(lt, tNo - 0.05, 0.4); l2.style.opacity = a2 > 0 ? 1 : 0; l2.style.transform = `scale(${lerp(0.7, 1, a2)})`;
      const a3 = spring(lt, tMo - 0.05, 0.4); l3.style.opacity = a3 > 0 ? 1 : 0; l3.style.transform = `scale(${lerp(0.7, 1, a3)})`;
      const st = Ease.outCubic(prog(lt, tMo + 0.25, 0.3));
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - st);
      l3.style.color = st > 0.5 ? C.faint : C.ink;
      const a4 = spring(lt, tEs - 0.05, 0.5); l4.style.opacity = a4 > 0 ? 1 : 0;
      l4.style.transform = `scale(${lerp(1.8, 1, a4)})`;
      l5.style.opacity = appear(lt, tAr + 0.35, 0.4);
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => {
    const r = x.root;
    const logo = add(r, `<div class="abs display" style="left:0;right:0;top:340px;text-align:center;font-size:150px;font-weight:700;color:${C.ink};letter-spacing:.06em;display:flex;align-items:center;justify-content:center;gap:28px">
        <span style="width:44px;height:44px;border-radius:50%;background:${C.cyan};box-shadow:0 0 50px ${C.cyan}"></span>EUREKA</div>`);
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:530px;text-align:center;font-size:30px;font-weight:700;color:${C.muted};letter-spacing:.12em">IA COMPLEJA, EXPLICADA EN 60s</div>`);
    const btn = (icon, label, color) => add(r, `<div class="abs" style="top:640px;width:390px;height:140px;border-radius:34px;background:${C.surface2};border:4px solid ${color};display:flex;align-items:center;justify-content:center;gap:22px;box-shadow:0 0 50px ${color}44">
        <div style="width:64px;height:64px;color:${color}">${icon}</div><span class="display" style="font-size:44px;font-weight:700;color:${C.ink}">${label}</span></div>`);
    const b1 = btn(I.bookmark, 'Guárdalo', C.amber); b1.style.left = '125px';
    const b2 = btn(I.share, 'Compártelo', C.cyan); b2.style.left = '565px'; b2.style.width = '390px';
    const site = add(r, `<div class="abs display" style="left:0;right:0;top:860px;text-align:center;font-size:72px;font-weight:700;color:${C.cyan}">santismm.com</div>`);
    const subs = add(r, `<div class="abs mono" style="left:0;right:0;top:960px;text-align:center;font-size:27px;font-weight:500;color:${C.muted}">articles · benchmarks · labs · physicalai</div>`);
    const disc = add(r, `<div class="abs mono" style="left:0;right:0;top:1080px;text-align:center;font-size:21px;font-weight:500;color:${C.faint}">Basado en los artículos de Santi Santa María · voz y animación generadas con IA</div>`);
    const tG = x.at('guárdalo'), tC = x.at('compártelo');
    x.cue(tG, 'pop', 0.8); x.cue(tC, 'pop', 0.8); x.cue(0.1, 'ding', 0.4);
    return (lt) => {
      const l = spring(lt, 0.05, 0.5); logo.style.opacity = l > 0 ? 1 : 0; logo.style.transform = `scale(${lerp(0.7, 1, l)})`;
      sub.style.opacity = appear(lt, 0.3, 0.4);
      [[b1, tG], [b2, tC]].forEach(([b, t]) => {
        const s = spring(lt, t - 0.05, 0.4);
        b.style.opacity = s > 0 ? 1 : 0; b.style.transform = `scale(${lerp(0.5, 1, s) * (1 + 0.025 * Math.sin((lt - t) * 7) * (s >= 1 ? 1 : 0))})`;
      });
      site.style.opacity = appear(lt, tC + 0.4, 0.4); subs.style.opacity = appear(lt, tC + 0.6, 0.4);
      disc.style.opacity = appear(lt, 0.6, 0.5);
    };
  });
})();
