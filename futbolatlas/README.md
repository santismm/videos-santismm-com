# FÚTBOL EN 60s

Canal de vídeo corto (TikTok, Shorts y Reels) que convierte el contenido de [futbolatlas.app](https://futbolatlas.app) en piezas de menos de 60 segundos. Usa el mismo motor que EUREKA (`../engine`) con la marca `futbolatlas`.

- Estrategia, análisis de la web, tendencias y plan de vídeos: [`docs/estrategia.md`](docs/estrategia.md)

| # | Título | Español | English |
|---|---|---|---|
| 01 | 4 mitos del fuera de juego | [mp4](videos/001-fuera-de-juego-4-mitos/out/001-fuera-de-juego-4-mitos.mp4) · [textos](videos/001-fuera-de-juego-4-mitos/publicacion.md) | [mp4](videos-en/001-offside-4-myths/out/001-offside-4-myths.mp4) · [texts](videos-en/001-offside-4-myths/publicacion.md) |
| 02 | 5 cambios del reglamento 2026/27 | [mp4](videos/002-cambios-reglas-2026-27/out/002-cambios-reglas-2026-27.mp4) · [textos](videos/002-cambios-reglas-2026-27/publicacion.md) | [mp4](videos-en/002-law-changes-2026-27/out/002-law-changes-2026-27.mp4) · [texts](videos-en/002-law-changes-2026-27/publicacion.md) |
| 03 | ¿Es mano? Las 3 preguntas de la Regla 12 | [mp4](videos/003-mano-tres-preguntas/out/003-mano-tres-preguntas.mp4) · [textos](videos/003-mano-tres-preguntas/publicacion.md) | [mp4](videos-en/003-handball-three-questions/out/003-handball-three-questions.mp4) · [texts](videos-en/003-handball-three-questions/publicacion.md) |
| 04 | Lo que el VAR puede revisar | [mp4](videos/004-var-que-puede-revisar/out/004-var-que-puede-revisar.mp4) · [textos](videos/004-var-que-puede-revisar/publicacion.md) | [mp4](videos-en/004-what-var-can-review/out/004-what-var-can-review.mp4) · [texts](videos-en/004-what-var-can-review/publicacion.md) |
| 05 | «Último hombre» no es la regla: cuándo es roja | [mp4](videos/005-ocasion-manifiesta-roja/out/005-ocasion-manifiesta-roja.mp4) · [textos](videos/005-ocasion-manifiesta-roja/publicacion.md) | [mp4](videos-en/005-dogso-red-card/out/005-dogso-red-card.mp4) · [texts](videos-en/005-dogso-red-card/publicacion.md) |
| 06 | Libre directo vs indirecto | [mp4](videos/006-libre-directo-vs-indirecto/out/006-libre-directo-vs-indirecto.mp4) · [textos](videos/006-libre-directo-vs-indirecto/publicacion.md) | [mp4](videos-en/006-direct-vs-indirect-free-kick/out/006-direct-vs-indirect-free-kick.mp4) · [texts](videos-en/006-direct-vs-indirect-free-kick/publicacion.md) |

- Kit de canales (avatar, banners, bios y ajustes de YouTube, Instagram y TikTok): [`brand/canales.md`](brand/canales.md)
- Calendario de 4 publicaciones semanales: [`brand/calendario.md`](brand/calendario.md)

## Cómo se hace un vídeo

```bash
engine/make.sh futbolatlas/videos/<id>
```

- **Dos idiomas, una animación:** la versión inglesa vive en `videos-en/<id>/script.json` con `"lang": "en"` y `"scenes_js"` apuntando al `scenes.js` español. Las escenas usan `tr('español', 'English')` en cada texto y en las anclas de palabra.
- `script.json` lleva `"brand": "futbolatlas"` (colores, tipografías y cabecera en `engine/brands.js`) y `"music"` (tempo y acordes).
- `engine/futbol.js` aporta la pizarra: medio campo a escala, fichas, balón, línea de fuera de juego, cabecera de mito, cabecera de cambio, anillo de cuenta atrás, tarjetas, sello, veredicto y tarjeta final.
- Efectos de sonido propios del canal en `engine/audio.py`: `whistle`, `kick` y `shutter`.

Tipografías añadidas: Source Serif 4 y Hanken Grotesk (SIL OFL). Contenido basado en futbolatlas.app (CC BY 4.0).
