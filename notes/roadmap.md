# Roadmap — designed-later items

Forward-looking design notes for this dossier. Nothing here is built yet; each item
is a placeholder for future work, recorded so the intent is not lost. (This is the
dossier's content roadmap; the repo-root `ROADMAP.md` tracks template machinery.)

## Zoomable timeline figure (PARTIALLY DELIVERED)

**Delivered (2026-07-27):** the three altitudes of this figure now exist as discrete,
static, JS-off-complete pieces, all generated deterministically by
`scoring/compute_index.py` and verifier-locked:
- **Megatrend / momentum view** — the per-decade OPEN-CAVEATED momentum chart, with a
  **client-side re-weighting instrument** ("Weigh it yourself") that recomputes the
  bars live from the same baked JSON the verifier checks (scoring math ported once to
  `scoring/score.js`, JS/Python agreement asserted).
- **Mid view** — the **Century Spine**: one block per corpus row at its year, US up /
  China down, colour = category, texture = verification label, each block a deep link,
  **plus a rolling-window (7-yr) density silhouette** — mirrored filled areas behind the
  blocks + a net-difference centreline ribbon — so the spine reads as momentum, not dots.
- **Per-achievement cards** — the **Year Dossiers** on the audit-trail edition, one
  card per ESTABLISHED row under a per-year `#y-YYYY` anchor the spine links into.
- The momentum + spine charts are now **living `data-figure` figures** (figures/dossierviz.js:
  poster emitter for the JS-off floor + live renderer), so they use the runtime's
  **documented expand affordance** — the `.lf-expand` trigger + near-viewport `#lf-lightbox`
  from `figures.js` — not an ad-hoc lightbox. The momentum figure is one bounded unit: the
  "Weigh it yourself" controls sit directly above the chart they re-score.

**Remaining ambition (future pass):** fuse these three into ONE figure with **smooth,
continuous zoom** and **mid-altitude transitions** — a single canvas the reader drags
from the megatrend view down to a single card, rather than three linked static
surfaces. Labels must stay visually first-class at every zoom level (never degrade to
unlabeled dots). The zoomed-out momentum surface keeps inheriting the OPEN-CAVEATED
scoring frame. The likely vehicle is a `data-figure` spec against the vendored
`figures/` runtime (compose the shared primitives; seal a JS-off poster) so the smooth
version still degrades to the static pieces already shipped.

## Offline re-source: the Chengyu Railway open challenge (CN-1952-1)

The Chengdu–Chongqing Railway's July 1952 opening — the first railway wholly built
by the PRC — is an uncontested physical fact, but web re-sourcing (batches 3 and the
2026-07-27 straggler sweep) surfaced only interested-party PRC-state accounts (SASAC,
Xinhua, CGTN) alongside a single independent reference (Wikipedia). That is below the
promotion standard (one qualifying-class source, or two independent journalistic/
encyclopedic ones). The row stays OPEN-UNVERIFIED — the standard biting on a true
fact — and is posted on the front door as an open challenge with named credit. The
bounded close: an **offline/library re-source** for a genuinely independent, non-PRC
account — a Western transport- or economic-history monograph (e.g. a chapter in a
Cambridge/Harvard PRC economic history, or a specialist railway history), which web
search does not index. Not a permanent-open ruling; a task awaiting a library pass.
