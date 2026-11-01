# Logical Components — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- security-requirements.md, reliability-requirements.md, tech-stack-decisions.md
- functional-spec.md (W1–W4)
- contract-summary.md (C1, C2)

## Assumptions & Open Questions

None.

---

## Component Inventory

| Component | File | NFR patterns applied | Failure domain |
|---|---|---|---|
| App factory | `src/app.ts` | Auth middleware (NFR2.1–2.4); router mounting | Restarts with server |
| Server entry | `src/server.ts` | Localhost bind (NFR1.1, NFR2.5) | Process-level |
| Auth middleware | `src/shared/auth.ts` | requireAuth; requireRole; returns 401/403 | Inline; no external dependency |
| Shared store | `src/shared/store.ts` | In-memory (NFR3.1–3.3); reset() / seed() for test isolation | Module-level singleton; dies with process |
| Error utilities | `src/shared/errors.ts` | Zod error formatting (NFR2.3); 400 error envelope | Inline; pure function |
| Doctors router | `src/features/doctors/` (empty at skeleton) | Provided by u2-doctors | Mounted by App factory |
| Leave router | `src/features/leave/` (empty at skeleton) | Provided by u3-leave | Mounted by App factory |

## Isolation Notes

- The store is a module-level singleton. All feature units share the same instance within a process.
- The auth middleware and error utilities have no external dependencies; their failure domain is the same as the request lifecycle.
- The only shared resource is the store. Feature units never share code directly — only via the store module.

## Blast Radius

A defect in `src/shared/auth.ts` affects all endpoints. A defect in `src/shared/store.ts` affects all features. Both are in the skeleton unit, which is built and verified first — any defect here is caught before feature units start.
