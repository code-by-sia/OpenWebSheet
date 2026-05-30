# Supported Formats

## Current Format

### `.ows`

OpenWebSheet's native format stores workbook data as JSON. It is the only supported import/export format today.

Supported data includes:

- Sheets and cells
- Cell values
- Basic formulas
- Merged cells
- Cell appearance used by the current renderer

## Planned

- OpenDocument Spreadsheet (`.ods`)

## Notes

- `.ows` is intended for OpenWebSheet interoperability, not compatibility with other spreadsheet applications.
- `.ods` support is tracked separately and should include fixtures and interoperability tests when implemented.
- Unsupported features should fail gracefully and be documented as format support expands.
