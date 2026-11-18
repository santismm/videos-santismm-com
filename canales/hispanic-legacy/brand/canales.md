# Alta de canales: Hispanic Legacy · Historia en 60s

Todo lo necesario para crear las cuentas de YouTube, Instagram y TikTok y publicar en ellas con sus APIs oficiales.

## Decisión previa: un juego de cuentas por idioma

Recomendación: **dos cuentas por plataforma**, una en español y otra en inglés. Los algoritmos aprenden el idioma de la audiencia de cada cuenta; mezclar idiomas en la misma suele bajar el alcance de los dos. Si prefieres empezar con un solo juego de cuentas, empieza por el español y deja el inglés para cuando haya tracción.

| | Español | Inglés |
|---|---|---|
| Nombre visible | Hispanic Legacy · Historia en 60s | Hispanic Legacy · History in 60s |
| Identificador, por orden de preferencia | `@hispaniclegacy.es` · `@hispaniclegacy60` · `@legadohispanico60` | `@hispaniclegacy` · `@hispanic.legacy` · `@hispaniclegacy.en` |

Usa el mismo identificador en las tres plataformas. Si el primero no está libre en alguna, pasa al siguiente en todas. No he comprobado la disponibilidad de ninguno.

## Imágenes

| Recurso | Archivo | Dónde se usa |
|---|---|---|
| Foto de perfil (800×800, se ve en círculo) | `out/avatar-800.png` | Las tres plataformas, ambos idiomas |
| Banner de YouTube en español (2560×1440) | `out/youtube-banner-es-2560x1440.png` | YouTube Studio → Personalización |
| Banner de YouTube en inglés | `out/youtube-banner-en-2560x1440.png` | Canal en inglés |
| Guía de zona segura (no se sube) | `out/guia-zona-segura-banner.png` | Solo para revisar qué se ve en móvil |

Para regenerarlas: `node canales/hispanic-legacy/brand/render.mjs`.

## YouTube

**Descripción (español):**

> Historia con fuentes, en 60 segundos.
>
> Ciencia, exploración y cultura del mundo hispánico: cada vídeo toma una historia poco contada y la explica de forma sencilla, con el dato y su fuente. Sin leyendas negras ni rosas.
>
> Basado en hispanic-legacy.com: más de 900 fichas con afirmaciones verificadas y fuentes citadas.
>
> 🎬 Nuevo vídeo lunes, miércoles, viernes y domingo.
> 🤖 Transparencia: la voz y la animación se generan con IA a partir de contenidos con fuentes.

**Descripción (inglés):**

> History with sources, in 60 seconds.
>
> Science, exploration and culture from the Hispanic world: each video takes an undertold story and explains it simply, with the fact and its source. No black legends, no golden ones.
>
> Based on hispanic-legacy.com: 900+ entries with verified claims and cited sources.
>
> 🎬 New video every Monday, Wednesday, Friday and Sunday.
> 🤖 Transparency: voice and animation are AI-generated from sourced content.

- **Enlace del canal:** https://hispanic-legacy.com
- **Palabras clave (ES):** historia, historia de España, historia de América, Hispanidad, divulgación histórica, ciencia española, exploradores, historia con fuentes
- **Palabras clave (EN):** history, Spanish history, Latin American history, history explained, history of science, age of exploration, sourced history
- **Ajustes al crear el canal:**
  - Categoría predeterminada: *Formación*. Idioma del vídeo: el del canal.
  - Público: "No, no es contenido creado para niños".
  - Contenido alterado o sintético: marcar "Sí" en cada subida, porque la voz es sintética y realista.
  - Lista de reproducción: "Historia en 60s" / "History in 60s".

## Instagram

- **Tipo de cuenta:** profesional (Creador o Empresa); es requisito para publicar Reels por API.
- **Categoría:** Educación.
- **Nombre:** Hispanic Legacy · Historia en 60s
- **Biografía (ES):**

  > Historia con fuentes, en 60 segundos 🧭
  > Ciencia, exploración y cultura del mundo hispánico
  > 🤖 Voz y animación con IA
  > 👇 Las fuentes

- **Biografía (EN):**

  > History with sources, in 60 seconds 🧭
  > Science, exploration & culture of the Hispanic world
  > 🤖 AI voice & animation
  > 👇 The sources

- **Enlace:** https://hispanic-legacy.com
- **Al publicar:** activar la etiqueta de contenido hecho con IA. Máximo 5 hashtags por publicación.
- **Destacadas sugeridas:** Rutas · Ciencia · Mito o dato · Fuentes.

## TikTok

- **Tipo de cuenta:** cualquiera. Sin auditoría de la app, la API de TikTok solo deja el vídeo en tu bandeja para publicarlo con un toque.
- **Nombre:** Hispanic Legacy
- **Biografía (ES, 80 caracteres máx.):** `Historia con fuentes, en 60 s 🧭 Ciencia, exploración y cultura hispánica`
- **Biografía (EN):** `History with sources, in 60s 🧭 Science, exploration, Hispanic culture`
- **Enlace:** https://hispanic-legacy.com
- **Al publicar:** activar "Contenido generado por IA".

## Publicación

Los vídeos se publican con las APIs oficiales de cada plataforma, sin intermediarios. Los pasos están en [`../publicar/README.md`](../publicar/README.md). De momento está hecho YouTube; Instagram y TikTok van después.

## Qué acompaña a cada vídeo

Cada carpeta de vídeo trae su `publicacion.md` (título, descripción, texto para TikTok/Reels, hashtags y notas de verificación), la portada `.png` y los subtítulos `.srt`. Las versiones en inglés están en la subcarpeta `en/`.
