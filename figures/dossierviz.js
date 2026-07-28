/*
 * dossierviz.js — the dossier's two data figures as living figures, adopting the
 * figures/ runtime so they get the DOCUMENTED expand affordance (the .lf-expand
 * trigger + near-viewport #lf-lightbox) instead of an ad-hoc lightbox.
 *
 * Two types, each with a poster emitter (JS-OFF floor, baked by render_figures) and
 * a live renderer (the lightbox re-mounts it large). ONE draw function per type,
 * shared by both paths, so the floor can never drift from the ceiling:
 *   - "momentum": the OPEN-CAVEATED per-decade index (bars + W0-W3 bands + 1946-1955
 *     exclusion whiskers). The primary rects carry data-decade/data-country/class=pbar
 *     so the on-page "Weigh it yourself" instrument re-scores them live.
 *   - "spine":    the Century Spine — one block per corpus row, US up / China down,
 *     colour=category, texture=label, PLUS a rolling-window density silhouette
 *     (mirrored filled areas behind the blocks) + a net-difference centreline ribbon.
 *
 * All numbers come from the spec (data-figure), which compute_index.py fills from the
 * verified ledger and verify_numbers.py checks. NO domain math here beyond drawing;
 * the silhouette VALUES are computed in Python and drawn here. Node-safe (poster
 * paths touch no DOM); browser attaches renderers. Pure string builders => deterministic.
 */
