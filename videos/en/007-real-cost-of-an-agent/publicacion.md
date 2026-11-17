# EUREKA #07 (EN): What does an AI agent really cost? (cost per outcome)

- **Video:** `out/007-real-cost-of-an-agent.mp4` (1080×1920, 30 fps, 50.0 s, -14 LUFS)
- **Cover:** `out/007-real-cost-of-an-agent-portada.png` (frame at 29.1 s)
- **Subtitles:** `out/007-real-cost-of-an-agent.srt`
- **Spanish original:** `videos/007-cuanto-cuesta-una-tarea`

## Sources and caveats

- **Data:** the Agent Economics calculator at [labs.santismm.com/agent-economics](https://labs.santismm.com/agent-economics) (SANTISMM Labs; the calculator UI is in Spanish only, "Economía real de un agente"), **Support** scenario with the default assumptions, checked on 13-11-2026 and re-checked on 14-11-2026.
  - **Volume and time:** 10,000 cases a month, 8 min per case by hand, and €38/h.
  - **Cost per attempt:** 2,200 input tokens and 450 output tokens at €2 and €10 per million, plus €0.003 in tools, i.e. **€0.0119** (≈1.2 cents).
  - **Quality:** +12% retries (11,200 attempts) and 86% success (8,600 correct, 1,400 failures).
  - **Oversight:** 25% of cases are reviewed at 3 min each, and each failure costs 6 min of rework.
- **Monthly result:**
  - Model and tools, **€133**; supervision, **€4,750**; rework, **€5,320**. Total, **€10,203** (€1.02 per resolved case).
  - The manual process would cost **€50,667**, so the saving is about €40,463.
  - "1%" and "99%" come from 133 / 10,203 = 1.3%.
  - Note: the calculator also shows a separate metric, "cost per correct AI outcome" (€0.5678), which includes execution and supervision but excludes rework. The video's "≈ €1.02 per resolved case, all-in" is the calculator's total monthly cost divided by the 10,000 cases.
- **It is an illustrative example:** the calculator itself calls it "an economic estimate, not an ROI promise" ("una estimación económica, no una promesa de ROI"). It does not include implementation, integration, observability, evaluation, compliance or incidents.
- **Thesis:** [santismm.com/en](https://santismm.com/en): "Cost per outcome will decide which agents survive." The calculator's tagline is "Coste por resultado, no por token" ("cost per outcome, not per token"). The article [The stopwatch and the exam](https://articles.santismm.com/the-stopwatch-and-the-exam/) says "Price per successful task, not per token or per benchmark point."

> ⚠️ **Discrepancy found on santismm.com:** "The stopwatch and the exam" says comparable agentic runs range "from a few cents to around 87 dollars **per task**".
> - The figure comes from the CORE-Bench (Hard) row of the tracker, "Claude Code + Claude Opus 4.5 ($87/run)".
> - On [HAL](https://hal.cs.princeton.edu/corebench_hard), $87.16 is the **total cost of the whole run** ("Total API cost for running the agent on all tasks"), and the public set has 45 tasks.
> - HAL also warns (5-10-2026) that some costs are inflated ×2.
> - That is why the video does not use that figure. "Per task" should be corrected to "per full run" in the article (Spanish and English versions).

> ⚠️ **Before publishing,** turn on the AI-generated content label on every platform.

---

## YouTube Shorts

**Title:** `What does an AI agent really cost? The model is just 1% #shorts`

**Description:**
> Support example with 10,000 cases a month (default assumptions of the Agent Economics calculator): model and tools, ~€133; human supervision, €4,750; rework of failures, €5,320. Total, ~€10,200/month vs ~€50,700 for the manual process.
>
> The model is ~1% of the cost. The metric that matters is cost per correct outcome, not price per token.
>
> 🧮 Calculator (Spanish UI): https://labs.santismm.com/agent-economics
> 🌐 https://santismm.com/en
>
> Illustrative estimate, not an ROI promise. AI-generated voice and animation; script based on the work of Santi Santa María.
>
> #AI #aiagents #artificialintelligence

**Settings:** under "Altered or synthetic content", select "Yes". Upload the `.srt`.

## Instagram Reels

**Caption:**
> What does an AI agent really cost? 🧊
>
> In a support example (10,000 cases a month): model and tools, €133. Human supervision, €4,750. Rework of failures, €5,320.
>
> The model is the tip of the iceberg. It still beats the manual process, but only if you measure cost per correct outcome.
>
> 🧮 Run your own numbers at labs.santismm.com
> 📌 Save it · 📤 Send it to whoever approves your AI budget
>
> AI-generated voice and animation, based on my work.

**Hashtags:** `#AI #artificialintelligence #aiagents #digitaltransformation #business`

**Settings:** turn on the "AI info" label.

## TikTok

**Caption:**
> Your AI agent costs 1 cent per attempt… but the model is only 1% of the cost 🧊💶
> The other 99% is human supervision and rework. Compare cost per correct outcome, not price per token.

**Hashtags:** `#AI #aiagents #artificialintelligence #business #learnontiktok`

**Settings:** turn on "AI-generated content".

## LinkedIn

**Post:**
> Price per token is the tip of the iceberg.
>
> In the support example of my Agent Economics calculator (10,000 cases a month, 86% success, 12% retries and 25% of cases reviewed):
> • Model and tools: €133/month
> • Human supervision: €4,750/month
> • Rework of failures: €5,320/month
>
> The model is ~1% of the cost. Even so, against ~€50,700 for the manual process, the case holds up.
>
> The takeaway for any agent business case: measure cost per correct outcome, with retries, supervision and failures included. Cost per outcome will decide which agents survive.
>
> Run your own numbers: labs.santismm.com/agent-economics 👇 (AI-generated video)
>
> #ArtificialIntelligence #AIAgents #BusinessCase

**Settings:** upload the `.srt` as captions.

**Pinned comment:**
> Which line weighs most in your case: supervision, rework or the model itself?
