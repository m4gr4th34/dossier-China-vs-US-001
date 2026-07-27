/*
 * score.js — the momentum-index scoring math, ported ONCE from
 * scoring/compute_index.py (_raw + _shares). Used verbatim by BOTH:
 *   - the "Weigh it yourself" instrument on the front door (loaded as a <script src>), and
 *   - scoring/score_agreement.test.js, which asserts these JS scores equal the
 *     Python-side scores (index_output.json series[*].by_weighting) on every
 *     published weighting W0-W3.
 * round4 is round-half-up to match Python's _round (floor(x*1e4+0.5)/1e4) exactly,
 * so the two sides agree bit-for-bit — no tolerance games.
 * Dual export: CommonJS (node test) + window.DossierScore (browser).
 */
;(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DossierScore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  function round4(x) { return Math.round(x * 1e4) / 1e4; }

  function rawScore(counts, weights) {
    var s = 0;
    for (var k in counts) {
      if (Object.prototype.hasOwnProperty.call(counts, k)) {
        var w = (weights && weights[k] != null) ? weights[k] : 1;
        s += counts[k] * w;
      }
    }
    return s;
  }

  // counts: { decade: { US:{by_category,by_event}, China:{by_category,by_event} } }
  // weights: a weight map; isEvent picks by_event (keyed by event_type) vs by_category.
  // Returns { decade: { US: share, China: share } } — within-decade share (N0).
  function computeShares(counts, weights, isEvent) {
    var field = isEvent ? 'by_event' : 'by_category';
    var out = {};
    for (var d in counts) {
      if (!Object.prototype.hasOwnProperty.call(counts, d)) continue;
      var ru = rawScore(counts[d].US[field], weights);
      var rc = rawScore(counts[d].China[field], weights);
      var t = ru + rc;
      out[d] = { US: t ? round4(ru / t) : 0, China: t ? round4(rc / t) : 0 };
    }
    return out;
  }

  return { round4: round4, rawScore: rawScore, computeShares: computeShares };
});
