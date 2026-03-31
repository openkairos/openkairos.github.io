---
title: Data Ingestion
---

Kairos ingests customer data from applications, back-office systems, and imports.

Typical input sources include:

- application events
- transactional systems
- CRM records
- support systems
- offline imports
- enrichment providers

## Ingestion goals

An ingestion setup should preserve:

- stable event naming
- explicit identifiers
- timestamps with clear origin semantics
- enough metadata to support replay, debugging, and downstream activation

## Documentation guidance

When you document an ingestion flow in this repository, describe:

- the producer system
- the event or record shape
- the identity fields carried by the payload
- the profile attributes or workflows affected downstream
