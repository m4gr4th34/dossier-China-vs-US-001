# Additions log — v0.2 country-blind recode pass

New rows added to `data/achievements_draft.csv` during the category
re-adjudication (see `notes/selection_criteria.md` Amendment 1). These are the
`innovation`-category omissions flagged in `notes/coverage_report.md` §4.1 —
major technology/industrial firms whose absence was itself the English-source /
classification bias biting. All land **OPEN-UNVERIFIED** like every other row.

| id | year | row | one-line reason for adding |
|---|---|---|---|
| CN-1987-1 | 1987 | Huawei founded | World's largest telecom-equipment maker and a 5G leader; a clear `innovation` firm the draft omitted. |
| CN-1995-1 | 1995 | BYD founded | World's largest EV/new-energy-vehicle maker; the founding was absent (only appeared inside another row's note). |
| CN-2006-3 | 2006 | DJI founded | Dominant global consumer/commercial drone maker; a category-defining firm the draft omitted. |
| CN-2011-1 | 2011 | CATL founded | World's largest EV-battery maker; anchors the battery-supply-chain achievement missing from the ledger. |
| CN-2012-1 | 2012 | ByteDance founded | Douyin/TikTok — the first Chinese consumer-internet platform at mass global scale; omitted despite clear parallels to US social platforms already in the ledger. |

## Why only Chinese firms were added

The coverage report's §4.1 finding was specifically that **Chinese commercial
innovation was under-credited**; the five flagged names are all Chinese, and all
were genuinely absent. I re-checked the US `innovation` set (43 rows before the
recode) for comparably-absent US firms and found it already densely populated
(Apple, Google, Microsoft, SpaceX, Tesla, Amazon, Facebook, YouTube, eBay,
Netscape, HP, Intel products, etc.). Adding more US firms was not warranted by
the flagged defect and would have worked against the correction, so I added none.
This is a documented asymmetry with a reason, not a thumb on the scale — the
opposite miscoding (US firms missing) did not exist to correct.

## Comparable case considered but NOT added (logged for the next pass)

- **China's solar-photovoltaic manufacturing dominance** (~2010s): genuinely
  absent from the ledger and arguably notable. I did **not** add it here because
  under the amended rules it is an `industrial` scale-leadership story (no single
  new firm/product is the achievement), not an `innovation` omission of the kind
  this pass targets. Flagged here as a candidate `industrial` row for a future
  coverage-completeness pass, so the decision is visible rather than silent.
- A symmetric reminder: the recode also did **not** hunt for missing US rows in
  other categories; this pass was scoped to fixing the category *coding* artifact
  plus the specific `innovation` omissions named in the coverage report.

---

## v0.3 additions — from the cross-validation adjudication (author-sheet-via-crossvalidation)

Nine rows added after the author reviewed `notes/crossvalidation_report.md` §B
(author-only candidates). Provenance for all: **author-sheet-via-crossvalidation**
(present in the author's spreadsheet, judged to pass the notability rule, adopted
into the ledger). All land **OPEN-UNVERIFIED**; each carries an `event_type`
anchor (Amendment 3).

| id | year | anchor | row | reason for adding |
|---|---|---|---|---|
| CN-1999-2 | 1999 | founding | BGI founded | Among the world's largest genome-sequencing organizations; distinct founding anchor from its later HGP-share completion row (CN-2003-2). |
| CN-1999-3 | 1999 | founding | iFlytek founded | Leading speech-AI firm; genuine national-scale tech player. |
| CN-2001-3 | 2001 | founding | Hikvision founded | World's largest video-surveillance-equipment maker. **Notability is not endorsement:** its role in state surveillance (incl. Xinjiang) and consequent foreign sanctions are stated plainly in the row's `notes`. |
| CN-2010-3 | 2010 | founding | Xiaomi founded | Top-tier global smartphone / IoT maker; the strongest single innovation omission. |
| CN-2014-4 | 2014 | founding | NIO founded | Major premium-EV maker; rounds out the EV cluster (BYD, CATL). |
| CN-2014-5 | 2014 | founding | SenseTime founded | Leading computer-vision/AI firm. Surveillance use and foreign sanctions noted plainly in `notes`; notability is not endorsement. |
| CN-2016-3 | 2016 | first-flight/launch | Long March 5 maiden flight | Heavy-lift rocket that enabled the station, lunar-sample, and Mars missions. |
| CN-2019-3 | 2019 | completion | Beijing Daxing airport opens | Among the world's largest single-terminal airports. |
| CN-2019-4 | 2019 | commercial-deployment | HarmonyOS released | Huawei's independent OS built under US sanctions; a notable post-sanctions capability. |

