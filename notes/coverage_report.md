# Coverage report — achievement ledger draft (1926–2026)

Generated from `data/achievements_draft.csv`. All **239 rows are OPEN-UNVERIFIED**;
this report describes *coverage and its weaknesses*, not verified truth. Counts
are the drafting agent's independent selection under `notes/selection_criteria.md`.

**Totals: US 127 rows, China 112 rows, 239 total.**

> **This report has been updated after the v0.2 country-blind category recode.**
> The tables in §1–§3 are now the *post-recode* counts. The original *pre-recode*
> tables are preserved verbatim in **Appendix A** so the correction is visible
> history. Read the recode note next.

---

## Recode note (v0.2) — what changed and why

The first draft's §4.1/§4.2 flagged the `category` field as contaminated by a
country-correlated coding habit (US firm-foundings coded `innovation`; comparable
Chinese achievements coded `industrial`/`infrastructure`/`governmental_economic`).
Two corrections were applied:

1. **Country-blind recode** of 15 rows against explicit rules
   (`selection_criteria.md` Amendment 1), with the `country` column masked from
   the decision. Only the `category` field changed; no rows added or removed. The
   rule cuts both ways: US landmark products (nylon, McDonald's model, System/360,
   Boeing 747, IBM PC) moved *into* `innovation`; the ISS, IBM Watson (an AI
   demonstration), and SpaceX's booster landing moved *into* `science`; Chinese
   supercomputers (Yinhe-I, Tianhe-2), the Jiefang truck, and the C919 moved into
   `innovation`; China's SEZ establishment moved into `governmental_economic`; its
   internet-connectivity milestone into `infrastructure`; the Alibaba IPO into
   `industrial`.
2. **Five omission rows added** (`notes/additions_log.md`): Huawei, BYD, DJI,
   CATL, ByteDance — Chinese `innovation` firms the draft had omitted — all
   OPEN-UNVERIFIED.

**Effect on the headline artifact:** the `innovation` split moved from **US 43 /
China 6** to **US 46 / China 14**, and — more importantly than the totals —
Chinese innovation is now *populated across the modern decades* rather than nearly
empty (see §3). US `industrial` collapsed from 8 to 3, confirming that most of
those rows were landmark *products* miscoded as production milestones.

---

## 1. Totals per country per decade (post-recode)

| Decade | US | China |
|---|---|---|
| 1926-1935 | 14 | 9 |
| 1936-1945 | 12 | 6 |
| 1946-1955 | 13 | 11 |
| 1956-1965 | 13 | 9 |
| 1966-1975 | 13 | 10 |
| 1976-1985 | 12 | 12 |
| 1986-1995 | 12 | 13 |
| 1996-2005 | 12 | 11 |
| 2006-2015 | 13 | 17 |
| 2016-2026 | 13 | 14 |
| **Total** | **127** | **112** |

**The structural pattern is unchanged and remains the ledger's headline signal:**
US density is nearly flat (12–14 every decade); China's rises from a thin early
tail (6–11 through 1975) to parity in the reform decades and a lead in the last
two (17 and 14 vs 13). That *shape* — not any single row — is the robust finding.
It is a coverage fact, **not** a momentum verdict: whether a rising row count
means rising "momentum" is a scoring question for the separate, caveated index
layer, and the raw counts are deliberately unweighted (a first satellite and a
founded startup each count as one row).

**Density-target note:** China 2006–2015 now sits at **17, above the 5–15 target
band**. This is the criteria §7 "justified overflow" case: the three added firms
(DJI, CATL, ByteDance) each independently clear the notability bar, so the honest
move is to keep them and flag the overflow here rather than cut valid rows to hit
a quota. Every other cell remains within 6–14.

## 2. Category totals per country (post-recode)

| Category | US | China |
|---|---|---|
| innovation | 46 | 14 |
| infrastructure | 10 | 17 |
| industrial | 3 | 12 |
| science | 46 | 27 |
| social | 9 | 12 |
| governmental_economic | 13 | 30 |

The `innovation` column is now country-consistently coded, but a real gap remains
(46 vs 14) — see §4.1 for what that residual does and does not mean. The
`governmental_economic` gap (30 vs 13) *widened by one* in the recode (SEZ moved
in) and is now understood as substantially structural rather than artifactual —
see §4.2.

## 3. Full matrices (decade × category, post-recode)

### United States

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 5 | 2 | 0 | 4 | 1 | 2 | 14 |
| 1936-1945 | 3 | 2 | 1 | 3 | 1 | 2 | 12 |
| 1946-1955 | 4 | 0 | 0 | 6 | 1 | 2 | 13 |
| 1956-1965 | 4 | 1 | 0 | 3 | 4 | 1 | 13 |
| 1966-1975 | 7 | 0 | 0 | 4 | 0 | 2 | 13 |
| 1976-1985 | 6 | 1 | 0 | 4 | 0 | 1 | 12 |
| 1986-1995 | 6 | 3 | 0 | 2 | 0 | 1 | 12 |
| 1996-2005 | 7 | 0 | 0 | 5 | 0 | 0 | 12 |
| 2006-2015 | 3 | 0 | 1 | 7 | 2 | 0 | 13 |
| 2016-2026 | 1 | 1 | 1 | 8 | 0 | 2 | 13 |

