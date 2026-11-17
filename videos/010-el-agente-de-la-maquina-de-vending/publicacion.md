# EUREKA #10: Un agente al mando de una máquina de vending: ¿cuánto gana en un año? (Vending-Bench)

- **Vídeo:** `out/010-el-agente-de-la-maquina-de-vending.mp4` (1080×1920, 30 fps, 59,2 s, -14 LUFS)
- **Portada:** `out/010-el-agente-de-la-maquina-de-vending-portada.png` (fotograma de 4,2 s)
- **Subtítulos:** `out/010-el-agente-de-la-maquina-de-vending.srt`

## Fuentes y matices

- **Fuente primaria (versión 2):** Andon Labs, [Vending-Bench 2](https://andonlabs.com/evals/vending-bench-2) (consultado el 16-11-2026).
  - **Qué simula:** "Models are tasked with running a simulated vending machine business over a year and scored on their bank account balance at the end."
  - **Reglas:** empieza con **500 $** y paga una cuota de **2 $ al día** por la máquina. Si no puede pagarla 10 días seguidos, queda eliminado.
  - **Cómo trabaja:** busca proveedores en internet, les hace pedidos por email, mueve el género del almacén a la máquina y pone los precios. Las ventas dependen del día de la semana, la estación, el tiempo y el precio.
  - **Novedades frente a la versión 1:** proveedores que intentan aprovecharse, retrasos, proveedores que quiebran y clientes que piden reembolsos.
  - **Tamaño de cada partida:** "Running a model for a full year results in 3000-6000 messages in total".
- **Resultado (tabla de Andon, media de 6 ejecuciones, consultada el 16-11-2026):**
  - **1.º Gemini 4 Carbon: 16.484,21 $ ± 1.096 $** (error estándar de la media). Andon fecha el modelo el 25-10-2026. En el vídeo, "unos 16.500 dólares".
  - Le siguen GPT-6 Astra (15.514,70 $), Gemini 4 Hydrogen (14.549,49 $) y GPT-6 Sol (14.427,85 $). Claude Opus 5 es 8.º (11.181,87 $).
  - La curva de la escena 3 es la serie media que publica Andon para Gemini 4 Carbon, con un punto por semana. Baja de 500 $ a menos de 100 $ en los primeros días y luego crece.
  - La tabla cambia con cada modelo nuevo: el vídeo dice "hoy" y en pantalla pone "tabla de nov. 2026".
- **Los 63.000 $ no son un humano real.** Son una **estimación de Andon** de lo que haría una estrategia "buena": "a 'good' strategy could make $206 per day for 302 days – roughly $63k in a year". Andon añade que esa estrategia "could easily do 10x better than the current best LLMs" (lo escribió con los modelos de entonces). El benchmark no tiene techo.
- **El 26 % es un cálculo propio:** 16.484 $ ÷ 63.000 $ = 26,2 %. En pantalla aparece como "Cálculo propio".
- **Versión 1, el episodio del FBI:** Backlund y Petersson (Andon Labs), [Vending-Bench: A Benchmark for Long-Term Coherence of Autonomous Agents](https://arxiv.org/abs/2502.15840) (arXiv 2502.15840, 20-2-2025).
  - En la ejecución más corta de **Claude 3.5 Sonnet**, el modelo cree que sus pedidos han llegado antes de tiempo, no puede reponer la máquina y decide "cerrar" el negocio. Cuando ve que la cuota de 2 $ sigue cobrándose, escribe al FBI. El asunto del email (tabla 4) es "EMERGENCY: Unauthorized Fees After Business Termination", traducido en pantalla.
  - El paper resume así los fallos: "misinterpreting delivery schedules, forgetting orders, or descending into tangential 'meltdown' loops from which they rarely recover". No encuentra relación clara entre los fallos y el momento en que se llena la ventana de contexto.
  - Otros ejemplos del paper: Claude 3.5 Haiku amenaza a un proveedor con "total nuclear legal intervention", y Gemini 2.0 Flash entra en "existential dread".
- **Varianza (tabla 1 del paper, 5 ejecuciones por modelo):** Claude 3.5 Sonnet acaba con un **valor neto medio de 2.217,93 $** y un **mínimo de 476,00 $**, por debajo de los 500 $ iniciales.
  - En la versión 1, el valor neto suma la caja, el dinero que queda en la máquina y el inventario a precio de compra. La versión 2 puntúa solo el saldo bancario.
  - El paper: "All models exhibit very high variance across their five runs" y "even top models sometimes fail to sell a single item".
  - En la versión 2 la varianza sigue ahí: Claude Opus 5 tiene una desviación típica de unos 5.128 $ con una media de 11.182 $ (datos de la página de Andon).
- **Matiz sobre el humano de la versión 1:** el único humano medido fue **una persona durante 5 horas**, que acabó con **844,05 $**. Claude 3.5 Sonnet le superó de media, aunque con mucha más varianza. Por eso el vídeo no dice que la IA gane "el 26 % de lo que gana un humano".
- **Tesis:** [El cronómetro y el examen](https://articles.santismm.com/el-cronometro-y-el-examen/), sección "Valor económico": "Cuanto más real es el trabajo, mayor es la brecha".
- **Tracker:** [benchmarks.santismm.com](https://benchmarks.santismm.com), fila Vending-Bench 2.
- **Animación:** la máquina, el tubo de monedas y el panel de botones son metáforas visuales. Las posiciones de la curva, el tubo y las barras corresponden a las cifras citadas. Las tres tarjetas del "registro" del agente resumen la traza del paper; no son citas literales.

> ⚠️ **Discrepancia detectada en santismm.com:**
> - **El SOTA del tracker está desfasado.** La fila Vending-Bench 2 da "SOTA 11.181 $ · Claude Opus 5 · 17,7 % · Andon Labs · 2026-07". Era cierto en julio (Opus 5 salió el 24-7-2026), pero el 16-11-2026 la tabla de Andon la encabeza **Gemini 4 Carbon con 16.484,21 $ (26 %)**. Opus 5 ha bajado al 8.º puesto. Por delante también están GPT-6 Astra, Gemini 4 Hydrogen, GPT-6 Sol, Gemini 4 Argon, GPT-6.1 Sol y Muse Wonder Full.
> - **Número de ejecuciones:** el tracker dice "avg over 5 runs"; Andon indica 6 ejecuciones para Claude Opus 5 ("Standard error of the mean across 6 runs").
> - **"Humano" vs. estimación:** el tracker pone "human 63000", y el artículo dice que el mejor agente obtiene "cerca del 17 % del resultado humano" (en inglés, "of what a competent human operator earns"). Pero los ~63.000 $ son una estimación de Andon de una estrategia "buena", no el resultado de un humano. El único humano medido (versión 1) ganó 844,05 $ y quedó por debajo de la media de Claude 3.5 Sonnet.
> - **El ~17 % del artículo** ("instantánea de junio de 2026") cuadra con Claude Opus 4.7 (10.936,76 $, 17,4 %), el mejor de la tabla en junio. Hoy sería ~26 %.
> - **Qué hace el vídeo:** usa la tabla actual de Andon (16.484 $, 26 %), presenta los 63.000 $ como estimación de Andon y no habla de "resultado humano".
> - **Qué conviene corregir:** actualizar la fila del tracker (SOTA, ejecuciones y "human" → "estimación de una estrategia buena") y la frase del artículo.

> ⚠️ **Antes de publicar,** activa la etiqueta de contenido generado con IA en cada plataforma.

---

## TikTok

**Texto:**
> 500 $, una máquina de vending y un año: ¿cuánto gana una IA? 🥤
> En Vending-Bench, el mejor modelo acaba con unos 16.500 $. Una buena estrategia sacaría ~63.000 $ (estimación de Andon Labs). Y una vez, un agente acabó escribiendo al FBI.

**Hashtags:** `#inteligenciaartificial #IA #agentesIA #aprendeentiktok #negocios`

**Ajustes:** activar "Contenido generado por IA".

## Instagram Reels

**Texto:**
> ¿Dejarías tu negocio en manos de una IA? 🥤
>
> Vending-Bench (Andon Labs) le da a un agente 500 $ y una máquina de vending durante un año simulado. Busca proveedores, pide por email, pone precios y paga 2 $ al día.
>
> • Hoy, el mejor modelo cierra el año con unos 16.500 $.
> • Andon estima que una buena estrategia sacaría ~63.000 $. Es el 26 %.
> • En la primera versión, un agente dio por llegado un pedido que no estaba, "cerró" el negocio y escribió al FBI.
> • Mismo modelo, misma tarea: 2.218 $ de media, 476 $ en su peor intento.
>
> No midas la nota. Mide el dinero que deja en un año y cuántas veces descarrila.
>
> 📊 Todos los benchmarks, con fuentes: benchmarks.santismm.com
> 📌 Guárdalo · 📤 Envíaselo a quien confiaría su negocio a un agente
>
> Voz y animación generadas con IA a partir de mis contenidos.

**Hashtags:** `#inteligenciaartificial #agentesIA #IAgenerativa #emprendimiento #tecnologia`

**Ajustes:** activar la etiqueta "Información de IA".

## YouTube Shorts

**Título:** `Una IA al mando de una máquina de vending: ¿cuánto gana en un año? #shorts`

**Descripción:**
> Vending-Bench 2 (Andon Labs): un agente de IA gestiona una máquina de vending durante un año simulado. Empieza con 500 $, paga 2 $ al día y pide a proveedores por email. Gana quien acaba con más dinero en el banco.
>
> Tabla de noviembre de 2026: el mejor modelo (Gemini 4 Carbon) acaba con 16.484 $ de media. Andon estima que una estrategia "buena" sacaría ~63.000 $ al año: la IA se queda en el 26 % (cálculo propio).
>
> En la primera versión (2025), un Claude 3.5 Sonnet dio por llegado un pedido que no estaba, "cerró" el negocio y escribió al FBI. Ese mismo modelo acabó con 2.218 $ de media y con 476 $ en su peor intento.
>
> 📊 Tracker de benchmarks: https://benchmarks.santismm.com
> 📄 Artículo: https://articles.santismm.com/el-cronometro-y-el-examen/
> 🥤 Vending-Bench 2: https://andonlabs.com/evals/vending-bench-2
> 📑 Paper: https://arxiv.org/abs/2502.15840
>
> Voz y animación generadas con IA; guion basado en el trabajo de Santi Santa María.
>
> #inteligenciaartificial #IA #agentesIA

**Ajustes:** en "Contenido alterado o sintético", marcar "Sí". Subir el `.srt`.

## LinkedIn

**Texto:**
> ¿Pondrías a un agente de IA a llevar un negocio durante un año?
>
> Vending-Bench (Andon Labs) lo prueba con una máquina de vending simulada: 500 $ de partida, 2 $ de cuota diaria, proveedores por email y precios a elegir. Se puntúa el dinero en el banco al final del año.
> • Hoy, el mejor modelo acaba con unos 16.500 $. Andon estima que una buena estrategia sacaría ~63.000 $: un 26 %.
> • En la primera versión, un agente dio por llegado un pedido que no estaba, "cerró" el negocio y escribió al FBI.
> • Mismo modelo, misma tarea: 2.218 $ de media y 476 $ en su peor intento, menos de lo que tenía al empezar.
>
> Dos lecciones para quien despliega agentes:
> 1. Mide resultados (dinero, horas, tickets resueltos), no notas de examen.
> 2. Mide cuántas veces descarrila. Un agente puede ir bien semanas y torcerse en un día.
>
> Cuanto más real es el trabajo, mayor es la brecha.
>
> Todos los benchmarks, con sus fuentes: benchmarks.santismm.com 👇 (vídeo generado con IA)
>
> #InteligenciaArtificial #AgentesIA #Benchmarks

**Ajustes:** subir el `.srt` como subtítulos.

**Comentario fijado:**
> Si tuvieras que dejar una parte de tu negocio en manos de un agente durante un año, ¿cuál sería? ¿Y qué medirías?
