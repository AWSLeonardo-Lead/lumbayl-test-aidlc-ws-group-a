# Logical Components — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- functional-spec.md (WF2.1, WF2.2, entities)
- security-design.md (auth boundary, validation pattern)
- tech-stack-decisions.md

## Assumptions & Open Questions

None.

---

## Component Inventory

All u2-doctors components live under `src/features/doctors/`. No shared files are created or modified.

| Component | File | Responsibility |
|---|---|---|
| DoctorsRouter | `src/features/doctors/router.ts` | Mount POST /doctors and GET /doctors; apply auth middleware to each route |
| DoctorsHandler | `src/features/doctors/handler.ts` (or inline in router) | Business logic — validate body (Zod), check uniqueness, read/write store |
| DoctorSchema | `src/features/doctors/schema.ts` (or inline) | Zod schema for POST /doctors body: `{ id: string, name: string }` |

---

## Component Interactions

**POST /doctors (manager-only):**
```
HTTP POST /doctors
  └─► DoctorsRouter
        ├─► requireAuth               [global in app.ts — U1 owned]
        │     → 401 (missing or empty headers)
        ├─► requireRole("manager")    [from src/shared/auth.ts — U1 owned]
        │     → 403 (wrong role)
        ├─► DoctorSchema.parse(body)  [Zod — U2 owned]
        │     → 400 (invalid body)
        └─► DoctorsHandler
              ├─► store.doctors        [from src/shared/store.ts — U1 owned]
              │     → 409 (duplicate id)
              └─► 201 { id, name }
```

**GET /doctors (any authenticated user):**
```
HTTP GET /doctors
  └─► DoctorsRouter
        ├─► requireAuth               [global in app.ts — U1 owned]
        │     → 401 (missing or empty headers)
        └─► DoctorsHandler
              └─► store.doctors        [from src/shared/store.ts — U1 owned]
                    → 200 Doctor[]
```

---

## Failure Domains

| Failure | Blast Radius | Isolation |
|---|---|---|
| Invalid request body | Single request; 400 returned before store access | Zod parse in handler |
| Duplicate doctor id | Single request; 409 returned before append | Uniqueness check in handler |
| Missing auth headers | Single request; 401 before handler runs | requireAuth middleware (global, U1) |
| Wrong role on POST | Single request; 403 before handler runs | requireRole middleware |

---

## Shared Resource Identification

| Resource | Owner | U2 access pattern |
|---|---|---|
| `store.doctors` | U1 skeleton | Read (GET) and append (POST) |
| `requireAuth()` | U1 skeleton | Applied globally in app.ts; GET /doctors relies on this for 401 coverage |
| `requireRole()` | U1 skeleton | Import and apply in router for POST /doctors only (403 on wrong role) |
| `src/shared/errors.ts` | U1 skeleton | Import error helpers as needed |

U2 must not edit any of these files; it only imports and calls them.

---

## ADR: No separate service layer

**Context:** U2 is a small two-endpoint feature. A separate service layer (router → service → repository) would add indirection without benefit.

**Decision:** Business logic (validation, uniqueness check, store access) lives directly in the handler or router file.

**Consequences:** Simpler code, fewer files. For a workshop unit of this size, the trade-off is appropriate.

**Alternatives rejected:** Three-tier (router/service/repository) — overcomplicated for two routes with no reuse.
