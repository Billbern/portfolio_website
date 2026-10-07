# Changelog — vs the previous (Moorben-derived) design

| Change | Rationale |
|---|---|
| Rebrand: Moorben → **Bernard Abaidoo** | Spec audience is recruiters / hiring managers; the previous brand is irrelevant to them. |
| **Dark + light theme tokens** added | Spec requires both themes; the previous build was dark-only. |
| Typography swap: Bricolage/Instrument/IBM Plex → **Space Grotesk + JetBrains Mono** | New spec typography. |
| Skills bars → **canonical-named chip groups** | Spec: "NO skill bars, no percentages" + canonical casing everywhere. |
| `simple-icons` (5 MB import) → **16 inline brand paths** | Bundle size / Lighthouse Performance target. Was bloating the vendor bundle to 2.1 MB gzipped. |
| **Matter.js physics bowl removed** | New spec has a marquee + browser-chrome thumbnails instead. |
| **Tailwind CSS v2** added (via CRACO) | Spec calls for Tailwind. CRA 4 hardcodes its PostCSS plugins; CRACO injects Tailwind. |
| `react-router-dom@5` added for `/work/:slug` | Spec requires case-study routes. |
| Contact section: form removed, **buttons + mailto + CV** only | Spec: recruiters verify in one click; no client-facing form. |
| Freelance clients: full section → **single demoted muted line** | Spec: freelance is secondary; one line only. |
| Casing: `nodejs/postgreSQL/javascript` → **canonical (Node.js, PostgreSQL, JavaScript)** | Spec: canonical casing everywhere. |
| Case-study template + **Social Network prototype filled example** | Spec deliverable. |
| **TODO.md** + this changelog | Spec deliverables. |
| Light `accent` #B96F10 → **#9A5C0C**, light `ok` #1F8F5F → **#187A50** | Spec labelled #B96F10 "AA on light" but it computes 3.70:1 on #F7F8FA — fails the spec’s own AA DoD. Darkened minimally (4.87:1) preserving hue. Same for #1F8F5F (4.08:1 → 4.83:1). |
| LinkedIn buttons **hidden until `SITE.linkedin` is set** (spec asks for them) | No real URL exists; inventing one is forbidden. Documented in TODO.md — buttons appear automatically once configured. |
| Marquee `CSS3` chip → **`CSS` slug** (verified paths) | simple-icons v16 upstream removed/renamed the CSS3 export; `siCss` is the current official slug. All 16 paths verified byte-for-byte against `npm pack simple-icons@16.34.0`. |
| Build toolchain: **@craco/craco@6.4.5** + pinned **babel-preset-react-app@10.0.0** | CRACO 7 requires CRA ≥ 5 (we're on CRA 4); npm re-resolved `^10.0.0` to 10.1.0 which peers on Babel ≥ 7.16 while react-scripts pins nested `@babel/core@7.12.3` — build crashed until pinned back. |
| **Scroll restoration + reveal re-scan on route change** added to App shell | Spec demands keyboard/navigation correctness; sections mounted after the first route (Home opened from a case study) would otherwise stay at opacity 0 forever. |
| **404.html SPA fallback** added to `public/` | Spec routes live at `/work/:slug`; static hosts that don't rewrite to index.html (GitHub Pages) need it. Vercel/Netlify rewrites make it inert. |
| **Adinkra watermark layer** (4 symbols via `AdinkraMark` + CRA SVGR) re-mapped: Hero→empty, Work→Nkyinkyim, Experience→Sankofa, Skills→Adinkrahene, Contact→Dwennimmen | Decorative texture belongs beside content sections, not behind the hero's primary CTA. Hero stays clean; colophon documents the mapping. |
| Per-symbol normalization: sizes 220/240/240/220px (≥1440), 190px at 1280–1439; opacities dark 0.05/0.06/0.05/0.05, light 0.07/0.08/0.07/0.07 (ceiling 0.10) | Equal perceived weight across symbols of different stroke density; optically tuned ±0.01 by squint test. Renders only ≥1280px, `display:none` below. |
| Edge bleed reduced 50% → **20%** of symbol width via `calc(var(--wm-w) * -0.2)`; hosts use `overflow: clip` | Spec's ≤20% bleed; calc keeps offsets exact when the size media-query overrides `--wm-w`. `clip` avoids creating a scroll container. |
| Footer restructured to **two rows**: ©+glyph \| links (baseline, nowrap), verbatim Adinkra colophon on its own row below | Owner-requested colophon mapping all four symbols; links must never orphan-wrap at ≥md. |
| Structural polish subset: work grid gap 20→24px + rows 7+5/7+5 + `align-items:start`, section-header gap mb-6→mb-8, `.tag` `white-space:nowrap`, Highlights gap-5→gap-6, chip "Machine Learning fundamentals"→"Machine Learning" | Design-system gutters (24px), aligned grid columns, no single-word chip wraps. |
