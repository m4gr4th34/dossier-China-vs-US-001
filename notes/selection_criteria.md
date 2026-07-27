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

---

## Amendment 1 — country-neutral category decision rules (v0.2)

**Why:** the first coverage pass (`notes/coverage_report.md` §4) found the
`category` field contaminated by a country-correlated classification habit — US
company-foundings and tech products were coded `innovation`, while functionally
comparable Chinese achievements were coded `industrial`, `infrastructure`, or
`governmental_economic`. That manufactured much of the apparent innovation gap.
This amendment replaces the loose §2 category descriptions with explicit,
**country-neutral tests**, and the whole ledger is re-adjudicated against them
with the `country` column masked from the decision.

**The governing principle (non-negotiable):** *classify by the nature of the
achievement, never by who did it or how it was owned.* State-owned or
state-adjacent origin does **not** demote a commercial or technological
achievement to `governmental_economic`. A state-founded champion firm and a
venture-funded startup, if each became a major technology/industrial player, are
both `innovation`.

### The six tests (apply "primary significance"; tie-break order below)

- **science** — the achievement is primarily a gain in fundamental knowledge or a
  scientific/exploration first: discoveries, scientific firsts, research
  instruments/megaprojects (telescopes, colliders, genome projects), scientific
  prizes, foundational device inventions credited as *physics/biology
  breakthroughs* (transistor, laser, solar cell, recombinant DNA, CRISPR,
  information theory, insulin synthesis, fusion ignition, gravitational waves,
  first nuclear chain reaction / first weapon test as an engineering-science
  first), **and all crewed or robotic spaceflight and space-station milestones**
  (satellites, crewed flights, landings, rovers, sample returns, orbital
  laboratories, reusable-launch technical firsts). Test: *did the frontier of
  knowledge or exploration move, rather than a market or a production line?*

- **innovation** — the achievement is the creation of a new commercially or
  technologically significant product, platform, service, computing machine, or
  material, **or the founding of a company that became a major technology or
  industrial player** — regardless of ownership. Includes firm foundings, landmark
  commercial products/platforms, new applied technologies that created or
  reshaped a market, and the first indigenous development of a complex
  technological product (a first domestic airliner, automobile, or supercomputer
  counts here). Test: *did a new product, technology, material, or major firm come
  into being — and is that, not a research first, the point?*

- **industrial** — the achievement is a **manufacturing-, production-, or
  market/economic-scale leadership** milestone, where the achievement is *scale or
  leadership itself*, not a specific new product or firm: wartime production
  mobilization, output-recovery benchmarks, heavy-industrial base-building,
  resource self-sufficiency, "largest manufacturer/exporter", "largest producer of
  X", a record public listing marking a sector's global scale, or briefly becoming
  the world's most valuable company on the strength of a product category. Test:
  *is the achievement about how much is produced or who leads a market, rather than
  a new artifact?*

- **infrastructure** — physical networks and fixed facilities: rail and high-speed
  rail, highways/expressways, dams, bridges, ports, airports, power grids and
  power stations, telecom/broadband/5G networks, undersea cables, internet
  backbones, satellite-navigation systems, satellite-internet constellations.
  **Adopting or connecting to existing infrastructure** (e.g., a country's first
  connection to the global internet) is infrastructure, not a research first.

- **social** — poverty reduction, public health, education access, demographic
  policy, civil-rights milestones, mass-welfare outcomes and institutions'
  outcomes, and major national civic events (Olympics/Asian Games).

- **governmental_economic** — founding of durable governing/economic
  **institutions**, structural economic/monetary/fiscal **reforms**, landmark
  economic legislation, trade-regime and diplomatic-institutional milestones, and
  economic-policy zones/programs (SEZs, tax reform, currency reform, WTO accession,
  central-bank founding, alliance/treaty institutions). Reserved for genuine
  governance/economic-structure/policy/diplomacy achievements — **never** the
  destination for a commercial/technological achievement merely because the state
  was involved.

