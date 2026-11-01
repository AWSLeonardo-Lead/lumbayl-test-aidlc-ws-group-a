# Unit Story Map — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- stories.md (US1–US3)
- unit-of-work.md (U1–U3)

## Assumptions & Open Questions

None.

---

## Story-to-Unit Map

| Story | Unit ID | Directory | Notes |
|---|---|---|---|
| US1.1 — Request authentication | U1 | u1-skeleton | Auth middleware lives in src/shared/auth.ts; skeleton verifies 401/403 responses |
| US2.1 — Add a doctor | U2 | u2-doctors | POST /doctors handler in src/features/doctors/ |
| US2.2 — List all doctors | U2 | u2-doctors | GET /doctors handler in src/features/doctors/ |
| US3.1 — Submit a leave request | U3 | u3-leave | POST /leave handler in src/features/leave/ |
| US3.2 — View my leave requests | U3 | u3-leave | GET /leave (doctor-filtered) in src/features/leave/ |
| US3.3 — Approve a leave request | U3 | u3-leave | PATCH /leave/:id (status=approved) in src/features/leave/ |
| US3.4 — Reject a leave request | U3 | u3-leave | PATCH /leave/:id (status=rejected) in src/features/leave/ |
| US3.5 — List all leave requests | U3 | u3-leave | GET /leave (manager, unfiltered) in src/features/leave/ |

---

## Cross-Cutting Concerns

| Concern | Where it lives | Units affected |
|---|---|---|
| Auth middleware (requireRole) | U1 — src/shared/auth.ts | U2, U3 import and apply it |
| In-memory store | U1 — src/shared/store.ts | U2 reads/writes doctors; U3 reads doctors and reads/writes leaveRequests |
| Error utilities | U1 — src/shared/errors.ts | U2, U3 use shared error response helpers |
| Zod validation | U1 — declared in package.json | U2, U3 define their own schemas using zod |

---

## Coverage Verification

All 8 stories assigned:
- US1.1 → U1 ✓
- US2.1, US2.2 → U2 ✓
- US3.1, US3.2, US3.3, US3.4, US3.5 → U3 ✓

All 3 units have rows:
- U1 (u1-skeleton): US1.1 ✓
- U2 (u2-doctors): US2.1, US2.2 ✓
- U3 (u3-leave): US3.1, US3.2, US3.3, US3.4, US3.5 ✓
