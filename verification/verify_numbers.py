#!/usr/bin/env python3
"""
verify_numbers.py — Open Dossier survey-consistency verifier (template stub).

This is the Python mirror of the consistency console in index.html. A survey's
verification weight sits mostly in the citation audit (dossier.html); this
script runs the same cross-avenue CONSISTENCY checks the browser console runs,
so CI and the live page always agree.

INSTRUCTIONS FOR AUTHORS:
Keep the AVENUES list below in lockstep with the AVENUES array in index.html
(same name / status / forecast / signpost shape), then add your survey's real
cross-avenue and arithmetic checks alongside the built-in consistency checks.

The contract (unchanged):
  - computed value must fall within [claimed_lo, claimed_hi]
  - if it doesn't, this script exits nonzero — CI goes red — fix the PAPER
  - never widen the tolerance to make a failing check pass
  - label is the exact check as it reads on the page

Run locally:  python verification/verify_numbers.py
CI runs this: on every push (see .github/workflows/verify.yml)
"""

import json
import os
import sys

PASS, FAIL = "PASS", "FAIL"
results = []


def check(label, computed, claimed_lo, claimed_hi, fmt="{:.4g}"):
    ok = claimed_lo <= computed <= claimed_hi
    status = PASS if ok else FAIL
    results.append((status, label, computed, (claimed_lo, claimed_hi)))
    symbol = "✓" if ok else "✗"
    print(f"[{status}] {symbol} {label}")
    print(f"       computed={fmt.format(computed)}  "
          f"claimed=[{fmt.format(claimed_lo)}, {fmt.format(claimed_hi)}]")
    return ok


# ----------------------------------------------------------------
# AVENUES + CHECK RULES — single-sourced from the canonical avenues.json
# at the repo root, the SAME file index.html's console reads. The avenue
# DATA and the check RULES both live there, so neither can drift between
# the page and this verifier.
# ----------------------------------------------------------------
HERE = os.path.dirname(os.path.abspath(__file__))
AVENUES_PATH = os.path.join(HERE, os.pardir, "avenues.json")
# Optional: --avenues <path> overrides the data file (used by the back-catalog baker to
# verify a frozen chapter against its OWN sealed avenues.json). No flag => live-root default.
for i, a in enumerate(sys.argv):
    if a == "--avenues" and i + 1 < len(sys.argv):
        AVENUES_PATH = os.path.abspath(sys.argv[i + 1])
        break
with open(AVENUES_PATH, encoding="utf-8") as f:
    _data = json.load(f)
AVENUES = _data.get("avenues", [])
RULES = _data.get("checks", {})

# Pull the rules once. Defaults are deliberately strict so a malformed
# avenues.json fails loudly rather than silently skipping a check.
MIN_AVENUES        = RULES.get("min_avenues", 1)
SIGNPOST_REQUIRED  = RULES.get("forecast_signpost_required", True)
PCT_MIN            = RULES.get("forecast_pct_min", 0)
PCT_MAX            = RULES.get("forecast_pct_max", 100)

print("=" * 72)
print("SURVEY CONSISTENCY — same checks, same rules as the index.html console")
print("=" * 72)

forecasts     = [a for a in AVENUES if a.get("status") == "FORECAST"]
with_signpost = sum(1 for a in forecasts if a.get("signpost"))
out_of_range  = sum(1 for a in AVENUES
                    if a.get("forecast") is not None
                    and (a.get("forecast") < PCT_MIN or a.get("forecast") > PCT_MAX))

# (1) At least one avenue in the landscape.
check("Consistency: at least one avenue in the landscape", len(AVENUES), MIN_AVENUES, 9999)
# (2) Mandatory-signpost rule: every FORECAST carries a dated signpost
#     (only enforced when the rule is on; expected count flips with the rule).
_expected_signposted = len(forecasts) if SIGNPOST_REQUIRED else with_signpost
check("Consistency: every FORECAST has a dated signpost", with_signpost, _expected_signposted, _expected_signposted)
# (3) All forecast probabilities lie in [PCT_MIN, PCT_MAX].
check(f"Consistency: all forecast probabilities lie in [{PCT_MIN},{PCT_MAX}]", out_of_range, 0, 0)

# TODO: add your survey's real cross-avenue / arithmetic checks here,
# mirroring whatever you add to buildChecks() in index.html. Same rule:
# never widen a tolerance to make a failing check pass — fix the paper.

