# Coverage report — achievement ledger draft (1926–2026)

Generated from `data/achievements_draft.csv`. All **248 rows are OPEN-UNVERIFIED**;
this report describes *coverage and its weaknesses*, not verified truth. Counts
are the drafting agent's independent selection under `notes/selection_criteria.md`.

**Totals: US 127 rows, China 121 rows, 248 total.**

> **This is the v0.3 report.** Live tables (§1–§4) are the current counts after
> the event-anchoring pass (Amendment 3) and the nine cross-validation additions.
> The prior **v0.2 post-recode** tables are preserved in **Appendix B**, and the
> original **pre-recode** tables in **Appendix A**, so every correction stays
> auditable. Read the update note next.

---

## Update note (v0.3) — what changed since v0.2

1. **Event-anchoring (Amendment 3).** Added an `event_type` column
   (discovery/invention/founding/first-flight-launch/commercial-deployment/
   completion/milestone) and backfilled all rows; the anchor decides each row's
   year and country. No year/country/category changed. New §4 shows the
   distribution.
2. **Nine cross-validation additions** (`additions_log.md`, provenance
   *author-sheet-via-crossvalidation*): BGI, iFlytek, Hikvision, Xiaomi, NIO,
   SenseTime (innovation), Long March 5 (science), Beijing Daxing airport
   (infrastructure), HarmonyOS (innovation) — author-sheet candidates that passed
   the notability rule. **China 112 → 121.** (TMSR/thorium was parked pending
   operational verification.)
3. **Date conflicts resolved** by anchoring, with **zero** changes to existing
   ledger years (see `crossvalidation_report.md` §D addendum).

### ⚠ The most important new caveat: adoption asymmetry
The v0.2 recode and these v0.3 additions were **deliberately China-focused**,
because the original artifact *under-credited* China. They added 5 + 9 = **14
Chinese firms/achievements, almost all in 1996–2026**, while **no symmetric US
completeness pass has been done** — the cross-validation surfaced strong US
author-only candidates too (FedEx, Cisco, Intel, Bitcoin, MRI, 3D printing, …)
that were **not** added. So today's recent-decade picture (China 20 in 2006–2015,
17 in 2016–2026, vs US 13/13) partly reflects **asymmetric adoption effort, not
only underlying reality.** This must be stated loudly to any downstream momentum
index: *do not read the recent China>US row counts as momentum* until a symmetric
US pass is run (see §7).

---

## 1. Totals per country per decade (v0.3)

| Decade | US | China |
|---|---|---|
| 1926-1935 | 14 | 9 |
| 1936-1945 | 12 | 6 |
| 1946-1955 | 13 | 11 |
| 1956-1965 | 13 | 9 |
| 1966-1975 | 13 | 10 |
| 1976-1985 | 12 | 12 |
| 1986-1995 | 12 | 13 |
| 1996-2005 | 12 | 14 |
| 2006-2015 | 13 | 20 |
| 2016-2026 | 13 | 17 |
| **Total** | **127** | **121** |

**Density-target note (now a real exceedance, flagged honestly).** China
**2006–2015 = 20** and **2016–2026 = 17** are both **above the 5–15 target band**
(1996–2005 sits at 14). Each added row independently clears the notability bar, so
the criteria §7 rule says keep them and flag the overflow rather than trim to a
quota — but the exceedance is now large enough that it interacts with the adoption
asymmetry above: the modern Chinese decades are the *only* cells that received two
rounds of candidate adoption. A future pass should either run the symmetric US
adoption or trim both sides to the band; until then the recent-decade totals are
not comparable at face value.

## 2. Category totals per country (v0.3)

| Category | US | China |
|---|---|---|
| innovation | 46 | 21 |
| infrastructure | 10 | 18 |
| industrial | 3 | 12 |
| science | 46 | 28 |
| social | 9 | 12 |
| governmental_economic | 13 | 30 |

