# Kairos Docs

This repository contains only end-user documentation for Kairos.

The docs website is generated with Docusaurus and published to GitHub Pages with branch-based version paths.

## Version publishing model

Only these branches are deployed:

- `main`
- `*.x` (for example: `1.x`, `2.x`, `beta.x`)

Published paths:

- `main` -> `/docs/next`
- `1.x` -> `/docs/1.x`
- `2.x` -> `/docs/2.x`
- `beta.x` -> `/docs/beta.x`

Branches outside this policy (for example `feature/*`) are not deployed.

A version selector in the navbar is generated from `docs/versions.json` on the `gh-pages` branch.

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

The deploy workflow updates:

- `/docs/<version>/` for the current branch build
- `/docs/versions.json` for version navigation
- root redirects to `./docs/next/` (relative redirect, base-path safe)
