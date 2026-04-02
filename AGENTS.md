# Docs Repo Instructions

## Repository Scope

- The repository publishes the documentation site as one static site.
- The homepage is always served at `/`.
- Released documentation versions are served only under `/docs/<version>`.
- Documentation versions live in-repo under `docs/<version>`.
- Published versions are defined explicitly in `versioned-docs/versions.js`.
- Sidebar mode per version is defined in `versioned-docs/navigation/<version>.js`.
- The Docusaurus registry module lives in `versioned-docs/registry/registry.js`.
- Narrative documentation writing and editing rules live in `docs/AGENTS.md`.
- OpenAPI specification, template, and generated API-doc rules live in `openapi/AGENTS.md`.
- The rules in `docs/AGENTS.md` apply to published documentation under `docs/**`.
- The rules in `docs/AGENTS.md` also apply to homepage content published from `src/pages/index.js` and `src/components/HomepageFeatures/**`.
- The rules in `openapi/AGENTS.md` apply to `openapi/**` and to generated API-reference behavior when the source of change is the OpenAPI surface.
- The rules in `docs/AGENTS.md` and `openapi/AGENTS.md` do not apply to `README.md` unless explicitly requested.

## Routing Policy

- Keep the public URL contract consistent between local development and GitHub Pages publication.
- Treat `/` as the canonical homepage.
- Treat `/docs/<version>` as the canonical docs URL for every published version.
- Treat `/docs` as an entry point, not as a canonical latest-docs route.
- Keep migration or compatibility notes inside the version where they apply.
- Git branch names must not affect docs routing, search scope, or version ownership.

## Deployment Model

- The site is built once and deployed once to GitHub Pages.
- Version ownership must come only from `versioned-docs/versions.js` and the `docs/<version>` tree.
- Repository code outside `versioned-docs` should stay limited to configuration, content, workflow YAML, runtime UI code, and API-doc generation support.
- Keep the top-level workflow set limited to:
  - [`ci.yml`](./.github/workflows/ci.yml)
  - [`publish-site.yml`](./.github/workflows/publish-site.yml)

## OpenAPI Reference Model

- The API reference is generated from versioned OpenAPI specs under `openapi/<version>.yaml` and related templates.
- The generated API reference is served through versioned iframe-based pages under `/docs/<version>/api-reference`, with `src/pages/api-docs.jsx` kept as a compatibility redirect.
- Generated output under `static/openapi/**` is a build artifact surface, not the primary authoring surface.
- Source-of-truth edits for the API reference belong in:
  - `openapi/<version>.yaml`
  - `openapi/templates/**`
  - render-model inputs and generation scripts when needed
- Do not treat generated HTML in `static/openapi/**` as the preferred place for manual edits.
- Each published docs version should resolve to the matching API reference version.
- If version-specific API output is not yet fully implemented, document the gap honestly and do not normalize a branch-based ownership model.

## Major Releases

- Add the new major release content under `docs/<version>`.
- Register the version in `versioned-docs/versions.js`.
- Add the corresponding navigation config in `versioned-docs/navigation/<version>.js`.
- Preserve the `/docs/<version>` route contract and do not introduce a special latest-docs route.
- Keep the homepage at `/` and update homepage content only when the published recommendation changes.
- Validate the full site after the version is added with the repository validation pipeline.
- Ensure the release also has a corresponding API reference plan, even if the API-doc generation work lands separately.

## Review Routing

- Review documentation-content PRs against `docs/AGENTS.md`.
- Review OpenAPI spec, template, generation, and iframe API-doc PRs against `openapi/AGENTS.md`.
- Review repository-wide, configuration, routing, deployment, and release-process PRs against this root `AGENTS.md`.
- If a PR mixes narrative docs, OpenAPI generation, and repository-wide structural changes, evaluate each part against the corresponding instructions and challenge the scope if the PR becomes incoherent.

## Agent Roles

- The repository uses separate Author and Editor agents under `.github/agents/`.
- The docs author agent is responsible for generating and restructuring narrative documentation and homepage content.
- The docs editor agent is responsible for reviewing, editing, and refining narrative documentation produced by others.
- The OpenAPI editor agent is responsible for reviewing and refining the OpenAPI specification, templates, and generated API-doc behavior.
- All agents should defer to this file for repository-wide rules and to the relevant local instruction file for the surface they are editing.

## Code Review

- For narrative documentation PRs, review for correctness, information source quality, flow, examples, structure, and product positioning based on `docs/AGENTS.md`.
- For OpenAPI reference changes, review for spec correctness, template discipline, generation boundaries, and version alignment based on `openapi/AGENTS.md`.
- For repository-wide changes, review for routing integrity, version ownership, deployment constraints, API-reference integration, and workflow correctness based on this file.
- Do not approve a PR that violates the published route contract or version ownership model.
- Do not approve a PR that edits generated API output directly when the change should have been made in the spec, templates, or generation inputs.
