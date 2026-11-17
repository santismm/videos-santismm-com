# EUREKA #09 (EN): AI vs 44 professions: does it win or tie against an expert? (GDPval)

- **Video:** `out/009-ai-vs-44-professions.mp4` (1080×1920, 30 fps, 57.2 s, -14 LUFS)
- **Cover:** `out/009-ai-vs-44-professions-portada.png` (frame at 5.4 s)
- **Subtitles:** `out/009-ai-vs-44-professions.srt`
- **Spanish original:** `videos/009-la-ia-frente-a-44-profesiones`

## Sources and caveats

- **Primary source:** OpenAI, [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks](https://arxiv.org/abs/2510.04374) (arXiv 2510.04374, 5-10-2025), and the post [Measuring the performance of our models on real-world tasks](https://openai.com/index/gdpval/) (25-9-2025).
  - **What it measures:** 1,320 tasks (30 per occupation) from **44 occupations** in the **top 9 sectors contributing to US GDP**. They include "Lawyers", "Registered Nurses" and "Accountants and Auditors" (Table 1 of the paper).
  - **Who wrote the tasks:** professionals with at least 4 years of experience and **14 years on average**.
  - **How it is graded:** experts from the same occupation blindly compare unlabeled deliverables (the human's and the model's) and pick the better one. The metric is the % of tasks where the model **wins or ties**. **50%** is the line of parity with the expert.
  - **Caveat:** the human expert grading was done on the **gold subset of 220 tasks** (open-sourced), not on all 1,320.
  - **Caveat:** the blinding is not perfect. The paper admits that style could give the model away (em dashes in OpenAI outputs, first-person phrasing in Claude's…).
- **2025 result (Figure 5 of the paper, gold subset):** Claude Opus 4.1, **47.6%**; GPT-5 high, 38.8%; GPT-4o, 12.4%. The paper says: "47.6% of deliverables by Claude Opus 4.1 were graded as better than (wins) or as good as (ties) the human deliverable". In the video, "almost 48%".
  - The post says Claude Opus 4.1 was "as good as or better than humans in just under half the tasks". Launch coverage ([TechCrunch](https://techcrunch.com/2025/09/25/openai-says-gpt-5-stacks-up-to-humans-in-a-wide-range-of-jobs), 25-9-2025) gives other figures from the same study: GPT-5 high, 40.6%; Claude Opus 4.1, 49%. The video uses the paper's.
- **Later results, all from the vendor itself (not independently verified):**
  - [GPT-5.2 announcement](https://openai.com/index/introducing-gpt-5-2/) (11-12-2025): "GPT‑5.2 Thinking beats or ties top industry professionals on **70.9%** of comparisons on GDPval knowledge work tasks, according to expert human judges". The model ran with "heavy" reasoning effort. In the video, "71%".
  - [GPT-5.5 announcement](https://openai.com/index/introducing-gpt-5-5/) (23-4-2026): "On GDPval… GPT‑5.5 scores **84.9%**". Its table row is "GDPval (wins or ties)", and GPT-5.4 scores 83.0%. In the video, "almost 85%".
  - The GPT-5.5 announcement does not say which subset or grading procedure it used. That is why the video labels it "the maker's own numbers".
- **Limitations stated in the paper itself (puzzle scene):**
  - "Tasks are precisely-specified and one-shot, not interactive". The full context is given in the prompt.
  - Physical work, tacit knowledge, personal data, proprietary software and communication between people are out of scope.
  - The post adds: "in the real world, tasks aren't always clearly defined with a prompt and reference files".
- **Thesis:** [The stopwatch and the exam](https://articles.santismm.com/the-stopwatch-and-the-exam/), section "Economic value": "The most honest benchmark is the job a professional gets paid to do."
- **Tracker:** [benchmarks.santismm.com](https://benchmarks.santismm.com), GDPval row.
- **Other figures from the same section of the article that the video does NOT use:** Vending-Bench (~17% of the human result; in the tracker, Vending-Bench 2 with Claude Opus 5, $11,181 vs ~$63,000, Andon Labs, 2026-07) and TheAgentCompany (~30% of workflows fully completed; in the tracker, Gemini 2.5 Pro / Claude 3.7 + OpenHands, CMU, 2025). They were not checked against their original sources.
- **Animation:** the 9 sector names, the three task conditions and the puzzle pieces summarize the paper. The tug-of-war is a visual metaphor. The knot positions match the figures cited.

> ⚠️ **Discrepancy found on santismm.com:** the article (a "June 2026 snapshot") says "Frontier systems win or tie on roughly **41%** of tasks, where 50% would be parity". The tracker's GDPval row repeats that 41% (human, 50%).
> - **It was not the best model even at launch.** The ~41% matches GPT-5 high (40.6% in launch coverage; 38.8% in the paper). The best model in 2025 was Claude Opus 4.1, with 47.6%.
> - **It was already outdated in June 2026.** OpenAI had published 70.9% (GPT-5.2 Thinking, Dec 2025) and 84.9% (GPT-5.5, Apr 2026), although these are vendor figures.
> - **The tracker mixes metrics.** The systems column of the GDPval row lists GDPval-AA Elo scores (Artificial Analysis, read 17-10-2026; e.g. Claude Opus 5.5 (Max) 1866), dated 2026-09. The source link points to anthropic.com/claude-opus-5-5, which does not back the 41%. The row's own note admits it: "The win/tie % cell (41) has not been refreshed since the GPT-5 era".
> - **What the video does:** it uses the original figures (47.6% in 2025, and 70.9% / 84.9% from the vendor) and does not mention the 41%.
> - **What should be fixed:** update the article and the tracker's % cell, or state which model and date the 41% refers to. GDPval-AA Elo is not comparable with the "wins or ties" %.

> ⚠️ **Before publishing,** turn on the AI-generated content label on every platform.

---

## YouTube Shorts

**Title:** `AI vs 44 professions: does it win or tie against an expert? #shorts`

**Description:**
> GDPval (OpenAI): 1,320 real tasks from 44 professions, written by experts with 14 years of experience on average. Another expert from the same field blindly compares the human deliverable with the AI's.
>
> In 2025, the best model (Claude Opus 4.1) won or tied on 47.6% of tasks; parity is 50%. Then OpenAI announced 70.9% (GPT-5.2 Thinking, Dec 2025) and 84.9% (GPT-5.5, Apr 2026): the vendor's own numbers.
>
> Caveat: well-defined tasks, with full context, one shot. A job is more than that.
>
> 📊 Benchmark tracker: https://benchmarks.santismm.com
> 📄 Article: https://articles.santismm.com/the-stopwatch-and-the-exam/
> 📑 Paper: https://arxiv.org/abs/2510.04374
>
> AI-generated voice and animation; script based on the work of Santi Santa María.
>
> #AI #artificialintelligence #GDPval

**Settings:** under "Altered or synthetic content", select "Yes". Upload the `.srt`.

## Instagram Reels

**Caption:**
> Can AI do your job better than you? ⚖️
>
> GDPval (OpenAI) tests 1,320 real tasks from 44 professions. Experts from the same field blindly compare the human deliverable with the AI's.
>
> • 2025: the best model won or tied on 47.6% (parity = 50%).
> • Dec 2025: 70.9%. Apr 2026: 84.9%. Careful: the maker's own numbers.
>
> But these are well-defined, one-shot tasks with full context. A job is much more.
>
> 📊 Every benchmark, with sources: benchmarks.santismm.com
> 📌 Save it · 📤 Send it to someone who still measures AI with exams
>
> AI-generated voice and animation, based on my work.

**Hashtags:** `#AI #artificialintelligence #futureofwork #genAI #benchmarks`

**Settings:** turn on the "AI info" label.

## TikTok

**Caption:**
> AI vs 44 professions: lawyers, nurses, accountants… who wins? ⚖️
> In GDPval, experts blindly compare a professional's work with the AI's. In 2025 AI won or tied 47.6% of the time. Now OpenAI says almost 85% (vendor's own number).

**Hashtags:** `#AI #artificialintelligence #futureofwork #learnontiktok #GDPval`

**Settings:** turn on "AI-generated content".

## LinkedIn

**Post:**
> "Does AI pass the exam?" is the wrong question.
>
> GDPval (OpenAI) puts AI up against 1,320 real tasks from 44 professions. An expert from the same field blindly compares the human deliverable with the AI's.
> • 2025: the best model won or tied on 47.6% (parity = 50%).
> • Dec 2025: 70.9%. Apr 2026: 84.9%. Vendor figures, not independently verified.
>
> Two caveats before drawing conclusions:
> 1. These are well-defined, one-shot tasks with full context. Finding the context, iterating with others and deciding what to do are left out.
> 2. A task is not a job.
>
> The useful question for your company: does it win or tie against an expert on YOUR tasks? The most honest benchmark is the job a professional gets paid to do.
>
> Every benchmark, with its sources: benchmarks.santismm.com 👇 (AI-generated video)
>
> #ArtificialIntelligence #FutureOfWork #Benchmarks

**Settings:** upload the `.srt` as captions.

**Pinned comment:**
> Which task from your job would you put into GDPval to see if AI wins or ties against you?
