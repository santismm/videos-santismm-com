# EUREKA #03 (EN): Works once ≠ works always (pass^k)

- **Video:** `out/003-once-is-not-always.mp4` (1080×1920, 30 fps, 52.0 s, -14 LUFS)
- **Cover:** `out/003-once-is-not-always-portada.png`
- **Subtitles:** `out/003-once-is-not-always.srt`
- **Spanish original:** `videos/003-una-vez-no-es-siempre/`

## Sources and caveats

**Base article:** [The Stopwatch and the Exam](https://articles.santismm.com/the-stopwatch-and-the-exam/) ([Spanish version](https://articles.santismm.com/el-cronometro-y-el-examen/)).
- It defines pass^k as "the probability of succeeding on all k attempts".
- It says that on τ-bench "pass^1 sits well above pass^4, which means agents that look competent once are inconsistent under repetition".
- Its recommendation: "Demand pass^k and a failure audit: what happens when it fails, and is that recoverable?"

**τ-bench** ([Yao et al., 2024, arXiv 2406.12045](https://arxiv.org/abs/2406.12045)):
- Top agents in 2024 (such as gpt-4o) "succeed on <50% of the tasks" and "pass^8 <25% in retail".
- The video presents this as "the best agents of 2024" and labels the second figure "retail" on screen.
- Current models score higher: the tracker shows 70% on tau-bench (2026-06). The consistency lesson still holds.

**90% → 43% (0.9⁸ ≈ 0.43)** is an **illustrative math example**, labeled as such on screen. It is not a measurement of any model, and it assumes independent attempts.

**"An exam scores an answer; an agent, a path":** this is the article's idea ("An exam scores an answer. An agent benchmark scores a trajectory").

> ⚠️ **Before publishing,** turn on the AI-generated content label on every platform.

---

## YouTube Shorts

**Title:** `Your AI nailed the demo… what about the next 8? #shorts`

**Description:**
> An AI agent getting it right once doesn't mean it gets it right every time. If it's right 90% of the time, getting it right 8 times in a row drops to 43% (illustrative example: 0.9⁸).
>
> On τ-bench (customer service with tools), the best agents of 2024 succeeded on less than 50% of tasks, and 8 times in a row, less than 25% (retail scenario).
>
> Before you buy an agent, ask about pass^k and about what happens when it fails.
>
> 📖 Article: https://articles.santismm.com/the-stopwatch-and-the-exam/
> 📄 τ-bench: https://arxiv.org/abs/2406.12045
> 📊 Benchmark tracker: https://benchmarks.santismm.com
>
> AI-generated voice and animation; script based on the work of Santi Santa María.
>
> #AI #artificialintelligence #aiagents

**Settings:** under "Altered or synthetic content", select "Yes". Upload the `.srt`.

## Instagram Reels

**Caption:**
> Works once ≠ works always. 🔁
>
> AI leaderboards usually measure whether an agent gets it right once. But in a business, you need it to get it right every time. On τ-bench, the best agents of 2024 succeeded less than 50% of the time… and 8 times in a row, less than 25%.
>
> 📌 Save it for your next vendor demo
> 📤 Send it to someone who's about to buy an agent
>
> More at santismm.com · AI-generated voice and animation based on my articles.

**Hashtags:** `#AI #artificialintelligence #aiagents #generativeai #tech`

**Settings:** turn on the "AI info" label.

## TikTok

**Caption:**
> Your AI agent nailed the demo… what about the next 8? 🎯
> 90% accuracy, repeated 8 times in a row, drops to 43%. That's why pass^k matters in production, not pass@1.

**Hashtags:** `#AI #artificialintelligence #aiagents #learnontiktok #tech`

**Settings:** turn on "AI-generated content".

## LinkedIn

**Post:**
> A demo is once. Production is always.
>
> Most AI leaderboards measure whether an agent gets it right once (pass@1). But if you're going to put it in front of customers or let it move data, what matters is that it gets it right every time (pass^k).
>
> The arithmetic is unforgiving: at 90% success per attempt, chaining 8 successes in a row drops to 43%. And on τ-bench, the best agents of 2024 succeeded on less than 50% of tasks and, 8 times in a row, less than 25%.
>
> My advice for any agent purchase: demand pass^k over multiple trials and a failure audit. What happens when it fails, and can it recover?
>
> In 60 seconds 👇 (AI-generated video based on my article "The Stopwatch and the Exam").
>
> #ArtificialIntelligence #AIAgents #ResponsibleAI

**Settings:** upload the `.srt` as captions.

**Pinned comment:**
> How many times in a row would an agent have to get it right before you'd put it in production?
