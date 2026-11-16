"""Autoriza un canal de YouTube y muestra su refresh token. Se ejecuta UNA VEZ por canal, en tu ordenador
(necesita abrir el navegador). Solo usa la biblioteca estándar de Python 3.

Uso:
    python3 youtube_auth.py CLIENT_ID CLIENT_SECRET

Al terminar imprime el nombre del canal autorizado y el refresh token. Guarda ese token como
YT_REFRESH_TOKEN_ES o YT_REFRESH_TOKEN_EN (ver README.md). No lo pegues en ningún chat ni lo subas al repositorio.
"""
import http.server, json, secrets, sys, urllib.parse, urllib.request, webbrowser

SCOPES = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl"


def post(url, data):
    req = urllib.request.Request(url, data=urllib.parse.urlencode(data).encode())
    return json.load(urllib.request.urlopen(req))


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    client_id, client_secret = sys.argv[1:]
    state = secrets.token_urlsafe(16)
    got = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers()
            self.wfile.write("<h2>Listo. Ya puedes cerrar esta pestaña y volver a la terminal.</h2>".encode())

        def log_message(self, *a):
            pass

    # Puerto 0: el sistema asigna uno libre (Google admite cualquier puerto local en clientes de escritorio).
    srv = http.server.HTTPServer(("127.0.0.1", 0), Handler)
    REDIRECT = f"http://127.0.0.1:{srv.server_address[1]}"
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": client_id, "redirect_uri": REDIRECT, "response_type": "code", "scope": SCOPES,
        "access_type": "offline", "prompt": "consent", "state": state})
    print("Abriendo el navegador. Elige la cuenta de Google y EL CANAL que quieres autorizar.\n"
          "Si no se abre, copia esta dirección:\n\n" + url + "\n")
    webbrowser.open(url)
    while "code" not in got and "error" not in got:
        srv.handle_request()
    if got.get("error") or got.get("state") != state:
        sys.exit("Autorización cancelada o inválida: " + str(got.get("error", "state no coincide")))
    tok = post("https://oauth2.googleapis.com/token", {
        "code": got["code"], "client_id": client_id, "client_secret": client_secret,
        "redirect_uri": REDIRECT, "grant_type": "authorization_code"})
    if "refresh_token" not in tok:
        sys.exit("Google no devolvió refresh token. Revoca el acceso en myaccount.google.com/permissions y repite.")
    req = urllib.request.Request("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
                                 headers={"Authorization": "Bearer " + tok["access_token"]})
    items = json.load(urllib.request.urlopen(req)).get("items", [])
    print("Canal autorizado:", items[0]["snippet"]["title"] if items else "(no se encontró ningún canal en esta cuenta)")
    print("\nREFRESH TOKEN (guárdalo como YT_REFRESH_TOKEN_ES o YT_REFRESH_TOKEN_EN):\n\n" + tok["refresh_token"] + "\n")


if __name__ == "__main__":
    main()
