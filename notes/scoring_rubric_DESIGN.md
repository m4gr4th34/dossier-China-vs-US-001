```
╔══════════════════════════════════════════════════════════════════════════╗
║  ⛔ NOT-TO-BE-RUN — DESIGN SPECIFICATION ONLY                             ║
║  This document DESIGNS the momentum-scoring layer. It contains NO code    ║
║  and NO chart, and nothing here is to be executed or rendered. The layer  ║
║  it describes does not exist yet and is GATED OFF (see §1). When built,   ║
║  the entire layer is OPEN-CAVEATED. No projections are designed here.     ║
╚══════════════════════════════════════════════════════════════════════════╝
```

# Momentum-scoring rubric — DESIGN

The scoring layer would turn the frozen, verified achievement corpus
(`data/achievements_draft.csv` → `claim_ledger.csv`) into the dossier's per-year
comparative "momentum" bar chart. This document specifies *how it would work* so
the design can be reviewed and attacked **before** any line of it is written. It
is the honest separation the constitution demands: the documented **achievement
ledger** (ESTABLISHED facts) is one thing; the **constructed momentum index**
built on top of it is a different thing, and it wears a different label.

**Status of the whole layer: OPEN-CAVEATED.** It is a real computation over real
(verified) data, but the *rubric* — which categories count how much, how eras are
normalized — is an **authorial construction**. It is true only within its stated
scope (this rubric, these weights); a hostile reader re-weighting it gets a
different chart, and that is by design (§4).

---

## 1. The verification gate (why this cannot run yet)

**No decade may be scored while it contains any OPEN-UNVERIFIED row.** A decade
becomes score-eligible only once every one of its rows has been resolved by the
verification ritual to `ESTABLISHED` (counts toward the score), `REPORTED`
(excluded from the score — it is not the author's claim), or removed. Scoring a
decade that still holds unverified rows would launder OPEN-UNVERIFIED guesses into
a "momentum" number — exactly the false-label failure the constitution forbids.

Consequence today: verification has processed only batch 1 (1926–1937), and even
there some rows remain OPEN-UNVERIFIED. **Zero decades are score-eligible**, so the
layer is gated fully OFF. This gate is the mechanism that keeps the chart honest as
verification proceeds — the chart can only ever show decades that are fully
established.

## 2. The core computation (per-year weighted category counts)

For each year *y* and country *c*:

```
raw_score(c, y) = Σ over categories k of  W[k] × count(c, y, k)
```

where `count(c, y, k)` is the number of **ESTABLISHED** rows for country *c* in
year *y* of category *k*, and `W[k]` is the published category weight (§3).
Per-year scores aggregate to the per-decade bars of the comparative chart. Only
ESTABLISHED rows enter the count; REPORTED and OPEN-UNVERIFIED rows never do.

(Rows with `year_precision` of `circa`/`range` are counted in their anchored year,
as recorded — the same anchor the verification ritual confirmed.)

## 3. The published weight table (the baseline rubric)

The weights are **published, versioned, and challengeable** — publishing them *is*
the honesty. The baseline is deliberately close to a pure count so departures from
it are visible:

| category | baseline weight W0 | one-line rationale (contestable) |
|---|---|---|
| innovation | 1.0 | new product/firm/technology |
| science | 1.0 | knowledge / exploration first |
| infrastructure | 1.0 | built network/facility |
| industrial | 1.0 | production/market-scale leadership |
| social | 1.0 | poverty/health/education/civic outcome |
| governmental_economic | 1.0 | institution / reform / policy milestone |

Baseline W0 is **equal weighting** = a pure ESTABLISHED-count-per-decade. Every
other weighting is a departure a reader can inspect against this null.

## 4. Mandatory sensitivity analysis (≥3 alternative weightings)

The single most important requirement: **the chart is never shown under one
weighting alone.** At least three alternatives are computed and displayed
alongside the baseline, and they **must include one weighting that favors each
country**, so the reader sees directly that the rubric — not the data — picks the
"winner." Minimum set:

| weighting | up-weighted categories | who it structurally favors | why include it |
|---|---|---|---|
| **W0 baseline** | none (all 1.0) | ~neutral (pure count) | the null to measure departures against |
| **W1 frontier-forward** | innovation ×1.5, science ×1.5 | **US** (invention/innovation-heavy) | tests "does weighting invention flip it US?" |
| **W2 build-and-develop** | infrastructure, industrial, social, governmental_economic ×1.5 | **China** (built-works/reform/social-heavy) | tests "does weighting development flip it China?" |
| **W3 event-type frontier** | weight by `event_type`: discovery/invention/founding higher than completion/milestone | US-leaning (a cross-check on W1 via a different axis) | tests whether the result is robust to *how* "counts as an achievement" is operationalized |

Reporting rule: publish all four bar-series together (or a small-multiple), state
plainly that they diverge, and **never** present a single series as "the" momentum
chart. If the country ranking is stable across W0–W3, say so; if it flips, that
flip *is* the finding — the momentum question is rubric-dependent.

## 5. Era-normalization scheme

A 1930s achievement and a 2020s achievement are not the same unit, and raw counts
are contaminated by source density and by how many datable events an era produced.
The normalization makes decades comparable. Baseline scheme and its alternatives
(the choice is itself a sensitivity knob):

- **N0 baseline — within-decade share.** Convert each decade's country scores to
  *shares of that decade's total*: `share(c, D) = score(c, D) / [score(US, D) +
  score(China, D)]`. This removes absolute-count drift (a decade with more datable
  events doesn't automatically read as "more momentum") and yields a 0–1 relative
  bar per decade — the honest unit for a *comparative* chart.
- **N1 — per-decade z-score** across the two countries (shows distance from the
  decade mean; more sensitive to ties).
- **N2 — raw counts, no normalization** (kept only as a sensitivity extreme, to
  show how much the source-density/adoption artifacts §5 of the coverage report
  warned about would distort an un-normalized chart).

Normalization is applied **after** the weighted count and **before** display. The
baseline pairing is **W0 + N0**; sensitivity runs cross every W with N0, plus W0
across N0–N2.

## 6. Hard exclusions (what this layer must NOT do)

- **No projections.** This design covers the historical 1926–2026 bars only. The
  +10/+20/+30-year outlooks are **EXPLORATORY-CONJECTURE**, a separate layer with
  its own label and its own falsifying signposts; they are **out of scope here**
  and must never be produced by this scoring code.
- **No promotion of labels.** The scoring layer reads the ledger; it never changes
  a row's verification status. A row's weight in the chart is not evidence about
  its truth.
- **No single-number verdict.** "Momentum favors X" is only ever stated as an
  inference from a *named* weighting+normalization, shown against the alternatives,
  and carries the OPEN-CAVEATED label. It is never asserted as a measured fact.

---

*Design v0.1 — specification only. Nothing here is implemented; the layer is gated
off (§1) and stays OPEN-CAVEATED when built. Review and attack this rubric before
any code exists.*
