# design-sync notes — anamoraisedu.github.io

This repo is a **static one-page site** (single `index.html` with inlined CSS/JS, no package.json,
no React, no Storybook). It is synced to claude.ai/design as a **tokens-only design system**:
stylesheet + fonts, zero components. First sync: 2026-08-21, into project
`fc87db2f-7aff-4b17-8492-82ac5e84166b` ("anamoraisedu.github.io").

## How the package is faked
- `.design-sync/pkg/` is a tiny npm-shaped package the converter can consume: `package.json`
  (name `ana-morais-site-styles`), an empty `index.js` entry, and `styles.css` + `fonts/`.
- `styles.css` is **generated** by `node .design-sync/extract.mjs` (= `cfg.buildCmd`) from the
  `<style>` block of `index.html`. It strips the block between the CSS comments
  `/* ---------- reveal (only when .anim) ---------- */` and `/* ---------- responsive ---------- */`
  (GSAP-gated opacity:0 rules that would hide content in designs). **If those two comments are
  renamed in index.html the script exits 1 — update its markers.**
- The converter auto-detects `styles.css` at the package root; `cfg.cssEntry` is deliberately NOT
  set (setting it makes the converter extract the same @font-face rules twice → duplicates in
  `fonts/fonts.css`).
- Fonts: Google Fonts latin-subset variable woff2 for Fraunces (normal 400–700, italic 400–600) and
  Nunito Sans (normal 300–800, italic 400–600) are **committed** under `pkg/fonts/`; extract.mjs
  only re-downloads a file that is missing. The weight ranges are hardcoded in extract.mjs's
  `FONTS` table — if the Google Fonts `<link>` in index.html changes axes/families, update that table
  and delete the stale woff2 so it re-fetches.

## Re-sync recipe
```sh
mkdir -p .ds-sync && cp -r "<skill-base-dir>"/{package-build.mjs,package-validate.mjs,package-capture.mjs,resync.mjs,lib,storybook} .ds-sync/
echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
(cd .ds-sync && npm i esbuild ts-morph @types/react react react-dom playwright)
node .design-sync/extract.mjs
# fetch the project's _ds_sync.json → .design-sync/.cache/remote-sync.json, then:
DS_CHROMIUM_PATH=/usr/bin/google-chrome node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules .ds-sync/node_modules --entry .design-sync/pkg/index.js --out ./ds-bundle \
  --remote .design-sync/.cache/remote-sync.json
```
- `--node-modules` must point at `.ds-sync/node_modules` — react/react-dom must be there for
  `_vendor/`. The repo itself has no node_modules.
- `DS_CHROMIUM_PATH=/usr/bin/google-chrome`: the validator's render check needs a browser; the
  playwright npm package wants a specific chromium build that isn't installed, so point it at
  system Chrome (or `npx playwright install chromium` inside .ds-sync).

## Known warns (expected, don't chase)
- `[DTS_REACT] @types/react not found` — the check looks relative to the package dir, not
  `--node-modules`. Irrelevant: zero components, no .d.ts to parse.
- `[ZERO_MATCH] no component exports — treating as tokens-only DS` — that IS the design.
- `_ds_bundle.css fonts: … 4 dead @font-face block(s) dropped` — they're relocated to
  `fonts/fonts.css`, which `styles.css` imports.
- validate `tokens: 21 defined, 20 referenced` — includes the per-element locals
  (`--bg`/`--fg` on .btn, `--accent`/`--accent-ink` on .card); one is only set, never read.

## Verification done
- `package-validate.mjs` exits 0 (render check ran with 0 previews, as expected for tokens-only).
- Manual fidelity check: a sample page composing nav/section-head/cards/tags/buttons/quote/
  timeline/contato-card against `ds-bundle/styles.css` was screenshotted in headless Chrome and
  matched the live site (fonts load from `fonts/`). Re-do this after any index.html CSS change —
  there is no automated visual gate for a tokens-only DS.

## Repo gotchas
- The GitHub Pages workflow uploads the **whole repo root**, so `.design-sync/` is published as
  static files (harmless). `ds-bundle/` and `.ds-sync/` are gitignored and never reach Pages.

## Re-sync risks
- **Source drift**: any CSS edit in `index.html` changes the design system; re-run
  `node .design-sync/extract.mjs` before the driver (the driver does not run buildCmd itself).
- **Marker rename** in index.html breaks extract.mjs (see above) — by design, loudly.
- **Network**: only if a font file is deleted; otherwise fully offline.
- **conventions.md is hand-maintained**: it enumerates class names. If classes are renamed/removed
  in index.html, re-run the name check (grep each backticked `.class`/`--token` in
  `ds-bundle/_ds_bundle.css`) and fix the header — a stale name there makes the design agent emit
  unstyled markup.
- No `_ds_sync.json` render hashes exist (0 components); the anchor only tracks `styleSha`.
