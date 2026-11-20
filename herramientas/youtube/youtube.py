"""Publica y programa vídeos en YouTube con la API oficial (YouTube Data API v3). Sirve para cualquier canal.

Cada canal se describe en un archivo canal.json (ver README.md de esta carpeta), que incluye su calendario.

Uso (desde la raíz del repositorio):
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --verificar      # a qué canal apunta cada token (solo lectura)
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --simular        # enseña qué haría, sin credenciales
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --calendario     # sube y programa lo pendiente
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --reprogramar    # mueve los ya subidos a las fechas del calendario
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --estado         # qué está subido y qué es ya público
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json --anadir VIDEO [--anadir-en VIDEO_EN]
    python3 herramientas/youtube/youtube.py --canal RUTA/canal.json VIDEO --idioma es --privado   # subida de prueba

Credenciales en variables de entorno (o en un archivo .env junto a canal.json, que git debe ignorar):
    YT_CLIENT_ID, YT_CLIENT_SECRET          comunes a todos los canales (un solo proyecto de Google Cloud)
    un refresh token por canal e idioma      con los nombres que indique canal.json → "tokens"

Cada subida deja un publicado.json junto al vídeo; si existe, el vídeo no se vuelve a subir (salvo --forzar).
"""
import argparse, datetime, json, os, re, sys
from zoneinfo import ZoneInfo
import requests

API = "https://www.googleapis.com"
IDIOMAS = ("es", "en")
CFG, RAIZ, RUTA_CFG = {}, "", ""


def cargar(ruta):
    global CFG, RAIZ, RUTA_CFG
    RUTA_CFG = os.path.abspath(ruta)
    RAIZ = os.path.dirname(RUTA_CFG)
    CFG = json.load(open(RUTA_CFG))
    CFG.setdefault("zona", "Europe/Madrid")
    CFG.setdefault("hora", {"es": "19:00", "en": "21:00"})
    CFG.setdefault("dias", [0, 2, 4])
    CFG.setdefault("videos", "../videos")
    CFG.setdefault("carpeta", {"es": "{video}", "en": "{video}/en"})
    CFG.setdefault("tokens", {"es": "YT_REFRESH_TOKEN_ES", "en": "YT_REFRESH_TOKEN_EN"})
    CFG.setdefault("categoria", "27")
    CFG.setdefault("publicaciones", [])
    env = os.path.join(RAIZ, ".env")
    if os.path.exists(env):
        for line in open(env):
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.strip().split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def guardar():
    json.dump(CFG, open(RUTA_CFG, "w"), ensure_ascii=False, indent=2)


def idiomas_activos():
    return [i for i in IDIOMAS if i in CFG["tokens"]]


def nombre(entrada, idioma):
    """Una entrada del calendario nombra el vídeo con un texto (misma carpeta base) o con uno por idioma."""
    v = entrada["video"] if isinstance(entrada, dict) else entrada
    return v if isinstance(v, str) else v[idioma]


