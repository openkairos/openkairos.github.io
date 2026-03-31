# Kairos Docs

This repository contains the Open Kairos documentation website.

The site is generated with Docusaurus and published as one static site. Released documentation versions live side by side in this repository under `docs/<version>`.

## Public URL contract

- `/` serves the shared homepage
- `/docs/1.x` serves the `1.x` documentation
- future releases follow `/docs/<version>`

`/docs` is a version selector entry point, not the canonical route for the latest version. The current version is linked explicitly from the homepage and navbar.

## Product structure

The documentation reflects the product boundary:

- `Kairos` is the core Customer Data Platform
- `Aletheia` is the dashboard built on top of Kairos

The docs are organized in a capability-first structure so they can scale over time, while still making the Kairos and Aletheia ownership boundary explicit on the page.

## API reference model

The repository also publishes a generated API reference.

- The API reference is generated from `openapi/openapi.yaml` and `openapi/templates/**`.
- The generated output is served through an iframe-based page in the Docusaurus site.
- The primary editing surface for API docs is `openapi/**`, not `static/openapi/**`.
- Each published docs version should align with the corresponding API reference version.

## Local development

Requirements:

- Node.js 24.x
- npm 11.x

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

Build the generated API reference manually:

```bash
npm run build:api
```

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

## Version ownership

- Narrative docs versions are owned by `docs/<version>`.
- Published versions are declared in `versioned-docs/versions.js`.
- Version navigation behavior is configured in `versioned-docs/navigation/<version>.js`.
- Routing and multi-version registry behavior is defined in `versioned-docs/registry/registry.js`.
- Git branch names do not define published docs ownership.

## GitHub Pages setup

Publish the site with the GitHub Pages workflow in `.github/workflows/publish-site.yml`.

The deployment model is:

- one repository
- one static site build
- all released docs versions live side by side in that build
- generated API reference is included in the same site build