The `innovation` gap has narrowed across three passes (US43/CN6 → US46/CN14 →
**US46/CN21**) as the coding artifact was fixed and omissions adopted; the residual
is now heavily shaped by the adoption asymmetry (§ update note) and the genuine
time-shape of when each commercial-innovation economy existed (§5.1).

## 3. Full matrices (decade × category, v0.3)

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
| 1996-2005 | 5 | 1 | 2 | 2 | 0 | 4 | 14 |
| 2006-2015 | 8 | 4 | 2 | 4 | 1 | 1 | 20 |
| 2016-2026 | 3 | 4 | 1 | 8 | 1 | 0 | 17 |

## 4. Event-type distribution (v0.3, new)

| event_type | US | China |
|---|---|---|
| discovery | 2 | 4 |
| invention | 19 | 4 |
| founding | 19 | 18 |
| first-flight/launch | 21 | 12 |
| commercial-deployment | 31 | 5 |
| completion | 5 | 18 |
| milestone | 30 | 60 |

The anchoring makes the two development paths legible at a glance, and the shapes
are substantive, not artifacts:
- **US is `invention`- and `commercial-deployment`-heavy** (19 + 31): a century of
  lab inventions productized into markets.
- **China is `completion`- and `milestone`-heavy** (18 + 60): built works (dams,
  bridges, railways, stations, telescopes) and state/policy/ranking milestones.
- **`founding` is near-parity** (19 vs 18) — but China's foundings cluster
  post-1984 and are the category most affected by the adoption asymmetry (§ update
  note), so read it with that caveat.
- The high China `milestone` count (60) is the same phenomenon as the
  `governmental_economic` gap (§5.2): China's reform century is dense in discrete,
  datable policy/threshold events.

## 5. Where my confidence is weakest (read this before trusting the tables)

### 5.1 `innovation` — artifact corrected; residual is time-shape **plus adoption asymmetry**
US 46 vs China 21 is now coded by one country-blind rule, and Chinese innovation
is populated across the modern decades. Two honest drivers of the residual:
- **Time-shape (real):** the US produced datable market-creating firms/products
  across the *entire* century; China's cluster after ~1984. That is a real feature
  of the two paths — a statement about *when* each commercial-innovation economy
  existed, not inventive capacity per decade.
- **Adoption asymmetry (a method artifact, new and important):** China's recent
  innovation count was raised by two China-focused adoption passes; the comparable
  US author-only candidates were left un-adopted. So part of the *narrowing* on the
  China side — and the recent-decade China>US flip — is effort, not measurement.
  Symmetry requires either adopting the US candidates or not having adopted the
  Chinese ones; the honest state is that this has not been equalized.

### 5.2 `governmental_economic` (China 30 vs US 13) — mostly structural
Unchanged in reading: China's reform century produced an unusually dense sequence
of discrete, datable institutional/policy milestones; comparable US institutional
change is older than the 1926 window, more diffuse, or coded into `social`. Not a
scoreboard — it reflects how each state's development was structured. (The `milestone`
event-type gap in §4 is the same fact seen through the anchor lens.)

### 5.3 China 1926–1945 is still genuinely under-covered
Unchanged and untouched by every pass so far: the Republican-era and
War-of-Resistance decades (China 9, then 6) are thin for real reasons
(fragmentation, war) **and** English-source bias. Treat as a floor; a
China-specialist source pass would likely add rows. This is now the *only*
clearly-thin China region left, and correcting it would raise early-decade counts
(partly offsetting the recent-decade adoption asymmetry).

### 5.4 Early-PRC rows rest on contested statistics
Unchanged. Several 1949–1978 rows rely on official PRC figures with documented
reliability disputes; entered OPEN-UNVERIFIED with the caveat in `notes`.

### 5.5 The 2016–2026 tail is still recency-limited
The window ends mid-2026; confident entries stop near early 2025. The v0.3
additions are anchored to founding/first-flight/completion events **all ≤ 2019**
(latest: Daxing airport and HarmonyOS, 2019), so they do not touch the uncertain
recent tail.

