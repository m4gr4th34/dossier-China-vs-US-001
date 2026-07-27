#!/usr/bin/env python3
"""
compute_index.py — the momentum-scoring layer (OPEN-CAVEATED).

Turns the verified achievement ledger into a per-decade, per-country COMPARATIVE
index. It is a real computation over real (ESTABLISHED) data, but the *rubric*
(which categories/event-types count how much, how decades are normalized) is an
authorial construction — so the whole layer, and every number it emits, is
OPEN-CAVEATED. See notes/scoring_rubric_DESIGN.md (RUBRIC v1).

Reads:  claim_ledger.csv (ESTABLISHED rows -> the score) + data/achievements_draft.csv
        (to identify the excluded non-ESTABLISHED rows named in the caption) +
        scoring/weights.json (the published weight tables).
Emits:  scoring/index_output.json  (per-decade per-country: primary score, exclusion
        bounds, sensitivity min/max, contributing row ids) + a generated caption and
        a generated static SVG chart.
Also (as __main__): injects the generated <figure> into editions/index.source.html
        between the <!--chart:start--> / <!--chart:end--> markers, byte-faithfully,
        so the front-door chart cannot drift from the data.

Deterministic. No hand-entered numbers. Gate (RUBRIC v1, Option C): all decades
score on ESTABLISHED rows only; non-ESTABLISHED rows are excluded from the primary
series and NAMED in the caption with the exclusion's direction of bias.
"""
import csv
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, os.pardir)
LEDGER = os.path.join(ROOT, "claim_ledger.csv")
DRAFT = os.path.join(ROOT, "data", "achievements_draft.csv")
WEIGHTS = os.path.join(HERE, "weights.json")
OUT = os.path.join(HERE, "index_output.json")
SOURCE = os.path.join(ROOT, "editions", "index.source.html")

COUNTRIES = ("US", "China")
# 1926-anchored decades (the dossier window opens in 1926). Ten 10-year bins;
# 2026 has no rows and opens no new bin, so the last scored decade is 2016-2025.
DECADES = [(y, y + 9) for y in range(1926, 2016 + 1, 10)]


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
    return round(float(x), 4)


def _weight_of(row, weighting, is_event):
    key = row["event_type"] if is_event else row["category"]
    return float(weighting.get(key, 1.0))


def _raw(rows, weighting, is_event):
    """{decade_label: {country: summed weight}} over the given rows."""
    out = {decade_label(lo, hi): {c: 0.0 for c in COUNTRIES} for lo, hi in DECADES}
    for r in rows:
        d = decade_of(int(r["year"]))
        if d is None or r["country"] not in COUNTRIES:
            continue
        out[d][r["country"]] += _weight_of(r, weighting, is_event)
    return out


def _shares(raw):
    """Within-decade share (N0): score(c,D) / sum over both countries. 0 if the
    decade is empty."""
    out = {}
    for d, cc in raw.items():
        total = cc["US"] + cc["China"]
        out[d] = {c: (_round(cc[c] / total) if total else 0.0) for c in COUNTRIES}
    return out


