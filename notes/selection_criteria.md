# Selection criteria — the two-country achievement ledger (1926–2026)

**Status of this document:** authorial construction, not a measurement. These are
the rules I (the drafting agent) chose for deciding what enters the achievement
ledger. A different analyst with a different rulebook would build a different
ledger. The rules are published here *before* any data row so that a hostile
reader can see the selection function that produced the rows and re-run it
differently. This file is the selection layer only — it does **not** score,
weight, or rank achievements, and it does not decide the momentum bar chart.
Scoring is a separate, later, separately-labeled construct.

Every row this rulebook admits lands **OPEN-UNVERIFIED** at draft time,
regardless of how good its source is (see §6). Promotion to ESTABLISHED is a
separate per-row pass done later.

---

## 1. Purpose and the unit of the ledger

The ledger records **discrete, documented, already-completed achievements** of
the United States and of China (Republic-era and People's Republic alike; see
§4) across 1926–2026, one achievement per row. The ledger's job is to be a
defensible factual spine — a list a serious reader would accept as "yes, these
things happened and mattered" — that a later momentum index can be built on top
of and argued with.

An **achievement** here is a nameable event, completion, founding, discovery,
reform, or measured milestone that (a) had already happened as a matter of
historical record, and (b) changed the country's innovative, industrial,
infrastructural, scientific, social, or institutional trajectory.

What is emphatically **not** an achievement for this ledger:
- a projection, forecast, target, or five-year-plan goal;
- an announced-but-unbuilt or under-construction project (the ribbon must be
  cut — first revenue operation / first full-power / official completion);
- a trend with no datable event (handled, if at all, as a *measured-milestone*
  row anchored to the year a threshold was crossed, with `year_precision` set
  honestly — see §5);
- a purely military conquest or battlefield outcome. Dual-use science and
  industry that happens to have military origin (a reactor, a satellite
  program, a computer) *can* qualify on its scientific/industrial merits, but
  is flagged in `notes` as such and framed by what was built, not who it was
  aimed at.

## 2. Categories in scope

Six categories, each a value in the `category` column. A row gets exactly one
primary category (the dominant one); secondary flavor goes in `notes`.

| category | what it covers |
|---|---|
| `innovation` | company foundings, breakthrough products, platform/technology firsts with commercial or cultural reach |
| `infrastructure` | rail, highways, dams, ports, airports, power grids, water systems, telecom/broadband buildouts |
| `industrial` | manufacturing scale-up, market/production leadership milestones, supply-chain and heavy-industry firsts |
| `science` | discoveries, scientific firsts, instrument/observatory/megaproject completions, prizes marking a body of work |
| `social` | poverty reduction, education access, public health, life-expectancy/literacy milestones, demographic policy outcomes |
| `governmental_economic` | founding of durable institutions, structural economic reforms, monetary/fiscal regime shifts, landmark legislation |

Category boundaries are judgment calls (a national lab is science *and*
institution; a highway program is infrastructure *and* economic policy). The
tie-break rule: **classify by the achievement's primary historical significance**,
and record the alternative reading in `notes`. Consistency of classification is
itself checkable, so the tie-breaks are logged rather than hidden.

## 3. The notability test (stated as a rule)

> **A candidate qualifies if a serious, general one-volume history of that
> country's development in that decade would be incomplete — would look
> negligent to an informed reader — if it omitted it.**

Three operational sub-tests; a row should satisfy the rule above *and* at least
one of these, and I record which in `notes` when it is not obvious:

1. **Scale** — national in reach or effect (not a local or single-firm curiosity
   unless that firm/event reshaped a whole sector).
2. **Firstness / superlative** — first, largest, fastest, or foundational of its
   kind at national or world scale at that time.
3. **Durability** — its effects outlast the decade; a later historian draws a
   causal arrow forward from it.

