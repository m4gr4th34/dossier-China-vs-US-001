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
