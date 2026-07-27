```
╔══════════════════════════════════════════════════════════════════════════╗
║  RUBRIC v1 — LIVE (OPEN-CAVEATED)                                          ║
║  This document SPECIFIES the momentum-scoring layer, which is now BUILT    ║
║  and RUN: scoring/compute_index.py -> scoring/index_output.json -> the     ║
║  baked chart on the front door. Every output is OPEN-CAVEATED: a real      ║
║  computation over real (ESTABLISHED) data under an AUTHORIAL rubric. No    ║
║  projections are produced here (those are EXPLORATORY-CONJECTURE, §6).     ║
╚══════════════════════════════════════════════════════════════════════════╝
```

# Momentum-scoring rubric — RUBRIC v1

The scoring layer turns the verified achievement corpus (`claim_ledger.csv`) into
the dossier's per-decade comparative "momentum" chart. This document specifies
*how it works* so the rubric can be reviewed and attacked. It is the honest
separation the constitution demands: the documented **achievement ledger**
(ESTABLISHED facts) is one thing; the **constructed momentum index** built on top
of it is a different thing, and it wears a different label.

**Status of the whole layer: OPEN-CAVEATED.** It is a real computation over real
(verified) data, but the *rubric* — which categories/event-types count how much,
how decades are normalized — is an **authorial construction**. It is true only
within its stated scope (this rubric, these weights); a hostile reader re-weighting
it gets a different chart, and that is by design (§4). It is **never** a measured
verdict, and "momentum favours X" is never asserted as a fact — only ever as an
inference from a *named* weighting, shown against the alternatives, under the
OPEN-CAVEATED label.

**Implementation:** `scoring/compute_index.py` (deterministic; reads the ledger +
the draft for excluded-row identities + `scoring/weights.json`) emits
`scoring/index_output.json` and the static SVG chart baked into the front door.
`verification/verify_numbers.py` recomputes the index from the ledger and asserts
the committed JSON, caption, and SVG match exactly — the same lockstep discipline
every other number in the dossier is held to. (Because the baked console reads the
verifier and the verifier's caption/SVG check reads `index.html`, re-render to
fixpoint: run `render-edition` until `check-edition` is clean — two passes.)

---

## 1. The gate (RUBRIC v1, Option C — author-approved)

**Every decade scores on its ESTABLISHED rows only.** A non-ESTABLISHED row
(OPEN-UNVERIFIED or REPORTED) is **excluded from the primary series** — it is not
an established fact and must not launder itself into a momentum number — and is
**NAMED in the chart caption, with the exclusion's direction of bias stated.**

