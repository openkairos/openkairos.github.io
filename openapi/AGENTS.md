# OpenAPI Docs Instructions

## Scope

- Apply these instructions when working on `openapi/**`.
- Apply these instructions when changing the generated API-reference behavior that is sourced from the OpenAPI specification, templates, render model, or generation scripts.
- Do not apply these instructions to narrative documentation under `docs/**` unless the change is explicitly about how narrative docs integrate with the API reference.

## Source Of Truth

- Treat `openapi/<version>.yaml` files as the primary source of truth for published API contracts in this repository.
- Treat `openapi/templates/**` as the primary source of truth for the generated HTML API-reference presentation.
- Treat generated files under `static/openapi/**` as outputs.
- When the repository OpenAPI definition diverges from the Kairos product repository, resolve the discrepancy by checking the product source before normalizing the mismatch in docs.

## Editing Boundary

- Prefer editing the spec, templates, or render-model inputs over editing generated output.
- Do not patch generated HTML in `static/openapi/**` when the change belongs in:
  - `openapi/<version>.yaml`
  - `openapi/templates/**`
  - generation inputs or scripts
- Keep generation behavior deterministic so `npm run build:api` remains the canonical way to refresh the API-reference output.

## Version Alignment

- Narrative docs versions and API-reference versions should stay aligned.
- Each published docs version should resolve to its matching API reference version.
- If version-specific API output is incomplete or temporarily shared, document that limitation honestly and avoid inventing a branch-based ownership model.
- Do not let Git branch names define API-reference ownership.

## Iframe Model

- The generated API reference is served through versioned iframe-based pages under `/docs/<version>/api-reference`, with `src/pages/api-docs.jsx` kept as a compatibility redirect.
- Changes to the OpenAPI surface should preserve a usable iframe experience, including deep linking when applicable.
- When changing API-doc routing or structure, account for how narrative docs link into the iframe-served API surface.

## Review Rules

- Review spec changes for correctness, naming clarity, schema accuracy, and observable contract behavior.
- Review template changes for maintainability, consistency, and whether they belong in templates rather than generated output.
- Review generation changes for version alignment, deterministic output, and iframe compatibility.
- Reject changes that edit generated output directly when the real source of truth is upstream in the spec or templates.
