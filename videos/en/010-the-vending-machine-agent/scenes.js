/* EUREKA #10 (EN) · "The vending machine agent" (Vending-Bench)
 * English adaptation of videos/010-el-agente-de-la-maquina-de-vending (same sources and data; see that scenes.js).
 * Primary sources (Andon Labs):
 *  - Vending-Bench 2, https://andonlabs.com/evals/vending-bench-2 (read 16-11-2026): one simulated year, $500 start,
 *    $2 daily fee, suppliers by email; scored on bank balance at year end. Leaderboard (mean of 6 runs): #1 Gemini 4
 *    Carbon $16,484.21 ± $1,096 (released 25-10-2026). Andon's estimate for a "good" strategy: ~$63k/year (not a human).
 *  - Vending-Bench (arXiv 2502.15840, 20-2-2025), Table 1: Claude 3.5 Sonnet mean net worth $2,217.93, min $476.00
 *    over 5 runs (start: $500). FBI trace: Tables 3 and 4 (Sonnet's shortest run).
 * Thesis: articles.santismm.com/the-stopwatch-and-the-exam ("The closer a benchmark gets to real paid work, the
 * further the frontier is from done"), adapted as "the more real the work, the wider the gap".
 */
(function () {
  const { C, I, Ease, lerp, prog, spring, appear, add, scene } = EUREKA;
  const { pill, endCard, popText, popIn } = EUREKA.ui;
  const L = EUREKA.L;

  EUREKA.video = { keywords: L(['500 dólares', '500', 'vending', 'unos 16.500 dólares', '63.000', '26%', 'FBI', '2.218 dólares', '476', 'descarrila', 'dinero', 'brecha', 'nota'],
    ['500 dollars', '500', 'vending', '16,500', 'about 16,500 dollars', '16,500 dollars', '63,000', '26%', 'FBI', '2,218', '2,218 dollars', '476', 'derails', 'money', 'gap', 'score']) };

  const int = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, L('.', ','));
  const money = (n) => L(`${int(n)} $`, `$${int(n)}`);
  const CHIP = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="32" height="32" rx="5"/><rect x="25" y="25" width="14" height="14" rx="2"/><path d="M24 6v10M32 6v10M40 6v10M24 48v10M32 48v10M40 48v10M6 24h10M6 32h10M6 40h10M48 24h10M48 32h10M48 40h10"/></svg>`;
  const TAG = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M34 6h22v22L28 56 6 34z"/><circle cx="45" cy="17" r="4"/></svg>`;
  const COIN = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"><circle cx="32" cy="32" r="25"/><path d="M40 22c-2-3-5-4-8-4-5 0-8 3-8 6.5 0 8 16 5 16 13 0 4-4 6.5-8 6.5-4 0-7-2-9-5M32 12v6M32 46v6"/></svg>`;

  // ───────────── Máquina de vending reutilizable (460×660 a escala s) ─────────────
  const PCOL = [C.rose, C.amber, C.green, C.violet, C.sky, C.cyan, C.red, C.blue, C.amber, C.green, C.rose, C.violet];
  function machine(parent, x, y, s = 1) {
    let items = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
      const i = r * 3 + c, can = (i + r) % 2 === 0, col = PCOL[i];
      const cx = 93 * c + 46, top = r * 110 + 2;
      items += can
        ? `<div class="it abs" style="left:${cx - 23}px;top:${top + 18}px;width:46px;height:74px;border-radius:10px;background:linear-gradient(90deg,${col},${col}cc 60%,${col}88);box-shadow:inset 0 6px 0 rgba(255,255,255,.35)"></div>`
        : `<div class="it abs" style="left:${cx - 32}px;top:${top + 22}px;width:64px;height:70px;border-radius:8px 8px 14px 14px;background:${col};box-shadow:inset 0 -10px 0 rgba(0,0,0,.18);border-top:6px dotted rgba(255,255,255,.6)"></div>`;
      items += `<div class="abs" style="left:${cx - 40}px;top:${top + 96}px;width:80px;height:6px;border-radius:3px;background:repeating-linear-gradient(90deg,#93a1b8 0 6px,transparent 6px 11px);opacity:.7"></div>`;
    }
    const keys = Array.from({ length: 12 }, (_, i) => `<div class="abs" style="left:${318 + (i % 3) * 40}px;top:${184 + Math.floor(i / 3) * 34}px;width:32px;height:26px;border-radius:6px;background:${C.lineStrong}"></div>`).join('');
    const el = add(parent, `<div class="abs" style="left:${x}px;top:${y}px;width:${460 * s}px;height:${660 * s}px">
      <div class="abs" style="left:0;top:0;width:460px;height:660px;transform:scale(${s});transform-origin:0 0">
        <div class="abs" style="inset:0;border-radius:30px;background:linear-gradient(160deg,#1a2440,#0f1525 70%);border:5px solid ${C.lineStrong};box-shadow:0 40px 90px rgba(0,0,0,.6)"></div>
        <div class="abs display" style="left:22px;top:18px;width:416px;height:56px;border-radius:12px;background:linear-gradient(90deg,${C.amber},${C.rose});color:#0b0f19;font-size:36px;font-weight:700;letter-spacing:.18em;display:flex;align-items:center;justify-content:center">VENDING</div>
        <div class="glass abs" style="left:22px;top:90px;width:280px;height:450px;border-radius:14px;background:rgba(34,211,238,.05);border:3px solid rgba(119,212,255,.35);overflow:hidden">
          <div class="abs" style="left:0;top:0;width:280px;height:450px">${items}</div>
          <div class="abs" style="left:-80px;top:-40px;width:60px;height:600px;background:rgba(255,255,255,.07);transform:rotate(18deg)"></div></div>
        <div class="led abs mono" style="left:312px;top:90px;width:126px;height:74px;border-radius:10px;background:#02060c;border:3px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:25px;font-weight:700;color:${C.green};text-shadow:0 0 12px currentColor;white-space:nowrap"></div>
        ${keys}
        <div class="abs" style="left:366px;top:330px;width:18px;height:56px;border-radius:9px;background:#02060c;border:3px solid ${C.lineStrong}"></div>
        <div class="abs" style="left:312px;top:420px;width:126px;height:212px;border-radius:10px;border:3px solid ${C.line}"></div>
        <div class="abs mono" style="left:22px;top:556px;width:280px;height:76px;border-radius:12px;background:#02060c;border:3px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:${C.faint};letter-spacing:.2em">PUSH</div>
      </div></div>`);
    const led = el.querySelector('.led');
    return { el, items: [...el.querySelectorAll('.it')], led(txt, col = C.green) { led.textContent = txt; led.style.color = col; } };
  }

  // ───────────────────────── 1 · HOOK: 500 $, una máquina y un año ─────────────────────────
  scene('hook', (x) => {
    const r = x.root;
    const bill = add(r, `<div class="abs" style="left:0;top:0;width:210px;height:116px;border-radius:14px;background:linear-gradient(135deg,#34d399,#0f766e);border:4px solid #a7f3d0;box-shadow:0 20px 50px rgba(16,185,129,.35);display:flex;align-items:center;justify-content:center">
        <div class="abs" style="inset:10px;border-radius:8px;border:2px dashed rgba(255,255,255,.45)"></div>
        <div class="display" style="font-size:56px;font-weight:700;color:#04241c">${money(500)}</div></div>`);
    const M = machine(r, 310, 430, 1);
    const cal = add(r, `<div class="abs" style="left:790px;top:520px;width:140px;height:176px;border-radius:18px;background:#e9eef6;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5)">
        <div class="display" style="height:46px;background:${C.red};color:#fff;font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center">${L('1 AÑO', '1 YEAR')}</div>
        <div class="n display" style="text-align:center;font-size:62px;font-weight:700;color:#0b0f19;margin-top:14px;font-variant-numeric:tabular-nums">1</div>
        <div class="mono" style="text-align:center;font-size:20px;font-weight:700;color:#5d6b85">${L('DÍAS', 'DAYS')}</div></div>`);
    const q = add(r, `<div class="abs display" style="left:792px;top:340px;width:136px;height:136px;border-radius:50%;background:${C.amber};color:${C.bg};font-size:100px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(245,158,11,.5)">?</div>`);
    const ia = add(r, `<div class="abs" style="left:0;right:0;top:312px;text-align:center;font-size:30px">${pill(`<span style="width:38px;height:38px;display:inline-block">${CHIP}</span>${L('UNA IA AL MANDO', 'AN AI IN CHARGE')}`, C.cyan)}</div>`);
    const t5 = x.at('500'), tM = x.at(L('maquina', 'machine')), tA = x.at(L('año', 'year')), tQ = x.at(L('cuanto', 'how')), tI = x.at(L('ia', 'ai'), L(0, 0));
    x.cue(t5, 'pop', 0.8); x.cue(tM, 'boom', 0.7); x.shake(tM + 0.05, 10);
    M.items.forEach((_, i) => x.cue(tM + 0.2 + i * 0.04, 'tick', 0.15));
    for (let i = 0; i < 6; i++) x.cue(tA + i * 0.12, 'tick', 0.3);
    x.cue(tQ, 'ding', 0.7); x.cue(tI, 'pop', 0.6);
    return (lt) => {
      // El billete aparece grande en el centro y se aparta cuando llega la máquina.
      const b = spring(lt, t5 - 0.1, 0.45), mv = Ease.inOutCubic(prog(lt, tM - 0.2, 0.5));
      bill.style.opacity = b > 0 ? 1 : 0;
      bill.style.transform = `translate(${lerp(435, 90, mv)}px, ${lerp(640, 760, mv)}px) scale(${lerp(0.4, 1, b) * lerp(1.8, 1, mv)}) rotate(${lerp(0, -8, mv)}deg)`;
      const m = spring(lt, tM - 0.15, 0.5);
      M.el.style.opacity = m > 0 ? 1 : 0; M.el.style.transform = `translateY(${(1 - m) * 260}px)`;
      M.items.forEach((it, i) => { const s = spring(lt, tM + 0.15 + i * 0.04, 0.3); it.style.transform = `translateY(${(1 - Math.min(1, s)) * -40}px)`; it.style.opacity = s > 0 ? 1 : 0; });
      M.led(lt > tQ - 0.05 ? L('¿ ? $', '$ ? ?') : money(500), lt > tQ - 0.05 ? C.amber : C.green);
      popIn(cal, lt, tA - 0.15, 0.5);
      cal.querySelector('.n').textContent = Math.max(1, Math.round(365 * Ease.outCubic(prog(lt, tA, 0.8))));
      popIn(q, lt, tQ - 0.1, 0.3);
      q.style.transform += ` rotate(${Math.sin(lt * 4) * 6}deg)`;
      popIn(ia, lt, tI - 0.15, 0.6);
    };
  });

  // ───────────────────────── 2 · LAS REGLAS ─────────────────────────
  scene('reglas', (x) => {
    const r = x.root;
    const title = add(r, `<div class="abs" style="left:0;right:0;top:300px;text-align:center">
        <div class="display" style="font-size:88px;font-weight:700;color:${C.ink};line-height:1">VENDING-BENCH</div>
        <div class="lab mono" style="font-size:28px;font-weight:700;color:${C.muted};letter-spacing:.14em;margin-top:8px">ANDON LABS</div></div>`);
    const M = machine(r, 100, 470, 0.68);
    const rows = [
      [I.search, L('Busca proveedores', 'Finds suppliers'), C.cyan],
      [I.envelope, L('Pide por email', 'Orders by email'), C.sky],
      [TAG, L('Pone precios', 'Sets prices'), C.violet],
      [COIN, L('Paga 2 $ al día', 'Pays $2 a day'), C.red],
    ];
    const R = rows.map(([ic, txt, col], i) => add(r, `<div class="abs" style="left:450px;top:${470 + i * 112}px;width:480px;height:96px;border-radius:22px;background:${C.surface2};border:3px solid ${col};display:flex;align-items:center;gap:20px;padding:0 22px;box-sizing:border-box">
        <div style="width:58px;height:58px;color:${col};flex:none">${ic}</div>
        <div class="display" style="font-size:38px;font-weight:700;color:${C.ink};white-space:nowrap">${txt}</div></div>`));
    const win = add(r, `<div class="abs" style="left:100px;top:950px;width:830px;height:96px;border-radius:24px;background:rgba(16,185,129,.14);border:4px solid ${C.green};display:flex;align-items:center;justify-content:center;gap:18px">
        <div style="width:54px;height:54px;color:${C.green}">${I.star}</div>
        <div class="display" style="font-size:38px;font-weight:700;color:${C.ink}">${L('GANA: <span style="color:' + C.green + '">el saldo del banco</span> al final', 'SCORE: <span style="color:' + C.green + '">bank balance</span> at year end')}</div></div>`);
    const note = add(r, `<div class="abs mono" style="left:0;right:0;top:1068px;text-align:center;font-size:22px;font-weight:700;color:${C.faint}">${L('1 año simulado · de 3.000 a 6.000 mensajes por partida', '1 simulated year · 3,000 to 6,000 messages per run')}</div>`);
    const tV = x.at('vending'), tAn = x.at('andon'), tP = x.at(L('proveedores', 'suppliers')), tE = x.at('email'), tPr = x.at(L('precios', 'prices')), tD = x.at(L('dia', 'day')), tG = x.at(L('gana', 'whoever'));
    const tRow = [tP, tE, tPr, tD];
    x.cue(tV, 'whoosh', 0.5); tRow.forEach((t, i) => x.cue(t, i === 3 ? 'buzz' : 'tick', 0.5)); x.cue(tG, 'ding', 0.8);
    return (lt) => {
      popIn(title, lt, tV - 0.3, 0.8);
      title.querySelector('.lab').style.opacity = appear(lt, tAn - 0.1, 0.3);
      M.el.style.opacity = appear(lt, 0.1, 0.4);
      R.forEach((row, i) => {
        const s = spring(lt, tRow[i] - 0.15, 0.4);
        row.style.opacity = s > 0 ? 1 : 0; row.style.transform = `translateX(${(1 - Math.min(1, s)) * 120}px)`;
      });
      // El saldo de la máquina se mueve: compra, vende y paga la cuota.
      const bal = lt < tE ? 500 : lt < tPr ? 500 - 180 * prog(lt, tE, 0.5) : lt < tD ? 320 + 60 * prog(lt, tPr, 0.6) : 380 - 2 * Math.floor(prog(lt, tD, 1.5) * 4);
      const fee = lt > tD - 0.1 && lt < tD + 0.6;
      M.led(money(bal), fee ? C.red : C.green);
      popIn(win, lt, tG - 0.15, 0.6);
      note.style.opacity = appear(lt, tG + 0.5, 0.4);
    };
  });

  // ───────────────────────── 3 · RESULTADO: la curva real del mejor modelo ─────────────────────────
  // Gemini 4 Carbon, saldo medio de 6 ejecuciones, un punto por semana (días 0, 7, …, 364). Andon Labs.
  const CURVE = [500, 238, 162, 324, 420, 355, 334, 364, 484, 575, 773, 774, 755, 1095, 1233, 1600, 1535, 1809, 2021, 2369, 2364, 2698, 2533, 3036, 2949, 3280, 2992, 2989, 3417, 3610, 4131, 4699, 5220, 4843, 5408, 5633, 6205, 6765, 7377, 8100, 8590, 8677, 9374, 10002, 10611, 11515, 12243, 12935, 13773, 14454, 15090, 15905, 16457];
  const FINAL = 16484.21;
  scene('resultado', (x) => {
    const r = x.root;
    const GX = 190, GY = 560, GW = 720, GH = 400, YMAX = 18000;
    const px = (i) => GX + GW * (i * 7) / 364, py = (v) => GY + GH - GH * v / YMAX;
    const d = CURVE.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ');
    const yt = [0, 5000, 10000, 15000].map((v) => `<line x1="${GX}" x2="${GX + GW}" y1="${py(v)}" y2="${py(v)}" stroke="${C.line}" stroke-width="2"/><text x="${GX - 14}" y="${py(v) + 8}" text-anchor="end" font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.faint}">${v ? L(v / 1000 + ' mil', v / 1000 + 'k') : '0'}</text>`).join('');
    const xt = [0, 90, 180, 270, 365].map((dd) => `<text x="${GX + GW * dd / 364}" y="${GY + GH + 36}" text-anchor="middle" font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.faint}">${dd}</text>`).join('');
    const svg = add(r, `<svg class="abs" width="1080" height="1100" style="left:0;top:0;overflow:visible">
        ${yt}${xt}
        <text x="${GX + GW}" y="${GY + GH + 72}" text-anchor="end" font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.muted}">${L('DÍAS SIMULADOS →', 'SIMULATED DAYS →')}</text>
        <path class="area" d="${d} L${px(CURVE.length - 1)} ${GY + GH} L${GX} ${GY + GH} Z" fill="rgba(16,185,129,.14)"/>
        <path class="ln" d="${d}" fill="none" stroke="${C.green}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <circle class="dot" r="13" fill="${C.green}" stroke="${C.ink}" stroke-width="4"/>
        <line x1="${GX}" x2="${GX + GW}" y1="${py(500)}" y2="${py(500)}" stroke="${C.amber}" stroke-width="3" stroke-dasharray="10 8"/>
      </svg>`);
    const start = add(r, `<div class="abs mono" style="left:${GX + 14}px;top:${py(500) - 40}px;font-size:22px;font-weight:700;color:${C.amber}">${L('500 $ al empezar', '$500 at the start')}</div>`);
    const head = add(r, `<div class="abs" style="left:0;right:0;top:300px;text-align:center">
        <div class="mono" style="font-size:26px;font-weight:700;color:${C.muted};letter-spacing:.12em">${L('SALDO EN EL BANCO · MEJOR MODELO', 'BANK BALANCE · BEST MODEL')}</div>
        <div class="v display" style="font-size:150px;font-weight:700;color:${C.green};line-height:1.05;font-variant-numeric:tabular-nums;text-shadow:0 0 50px rgba(16,185,129,.45)">${money(500)}</div></div>`);
    const who = add(r, `<div class="abs mono" style="left:0;right:0;top:1040px;text-align:center;font-size:25px;font-weight:700;color:${C.fg}">${L('Gemini 4 Carbon · media de 6 ejecuciones', 'Gemini 4 Carbon · average of 6 runs')}</div>`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:1082px;text-align:center;font-size:21px;font-weight:700;color:${C.faint}">${L('Andon Labs · Vending-Bench 2 · tabla de nov. 2026', 'Andon Labs · Vending-Bench 2 · Nov 2026 leaderboard')}</div>`);
    const tH = x.at(L('hoy', 'today')), tU = x.at(L('unos', 'about'));
    const t0 = tH, t1 = tU + 0.5;
    x.cue(t0, 'rise', 0.6); for (let i = 0; i < 10; i++) x.cue(t0 + i * (t1 - t0) / 10, 'tick', 0.25); x.cue(t1, 'ding', 0.9); x.shake(t1, 8);
    const ln = svg.querySelector('.ln'), area = svg.querySelector('.area'), dot = svg.querySelector('.dot');
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      const k = Ease.inOutCubic(prog(lt, t0, t1 - t0));
      ln.setAttribute('stroke-dashoffset', 1 - k);
      const fi = k * (CURVE.length - 1), i0 = Math.floor(fi), i1 = Math.min(CURVE.length - 1, i0 + 1), f = fi - i0;
      const v = lerp(CURVE[i0], CURVE[i1], f);
      dot.setAttribute('cx', lerp(px(i0), px(i1), f)); dot.setAttribute('cy', py(v));
      area.style.opacity = 0.2 + 0.8 * k;
      area.style.clipPath = `inset(0 ${(1 - k) * 100}% 0 0)`;
      head.querySelector('.v').textContent = money(k >= 1 ? FINAL : v);
      start.style.opacity = appear(lt, 0.2, 0.3);
      who.style.opacity = appear(lt, tU - 0.3, 0.4); src.style.opacity = appear(lt, tU, 0.4);
    };
  });

  // ───────────────────────── 4 · LA BRECHA: el tubo de monedas ─────────────────────────
  scene('brecha', (x) => {
    const r = x.root;
    const TX = 400, TW = 220, TT = 360, TH = 640, K = FINAL / 63000;   // 26,2 %
    const tube = add(r, `<div class="abs" style="left:${TX}px;top:${TT}px;width:${TW}px;height:${TH}px;border-radius:30px;border:5px solid rgba(119,212,255,.45);background:rgba(34,211,238,.04);overflow:hidden">
        <div class="fill abs" style="left:0;right:0;bottom:0;height:0;background:repeating-linear-gradient(0deg,#0f9f72 0 14px,#34d399 14px 26px,#0b7a58 26px 28px)"></div>
        <div class="abs" style="left:24px;top:0;width:26px;height:100%;background:rgba(255,255,255,.08)"></div></div>`);
    const goal = add(r, `<div class="abs" style="left:${TX - 30}px;top:${TT - 3}px;width:${TW + 60}px;height:6px;background:${C.amber};box-shadow:0 0 20px ${C.amber}"></div>`);
    const gl = add(r, `<div class="abs" style="left:${TX + TW + 50}px;top:${TT - 30}px;width:${930 - TX - TW - 50}px">
        <div class="v display" style="font-size:56px;font-weight:700;color:${C.amber};line-height:1;white-space:nowrap">${money(63000)}</div>
        <div class="mono" style="font-size:22px;font-weight:700;color:${C.fg};margin-top:10px;line-height:1.35">${L('estrategia «buena»<br>al año', 'a "good" strategy<br>per year')}</div>
        <div class="mono" style="font-size:20px;font-weight:700;color:${C.faint};margin-top:8px;line-height:1.35">${L('estimación de Andon,<br>no un humano real', "Andon's estimate,<br>not a real human")}</div></div>`);
    const lvl = TT + TH - TH * K;
    const ai = add(r, `<div class="abs" style="left:${TX + TW + 50}px;top:${lvl - 40}px">
        <div class="display" style="font-size:52px;font-weight:700;color:${C.green};line-height:1">${money(FINAL)}</div>
        <div class="mono" style="font-size:22px;font-weight:700;color:${C.fg};margin-top:8px">${L('la mejor IA', 'the best AI')}</div></div>`);
    const pct = add(r, `<div class="abs display" style="left:90px;top:${lvl - 75}px;width:290px;text-align:right;font-size:120px;font-weight:700;color:${C.ink};text-shadow:0 0 40px rgba(16,185,129,.6)">26%</div>`);
    const calc = add(r, `<div class="abs mono" style="left:0;right:0;top:1040px;text-align:center;font-size:22px;font-weight:700;color:${C.faint}">${L('Cálculo propio: 16.484 $ ÷ 63.000 $ = 26 %', 'Our calculation: $16,484 ÷ $63,000 = 26%')}</div>`);
    const tAn = x.at('andon'), tEs = x.at(L('estrategia', 'strategy')), t63 = x.at('63000'), tQ = x.at(L('queda', 'gets')), t26 = x.at('26');
    x.cue(tEs, 'swipe', 0.6); x.cue(t63, 'ding', 0.7); x.cue(tQ - 0.1, 'rise', 0.6); x.cue(t26, 'boom', 0.9); x.shake(t26 + 0.05, 14);
    return (lt) => {
      tube.style.opacity = appear(lt, 0, 0.35);
      const f = Ease.outCubic(prog(lt, tQ - 0.2, t26 - tQ + 0.4));
      tube.querySelector('.fill').style.height = (TH * K * f) + 'px';
      const g = appear(lt, tEs - 0.1, 0.4); goal.style.opacity = g; goal.style.transform = `scaleX(${lerp(0.3, 1, g)})`;
      popIn(gl, lt, t63 - 0.15, 0.6);
      gl.querySelector('.v').textContent = money(63000 * Ease.outCubic(prog(lt, t63 - 0.15, 0.6)));
      ai.style.opacity = appear(lt, t26 - 0.1, 0.3);
      popIn(pct, lt, t26 - 0.08, 0.4);
      calc.style.opacity = appear(lt, t26 + 0.5, 0.4);
    };
  });

  // ───────────────────────── 5 · EL FBI: un agente que descarrila ─────────────────────────
  scene('fbi', (x) => {
    const r = x.root;
    const tag = add(r, `<div class="abs" style="left:0;right:0;top:304px;text-align:center;font-size:25px">${pill(L('VENDING-BENCH 1 · CLAUDE 3.5 SONNET · 2025', 'VENDING-BENCH 1 · CLAUDE 3.5 SONNET · 2025'), C.muted)}</div>`);
    const M = machine(r, 96, 400, 0.62);
    const logs = [
      [I.check, L('Cree que el pedido<br>ya ha llegado', 'Thinks the order<br>has arrived'), C.cyan],
      [I.cross, L('Reponer → ERROR:<br>no hay stock', 'Restock → ERROR:<br>no stock'), C.red],
      [I.issue, L('«Cierra»<br>el negocio', '"Closes"<br>the business'), C.amber],
    ];
    const LG = logs.map(([ic, txt, col], i) => add(r, `<div class="abs" style="left:420px;top:${410 + i * 136}px;width:510px;height:120px;border-radius:20px;background:${C.surface};border:3px solid ${col}66;display:flex;align-items:center;gap:20px;padding:0 22px;box-sizing:border-box">
        <div style="width:52px;height:52px;color:${col};flex:none">${ic}</div>
        <div class="mono" style="font-size:29px;font-weight:700;color:${C.ink};line-height:1.25">${txt}</div></div>`));
    const mail = add(r, `<div class="abs" style="left:110px;top:840px;width:820px;height:250px;border-radius:24px;background:#e9eef6;box-shadow:0 30px 80px rgba(0,0,0,.6);padding:26px 34px;box-sizing:border-box">
        <div style="display:flex;align-items:center;gap:16px"><div style="width:48px;height:48px;color:#0b0f19">${I.envelope}</div>
          <div class="mono" style="font-size:28px;font-weight:700;color:#0b0f19">${L('PARA: FBI', 'TO: FBI')}</div></div>
        <div class="display" style="font-size:36px;font-weight:700;color:${C.red};margin-top:16px;line-height:1.15">${L('EMERGENCIA: cobros no autorizados tras cerrar el negocio', 'EMERGENCY: Unauthorized Fees After Business Termination')}</div>
        <div class="mono" style="font-size:19px;font-weight:700;color:#5d6b85;margin-top:12px">${L('Asunto real del email (traducido) · arXiv 2502.15840, tabla 4', 'Real email subject · arXiv 2502.15840, Table 4')}</div></div>`);
    const stamp = add(r, `<div class="abs display" style="left:690px;top:800px;padding:6px 26px;border:7px solid ${C.red};border-radius:14px;color:${C.red};font-size:64px;font-weight:700;letter-spacing:.08em;background:rgba(233,238,246,.85)">FBI</div>`);
    const tDe = x.at(L('descarrila', 'derail')), tPr = x.at(L('primera', 'first')), tLl = x.at(L('llegado', 'arrived')), tEs = x.at(L('estaba', 'hadnt')), tCe = x.at(L('cerro', 'shut')), tW = x.at(L('escribio', 'emailed')), tF = x.at('fbi');
    const tL = [tLl, tEs, tCe];
    x.cue(tDe, 'buzz', 0.7); x.shake(tDe + 0.05, 12); x.cue(tPr, 'tick', 0.4);
    x.cue(tLl, 'pop', 0.5); x.cue(tEs, 'buzz', 0.6); x.cue(tCe, 'stamp', 0.5); x.cue(tW, 'swipe', 0.7); x.cue(tF, 'stamp', 1); x.shake(tF + 0.05, 18);
    return (lt) => {
      tag.style.opacity = appear(lt, tPr - 0.2, 0.3);
      M.el.style.opacity = 1;
      const tilt = Ease.outBack(prog(lt, tDe - 0.1, 0.5));
      M.el.style.transform = `rotate(${-7 * tilt + (lt > tDe ? Math.sin(lt * 9) * 1.2 : 0)}deg)`;
      M.el.style.transformOrigin = '50% 100%';
      const err = lt > tEs - 0.05;
      M.led(err ? (Math.floor(lt * 4) % 2 ? 'ERROR' : '') : money(500 - 2 * Math.floor(lt * 2)), err ? C.red : C.green);
      M.items.forEach((it) => { it.style.opacity = 0.12; });
      LG.forEach((g, i) => { const s = spring(lt, tL[i] - 0.15, 0.4); g.style.opacity = s > 0 ? 1 : 0; g.style.transform = `translateX(${(1 - Math.min(1, s)) * 100}px)`; });
      const m = spring(lt, tW - 0.1, 0.45);
      mail.style.opacity = m > 0 ? 1 : 0; mail.style.transform = `translateY(${(1 - Math.min(1, m)) * 120}px) rotate(${(1 - Math.min(1, m)) * 6}deg)`;
      const s = spring(lt, tF - 0.05, 0.3);
      stamp.style.opacity = s > 0 ? 1 : 0; stamp.style.transform = `rotate(-12deg) scale(${lerp(2.2, 1, s)})`;
    };
  });

  // ───────────────────────── 6 · VARIANZA: mismo modelo, misma tarea ─────────────────────────
  scene('varianza', (x) => {
    const r = x.root;
    const runs = [0, 1, 2, 3, 4].map((i) => add(r, `<div class="abs mono" style="left:${150 + i * 160}px;top:310px;width:140px;height:64px;border-radius:16px;background:${C.surface2};border:3px solid ${C.lineStrong};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:${C.fg}">${L('INTENTO', 'RUN')} ${i + 1}</div>`));
    const sub = add(r, `<div class="abs mono" style="left:0;right:0;top:392px;text-align:center;font-size:24px;font-weight:700;color:${C.muted}">${L('Claude 3.5 Sonnet · Vending-Bench 1 · valor neto final', 'Claude 3.5 Sonnet · Vending-Bench 1 · final net worth')}</div>`);
    const BASE = 980, SC = 500 / 2400;           // px por dólar
    const h = (v) => v * SC;
    const bar = (left, v, col) => add(r, `<div class="abs" style="left:${left}px;top:${BASE - h(v)}px;width:250px;height:${h(v)}px;border-radius:18px 18px 0 0;background:linear-gradient(180deg,${col},${col}88);transform-origin:50% 100%"></div>`);
    const bA = bar(200, 2217.93, C.cyan), bB = bar(630, 476, C.red);
    const vA = add(r, `<div class="abs display" style="left:150px;width:350px;top:${BASE - h(2217.93) - 100}px;text-align:center;font-size:76px;font-weight:700;color:${C.cyan}">${money(2218)}</div>`);
    const vB = add(r, `<div class="abs display" style="left:580px;width:350px;top:${BASE - h(476) - 196}px;text-align:center;font-size:76px;font-weight:700;color:${C.red}">${money(476)}</div>`);
    const lessB = add(r, `<div class="abs mono" style="left:580px;width:350px;top:${BASE - h(476) - 104}px;text-align:center;font-size:24px;font-weight:700;color:${C.red}">${L('< 500 $ del inicio', '< $500 starting cash')}</div>`);
    const base = add(r, `<div class="abs" style="left:150px;top:${BASE}px;width:780px;height:4px;background:${C.lineStrong}"></div>`);
    const line = add(r, `<div class="abs" style="left:150px;top:${BASE - h(500) - 2}px;width:780px;height:4px;background:repeating-linear-gradient(90deg,${C.amber} 0 16px,transparent 16px 26px)"></div>`);
    const lineL = add(r, `<div class="abs mono" style="left:150px;top:${BASE - h(500) - 36}px;font-size:21px;font-weight:700;color:${C.amber}">${L('500 $ al empezar', '$500 at the start')}</div>`);
    const lA = add(r, `<div class="abs mono" style="left:150px;width:350px;top:${BASE + 18}px;text-align:center;font-size:25px;font-weight:700;color:${C.fg}">${L('MEDIA DE 5 INTENTOS', 'AVERAGE OF 5 RUNS')}</div>`);
    const lB = add(r, `<div class="abs mono" style="left:580px;width:350px;top:${BASE + 18}px;text-align:center;font-size:25px;font-weight:700;color:${C.fg}">${L('PEOR INTENTO', 'WORST RUN')}</div>`);
    const tMo = x.at(L('mismo', 'same')), tTa = x.at(L('tarea', 'task')), tMe = x.at(L('media', 'average')), t22 = x.at('2218'), tPe = x.at(L('peor', 'worst')), t47 = x.at('476'), tMn = x.at(L('menos', 'less'));
    runs.forEach((_, i) => x.cue(tMo + i * 0.12, 'tick', 0.35));
    x.cue(t22, 'ding', 0.8); x.cue(t47 - 0.1, 'buzz', 0.7); x.cue(tMn, 'stamp', 0.7); x.shake(tMn + 0.05, 10);
    return (lt) => {
      runs.forEach((ru, i) => popIn(ru, lt, tMo - 0.1 + i * 0.12, 0.5));
      sub.style.opacity = appear(lt, tTa, 0.4);
      base.style.opacity = appear(lt, tMe - 0.4, 0.3);
      const a = Ease.outBack(prog(lt, tMe - 0.1, 0.8)); bA.style.transform = `scaleY(${a})`; bA.style.opacity = a > 0 ? 1 : 0;
      vA.style.opacity = appear(lt, t22 - 0.05, 0.3); lA.style.opacity = appear(lt, tMe, 0.4);
      const b = Ease.outBack(prog(lt, tPe - 0.05, 0.6)); bB.style.transform = `scaleY(${b})`; bB.style.opacity = b > 0 ? 1 : 0;
      vB.style.opacity = appear(lt, t47 - 0.05, 0.3); lB.style.opacity = appear(lt, tPe, 0.4);
      const ln = appear(lt, tMn - 0.2, 0.3); line.style.opacity = ln; lineL.style.opacity = ln;
      lessB.style.opacity = appear(lt, tMn + 0.1, 0.3);
      bB.style.boxShadow = lt > tMn ? `0 0 ${30 + 20 * Math.sin(lt * 8)}px rgba(251,44,54,.7)` : 'none';
    };
  });

  // ───────────────────────── 7 · LA LECCIÓN: el panel de selección ─────────────────────────
  scene('leccion', (x) => {
    const r = x.root;
    const head = add(r, `<div class="abs" style="left:0;right:0;top:310px;text-align:center;font-size:30px">${pill(L('¿QUÉ ELIGES MEDIR?', 'WHAT DO YOU MEASURE?'), C.ink)}</div>`);
    const btn = (top, code, txt, col) => add(r, `<div class="abs" style="left:110px;top:${top}px;width:820px;height:180px;border-radius:30px;background:${C.surface2};border:5px solid ${col};display:flex;align-items:center;gap:28px;padding:0 28px;box-sizing:border-box">
        <div class="mono" style="width:120px;height:120px;border-radius:22px;background:#02060c;border:3px solid ${col};color:${col};font-size:46px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none;text-shadow:0 0 14px currentColor">${code}</div>
        <div class="display" style="font-size:${txt.length > 22 ? 46 : 54}px;font-weight:700;color:${C.ink};line-height:1.1">${txt}</div></div>`);
    const A = btn(410, 'A1', L('La nota del examen', 'The exam score'), C.red);
    const strike = add(r, `<svg class="abs" width="1080" height="240" style="left:0;top:380px"><line x1="140" y1="200" x2="920" y2="50" stroke="${C.red}" stroke-width="14" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const B = btn(640, 'B1', L('El dinero que deja en un año', 'The money it makes in a year'), C.green);
    const D = btn(870, 'B2', L('Cuántas veces descarrila', 'How often it derails'), C.amber);
    const tN = x.at(L('nota', 'score')), tDi = x.at(L('dinero', 'money')), tCu = x.at(L('cuantas', 'often'));
    x.cue(tN, 'pop', 0.5); x.cue(tN + 0.4, 'swipe', 0.7); x.cue(tDi, 'ding', 0.7); x.cue(tCu, 'ding', 0.7);
    return (lt) => {
      head.style.opacity = appear(lt, 0, 0.3);
      popIn(A, lt, tN - 0.3, 0.7);
      strike.querySelector('line').setAttribute('stroke-dashoffset', 1 - Ease.outCubic(prog(lt, tN + 0.4, 0.3)));
      A.style.filter = lt > tN + 0.6 ? 'opacity(.45)' : 'none';
      const lit = (el, t) => { popIn(el, lt, t - 0.15, 0.6); const on = lt > t; el.style.boxShadow = on ? `0 0 ${40 + 14 * Math.sin(lt * 6)}px ${el.style.borderColor}` : 'none'; };
      B.style.borderColor = C.green; D.style.borderColor = C.amber;
      lit(B, tDi); lit(D, tCu);
    };
  });

  // ───────────────────────── 8 · TESIS ─────────────────────────
  scene('tesis', (x) => {
    const r = x.root;
    const l1 = popText(r, L('CUANTO MÁS REAL', 'THE MORE REAL'), `top:380px;font-size:96px;line-height:1.02;color:${C.ink}`);
    const l2 = add(r, `<div class="abs mono" style="left:0;right:0;top:500px;text-align:center;font-size:40px;font-weight:700;letter-spacing:.06em;color:${C.muted}">${L('ES EL TRABAJO,', 'THE WORK,')}</div>`);
    const l3 = popText(r, L('MAYOR ES<br>LA BRECHA', 'THE WIDER<br>THE GAP'), `top:600px;font-size:140px;line-height:1;color:${C.amber};text-shadow:0 0 60px rgba(245,158,11,.6)`);
    const src = add(r, `<div class="abs mono" style="left:0;right:0;top:930px;text-align:center;font-size:23px;font-weight:700;color:${C.faint}">${L('«El cronómetro y el examen» · articles.santismm.com', '"The stopwatch and the exam" · articles.santismm.com')}</div>`);
    const tR = x.at('real'), tT = x.at(L('trabajo', 'work')), tB = x.at(L('brecha', 'gap'));
    x.cue(tB - 0.15, 'rise', 0.6); x.cue(tB, 'boom', 1); x.shake(tB, 20);
    return (lt) => {
      popIn(l1, lt, tR - 0.5, 0.7);
      l2.style.opacity = appear(lt, tT - 0.2, 0.3);
      const s = spring(lt, tB - 0.35, 0.5); l3.style.opacity = s > 0 ? 1 : 0; l3.style.transform = `scale(${lerp(1.8, 1, s)})`;
      src.style.opacity = appear(lt, tB + 0.4, 0.4);
    };
  });

  // ───────────────────────── 9 · CTA ─────────────────────────
  scene('cta', (x) => endCard(x, { links: ['benchmarks.santismm.com'], sub: L('el tracker: Vending-Bench y más benchmarks, con sus fuentes', 'the tracker: Vending-Bench and more benchmarks, with sources') }));
})();