### Tie-break order (when two tests both seem to fit)

1. **science over everything** if the achievement's fame is a knowledge or
   exploration first (a space-station is science, not infrastructure; an AI system
   *demonstration* like a champion-beating match is science, but an AI *product
   release* is innovation).
2. **innovation vs industrial:** a *new product/firm/material* → innovation; a
   *scale/leadership* milestone → industrial.
3. **innovation vs governmental_economic:** a *commercial/technological* artifact
   or firm → innovation, even if state-owned; a *policy/institution/reform* →
   governmental_economic.
4. **the physical thing vs the policy that launched it:** a built network/facility
   → infrastructure; the economic-reform policy or zone designation itself →
   governmental_economic.

### Worked calls that changed under this amendment (illustrative, both countries)

- A landmark new aircraft (DC-3, Boeing 747, C919) → `innovation`, not
  `industrial` — country-neutrally, all three are new flagship products.
- A first-of-its-kind or fastest supercomputer (Cray-1, Yinhe-I, Tianhe-2) →
  `innovation` — a built computing machine, coded the same regardless of country.
- A crewed orbital laboratory (ISS, Tiangong) → `science`, not `infrastructure`.
- An AI *demonstration* (Deep Blue, Watson) → `science`; an AI *product* (ChatGPT,
  DeepSeek) → `innovation`.
- Connecting a country to the global internet → `infrastructure` (adoption), while
  *inventing* internet protocols → `science` (research first).
- Establishing Special Economic Zones → `governmental_economic` (a reform policy),
  even though it drove physical development.

*Selection layer v0.2. The recode touches only the `category` field of existing
rows; no row is added or removed by the recode itself. Newly-surfaced omissions
are added as separate OPEN-UNVERIFIED rows and logged in `notes/`.*

---

## Amendment 3 — event-anchoring rule (v0.3)

**Why:** the cross-validation against the author's spreadsheet
(`notes/crossvalidation_report.md` §D) surfaced repeated *date conflicts* that
were really *anchor* disagreements — the same technology dated to its discovery in
one source and its commercial deployment in another (penicillin 1928 vs 1943;
xerography 1938 vs 1959; the pill 1950 vs 1960). A ledger row's year and its
country attribution are only well-defined once the **event it anchors to** is
named. This amendment makes the anchor explicit.

**The rule:** every achievement anchors to exactly one **event type**, and *that
anchor decides both the `year` and the `country`.* A new `event_type` column
records it. The seven values:

| event_type | the datable moment it anchors to |
|---|---|
| `discovery` | an empirical finding of something that already existed (a fossil, an oilfield, a physical phenomenon) |
| `invention` | first creation/demonstration of a new device, technique, material, or theory (often in a lab) |
| `founding` | a named company, institution, agency, or state comes into existence |
| `first-flight/launch` | first flight, launch, or crewed/robotic space mission (incl. landings and sample-return missions) |
| `commercial-deployment` | a product ships / a service launches / a system enters public operation / a treatment is approved |
| `completion` | a discrete built work (dam, bridge, railway, building, telescope, station, standalone machine) is finished and operational |
| `milestone` | a law, policy, reform, treaty, ranking, prize, threshold, or in-mission first that is none of the above |

**Attribution follows the anchor.** The country is whoever performed *the anchored
event*, not whoever is associated with the broader technology. Worked example
(the one that motivated this): **penicillin** — the *discovery* anchor (1928) is
Alexander Fleming's, British, and therefore out of scope; the in-scope achievement
is the US **commercial-deployment** anchor (1943 deep-tank mass production). The
existing row `US-1943-1` is verified to be anchored that way. Likewise xerography
anchors to Carlson's 1938 *invention* (the row's year), not the 1959 Xerox 914
*commercial-deployment*.

