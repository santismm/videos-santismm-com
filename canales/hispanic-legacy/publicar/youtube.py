"""Publicación en YouTube del canal Hispanic Legacy.

Atajo de la herramienta común (herramientas/youtube/youtube.py) con el canal ya elegido:
la configuración y el calendario están en calendario.json, junto a este archivo.

    python3 canales/hispanic-legacy/publicar/youtube.py --estado
    python3 canales/hispanic-legacy/publicar/youtube.py --calendario
    python3 canales/hispanic-legacy/publicar/youtube.py --anadir 007-nombre-del-video

Todas las órdenes y opciones: herramientas/youtube/README.md
"""
import os, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "..", "herramientas", "youtube"))
import youtube  # noqa: E402  (la herramienta común)

if __name__ == "__main__":
    youtube.main(["--canal", os.path.join(AQUI, "calendario.json"), *sys.argv[1:]])
