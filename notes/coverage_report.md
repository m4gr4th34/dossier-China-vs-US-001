# Coverage report — achievement ledger draft (1926–2026)

Generated from `data/achievements_draft.csv` after the decade-by-decade drafting
pass. All 234 rows are **OPEN-UNVERIFIED**; this report describes *coverage and
its weaknesses*, not verified truth. Counts are the drafting agent's independent
selection under `notes/selection_criteria.md`.

**Totals: US 127 rows, China 107 rows, 234 total.** Density held within the
5–15/country/decade target in every cell (range 6–14).

---

## 1. Totals per country per decade

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

**The one structural pattern worth naming:** US density is nearly flat (12–14
every decade); China's rises from a thin early tail (6–11 through 1975) to
parity in the reform decades and a slight lead in the last two (14 vs 13). That
*shape* — not any single row — is the ledger's headline signal. It is recorded
here as a coverage fact and is **not** a momentum verdict: whether a rising row
count means rising "momentum" is a scoring question for the separate, caveated
index layer, and the raw counts are deliberately not weighted here (a first
satellite and a founded startup both count as one row).

## 2. Category totals per country

| Category | US | China |
|---|---|---|
| innovation | 43 | 6 |
| infrastructure | 11 | 17 |
| industrial | 8 | 13 |
| science | 43 | 30 |
| social | 9 | 12 |
| governmental_economic | 13 | 29 |

This is the single most important — and most fragile — table in the report. See
§4.1 and §4.2; the `innovation` 43-vs-6 gap and the `governmental_economic`
29-vs-13 gap are **partly real and partly classification artifacts**, and a
reader should not read either number as an objective measure.

## 3. Full matrices (decade × category)

### United States

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

### China

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

## 4. Where my confidence is weakest (read this before trusting the tables)

### 4.1 The `innovation` column is the least trustworthy number in the whole draft
US innovation (43) vs China (6) overstates the real gap. Three reasons, all mine
to own:
- **Classification bias.** I consistently coded US *company foundings* (Apple,
  Google, SpaceX, …) as `innovation`, but coded functionally comparable Chinese
  achievements as `industrial` (C919, EV export leadership), `infrastructure`
  (HSR, 5G), or `governmental_economic` (reform milestones). The same underlying
  "a new capability appeared" event lands in different columns by country. That
  choice alone manufactures much of the 43-vs-6 gap.
- **Under-credited Chinese commercial innovation.** Even on its own terms, China's
  `innovation` count is probably too low: Huawei, BYD, DJI, CATL, ByteDance/TikTok,
  and the solar-PV manufacturing revolution are all defensible `innovation` rows I
  either folded into industrial categories or omitted. This is exactly the
  English-source / category-imbalance bias §8.2–8.3 of the criteria warned about,
  and it bit.
- **What's easily datable.** A founded startup has a crisp year; a diffuse
  capability build-out does not, so the former is over-represented.
  **Recommendation for the verification pass:** re-adjudicate `innovation` vs
  `industrial` with a single country-blind rule, and revisit Chinese 2006–2026
  innovation coverage specifically. I expect the real gap to narrow materially.

### 4.2 `governmental_economic` (China 29 vs US 13) has the mirror-image problem
China's reform era produced many discrete, datable institutional/policy
milestones (SEZs, WTO, fiscal reform, five-year-plan shifts), which I entered as
individual rows. US institutional change in the same century is either older than
the window, more diffuse, or coded into `social` (Civil Rights, Medicare). So
this column over-counts China relative to the US for structural, not substantive,
reasons. Neither the 43-vs-6 nor the 29-vs-13 should be read as a scoreboard.

### 4.3 China 1926–1945 is genuinely under-covered (thinness that is *partly* real, partly mine)
The Republican-era and War-of-Resistance decades (China 9, then 6 — the draft's
two thinnest cells) are thin for a real reason (fragmentation, warlordism, then
total war and occupation) **and** for a bias reason (the English-language record
under-documents this period's Chinese science, industry, and institution-building,
and my own knowledge is thinner here). Treat these two decades as a floor, not a
ceiling; a China-specialist source pass would likely add rows.

### 4.4 Early-PRC rows rest on contested statistics
Several 1949–1978 rows (output recovery to prewar peaks, early poverty/health
gains, First Five-Year-Plan base-building) rely on official PRC figures that carry
documented reliability disputes. They are entered as OPEN-UNVERIFIED with the
caveat in `notes`, but the underlying numbers are exactly the kind the dossier's
data-integrity doctrine says to treat skeptically and, where possible, to show
against an independent series.

### 4.5 The 2016–2026 tail is deliberately light and recency-limited
The window ends mid-2026, but my confident entries stop near early 2025 (the last
clearly-established items). Nothing from roughly the last 18 months of the window
is included, to avoid asserting recent or unverified events. So 2025–2026 is
under-covered *by design*, and the final decade's counts should be read as "first
~9 years of the decade." This partly offsets — in the honest direction — the
recency bias §8.1 warned about.

### 4.6 Attribution and date calls a reviewer may contest
- **Excluded on non-US/non-China attribution:** the World Wide Web (CERN), the
  Higgs boson (CERN), AlphaGo/AlphaFold (UK lab), Dolly the sheep and IVF (UK).
  Including or excluding these is a judgment call.
- **Included as US with a collaboration note:** CRISPR-Cas9 (US–France), mRNA
  vaccines (US firm + German BioNTech). A reviewer could re-attribute these.
- **`circa`/`range` anchors:** multi-year projects (Three Gorges, HSR network,
  poverty reduction, Third Front) are anchored to a chosen year with the span in
  `notes`; the anchor choice is defensible but not unique.
- **Pre-1949 "China"** folds Republican-era achievements under one `country`
  label per the criteria; a reader who wants the ROC/PRC split separated will need
  the `notes` field, which records it.

## 5. How the pre-declared biases actually played out

| Bias (criteria §8) | Verdict on this draft |
|---|---|
| Recency bias | Held in check; density is flat-to-rising, not exploding, and the 2016–2026 tail is capped early. |
| English-source bias vs China | **Partially bit** — 1926–1945 under-covered; Chinese `innovation` under-credited. Flagged, not fixed. |
| Category imbalance | **Bit hardest** — the `innovation` and `governmental_economic` columns are classification artifacts as much as measurements. |
| Nameable-project / great-man bias | Present — founded-firms and megaprojects dominate; diffuse achievements (public health, literacy) are thinner and mostly `circa`. |
| Survivorship / hindsight | Unquantified; accepted as a limitation of any such ledger. |
| Statistical definitional drift | Flagged per-row for poverty/output/literacy claims; not resolved. |

## 6. Bottom line for the next pass
The ledger is a usable factual spine, but **do not build the momentum index on the
raw category counts** — §4.1 and §4.2 show two columns are contaminated by
country-correlated classification choices. The highest-value corrections before
scoring: (a) a country-blind re-run of `innovation` vs `industrial`; (b) a
China-specialist source pass on 1926–1945; (c) an independent-series cross-check
on the contested early-PRC statistics. The decade-total *shape* (China's thin
early tail rising to a late lead) is the most robust finding and the one least
sensitive to these classification problems.
