---
title: System Model
---

Applies to: `Kairos and Aletheia`

The suite is designed around a clear system boundary:

- Kairos stores, computes, evaluates, and exposes customer data state.
- Aletheia presents, explores, and operationalizes that state for users.

This distinction matters because dashboard concerns should not redefine platform semantics, and platform concerns should not be documented as if they were merely UI features.

## Core model

The shared system revolves around:

- events
- identities
- profiles
- segments
- downstream activations
- analytics views derived from platform state
