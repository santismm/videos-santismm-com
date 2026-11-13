# EUREKA #07: ¿Cuánto cuesta de verdad un agente de IA? (coste por resultado)

- **Vídeo:** `out/007-cuanto-cuesta-una-tarea.mp4` (1080×1920, 30 fps, 54,7 s, -14 LUFS)
- **Portada:** `out/007-cuanto-cuesta-una-tarea-portada.png`
- **Subtítulos:** `out/007-cuanto-cuesta-una-tarea.srt`

## Fuentes y matices

- **Datos:** calculadora [Economía real de un agente](https://labs.santismm.com/agent-economics) (SANTISMM Labs), escenario **Soporte** con los supuestos por defecto, comprobados el 13-11-2026.
  - **Volumen y tiempos:** 10.000 casos al mes, 8 min por caso a mano y 38 €/h.
  - **Coste por intento:** 2.200 tokens de entrada y 450 de salida a 2 y 10 €/M, más 0,003 € de herramientas, es decir, **0,0119 €** (≈1,2 céntimos).
  - **Calidad:** +12 % de reintentos (11.200 intentos) y 86 % de éxito (8.600 correctos y 1.400 fallos).
  - **Supervisión:** se revisa el 25 % de los casos a 3 min cada uno, y cada fallo cuesta 6 min de retrabajo.
- **Resultado mensual:**
  - Modelo y herramientas, **133 €**; supervisión, **4.750 €**; retrabajo, **5.320 €**. Total, **10.203 €** (1,02 € por caso resuelto).
  - El proceso manual costaría **50.667 €**, así que el ahorro es de unos 40.463 €.
  - "1 %" y "99 %" salen de 133 / 10.203 = 1,3 %.
- **Es un ejemplo ilustrativo:** la propia calculadora lo llama "una estimación económica, no una promesa de ROI". No incluye implantación, integración, observabilidad, evaluación, cumplimiento ni incidentes.
- **Tesis:** [santismm.com](https://santismm.com/es): "El coste por resultado decidirá qué agentes sobreviven". El lema de la calculadora es "Coste por resultado, no por token". El artículo dice "Calcula el coste por tarea resuelta, no por token o punto".

> ⚠️ **Discrepancia detectada en santismm.com:** "El cronómetro y el examen" dice que las ejecuciones comparables cuestan "desde unos céntimos hasta cerca de 87 dólares **por tarea**".
> - La cifra viene de la fila de CORE-Bench (Hard) del tracker, "Claude Code + Claude Opus 4.5 ($87/run)".
> - En [HAL](https://hal.cs.princeton.edu/corebench_hard), 87,16 $ es el **coste total de toda la ejecución** ("Total API cost for running the agent on all tasks"), y el conjunto público tiene 45 tareas.
> - Además, HAL avisa (5-10-2026) de que algunos costes están inflados ×2.
> - Por eso el vídeo no usa esa cifra. Conviene corregir "por tarea" por "por ejecución completa" en el artículo.

> ⚠️ **Antes de publicar,** activa la etiqueta de contenido generado con IA en cada plataforma.

---

## TikTok

**Texto:**
> Tu agente de IA cuesta 1 céntimo por intento… pero el modelo es solo el 1 % del coste 🧊💶
> El 99 % es supervisión y retrabajo humano. Compara el coste por resultado correcto, no el precio por token.

**Hashtags:** `#inteligenciaartificial #agentesIA #negocios #aprendeentiktok #IA`

**Ajustes:** activar "Contenido generado por IA".

## Instagram Reels

**Texto:**
> ¿Cuánto cuesta de verdad un agente de IA? 🧊
>
> En un ejemplo de soporte (10.000 casos al mes): modelo y herramientas, 133 €. Supervisión humana, 4.750 €. Retrabajo de fallos, 5.320 €.
>
> El modelo es la punta del iceberg. Aun así sale a cuenta frente al proceso manual, pero solo si mides el coste por resultado correcto.
>
> 🧮 Haz tu cuenta en labs.santismm.com
> 📌 Guárdalo · 📤 Envíaselo a quien aprueba el presupuesto de IA
>
> Voz y animación generadas con IA a partir de mis contenidos.

**Hashtags:** `#inteligenciaartificial #transformaciondigital #negocios #IAgenerativa #tecnologia`

**Ajustes:** activar la etiqueta "Información de IA".

## YouTube Shorts

**Título:** `¿Cuánto cuesta de verdad un agente de IA? El modelo es solo el 1% #shorts`

**Descripción:**
> Ejemplo de soporte con 10.000 casos al mes (supuestos por defecto de la calculadora "Economía real de un agente"): modelo y herramientas, ~133 €; supervisión humana, 4.750 €; retrabajo de fallos, 5.320 €. Total, ~10.200 €/mes frente a ~50.700 € del proceso manual.
>
> El modelo es ~1 % del coste. La métrica que importa es el coste por resultado correcto, no el precio por token.
>
> 🧮 Calculadora: https://labs.santismm.com/agent-economics
> 🌐 https://santismm.com
>
> Estimación ilustrativa, no una promesa de ROI. Voz y animación generadas con IA; guion basado en el trabajo de Santi Santa María.
>
> #inteligenciaartificial #agentesIA #negocios

**Ajustes:** en "Contenido alterado o sintético", marcar "Sí". Subir el `.srt`.

## LinkedIn

**Texto:**
> El precio por token es la punta del iceberg.
>
> En el ejemplo de soporte de mi calculadora "Economía real de un agente" (10.000 casos al mes, 86 % de acierto, 12 % de reintentos y un 25 % de casos revisados):
> • Modelo y herramientas: 133 €/mes
> • Supervisión humana: 4.750 €/mes
> • Retrabajo de fallos: 5.320 €/mes
>
> El modelo es ~1 % del coste. Aun así, frente a ~50.700 € del proceso manual, el caso cierra.
>
> Moraleja para cualquier business case de agentes: medid el coste por resultado correcto, con reintentos, supervisión y fallos incluidos. El coste por resultado decidirá qué agentes sobreviven.
>
> Haz tu propia cuenta: labs.santismm.com/agent-economics 👇 (vídeo generado con IA)
>
> #InteligenciaArtificial #AgentesIA #BusinessCase

**Ajustes:** subir el `.srt` como subtítulos.

**Comentario fijado:**
> ¿Qué partida pesa más en tu caso: supervisión, retrabajo o el propio modelo?
