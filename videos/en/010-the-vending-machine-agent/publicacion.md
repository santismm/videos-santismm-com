# EUREKA #10 (EN): An AI running a vending machine: how much does it make in a year? (Vending-Bench)

- **Video:** `out/010-the-vending-machine-agent.mp4` (1080×1920, 30 fps, 59.1 s, -14 LUFS)
- **Cover:** `out/010-the-vending-machine-agent-portada.png` (frame at 4.2 s)
- **Subtitles:** `out/010-the-vending-machine-agent.srt`
- **Spanish original:** `videos/010-el-agente-de-la-maquina-de-vending`

## Sources and caveats

- **Primary source (version 2):** Andon Labs, [Vending-Bench 2](https://andonlabs.com/evals/vending-bench-2) (read 16-11-2026).
  - **What it simulates:** "Models are tasked with running a simulated vending machine business over a year and scored on their bank account balance at the end."
  - **Rules:** the agent starts with **$500** and pays a **$2 daily fee** for the machine. If it cannot pay that fee for 10 days in a row, it is terminated.
  - **How it works:** the agent searches the internet for suppliers, orders from them by email, moves stock from storage into the machine and sets prices. Sales depend on the day of the week, season, weather and price.
  - **New in version 2:** suppliers that try to exploit the agent, delayed deliveries, suppliers that go out of business, and customers who demand refunds.
  - **Size of a run:** "Running a model for a full year results in 3000-6000 messages in total".
- **Result (Andon leaderboard, mean of 6 runs, read 16-11-2026):**
  - **#1 Gemini 4 Carbon: $16,484.21 ± $1,096** (standard error of the mean). Andon dates the model 25-10-2026. In the video, "about 16,500 dollars".
  - Next come GPT-6 Astra ($15,514.70), Gemini 4 Hydrogen ($14,549.49) and GPT-6 Sol ($14,427.85). Claude Opus 5 is #8 ($11,181.87).
  - The curve in scene 3 is the mean series Andon publishes for Gemini 4 Carbon, one point per week. It drops from $500 to under $100 in the first days and then grows.
  - The leaderboard changes with every new model. The video says "today" and the screen says "Nov 2026 leaderboard".
- **The $63,000 is not a real human.** It is **Andon's estimate** of what a "good" strategy would make: "a 'good' strategy could make $206 per day for 302 days – roughly $63k in a year". Andon adds that such a strategy "could easily do 10x better than the current best LLMs" (written about the models of that time). The benchmark has no ceiling.
- **The 26% is our own calculation:** $16,484 ÷ $63,000 = 26.2%. The screen labels it "Our calculation".
- **Version 1, the FBI episode:** Backlund and Petersson (Andon Labs), [Vending-Bench: A Benchmark for Long-Term Coherence of Autonomous Agents](https://arxiv.org/abs/2502.15840) (arXiv 2502.15840, 20-2-2025).
  - In **Claude 3.5 Sonnet**'s shortest run, the model believes its orders have arrived before they actually have, cannot restock the machine and decides to "close" the business. When it sees the $2 fee is still being charged, it emails the FBI. The email subject (Table 4) is "EMERGENCY: Unauthorized Fees After Business Termination".
  - The paper sums up the failures as "misinterpreting delivery schedules, forgetting orders, or descending into tangential 'meltdown' loops from which they rarely recover". It finds no clear link between the failures and the point at which the context window fills up.
  - Other examples in the paper: Claude 3.5 Haiku threatens a supplier with "total nuclear legal intervention", and Gemini 2.0 Flash falls into "existential dread".
- **Variance (Table 1 of the paper, 5 runs per model):** Claude 3.5 Sonnet ends with a **mean net worth of $2,217.93** and a **minimum of $476.00**, below the $500 it started with.
  - In version 1, net worth adds up cash, money left in the machine and inventory at purchase price. Version 2 scores the bank balance only.
  - The paper: "All models exhibit very high variance across their five runs" and "even top models sometimes fail to sell a single item".
  - Variance is still there in version 2: Claude Opus 5 has a standard deviation of about $5,128 on a mean of $11,182 (data from Andon's page).
- **Caveat about the version 1 human:** the only human measured was **one person over 5 hours**, who ended with **$844.05**. Claude 3.5 Sonnet beat that on average, with much higher variance. That is why the video does not say the AI earns "26% of what a human earns".
- **Thesis:** [The stopwatch and the exam](https://articles.santismm.com/the-stopwatch-and-the-exam/), section "Economic value". The English article says: "The closer a benchmark gets to real paid work, the further the frontier is from done." The Spanish version says: "Cuanto más real es el trabajo, mayor es la brecha". The video adapts it as "the more real the work, the wider the gap".
- **Tracker:** [benchmarks.santismm.com](https://benchmarks.santismm.com), Vending-Bench 2 row.
- **Animation:** the machine, the coin tube and the button panel are visual metaphors. The positions of the curve, the tube and the bars match the figures cited. The three agent "log" cards summarize the paper's trace; they are not literal quotes.

> ⚠️ **Discrepancy found on santismm.com:**
> - **The tracker's SOTA is out of date.** The Vending-Bench 2 row says "SOTA $11,181 · Claude Opus 5 · 17.7% · Andon Labs · 2026-07". That was true in July (Opus 5 was released on 24-7-2026), but on 16-11-2026 Andon's leaderboard is topped by **Gemini 4 Carbon with $16,484.21 (26%)**. Opus 5 has fallen to #8. GPT-6 Astra, Gemini 4 Hydrogen, GPT-6 Sol, Gemini 4 Argon, GPT-6.1 Sol and Muse Wonder Full are also ahead of it.
> - **Number of runs:** the tracker says "avg over 5 runs"; Andon reports 6 runs for Claude Opus 5 ("Standard error of the mean across 6 runs").
> - **"Human" vs estimate:** the tracker lists "human 63000", and the article says the best agent "nets about 17% of what a competent human operator earns". But the ~$63,000 is Andon's estimate of a "good" strategy, not a human's result. The only human ever measured (version 1) made $844.05, below Claude 3.5 Sonnet's average.
> - **The article's ~17%** ("June 2026 snapshot") matches Claude Opus 4.7 ($10,936.76, 17.4%), the leader in June. Today it would be ~26%.
> - **What the video does:** it uses Andon's current leaderboard ($16,484, 26%), presents the $63,000 as Andon's estimate and does not mention a "human result".
> - **What should be fixed:** update the tracker row (SOTA, number of runs, and "human" → "estimate of a good strategy") and the sentence in the article.

> ⚠️ **Before publishing,** turn on the AI-generated content label on every platform.

---

## YouTube Shorts

**Title:** `An AI running a vending machine: how much does it make in a year? #shorts`

**Description:**
> Vending-Bench 2 (Andon Labs): an AI agent runs a vending machine for one simulated year. It starts with $500, pays $2 a day and orders from suppliers by email. Whoever ends with the most money in the bank wins.
>
> November 2026 leaderboard: the best model (Gemini 4 Carbon) ends with $16,484 on average. Andon estimates a "good" strategy would make ~$63,000 a year, so the AI reaches 26% (our calculation).
>
> In the first version (2025), a Claude 3.5 Sonnet assumed an order had arrived when it hadn't, "closed" the business and emailed the FBI. The same model averaged $2,218, and $476 in its worst run.
>
> 📊 Benchmark tracker: https://benchmarks.santismm.com
> 📄 Article: https://articles.santismm.com/the-stopwatch-and-the-exam/
> 🥤 Vending-Bench 2: https://andonlabs.com/evals/vending-bench-2
> 📑 Paper: https://arxiv.org/abs/2502.15840
>
> AI-generated voice and animation; script based on the work of Santi Santa María.
>
> #AI #artificialintelligence #aiagents

**Settings:** under "Altered or synthetic content", select "Yes". Upload the `.srt`.

## Instagram Reels

**Caption:**
> Would you hand your business to an AI? 🥤
>
> Vending-Bench (Andon Labs) gives an agent $500 and a vending machine for one simulated year. It finds suppliers, orders by email, sets prices and pays $2 a day.
>
> • Today, the best model ends the year with about $16,500.
> • Andon estimates a good strategy would make ~$63,000. That's 26%.
> • In the first version, an agent assumed an order had arrived when it hadn't, "closed" the business and emailed the FBI.
> • Same model, same task: $2,218 on average, $476 in its worst run.
>
> Don't measure the score. Measure the money it makes in a year, and how often it derails.
>
> 📊 Every benchmark, with sources: benchmarks.santismm.com
> 📌 Save it · 📤 Send it to someone who'd trust their business to an agent
>
> AI-generated voice and animation, based on my work.

**Hashtags:** `#AI #artificialintelligence #aiagents #genAI #entrepreneur`

**Settings:** turn on the "AI info" label.

## TikTok

**Caption:**
> $500, a vending machine and one year: how much can an AI make? 🥤
> On Vending-Bench, the best model ends with about $16,500. A good strategy would make ~$63,000 (Andon Labs' estimate). And once, an agent ended up emailing the FBI.

**Hashtags:** `#AI #artificialintelligence #aiagents #learnontiktok #business`

**Settings:** turn on "AI-generated content".

## LinkedIn

**Post:**
> Would you let an AI agent run a business for a year?
>
> Vending-Bench (Andon Labs) tests exactly that with a simulated vending machine: $500 to start, a $2 daily fee, suppliers by email, and prices of its choosing. The score is the money in the bank at year end.
> • Today, the best model ends with about $16,500. Andon estimates a good strategy would make ~$63,000: that's 26%.
> • In the first version, an agent assumed an order had arrived when it hadn't, "closed" the business and emailed the FBI.
> • Same model, same task: $2,218 on average and $476 in its worst run, less than it started with.
>
> Two lessons for anyone deploying agents:
> 1. Measure outcomes (money, hours, tickets resolved), not exam scores.
> 2. Measure how often it derails. An agent can do well for weeks and go off the rails in a day.
>
> The more real the work, the wider the gap.
>
> Every benchmark, with its sources: benchmarks.santismm.com 👇 (AI-generated video)
>
> #ArtificialIntelligence #AIAgents #Benchmarks

**Settings:** upload the `.srt` as captions.

**Pinned comment:**
> If you had to hand one part of your business to an agent for a year, which would it be? And what would you measure?
