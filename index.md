An Open Dossier · **China-vs-US-001**

# The US–China Century Ledger

*Irfan Ali Khan — Independent Researcher*

This dossier is a two-country **achievement ledger**: a per-row-verified record of American and Chinese innovation, infrastructure, and social achievements from 1926 to 2026, built under a published selection rule and a published promotion standard. It is deliberately neither a triumphalist nor a declinist account — every row wears an honest status label, and the momentum layer (the planned per-year comparative chart) stays gated behind full verification and is **not computed here**. The honest state today: 271 candidate rows, 218 ESTABLISHED, the rest labeled OPEN-UNVERIFIED or REPORTED and posted as open challenges. **Don't trust this paper — run it.**

## Avenues

| Avenue | Thesis | Status | Forecast | Sources |
|---|---|---|---|---|
| The achievement ledger | A 271-row, event-anchored, per-row-verified corpus of US and Chinese achievements 1926–2026; 218 rows ESTABLISHED to date under a published promotion standard. | ESTABLISHED | — | verification_ritual.md, selection_criteria.md |
| Coverage shape | Facts about the corpus under the published selection rule: US coverage is steady and invention/deployment-heavy; China's is thin early, rises late, and is completion/milestone-heavy. A statement about the ledger — NOT a momentum verdict about the world. | ESTABLISHED | — | coverage_report.md, selection_criteria.md |
| The momentum index | Designed, gated, and not run: no decade scores while the corpus still holds OPEN-UNVERIFIED rows. Rubric + sensitivity analysis committed as design only; the chart will be OPEN-CAVEATED when it exists, never higher. | OPEN-UNVERIFIED | — | scoring_rubric_DESIGN.md |
| Early-century China floor | 1926–1945 China coverage is a floor, not a fact — real historical thinness compounded by English-language source bias. Posted as an open challenge: readers who know this literature can raise it, for named credit. | OPEN-UNVERIFIED | — | coverage_report.md |
| Verification in progress | Live status: 218 ESTABLISHED, 52 OPEN-UNVERIFIED, 1 REPORTED. Batches 1–9 cover 1926–2010 at ~25 rows per batch; the rest (2010→, plus named early stragglers) are not yet promoted. | OPEN-UNVERIFIED | — | claim_ledger.csv, verification_log.md |

## Consistency checks

Results from `verification/verify_numbers.py` — the same checks the in-page console runs; CI reruns them on every commit.

- [PASS] Consistency: at least one avenue in the landscape
- [PASS] Consistency: every FORECAST has a dated signpost
- [PASS] Consistency: all forecast probabilities lie in [0,100]
- [PASS] Ledger S1: every draft row has a valid status
- [PASS] Ledger S2: every ESTABLISHED ledger row meets the source standard
- [PASS] Ledger S3: draft ESTABLISHED set reconciles with ledger set
- [PASS] Census: 218 ESTABLISHED / 52 OPEN-UNVERIFIED / 1 REPORTED (live corpus counts)

**TOTAL: 7 checks · 7 pass · 0 fail** — All checks pass — the survey is internally consistent.

**THE LEDGER · NARRATIVE**

## 01 THE QUESTION

Whether American or Chinese momentum (Here 'momentum' means the relative rate at which a country accumulates notable, dateable achievements over time — not GDP, not military power, and not a prediction. In this dossier it is a constructed index computed over the achievement ledger, and it is deliberately not calculated until every row is verified.) is ahead is one of the most argued questions in geopolitics, and it is argued mostly with anecdotes. Serious scholarship splits into two poles: one holds the American lead durable [Beckley '18], the other reads the trajectory as a classic rising-power challenge [Allison '17]. That the field is genuinely divided is itself the only safe thing to assert up front — both narratives are cottage industries, and each can curate a list of achievements to "win".

