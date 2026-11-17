# Kit de canales · Fútbol en 60s / Football in 60s

Todo lo necesario para crear las cuentas de YouTube, Instagram y TikTok y conectarlas a Metricool.

## Decisión previa: una cuenta por idioma

Recomiendo **cuentas separadas para español e inglés** en cada plataforma (seis en total). Mezclar idiomas en una misma cuenta confunde a la audiencia y al algoritmo, que no sabe a quién recomendar el canal.

- Si prefieres empezar más ligero, crea primero las tres cuentas en español y deja las de inglés para cuando haya ritmo.
- En Metricool, cada marca admite una cuenta por red: hacen falta **dos marcas**, "Fútbol en 60s" (ES) y "Football in 60s" (EN). No he comprobado cuántas marcas incluye tu plan.

## Imágenes

| Recurso | Archivo | Dónde |
|---|---|---|
| Foto de perfil 800×800 (válida para las tres plataformas y los dos idiomas) | `out/avatar-800.png` | Imagen de perfil |
| Banner de YouTube en español 2560×1440 | `out/youtube-banner-es-2560x1440.png` | YouTube Studio → Personalización → Banner |
| Banner de YouTube en inglés 2560×1440 | `out/youtube-banner-en-2560x1440.png` | Ídem, en el canal en inglés |
| Guía de zona segura del banner (no se sube) | `out/guia-zona-segura-banner.png` | Solo para revisar |

Para regenerarlas: `node futbolatlas/brand/render.mjs`.

## Nombres e identificadores

El nombre visible es **Fútbol en 60s** (en inglés, **Football in 60s**). El identificador conserva "atlas" para enlazar con la web futbolatlas.app.

| | Español | Inglés |
|---|---|---|
| **Nombre visible** | Fútbol en 60s | Football in 60s |
| **YouTube** | `@futbol-atlas` (disponible, confirmado por ti el 15-11-2026) | `@football-atlas` |
| **Instagram** | `@futbol.atlas` · `@futbol_atlas` · `@futbolatlas` | `@football.atlas` · `@football_atlas` · `@footballatlas` |
| **TikTok** | `@futbol.atlas` · `@futbol_atlas` · `@futbolatlas` | `@football.atlas` · `@football_atlas` · `@footballatlas` |

- Instagram y TikTok no admiten guiones en el identificador, solo letras, números, puntos y guiones bajos. Por eso ahí propongo `futbol.atlas`.
- Salvo el de YouTube en español, no he podido comprobar la disponibilidad de ninguno. Están por orden de preferencia.

## YouTube

**Descripción (ES):**

> Todo el fútbol, explicado en 60 segundos. Y con fuentes.
>
> Reglas (fuera de juego, manos, VAR, tarjetas, penaltis), historia de los Mundiales, las Eurocopas y la Champions, y datos curiosos de partidos, jugadores, selecciones y equipos. Cada vídeo cuenta una sola idea con la fuente oficial delante: la IFAB, la FIFA y la UEFA.
>
> Sin opiniones de bar: lo que pasó y lo que dice la regla.
>
> 🎬 Nuevo vídeo lunes, miércoles, viernes y domingo.
> 🌐 Todo el contenido, con sus fuentes: https://futbolatlas.app
> 🤖 Transparencia: la voz y la animación de estos vídeos se generan con IA a partir de los contenidos de futbolatlas.app.

**Descripción (EN):**

> All of football, explained in 60 seconds. With sources.
>
> The laws (offside, handball, VAR, cards, penalties), the history of the World Cup, the Euros and the Champions League, and surprising facts about matches, players, national teams and clubs. Every video tells one idea with the official source in front of you: the IFAB, FIFA and UEFA.
>
> No pub opinions: what happened, and what the law says.
>
> 🎬 New video every Monday, Wednesday, Friday and Sunday.
> 🌐 Everything, with sources: https://futbolatlas.app
> 🤖 Transparency: the voice and animation in these videos are AI-generated from the content of futbolatlas.app.

**Ajustes:**

- País: España (ES) / Reino Unido o el que prefieras (EN). Idioma del canal: español / inglés.
- Enlace del canal: https://futbolatlas.app
- Palabras clave (ES): fútbol, reglas del fútbol, fuera de juego, VAR, historia del fútbol, datos curiosos de fútbol, Mundial, Eurocopa, Champions, curiosidades.
- Palabras clave (EN): football, laws of the game, offside, VAR, football history, football facts, World Cup, Euros, Champions League, trivia.
- Subida por defecto: categoría *Deportes*; idioma del vídeo según el canal; "No es contenido creado para niños".
- En cada subida, "Contenido alterado o sintético": **Sí** (la voz es sintética).
- Listas: "Reglas" / "The laws", "Datos curiosos" / "Football facts" y "Partidos históricos" / "Classic matches".

## Instagram

- **Tipo de cuenta:** profesional → creador → categoría "Sitio web de deportes" o "Creador digital". Hace falta para conectarla a Metricool y programar Reels.
- **Nombre (ES):** Fútbol en 60s · Reglas y datos
- **Nombre (EN):** Football in 60s · Laws & facts
- **Enlace:** https://futbolatlas.app
- **En cada Reel:** activar la etiqueta "Información de IA".

**Bio (ES, menos de 150 caracteres):**

> ⚽ Todo el fútbol en 60 segundos
> 🚩 Reglas, historia y datos curiosos
> 📚 Con fuentes: IFAB, FIFA, UEFA
> 🤖 Voz y animación con IA

**Bio (EN, menos de 150 caracteres):**

> ⚽ All of football in 60 seconds
> 🚩 Laws, history and surprising facts
> 📚 With sources: IFAB, FIFA, UEFA
> 🤖 AI-generated voice & animation

**Destacadas sugeridas:** Reglas · VAR · Datos curiosos · Partidos · Jugadores.

## TikTok

- **Tipo de cuenta:** la programación desde Metricool funciona con cuenta personal o de empresa. La de empresa no puede usar parte de la música comercial, pero aquí no afecta porque la música de los vídeos es propia.
- **Enlace:** https://futbolatlas.app (TikTok puede exigir un mínimo de seguidores o cuenta de empresa para mostrarlo; no lo he verificado).
- **En cada vídeo:** activar "Contenido generado por IA".

**Bio (ES, menos de 80 caracteres):**

> Todo el fútbol en 60 s ⚽ Reglas, historia y datos, con fuentes · Voz con IA 🤖

**Bio (EN, menos de 80 caracteres):**

> All of football in 60 s ⚽ Laws, history and facts, with sources · AI voice 🤖

## Conectar a Metricool

1. Crear en Metricool la marca "Fútbol en 60s" (y "Football in 60s" si abres los canales en inglés).
2. En cada marca, conectar YouTube, Instagram (cuenta profesional, a través de Facebook/Meta) y TikTok.
3. Avisarme con el nombre de las marcas. Entonces puedo:
   - Programar los vídeos del buffer según `calendario.md`, con los textos de cada `publicacion.md`.
   - Consultar las mejores horas de publicación de cada red cuando haya datos y ajustar el calendario.

Hasta ese momento no programo ni publico nada.
