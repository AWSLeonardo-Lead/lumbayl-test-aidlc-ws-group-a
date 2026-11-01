# Contract Design — Plan

> Project: clinic-leave | Depth: Minimal | No open questions — contracts are unambiguous from requirements and components.

## Boundaries Identified

1. **External REST HTTP API** — the entire app surface exposed to HTTP clients (clinic staff tools). Covers all 5 endpoints across U2 (doctors) and U3 (leave). Owner: the skeleton (U1) owns the server/app; the feature units own their route handlers. Mechanism: synchronous REST/HTTP over JSON.

2. **Shared Store Interface** — the TypeScript contract between U1 (which owns the store) and U2/U3 (which read/write it). Owner: U1 (skeleton). Mechanism: shared TypeScript module imported at compile time. This is a shared-schema contract; it is read-only for feature units (they do not redefine or replace it).

## Contract Ownership Rules

- The external API spec is owned jointly across units: U1 owns the auth/error envelope, U2 owns the /doctors paths, U3 owns the /leave paths.
- The shared store schema is owned exclusively by U1. Feature units import; they never redefine store shapes.
- Breaking-change policy: not applicable for this workshop project (no versioning, single team).
- Additive changes: consumers ignore unknown fields (standard JSON tolerance).
