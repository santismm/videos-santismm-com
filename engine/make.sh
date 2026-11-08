#!/usr/bin/env bash
# Pipeline completo: guion → voz → animación → audio → vídeo final + portada + subtítulos.
# Uso: engine/make.sh videos/<id> [--skip-tts]
set -euo pipefail
V="${1:?uso: engine/make.sh videos/<id>}"
ID="$(basename "$V")"
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$V/build" "$V/out"
if [[ "${2:-}" != "--skip-tts" || ! -f "$V/build/timeline.json" ]]; then
  echo "▶ 1/5 Voz (edge-tts)"; python3 "$HERE/tts.py" "$V"
fi
echo "▶ 2/5 Animación (Chromium → ffmpeg)"; node "$HERE/render.mjs" "$V" --workers "${WORKERS:-3}"
echo "▶ 3/5 Música, efectos y mezcla";   python3 "$HERE/audio.py" "$V"
echo "▶ 4/5 Montaje final"
ffmpeg -y -v error -i "$V/build/video_silent.mp4" -i "$V/build/mix.wav" -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$V/out/$ID.mp4"
echo "▶ 5/5 Portada y subtítulos"
COVER_T=$(python3 -c "import json;print(json.load(open('$V/script.json')).get('coverTime',3))")
node "$HERE/render.mjs" "$V" --cover "$COVER_T" >/dev/null && cp "$V/build/cover.png" "$V/out/$ID-portada.png"
python3 "$HERE/export.py" "$V"
ffprobe -v error -show_entries format=duration,size -of default=nw=1 "$V/out/$ID.mp4"
echo "✔ Listo: $V/out/$ID.mp4"