# ================================================================
# LEDGER STRUCTURAL CHECKS (verification ritual — notes/verification_ritual.md).
# Read the achievement corpus (data/achievements_draft.csv) and the formal
# ESTABLISHED ledger (claim_ledger.csv) and enforce:
#   (S1) every draft row carries a valid status label
#   (S2) every ESTABLISHED ledger row meets the promotion source standard
#   (S3) the draft's ESTABLISHED set reconciles exactly with the ledger set
# Same contract as above: computed = number of violations, must be 0. A failure
# means fix the ledger/corpus, never the check.
# ================================================================
import csv as _csv

_ROOT = os.path.join(HERE, os.pardir)
_DRAFT = os.path.join(_ROOT, "data", "achievements_draft.csv")
_LEDGER = os.path.join(_ROOT, "claim_ledger.csv")
_VALID_STATUS = {"OPEN-UNVERIFIED", "ESTABLISHED", "REPORTED"}
_QUALIFYING_SINGLE = {"official-national", "international-body", "independent-academic"}
_TWO_SOURCE_OK = {"journalistic", "encyclopedic"}


def _read_csv(path):
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as fh:
        return list(_csv.DictReader(fh))


def _meets_source_standard(row):
    """ESTABLISHED needs one official/international/academic source, OR two
    independent journalistic/encyclopedic sources."""
    src = (row.get("sources") or "").strip()
    if not src:
        return False
    classes = [c.strip() for c in (row.get("source_class") or "").split("|") if c.strip()]
    if any(c in _QUALIFYING_SINGLE for c in classes):
        return True
    n_sources = len([s for s in src.replace(";", "|").split("|") if s.strip()])
    return len(classes) >= 2 and all(c in _TWO_SOURCE_OK for c in classes) and n_sources >= 2


_draft_rows = _read_csv(_DRAFT)
_ledger_rows = _read_csv(_LEDGER)

# (S1) every draft row has a valid status label.
_bad_status = [r.get("id") for r in _draft_rows if r.get("status") not in _VALID_STATUS]
check("Ledger S1: every draft row has a valid status", len(_bad_status), 0, 0)

# (S2) every ledger row is ESTABLISHED and meets the source standard.
_bad_ledger = [r.get("id") for r in _ledger_rows
               if r.get("status") != "ESTABLISHED" or not _meets_source_standard(r)]
check("Ledger S2: every ESTABLISHED ledger row meets the source standard",
      len(_bad_ledger), 0, 0)

# (S3) draft ESTABLISHED set == ledger set (counts and ids reconcile).
_draft_est = {r.get("id") for r in _draft_rows if r.get("status") == "ESTABLISHED"}
_ledger_ids = {r.get("id") for r in _ledger_rows}
check("Ledger S3: draft ESTABLISHED set reconciles with ledger set",
      len(_draft_est ^ _ledger_ids), 0, 0)

# (Census) live corpus counts, held in lockstep with the front-door prose,
# the avenue theses in avenues.json, and the baked console verdict. The label
# CARRIES the numbers, so any change to a count must be made here AND in the
# manuscript in the same commit (the CLAUDE.md lockstep rule) or CI goes red.
_EXPECTED_CENSUS = (268, 1, 1)   # (ESTABLISHED, OPEN-UNVERIFIED, REPORTED)
_est_n = sum(1 for r in _ledger_rows if r.get("status") == "ESTABLISHED")
_open_n = sum(1 for r in _draft_rows if r.get("status") == "OPEN-UNVERIFIED")
_rep_n = sum(1 for r in _draft_rows if r.get("status") == "REPORTED")
check("Census: 268 ESTABLISHED / 1 OPEN-UNVERIFIED / 1 REPORTED (live corpus counts)",
      0 if (_est_n, _open_n, _rep_n) == _EXPECTED_CENSUS else 1, 0, 0)

# ================================================================
# MOMENTUM-INDEX CHECKS (OPEN-CAVEATED scoring layer; RUBRIC v1).
# The scoring layer is a real computation over the ESTABLISHED ledger, so it is
# held to the same lockstep discipline as every other number: recompute it from
# the ledger and assert the committed scoring/index_output.json is EXACTLY what
# the code produces; assert every excluded (non-ESTABLISHED) row is NAMED in the
# caption; assert each sensitivity band contains its primary score; and assert
# the generated caption + SVG appear verbatim in the baked front door (index.html),
# so the chart can never drift from the data. Fix the paper, never the tolerance.
# ================================================================
sys.path.insert(0, os.path.join(_ROOT, "scoring"))
import compute_index as _ci  # noqa: E402

_INDEX_JSON = os.path.join(_ROOT, "scoring", "index_output.json")
_led_rows, _draft_rows2, _weights = _ci.load_all()
_recomputed = _ci.compute(_led_rows, _draft_rows2, _weights)
with open(_INDEX_JSON, encoding="utf-8") as _fh:
    _committed = json.load(_fh)

