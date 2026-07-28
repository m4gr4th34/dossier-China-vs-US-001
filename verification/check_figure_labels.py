#!/usr/bin/env python3
"""check_figure_labels.py — label-discipline gate for the baked figure posters.

For every baked poster SVG in index.html it approximates each <text> element's
bounding box (a chars x font-size heuristic) and FAILS on:
  (1) any two text boxes that overlap by more than a small tolerance, and
  (2) any text box that extends past the figure's viewBox.

The heuristic is deliberate and documented: sans-serif per-character widths x the
class font-size, in viewBox units (the poster is static SVG in viewBox space, so
this is the rendered geometry up to width jitter). The tolerance absorbs the
heuristic's slack; it is NOT to be widened to make a real collision pass — fix the
figure (move the label, reserve a margin column, stagger the axis) instead.

Run: python3 verification/check_figure_labels.py   (exit 0 clean, 1 on violations)
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(HERE, os.pardir, "index.html")

# tolerances, viewBox units. Overlap must exceed these in BOTH axes to flag —
# absorbs char-width heuristic error while still catching labels that truly touch.
TOL = 1.2
# out-of-viewbox slack (a glyph edge a hair past the box is jitter, not a defect).
EDGE_TOL = 1.5

# per-character width as a fraction of font-size (sans-serif, rough but stable).
_NARROW = set("iIl.,:;'|!ijtf()[]{}·-")
_WIDE = set("mwMW@—%")
_SPACE = set("  ")


def _cw(ch):
    if ch in _SPACE:
        return 0.30
    if ch in _NARROW:
        return 0.32
    if ch in _WIDE:
        return 0.90
    if ch.isupper():
        return 0.64
    if ch.isdigit():
        return 0.56
    # CJK / wide unicode
    if ord(ch) > 0x2E00:
        return 1.0
    return 0.52


def _decode(s):
    return (s.replace("&#39;", "'").replace("&amp;", "&").replace("&lt;", "<")
             .replace("&gt;", ">").replace("&quot;", '"').replace("&#160;", " ")
             .replace("&nbsp;", " "))


def _text_width(txt, fs):
    return fs * sum(_cw(c) for c in txt)


def _parse_style(svg):
    """class/selector -> font-size(px) from the poster's own <style> block(s)."""
    fs = {}
    for block in re.findall(r"<style[^>]*>(.*?)</style>", svg, re.S):
        for rule in re.findall(r"([^{}]+)\{([^{}]+)\}", block):
            sel, body = rule[0].strip(), rule[1]
            m = re.search(r"font(?:-size)?\s*:\s*(?:[^;]*?\b)?(\d+(?:\.\d+)?)px", body)
            if not m:
                continue
            size = float(m.group(1))
            for s in sel.split(","):
                s = s.strip()
                key = s.split(".")[-1] if s.startswith(".") or "." in s else s
                # store bare class name and the 'text' default
                if s.startswith("."):
                    fs[s.lstrip(".").split()[0]] = size
                elif s.endswith("text") or s == "text":
                    fs["__text__"] = size
    return fs


def _font_size(classes, stylemap):
    for c in classes:
        if c in stylemap:
            return stylemap[c]
    return stylemap.get("__text__", 13.0)


def _texts(svg, stylemap):
    out = []
    for m in re.finditer(r"<text\b([^>]*)>(.*?)</text>", svg, re.S):
        attrs, inner = m.group(1), m.group(2)
        xa = re.search(r'\bx="(-?[\d.]+)"', attrs)
        ya = re.search(r'\by="(-?[\d.]+)"', attrs)
        if not xa or not ya:
            continue
        x, y = float(xa.group(1)), float(ya.group(1))
        anch = re.search(r'text-anchor="(\w+)"', attrs)
        anchor = anch.group(1) if anch else "start"
        cls = re.search(r'class="([^"]*)"', attrs)
        classes = cls.group(1).split() if cls else []
        content = _decode(re.sub(r"<[^>]+>", "", inner)).strip()
        if not content:
            continue
        fs = _font_size(classes, stylemap)
        w = _text_width(content, fs)
        if anchor == "middle":
            x0 = x - w / 2
        elif anchor == "end":
            x0 = x - w
        else:
            x0 = x
        out.append({"t": content, "x0": x0, "x1": x0 + w,
                    "top": y - 0.78 * fs, "bot": y + 0.22 * fs, "fs": fs})
    return out


def _overlap(a, b):
    ox = min(a["x1"], b["x1"]) - max(a["x0"], b["x0"])
    oy = min(a["bot"], b["bot"]) - max(a["top"], b["top"])
    return ox, oy


def check_svg(svg):
    vb = re.search(r'viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"', svg)
    W, H = (float(vb.group(1)), float(vb.group(2))) if vb else (0, 0)
    stylemap = _parse_style(svg)
    texts = _texts(svg, stylemap)
    problems = []
    # (1) pairwise overlap
    for i in range(len(texts)):
        for j in range(i + 1, len(texts)):
            ox, oy = _overlap(texts[i], texts[j])
            if ox > TOL and oy > TOL:
                problems.append("OVERLAP (%.1fx%.1f): %r  <>  %r"
                                % (ox, oy, texts[i]["t"][:34], texts[j]["t"][:34]))
    # (2) past viewBox
    for t in texts:
        if t["x0"] < -EDGE_TOL or t["x1"] > W + EDGE_TOL or t["top"] < -EDGE_TOL or t["bot"] > H + EDGE_TOL:
            problems.append("OUT-OF-VIEWBOX [%.0fx%.0f]: %r  box x[%.1f,%.1f] y[%.1f,%.1f]"
                            % (W, H, t["t"][:34], t["x0"], t["x1"], t["top"], t["bot"]))
    return len(texts), problems


def main():
    html = open(INDEX, encoding="utf-8").read()
    posters = re.findall(r'<svg data-poster="1".*?</svg>', html, re.S)
    if not posters:
        print("check_figure_labels: no baked posters found in index.html", file=sys.stderr)
        sys.exit(1)
    total_problems = 0
    for svg in posters:
        aria = re.search(r'aria-label="([^".]+)', svg)
        name = (aria.group(1) if aria else "figure")[:52]
        n, probs = check_svg(svg)
        if probs:
            total_problems += len(probs)
            print("FAIL  %-54s (%d texts, %d issues)" % (name, n, len(probs)))
            for p in probs:
                print("      " + p)
        else:
            print("ok    %-54s (%d texts)" % (name, n))
    print("=" * 60)
    if total_problems:
        print("check_figure_labels: %d label-discipline violation(s) — fix the figure, not the tolerance." % total_problems)
        sys.exit(1)
    print("check_figure_labels: all posters clean — no overlaps, nothing past a viewBox.")
    sys.exit(0)


if __name__ == "__main__":
    main()
