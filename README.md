# EUREKA · IA en 60s

Canal de divulgación en vídeo corto (TikTok, Reels, Shorts y LinkedIn) que convierte el contenido de [santismm.com](https://santismm.com) y sus subdominios en piezas de unos 60 segundos. Claude Code produce los vídeos de principio a fin: guion, voz, animación, música, mezcla, portada y subtítulos.

- 📈 Estrategia, análisis de la web, tendencias y los 10 primeros vídeos: [`docs/estrategia.md`](docs/estrategia.md)

## Episodios

| # | Título | Vídeo | Textos de publicación |
|---|---|---|---|
| 01 | Mismo modelo, 24 puntos más: el arnés | [mp4](videos/001-el-arnes/out/001-el-arnes.mp4) | [publicacion.md](videos/001-el-arnes/publicacion.md) |
| 02 | Tu IA se sabía el examen: la contaminación | [mp4](videos/002-se-sabia-el-examen/out/002-se-sabia-el-examen.mp4) | [publicacion.md](videos/002-se-sabia-el-examen/publicacion.md) |
| 03 | Funciona una vez ≠ funciona siempre (pass^k) | [mp4](videos/003-una-vez-no-es-siempre/out/003-una-vez-no-es-siempre.mp4) | [publicacion.md](videos/003-una-vez-no-es-siempre/publicacion.md) |

## Cómo se hace un vídeo

```
videos/<id>/script.json   guion por escenas (texto que se locuta y se subtitula)
videos/<id>/scenes.js     animación de cada escena, sincronizada con las palabras (x.at('palabra'))
engine/make.sh videos/<id>
```

| Paso | Archivo | Qué hace |
|---|---|---|
| 1 | `engine/tts.py` | Voz neuronal (edge-tts, es-ES Álvaro) por escena, con el tiempo de cada palabra → `build/voice.wav`, `build/timeline.json` |
| 2 | `engine/render.mjs` + `engine/page.html` + `engine/lib.js` + `engine/components.js` | Motor de motion graphics en HTML determinista: Chromium (Playwright) captura cada fotograma y ffmpeg codifica en paralelo → `build/video_silent.mp4` y `build/cues.json` (efectos de sonido) |
| 3 | `engine/audio.py` | Música original (La menor, 100 BPM) y efectos sintetizados con numpy/scipy; ducking bajo la voz y normalización a -14 LUFS → `build/mix.wav` |
| 4 | `engine/make.sh` | Montaje final MP4 (H.264 + AAC, faststart), portada PNG y subtítulos `.srt` en `out/` |

Revisión rápida de fotogramas sueltos:

```bash
node engine/render.mjs videos/001-el-arnes --stills 0,4,12.5
```

**Qué incluye `components.js`:** componentes reutilizables entre episodios, como la hoja de examen corregida a mano, la tarjeta final, la tipografía cinética y un generador aleatorio con semilla para partículas.

**Qué incluye `lib.js`:**

- Paleta y tipografías de santismm.com.
- Zonas seguras de las plataformas.
- Subtítulos palabra a palabra con resaltado de palabras clave.
- Cabecera de serie y barra de progreso por escenas.
- Movimiento de cámara, sacudidas y transiciones con whoosh.
- Iconos SVG propios.

**Requisitos:**

- Python 3 con `edge-tts`, `numpy` y `scipy`.
- Node 18 o superior con `playwright` y Chromium.
- `ffmpeg`.

## Licencias y transparencia

- **Tipografías:** Space Grotesk, Inter y JetBrains Mono, todas con licencia SIL OFL.
- **Música y efectos:** generados por código en este repositorio.
- **Contenido:** basado en los artículos de santismm.com (CC BY 4.0).
- **Etiquetado:** cada vídeo se marca como contenido generado con IA en las plataformas, y la tarjeta final también lo indica.
