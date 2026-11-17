# Configuración de los canales de YouTube de MYTHOS (español e inglés)

Son dos canales independientes, uno por idioma, con la misma identidad visual. YouTube recomienda un canal por idioma cuando todo el contenido está doblado. Así cada canal tiene su propia audiencia, sus métricas y su algoritmo, sin mezclar idiomas.

## Imágenes

| Recurso | Archivo | Canal |
|---|---|---|
| Foto de perfil (800×800, se muestra en círculo) | `out/mythos-avatar-800.png` | ES y EN |
| Banner en español (2560×1440) | `out/mythos-es-banner-2560x1440.png` | ES |
| Banner en inglés (2560×1440) | `out/mythos-en-banner-2560x1440.png` | EN |
| Guía de la zona segura (no se sube) | `out/mythos-guia-zona-segura-banner.png` | Solo para revisar |

Se suben en YouTube Studio → Personalización → Imagen de marca. Para regenerarlas: `node brand/render.mjs`.

## Canal en español

- **Nombre:** MYTHOS · Mitos con fuente
- **Identificador, por orden de preferencia:** `@mythos-es` · `@mythosmitos` · `@mitosconfuente`
- **Descripción:**

> Mitología con fuente. Los mitos griegos, romanos, nórdicos y egipcios contrastados con sus textos originales.
>
> Lo que te contaron frente a lo que dice el texto: Hesíodo, Homero, Ovidio, la Edda, la tumba de Seti I… Cada vídeo cita el pasaje exacto, para que puedas comprobarlo tú.
>
> Basado en mythosdata.dev: 201 fichas y 1.245 afirmaciones con su fuente primaria (CC BY 4.0).
>
> 🤖 Transparencia: la voz y la animación de estos vídeos se generan con IA.

- **Enlaces:** https://mythosdata.dev
- **Palabras clave:** mitología, mitos, mitología griega, mitología egipcia, mitología nórdica, mitología romana, dioses, historia antigua, fuentes primarias
- **País:** España. **Idioma del canal y de los vídeos:** español.
- **Lista de reproducción:** «Mito vs Texto».

## Canal en inglés

- **Nombre:** MYTHOS · Myths, sourced
- **Identificador, por orden de preferencia:** `@mythos-sourced` · `@mythosdata` · `@mythsourced`
- **Descripción:**

> Myths, sourced. Greek, Roman, Norse and Egyptian mythology checked against the original texts.
>
> What you were told vs what the text actually says: Hesiod, Homer, Ovid, the Poetic Edda, the tomb of Seti I… Every video cites the exact passage, so you can check it yourself.
>
> Based on mythosdata.dev: 201 entries and 1,245 claims, each tied to its primary source (CC BY 4.0).
>
> 🤖 Transparency: the voice and animation in these videos are generated with AI.

- **Links:** https://mythosdata.dev
- **Keywords:** mythology, myths, greek mythology, egyptian mythology, norse mythology, roman mythology, gods, ancient history, primary sources
- **País:** Estados Unidos (o el tuyo). **Idioma del canal y de los vídeos:** inglés.
- **Playlist:** «Myth vs Text».

## Ajustes comunes de subida (los dos canales)

- **Categoría:** Educación.
- **Público:** «No, no es contenido creado para niños».
- **Contenido alterado o sintético:** «Sí» en cada vídeo (la voz es sintética y realista).
- **Licencia:** estándar. **Comentarios:** permitidos.

## Conexión con Metricool (lo tienes que hacer tú)

Metricool tiene ya la marca de EUREKA en español (7970471), y EUREKA en inglés tendrá la suya. Por cada idioma de MYTHOS:

1. Crea el canal en YouTube con tu cuenta de Google: foto de perfil → «Crear un canal» → «Usar un nombre personalizado» (crea una cuenta de marca).
2. En Metricool, «Añadir marca» → nombre «MYTHOS ES» (o «MYTHOS EN») → conectar YouTube → elegir ese canal.
3. Avísame. Lo veo con `getBrandSettings` y programo los vídeos.

Según tu plan de Metricool, puede que haga falta ampliarlo para tener cuatro marcas (EUREKA ES, EUREKA EN, MYTHOS ES y MYTHOS EN). Compruébalo en Metricool → Facturación.

## Calendario propuesto

Los días no coinciden con los de EUREKA (lunes, miércoles, viernes y domingo: 13:00 en español y 18:00 en inglés, hora de Madrid), para no solapar publicaciones ni cargar la tarea programada que ya existe.

| Canal | Días | Hora | Por qué |
|---|---|---|---|
| MYTHOS ES | martes, jueves y sábado | 20:00 (Madrid) | La mitología se consume como ocio, por la tarde-noche en España. |
| MYTHOS EN | martes, jueves y sábado | 13:00 (Nueva York) = 19:00 (Madrid) | Mediodía en la costa este y mañana en la oeste de EE. UU. |

Cuando haya datos, se ajusta con la mejor hora que da Metricool para cada canal (`getBestTimeToPostByNetwork`).
