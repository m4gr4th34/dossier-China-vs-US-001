# Roadmap — designed-later items

Forward-looking design notes for this dossier. Nothing here is built yet; each item
is a placeholder for future work, recorded so the intent is not lost. (This is the
dossier's content roadmap; the repo-root `ROADMAP.md` tracks template machinery.)

## Zoomable timeline figure (designed later — no design work yet)

A single interactive timeline that the reader can zoom continuously from a
**megatrend view** — the whole 1926–2026 span, US and China side by side at the
level of broad eras and clusters — down to **per-achievement cards**, where an
individual row's claim, event anchor, sources, and status label are legible in
full. The hard requirement is that **labels stay visually first-class at every zoom
level**: the figure must never degrade into unlabeled dots or decorative density at
any scale, because a label the reader cannot read is a claim the dossier failed to
make honestly. The zoomed-out view, if it renders any comparative momentum surface,
**inherits the scoring gate** exactly as the per-year chart does — it shows no
momentum scoring while the corpus holds OPEN-UNVERIFIED rows, and when it does it
carries the OPEN-CAVEATED label with its rubric exposed. It will be authored as a
`data-figure` spec against the vendored `figures/` runtime (compose the shared
primitives; seal a JS-off poster) when its turn comes.

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
