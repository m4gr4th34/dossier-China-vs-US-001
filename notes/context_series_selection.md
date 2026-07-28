# Volume context strip — series selection (honesty-critical)

The Century Spine shows the **curated canon** — a corpus that is *flat by construction*
(the selection rule in `notes/selection_criteria.md` targets ~5–15 rows per country per
decade, so no decade can dwarf another). That flatness is a property of the RULE, not of
the world. The context strip beneath the spine exists to make that explicit: alongside
the flat canon, show **what the century's measured innovation volume actually did.** The
contrast is the finding.

## What we chose: R&D expenditure (GERD), and why

**Series:** Gross Domestic Expenditure on R&D (GERD), US and China, PPP-adjusted current
US$ billions. **Source class:** international-body — OECD Main Science & Technology
Indicators (MSTI) and the US NSF NCSES *Science & Engineering Indicators*, the two
standard independently-maintained compilations. Committed as `data/context_series.csv`
with per-row source metadata.

**Why GERD and not patent counts** (the honesty-critical choice). The task's other
candidates were WIPO patent grants / PCT filings and scientific-publication counts. We
deliberately did **not** use a patent-count series as the primary strip, because Chinese
patent statistics carry a well-documented reliability dispute:

- China runs **filing subsidies at national, provincial and municipal levels**, with
  payouts *multiplied* for PCT filings (reportedly up to ~20M yuan per PCT filing vs ~2M
  for a domestic one) — a direct incentive to file for subsidy/quota/ranking rather than
  invention (South China Morning Post, 2020; Berkeley Fung Institute working paper).
- CNIPA's own 2024 review flagged **~1 in 10 investigated filings as "irregular"** —
  filed for non-invention reasons — and China has been **rolling the subsidies back**
  since 2019 precisely to shift from quantity to quality (Lexology; National Law Review).
- So a raw patent-count line would overstate Chinese "innovation volume" by an unknown,
  policy-driven margin. Even **PCT filings are exposed** (the 20M-yuan subsidy is a PCT
  subsidy), so PCT is *less* distorted than domestic counts but not clean.

**GERD is the series least exposed to this dispute**: it measures money *spent on R&D*,
not filings, so the filing-subsidy gaming does not apply to it. It is the honest choice
for a "volume" line whose whole job is to be a trustworthy comparator to the canon.

## Caveats carried onto the figure (conflicting-figures discipline)

GERD is not free of measurement debate either — statisticians have questioned how China
compiles its R&D totals (Science|Business, "A puzzle stumps statisticians: how much does
China actually spend on R&D?"), and the **PPP base year** materially shifts the exact
US↔China crossover (2020-constant-PPP puts the crossover ~2024 at ~$0.86T; current-PPP
puts both near ~$1.0T in 2024). Both are stated on the figure; we do not adjudicate. The
strip is therefore drawn on a **log scale** (stated on the axis) so the *shape* — China's
~20×+ rise from ~1/8 of US spend in 2000 to ~95% by 2023 — reads correctly regardless of
the exact level.

## The point of the whole figure

- **TOP (the spine):** the curated canon — flat by construction (5–15/country/decade).
- **BOTTOM (the strip):** measured R&D volume — anything but flat; China's near-vertical
  climb.
- The gap between "how the canon is shaped" and "what the volume did" is the finding, and
  it is stated in the figure's first caption line so no reader can miss it.

## Verification

The strip renders the committed `data/context_series.csv` values exactly (log scale);
`verification/verify_numbers.py` recomputes the strip's series from the CSV and asserts a
match (new check). Values are anchor-year figures from the OECD MSTI / NSF NCSES published
GERD series; the author reality-checks the endpoints (2000, 2023) per the acknowledgments.
