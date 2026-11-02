# Security Design — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- security-requirements.md (NFR2.1–NFR2.3, NFR3.1)
- functional-spec.md (WF2.1, WF2.2)
- contract-summary.md (C1 REST contract)

## Assumptions & Open Questions

- Authentication trust is delegated entirely to header values; no token verification or replay protection is required (workshop constraint).
- Doctor `id` and `name` are opaque strings; no sanitization beyond Zod type checking is needed (no HTML rendering path).

---

## Authentication and Authorization Design

### Pattern: Header-only identity (workshop)

All requests carry identity via two HTTP headers:

| Header | Purpose |
|---|---|
| `X-User-Id` | Caller identity — any non-empty string |
| `X-User-Role` | Caller role — `manager` or `doctor` |

Both headers must be present. If either is missing, `requireAuth()` (applied globally in `app.ts`, U1 owned) returns HTTP 401 before the route handler runs. This enforces NFR2.2 and NFR2.3.

### POST /doctors — manager-only (NFR2.2)

```
Request → requireAuth [global, app.ts] → [401 if headers absent] → requireRole("manager") → [403 if role ≠ "manager"] → handler
```

The middleware call is `requireRole("manager")`. No other role may reach the handler.

### GET /doctors — any authenticated user (NFR2.3)

```
Request → presence-only check → [401 if headers absent] → handler
```

Because GET /doctors accepts any role, the implementation must check header presence only — it must NOT chain `requireRole("manager")` and `requireRole("doctor")` sequentially (each call rejects the other role). The correct pattern is either:
- A dedicated `requireAnyRole()` helper, or
- Inline header-presence check: verify both headers exist, then proceed regardless of role value.

This design decision is pre-approved by the functional spec (WF2.2 note) and NFR requirements (NFR2.3 updated implementation note).

---

## Input Validation Design

### Pattern: Zod schema at request boundary (NFR2.1)

A Zod schema is declared in the doctors feature and validated before any business logic runs on POST /doctors. Validation errors are caught and returned as HTTP 400 with a structured body; the store is never read or written on a validation failure.

```typescript
// Illustrative — implementation in code-generation
const DoctorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});
```

Validation is the responsibility of u2-doctors; the schema lives inside `src/features/doctors/`. No validation is delegated to the shared store or shared auth.

---

## Data Storage Security Design

### Pattern: In-memory store, no persistence (NFR3.1)

Doctor records are held exclusively in `store.doctors` from `src/shared/store.ts`. There is no file system write, no external network call, and no serialization to disk. This eliminates at-rest encryption concerns and SQL injection surface entirely.

The store is write-once-per-record (append-only). `store.reset()` is used only in tests.

---

## Security Boundary Summary

| Boundary | Mechanism | Owner |
|---|---|---|
| Authentication (header presence) | `requireAuth()` in `app.ts` (global middleware) | U1 skeleton |
| Authorization (POST — manager only) | `requireRole("manager")` applied in u2-doctors router | U2 doctors |
| Authorization (GET — presence only) | Inline header check or `requireAnyRole()` in u2-doctors router | U2 doctors |
| Input validation (POST body) | Zod `DoctorSchema` in `src/features/doctors/` | U2 doctors |
| Data isolation | In-memory store via `src/shared/store.ts` | U1 skeleton |