The test is deliberately a *threshold*, not a ranking. Two achievements that
both clear the bar are both admitted; the ledger does not here decide which is
"bigger." (That is the scoring layer's problem, and it is a separate document.)

## 4. Country attribution and the pre-1949 question

- **United States** spans the whole period continuously.
- **China** spans the whole period too, but the polity changes: Republic of
  China governing the mainland (through 1949) and the People's Republic of China
  (from 1949). Both are recorded as "China" in the `country` column, because the
  ledger tracks the *country's* development arc, not a single government's. The
  governing entity and any discontinuity (e.g., civil war, 1949 transition, the
  relocation of the ROC government to Taiwan) is stated in `notes`. Achievements
  physically on the mainland are the spine; a small number of clearly
  China-attributable items are admitted on their merits with the political
  caveat logged. Post-1949 Taiwan is **out of scope** for this ledger's "China"
  unless explicitly flagged, to avoid silently conflating two development paths.
- Attribution of a person/firm to a country follows where the achievement was
  *realized* (built, founded, demonstrated at scale), not the nationality of an
  individual. Émigré-driven achievements (common in US science) are attributed
  to the US with the origin noted.

## 5. Dating conventions and `year_precision`

The `year` column holds a single integer for sortability; `year_precision`
tells the reader how much to trust it:

- `exact` — a well-attested specific year (founding, opening, launch, signing).
- `circa` — approximately known; the event is real but the exact year is fuzzy
  or sources disagree by a year or two. Pick the better-attested year; explain
  in `notes`.
- `range` — a multi-year project or process; `year` holds the anchor year (by
  default the completion / first-full-operation year), and `notes` gives the
  span (e.g., "construction 1994–2012; first generating unit 2003; anchored to
  full completion 2012").

**Date-conflict rule:** where sources disagree on the date, record *both* dates
and their sources in `notes`, put the better-attested one in `year`, and state
in one clause *why* it was preferred. Never silently pick one.

## 6. Sources and `source_class`

Every row cites the *best source I actually consulted* for that claim — not an
aspirational or un-checked reference. `source_class` labels the evidentiary tier
so a reader can weight it:

| source_class | meaning |
|---|---|
| `official-national` | a national government / state statistics bureau / official project record |
| `international-body` | World Bank, UN agencies, OECD, IMF, IEA, and similar multilateral data |
| `independent-academic` | peer-reviewed scholarship, academic monographs, dataset projects (e.g., Maddison) |
| `journalistic` | reputable news/trade press reporting |
| `encyclopedic` | general reference works (encyclopedias, standard reference compendia) |

Two integrity rules baked in from the constitution:
- **Everything is OPEN-UNVERIFIED at draft.** `source_class` describes provenance
  quality; it does **not** promote the row. A World-Bank-sourced row and an
  encyclopedic row are both OPEN-UNVERIFIED until the verification pass.
- **Where US and Chinese figures for the same quantity conflict, show both.**
  Chinese official statistics carry documented reliability disputes (GDP
  smoothing, provincial over-reporting, the Li Keqiang-index critique); US
  statistics carry their own century of definitional shifts. Contested numbers
  are recorded with the dispute noted, not silently adjudicated.

Honesty note on this draft's sourcing: this is an **independent first draft built
from the drafting agent's own knowledge and judgment**, and many `source`
entries name the *class of authority that substantiates the claim* (e.g.
"World Bank development indicators", "standard reference histories") rather than
a single page-level citation. That is exactly why every row is OPEN-UNVERIFIED:
the per-row hunt for a specific, resolvable citation is the later verification
pass, not this one.

## 7. Target density and what "thin" means

- **5–15 entries per country per decade.** Enough for signal; few enough that
  each entry has to defend its place against the notability rule. Aim for the
  8–12 band in most decades.
- **Thinness is data, not a gap to pad.** If a country genuinely has few
  ledger-worthy achievements in a decade (e.g., a decade dominated by war,
  famine, or internal collapse), record the honest smaller set and write a line
  in `notes/coverage_report.md` explaining *why* it is thin. Do not manufacture
  marginal entries to hit a quota — a padded decade is a lie about momentum.
- Conversely, a genuinely dense decade may exceed 15 only if each added row
  still clears the bar; prefer to hold the line at ~15 and note the overflow.

## 8. Biases to guard against (stated openly)

These are the known ways this exact exercise goes wrong. Naming them is the only
defense; the coverage report re-checks against them.

1. **Recency bias.** The last three decades are documented in overwhelming
   detail and the first three are not; left unchecked, the ledger would slope
   toward the present and read as "momentum is accelerating" when that is partly
   an artifact of source density. Guard: hold roughly comparable density across
   decades; resist over-populating 1996–2026.
2. **English-language source bias against Chinese achievements.** The
   English-language record under-covers Chinese science, industry, and
   infrastructure, especially pre-reform (1949–1978). Guard: deliberately seek
   major Chinese achievements of the Mao era (industrial base-building,
   public-health campaigns, the "Two Bombs, One Satellite" program, agricultural
   science) that an English-first search would miss, and flag where my own
   confidence is limited by this.
3. **Category imbalance from different development paths.** The US arc is
   private-innovation- and consumer-technology-heavy; the Chinese arc is
   state-infrastructure-, industrial-, and social-development-heavy. A rubric
   that over-weights any one category silently favors one country. Guard: keep
   all six categories genuinely populated for both countries where the history
   supports it, and treat a category being empty as a finding to report, not to
   paper over.
4. **"Nameable-project" / great-man bias.** Discrete, nameable megaprojects and
   founding-dated firms are easy to enter; diffuse achievements (a public-health
   system, a literacy campaign, an incremental productivity revolution) are
   harder and get under-counted. Guard: admit measured-milestone rows for
   diffuse achievements, anchored honestly with `circa`/`range`.
5. **Survivorship and hindsight.** It is easy to enter things that turned out to
   matter and miss things that looked huge at the time. This ledger accepts that
   limitation and flags low-confidence decades in the coverage report.
6. **Definitional drift in statistics.** "Poverty," "literacy," "GDP,"
   "electrification" are defined differently across eras and countries. Guard:
   when a row rests on such a measure, name the measure in `notes`, don't treat
   two differently-defined numbers as the same unit.

## 9. Comparability caveat (carried forward, not resolved here)

A 1930s achievement and a 2020s achievement are not the same unit, and a US
achievement and a Chinese achievement in the same decade sit inside very
different development stages. This ledger **does not** resolve that — it records
comparable-quality *facts* and leaves era-normalization and cross-country
comparability to the (separately labeled) scoring/normalization layer. Any
sentence of the form "country X was ahead in decade Y" is out of scope for this
file and every data row it governs.

---

*Selection layer v0.1 (draft). Change this file and the rows may change; that is
intended. The rulebook is as much the object of review as the ledger it
produces.*
