# Estrategia del canal Hispanic Legacy · Historia en 60s

> Objetivo: llevar el conocimiento de [hispanic-legacy.com](https://hispanic-legacy.com) a TikTok, Reels y YouTube Shorts en vídeos cortos que expliquen ideas difíciles de forma sencilla, útil y entretenida. Los vídeos los produce Claude Code de principio a fin.

## 1. Análisis de la web (14-11-2026)

- **Qué es:** una base de conocimiento sobre las aportaciones de España y la América española a la ciencia, la exploración y la cultura. La portada declara 921 fichas, 9.352 afirmaciones con fuente y 1.035 fuentes citadas (593 primarias).
- **Cómo está hecha:** cada ficha lista afirmaciones numeradas, cada una con su nivel de confianza y sus fuentes. Hay una versión para máquinas de todo (`/api/k/<slug>.json`, `/llms.txt`, servidor MCP), así que el guion puede citar la afirmación exacta.
- **Tono:** académico y matizado. Las fichas reconocen límites ("el ajedrez no es un invento español") y no edulcoran la violencia colonial.
- **Idioma:** inglés, con títulos y citas en español. Licencia CC BY 4.0.
- **Identidad visual:** blanco, verde `#0b6e4f` y serif. El canal lo traduce a vídeo como "carta náutica nocturna": verde oscuro, pergamino y oro, con tipografía Fraunces.

**Ventaja diferencial.** La historia hispánica en redes está polarizada entre la leyenda negra y la leyenda rosa. Esta web tiene lo que casi nadie ofrece: el dato con su fuente y su matiz. La promesa del canal es "historia con fuentes".

**Reto.** Las fichas son densas y están en inglés. El vídeo tiene que elegir una sola idea por pieza y contarla con una imagen o una analogía.

## 2. Tendencias (fuentes de 2025-2026)

Los datos sólidos son los de Metricool y prensa; el resto son guías de proveedores y hay que tratarlos como hipótesis.

| Tema | Dato | Fuente |
|---|---|---|
| Formato | 9:16 a 1080×1920 en las tres plataformas; Shorts admite hasta 3 min | [reap.video](https://reap.video/blog/best-video-length-youtube-shorts-reels-tiktok) |
| Duración | Casi la mitad de los Shorts virales dura 20-40 s (orientativo) | [Toptal](https://www.toptal.com/creator/post/youtube-shorts-length) |
| Retención | La visualización media por Short ha caído a unos 16 s | [Metricool](https://metricool.com/youtube-trends/) |
| Alcance medio por vídeo | TikTok 32.895 · Reels 23.074 · Shorts 5.321 | [Metricool](https://metricool.com/es/tendencias-video-corto-redes-sociales/) |
| Estilo | Los mapas animados son el principal diferenciador en historia sin rostro (orientativo) | [Autonolab](https://blog.autonolab.com/niches/2025-12-10-faceless-youtube-history/) |
| Riesgo | Las recreaciones con IA reciben críticas por anacronismos (una rojigualda en 1741) | [El Español](https://www.elespanol.com/el-cultural/historia/20260613/conexion-directo-pasado-auge-recreaciones-historicas-inteligencia-artificial/1003744282439_0.html) |
| Hashtags | Instagram limita a 5 por publicación; en Shorts, de 1 a 5 | [Social Media Today](https://www.socialmediatoday.com/news/instagrams-implementing-new-limits-on-hashtag-use/808309/) |

**Lo que se deduce para este canal:**

- Mapas, diagramas y tipografía en lugar de imágenes generadas "de época": evita anacronismos y encaja con el rigor de la web.
- Gancho en los 3 primeros segundos, también escrito en pantalla, y subtítulos palabra a palabra.
- El piloto dura 59 s para valer en las tres plataformas. Conviene probar una versión de 30-40 s de cada tema y comparar retención.

## 3. Formatos de serie

| Serie | Qué cuenta | Ejemplo de la web |
|---|---|---|
| **La ruta** | Un viaje explicado sobre el mapa | El tornaviaje, el Galeón de Manila, la expedición Balmis |
| **Descubierto dos veces** | Ciencia con el crédito perdido | Vanadio (Del Río), epidural (Pagés), wolframio (Elhuyar), platino (Ulloa) |
| **Lo que dice el papel** | Una ley o documento leído literalmente | Arca de tres llaves, examen de pilotos, matrimonio indígena en las Leyes de Indias |
| **Mito o dato** | Una creencia popular contrastada | "El mayor imperio de la historia", modelos coloniales comparados |
| **Del Nuevo Mundo a tu mesa** | Plantas y alimentos | Cacao, aguacate, chuño, achiote |

## 4. Primeros 10 vídeos

| # | Título de trabajo | Ficha |
|---|---|---|
| 01 | El tornaviaje: para volver había que ir al norte ✅ | `/k/andres-de-urdaneta` |
| 02 | El vanadio se descubrió dos veces (y la primera fue en México) | `/k/andres-manuel-del-rio` |
| 03 | La epidural la describió un cirujano español en 1921 | `/k/fidel-pages-epidural-anaesthesia-1921` |
| 04 | La reina del ajedrez no siempre fue la pieza más fuerte | `/k/ajedrez-de-la-dama` |
| 05 | La vacuna que cruzó el océano en brazos de niños | `/k/balmis-expedition` |
| 06 | "El mayor imperio de la historia" es una frase sobre mapas | `/k/cartographic-extent-vs-effective-control` |
| 07 | El platino: el metal que estorbaba en las minas de oro | `/k/antonio-de-ulloa-platinum` |
| 08 | Un arca, tres llaves: así se guardaba el dinero de las flotas | Leyes de Indias, libro IX |
| 09 | El examen de los pilotos: juramento y voto secreto con habas | Leyes de Indias, libro IX, título XXIII |
| 10 | El chuño: la patata liofilizada de los Andes | ficha del chuño |

## 5. Reglas editoriales

1. Cada dato del guion sale de una afirmación de la web y se anota en la cabecera de `scenes.js`. Lo que no viene de la web se marca como conocimiento general.
2. Una idea por vídeo y una analogía cotidiana (la escalera mecánica que baja).
3. Sin superlativos que la ficha no sostenga ("el primero", "el mayor").
4. Los mapas son esquemáticos y así se indica en la descripción.
5. Cada vídeo se etiqueta como contenido generado con IA.

## 6. Decisiones pendientes

- Nombre y cuentas del canal en cada plataforma.
- Idioma: solo español, o también versión en inglés (la web está en inglés; el motor puede generar ambas con la misma animación).
- Voz: el piloto usa una voz neuronal femenina de España (Elvira).
- Frecuencia de publicación y si se programa con Metricool como el canal EUREKA.
