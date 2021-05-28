# textkit

## Layout process

1. split into paragraphs
2. get bidi runs and paragraph direction
3. font substitution - map to resolved font runs
4. script itemization
5. font shaping - text to glyphs
6. line breaking
7. bidi reordering
8. justification

9. get a list of rectangles by intersecting path, line, and exclusion paths
10. perform line breaking to get acceptable break points for each fragment
11. ellipsize line if necessary
12. bidi reordering
13. justification
