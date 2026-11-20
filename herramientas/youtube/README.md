# Publicación directa en YouTube para cualquier canal

Herramienta común para subir y programar vídeos con la API oficial de YouTube, sin intermediarios. Un solo proyecto de Google Cloud sirve para todos los canales; cada canal solo necesita autorizarse una vez.

| Archivo | Qué hace |
|---|---|
| `youtube.py` | Sube, programa, reprograma y consulta el estado. Lee un `canal.json` por canal. |
| `youtube_auth.py` | Autoriza uno o varios canales y muestra sus refresh tokens. Se ejecuta en tu ordenador. |
| `PROMPT-nuevo-canal.md` | Prompt para que otra sesión de Claude Code monte la publicación de un canal nuevo. |

## Qué se comparte y qué es propio de cada canal

| | Se configura | Dónde |
|---|---|---|
| Proyecto de Google Cloud, API habilitada, pantalla de consentimiento | Una vez | Ya hecho: `hispanic-legacy-publicador` |
| `YT_CLIENT_ID` y `YT_CLIENT_SECRET` | Una vez | Variables de entorno; las mismas para todos |
| Refresh token | Uno por canal e idioma | `YT_REFRESH_TOKEN_<CANAL>_<ES o EN>` |
| `canal.json` (calendario, horas, carpetas) | Uno por canal | En el repositorio del canal |

Límite compartido: unas 100 subidas al día entre todos los canales del proyecto.

## Añadir un canal: tres pasos

**1. Autoriza sus dos canales de YouTube** (en tu ordenador, una sola orden para ambos):

```bash
SSL_CERT_FILE=/etc/ssl/cert.pem python3 youtube_auth.py --id TU_CLIENT_ID --secreto TU_CLIENT_SECRET MICANAL_ES MICANAL_EN
```

- Por cada etiqueta se abre el navegador: elige la cuenta y **ese** canal. Google avisará de que la app no está verificada: «Configuración avanzada → Ir a Hispanic Legacy Publicador».
- Al final imprime una línea por canal, ya con el nombre de la variable.
- El prefijo `SSL_CERT_FILE=…` solo hace falta en macOS con Python de Homebrew; no molesta en otros casos.
- En vez de `--id` y `--secreto` puedes usar `--cliente client_secret.json` con el JSON descargado de Google Cloud.

**2. Guarda los tokens** como variables de entorno del entorno en la nube (menú del entorno → Editar → Variables de entorno). Nunca en el chat ni en el repositorio. Se cargan al abrir una sesión nueva.

**3. Crea el `canal.json`** del canal y comprueba:

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --verificar
```

Debe mostrar el nombre de cada canal de YouTube junto a su variable.

## `canal.json`

```json
{
  "nombre": "Mi canal",
  "zona": "Europe/Madrid",
  "hora": { "es": "19:00", "en": "21:00" },
  "dias": [0, 2, 4],
  "videos": "../videos",
  "carpeta": { "es": "{video}", "en": "{video}/en" },
  "tokens": { "es": "YT_REFRESH_TOKEN_MICANAL_ES", "en": "YT_REFRESH_TOKEN_MICANAL_EN" },
  "categoria": "27",
  "publicaciones": [
    { "fecha": "2026-12-01", "video": "001-mi-primer-video" }
  ]
}
```

| Campo | Significado |
|---|---|
| `dias` | Días de publicación: 0 es lunes y 6 es domingo. |
| `videos` | Carpeta de los vídeos, relativa al `canal.json`. |
| `carpeta` | Dónde está cada idioma dentro de `videos`. Para un esquema `videos/<id>` y `videos/en/<id-en>`, usa `{"es": "{video}", "en": "en/{video}"}`. |
| `tokens` | Nombre de la variable de entorno de cada idioma. Un canal de un solo idioma lista solo ese. |
| `categoria` | Categoría de YouTube: 27 es Formación y 28 es Ciencia y tecnología. |
| `publicaciones[].video` | Nombre de la carpeta. Si difiere por idioma: `{"es": "004-la-jornada", "en": "004-ai-workday"}`. |
| `publicaciones[].hora` | Opcional: hora distinta para esa entrada, por idioma. |

## Qué necesita cada carpeta de vídeo

- `script.json` con un campo `"id"`.
- `out/<id>.mp4` y, si hay, `out/<id>.srt`.
- Los metadatos, de una de estas dos formas:
  - **`youtube.json`** (recomendado para canales nuevos): `{"titulo": "…", "descripcion": "…", "etiquetas": ["…"]}`. Título de 100 caracteres como máximo.
  - `publicacion.md` con secciones `## Título…`, `## Descripción` y `## Texto para TikTok…` (formato de Hispanic Legacy).

## Órdenes

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --simular
```

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json 001-mi-primer-video --idioma es --privado
```

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --calendario
```

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --estado
```

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --reprogramar
```

```bash
python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --anadir 007-nuevo --anadir-en 007-new
```

- `--simular` no sube nada y no necesita credenciales.
- `--calendario` sube lo pendiente como privado con fecha; YouTube lo publica a su hora.
- `--estado` dice qué es ya público y cuántos vídeos quedan de colchón, sin credenciales.
- `--reprogramar` mueve los vídeos ya subidos (aún privados) a las fechas del `canal.json`.
- `--anadir` coloca un vídeo en el siguiente día de publicación libre.

Cada subida deja un `publicado.json` junto al vídeo. **Hay que hacer commit de esos archivos**: sin ellos, la siguiente ejecución volvería a subir los mismos vídeos.

## Lo aprendido al montar el primer canal

- La app de Google debe estar **«En producción»**; en modo «Prueba» los tokens caducan a los 7 días. No hace falta verificarla.
- Las variables de entorno solo llegan a las sesiones que se abren después de guardarlas.
- Cada vídeo se sube marcado como «no creado para niños» y con contenido sintético declarado. La API acepta la marca de contenido sintético pero no la devuelve al releer, así que hay que confirmarla a mano en YouTube Studio.
- Justo después de cambiar una fecha, la API puede tardar un minuto en reflejarla.
- No se sube miniatura: los Shorts usan un fotograma del vídeo.
- Para revocar el acceso de un canal: https://myaccount.google.com/permissions.
