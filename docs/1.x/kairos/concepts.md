---
title: Platform Concepts
---

Kairos is the system of record for customer data operations inside the product suite.

## Core model

The platform revolves around a few stable concepts:

- Events: behavioral or operational facts produced by applications and systems
- Identities: identifiers that link activity to people, accounts, or devices
- Profiles: unified records built from events, attributes, and joins
- Segments: dynamic audiences defined from profile state and behavioral history
- Activations: outbound actions or downstream sync based on profile and segment state

## Why the platform exists

Kairos separates platform responsibilities from dashboard responsibilities.

That boundary matters because ingestion, identity resolution, and profile storage must stay reliable regardless of how teams choose to inspect or operate on the data. Aletheia can evolve as a dashboard without redefining the underlying model.

## Expected users

Kairos is typically touched by:

- Integration engineers wiring events and system data
- Platform teams defining collection and identity contracts
- Product and lifecycle teams consuming segments and audiences
- Systems that need APIs, exports, or event-driven workflows
