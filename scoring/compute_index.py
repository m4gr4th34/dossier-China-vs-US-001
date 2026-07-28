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
CONTEXT = os.path.join(ROOT, "data", "context_series.csv")
MILEX_CONTEXT = os.path.join(ROOT, "data", "context_series", "milex_sipri.csv")
GDP_SHARE = os.path.join(ROOT, "data", "power_series", "gdp_share.csv")
MFG_SHARE = os.path.join(ROOT, "data", "power_series", "manufacturing_share.csv")
TRADE_SHARE = os.path.join(ROOT, "data", "power_series", "trade_share.csv")
STEM_TALENT = os.path.join(ROOT, "data", "power_series", "stem_talent.csv")
LIVING_DIR = os.path.join(ROOT, "data", "living_series")
REGIME_BAND = os.path.join(ROOT, "data", "founder_series", "regime_band.csv")
REGIME_TICKS = os.path.join(ROOT, "data", "founder_series", "regime_ticks.csv")
VC_SERIES = os.path.join(ROOT, "data", "founder_series", "vc_investment.csv")
UNICORNS = os.path.join(ROOT, "data", "founder_series", "unicorns.csv")
IPO_SERIES = os.path.join(ROOT, "data", "founder_series", "ipo_proceeds.csv")
STATE_CAPITAL_CN = os.path.join(ROOT, "data", "context_series", "state_capital_cn.csv")
STATE_CAPITAL_TICKS = os.path.join(ROOT, "data", "context_series", "state_capital_ticks.csv")
VEL_DEPLOY = os.path.join(ROOT, "data", "velocity_series", "deploy_ev.csv")
VEL_ITERATE = os.path.join(ROOT, "data", "velocity_series", "iterate.csv")
VEL_TIMESCALE = os.path.join(ROOT, "data", "velocity_series", "timescale.csv")
VEL_CUTTHROAT = os.path.join(ROOT, "data", "velocity_series", "cutthroat.csv")
OUT = os.path.join(HERE, "index_output.json")
SOURCE = os.path.join(ROOT, "editions", "index.source.html")
DOSSIER_SOURCE = os.path.join(ROOT, "editions", "dossier.source.html")

COUNTRIES = ("US", "China")
YEAR_LO, YEAR_HI = 1926, 2026
# The final bucket is EXTENDED to 2026, the corpus endpoint (the dossier's stated
# span is 1926-2026); left at its natural 2025 the endpoint year would have no
# decade home (no year-dossier anchor, no momentum bar) — as the 2026 Kimi K3 row
# exposed. Only the last bucket is widened; all others stay exactly ten years.
DECADES = [(y, y + 9) for y in range(1926, 2016 + 1, 10)]
DECADES[-1] = (DECADES[-1][0], 2026)
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
    result["spine_spec"] = build_spine_spec(result, draft_rows, est)
    result["natsec_spec"] = build_natsec_spec(draft_rows)
    result["dimensions_spec"] = build_dimensions_spec()
    result["living_spec"] = build_living_spec()
    result["founder_spec"] = build_founder_spec(draft_rows)
    result["capital_spec"] = build_capital_spec()
    result["velocity_spec"] = build_velocity_spec()
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
    return ("TOP (spine) = the curated canon, FLAT BY CONSTRUCTION: the selection rule "
            "(notes/selection_criteria.md) targets ~5-15 rows per country per decade, so no decade can "
            "dwarf another - the flatness is a property of the RULE, not the world. BOTTOM (strip) = what "
            "the century's MEASURED innovation volume actually did (R&D expenditure). The contrast is the "
            "finding. --- Spine detail: one block per corpus row at its anchor year, US up / China down "
            "(1926-2026); %d rows (US %d, China %d), of which %d ESTABLISHED (solid), %d OPEN-UNVERIFIED "
            "(outlined) and %d REPORTED (hatched); colour = category. Amendment-4 trajectory rows sit at "
            "their span-start with a forward tick. Click a year for its cards; each block also links to its "
            "year dossier (dossier.html#y-YYYY). The shaded envelope is a %d-year centred rolling count per "
            "country (a presentation smoothing choice, no weights); the ribbon is the US-minus-China net. "
            "--- Strip: GERD (R&D spend), PPP $B, LOG scale (OECD MSTI / NSF NCSES) - chosen over patent "
            "counts, which Chinese filing subsidies distort (~1 in 10 CNIPA filings 'irregular'); the PPP "
            "base year shifts the exact US-China crossover." % (n, us, cn, est, opn, rep, SILHOUETTE_WINDOW))


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
# The natsec set (~27 rows) is ~10x sparser than the full corpus (~290), so a 7-yr
# window would render as isolated spikes; widen to 15 yr to expose the era-shape
# (the Cold-War capability cluster vs the recent one). Stated on the figure.
NATSEC_WINDOW = 15


