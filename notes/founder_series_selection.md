# Figure V context-series selection note (VC, exits, state capital)

Figure V's two data strips and its state-capital annotation. All committed to `data/founder_series/`.

## Venture-capital strip — `vc_investment.csv`

Annual VC investment, US$B nominal. US = PitchBook-NVCA Venture Monitor; China = KPMG Venture
Pulse (PitchBook data), the China column summed from KPMG's printed quarterly bars (an authorial
aggregation, flagged). The story: China VC peaks $146B (2021) and collapses to $38B (2024, ~74%),
while the US falls ~41%. Source class: journalistic/industry (both PitchBook-based).

## Exits strip — `ipo_proceeds.csv` (annual IPO proceeds, US$B)

Three lines, 2018–2024:
- **US** (`us_proceeds_usd_bn`): US-exchange IPO proceeds, **ex-SPAC**, from **Renaissance Capital's
  US IPO Annual Reviews** (retrieved USD, exact: 46.9 / 46.3 / 78.2 / 142.4 / 7.7 / 19.4 / 29.6).
  SPAC caveat: 2020–21 SPAC issuance was huge (~$150–160B in 2021 alone); this series EXCLUDES SPACs,
  so a SPAC-inclusive 2021 would be roughly $300B. Ex-SPAC is the like-for-like traditional-IPO series.
- **China onshore** (`china_onshore_usd_bn`): Chinese-company IPO proceeds on **mainland A-shares
  (Shanghai + Shenzhen incl. STAR / ChiNext / Beijing) + Hong Kong**. Compiled by independent firms
  (KPMG, EY, PwC) from exchange filings, plus HKEX official and Bloomberg. **Native-to-USD conversion
  is the author's** (the native figures are retrieved; the USD is documented arithmetic), at
  approximate annual-average FX: RMB/USD 6.6 (2018), 6.9 (2019–20), 6.45 (2021), 6.7 (2022), 7.05
  (2023), 7.2 (2024); HKD/USD ~7.8 throughout. Where a USD figure was retrieved directly it was used
  (HK 2021 $42.96B, HK 2022 $12.69B, A-share 2022 $92B Bloomberg). The 2020 HK IPO-only figure is
  approximate (the retrieved HK$743.65B was total-equity incl. secondaries).
- **China US-listed (ADR)** (`china_us_listed_usd_bn`): Chinese-company IPOs on NYSE/Nasdaq
  (Refinitiv/Dealogic via CNBC/SCMP/Renaissance). **The venue-shift story:** $11.7B (2020) → $12.8B
  (2021, essentially all pre-DiDi H1) → **froze** after DiDi's $4.4B NYSE IPO (30 Jun 2021) and the
  ensuing cybersecurity-review/HFCAA dispute: ~$0.2B (2022, ~6 tiny deals), $0.5B (2023), $0.6B (2024,
  avg deal ~$50M vs >$300M in 2021). **2018/2019 ADR totals are approximate** (component deals
  retrieved, not a clean annual total). Onshoring destination shifted: STAR/A-share 2021–22, then Hong
  Kong 2024 (A-share proceeds themselves crashed −83% in 2024 after mid-2023 approval tightening).

Log scale (the combined range spans ~$0.2B to ~$142B). Independent/professional-services sources
(Renaissance, EY, KPMG, PwC, Refinitiv, Bloomberg, HKEX-official). The venue split is defensible: the
ADR-freeze line is cleanly retrieved and is the point; the onshore line carries the documented-FX flag.

## State-guided-capital strip — `data/context_series/state_capital_cn.csv` + `state_capital_ticks.csv`

The state-guided-capital strip lives in **Figure Vb (The Capital System)** — the old combined figure
was split so each figure carries one time axis. It replaces the earlier one-line text annotation
(superseded; the old `data/founder_series/state_capital.csv` is removed). The point that annotation
made in words — *targets are not deployed capital* — is now **drawn as geometry**: a shaded China band
whose WIDTH is the gap between announced target (upper edge) and **subscribed / committed capital
(认缴, lower edge)**. The band form is the honest form precisely because the two edges are far apart and
the underlying data is single-vendor.

