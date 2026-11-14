# Kit de canales · Fútbol Atlas / Football Atlas

Todo lo necesario para crear las cuentas de YouTube, Instagram y TikTok y conectarlas a Metricool.

## Decisión previa: una cuenta por idioma

Recomiendo **cuentas separadas para español e inglés** en cada plataforma (seis en total). Mezclar idiomas en una misma cuenta confunde a la audiencia y al algoritmo, que no sabe a quién recomendar el canal.

- Si prefieres empezar más ligero, crea primero las tres cuentas en español y deja las de inglés para cuando haya ritmo.
- En Metricool, cada marca admite una cuenta por red: hacen falta **dos marcas**, "Fútbol Atlas" (ES) y "Football Atlas" (EN). No he comprobado cuántas marcas incluye tu plan.

## Imágenes

| Recurso | Archivo | Dónde |
|---|---|---|
| Foto de perfil 800×800 (válida para las tres plataformas y los dos idiomas) | `out/avatar-800.png` | Imagen de perfil |
| Banner de YouTube en español 2560×1440 | `out/youtube-banner-es-2560x1440.png` | YouTube Studio → Personalización → Banner |
| Banner de YouTube en inglés 2560×1440 | `out/youtube-banner-en-2560x1440.png` | Ídem, en el canal en inglés |
| Guía de zona segura del banner (no se sube) | `out/guia-zona-segura-banner.png` | Solo para revisar |

Para regenerarlas: `node futbolatlas/brand/render.mjs`.

## Nombres e identificadores

No he podido comprobar la disponibilidad de ningún identificador. Están por orden de preferencia; usa el mismo en las tres plataformas si es posible.

| | Español | Inglés |
|---|---|---|
| **Nombre visible** | Fútbol Atlas | Football Atlas |
| **Identificador** | `@futbolatlas` · `@futbolatlas.app` · `@futbolatlas60` | `@footballatlas` · `@footballatlas.app` · `@footballatlas60` |

En YouTube y TikTok el identificador no admite los mismos caracteres que en Instagram: si el punto no se acepta, usa `futbolatlasapp` / `footballatlasapp`.

## YouTube

**Descripción (ES):**

> El fútbol, con el reglamento en la mano. En 60 segundos.
>
> Fuera de juego, manos, VAR, tarjetas, penaltis… y la historia de los Mundiales, las Eurocopas y la Champions. Cada vídeo explica una regla o un dato con la fuente oficial delante: las Reglas de Juego de la IFAB, la FIFA y la UEFA.
>
> Sin opiniones de bar: lo que dice la regla, y por qué.
>
> 🎬 Nuevo vídeo lunes, miércoles, viernes y domingo.
> 🌐 Todo el contenido, con sus fuentes: https://futbolatlas.app
> 🤖 Transparencia: la voz y la animación de estos vídeos se generan con IA a partir de los contenidos de futbolatlas.app.

**Descripción (EN):**

> Football, by the book. In 60 seconds.
>
> Offside, handball, VAR, cards, penalties… and the history of the World Cup, the Euros and the Champions League. Every video explains one law or one fact with the official source in front of you: the IFAB Laws of the Game, FIFA and UEFA.
>
> No pub opinions: what the law says, and why.
>
> 🎬 New video every Monday, Wednesday, Friday and Sunday.
> 🌐 Everything, with sources: https://futbolatlas.app
> 🤖 Transparency: the voice and animation in these videos are AI-generated from the content of futbolatlas.app.

**Ajustes:**

- País: España (ES) / Reino Unido o el que prefieras (EN). Idioma del canal: español / inglés.
- Enlace del canal: https://futbolatlas.app
- Palabras clave (ES): reglas del fútbol, fuera de juego, manos, VAR, arbitraje, reglamento, IFAB, historia del fútbol, Mundial, Champions.
- Palabras clave (EN): football laws, laws of the game, offside, handball, VAR, refereeing, IFAB, football history, World Cup, Champions League.
- Subida por defecto: categoría *Deportes*; idioma del vídeo según el canal; "No es contenido creado para niños".
- En cada subida, "Contenido alterado o sintético": **Sí** (la voz es sintética).
- Listas: "Reglas en 60s" / "The law in 60s" y, más adelante, "La final en 60s" / "The final in 60s".

## Instagram

- **Tipo de cuenta:** profesional → creador → categoría "Sitio web de deportes" o "Creador digital". Hace falta para conectarla a Metricool y programar Reels.
- **Nombre (ES):** Fútbol Atlas · Reglas del fútbol
- **Nombre (EN):** Football Atlas · Laws of the Game
- **Enlace:** https://futbolatlas.app
- **En cada Reel:** activar la etiqueta "Información de IA".

**Bio (ES, 138 caracteres):**

> ⚽ El fútbol, con el reglamento en la mano
> 🚩 Fuera de juego, manos, VAR… en 60 s
> 📚 Fuente: Reglas de Juego (IFAB)
> 🤖 Voz y animación con IA

**Bio (EN, 129 caracteres):**

> ⚽ Football, by the book
> 🚩 Offside, handball, VAR… in 60 s
> 📚 Source: the Laws of the Game (IFAB)
> 🤖 AI-generated voice & animation

**Destacadas sugeridas:** Fuera de juego · Manos · VAR · Reglas nuevas · Historia.

## TikTok

- **Tipo de cuenta:** la programación desde Metricool funciona con cuenta personal o de empresa. La de empresa no puede usar parte de la música comercial, pero aquí no afecta porque la música de los vídeos es propia.
- **Enlace:** https://futbolatlas.app (TikTok puede exigir un mínimo de seguidores o cuenta de empresa para mostrarlo; no lo he verificado).
- **En cada vídeo:** activar "Contenido generado por IA".

**Bio (ES, 78 caracteres):**

> El fútbol, con el reglamento en la mano ⚽ Reglas y VAR en 60 s · Voz con IA 🤖

**Bio (EN, 74 caracteres):**

> Football, by the book ⚽ The laws and VAR in 60 s · AI-generated voice 🤖

## Conectar a Metricool

1. Crear en Metricool la marca "Fútbol Atlas" (y "Football Atlas" si abres los canales en inglés).
2. En cada marca, conectar YouTube, Instagram (cuenta profesional, a través de Facebook/Meta) y TikTok.
3. Avisarme con el nombre de las marcas. Entonces puedo:
   - Programar los vídeos del buffer según `calendario.md`, con los textos de cada `publicacion.md`.
   - Consultar las mejores horas de publicación de cada red cuando haya datos y ajustar el calendario.

Hasta ese momento no programo ni publico nada.
