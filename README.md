# Kairos Docs

This repository contains only end-user documentation for Kairos.

The docs website is generated with Docusaurus and published to GitHub Pages with a default-branch-owned homepage and docs root.

## Version publishing model

The current default branch is configured in `docs-site.config.js`.

Only these branches are deployable:

- `main`
- `*.x` (for example: `1.x`, `2.x`, `beta.x`)

Published paths:

- default branch -> `/`
- default branch docs -> `/docs`
- `main` -> `/docs/next`
- non-default release branches -> `/docs/<version>`

Branches outside this policy (for example `feature/*`) are not deployed.

A version selector in the navbar preserves the current docs page when the target version contains it and otherwise falls back to the configured entry page.

## Local development

Requirements:

- Node.js 24.x
- npm
- `.npmrc` enforces `engine-strict=true` (installation fails on non-24 Node runtimes)

Install dependencies:

```bash
npm install
```

Run the docs locally:

```bash
npm run start
```

Local development defaults to the configured default branch. To simulate `main` locally:

```bash
DOCS_CURRENT_BRANCH=main npm run start
```

Run docs with API template hot reload:

```bash
npm run dev
```

This runs:

- Docusaurus dev server (`npm run start`)
- OpenAPI generator watcher (`npm run watch:api`)

The watcher regenerates `static/openapi` whenever you edit:

- `openapi/openapi.yaml`
- `openapi/templates/kairos/**/*.mustache`

The generated API docs now use `openapi/templates/kairos` as the canonical custom template directory.

So changes to API templates are reflected at `/api-docs` without manually re-running generation.

Build static files:

```bash
npm run build
```

Serve the built site:

```bash
npm run serve
```

Run validation:

```bash
npm run validate
```

## GitHub Pages setup

Set GitHub Pages source to the `gh-pages` branch root.

The deploy workflow is manual and updates:

- `/` and `/docs/` for the default branch build
- `/docs/next/` for `main`
- `/docs/<version>/` for other release branches
- `/docs/versions.json` for version navigation
- `/docs/doc-paths.json` for context-preserving version switching
