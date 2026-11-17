# EUREKA #09: La IA frente a 44 profesiones: ¿gana o empata a un experto? (GDPval)

- **Vídeo:** `out/009-la-ia-frente-a-44-profesiones.mp4` (1080×1920, 30 fps, 59,5 s, -14 LUFS)
- **Portada:** `out/009-la-ia-frente-a-44-profesiones-portada.png`
- **Subtítulos:** `out/009-la-ia-frente-a-44-profesiones.srt`

## Fuentes y matices

- **Fuente primaria:** OpenAI, [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks](https://arxiv.org/abs/2510.04374) (arXiv 2510.04374, 5-10-2025) y el post [Measuring the performance of our models on real-world tasks](https://openai.com/index/gdpval/) (25-9-2025).
  - **Qué mide:** 1.320 tareas (30 por ocupación) de **44 ocupaciones** de los **9 sectores que más aportan al PIB de EE. UU.** Entre ellas están "Lawyers", "Registered Nurses" y "Accountants and Auditors" (tabla 1 del paper).
  - **Quién crea las tareas:** profesionales con un mínimo de 4 años de experiencia y **14 años de media**.
  - **Cómo se puntúa:** expertos del mismo oficio comparan a ciegas entregables sin firma (el del humano y el del modelo) y eligen el mejor. La métrica es el % de tareas en que el modelo **gana o empata** ("wins or ties"). El **50 %** es la línea de paridad con el experto.
  - **Matiz:** la evaluación con expertos humanos se hizo sobre el **subconjunto gold de 220 tareas** (públicas), no sobre las 1.320.
  - **Matiz:** el ciego no es perfecto. El paper reconoce que el estilo podía delatar al modelo (rayas en OpenAI, primera persona en Claude…).
- **Resultado de 2025 (figura 5 del paper, subconjunto gold):** Claude Opus 4.1, **47,6 %**; GPT-5 high, 38,8 %; GPT-4o, 12,4 %. El paper dice: "47.6% of deliverables by Claude Opus 4.1 were graded as better than (wins) or as good as (ties) the human deliverable". En el vídeo, "casi el 48 %".
  - El post dice que Claude Opus 4.1 fue "as good as or better than humans in just under half the tasks". La prensa del lanzamiento ([TechCrunch](https://techcrunch.com/2025/09/25/openai-says-gpt-5-stacks-up-to-humans-in-a-wide-range-of-jobs), 25-9-2025) da otras cifras del mismo estudio: GPT-5 high, 40,6 %; Claude Opus 4.1, 49 %. El vídeo usa las del paper.
- **Resultados posteriores, todos del propio fabricante (no verificados de forma independiente):**
  - [Anuncio de GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) (11-12-2025): "GPT‑5.2 Thinking beats or ties top industry professionals on **70.9%** of comparisons on GDPval knowledge work tasks, according to expert human judges". El modelo se ejecutó con esfuerzo de razonamiento "heavy". En el vídeo, "el 71 %".
  - [Anuncio de GPT-5.5](https://openai.com/index/introducing-gpt-5-5/) (23-4-2026): "On GDPval… GPT‑5.5 scores **84.9%**". La fila de su tabla es "GDPval (wins or ties)", y GPT-5.4 obtiene 83,0 %. En el vídeo, "casi el 85 %".
  - El anuncio de GPT-5.5 no detalla qué subconjunto ni qué procedimiento de corrección usa. Por eso el vídeo lo marca como "datos del propio fabricante".
- **Limitaciones que cita el propio paper (escena del puzle):**
  - "Tasks are precisely-specified and one-shot, not interactive". Se da todo el contexto en el enunciado.
  - Quedan fuera el trabajo físico, el conocimiento tácito, los datos personales, el software propietario y la comunicación entre personas.
  - El post añade: "in the real world, tasks aren't always clearly defined with a prompt and reference files".
- **Tesis:** [El cronómetro y el examen](https://articles.santismm.com/el-cronometro-y-el-examen/), sección "Valor económico": "El benchmark más honesto es el trabajo por el que se paga a un profesional."
- **Tracker:** [benchmarks.santismm.com](https://benchmarks.santismm.com), fila GDPval.
- **Otras cifras de la misma sección del artículo, que el vídeo NO usa:** Vending-Bench (~17 % del resultado humano; en el tracker, Vending-Bench 2 con Claude Opus 5, 11.181 $ frente a ~63.000 $, Andon Labs, 2026-07) y TheAgentCompany (~30 % de flujos completos; en el tracker, Gemini 2.5 Pro / Claude 3.7 + OpenHands, CMU, 2025). No las he contrastado con su fuente original.
- **Animación:** los nombres de los 9 sectores, las tres condiciones de la tarea y las piezas del puzle resumen el paper. El "tira y afloja" es una metáfora visual. Las posiciones del nudo corresponden a las cifras citadas.

> ⚠️ **Discrepancia detectada en santismm.com:** el artículo ("instantánea de junio de 2026") dice que "los sistemas de frontera ganan o empatan alrededor del **41 %**, frente al 50 % que marcaría la paridad". La fila GDPval del tracker repite ese 41 % (humano, 50 %).
> - **No era el mejor modelo ni en el lanzamiento.** El ~41 % coincide con GPT-5 high (40,6 % según la prensa del lanzamiento; 38,8 % en el paper). El mejor modelo de 2025 fue Claude Opus 4.1, con 47,6 %.
> - **Estaba desfasado en junio de 2026.** OpenAI ya había publicado 70,9 % (GPT-5.2 Thinking, dic. 2025) y 84,9 % (GPT-5.5, abr. 2026), aunque son datos del fabricante.
> - **El tracker mezcla métricas.** La columna de sistemas de la fila GDPval lista puntuaciones Elo de GDPval-AA (Artificial Analysis, leídas el 17-10-2026; p. ej., Claude Opus 5.5 (Max) 1866), con fecha 2026-09. El enlace de fuente apunta a anthropic.com/claude-opus-5-5, que no respalda el 41 %. La nota de la propia fila lo admite: "The win/tie % cell (41) has not been refreshed since the GPT-5 era".
> - **Qué hace el vídeo:** usa las cifras originales (47,6 % de 2025 y 70,9 % / 84,9 % del fabricante) y no menciona el 41 %.
> - **Qué conviene corregir:** actualizar el artículo y la celda % del tracker, o aclarar a qué modelo y fecha se refiere el 41 %. El Elo de GDPval-AA no es comparable con el % de "gana o empata".

> ⚠️ **Antes de publicar,** activa la etiqueta de contenido generado con IA en cada plataforma.

---

## TikTok

**Texto:**
> La IA contra 44 profesiones: abogados, enfermeras, contables… ¿quién gana? ⚖️
> En GDPval, expertos comparan a ciegas el trabajo de un profesional y el de la IA. En 2025 la IA ganaba o empataba en el 47,6 %. Hoy OpenAI dice que casi el 85 % (dato del fabricante).

**Hashtags:** `#inteligenciaartificial #IA #trabajo #aprendeentiktok #GDPval`

**Ajustes:** activar "Contenido generado por IA".

## Instagram Reels

**Texto:**
> ¿La IA hace tu trabajo mejor que tú? ⚖️
>
> GDPval (OpenAI) mide 1.320 tareas reales de 44 profesiones. Expertos del mismo oficio comparan a ciegas el entregable humano y el de la IA.
>
> • 2025: el mejor modelo ganaba o empataba en el 47,6 % (paridad = 50 %).
> • Dic. 2025: 70,9 %. Abr. 2026: 84,9 %. Ojo: datos del propio fabricante.
>
> Pero son tareas bien definidas, con todo el contexto y de un solo intento. Un trabajo es mucho más.
>
> 📊 Todos los benchmarks, con fuentes: benchmarks.santismm.com
> 📌 Guárdalo · 📤 Envíaselo a quien aún mide la IA con exámenes
>
> Voz y animación generadas con IA a partir de mis contenidos.

**Hashtags:** `#inteligenciaartificial #futurodeltrabajo #IAgenerativa #tecnologia #empleo`

**Ajustes:** activar la etiqueta "Información de IA".

## YouTube Shorts

**Título:** `La IA frente a 44 profesiones: ¿gana o empata a un experto? #shorts`

**Descripción:**
> GDPval (OpenAI): 1.320 tareas reales de 44 profesiones, creadas por expertos con 14 años de experiencia media. Otro experto del mismo oficio compara a ciegas el entregable humano y el de la IA.
>
> En 2025, el mejor modelo (Claude Opus 4.1) ganaba o empataba en el 47,6 % de las tareas; la paridad es el 50 %. Después, OpenAI anunció el 70,9 % (GPT-5.2 Thinking, dic. 2025) y el 84,9 % (GPT-5.5, abr. 2026): datos del propio fabricante.
>
> Matiz: tareas bien definidas, con todo el contexto y de un solo intento. Un trabajo es más que eso.
>
> 📊 Tracker de benchmarks: https://benchmarks.santismm.com
> 📄 Artículo: https://articles.santismm.com/el-cronometro-y-el-examen/
> 📑 Paper: https://arxiv.org/abs/2510.04374
>
> Voz y animación generadas con IA; guion basado en el trabajo de Santi Santa María.
>
> #inteligenciaartificial #IA #GDPval

**Ajustes:** en "Contenido alterado o sintético", marcar "Sí". Subir el `.srt`.

## LinkedIn

**Texto:**
> "¿Aprueba la IA un examen?" es la pregunta equivocada.
>
> GDPval (OpenAI) pone a la IA frente a 1.320 tareas reales de 44 profesiones. Un experto del mismo oficio compara a ciegas el entregable humano y el de la IA.
> • 2025: el mejor modelo ganaba o empataba en el 47,6 % (paridad = 50 %).
> • Dic. 2025: 70,9 %. Abr. 2026: 84,9 %. Datos del propio fabricante, sin verificación independiente.
>
> Dos matices antes de sacar conclusiones:
> 1. Son tareas bien definidas, con todo el contexto y de un solo intento. Buscar el contexto, iterar con otros o decidir qué hacer queda fuera.
> 2. Una tarea no es un trabajo.
>
> La pregunta útil para tu empresa: ¿gana o empata a un experto en TUS tareas? El benchmark más honesto es el trabajo por el que se paga a un profesional.
>
> Todos los benchmarks, con sus fuentes: benchmarks.santismm.com 👇 (vídeo generado con IA)
>
> #InteligenciaArtificial #FuturoDelTrabajo #Benchmarks

**Ajustes:** subir el `.srt` como subtítulos.

**Comentario fijado:**
> ¿Qué tarea de tu trabajo pondrías tú en GDPval para ver si la IA te gana o empata?
