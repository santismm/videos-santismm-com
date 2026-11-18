# Calendario de publicación: 4 vídeos por semana

## Cadencia

| Día | Hora (Madrid) | Por qué |
|---|---|---|
| Lunes | 19:00 | Tarde en España, mediodía en México y Colombia |
| Miércoles | 19:00 | Igual |
| Viernes | 19:00 | Igual |
| Domingo | 19:00 | El domingo por la tarde es de consumo alto de vídeo |

- **Cuentas en inglés:** mismos días a las 21:00 de Madrid (tarde en Estados Unidos y Reino Unido aún despierto).
- **Las horas son una hipótesis de partida**, no un dato. Se ajustan con las estadísticas de cada plataforma tras las primeras semanas.
- **Las fechas viven en [`../publicar/calendario.json`](../publicar/calendario.json)**, que es lo que lee el script de publicación.
- **Cada vídeo sale el mismo día en las tres plataformas** (YouTube Shorts, Reels y TikTok), con el texto de su `publicacion.md`.

## Programado en YouTube

Subidos como privados con fecha; YouTube los publica a su hora (Madrid). Estado a 18-11-2026.

| Fecha | # | Vídeo | YouTube ES (19:00) | YouTube EN (21:00) |
|---|---|---|---|---|
| Mié 18 nov (ES) · Lun 23 nov (EN) | 01 | El tornaviaje | [✅ publicado](https://www.youtube.com/shorts/WHxC01j2pl8) | [programado](https://www.youtube.com/shorts/yJH2euAuJRA) |
| Mié 25 nov | 02 | El vanadio se descubrió dos veces | [programado](https://www.youtube.com/shorts/PMVUcPnzVng) | [programado](https://www.youtube.com/shorts/Rvu57cLE64k) |
| Vie 27 nov | 03 | La epidural de Pagés | [programado](https://www.youtube.com/shorts/2DaRL95q92Y) | [programado](https://www.youtube.com/shorts/8jPysKApbyE) |
| Dom 29 nov | 04 | La dama del ajedrez | [programado](https://www.youtube.com/shorts/k1XvhDSPKwI) | [programado](https://www.youtube.com/shorts/XL-hOq1gQ4I) |
| Lun 30 nov | 05 | La cadena de Balmis | [programado](https://www.youtube.com/shorts/RvMeK78R978) | [programado](https://www.youtube.com/shorts/Wdgdt963IaY) |
| Mié 2 dic | 06 | «El mayor imperio de la historia» | [programado](https://www.youtube.com/shorts/XjNfAC4JWys) | [programado](https://www.youtube.com/shorts/mlAbTCH_vQo) |

Para ver el estado actual: `python3 canales/hispanic-legacy/publicar/youtube.py --estado`.

## Siguientes (por producir)

| Fecha | # | Tema del plan |
|---|---|---|
| Vie 4 dic | 07 | El platino: el metal que estorbaba en las minas de oro |
| Dom 6 dic | 08 | Un arca, tres llaves: el dinero de las flotas |
| Lun 7 dic | 09 | El examen de los pilotos |
| Mié 9 dic | 10 | El chuño: la patata liofilizada de los Andes |

## Cómo se mantiene el buffer

- Con 4 publicaciones semanales, 6 vídeos cubren una semana y media. Para no quedarse sin margen hay que producir 4 vídeos nuevos por semana.
- Regla en vigor: cada vez que se publica un vídeo, una tarea programada produce el siguiente del plan en ambos idiomas y lo programa. Ver [`RUTINA.md`](RUTINA.md).
- Antes de programar cada vídeo: revisarlo con sonido (la voz y la música no se han podido escuchar durante la producción) y leer las notas de verificación de su `publicacion.md`.

## Qué medir las primeras cuatro semanas

- Retención a los 3 segundos y porcentaje visto, por vídeo y por plataforma.
- Compartidos y guardados por alcance.
- Qué serie funciona mejor (La ruta, Descubierto dos veces, Mito o dato) y en qué idioma.
