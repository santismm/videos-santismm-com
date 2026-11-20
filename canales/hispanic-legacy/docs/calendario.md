# Calendario de publicación: 4 vídeos por semana

## Cadencia

Lunes, miércoles y viernes (decidido el 20-11-2026; antes eran cuatro días con domingo).

| Idioma | Hora (Madrid) | Por qué |
|---|---|---|
| Español | 19:00 | Tarde en España, mediodía en México y Colombia |
| Inglés | 21:00 | Tarde en Estados Unidos, con Reino Unido aún despierto |

- Las horas son una hipótesis de partida; se ajustan con las estadísticas de cada canal tras las primeras semanas.
- Las fechas viven en [`../publicar/calendario.json`](../publicar/calendario.json), que es lo que lee el script de publicación.

## Programado en YouTube

Subidos como privados con fecha; YouTube los publica a su hora. Estado a 20-11-2026.

| Fecha | Español (19:00) | Inglés (21:00) |
|---|---|---|
| Mié 18 nov | [01 El tornaviaje](https://www.youtube.com/shorts/WHxC01j2pl8) ✅ | — |
| Vie 20 nov | [02 El vanadio](https://www.youtube.com/shorts/PMVUcPnzVng) | [01 The tornaviaje](https://www.youtube.com/shorts/yJH2euAuJRA) a las 19:00 y [02 Vanadium](https://www.youtube.com/shorts/Rvu57cLE64k) a las 21:00 |
| Lun 23 nov | [03 La epidural](https://www.youtube.com/shorts/2DaRL95q92Y) | [03 The epidural](https://www.youtube.com/shorts/8jPysKApbyE) |
| Mié 25 nov | [04 La dama del ajedrez](https://www.youtube.com/shorts/k1XvhDSPKwI) | [04 The queen's chess](https://www.youtube.com/shorts/XL-hOq1gQ4I) |
| Vie 27 nov | [05 La cadena de Balmis](https://www.youtube.com/shorts/RvMeK78R978) | [05 The Balmis chain](https://www.youtube.com/shorts/Wdgdt963IaY) |
| Lun 30 nov | [06 El mayor imperio](https://www.youtube.com/shorts/XjNfAC4JWys) | [06 The largest empire](https://www.youtube.com/shorts/mlAbTCH_vQo) |

Para ver el estado actual: `python3 canales/hispanic-legacy/publicar/youtube.py --estado`.

## Siguientes (por producir)

| Fecha | # | Tema del plan |
|---|---|---|
| Mié 2 dic | 07 | El platino: el metal que estorbaba en las minas de oro |
| Vie 4 dic | 08 | Un arca, tres llaves: el dinero de las flotas |
| Lun 7 dic | 09 | El examen de los pilotos |
| Mié 9 dic | 10 | El chuño: la patata liofilizada de los Andes |

## Cómo se mantiene el buffer

- Con 3 publicaciones semanales por idioma, la tarea programada produce un vídeo nuevo cada día de publicación.
- Regla en vigor: cada vez que se publica un vídeo, una tarea programada produce el siguiente del plan en ambos idiomas y lo programa. Ver [`RUTINA.md`](RUTINA.md).
- Antes de programar cada vídeo: revisarlo con sonido (la voz y la música no se han podido escuchar durante la producción) y leer las notas de verificación de su `publicacion.md`.

## Qué medir las primeras cuatro semanas

- Retención a los 3 segundos y porcentaje visto, por vídeo y por plataforma.
- Compartidos y guardados por alcance.
- Qué serie funciona mejor (La ruta, Descubierto dos veces, Mito o dato) y en qué idioma.