China total: 112 → **121**. (US unchanged.)

### Parked — NOT added (pending verification)
- **TMSR / thorium molten-salt reactor** (`tmsr-sf (100mw)`, author-dated 2024): a
  potentially major energy-science *first*, but its operational status is not yet
  something I can corroborate to the standard the ledger needs even for an
  OPEN-UNVERIFIED row anchored to a real event. **Parked pending operational
  verification** (confirmation the reactor reached the claimed operational
  milestone, with a datable event to anchor). Revisit when a firm anchor exists;
  the bracketed `[tmsr-lf (24mw)]` (2020) remains speculative-at-authoring.

### Candidates considered from §B but NOT added this pass
- Other author-only candidates surfaced in the cross-validation (e.g. JD, Megvii,
  Geely, Bitmain, Cambricon, quantum-radar, Long March 5's precursors, the
  Tiangong-1 first-lab second anchor) were **not** part of the author's explicit
  adjudicated add-list for this pass and are left for a future review, so the
  scope of what was adopted stays legible.

---

## v0.4 additions — the symmetric US adoption pass (author-sheet-via-crossvalidation)

Closes the adoption-asymmetry flagged in `coverage_report.md` v0.3: the US
author-only pool (`crossvalidation_report.md` §B2) is now adjudicated by the **same
bar used for the China side** — add foundational technologies and
industry-creating/defining firms not already in the ledger; reject consumer
brands, VC firms, follower-firms, foreign/multinational attribution, and
below-bar products. **Count is bar-driven, not tuned:** this pass adds **10 US**
rows (vs the 9 China rows of v0.3) plus **1 China** second-anchor. All
OPEN-UNVERIFIED, event-anchored.

### US rows added (10)

| id | year | anchor | row | reason |
|---|---|---|---|---|
| US-1958-4 | 1958 | founding | DARPA established | Foundational research agency; peer of NASA (seeded ARPANET/GPS/stealth). |
| US-1968-1 | 1968 | founding | Intel founded | The company that commercialized the microprocessor; founding row parallel to Apple's, distinct from its product rows. |
| US-1971-4 | 1971 | founding | FedEx founded | Created the overnight-logistics industry. |
| US-1972-2 | 1972 | founding | Atari founded (Pong) | Two-anchor: birth of the commercial video-game industry, distinct from the 2600 console (US-1977-2). |
| US-1972-3 | 1972 | invention | C language | Foundational systems-programming language (with Unix, underlies most software). |
| US-1976-3 | 1976 | founding | Genentech founded | Two-anchor: birth of the biotech industry, distinct from the 1980 IPO/Bayh-Dole milestone (US-1980-1). |
| US-1977-3 | 1977 | invention | first MRI scan | Foundational medical-imaging technology (US Damadian/Lauterbur; UK Mansfield shared the Nobel — attribution note in the row). |
| US-1984-2 | 1984 | founding | Cisco founded | Defined internet-networking hardware. |
| US-1988-2 | 1988 | commercial-deployment | first commercial 3D printer | Additive-manufacturing category; flagged as the weakest addition (notable, not economy-transforming). |
| US-2008-3 | 2008 | commercial-deployment | Android launches | World's dominant mobile OS; symmetric analog to HarmonyOS (CN-2019-4). |

