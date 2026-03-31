---
title: Run the Local Stack
---

This guide is for teams who want the shortest path to a working local environment.

## Goal

Bring up:

- Kairos as the platform service
- Aletheia as the dashboard
- MongoDB as the backing store

## Flow

1. Generate a local application key.
2. Start the Docker Compose stack.
3. Wait for Kairos to report healthy.
4. Open Aletheia and validate that the dashboard can reach the platform-backed data surface.

If Aletheia is available but expected data is missing, debug the Kairos service and seed flow first. The dashboard should be treated as a consumer of platform state, not as the first debugging target.
