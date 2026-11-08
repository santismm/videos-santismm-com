"""Exporta subtítulos .srt (para YouTube/LinkedIn) desde el timeline.
Uso: python3 engine/export.py videos/<id>
"""
import json, os, re, sys


def ts(t):
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h):02}:{int(m):02}:{int(s):02},{int(round((s % 1) * 1000)):03}".replace(",1000", ",999")


def main(vdir):
    tl = json.load(open(os.path.join(vdir, "build", "timeline.json")))
    cues = []
    for sc in tl["scenes"]:
        cur = []
        for w in sc["words"]:
            cur.append(w)
            tok = w.get("t", w["w"])
            if len(cur) >= 7 or re.search(r"[.?!…:]$", tok):
                cues.append(cur); cur = []
        if cur:
            cues.append(cur)
    out = os.path.join(vdir, "out")
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, tl["id"] + ".srt"), "w") as f:
        for i, c in enumerate(cues, 1):
            text = " ".join(w.get("t", w["w"]) for w in c)
            f.write(f"{i}\n{ts(c[0]['s'])} --> {ts(c[-1]['e'] + 0.2)}\n{text}\n\n")
    print("OK →", os.path.join(out, tl["id"] + ".srt"))


if __name__ == "__main__":
    main(sys.argv[1])
