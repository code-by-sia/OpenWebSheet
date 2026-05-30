# Development Guide

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

The development app is served from the Vite base path:

```text
http://127.0.0.1:5173/OpenWebSheet/
```

## Build

```bash
npm run build
```

The production build writes static assets to `docs/` so GitHub Pages can serve the app.

## Testing

```bash
npm test
```

Use watch mode while working on UI behavior:

```bash
npm run test:watch
```

## Type Checking

```bash
npm run typecheck
```

## Useful Scripts

- `npm run dev`: start the local Vite server.
- `npm run build`: create the production build in `docs/`.
- `npm run preview`: preview the production build locally.
- `npm test`: run Vitest once.
- `npm run typecheck`: run TypeScript without emitting files.

## Contribution Workflow

1. Create an issue.
2. Create a branch.
3. Implement changes.
4. Run tests and type checking.
5. Run the production build when changing UI, assets, or configuration.
6. Open a pull request with a summary and verification notes.

## Build Warning

The production build currently reports a direct `eval` warning from `src/lib/core/formula/Evaluator.ts`. The warning is known, and the build still succeeds. Changes to the formula engine should address that warning deliberately instead of hiding it in unrelated work.
