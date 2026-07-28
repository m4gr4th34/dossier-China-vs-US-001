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
      p.push('<a href="dossier.html#y-' + r.y + '" class="lf-year" data-year="' + r.y + '"><title>' + title + '</title>' + rect + tick + '</a>');
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
      p.push('<a href="dossier.html#y-' + r.y + '" class="lf-year" data-year="' + r.y + '"><title>' + title + '</title>' + rect + ring + '</a>');
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
    var band = spec.band || [], ticks = spec.ticks || [], founds = spec.founds || [], vc = spec.vc || {}, uni = spec.unicorns || [];
    var bh = 6, gap = 1.3, bw = 7;
    var usBandY = 44, cnBandY = 64, bandH = 12;          // ZONE 1 regime
    var foundKick = 108, cy = 146, decY = 184;           // ZONE 2 foundings
    var vcKick = 200, sTop = 214, sBot = 264, H = 292;   // ZONE 3 VC
    var p = ['<svg viewBox="0 0 ' + FO.W + ' ' + H + '" width="100%" class="lf-svg" role="img" aria-label="The Founder&#39;s Century in three labelled layers: a founder-regime band (open, constrained or closed) per country; the company-founding ledger rows US above / China below; and annual venture-capital investment on a log axis.">'];
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
      p.push('<a href="dossier.html#y-' + f.y + '" class="lf-year" data-year="' + f.y + '"><title>' + title + '</title>' + rect + '</a>');
    });
    // ===== ZONE 3 — VC STRIP (own 2014-2024 axis, log) =====
    var us = vc.us || [], cn = vc.cn || [];
    p.push('<text class="fkick lf-scale-with-art" x="' + FO.padL + '" y="' + vcKick + '" fill="#2f855a">ANNUAL VC INVESTMENT (LOG $B) — ' + esc(vc.source) + '</text>');
    if (us.length) {
      var allY = us.concat(cn).map(function (d) { return d[0]; });
      var y0 = Math.min.apply(null, allY), y1 = Math.max.apply(null, allY);
      var allV = us.concat(cn).map(function (d) { return d[1]; });
      var mn = Math.min.apply(null, allV), mx = Math.max.apply(null, allV);
      var lo = Math.log10(mn * 0.8), hi = Math.log10(mx * 1.15);
      function vx(y) { return FO.padL + (y - y0) / (y1 - y0) * (FO.W - FO.padL - FO.padR); }
      function vy(v) { return sBot - (Math.log10(v) - lo) / (hi - lo) * (sBot - sTop); }
      [100, 1000].forEach(function (g) {
        if (g > mn * 0.8 && g < mx * 1.15) { var yy = vy(g); p.push('<line x1="' + FO.padL + '" y1="' + yy.toFixed(1) + '" x2="' + (FO.W - FO.padR) + '" y2="' + yy.toFixed(1) + '" stroke="#eef2f6"/><text class="ftk lf-scale-with-art" x="' + (FO.padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + g + 'B</text>'); }
      });
      function vpoly(arr) { return arr.map(function (d) { return vx(d[0]).toFixed(1) + ',' + vy(d[1]).toFixed(1); }).join(' '); }
      var cnPeak = null; for (var ci = 0; ci < cn.length; ci++) if (cn[ci][0] === 2021) cnPeak = cn[ci];
      if (cnPeak) p.push('<line x1="' + vx(2021).toFixed(1) + '" y1="' + sTop + '" x2="' + vx(2021).toFixed(1) + '" y2="' + sBot + '" stroke="#c53030" stroke-width="0.7" stroke-dasharray="2,2" opacity="0.55"/>');
      [[us, '#2b6cb0'], [cn, '#c53030']].forEach(function (t) {
        var arr = t[0], col = t[1];
        p.push('<polyline points="' + vpoly(arr) + '" fill="none" stroke="' + col + '" stroke-width="1.7"/>');
        arr.forEach(function (d) { p.push('<circle cx="' + vx(d[0]).toFixed(1) + '" cy="' + vy(d[1]).toFixed(1) + '" r="2" fill="' + col + '"/>'); });
      });
      var cnLast = cn[cn.length - 1], usLast = us[us.length - 1];
      if (cnPeak) { p.push('<text class="fvl lf-scale-with-art" x="' + vx(2021).toFixed(1) + '" y="' + (vy(cnPeak[1]) - 5).toFixed(1) + '" text-anchor="middle" fill="#c53030">$' + Math.round(cnPeak[1]) + 'B</text>'); p.push('<text class="ftick lf-scale-with-art" x="' + (vx(2021) + 3).toFixed(1) + '" y="' + (sTop + 9) + '" fill="#c53030">crackdown ↓</text>'); }
      if (cnLast) p.push('<text class="fvl lf-scale-with-art" x="' + (vx(cnLast[0]) + 3).toFixed(1) + '" y="' + (vy(cnLast[1]) + 11).toFixed(1) + '" text-anchor="end" fill="#c53030">China $' + Math.round(cnLast[1]) + 'B</text>');
      if (usLast) p.push('<text class="fvl lf-scale-with-art" x="' + (vx(usLast[0]) + 3).toFixed(1) + '" y="' + (vy(usLast[1]) - 5).toFixed(1) + '" text-anchor="end" fill="#2b6cb0">US $' + Math.round(usLast[1]) + 'B</text>');
      [y0, 2018, 2021, y1].forEach(function (y) { if (y >= y0 && y <= y1) p.push('<text class="ftk lf-scale-with-art" x="' + vx(y).toFixed(1) + '" y="' + (sBot + 11) + '" text-anchor="middle">' + y + '</text>'); });
      var u0 = uni[0] || {}, u1 = uni[1] || {};
      p.push('<text class="fcl lf-scale-with-art" x="' + FO.padL + '" y="' + (sBot + 24) + '">Unicorns ' + (u0.as_of || '') + ': US ' + (u0.us || '?') + ' / China ' + (u0.cn || '?') + ' (' + esc((u0.source || '').split(' (')[0]) + ', indep.); Hurun (Chinese-origin) counts China ' + (u1.cn || '?') + ' — conflicting figures.</text>');
    }
    p.push('</svg>');
    return p.join("");
  }

  // ---- registrations: poster (Node string floor) + live renderer (lightbox) ----
  function renderMomentumPosterSVG(spec) { return momentumSvgString(spec); }
  function renderSpinePosterSVG(spec) { return spineSvgString(spec); }
  function renderNatsecPosterSVG(spec) { return natsecSvgString(spec); }
  function renderDimensionsPosterSVG(spec) { return dimensionsSvgString(spec); }
  function renderFounderPosterSVG(spec) { return founderSvgString(spec); }
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
  DF.registerRenderer("momentum", function (c, s) { return mount(c, s, momentumSvgString); });
  DF.registerRenderer("spine", function (c, s) { return mount(c, s, spineSvgString); });
  DF.registerRenderer("natsec", function (c, s) { return mount(c, s, natsecSvgString); });
  DF.registerRenderer("dimensions", function (c, s) { return mount(c, s, dimensionsSvgString); });
  DF.registerRenderer("founder", function (c, s) { return mount(c, s, founderSvgString); });
})(typeof window !== "undefined" ? window : null);
