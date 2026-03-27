# Repository Instructions

1. Follow the instructions in `~/.codex/AGENTS.md` if it exists.

## Introduction

This project is documentation for Open-Kairos. It uses Docusaurus as a static site generator and provides OpenAPI
reference through an iframe. The API documentation is generated based on Kairos-2 Template.

## Deployment Model

- `gh-pages-control` owns release policy, registry data, and deploy scripts.
- The current default branch hosts the dispatchable bridge workflows required by GitHub Actions.
- Deployable docs branches must not become the source of truth for global release ownership.
- Branch-local scripts should stay limited to what is necessary for local development and branch builds.
- Manual operators should use:
  - `🚀 Deploy Selected Docs Branch` on the current default branch
  - `🚀 Deploy All Deployable Docs Branches` on the current default branch
