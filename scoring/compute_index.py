#!/usr/bin/env python3
"""
compute_index.py — the presentation + scoring layer (OPEN-CAVEATED).

Deterministic generator over the verified achievement corpus. Emits
scoring/index_output.json and injects the generated artefacts into the source
editions between markers (byte-faithfully, so nothing on the page can drift from
the data):

  * MOMENTUM INDEX (OPEN-CAVEATED): per-decade comparative index, primary bars +
    W0-W3 sensitivity bands + 1946-1955 exclusion whiskers. -> index.source.html
    <!--chart:start/end-->. Rubric: notes/scoring_rubric_DESIGN.md, scoring/weights.json.
  * CENTURY SPINE: mirrored unit chart, one block per corpus row at its year
    (US up, China down), colour = category, texture = verification label, plus a
    7-year rolling density silhouette, each block a link to dossier.html#y-YYYY.
    -> index.source.html <!--spine:start/end-->.
  * WEIGH IT YOURSELF: the per-decade per-category/-event ESTABLISHED counts the
    client-side instrument re-scores travel inside the momentum figure's data-figure
    spec. The scoring math is scoring/score.js (used by both the page and the JS/Python
    agreement test); the JS never re-implements it.

  The momentum + spine charts are LIVING FIGURES (figures/dossierviz.js draws them;
  render_figures bakes the JS-off poster; figures.js gives the .lf-expand lightbox).
  This script emits only the DATA (index_output.json + the injected data-figure specs).
  * YEAR DOSSIERS: per-decade <details>, per-year anchored headings (id="y-YYYY"),
    per-achievement cards (one per ESTABLISHED ledger row). -> dossier.source.html
    <!--dossiers:start/end-->.

verify_numbers.py recomputes all of this from the ledger/draft and asserts the
committed JSON + injected bytes match exactly. No hand-entered numbers anywhere.

Gate (RUBRIC v1, Option C): decades score on ESTABLISHED rows only; non-ESTABLISHED
rows are excluded from the momentum series and NAMED in the caption (but they DO
appear in the spine, textured by status). No projections (EXPLORATORY-CONJECTURE).
"""
import csv
import json
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, os.pardir)
LEDGER = os.path.join(ROOT, "claim_ledger.csv")
DRAFT = os.path.join(ROOT, "data", "achievements_draft.csv")
WEIGHTS = os.path.join(HERE, "weights.json")
OUT = os.path.join(HERE, "index_output.json")
SOURCE = os.path.join(ROOT, "editions", "index.source.html")
DOSSIER_SOURCE = os.path.join(ROOT, "editions", "dossier.source.html")

COUNTRIES = ("US", "China")
YEAR_LO, YEAR_HI = 1926, 2026
DECADES = [(y, y + 9) for y in range(1926, 2016 + 1, 10)]
CATEGORIES = ["innovation", "science", "infrastructure", "industrial", "social", "governmental_economic"]
# Canonical category palette — the single source for category colour, reused by the
# spine legend (and available to any future category-coloured view).
CATEGORY_COLORS = {
    "innovation": "#2b6cb0", "science": "#6b46c1", "infrastructure": "#2f855a",
    "industrial": "#c05621", "social": "#b83280", "governmental_economic": "#4a5568",
}
CATEGORY_SHORT = {
    "innovation": "innovation", "science": "science", "infrastructure": "infrastructure",
    "industrial": "industrial", "social": "social", "governmental_economic": "gov/econ",
}
# Momentum-chart plot geometry (MUST match figures/dossierviz.js M.*: W=900 H=380
# padT=34 padB=54). The SVG is drawn in JS (dossierviz.js poster emitter + live
# renderer); this geometry is shared into the figure spec so the instrument moves
# the primary bars using the exact same yf() the poster used.
MOM_PADT, MOM_PLOTH, MOM_Y0 = 34, 292, 326


def decade_label(lo, hi):
    return "%d-%d" % (lo, hi)


def decade_of(year):
    for lo, hi in DECADES:
        if lo <= year <= hi:
            return decade_label(lo, hi)
    return None


