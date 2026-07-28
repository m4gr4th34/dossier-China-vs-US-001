# Figure IV "Dimensions of power" — context-series selection note

Figure IV is a **context-class** small-multiples panel: thin mirrored US/China strips on the
shared 1926–2026 axis, one per dimension, each from a **named independent series**. No corpus
rows change. Each strip is on **its own scale** (% of world, or US$B on a log axis — stated per
strip). There is **DELIBERATELY NO AGGREGATE "power index" line** — see the design refusal below.

## The five dimensions and their series

| Dimension | Series | Source (class) | File | Scale |
|---|---|---|---|---|
| GDP | share of world GDP (PPP) | Maddison Project Database 2023 (**independent-academic**) | `data/power_series/gdp_share.csv` | % (linear) |
| Military spending | constant 2023 US$ | SIPRI Milex DB (**international-body**) | `data/context_series/milex_sipri.csv` (**reused**) | US$B (log) |
| Manufacturing | value-added share of world | World Bank WDI NV.IND.MANF.CD (**international-body**) | `data/power_series/manufacturing_share.csv` | % (linear) |
| R&D | GERD, PPP $B | OECD MSTI / NSF NCSES (**international-body**) | `data/context_series.csv` (**reused GERD**) | $B (log) |
| Trade | merchandise-export share of world | World Bank WDI / WTO (**international-body**) | `data/power_series/trade_share.csv` | % (linear) |

Military spending and R&D **reuse** the already-committed series (single source of truth — no
duplicate CSV). All figures were pulled from the named primary sources (Maddison via OWID; World
Bank WDI API US/China ÷ World; SIPRI workbook; OECD/NSF) — not hand-typed estimates.

## The refusal: no aggregate line (a design choice, stated in the caption)

Collapsing these into one "national power" number is exactly what the dossier refuses. The
dimensions **disagree** — the US leads on GDP (PPP-adjusted), on the R&D frontier and on finance;
China leads on manufacturing value-added and on merchandise-trade volume; military spending is a
~3× US lead. Any single weighted index hides that disagreement behind a weighting choice, which is
the same trap the momentum index is quarantined for. So Figure IV shows the five series side by
side and leaves the weighting to the reader. The caption states this refusal explicitly.

## Chinese-data caveats, per series (carried onto the figure)

- **GDP (PPP share).** China's pre-2005 PPP conversion is an estimate (China joined the ICP price
  surveys only in 2005), which is why Maddison and the IMF diverge sharply for early-year China
  (Maddison 1980 = 5.9% vs IMF = 2.1%); they converge by ~2010. We commit the **Maddison** series
  (longest continuous, 1950–2022) and note the divergence rather than blend two incompatible PPP
  columns. General GDP-smoothing / provincial-over-reporting / Li Keqiang-index critiques also apply.
- **Manufacturing VA (current-US$ share).** Current-US$ shares move with the RMB exchange rate and
  deflators; China's **domestic** value-added share is lower than its gross MVA figure because
  export manufacturing embeds imported components (TiVA literature).
- **Trade (gross merchandise exports).** Gross-export shares overstate China's true contribution
  because of processing/assembly trade (imported-component content) and Hong Kong re-exports; the
  OECD-WTO value-added-trade series puts China's share materially lower.

## What is NOT included / honestly bounded

- **GDP 1930 & 1940 world shares** are not in the Maddison annual World aggregate (benchmark-only
  pre-1950), so the GDP strip begins at 1950 — the strip is drawn only where its series exists.
- **Manufacturing** committed span is the World-Bank-verified window 2005–2020 (US MVA series ends
  2021); UNIDO reports ~6% (2000) → ~28% (2023) for China consistent with this, noted not committed.

## Verification

`verify_numbers.py` recomputes each committed strip from its CSV and asserts a match (I11 pattern;
new checks for GDP / manufacturing / trade; milex and GERD are already checked by I17 / I11).
