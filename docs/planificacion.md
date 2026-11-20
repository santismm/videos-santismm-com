# Planificación de publicaciones: 4 vídeos por semana

## Reglas

- **Cadencia:** lunes, miércoles, viernes y domingo, cuatro vídeos por semana y por idioma.
- **Hora (Madrid):**
  - Español a las **13:00**.
  - Inglés a las **18:00** (12:00 en la costa este de EE. UU. y 09:00 en la oeste).
- **Redes:** cada vídeo sale el mismo día en **YouTube Shorts, Instagram Reels y TikTok** de su idioma.
  - Se sube de forma nativa en cada red, sin marcas de agua de otras.
  - Cada red lleva su propio texto, sacado de `publicacion.md`, y su etiqueta de IA.
- **LinkedIn:** opcional, desde tu perfil personal, con el texto de LinkedIn de cada `publicacion.md`. Lo ideal es un vídeo por semana, el de más interés para empresa.
- **Colchón (buffer):** siempre **6 vídeos listos y sin publicar por idioma**, para que puedas revisarlos con al menos una semana de margen.
- **Configuración técnica:** en [`publicacion.json`](publicacion.json) (marcas de Metricool, redes conectadas, horas y ajustes por red).

## Qué hace la tarea programada

Se ejecuta lunes, miércoles, viernes y domingo a las 18:22 (hora de Madrid).

1. **Confirma** que los vídeos del día (13:00 en español y 18:00 en inglés) están publicados en cada red conectada, y apunta los enlaces en el README.
2. **Si una marca tiene redes nuevas conectadas**, se las añade a los vídeos que ya están programados.
3. **Si el colchón de un idioma baja de 6**, genera el siguiente episodio del plan en **español y en inglés**:
   - fuentes verificadas;
   - revisión de fotogramas;
   - volumen a -14 LUFS;
   - textos de publicación.
4. **Programa** cada vídeo en el siguiente hueco libre de su marca.
5. **Te avisa** con los vídeos, las portadas y los enlaces de Metricool.

## Calendario

### 🇪🇸 Español (marca 7970471)

| Fecha | Episodio | YouTube | Instagram / TikTok |
|---|---|---|---|
| lun 9 nov | #01 El arnés | ✅ publicado | — |
| mié 11 nov | #02 Contaminación | ✅ publicado | — |
| vie 13 nov | #03 pass^k | ✅ publicado | — |
| lun 16 nov | #04 Horizonte de METR | ✅ [publicado](https://www.youtube.com/shorts/CkM4v7utkf8) | cuando se conecten |
| mié 18 nov | #05 Email que secuestra | ✅ [publicado](https://www.youtube.com/shorts/6o1ki_lqVe8) | cuando se conecten |
| vie 20 nov | #06 4 formas de enfermar | ✅ [publicado](https://www.youtube.com/shorts/-Onv3niNIh8) | cuando se conecten |
| **dom 22 nov** | #07 Coste por resultado (adelantado desde el lun 23) | programado | cuando se conecten |
| lun 23 nov | #08 El dron de los 79 minutos | programado | cuando se conecten |
| mié 25 nov | #09 La IA frente a 44 profesiones | programado | cuando se conecten |
| vie 27 nov | #10 Un agente al mando de una máquina de vending | programado | cuando se conecten |
| dom 29 nov | #11 ¿Modelo, agente o arnés? | programado | cuando se conecten |
| lun 30 nov → | #12 en adelante | los genera la tarea programada | |

**Instagram y TikTok en español:** los vídeos ya publicados en YouTube (#01–#03) pueden estrenarse en esas redes los primeros días. Propuesta: conectar las cuentas y publicar #01, #02 y #03 en los tres primeros huecos libres, y seguir con el mismo calendario que YouTube.

### 🇬🇧 English (marca por crear)

Todos los episodios en inglés (#01–#09) estarán listos antes de conectar las cuentas. Se publican en orden desde el primer lunes después de la conexión. Ejemplo si se conectan antes del 23 de noviembre:

| Fecha | Episodio |
|---|---|
| Mon 23 Nov | #01 The harness |
| Wed 25 Nov | #02 It knew the exam |
| Fri 27 Nov | #03 Once is not always |
| Sun 29 Nov | #04 The AI workday |
| Mon 30 Nov | #05 An email can hijack your agent |
| Wed 2 Dec | #06 Four ways agents get sick |
| Fri 4 Dec | #07 The real cost of an agent |
| Sun 6 Dec | #08 The 79-minute drone |
| Mon 7 Dec | #09 AI vs 44 professions |
| Wed 9 Dec | #10 The vending-machine agent |
| Fri 11 Dec | #11 Model, agent or harness? |

## Plan de temas (siguientes)

Siguen el orden de [`estrategia.md`](estrategia.md): #10 Vending-Bench y después la lista de reserva. Cuando se agote, nuevos temas de los subdominios:
- **labs:** Detective de benchmarks, Modelo/agente/arnés, Conversor de contexto.
- **physicalai:** Figure 02 en BMW, Spot en National Grid, niveles de evidencia.
- **benchmarks:** ARC-AGI-3, el tracker de saturación.
- **santismm.com:** Del copiloto al empleado digital, Harness Scorecard.

## Métricas a revisar cada semana

- Retención a los 3 s.
- Porcentaje de finalización.
- Envíos y guardados por cada 1.000 visualizaciones.
- Seguidores ganados por vídeo.

Comparar siempre español frente a inglés y red frente a red, y probar una variable cada vez: tipo de gancho, duración u hora.
