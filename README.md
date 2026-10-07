# Portfolio — Bernard Abaidoo

Recruiter-facing portfolio site built with React 17 + Tailwind CSS 2 on
Create React App 4 (via CRACO). Single-page React Router app with a
case-study subroute `/work/:slug`.

## Stack
- React 17, react-router-dom 5.x
- Tailwind CSS 2 (via `@tailwindcss/postcss7-compat` + `@craco/craco@7`)
- No UI frameworks, no animation libraries (CSS keyframes for marquee + reveal)
- Font Awesome: no. Inline SVG brand paths for the marquee (16 paths total, ~15 KB).
- Hosted-fonts: Space Grotesk + JetBrains Mono via Google Fonts (preconnect + display=swap)

## Scripts
On Node 17+ webpack 4 needs the OpenSSL legacy provider. The `start` / `build` /
`test` scripts set `NODE_OPTIONS=--openssl-legacy-provider` for you (POSIX).
On Windows: `set NODE_OPTIONS=--openssl-legacy-provider && npm start`.

```bash
npm install
npm start       # http://localhost:3000
npm run build   # ./build ready for static deploy
```

## Editing content
All identity (name, email, GitHub, LinkedIn, CV) lives in `src/data/site.js`.
All projects / experience / skills / highlights live in `src/data/*.js`.
Brand paths used in the marquee are hardcoded inline in `src/data/marqueeIcons.js`.

## Routing / hosting notes
This is a SPA. When deploying to a static host that doesn't auto-rewrite
unknown paths to `/index.html` (e.g. GitHub Pages), the included
`public/404.html` is a fallback that stores the requested URL in
`sessionStorage` and bounces back to `/index.html`, which the client router
then resolves.

For hosts that already rewrite to `index.html` (Vercel, Netlify, Cloudflare Pages),
the 404 trick is harmless.

## Files of interest
- `src/components/App.js` — router shell
- `src/pages/Home.js` — assembles all home sections
- `src/pages/CaseStudy.js` — case-study template
- `src/data/*.js` — all copy (identity, projects, experience, highlights, skills, brand paths)
- `src/assets/css/index.css` — tokens, components, motion
- `tailwind.config.js` / `craco.config.js` — toolchain wiring

## Known gaps
See `TODO.md` for the list of `[BRACKET]` placeholders that need to be resolved
before this goes to production.