US total: 127 → **137**.

### China second-anchor added (1) — from the §D deferred sweep

| id | year | anchor | row | reason |
|---|---|---|---|---|
| CN-2011-2 | 2011 | first-flight/launch | Tiangong-1 first space lab | Passes the two-anchor rule: first Chinese space lab and first orbital dockings (2011-12), distinct from the completed station (CN-2022-1, 2022). |

China total: 121 → **122**.

### Bitcoin — explicit country-anchoring decision: NOT added (documented)
Bitcoin clears the notability bar easily (foundational cryptocurrency/blockchain).
The blocker is **country attribution under the anchoring rule**, and the call is
made visible here as instructed. The achievement's anchor is the **invention**
(2008 whitepaper / 2009 genesis block) by the pseudonymous **"Satoshi Nakamoto,"
of unknown nationality.** Amendment 3 says *attribution follows the anchor's
performer* — and an invention whose inventor's nationality is unknown **cannot be
cleanly attributed to the US.** Attributing Bitcoin to the US on the basis of the
large US crypto ecosystem would be *attribution by association*, which the rule
forbids. **Decision: excluded from the US ledger.** (A future pass could add a
cleanly-US-anchored crypto milestone instead — e.g. a US exchange founding or the
2024 US spot-Bitcoin-ETF approval — but the Bitcoin *invention* itself is not
US-anchorable.)

### US author-only entries REJECTED (with reason)
- **AMD (1969), Nvidia founding (1993):** follower / already-represented — Intel
  represents the semiconductor-founding milestone; Nvidia is represented by its
  2024 AI-hardware row (US-2024-2). Below the two-anchor bar.
- **PayPal, Netflix, Uber, Airbnb, GitHub, LinkedIn (platforms/services):** genuine
  but below the *industry-creating / foundational-technology* bar this pass used;
  kept selective, exactly as the China side left out JD/Meituan/Didi. E-commerce and
  social are already represented (Amazon, eBay, Facebook, YouTube, Google).
- **GPT-3 (2020):** redundant — bracketed by Transformer (US-2017-1) and ChatGPT
  (US-2022-5) already in the ledger.
- **Neuralink (2020):** demo-stage, no realized-achievement anchor (parked-like TMSR).
- **M1 chip (2020), 23andMe (2006):** product / consumer-service, below bar.
- **Lithium-ion battery (1985):** rejected on **attribution**, not notability —
  the foundational work is genuinely multinational (Whittingham US, Goodenough
  US/UK, Yoshino Japan), with no clean single-country anchor.
- **Pentagon (1943), venture capital (1946), credit card (1950), general atomics
  (1955), Lockheed (1926), McKinsey (1926):** office building / diffuse
  financial-sector development / consumer financial product / below-bar firm —
  none clears the "a serious history would be negligent to omit it" test at a
  national-achievement level.
- **Bucketed by class (rejected):** consumer food/retail brands (Starbucks, Whole
  Foods, Chick-fil-A, In-N-Out, Shake Shack, …), VC firms (Sequoia, a16z, Founders
  Fund, …), individual consumer gadgets (Roomba, Kindle variants, apple-watch/airpods
  variants, …), and crypto tokens beyond the category-definer.
- **Foreign (out of scope), appearing in the US-candidate columns:** first heart
  transplant (South Africa), DNA double helix (UK/US), first mammal cloned (UK),
  Higgs (CERN), human space flight (USSR), Toyota/Sony/Samsung/etc.

### What this closes
This is the **symmetric US pass** the v0.3 report demanded. Both sides have now
been adjudicated by the same published bar. The residual innovation gap that
remains (US > China, wider after this pass) is no longer an *adoption-effort*
artifact — it is the genuine time-shape of when each country's datable
foundational-tech and industry-creating events occurred. **The draft corpus is
now frozen** (see `coverage_report.md` header): no further bulk content passes;
subsequent changes are per-row, through the verification ritual, with logged
justification.

