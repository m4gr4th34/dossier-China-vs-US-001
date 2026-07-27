# Cross-validation report — author spreadsheet vs independent ledger

Compares the author's hand-built source (`data/raw/History_of_the_World_-_Technology.xlsx`,
first tab **"snapshot"**, SHA-256 `c9036c52…`, committed unedited) against the
independent ledger (`data/achievements_draft.csv`, 239 rows). This is a **diff
report only** — no ledger row is changed here; any additions happen in a
follow-up after the author reviews this.

## Method and scope decisions

- **Source parsed:** the "snapshot" tab only (stdlib read-only parse; the xlsx is
  never modified). It is a wide timeline: one row per year, three aligned `year`
  columns, a catch-all tech column ("Age of.."/c0), topical columns (economy,
  politics, healthcare, **china**, Quantum, Wearables, video games), and
  country side-columns (**Pakistan, Korea, Turkey**).
- **Window:** 1926–2026. 94 distinct years carry content; **638 distinct entries**.
- **Splitting:** `+`-delimited cells split into individual entries. (One artifact:
  `+` *inside* parentheses split a few Pakistani nuclear entries, e.g. `kanupp-2 (`
  / `1gw)` — out of scope regardless.)
- **Attribution:** the `china` column → China (**74 distinct**). Pakistan/Korea/Turkey
  side-columns → out of scope (**71/34/1 distinct**). The catch-all and topical
  columns are mixed; each entry judged by content (e.g. `toyota`,`samsung`,`sony`,
  `dyson`,`reliance`,`ferrari` → foreign/out-of-scope; `apple`,`nasa`,`bitcoin` →
  US; `dji (china)` → China).
- **Excluded from the comparison set and listed separately (§S):** `[bracketed]`
  entries (**15 distinct**) and unrealized/future items (e.g. `nio buys tesla`).
