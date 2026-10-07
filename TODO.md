# TODO — bracketed placeholders that must be filled before this site goes public

Every entry corresponds to a `[BRACKET]` from the spec copy deck. The site
renders these brackets **verbatim** on the page (per spec: "return as TODOs,
never invent"). Confirm each value with Bernard, then edit `src/data/*.js`
and remove the brackets.

## Identity & contact
- **Email `[EMAIL]`** — deck brackets it as a TODO. The site currently uses the address
  recovered from the previous portfolio (`bernard.k.abaidoo@gmail.com`) as a working
  default; confirm it is still correct → `src/data/site.js → SITE.email`.
- **LinkedIn URL** — `src/data/site.js → SITE.linkedin` is `null`. The hero and footer
  "LinkedIn" links are hidden until it is set.
- **CV file** — `/public/Bernard-Abaidoo-CV.pdf` is referenced by every Download CV
  button but the file does not exist yet. Add the PDF to `public/`.
- **OG image** — `/public/og.png` is referenced for Open Graph but does not exist yet.

## Projects (newest first)
- **Portfolio design concept** — renders `[2025]` as its year; confirm exact year.
- **Social Network prototype** — renders `[2024]` as its year; confirm exact year.
- **Video converter prototype** — renders `[YEAR]`.
- **React Calculator** — renders `[YEAR]`.
- **GitHub repo URLs** — all `code` links currently point to `https://github.com/billbern`
  (the profile). Replace with the actual repo URL per project once published.

## Experience timeline
- **Independent Fullstack Developer** — renders `[2021] — Present`; confirm start year.
- **MERN Stack Training Facilitator** — renders `[YEAR]` and `· [ORG]`; learner count
  `[N]` in the body copy.
- **AI Bootcamp · Hackathon Winner** — renders `[YEAR]`; `[N]` team size and `[M]`
  total teams in the body copy.
- **Started building software** — `2016` (not bracketed in deck; verified against
  previous portfolio copy).

## Highlights
- **Hackathon winner** — renders `[YEAR]`.
- **Trained [N] learners in MERN development** — `[N]` in the label.

## Screenshots
- The 4 screenshots in `src/assets/img/uploads/` were carried over from the previous
  React portfolio. If any contain stale names or branding from that era, recapture them
  (16:10). The design applies unified art direction (browser-chrome frame + per-project
  tinted background) around whatever image is dropped in.