def _rolling_silhouette(draft_rows, window, pred):
    """Mirrored rolling-count density per country over [YEAR_LO, YEAR_HI], counting
    only rows for which pred(r) is true, with a centred window of `window` years."""
    half = window // 2
    per_year = {c: {} for c in COUNTRIES}
    for r in draft_rows:
        if r["country"] in COUNTRIES and pred(r):
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


def _silhouette(draft_rows):
    return _rolling_silhouette(draft_rows, SILHOUETTE_WINDOW, lambda r: True)


def _silhouette_natsec(draft_rows):
    return _rolling_silhouette(draft_rows, NATSEC_WINDOW, lambda r: r.get("natsec") == "true")


def _silhouette_founding(draft_rows):
    # founding rows (45) are sparse like the natsec set, so reuse the wider 15-yr window
    return _rolling_silhouette(draft_rows, NATSEC_WINDOW, lambda r: r.get("event_type") == "founding")


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


def build_strip():
    """Volume context strip: independently-maintained R&D-expenditure series (least
    exposed to the Chinese patent-count subsidy dispute). Read verbatim from
    data/context_series.csv; verify_numbers.py checks the spec against the CSV."""
    rows = _read_csv(CONTEXT)
    return {
        "years": [int(r["year"]) for r in rows],
        "us": [float(r["us_gerd_ppp_bn"]) for r in rows],
        "cn": [float(r["cn_gerd_ppp_bn"]) for r in rows],
        "measure": "R&D expenditure (GERD), PPP $B",
        "source": "OECD MSTI / NSF NCSES",
        "log": True,
        "note": "Patent COUNTS (incl. PCT) are distorted by Chinese filing subsidies "
                "(CNIPA flagged ~1 in 10 filings 'irregular'); R&D spend is used instead as "
                "the series least exposed. GERD PPP base-year shifts the exact crossover.",
    }


def build_year_cards(est_rows):
    """Per-year ESTABLISHED cards for the in-figure panel. verify_numbers.py checks
    this reconciles with the ledger exactly."""
    out = {}
    for r in sorted(est_rows, key=lambda x: (int(x["year"]), x["id"])):
        out.setdefault(str(int(r["year"])), []).append({
            "id": r["id"], "c": r["country"], "cat": r["category"],
            "et": r["event_type"], "src": r.get("source_class", ""),
            "claim": r.get("claim", r.get("claim_text", "")),
        })
    return out


def build_spine_spec(result, draft_rows, est_rows):
    rows = [{"id": r["id"], "y": int(r["year"]), "c": r["country"], "cat": r["category"],
             "et": r["event_type"], "st": r["status"], "pr": r.get("year_precision", "")}
            for r in draft_rows if r["country"] in COUNTRIES]
    sil, mx = result["_silhouette"], result["_silhouette_max"]
    return {
        "type": "spine", "version": 1, "rows": rows,
        "silhouette": sil, "silhouette_max": mx, "window": SILHOUETTE_WINDOW,
        "strip": build_strip(), "year_cards": build_year_cards(est_rows),
        "stage": "#ffffff", "caption": result["spine_caption"],
    }