def seccion(md, *titulos):
    for t in titulos:
        m = re.search(r"^## " + re.escape(t) + r"[^\n]*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
        if m:
            return m.group(1).strip()
    return None


def ficha(entrada, idioma):
    """Reúne archivo, título, descripción y etiquetas de un vídeo en un idioma."""
    video = nombre(entrada, idioma)
    d = os.path.normpath(os.path.join(RAIZ, CFG["videos"], CFG["carpeta"][idioma].format(video=video)))
    if not os.path.isdir(d):
        raise SystemExit("no existe la carpeta " + d)
    cfg = json.load(open(os.path.join(d, "script.json")))
    yj = os.path.join(d, "youtube.json")
    if os.path.exists(yj):  # metadatos explícitos: {"titulo", "descripcion", "etiquetas"}
        m = json.load(open(yj))
        titulo, desc, tags = m["titulo"].strip(), m["descripcion"].strip(), list(m.get("etiquetas", []))
    else:  # formato de publicacion.md con secciones "## Título…", "## Descripción" y "## Texto para TikTok…"
        md = open(os.path.join(d, "publicacion.md")).read()
        t, desc = seccion(md, "Título", "Title"), seccion(md, "Descripción", "Description")
        if not t or not desc:
            raise SystemExit(f"{d}: falta youtube.json, o publicacion.md no tiene las secciones «Título» y «Descripción»")
        titulo = t.splitlines()[0].strip()
        tags = [x.lstrip("#") for x in re.findall(r"#\w+", seccion(md, "Texto para TikTok", "Caption for TikTok") or "")]
    if len(titulo) > 100:
        raise SystemExit(f"{video} ({idioma}): el título supera los 100 caracteres de YouTube")
    out = os.path.join(d, "out", cfg["id"])
    if not os.path.exists(out + ".mp4"):
        raise SystemExit("falta " + out + ".mp4")
    return {"dir": d, "id": cfg["id"], "idioma": idioma, "mp4": out + ".mp4",
            "srt": out + ".srt" if os.path.exists(out + ".srt") else None,
            "titulo": titulo, "descripcion": desc, "tags": tags}


def token(idioma):
    var = CFG["tokens"][idioma]
    faltan = [k for k in ("YT_CLIENT_ID", "YT_CLIENT_SECRET", var) if not os.environ.get(k)]
    if faltan:
        raise SystemExit("Faltan credenciales: " + ", ".join(faltan) + ". Ver herramientas/youtube/README.md")
    r = requests.post("https://oauth2.googleapis.com/token", data={
        "client_id": os.environ["YT_CLIENT_ID"].strip(), "client_secret": os.environ["YT_CLIENT_SECRET"].strip(),
        "refresh_token": os.environ[var].strip(), "grant_type": "refresh_token"}, timeout=30)
    if r.status_code != 200:
        raise SystemExit(f"Google rechazó el refresh token {var}: {r.text[:300]}")
    return r.json()["access_token"]


def verificar():
    """Solo lectura: a qué canal apunta cada token. No imprime ningún secreto."""
    for i in idiomas_activos():
        var = CFG["tokens"][i]
        if not os.environ.get(var):
            print(f"[{i}] {var}: NO definida"); continue
        r = requests.get(f"{API}/youtube/v3/channels", params={"part": "snippet,statistics", "mine": "true"},
                         headers={"Authorization": "Bearer " + token(i)}, timeout=30)
        items = r.json().get("items") or []
        if r.status_code != 200 or not items:
            print(f"[{i}] {var}: token válido, pero sin canal ({r.status_code})"); continue
        sn = items[0]["snippet"]
        print(f"[{i}] {var} → «{sn.get('title')}» {sn.get('customUrl', '')} · vídeos: {items[0].get('statistics', {}).get('videoCount')}")


def subir(f, cuando_utc, privacidad, simular):
    status = {"selfDeclaredMadeForKids": False, "containsSyntheticMedia": True, "embeddable": True,
              "privacyStatus": "private" if cuando_utc else privacidad}
    if cuando_utc:
        status["publishAt"] = cuando_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    body = {"snippet": {"title": f["titulo"], "description": f["descripcion"], "tags": f["tags"], "categoryId": str(CFG["categoria"]),
                        "defaultLanguage": f["idioma"], "defaultAudioLanguage": f["idioma"]}, "status": status}
    if simular:
        print(f"— {f['id']} [{f['idioma']}] → {status.get('publishAt', status['privacyStatus'])}\n"
              f"   título: {f['titulo']}\n   etiquetas: {', '.join(f['tags'])}\n"
              f"   descripción: {len(f['descripcion'])} caracteres · vídeo: {os.path.getsize(f['mp4']) // 1024} KB")
        return None
    h = {"Authorization": "Bearer " + token(f["idioma"])}
    r = requests.post(f"{API}/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
                      headers={**h, "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": str(os.path.getsize(f["mp4"]))},
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
    if f["srt"]:  # si los subtítulos fallan no se pierde la subida
        meta = {"snippet": {"videoId": vid, "language": f["idioma"], "name": ""}}
        c = requests.post(f"{API}/upload/youtube/v3/captions?uploadType=multipart&part=snippet", headers=h, timeout=120,
                          files={"snippet": (None, json.dumps(meta), "application/json"),
                                 "file": ("subs.srt", open(f["srt"], "rb"), "application/octet-stream")})
        res["subtitulos"] = "ok" if c.status_code in (200, 201) else f"error {c.status_code}: {c.text[:200]}"
    else:
        res["subtitulos"] = "sin archivo .srt"
    print(f"✔ {f['id']} [{f['idioma']}] → {res['url']} ({res['publishAt'] or res['estado']}; subtítulos: {res['subtitulos']})")
    return res


def reprogramar(f, prev, cuando_utc, simular):
    """Cambia la fecha de publicación de un vídeo ya subido que sigue en privado. Devuelve la nueva fecha o None."""
    nuevo = cuando_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    if prev.get("publishAt") == nuevo:
        print(f"· {f['id']} [{f['idioma']}] ya está programado para {nuevo}"); return None
    if simular:
        print(f"— {f['id']} [{f['idioma']}] {prev.get('publishAt')} → {nuevo}"); return None
    h = {"Authorization": "Bearer " + token(f["idioma"])}
    items = requests.get(f"{API}/youtube/v3/videos", params={"part": "status", "id": prev["videoId"]}, headers=h, timeout=30).json().get("items") or []
    if not items:
        print(f"✘ {f['id']} [{f['idioma']}] no se encuentra el vídeo {prev['videoId']}"); return None
    actual = items[0]["status"]
    if actual.get("privacyStatus") != "private":
        print(f"· {f['id']} [{f['idioma']}] ya no está en privado ({actual.get('privacyStatus')}); no se toca"); return None
    status = {"privacyStatus": "private", "publishAt": nuevo, "selfDeclaredMadeForKids": False, "containsSyntheticMedia": True,
              "embeddable": actual.get("embeddable", True), "license": actual.get("license", "youtube"),
              "publicStatsViewable": actual.get("publicStatsViewable", True)}
    r = requests.put(f"{API}/youtube/v3/videos", params={"part": "status"}, headers=h, json={"id": prev["videoId"], "status": status}, timeout=60)
    if r.status_code != 200 or r.json().get("status", {}).get("publishAt") != nuevo:
        print(f"✘ {f['id']} [{f['idioma']}] YouTube no aceptó la fecha: {r.status_code} {r.text[:300]}"); return None
    print(f"✔ {f['id']} [{f['idioma']}] {prev.get('publishAt')} → {nuevo}")
    return nuevo


def registro(f):
    return os.path.join(f["dir"], "publicado.json")


def leer_registro(f):
    return json.load(open(registro(f))) if os.path.exists(registro(f)) else {}


def publicar(entrada, idioma, cuando_utc, privacidad, a):
    f = ficha(entrada, idioma)
    prev = leer_registro(f)
    if "youtube" in prev and not a.forzar:
        print(f"· {f['id']} [{idioma}] ya está en YouTube: {prev['youtube']['url']} (usa --forzar para repetir)")
        return
    res = subir(f, cuando_utc, privacidad, a.simular)
    if res:
        prev["youtube"] = res
        json.dump(prev, open(registro(f), "w"), ensure_ascii=False, indent=2)


def es_publico(url):
    """True si YouTube sirve el vídeo sin sesión (consulta pública oEmbed; no usa credenciales)."""
    try:
        return requests.get("https://www.youtube.com/oembed", params={"url": url, "format": "json"}, timeout=20).status_code == 200
    except requests.RequestException:
        return None


def hora_de(p, idioma):
    return (p.get("hora") or {}).get(idioma) or CFG["hora"][idioma]


def estado():
    colchon = {i: 0 for i in idiomas_activos()}
    for p in CFG["publicaciones"]:
        for i in idiomas_activos():
            f = ficha(p, i)
            prev = leer_registro(f).get("youtube")
            if not prev:
                marca = "SIN SUBIR"
            else:
                pub = es_publico(prev["url"])
                marca = ("PÚBLICO" if pub else ("programado/privado" if pub is False else "no se pudo comprobar")) + " " + prev["url"]
            if not prev or "PÚBLICO" not in marca:
                colchon[i] += 1
            print(f"{p['fecha']} {hora_de(p, i)} [{i}] {nombre(p, i):<34} {marca}")
    print("colchón (vídeos hechos y aún no públicos): " + " ".join(f"{i}={n}" for i, n in colchon.items()))


def siguiente_hueco():
    """Primera fecha libre, posterior a la última del calendario y a hoy, que caiga en un día de publicación."""
    hoy = datetime.datetime.now(ZoneInfo(CFG["zona"])).date()
    d = max([datetime.date.fromisoformat(p["fecha"]) for p in CFG["publicaciones"]] + [hoy])
    while True:
        d += datetime.timedelta(days=1)
        if d.weekday() in CFG["dias"]:
            return d.isoformat()


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video", nargs="?", help="nombre del vídeo tal como figura en el calendario")
    ap.add_argument("--canal", required=True, help="ruta al canal.json del canal")
    ap.add_argument("--idioma", choices=IDIOMAS, help="por defecto, todos los del canal")
    ap.add_argument("--cuando", help="fecha y hora local (zona del canal), p. ej. 2026-11-23T19:00")
    ap.add_argument("--privado", action="store_true", help="sube como privado sin programar (prueba)")
    ap.add_argument("--publico", action="store_true", help="publica de inmediato")
    ap.add_argument("--calendario", action="store_true", help="sube y programa todo lo pendiente del calendario")
    ap.add_argument("--reprogramar", action="store_true", help="ajusta la fecha de los vídeos ya subidos (aún privados) a la del calendario")
    ap.add_argument("--estado", action="store_true", help="qué está subido y qué es ya público (sin credenciales)")
    ap.add_argument("--verificar", action="store_true", help="a qué canal apunta cada token (solo lectura)")
    ap.add_argument("--anadir", metavar="VIDEO", help="añade un vídeo al calendario en el siguiente hueco libre")
    ap.add_argument("--anadir-en", metavar="VIDEO_EN", help="nombre de la carpeta en inglés, si es distinto del español")
    ap.add_argument("--simular", action="store_true", help="no sube nada; enseña qué haría")
    ap.add_argument("--forzar", action="store_true", help="sube aunque ya exista publicado.json")
    a = ap.parse_args(argv)
    cargar(a.canal)
    zona = ZoneInfo(CFG["zona"])
    idiomas = [a.idioma] if a.idioma else idiomas_activos()
    ahora = datetime.datetime.now(datetime.timezone.utc)

    def utc(local):
        return datetime.datetime.fromisoformat(local).replace(tzinfo=zona).astimezone(datetime.timezone.utc)

    if a.verificar:
        return verificar()
    if a.estado:
        return estado()
    if a.anadir:
        v = {"es": a.anadir, "en": a.anadir_en} if a.anadir_en else a.anadir
        if any(p["video"] == v for p in CFG["publicaciones"]):
            raise SystemExit(a.anadir + " ya está en el calendario")
        for i in idiomas_activos():
            ficha(v, i)  # falla si falta algún archivo
        fecha = siguiente_hueco()
        CFG["publicaciones"].append({"fecha": fecha, "video": v})
        guardar()
        print(f"{a.anadir} → {fecha} ({', '.join(i + ' ' + CFG['hora'][i] for i in idiomas_activos())}, {CFG['zona']})")
        return
    if a.reprogramar:
        for p in CFG["publicaciones"]:
            for i in idiomas:
                f = ficha(p, i)
                reg = leer_registro(f)
                t = utc(f"{p['fecha']}T{hora_de(p, i)}")
                if "youtube" not in reg or t <= ahora + datetime.timedelta(minutes=5):
                    continue
                nuevo = reprogramar(f, reg["youtube"], t, a.simular)
                if nuevo:
                    reg["youtube"]["publishAt"] = nuevo
                    json.dump(reg, open(registro(f), "w"), ensure_ascii=False, indent=2)
        return
    if a.calendario or (a.simular and not a.video):
        for p in CFG["publicaciones"]:
            for i in idiomas:
                t = utc(f"{p['fecha']}T{hora_de(p, i)}")
                if t <= ahora and not a.simular:
                    if "youtube" not in leer_registro(ficha(p, i)):
                        print(f"· {nombre(p, i)} [{i}]: la fecha {p['fecha']} ya pasó y no está subido; no se programa")
                    continue
                publicar(p, i, t, "private", a)
    elif a.video:
        if not (a.cuando or a.privado or a.publico):
            ap.error("indica --cuando, --privado o --publico")
        t = utc(a.cuando) if a.cuando else None
        if t and t <= ahora:
            ap.error("--cuando tiene que ser una fecha futura")
        entrada = next((p for p in CFG["publicaciones"] if a.video in (p["video"] if isinstance(p["video"], str) else p["video"].values())), a.video)
        for i in idiomas:
            publicar(entrada, i, t, "public" if a.publico else "private", a)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
