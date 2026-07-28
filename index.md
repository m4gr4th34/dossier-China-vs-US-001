An Open Dossier · **China-vs-US-001**

# The US–China Century Ledger

*Irfan Ali Khan — Independent Researcher*

This dossier is a two-country **achievement ledger**: a per-row-verified record of American and Chinese innovation, infrastructure, and social achievements from 1926 to 2026, built under a published selection rule and a published promotion standard. It is deliberately neither a triumphalist nor a declinist account — every row wears an honest status label, and the momentum layer is computed only as an explicitly **OPEN-CAVEATED** constructed index — shown with its full sensitivity bands and named exclusions, never as a measured verdict. The honest state today: 270 candidate rows, 268 ESTABLISHED, the rest labeled OPEN-UNVERIFIED or REPORTED and posted as open challenges. **Don't trust this paper — run it.**

## Avenues

| Avenue | Thesis | Status | Forecast | Sources |
|---|---|---|---|---|
| The achievement ledger | A 270-row, event-anchored, per-row-verified corpus of US and Chinese achievements 1926–2026; 268 rows ESTABLISHED under a published promotion standard, with the full 1926–2025 chronological corpus now processed. | ESTABLISHED | — | verification_ritual.md, selection_criteria.md |
| Coverage shape | Facts about the corpus under the published selection rule: US coverage is steady and invention/deployment-heavy; China's is thin early, rises late, and is completion/milestone-heavy. A statement about the ledger — NOT a momentum verdict about the world. | ESTABLISHED | — | coverage_report.md, selection_criteria.md |
| The momentum index | Now computed and shown as a constructed index (Option C gate: ESTABLISHED rows only, non-ESTABLISHED rows excluded and named). Primary = baseline equal weighting; bands span four published weightings; whiskers show the 1946–1955 exclusion. Re-weightable, rubric published — true only within its scope, never a measured verdict. | OPEN-CAVEATED | — | scoring_rubric_DESIGN.md, scoring/weights.json |
| Early-century China floor | 1926–1945 China coverage is a floor, not a fact — real historical thinness compounded by English-language source bias. Posted as an open challenge: readers who know this literature can raise it, for named credit. | OPEN-UNVERIFIED | — | coverage_report.md |
| Verification in progress | Live status: 268 ESTABLISHED, 1 OPEN-UNVERIFIED, 1 REPORTED. Batches 1–10 processed the full 1926–2025 corpus; a straggler sweep then removed one un-anchorable row and converted two more into anchored, verified rows. Just ONE row stays open: the Chengdu–Chongqing Railway (CN-1952-1) — its July 1952 opening is uncontested, but no independent non-PRC source has been found, so it is posted as an open challenge (named credit for whoever closes it). The 2026 window is also not yet closed. | OPEN-UNVERIFIED | — | claim_ledger.csv, verification_log.md |

## Consistency checks

Results from `verification/verify_numbers.py` — the same checks the in-page console runs; CI reruns them on every commit.

- [PASS] Consistency: at least one avenue in the landscape
- [PASS] Consistency: every FORECAST has a dated signpost
- [PASS] Consistency: all forecast probabilities lie in [0,100]
- [PASS] Ledger S1: every draft row has a valid status
- [PASS] Ledger S2: every ESTABLISHED ledger row meets the source standard
- [PASS] Ledger S3: draft ESTABLISHED set reconciles with ledger set
- [PASS] Census: 268 ESTABLISHED / 1 OPEN-UNVERIFIED / 1 REPORTED (live corpus counts)
- [PASS] Index I1: scoring/index_output.json matches a fresh recompute from the ledger
- [PASS] Index I2: every excluded (non-ESTABLISHED) row is named in the chart caption
- [PASS] Index I3: every sensitivity band contains its primary score
- [PASS] Index I4: momentum data-figure spec present verbatim in index.html
- [PASS] Index I5: Century Spine block counts per year per country == the corpus
- [PASS] Index I6: every spine block year resolves to a year anchor in dossier.html
- [PASS] Index I7: Century Spine data-figure spec present verbatim in index.html
- [PASS] Index I8: year-dossier cards reconcile exactly with the ESTABLISHED ledger
- [PASS] Index I9: year dossiers present verbatim in dossier.html
- [PASS] Index I10: spine density silhouette recomputes exactly from the corpus (rolling window)
- [PASS] Index I11: volume-context strip series == data/context_series.csv exactly
- [PASS] Index I12: in-figure year-panel cards == the ESTABLISHED ledger, field-for-field

**TOTAL: 19 checks · 19 pass · 0 fail** — All checks pass — the survey is internally consistent.