**Why a band, not a line.** The headline "China is deploying $1.8T of guidance-fund capital" is a
target/mobilization ceiling, not money on the table. Across the anchor years the aggregate **subscribed
capital runs ~43–60% of announced target** — so a single confident line would fake a precision the
record does not have. The band draws the uncertainty instead of asserting a point.

**China band — `state_capital_cn.csv` (cumulative $B; announced vs subscribed 认缴):** anchor-year
estimates of government guidance funds (政府引导基金); the two columns are announced/target and
subscribed/committed (认缴), now extended through **year-end 2024** (the band no longer ends at 2022).
- 2018 — target ~$1.4T / subscribed ~$585B (¥4.05T); 2020 — ~$1.55T / ~$672B (¥4.76T; CSET re-reports);
  2022 — ~$1.86T / ~$940B (¥6.51T); 2023 — ~$1.72T / ~$1.00T (¥12.19T / ¥7.13T, 清科 pub 2024-03);
  2024 — ~$1.76T / ~$1.055T (¥12.84T / ¥7.70T, 清科 pub 2025-04). The $ series flattens 2022→2024
  partly because the yuan depreciated ~6% — the ¥ figures are the honest unit.
- **The lower edge is SUBSCRIBED (认缴), NOT paid-in cash (实缴) and NOT deployed (已投).** Guidance funds
  are notorious for 募而不投 ("committed but not invested"); true paid-in and deployed capital are
  materially lower and unmeasured — so the real deployment gap is *wider* than the band shows. The
  earlier draft mislabeled this edge "paid-in"; corrected here and on the figure.
- **Single-vendor caveat (the key data-integrity flag):** every fund aggregate — including the 2020
  (CSET) and 2022 (China Quarterly) points — traces to **one Chinese-origin commercial tracker,
  Zero2IPO / 清科**. Western sources corroborate *by citing* it, not by independent count; the one
  parallel vendor (ChinaVenture/投中) publishes flow, not the same cumulative stock. Effectively
  mono-source; flagged on the strip's kicker.
- **The target line wobbles on scope, the subscribed line is clean.** Target reads ¥12.84T (2022) →
  ¥12.19T (2023) → ¥12.84T (2024): the 2023 dip is expired/"zombie" funds netted out, not a real
  contraction; the subscribed (认缴) series is monotonic (¥6.51T → ¥7.13T → ¥7.70T). New-fund FORMATION
  meanwhile fell ~25% (2023) and ~37% underlying in 2024 (once the ¥344B IC mega-fund is stripped) —
  the establishment-pace slowdown 清科 itself flags. An earlier "26% of funds met target" (China
  Quarterly) is a **share-of-funds** metric, NOT the aggregate ¥-ratio — dropped to avoid the
  conflation the old annotation made.

**Big Fund ticks (CN) — `state_capital_ticks.csv`:** the National IC Industry Investment Fund phases, as
discrete points (these are ledger-anchorable state vehicles, not guidance-fund aggregate): Phase I 2014
$19.2B (¥138.7bn), Phase II 2019 $28.2B (¥204.15bn), Phase III 2024 $47.5B (¥344bn; committed ledger row
`CN-2024-3`, gov.cn/SCMP).

**US comparator ticks — same file, `side=US`:** the US has **no guidance-fund equivalent**, so the US
side is discrete ticks only, never an invented band: SBIR+STTR FY2022 **$4.73B** annual obligation (SBA
official) and the CHIPS &amp; Science Act 2022 **$52.7B** appropriation (CRS R47523). Both sit one-to-two
orders of magnitude below the Chinese band — which is the honest scale contrast.

**The 2025 ¥1T national VC guidance fund stays HELD, not drawn** — an announced mobilization target with
no disclosed paid-in capital and mainly Chinese-origin corroboration; it earns no band edge and no tick.

## Verification

`verify_numbers.py`: the VC and exits strips equal their committed CSVs exactly; the state-guided-capital
band equals `state_capital_cn.csv` and its ticks equal `state_capital_ticks.csv` exactly; the retired
text-annotation string is absent from the baked page; the founding envelope recomputes from
`event_type = founding` rows.
