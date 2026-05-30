# Troubleshooting

## The Dev Server Opens A Blank Page

Open the app at the Vite base path:

```text
http://127.0.0.1:5173/OpenWebSheet/
```

Opening `http://127.0.0.1:5173/` directly may not load the app because the project is configured for GitHub Pages under `/OpenWebSheet/`.

## Dependencies Fail To Install

Use a current Node.js 18+ runtime, then reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

Only remove `package-lock.json` when intentionally refreshing dependency resolution.

## Production Build Shows An Eval Warning

`npm run build` currently warns about direct `eval` in `src/lib/core/formula/Evaluator.ts`. This is known formula-engine behavior and does not fail the build.

## Tests Cannot Find DOM APIs

Vitest is configured with `jsdom` in `vite.config.ts`. If DOM APIs are missing, confirm tests are running through `npm test` and not through a bare TypeScript or Node command.

## GitHub Pages Assets Look Stale

Run a production build before publishing:

```bash
npm run build
```

The generated files in `docs/` are part of the static GitHub Pages deployment.