def build_natsec_caption(n, npure, ndual, us, cn, window):
    return ("Figure III - the national-security ledger. FIRST, plainly: this is NOT a military-"
            "balance or capability assessment and settles nothing about who is stronger or ahead. "
            "--- TOP = notable defense-capability ARRIVALS under the published, country-blind tagging "
            "rule (notes/selection_criteria.md Amendment 5): %d natsec-tagged achievements (%d pure "
            "defense, %d dual-use - defense-origin but civilian-transformative like GPS, ARPANET and "
            "the first satellites, drawn with an amber ring; US %d / China %d), behind them a mirrored "
            "%d-year rolling-count density envelope (wider than the main spine's 7-year window because "
            "this set is ~10x sparser). REPORTED rows are hatched and their interested party is named "
            "in the year dossier - defense is exactly where interested-party sourcing (BOTH PLA media "
            "and US defense assessments) concentrates; the 2021 hypersonic-test row is REPORTED for "
            "that reason. --- BOTTOM = what measured MILITARY EXPENDITURE did: SIPRI, constant 2023 "
            "US$, LOG scale, 1990-2024. China's line is a SIPRI ESTIMATE (higher than its official "
            "budget; SIPRI calls the R&D component 'educated guesswork') - the US spent roughly 3x "
            "China across the recent decade. Click a year for its cards." % (
            n, npure, ndual, us, cn, window))


def build_milex_strip():
    """Military-expenditure context strip: SIPRI constant-2023 US$ series, read verbatim
    from data/context_series/milex_sipri.csv; verify_numbers.py checks the spec against it.
    China's line is a SIPRI ESTIMATE - stated on the figure."""
    rows = _read_csv(MILEX_CONTEXT)
    return {
        "years": [int(r["year"]) for r in rows],
        "us": [float(r["us_milex_const2023_usd_bn"]) for r in rows],
        "cn": [float(r["cn_milex_const2023_usd_bn"]) for r in rows],
        "measure": "Military expenditure, constant 2023 US$B",
        "source": "SIPRI Military Expenditure Database",
        "log": True,
        "note": "China's line is a SIPRI ESTIMATE (higher than the official budget; SIPRI says "
                "some elements - 'most importantly R&D spending' - 'can at present only be the "
                "subject of educated guesswork'). Conflicting 2024 figures: official ~$231B, SIPRI "
                "~$318B, IISS ~$325B. The US spent roughly 3x China across the recent decade.",
    }


def _pct_series(path, label, source, caveat, note):
    rows = _read_csv(path)
    return {"years": [int(r["year"]) for r in rows], "us": [float(r["us_pct"]) for r in rows],
            "cn": [float(r["cn_pct"]) for r in rows], "label": label, "unit": "% of world",
            "log": False, "source": source, "caveat": caveat, "note": note}


def build_dimensions_caption(dims):
    names = ", ".join(d["label"].split(" (")[0].lower() for d in dims)
    return ("Figure IV - dimensions of power: %d independent MEASURED series (%s), each a thin "
            "US-above / China-below strip on the shared 1926-2026 axis, each on ITS OWN scale "
            "(share of world, or US$B on a log axis - stated per strip; end values labelled). "
            "--- DELIBERATELY NO AGGREGATE 'power index' line: the dimensions disagree (the US "
            "leads on GDP, the R&D frontier and finance; China on manufacturing value-added and "
            "merchandise-trade volume; military spending is a ~3x US lead), and collapsing them "
            "into one number would hide that disagreement behind a weighting choice - the same "
            "trap the momentum index is quarantined for. The weighting is left to you. "
            "--- Chinese-data caveats per series: PPP-conversion (GDP), current-US$/domestic-vs-"
            "gross value-added (manufacturing), processing-trade & re-exports (trade), SIPRI "
            "estimate (military). Sources: Maddison, SIPRI, World Bank, OECD/NSF, WTO." % (
            len(dims), names))


