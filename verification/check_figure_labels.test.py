#!/usr/bin/env python3
"""Test wrapper: runs the label-discipline gate over the baked posters in index.html
and reports PASS/FAIL to the run_tests.js aggregator. The real logic (approx text
bboxes, overlap + past-viewBox detection) lives in check_figure_labels.py."""
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
r = subprocess.run([sys.executable, os.path.join(HERE, "check_figure_labels.py")],
                   capture_output=True, text=True)
n_fail = r.stdout.count("FAIL")
if r.returncode == 0:
    print("PASS  figure label-discipline: all baked posters clean (no overlaps, nothing past a viewBox)")
    sys.exit(0)
# surface the specific violations the gate found
for line in r.stdout.splitlines():
    if line.startswith("FAIL") or line.strip().startswith(("OVERLAP", "OUT-OF-VIEWBOX")):
        print("FAIL  label-discipline: " + line.strip())
print("SUMMARY: %d figure(s) with label-discipline violations" % max(n_fail, 1))
sys.exit(1)
