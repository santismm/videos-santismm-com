"""Genera la voz en off por escena con edge-tts y un timeline con tiempos por palabra.

Uso: python3 engine/tts.py videos/<id>
Salida: videos/<id>/build/voice.wav y videos/<id>/build/timeline.json
"""
import asyncio, json, os, re, ssl, subprocess, sys
import edge_tts
import edge_tts.communicate as ec

CA = "/root/.ccr/ca-bundle.crt"
if os.path.exists(CA):  # proxy de la sesión cloud
    ec._SSL_CTX = ssl.create_default_context(cafile=CA)
PROXY = os.environ.get("HTTPS_PROXY")
SR = 48000


def norm(s):
    return re.sub(r"[^\wáéíóúüñ%]", "", s.lower())


async def synth(text, voice, rate, pitch, mp3):
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch,
                             boundary="WordBoundary", proxy=PROXY)
    words = []
    with open(mp3, "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"w": ch["text"], "s": ch["offset"] / 1e7,
                              "e": (ch["offset"] + ch["duration"]) / 1e7})
    return words


def duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                   "-of", "csv=p=0", path])
    return float(out)


def attach_punct(text, words):
    """Asocia a cada palabra de TTS el token original (con puntuación) para los subtítulos."""
    tokens = text.split()
    ti = 0
    for w in words:
        target = norm(w["w"])
        acc = ""
        start = ti
        while ti < len(tokens):
            acc += norm(tokens[ti])
            ti += 1
            if acc == target or len(acc) >= len(target):
                break
        w["t"] = " ".join(tokens[start:ti]) if ti > start else w["w"]
    return words


async def main(vdir):
    cfg = json.load(open(os.path.join(vdir, "script.json")))
    build = os.path.join(vdir, "build")
    os.makedirs(build, exist_ok=True)
    lead, gap = 0.15, cfg.get("gap", 0.22)
    t = lead
    scenes, parts = [], []
    for sc in cfg["scenes"]:
        mp3 = os.path.join(build, f"vo_{sc['id']}.mp3")
        words = await synth(sc.get("say", sc["text"]), cfg["voice"], cfg.get("rate", "+0%"),
                            cfg.get("pitch", "+0Hz"), mp3)
        words = attach_punct(sc["text"], words)
        d = duration(mp3)
        for w in words:
            w["s"] = round(w["s"] + t, 3)
            w["e"] = round(w["e"] + t, 3)
        scenes.append({"id": sc["id"], "text": sc["text"], "voStart": round(t, 3),
                       "voEnd": round(t + d, 3), "words": words})
        parts.append((t, mp3))
        t += d + sc.get("pause", gap)
    total = round(t + cfg.get("tail", 0.6), 3)
    for i, s in enumerate(scenes):
        s["start"] = 0.0 if i == 0 else round(scenes[i - 1]["voEnd"] + 0.02, 3)
    for i, s in enumerate(scenes):
        s["end"] = scenes[i + 1]["start"] if i + 1 < len(scenes) else total
    # Mezcla de la voz en una pista continua
    inputs, filters = [], []
    for i, (st, mp3) in enumerate(parts):
        inputs += ["-i", mp3]
        filters.append(f"[{i}:a]aresample={SR},adelay={int(st*1000)}:all=1[a{i}]")
    filt = ";".join(filters) + ";" + "".join(f"[a{i}]" for i in range(len(parts))) + \
        f"amix=inputs={len(parts)}:normalize=0,atrim=0:{total}[out]"
    subprocess.check_call(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", filt,
                           "-map", "[out]", "-ac", "1", "-ar", str(SR), os.path.join(build, "voice.wav")])
    tl = {"id": cfg["id"], "series": cfg["series"], "episode": cfg["episode"],
          "title": cfg["title"], "source": cfg.get("source", ""), "duration": total,
          "brand": cfg.get("brand", "eureka"), "lang": cfg.get("lang", "es"), "music": cfg.get("music", "eureka"),
          "scenes": scenes}
    json.dump(tl, open(os.path.join(build, "timeline.json"), "w"), ensure_ascii=False, indent=1)
    print(f"duración total: {total:.2f}s")
    for s in scenes:
        print(f"  {s['id']:<10} {s['start']:6.2f} → {s['end']:6.2f}  ({len(s['words'])} palabras)")


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1]))