### China

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 0 | 1 | 1 | 2 | 1 | 4 | 9 |
| 1936-1945 | 0 | 1 | 2 | 1 | 0 | 2 | 6 |
| 1946-1955 | 0 | 1 | 2 | 1 | 3 | 4 | 11 |
| 1956-1965 | 1 | 2 | 2 | 2 | 1 | 1 | 9 |
| 1966-1975 | 0 | 1 | 0 | 6 | 1 | 2 | 10 |
| 1976-1985 | 2 | 0 | 0 | 1 | 2 | 7 | 12 |
| 1986-1995 | 2 | 3 | 0 | 1 | 2 | 5 | 13 |
| 1996-2005 | 2 | 1 | 2 | 2 | 0 | 4 | 11 |
| 2006-2015 | 5 | 4 | 2 | 4 | 1 | 1 | 17 |
| 2016-2026 | 2 | 3 | 1 | 7 | 1 | 0 | 14 |

## 4. Where my confidence is weakest (read this before trusting the tables)

### 4.1 `innovation` — the artifact is corrected; a residual, more-plausibly-real gap remains
After the recode and additions, US innovation (46) vs China (14) is coded by one
country-blind rule, and Chinese innovation is populated across the modern decades
(0→2 in 1986–95, 2→5 in 2006–15) instead of near-empty. What the *residual* gap
means, honestly:
- **Much of it is now plausibly real, but time-shaped.** The US produced datable,
  market-creating firms and products across the *entire* century; China's
  innovation rows cluster after ~1984 (its first commercial-tech firms) and
  especially after 2000. A century-long lead in datable firm/product foundings is
  a genuine feature of the two development paths — but it is a statement about
  *when each country's commercial-innovation economy existed*, not a clean measure
  of inventive capacity per decade.
- **The recode is itself a set of judgment calls.** "A landmark new product =
  innovation; a scale/leadership milestone = industrial" is defensible but not
  unique; a reviewer could, e.g., keep aircraft as `industrial` and would get a
  different table. The rule is now explicit (Amendment 1) so that disagreement is
  legible.
- **Residual datability bias persists.** Diffuse capability build-outs still lack
  crisp years and remain under-represented relative to founded firms.

### 4.2 `governmental_economic` (China 30 vs US 13) — now read as mostly structural, not artifact
The recode moved SEZ establishment *into* this column (a genuine reform-policy
achievement) and moved the Alibaba IPO *out* (to `industrial`), leaving China at
30. This gap is now best read as **substantive**: China's reform century produced
an unusually dense sequence of discrete, datable institutional and policy
milestones (SEZs, WTO accession, fiscal/currency reform, five-year-plan shifts,
central-bank founding), whereas comparable US institutional change is either older
than the 1926 window, more diffuse, or coded into `social` (Civil Rights,
Medicare, the pill). It still should **not** be read as a scoreboard — it reflects
*how each state's development was structured*, and the row-granularity of
"a reform" vs "a law" is itself a modeling choice.

### 4.3 China 1926–1945 is still genuinely under-covered
Unchanged by the recode. The Republican-era and War-of-Resistance decades (China 9,
then 6 — the draft's two thinnest cells) are thin for a real reason (fragmentation,
warlordism, then total war and occupation) **and** a bias reason (the
English-language record under-documents this period's Chinese science, industry,
and institution-building, and my own knowledge is thinner here). Treat these two
decades as a floor; a China-specialist source pass would likely add rows.

### 4.4 Early-PRC rows rest on contested statistics
Unchanged. Several 1949–1978 rows (output recovery to prewar peaks, early
poverty/health gains, First-Five-Year-Plan base-building) rely on official PRC
figures with documented reliability disputes. Entered OPEN-UNVERIFIED with the
caveat in `notes`; exactly the kind of numbers the dossier's data-integrity
doctrine says to show against an independent series where possible.

### 4.5 The 2016–2026 tail is deliberately light and recency-limited
Unchanged. The window ends mid-2026, but confident entries stop near early 2025.
Nothing from roughly the last 18 months of the window is included, to avoid
asserting recent or unverified events, so the final decade reads as "first ~9
years." (The five added firms are anchored to their *founding* years, all ≤2012,
so they do not touch the recent tail.)

### 4.6 Attribution and date calls a reviewer may contest
Unchanged. Excluded on non-US/non-China attribution: the World Wide Web (CERN),
the Higgs boson (CERN), AlphaGo/AlphaFold (UK lab), Dolly and IVF (UK). Included
as US with a collaboration note: CRISPR-Cas9 (US–France), mRNA vaccines (US +
German BioNTech). `circa`/`range` anchors for multi-year projects are defensible
but not unique. Pre-1949 "China" folds Republican-era achievements under one
`country` label, with the political entity recorded in `notes`.

