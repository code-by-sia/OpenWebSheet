# OpenWebSheet

OpenWebSheet is an open-source, web-based spreadsheet application. It runs in the browser, can be installed as a Progressive Web App (PWA), and stores spreadsheet documents in the project's `.ows` format.

[<img src="https://github.com/code-by-sia/OpenWebSheet/workflows/CI/badge.svg" alt="CI status" />](https://github.com/code-by-sia/OpenWebSheet/actions?query=workflow%3ACI)

## Demo and PWA installation

<img src="https://code-by-sia.github.io/OpenWebSheet/demo.png" alt="OpenWebSheet demo" />

1. Open the hosted app: <https://code-by-sia.github.io/OpenWebSheet/>
2. Install the PWA using the install icon in the browser address bar.
3. Download the sample file: <https://code-by-sia.github.io/OpenWebSheet/DEMO.ows>
4. Use the folder/load icon in the app to open the sample `.ows` file.

## Features

- React application shell with shadcn-style controls
- Canvas-based spreadsheet rendering
- Basic cell content editing
- Borders
- Merge and split cells
- Basic formula support
- Import/export support for the native `.ows` format
- PWA support

## Roadmap

- [x] Basic structure
- [x] Canvas rendering
- [x] Basic content editor
- [x] Borders
- [x] Merge and split
- [ ] Formula and expressions
  - [x] Basic support
  - [ ] Advanced features
- [x] Import/export
  - [x] Mathematical formulas
  - [ ] OpenOffice/OpenDocument format support
- [ ] Advanced UI features

## Project setup

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run type checking:

```sh
npm run typecheck
```

Run unit tests:

```sh
npm test
```

## Documentation

Additional documentation is available in the [`docs/`](docs/) directory:

- [Development guide](docs/development.md)
- [Architecture overview](docs/architecture.md)
- [UI structure](docs/ui-structure.md)
- [User guide](docs/user-guide.md)
- [Supported formats](docs/supported-formats.md)
- [Troubleshooting](docs/troubleshooting.md)

## Contributing

1. Create an issue or choose an existing one.
2. Create a focused branch for the change.
3. Keep changes small and reviewable.
4. Run tests, type checking, and the production build before opening a pull request.
5. Update documentation when behavior, setup, or architecture changes.

## License

OpenWebSheet is released under the [MIT License](LICENSE).
