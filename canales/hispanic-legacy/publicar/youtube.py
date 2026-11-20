"""Publica o programa vídeos en YouTube con la API oficial (YouTube Data API v3).

Uso (desde la raíz del repositorio):
    python3 canales/hispanic-legacy/publicar/youtube.py --simular            # enseña qué haría, sin credenciales
    python3 canales/hispanic-legacy/publicar/youtube.py --calendario         # programa todo lo pendiente de calendario.json
    python3 canales/hispanic-legacy/publicar/youtube.py --reprogramar        # mueve los ya subidos a las fechas del calendario
    python3 canales/hispanic-legacy/publicar/youtube.py --estado             # qué está subido y qué es ya público
    python3 canales/hispanic-legacy/publicar/youtube.py --anadir 007-...     # añade un vídeo nuevo al siguiente hueco
    python3 canales/hispanic-legacy/publicar/youtube.py 001-el-tornaviaje --idioma es --cuando 2026-11-23T19:00
    python3 canales/hispanic-legacy/publicar/youtube.py 001-el-tornaviaje --idioma en --privado   # subida de prueba

Credenciales (variables de entorno, o un archivo publicar/.env que git ignora):
    YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN_ES, YT_REFRESH_TOKEN_EN

Cada subida deja un publicado.json junto al vídeo; si existe, el vídeo no se vuelve a subir (salvo --forzar).
"""
import argparse, datetime, json, os, re, sys
from zoneinfo import ZoneInfo
import requests

AQUI = os.path.dirname(os.path.abspath(__file__))
VIDEOS = os.path.join(AQUI, "..", "videos")
API = "https://www.googleapis.com"


def cargar_env():
    p = os.path.join(AQUI, ".env")
    if os.path.exists(p):
        for line in open(p):
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.strip().split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def seccion(md, *titulos):
    """Texto de la primera sección '## título' que exista."""
    for t in titulos:
        m = re.search(r"^## " + re.escape(t) + r"[^\n]*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
        if m:
            return m.group(1).strip()
    raise SystemExit(f"publicacion.md sin sección {titulos}")


def ficha(video, idioma):
    """Reúne archivo, título, descripción y etiquetas de un vídeo en un idioma."""
    d = os.path.join(VIDEOS, video) if idioma == "es" else os.path.join(VIDEOS, video, "en")
    cfg = json.load(open(os.path.join(d, "script.json")))
    md = open(os.path.join(d, "publicacion.md")).read()
    titulo = seccion(md, "Título", "Title").splitlines()[0].strip()
    desc = seccion(md, "Descripción", "Description")
    tags = [t.lstrip("#") for t in re.findall(r"#\w+", seccion(md, "Texto para TikTok", "Caption for TikTok"))]
    if len(titulo) > 100:
        raise SystemExit(f"{video} ({idioma}): el título supera los 100 caracteres de YouTube")
    out = os.path.join(d, "out", cfg["id"])
    for ext in (".mp4", ".srt"):
        if not os.path.exists(out + ext):
            raise SystemExit("falta " + out + ext)
    return {"dir": d, "id": cfg["id"], "idioma": idioma, "mp4": out + ".mp4", "srt": out + ".srt",
            "titulo": titulo, "descripcion": desc, "tags": tags}


def token(idioma):
    faltan = [k for k in ("YT_CLIENT_ID", "YT_CLIENT_SECRET", f"YT_REFRESH_TOKEN_{idioma.upper()}") if not os.environ.get(k)]
    if faltan:
        raise SystemExit("Faltan credenciales: " + ", ".join(faltan) + ". Ver canales/hispanic-legacy/publicar/README.md")
    r = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
        "refresh_token": os.environ[f"YT_REFRESH_TOKEN_{idioma.upper()}"], "grant_type": "refresh_token"}, timeout=30)
    if r.status_code != 200:
        raise SystemExit(f"Google rechazó el refresh token ({idioma}): {r.text[:300]}")
    return r.json()["access_token"]