def build_talent_strip():
    """Figure IV sixth dimension — STEM talent production. S&E first-university-degree
    output per year, US vs China (millions), plus the US foreign-born-graduate
    dependence as an on-strip annotation. Definitional caveats on the Chinese count
    stated on-strip. Full rubric: notes/power_series_selection.md."""
    rows = _read_csv(STEM_TALENT)
    return {
        "years": [int(r["year"]) for r in rows],
        "us": [float(r["us_millions"]) for r in rows],
        "cn": [float(r["cn_millions"]) for r in rows],
        "label": "STEM degree output (S&E first degrees)", "unit": "millions/yr", "log": False,
        "source": "NSF SEIND 2024 / NSB-2023-32 HED-29 (international-body, OECD basis)",
        "caveat": "China = 4-yr benke only (sub-degree zhuanke excluded); NSF folds CS into engineering",
        "annot": "US advanced STEM is import-dependent: international students are 72% of CS / 74% of EE "
                 "graduate enrolment (NFAP/NSF 2019) and 39% of S&E doctorates awarded (NSF SED 2022).",
    }


def _living_strip(fname, label, unit, log, fmtkind, source, caveat, marks=None, annot=None):
    rows = _read_csv(os.path.join(LIVING_DIR, fname))
    d = {"years": [int(r["year"]) for r in rows], "us": [float(r["us"]) for r in rows],
         "cn": [float(r["cn"]) for r in rows], "label": label, "unit": unit, "log": log,
         "fmtkind": fmtkind, "source": source, "caveat": caveat}
    if marks:
        d["marks"] = marks
    if annot:
        d["annot"] = annot
    return d


def build_living_spec():
    """Figure VI — A century of living standards. Context-class human-development
    outcomes, US vs China, small-multiples per Figure IV's pattern. Every Chinese
    value before ~1980 is estimate-class (reconstruction), flagged per strip. Full
    rubric: notes/living_series_selection.md."""
    dims = [
        _living_strip("life_expectancy.csv", "Life expectancy at birth", "years", False, "yr",
                      "UN WPP 2024 (international-body); pre-1950 = academic reconstruction",
                      "China pre-1980 estimate-class (census back-projection); US 2022 UN 76.4 vs CDC 77.5",
                      marks=[{"year": 1960, "up": False, "label": "1959-61 famine · excess deaths ~15M (official) vs ~30-45M (reconstructions)", "dy": 13, "lx": -8, "anchor": "start"},
                             {"year": 2021, "up": True, "label": "2015-23 US decline (opioids + COVID, CDC)", "dy": -5, "lx": 5, "anchor": "end"}]),
        _living_strip("gdp_per_capita.csv", "GDP per capita (PPP, real)", "int$ (2011)", True, "$cap",
                      "Maddison Project Database 2023 (independent-academic)",
                      "China pre-1980 estimate-class (most-contested Maddison back-cast); level gap ~3x"),
        _living_strip("infant_mortality.csv", "Infant mortality", "per 1,000 births", True, "per1k",
                      "UN IGME (international-body)",
                      "China pre-1980 estimate-class; China (4.8) fell BELOW the US (5.5) by 2022"),
        _living_strip("schooling.csv", "Mean years of schooling (25+)", "years", False, "yr",
                      "Barro-Lee / Lee-Lee via OWID (independent-academic)",
                      "China pre-1980 estimate-class; gap ~7yr (1950) to ~4.3yr (2020), not closed"),
        _living_strip("urbanization.csv", "Urbanization", "% urban", False, "pct",
                      "UN World Urbanization Prospects (international-body)",
                      "China 11% (1950) to 66% (2022); clean paired endpoints (interior mid-century omitted)"),
    ]
    return {"type": "living", "version": 1, "dims": dims,
            "title": "A century of living standards — what the systems delivered · US above / China below · own scale per strip",
            "aria": "Figure VI, A century of living standards: five human-development series (life expectancy, GDP per capita, infant mortality, schooling, urbanization) as thin US-above / China-below strips on the shared 1926-2026 axis, each on its own scale. Convergence is real and large, but the income level gap remains; every Chinese value before ~1980 is estimate-class.",
            "stage": "#ffffff", "caption": build_living_caption()}


