# React UI Boundary

Issue 57 migrates the application shell to React while preserving the spreadsheet core.

## React-owned layer

- `src/main.ts` mounts the React application.
- `src/app/` owns the React application shell, app state, global styles, and test setup.
- `src/features/` groups user-facing feature areas such as the ribbon, formula bar, document I/O, and sheet surface.
- `src/shared/ui/` contains small shadcn-style primitives shared by features.
- `src/app/styles.css` owns Tailwind component classes through `@apply`.

## Framework-agnostic core

The spreadsheet engine remains under `src/lib/` and is not coupled to React. React talks to the core through the existing `UI` class.

`SpreadsheetSurface` is the adapter boundary:

1. It receives a DOM element from React.
2. It creates `new UI(element)`.
3. It forwards document change events to React state.
4. It exposes load/save and command execution through the existing `UI` API.

Formula evaluation, document import/export, rendering, and the `.ows` format stay inside `src/lib/`.