def subir(f, cuando_utc, privacidad, simular):
    """cuando_utc: datetime UTC para programar, o None para aplicar `privacidad` de inmediato."""
    status = {"selfDeclaredMadeForKids": False, "containsSyntheticMedia": True, "embeddable": True,
              "privacyStatus": "private" if cuando_utc else privacidad}
    if cuando_utc:
        status["publishAt"] = cuando_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    body = {"snippet": {"title": f["titulo"], "description": f["descripcion"], "tags": f["tags"], "categoryId": "27",
                        "defaultLanguage": f["idioma"], "defaultAudioLanguage": f["idioma"]}, "status": status}
    if simular:
        print(f"— {f['id']} [{f['idioma']}] → {status.get('publishAt', status['privacyStatus'])}\n"
              f"   título: {f['titulo']}\n   etiquetas: {', '.join(f['tags'])}\n"
              f"   descripción: {len(f['descripcion'])} caracteres · vídeo: {os.path.getsize(f['mp4']) // 1024} KB")
        return None
    h = {"Authorization": "Bearer " + token(f["idioma"])}
    size = os.path.getsize(f["mp4"])
    r = requests.post(f"{API}/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
                      headers={**h, "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": str(size)},
                      json=body, timeout=60)
    if r.status_code != 200:
        raise SystemExit(f"YouTube rechazó la subida de {f['id']}: {r.status_code} {r.text[:400]}")
    with open(f["mp4"], "rb") as fh:
        r = requests.put(r.headers["Location"], headers={**h, "Content-Type": "video/mp4"}, data=fh, timeout=900)
    if r.status_code not in (200, 201):
        raise SystemExit(f"Falló el envío del archivo de {f['id']}: {r.status_code} {r.text[:400]}")
    vid = r.json()["id"]
    res = {"plataforma": "youtube", "videoId": vid, "url": f"https://www.youtube.com/shorts/{vid}",
           "estado": status["privacyStatus"], "publishAt": status.get("publishAt"),
           "subido": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
    # Subtítulos: si fallan no se pierde la subida
    meta = {"snippet": {"videoId": vid, "language": f["idioma"], "name": ""}}
    c = requests.post(f"{API}/upload/youtube/v3/captions?uploadType=multipart&part=snippet", headers=h, timeout=120,
                      files={"snippet": (None, json.dumps(meta), "application/json"),
                             "file": ("subs.srt", open(f["srt"], "rb"), "application/octet-stream")})
    res["subtitulos"] = "ok" if c.status_code in (200, 201) else f"error {c.status_code}: {c.text[:200]}"
    print(f"✔ {f['id']} [{f['idioma']}] → {res['url']} ({res['publishAt'] or res['estado']}; subtítulos: {res['subtitulos']})")
    return res


def registro(f):
    return os.path.join(f["dir"], "publicado.json")


def publicar(video, idioma, cuando_utc, privacidad, a):
    f = ficha(video, idioma)
    prev = json.load(open(registro(f))) if os.path.exists(registro(f)) else {}
    if "youtube" in prev and not a.forzar:
        print(f"· {f['id']} [{idioma}] ya está en YouTube: {prev['youtube']['url']} (usa --forzar para repetir)")
        return
    res = subir(f, cuando_utc, privacidad, a.simular)
    if res:
        prev["youtube"] = res
        json.dump(prev, open(registro(f), "w"), ensure_ascii=False, indent=2)


def hora_de(cal, p, idioma):
    """Hora local de una entrada del calendario: la general del idioma, salvo que la entrada traiga la suya."""
    return (p.get("hora") or {}).get(idioma) or cal["hora"][idioma]


def reprogramar(f, prev, cuando_utc, simular):
    """Cambia la fecha de publicación de un vídeo ya subido que sigue en privado. Devuelve la nueva fecha o None."""
    nuevo = cuando_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    if prev.get("publishAt") == nuevo:
        print(f"· {f['id']} [{f['idioma']}] ya está programado para {nuevo}")
        return None
    if simular:
        print(f"— {f['id']} [{f['idioma']}] {prev.get('publishAt')} → {nuevo}")
        return None
    h = {"Authorization": "Bearer " + token(f["idioma"])}
    r = requests.get(f"{API}/youtube/v3/videos", params={"part": "status", "id": prev["videoId"]}, headers=h, timeout=30)
    items = r.json().get("items") or []
    if not items:
        print(f"✘ {f['id']} [{f['idioma']}] no se encuentra el vídeo {prev['videoId']}")
        return None
    actual = items[0]["status"]
    if actual.get("privacyStatus") != "private":
        print(f"· {f['id']} [{f['idioma']}] ya no está en privado ({actual.get('privacyStatus')}); no se toca")
        return None
    status = {"privacyStatus": "private", "publishAt": nuevo, "selfDeclaredMadeForKids": False, "containsSyntheticMedia": True,
              "embeddable": actual.get("embeddable", True), "license": actual.get("license", "youtube"),
              "publicStatsViewable": actual.get("publicStatsViewable", True)}
    r = requests.put(f"{API}/youtube/v3/videos", params={"part": "status"}, headers=h, json={"id": prev["videoId"], "status": status}, timeout=60)
    if r.status_code != 200 or r.json().get("status", {}).get("publishAt") != nuevo:
        print(f"✘ {f['id']} [{f['idioma']}] YouTube no aceptó la fecha: {r.status_code} {r.text[:300]}")
        return None
    print(f"✔ {f['id']} [{f['idioma']}] {prev.get('publishAt')} → {nuevo}")
    return nuevo


def es_publico(url):
    """True si YouTube sirve el vídeo sin sesión (consulta pública oEmbed; no usa credenciales)."""
    try:
        return requests.get("https://www.youtube.com/oembed", params={"url": url, "format": "json"}, timeout=20).status_code == 200
    except requests.RequestException:
        return None


def estado(cal):
    """Resumen por vídeo e idioma: fecha prevista, si está subido y si ya es público. Devuelve el colchón por idioma."""
    colchon = {"es": 0, "en": 0}
    for p in cal["publicaciones"]:
        for i in ("es", "en"):
            f = ficha(p["video"], i)
            prev = json.load(open(registro(f))).get("youtube") if os.path.exists(registro(f)) else None
            if not prev:
                marca = "SIN SUBIR"
            else:
                pub = es_publico(prev["url"])
                marca = "PÚBLICO" if pub else ("programado/privado" if pub is False else "no se pudo comprobar")
                marca += " " + prev["url"]
            if not prev or "PÚBLICO" not in marca:
                colchon[i] += 1
            print(f"{p['fecha']} {hora_de(cal, p, i)} [{i}] {p['video']:<32} {marca}")
    print(f"colchón (vídeos hechos y aún no públicos): es={colchon['es']} en={colchon['en']}")
    return colchon


def siguiente_hueco(cal):
    """Primera fecha libre, posterior a la última del calendario, que caiga en un día de publicación."""
    dias = cal.get("dias", [0, 2, 4])  # lunes, miércoles, viernes
    d = max(datetime.date.fromisoformat(p["fecha"]) for p in cal["publicaciones"])
    hoy = datetime.datetime.now(ZoneInfo(cal["zona"])).date()
    d = max(d, hoy)
    while True:
        d += datetime.timedelta(days=1)
        if d.weekday() in dias:
            return d.isoformat()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video", nargs="?", help="carpeta del vídeo, p. ej. 001-el-tornaviaje")
    ap.add_argument("--idioma", choices=["es", "en"], help="por defecto, los dos")
    ap.add_argument("--cuando", help="fecha y hora local (zona del calendario), p. ej. 2026-11-23T19:00")
    ap.add_argument("--privado", action="store_true", help="sube como privado sin programar (prueba)")
    ap.add_argument("--publico", action="store_true", help="publica de inmediato")
    ap.add_argument("--calendario", action="store_true", help="programa todo lo pendiente de calendario.json")
    ap.add_argument("--reprogramar", action="store_true", help="ajusta la fecha de los vídeos ya subidos (aún privados) a la del calendario")
    ap.add_argument("--estado", action="store_true", help="lista qué está subido y qué es ya público (sin credenciales)")
    ap.add_argument("--anadir", metavar="VIDEO", help="añade un vídeo al calendario en el siguiente hueco libre")
    ap.add_argument("--simular", action="store_true", help="no sube nada; enseña qué haría")
    ap.add_argument("--forzar", action="store_true", help="sube aunque ya exista publicado.json")
    a = ap.parse_args()
    cargar_env()
    cal = json.load(open(os.path.join(AQUI, "calendario.json")))
    zona = ZoneInfo(cal["zona"])
    idiomas = [a.idioma] if a.idioma else ["es", "en"]
    ahora = datetime.datetime.now(datetime.timezone.utc)

    def utc(local):
        return datetime.datetime.fromisoformat(local).replace(tzinfo=zona).astimezone(datetime.timezone.utc)

    if a.estado:
        estado(cal)
        return
    if a.anadir:
        if any(p["video"] == a.anadir for p in cal["publicaciones"]):
            raise SystemExit(a.anadir + " ya está en el calendario")
        for i in ("es", "en"):
            ficha(a.anadir, i)  # falla si falta algún archivo
        fecha = siguiente_hueco(cal)
        cal["publicaciones"].append({"fecha": fecha, "video": a.anadir})
        json.dump(cal, open(os.path.join(AQUI, "calendario.json"), "w"), ensure_ascii=False, indent=2)
        print(f"{a.anadir} → {fecha} (es {cal['hora']['es']}, en {cal['hora']['en']}, {cal['zona']})")
        return
    if a.reprogramar:
        for p in cal["publicaciones"]:
            for i in idiomas:
                f = ficha(p["video"], i)
                if not os.path.exists(registro(f)):
                    continue
                reg = json.load(open(registro(f)))
                t = utc(f"{p['fecha']}T{hora_de(cal, p, i)}")
                if "youtube" not in reg or t <= ahora + datetime.timedelta(minutes=5):
                    continue
                nuevo = reprogramar(f, reg["youtube"], t, a.simular)
                if nuevo:
                    reg["youtube"]["publishAt"] = nuevo
                    json.dump(reg, open(registro(f), "w"), ensure_ascii=False, indent=2)
        return
    if a.calendario or (a.simular and not a.video):
        for p in cal["publicaciones"]:
            for i in idiomas:
                t = utc(f"{p['fecha']}T{hora_de(cal, p, i)}")
                if t <= ahora and not a.simular:
                    print(f"· {p['video']} [{i}]: la fecha {p['fecha']} ya pasó; no se programa")
                    continue
                publicar(p["video"], i, t, "private", a)
    elif a.video:
        if not (a.cuando or a.privado or a.publico):
            ap.error("indica --cuando, --privado o --publico")
        t = utc(a.cuando) if a.cuando else None
        if t and t <= ahora:
            ap.error("--cuando tiene que ser una fecha futura")
        for i in idiomas:
            publicar(a.video, i, t, "public" if a.publico else "private", a)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