def build_living_caption():
    return ("Figure VI - a century of living standards (context-class; no corpus rows). Five "
            "human-development outcomes, US above / China below, each on its own scale. "
            "--- THE CONVERGENCE IS REAL AND LARGE: China closed a gap that in 1950 was "
            "civilizational - life expectancy 43.8 to ~78 years, infant mortality ~195 to ~5 per "
            "1,000, mean schooling ~1.8 to ~9 years, urbanization ~11%% to ~66%% - and on two health "
            "measures China has now edged PAST the US (life expectancy since ~2021; infant mortality "
            "below the US by 2022, ~4.8 vs ~5.5). "
            "--- BUT IT IS NOT A RISE POSTER: the income LEVEL gap remains large - US real GDP per "
            "capita is ~3x China's on the Maddison basis drawn here (~4x on current-price PPP), "
            "schooling still trails ~4 years, and the US shows a genuine reversal, not merely China "
            "catching up. "
            "--- TWO DATED DIPS, the same no-silent-dips rule both ways: China's 1959-61 Great Leap "
            "famine (life-expectancy trough 33.4 in 1960; excess deaths carried as a range with both "
            "classes named - ~15M official vs ~30-45M demographic reconstructions - adjudicating "
            "neither), and the US 2015-2023 decline (opioid epidemic + COVID-19, CDC-documented; "
            "life expectancy ~78.8 to 76.4 by 2021, partial recovery to 77.5 in 2022). "
            "--- Every Chinese value before ~1980 is ESTIMATE-CLASS (reconstruction, not measurement), "
            "flagged per strip. Sources: UN WPP / IGME / WUP, Maddison, Barro-Lee. Selection: "
            "notes/living_series_selection.md.")


def build_dimensions_spec():
    milex = build_milex_strip()
    gerd = build_strip()
    dims = [
        _pct_series(GDP_SHARE, "GDP (share of world, PPP)", "Maddison Project 2023 (indep-academic)",
                    "PPP: China pre-2005 = estimate",
                    "China's pre-2005 PPP is an estimate; IMF gives a lower early-China share (5.9% vs 2.1% in 1980)."),
        {"years": milex["years"], "us": milex["us"], "cn": milex["cn"],
         "label": "Military spending (const 2023 US$B)", "unit": "US$B", "log": True,
         "source": "SIPRI (international-body)", "caveat": "China = SIPRI estimate",
         "note": "China is a SIPRI ESTIMATE, higher than its official budget."},
        _pct_series(MFG_SHARE, "Manufacturing (value-added share of world)", "World Bank WDI (international-body)",
                    "gross ≠ domestic value-added",
                    "Current-US$ share; China's DOMESTIC value-added is lower than gross (imported components in exports)."),
        {"years": gerd["years"], "us": gerd["us"], "cn": gerd["cn"],
         "label": "R&D (GERD, PPP $B)", "unit": "$B", "log": True,
         "source": "OECD MSTI / NSF NCSES (international-body)", "caveat": "R&D spend, not patents",
         "note": "Chosen over patent counts (subsidy-distorted)."},
        _pct_series(TRADE_SHARE, "Merchandise exports (share of world)", "World Bank / WTO (international-body)",
                    "gross exports (processing / re-exports)",
                    "Gross exports overstate China's domestic value-added (processing trade; HK re-exports)."),
        build_talent_strip(),
    ]
    return {"type": "dimensions", "version": 2, "dims": dims,
            "stage": "#ffffff", "caption": build_dimensions_caption(dims)}


def build_founder_caption(founds):
    us_n = sum(1 for f in founds if f["c"] == "US")
    cn_n = len(founds) - us_n
    return ("Figure Va - the Founder's Century, on one 1926-2026 axis (descriptive). "
            "--- REGIME BAND: whether a private founder could legally operate - the US open throughout "
            "(ticked 1946 first VC firm, 1971 NASDAQ, 1982 SBIR); China closed 1956-78 (private enterprise "
            "abolished), reopening 1978, open 1992-2020, and constrained since the 2020 tech crackdown (a "
            "band annotation, not a ledger row - a crackdown is not an achievement). "
            "--- FOUNDINGS: the %d company-founding rows from the verified ledger (event_type=founding, "
            "US %d / China %d; foundings, not patents or IP), US above / China below, over a 15-year "
            "rolling founding-density envelope; click any block for its cards. The capital system these "
            "founders operated in is Figure Vb. Sourcing: notes/regime_band_rationale.md." % (
            len(founds), us_n, cn_n))