**THE LEDGER · NARRATIVE**

## 01 THE QUESTION

Whether American or Chinese momentum (Here 'momentum' means the relative rate at which a country accumulates notable, dateable achievements over time — not GDP, not military power, and not a prediction. In this dossier it is a constructed index computed over the achievement ledger and published as OPEN-CAVEATED: every output states its rubric and shows how it moves as the weighting changes.) is ahead is one of the most argued questions in geopolitics, and it is argued mostly with anecdotes. Serious scholarship splits into two poles: one holds the American lead durable [Beckley '18], the other reads the trajectory as a classic rising-power challenge [Allison '17]. That the field is genuinely divided is itself the only safe thing to assert up front — both narratives are cottage industries, and each can curate a list of achievements to "win".

This dossier's bet is that the useful thing to publish is not another verdict but the instrument underneath one: a single, auditable ledger of what each country actually did and when, with every entry labeled to say exactly how well-checked it is. Build the ledger honestly first; argue about the scoreboard second — and only with the scoreboard's rubric fully exposed. Nothing on this page hands you a single winner: the momentum index below IS computed, but only as an openly constructed, re-weightable index that shows the answer changing with the rubric — a scoreboard you can audit and overturn, not a verdict.

*Map the achievements before scoring them — and never let the scoreboard smuggle itself in as a fact.*

## 02 WHAT'S ESTABLISHED — THE CORPUS AND ITS DISCIPLINES

The corpus is 270 candidate rows spanning 1926–2026, split between the US and China. Each row is **event-anchored** — tied to one specific dateable event (a founding, a first flight or launch, a completion, a commercial deployment, a discovery, a milestone) rather than a vague "era". A row becomes ESTABLISHED only when it clears a published promotion standard, held in `notes/verification_ritual.md`: a precise falsifiable claim; at least one qualifying independent source (or two independent journalistic/encyclopedic ones); its date confirmed against that specific anchor; and any conflicting US/Chinese figures recorded rather than silently adjudicated. 268 rows have cleared that bar, and the full 1926–2025 chronological corpus has now been processed.

The selection rule, in `notes/selection_criteria.md`, is country-neutral by construction: a category is assigned by a claim's primary significance, not by which country produced it, so the same test that files a US firm's founding files a Chinese one. Three disciplines guard the sensitive cases. The **event/magnitude split**: a reform's occurrence can be ESTABLISHED while its contested output figure is caveated — China's reform-era poverty reduction, for instance, is asserted on the World Bank's independent series [World Bank], with China's own poverty-line count noted alongside rather than blended in. **Data-integrity**: where US and Chinese figures for one quantity conflict, both are shown. And a **trajectory rule**: a multi-year cumulative achievement may stand as a single row only under an independently-maintained series, an explicit span written into the claim, and filing at the span's start year — so a mid-span marker can never masquerade as a discrete event.

The shape of the corpus is itself a set of ESTABLISHED facts — but facts **about the ledger under this selection rule**, not a verdict about the world. Under the rule, US coverage is comparatively steady across the decades and weighted toward invention and commercial-deployment anchors; Chinese coverage is thin in the early decades, rises in the later ones, and is weighted toward completion and milestone anchors. Both patterns are partly real and partly artifacts — of era, of what each category happens to reward, and of English-language source availability during drafting. They describe how the ledger is populated. They are emphatically **not** a momentum score, and nothing here should be read as one.

The corpus is easier to grasp as a picture than a table. The **Century Spine** below plants one block per row at its anchor year — the US stacking up from the centreline, China down — coloured by category and textured by verification label (solid ESTABLISHED, outlined OPEN, hatched REPORTED). It is a raw-count portrait of the ledger under the selection rule, not a momentum score; **click any year** to open that year's cards in place, or follow a block's deep-link into its year dossier on the audit-trail edition (`dossier.html#y-YYYY`). Beneath the spine, a thin **volume strip** answers the obvious objection: the canon above is *flat by construction* (the selection rule targets a handful of rows per country per decade), so it deliberately cannot show the century's actual scale-up — the strip does, plotting measured R&D expenditure on a log axis. The contrast between the two is the point.

I. The ledger — what happened

