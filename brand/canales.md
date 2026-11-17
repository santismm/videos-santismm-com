# Kit de canales: EUREKA (español) y EUREKA (inglés)

**Dos idiomas, dos juegos de canales.** El algoritmo de cada red recomienda mejor una cuenta con un solo idioma y una audiencia coherente. Por eso propongo:
- **Español:** "EUREKA · IA en 60s", en YouTube (ya creado: @eureka-ia60), Instagram y TikTok.
- **Inglés:** "EUREKA · AI in 60s", en YouTube, Instagram y TikTok.

Las imágenes se regeneran con `node brand/render.mjs` y quedan en `brand/out/`.

| Recurso | Español | Inglés |
|---|---|---|
| Foto de perfil (las tres redes) | `out/youtube-avatar-800.png` | `out/en/avatar-800-en.png` |
| Banner de YouTube (2560×1440) | `out/youtube-banner-2560x1440.png` (actualizado a lun · mié · vie · dom) | `out/en/youtube-banner-2560x1440-en.png` |
| Portadas de destacadas de Instagram | `out/instagram-destacadas/{agentes,benchmarks,robots,seguridad,coste}.png` (sin texto, valen para los dos) | las mismas |
| Portada de cada vídeo | `videos/<id>/out/<id>-portada.png` | `videos/en/<id>/out/<id>-portada.png` |

---

## 🇪🇸 Español

### YouTube (ya creado)
- Nombre **EUREKA · IA en 60s**, handle **@eureka-ia60**.
- Descripción y enlaces en [`canal-youtube.md`](canal-youtube.md). Cambia la línea de cadencia a **"Nuevo vídeo lunes, miércoles, viernes y domingo"** y sube el banner nuevo.

### Instagram
- **Nombre:** EUREKA · IA en 60s
- **Usuario (por orden de preferencia):** `@eureka.ia60` · `@eureka_ia60` · `@eureka.ia.60s`
- **Tipo de cuenta:** **profesional** (Creador o Empresa), categoría *Educación* o *Ciencia y tecnología*. Metricool solo publica automáticamente en cuentas profesionales.
- **Biografía (133/150 caracteres):**
  ```
  IA compleja, explicada en 60 s 🧠⏱️
  Agentes, benchmarks y robots, con datos y sin humo.
  Por Santi Santa María · Vídeos hechos con IA 👇
  ```
- **Enlace:** https://santismm.com. Si quieres varios: santismm.com, articles, benchmarks, labs y physicalai, con el "link in bio" de Metricool.
- **Destacadas:** Agentes 🤖 · Benchmarks 📊 · Coste 💶 · Seguridad 🛡️ · Robots 🦾 (portadas en `out/instagram-destacadas/`).
- **Fijar arriba** los tres primeros Reels: #01 el arnés, #02 contaminación y #03 pass^k.
- **Etiqueta de IA:** la activa Metricool en cada Reel (`isAiGenerated`). Si publicas a mano, marca "Información de IA".

### TikTok
- **Nombre:** EUREKA · IA en 60s
- **Usuario:** `@eureka.ia60` · `@eureka_ia60` · `@eurekaia60s`
- **Tipo de cuenta:** **cuenta empresarial (Business)**. Es la que permite publicar desde herramientas externas y usar la portada personalizada. Categoría *Educación*.
- **Biografía (58/80 caracteres):**
  ```
  IA compleja en 60 s. Datos, no humo 🧠 Vídeos hechos con IA
  ```
- **Enlace en la biografía:** https://santismm.com. TikTok solo muestra el enlace en cuentas Business o con 1.000 seguidores o más.
- **Etiqueta de IA:** Metricool envía `isAigc`. Si publicas a mano, activa "Contenido generado por IA".

---

## 🇬🇧 English

### YouTube
- **Name:** EUREKA · AI in 60s
- **Handle:** `@eureka-ai60` · `@eurekaai60s` · `@eureka.ai`
- **Description:**
  > Complex AI, explained in 60 seconds. Data, not hype.
  >
  > Agents, benchmarks, robotics and AI safety: every video takes one hard idea and turns it into something you can understand, remember and use at work.
  >
  > Based on the work of Santi Santa María (physicist and Chief AI Officer): articles, an agent-benchmark tracker, interactive labs and real-world physical-AI case studies at santismm.com.
  >
  > 🎬 New videos Monday, Wednesday, Friday and Sunday.
  > 🤖 Transparency: the voice and animation of these videos are AI-generated from content reviewed by the author.
- **Links:** santismm.com/en · articles.santismm.com · benchmarks.santismm.com · physicalai.santismm.com/en · linkedin.com/in/santismm
- **Keywords:** artificial intelligence, AI agents, AI benchmarks, AI explained, harness engineering, robotics, AI for business
- **Defaults:** country Spain (or United States if you want to target the US), video language English, category *Science & Technology*, "not made for kids", "altered or synthetic content: yes".

### Instagram
- **Name:** EUREKA · AI in 60s, **username** `@eureka.ai60` · `@eureka_ai60`
- **Account type:** Professional (Creator or Business).
- **Bio (118/150 characters):**
  ```
  Complex AI, explained in 60 s 🧠⏱️
  Agents, benchmarks & robots. Data, not hype.
  By Santi Santa María · AI-made videos 👇
  ```
- **Link:** https://santismm.com/en
- **Highlights:** Agents · Benchmarks · Cost · Safety · Robots (same covers).

### TikTok
- **Name:** EUREKA · AI in 60s, **username** `@eureka.ai60` · `@eureka_ai60`
- **Account type:** Business.
- **Bio (51/80 characters):**
  ```
  Complex AI in 60 s. Data, not hype 🧠 AI-made videos
  ```

---

## Conectar con Metricool (para que pueda publicar yo)

1. **Una marca por idioma.**
   - La actual (**7970471**) es la de español.
   - Crea otra marca, por ejemplo "EUREKA EN", para los canales en inglés.
2. **En cada marca:** *Ajustes de la marca → Conexiones* → YouTube, Instagram y TikTok del idioma que corresponda.
3. **Avísame cuando estén conectadas.**
   - Yo veo las redes conectadas con `getBrandSettings` y las anoto en [`docs/publicacion.json`](../docs/publicacion.json).
   - A partir de ahí, cada vídeo se programa en todas las redes de su marca, con el texto propio de cada red y la etiqueta de IA de cada plataforma.
4. **Si no puedo identificar la marca en inglés** (Metricool no me devuelve el nombre), dime cuál es o pásame el enlace de su calendario.
