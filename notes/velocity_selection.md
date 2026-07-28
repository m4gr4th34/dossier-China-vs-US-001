# Figure Vb — "Velocity" selection & rubric note

Figure Vb answers a question Figure Va does not: not *what environment* a founder
operates in (capital, exits, regime — that is Va), but **how fast things actually move**.
The prompt behind it: "as a founder it feels like China innovates faster — easier to
iterate, faster to market, more cutthroat." That intuition is real but **incomplete**, and
the figure's whole job is to show the incompleteness honestly.

## Status: OPEN-CAVEATED (a constructed comparison, not a measurement)

Every underlying number is real and sourced, but the **selection** of four dimensions, the
**pairing** of US-vs-China metrics, and the **framing** are authorial. Re-choose the metrics
and the picture shifts — so this is OPEN-CAVEATED, never asserted as "China is faster" or
"the US is faster." The honest one-line spine, stated on the figure:

> **China leads velocity in atoms** (deployment, hardware iteration, cutthroat selection);
> **the US leads velocity in bits and at the frontier.**

Neither triumphalist nor declinist. The figure hands a hostile reader the same four panels
to re-weight.

## Source-class key
`international-body` (IEA) · `consultancy` (AlixPartners, McKinsey) ·
`independent-research` (Epoch AI, UK AISI, US NIST/CAISI) · `journalistic-industry` ·
`Chinese-origin` (flagged; CAAM/CPCA/MIIT self-reported). **No dimension here clears the
achievement-ledger ESTABLISHED bar** — these are trend metrics from mostly journalistic /
consultancy sources, not dateable achievements, so Fig Vb contributes **no ledger rows**. It
is a context figure, like the SIPRI/GERD strips in Figures III–IV.

## Panel A — DEPLOYMENT (atoms vs bits) · plotted: `deploy_ev.csv`
Electric-car share of new-car sales, US vs China, 2020–2024 (BEV+PHEV, IEA "electric car
share" framing for cross-country comparability). China ~6% → ~45%; US ~2% → ~10% (and
*falling* in 2025 after the US federal EV credit expired). Source: **IEA Global EV Outlook
2025** (`international-body`).
- **Caveat — denominator:** China's share is quoted anywhere from 40.9% (CAAM, all vehicles)
  to ~50% (CPCA, passenger retail, individual months); the plotted ~45% is the IEA car-sales
  figure. Show it as a range in prose; the *direction* (China 4-5× the US slope) holds under
  every denominator.
- **Atoms annotations (China leads), sourced in-panel:** +277 GW solar added in 2024 (US ~50
  GW) — NEA/SEIA, unit AC vs DC flagged; ~48,000 km high-speed rail vs ~0 km true US HSR —
  NRA/independent.
- **Bits annotations (US leads), sourced in-panel:** ChatGPT reached ~100M users in ~2 months
  (fastest-scaling consumer app on record; `journalistic-industry`, estimate); US hyperscaler
  AI capex ~$350B+ in 2025 vs China's entire AI-cloud market ~$7B (Omdia; not
  perfectly-comparable capex-vs-revenue, but two orders of magnitude).

## Panel B — ITERATION CADENCE · plotted: `iterate.csv`
Two "months, lower = better" bars that carry the two-sided story:
- **new-model dev cycle:** China ~20 months vs legacy/global ~40 months — **AlixPartners /
  McKinsey** (`consultancy`). China ships **~2× faster**. (Corroborating: BYD had ~38 new
  model approvals to Oct 2025 vs Volkswagen 6, Tesla 3 — `journalistic-industry` on MIIT
  approval data; note "approvals" mix trims/variants, a looser unit than clean-sheet models.)
- **frontier-capability lag:** US 0 (sets the frontier) vs China ~6 months behind — midpoint
  of three **independent-research** trackers that agree the best Chinese/open models trail the
  US closed frontier: Epoch AI ~4 mo, UK AISI 4–7 mo, US NIST/CAISI ~8 mo (DeepSeek's own
  self-report: 3–6 mo — shown as the low end). The gap is real and *narrowing*; the Chinese
  play is a fast, cheap **follow**, not frontier-definition.
- The panel's point: **cadence of iteration (China) is a different axis from cadence of the
  frontier (US).** "Ships more often" ≠ "sets the frontier."

## Panel C — TIME-TO-SCALE · plotted: `timescale.csv` (exemplar dots, NOT a line)
Years from founding to a $1B/scale milestone, plotted as **labelled exemplar dots**, because
**no honest paired US-vs-China median exists**: CB Insights gives China ~6.1 yr avg time-to-
unicorn but leaves the matching US number unquantified, so any "X vs Y" headline would be
vendor-cherry-picked. Shown deliberately as scattered exemplars with that caveat visible:
- **China 2010s consumer-internet cohort scaled fast:** Xiaomi ~1.5 yr, DiDi ~2 yr, Pinduoduo
  ~3 yr to IPO. **But the narrative inverts:** SHEIN took ~11 yr (slow-burn), and the **US
  2023–25 AI cohort is now the fastest in the set** — xAI ~$0→$24B in ~14 months, Anthropic
  founding→$60B+ in ~4 yr. All `journalistic-industry` / vendor / company-reported; unicorn
  "dates" are fuzzy private-round markups, several inferred (flagged). **Do not read a country
  winner off this panel** — that is the point.

## Panel D — CUTTHROAT / SELECTION INTENSITY · plotted: `cutthroat.csv`
Chinese EV-brand shakeout as the "involution" (内卷) signature: ~**487** registered makers
(2018 peak, Jalopnik/IEA — "registered" is loose, includes shells) → ~**129** brands (2025) →
analyst-projected ~**15** financially viable by 2030 (**AlixPartners**, `consultancy`;
McKinsey says "<50"; forecast, not fact — marked as forecast on the figure). Only **3** makers
were profitable in 2025 (BYD, Xiaomi, Leapmotor).
- **US contrast annotation:** hot US sectors concentrate *early* into 1–2 winners — Uber+Lyft
  ~99% of US ride bookings, Google ~90% of US search — vs China's hundred-way brawl then late
  violent consolidation.
- **Cuts both ways (annotation):** the same selection forged genuine global champions (BYD,
  CATL, DJI) **and** is now diagnosed as capital-destroying — the EV price war wiped ~$69B of
  industry revenue (2023–25), China PPI ran negative ~35 consecutive months, and Beijing
  itself launched a 2025 "anti-involution" (反内卷) campaign. The figure does **not** adjudicate
  cutthroat = good or bad.

## Verification
`verify_numbers.py`: each plotted panel series (`deploy_ev`, `iterate`, `timescale`,
`cutthroat`) equals its committed CSV exactly. The annotation numbers (solar GW, HSR km,
ChatGPT, AI capex, frontier-lag range, involution cost, US concentration) are documented here
with sources and rendered as sourced captions, not plotted series.