This dossier's bet is that the useful thing to publish is not another verdict but the instrument underneath one: a single, auditable ledger of what each country actually did and when, with every entry labeled to say exactly how well-checked it is. Build the ledger honestly first; argue about the scoreboard second — and only with the scoreboard's rubric fully exposed. Nothing on this page tells you who is winning, because the ledger that would earn such a claim is not finished and the index that would compute one is gated shut.

*Map the achievements before scoring them — and never let the scoreboard smuggle itself in as a fact.*

## 02 WHAT'S ESTABLISHED — THE CORPUS AND ITS DISCIPLINES

The corpus is 271 candidate rows spanning 1926–2026, split between the US and China. Each row is **event-anchored** — tied to one specific dateable event (a founding, a first flight or launch, a completion, a commercial deployment, a discovery, a milestone) rather than a vague "era". A row becomes ESTABLISHED only when it clears a published promotion standard, held in `notes/verification_ritual.md`: a precise falsifiable claim; at least one qualifying independent source (or two independent journalistic/encyclopedic ones); its date confirmed against that specific anchor; and any conflicting US/Chinese figures recorded rather than silently adjudicated. 218 rows have cleared that bar so far.

The selection rule, in `notes/selection_criteria.md`, is country-neutral by construction: a category is assigned by a claim's primary significance, not by which country produced it, so the same test that files a US firm's founding files a Chinese one. Three disciplines guard the sensitive cases. The **event/magnitude split**: a reform's occurrence can be ESTABLISHED while its contested output figure is caveated — China's reform-era poverty reduction, for instance, is asserted on the World Bank's independent series [World Bank], with China's own poverty-line count noted alongside rather than blended in. **Data-integrity**: where US and Chinese figures for one quantity conflict, both are shown. And a **trajectory rule**: a multi-year cumulative achievement may stand as a single row only under an independently-maintained series, an explicit span written into the claim, and filing at the span's start year — so a mid-span marker can never masquerade as a discrete event.

The shape of the corpus is itself a set of ESTABLISHED facts — but facts **about the ledger under this selection rule**, not a verdict about the world. Under the rule, US coverage is comparatively steady across the decades and weighted toward invention and commercial-deployment anchors; Chinese coverage is thin in the early decades, rises in the later ones, and is weighted toward completion and milestone anchors. Both patterns are partly real and partly artifacts — of era, of what each category happens to reward, and of English-language source availability during drafting. They describe how the ledger is populated. They are emphatically **not** a momentum score, and nothing here should be read as one.

**Go deeper: the disciplines in one place**

The promotion standard, the fail outcomes, and the labels all live in versioned notes. When a candidate row fails the standard it does not vanish: it stays OPEN-UNVERIFIED (with the reason logged), or is reclassified **REPORTED** with the interested party named, or is removed to a logged tombstone in `notes/removed_rows.md` — never silently deleted. REPORTED is reserved for an interested-party magnitude claim that independent work has not reproduced; exactly one row carries it today (a 1952 output-recovery figure resting on contested official statistics), and it gets a vote on nothing. The trajectory rule is the newest discipline, applied country-blind: a US wartime-production row and a US shale row were reshaped by the very same rule that reshaped a Chinese poverty row and a Chinese expressway row.

## 03 THE AVENUES, ONE BY ONE

The landscape above carries five cards. Two are ESTABLISHED and asserted plainly; three are open and labeled as such, each an invitation with named credit attached.

### The achievement ledger — ESTABLISHED

The ledger itself — 271 rows, event-anchored, per-row-verified, 218 ESTABLISHED under the promotion standard — is the dossier's spine and its most finished part. It is asserted directly, because documented, dated, sourced achievements are bedrock, and timidity about them would be its own dishonesty.

### Coverage shape — ESTABLISHED (about the corpus)

The decade-density and event-type patterns described in section 02 are established facts about the corpus under the published rule — and only that. They are asserted as description, never re-read as a race.

### The momentum index — OPEN

Where the dossier would offer a scoreboard, it instead offers a gated design and an honest label:

