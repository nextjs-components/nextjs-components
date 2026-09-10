# Code Block reference

Source: https://vercel.com/geist/code-block. Captured 2026-09-09 UTC (2026-09-08 in New York).

## Evidence and contract

| Requirement        | Source/state                                    | Finding                                                                                                                           | Confidence  |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Public use         | Expanded documentation examples                 | String children, language, filename, hidden numbers, highlighted/added/removed line lists, controlled switcher/tabs, v0 ask/build | Documented  |
| Structure          | Raw DOM, all ten reference examples             | Root, optional tabs/header, copy action, content div, pre, code, line div, line button, token-line div, token spans               | Observed    |
| Geometry           | Desktop at 1488 × 926; block width 812          | 8 px radius, 40 px header, 28 px copy action, 16 px code padding, 13 px mono text, 20 px lines                                    | Observed    |
| Syntax             | Loaded component module and DOM                 | Prism tokens; string children are escaped; source text is copied without numbers or diff markers                                  | Observed    |
| Colors             | Matched CSS and computed values in both themes  | Reference palette and Geist Mono font captured; palette remains local to CodeBlock                                                | Observed    |
| Line links         | Deployed module 275067 and line button behavior | Stable hash IDs, URL hash updates, active line color; hash restored on mount                                                      | Observed    |
| Language controls  | Select and tab interactions; shipped wrapper    | Controlled value/onChange; more than four tabs use a select                                                                       | Observed    |
| Additional options | Shipped public component and wrapper            | maxHeight, pure, textToCopy, headerActions, overlay copy placement, trackCopy                                                     | Observed    |
| Mobile             | Source media rule and 390 px browser check      | Hide numbers at widths up to 600 px; preserve code scrolling                                                                      | Observed    |
| React props        | Browser inspection interface                    | Runtime React props are unavailable; private React fields were not read                                                           | Unavailable |

Loaded module URL: https://vercel.com/vc-ap-b3331f/_next/static/immutable/chunks/3uecuf7actk4a.js

Loaded stylesheet URL: https://vercel.com/vc-ap-b3331f/_next/static/immutable/chunks/0_dw9cm2ai9uf.css

Font URL: https://vercel.com/vc-ap-b3331f/_next/static/immutable/media/797e433ab948586e.p.1v5bejj26fx9h.woff2

CodeBlock uses the calling app's `--font-mono` setting. It bundles no font files and does not define its own font family or override that variable.

## Comparison

Before the bundled font was removed, the temporary fixture rendered the same 12 source lines at 812 × 313 px, with a 1488 × 926 viewport. Both themes used the reference font binary. All 66 token spans matched in text and class order. PostCSS converts the reference OKLCH colors into equivalent Lab values.

Pixel comparison used the maximum RGB channel difference per pixel, with a threshold of 10/255:

| Theme | Different pixels | Total pixels | Difference | Mean RGB channel difference |
| ----- | ---------------: | -----------: | ---------: | --------------------------: |
| Light |              410 |       254156 |    0.1613% |                0.1520 / 255 |
| Dark  |              396 |       254156 |    0.1558% |                0.1562 / 255 |

These measurements cover the default block before font removal, not the current app-font rendering or every language and state. Filename text inherited the repository's sans-serif font. The current code font comes from the calling app, so its appearance and geometry can differ from these measurements.

## Integration and intentional differences

- Editor preserves its code/scope props, component preview, and error output. Its code is read-only, with no filename, editing, or reset controls.
- Disclosure and copy are separate buttons. Copy does not toggle disclosure.
- Generated CSS classes and site instrumentation differ. The copy control uses native buttons and an accessible status output. Tab panels have valid ARIA relationships and keyboard navigation.
- An explicit root id supplies a distinct line-link hash. Editor uses this to prevent duplicate IDs across examples with the same source text.
- The v0 actions use shorter prompts with the same ask/minimal/full intent. The build menu uses native details instead of the site's portal menu. The React filename icon matches the reference; other file types use the repository file icon.
- Markdown uses Prism's bundled grammar, not the site's modified markdown-source grammar. Undocumented internal wrapper flags and polymorphic root behavior are not exposed.
- Docs uses `file:../core` so a clean scoped install resolves the local implementation instead of the old published prerelease.

Raw captures, full markup, CSS rules, focused shipped source, screenshots, pixel differences, and command logs are in `/tmp/geist-code-block-2026-09-08`. The temporary comparison route was removed.

## Final checks

- 49 tests passed across 8 suites; 2 existing todo tests remain. The CodeBlock suite has 13 tests.
- Core TypeScript, targeted lint, formatting, and git diff checks passed.
- Full docs production build passed. A clean docs-only install and build also passed with Node 24.15.0 and npm 11.12.1.
- Before font removal, production browser checks confirmed the 40 px CodeBlock header, code rendering, keyboard disclosure, and copy feedback.
- After removing Editor's editing controls, the local Textarea page confirmed read-only source, no filename/header or edit/reset buttons, working copy feedback, and all three component previews.
- After font removal, the local Textarea page confirmed that the code, pre element, and line numbers use the app's inherited `--font-mono` stack.
- The Code Block docs page renders all ten examples through Editor. Browser checks confirmed all previews and read-only source panels, source copying, and both language controls without preview errors.
- The complete docs TypeScript check still reports existing shared-component and React type errors, including Container. No CodeBlock file errors were reported. Builds retain the repository's existing type-check skip.
- The build still reports the existing `dialog:global(.fixed)` CSS warning. The test harness still emits existing React testing-library deprecation warnings.