def build_capital_caption(uni):
    return ("Figure Vb - the Capital System, three strips on one shared modern axis (~2014-2024). "
            "--- PRIVATE VC: annual venture-capital investment (PitchBook, log US$B) - China peaks $146B "
            "(2021) and collapses to $38B (2024, ~74%); the US falls ~41%. "
            "--- STATE-GUIDED CAPITAL (a drawn est. range, not a line): the China band's WIDTH is the gap "
            "between announced guidance-fund target (upper edge) and subscribed / committed capital "
            "(认缴, lower edge) - ~$1.4T / $585B in 2018 rising to ~$1.76T / $1.06T by 2024; subscribed is "
            "pledged, NOT paid-in cash and NOT deployed, so the true deployment gap is wider still. All "
            "figures trace to a single Chinese-origin vendor (Zero2IPO / 清科); the target line wobbles on "
            "scope (expired funds netted out), while new-fund formation fell ~25% in 2023 and ~37% "
            "underlying in 2024. China's Big Fund phases (through 2024) and the US SBIR / CHIPS comparators "
            "are discrete ticks - the US has no guidance-fund equivalent, so no US band is invented. "
            "--- IPO PROCEEDS: annual proceeds by venue (Renaissance / EY / KPMG, log US$B) - Chinese "
            "US-listings FROZE after DiDi (mid-2021), from ~$12.8B (2021) to ~$0.6B (2024), onshoring to "
            "the A-share market and Hong Kong. Private VC collapsed after 2021 while state-guided capital "
            "swelled; each band's width is measurement uncertainty, drawn not asserted. Sourcing: "
            "notes/founder_series_selection.md.")


def build_exits_strip():
    rows = _read_csv(IPO_SERIES)

    def _c(col):
        return [[int(r["year"]), float(r[col])] for r in rows]
    return {"us": _c("us_proceeds_usd_bn"), "onshore": _c("china_onshore_usd_bn"),
            "us_listed": _c("china_us_listed_usd_bn"), "unit": "US$B", "log": True,
            "source": "Renaissance Capital (US, ex-SPAC) / EY, KPMG, HKEX, Refinitiv (China by venue)"}


def build_state_capital():
    """State-guided-capital strip: a China band (announced target vs estimated paid-in,
    cumulative $B) drawn as a range because targets are not deployed capital, plus discrete
    ticks (China Big Fund phases; US SBIR/CHIPS comparators — no invented US band). Single
    Chinese-origin vendor (Zero2IPO/清科) flagged. Full rubric: notes/founder_series_selection.md."""
    band = _read_csv(STATE_CAPITAL_CN)
    ticks = _read_csv(STATE_CAPITAL_TICKS)
    return {
        "band": [[int(r["year"]), float(r["announced_usd_bn"]), float(r["subscribed_usd_bn"])] for r in band],
        "ticks": [{"label": r["label"], "year": int(r["year"]), "usd_bn": float(r["usd_bn"]),
                   "side": r["side"]} for r in ticks],
        "source": "Zero2IPO/清科 — single vendor, no independent count",
    }


# ============================================================
# FIGURE Vb — VELOCITY (four ways to be fast). OPEN-CAVEATED constructed
# comparison; underlying data real but selection/pairing/framing authorial.
# Contributes NO ledger rows. Full rubric: notes/velocity_selection.md.
# ============================================================
def build_velocity_spec():
    dep = _read_csv(VEL_DEPLOY)
    ite = _read_csv(VEL_ITERATE)
    tim = _read_csv(VEL_TIMESCALE)
    cut = _read_csv(VEL_CUTTHROAT)
    deploy = {"us": [[int(r["year"]), float(r["us_pct"])] for r in dep],
              "cn": [[int(r["year"]), float(r["cn_pct"])] for r in dep]}
    iterate = [{"metric": r["metric"], "label": r["label"], "us": float(r["us"]),
                "cn": float(r["cn"]), "unit": r["unit"], "leader": r["leader"]} for r in ite]
    timescale = [{"company": r["company"], "country": r["country"], "years": float(r["years"]),
                  "era": r["era"], "milestone": r["milestone"]} for r in tim]
    cutthroat = [[int(r["year"]), int(r["cn_ev_brands"]), r["kind"]] for r in cut]
    return {
        "type": "velocity", "version": 1,
        "headline": "China leads velocity in ATOMS; the US leads in BITS and at the FRONTIER",
        "deploy": deploy, "iterate": iterate, "timescale": timescale, "cutthroat": cutthroat,
        "stage": "#ffffff", "caption": build_velocity_caption(),
    }


