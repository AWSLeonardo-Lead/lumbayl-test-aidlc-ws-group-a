# Domain Design — Plan

> Project: clinic-leave | Depth: Minimal | No open questions — architecture is unambiguous from requirements.

## Component Decomposition Approach

Three logical building blocks derived from the functional requirement groups (FR1, FR2, FR3):

1. **Auth** — cross-cutting authentication and role-based authorization middleware (FR1)
2. **Doctors** — doctor record management domain (FR2)
3. **Leave** — leave request lifecycle domain (FR3)

**Shared Store** is modelled as an external dependency (infrastructure code, no domain logic of its own).

## Entity Ownership

| Entity | Owner |
|---|---|
| Doctor | Doctors component |
| LeaveRequest | Leave component |

## Key Design Decisions

- **Auth is independent** — applied as middleware; Doctors and Leave depend on it for role enforcement.
- **Leave reads Doctor existence via the shared store** — not via Doctors component import, per the project rule "read another feature's data through `src/shared/store.ts`, never by importing another feature's code."
- **PATCH for status update** — partial update (`{ status }`) is semantically correct vs PUT (full replacement).
- **No deployment topology decision here** — that is Units Generation's job.
