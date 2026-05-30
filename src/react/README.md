# React UI Boundary

Issue 57 migrates the application shell to React while preserving the spreadsheet core.

## React-owned layer

- `src/main.ts` mounts the React application.
- `src/react/App.tsx` coordinates file actions, local-storage mode, formula editing, and selection state.
- `src/react/ribbon/` contains the React ribbon composition and small shadcn-style controls.
- `src/react/styles.css` owns Tailwind component classes through `@apply`.

## Framework-agnostic core

The spreadsheet engine remains under `src/lib/` and is not coupled to React. React talks to the core through the existing `UI` class.

`SpreadsheetSurface` is the adapter boundary:

1. It receives a DOM element from React.
2. It creates `new UI(element)`.
3. It forwards document change events to React state.
4. It exposes load/save and command execution through the existing `UI` API.

Formula evaluation, document import/export, rendering, and the `.ows` format stay inside `src/lib/`.