This replaces the earlier all-or-nothing gate ("no decade may be scored while it
holds any OPEN-UNVERIFIED row"), which kept the whole chart dark. Option C lets the
chart exist *and* stay honest: the reader sees every decade, sees exactly which
rows were left out, and sees which way that omission tilts the bar.

**Currently excluded** (both China, both in **1946–1955**):
- **CN-1952-1** — Chengdu–Chongqing Railway (OPEN-UNVERIFIED; no independent
  non-PRC source yet).
- **CN-1952-2** — 1952 output-recovery figure (REPORTED; interested-party magnitude).

Both are China rows, so **their exclusion UNDERSTATES China in 1946–1955.** The
chart carries this as an exclusion whisker on that decade (§7a) and names both rows
in the caption. When CN-1952-1 is eventually sourced, its exclusion retires and the
1946–1955 correction folds into the bar.

## 2. The core computation (per-decade weighted counts)

For each decade *D* and country *c*:

```
raw_score(c, D) = Σ over ESTABLISHED rows r of country c in decade D of  W[key(r)]
```

where `key(r)` is the row's **category** (weightings W0–W2) or its **event_type**
(weighting W3), and `W[...]` is the published weight (§3). Decades are the ten
**1926-anchored** 10-year bins (1926–1935 … 2016–2025); 2026 has no rows and opens
no new bin. Rows with `year_precision` of `circa`/`range` count in their anchored
year, as the verification ritual confirmed. Only ESTABLISHED rows enter the count.

## 3. The published weight tables (`scoring/weights.json`)

Published, versioned, challengeable — publishing them *is* the honesty. Baseline is
deliberately a pure count so departures are visible.

| weighting | up-weighted | structurally favours | tuning rationale |
|---|---|---|---|
| **W0 baseline** | none (all 1.0) | ~neutral (pure count) | the null to measure departures against |
| **W1 frontier-forward** | innovation, science ×1.5 | **US** (invention/innovation-heavy) | tests "does weighting invention flip it US?" |
| **W2 build-and-develop** | infrastructure, industrial, social, governmental_economic ×1.5 | **China** (built-works/reform/social-heavy) | tests "does weighting development flip it China?" |
| **W3 event-type frontier** | discovery, invention, founding ×1.5 (by `event_type`) | US-leaning cross-check | tests robustness to *how* "counts as an achievement" is operationalized |

The set includes **one weighting tuned to favour each country** (W1 → US, W2 →
China), so the reader sees directly that the rubric — not the data — picks any
"winner."

## 4. Uncertainty display — TWO layers, both scenario ranges

The chart is **never shown under one weighting alone**, and the uncertainty it
displays is labeled as **scenario ranges, NEVER confidence intervals.** These are
not statistical error bars; there is no sampling distribution. They are the range
of answers you get by making different *defensible construction choices* (which
rows to trust, how to weight categories). Two layers:

- **(a) Exclusion bounds** — per affected decade, the score computed WITH vs
  WITHOUT the excluded non-ESTABLISHED rows. Rendered as **whiskers** (currently
  only on 1946–1955). This bounds the effect of the honest exclusions.
- **(b) Sensitivity bands** — per decade per country, the **min/max across all four
  published weightings W0–W3** (under the N0 within-decade share). Rendered as a
  coloured band behind each bar. The primary (W0) always lies inside its band.

Where a country's sensitivity band **crosses the 50% leadership line**, defensible
weightings disagree on who led that decade. **Those decades are findings, not
embarrassments** — the chart and its caption say so plainly.

## 5. Era-normalization

- **N0 baseline — within-decade share** (the display unit): `share(c,D) =
  raw(c,D) / [raw(US,D)+raw(China,D)]`. Removes absolute-count drift, yields a 0–1
  relative bar — the honest unit for a *comparative* chart. The primary series and
  the sensitivity bands are both computed under N0.
- **N1 — per-decade z-score** across the two countries. Documented for completeness
  but **degenerate for two countries** (always ±1); not a display axis.
- **N2 — raw counts, no normalization** — a sensitivity extreme showing how much
  the source-density/adoption artifacts (coverage report §5) would distort an
  un-normalized chart. Not the display unit.

## 6. Hard exclusions (what this layer must NOT do)

- **No projections.** This covers the historical bars only. The +10/+20/+30-year
  outlooks are **EXPLORATORY-CONJECTURE**, a separate layer with its own label and
  falsifying signposts; never produced by this code.
- **No promotion of labels.** The scoring layer reads the ledger; it never changes a
  row's verification status. A row's weight in the chart is not evidence about its truth.
- **No single-number verdict.** "Momentum favours X" is only ever an inference from a
  *named* weighting, shown against the alternatives, under OPEN-CAVEATED.

## 7. What the chart shows today (OPEN-CAVEATED reading)

Under the baseline W0+N0, the honest shape is **neither triumph nor decline:**
- an American lead through the mid-century (share ~0.58–0.64), that **narrows**;
- a genuinely **contested middle** — **1976–1985, 1986–1995, 1996–2005** — where the
  sensitivity bands cross the 50% line and the baseline runs to a tie (these are the
  disagreement decades, computed, not asserted);
- a **later-decade Chinese lead** (2006–2015 ~0.60, 2016–2025 ~0.57);
- with the whole picture **sliding as the weighting changes** — that motion is the
  finding.

Every one of these numbers is OPEN-CAVEATED: re-weight `scoring/weights.json` and
recompute, and a different chart is equally "true" within its stated scope. The
single thing the layer refuses to emit is one number that settles the argument.

---

*RUBRIC v1 — LIVE. Built and run (`scoring/compute_index.py`), gated by Option C,
OPEN-CAVEATED throughout. Supersedes Design v0.1 (specification-only). Attack the
rubric: it is published so you can.*
