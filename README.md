# Portfolio Website — Bernard Abaidoo

A React port of the **Moorben — Data, Web, Maps, Desktop** design, populated with the real
content from the previous portfolio (4 projects, About + Skills + stacks).

## Stack
- **Create React App 4** + React 17 (kept as-is to avoid an upgrade churn — the design is
  the point, not the toolchain).
- **matter-js** for the "logo bowl" physics canvas (replaces the CDN script in the template).
- **No Bootstrap, no Leaflet, no SASS** — all removed. The template's design has been
  extracted verbatim into `src/assets/css/moorben.css`.

## Scripts
On **Node 17+** (you're on Node 22) webpack 4 needs the legacy OpenSSL provider. The
`start` / `build` / `test` scripts in `package.json` set `NODE_OPTIONS=--openssl-legacy-provider`
for you (POSIX shells). On Windows, prefix commands manually:
`set NODE_OPTIONS=--openssl-legacy-provider && npm start`.

```bash
npm install
npm start    # dev server on http://localhost:3000
npm run build  # production build into ./build
```

## Content
All identity (name, tagline, email, social handles) lives in `src/site.js`. All
project + skill content lives in `src/data.js`. Edit those two files to update
the site — the components derive everything from them.

- `src/site.js` — name, monogram, tagline, email, GitHub, Twitter, location.
- `src/data.js` — `TABS`, `PROJECTS`, `ABOUT`, `SKILLS`, `STACKS`.

To add a project's Code / Details link, add `code: "https://github.com/..."` and/or
`url: "https://..."` to the project object — the card will show them automatically.

## File tree
```
src/
├── components/
│   ├── App.js          – state owner (active tab, theme)
│   ├── LogoBowl.js     – Matter.js physics canvas
│   ├── Profile.js
│   ├── Projects.js     – tabs + filtered card grid
│   ├── Skills.js       – about + skill bars + stack tags
│   ├── Contact.js
│   └── Footer.js
├── hooks/
│   ├── useHash.js
│   └── useTheme.js
├── assets/
│   ├── css/moorben.css     – template's full <style> block
│   └── img/uploads/        – project screenshots
├── data.js
├── site.js
└── index.js
```

## Notes
- The original template's hash-routed **Writing / Reader** section has been replaced
  by a real **Skills & Experience** section anchored at `#skills` (no real blog posts
  exist; the React page had About + Skills instead).
- LinkedIn was not present in the previous portfolio; Twitter replaces it.
- The bowl's "lit" icon sets map to your actual projects: only the `web` tab
  highlights web tech icons.
