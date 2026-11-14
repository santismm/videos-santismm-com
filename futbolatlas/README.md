# FÚTBOL ATLAS · La regla en 60s

Canal de vídeo corto (TikTok, Shorts y Reels) que convierte el contenido de [futbolatlas.app](https://futbolatlas.app) en piezas de menos de 60 segundos. Usa el mismo motor que EUREKA (`../engine`) con la marca `futbolatlas`.

- Estrategia, análisis de la web, tendencias y plan de vídeos: [`docs/estrategia.md`](docs/estrategia.md)

| # | Título | Vídeo | Textos de publicación |
|---|---|---|---|
| 01 | 4 mitos del fuera de juego (Regla 11) | [mp4](videos/001-fuera-de-juego-4-mitos/out/001-fuera-de-juego-4-mitos.mp4) | [publicacion.md](videos/001-fuera-de-juego-4-mitos/publicacion.md) |
| 02 | 5 cambios del reglamento 2026/27 | [mp4](videos/002-cambios-reglas-2026-27/out/002-cambios-reglas-2026-27.mp4) | [publicacion.md](videos/002-cambios-reglas-2026-27/publicacion.md) |

## Cómo se hace un vídeo

```bash
engine/make.sh futbolatlas/videos/<id>
```

- `script.json` lleva `"brand": "futbolatlas"` (colores, tipografías y cabecera en `engine/brands.js`) y `"music"` (tempo y acordes).
- `engine/futbol.js` aporta la pizarra: medio campo a escala, fichas, balón, línea de fuera de juego, cabecera de mito, cabecera de cambio, anillo de cuenta atrás, tarjetas, sello, veredicto y tarjeta final.
- Efectos de sonido propios del canal en `engine/audio.py`: `whistle`, `kick` y `shutter`.

Tipografías añadidas: Source Serif 4 y Hanken Grotesk (SIL OFL). Contenido basado en futbolatlas.app (CC BY 4.0).