## 5. How the pre-declared biases actually played out (updated post-recode)

| Bias (criteria §8) | Verdict after the recode |
|---|---|
| Recency bias | Held in check; density flat-to-rising, 2016–2026 tail capped early. Added firms anchored to founding years (≤2012). |
| English-source bias vs China | **Partly fixed** — the flagged `innovation` omissions were added; 1926–1945 remains under-covered (still flagged, still not fixed). |
| Category imbalance | **Largely addressed** for the coding artifact via the country-blind recode; the residual `innovation` and `gov/economic` gaps are now interpreted (§4.1/§4.2), not laundered as measurements. |
| Nameable-project / great-man bias | Still present — founded-firms and megaprojects dominate; diffuse achievements remain thinner and mostly `circa`. |
| Survivorship / hindsight | Unquantified; accepted as a limitation. |
| Statistical definitional drift | Flagged per-row for poverty/output/literacy claims; not resolved. |

## 6. Bottom line for the next pass
The category-coding artifact that §4.1/§4.2 originally warned against is now
**corrected and documented**, so the category counts are safer to reason about —
but they are still *counts of a judgment-laden selection*, not measurements, and
the momentum index must be built with the caveats in §4 visible, not on raw
tallies. Highest-value remaining corrections before scoring: (a) a
China-specialist source pass on **1926–1945** (the one clearly-thin region the
recode did not touch); (b) an independent-series cross-check on the contested
**early-PRC statistics**; (c) a completeness sweep for `industrial`/`infrastructure`
omissions symmetric to the `innovation` one just done (e.g., China's solar-PV
manufacturing dominance, logged in `additions_log.md`). The decade-total *shape*
(China's thin early tail rising to a late lead) is the most robust finding and the
one least sensitive to any of these classification questions.

---

## Appendix A — pre-recode tables (superseded)

Preserved verbatim from the first drafting pass (234 rows, before the v0.2
country-blind recode and the five added firm rows). Kept so the correction is
auditable. **Do not cite these as current** — see §1–§3 above.

### A.1 Totals per country per decade (pre-recode)

| Decade | US | China |
|---|---|---|
| 1926-1935 | 14 | 9 |
| 1936-1945 | 12 | 6 |
| 1946-1955 | 13 | 11 |
| 1956-1965 | 13 | 9 |
| 1966-1975 | 13 | 10 |
| 1976-1985 | 12 | 12 |
| 1986-1995 | 12 | 11 |
| 1996-2005 | 12 | 11 |
| 2006-2015 | 13 | 14 |
| 2016-2026 | 13 | 14 |
| **Total** | **127** | **107** |

### A.2 Category totals per country (pre-recode)

| Category | US | China |
|---|---|---|
| innovation | 43 | 6 |
| infrastructure | 11 | 17 |
| industrial | 8 | 13 |
| science | 43 | 30 |
| social | 9 | 12 |
| governmental_economic | 13 | 29 |

### A.3 US decade × category (pre-recode)

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 4 | 2 | 1 | 4 | 1 | 2 | 14 |
| 1936-1945 | 3 | 2 | 1 | 3 | 1 | 2 | 12 |
| 1946-1955 | 3 | 0 | 1 | 6 | 1 | 2 | 13 |
| 1956-1965 | 3 | 1 | 1 | 3 | 4 | 1 | 13 |
| 1966-1975 | 6 | 0 | 1 | 4 | 0 | 2 | 13 |
| 1976-1985 | 5 | 1 | 1 | 4 | 0 | 1 | 12 |
| 1986-1995 | 6 | 3 | 0 | 2 | 0 | 1 | 12 |
| 1996-2005 | 7 | 1 | 0 | 4 | 0 | 0 | 12 |
| 2006-2015 | 5 | 0 | 1 | 5 | 2 | 0 | 13 |
| 2016-2026 | 1 | 1 | 1 | 8 | 0 | 2 | 13 |

### A.4 China decade × category (pre-recode)

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 0 | 1 | 1 | 2 | 1 | 4 | 9 |
| 1936-1945 | 0 | 1 | 2 | 1 | 0 | 2 | 6 |
| 1946-1955 | 0 | 1 | 2 | 1 | 3 | 4 | 11 |
| 1956-1965 | 0 | 2 | 3 | 2 | 1 | 1 | 9 |
| 1966-1975 | 0 | 1 | 0 | 6 | 1 | 2 | 10 |
| 1976-1985 | 1 | 1 | 0 | 2 | 2 | 6 | 12 |
| 1986-1995 | 0 | 2 | 0 | 2 | 2 | 5 | 11 |
| 1996-2005 | 2 | 1 | 2 | 2 | 0 | 4 | 11 |
| 2006-2015 | 2 | 4 | 1 | 5 | 1 | 1 | 14 |
| 2016-2026 | 1 | 3 | 2 | 7 | 1 | 0 | 14 |
