"""Publica Reels en Instagram con la API oficial (Instagram API with Instagram Login). Sirve para cualquier canal.

Usa el mismo canal.json que herramientas/youtube/youtube.py, con un bloque "instagram" (ver README.md).
Instagram no admite programar por API: un Reel se publica en el momento de la llamada. Por eso la orden
habitual es --pendientes, pensada para una tarea programada que se ejecuta a la hora de publicación.

Uso (desde la raíz del repositorio):
    python3 herramientas/instagram/instagram.py --canal RUTA/canal.json --verificar     # a qué cuenta apunta cada token y cuántos días le quedan
    python3 herramientas/instagram/instagram.py --canal RUTA/canal.json --simular       # qué publicaría ahora y con qué texto
    python3 herramientas/instagram/instagram.py --canal RUTA/canal.json --pendientes    # publica lo que ya toca según el calendario
    python3 herramientas/instagram/instagram.py --canal RUTA/canal.json VIDEO --idioma es --ahora   # publica un vídeo concreto ya

Cada publicación queda anotada en el publicado.json del vídeo, bajo "instagram"; un vídeo anotado no se repite.
"""
import argparse, datetime, json, os, re, subprocess, sys, time
from zoneinfo import ZoneInfo
import requests

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "youtube"))
import youtube as yt  # reutiliza la lectura de canal.json, carpetas y registro  # noqa: E402

API = "https://graph.instagram.com/v27.0"


def ig():
    c = yt.CFG.get("instagram")
    if not c:
        raise SystemExit('canal.json no tiene bloque "instagram". Ver herramientas/instagram/README.md')
    return c


def token(idioma):
    var = ig()["tokens"][idioma]
    if not os.environ.get(var):
        raise SystemExit(f"Falta la credencial {var}. Ver herramientas/instagram/README.md")
    return os.environ[var].strip()


def llamar(metodo, ruta, idioma, **params):
    r = requests.request(metodo, f"{API}/{ruta}", params={**params, "access_token": token(idioma)} if metodo == "GET" else None,
                         data={**params, "access_token": token(idioma)} if metodo == "POST" else None, timeout=60)
    j = r.json() if r.headers.get("content-type", "").startswith(("application/json", "text/javascript")) else {}
    if r.status_code != 200 or "error" in j:
        e = j.get("error", {})
        raise SystemExit(f"Instagram rechazó {ruta}: {r.status_code} {e.get('message', r.text[:300])} (código {e.get('code')}, subcódigo {e.get('error_subcode')})")
    return j


def texto(f):
    """Texto del Reel: instagram.json si existe; si no, la sección «Texto para TikTok / Reels» de publicacion.md."""
    ij = os.path.join(f["dir"], "instagram.json")
    if os.path.exists(ij):
        return json.load(open(ij))["texto"].strip()
    md = open(os.path.join(f["dir"], "publicacion.md")).read()
    t = yt.seccion(md, "Texto para TikTok", "Caption for TikTok")
    if not t:
        raise SystemExit(f"{f['dir']}: falta instagram.json o la sección «Texto para TikTok / Reels» en publicacion.md")
    return t.strip()


def url_publica(f):
    """URL desde la que Instagram descargará el MP4: url_base + ruta del archivo dentro del repositorio."""
    raiz = subprocess.check_output(["git", "-C", f["dir"], "rev-parse", "--show-toplevel"], text=True).strip()
    rel = os.path.relpath(f["mp4"], raiz).replace(os.sep, "/")
    return ig()["url_base"].rstrip("/") + "/" + rel


def verificar():
    for i in ig()["tokens"]:
        var = ig()["tokens"][i]
        if not os.environ.get(var):
            print(f"[{i}] {var}: NO definida"); continue
        me = llamar("GET", "me", i, fields="user_id,username,account_type,media_count")
        lim = llamar("GET", f"{me['user_id']}/content_publishing_limit", i, fields="quota_usage,config")["data"][0]
        r = requests.get("https://graph.instagram.com/refresh_access_token", params={"grant_type": "ig_refresh_token", "access_token": token(i)}, timeout=30).json()
        if "access_token" in r:
            dias = r.get("expires_in", 0) // 86400
            cad = f"renovado, caduca en {dias} días" + ("" if r["access_token"] == token(i) else " · ⚠ Instagram devolvió un token NUEVO: hay que guardarlo")
        else:
            cad = "no se pudo renovar: " + r.get("error", {}).get("message", "?")[:80]
        print(f"[{i}] {var} → @{me.get('username')} ({me.get('account_type')}) · publicaciones: {me.get('media_count')} · "
              f"cuota 24 h: {lim.get('quota_usage')}/{lim.get('config', {}).get('quota_total')} · token: {cad}")


