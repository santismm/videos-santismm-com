# Publicación directa de Reels en Instagram

Herramienta común para publicar Reels con la API oficial de Instagram («Instagram API with Instagram Login»). Usa el mismo `canal.json` y los mismos vídeos que [`../youtube/`](../youtube/README.md).

**Estado: sin probar con una cuenta real.** La simulación funciona; falta la primera publicación.

## Diferencias con YouTube

| | YouTube | Instagram |
|---|---|---|
| Entrega del vídeo | Se sube el archivo | Instagram lo descarga de una URL pública |
| Programación | Privado con fecha | No existe: se publica al hacer la llamada |
| Acceso | No caduca | El token caduca a los 60 días y hay que renovarlo |

Por eso Instagram se publica con una tarea programada que se ejecuta a la hora de publicación y lanza `--pendientes`.

## Puesta en marcha

### 1. Cuentas de Instagram

Cada cuenta debe ser **profesional** (Creador o Empresa) y **pública**: Ajustes → Tipo de cuenta y herramientas → Cambiar a cuenta profesional. No hace falta página de Facebook.

### 2. App en Meta for Developers (una sola para todos los canales)

1. https://developers.facebook.com → **Mis apps → Crear app**.
2. Caso de uso: **Otro**. Tipo de app: **Empresa**. Nombre: `Publicador de Reels`.
3. En el panel de la app, busca el producto **Instagram** y pulsa **Configurar**. Se añade «API setup with Instagram login».
4. No hace falta enviar la app a revisión: con acceso estándar se puede publicar en cuentas propias.

### 3. Un token por cuenta

1. En el menú de la app: **Instagram → API setup with Instagram business login**.
2. En la sección **Generate access tokens**, añade tu cuenta de Instagram (si pide rol, se gestiona en **Roles de la app → Roles**, y la invitación se acepta desde la propia cuenta de Instagram).
3. Pulsa **Generate token** junto a la cuenta, inicia sesión en esa cuenta de Instagram y acepta los permisos.
4. Copia el token. Dura 60 días.
5. Repite con la cuenta del otro idioma.

### 4. Guardar los tokens

Como variables de entorno del entorno en la nube, con los nombres que indique `canal.json` (para Hispanic Legacy, `IG_TOKEN_HL_ES` e `IG_TOKEN_HL_EN`). Nunca en el chat ni en el repositorio. Llegan a las sesiones que se abran después.

### 5. Comprobar y probar

```bash
python3 herramientas/instagram/instagram.py --canal RUTA/canal.json --verificar
```

```bash
python3 herramientas/instagram/instagram.py --canal RUTA/canal.json --simular
```

```bash
python3 herramientas/instagram/instagram.py --canal RUTA/canal.json 003-mi-video --idioma es --ahora
```

- `--verificar` muestra a qué cuenta apunta cada token, la cuota del día y renueva el token.
- `--simular` enseña la URL y el texto de lo que publicaría, sin publicar.
- `--ahora` publica un vídeo concreto **de inmediato y en abierto**: en Instagram no hay modo privado.

## Bloque `instagram` de `canal.json`

```json
"instagram": {
  "tokens": { "es": "IG_TOKEN_MICANAL_ES", "en": "IG_TOKEN_MICANAL_EN" },
  "url_base": "https://raw.githubusercontent.com/USUARIO/REPO/RAMA",
  "desde": "2026-11-23",
  "portada_ms": 3000
}
```

| Campo | Significado |
|---|---|
| `url_base` | De dónde descarga Instagram los MP4: la raíz del repositorio en una rama pública. El vídeo tiene que estar subido a esa rama antes de publicar. |
| `desde` | `--pendientes` no publica nada con fecha anterior. Evita que la primera ejecución vuelque todo el archivo de golpe. |
| `portada_ms` | Milisegundo del vídeo que se usa como portada. |

El texto del Reel sale de la sección «Texto para TikTok / Reels» de `publicacion.md`, o de un `instagram.json` con `{"texto": "…"}` junto al vídeo.

## Lo que hace en cada publicación

1. Comprueba que la URL del vídeo responde.
2. Crea el contenedor del Reel, marcado como contenido generado con IA y visible también en el perfil.
3. Espera a que Instagram lo procese (hasta 10 minutos).
4. Lo publica y anota el enlace en el `publicado.json` del vídeo, bajo `"instagram"`.

## Dudas que solo resolverá la primera prueba

- GitHub sirve los MP4 como `application/octet-stream`, no como vídeo. La documentación no dice si Instagram lo acepta. Si no, habrá que alojarlos en otro sitio.
- La documentación pide audio AAC de 128 kbps como máximo y los vídeos llevan unos 200 kbps. Si los rechaza, se recodifica el audio.
- Si al renovar el token Instagram devuelve uno distinto, `--verificar` lo avisa: habría que guardar el nuevo a mano cada dos meses.
- El límite diario es de 50 o 100 publicaciones según la página de la documentación; `--verificar` muestra el real.
