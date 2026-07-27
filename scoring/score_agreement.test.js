#!/usr/bin/env node
'use strict';
/*
 * score_agreement.test.js — asserts the JS scoring (scoring/score.js, used by the
 * "Weigh it yourself" instrument) equals the Python scoring on every published
 * weighting. The Python side is scoring/index_output.json series[*].by_weighting
 * (itself gated by verify_numbers.py Index I1: recompute == json). So this closes
 * the loop: page JS == score.js == Python == the ledger.
 *
 * round4 is round-half-up on both sides, so agreement is exact (tol only guards
 * float representation). Discovered + run by run_tests.js (npm test); stdlib-only.
 */
const path = require('path');
const score = require('./score.js');
const out = require('./index_output.json');
const weights = require('./weights.json');

const counts = out.counts;
const catW = weights.category_weightings;
const evtW = weights.event_weightings;
let fails = 0;

['W0', 'W1', 'W2', 'W3'].forEach(function (Wk) {
  const isEvent = !!evtW[Wk];
  const wmap = isEvent ? evtW[Wk] : catW[Wk];
  const js = score.computeShares(counts, wmap, isEvent);
  out.meta.decades.forEach(function (d) {
    ['US', 'China'].forEach(function (c) {
      const py = out.series[d][c].by_weighting[Wk];
      const j = js[d][c];
      if (Math.abs(py - j) > 1e-9) {
        fails++;
        console.error('MISMATCH ' + Wk + ' ' + d + ' ' + c + ': python=' + py + ' js=' + j);
      }
    });
  });
});

if (fails) {
  console.error('score_agreement: FAIL — ' + fails + ' JS/Python score mismatch(es).');
  process.exit(1);
}
console.log('score_agreement: PASS — JS and Python scores agree on W0–W3 across all decades.');
process.exit(0);
