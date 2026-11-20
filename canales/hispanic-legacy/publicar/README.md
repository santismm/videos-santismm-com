# Publicación directa de Hispanic Legacy

Los vídeos se publican con la API oficial de YouTube mediante la herramienta común del repositorio. La guía completa, válida para cualquier canal, está en [`herramientas/youtube/README.md`](../../../herramientas/youtube/README.md).

| Archivo | Qué hace |
|---|---|
| `youtube.py` | Atajo de la herramienta común con este canal ya elegido. |
| `calendario.json` | Configuración del canal y calendario de publicación. |

Este canal usa las variables `YT_REFRESH_TOKEN_ES` y `YT_REFRESH_TOKEN_EN` (canales «Legado Hispanico en 60s» y «Hispanic Legacy in 60s»).

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --verificar
```

## Producción continua

La regla «cada vez que se publica un vídeo, se genera el siguiente» la ejecuta una tarea programada. Su guía paso a paso está en [`../docs/RUTINA.md`](../docs/RUTINA.md). Dos órdenes la apoyan:

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --estado
```

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --anadir 007-nombre-del-video
```

- `--estado` lista qué está subido, qué es ya público y cuántos vídeos quedan de colchón. No necesita credenciales.
- `--anadir` coloca un vídeo nuevo en el siguiente hueco del calendario.

```bash
python3 canales/hispanic-legacy/publicar/youtube.py --reprogramar
```

- `--reprogramar` mueve los vídeos ya subidos a las fechas de `calendario.json`.
