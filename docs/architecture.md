# Architecture Overview

## High-Level Components

- React UI layer under `src/app`, `src/features`, and `src/shared`.
- Spreadsheet core logic under `src/lib/core`.
- Canvas rendering under `src/lib/rendering`.
- UI-to-core adapter logic under `src/lib/UI.ts` and `src/features/sheet`.
- Formula evaluation under `src/lib/core/formula`.
- Native `.ows` document import/export helpers under `src/features/document-io`.
- PWA integration through `src/registerServiceWorker.ts` and generated static assets.

## Design Principles

- Keep spreadsheet logic independent from UI frameworks.
- Minimize coupling between rendering and business logic.
- Allow future UI migrations without rewriting the spreadsheet engine.
- Keep React components small and composed by feature area.
- Keep reusable UI primitives in `src/shared/ui`.
- Keep Tailwind class composition in `src/app/styles.css`.

## Runtime Flow

1. `src/main.ts` mounts the React app.
2. `src/app/App.tsx` owns top-level UI state for file mode, selection, formula bar value, and active appearance.
3. `SpreadsheetSurface` creates the existing `UI` adapter with a DOM element.
4. `UI` creates the canvas renderer and a `UIHandlerController`.
5. Ribbon and formula bar actions call `UI.execCmd`, which forwards commands to the spreadsheet core.
6. The core document emits changes back through `UI.addOnChangeEventListener`, and React updates the ribbon/formula state.

## Future Direction

Advanced formula support, OpenDocument import/export, and richer spreadsheet interactions should extend the core APIs first, then expose those capabilities through the React features.
