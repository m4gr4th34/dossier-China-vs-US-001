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
