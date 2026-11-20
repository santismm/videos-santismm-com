"""Autoriza uno o varios canales de YouTube y muestra sus refresh tokens. Se ejecuta en tu ordenador
(necesita abrir el navegador). Solo usa la biblioteca estándar de Python 3.

Uso:
    python3 youtube_auth.py --cliente client_secret.json EUREKA_ES EUREKA_EN
    python3 youtube_auth.py --id CLIENT_ID --secreto CLIENT_SECRET MICANAL_ES MICANAL_EN

Cada nombre es una etiqueta tuya para un canal e idioma. Por cada uno se abre el navegador: elige la cuenta
de Google y ESE canal. Al final imprime una línea por canal, lista para guardar como variable de entorno:

    YT_REFRESH_TOKEN_EUREKA_ES=1//0g...

El ID y el secreto del cliente son los mismos para todos los canales (un solo proyecto de Google Cloud).
No pegues los tokens en ningún chat ni los subas a un repositorio.
"""
import argparse, http.server, json, os, re, secrets, ssl, sys, urllib.parse, urllib.request, webbrowser

SCOPES = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl"


def contexto_ssl():
    """Contexto TLS con verificación. Algunos Python (p. ej. Homebrew en una ruta propia) no traen
    certificados raíz: en ese caso se usan los de certifi o los del sistema. Nunca se desactiva la verificación."""
    ctx = ssl.create_default_context()
    if ctx.cert_store_stats()["x509_ca"] == 0 and not os.environ.get("SSL_CERT_FILE"):
        try:
            import certifi
            return ssl.create_default_context(cafile=certifi.where())
        except ImportError:
            for ca in ("/etc/ssl/cert.pem", "/etc/ssl/certs/ca-certificates.crt"):
                if os.path.exists(ca):
                    return ssl.create_default_context(cafile=ca)
    return ctx


SSL = contexto_ssl()


def pedir(url, data=None, headers={}):
    req = urllib.request.Request(url, data=urllib.parse.urlencode(data).encode() if data else None, headers=headers)
    return json.load(urllib.request.urlopen(req, context=SSL))


def autorizar(client_id, client_secret, etiqueta):
    state, got = secrets.token_urlsafe(16), {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers()
            self.wfile.write(f"<h2>{etiqueta}: listo. Cierra esta pestaña y vuelve a la terminal.</h2>".encode())

        def log_message(self, *a):
            pass

    srv = http.server.HTTPServer(("127.0.0.1", 0), Handler)  # puerto libre que asigna el sistema
    redirect = f"http://127.0.0.1:{srv.server_address[1]}"
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": client_id, "redirect_uri": redirect, "response_type": "code", "scope": SCOPES,
        "access_type": "offline", "prompt": "consent select_account", "state": state})
    print(f"\n=== {etiqueta} ===\nSe abre el navegador: elige la cuenta de Google y el canal «{etiqueta}».\nSi no se abre, copia esta dirección:\n{url}\n")
    webbrowser.open(url)
    while "code" not in got and "error" not in got:
        srv.handle_request()
    srv.server_close()
    if got.get("error") or got.get("state") != state:
        print("  ✘ autorización cancelada o inválida:", got.get("error", "state no coincide")); return None
    tok = pedir("https://oauth2.googleapis.com/token", {"code": got["code"], "client_id": client_id, "client_secret": client_secret,
                                                        "redirect_uri": redirect, "grant_type": "authorization_code"})
    if "refresh_token" not in tok:
        print("  ✘ Google no devolvió refresh token. Revoca el acceso en myaccount.google.com/permissions y repite."); return None
    items = pedir("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
                  headers={"Authorization": "Bearer " + tok["access_token"]}).get("items", [])
    canal = f"{items[0]['snippet']['title']} ({items[0]['snippet'].get('customUrl', 'sin identificador')})" if items else "NINGÚN CANAL en esta cuenta"
    print(f"  ✔ {etiqueta} → canal autorizado: {canal}")
    return tok["refresh_token"], canal


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("etiquetas", nargs="+", help="una por canal e idioma, p. ej. EUREKA_ES EUREKA_EN")
    ap.add_argument("--cliente", help="JSON del cliente OAuth descargado de Google Cloud")
    ap.add_argument("--id", default=os.environ.get("YT_CLIENT_ID"))
    ap.add_argument("--secreto", default=os.environ.get("YT_CLIENT_SECRET"))
    a = ap.parse_args()
    if a.cliente:
        j = json.load(open(a.cliente)); j = j.get("installed") or j.get("web") or j
        a.id, a.secreto = j["client_id"], j["client_secret"]
    if not (a.id and a.secreto):
        ap.error("indica --cliente client_secret.json, o --id y --secreto")
    res = []
    for e in a.etiquetas:
        e = re.sub(r"[^A-Z0-9_]", "_", e.upper())
        r = autorizar(a.id, a.secreto, e)
        if r:
            res.append((e, *r))
        if e != a.etiquetas[-1].upper():
            input("Pulsa Intro para autorizar el siguiente canal…")
    print("\n=== Guarda estas variables de entorno (no las pegues en ningún chat) ===\n")
    for e, tok, canal in res:
        print(f"# {canal}\nYT_REFRESH_TOKEN_{e}={tok}\n")


if __name__ == "__main__":
    main()
