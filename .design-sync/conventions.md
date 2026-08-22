# Ana Morais site styles — how to build with this design system

The design system is the live site anamoraisedu.github.io (a Brazilian pedagogue's one-page site).
It ships two things: **the page's blocks as React components** (`window.AnaMoraisSiteStyles.*`) and
the **stylesheet + class vocabulary** they are built from. Copy is **pt-BR**.

## Components (the page, block by block)
`Nav`, `Hero`, `Stats`, `Sobre`, `Servicos`, `Metodo`, `Trajetoria`, `Contato`, `Footer`,
`WhatsAppFloat`, and `HomePage` (all of them in page order). **None take props** — each renders the
real site content. Use them to reproduce or rearrange the existing page; for a variation (new copy,
fewer cards, another section) **fork the block's JSX from its `.prompt.md`** and edit it — it is plain
markup on the classes below, nothing else. `ANA_PHOTO` (the profile photo as a data URI) is also
exported for `<img src={ANA_PHOTO} />`.

## Setup
- Link `styles.css` once. It pulls `fonts/fonts.css` (Fraunces + Nunito Sans, self-hosted) and
  `_ds_bundle.css` (every rule below). No provider, no wrapper, no theme setup.
- `body` already paints the warm paper background + grain overlay and sets Nunito Sans; `h1`–`h4`
  are Fraunces automatically. Don't set `font-family` yourself.
- Breakpoints are baked in: grids collapse at 960px, cards/stats go single-column at 680px.

## Tokens — always `var(--…)`, never raw hex
| Role | Tokens |
|---|---|
| Surfaces | `--paper` (page), `--paper-2` (tinted band), `--card` (cards) |
| Text | `--ink` (body/headings), `--ink-soft` (secondary), `--line` (borders) |
| Accents | `--clay`/`--clay-2` primary CTA · `--honey`/`--honey-2` highlight · `--sage`/`--sage-2` calm/success |
| Shape/motion | `--radius` (26px cards), `--shadow`, `--shadow-sm`, `--maxw` (1180px), `--ease` |

## Class vocabulary (the only legitimate class names — what the components are made of)
- **Layout**: `.wrap` (centered max-width container — wrap every section's content), `.section`
  (vertical rhythm), `.section-head` (+ `.eyebrow`, `h2`, `.lead`), `.cards` (3-col grid),
  `.stats` > `.stats-grid` > `.stat` (`.num`, `.lbl`), `.sobre-grid`, `.metodo-grid`, `.hero` >
  `.hero-grid` (+ `.hero-title`, `.hero-actions`, `.hero-figure`).
- **Type**: `.eyebrow` (uppercase clay label with a honey dash), `.lead` (soft intro paragraph),
  `.quote` (big Fraunces pull-quote, `<span class="mk">“</span>` opener), `.sig` (italic signature),
  `.hero-title em` (italic clay emphasis), `.trust` (icon + reassurance line).
- **Buttons**: `.btn` (clay, pill) · `.btn.ghost` (outline) · `.btn.honey` (honey). Inline `<svg>`
  inside is sized to 20px.
- **Nav**: `.nav` > `.wrap.nav-inner` > `.brand` (`<span class="mono">A</span>` + name + `<small>`),
  `.nav-links` (`<a>`s), `.nav-cta`. Under 960px `.nav-links` is hidden unless it also has `.open`;
  `.nav-toggle` is the hamburger.
- **Cards**: `.card` + one accent variant `.s1` (sage) / `.s2` (honey) / `.s3` (clay) — the variant is
  required, it drives the icon tint and hover bar. Children: `.ico` (60px icon tile), `h3`, `p`,
  `.who` (audience line, pushed to bottom), `.more` (link).
- **Panels/lists**: `.facts` (cream info panel: `h3` section labels, `.fact` rows with `.mk` marker +
  `.k` key + `<small>`, bullet `ul`), `.principles` > `.principle` (`.pn` icon, `h4`, `p`),
  `.timeline` > `.tl-item` (`.when`, `h4`, `.org`, `p`).
- **Chips**: `.chips` > `.tag` (white pill, optional 16px svg); `.chip-float` + `.dot` for
  floating badges over `.hero-figure` (positions `.cf1`/`.cf2`/`.cf3`).
- **Photo**: `.hero-figure` > `.photo-frame` > `img` (organic blob mask) with `.blob.b1`/`.blob.b2`
  behind.
- **Contact**: section `.contato` > `.contato-card` (dark gradient card) > `.contato-inner`
  (2-col), `.contato-actions`, `.contlist` (`<a>` rows with `.ci` icon tile + `<small>`).
- **Footer**: `footer` > `.wrap.foot` > `.brand`, `.foot-links`, `.foot-note`.
- **WhatsApp FAB**: `.wa-float` — invisible until it also has `.show`.

Section bands: `.servicos` and `.traj` tint a `.section` with `--paper-2` + hairlines.

## Where the truth lives
Read `_ds_bundle.css` (via `styles.css`) before styling anything new — every selector above is
there with its real values. Fonts: `fonts/fonts.css`.

## Idiomatic snippet (verified render)
```html
<section class="section servicos"><div class="wrap">
  <div class="section-head">
    <span class="eyebrow">Como posso ajudar</span>
    <h2>Serviços pensados para <em>cada estudante</em></h2>
    <p class="lead">Atendimento online, reforço e acolhimento.</p>
  </div>
  <div class="cards">
    <article class="card s1"><div class="ico">…svg…</div><h3>Atendimento online</h3>
      <p>Encontros individuais.</p><span class="who">Para famílias</span>
      <a class="more" href="#">Saiba mais →</a></article>
    <article class="card s2">…</article><article class="card s3">…</article>
  </div>
  <div class="hero-actions"><a class="btn" href="#">Falar no WhatsApp</a><a class="btn ghost" href="#">Ver currículo</a></div>
</div></section>
```
For your own glue, compose these classes and tokens; add new CSS only with `var(--…)` values.
