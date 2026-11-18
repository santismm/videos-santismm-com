# Publicación directa (sin intermediarios)

Scripts que publican los vídeos con las APIs oficiales de cada plataforma. De momento, YouTube.

| Archivo | Qué hace |
|---|---|
| `youtube_auth.py` | Autoriza un canal una sola vez y muestra su refresh token. Se ejecuta en tu ordenador. |
| `youtube.py` | Sube y programa los vídeos: título, descripción y etiquetas de `publicacion.md`, subtítulos `.srt`, marca de contenido sintético. |
| `calendario.json` | Fechas y horas de publicación por idioma. |

## Puesta en marcha de YouTube

### 1. Crear el proyecto en Google Cloud

1. Entra en https://console.cloud.google.com con la cuenta de Google propietaria de los canales.
2. Arriba, en el selector de proyectos, pulsa **Proyecto nuevo**. Nombre: `hispanic-legacy-publicador`. Crear.
3. Con ese proyecto seleccionado, ve a **APIs y servicios → Biblioteca**, busca **YouTube Data API v3** y pulsa **Habilitar**.

### 2. Configurar la pantalla de consentimiento

1. **APIs y servicios → Pantalla de consentimiento de OAuth** (en la consola nueva: **Google Auth Platform → Información de la marca**).
2. Nombre de la app: `Hispanic Legacy Publicador`. Correo de asistencia: el tuyo.
3. Tipo de usuario: **Externo**.
4. En **Público**, pulsa **Publicar aplicación** para pasarla a **En producción**. Es importante: en modo "Prueba" el refresh token caduca a los 7 días y habría que repetir la autorización cada semana. No hace falta enviar la app a verificación para usarla con tus propios canales.

### 3. Crear las credenciales

1. **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth**.
2. Tipo de aplicación: **App de escritorio**. Nombre: `publicador`. Crear.
3. Copia el **ID de cliente** y el **Secreto de cliente**.

### 4. Autorizar cada canal (una vez por canal, en tu ordenador)

Necesitas Python 3. Descarga `youtube_auth.py` y ejecuta:

```bash
python3 youtube_auth.py TU_CLIENT_ID TU_CLIENT_SECRET
```

- Se abre el navegador. Elige la cuenta y **el canal en español**.
- Google avisará de que la app no está verificada: **Configuración avanzada → Ir a Hispanic Legacy Publicador**. Acepta los dos permisos.
- La terminal muestra el nombre del canal autorizado y un **refresh token**.

Repite el comando eligiendo **el canal en inglés** para obtener el segundo token.

### 5. Guardar las cuatro credenciales

Nunca en el chat ni en el repositorio. Dos opciones:

**A. En el entorno en la nube de Claude Code** (para que Claude programe los vídeos por ti). En el menú del entorno de la sesión → Editar → Variables de entorno, añade:

```
YT_CLIENT_ID
YT_CLIENT_SECRET
YT_REFRESH_TOKEN_ES
YT_REFRESH_TOKEN_EN
```

Las variables de entorno se guardan en texto plano dentro del entorno; úsalo solo en un entorno personal. Se aplican al abrir una sesión nueva.

**B. En tu ordenador.** Crea `canales/hispanic-legacy/publicar/.env` con esas cuatro líneas en formato `NOMBRE=valor`. Git lo ignora.

### 6. Probar y programar

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --simular
```

```bash
python3 canales/hispanic-legacy/publicar/youtube.py 001-el-tornaviaje --idioma es --privado
```

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --calendario
```

- El primero no sube nada: enseña título, etiquetas y fecha de cada vídeo.
- El segundo sube un vídeo como privado para comprobar que todo funciona. Bórralo después en YouTube Studio y elimina el `publicado.json` que deja junto al vídeo.
- El tercero sube todo lo pendiente del calendario como privado con fecha de publicación; YouTube lo hace público a su hora.

## Qué hace y qué no

- Cada vídeo se sube marcado como "no creado para niños", con contenido sintético declarado y categoría Formación.
- Deja un `publicado.json` junto al vídeo con el enlace; un vídeo con ese archivo no se vuelve a subir salvo con `--forzar`.
- No sube miniatura: los Shorts usan un fotograma del vídeo.
- Para revocar el acceso: https://myaccount.google.com/permissions.

## Límites conocidos (comprobados el 15-11-2026)

- Unas 100 subidas al día por proyecto.
- Los vídeos de proyectos sin verificar ya no quedan bloqueados en privado (cambio del 2-11-2026 en el historial de la API).
- No se ha probado todavía una subida real: faltan las credenciales.