- **Out of scope for the diff (counted, not compared):** all non-US/China entries.
- **Matching rule:** fuzzy on **entity + year, ±2 yr**. Same achievement dated
  further apart → **§D DATE CONFLICTS**. A *different* achievement of the same
  entity (e.g. a company's founding vs a later product) is treated as separate,
  and flagged where useful.
- **A note on granularity:** the author sheet is overwhelmingly a **company- and
  product-founding** list; the ledger is a **national-achievement** list
  (institutions, policies, scientific/exploration firsts, megaprojects). The two
  are largely *complementary*, which the numbers below show directly. Enumerating
  all 500+ catch-all consumer/VC/gadget entries individually adds no signal, so in
  §A2 (author-only) the genuinely notable US/China entries are judged individually
  and the sub-notability tail is bucketed by class, with the rule stated.

---

## §A — MATCHES (present in both; entity + year within ±2)

**40 of 127 US ledger rows (31%) and 14 of 112 China rows (12%)** have an author
match. Footnote † marks a ledger row that was **added post-hoc** from
`notes/additions_log.md` (not in the original independent draft).

### US matches (40)

| Ledger | yr | Author entry | yr |
|---|---|---|---|
| US-1927-2 electronic TV | 1927 | tv broadcast | 1928 |
| US-1931-1 Empire State Building | 1931 | empire state building | 1931 |
| US-1931-2 cyclotron | 1931 | first particle accelerator | 1930 |
| US-1935-3 nylon | 1935 | nylon | 1935 |
| US-1937-1 Golden Gate Bridge | 1937 | golden gate bridge | 1937 |
| US-1939-1 Hewlett-Packard | 1939 | hp | 1939 |
| US-1945-2 atomic bomb (Manhattan/Trinity) | 1945 | atom bomb | 1945 |
| US-1953-1 color TV | 1953 | first coloured tv broadcast | 1954 |
| US-1955-2 McDonald's franchise | 1955 | mcdonalds | 1955 |
| US-1958-1 NASA | 1958 | nasa | 1958 |
| US-1960-1 laser | 1960 | laser invented | 1960 |
| US-1969-1 Apollo Moon landing | 1969 | moon landing | 1969 |
| US-1971-1 microprocessor | 1971 | microprocessor | 1971 |
| US-1971-2 Nixon shock (USD-gold) | 1971 | usd decoupled from gold | 1971 |
| US-1971-3 NASDAQ | 1971 | nasdaq | 1971 |
| US-1976-1 Apple | 1976 | apple | 1976 |
| US-1976-2 Cray-1 supercomputer | 1976 | cray-1 supercomputer | 1976 |
| US-1977-1 Voyager 1&2 | 1977 | voyager (1&2) launched | 1977 |
| US-1983-1 TCP/IP internet | 1983 | internet | 1983 |
| US-1988-1 transatlantic fiber cable | 1988 | transatlantic fiber optic cable | 1988 |
| US-1994-1 Amazon (Netscape+Amazon) | 1994 | amazon / amazon website | 1994 |
| US-1995-1 Windows 95 | 1995 | windows 95 | 1995 |
| US-1995-4 eBay | 1995 | ebay | 1995 |
| US-1998-1 Google | 1998 | google | 1998 |
| US-1998-2 ISS | 1998 | iss | 1998 |
| US-2001-1 Wikipedia | 2001 | wikipedia | 2001 |
| US-2001-2 iPod | 2001 | ipod | 2001 |
| US-2003-1 Human Genome Project complete | 2003 | human genome project complete | 2003 |
| US-2003-2 Tesla | 2003 | tesla | 2003 |
| US-2004-1 Facebook | 2004 | facebook | 2004 |
| US-2005-1 YouTube | 2005 | youtube | 2005 |
| US-2006-1 AWS | 2006 | aws | 2006 |
| US-2007-1 iPhone | 2007 | iphone | 2007 |
| US-2008-2 App Store | 2008 | ios app store | 2008 |
| US-2012-2 CRISPR-Cas9 | 2012 | crispr | 2012 |
| US-2015-1 SpaceX booster landing | 2015 | spacex launch/land | 2015 |
| US-2018-1 Falcon Heavy | 2018 | falcon heavy | 2018 |
| US-2020-1 Starlink | 2020 | starlink | 2020 |
| US-2020-3 mRNA COVID vaccines | 2020 | covid-vaccines | 2020 |
| US-2022-1 James Webb Telescope | 2022 | james webb telescope | 2021 |

### China matches (14; † = post-hoc addition)

| Ledger | yr | Author entry | yr |
|---|---|---|---|
| CN-1970-1 first satellite (Dong Fang Hong 1) | 1970 | first satellite | 1970 |
| CN-1984-1 Lenovo (Legend)/Haier | 1984 | lenovo | 1984 |
| CN-1987-1 Huawei † | 1987 | huawei | 1987 |
| CN-1995-1 BYD † | 1995 | byd | 1995 |
| CN-1999-1 Tencent/Alibaba/Baidu | 1999 | tencent (98)/alibaba (99)/baidu (00) | 1998-2000 |
| CN-2006-2 Three Gorges Dam | 2006 | three gorges dam | 2006 |
| CN-2006-3 DJI † | 2006 | dji | 2006 |
| CN-2008-2 high-speed rail (first line) | 2008 | high speed train | 2008 |
| CN-2011-1 CATL † | 2011 | catl | 2011 |
| CN-2012-1 ByteDance † | 2012 | bytedance (+ tiktok, 2017) | 2012 |
| CN-2016-1 Micius quantum satellite | 2016 | quantum satellite | 2016 |
| CN-2019-1 Chang'e 4 far-side landing | 2019 | chang'e-4 fs moon | 2019 |
| CN-2019-2 5G network | 2019 | 5g | 2019 |
| CN-2020-2 Chang'e 5 lunar samples | 2020 | china moon samples | 2020 |

**Post-hoc-addition footnote.** Five of the 14 China matches (Huawei, BYD, DJI,
CATL, ByteDance) are rows I **added after** my own coverage report flagged them
(`additions_log.md`), *not* achievements captured in the original independent
draft. That all five independently appear in the author's sheet is a genuine
cross-validation signal that the additions were correct — but it means the
original-draft overlap is lower:

- **China match rate WITH post-hoc additions:** 14 / 112 = **12%**.
- **China match rate WITHOUT them (original independent draft):** 9 / 107 = **8%**.

(The US ledger had no post-hoc additions, so its 31% is unaffected.)

---

## §B — AUTHOR-ONLY (in the sheet, not the ledger)

Per the task, each notable US/China author-only entry gets a judgment: **candidate**
(passes the ledger's notability rule — a serious history of that decade would look
negligent to omit it) or **below-threshold** (excluded, one-line reason). **Nothing
is auto-added.** The long sub-notability tail is bucketed by class (stated rule),
not auto-listed.

### B1 — China author-only

**Candidates to add (pass notability):**
- `xiaomi` (2010) — top-tier global smartphone/IoT maker; strongest omission (peer of the firms already added).
- `jd` (1998) — a top-two Chinese e-commerce/logistics platform.
- `nio` (2014) — major EV maker (adds to the EV story beyond BYD/CATL).
- `sensetime` (2014) / `megvii` (2011) — leading computer-vision/AI firms.
- `iflytek` (1999) — leading speech-AI firm.
- `hikvision` (2001) — world's largest video-surveillance-equipment maker.
- `bgi` (1999) — world's largest genomics institute (partly in ledger via CN-2003-2 HGP share).
- `quantumctek` (2009) — commercialized quantum-communications firm (Micius lineage).
- `long march-5` (2019) — heavy-lift rocket that enabled the station and lunar-sample missions.
- `daxing` (2019) — Beijing Daxing, among the world's largest airport terminals.
- `harmonyos` (2019) — Huawei's independent OS, notable post-sanctions.
- `tmsr-sf (100mw)` (2024) — first operational thorium molten-salt reactor (a genuine energy-science first; strong candidate).
- `geely` (1986) — major automaker (owns Volvo, Lotus).
- `bitmain` (2013) / `cambricon` (2016) — dominant crypto-mining-chip / AI-chip designers.
- `quantum radar` (2016) — flagged as a **candidate only with a caveat**: a claimed capability, not independently verified; would enter OPEN-UNVERIFIED at best.
- `karakoram highway` (1979) — major engineering, but **China-Pakistan joint**; attribution mixed (note if added).
- `tiangong-1` (2011)/`tiangong-2` (2016) — space-lab precursors; same program as CN-2022-1 (see §D).

**Below threshold (excluded, one-line reason):**
- `china merchants bank` (1987), `industrial bank` (1988), `ping an insurance/bank` (1990/95) — banks/insurers, below a tech/innovation-achievement bar.
- `hisilicon` (1991) — Huawei chip subsidiary, subsumed by Huawei.
- `mindray` (1991), `han's laser` (1996), `sugon` (1996), `siat` (2006), `icarbonx` (2015), `cloudminds` (2015), `ubtech` (2012), `alibaba damo` (2017), `research institute of tsinghua`/`shenzhen center` — individual firms/institutes below national-achievement scale.
- `byton` (2017) — EV startup that effectively failed.
- `wechat` (2011) — the app itself is below the bar as a standalone national achievement; its *mobile-payment* consequence is already CN-2014-3.
- `foldable displays` (2019), `nio battery swap` (2018), `reusable spacecraft` (2020), `skyscrapers > us` (2016) — diffuse/vague, not a discrete datable achievement.
- `jf-17` (2007), `c-p friendship tunnels` (2015) — China-Pakistan joint/military; attribution out of scope.

**Excluded on grounds it is not an achievement:**
- `crispr babies` (2018) — He Jiankui's gene-edited infants were internationally condemned as an ethics violation; a scandal, not a positive milestone. Excluded.

### B2 — US author-only

> **ADJUDICATED (v0.4 symmetric US pass).** Every US author-only entry below has
> now been judged by the same bar used for the China side; the ADD/REJECT
> decisions, the Bitcoin country-anchoring decision, and the reject reasons are
> recorded in `notes/additions_log.md` (v0.4). 10 US rows were adopted. This
> closes the adoption-asymmetry flag and the corpus is now frozen.

The US catch-all is dense; below are the strongest candidates my curated ledger
lacks. (My ledger caps ~12–14 rows/decade, so many real US achievements are
legitimately omitted; "candidate" means notable enough that the author should
weigh adding it, not that the ledger is wrong to have capped.)

**Candidates to add (pass notability):**
- `intel founded` (1968) — foundational semiconductor firm.
- `bitcoin` (2009) — foundational cryptocurrency/blockchain.
- `fedex` (1971) — logistics/overnight-delivery revolution.
- `cisco` (1984) — internet-infrastructure backbone vendor.
- `mri` (1977) — major diagnostic-imaging modality (invention US/UK-contested — note).
- `3d printing` (1988) — additive-manufacturing origin.
- `lithium ion battery` (1985) — chemistry (Goodenough, US) behind modern batteries (commercialization Sony/Japan — note).
- `amd` (1969), `nvidea`/Nvidia founding (1993) — major chipmakers (Nvidia's 2024 dominance is already CN… US-2024-2).
- `paypal` (1998), `linkedin` (2002), `uber` (2009), `airbnb` (2008), `github` (2008), `netflix` (1997), `android` (2003) — major platforms (ledger already dense in this class; author's call).
- `gpt2` (2019)/`gpt3` (2020), `neuralink` (2020), `m1-chip` (2020) — AI/compute (GPT-3 relates to US-2017-1 Transformer and US-2022-5 ChatGPT).
- `darpa` (1958) — a research institution with outsized downstream impact.

**Below threshold / bucketed by class (excluded):**
- **Consumer food/retail brands** — starbucks, whole foods, chick-fil-a, in-n-out, shake shack, blue bottle, vitamix, etc.: firm-level, below national-achievement scale.
- **VC firms** — sequoia, a16z, founders fund, first round, dfj, lightspeed, sutter hill: financial intermediaries, not achievements.
- **Individual consumer gadgets/products** — roomba, kindle, fitbit, oculus, apple watch/airpods variants, playstation psp, etc.: product-level, below the bar (the platform-defining ones like iPhone/iPod are already in the ledger).
- **Crypto tokens** — ethereum, litecoin, zcash (beyond Bitcoin as the category-definer).

**Out of scope (counted, not compared) — foreign, appearing in the catch-all:**
toyota, samsung, sony, epson, ferrari, adidas, puma, ikea, acer, asus, benq,
reliance (India), dyson (UK), kia, hyundai, lg, naver, softbank, nintendo,
nespresso/novartis/swatch (Switzerland), bmw/porsche, taipei 101, petronas,
burj khalifa, gotthard tunnel; and firsts attributable elsewhere — `first mamal
cloned` (UK, Dolly), `higgs boson` (CERN), `first human heart transplant` (South
Africa), `dna double helix` (UK/US), `hiv discovery` (France/US), `human space
flight` (USSR, 1961). These are tallied as out-of-scope, not author-only.

### §S — Speculative-at-authoring (excluded from the comparison set)

Bracketed or unrealized/future entries, listed separately as instructed:
- **China:** `nio buys tesla` (2025, did not happen), `qc launch (alibaba)` (2025, forward-looking), `[tmsr-lf (24mw)]`, `[cpec western route]`, `[byd-hydrogen]`, `[crypto-yuan]`.
- **Cross-cutting / other:** `[vr mmorpg]`, `[uhd-vr]`, `[next-gen-online-offline-gaming]`, `[auto-tint windows]`, `[electric exoskeleton]` (2023), `[bionic limbs]` (2026), `[once a month contraceptive]`, `[samsung galaxy watch-2]`, and the forward-looking 2025-26 catch-all cluster (`iter`, `large scale thorium power deployment`, `solid state battery`, `quantum computing`, `transcelestial`). Pakistani `[thar coal-*]`/`[khi-lhr motorway]`/`[cpec phase 2]` are bracketed **and** out of scope.

The author's own bracket convention closely matches the ledger's discipline of
excluding announced-but-unbuilt / future events — a good sign of shared method.

---

## §C — LEDGER-ONLY (in the ledger, not the sheet)

**87 of 127 US rows and 98 of 112 China rows** have no author match. This is the
report's biggest structural finding: **the two sources are complementary, not
redundant.** The author sheet is a commercial/product-founding timeline; the
ledger's institutional, policy, and pure-science-first rows are almost entirely
absent from it, and the author's China coverage is near-empty before the
reform-era firms.

**US ledger-only — the systematic gaps (representative, not exhaustive):**
- *Institutions/policy:* Social Security, Glass-Steagall/FDIC, TVA, Marshall Plan,
  NATO, Bretton Woods, GI Bill, EPA, NAFTA, Medicare/Medicaid, Civil Rights &
  Voting Rights Acts, CHIPS Act, IRA.
- *Pure-science / exploration firsts:* transistor, integrated circuit, Shannon
  information theory, silicon solar cell, recombinant DNA, Ethernet, first mobile
  call, Hubble, Deep Blue, Mars Pathfinder/Spirit-Opportunity/Curiosity,
  LIGO, NIF fusion ignition, Ingenuity, Transformer architecture, synthetic cell.
- *Some landmark products too:* DC-3, UNIVAC, IBM System/360, IBM PC, Macintosh,
  Windows 1.0, Java, Mosaic, Pentium, Starship catch, ChatGPT (the author has
  GPT-2/3 but not ChatGPT-the-product).

**China ledger-only — the dominant finding: the pre-1980 record is absent.**
- The author sheet matches **0** ledger rows across **1926–1965** and only the 1970
  satellite through 1975. So the *entire* Republican-era, founding, and Mao-era
  achievement set is ledger-only: PRC founding, land reform, First Five-Year Plan,
  first atomic & hydrogen bombs, insulin synthesis, hybrid rice, artemisinin,
  Terracotta Army, UN seat, Reform & Opening, SEZs, one-child policy, etc.
- Also ledger-only in the modern era despite dense author coverage nearby:
  C919, FAST, HZM Bridge, BeiDou-3, Tianwen-1/Zhurong, the Tiangong *station*
  (2022; see §D), poverty elimination, Chang'e 6, DeepSeek, Shenzhou 5, Qinghai-
  Tibet Railway, Tu Youyou's Nobel, the "world's largest X" economic milestones.

**Why the asymmetry:** the author sheet is organized around *founded companies and
shipped products*, a lens under which China only becomes visible once it has
globally-legible tech firms (~1984 onward). The ledger deliberately also counts
state, scientific, and infrastructure achievements, where China's early record is
dense. Neither is "more right" — they measure different layers, and the momentum
question must not be read off either one's raw coverage.

---

## §D — DATE CONFLICTS (same achievement/entity, year differs > ±2)

| Achievement | Ledger year | Author year | Better-attested / note |
|---|---|---|---|
| Xerography / photocopying | 1938 (US-1938-1, Carlson's first image) | 1959 (`photocopy machine (xerox)`) | Both real: **1938 invention** vs **1959 first commercial product (Xerox 914)**. Different milestones of one technology. |
| Penicillin | 1943 (US-1943-1, US mass production) | 1928 (`penecillin`) | **1928 = discovery (Fleming, British)**; **1943 = US deep-tank mass production**. Author also mis-implies US origin; discovery was British. |
| Oral contraceptive pill | 1960 (US-1960-2, FDA approval) | 1950 (`birth control pill`) | **1960 FDA approval (Enovid)** is the better-anchored event; 1950 is early research. |
| Atari | 1977 (US-1977-2, Atari 2600 console) | 1972 (`atari`) | Same entity, different milestone: **1972 company founding** vs **1977 flagship console**. |
| Genentech / biotech | 1980 (US-1980-1, Bayh-Dole + IPO) | 1976 (`genentech`) | **1976 founding** vs **1980 IPO/Bayh-Dole** industry-launch. |
| GPS | 1978 (first satellite) & 1995 (full capability) | 1990 (`gps satellite`) | Author's 1990 falls between the ledger's two GPS milestones; ambiguous which it marks. |
| Tianhe supercomputer | 2013 (CN-2013-2, Tianhe-2 world's fastest) | 2021 (`tianhe`) | Likely different generations (Tianhe-2, 2013 vs a later Tianhe); the world-#1 event is 2013-2015. |
| Tiangong (space) | 2022 (CN-2022-1, completed station) | 2011 & 2016 (`tiangong-1`, `tiangong-2`) | Same program, different modules: **2011/2016 precursor labs** vs **2022 completed station**. |
| Communications satellite | 1962 (US-1962-1, Telstar, first *active*) | 1965 (`first commercial satellite`) | Possibly different satellites (Telstar 1962 experimental vs Early Bird 1965 first *commercial*); flagged as a near-miss. |

### §D addendum — resolutions under the event-anchoring rule (Amendment 3)

Each conflict below is resolved by naming the **event_type each source anchored
to**. Headline: **all nine resolve with no change to any existing ledger year** —
the ledger was consistently anchored to the correct in-scope event; the author's
differing dates are a *different anchor type*, an *out-of-scope discovery anchor*,
or a *different entity/generation*. Two are two-anchor cases where a second row is
permissible but deferred (not on this pass's adjudicated add-list).

1. **Xerography.** Ledger `US-1938-1` anchors to **invention** (Carlson's first
   xerographic image, 1938). Author's 1959 is the **commercial-deployment** anchor
   (Xerox 914). → Keep 1938; the 1959 deployment is a distinct anchor, not added.
2. **Penicillin.** Ledger `US-1943-1` anchors to **commercial-deployment** (US
   deep-tank mass production, 1943). Author's 1928 is the **discovery** anchor —
   Fleming, **British → out of scope**. → Attribution confirmed; 1928 is a
   different anchor *and* a different country, so not a ledger row. No change.
3. **Oral contraceptive pill.** Ledger `US-1960-2` anchors to
   **commercial-deployment** (FDA approval, 1960). Author's 1950 is pre-approval
   R&D — no discrete anchor event in 1950. → Keep 1960.
4. **Atari.** Ledger `US-1977-2` anchors to **commercial-deployment** (Atari 2600
   console, 1977). Author's 1972 is the **founding** anchor (the company). → Two
   distinct anchors; ledger holds the console (the more decisive event); the 1972
   founding is a permissible second row, deferred.
5. **Genentech / biotech.** Ledger `US-1980-1` anchors to a **milestone** (Bayh-Dole
   Act + IPO, the 1980 industry-launch). Author's 1976 is the **founding** anchor
   (the firm). → Ledger keeps the 1980 industry-launch framing; 1976 founding is a
   distinct candidate anchor, deferred.
6. **GPS.** The ledger already carries **two** anchors: `US-1978-1`
   **first-flight/launch** (first Navstar satellite, 1978) and `US-1995-3`
   **commercial-deployment** (full operational capability, 1995). Author's single
   "1990" maps to neither discrete anchor (mid-buildout). → The two-anchor
   treatment is exactly correct; no third row, no change.
7. **Tianhe supercomputer.** Ledger `CN-2013-2` anchors to a **milestone**
   (Tianhe-2 becomes world's fastest, 2013). Author's "tianhe" 2021 most likely
   denotes a **later Tianhe machine** (a different completion/ranking event). →
   Keep the 2013 ranking; a later Tianhe would be its own anchor, not added.
8. **Tiangong.** Ledger `CN-2022-1` anchors to **completion** (completed station,
   2022). Author's 2011/2016 are Tiangong-1/-2 precursor labs. → **Not a conflict**
   — this is the canonical two-anchor case: the **first space lab** (Tiangong-1,
   first-flight/launch, 2011) and the **completed station** (completion, 2022) are
   distinct achievements. Ledger holds the completed-station anchor; the
   first-lab anchor is a permissible second row, deferred (not on the add-list).
9. **Communications satellite.** Ledger `US-1962-1` anchors to
   **first-flight/launch** of **Telstar** (first *active* comms satellite, 1962).
   Author's 1965 "first commercial satellite" is a **different satellite** (Intelsat I /
   Early Bird, first *commercial* comms satellite). → Two different achievements
   (first active vs first commercial); ledger keeps Telstar, Early Bird deferred.

**Net effect on the ledger:** 0 year changes, 0 rows removed. Anchoring converted
what looked like nine date disputes into: 5 confirmations of the ledger's existing
anchor, 1 out-of-scope re-attribution confirmed (penicillin discovery), 1
already-correct two-anchor case (GPS), and 2 deferred second-anchor candidates
(Tiangong first-lab, and the Atari/Genentech founding anchors).

---

## §Stats — match rate per country per decade

Match rate = ledger rows with an author match ÷ ledger rows, per country per
decade (how much of the ledger the author's independent list corroborates).

### US (40 / 127 = 31%)

| Decade | ledger | matched | rate |
|---|---|---|---|
| 1926-1935 | 14 | 4 | 29% |
| 1936-1945 | 12 | 3 | 25% |
| 1946-1955 | 13 | 2 | 15% |
| 1956-1965 | 13 | 2 | 15% |
| 1966-1975 | 13 | 4 | 31% |
| 1976-1985 | 12 | 4 | 33% |
| 1986-1995 | 12 | 4 | 33% |
| 1996-2005 | 12 | 8 | 67% |
| 2006-2015 | 13 | 5 | 38% |
| 2016-2026 | 13 | 4 | 31% |
| **Total** | **127** | **40** | **31%** |

### China — WITH post-hoc additions (14 / 112 = 12%)

| Decade | ledger | matched | rate |
|---|---|---|---|
| 1926-1935 | 9 | 0 | 0% |
| 1936-1945 | 6 | 0 | 0% |
| 1946-1955 | 11 | 0 | 0% |
| 1956-1965 | 9 | 0 | 0% |
| 1966-1975 | 10 | 1 | 10% |
| 1976-1985 | 12 | 1 | 8% |
| 1986-1995 | 13 | 2 | 15% |
| 1996-2005 | 11 | 1 | 9% |
| 2006-2015 | 17 | 5 | 29% |
| 2016-2026 | 14 | 4 | 29% |
| **Total** | **112** | **14** | **12%** |

### China — WITHOUT the 5 post-hoc additions (original draft: 9 / 107 = 8%)

| Decade | ledger | matched | rate |
|---|---|---|---|
| 1966-1975 | 10 | 1 | 10% |
| 1976-1985 | 12 | 1 | 8% |
| 1986-1995 | 11 | 0 | 0% |
| 1996-2005 | 11 | 1 | 9% |
| 2006-2015 | 14 | 2 | 14% |
| 2016-2026 | 14 | 4 | 29% |
| **Total** | **107** | **9** | **8%** |
| (all other decades) | 46 | 0 | 0% |

### Reading the numbers
- **US corroboration peaks in 1996–2005 (67%)** — the consumer-internet boom
  (Google, ISS, Wikipedia, iPod, HGP, Tesla, Facebook, YouTube) is exactly where
  a product-founding list and a national-achievement ledger converge.
- **US corroboration troughs mid-century (15%, 1946–1965)** — the ledger's dense
  institutional/pure-science firsts (Marshall Plan, NATO, transistor, IC, laser,
  Interstate, Salk) are mostly absent from a product-centric sheet.
- **China corroboration is ~0 before 1970 and single-digit through 2005**, rising
  only as globally-legible Chinese tech firms appear. The five post-hoc-added
  firms account for the entire lift in 1986–1995 (0→2) and most of 2006–2015
  (2→5); removing them drops the China rate from 12% to 8% and zeroes 1986–1995.
- **The two sources agree most on the commercial/product layer and least on the
  institutional/scientific/national layer** — which is the single most important
  caveat for any downstream momentum index: *coverage overlap is itself
  category-shaped, so it cannot be read as agreement about "who was ahead."*

---

*Cross-validation v1. Diff only — no ledger rows changed. Candidate additions in
§B and date reconciliations in §D are proposals for the author's review; any
edits happen in a separate follow-up pass.*