**One achievement, at most one row — with a single exception.** The same
underlying technology or program may occupy **two** rows only if **two distinct
anchors each independently clear the notability bar**. Canonical case: Tiangong —
the **first space lab** (Tiangong-1, a `first-flight/launch` anchor, 2011) and the
**completed station** (a `completion` anchor, 2022) are two separate achievements,
not a date conflict. Absent two independently-notable anchors, pick the single
anchor that best captures the achievement's significance and record only that.

**Consequence for "date conflicts":** most apparent conflicts dissolve — the two
sources simply anchored to different event types (discovery vs deployment;
founding vs product; first-lab vs completed-station). The resolution is to state
each anchor's type and country, keep the in-scope one, and add a second row only
under the two-anchor rule above. The nine conflicts in the cross-validation report
are resolved this way in that report's §D addendum.

*Selection layer v0.3. Adds the `event_type` column (backfilled for all existing
rows; the backfill changes no `year`, `country`, or `category`). Rows added from
the cross-validation adjudication are logged in `notes/additions_log.md`.*

## Amendment 4 — cumulative-trajectory rows (v0.4-consistency)

Some achievements are not single dated events but **cumulative multi-year
trajectories** — a quantity that accrues, or a status reached, only across a span
of years (e.g. reform-era poverty reduction; wartime production mobilization; the
shale production ramp). Filing such a claim under one calendar year, worded as if
it were a point-event, lets a **marker year masquerade as an anchor** — the exact
failure this amendment closes.

**Rule (option b).** A cumulative multi-year achievement MAY stand as a single
ledger row iff ALL THREE hold:
  (i)   the underlying series is **independently maintained** — its source class is
        `international-body` or `independent-academic` (not official-national alone,
        and never interested-party). The magnitude the row asserts must be readable
        off that independent series.
  (ii)  `year_precision = range`, and **the span is stated explicitly in
        `claim_text`** (e.g. "Over 1978–2019, …"). No bare single-year wording.
  (iii) the **anchor-year convention is documented** (below) and followed, so the
        `year` field is a transparent filing choice, not a pretend event date.

**Anchor-year convention (documented).** A cumulative-range row is filed under the
**START-year of its stated span.** This is the only convention under which the
`year` field cannot masquerade as a discrete event: the reader sees the row sit at
the year the trajectory *began*, with the full span written in the claim. (How the
per-year momentum chart should treat a range row — anchor at start, or spread
across the span — is a *scoring* question, deferred to
`notes/scoring_rubric_DESIGN.md`; it does not change how the row is *filed*.)

**Not covered by this rule.** A **completion** or **commencement** point-event
(e.g. "the Long March completes, 1935"; "the First Five-Year Plan begins, 1953")
is already a single-date achievement — its `year` IS the event. Such rows may carry
`year_precision = range` to reflect a preceding campaign's duration, but they assert
no cumulative magnitude and are not reshaped by this amendment; where they carry a
range precision, the bounded span is added to `claim_text` for reader clarity.

**Application (this pass).** CN-1990-4 (poverty) → refiled CN-1978-3 @ 1978, span
1978–2019 explicit. US-1943-2 (WWII production) → refiled US-1942-3 @ 1942, span
1942–1945 explicit, series source upgraded to independent-academic (Harrison,
*The Economics of World War II*, Cambridge 1998). US-2013-1 (shale, still
OPEN-UNVERIFIED) → refiled US-2008-4 @ 2008, span ~2008–2018 explicit. The
start-anchored bounded programs CN-1950-2 and CN-1953-1 gained explicit spans.
The completions CN-1928-1, CN-1935-2, US-1935-2 are logged as true point-events,
unchanged. All per-row edits are justified in `notes/verification_log.md` and
`notes/additions_log.md`.

*Selection layer v0.4-consistency. Country-blind: applied by claim shape, not by
country — a US trajectory row (WWII production, shale) gets the identical treatment
as the China trajectory row (poverty).*