def _read_csv(path):
    with open(path, encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def _round(x):
    # round-half-up, identical to JS Math.round(x*1e4)/1e4 so the client-side
    # instrument (scoring/score.js) and this Python agree exactly.
    return math.floor(float(x) * 10000 + 0.5) / 10000


def _esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;"))


# ============================================================
# MOMENTUM INDEX
# ============================================================
def _weight_of(row, weighting, is_event):
    key = row["event_type"] if is_event else row["category"]
    return float(weighting.get(key, 1.0))


def _raw(rows, weighting, is_event):
    out = {decade_label(lo, hi): {c: 0.0 for c in COUNTRIES} for lo, hi in DECADES}
    for r in rows:
        d = decade_of(int(r["year"]))
        if d is None or r["country"] not in COUNTRIES:
            continue
        out[d][r["country"]] += _weight_of(r, weighting, is_event)
    return out


def _shares(raw):
    out = {}
    for d, cc in raw.items():
        total = cc["US"] + cc["China"]
        out[d] = {c: (_round(cc[c] / total) if total else 0.0) for c in COUNTRIES}
    return out


def _interactive_counts(est):
    """Per-decade per-country ESTABLISHED counts by category AND by event_type —
    the raw material scoring/score.js re-scores under any weighting."""
    out = {}
    for lo, hi in DECADES:
        d = decade_label(lo, hi)
        out[d] = {c: {"by_category": {}, "by_event": {}} for c in COUNTRIES}
    for r in est:
        d = decade_of(int(r["year"]))
        if d is None or r["country"] not in COUNTRIES:
            continue
        bc = out[d][r["country"]]["by_category"]
        be = out[d][r["country"]]["by_event"]
        bc[r["category"]] = bc.get(r["category"], 0) + 1
        be[r["event_type"]] = be.get(r["event_type"], 0) + 1
    return out


def compute(ledger_rows, draft_rows, weights):
    est = [r for r in ledger_rows if r.get("status") == "ESTABLISHED"]
    excluded_rows = [r for r in draft_rows if r.get("status") != "ESTABLISHED"]
    cat_w = weights["category_weightings"]
    evt_w = weights["event_weightings"]
    weighting_keys = ["W0", "W1", "W2", "W3"]

    def shares_for(key):
        if key in cat_w:
            return _shares(_raw(est, cat_w[key], is_event=False))
        return _shares(_raw(est, evt_w[key], is_event=True))

    shares_by_w = {k: shares_for(k) for k in weighting_keys}
    primary = shares_by_w["W0"]

    excl_by_decade = {}
    for r in excluded_rows:
        d = decade_of(int(r["year"]))
        if d:
            excl_by_decade.setdefault(d, []).append(r)
    exclusion = {}
    for d, rows in excl_by_decade.items():
        with_share = _shares(_raw(est + rows, cat_w["W0"], is_event=False))[d]
        gainers = sorted({r["country"] for r in rows})
        exclusion[d] = {"without": primary[d], "with": with_share,
                        "excluded_ids": sorted(r["id"] for r in rows),
                        "bias": "understates " + (" and ".join(gainers))}

    series = {}
    est_ids = {}
    for r in est:
        d = decade_of(int(r["year"]))
        if d:
            est_ids.setdefault((d, r["country"]), []).append(r["id"])
    for lo, hi in DECADES:
        d = decade_label(lo, hi)
        series[d] = {}
        for c in COUNTRIES:
            vals = [shares_by_w[k][d][c] for k in weighting_keys]
            series[d][c] = {
                "primary": primary[d][c], "sensitivity_min": _round(min(vals)),
                "sensitivity_max": _round(max(vals)),
                "by_weighting": {k: shares_by_w[k][d][c] for k in weighting_keys},
                "contributing_ids": sorted(est_ids.get((d, c), [])),
            }
        series[d]["exclusion"] = exclusion.get(d)

    disagreement = [decade_label(lo, hi) for lo, hi in DECADES
                    if series[decade_label(lo, hi)]["China"]["sensitivity_min"] < 0.5
                    < series[decade_label(lo, hi)]["China"]["sensitivity_max"]]

    excluded_summary = [{"id": r["id"], "country": r["country"], "status": r["status"],
                         "decade": decade_of(int(r["year"]))}
                        for r in sorted(excluded_rows, key=lambda x: x["id"])]

    # --- spine (all corpus rows) + year dossiers (ESTABLISHED rows) ---
    spine_counts = _spine_counts(draft_rows)
    dossiers_html, dossier_card_ids = build_year_dossiers(est)

    result = {
        "meta": {
            "status": "OPEN-CAVEATED", "rubric": "RUBRIC v1 (notes/scoring_rubric_DESIGN.md)",
            "weights_version": weights.get("version"), "primary_weighting": "W0",
            "normalization": "N0 within-decade share",
            "gate": "Option C: all decades scored on ESTABLISHED rows only; non-ESTABLISHED rows excluded and named.",
            "decades": [decade_label(lo, hi) for lo, hi in DECADES],
            "weighting_labels": weights.get("labels", {}),
            "category_colors": CATEGORY_COLORS,
        },
        "excluded_rows": excluded_summary,
        "disagreement_decades": disagreement,
        "series": series,
        "counts": _interactive_counts(est),
        "spine_counts": spine_counts,
        "dossier_card_ids": dossier_card_ids,
    }
    sil, sil_max = _silhouette(draft_rows)
    result["_silhouette"] = sil
    result["_silhouette_max"] = sil_max
    result["caption"] = build_caption(result)
    result["spine_caption"] = build_spine_caption(draft_rows, spine_counts)
    result["dossiers_html"] = dossiers_html
    result["momentum_spec"] = build_momentum_spec(result)
    result["spine_spec"] = build_spine_spec(result, draft_rows)
    return result


def build_caption(result):
    ex = result["excluded_rows"]
    ex_txt = "; ".join("%s (%s, %s)" % (e["id"], e["status"], e["decade"]) for e in ex)
    bias_bits = sorted({"%s in %s" % (s["exclusion"]["bias"], d)
                        for d, s in result["series"].items() if s.get("exclusion")})
    dis = result["disagreement_decades"]
    return ("Constructed momentum index (OPEN-CAVEATED) - NOT a measured fact. Primary series: "
            "baseline equal weighting W0, within-decade share N0, ESTABLISHED rows only. "
            "EXCLUDED and not scored: " + ex_txt + " - " + "; ".join(bias_bits) +
            " (the whiskers on that decade show the corrected range if those rows were established). "
            "Coloured bands span all four published weightings W0-W3; where a country's band crosses "
            "the halfway line, defensible weightings disagree on who leads that decade - those decades "
            "(" + (", ".join(dis) if dis else "none") + ") are findings, not results. The final 2016-2025 "
            "bar is the last full decade; the 2026 window is not yet closed. Re-weight it yourself: the "
            "rubric is published and versioned in notes/scoring_rubric_DESIGN.md and scoring/weights.json.")


# ============================================================
# CENTURY SPINE (mirrored unit chart; one block per corpus row)
# ============================================================
def _spine_counts(draft_rows):
    out = {}
    for r in draft_rows:
        y = r["year"]
        if r["country"] not in COUNTRIES:
            continue
        out.setdefault(y, {"US": 0, "China": 0})
        out[y][r["country"]] += 1
    return out


def build_spine_caption(draft_rows, spine_counts):
    n = len(draft_rows)
    est = sum(1 for r in draft_rows if r["status"] == "ESTABLISHED")
    opn = sum(1 for r in draft_rows if r["status"] == "OPEN-UNVERIFIED")
    rep = sum(1 for r in draft_rows if r["status"] == "REPORTED")
    us = sum(1 for r in draft_rows if r["country"] == "US")
    cn = sum(1 for r in draft_rows if r["country"] == "China")
    return ("The Century Spine - one block per corpus row at its anchor year, US stacking up from the "
            "centreline and China down (1926-2026). RAW COUNTS under the published selection rule "
            "(notes/selection_criteria.md) and its density target - a fact ABOUT THE CORPUS, not a "
            "momentum score: %d rows (US %d, China %d), of which %d ESTABLISHED (solid), %d OPEN-UNVERIFIED "
            "(outlined) and %d REPORTED (hatched). Colour = category (shared legend below). Amendment-4 "
            "trajectory rows sit at their span-start year with a small forward tick. Each block links to "
            "its year dossier (dossier.html#y-YYYY). The shaded envelope is a %d-year centred rolling "
            "count per country (a PRESENTATION smoothing choice, no weights); the centreline ribbon is the "
            "US-minus-China net of that count." % (n, us, cn, est, opn, rep, SILHOUETTE_WINDOW))


# ============================================================
# YEAR DOSSIERS (per-decade <details>, per-year anchors, per-row cards)
# ============================================================
def build_year_dossiers(est_rows):
    by_year = {}
    for r in est_rows:
        by_year.setdefault(int(r["year"]), []).append(r)
    card_ids = sorted(r["id"] for r in est_rows)
    out = ['<div class="year-dossiers">']
    out.append('<p class="yd-intro">One card per ESTABLISHED ledger row, grouped by decade and year. '
               'Deep-linkable: every year heading is an anchor (<span class="mono">#y-YYYY</span>) that the '
               'Century Spine links into. This mirrors <span class="mono">claim_ledger.csv</span> exactly.</p>')
    for lo, hi in DECADES:
        years = sorted(y for y in by_year if lo <= y <= hi)
        if not years:
            continue
        ndec = sum(len(by_year[y]) for y in years)
        out.append('<details class="yd-decade"><summary>%d–%d <span class="yd-n">%d</span></summary>' % (lo, hi, ndec))
        for y in years:
            out.append('<h4 class="yd-year" id="y-%d">%d</h4>' % (y, y))
            for r in sorted(by_year[y], key=lambda x: x["id"]):
                out.append(
                    '<div class="yd-card" data-row="%s" id="card-%s">'
                    '<div class="yd-head"><span class="yd-id mono">%s</span>'
                    '<span class="yd-chip yd-est">ESTABLISHED</span>'
                    '<span class="yd-country">%s</span></div>'
                    '<p class="yd-claim">%s</p>'
                    '<div class="yd-meta mono">%s · %s · source: %s</div>'
                    '</div>' % (
                        _esc(r["id"]), _esc(r["id"]), _esc(r["id"]), _esc(r["country"]),
                        _esc(r.get("claim", r.get("claim_text", ""))),
                        _esc(r["category"]), _esc(r["event_type"]), _esc(r.get("source_class", "")),
                    ))
        out.append('</details>')
    out.append('</div>')
    return "\n".join(out), card_ids


# ============================================================
# I/O + injection
# ============================================================
# ============================================================
# DENSITY SILHOUETTE (spine momentum envelope) — 7-year centred rolling count.
# A 7-yr window smooths single-year spikes (a busy vs a quiet year) while
# preserving decade-scale structure across the 100-year axis; odd width keeps it
# centred. Counts ALL corpus rows (matching the blocks / the spine's raw-count
# portrait), NOT a weighting. verify_numbers.py recomputes these exactly.
# ============================================================
SILHOUETTE_WINDOW = 7


def _silhouette(draft_rows):
    half = SILHOUETTE_WINDOW // 2
    per_year = {c: {} for c in COUNTRIES}
    for r in draft_rows:
        if r["country"] in COUNTRIES:
            y = int(r["year"])
            per_year[r["country"]][y] = per_year[r["country"]].get(y, 0) + 1
    out = {c: [] for c in COUNTRIES}
    mx = 0
    for c in COUNTRIES:
        for y in range(YEAR_LO, YEAR_HI + 1):
            dens = sum(per_year[c].get(yy, 0) for yy in range(y - half, y + half + 1))
            out[c].append([y, dens])
            mx = max(mx, dens)
    return out, mx


# ============================================================
# FIGURE SPECS (data-figure) + instrument controls
# ============================================================
def _attr_json(obj):
    """HTML-escaped JSON for a single-quoted data-figure attribute (render_figures
    and the browser both decode the entities back to raw JSON)."""
    s = json.dumps(obj, ensure_ascii=False)
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;").replace("'", "&#39;"))


def build_momentum_spec(result):
    series = {}
    for d, dd in result["series"].items():
        series[d] = {"exclusion": dd.get("exclusion")}
        for c in COUNTRIES:
            s = dd[c]
            series[d][c] = {"primary": s["primary"], "sensitivity_min": s["sensitivity_min"],
                            "sensitivity_max": s["sensitivity_max"]}
    return {
        "type": "momentum", "version": 1,
        "decades": result["meta"]["decades"], "series": series,
        "counts": result["counts"], "weights": _load_weights_public(), "categories": CATEGORIES,
        "geometry": {"padT": MOM_PADT, "plotH": MOM_PLOTH, "y0": MOM_Y0},
        "stage": "#ffffff", "caption": result["caption"],
    }


def build_spine_spec(result, draft_rows):
    rows = [{"id": r["id"], "y": int(r["year"]), "c": r["country"], "cat": r["category"],
             "et": r["event_type"], "st": r["status"], "pr": r.get("year_precision", "")}
            for r in draft_rows if r["country"] in COUNTRIES]
    sil, mx = result["_silhouette"], result["_silhouette_max"]
    return {
        "type": "spine", "version": 1, "rows": rows,
        "silhouette": sil, "silhouette_max": mx, "window": SILHOUETTE_WINDOW,
        "stage": "#ffffff", "caption": result["spine_caption"],
    }


def build_weigh_controls():
    sliders = "".join(
        '<label class="wy-row"><span class="wy-cat" style="color:%s">%s</span>'
        '<input type="range" class="wy-slider" data-cat="%s" min="0.5" max="2" step="0.1" value="1" '
        'aria-label="weight for %s"/><output class="wy-val" data-cat="%s">1.0</output></label>'
        % (CATEGORY_COLORS[c], CATEGORY_SHORT[c], c, CATEGORY_SHORT[c], c) for c in CATEGORIES)
    presets = "".join('<button type="button" class="wy-preset" data-preset="%s">%s</button>' % (k, k)
                      for k in ("W0", "W1", "W2", "W3"))
    return ('<div class="wy-controls">'
            '<div class="wy-head"><b>Weigh it yourself</b> — <span class="wy-sub">constructed index — '
            'adjust the rubric yourself</span></div>'
            '<div class="wy-presets">Presets: ' + presets + '</div>'
            '<div class="wy-sliders">' + sliders + '</div></div>')


def load_all():
    with open(WEIGHTS, encoding="utf-8") as fh:
        weights = json.load(fh)
    return _read_csv(LEDGER), _read_csv(DRAFT), weights


def _inject(path, start, end, block):
    with open(path, encoding="utf-8") as fh:
        src = fh.read()
    i, j = src.find(start), src.find(end)
    if i < 0 or j < 0:
        raise SystemExit("compute_index: markers %s/%s not found in %s" % (start, end, os.path.relpath(path, ROOT)))
    new = src[:i] + start + "\n" + block + "\n" + end + src[j + len(end):]
    if new != src:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(new)
        return True
    return False


def _living_figure(cls, spec, inner=""):
    # data-figure carries the DATA; render_figures bakes the JS-off poster (via the
    # registered emitter in figures/dossierviz.js) + the figcaption (from spec.caption).
    return "<figure class=\"%s\" data-figure='%s'>%s</figure>" % (cls, _attr_json(spec), inner)


def _load_weights_public():
    with open(WEIGHTS, encoding="utf-8") as fh:
        w = json.load(fh)
    return {"category_weightings": w["category_weightings"],
            "event_weightings": w["event_weightings"], "labels": w.get("labels", {})}


if __name__ == "__main__":
    led, draft, weights = load_all()
    result = compute(led, draft, weights)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    changed = []
    if _inject(SOURCE, "<!--chart:start-->", "<!--chart:end-->",
               _living_figure("living-figure chart momentum-fig", result["momentum_spec"], build_weigh_controls())):
        changed.append("momentum")
    if _inject(SOURCE, "<!--spine:start-->", "<!--spine:end-->",
               _living_figure("living-figure chart spine-fig", result["spine_spec"])):
        changed.append("spine")
    if _inject(DOSSIER_SOURCE, "<!--dossiers:start-->", "<!--dossiers:end-->", result["dossiers_html"]):
        changed.append("dossiers")
    print("compute_index: wrote %s; injected: %s" %
          (os.path.relpath(OUT, ROOT), ", ".join(changed) if changed else "nothing new"))
