/* Marcas de canal. script.json elige una con "brand": "<clave>"; sin clave se usa EUREKA (lib.js). */
(function () {
  EUREKA.brands = {
    // Identidad de futbolatlas.app: fondo casi negro, verde césped oscuro y acento lima.
    futbolatlas: {
      name: 'FÚTBOL ATLAS', tag: 'LA REGLA EN 60s',
      glowA: '202,243,0', glowB: '20,120,50',
      colors: {
        bg: '#121414', surface: '#0a2a12', surface2: '#0f3418', line: '#22302a', lineStrong: '#3a5140',
        fg: '#e2e2e2', ink: '#ffffff', muted: '#a3a78c', faint: '#6f745c',
        cyan: '#caf300', blue: '#4fb3ff', green: '#3ddc84', amber: '#ffb627', red: '#ff4d4d',
        rose: '#ff7a6b', violet: '#b79cff', sky: '#9be7ff', pitch: '#0d3a1a', pitchAlt: '#0f4420',
      },
      fonts: {
        display: "'Source Serif 4', Georgia, serif",
        caption: "'Hanken Grotesk', sans-serif",
        body: "'Hanken Grotesk', sans-serif",
      },
      preload: ['700 80px "Source Serif 4"', 'italic 600 50px "Source Serif 4"', '800 80px "Hanken Grotesk"', '600 30px "Hanken Grotesk"'],
      // Franjas de césped muy tenues en lugar de la rejilla.
      bgHtml: (C) => `<div class="layer" style="background: repeating-linear-gradient(180deg, rgba(202,243,0,.035) 0 120px, transparent 120px 240px);
          -webkit-mask-image: radial-gradient(900px 1300px at 50% 45%, #000 30%, transparent 90%);"></div>`,
    },
  };
})();
