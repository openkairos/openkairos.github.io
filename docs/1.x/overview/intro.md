---
title: Introduction
---

Kairos is the core Customer Data Platform. It collects customer events, unifies identities, maintains profiles, powers segmentation, and exposes the APIs that downstream systems depend on.

Aletheia is the dashboard for that platform. It gives operators, analysts, and growth teams a working surface for exploring the data stored in Kairos, reviewing audiences, and following operational workflows without living in raw APIs.

Think of the relationship the same way teams think about Elasticsearch and Kibana:

- Kairos is the data and execution platform.
- Aletheia is the dashboard and operational interface built on top of that platform.

## What lives in Kairos

Kairos owns the platform concerns:

- Data ingestion from applications, systems, and imports
- Identity resolution across known and anonymous activity
- Customer profiles and profile enrichment
- Segments, audience logic, and activation triggers
- APIs, webhooks, and integration contracts

## What lives in Aletheia

Aletheia owns the user-facing working experience:

- Profile exploration
- Segment inspection
- Analytics and dashboard views
- Operator workflows around audiences and customer data
- Shared visibility for marketing, operations, and product teams

## Read this documentation

This documentation is split by responsibility:

- `Getting Started` brings up a local Kairos and Aletheia stack together.
- `Kairos` covers platform capabilities, concepts, and integrations.
- `Aletheia` covers dashboard workflows and operational usage.
- `Guides` explain end-to-end flows that span both products.
- `Reference` covers APIs, configuration, and environment details.