> **OPEN-UNVERIFIED** — **The per-year comparative momentum chart is designed and gated, not run.** No decade scores are computed while the corpus still holds OPEN-UNVERIFIED rows; the scoring rubric and its sensitivity analysis are committed as design only, in `notes/scoring_rubric_DESIGN.md`. When the chart exists it will be labeled **OPEN-CAVEATED** — a construction over a constructed index, with its rubric fully exposed so a hostile reader can re-weight it and get a different chart. This card is the standing promise that it will never be labeled higher.

### Early-century China floor — OPEN

> **OPEN-UNVERIFIED** — **1926–1945 Chinese coverage is a floor, not a fact.** Part of the thinness is real — war, less formal industrialization, fewer dateable formal achievements — and part is English-language source bias in the drafting. This is posted as an open challenge: a reader who commands the Republican-era Chinese-language literature can raise the floor, and the first to add a well-anchored, well-sourced row gets **named credit** in the next version.

### Verification in progress — OPEN

> **OPEN-UNVERIFIED** — **Live status: 218 ESTABLISHED, 52 OPEN-UNVERIFIED, 1 REPORTED.** Verification runs in chronological batches of about twenty-five rows; batches one through nine cover 1926–2010. The rest are not yet promoted — including a few named early stragglers (the Rong-family cotton-textile firms, `CN-1930-1`; the wartime relocation of industry and universities, `CN-1940-1`; the Chengdu–Chongqing Railway, `CN-1952-1`, held for a second independent source) and everything from 2010 onward (the most recent decade still ahead). The console above shows the current count; it moves as batches land.

## 04 WHAT WOULD SETTLE THE OPEN QUESTIONS

Each open card names its own closing move. The **ledger** closes the corpus when every remaining row is either promoted to ESTABLISHED or honestly reclassified — it stays OPEN-UNVERIFIED, or becomes REPORTED with the interested party named, or is removed to a logged tombstone. That is a bounded, mechanical amount of verification work, tracked batch by batch in `notes/verification_log.md`. Only then does the **momentum index** unlock: with no OPEN rows left to distort it, the gated chart can be computed and published as OPEN-CAVEATED, rubric exposed. The **early-century China floor** closes differently — not by internal work but by external expertise: it moves when readers who command the area-studies literature contribute anchored, sourced rows. None of these require anyone to trust the author; each names the exact thing that would move it.

## 05 SYNTHESIS SO FAR

The defensible spine is three rungs kept rigorously apart: a documented **achievement ledger** (mostly ESTABLISHED, and the most finished thing here); a constructed **momentum index** (designed, gated, unrun — and never to be labeled above OPEN-CAVEATED); and, further out, a speculative **projection** of the two trajectories at +10, +20, and +30 years (which will be EXPLORATORY-CONJECTURE when it is written, and nothing higher). This front door is honest about which rung each claim sits on. What it deliberately does not contain is a scoreboard — there is no momentum verdict on this page, because the ledger that would earn one is unfinished and the index that would compute one is gated shut.

*Three rungs, three labels, never blurred — and until the ledger is done, no number gets to call the race.*

## References

- **Beckley '18** — Michael Beckley (2018). Argues the United States' lead in economic and military power is larger and more durable than declinist accounts hold — one pole of the momentum debate this dossier maps rather than joins. *Unrivaled: Why America Will Remain the World's Sole Superpower, Cornell University Press (2018).*

- **Allison '17** — Graham Allison (2017). Frames US–China rivalry through the 'Thucydides trap' — a rising power challenging a ruling one — the opposing pole of the same debate. *Destined for War: Can America and China Escape Thucydides's Trap?, Houghton Mifflin Harcourt (2017).*

- **World Bank** — World Bank. China's country data record roughly 800 million people lifted out of extreme poverty over 1978–2019 (about three-quarters of global poverty reduction) on the international poverty line — the independent series behind the dossier's reform-era poverty row. *World Bank, China country overview and poverty-reduction results (accessed 2026).*
