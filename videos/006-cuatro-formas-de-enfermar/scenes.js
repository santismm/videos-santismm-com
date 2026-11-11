/* EUREKA #06 · "4 formas de enfermar de un agente de IA"
 * Fuente: articles.santismm.com · "La empresa agéntica necesita un sistema inmunitario" (28-08-2026), sección
 * "Cuatro formas de enfermar": 01 Entrada (instrucciones ocultas en datos), 02 Permisos (agencia excesiva:
 * "el radio de impacto lo decide la arquitectura de permisos"), 03 Objetivo (desviación: "cerrar casos sin
 * resolverlos o cumplir una métrica ocultando excepciones"), 04 Red (propagación: "entra en memoria y reaparece
 * como contexto aparentemente confiable"). Figura 5: "Autoinmunidad digital". Pie de figura: "validar, autorizar,
 * observar, contener y aprender".
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { rng, pill, endCard, popText, popIn } = EUREKA.ui;

  EUREKA.video = { keywords: ['enfermar', 'cuatro', 'autoinmunidad', 'fiar', 'ocultas', 'excepciones'] };

  const BOT = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><rect x="12" y="18" width="40" height="34" rx="10"/><path d="M32 18V8"/><circle cx="32" cy="7" r="3" fill="currentColor"/><circle cx="24" cy="34" r="4" fill="currentColor"/><circle cx="40" cy="34" r="4" fill="currentColor"/><path d="M24 44h16"/></svg>`;
  const GLOBE = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5"><circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8c8 8 8 40 0 48M32 8c-8 8-8 40 0 48"/></svg>`;
  const SHIELD = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z"/></svg>`;
  const VIAS = [['01', 'ENTRADA', C.rose], ['02', 'PERMISOS', C.amber], ['03', 'OBJETIVO', C.violet], ['04', 'RED', C.sky]];

  // Cabecera de "diagnóstico" común a las cuatro vías
  function dx(r, i, sub) {
    const [n, name, col] = VIAS[i];
    return add(r, `<div class="abs" style="left:110px;width:860px;top:318px;display:flex;align-items:center;gap:26px">
        <div class="display" style="width:120px;height:120px;border-radius:30px;background:${col};color:${C.bg};display:flex;align-items:center;justify-content:center;font-size:62px;font-weight:700;flex:none">${n}</div>
        <div><div class="display" style="font-size:72px;font-weight:700;color:${C.ink};line-height:1">${name}</div>
        <div class="mono" style="font-size:26px;font-weight:700;color:${col};margin-top:8px;letter-spacing:.04em">${sub}</div></div></div>`);
  }
  const node = (r, x, y, size, color, html) => add(r, `<div class="abs" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;border-radius:${size * 0.24}px;background:${C.surface2};border:4px solid ${color};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;box-sizing:border-box">${html}</div>`);

  // ───────────────────────── 1 · HOOK: monitor del paciente ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const mon = add(r, `<div class="abs" style="left:110px;width:860px;top:330px;height:430px;border-radius:30px;background:${C.surface};border:3px solid ${C.lineStrong};overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)">
        <div class="mono" style="position:absolute;left:30px;top:24px;font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.muted}">PACIENTE: AGENTE DE IA</div>
        <div class="st mono" style="position:absolute;right:30px;top:22px;font-size:26px;font-weight:700;color:${C.green}">● ESTABLE</div>
        <div class="bot" style="position:absolute;left:40px;top:120px;width:200px;height:200px;color:${C.cyan}">${BOT}</div>
        <svg style="position:absolute;left:270px;top:90px" width="560" height="300"><polyline class="ecg" fill="none" stroke="${C.green}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" points=""/></svg>
        <div class="bpm display" style="position:absolute;left:40px;bottom:24px;font-size:44px;font-weight:700;color:${C.green}">72 lpm</div></div>`);
    const chips = VIAS.map(([n, name, col], i) => add(r, `<div class="abs" style="left:${110 + (i % 2) * 440}px;top:${810 + Math.floor(i / 2) * 140}px;width:420px;height:118px;border-radius:24px;background:${C.surface2};border:3px solid ${col};display:flex;align-items:center;gap:20px;padding:0 24px;box-sizing:border-box">
        <div class="display" style="width:70px;height:70px;border-radius:18px;background:${col};color:${C.bg};display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700">${n}</div>
        <span class="display" style="font-size:42px;font-weight:700;color:${C.ink}">${name}</span></div>`));
    const tE = x.at('enfermar'), tC = x.at('cuatro'), tV = x.at('vias');
    x.cue(tE, 'buzz', 0.8); x.shake(tE, 12, 6);
    chips.forEach((_, i) => x.cue(tC + i * 0.18, 'pop', 0.55));
    const beat = (u, sick) => {
      const p = ((u % 140) + 140) % 140;
      if (!sick) return p > 60 && p < 70 ? -110 * Math.sin((p - 60) / 10 * Math.PI) : p > 72 && p < 80 ? 40 * Math.sin((p - 72) / 8 * Math.PI) : 0;
      return (p > 30 && p < 38 ? -130 : 0) + (p > 80 && p < 86 ? 90 : 0) + 18 * Math.sin(u * 0.21);
    };
    return (lt) => {
      mon.style.opacity = 1;
      const sick = lt > tE;
      const pts = [];
      for (let xx = 0; xx <= 560; xx += 5) pts.push(`${xx},${150 + beat(xx + lt * (sick ? 420 : 200), sick)}`);
      const ecg = mon.querySelector('.ecg');
      ecg.setAttribute('points', pts.join(' '));
      ecg.setAttribute('stroke', sick ? C.red : C.green);
      const st = mon.querySelector('.st');
      st.textContent = sick ? '● ALERTA' : '● ESTABLE'; st.style.color = sick ? C.red : C.green;
      st.style.opacity = sick ? (Math.sin(lt * 12) > 0 ? 1 : 0.3) : 1;
      mon.querySelector('.bot').style.color = sick ? C.red : C.cyan;
      const bpm = mon.querySelector('.bpm'); bpm.textContent = sick ? '138 lpm' : '72 lpm'; bpm.style.color = sick ? C.red : C.green;
      mon.style.borderColor = sick ? C.red : C.lineStrong;
      chips.forEach((c, i) => popIn(c, lt, tC - 0.1 + i * 0.18, 0.5));
    };
  });

  // ───────────────────────── 2 · ENTRADA ─────────────────────────
  scene('entrada', (x) => {
    const r = x.root;
    const head = dx(r, 0, 'INSTRUCCIONES OCULTAS EN DATOS');
    const src = [['Correo', I.envelope, 560], ['Web', GLOBE, 740], ['Documento', I.doc, 920]];
    const cards = src.map(([t, ic, y]) => add(r, `<div class="abs" style="left:110px;top:${y - 70}px;width:330px;height:140px;border-radius:26px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:20px;padding:0 26px;box-sizing:border-box">
        <div class="ic" style="width:70px;height:70px;color:${C.sky}">${ic}</div><span class="display" style="font-size:38px;font-weight:700;color:${C.ink}">${t}</span></div>`));
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">${src.map(([, , y]) => `<path d="M445 ${y} C 560 ${y}, 600 740, 690 740" fill="none" stroke="${C.lineStrong}" stroke-width="6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}</svg>`);
    const bot = node(r, 820, 740, 240, C.cyan, `<div style="width:120px;height:120px;color:${C.cyan}" class="bi">${BOT}</div><span class="display" style="font-size:32px;font-weight:700;color:${C.ink}">AGENTE</span>`);
    const tag = add(r, `<div class="abs mono" style="left:110px;top:460px;padding:8px 16px;border-radius:12px;background:${C.red};color:${C.ink};font-size:22px;font-weight:700">⚠ instrucción oculta</div>`);
    const order = add(r, `<div class="abs display" style="left:640px;width:360px;top:900px;text-align:center;font-size:40px;font-weight:700;color:${C.red};line-height:1.1">la toma<br>como orden</div>`);
    const tCo = x.at('correo'), tW = x.at('web'), tO = x.at('ocultas'), tOr = x.at('ordenes');
    x.cue(tCo, 'pop', 0.5); x.cue(tW, 'pop', 0.5); x.cue(tO, 'buzz', 0.6); x.cue(tOr, 'stamp', 0.8); x.shake(tOr, 12);
    return (lt) => {
      popIn(head, lt, -0.2, 0.7);
      const ts = [tCo, tW, tW + 0.35];
      const paths = svg.querySelectorAll('path');
      cards.forEach((c, i) => { popIn(c, lt, ts[i] - 0.2, 0.6); paths[i].setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, ts[i], 0.4))); });
      popIn(bot, lt, 0.1, 0.6);
      const bad = lt > tO;
      cards[0].style.borderColor = bad ? C.red : C.lineStrong;
      cards[0].querySelector('.ic').style.color = bad ? C.red : C.sky;
      paths[0].setAttribute('stroke', bad ? C.red : C.lineStrong);
      popIn(tag, lt, tO - 0.05, 0.6);
      bot.style.borderColor = lt > tOr ? C.red : C.cyan; bot.querySelector('.bi').style.color = lt > tOr ? C.red : C.cyan;
      popIn(order, lt, tOr - 0.1, 0.6);
    };
  });

  // ───────────────────────── 3 · PERMISOS: el llavero y el radio de impacto ─────────────────────────
  scene('permisos', (x) => {
    const r = x.root;
    const head = dx(r, 1, 'AGENCIA EXCESIVA');
    const CX = 540, CY = 760, R = 250, N = 8;
    const blast = add(r, `<div class="abs" style="left:${CX}px;top:${CY}px;width:0;height:0;border-radius:50%;background:radial-gradient(circle, rgba(251,44,54,.35), rgba(251,44,54,.08) 70%);border:4px solid ${C.red};opacity:0"></div>`);
    const keys = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * 2 * Math.PI - Math.PI / 2;
      return add(r, `<div class="abs" style="left:${CX + Math.cos(a) * R - 46}px;top:${CY + Math.sin(a) * R - 46}px;width:92px;height:92px;border-radius:24px;background:${C.surface};border:3px solid ${i < 2 ? C.green : C.amber};display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;color:${i < 2 ? C.green : C.amber}">${I.key}</div>`);
    });
    const bot = node(r, CX, CY, 200, C.cyan, `<div class="bi" style="width:100px;height:100px;color:${C.cyan}">${BOT}</div>`);
    const lg = add(r, `<div class="abs mono" style="left:110px;top:470px;font-size:22px;font-weight:700;line-height:1.6"><span style="color:${C.green}">■ necesarias</span><br><span style="color:${C.amber}">■ de más</span></div>`);
    const lbl = add(r, `<div class="abs" style="left:0;right:0;top:1080px;text-align:center;font-size:26px">${pill('RADIO DE IMPACTO = ARQUITECTURA DE PERMISOS', C.red)}</div>`);
    const tP = x.at('poder'), tN = x.at('necesita'), tF = x.at('fallar'), tD = x.at('dano'), tT = x.at('tocar');
    keys.forEach((_, i) => x.cue(tP - 0.2 + i * 0.08, 'tick', 0.4));
    x.cue(tF, 'buzz', 0.6); x.cue(tD - 0.1, 'rise', 0.5); x.cue(tD + 0.3, 'boom', 0.8); x.shake(tD + 0.3, 18);
    return (lt) => {
      popIn(head, lt, -0.2, 0.7);
      popIn(bot, lt, 0.1, 0.6);
      keys.forEach((k, i) => popIn(k, lt, tP - 0.25 + i * 0.08, 0.3));
      lg.style.opacity = appear(lt, tN, 0.3);
      const fl = lt > tF && lt < tD ? (Math.sin(lt * 30) > 0 ? C.red : C.cyan) : lt >= tD ? C.red : C.cyan;
      bot.style.borderColor = fl; bot.querySelector('.bi').style.color = fl;
      const b = Ease.outCubic(prog(lt, tD, 0.6));
      const size = b * (R + 70) * 2;
      blast.style.opacity = b > 0 ? 1 : 0;
      blast.style.width = blast.style.height = size + 'px';
      blast.style.transform = `translate(${-size / 2}px, ${-size / 2}px)`;
      keys.forEach((k, i) => { if (b >= 0.95) { k.style.borderColor = C.red; k.style.color = C.red; } else { k.style.borderColor = i < 2 ? C.green : C.amber; k.style.color = i < 2 ? C.green : C.amber; } });
      popIn(lbl, lt, tT - 0.2, 0.6);
    };
  });

  // ───────────────────────── 4 · OBJETIVO: métrica cumplida, casos sin resolver ─────────────────────────
  scene('objetivo', (x) => {
    const r = x.root;
    const head = dx(r, 2, 'DESVIACIÓN DEL OBJETIVO');
    const gauge = add(r, `<div class="abs" style="left:110px;width:860px;top:470px;height:120px;border-radius:26px;background:${C.surface};border:3px solid ${C.lineStrong};display:flex;align-items:center;gap:24px;padding:0 28px;box-sizing:border-box">
        <span class="mono" style="font-size:24px;font-weight:700;color:${C.muted};letter-spacing:.08em;flex:none">MÉTRICA: CASOS CERRADOS</span>
        <div style="flex:1;height:30px;border-radius:15px;background:${C.line};overflow:hidden"><div class="f" style="height:100%;width:0;background:${C.green};border-radius:15px"></div></div>
        <span class="ok display" style="font-size:34px;font-weight:700;color:${C.green};opacity:0">META ✓</span></div>`);
    const tickets = ['Reclamación de factura', 'Cambio de dirección', 'Error en el pedido', 'Baja del servicio'].map((t, i) => add(r, `<div class="abs" style="left:110px;width:860px;top:${640 + i * 108}px;height:92px;border-radius:20px;background:${C.surface2};border:2px solid ${C.line};display:flex;align-items:center;gap:20px;padding:0 26px;box-sizing:border-box">
        <span class="mono" style="font-size:22px;color:${C.faint};font-weight:700">#${1041 + i}</span>
        <span class="display" style="flex:1;font-size:32px;font-weight:700;color:${C.fg}">${t}</span>
        <span class="cl mono" style="padding:8px 14px;border-radius:10px;background:${C.green};color:${C.bg};font-size:22px;font-weight:700;opacity:0">CERRADO</span>
        <span class="nr mono" style="padding:8px 14px;border-radius:10px;border:3px solid ${C.red};color:${C.red};font-size:22px;font-weight:700;opacity:0">SIN RESOLVER</span></div>`));
    const exc = add(r, `<div class="abs" style="left:110px;width:860px;top:1080px;height:84px;border-radius:20px;background:${C.bg};border:3px dashed ${C.violet};display:flex;align-items:center;justify-content:center;gap:16px">
        <span class="mono" style="font-size:24px;font-weight:700;color:${C.violet}">EXCEPCIONES OCULTAS</span>
        ${[0, 1, 2].map(() => `<span class="e display" style="width:46px;height:46px;border-radius:12px;background:${C.red};color:${C.ink};font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center">!</span>`).join('')}</div>`);
    const tM = x.at('metrica'), tC = x.at('cierra'), tR = x.at('resolverlos'), tO = x.at('oculta');
    x.cue(tM + 0.6, 'ding', 0.7);
    tickets.forEach((_, i) => x.cue(tC + i * 0.12, 'pop', 0.45));
    x.cue(tR, 'buzz', 0.6); x.cue(tO, 'swipe', 0.7);
    const bad = [true, false, true, true];
    return (lt) => {
      popIn(head, lt, -0.2, 0.7);
      gauge.style.opacity = appear(lt, 0, 0.3);
      const g = Ease.outCubic(prog(lt, tM - 0.2, 0.8));
      gauge.querySelector('.f').style.width = 100 * g + '%';
      gauge.querySelector('.ok').style.opacity = g >= 1 ? 1 : 0;
      tickets.forEach((t, i) => {
        t.style.opacity = appear(lt, 0.2 + i * 0.1, 0.3);
        const cl = spring(lt, tC + i * 0.12, 0.3);
        t.querySelector('.cl').style.opacity = cl > 0 ? 1 : 0; t.querySelector('.cl').style.transform = `scale(${cl})`;
        const nr = bad[i] && lt > tR + i * 0.1;
        t.querySelector('.nr').style.opacity = nr ? 1 : 0;
        t.style.borderColor = nr ? C.red : C.line;
      });
      exc.style.opacity = appear(lt, tO - 0.2, 0.3);
      exc.querySelectorAll('.e').forEach((e, i) => {
        const k = Ease.inCubic(prog(lt, tO + 0.2 + i * 0.12, 0.5));
        e.style.transform = `translateY(${k * 40}px)`; e.style.opacity = 1 - k;
      });
    };
  });

  // ───────────────────────── 5 · RED: el contagio pasa por la memoria ─────────────────────────
  scene('red', (x) => {
    const r = x.root;
    const head = dx(r, 3, 'PROPAGACIÓN ENTRE COMPONENTES');
    const A = [230, 620], B = [540, 540], Cc = [850, 620], M = [540, 930];
    const svg = add(r, `<svg class="abs" width="1080" height="1920" style="left:0;top:0">
        <path d="M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${Cc[0]} ${Cc[1]} L${M[0]} ${M[1]} L${B[0]} ${B[1]}" fill="none" stroke="${C.lineStrong}" stroke-width="6" stroke-dasharray="12 10"/></svg>`);
    const nodes = [A, B, Cc].map((p, i) => node(r, p[0], p[1], 170, C.cyan, `<div class="bi" style="width:84px;height:84px;color:${C.cyan}">${BOT}</div><span class="mono" style="font-size:20px;font-weight:700;color:${C.muted}">AGENTE ${'ABC'[i]}</span>`));
    const mem = node(r, M[0], M[1], 190, C.violet, `<div style="width:90px;height:90px;color:${C.violet}">${I.memory}</div><span class="mono" style="font-size:22px;font-weight:700;color:${C.violet}">MEMORIA</span>`);
    const tok = add(r, `<div class="abs" style="left:0;top:0;width:60px;height:60px;border-radius:50%;background:${C.red};box-shadow:0 0 30px ${C.red}"></div>`);
    const badge = add(r, `<div class="abs mono" style="left:0;top:0;padding:6px 12px;border-radius:10px;background:${C.green};color:${C.bg};font-size:20px;font-weight:700;white-space:nowrap">✓ FIABLE</div>`);
    const warn = add(r, `<div class="abs" style="left:0;right:0;top:1085px;text-align:center;font-size:26px">${pill('LA CONFIANZA NO SE HEREDA', C.amber)}</div>`);
    const tC = x.at('contaminado'), tP = x.at('pasa'), tO = x.at('otro'), tM = x.at('memoria'), tV = x.at('vuelve'), tF = x.at('fiar');
    const legs = [[A, B, tP - 0.1], [B, Cc, tO - 0.2], [Cc, M, tM - 0.45], [M, B, tV - 0.1]];
    legs.forEach(([, , t]) => x.cue(t + 0.35, 'pop', 0.5)); x.cue(tF + 0.2, 'stamp', 0.8); x.shake(tF + 0.2, 12);
    return (lt) => {
      popIn(head, lt, -0.2, 0.7);
      svg.style.opacity = appear(lt, 0, 0.3);
      nodes.forEach((n, i) => popIn(n, lt, 0.05 + i * 0.1, 0.5)); popIn(mem, lt, 0.35, 0.5);
      let pos = A, show = lt > tC - 0.1;
      legs.forEach(([p, q, t]) => { const k = Ease.inOutCubic(prog(lt, t, 0.4)); if (lt >= t) pos = [lerp(p[0], q[0], k), lerp(p[1], q[1], k)]; });
      tok.style.opacity = show ? 1 : 0;
      tok.style.transform = `translate(${pos[0] - 30}px, ${pos[1] - 30}px)`;
      // Se infectan los nodos por los que pasa
      const inf = [lt > tC, lt > tP + 0.3, lt > tO + 0.2];
      nodes.forEach((n, i) => { n.style.borderColor = inf[i] ? C.red : C.cyan; n.querySelector('.bi').style.color = inf[i] ? C.red : C.cyan; });
      mem.style.borderColor = lt > tM ? C.red : C.violet;
      const disguised = lt > tV;
      tok.style.background = disguised ? C.green : C.red; tok.style.boxShadow = `0 0 30px ${disguised ? C.green : C.red}`;
      badge.style.opacity = disguised ? 1 : 0;
      badge.style.transform = `translate(${pos[0] + 34}px, ${pos[1] - 54}px)`;
      popIn(warn, lt, tF - 0.05, 0.6);
    };
  });

  // ───────────────────────── 6 · AUTOINMUNIDAD DIGITAL ─────────────────────────
  scene('autoinmune', (x) => {
    const r = x.root;
    const sh = add(r, `<div class="abs" style="left:470px;top:320px;width:140px;height:140px;color:${C.cyan}">${SHIELD}</div>`);
    const shl = add(r, `<div class="abs mono" style="left:0;right:0;top:470px;text-align:center;font-size:24px;font-weight:700;color:${C.cyan};letter-spacing:.1em">DEFENSA</div>`);
    const THREAT = 6, KILL = [0, 1, 2, 4, 5, 8, 9, 11];
    const tiles = Array.from({ length: 12 }, (_, i) => add(r, `<div class="abs" style="left:${150 + (i % 4) * 200}px;top:${560 + Math.floor(i / 4) * 160}px;width:170px;height:130px;border-radius:24px;background:${C.surface};border:3px solid ${i === THREAT ? C.red : C.green};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px">
        <div class="ic" style="width:48px;height:48px;color:${i === THREAT ? C.red : C.green}">${i === THREAT ? '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="currentColor"/></svg>' : I.check}</div>
        <span class="mono t" style="font-size:18px;font-weight:700;color:${C.muted}">${i === THREAT ? 'AMENAZA' : 'SERVICIO'}</span></div>`));
    const wave = add(r, `<div class="abs" style="left:540px;top:400px;width:0;height:0;border-radius:50%;border:6px solid ${C.cyan};opacity:0"></div>`);
    const lbl = add(r, `<div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:30px">${pill('AUTOINMUNIDAD DIGITAL', C.amber)}</div>`);
    const tD = x.at('defensa'), tS = x.at('sobreactuada'), tT = x.at('tumbar'), tA = x.at('autoinmunidad');
    x.cue(tS - 0.1, 'whoosh', 0.8);
    KILL.forEach((_, i) => x.cue(tT + i * 0.07, 'tick', 0.4)); x.cue(tA, 'stamp', 0.8); x.shake(tA, 14);
    return (lt) => {
      popIn(sh, lt, tD - 0.3, 0.5); shl.style.opacity = appear(lt, tD, 0.3);
      tiles.forEach((t, i) => {
        t.style.opacity = appear(lt, 0.05 + i * 0.03, 0.25);
        const dead = KILL.includes(i) && lt > tT + KILL.indexOf(i) * 0.07;
        if (i !== THREAT) {
          t.style.borderColor = dead ? C.lineStrong : C.green;
          t.querySelector('.ic').innerHTML = dead ? I.cross : I.check;
          t.querySelector('.ic').style.color = dead ? C.faint : C.green;
          t.querySelector('.t').textContent = dead ? 'BLOQUEADO' : 'SERVICIO';
          t.style.filter = dead ? 'opacity(.5)' : 'none';
        } else {
          t.style.boxShadow = lt > tT ? `0 0 ${30 + 20 * Math.sin(lt * 8)}px rgba(251,44,54,.6)` : 'none';
        }
      });
      const w = prog(lt, tS - 0.1, 0.9);
      const sz = w * 1300;
      wave.style.opacity = w > 0 && w < 1 ? (1 - w) : 0;
      wave.style.width = wave.style.height = sz + 'px'; wave.style.transform = `translate(${-sz / 2}px, ${-sz / 2}px)`;
      popIn(lbl, lt, tA - 0.1, 0.6);
    };
  });

  // ───────────────────────── 7 · TESIS: el ciclo inmunitario en 5 capas ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const title = add(r, `<div class="abs" style="left:0;right:0;top:320px;text-align:center;font-size:28px">${pill('LA CURA ES UN CICLO', C.ink)}</div>`);
    const words = ['validar', 'autorizar', 'observar', 'contener', 'aprender'];
    const cols = [C.cyan, C.sky, C.green, C.amber, C.violet];
    const CX = 540, CY = 770;
    const rings = words.map((w, i) => {
      const R = 90 + i * 62;
      return add(r, `<div class="abs" style="left:${CX - R}px;top:${CY - R}px;width:${R * 2}px;height:${R * 2}px;border-radius:50%;border:5px solid ${cols[i]};box-sizing:border-box">
          <div class="display" style="position:absolute;left:50%;top:-20px;transform:translateX(-50%);padding:0 14px;background:${C.bg};font-size:32px;font-weight:700;color:${cols[i]};white-space:nowrap">${w.toUpperCase()}</div></div>`);
    });
    const core = add(r, `<div class="abs" style="left:${CX - 50}px;top:${CY - 40}px;width:100px;height:100px;color:${C.ink}">${SHIELD}</div>`);
    const ts = words.map((w) => x.at(w));
    ts.forEach((t, i) => x.cue(t, i === 4 ? 'ding' : 'pop', i === 4 ? 0.8 : 0.55));
    return (lt) => {
      popIn(title, lt, -0.2, 0.7);
      popIn(core, lt, 0.2, 0.5);
      rings.forEach((rg, i) => {
        const s = spring(lt, ts[i] - 0.1, 0.45);
        rg.style.opacity = s > 0 ? 1 : 0; rg.style.transform = `scale(${lerp(0.6, 1, s)})`;
        rg.style.boxShadow = lt > ts[4] + 0.2 ? `0 0 30px ${cols[i]}55` : 'none';
      });
    };
  });

  // ───────────────────────── 8 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['articles.santismm.com'], sub: 'artículo: «sistema inmunitario» para agentes' }));
})();
