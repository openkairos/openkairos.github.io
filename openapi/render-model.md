# Render Model Contract

## Purpose

This document defines the normalized rendering model that the Kairos docs UI should consume.

It is the contract between:

- the OpenAPI source and preprocessing step
- the rendered documentation templates
- the client-side behaviors for examples, Try-it, filtering, and download

The goal is to avoid binding the UI directly to raw generator context or ad hoc Mustache assumptions.

It is a source-of-truth artifact for implementation, not a brainstorming document.

## Design Principles

- keep the model UI-oriented, not generator-oriented
- resolve inheritance before rendering
- preserve links back to source entities where useful
- separate reusable components from rendered operation instances
- include enough information for copy-ready examples and Try-it
- exclude sensitive runtime values from the model

## Top-Level Shape

```json
{
  "meta": {},
  "servers": [],
  "auth": {},
  "tags": [],
  "operations": [],
  "webhooks": [],
  "components": {},
  "download": {}
}
```

## `meta`

Document-level metadata used in overview and page chrome.

### Fields

```json
{
  "title": "Open Kairos API",
  "summary": "A feature-rich OpenAPI example for Kairos documentation generation.",
  "description": "Kairos provides REST APIs...",
  "version": "1.0.0",
  "termsOfService": "https://kairos.example/legal/terms",
  "contact": {
    "name": "Kairos API Support",
    "url": "https://kairos.example/support",
    "email": "support@kairos.example"
  },
  "license": {
    "name": "GPL-3.0 license",
    "url": "https://github.com/openkairos/kairos?tab=GPL-3.0-1-ov-file#readme"
  },
  "externalDocs": {
    "description": "Platform guides and integration tutorials",
    "url": "https://kairos.example/docs"
  }
}
```

## `servers`

Normalized server objects for selection and example generation.

### Fields

```json
[
  {
    "id": "production",
    "urlTemplate": "https://api.kairos.example",
    "description": "Production API server",
    "variables": [],
    "defaultResolvedUrl": "https://api.kairos.example"
  }
]
```

### Variable shape

```json
{
  "name": "environment",
  "description": "Deployment environment",
  "defaultValue": "sandbox",
  "enumValues": ["sandbox", "staging", "prod"]
}
```

## `auth`

Document-level authentication inventory and rendering metadata.

### Fields

```json
{
  "schemes": [
    {
      "id": "bearerAuth",
      "type": "http",
      "scheme": "bearer",
      "displayName": "Bearer Authentication",
      "description": "HTTP Bearer authentication using the Authorization header.",
      "location": {
        "kind": "header",
        "name": "Authorization"
      },
      "scopes": [
        {
          "name": "users:read",
          "description": "Read users and profiles."
        }
      ],
      "flows": []
    }
  ],
  "defaultSchemeId": "bearerAuth"
}
```

### Notes

- `scopes` should be resolved from security requirements plus scheme definitions
- `flows` is mainly for OAuth2 and OpenID Connect display
- this section should be global, not copied per operation

## `tags`

Tag-first navigation and grouping metadata.

### Fields

```json
[
  {
    "id": "users",
    "name": "Users",
    "description": "User lifecycle management APIs.",
    "externalDocs": null,
    "operationIds": ["listUsers", "createUser", "getUserById", "updateUser", "deleteUser"]
  }
]
```

## `operations`

Fully normalized operations for rendering, examples, and Try-it.

### Fields

```json
[
  {
    "id": "listUsers",
    "kind": "path",
    "path": "/users",
    "method": "get",
    "summary": "List users",
    "description": "Returns a paginated list of users with filtering and embedding options.",
    "deprecated": false,
    "tags": ["Users"],
    "externalDocs": {
      "description": "Pagination guide",
      "url": "https://kairos.example/docs/pagination"
    },
    "servers": [],
    "security": [
      {
        "schemeIds": ["bearerAuth"],
        "scopes": ["users:read"]
      }
    ],
    "parameters": {
      "path": [],
      "query": [],
      "header": [],
      "cookie": []
    },
    "requestBody": null,
    "responses": [],
    "callbacks": [],
    "links": [],
    "examples": {
      "request": [],
      "response": []
    }
  }
]
```

### Parameter shape

```json
{
  "id": "limit",
  "name": "limit",
  "in": "query",
  "required": false,
  "description": "Maximum number of records to return.",
  "style": "form",
  "explode": true,
  "schemaRef": "#/components/schemas/Limit",
  "schema": {
    "type": "integer",
    "default": 20,
    "minimum": 1,
    "maximum": 100
  },
  "examples": [
    {
      "id": "default",
      "summary": "Default page size",
      "value": 20
    }
  ]
}
```

### Request body shape

```json
{
  "required": true,
  "description": "JSON payload for creating a user.",
  "content": [
    {
      "mediaType": "application/json",
      "schemaRef": "#/components/schemas/UserCreateRequest",
      "schema": {},
      "examples": [
        {
          "id": "standard",
          "summary": "Standard user creation",
          "value": {
            "email": "new.user@example.com",
            "name": "New User"
          }
        }
      ]
    }
  ]
}
```

### Response shape

```json
{
  "statusCode": "200",
  "description": "Paginated users response",
  "headers": [],
  "content": [
    {
      "mediaType": "application/json",
      "schemaRef": "#/components/schemas/UserListResponse",
      "schema": {},
      "examples": [
        {
          "id": "default",
          "summary": "Users page",
          "value": {}
        }
      ]
    }
  ],
  "links": [
    {
      "id": "GetUserById",
      "operationId": "getUserById",
      "description": "Use the first item in the collection as input to the user details endpoint."
    }
  ]
}
```

## `webhooks`

Normalized webhook entries rendered as first-class documentation items.

### Fields

```json
[
  {
    "id": "user.created",
    "kind": "webhook",
    "name": "user.created",
    "method": "post",
    "summary": "User created webhook",
    "description": "Sent whenever a new user is created in Kairos.",
    "tags": ["Webhooks"],
    "requestBody": {},
    "responses": []
  }
]
```

## `components`

Grouped reusable components for developer-first reference browsing.

### Fields

```json
{
  "schemas": [],
  "requestBodies": [],
  "responses": [],
  "parameters": [],
  "headers": [],
  "examples": [],
  "securitySchemes": [],
  "links": [],
  "callbacks": []
}
```

### Reusable component entry shape

```json
{
  "id": "User",
  "name": "User",
  "kind": "schema",
  "description": null,
  "sourceRef": "#/components/schemas/User",
  "schema": {},
  "examples": [],
  "usedBy": ["listUsers", "createUser", "getUserById"]
}
```

## `download`

Metadata required to produce a client-side single-file YAML download.

### Fields

```json
{
  "fileName": "dummyjson-testing.openapi.yaml",
  "sourceFormat": "yaml",
  "bundleStrategy": "static-single-file",
  "entrypoint": "openapi/openapi.yaml",
  "assetPath": "dummyjson-testing.openapi.yaml"
}
```

## Rendering Requirements Supported by the Model

This contract must support:

- overview rendering
- source-driven tag navigation
- source-driven operations and webhooks
- component reference pages
- server selection
- auth selection
- example generation inputs
- Try-it request building
- cross-linking between operations and components
- single-file YAML download metadata

## Non-Goals for V1

The first version of the render model does not need to include:

- persisted UI state
- live response history
- analytics metadata
- visual layout metadata

Those belong in the UI layer, not the normalized source model.