(function (root) {
  "use strict";
  var DF = root && root.DossierFigures;
  if (!DF) {
    if (root && root.console) root.console.error("[dossierviz] figures.js runtime not found — load figures.js first");
    return;
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  var COUNTRIES = ["US", "China"];

  // ---- shared scoring (mirror of score.js / compute_index _raw+_shares) ----
  function round4(x) { return Math.round(x * 1e4) / 1e4; }

  // =====================================================================
  // MOMENTUM
  // =====================================================================
  // geometry constants — MUST match compute_index MOM_* and the instrument.
  var M = { W: 900, H: 380, padL: 48, padR: 16, padT: 34, padB: 54 };
  M.plotW = M.W - M.padL - M.padR; M.plotH = M.H - M.padT - M.padB; M.y0 = M.padT + M.plotH;
  var MCOL = { US: "#2b6cb0", China: "#c53030" }, MBAND = { US: "#93c5ec", China: "#eaa0a0" };
  function myf(s) { return M.padT + M.plotH * (1 - s); }

  function momentumSvgString(spec) {
    var decades = spec.decades, series = spec.series;
    var n = decades.length, gw = M.plotW / n, bw = gw * 0.30, gap = gw * 0.06;
    var p = ['<svg viewBox="0 0 ' + M.W + ' ' + M.H + '" width="100%" class="lf-svg" role="img" aria-label="Constructed momentum index: per-decade within-decade share, US vs China, with sensitivity bands and 1946-1955 exclusion whiskers.">'];
    p.push('<style>.ax{stroke:#9aa5b1;stroke-width:1}.gl{stroke:#e2e8f0;stroke-width:1}.lbl{font:11px sans-serif;fill:#4a5568}.tk{font:10px sans-serif;fill:#718096}.ti{font:13px sans-serif;fill:#2d3748}</style>');
    p.push('<text class="ti lf-scale-with-art" x="' + M.padL + '" y="16">Momentum index (OPEN-CAVEATED): within-decade share of ESTABLISHED achievements</text>');
    [0, 0.5, 1].forEach(function (gy) {
      var yy = myf(gy);
      p.push('<line class="' + (gy === 0.5 ? "ax" : "gl") + '" x1="' + M.padL + '" y1="' + yy.toFixed(1) + '" x2="' + (M.W - M.padR) + '" y2="' + yy.toFixed(1) + '"/>');
      p.push('<text class="tk lf-scale-with-art" x="' + (M.padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">' + (gy * 100) + '%</text>');
    });
    decades.forEach(function (d, i) {
      var cxc = M.padL + i * gw + gw / 2;
      p.push('<text class="tk lf-scale-with-art" x="' + cxc.toFixed(1) + '" y="' + (M.H - M.padB + 16) + '" text-anchor="middle">' + d.replace("-", "–") + '</text>');
      var offs = { US: -(bw + gap) / 2, China: (bw + gap) / 2 };
      COUNTRIES.forEach(function (c) {
        var s = series[d][c], bx = cxc + offs[c] - bw / 2;
        var yt = myf(s.sensitivity_max), yb = myf(s.sensitivity_min);
        if (s.sensitivity_max > s.sensitivity_min)
          p.push('<rect x="' + bx.toFixed(1) + '" y="' + yt.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(0, yb - yt).toFixed(1) + '" fill="' + MBAND[c] + '" opacity="0.85"/>');
        var yp = myf(s.primary);
        p.push('<rect class="pbar" data-decade="' + d + '" data-country="' + c + '" x="' + bx.toFixed(1) + '" y="' + yp.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(0, M.y0 - yp).toFixed(1) + '" fill="' + MCOL[c] + '"/>');
        var exc = series[d].exclusion;
        if (exc && exc["with"][c] !== exc["without"][c]) {
          var yw = myf(exc["with"][c]), ywo = myf(exc["without"][c]), wx = bx + bw / 2;
          p.push('<line x1="' + wx.toFixed(1) + '" y1="' + Math.min(yw, ywo).toFixed(1) + '" x2="' + wx.toFixed(1) + '" y2="' + Math.max(yw, ywo).toFixed(1) + '" stroke="#1a202c" stroke-width="1.3"/>');
          [yw, ywo].forEach(function (yy) { p.push('<line x1="' + (wx - 3).toFixed(1) + '" y1="' + yy.toFixed(1) + '" x2="' + (wx + 3).toFixed(1) + '" y2="' + yy.toFixed(1) + '" stroke="#1a202c" stroke-width="1.3"/>'); });
        }
      });
    });
    var lx = M.padL, ly = M.H - 6;
    p.push('<rect x="' + lx + '" y="' + (ly - 9) + '" width="10" height="10" fill="' + MCOL.US + '"/><text class="lbl lf-scale-with-art" x="' + (lx + 14) + '" y="' + ly + '">US</text>');
    p.push('<rect x="' + (lx + 60) + '" y="' + (ly - 9) + '" width="10" height="10" fill="' + MCOL.China + '"/><text class="lbl lf-scale-with-art" x="' + (lx + 74) + '" y="' + ly + '">China</text>');
    p.push('<text class="lbl lf-scale-with-art" x="' + (lx + 140) + '" y="' + ly + '">band = W0-W3 sensitivity; whisker = 1946-1955 exclusion; 50% line = leadership</text>');
    p.push('</svg>');
    return p.join("");
  }

  // =====================================================================
  // SPINE
  // =====================================================================
  var CATEGORY_COLORS = {
    innovation: "#2b6cb0", science: "#6b46c1", infrastructure: "#2f855a",
    industrial: "#c05621", social: "#b83280", governmental_economic: "#4a5568"
  };
  var CATEGORY_SHORT = {
    innovation: "innovation", science: "science", infrastructure: "infrastructure",
    industrial: "industrial", social: "social", governmental_economic: "gov/econ"
  };
  var CATS = ["innovation", "science", "infrastructure", "industrial", "social", "governmental_economic"];
  var S = { W: 1120, H: 476, padL: 44, padR: 14, YLO: 1926, YHI: 2026 };
  S.cy = 150; S.spineBot = 290; S.plotW = S.W - S.padL - S.padR;
  function sxf(y) { return S.padL + (y - S.YLO) / (S.YHI - S.YLO) * S.plotW; }

  function spineSvgString(spec) {
    var rows = spec.rows.slice().sort(function (a, b) {
      return (a.y - b.y) || ((a.c === "US" ? 0 : 1) - (b.c === "US" ? 0 : 1)) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    });
    var bh = 5, gap = 1.2, bw = 6.5, sil = spec.silhouette, win = spec.window, maxDens = spec.silhouette_max || 1;
    var p = ['<svg viewBox="0 0 ' + S.W + ' ' + S.H + '" width="100%" class="lf-svg" role="img" aria-label="The Century Spine: one block per corpus achievement 1926-2026, US above the centreline and China below, coloured by category and textured by verification label, with a ' + win + '-year rolling density silhouette.">'];
    p.push('<defs><pattern id="rep-hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="4" stroke="#ffffff" stroke-width="1.4" opacity="0.9"/></pattern></defs>');
    p.push('<style>.ax{stroke:#9aa5b1;stroke-width:1}.tk{font:9px sans-serif;fill:#718096}.ti{font:13px sans-serif;fill:#2d3748}.cl{font:10px sans-serif;fill:#4a5568}</style>');
    p.push('<text class="ti lf-scale-with-art" x="' + S.padL + '" y="15">The Century Spine — one block per achievement, US above / China below (' + win + '-yr density silhouette)</text>');
    // --- density silhouette (behind blocks): mirrored filled areas, scaled to a shared max ---
    var silH = (S.cy - 26);   // px available above the centreline for the fullest density
    function silPath(pts, up) {
      // pts: [[year, density], ...]; build a filled area from the centreline
      var d = "M" + sxf(pts[0][0]).toFixed(1) + "," + S.cy.toFixed(1);
      pts.forEach(function (pt) {
        var yy = up ? (S.cy - pt[1] / maxDens * silH) : (S.cy + pt[1] / maxDens * silH);
        d += " L" + sxf(pt[0]).toFixed(1) + "," + yy.toFixed(1);
      });
      d += " L" + sxf(pts[pts.length - 1][0]).toFixed(1) + "," + S.cy.toFixed(1) + " Z";
      return d;
    }
    p.push('<path d="' + silPath(sil.US, true) + '" fill="#2b6cb0" opacity="0.13"/>');
    p.push('<path d="' + silPath(sil.China, false) + '" fill="#c53030" opacity="0.13"/>');
    // net-difference ribbon along the centreline (thin): US minus China density
    var net = "M" + sxf(sil.US[0][0]).toFixed(1) + "," + S.cy.toFixed(1);
    for (var q = 0; q < sil.US.length; q++) {
      var diff = (sil.US[q][1] - sil.China[q][1]) / maxDens;   // -1..1
      net += " L" + sxf(sil.US[q][0]).toFixed(1) + "," + (S.cy - diff * 12).toFixed(1);
    }
    p.push('<path d="' + net + '" fill="none" stroke="#4a5568" stroke-width="1" opacity="0.45"/>');
    // centreline + decade ticks (spine region only; the volume strip sits below)
    p.push('<line class="ax" x1="' + S.padL + '" y1="' + S.cy + '" x2="' + (S.W - S.padR) + '" y2="' + S.cy + '"/>');
    for (var yr = 1930; yr <= 2026; yr += 10) {
      var xx = sxf(yr);
      p.push('<line x1="' + xx.toFixed(1) + '" y1="24" x2="' + xx.toFixed(1) + '" y2="' + S.spineBot + '" stroke="#e2e8f0"/>');
      p.push('<text class="tk lf-scale-with-art" x="' + xx.toFixed(1) + '" y="' + (S.spineBot + 12) + '" text-anchor="middle">' + yr + '</text>');
    }
    p.push('<text class="tk lf-scale-with-art" x="' + S.padL + '" y="30">US ↑</text>');
    p.push('<text class="tk lf-scale-with-art" x="' + S.padL + '" y="' + (S.cy + 130) + '">China ↓</text>');
    // --- blocks on top (each block is a deep link AND a year-panel trigger) ---
    var stack = {};
    rows.forEach(function (r) {
      var col = CATEGORY_COLORS[r.cat] || "#888";
      var key = r.y + "|" + r.c, k = stack[key] || 0; stack[key] = k + 1;
      var x = sxf(r.y) - bw / 2, y;
      if (r.c === "US") y = S.cy - (k + 1) * bh - k * gap - 1; else y = S.cy + k * (bh + gap) + 1;
      var rect;
      if (r.st === "ESTABLISHED") rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="' + col + '"/>';
      else if (r.st === "REPORTED") rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="' + col + '"/><rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="url(#rep-hatch)"/>';
      else rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="none" stroke="' + col + '" stroke-width="1.1"/>';
      var tick = r.pr === "range" ? '<line x1="' + (x + bw).toFixed(1) + '" y1="' + (y + bh / 2).toFixed(1) + '" x2="' + (x + bw + 5).toFixed(1) + '" y2="' + (y + bh / 2).toFixed(1) + '" stroke="' + col + '" stroke-width="0.8" opacity="0.8"/>' : "";
      var title = esc(r.id + " " + r.y + " " + r.cat + "/" + r.et + " [" + r.st + "]");
      p.push('<a href="dossier.html#y-' + r.y + '" class="lf-year" data-year="' + r.y + '" data-card="' + esc(r.id) + '"><title>' + title + '</title>' + rect + tick + '</a>');
    });
    // legend (own row, clear of the decade labels above and the strip below)
    var lx = S.padL, ly = S.spineBot + 30;
    CATS.forEach(function (cat, i) {
      var cxx = lx + i * 118;
      p.push('<rect x="' + cxx.toFixed(1) + '" y="' + (ly - 8) + '" width="9" height="9" fill="' + CATEGORY_COLORS[cat] + '"/><text class="cl lf-scale-with-art" x="' + (cxx + 12).toFixed(1) + '" y="' + ly + '">' + CATEGORY_SHORT[cat] + '</text>');
    });
    p.push('<text class="cl lf-scale-with-art" x="' + lx + '" y="' + (ly + 14) + '">solid = ESTABLISHED · outlined = OPEN · hatched = REPORTED · tick = trajectory · shaded = ' + win + '-yr rolling density · line = net · click a year for its cards</text>');
    // --- volume context strip: measured R&D volume, log scale (the contrast to the flat canon) ---
    var strip = spec.strip;
    if (strip && strip.years && strip.years.length) {
      var yrs = strip.years, us = strip.us, cn = strip.cn, n = yrs.length;
      var sSep = ly + 33, sTitle = sSep + 15, sTop = sSep + 30, sBot = sSep + 92;   // separator / title / plot band
      var allv = us.concat(cn), minV = Math.min.apply(null, allv), maxV = Math.max.apply(null, allv);
      var lo = Math.log10(minV * 0.8), hi = Math.log10(maxV * 1.15);
      function slx(y) { return S.padL + (y - yrs[0]) / (yrs[n - 1] - yrs[0]) * (S.W - S.padL - S.padR); }
      function sly(v) { return sBot - (Math.log10(v) - lo) / (hi - lo) * (sBot - sTop); }
      p.push('<line x1="' + S.padL + '" y1="' + sSep + '" x2="' + (S.W - S.padR) + '" y2="' + sSep + '" stroke="#cbd5e0"/>');
      p.push('<text class="ti lf-scale-with-art" x="' + S.padL + '" y="' + sTitle + '">Measured R&amp;D volume — GERD (gross domestic R&amp;D spend), PPP $B · <tspan font-weight="700">log scale</tspan> · ' + esc(strip.source) + ' · ' + yrs[0] + '–' + yrs[n - 1] + '</text>');
      // country tags at the right end of each line
      var usEndY = sly(us[n - 1]), cnEndY = sly(cn[n - 1]);
      [100, 1000].forEach(function (g) {
        if (g > minV * 0.8 && g < maxV * 1.15) {
          var yy = sly(g);
          p.push('<line x1="' + S.padL + '" y1="' + yy.toFixed(1) + '" x2="' + (S.W - S.padR) + '" y2="' + yy.toFixed(1) + '" stroke="#eef2f6"/>');
          p.push('<text class="tk lf-scale-with-art" x="' + (S.padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + g + 'B</text>');
        }
      });
      function poly(vals) { return vals.map(function (v, i) { return slx(yrs[i]).toFixed(1) + ',' + sly(v).toFixed(1); }).join(' '); }
      [['US', us, '#2b6cb0'], ['China', cn, '#c53030']].forEach(function (t) {
        var vals = t[1], col = t[2];
        p.push('<polygon points="' + slx(yrs[0]).toFixed(1) + ',' + sBot + ' ' + poly(vals) + ' ' + slx(yrs[n - 1]).toFixed(1) + ',' + sBot + '" fill="' + col + '" opacity="0.08"/>');
        p.push('<polyline points="' + poly(vals) + '" fill="none" stroke="' + col + '" stroke-width="1.7"/>');
        vals.forEach(function (v, i) { p.push('<circle cx="' + slx(yrs[i]).toFixed(1) + '" cy="' + sly(v).toFixed(1) + '" r="2" fill="' + col + '"/>'); });
      });
      p.push('<text class="cl lf-scale-with-art" x="' + (S.W - S.padR) + '" y="' + (usEndY - 5).toFixed(1) + '" text-anchor="end" fill="#2b6cb0" font-weight="600">US</text>');
      p.push('<text class="cl lf-scale-with-art" x="' + (S.W - S.padR) + '" y="' + (cnEndY + 12).toFixed(1) + '" text-anchor="end" fill="#c53030" font-weight="600">China</text>');
      yrs.forEach(function (y) { p.push('<text class="tk lf-scale-with-art" x="' + slx(y).toFixed(1) + '" y="' + (sBot + 12) + '" text-anchor="middle">' + y + '</text>'); });
      p.push('<text class="cl lf-scale-with-art" x="' + S.padL + '" y="' + (sBot + 26) + '">Chinese patent COUNTS are subsidy-distorted (~1 in 10 CNIPA filings ‘irregular’) — R&amp;D spend shown instead as the series least exposed; the PPP base year shifts the exact US↔China crossover.</text>');
    }
    p.push('</svg>');
    return p.join("");
  }

  // =====================================================================
  // NATSEC (Figure III) — a mini-spine filtered to natsec-tagged rows.
  // Same visual system as the spine (US up / China down, category colour,
  // status texture) MINUS the silhouette and volume strip; dual-use rows carry
  // a distinct amber ring. Blocks are lf-year anchors, so the year panel is
  // reused verbatim (document-level delegation from the spine figure).
  // =====================================================================
  var NA = { W: 1120, H: 450, padL: 44, padR: 14, YLO: 1926, YHI: 2026 };
  NA.cy = 132; NA.bot = 268; NA.plotW = NA.W - NA.padL - NA.padR;
  function nxf(y) { return NA.padL + (y - NA.YLO) / (NA.YHI - NA.YLO) * NA.plotW; }
  var DUAL_RING = "#d69e2e";

  function natsecSvgString(spec) {
    var rows = spec.rows.slice().sort(function (a, b) {
      return (a.y - b.y) || ((a.c === "US" ? 0 : 1) - (b.c === "US" ? 0 : 1)) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    });
    var bh = 6, gap = 1.4, bw = 7.5, sil = spec.silhouette, win = spec.window || 15, maxDens = spec.silhouette_max || 1;
    var p = ['<svg viewBox="0 0 ' + NA.W + ' ' + NA.H + '" width="100%" class="lf-svg" role="img" aria-label="The national-security ledger: one block per natsec-tagged achievement 1926-2026, US above the centreline and China below, coloured by category, textured by verification label, dual-use rows ringed in amber, with a ' + win + '-year rolling density envelope and a SIPRI military-expenditure strip beneath. A count under the published tagging rule, not a military-balance assessment.">'];
    p.push('<defs><pattern id="ns-hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="4" stroke="#ffffff" stroke-width="1.4" opacity="0.9"/></pattern></defs>');
    p.push('<style>.nax{stroke:#9aa5b1;stroke-width:1}.ntk{font:9px sans-serif;fill:#718096}.nti{font:13px sans-serif;fill:#2d3748}.ncl{font:10px sans-serif;fill:#4a5568}</style>');
    p.push('<text class="nti lf-scale-with-art" x="' + NA.padL + '" y="15">The National-Security Ledger — ' + rows.length + ' natsec-tagged achievements (Amendment 5), US above / China below (' + win + '-yr density) — NOT a capability assessment</text>');
    // --- density envelope (behind blocks): mirrored filled areas, scaled to a shared max ---
    var silH = NA.cy - 30;
    function nsilPath(pts, up) {
      var d = "M" + nxf(pts[0][0]).toFixed(1) + "," + NA.cy.toFixed(1);
      pts.forEach(function (pt) {
        var yy = up ? (NA.cy - pt[1] / maxDens * silH) : (NA.cy + pt[1] / maxDens * silH);
        d += " L" + nxf(pt[0]).toFixed(1) + "," + yy.toFixed(1);
      });
      d += " L" + nxf(pts[pts.length - 1][0]).toFixed(1) + "," + NA.cy.toFixed(1) + " Z";
      return d;
    }
    if (sil && sil.US && sil.China) {
      p.push('<path d="' + nsilPath(sil.US, true) + '" fill="#2b6cb0" opacity="0.13"/>');
      p.push('<path d="' + nsilPath(sil.China, false) + '" fill="#c53030" opacity="0.13"/>');
      var net = "M" + nxf(sil.US[0][0]).toFixed(1) + "," + NA.cy.toFixed(1);
      for (var q = 0; q < sil.US.length; q++) {
        var diff = (sil.US[q][1] - sil.China[q][1]) / maxDens;
        net += " L" + nxf(sil.US[q][0]).toFixed(1) + "," + (NA.cy - diff * 12).toFixed(1);
      }
      p.push('<path d="' + net + '" fill="none" stroke="#4a5568" stroke-width="1" opacity="0.45"/>');
    }
    // centreline + decade ticks
    p.push('<line class="nax" x1="' + NA.padL + '" y1="' + NA.cy + '" x2="' + (NA.W - NA.padR) + '" y2="' + NA.cy + '"/>');
    for (var yr = 1930; yr <= 2026; yr += 10) {
      var xx = nxf(yr);
      p.push('<line x1="' + xx.toFixed(1) + '" y1="26" x2="' + xx.toFixed(1) + '" y2="' + NA.bot + '" stroke="#eef2f6"/>');
      p.push('<text class="ntk lf-scale-with-art" x="' + xx.toFixed(1) + '" y="' + (NA.bot + 12) + '" text-anchor="middle">' + yr + '</text>');
    }
    p.push('<text class="ntk lf-scale-with-art" x="' + NA.padL + '" y="30">US ↑</text>');
    p.push('<text class="ntk lf-scale-with-art" x="' + NA.padL + '" y="' + (NA.cy + silH + 10) + '">China ↓</text>');
    // blocks
    var stack = {};
    rows.forEach(function (r) {
      var col = CATEGORY_COLORS[r.cat] || "#888";
      var key = r.y + "|" + r.c, k = stack[key] || 0; stack[key] = k + 1;
      var x = nxf(r.y) - bw / 2, y;
      if (r.c === "US") y = NA.cy - (k + 1) * bh - k * gap - 1; else y = NA.cy + k * (bh + gap) + 1;
      var rect;
      if (r.st === "ESTABLISHED") rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="' + col + '"/>';
      else if (r.st === "REPORTED") rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="' + col + '"/><rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="url(#ns-hatch)"/>';
      else rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="none" stroke="' + col + '" stroke-width="1.1"/>';
      // dual-use marker: an amber ring drawn around the block (distinct, driven by the du flag)
      var ring = r.du ? '<rect x="' + (x - 1.3).toFixed(1) + '" y="' + (y - 1.3).toFixed(1) + '" width="' + (bw + 2.6).toFixed(1) + '" height="' + (bh + 2.6).toFixed(1) + '" fill="none" stroke="' + DUAL_RING + '" stroke-width="1.1" rx="1.4"/>' : "";
      var title = esc(r.id + " " + r.y + " " + r.cat + "/" + r.et + " [" + r.st + (r.du ? " · dual-use" : "") + "]");
      p.push('<a href="dossier.html#y-' + r.y + '" class="lf-year" data-year="' + r.y + '" data-card="' + esc(r.id) + '"><title>' + title + '</title>' + rect + ring + '</a>');
    });
    // legend
    var lx = NA.padL, ly = NA.bot + 30;
    CATS.forEach(function (cat, i) {
      var cxx = lx + i * 118;
      p.push('<rect x="' + cxx.toFixed(1) + '" y="' + (ly - 8) + '" width="9" height="9" fill="' + CATEGORY_COLORS[cat] + '"/><text class="ncl lf-scale-with-art" x="' + (cxx + 12).toFixed(1) + '" y="' + ly + '">' + CATEGORY_SHORT[cat] + '</text>');
    });
    p.push('<rect x="' + lx + '" y="' + (ly + 6) + '" width="9" height="9" fill="none" stroke="' + DUAL_RING + '" stroke-width="1.1" rx="1.4"/><text class="ncl lf-scale-with-art" x="' + (lx + 14) + '" y="' + (ly + 14) + '">amber ring = dual-use · solid = ESTABLISHED · outlined = OPEN · hatched = REPORTED · shaded = ' + win + '-yr rolling density · line = US−China net · a COUNT under the tagging rule, NOT a capability assessment</text>');
    // --- military-expenditure context strip (SIPRI, constant 2023 US$, log) ---
    var strip = spec.strip;
    if (strip && strip.years && strip.years.length) {
      var yrs = strip.years, us = strip.us, cn = strip.cn, n = yrs.length;
      var sSep = ly + 33, sTitle = sSep + 15, sTop = sSep + 30, sBot = sSep + 92;
      var allv = us.concat(cn), minV = Math.min.apply(null, allv), maxV = Math.max.apply(null, allv);
      var lo = Math.log10(minV * 0.8), hi = Math.log10(maxV * 1.15);
      function mlx(y) { return NA.padL + (y - yrs[0]) / (yrs[n - 1] - yrs[0]) * (NA.W - NA.padL - NA.padR); }
      function mly(v) { return sBot - (Math.log10(v) - lo) / (hi - lo) * (sBot - sTop); }
      p.push('<line x1="' + NA.padL + '" y1="' + sSep + '" x2="' + (NA.W - NA.padR) + '" y2="' + sSep + '" stroke="#cbd5e0"/>');
      p.push('<text class="nti lf-scale-with-art" x="' + NA.padL + '" y="' + sTitle + '">Measured military expenditure — SIPRI, constant 2023 US$B, <tspan font-weight="700">log scale</tspan> · ' + yrs[0] + '–' + yrs[n - 1] + ' · China’s line is a SIPRI ESTIMATE</text>');
      [100, 1000].forEach(function (g) {
        if (g > minV * 0.8 && g < maxV * 1.15) {
          var yy = mly(g);
          p.push('<line x1="' + NA.padL + '" y1="' + yy.toFixed(1) + '" x2="' + (NA.W - NA.padR) + '" y2="' + yy.toFixed(1) + '" stroke="#eef2f6"/>');
          p.push('<text class="ntk lf-scale-with-art" x="' + (NA.padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + g + 'B</text>');
        }
      });
      function mpoly(vals) { return vals.map(function (v, i) { return mlx(yrs[i]).toFixed(1) + ',' + mly(v).toFixed(1); }).join(' '); }
      [['US', us, '#2b6cb0'], ['China', cn, '#c53030']].forEach(function (t) {
        var vals = t[1], col = t[2];
        p.push('<polygon points="' + mlx(yrs[0]).toFixed(1) + ',' + sBot + ' ' + mpoly(vals) + ' ' + mlx(yrs[n - 1]).toFixed(1) + ',' + sBot + '" fill="' + col + '" opacity="0.08"/>');
        p.push('<polyline points="' + mpoly(vals) + '" fill="none" stroke="' + col + '" stroke-width="1.7"/>');
        vals.forEach(function (v, i) { p.push('<circle cx="' + mlx(yrs[i]).toFixed(1) + '" cy="' + mly(v).toFixed(1) + '" r="2" fill="' + col + '"/>'); });
      });
      p.push('<text class="ncl lf-scale-with-art" x="' + (NA.W - NA.padR) + '" y="' + (mly(us[n - 1]) - 5).toFixed(1) + '" text-anchor="end" fill="#2b6cb0" font-weight="600">US</text>');
      p.push('<text class="ncl lf-scale-with-art" x="' + (NA.W - NA.padR) + '" y="' + (mly(cn[n - 1]) + 12).toFixed(1) + '" text-anchor="end" fill="#c53030" font-weight="600">China (est.)</text>');
      yrs.forEach(function (y) { p.push('<text class="ntk lf-scale-with-art" x="' + mlx(y).toFixed(1) + '" y="' + (sBot + 12) + '" text-anchor="middle">' + y + '</text>'); });
      p.push('<text class="ncl lf-scale-with-art" x="' + NA.padL + '" y="' + (sBot + 26) + '">China is a SIPRI ESTIMATE (official ~$231B vs SIPRI ~$318B vs IISS ~$325B for 2024); the US spent ~3× China. TOP = capability arrivals under the tag rule; BOTTOM = what spending did.</text>');
    }
    p.push('</svg>');
    return p.join("");
  }

  // =====================================================================
  // DIMENSIONS (Figure IV) — small-multiples: one thin mirrored US(up)/China(down)
  // strip per measured series, sharing the 1926-2026 axis, each on its OWN scale
  // (linear % of world, or log US$B). DELIBERATELY no aggregate line.
  // =====================================================================
  var DM = { W: 1120, padL: 162, padR: 54, top: 24, stripH: 68, botAx: 26, YLO: 1926, YHI: 2026 };
  function dxf(y) { return DM.padL + (y - DM.YLO) / (DM.YHI - DM.YLO) * (DM.W - DM.padL - DM.padR); }

  function dimensionsSvgString(spec) {
    var dims = spec.dims || [], N = dims.length;
    var H = DM.top + N * DM.stripH + DM.botAx;
    var p = ['<svg viewBox="0 0 ' + DM.W + ' ' + H + '" width="100%" class="lf-svg" role="img" aria-label="Dimensions of power: ' + N + ' independent measured series, each a thin US-above / China-below strip on the shared 1926-2026 axis, each on its own scale. No aggregate line.">'];
    p.push('<style>.dtk{font:9px sans-serif;fill:#718096}.dti{font:13px sans-serif;fill:#2d3748}.dlb{font:10.5px sans-serif;fill:#2d3748;font-weight:600}.dsm{font:8.5px sans-serif;fill:#718096}.dcv{font:8.5px sans-serif;fill:#b7791f}.dvl{font:9px sans-serif;font-weight:600}</style>');
    p.push('<text class="dti lf-scale-with-art" x="' + DM.padL + '" y="15">Dimensions of power — ' + N + ' measured series, US above / China below · own scale per strip · NO aggregate line</text>');
    // shared decade gridlines + bottom labels
    var gridBot = DM.top + N * DM.stripH;
    for (var yr = 1930; yr <= 2026; yr += 10) {
      var xx = dxf(yr);
      p.push('<line x1="' + xx.toFixed(1) + '" y1="' + DM.top + '" x2="' + xx.toFixed(1) + '" y2="' + gridBot + '" stroke="#eef2f6"/>');
      p.push('<text class="dtk lf-scale-with-art" x="' + xx.toFixed(1) + '" y="' + (gridBot + 12) + '" text-anchor="middle">' + yr + '</text>');
    }
    dims.forEach(function (d, i) {
      var cY = DM.top + i * DM.stripH + DM.stripH / 2, amp = DM.stripH / 2 - 14;
      var yrs = d.years, us = d.us, cn = d.cn, n = yrs.length;
      var allv = us.concat(cn), mn = Math.min.apply(null, allv), mx = Math.max.apply(null, allv);
      var lo = Math.log10(mn * 0.8), hi = Math.log10(mx * 1.15);
      function sc(v) { return d.log ? (Math.log10(v) - lo) / (hi - lo) * amp : v / mx * amp; }
      var pct = /%/.test(d.unit || "");
      function fmt(v) { return pct ? Math.round(v) + "%" : "$" + Math.round(v) + "B"; }
      // baseline
      p.push('<line x1="' + DM.padL + '" y1="' + cY + '" x2="' + (DM.W - DM.padR) + '" y2="' + cY + '" stroke="#cbd5e0"/>');
      function poly(vals, up) { return vals.map(function (v, k) { return dxf(yrs[k]).toFixed(1) + ',' + (up ? cY - sc(v) : cY + sc(v)).toFixed(1); }).join(' '); }
      [['US', us, '#2b6cb0', true], ['China', cn, '#c53030', false]].forEach(function (t) {
        var vals = t[1], col = t[2], up = t[3];
        p.push('<polygon points="' + dxf(yrs[0]).toFixed(1) + ',' + cY + ' ' + poly(vals, up) + ' ' + dxf(yrs[n - 1]).toFixed(1) + ',' + cY + '" fill="' + col + '" opacity="0.10"/>');
        p.push('<polyline points="' + poly(vals, up) + '" fill="none" stroke="' + col + '" stroke-width="1.6"/>');
        vals.forEach(function (v, k) { p.push('<circle cx="' + dxf(yrs[k]).toFixed(1) + '" cy="' + (up ? cY - sc(v) : cY + sc(v)).toFixed(1) + '" r="1.8" fill="' + col + '"/>'); });
      });
      // end-value labels (give the scale) at the last point
      p.push('<text class="dvl lf-scale-with-art" x="' + (dxf(yrs[n - 1]) + 4).toFixed(1) + '" y="' + (cY - sc(us[n - 1]) + 1).toFixed(1) + '" fill="#2b6cb0">' + fmt(us[n - 1]) + '</text>');
      p.push('<text class="dvl lf-scale-with-art" x="' + (dxf(yrs[n - 1]) + 4).toFixed(1) + '" y="' + (cY + sc(cn[n - 1]) + 3).toFixed(1) + '" fill="#c53030">' + fmt(cn[n - 1]) + '</text>');
      // left gutter: label, unit/scale, caveat, source
      p.push('<text class="dlb lf-scale-with-art" x="6" y="' + (cY - 14) + '">' + esc(d.label) + '</text>');
      p.push('<text class="dsm lf-scale-with-art" x="6" y="' + (cY - 3) + '">' + esc(d.unit) + (d.log ? ' · log' : ' · linear') + ' · ' + yrs[0] + '–' + yrs[n - 1] + '</text>');
      p.push('<text class="dcv lf-scale-with-art" x="6" y="' + (cY + 9) + '">⚠ ' + esc(d.caveat || '') + '</text>');
      p.push('<text class="dsm lf-scale-with-art" x="6" y="' + (cY + 20) + '">' + esc(d.source) + '</text>');
    });
    p.push('</svg>');
    return p.join("");
  }

  // =====================================================================
  // FOUNDER (Figure V) — the Founder's Century: a founder-regime band
  // (open/constrained/closed) per country, company-founding blocks mirrored on
  // top (clickable, panel-reused), and a venture-capital strip (log) beneath.
  // =====================================================================
  var FO = { W: 1120, padL: 48, padR: 14, YLO: 1926, YHI: 2026 };
  FO.plotW = FO.W - FO.padL - FO.padR;
  function fxf(y) { return FO.padL + (y - FO.YLO) / (FO.YHI - FO.YLO) * FO.plotW; }
  var REGIME_COL = { open: "#2f855a", constrained: "#d69e2e", closed: "#a0aec0" };

  function founderSvgString(spec) {
    var band = spec.band || [], ticks = spec.ticks || [], founds = spec.founds || [];
    var bh = 6, gap = 1.3, bw = 7;
    var usBandY = 44, cnBandY = 66, bandH = 13;          // ZONE 1 regime
    var foundKick = 128, cy = 172, decY = 214;           // ZONE 2 foundings
    var H = 228;
    var p = ['<svg viewBox="0 0 ' + FO.W + ' ' + H + '" width="100%" class="lf-svg" role="img" aria-label="Figure Va, The Founder&#39;s Century, on one 1926-2026 axis: a founder-regime band (open, constrained or closed) per country, and the company-founding ledger rows US above / China below over a 15-year rolling founding-density envelope. The capital system is Figure Vb.">'];
    p.push('<style>.fax{stroke:#9aa5b1;stroke-width:1}.ftk{font:9px sans-serif;fill:#718096}.fti{font:12.5px sans-serif;fill:#2d3748}.fcl{font:9.5px sans-serif;fill:#4a5568}.ftick{font:8px sans-serif;fill:#4a5568}.fkick{font:13px sans-serif;font-weight:700;letter-spacing:0.04em}.fin{font:8.5px sans-serif;fill:#2d3748;font-weight:600}.fvl{font:8.5px sans-serif;font-weight:700}</style>');
    // shared decade gridlines (regime + foundings zones)
    for (var yr = 1930; yr <= 2026; yr += 10) {
      var xx = fxf(yr);
      p.push('<line x1="' + xx.toFixed(1) + '" y1="' + (usBandY - 2) + '" x2="' + xx.toFixed(1) + '" y2="' + (decY - 6) + '" stroke="#f0f2f5"/>');
      p.push('<text class="ftk lf-scale-with-art" x="' + xx.toFixed(1) + '" y="' + decY + '" text-anchor="middle">' + yr + '</text>');
    }
    // ===== ZONE 1 — REGIME =====
    p.push('<text class="fkick lf-scale-with-art" x="' + FO.padL + '" y="26" fill="#2b6cb0">FOUNDER REGIME — CAN A PRIVATE FOUNDER LEGALLY OPERATE?</text>');
    ["open", "constrained", "closed"].forEach(function (st, i) {
      var lxx = FO.W - 300 + i * 100;
      p.push('<rect x="' + lxx + '" y="22" width="9" height="9" fill="' + REGIME_COL[st] + '" opacity="0.6"/><text class="fcl lf-scale-with-art" x="' + (lxx + 12) + '" y="30">' + st + '</text>');
    });
    band.forEach(function (seg) {
      var x1 = fxf(seg.start), x2 = fxf(seg.end), y = (seg.c === "US" ? usBandY : cnBandY);
      p.push('<rect x="' + x1.toFixed(1) + '" y="' + y + '" width="' + (x2 - x1).toFixed(1) + '" height="' + bandH + '" fill="' + (REGIME_COL[seg.state] || "#ccc") + '" opacity="0.6"/>');
      if (seg.c === "China" && seg.state === "closed") {
        p.push('<text class="fin lf-scale-with-art" x="' + ((x1 + x2) / 2).toFixed(1) + '" y="' + (y + 9) + '" text-anchor="middle">private enterprise abolished ' + seg.start + '–' + (seg.end % 100) + '</text>');
      }
      if (seg.label) {
        p.push('<line x1="' + x1.toFixed(1) + '" y1="' + y + '" x2="' + x1.toFixed(1) + '" y2="' + (y + bandH) + '" stroke="#c53030" stroke-width="1.3"/>');
        p.push('<text class="ftick lf-scale-with-art" x="' + (x1 - 2).toFixed(1) + '" y="' + (y + bandH + 10) + '" text-anchor="end" fill="#c53030">' + esc(seg.label.split(" (")[0]) + ' →</text>');
      }
    });
    p.push('<text class="ftk lf-scale-with-art" x="6" y="' + (usBandY + 9) + '">US</text>');
    p.push('<text class="ftk lf-scale-with-art" x="6" y="' + (cnBandY + 9) + '">China</text>');
    ticks.forEach(function (t) {
      var x = fxf(t.y), y = (t.c === "US" ? usBandY : cnBandY);
      p.push('<line x1="' + x.toFixed(1) + '" y1="' + y + '" x2="' + x.toFixed(1) + '" y2="' + (y + bandH) + '" stroke="#1a202c" stroke-width="1"/>');
      var lyt = (t.c === "US" ? y - 3 : y + bandH + 10);
      p.push('<text class="ftick lf-scale-with-art" x="' + (x + 2).toFixed(1) + '" y="' + lyt + '">' + t.y + ' ' + esc(t.label) + '</text>');
    });
    // ===== ZONE 2 — FOUNDINGS =====
    p.push('<text class="fkick lf-scale-with-art" x="' + FO.padL + '" y="' + foundKick + '" fill="#c05621">COMPANY FOUNDINGS — ' + founds.length + ' VERIFIED LEDGER ROWS (FOUNDINGS, NOT IP / PATENTS)</text>');
    var fwin = spec.window || 15;
    p.push('<text class="ftk lf-scale-with-art" x="' + (FO.W - FO.padR) + '" y="' + foundKick + '" text-anchor="end">shaded = ' + fwin + '-yr rolling founding density</text>');
    // founding density envelope (behind the blocks): mirrored ' + fwin + '-yr rolling count
    var fsil = spec.silhouette, fmax = spec.silhouette_max || 1, fsilH = 32;
    if (fsil && fsil.US && fsil.China) {
      function fsilPath(pts, up) {
        var d = "M" + fxf(pts[0][0]).toFixed(1) + "," + cy.toFixed(1);
        pts.forEach(function (pt) { var yy = up ? (cy - pt[1] / fmax * fsilH) : (cy + pt[1] / fmax * fsilH); d += " L" + fxf(pt[0]).toFixed(1) + "," + yy.toFixed(1); });
        d += " L" + fxf(pts[pts.length - 1][0]).toFixed(1) + "," + cy.toFixed(1) + " Z";
        return d;
      }
      p.push('<path d="' + fsilPath(fsil.US, true) + '" fill="#2b6cb0" opacity="0.12"/>');
      p.push('<path d="' + fsilPath(fsil.China, false) + '" fill="#c53030" opacity="0.12"/>');
    }
    p.push('<line class="fax" x1="' + FO.padL + '" y1="' + cy + '" x2="' + (FO.W - FO.padR) + '" y2="' + cy + '"/>');
    p.push('<text class="ftk lf-scale-with-art" x="6" y="' + (cy - 4) + '">US ↑</text>');
    p.push('<text class="ftk lf-scale-with-art" x="6" y="' + (cy + 10) + '">China ↓</text>');
    var stack = {};
    founds.forEach(function (f) {
      var col = CATEGORY_COLORS[f.cat] || "#888";
      var key = f.y + "|" + f.c, k = stack[key] || 0; stack[key] = k + 1;
      var x = fxf(f.y) - bw / 2, y;
      if (f.c === "US") y = cy - (k + 1) * bh - k * gap - 1; else y = cy + k * (bh + gap) + 1;
      var rect = '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh + '" fill="' + col + '"/>';
      var title = esc(f.id + " " + f.y + " " + f.cat + " founding");
      p.push('<a href="dossier.html#y-' + f.y + '" class="lf-year" data-year="' + f.y + '" data-card="' + esc(f.id) + '"><title>' + title + '</title>' + rect + '</a>');
    });
    p.push('</svg>');
    return p.join("");
  }

  // ===== FIGURE Vb — THE CAPITAL SYSTEM (three strips, ONE shared modern axis, right-margin endpoints) =====
  function capitalSvgString(spec) {
    var vc = spec.vc || {}, ex = spec.exits || {}, scap = spec.state_capital || {}, uni = spec.unicorns || [];
    var W = FO.W, padL = 48, RM = 130, plotR = W - RM;   // reserved right-margin endpoint column
    var k1 = 28, vT = 42, vB = 96;                        // strip 1 PRIVATE VC
    var k2 = 122, gT = 138, gB = 206;                    // strip 2 STATE-GUIDED CAPITAL
    var k3 = 232, xT = 246, xB = 300;                    // strip 3 IPO PROCEEDS
    var axisY = 312, uniY = 328, H = 338, Y0 = 2014, Y1 = 2024;
    function cx(y) { return padL + (y - Y0) / (Y1 - Y0) * (plotR - padL); }
    var p = ['<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" class="lf-svg" role="img" aria-label="Figure Vb, The Capital System: three strips on ONE shared ~2014-2024 axis — annual private venture-capital investment (log $B); state-guided capital drawn as an estimate-range band between announced target (upper) and subscribed / committed capital (lower), with China Big Fund and US SBIR/CHIPS ticks; and annual IPO proceeds by venue showing the post-2021 US-listing freeze. Endpoint values sit in a reserved right-margin column.">'];
    p.push('<style>.fax{stroke:#9aa5b1;stroke-width:1}.ftk{font:9px sans-serif;fill:#718096}.fcl{font:9.5px sans-serif;fill:#4a5568}.ftick{font:8px sans-serif;fill:#4a5568}.fkick{font:13px sans-serif;font-weight:700;letter-spacing:0.04em}.fvl{font:8.5px sans-serif;font-weight:700}.fem{font:8px sans-serif;fill:#9c6612}</style>');
    // shared vertical gridlines through all three strips + one bottom year axis
    for (var gy = Y0; gy <= Y1; gy += 2) { var gx = cx(gy); p.push('<line x1="' + gx.toFixed(1) + '" y1="' + vT + '" x2="' + gx.toFixed(1) + '" y2="' + xB + '" stroke="#f2f4f7"/>'); p.push('<text class="ftk lf-scale-with-art" x="' + gx.toFixed(1) + '" y="' + axisY + '" text-anchor="middle">' + gy + '</text>'); }
    p.push('<line x1="' + (plotR + 3) + '" y1="' + vT + '" x2="' + (plotR + 3) + '" y2="' + xB + '" stroke="#e2e8f0" stroke-dasharray="2,3"/>');
    // right-margin endpoint label (reserved column; nothing renders over plot geometry)
    function endLabel(yPix, txt, col) {
      p.push('<line x1="' + plotR.toFixed(1) + '" y1="' + yPix.toFixed(1) + '" x2="' + (plotR + 6).toFixed(1) + '" y2="' + yPix.toFixed(1) + '" stroke="' + col + '" stroke-width="0.7"/>');
      p.push('<text class="fvl lf-scale-with-art" x="' + (plotR + 9).toFixed(1) + '" y="' + (yPix + 3).toFixed(1) + '" fill="' + col + '">' + txt + '</text>');
    }
    function logY(v, lo, hi, top, bot) { return bot - (Math.log10(v) - lo) / (hi - lo) * (bot - top); }
    // ---------- STRIP 1: PRIVATE VC (log $B) ----------
    var us = vc.us || [], cn = vc.cn || [];
    p.push('<text class="fkick lf-scale-with-art" x="' + padL + '" y="' + k1 + '" fill="#2f855a">PRIVATE VC — ANNUAL, LOG $B (' + esc(vc.source) + ')</text>');
    if (us.length) {
      var vAll = us.concat(cn).map(function (d) { return d[1]; });
      var vlo = Math.log10(Math.min.apply(null, vAll) * 0.8), vhi = Math.log10(Math.max.apply(null, vAll) * 1.15);
      function vy(v) { return logY(v, vlo, vhi, vT, vB); }
      [100, 1000].forEach(function (g) { var yy = vy(g); if (yy > vT && yy < vB) p.push('<text class="ftk lf-scale-with-art" x="' + (padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + (g >= 1000 ? '1T' : g + 'B') + '</text>'); });
      var cnPk = null; cn.forEach(function (d) { if (d[0] === 2021) cnPk = d; });
      if (cnPk) p.push('<line x1="' + cx(2021).toFixed(1) + '" y1="' + vT + '" x2="' + cx(2021).toFixed(1) + '" y2="' + vB + '" stroke="#c53030" stroke-width="0.7" stroke-dasharray="2,2" opacity="0.5"/>');
      [[us, '#2b6cb0'], [cn, '#c53030']].forEach(function (t) {
        p.push('<polyline points="' + t[0].map(function (d) { return cx(d[0]).toFixed(1) + ',' + vy(d[1]).toFixed(1); }).join(' ') + '" fill="none" stroke="' + t[1] + '" stroke-width="1.7"/>');
        t[0].forEach(function (d) { p.push('<circle cx="' + cx(d[0]).toFixed(1) + '" cy="' + vy(d[1]).toFixed(1) + '" r="1.9" fill="' + t[1] + '"/>'); });
      });
      if (cnPk) { p.push('<text class="fvl lf-scale-with-art" x="' + (cx(2021) - 4).toFixed(1) + '" y="' + (vy(cnPk[1]) - 4).toFixed(1) + '" text-anchor="end" fill="#c53030">$' + Math.round(cnPk[1]) + 'B</text>'); p.push('<text class="ftick lf-scale-with-art" x="' + (cx(2021) + 3).toFixed(1) + '" y="' + (vT + 8) + '" fill="#c53030">2021 crackdown</text>'); }
      var uL = us[us.length - 1], cL = cn[cn.length - 1];
      if (uL) endLabel(vy(uL[1]), 'US $' + Math.round(uL[1]) + 'B', '#2b6cb0');
      if (cL) endLabel(vy(cL[1]), 'China $' + Math.round(cL[1]) + 'B', '#c53030');
    }
    // ---------- STRIP 2: STATE-GUIDED CAPITAL (est.-range band + discrete ticks) ----------
    var scBand = scap.band || [], scTk = scap.ticks || [];
    p.push('<text class="fkick lf-scale-with-art" x="' + padL + '" y="' + k2 + '" fill="#9c6612">STATE-GUIDED CAPITAL — EST. RANGE, CUMULATIVE LOG $B (' + esc(scap.source) + ')</text>');
    if (scBand.length) {
      var sVals = []; scBand.forEach(function (r) { sVals.push(r[1], r[2]); }); scTk.forEach(function (t) { sVals.push(t.usd_bn); });
      var slo = Math.log10(Math.min.apply(null, sVals) * 0.7), shi = Math.log10(Math.max.apply(null, sVals) * 1.3);
      function sy(v) { return logY(v, slo, shi, gT, gB); }
      [10, 100, 1000].forEach(function (g) { var yy = sy(g); if (yy > gT && yy < gB) p.push('<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + plotR + '" y2="' + yy.toFixed(1) + '" stroke="#f2f4f7"/><text class="ftk lf-scale-with-art" x="' + (padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + (g >= 1000 ? '1T' : g + 'B') + '</text>'); });
      var upper = scBand.map(function (r) { return cx(r[0]).toFixed(1) + ',' + sy(r[1]).toFixed(1); });
      var lowerRev = scBand.slice().reverse().map(function (r) { return cx(r[0]).toFixed(1) + ',' + sy(r[2]).toFixed(1); });
      p.push('<polygon points="' + upper.concat(lowerRev).join(' ') + '" fill="#c53030" fill-opacity="0.12" stroke="#c53030" stroke-width="1" stroke-dasharray="4,2"/>');
      scBand.forEach(function (r) { p.push('<circle cx="' + cx(r[0]).toFixed(1) + '" cy="' + sy(r[1]).toFixed(1) + '" r="1.4" fill="#c53030"/><circle cx="' + cx(r[0]).toFixed(1) + '" cy="' + sy(r[2]).toFixed(1) + '" r="1.4" fill="#c53030" fill-opacity="0.7"/>'); });
      var bl = scBand[scBand.length - 1];
      var yAn = sy(bl[1]), ySu = sy(bl[2]);   // announced is upper (smaller y); stagger if close
      if (Math.abs(yAn - ySu) < 11) { yAn -= 6; ySu += 6; }
      endLabel(yAn, 'announced ~$' + (bl[1] / 1000).toFixed(1) + 'T', '#c53030');
      endLabel(ySu, 'subscribed ~$' + (bl[2] / 1000).toFixed(2) + 'T', '#c53030');
      // ONE in-frame callout (annotation budget); the honesty is in the caption
      p.push('<text class="fem lf-scale-with-art" x="' + cx(2019).toFixed(1) + '" y="' + (sy(300)).toFixed(1) + '" text-anchor="middle">est. range · single vendor · target ≠ subscribed ≠ deployed</text>');
      // discrete ticks: China Big Fund (amber) + US comparators (blue) — data labels, staggered
      scTk.forEach(function (t) {
        var col = t.side === 'US' ? '#2b6cb0' : '#c05621', tx = cx(t.year), ty = sy(t.usd_bn);
        var atEnd = t.year >= Y1 - 0.5;
        p.push('<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="2" fill="' + col + '"/>');
        p.push('<text class="ftick lf-scale-with-art" x="' + (tx + (atEnd ? -4 : 4)).toFixed(1) + '" y="' + (ty + (t.side === 'US' ? 8 : -3)).toFixed(1) + '" text-anchor="' + (atEnd ? 'end' : 'start') + '" fill="' + col + '">' + esc(t.label) + ' $' + (t.usd_bn % 1 === 0 ? t.usd_bn : t.usd_bn.toFixed(1)) + 'B</text>');
      });
    }
    // ---------- STRIP 3: IPO PROCEEDS (by venue, log $B) ----------
    var exUS = ex.us || [], exOn = ex.onshore || [], exAdr = ex.us_listed || [];
    p.push('<text class="fkick lf-scale-with-art" x="' + padL + '" y="' + k3 + '" fill="#2f855a">IPO PROCEEDS — ANNUAL BY VENUE, LOG $B (' + esc(ex.source || '') + ')</text>');
    if (exUS.length) {
      var eV = exUS.concat(exOn).concat(exAdr).map(function (d) { return d[1]; }).filter(function (v) { return v > 0; });
      var elo = Math.log10(Math.min.apply(null, eV) * 0.7), ehi = Math.log10(Math.max.apply(null, eV) * 1.25);
      function ey(v) { return logY(v, elo, ehi, xT, xB); }
      [1, 10, 100].forEach(function (g) { var yy = ey(g); if (yy > xT && yy < xB) p.push('<text class="ftk lf-scale-with-art" x="' + (padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + g + 'B</text>'); });
      p.push('<line x1="' + cx(2021).toFixed(1) + '" y1="' + xT + '" x2="' + cx(2021).toFixed(1) + '" y2="' + xB + '" stroke="#c53030" stroke-width="0.7" stroke-dasharray="2,2" opacity="0.45"/>');
      p.push('<text class="ftick lf-scale-with-art" x="' + (cx(2021) + 3).toFixed(1) + '" y="' + (xT + 8) + '" fill="#c53030">DiDi → US-listing freeze</text>');
      [[exUS, '#2b6cb0', 'US'], [exOn, '#c05621', 'onshore'], [exAdr, '#c53030', 'adr']].forEach(function (t) {
        var arr = t[0].filter(function (d) { return d[1] > 0; });
        p.push('<polyline points="' + arr.map(function (d) { return cx(d[0]).toFixed(1) + ',' + ey(d[1]).toFixed(1); }).join(' ') + '" fill="none" stroke="' + t[1] + '" stroke-width="1.5"' + (t[2] === 'adr' ? ' stroke-dasharray="4,2"' : '') + '/>');
        arr.forEach(function (d) { p.push('<circle cx="' + cx(d[0]).toFixed(1) + '" cy="' + ey(d[1]).toFixed(1) + '" r="1.6" fill="' + t[1] + '"/>'); });
      });
      var onPk = exOn.reduce(function (a, b) { return b[1] > a[1] ? b : a; }, exOn[0]);
      if (onPk) p.push('<text class="ftick lf-scale-with-art" x="' + cx(onPk[0]).toFixed(1) + '" y="' + (ey(onPk[1]) - 4).toFixed(1) + '" text-anchor="middle" fill="#c05621">China onshore led most yrs</text>');
      var eUSl = exUS[exUS.length - 1], eOnl = exOn[exOn.length - 1], eAdl = exAdr[exAdr.length - 1];
      // US and onshore endpoints can be close in y — stagger by nudging labels apart
      if (eUSl && eOnl) {
        var yu = ey(eUSl[1]), yo = ey(eOnl[1]);
        if (Math.abs(yu - yo) < 9) { if (yu < yo) { yu -= 4; yo += 4; } else { yu += 4; yo -= 4; } }
        endLabel(yu, 'US $' + Math.round(eUSl[1]) + 'B', '#2b6cb0');
        endLabel(yo, 'China onshore $' + Math.round(eOnl[1]) + 'B', '#c05621');
      }
      if (eAdl) endLabel(ey(eAdl[1]), 'China US-listed $' + eAdl[1].toFixed(1) + 'B', '#c53030');
    }
    // unicorn note (bottom)
    var u0 = uni[0] || {}, u1 = uni[1] || {};
    p.push('<text class="fcl lf-scale-with-art" x="' + padL + '" y="' + uniY + '">Unicorns ' + (u0.as_of || '') + ': US ' + (u0.us || '?') + ' / China ' + (u0.cn || '?') + ' (' + esc((u0.source || '').split(' (')[0]) + ', indep.); Hurun (Chinese-origin) counts China ' + (u1.cn || '?') + ' — conflicting figures.</text>');
    p.push('</svg>');
    return p.join("");
  }

  // ===== FIGURE Vc — VELOCITY (2x2 small-multiples: four ways to be fast) =====
  function velocitySvgString(spec) {
    var W = 1120, H = 560, US = "#2b6cb0", CN = "#c53030", INK = "#2d3748", MUT = "#718096";
    var p = ['<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" class="lf-svg" role="img" aria-label="Figure Vc, Velocity: four small-multiple panels comparing US and China on deployment speed, iteration cadence, time-to-scale, and competitive intensity. The overall finding: China leads velocity in atoms (deployment, hardware iteration, cutthroat selection); the US leads in bits and at the technology frontier.">'];
    p.push('<style>.vt{font:13px sans-serif;font-weight:700;fill:#1a202c;letter-spacing:.02em}.vtag{font:10px sans-serif;font-weight:700}.vlab{font:9px sans-serif;fill:#4a5568}.vval{font:9px sans-serif;font-weight:700}.vfoot{font:8.5px sans-serif;fill:#718096}.vax{stroke:#9aa5b1;stroke-width:1}.vgl{stroke:#eef2f6}</style>');
    // headline
    p.push('<text class="vt lf-scale-with-art" x="40" y="20" style="font-size:15px">VELOCITY — FOUR WAYS TO BE FAST</text>');
    p.push('<text class="vlab lf-scale-with-art" x="40" y="36"><tspan fill="' + CN + '" font-weight="700">China leads in ATOMS</tspan> (deployment · hardware iteration · cutthroat selection)  ·  <tspan fill="' + US + '" font-weight="700">the US leads in BITS &amp; at the FRONTIER</tspan>  —  a constructed, OPEN-CAVEATED comparison; re-weight it and it shifts.</text>');
    var pw = 505, ph = 230;
    function frame(x0, y0, title, tag, tagcol) {
      p.push('<rect x="' + x0 + '" y="' + y0 + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="#e2e8f0"/>');
      p.push('<text class="vt lf-scale-with-art" x="' + (x0 + 12) + '" y="' + (y0 + 20) + '">' + title + '</text>');
      p.push('<text class="vtag lf-scale-with-art" x="' + (x0 + pw - 12) + '" y="' + (y0 + 20) + '" text-anchor="end" fill="' + tagcol + '">' + tag + '</text>');
    }
    function foot(x0, y0, lines) {
      lines.forEach(function (t, i) { p.push('<text class="vfoot lf-scale-with-art" x="' + (x0 + 12) + '" y="' + (y0 + ph - 16 + i * 11) + '">' + t + '</text>'); });
    }
    // ---------- PANEL 1: DEPLOYMENT (top-left) ----------
    (function () {
      var x0 = 40, y0 = 58; frame(x0, y0, "① DEPLOYMENT — lab → mass market", "ATOMS → CHINA", CN);
      var d = spec.deploy || {}, us = d.us || [], cn = d.cn || [];
      var px = x0 + 46, py = y0 + 34, plw = pw - 70, plh = 118;
      function vx(yr) { return px + (yr - 2020) / 4 * plw; }
      function vy(v) { return py + plh - v / 50 * plh; }
      [0, 25, 50].forEach(function (g) { var yy = vy(g); p.push('<line class="vgl" x1="' + px + '" y1="' + yy.toFixed(1) + '" x2="' + (px + plw) + '" y2="' + yy.toFixed(1) + '"/><text class="vlab lf-scale-with-art" x="' + (px - 5) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">' + g + '%</text>'); });
      [2020, 2022, 2024].forEach(function (yr) { p.push('<text class="vlab lf-scale-with-art" x="' + vx(yr).toFixed(1) + '" y="' + (py + plh + 12) + '" text-anchor="middle">' + yr + '</text>'); });
      [[us, US, "US"], [cn, CN, "China"]].forEach(function (t) {
        var a = t[0]; p.push('<polyline points="' + a.map(function (r) { return vx(r[0]).toFixed(1) + ',' + vy(r[1]).toFixed(1); }).join(' ') + '" fill="none" stroke="' + t[1] + '" stroke-width="1.9"/>');
        a.forEach(function (r) { p.push('<circle cx="' + vx(r[0]).toFixed(1) + '" cy="' + vy(r[1]).toFixed(1) + '" r="2.1" fill="' + t[1] + '"/>'); });
        var L = a[a.length - 1]; p.push('<text class="vval lf-scale-with-art" x="' + (vx(L[0]) - 3).toFixed(1) + '" y="' + (vy(L[1]) + (t[2] === "US" ? 12 : -5)).toFixed(1) + '" text-anchor="end" fill="' + t[1] + '">' + t[2] + ' ' + Math.round(L[1]) + '%</text>');
      });
      foot(x0, y0, ["EV share of new-car sales (IEA). China also +277GW solar/yr, ~48,000km HSR (US ~0).",
        "But BITS invert → US: ChatGPT ~100M users in 2mo; AI capex ~$350B vs China AI-cloud ~$7B."]);
    })();
    // ---------- PANEL 2: ITERATION CADENCE (top-right) ----------
    (function () {
      var x0 = 575, y0 = 58; frame(x0, y0, "② ITERATION CADENCE — how often you ship", "SPLIT", MUT);
      var it = spec.iterate || [];
      var px = x0 + 46, py = y0 + 34, plw = pw - 70, plh = 118, maxV = 44;
      [0, 20, 40].forEach(function (g) { var yy = py + plh - g / maxV * plh; p.push('<line class="vgl" x1="' + px + '" y1="' + yy.toFixed(1) + '" x2="' + (px + plw) + '" y2="' + yy.toFixed(1) + '"/><text class="vlab lf-scale-with-art" x="' + (px - 5) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">' + g + '</text>'); });
      var gw = plw / it.length, bw = 26;
      it.forEach(function (m, i) {
        var gx = px + gw * (i + 0.5);
        [[m.us, US, "US", -1], [m.cn, CN, "CN", 1]].forEach(function (b) {
          var bx = gx + b[3] * (bw / 2 + 2) - bw / 2, bh = b[0] / maxV * plh, by = py + plh - bh;
          if (bh > 0.5) p.push('<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw + '" height="' + bh.toFixed(1) + '" fill="' + b[1] + '" opacity="0.85"/>');
          p.push('<text class="vval lf-scale-with-art" x="' + (bx + bw / 2).toFixed(1) + '" y="' + (b[0] > 0.5 ? by - 3 : py + plh - 3).toFixed(1) + '" text-anchor="middle" fill="' + b[1] + '">' + b[2] + ' ' + Math.round(b[0]) + '</text>');
        });
        p.push('<text class="vlab lf-scale-with-art" x="' + gx.toFixed(1) + '" y="' + (py + plh + 12) + '" text-anchor="middle">' + esc(m.label) + ' (' + esc(m.unit) + ')</text>');
        p.push('<text class="vlab lf-scale-with-art" x="' + gx.toFixed(1) + '" y="' + (py + plh + 23) + '" text-anchor="middle" fill="' + (m.leader === "US" ? US : CN) + '" font-weight="700">' + (m.leader === "US" ? "US leads" : "China leads") + '</text>');
      });
      foot(x0, y0, ["New-model dev cycle ~20mo (China) vs ~40mo (legacy) — AlixPartners/McKinsey.",
        "Frontier lag: open models trail the US closed frontier ~4–8mo (Epoch/AISI/NIST)."]);
    })();
    // ---------- PANEL 3: TIME-TO-SCALE (bottom-left) ----------
    (function () {
      var x0 = 40, y0 = 310; frame(x0, y0, "③ TIME-TO-SCALE — founding → $1B", "NO CLEAR WINNER", MUT);
      var ts = spec.timescale || [];
      var px = x0 + 30, py = y0 + 36, plw = pw - 54, plh = 116;
      function tx(yr) { return px + yr / 12 * plw; }
      var laneCN = py + 34, laneUS = py + 88;
      [0, 3, 6, 9, 12].forEach(function (g) { p.push('<line class="vgl" x1="' + tx(g).toFixed(1) + '" y1="' + py + '" x2="' + tx(g).toFixed(1) + '" y2="' + (py + plh) + '"/><text class="vlab lf-scale-with-art" x="' + tx(g).toFixed(1) + '" y="' + (py + plh + 11) + '" text-anchor="middle">' + g + 'y</text>'); });
      p.push('<text class="vlab lf-scale-with-art" x="' + px + '" y="' + (laneCN - 20) + '" fill="' + CN + '" font-weight="700">China</text>');
      p.push('<text class="vlab lf-scale-with-art" x="' + px + '" y="' + (laneUS - 20) + '" fill="' + US + '" font-weight="700">US</text>');
      ts.forEach(function (c, i) {
        var col = c.country === "US" ? US : CN, lane = c.country === "US" ? laneUS : laneCN;
        var jitter = (i % 2 === 0 ? -9 : 9);
        p.push('<circle cx="' + tx(c.years).toFixed(1) + '" cy="' + (lane + jitter).toFixed(1) + '" r="2.6" fill="' + col + '"/>');
        p.push('<text class="vlab lf-scale-with-art" x="' + (tx(c.years) + 5).toFixed(1) + '" y="' + (lane + jitter + 3).toFixed(1) + '" fill="' + INK + '">' + esc(c.company) + '</text>');
      });
      foot(x0, y0, ["Exemplar dots, NOT a median — no honest paired US-vs-China figure exists (vendor stats).",
        "China's 2010s cohort fast; but SHEIN ~11y, and the US AI cohort now scales fastest (xAI ~14mo)."]);
    })();
    // ---------- PANEL 4: CUTTHROAT (bottom-right) ----------
    (function () {
      var x0 = 575, y0 = 310; frame(x0, y0, "④ CUTTHROAT — selection intensity", "CHINA (both ways)", CN);
      var ct = spec.cutthroat || [];
      var px = x0 + 46, py = y0 + 34, plw = pw - 70, plh = 116, maxV = 500;
      [0, 250, 500].forEach(function (g) { var yy = py + plh - g / maxV * plh; p.push('<line class="vgl" x1="' + px + '" y1="' + yy.toFixed(1) + '" x2="' + (px + plw) + '" y2="' + yy.toFixed(1) + '"/><text class="vlab lf-scale-with-art" x="' + (px - 5) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">' + g + '</text>'); });
      var n = ct.length, bw = 46;
      ct.forEach(function (r, i) {
        var cx = px + plw * ((i + 0.5) / n), bh = r[1] / maxV * plh, by = py + plh - bh, fc = (r[2] === "forecast");
        p.push('<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw + '" height="' + bh.toFixed(1) + '" fill="' + (fc ? "none" : CN) + '" opacity="' + (fc ? 1 : 0.8) + '" stroke="' + CN + '"' + (fc ? ' stroke-dasharray="4,2"' : '') + '/>');
        p.push('<text class="vval lf-scale-with-art" x="' + cx.toFixed(1) + '" y="' + (by - 3).toFixed(1) + '" text-anchor="middle" fill="' + CN + '">' + r[1] + (fc ? " (F)" : "") + '</text>');
        p.push('<text class="vlab lf-scale-with-art" x="' + cx.toFixed(1) + '" y="' + (py + plh + 12) + '" text-anchor="middle">' + r[0] + (fc ? " forecast" : "") + '</text>');
      });
      p.push('<text class="vlab lf-scale-with-art" x="' + (px + plw / 2).toFixed(1) + '" y="' + (py + 10) + '" text-anchor="middle" fill="' + MUT + '">Chinese EV brands</text>');
      foot(x0, y0, ["487 (2018) → 129 (2025) → ~15 viable by 2030 (AlixPartners); only 3 profitable.",
        "US concentrates early: Uber+Lyft ~99%, Google ~90%. Involution: ~$69B wiped, PPI −35mo."]);
    })();
    p.push('</svg>');
    return p.join("");
  }

  // ---- registrations: poster (Node string floor) + live renderer (lightbox) ----
  function renderMomentumPosterSVG(spec) { return momentumSvgString(spec); }
  function renderSpinePosterSVG(spec) { return spineSvgString(spec); }
  function renderNatsecPosterSVG(spec) { return natsecSvgString(spec); }
  function renderDimensionsPosterSVG(spec) { return dimensionsSvgString(spec); }
  function renderFounderPosterSVG(spec) { return founderSvgString(spec); }
  function renderCapitalPosterSVG(spec) { return capitalSvgString(spec); }
  function renderVelocityPosterSVG(spec) { return velocitySvgString(spec); }
  function mount(container, spec, drawFn) {
    if (!container) return null;
    if (spec == null && container.getAttribute) { try { spec = JSON.parse(container.getAttribute("data-figure")); } catch (e) { return null; } }
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return null; } }
    var baked = container.querySelector && container.querySelector("[data-poster]");
    if (baked && baked.parentNode) baked.parentNode.removeChild(baked);
    container.innerHTML = drawFn(spec);
    return null;   // no zoom handle (static figures)
  }
  DF.renderMomentumPosterSVG = renderMomentumPosterSVG;
  DF.renderSpinePosterSVG = renderSpinePosterSVG;
  DF.renderNatsecPosterSVG = renderNatsecPosterSVG;
  DF.renderDimensionsPosterSVG = renderDimensionsPosterSVG;
  DF.renderFounderPosterSVG = renderFounderPosterSVG;
  DF.registerPoster("momentum", renderMomentumPosterSVG);
  DF.registerPoster("spine", renderSpinePosterSVG);
  DF.registerPoster("natsec", renderNatsecPosterSVG);
  DF.registerPoster("dimensions", renderDimensionsPosterSVG);
  DF.registerPoster("founder", renderFounderPosterSVG);
  DF.registerPoster("capital", renderCapitalPosterSVG);
  DF.registerPoster("velocity", renderVelocityPosterSVG);
  DF.registerRenderer("momentum", function (c, s) { return mount(c, s, momentumSvgString); });
  DF.registerRenderer("spine", function (c, s) { return mount(c, s, spineSvgString); });
  DF.registerRenderer("natsec", function (c, s) { return mount(c, s, natsecSvgString); });
  DF.registerRenderer("dimensions", function (c, s) { return mount(c, s, dimensionsSvgString); });
  DF.registerRenderer("founder", function (c, s) { return mount(c, s, founderSvgString); });
  DF.registerRenderer("capital", function (c, s) { return mount(c, s, capitalSvgString); });
  DF.registerRenderer("velocity", function (c, s) { return mount(c, s, velocitySvgString); });
})(typeof window !== "undefined" ? window : null);
