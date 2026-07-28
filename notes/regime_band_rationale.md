# Figure V regime-band rationale — the entrepreneurship/founder regime, 1926–2026

Figure V's backdrop is a categorical **founder-regime band** per country: is starting and
running a private company **open**, **constrained**, or **closed**? This is a classification of
the *entrepreneurship regime*, not of the political system in general, and it is an authorial
judgment — documented here with sourcing, committed as data
(`data/founder_series/regime_band.csv` + `regime_ticks.csv`), and checked by the verifier
(every transition/tick that claims a ledger anchor must resolve to a real row; the figure's band
must equal the committed CSV).

**States.** `open` = private founding is legal, normal, and capital-backed; `constrained` =
private enterprise exists but is limited, experimental, or under heightened political/regulatory
pressure; `closed` = private enterprise is largely abolished or illegal.

## China (transitions anchored to ledger rows where one exists)

- **1926–1956 — constrained.** Republican-era China had genuine private enterprise (Shanghai
  capitalism; the Rong family's Shenxin mills, `CN-1932-1`) but under warlordism, invasion, civil
  war and hyperinflation; the early PRC (1949–56) tolerated a "national bourgeoisie" transitionally.
  Sourcing: standard PRC economic histories (e.g., Naughton, *The Chinese Economy*).
- **1956–1978 — closed.** The **"socialist transformation" of industry and commerce (1956)** —
  ledger row **`CN-1956-2`** — converted private firms to public/joint ownership; through the
  planned-economy and Cultural-Revolution decades private enterprise was essentially abolished.
  Transition anchor: `CN-1956-2`.
- **1978–1992 — constrained.** **Reform and Opening (1978)** — **`CN-1978-1`** — reopened space
  for private activity, but early private enterprise was small, experimental and politically
  precarious; the Special Economic Zones (**`CN-1980-1`**, tick) and Hainan (**`CN-1988-2`**, tick)
  were bounded experiments. Transition anchor: `CN-1978-1`.
- **1992–2020 — open.** **Deng's Southern Tour and the "socialist market economy" (1992)** —
  **`CN-1992-1`** — decisively legitimised private enterprise; **WTO accession (2001, `CN-2001-1`,
  tick)** integrated it globally; the private tech founding boom (Alibaba, Tencent, ByteDance,
  etc.) dates to this window. Transition anchor: `CN-1992-1`.
- **2020–2026 — constrained.** The **2020–21 regulatory crackdown** — the halted Ant Group IPO
  (Nov 2020), the platform-economy campaign, DiDi's forced delisting, "common prosperity", and the
  VC collapse (see the VC strip) — sharply tightened the founder regime. **Adjudication (full
  ritual): this is a BAND ANNOTATION, not a ledger row.** The claim ledger is an *achievement*
  ledger; a regulatory crackdown is a setback, not an achievement, so it cannot enter as an
  ESTABLISHED/anchored achievement row. It is recorded as a dated band annotation with no
  `anchor_row`. Sourcing: contemporaneous reporting (FT, Reuters, WSJ) on the Ant IPO suspension
  and the 2021 tech-regulatory campaign; the VC-collapse leg is the committed
  `data/founder_series/vc_investment.csv` (China $146.0B in 2021 → $38.0B in 2024).

## United States (continuously open; ticked, not transitioned)

- **1926–2026 — open, throughout.** Private founding was continuously legal and central; there is
  **no US regime transition**. Three enabling-event **ticks** mark the build-out of the founder
  ecosystem — and, as of batch 14, **all three anchor to ledger rows** (matching the China ticks'
  row-anchored footing):
  - **1946 — the first modern venture-capital firm**, American Research and Development Corporation
    (Doriot/Compton/Flanders) — ledger row **`US-1946-1`** (added batch 14; significance evidenced
    by the DEC investment). Sourcing: Nicholas, *VC: An American History* (Harvard 2019); Ante,
    *Creative Capital* (HBS 2008).
  - **1971 — NASDAQ**, the first electronic stock market — ledger row **`US-1971-3`**.
  - **1982 — the SBIR program** (Small Business Innovation Development Act) — ledger row
    **`US-1982-2`** (added batch 14; category adjudicated country-blind as `governmental_economic`,
    matching China's 863 Program). Sourcing: CRS R43695; *Issues in Science and Technology*.

**A note on ticks vs. band annotations (batch 14).** A **tick** marks an enabling *achievement* and
therefore anchors to a ledger row; every tick now does. The **2020–21 crackdown is NOT a tick** — it
is a regime *transition into "constrained"* recorded as the labelled boundary of the China band
segment (`regime_band.csv`, the `2020` row, `label` set, `anchor_row` empty), because a crackdown is
a setback, not an achievement, and cannot anchor to a row. Keeping it a band annotation rather than a
tick is what lets the verifier assert that *every tick anchors to a row* while still showing the
crackdown honestly.

## Why a band, not a score

The band is deliberately categorical (three states), not a numeric "openness index" — it marks
*regime shifts a founder would actually feel*, each tied to a dated, sourced event, and (for
China) to a ledger row where the achievement ledger already carries one. The classification is
challengeable: change this file and `regime_band.csv` in lockstep and the figure changes.

## Verification

`verify_numbers.py`: (a) every non-empty `anchor_row` in `regime_band.csv` and `regime_ticks.csv`
resolves to a real corpus row; (b) the figure's band segments and ticks equal the committed CSVs
exactly; (c) the founding blocks equal the `event_type = founding` rows exactly; (d) the VC and
unicorn strips equal their committed CSVs.
