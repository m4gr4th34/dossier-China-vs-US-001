# Coverage report — achievement ledger draft (1926–2026)

> ## ❄ DRAFT CORPUS FROZEN — 2026-07-27
> This coverage report accompanies `data/achievements_draft.csv`. As of
> **2026-07-27** the draft corpus is **FROZEN**: the v0.4 symmetric US adoption
> pass closed the adoption-asymmetry flag, and **no further bulk content passes
> will be run.** All subsequent changes are **per-row**, made through the
> verification ritual, each with logged justification (in `additions_log.md` or a
> row's `notes`). The freeze covers row additions/removals and bulk re-coding; it
> does not freeze the separate, later scoring/momentum layer, which is built on
> top of this corpus and is out of scope here.

This report describes *coverage and its weaknesses*, not verified truth. Counts
are the drafting agent's independent selection under `notes/selection_criteria.md`.

> **Post-freeze status (live).** The tables below are the **freeze-time v0.4
> snapshot (259 rows, all OPEN-UNVERIFIED)**. Per-row ritual changes since the
> freeze have moved the live corpus on: additions/conversions in
> `additions_log.md`, removals in `removed_rows.md`, and promotions to ESTABLISHED
> in `verification_log.md` + `claim_ledger.csv`. **Live count as of 2026-07-27:
> 271 rows (US 143, China 128), of which 266 ESTABLISHED (verification batches
> 1–10, covering the full 1926–2025 chronological corpus), 4 OPEN-UNVERIFIED, and
> 1 REPORTED (CN-1952-2 — magnitude on contested PRC official statistics).**
>
> *2026-window note (as of 2026-07-27): the dossier's stated window closes at
> end-2026, but that period is not over. The corpus currently carries no 2026 row
> and thins across 2025 — not because nothing happened, but because the final
> months simply have not occurred yet and independent corroboration for the most
> recent events does not exist. The ledger is complete THROUGH 2025's verifiable
> events, not through the window's close; it should be read as such, and the
> 2025-H2/2026 tail will be filled as events occur and become independently
> corroborable. The 4 remaining OPEN rows are early stragglers (CN-1930-1,
> CN-1940-1, CN-1952-1, CN-2003-3), not recency casualties.*
>
> *Amendment 4 (trajectory rows, 2026-07-27): CN-1990-4→CN-1978-3, US-1943-2→US-1942-3,
> and US-2013-1→US-2008-4 refiled at their span-start years; counts unchanged, two ESTABLISHED
> rows shifted decade-bucket. The v0.4 crosstab snapshot below is historical and not regenerated.*
> The snapshot tables are kept as the labeled v0.4 baseline, not re-run per row.

**Freeze-time totals (v0.4 snapshot): US 137 rows, China 122 rows, 259 total.**

> Live tables (§1–§4) are the frozen **v0.4** counts. Prior tables are preserved:
> **Appendix C** (v0.3), **Appendix B** (v0.2 post-recode), **Appendix A**
> (original pre-recode draft) — so the whole correction history stays auditable.

---

## Update note (v0.4) — the symmetric US adoption pass; asymmetry closed; corpus frozen

v0.3 flagged an **adoption asymmetry**: two China-focused passes had densified
1996–2026 on the China side while the US author-only pool was left un-adopted.
This pass fixes that by adjudicating the US pool (`crossvalidation_report.md` §B2)
against **the same bar used for China**.

- **10 US rows added** (event-anchored, OPEN-UNVERIFIED; `additions_log.md` v0.4):
  DARPA (1958), Intel (1968), FedEx (1971), Atari/Pong (1972), C language (1972),
  Genentech (1976), first MRI scan (1977), Cisco (1984), first commercial 3D
  printer (1988), Android (2008). **US 127 → 137.**
- **1 China second-anchor added:** Tiangong-1 (2011) first space lab, distinct
  from the completed station (§D two-anchor rule). **China 121 → 122.**
- **Bitcoin excluded** with a documented country-anchoring decision (pseudonymous
  inventor → not US-anchorable under Amendment 3).

**The count is bar-driven, not tuned (10 US vs 9 China in v0.3).** Two things make
this genuinely symmetric, not a thumb on the scale:
1. The US **platform-tier** firms (Uber, Netflix, PayPal, Airbnb) were **rejected**
   — because their Chinese analogs (Didi = ride-hailing, Meituan = local services,
   JD = e-commerce) were **also** left out of the China pass. The one platform
   admitted for China (ByteDance/TikTok, uniquely globally category-defining) has
   its US-tier equivalents (Google, Facebook, YouTube, Amazon, iPhone) **already**
   in the ledger from the original draft.
2. The US additions land in **1958–2008** (a foundational-tech and
   industry-creating cluster), *not* the recent tail — so they did not
   manufacture recent-decade parity.

**What this does to the picture:** the `innovation` gap **widened** (US 46 → 54 vs
China 21). That is the correct, honest outcome of applying one bar to both sides:
with the adoption effort now symmetric, the residual gap is **real time-shape**
(the US had more datable foundational-tech and industry-creating events across the
century), **not an adoption artifact.** The recent-decade China>China totals
(2006–2015: China 21 vs US 14) also persist for the same reason — both sides were
adjudicated, and China genuinely has more datable major-firm foundings in that
window. **The adoption-asymmetry caveat is now closed.**

---

## 1. Totals per country per decade (v0.4, FROZEN)

| Decade | US | China |
|---|---|---|
| 1926-1935 | 14 | 9 |
| 1936-1945 | 12 | 6 |
| 1946-1955 | 13 | 11 |
| 1956-1965 | 14 | 9 |
| 1966-1975 | 17 | 10 |
| 1976-1985 | 15 | 12 |
| 1986-1995 | 13 | 13 |
| 1996-2005 | 12 | 14 |
| 2006-2015 | 14 | 21 |
| 2016-2026 | 13 | 17 |
| **Total** | **137** | **122** |

**Density-target note (now symmetric exceedances).** Over-target (>15) cells now
exist on **both** sides: **US 1966–1975 = 17** and **1976–1985 = 15** (the
microprocessor/logistics/software + biotech/networking clusters), and **China
2006–2015 = 21** and **2016–2026 = 17**. Each row independently clears the
notability bar, so per criteria §7 they are kept and the overflow is flagged
rather than trimmed. The exceedances are no longer one-sided, which is the point
of this pass.

## 2. Category totals per country (v0.4)

| Category | US | China |
|---|---|---|
| innovation | 54 | 21 |
| infrastructure | 10 | 18 |
| industrial | 3 | 12 |
| science | 47 | 29 |
| social | 9 | 12 |
| governmental_economic | 14 | 30 |

The `innovation` gap widened to 54 vs 21 — see the update note: with both sides
adjudicated by one bar, this is the genuine time-shape of foundational-tech and
firm-founding events, not adoption effort. `infrastructure`, `industrial`, and
`governmental_economic` still lean China (built works and reform-policy density);
`science` leans US (47 vs 29).

## 3. Full matrices (decade × category, v0.4)

### United States

| Decade | innov | infra | indus | sci | social | gov/econ | Tot |
|---|---|---|---|---|---|---|---|
| 1926-1935 | 5 | 2 | 0 | 4 | 1 | 2 | 14 |
| 1936-1945 | 3 | 2 | 1 | 3 | 1 | 2 | 12 |
| 1946-1955 | 4 | 0 | 0 | 6 | 1 | 2 | 13 |
| 1956-1965 | 4 | 1 | 0 | 3 | 4 | 2 | 14 |
| 1966-1975 | 11 | 0 | 0 | 4 | 0 | 2 | 17 |
| 1976-1985 | 8 | 1 | 0 | 5 | 0 | 1 | 15 |
| 1986-1995 | 7 | 3 | 0 | 2 | 0 | 1 | 13 |
| 1996-2005 | 7 | 0 | 0 | 5 | 0 | 0 | 12 |
| 2006-2015 | 4 | 0 | 1 | 7 | 2 | 0 | 14 |
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
| 2006-2015 | 8 | 4 | 2 | 5 | 1 | 1 | 21 |
| 2016-2026 | 3 | 4 | 1 | 8 | 1 | 0 | 17 |

## 4. Event-type distribution (v0.4)

| event_type | US | China |
|---|---|---|
| discovery | 2 | 4 |
| invention | 21 | 4 |
| founding | 25 | 18 |
| first-flight/launch | 21 | 13 |
| commercial-deployment | 33 | 5 |
| completion | 5 | 18 |
| milestone | 30 | 60 |

The US pass sharpened the two development shapes rather than blurring them:
- **US** is `invention` (21), `founding` (25), and `commercial-deployment` (33)
  heavy — a century of lab inventions, company foundings, and productized-to-market
  technologies. The pass raised `founding` (19→25) and `invention` (19→21).
- **China** is `completion` (18) and `milestone` (60) heavy — built works and
  state/policy/ranking milestones — with `founding` (18) close to US, clustered
  post-1984.
- The near-empty US `completion` (5) vs China (18) and near-empty China
  `commercial-deployment` (5) vs US (33) is the cleanest single view of the two
  paths: **US productizes inventions into markets; China completes built works and
  crosses policy/scale milestones.**

## 5. Where my confidence is weakest (read before trusting the tables)

### 5.1 `innovation` — the gap is now genuine time-shape, adoption-symmetric
US 54 vs China 21, both sides adjudicated by one bar. The residual is **not** an
adoption artifact anymore (the US platform-tier was excluded symmetrically to
Didi/Meituan/JD; US additions landed in 1958–2008). It reflects that the US had
more datable foundational-tech and industry-creating events across the century.
Two honest residual caveats remain: (a) the "landmark product = innovation vs
scale = industrial" coding is a defensible-but-not-unique judgment (Amendment 1);
(b) diffuse capability build-outs still lack crisp years and are under-counted
relative to founded firms — and this cuts against *both* countries' diffuse
achievements.

### 5.2 `governmental_economic` (China 30 vs US 13) — structural, unchanged
China's reform century is dense in discrete, datable policy/institution milestones;
comparable US institutional change is older than 1926, diffuse, or coded `social`.
The `milestone` event-type gap (60 vs 30) is the same fact through the anchor lens.

### 5.3 China 1926–1945 remains the one genuinely under-covered region
Untouched by every pass. Thin for real reasons (fragmentation, war) **and**
English-source bias. This is now the **only** structural coverage gap left, and —
being frozen — is flagged as the first thing a future *per-row* pass (through the
verification ritual) should revisit, not a bulk pass.

### 5.4 Early-PRC rows rest on contested statistics
Unchanged. 1949–1978 output/poverty/plan rows lean on official PRC figures with
documented reliability disputes; entered OPEN-UNVERIFIED with the caveat in `notes`.

### 5.5 Recency limit unchanged
Window ends mid-2026; confident entries stop near early 2025. The v0.4 US additions
are all anchored ≤ 2008; the China second-anchor is 2011. None touches the tail.

### 5.6 Attribution calls — now anchor-governed
Amendment 3 made these explicit and this pass exercised them hard: penicillin →
US 1943 commercial-deployment (not the 1928 British discovery); **Bitcoin →
excluded** (pseudonymous inventor, no clean national anchor); **lithium-ion →
excluded** (multinational, no clean anchor); MRI → US with the UK-Nobel share
noted in-row. Foreign firsts stay out of scope (WWW/CERN, Higgs/CERN, Dolly/UK,
first human spaceflight/USSR).

## 6. How the pre-declared biases played out (v0.4, final)

| Bias (criteria §8) | Final verdict |
|---|---|
| Recency bias | **Neutralized as a one-sided effect** — both sides now have over-target cells, and neither adoption pass targeted the uncertain recent tail. |
| English-source bias vs China | Modern innovation gaps closed both ways; **1926–1945 China still under-covered** (§5.3), now the sole remaining gap. |
| Category imbalance | Coding artifact fixed (Amendment 1); residual gaps interpreted via time-shape + event-type, not laundered. |
| Nameable-project / great-man bias | Present and now explicit: `founding` is a large event-type on both sides — the ledger is, by construction, a nameable-events ledger. |
| Survivorship / hindsight | Unquantified; accepted. |
| Statistical definitional drift | Flagged per-row; not resolved. |

## 7. Bottom line at freeze
Both sides are now adjudicated by one published bar; the category-coding artifact
is fixed; every row is event-anchored; the adoption asymmetry is closed. The
corpus is a defensible factual spine — still **counts of a judgment-laden
selection, not measurements**, and the momentum layer must be built with §5's
caveats visible, never on raw tallies. The one open coverage item, deferred to a
future **per-row** pass (not a bulk pass, per the freeze), is the **China 1926–1945**
under-coverage (§5.3). The robust cross-cutting findings: (a) the **decade-total
shape** — US flat with a 1966–1985 foundational-tech bump, China thin-early rising
late; and (b) the **event-type signature** — US productizes inventions to market,
China completes built works and crosses policy/scale milestones (§4). Both survive
every correction pass.

---

## Appendix C — v0.3 tables (superseded)

From the v0.3 report (248 rows: after event-anchoring and the nine cross-validation
additions, before the symmetric US pass). **Do not cite as current** — see §1–§4.

### C.1 Totals per country per decade (v0.3)

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

### C.2 Category totals (v0.3)

| Category | US | China |
|---|---|---|
| innovation | 46 | 21 |
| infrastructure | 10 | 18 |
| industrial | 3 | 12 |
| science | 46 | 28 |
| social | 9 | 12 |
| governmental_economic | 13 | 30 |

### C.3 Event-type totals (v0.3)

| event_type | US | China |
|---|---|---|
| discovery | 2 | 4 |
| invention | 19 | 4 |
| founding | 19 | 18 |
| first-flight/launch | 21 | 12 |
| commercial-deployment | 31 | 5 |
| completion | 5 | 18 |
| milestone | 30 | 60 |

---

## Appendix B — v0.2 post-recode tables (superseded)

From the v0.2 report (239 rows: after the country-blind category recode and the
first five added firms, before event-anchoring and the cross-validation additions).
**Do not cite as current.**

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

---

## Appendix A — pre-recode tables (original independent draft, superseded)

From the first drafting pass (234 rows, before any recode or additions). **Do not
cite as current.**

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
