"""Genera assets/pacific-map.js a partir de world-atlas (Natural Earth 1:50m, dominio público).
Uso: npm pack world-atlas@2 && tar xzf world-atlas-*.tgz
     python3 tools/build_map.py package/land-50m.json assets/pacific-map.js
"""
import json, sys

d = json.load(open(sys.argv[1]))
sx, sy = d["transform"]["scale"]; tx, ty = d["transform"]["translate"]
arcs = []
for a in d["arcs"]:
    x = y = 0; pts = []
    for dx, dy in a:
        x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)
LON0, LAT0 = 95, 72  # esquina superior izquierda; unidades de salida: décimas de grado


def ring(idx):
    out = []
    for i in idx:
        p = arcs[i] if i >= 0 else arcs[~i][::-1]
        out += p[1:] if out else p
    return out


polys = []
def walk(g):
    if g["type"] == "GeometryCollection":
        for x in g["geometries"]: walk(x)
    elif g["type"] == "Polygon": polys.append(g["arcs"])
    elif g["type"] == "MultiPolygon": polys.extend(g["arcs"])
walk(d["objects"]["land"])

paths = []; n = 0
for poly in polys:
    for r in poly:
        pts = ring(r)
        # Cada anillo se desplaza entero: los de longitud media negativa (América) pasan a 180-360.
        if sum(p[0] for p in pts) / len(pts) < 0:
            pts = [(lo + 360, la) for lo, la in pts]
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        if max(xs) < 90 or min(xs) > 285 or max(ys) < -35 or min(ys) > 75:
            continue
        q = []
        for lo, la in pts:
            lo = min(max(lo, 60), 300); la = min(max(la, -50), 80)
            c = (round((lo - LON0) * 10), round((LAT0 - la) * 10))
            if not q or q[-1] != c: q.append(c)
        if len(q) < 3: continue
        n += len(q)
        paths.append("M" + "L".join(f"{x},{y}" for x, y in q) + "Z")
js = ("/* Tierra emergida del Pacífico (Natural Earth 1:50m, dominio público, vía world-atlas).\n"
      " * Proyección equirectangular centrada en el antimeridiano; unidades: décimas de grado desde (95°E, 72°N). */\n"
      "window.HL_MAP = { lon0: %d, lat0: %d, d: '%s' };\n" % (LON0, LAT0, "".join(paths)))
open(sys.argv[2], "w").write(js)
print(len(paths), "anillos", n, "puntos", len(js) // 1024, "KB")
