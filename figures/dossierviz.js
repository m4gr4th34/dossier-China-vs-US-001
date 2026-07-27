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
    p.push('<text class="ti" x="' + M.padL + '" y="16">Momentum index (OPEN-CAVEATED): within-decade share of ESTABLISHED achievements</text>');
    [0, 0.5, 1].forEach(function (gy) {
      var yy = myf(gy);
      p.push('<line class="' + (gy === 0.5 ? "ax" : "gl") + '" x1="' + M.padL + '" y1="' + yy.toFixed(1) + '" x2="' + (M.W - M.padR) + '" y2="' + yy.toFixed(1) + '"/>');
      p.push('<text class="tk" x="' + (M.padL - 4) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">' + (gy * 100) + '%</text>');
    });
    decades.forEach(function (d, i) {
      var cxc = M.padL + i * gw + gw / 2;
      p.push('<text class="tk" x="' + cxc.toFixed(1) + '" y="' + (M.H - M.padB + 16) + '" text-anchor="middle">' + d.replace("-", "–") + '</text>');
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
    p.push('<rect x="' + lx + '" y="' + (ly - 9) + '" width="10" height="10" fill="' + MCOL.US + '"/><text class="lbl" x="' + (lx + 14) + '" y="' + ly + '">US</text>');
    p.push('<rect x="' + (lx + 60) + '" y="' + (ly - 9) + '" width="10" height="10" fill="' + MCOL.China + '"/><text class="lbl" x="' + (lx + 74) + '" y="' + ly + '">China</text>');
    p.push('<text class="lbl" x="' + (lx + 140) + '" y="' + ly + '">band = W0-W3 sensitivity; whisker = 1946-1955 exclusion; 50% line = leadership</text>');
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
  var S = { W: 1120, H: 320, padL: 44, padR: 14, YLO: 1926, YHI: 2026 };
  S.cy = S.H / 2; S.plotW = S.W - S.padL - S.padR;
  function sxf(y) { return S.padL + (y - S.YLO) / (S.YHI - S.YLO) * S.plotW; }

  function spineSvgString(spec) {
    var rows = spec.rows.slice().sort(function (a, b) {
      return (a.y - b.y) || ((a.c === "US" ? 0 : 1) - (b.c === "US" ? 0 : 1)) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    });
    var bh = 5, gap = 1.2, bw = 6.5, sil = spec.silhouette, win = spec.window, maxDens = spec.silhouette_max || 1;
    var p = ['<svg viewBox="0 0 ' + S.W + ' ' + S.H + '" width="100%" class="lf-svg" role="img" aria-label="The Century Spine: one block per corpus achievement 1926-2026, US above the centreline and China below, coloured by category and textured by verification label, with a ' + win + '-year rolling density silhouette.">'];
    p.push('<defs><pattern id="rep-hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="4" stroke="#ffffff" stroke-width="1.4" opacity="0.9"/></pattern></defs>');
    p.push('<style>.ax{stroke:#9aa5b1;stroke-width:1}.tk{font:9px sans-serif;fill:#718096}.ti{font:13px sans-serif;fill:#2d3748}.cl{font:10px sans-serif;fill:#4a5568}</style>');
    p.push('<text class="ti" x="' + S.padL + '" y="15">The Century Spine — one block per achievement, US above / China below (' + win + '-yr density silhouette)</text>');
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
    // centreline + decade ticks
    p.push('<line class="ax" x1="' + S.padL + '" y1="' + S.cy + '" x2="' + (S.W - S.padR) + '" y2="' + S.cy + '"/>');
    for (var yr = 1930; yr <= 2026; yr += 10) {
      var xx = sxf(yr);
      p.push('<line x1="' + xx.toFixed(1) + '" y1="24" x2="' + xx.toFixed(1) + '" y2="' + (S.H - 40) + '" stroke="#e2e8f0"/>');
      p.push('<text class="tk" x="' + xx.toFixed(1) + '" y="' + (S.H - 28) + '" text-anchor="middle">' + yr + '</text>');
    }
    p.push('<text class="tk" x="' + S.padL + '" y="30">US ↑</text>');
    p.push('<text class="tk" x="' + S.padL + '" y="' + (S.H - 46) + '">China ↓</text>');
    // --- blocks on top ---
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
      p.push('<a href="dossier.html#y-' + r.y + '"><title>' + title + '</title>' + rect + tick + '</a>');
    });
    // legend
    var lx = S.padL, ly = S.H - 12;
    CATS.forEach(function (cat, i) {
      var cxx = lx + i * 118;
      p.push('<rect x="' + cxx.toFixed(1) + '" y="' + (ly - 8) + '" width="9" height="9" fill="' + CATEGORY_COLORS[cat] + '"/><text class="cl" x="' + (cxx + 12).toFixed(1) + '" y="' + ly + '">' + CATEGORY_SHORT[cat] + '</text>');
    });
    p.push('<text class="cl" x="' + lx + '" y="' + (ly + 14) + '">solid = ESTABLISHED · outlined = OPEN · hatched = REPORTED · tick = trajectory · shaded = ' + win + '-yr rolling density · line = net</text>');
    p.push('</svg>');
    return p.join("");
  }

  // ---- registrations: poster (Node string floor) + live renderer (lightbox) ----
  function renderMomentumPosterSVG(spec) { return momentumSvgString(spec); }
  function renderSpinePosterSVG(spec) { return spineSvgString(spec); }
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
  DF.registerPoster("momentum", renderMomentumPosterSVG);
  DF.registerPoster("spine", renderSpinePosterSVG);
  DF.registerRenderer("momentum", function (c, s) { return mount(c, s, momentumSvgString); });
  DF.registerRenderer("spine", function (c, s) { return mount(c, s, spineSvgString); });
})(typeof window !== "undefined" ? window : null);