### 5.6 Attribution and date calls a reviewer may contest
Unchanged. Excluded on non-US/non-China attribution: World Wide Web (CERN), Higgs
(CERN), AlphaGo/AlphaFold (UK), Dolly/IVF (UK). Included as US with a collaboration
note: CRISPR (US–France), mRNA vaccines (US + German BioNTech). Anchoring
(Amendment 3) now makes the penicillin-type cases explicit: the in-scope row is
whichever *anchor event* is US/Chinese (penicillin → US 1943 commercial-deployment,
not the 1928 British discovery).

## 6. How the pre-declared biases actually played out (v0.3)

| Bias (criteria §8) | Verdict |
|---|---|
| Recency bias | **Now partly re-introduced on the China side** by the adoption passes (recent decades over target); flagged in §1 and §5.1 as the top thing to equalize. |
| English-source bias vs China | Modern innovation omissions fixed; **1926–1945 still under-covered** (§5.3). |
| Category imbalance | Coding artifact addressed; residual `innovation`/`gov-economic` gaps interpreted, not laundered. |
| Nameable-project / great-man bias | Still present, and the firm-founding adoption passes lean *into* it — `founding` is now a large event-type (§4). |
| Survivorship / hindsight | Unquantified; accepted. |
| Statistical definitional drift | Flagged per-row; not resolved. |

## 7. Bottom line for the next pass
The category-coding artifact is corrected and the ledger is now event-anchored, so
the tables are cleaner to reason about — but a **new asymmetry** was introduced:
two China-focused adoption passes densified 1996–2026 on the China side with no
symmetric US pass. **Before any momentum index is built, equalize this** — the
single highest-value next action is a **symmetric US author-only adoption pass**
(FedEx, Cisco, Intel, Bitcoin, MRI, 3D printing, PayPal, etc.), decided by the same
notability rule, so the recent decades are comparable. Then: (b) the
China-specialist **1926–1945** pass (§5.3); (c) the contested **early-PRC statistics**
cross-check; (d) the deferred symmetric `industrial`/`infrastructure` sweep. The
one finding robust to all of this remains the **decade-total shape** (China's thin
early tail rising over the century) — but even that is now partly adoption-shaped
in the last two decades and must be read with §1/§5.1 in view.

---

## Appendix B — v0.2 post-recode tables (superseded)

Preserved verbatim from the v0.2 report (239 rows: after the country-blind category
recode and the first five added firms, before event-anchoring and the nine
cross-validation additions). **Do not cite as current** — see §1–§4.

### B.1 Totals per country per decade (v0.2)

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

### B.2 Category totals per country (v0.2)

| Category | US | China |
|---|---|---|
| innovation | 46 | 14 |
| infrastructure | 10 | 17 |
| industrial | 3 | 12 |
| science | 46 | 27 |
| social | 9 | 12 |
| governmental_economic | 13 | 30 |

### B.3 US decade × category (v0.2)

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

### B.4 China decade × category (v0.2)

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 0 | 1 | 1 | 2 | 1 | 4 | 9 |
| 1936-1945 | 0 | 1 | 2 | 1 | 0 | 2 | 6 |
| 1946-1955 | 0 | 1 | 2 | 1 | 3 | 4 | 11 |
| 1956-1965 | 1 | 2 | 2 | 2 | 1 | 1 | 9 |
| 1966-1975 | 0 | 1 | 0 | 6 | 1 | 2 | 10 |
| 1976-1985 | 2 | 0 | 0 | 1 | 2 | 6 | 12 |
| 1986-1995 | 2 | 3 | 0 | 1 | 2 | 5 | 13 |
| 1996-2005 | 2 | 1 | 2 | 2 | 0 | 4 | 11 |
| 2006-2015 | 5 | 4 | 1 | 4 | 1 | 1 | 17 |
| 2016-2026 | 2 | 3 | 1 | 7 | 1 | 0 | 14 |

---

## Appendix A — pre-recode tables (original independent draft, superseded)

Preserved verbatim from the first drafting pass (234 rows, before any recode or
additions). Kept so the whole correction history is auditable. **Do not cite as
current.**

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
