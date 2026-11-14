/* HISPANIC LEGACY #03 · "La epidural la describió un cirujano español en 1921"
 * Fuente: hispanic-legacy.com/k/fidel-pages-epidural-anaesthesia-1921 (verificada el 11-08-2026):
 *  c1 · Pagés publica "Anestesia metamérica" en la Revista Española de Cirugía (1921): primera descripción de la
 *       epidural toracolumbar en humanos, con anatomía, técnica, serie de casos y complicaciones.
 *  c2 · Revisión de 2024 en British Journal of Anaesthesia: "Subarachnoid and epidural anaesthesia were first
 *       described by August Bier in 1898 and Fidel Pagés in 1921, respectively."
 *  c3 · "Metamérica": anestesia por segmentos del cuerpo, y no de todo lo que queda por debajo de un nivel.
 *  c4 · Cirujano militar nacido en Huesca en 1886; muere en accidente de tráfico el 9-7-1923, a los 37 años.
 *  c5 · Dogliotti desarrolla el método de pérdida de resistencia en los años 30 sin citar al principio a Pagés;
 *       lo reconoce en 1939 gracias a la insistencia del cirujano argentino Alberto Gutiérrez.
 *  c7 · Lo que se atribuye a Pagés es la primera descripción; el método de Dogliotti es aportación propia.
 * No está en la ficha: que la epidural se asocia popularmente al parto (conocimiento general) y la analogía
 * del edificio (recurso didáctico propio).
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, popIn } = EUREKA.ui;
  const { endCard, year, stamp, stampIn, plate, plateIn, DARK } = EUREKA.hl;

  EUREKA.video = { keywords: ['epidural', 'español', 'nombre', 'metamérica', 'franjas', 'planta', '37', 'sin', 'citarlo', 'reconoce', 'Pagés', '1921'] };
  const row = (r, top, html, size = 30) => add(r, `<div class="abs" style="left:0;right:0;top:${top}px;text-align:center;font-size:${size}px">${html}</div>`);
  const PAPER = '#f8f0dc', INK = '#1a1814', SEPIA = '#4a4638';

  // ───────────────────────── 1 · HOOK ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const syr = add(r, `<div class="abs" style="left:300px;top:330px;width:480px;height:300px;filter:drop-shadow(0 16px 24px rgba(0,0,0,.6))">
        <svg viewBox="0 0 480 300" width="480" height="300"><g transform="rotate(-24 240 150)">
          <rect x="120" y="118" width="230" height="64" rx="10" fill="rgba(248,240,220,.12)" stroke="${C.ink}" stroke-width="7"/>
          <rect class="liq" x="126" y="124" width="150" height="52" rx="6" fill="${C.teal}"/>
          <path d="M350 150H400M400 132v36M40 150H120M70 118v64" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
          <path d="M400 150H470" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
          <path d="M170 118v20M210 118v20M250 118v20M290 118v20" stroke="${C.ink}" stroke-width="4"/></g></svg></div>`);
    const word = add(r, `<div class="abs display" style="left:0;right:0;top:640px;text-align:center;font-size:150px;font-weight:900;color:${C.gold};text-shadow:0 10px 34px rgba(0,0,0,.85)">EPIDURAL</div>`);
    const who = add(r, `<div class="abs" style="left:150px;top:880px;width:780px;height:190px;border-radius:28px;background:${DARK};border:4px solid ${C.lineStrong};display:flex;align-items:center;gap:30px;padding:0 36px;box-sizing:border-box">
        <div style="width:110px;height:110px;border-radius:50%;background:${C.line};display:flex;align-items:center;justify-content:center;flex:none"><span class="display" style="font-size:84px;font-weight:900;color:${C.amber}">?</span></div>
        <div style="flex:1"><div class="mono" style="font-size:25px;font-weight:700;letter-spacing:.12em;color:${C.muted}">DESCRITA POR PRIMERA VEZ POR</div>
          <div style="display:flex;gap:16px;margin-top:18px"><div style="height:40px;width:170px;border-radius:10px;background:${C.lineStrong}"></div><div style="height:40px;width:230px;border-radius:10px;background:${C.lineStrong}"></div></div></div></div>`);
    const tE = x.at('epidural'), tD = x.at('describió'), tN = x.at('nombre');
    x.cue(0.1, 'rise', 0.5); x.cue(tE + 0.1, 'boom', 0.7); x.cue(tD - 0.1, 'swipe', 0.6); x.cue(tN, 'stamp', 0.9); x.shake(tN, 12);
    return (lt) => {
      const s = popIn(syr, lt, 0.05, 0.6, 0.5);
      syr.style.transform = `scale(${lerp(0.6, 1, s)}) translateY(${Math.sin(lt * 2) * 8}px)`;
      popIn(word, lt, tE - 0.05, 0.6);
      const k = Ease.outCubic(prog(lt, tD - 0.15, 0.45));
      who.style.opacity = k; who.style.transform = `translateY(${(1 - k) * 80}px) scale(${1 + 0.05 * Math.sin(Math.PI * prog(lt, tN, 0.4))})`;
      who.style.borderColor = lt > tN ? C.amber : C.lineStrong;
    };
  });

  // ───────────────────────── 2 · PAGÉS, 1921 ─────────────────────────
  scene('pages', (x) => {
    const r = x.root;
    const pl = plate(r, 'Fidel Pagés', 'CIRUJANO MILITAR · HUESCA', 330);
    const yr = add(r, `<div class="abs display" style="right:100px;top:336px;font-size:118px;font-weight:900;line-height:1;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.8)">1921</div>`);
    const items = ['ANATOMÍA', 'TÉCNICA', 'CASOS', 'COMPLICACIONES'];
    const paper = add(r, `<div class="abs" style="left:150px;top:540px;width:780px;height:620px;border-radius:14px;background:${PAPER};box-shadow:0 30px 70px rgba(0,0,0,.65);transform-origin:50% 0">
        <div class="mono" style="padding:26px 44px 0;font-size:23px;font-weight:700;letter-spacing:.16em;color:${SEPIA};text-align:center">REVISTA ESPAÑOLA DE CIRUGÍA · 1921</div>
        <div style="margin:14px 44px 0;height:3px;background:${SEPIA}"></div>
        <div class="display" style="padding:22px 44px 0;font-size:68px;font-weight:900;color:${INK};text-align:center;line-height:1.05">Anestesia metamérica</div>
        <div class="mono" style="text-align:center;font-size:24px;font-weight:500;color:${SEPIA};margin-top:8px">por Fidel Pagés</div>
        <div style="margin:26px 60px 0;display:flex;flex-direction:column;gap:20px">
          ${items.map((t) => `<div class="it" style="display:flex;align-items:center;gap:22px"><div style="width:58px;height:58px;border-radius:12px;background:${C.brand};color:${PAPER};padding:9px;box-sizing:border-box;flex:none">${I.check}</div><span class="mono" style="font-size:38px;font-weight:700;letter-spacing:.06em;color:${INK}">${t}</span></div>`).join('')}
        </div></div>`);
    const its = [...paper.querySelectorAll('.it')];
    const tw = [x.at('anatomía'), x.at('método'), x.at('casos'), x.at('complicaciones')];
    const tY = x.at('1921'), tP = x.at('publica');
    x.cue(0.2, 'swipe', 0.6); x.cue(tY, 'ding', 0.7); x.cue(tP - 0.1, 'whoosh', 0.8); tw.forEach((t) => x.cue(t, 'pop', 0.7));
    return (lt) => {
      plateIn(pl, lt, 0.15);
      popIn(yr, lt, tY - 0.1, 0.6);
      const k = Ease.outCubic(prog(lt, tP - 0.15, 0.5));
      paper.style.opacity = k; paper.style.transform = `translateY(${(1 - k) * 140}px) rotate(${lerp(4, -1.2, k)}deg)`;
      its.forEach((e, i) => { const s = spring(lt, tw[i] - 0.05, 0.35); e.style.opacity = s > 0 ? 1 : 0.12; e.style.transform = `translateX(${(1 - Math.min(1, s)) * -30}px)`; });
    };
  });

  // ───────────────────────── 3 · METAMÉRICA: POR FRANJAS ─────────────────────────
  scene('metamerica', (x) => {
    const r = x.root;
    const head = row(r, 330, pill('«ANESTESIA METAMÉRICA»', C.gold), 32);
    const N = 9, ON = [3, 4]; // franjas dormidas / planta apagada (contando desde arriba)
    // Cuerpo: cabeza + franjas horizontales (tronco y piernas)
    const widths = [150, 190, 200, 196, 186, 180, 150, 136, 124];
    const body = add(r, `<div class="abs" style="left:120px;top:430px;width:360px;height:700px">
        <div style="width:112px;height:112px;border-radius:50%;background:${C.parch};margin:0 auto 14px"></div>
        ${widths.map((w, i) => `<div class="seg" style="height:45px;margin:0 auto 8px;width:${w}px;border-radius:${i < 6 ? 14 : 12}px;background:${C.parch};${i >= 6 ? `box-shadow:inset 0 0 0 0 transparent;` : ''}"></div>`).join('')}
        <div class="mono" style="text-align:center;font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.muted};margin-top:10px">EL CUERPO</div></div>`);
    const segs = [...body.querySelectorAll('.seg')];
    // Edificio: plantas con ventanas
    const bld = add(r, `<div class="abs" style="left:600px;top:450px;width:360px;height:680px">
        <div style="width:330px;margin:0 auto;border-radius:16px 16px 0 0;background:#22362f;border:4px solid ${C.lineStrong};padding:16px 16px 6px;box-sizing:border-box">
          ${Array.from({ length: N }, () => `<div class="fl" style="display:flex;gap:12px;margin-bottom:11px">${Array.from({ length: 5 }, () => `<div class="w" style="flex:1;height:42px;border-radius:6px;background:${C.gold}"></div>`).join('')}</div>`).join('')}
        </div>
        <div class="mono" style="text-align:center;font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.muted};margin-top:14px">EL EDIFICIO</div></div>`);
    const floors = [...bld.querySelectorAll('.fl')];
    const zz = add(r, `<div class="abs display" style="left:455px;top:650px;font-size:70px;font-weight:900;color:${C.teal};text-shadow:0 6px 18px rgba(0,0,0,.8)">zZ</div>`);
    const no = stamp(r, 'NO TODO LO DE ABAJO', 1095, C.amber, 46);
    const tF = x.at('franjas'), tA = x.at('apagar'), tP = x.at('planta'), tNo = x.at('no'), tAb = x.at('abajo');
    x.cue(0.2, 'pop', 0.7); x.cue(tF - 0.05, 'ding', 0.8); x.cue(tA - 0.2, 'swipe', 0.6); x.cue(tP, 'pop', 0.9); x.cue(tNo, 'buzz', 0.5); x.cue(tAb, 'stamp', 0.8);
    return (lt) => {
      popIn(head, lt, 0.2, 0.7);
      body.style.opacity = appear(lt, x.at('duerme') - 0.3, 0.4);
      const kS = Ease.outCubic(prog(lt, tF - 0.1, 0.4));
      segs.forEach((e, i) => {
        const on = ON.includes(i);
        e.style.background = on ? `color-mix(in srgb, ${C.teal} ${kS * 100}%, ${C.parch})` : C.parch;
        e.style.boxShadow = on ? `0 0 ${40 * kS}px ${C.teal}` : 'none';
        e.style.opacity = on ? 1 : lerp(1, 0.55, kS);
      });
      const z = spring(lt, tF, 0.4); zz.style.opacity = z > 0 ? 1 : 0; zz.style.transform = `scale(${lerp(0.4, 1, z)}) translateY(${Math.sin(lt * 3) * 6}px)`;
      const kB = Ease.outCubic(prog(lt, tA - 0.25, 0.45));
      bld.style.opacity = kB; bld.style.transform = `translateY(${(1 - kB) * 80}px)`;
      const kOff = prog(lt, tP - 0.05, 0.25);
      // "y no la de todas las de abajo": las plantas inferiores parpadean en rojo y se recuperan
      const wrong = prog(lt, tNo, 0.25) * (1 - prog(lt, tAb + 0.1, 0.3));
      floors.forEach((f, i) => {
        const off = ON.includes(i) ? kOff : 0, below = i > ON[ON.length - 1] ? wrong : 0;
        [...f.children].forEach((w, j) => {
          w.style.background = off ? `color-mix(in srgb, #0d1814 ${off * 100}%, ${C.gold})` : (below ? `color-mix(in srgb, ${C.red} ${below * 70}%, ${C.gold})` : C.gold);
          w.style.opacity = 1 - 0.07 * ((i * 3 + j * 5) % 4) - below * 0.45 * (0.5 + 0.5 * Math.sin(lt * 30 + i));
          w.style.boxShadow = off ? 'none' : `0 0 14px rgba(240,185,74,.5)`;
        });
      });
      stampIn(no, lt, tAb, -3);
    };
  });

  // ───────────────────────── 4 · 1923 ─────────────────────────
  scene('muerte', (x) => {
    const r = x.root;
    const y = year(r, '1923', 'ACCIDENTE DE TRÁFICO');
    const life = add(r, `<div class="abs" style="left:120px;top:690px;width:840px;height:150px">
        <div style="position:absolute;left:0;top:60px;width:100%;height:8px;border-radius:4px;background:${C.line}"><div class="fill" style="height:100%;width:0;border-radius:4px;background:${C.parch}"></div></div>
        <div class="mono" style="position:absolute;left:0;top:90px;font-size:28px;font-weight:700;color:${C.ink};letter-spacing:.08em">1886</div>
        <div class="mono m21" style="position:absolute;left:${(35 / 37) * 100}%;top:6px;transform:translateX(-50%);font-size:26px;font-weight:700;color:${C.gold};letter-spacing:.06em;white-space:nowrap">1921 · ARTÍCULO</div>
        <div class="d21" style="position:absolute;left:${(35 / 37) * 100}%;top:51px;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:${C.gold};box-shadow:0 0 16px ${C.gold}"></div>
        <div class="mono e23" style="position:absolute;right:0;top:90px;font-size:28px;font-weight:700;color:${C.ink};letter-spacing:.08em">1923</div></div>`);
    const age = add(r, `<div class="abs display" style="left:0;right:0;top:860px;text-align:center;font-size:190px;font-weight:900;line-height:1;color:${C.ink};text-shadow:0 10px 34px rgba(0,0,0,.85)">37 <span style="font-size:90px;color:${C.muted}">AÑOS</span></div>`);
    const tD = x.at('dos'), tM = x.at('muere'), tT = x.at('37');
    x.cue(0.2, 'ding', 0.5); x.cue(tM, 'boom', 0.9); x.shake(tM, 10); x.cue(tT, 'stamp', 0.7);
    return (lt) => {
      popIn(y, lt, 0.15, 0.7);
      life.style.opacity = appear(lt, tD - 0.1, 0.3);
      life.querySelector('.fill').style.width = Ease.inOutCubic(prog(lt, tD, tM - tD)) * 100 + '%';
      const s21 = appear(lt, tD + 0.5, 0.3); life.querySelector('.m21').style.opacity = s21; life.querySelector('.d21').style.opacity = s21;
      life.querySelector('.e23').style.opacity = appear(lt, tM - 0.05, 0.2);
      popIn(age, lt, tT - 0.05, 0.6);
    };
  });

  // ───────────────────────── 5 · EL CRÉDITO PERDIDO Y RECUPERADO ─────────────────────────
  scene('olvido', (x) => {
    const r = x.root;
    const dec = row(r, 330, pill('AÑOS 30', C.ink), 32);
    const dg = plate(r, 'Dogliotti', 'CIRUJANO ITALIANO', 420);
    const box = add(r, `<div class="abs" style="left:150px;top:610px;width:780px;height:210px;border-radius:28px;background:${DARK};border:5px solid ${C.red};display:flex;align-items:center;justify-content:space-between;padding:0 44px;box-sizing:border-box">
        <div><div class="mono" style="font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.muted}">¿CITA A PAGÉS?</div>
          <div class="display ans" style="font-size:84px;font-weight:900;color:${C.red};line-height:1.1">No</div></div>
        <div class="ic" style="width:130px;height:130px;color:${C.red}">${I.cross}</div></div>`);
    const gt = plate(r, 'Alberto Gutiérrez', 'CIRUJANO ARGENTINO', 1000, 96);
    const chev = [0, 1, 2].map((i) => add(r, `<svg class="abs" style="left:500px;top:${930 - i * 38}px" width="80" height="44" viewBox="0 0 80 44"><path d="M8 38L40 8l32 30" fill="none" stroke="${C.gold}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`));
    const y39 = add(r, `<div class="abs display" style="right:110px;top:400px;font-size:150px;font-weight:900;line-height:1;color:${C.gold};text-shadow:0 8px 30px rgba(0,0,0,.8)">1939</div>`);
    const tDg = x.at('dogliotti'), tS = x.at('sin'), tAr = x.at('cirujano'), tI = x.at('insiste'), tY = x.at('1939'), tR = x.at('reconoce');
    x.cue(0.2, 'pop', 0.6); x.cue(tDg - 0.15, 'swipe', 0.6); x.cue(tS, 'buzz', 0.7); x.cue(tAr - 0.15, 'swipe', 0.6);
    for (let i = 0; i < 4; i++) x.cue(tI + i * 0.2, 'pop', 0.6);
    x.cue(tY, 'ding', 0.8); x.cue(tR - 0.4, 'rise', 0.7); x.cue(tR, 'boom', 1); x.shake(tR, 12);
    return (lt) => {
      popIn(dec, lt, 0.15, 0.7);
      plateIn(dg, lt, tDg - 0.2);
      popIn(box, lt, tS - 0.15, 0.7);
      plateIn(gt, lt, tAr - 0.2);
      chev.forEach((c, i) => {
        const a = lt - tI; const ph = ((a * 2.2 - i * 0.33) % 1 + 1) % 1;
        c.style.opacity = a > -0.1 && lt < tR ? 0.25 + 0.75 * Math.sin(Math.PI * ph) : 0;
      });
      popIn(y39, lt, tY - 0.05, 0.6);
      const ok = lt >= tR, col = ok ? C.green : C.red, f = prog(lt, tR, 0.36);
      box.style.borderColor = col; box.style.boxShadow = ok ? `0 0 60px ${C.green}66` : 'none';
      if (lt > tS - 0.15) box.style.transform = `scale(${1 + 0.08 * Math.sin(Math.PI * f)})`;
      const ans = box.querySelector('.ans'), ic = box.querySelector('.ic');
      ans.textContent = ok ? 'Sí, en 1939' : 'No'; ans.style.color = col;
      ic.style.color = col; ic.innerHTML = ok ? I.check : I.cross;
    };
  });

  // ───────────────────────── 6 · LO QUE DICE HOY LA LITERATURA ─────────────────────────
  scene('hoy', (x) => {
    const r = x.root;
    const top = add(r, `<div class="abs display" style="left:0;right:0;top:330px;text-align:center;font-size:74px;font-weight:900;line-height:1.08;color:${C.ink};text-shadow:0 8px 30px rgba(0,0,0,.85)">EPIDURAL<br><span style="color:${C.gold}">Fidel Pagés, 1921</span></div>`);
    const card = add(r, `<div class="abs" style="left:110px;top:600px;width:860px;height:440px;border-radius:24px;background:${PAPER};box-shadow:0 30px 70px rgba(0,0,0,.65);overflow:hidden">
        <div class="mono" style="padding:16px 36px;background:#d8ccb0;color:${SEPIA};font-size:23px;font-weight:700;letter-spacing:.1em">BRITISH JOURNAL OF ANAESTHESIA · REVISIÓN, 2024</div>
        <div class="display" style="padding:34px 40px 0;font-size:50px;font-weight:500;line-height:1.3;color:${INK}">«Subarachnoid and epidural anaesthesia were first described by August Bier in 1898 and <span class="hl" style="font-weight:900;background:linear-gradient(${C.gold},${C.gold}) no-repeat 0 88%/0% 42%">Fidel Pagés in 1921</span>, respectively.»</div></div>`);
    const hl = card.querySelector('.hl');
    const tL = x.at('literatura'), tE = x.at('epidural'), tF = x.at('fidel');
    x.cue(tL - 0.1, 'whoosh', 0.8); x.cue(tE, 'pop', 0.7); x.cue(tF - 0.35, 'rise', 0.7); x.cue(tF, 'boom', 1); x.shake(tF, 12); x.cue(x.at('1921'), 'ding', 0.8);
    return (lt) => {
      const k = Ease.outCubic(prog(lt, tL - 0.2, 0.5));
      card.style.opacity = k; card.style.transform = `translateY(${(1 - k) * 120}px) rotate(${lerp(3, -0.8, k)}deg)`;
      hl.style.backgroundSize = `${Ease.inOutCubic(prog(lt, tF - 0.05, 0.9)) * 100}% 42%`;
      popIn(top, lt, tE - 0.1, 0.7);
    };
  });

  scene('cta', (x) => endCard(x, { url: 'hispanic-legacy.com/k/fidel-pages-epidural-anaesthesia-1921', tCompartir: 0.3 }));
})();
