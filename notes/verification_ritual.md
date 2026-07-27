# Verification ritual — promoting draft rows to ESTABLISHED

The draft corpus (`data/achievements_draft.csv`, 259 rows, all OPEN-UNVERIFIED)
is frozen (see `coverage_report.md`). This ritual is how a row earns a stronger
label than OPEN-UNVERIFIED — one row at a time, in chronological batches, with the
work logged so the label is *true, including about its own process*.

The corpus freeze and this ritual are complementary: the freeze bars **bulk
content passes and silent additions/removals**; this ritual is the **per-row**
channel through which the only sanctioned changes flow.

---

## 1. The promotion standard — what ESTABLISHED requires

A row is promoted from OPEN-UNVERIFIED to **ESTABLISHED** only when **all four**
hold:

- **(a) Precisely restated, falsifiable claim.** The `claim_text` is rewritten (if
  needed) to a single, checkable assertion — no vague verbs, no "major/leading"
  hand-waving that can't be falsified. If the claim cannot be stated falsifiably,
  it cannot be ESTABLISHED.
- **(b) Qualifying sources.** Either **one** source of class `official-national`,
  `international-body`, or `independent-academic`; **or two independent**
  `journalistic`/`encyclopedic` sources. **Independent = the two sources do not
  cite each other** and do not both derive from a single common source (e.g. two
  encyclopedias that both cite the same press release are *not* independent).
- **(c) Date confirmed against the row's event anchor specifically.** The year must
  be confirmed for **the exact `event_type` anchor** the row claims — not a nearby
  milestone of the same technology. (Penicillin's row anchors to US 1943
  *commercial-deployment*; confirming the 1928 British *discovery* does **not**
  verify it. Xerography's row anchors to the 1938 *invention*, not the 1959
  product.) A `circa`/`range` anchor is confirmed by pinning the anchored event to
  within the stated precision.
- **(d) Conflicting figures both recorded.** Where US and Chinese official figures
  (or any two credible sources) conflict on a quantity, **both are recorded** in
  the ledger row's `sources`/`notes` — never silently adjudicated. A conflict does
  not by itself block promotion of the *event* (e.g. "the dam was completed"), but
  the disputed *number* is carried with both values.

## 2. Fail outcomes — what happens when the standard is not met

Every processed row gets exactly one outcome. If not ESTABLISHED, then one of:

- **Remain OPEN-UNVERIFIED.** The claim is plausibly true but the standard is not
  yet met (diffuse claim with no discrete anchor, sources not yet run to the bar,
  circa date not pinnable). The row stays in the draft with `status =
  OPEN-UNVERIFIED`, gets its `verified_batch` stamp, and the **reason is logged**
  in `verification_log.md`. It is re-eligible in a future per-row pass.
- **Reclassify REPORTED.** The claim's only support is **interested-party** sources
  (a state media outlet, a company's own PR, an advocacy think-tank) with no
  independent corroboration. Set `status = REPORTED`, **name the interested party**
  in `notes`, and — per the constitution's REPORTED rules — state the mundane
  candidate explanation (or that none is known) with equal prominence. REPORTED is
  a provenance tag, never a rung above OPEN-UNVERIFIED.
- **REMOVE.** The row does not survive scrutiny (the event did not happen as
  stated, is not attributable to the country under the anchor, or fails the
  notability rule on re-examination). The row is **cut from the draft CSV and moved
  to `notes/removed_rows.md`** with the full original row and a logged reason.
  **Never silently deleted** — a removed row leaves a visible, dated tombstone.

## 3. Ledger mechanics — `claim_ledger.csv` (first use)

- **Promotion writes the row into `claim_ledger.csv`.** This is the formal ledger
  of ESTABLISHED claims. Its schema:

  `id, year, country, category, event_type, claim, status, sources, source_class, verified_batch, verified_date`

  - `sources` — the actual sources consulted, ` | `-separated.
  - `source_class` — the class(es) that satisfied standard (b); ` | `-separated when
    two independent sources were used.
  - `status` — `ESTABLISHED` (only promoted rows live here).
  - `verified_batch` / `verified_date` — which batch processed it, and when.

- **The draft CSV keeps the full corpus** and gains a `verified_batch` column
  marking when each row was processed (empty = not yet). A promoted row's
  `status` in the draft is updated to `ESTABLISHED` too, so the draft stays the
  complete picture and the ledger stays the formal record. `verify_numbers.py`
  reconciles the two (count of ESTABLISHED in the draft == rows in the ledger).

- The other claim TYPES the constitution defines (OPEN-CAVEATED,
  EXPLORATORY-CONJECTURE, FORECAST, CITE) are not produced by *this* ritual, which
  only moves rows between OPEN-UNVERIFIED / ESTABLISHED / REPORTED / removed. The
  scoring layer (design in `scoring_rubric_DESIGN.md`) is separately OPEN-CAVEATED.

## 4. The batch process

- **Batch size ≈ 25 rows, chronological** (sorted by year, then country, then id).
  Chronological order means each batch is a coherent era, and the early batches hit
  the thinnest-coverage decades first.
- **Per-batch log** in `notes/verification_log.md`: for every row, its **outcome**,
  the **sources consulted**, and **one line of reasoning**.
- **Freeze interaction.** While verifying an era, missed-achievement candidates for
  that era (especially the flagged **China 1926–1945** under-coverage) are recorded
  in the log as **proposals ONLY**. The freeze means additions require the author's
  explicit sign-off — they are **never** silently included by the verification pass.

## 5. Honesty clauses (non-negotiable)

- The ESTABLISHED label asserts that the standard in §1 was actually met, with the
  sources actually consulted — the label about the process must itself be true.
- A promotion is not a claim of *importance*, only of *documented factual accuracy
  under the stated anchor*. Importance/weight is the scoring layer's problem.
- When in doubt, do not promote. OPEN-UNVERIFIED is the honest resting state; the
  ritual exists to move rows up *only* on real evidence, never to clear a backlog.
