---
title: Introduction
---

Open Kairos is documented around system concepts and workflows rather than around product package boundaries.

That keeps the documentation scalable as the platform grows. Readers should be able to start from a capability such as identity resolution, segmentation, analytics, or operations, then understand how Kairos and Aletheia each participate in that capability.

## Product relationship

Kairos is the core Customer Data Platform. It collects events, unifies identities, maintains profiles, drives segmentation, and exposes APIs and execution surfaces.

Aletheia is the dashboard built on top of that platform. It helps teams inspect data, analyze audience state, and move through operational workflows without working directly from raw APIs.

Think about the relationship the same way teams think about Elasticsearch and Kibana:

- Kairos owns the platform model and execution concerns.
- Aletheia owns the dashboard and user-facing working surface.

## How to read this documentation

The top-level structure is capability-first:

- `Overview` explains the products and the system model.
- `Getting Started` gets a local stack running.
- `Concepts` explains the shared model and ownership boundaries.
- `Data Collection`, `Profiles and Identity`, `Audiences and Segmentation`, and `Analytics and Insights` cover core product capabilities.
- `Guides` cover end-to-end workflows.
- `Reference` covers APIs and configuration details.

Each page should make its applicability clear:

- `Applies to: Kairos`
- `Applies to: Aletheia`
- `Applies to: Kairos and Aletheia`