def build_velocity_caption():
    return ("Figure Vc - Velocity: four ways to be fast (OPEN-CAVEATED - a constructed "
            "comparison; the underlying numbers are real and sourced, but the choice of four "
            "dimensions and the US-vs-China pairing are authorial; re-choose them and the "
            "picture shifts). The honest spine: CHINA leads velocity in ATOMS, the US in BITS "
            "and at the FRONTIER - not one direction. "
            "--- DEPLOYMENT: electric-car share of new-car sales (IEA), China ~6 to 45%% in four "
            "years vs the US ~2 to 10%% (falling in 2025); China also added ~277 GW of solar in "
            "2024 (US ~50) and runs ~48,000 km of high-speed rail (US ~0). But BITS invert: "
            "ChatGPT hit ~100M users in ~2 months and US AI-infrastructure capex (~$350B in "
            "2025) dwarfs China's AI-cloud market (~$7B). "
            "--- ITERATION CADENCE: Chinese new-model dev cycles run ~20 months vs ~40 for "
            "legacy makers (AlixPartners/McKinsey) - but the US SETS the AI frontier and "
            "Chinese open models trail it ~4-8 months (Epoch/AISI/NIST); ships-more-often is a "
            "different axis from sets-the-frontier. "
            "--- TIME-TO-SCALE: exemplar dots, NOT a line - no honest paired median exists. "
            "China's 2010s cohort scaled fast (Xiaomi ~1.5yr, DiDi ~2yr), but SHEIN took ~11yr "
            "and the US 2023-25 AI cohort is now fastest (xAI ~$24B in ~14 months). "
            "--- CUTTHROAT: ~487 Chinese EV makers (2018) to ~129 (2025) to ~15 viable by 2030 "
            "(AlixPartners), only 3 profitable; the US concentrates early instead (Uber+Lyft "
            "~99%%, Google ~90%%). The same selection forged BYD/CATL/DJI AND is now called "
            "'involution' - a ~$69B EV price-war revenue wipe, 35 months of negative PPI, a "
            "state 'anti-involution' campaign. Full rubric + sources: notes/velocity_selection.md.")


def build_founder_spec(draft_rows):
    """Figure Va — The Founder's Century: regime band + founding blocks + density
    envelope ONLY, on the single 1926-2026 century axis."""
    band = [{"c": r["country"], "start": int(r["start"]), "end": int(r["end"]), "state": r["state"],
             "anchor": r.get("anchor_row", ""), "label": r.get("label", "")} for r in _read_csv(REGIME_BAND)]
    ticks = [{"c": r["country"], "y": int(r["year"]), "label": r["label"],
              "anchor": r.get("anchor_row", "")} for r in _read_csv(REGIME_TICKS)]
    founds = [{"id": r["id"], "y": int(r["year"]), "c": r["country"], "cat": r["category"], "st": r["status"]}
              for r in draft_rows if r.get("event_type") == "founding" and r["country"] in COUNTRIES]
    founds.sort(key=lambda x: (x["y"], x["id"]))
    sil, mx = _silhouette_founding(draft_rows)
    return {"type": "founder", "version": 2, "band": band, "ticks": ticks, "founds": founds,
            "silhouette": sil, "silhouette_max": mx, "window": NATSEC_WINDOW, "count": len(founds),
            "stage": "#ffffff", "caption": build_founder_caption(founds)}


