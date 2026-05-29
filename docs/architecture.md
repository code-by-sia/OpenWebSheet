# Architecture Overview

## High-Level Components

- UI Layer (currently Vue-based)
- Spreadsheet core logic
- Canvas renderer
- Formula evaluation
- Import/export subsystem
- PWA integration

## Design Principles

- Keep spreadsheet logic independent from UI frameworks.
- Minimize coupling between rendering and business logic.
- Allow future UI migrations without rewriting the spreadsheet engine.

## Future Direction

A future React migration should focus on the UI layer only while preserving the existing spreadsheet core.