---

## Post-freeze per-row changes — batch-1 proposal ruling (2026-07-27)

The verification batch-1 log surfaced four China 1926–1945 candidates as
proposals; the author **approved them with structure**. These are the first
per-row changes through the freeze. Provenance for all:
**verification-batch-1-proposal, author-approved**. All land **OPEN-UNVERIFIED**
and queue for verification in their chronological batch.

### Added (4)

| id | year | anchor | row | note |
|---|---|---|---|---|
| CN-1930-2 | 1930 | milestone | tariff-autonomy restoration completed | Anchor justification: the restoration ran as a treaty sequence (US 1928 → others → **Japan, the last major power, 1930**); anchored to the 1930 completion, to be confirmed at verification. `governmental_economic`. |
| CN-1931-1 | 1931 | founding | Liang Shuming's Zouping rural reconstruction | **Converts** the diffuse Ding County education row (CN-1929-2, removed). `social`. |
| CN-1933-1 | 1933 | milestone | 'abolish the tael, adopt the yuan' currency reform | Datable 1933 precursor to the 1935 fabi reform (CN-1935-1). `governmental_economic`. |
| CN-1936-1 | 1936 | completion | Canton–Hankow (Yuehan) Railway completed | **Covers/converts** the diffuse Nanjing-decade infrastructure row (CN-1934-1, removed), narrowed to the era's flagship datable railway. `infrastructure`. |

### Converted / removed (2 → `notes/removed_rows.md`)

- **CN-1929-2** (Ding County education, diffuse) → removed, *superseded by anchored
  reformulation* CN-1931-1 (Zouping).
- **CN-1934-1** (Nanjing-decade infrastructure, diffuse) → removed, *superseded by
  anchored reformulation* CN-1936-1 (Canton–Hankow Railway).

### Not converted — remains OPEN-UNVERIFIED (do not force)

- **CN-1930-1** (cotton-textile leadership, diffuse `industrial`): no added anchored
  claim genuinely covers it (currency reform and the railway are unrelated to
  cotton-textile output), so per the author's ruling it is left OPEN-UNVERIFIED
  rather than force-converted. Re-eligible in a future per-row pass if a datable
  anchor (a specific mill/output milestone) is found.

**Net:** +4 added, −2 removed. China 122 → **124**; corpus 259 → **261**. The
`coverage_report.md` v0.4 tables are the freeze-time snapshot; this delta is
tracked here, in `removed_rows.md`, and in `verification_log.md`.

---

## Post-freeze per-row change — batch-2 proposal ruling (2026-07-27)

The verification batch-2 log surfaced the Burma Road as a proposal; the author
**approved** it. Provenance: **verification-batch-2-proposal, author-approved**.
Lands OPEN-UNVERIFIED, queues for verification.

| id | year | anchor | row | note |
|---|---|---|---|---|
| CN-1938-3 | 1938 | completion | Burma Road completed | `infrastructure`. **Joint China–Britain context stated plainly:** Chinese-built (est. ~200,000 laborers) but terminating in British Burma (Lashio); recorded as a primarily-Chinese engineering achievement with the British-Burma terminus noted. Attribution judged China with that caveat. |

**Net:** +1. China 124 → **125**; corpus 261 → **262**.

---

## Post-freeze per-row change — batch-3 proposal ruling (2026-07-27)

Author approved three proposals. Provenance: **verification-batch-3-proposal, author-approved**. All OPEN-UNVERIFIED; queue for batch 4.