def build_capital_spec():
    """Figure Vb — The Capital System: private VC + state-guided capital band + IPO
    proceeds + unicorn note, all on ONE shared modern axis (~2014-2024)."""
    vcrows = _read_csv(VC_SERIES)

    def _col(rows, c):
        out = []
        for r in rows:
            v = (r.get(c) or "").strip()
            if v:
                out.append([int(r["year"]), float(v)])
        return out
    vc = {"us": _col(vcrows, "us_vc_usd_bn"), "cn": _col(vcrows, "cn_vc_usd_bn"),
          "unit": "US$B", "log": True,
          "source": "PitchBook-NVCA (US) / KPMG Venture Pulse-PitchBook (China)"}
    uni = [{"source": r["source"], "as_of": r["as_of"], "us": int(r["us"]), "cn": int(r["cn"]),
            "class": r["source_class"]} for r in _read_csv(UNICORNS)]
    return {"type": "capital", "version": 1,
            "vc": vc, "exits": build_exits_strip(), "state_capital": build_state_capital(),
            "unicorns": uni, "stage": "#ffffff", "caption": build_capital_caption(uni)}


def build_natsec_spec(draft_rows):
    ns = [r for r in draft_rows if r.get("natsec") == "true" and r["country"] in COUNTRIES]
    rows = [{"id": r["id"], "y": int(r["year"]), "c": r["country"], "cat": r["category"],
             "et": r["event_type"], "st": r["status"], "pr": r.get("year_precision", ""),
             "du": r.get("dual_use") == "true"}
            for r in ns]
    ndual = sum(1 for x in rows if x["du"])
    npure = len(rows) - ndual
    us = sum(1 for x in rows if x["c"] == "US")
    cn = sum(1 for x in rows if x["c"] == "China")
    sil, mx = _silhouette_natsec(draft_rows)
    return {
        "type": "natsec", "version": 1, "rows": rows,
        "count": len(rows), "dual_count": ndual, "pure_count": npure,
        "silhouette": sil, "silhouette_max": mx, "window": NATSEC_WINDOW,
        "strip": build_milex_strip(),
        "stage": "#ffffff", "caption": build_natsec_caption(len(rows), npure, ndual, us, cn, NATSEC_WINDOW),
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
               _living_figure("living-figure chart wide momentum-fig", result["momentum_spec"], build_weigh_controls())):
        changed.append("momentum")
    if _inject(SOURCE, "<!--spine:start-->", "<!--spine:end-->",
               _living_figure("living-figure chart wide spine-fig", result["spine_spec"])):
        changed.append("spine")
    if _inject(SOURCE, "<!--natsec:start-->", "<!--natsec:end-->",
               _living_figure("living-figure chart wide natsec-fig", result["natsec_spec"])):
        changed.append("natsec")
    if _inject(SOURCE, "<!--dimensions:start-->", "<!--dimensions:end-->",
               _living_figure("living-figure chart wide dimensions-fig", result["dimensions_spec"])):
        changed.append("dimensions")
    if _inject(SOURCE, "<!--living:start-->", "<!--living:end-->",
               _living_figure("living-figure chart wide living-fig", result["living_spec"])):
        changed.append("living")
    if _inject(SOURCE, "<!--founder:start-->", "<!--founder:end-->",
               _living_figure("living-figure chart wide founder-fig", result["founder_spec"])):
        changed.append("founder")
    if _inject(SOURCE, "<!--capital:start-->", "<!--capital:end-->",
               _living_figure("living-figure chart wide capital-fig", result["capital_spec"])):
        changed.append("capital")
    if _inject(SOURCE, "<!--velocity:start-->", "<!--velocity:end-->",
               _living_figure("living-figure chart wide velocity-fig", result["velocity_spec"])):
        changed.append("velocity")
    if _inject(DOSSIER_SOURCE, "<!--dossiers:start-->", "<!--dossiers:end-->", result["dossiers_html"]):
        changed.append("dossiers")
    print("compute_index: wrote %s; injected: %s" %
          (os.path.relpath(OUT, ROOT), ", ".join(changed) if changed else "nothing new"))
