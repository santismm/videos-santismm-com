# EUREKA · IA en 60s

Canal de divulgación en vídeo corto (TikTok, Reels, Shorts y LinkedIn) que convierte el contenido de [santismm.com](https://santismm.com) y sus subdominios en piezas de unos 60 segundos. Claude Code produce los vídeos de principio a fin: guion, voz, animación, música, mezcla, portada y subtítulos.

- 📈 Estrategia, análisis de la web, tendencias y los 10 primeros vídeos: [`docs/estrategia.md`](docs/estrategia.md)

## Episodios

| # | Título | Vídeo | Textos de publicación | YouTube |
|---|---|---|---|---|
| 01 | Mismo modelo, 24 puntos más: el arnés | [mp4](videos/001-el-arnes/out/001-el-arnes.mp4) | [publicacion.md](videos/001-el-arnes/publicacion.md) | [publicado 9 nov](https://www.youtube.com/shorts/eG4HuFDUEAk) |
| 02 | Tu IA se sabía el examen: la contaminación | [mp4](videos/002-se-sabia-el-examen/out/002-se-sabia-el-examen.mp4) | [publicacion.md](videos/002-se-sabia-el-examen/publicacion.md) | programado 11 nov |
| 03 | Funciona una vez ≠ funciona siempre (pass^k) | [mp4](videos/003-una-vez-no-es-siempre/out/003-una-vez-no-es-siempre.mp4) | [publicacion.md](videos/003-una-vez-no-es-siempre/publicacion.md) | programado 13 nov |
| 04 | La IA dobla su jornada cada 7 meses (horizonte de METR) | [mp4](videos/004-la-jornada-de-la-ia/out/004-la-jornada-de-la-ia.mp4) | [publicacion.md](videos/004-la-jornada-de-la-ia/publicacion.md) | programado 16 nov |
| 05 | Un email puede secuestrar a tu agente (inyección de prompts) | [mp4](videos/005-email-secuestra-agente/out/005-email-secuestra-agente.mp4) | [publicacion.md](videos/005-email-secuestra-agente/publicacion.md) | programado 18 nov |

## Publicación automática

- **Dónde se publica:** los vídeos se programan en Metricool (marca 7970471) para el canal de YouTube [@eureka-ia60](https://www.youtube.com/@eureka-ia60), los lunes, miércoles y viernes a las 13:00 (hora de Madrid).
- **Qué sube a YouTube:** cada vídeo sale como Short público, marcado como contenido sintético de IA, con los textos de su `publicacion.md`.
- **Regla del usuario:** cada vez que se confirma la publicación de un vídeo, se genera el siguiente del plan y se programa detrás del último programado.
  - Lo ejecuta una tarea programada de Claude Code los lunes, miércoles y viernes a las 13:12.
  - Primero comprueba la publicación del día.
  - Si está confirmada, crea el siguiente episodio: fuentes verificadas, render, revisión y push.
  - Después lo programa en Metricool y avisa.

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
