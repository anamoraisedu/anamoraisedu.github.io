# design-sync notes — anamoraisedu.github.io

This repo is a **static one-page site** (single `index.html` with inlined CSS/JS, no package.json,
no React, no Storybook). It is synced to claude.ai/design as: the stylesheet + fonts, **plus the page's blocks as React
components** (Nav, Hero, Stats, Sobre, Servicos, Metodo, Trajetoria, Contato, Footer, WhatsAppFloat,
HomePage — 11, zero props) so the page can be iterated on in Claude Design. First sync 2026-08-21
(tokens-only), components added the same day, into project
`fc87db2f-7aff-4b17-8492-82ac5e84166b` ("anamoraisedu.github.io").

## How the package is generated
- `.design-sync/pkg/` is an npm-shaped package the converter consumes: `package.json`
  (name `ana-morais-site-styles`, main `index.jsx`, types `index.d.ts`), `styles.css` + `fonts/`,
  and **generated** `src/<Name>.jsx`, `src/assets.js`, `index.jsx`, `index.d.ts`, `docs/<Name>.md`.
- **HTML → JSX is mechanical** (extract.mjs): `<body>` is split into its top-level elements
  (sections inside `<main>` are split too), each mapped to a component name via `NAME_BY_KEY`
  (id → class → tag). **A new top-level block in index.html fails the script until it's added to
  `NAME_BY_KEY` + `DESCRIPTION`** — by design. Attribute mapping: class→className, for→htmlFor,
  hyphenated SVG attrs → camelCase, `style="…"` → object, `assets/ana.jpg` → `ANA_PHOTO` data URI
  (any other `assets/` reference fails loudly). `data-reveal/item/hero/float/count/suffix` (GSAP
  hooks) are stripped. Newlines between inline text and a tag become `{" "}` so spacing matches HTML.
  `WhatsAppFloat` gets `.show` added (the page's JS adds it after load).
- `docs/<Name>.md` carries `category: Site` (→ `components/site/`) and the block's JSX source, so the
  design agent can fork a block. `guidelinesGlob: []` keeps those docs out of `guidelines/`.
- `.design-sync/node_modules` is a symlink → `../.ds-sync/node_modules` (gitignored; recreate per
  clone) so ts-morph finds `@types/react` when parsing `index.d.ts`.
- Previews (`.design-sync/previews/<Name>.tsx`) are one `Default` cell each. `WhatsAppFloat`'s wraps
  the FAB in a `transform`ed box so `position:fixed` resolves inside the card. All cards are
  `cardMode: single` with a per-block viewport (cfg.overrides).
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
- `[DTS_REACT]` only appears if the `.design-sync/node_modules` symlink is missing — recreate it.
- `_ds_bundle.css fonts: … 4 dead @font-face block(s) dropped` — they're relocated to
  `fonts/fonts.css`, which `styles.css` imports.
- validate `tokens: 21 defined, 20 referenced` — includes the per-element locals
  (`--bg`/`--fg` on .btn, `--accent`/`--accent-ink` on .card); one is only set, never read.

## Verification done
- `package-validate.mjs` exits 0; render check 11/11 clean; every cell graded `good` on the absolute
  rubric from `_screenshots/review/` (the blocks are the site's own markup, so "plausible" is trivially
  met — the check is fonts/tokens/layout completeness).
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
- The bundle inlines the 210 KB photo as a data URI (~316 KB bundle). If the photo changes, the
  bundle changes — expected.
- `extract.mjs` parses HTML with regexes. It is exact for THIS page (well-formed, no inline handlers,
  no `<` in text). If index.html grows inline `onclick=` or unusual markup, check the JSX output.