# (I1) recompute from the ledger == the committed index_output.json, exactly.
check("Index I1: scoring/index_output.json matches a fresh recompute from the ledger",
      0 if _recomputed == _committed else 1, 0, 0)

# (I2) every excluded (non-ESTABLISHED) row is named in the caption.
_cap = _committed.get("caption", "")
_unnamed = [e["id"] for e in _committed.get("excluded_rows", []) if e["id"] not in _cap]
check("Index I2: every excluded (non-ESTABLISHED) row is named in the chart caption",
      len(_unnamed), 0, 0)

# (I3) each per-decade per-country sensitivity band contains the primary score.
_band_bad = 0
for _d, _dd in _committed.get("series", {}).items():
    for _c in ("US", "China"):
        _s = _dd[_c]
        if not (_s["sensitivity_min"] <= _s["primary"] <= _s["sensitivity_max"]):
            _band_bad += 1
check("Index I3: every sensitivity band contains its primary score",
      _band_bad, 0, 0)

# (I4) the generated caption + SVG appear verbatim in the baked front door.
with open(os.path.join(_ROOT, "index.html"), encoding="utf-8") as _fh:
    _index_html = _fh.read()
_drift = (0 if _committed.get("caption") in _index_html else 1) \
       + (0 if _committed.get("svg") in _index_html else 1)
check("Index I4: index_output.json caption + SVG are present verbatim in index.html",
      _drift, 0, 0)

# ================================================================
# PRESENTATION-LAYER CHECKS (Century Spine, Year Dossiers, instrument).
# The spine draws one block per CORPUS row (all statuses); the year dossiers hold
# one card per ESTABLISHED ledger row. Same lockstep discipline: counts reconcile
# with the data, every deep link resolves, and the generated bytes are present
# verbatim in the baked editions so the page can never drift from the ledger.
# ================================================================
import re as _re

with open(os.path.join(_ROOT, "dossier.html"), encoding="utf-8") as _fh:
    _dossier_html = _fh.read()

# (I5) spine block counts per year per country == the corpus (draft), recomputed here.
_spine_recount = {}
for _r in _draft_rows2:
    if _r.get("country") in ("US", "China"):
        _spine_recount.setdefault(_r["year"], {"US": 0, "China": 0})
        _spine_recount[_r["year"]][_r["country"]] += 1
check("Index I5: Century Spine block counts per year per country == the corpus",
      0 if _committed.get("spine_counts") == _spine_recount else 1, 0, 0)

# (I6) every spine block href (#y-YYYY) resolves to a year anchor in dossier.html.
_spine_years = set(_re.findall(r'dossier\.html#y-(\d+)', _committed.get("spine_svg", "")))
_anchor_years = set(_re.findall(r'id="y-(\d+)"', _dossier_html))
check("Index I6: every spine block href resolves to a year anchor in dossier.html",
      len(_spine_years - _anchor_years), 0, 0)

# (I7) spine SVG present verbatim in the baked front door.
check("Index I7: Century Spine SVG present verbatim in index.html",
      0 if _committed.get("spine_svg", "___") in _index_html else 1, 0, 0)

# (I8) year-dossier cards reconcile EXACTLY (count + ids) with the ESTABLISHED ledger.
_ledger_est_ids = {r.get("id") for r in _ledger_rows if r.get("status") == "ESTABLISHED"}
_card_ids = _committed.get("dossier_card_ids", [])
check("Index I8: year-dossier cards reconcile exactly with the ESTABLISHED ledger",
      len(set(_card_ids) ^ _ledger_est_ids) + (0 if len(_card_ids) == len(_ledger_est_ids) else 1), 0, 0)

# (I9) year dossiers present verbatim in the baked dossier edition.
check("Index I9: year dossiers present verbatim in dossier.html",
      0 if _committed.get("dossiers_html", "___") in _dossier_html else 1, 0, 0)

# (I10) the instrument (with its embedded counts) present verbatim in index.html.
check("Index I10: Weigh-it-yourself figure present verbatim in index.html",
      0 if _committed.get("weigh_figure", "___") in _index_html else 1, 0, 0)

# ----------------------------------------------------------------
print()
n_fail = sum(1 for r in results if r[0] == FAIL)
n_pass = sum(1 for r in results if r[0] == PASS)
print("=" * 72)
print(f"TOTAL: {len(results)} checks · {n_pass} pass · {n_fail} fail")
if n_fail:
    print("FAILURES FOUND — fix the paper, not the tolerances.")
else:
    print("All checks pass — the survey is internally consistent.")
print("=" * 72)
sys.exit(1 if n_fail else 0)
