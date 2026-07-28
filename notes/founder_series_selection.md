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

## State-capital annotation — `state_capital.csv` (NOT a committed line)

Rendered on the VC strip as a **labeled estimate annotation**, deliberately **not a confident data
line**, because the numbers are Chinese-origin and target≫paid-in:
- **Government guidance funds (政府引导基金):** ~2,000 funds, aggregate **TARGET ~$1.5T** (~¥10–11T) but
  **PAID-IN <$0.7T** (~$672bn) — only **26% of funds met their target** (China Quarterly 2023; CSET;
  PIIE). Underlying fund data is **Zero2IPO/ChinaVenture — Chinese-origin (flagged)**; Western analyses
  (CSET, PIIE, China Quarterly, Rhodium) re-report and critique rather than independently generate it.
- **Big Fund III:** $47.5B (¥344bn) registered capital, incorporated 24 May 2024 — **independently
  corroborated** (Bloomberg, Reuters, Global Trade Alert / SAMR registration). This one is a committed
  ledger row (`CN-2024-3`), not just an annotation figure.
- **2025 National VC Guidance Fund:** ¥1T (~$138B) **mobilization TARGET** over ~20 years; announced
  Mar 2025 (Reuters), launched as a vehicle Dec 2025 (Chinese/HK-origin sources). **No committed/paid-in
  capital disclosed** → HELD as a ledger row, used here only as annotation context.

**Why no committed state-capital line:** target figures overstate deployed capital by ~2× or more,
the annual paid-in path is not published, and the underlying data is Chinese-origin — a confident
line would imply a precision the record does not support. The substitution the figure states plainly:
**private VC collapsed; state capital partly replaced it — but the VC strip measures the former, not
the latter.** State capital is abundant for nationally-aligned hard tech (chips, AI, quantum) and
scarce/closed for the misaligned, foreign, or consumer — see the judgment box.

## Verification

`verify_numbers.py`: the VC and exits strips and the state-capital annotation each equal their
committed CSV exactly; the founding envelope recomputes from `event_type = founding` rows.