def compute(ledger_rows, draft_rows, weights):
    """The single source of every number. Deterministic dict; the verifier calls
    this and asserts equality with the committed index_output.json."""
    est = [r for r in ledger_rows if r.get("status") == "ESTABLISHED"]
    excluded_rows = [r for r in draft_rows if r.get("status") != "ESTABLISHED"]

    cat_w = weights["category_weightings"]
    evt_w = weights["event_weightings"]
    # order matters for determinism / for the sensitivity min/max set
    weighting_keys = ["W0", "W1", "W2", "W3"]

    def shares_for(key):
        if key in cat_w:
            return _shares(_raw(est, cat_w[key], is_event=False))
        return _shares(_raw(est, evt_w[key], is_event=True))

    shares_by_w = {k: shares_for(k) for k in weighting_keys}
    primary = shares_by_w["W0"]  # primary = baseline W0 + within-decade share N0

    # --- exclusion bounds: for each decade holding excluded rows, W0-share WITH the
    #     excluded rows counted (weighted like any row) vs WITHOUT (the primary). ---
    excl_by_decade = {}
    for r in excluded_rows:
        d = decade_of(int(r["year"]))
        if d:
            excl_by_decade.setdefault(d, []).append(r)
    exclusion = {}
    for d, rows in excl_by_decade.items():
        with_rows = est + rows  # count the excluded rows at their W0 category weight
        with_share = _shares(_raw(with_rows, cat_w["W0"], is_event=False))[d]
        gainers = sorted({r["country"] for r in rows})
        # bias direction: excluding these rows lowers the gaining country's share
        bias = "understates " + (" and ".join(gainers))
        exclusion[d] = {
            "without": primary[d],
            "with": with_share,
            "excluded_ids": sorted(r["id"] for r in rows),
            "bias": bias,
        }

    # --- assemble per-decade per-country series ---
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
                "primary": primary[d][c],
                "sensitivity_min": _round(min(vals)),
                "sensitivity_max": _round(max(vals)),
                "by_weighting": {k: shares_by_w[k][d][c] for k in weighting_keys},
                "contributing_ids": sorted(est_ids.get((d, c), [])),
            }
        series[d]["exclusion"] = exclusion.get(d)

    # --- findings: decades where China's sensitivity band straddles 0.5, i.e.
    #     defensible weightings disagree on who leads (equivalently the two bands
    #     overlap, since shares sum to 1). These are findings, not embarrassments. ---
    disagreement = []
    for lo, hi in DECADES:
        d = decade_label(lo, hi)
        cmin = series[d]["China"]["sensitivity_min"]
        cmax = series[d]["China"]["sensitivity_max"]
        if cmin < 0.5 < cmax:
            disagreement.append(d)

    excluded_summary = [
        {"id": r["id"], "country": r["country"], "status": r["status"],
         "decade": decade_of(int(r["year"]))}
        for r in sorted(excluded_rows, key=lambda x: x["id"])
    ]

    result = {
        "meta": {
            "status": "OPEN-CAVEATED",
            "rubric": "RUBRIC v1 (notes/scoring_rubric_DESIGN.md)",
            "weights_version": weights.get("version"),
            "primary_weighting": "W0",
            "normalization": "N0 within-decade share",
            "gate": "Option C: all decades scored on ESTABLISHED rows only; non-ESTABLISHED rows excluded and named.",
            "decades": [decade_label(lo, hi) for lo, hi in DECADES],
            "weighting_labels": weights.get("labels", {}),
        },
        "excluded_rows": excluded_summary,
        "disagreement_decades": disagreement,
        "series": series,
    }
    result["caption"] = build_caption(result)
    result["svg"] = build_svg(result)
    return result


def build_caption(result):
    ex = result["excluded_rows"]
    ex_txt = "; ".join("%s (%s, %s)" % (e["id"], e["status"], e["decade"]) for e in ex)
    # direction of bias from the single affected decade(s)
    bias_bits = []
    for d, s in result["series"].items():
        if s.get("exclusion"):
            bias_bits.append("%s in %s" % (s["exclusion"]["bias"], d))
    bias_txt = "; ".join(sorted(set(bias_bits)))
    dis = result["disagreement_decades"]
    dis_txt = (", ".join(dis) if dis else "none")
    return (
        "Constructed momentum index (OPEN-CAVEATED) - NOT a measured fact. Primary series: "
        "baseline equal weighting W0, within-decade share N0, ESTABLISHED rows only. "
        "EXCLUDED and not scored: " + ex_txt + " - " + bias_txt +
        " (the whiskers on that decade show the corrected range if those rows were established). "
        "Coloured bands span all four published weightings W0-W3; where a country's band crosses "
        "the halfway line, defensible weightings disagree on who leads that decade - those decades "
        "(" + dis_txt + ") are findings, not results. The final 2016-2025 bar is the last full "
        "decade; the 2026 window is not yet closed. Re-weight it yourself: the rubric is published "
        "and versioned in notes/scoring_rubric_DESIGN.md and scoring/weights.json."
    )