*(figure: The Century Spine: one block per corpus achievement 1926-2026, US above the centreline and China below, coloured by category and textured by verification label, with a 7-year rolling density silhouette. — TOP (spine) = the curated canon, FLAT BY CONSTRUCTION: the selection rule (notes/selection_criteria.md) targets ~5-15 rows per country per decade, so no decade can dwarf another - the flatness is a property of the RULE, not the world. BOTTOM (strip) = what the century's MEASURED innovation volume actually did (R&D expenditure). The contrast is the finding. --- Spine detail: one block per corpus row at its anchor year, US up / China down (1926-2026); 270 rows (US 143, China 127), of which 268 ESTABLISHED (solid), 1 OPEN-UNVERIFIED (outlined) and 1 REPORTED (hatched); colour = category. Amendment-4 trajectory rows sit at their span-start with a forward tick. Click a year for its cards; each block also links to its year dossier (dossier.html#y-YYYY). The shaded envelope is a 7-year centred rolling count per country (a presentation smoothing choice, no weights); the ribbon is the US-minus-China net. --- Strip: GERD (R&D spend), PPP $B, LOG scale (OECD MSTI / NSF NCSES) - chosen over patent counts, which Chinese filing subsidies distort (~1 in 10 CNIPA filings 'irregular'); the PPP base year shifts the exact US-China crossover.)*

**Go deeper: the disciplines in one place**

The promotion standard, the fail outcomes, and the labels all live in versioned notes. When a candidate row fails the standard it does not vanish: it stays OPEN-UNVERIFIED (with the reason logged), or is reclassified **REPORTED** with the interested party named, or is removed to a logged tombstone in `notes/removed_rows.md` — never silently deleted. REPORTED is reserved for an interested-party magnitude claim that independent work has not reproduced; exactly one row carries it today (a 1952 output-recovery figure resting on contested official statistics), and it gets a vote on nothing. The trajectory rule is the newest discipline, applied country-blind: a US wartime-production row and a US shale row were reshaped by the very same rule that reshaped a Chinese poverty row and a Chinese expressway row.

## 03 THE AVENUES, ONE BY ONE

The landscape above carries five cards. Two are ESTABLISHED and asserted plainly; three are open and labeled as such, each an invitation with named credit attached.

### The achievement ledger — ESTABLISHED

The ledger itself — 270 rows, event-anchored, per-row-verified, 268 ESTABLISHED under the promotion standard — is the dossier's spine and its most finished part. It is asserted directly, because documented, dated, sourced achievements are bedrock, and timidity about them would be its own dishonesty.

### Coverage shape — ESTABLISHED (about the corpus)

The decade-density and event-type patterns described in section 02 are established facts about the corpus under the published rule — and only that. They are asserted as description, never re-read as a race.

### The momentum index — OPEN-CAVEATED

Here is the scoreboard — but wearing its true label. It is a real computation over the ESTABLISHED rows, yet the **rubric** that turns achievements into a number (which categories count how much, how decades are normalized) is an authorial construction, so the whole layer is **OPEN-CAVEATED**: true only within its stated scope, and a reader who re-weights it gets a different chart. That is the point, not a flaw.

> **OPEN-CAVEATED** — **Constructed momentum index — re-weight it yourself.** The primary bars use the baseline equal weighting (a pure ESTABLISHED-count share per decade); the coloured bands span four published weightings in `scoring/weights.json`, two of them deliberately tuned to favour each country's achievement profile. Where a band crosses the halfway line, defensible weightings disagree on who led that decade — those decades are **findings, not embarrassments**. The two non-ESTABLISHED rows (the Chengyu railway and the one REPORTED figure, both China, 1946–1955) are excluded from the bars and named in the caption; their exclusion understates China in that decade, and the whiskers show the corrected range. The full rubric, its alternatives, and the era-normalization scheme are published in `notes/scoring_rubric_DESIGN.md`.

II. The index — one way to weigh it, adjustable

*(figure: Constructed momentum index: per-decade within-decade share, US vs China, with sensitivity bands and 1946-1955 exclusion whiskers. — Constructed momentum index (OPEN-CAVEATED) - NOT a measured fact. Primary series: baseline equal weighting W0, within-decade share N0, ESTABLISHED rows only. EXCLUDED and not scored: CN-1952-1 (OPEN-UNVERIFIED, 1946-1955); CN-1952-2 (REPORTED, 1946-1955) - understates China in 1946-1955 (the whiskers on that decade show the corrected range if those rows were established). Coloured bands span all four published weightings W0-W3; where a country's band crosses the halfway line, defensible weightings disagree on who leads that decade - those decades (1976-1985, 1986-1995, 1996-2005) are findings, not results. The final 2016-2025 bar is the last full decade; the 2026 window is not yet closed. Re-weight it yourself: the rubric is published and versioned in notes/scoring_rubric_DESIGN.md and scoring/weights.json.)*

Read across the decades and the honest shape is neither triumph nor decline: an American lead through the mid-century, a genuinely contested middle where the bands overlap and the baseline runs to a tie (the decades named in the caption), and a later-decade Chinese lead — with the whole picture sliding as you change the weighting. The chart above carries its own controls: drag the six category weights or snap to the four published presets and the primary bars re-score in real time, using the exact math the verifier checks. It never touches a row's verification label — and the one thing it refuses to give you is a single number that settles the argument.

### Early-century China floor — OPEN

> **OPEN-UNVERIFIED** — **1926–1945 Chinese coverage is a floor, not a fact.** Part of the thinness is real — war, less formal industrialization, fewer dateable formal achievements — and part is English-language source bias in the drafting. This is posted as an open challenge: a reader who commands the Republican-era Chinese-language literature can raise the floor, and the first to add a well-anchored, well-sourced row gets **named credit** in the next version.

### Verification in progress — OPEN

> **OPEN-UNVERIFIED** — **Live status: 268 ESTABLISHED, 1 OPEN-UNVERIFIED, 1 REPORTED.** Verification ran in chronological batches of about twenty-five rows; batches one through ten processed the full 1926–2025 corpus, and a dedicated straggler sweep then resolved the leftovers — removing one un-anchorable status claim ("workshop of the world," superseded by its dateable 2010 twin) and converting two diffuse early rows into anchored, verified ones (the 1938 Yichang industrial evacuation; the Rong family's Shenxin mills as China's largest industrial employer by ~1932). **Exactly one row now stays open — an explicit open challenge:** the Chengdu–Chongqing Railway, `CN-1952-1`. Its July 1952 opening as the first railway wholly built by the PRC is an uncontested physical fact, yet re-sourcing has found only interested-party (PRC-state) accounts alongside a single independent reference — below the standard's bar of one qualifying source or two independent ones. It stays OPEN-UNVERIFIED until a genuinely independent, non-PRC source (a Western transport- or economic-history monograph) is found. **Whoever supplies that source gets named credit in the next version.** Separately, the 2026 window is not yet closed — the final months simply have not happened.

## 04 WHAT WOULD SETTLE THE OPEN QUESTIONS

Each open card names its own closing move. The **ledger** closes the corpus when every remaining row is either promoted to ESTABLISHED or honestly reclassified — it stays OPEN-UNVERIFIED, or becomes REPORTED with the interested party named, or is removed to a logged tombstone. That is a bounded, mechanical amount of verification work, tracked batch by batch in `notes/verification_log.md`. The **momentum index** is already computed and shown (OPEN-CAVEATED); closing the last OPEN row — the Chengyu railway — would simply retire the one exclusion whisker, folding that 1946–1955 correction into the bars. The **early-century China floor** closes differently — not by internal work but by external expertise: it moves when readers who command the area-studies literature contribute anchored, sourced rows. None of these require anyone to trust the author; each names the exact thing that would move it.

## 05 SYNTHESIS SO FAR

The defensible spine is three rungs kept rigorously apart: a documented **achievement ledger** (mostly ESTABLISHED, and the most finished thing here); a constructed **momentum index** (now computed and shown as OPEN-CAVEATED — rubric exposed, re-weightable, and never to be labeled above OPEN-CAVEATED); and, further out, a speculative **projection** of the two trajectories at +10, +20, and +30 years (which will be EXPLORATORY-CONJECTURE when it is written, and nothing higher). This front door is honest about which rung each claim sits on. What it deliberately does not contain is a single-number verdict — the momentum index is a re-weightable construction shown with its disagreements on the surface, never "momentum favours X" asserted as a measured fact.

*Three rungs, three labels, never blurred — and until the ledger is done, no number gets to call the race.*

## References

- **Beckley '18** — Michael Beckley (2018). Argues the United States' lead in economic and military power is larger and more durable than declinist accounts hold — one pole of the momentum debate this dossier maps rather than joins. *Unrivaled: Why America Will Remain the World's Sole Superpower, Cornell University Press (2018).*

- **Allison '17** — Graham Allison (2017). Frames US–China rivalry through the 'Thucydides trap' — a rising power challenging a ruling one — the opposing pole of the same debate. *Destined for War: Can America and China Escape Thucydides's Trap?, Houghton Mifflin Harcourt (2017).*

- **World Bank** — World Bank. China's country data record roughly 800 million people lifted out of extreme poverty over 1978–2019 (about three-quarters of global poverty reduction) on the international poverty line — the independent series behind the dossier's reform-era poverty row. *World Bank, China country overview and poverty-reduction results (accessed 2026).*