| id | year | anchor | row | note |
|---|---|---|---|---|
| CN-1956-3 | 1956 | milestone | Simplified-characters scheme promulgated | `social`; the first (1956) list, distinct from Hanyu Pinyin (CN-1958-1). |
| US-1957-1 | 1957 | completion | Shippingport nuclear plant | `infrastructure`; first full-scale US commercial nuclear power plant. |
| US-1958-5 | 1958 | commercial-deployment | Boeing 707 enters service | `innovation`; **anchor rationale:** the achievement is inaugurating the commercial jet age, realized at market entry (Pan Am service, 26 Oct 1958), so commercial-deployment is chosen over the 20 Dec 1957 prototype first flight — consistent with the Boeing 747's commercial-deployment anchor (US-1970-1). The 1957 first flight is recorded as the alternative. |

**Net:** +3 rows. China 125 → **126**, US 137 → **139**. Corpus 262 → **265**. (Burma Road's promotion changed no counts.)

---

## Post-freeze per-row change — batch-4 proposal ruling (2026-07-27)

Author approved three proposals. Provenance: **verification-batch-4-proposal, author-approved**. All OPEN-UNVERIFIED; queue for batch 5.

| id | year | anchor | row | note |
|---|---|---|---|---|
| US-1959-1 | 1959 | commercial-deployment | Xerox 914 | `innovation`; the commercial-deployment **second anchor** of xerography (invention anchor US-1938-1), cross-referenced both ways per the two-anchor rule. |
| US-1961-2 | 1961 | commercial-deployment | Unimate first industrial robot | `innovation`; first GM-line deployment. |
| CN-1969-1 | 1969 | completion | Red Flag Canal | `infrastructure`; the official narrative is heavily mythologized — **independent scholarship + event/magnitude split flagged for verification**; era context (initiated ~1960, hand-built through the hard post-Great-Leap years) noted plainly. |

**Net:** +3. US 139 → **141**, China 126 → **127**. Corpus 265 → **268**.

---

## Post-freeze per-row change — batch-5 proposal ruling (2026-07-27)

Author approved three proposals. Provenance: **verification-batch-5-proposal, author-approved**. All OPEN-UNVERIFIED; queue for batch 6.

| id | year | anchor | row | note |
|---|---|---|---|---|
| US-1971-5 | 1971 | milestone | first networked email | `innovation`; Tomlinson/ARPANET, the `@` convention. |
| CN-1974-2 | 1974 | commercial-deployment | Type-091 nuclear submarine | `innovation` (coded to match the USS Nautilus, US-1954-1); anchor = commissioning (1 Aug 1974). **PLA/state sourcing is interested-party by definition** — independent naval/defense scholarship carries the standard at verification; military-context noted. |
| US-1974-1 | 1974 | commercial-deployment | first UPC barcode scan | `innovation`; Marsh supermarket, Troy OH, 26 Jun 1974. |

**Net:** +3. US 141 → **143**, China 127 → **128**. Corpus 268 → **271**.

---

## Per-row reshapes — trajectory-claim amendment (Amendment 4) (2026-07-27)

No additions/removals (net 0). Five ESTABLISHED/draft rows edited per-row with
justification (freeze rules); three refiled at span-start, two given explicit spans.

| id (old → new) | change |
|---|---|
| CN-1990-4 → CN-1978-3 | refiled @1978 (span-start); `year_precision=range`; claim states 1978–2019; World Bank series. |
| US-1943-2 → US-1942-3 | refiled @1942 (span-start); claim states 1942–1945; source upgraded to independent-academic (Harrison 1998). |
| US-2013-1 → US-2008-4 | refiled @2008 (span-start); `exact`→`range`; claim states ~2008–2018; stays OPEN-UNVERIFIED. |
| CN-1950-2 | span "(1950–1953)" added to claim; start-anchored bounded program, not refiled. |
| CN-1953-1 | span "(1953–1957)" added to claim; commencement point-event, not refiled. |

**Corpus totals unchanged:** 271 rows (US 143, China 128); 169 ESTABLISHED, 101
OPEN-UNVERIFIED, 1 REPORTED.

---

## Removal — straggler sweep (2026-07-27)

Author pre-authorized. **CN-2003-3 REMOVED** ("workshop of the world" — diffuse
status phrase, no crisp 2003 anchor), superseded by its anchored twin **CN-2010-2**
(world's largest manufacturing nation, 2010, UN data) — the Ding County → Zouping
precedent. Tombstoned in `notes/removed_rows.md`.

**Net:** −1 (a China OPEN-UNVERIFIED row). Corpus 271 → **270** (US 143, China 127).
Census 266/4/1 → **266/3/1**.

---

## Conversions — straggler sweep terminal rulings (2026-07-27, author-approved)

Two diffuse OPEN rows converted to anchored rows and verified via the straggler
ritual (same standard, no leniency); originals tombstoned in `removed_rows.md`.

| old → new | anchor | source class | status |
|---|---|---|---|
| CN-1940-1 → **CN-1938-4** @1938 | 1938 Yichang evacuation (Lu Zuofu/Minsheng) | independent-academic | ESTABLISHED |
| CN-1930-1 → **CN-1932-1** @1932 (circa) | Shenxin = China's largest industrial employer, ~1932 | independent-academic | ESTABLISHED |

**Net:** row count unchanged (270). Census 266/3/1 → **268/1/1** (China count unchanged, 127).

---

## Batch 11 — tail-and-stack pass (2026-07-27, author-sanctioned)

Thirteen new rows added through the full promotion ritual (see
`verification_log.md` Batch 11 for the per-row rulings, sources, and held items).

| id | year | row | one-line reason for adding |
|---|---|---|---|
| CN-2010-4 | 2010 | China solar-PV manufacturing dominance | Defining fact of the global energy transition; IEA international-body series (>80% capacity every stage). |
| CN-2024-2 | 2024 | Rare-earth PROCESSING dominance | Geopolitically central; the processing-vs-mining separation (USGS + IEA) is the point. |
| CN-1978-4 | 1978 | Xu Guangxian separation chemistry | The innovation behind China's rare-earth processing dominance; China's top science award (2008). |
| CN-2013-3 | 2013 | China world's largest robot market | World's #1 in installations since 2013 (USITC); 54% of 2024 installs (IFR). |
| CN-2020-4 | 2020 | BYD Blade battery | Cell-to-pack LFP milestone; first mass-produced vehicle (Han EV) on the pack. |
| CN-2025-2 | 2025 | CATL Naxtra sodium-ion | First sodium-ion power battery to pass China's national safety standard, from the #1 maker. |
| CN-2017-2 | 2017 | CATL world's #1 battery maker | Own milestone anchor (distinct from 2011 founding); the gap this pass was asked to check. |
| US-2023-1 | 2023 | US largest LNG exporter | Official EIA ranking milestone; US physical-stack parallel, distinct from the shale row. |
| US-2024-3 | 2024 | First US-soil 4 nm fabrication (TSMC Arizona) | First leading-edge production on US soil; reshoring milestone (US Commerce confirmation). |
| US-2025-1 | 2025 | OpenAI GPT-5 | Flagship 2025 US frontier model; corrects the DeepSeek asymmetry (independent benchmarks). |
| US-2025-2 | 2025 | Starship Flight 10 | First successful Starship payload deploy + splashdown. |
| US-2024-4 | 2024 | NIF fusion repeatability | Distinct second anchor from Dec-2022 first ignition: repeatability + record 5.2 MJ. |
| CN-2025-3 | 2025 | Chinese EUV-lithography claim (**REPORTED**) | Interested-party sourced, uncorroborated; recorded with party named + mundane wall. |

**Net:** +13 rows (12 ESTABLISHED, 1 REPORTED). Corpus 270 → **283** (US 143 → **148**,
China 127 → **135**). Census 268/1/1 → **280/1/2**. Held items (Blade 2.0, CATL Na-ion
mass-deployment, Linglong-One SMR, Kimi K3, Stargate, Gemini 3, dark-factory) were NOT
filed — logged with revisit dates in `verification_log.md`.