def build_svg(result):
    """Deterministic grouped-bar SVG: primary bars, sensitivity bands (min-max),
    and exclusion whiskers on the affected decade. All geometry derives from the
    rounded shares in `result` - no hand-entered coordinates that could drift."""
    decades = result["meta"]["decades"]
    W, H = 900, 380
    padL, padR, padT, padB = 48, 16, 34, 54
    plotW = W - padL - padR
    plotH = H - padT - padB
    n = len(decades)
    group_w = plotW / n
    bar_w = group_w * 0.30
    gap = group_w * 0.06
    y0 = padT + plotH  # baseline (share 0)

    def yf(share):
        return padT + plotH * (1.0 - share)

    COL = {"US": "#2b6cb0", "China": "#c53030"}
    BAND = {"US": "#93c5ec", "China": "#eaa0a0"}
    parts = []
    parts.append('<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" '
                 'role="img" aria-label="Constructed momentum index: per-decade within-decade share, US vs China, with sensitivity bands and 1946-1955 exclusion whiskers.">' % (W, H))
    parts.append('<style>.ax{stroke:#9aa5b1;stroke-width:1}.gl{stroke:#e2e8f0;stroke-width:1}'
                 '.lbl{font:11px sans-serif;fill:#4a5568}.tk{font:10px sans-serif;fill:#718096}'
                 '.ti{font:13px sans-serif;fill:#2d3748}</style>')
    parts.append('<text class="ti" x="%d" y="16">Momentum index (OPEN-CAVEATED): within-decade share of ESTABLISHED achievements</text>' % padL)
    # gridlines + y ticks at 0, .5, 1 (0.5 = the leadership line)
    for gy in (0.0, 0.5, 1.0):
        yy = yf(gy)
        parts.append('<line class="%s" x1="%d" y1="%.1f" x2="%d" y2="%.1f"/>' %
                     ("ax" if gy == 0.5 else "gl", padL, yy, W - padR, yy))
        parts.append('<text class="tk" x="%d" y="%.1f" text-anchor="end">%d%%</text>' %
                     (padL - 4, yy + 3, int(gy * 100)))
    # bars
    for i, d in enumerate(decades):
        gx = padL + i * group_w
        cx_center = gx + group_w / 2.0
        parts.append('<text class="tk" x="%.1f" y="%d" text-anchor="middle">%s</text>' %
                     (cx_center, H - padB + 16, d.replace("-", "–")))
        offs = {"US": -(bar_w + gap) / 2.0, "China": (bar_w + gap) / 2.0}
        for c in COUNTRIES:
            s = result["series"][d][c]
            bx = cx_center + offs[c] - bar_w / 2.0
            # sensitivity band (min..max) behind the bar
            ytop_band = yf(s["sensitivity_max"])
            ybot_band = yf(s["sensitivity_min"])
            if s["sensitivity_max"] > s["sensitivity_min"]:
                parts.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s" opacity="0.85"/>' %
                             (bx, ytop_band, bar_w, max(0.0, ybot_band - ytop_band), BAND[c]))
            # primary bar
            yp = yf(s["primary"])
            parts.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' %
                         (bx, yp, bar_w, max(0.0, y0 - yp), COL[c]))
            # exclusion whisker (if this decade/country is affected and the "with" differs)
            exc = result["series"][d].get("exclusion")
            if exc and exc["with"][c] != exc["without"][c]:
                y_with = yf(exc["with"][c])
                y_wo = yf(exc["without"][c])
                wx = bx + bar_w / 2.0
                parts.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#1a202c" stroke-width="1.3"/>' %
                             (wx, min(y_with, y_wo), wx, max(y_with, y_wo)))
                for yy in (y_with, y_wo):
                    parts.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#1a202c" stroke-width="1.3"/>' %
                                 (wx - 3, yy, wx + 3, yy))
    # legend
    lx = padL
    ly = H - 6
    parts.append('<rect x="%d" y="%d" width="10" height="10" fill="%s"/><text class="lbl" x="%d" y="%d">US</text>' % (lx, ly - 9, COL["US"], lx + 14, ly))
    parts.append('<rect x="%d" y="%d" width="10" height="10" fill="%s"/><text class="lbl" x="%d" y="%d">China</text>' % (lx + 60, ly - 9, COL["China"], lx + 74, ly))
    parts.append('<text class="lbl" x="%d" y="%d">band = W0-W3 sensitivity; whisker = 1946-1955 exclusion; 50%% line = leadership</text>' % (lx + 140, ly))
    parts.append('</svg>')
    return "".join(parts)


def build_figure_block(result):
    """The exact <figure> to inline in the source (between the chart markers)."""
    return ('<figure class="chart">\n' + result["svg"] +
            '\n<figcaption class="lf-caption">' + result["caption"] + '</figcaption>\n</figure>')


def load_all():
    with open(WEIGHTS, encoding="utf-8") as fh:
        weights = json.load(fh)
    return _read_csv(LEDGER), _read_csv(DRAFT), weights


def _inject_figure(result):
    with open(SOURCE, encoding="utf-8") as fh:
        src = fh.read()
    start, end = "<!--chart:start-->", "<!--chart:end-->"
    i, j = src.find(start), src.find(end)
    if i < 0 or j < 0:
        raise SystemExit("compute_index: chart markers not found in editions/index.source.html")
    block = start + "\n" + build_figure_block(result) + "\n" + end
    new = src[:i] + block + src[j + len(end):]
    if new != src:
        with open(SOURCE, "w", encoding="utf-8") as fh:
            fh.write(new)
        return True
    return False


if __name__ == "__main__":
    led, draft, weights = load_all()
    result = compute(led, draft, weights)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    injected = _inject_figure(result)
    print("compute_index: wrote %s (%d decades)%s" %
          (os.path.relpath(OUT, ROOT), len(result["meta"]["decades"]),
           "; injected figure into source" if injected else "; figure already current"))