def publicar(entrada, idioma, simular):
    f = yt.ficha(entrada, idioma)
    reg = yt.leer_registro(f)
    if "instagram" in reg:
        print(f"· {f['id']} [{idioma}] ya está en Instagram: {reg['instagram'].get('url')}"); return
    cap, url = texto(f), url_publica(f)
    h = requests.head(url, timeout=30, allow_redirects=True)
    if simular:
        print(f"— {f['id']} [{idioma}]\n   vídeo: {url} (HTTP {h.status_code}, {h.headers.get('content-type')})\n   texto: {cap[:110].replace(chr(10), ' ')}…")
        return
    if h.status_code != 200:
        raise SystemExit(f"{f['id']}: la URL del vídeo no es pública todavía ({h.status_code}): {url}\n¿Está el vídeo subido a la rama de url_base?")
    uid = llamar("GET", "me", idioma, fields="user_id")["user_id"]
    cid = llamar("POST", f"{uid}/media", idioma, media_type="REELS", video_url=url, caption=cap,
                 share_to_feed="true", is_ai_generated="true", thumb_offset=str(ig().get("portada_ms", 3000)))["id"]
    for _ in range(40):  # Instagram descarga y procesa el vídeo; hasta ~10 min
        time.sleep(15)
        st = llamar("GET", cid, idioma, fields="status_code,status")
        if st["status_code"] == "FINISHED":
            break
        if st["status_code"] in ("ERROR", "EXPIRED"):
            raise SystemExit(f"{f['id']}: Instagram no pudo procesar el vídeo: {st.get('status')}")
    else:
        raise SystemExit(f"{f['id']}: Instagram sigue procesando tras 10 min (contenedor {cid}); no se ha publicado")
    mid = llamar("POST", f"{uid}/media_publish", idioma, creation_id=cid)["id"]
    link = llamar("GET", mid, idioma, fields="permalink").get("permalink")
    reg["instagram"] = {"plataforma": "instagram", "mediaId": mid, "url": link,
                        "publicado": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
    json.dump(reg, open(yt.registro(f), "w"), ensure_ascii=False, indent=2)
    print(f"✔ {f['id']} [{idioma}] → {link}")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video", nargs="?")
    ap.add_argument("--canal", required=True)
    ap.add_argument("--idioma", choices=yt.IDIOMAS)
    ap.add_argument("--verificar", action="store_true", help="cuenta de cada token, cuota y renovación del token")
    ap.add_argument("--pendientes", action="store_true", help="publica lo que ya toca según el calendario y aún no está en Instagram")
    ap.add_argument("--ahora", action="store_true", help="con VIDEO: lo publica ya")
    ap.add_argument("--simular", action="store_true", help="no publica; enseña URL y texto")
    ap.add_argument("--desde", default=None, help="con --pendientes: no publicar nada anterior a esta fecha (AAAA-MM-DD)")
    a = ap.parse_args(argv)
    yt.cargar(a.canal)
    idiomas = [a.idioma] if a.idioma else list(ig()["tokens"])
    if a.verificar:
        return verificar()
    ahora = datetime.datetime.now(ZoneInfo(yt.CFG["zona"]))
    if a.video:
        if not (a.ahora or a.simular):
            ap.error("indica --ahora o --simular")
        entrada = next((p for p in yt.CFG["publicaciones"] if a.video in (p["video"] if isinstance(p["video"], str) else p["video"].values())), a.video)
        for i in idiomas:
            publicar(entrada, i, a.simular)
    elif a.pendientes or a.simular:
        desde = a.desde or ig().get("desde", "0000-00-00")
        for p in yt.CFG["publicaciones"]:
            for i in idiomas:
                cuando = datetime.datetime.fromisoformat(f"{p['fecha']}T{yt.hora_de(p, i)}").replace(tzinfo=ZoneInfo(yt.CFG["zona"]))
                if p["fecha"] >= desde and (cuando <= ahora or (a.simular and not a.pendientes)):
                    publicar(p, i, a.simular)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
