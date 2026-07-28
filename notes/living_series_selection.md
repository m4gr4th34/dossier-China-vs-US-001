# Figure VI — "A century of living standards" selection & rubric note

Context-class human-development outcomes, US vs China, drawn as small-multiples (Figure IV's
pattern). **No corpus rows** — this is a measured-series figure like Figure IV, not achievement
ledger. Placed after Figure IV (the system-outputs grouping) and before Figure Va. Every strip
equals its committed CSV exactly (verifier **I18c**); the label-discipline gate
(`check_figure_labels.py`) enforces no overlaps.

## The framing discipline (non-negotiable): convergence AND the un-closed gap

The figure must read as **neither a rise poster nor a decline poster.** Two things are stated
plainly, together, in the caption:
- **Convergence is real and large.** China closed a gap that in 1950 was civilizational — life
  expectancy 43.8→~78, infant mortality ~195→~5, schooling ~1.8→~9, urbanization ~11%→~66% — and on
  two health measures it has edged *past* the US (life expectancy since ~2021; infant mortality below
  the US by 2022, 4.8 vs 5.5).
- **The level gap remains.** US real GDP per capita is **~3× China's on the Maddison basis drawn
  here** (the honest multiple for this strip; ~4× on current-price PPP, ~6× nominal — basis-dependent,
  so the caption anchors the number to its basis); schooling still trails ~4 years; and the US shows a
  genuine reversal, not merely China catching up.

## The five strips (committed CSVs in `data/living_series/`)

| Strip | Basis | Scale | Source (class) |
|---|---|---|---|
| Life expectancy at birth | years | linear | UN WPP 2024 (international-body); pre-1950 academic reconstruction |
| GDP per capita (PPP, real) | int$ 2011 | **log** | Maddison Project 2023 (independent-academic) |
| Infant mortality | per 1,000 births | **log** | UN IGME (international-body) |
| Mean years of schooling (25+) | years | linear | Barro-Lee / Lee-Lee via OWID (independent-academic) |
| Urbanization | % urban | linear | UN World Urbanization Prospects (international-body) |

**Every Chinese value before ~1980 is ESTIMATE-CLASS** (reconstruction / census back-projection,
not measurement), flagged in each strip's caveat line. Two genuine source-conflicts are shown, not
silently reconciled: **US 2022 life expectancy** (UN WPP 76.4 vs CDC/NCHS 77.5 — same quantity,
different maintainer; the strip plots the UN value for cross-country comparability and names CDC in
the annotation), and the **famine death toll** (below). GDP/capita uses Maddison real 2011-int$; its
pre-reform China series is the most-contested part of the database — carried with wide error bars.
Urbanization omits the China 1960–1990 interior points (a read artifact in the pull) and plots only
the clean paired endpoints.

## The two mandatory annotations — symmetric no-silent-dips discipline

Both are on the life-expectancy strip, one per country, ringed at the dated point:
- **China 1959–61 Great Leap famine.** Life-expectancy-at-birth trough **33.4 in 1960** (UN WPP;
  older reconstructions put the single-year trough ≤30). Excess deaths carried as a **labeled range
  with both classes named, adjudicating neither** — *Chinese-official / lower class ~15M* (official
  acknowledgment; some Chinese demographers ~17M) vs *Western demographic-reconstruction class
  ~30–45M* (Coale ~27M, Banister ~30M, Yang *Tombstone* ~36M, Dikötter ~45M). This mirrors the
  batch-3 census precedent (conflicting figures both recorded).
- **US 2015–2023 decline.** Opioid epidemic + COVID-19, **CDC/NCHS-documented**: life expectancy
  ~78.8 (2014, plateau to 2019) → **76.4 (2021)** → partial recovery 77.5 (2022). The same
  no-silent-dips rule applied to the US flag that is applied to China's.

## What the figure does NOT show

Human-development *outcomes* are not the same as income, institutions, or freedom; a converging
life-expectancy line says nothing about how the gain was distributed or governed. And the pre-1980
Chinese series are reconstructions — the famine trough especially is an estimate, not a measurement.

## Verification

`verify_numbers.py` **I18c**: every Figure VI strip equals its `living_series` CSV exactly. The figure
reuses the (generalized) dimensions renderer — title/format/marks come from the spec, so the two
measured-series figures share one code path (compose, don't reimplement).
