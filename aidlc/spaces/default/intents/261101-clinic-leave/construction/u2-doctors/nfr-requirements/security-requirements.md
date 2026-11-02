# Security Requirements — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1.1, FR1.2, NFR1, NFR2, NFR3)
- rules.md (BR2.1, BR2.3, BR2.6)
- functional-spec.md (WF2.1 auth steps)

## Assumptions & Open Questions

- No real authentication library is used; identity is header-only and trust is assumed (workshop constraint).
- No sensitive data is stored; Doctor records contain only id and name.

## Requirements

| ID | Category | Requirement | Implementation |
|---|---|---|---|
| NFR2.1 | Input validation | All POST /doctors request bodies must be validated with Zod before any business logic runs | Zod schema with required `id: string` and `name: string`; invalid input → HTTP 400 |
| NFR2.2 | Authorization | POST /doctors requires manager role; enforced before store access | `requireRole("manager")` middleware from `src/shared/auth.ts`; missing headers → 401, wrong role → 403 |
| NFR2.3 | Authorization | GET /doctors requires any authenticated user; header presence enforced | `requireRole` middleware checks both X-User-Id and X-User-Role presence; missing headers → 401. Implement as inline header-presence check or a multi-role overload — do NOT chain `requireRole("manager")` and `requireRole("doctor")` as separate middleware calls (each would reject the other role). |
| NFR3.1 | Data storage | All doctor data held in the shared in-memory store only | Read/write `store.doctors` from `src/shared/store.ts`; no file I/O, no external network calls |

## Out of Scope

- Real authentication tokens or session management (not applicable for workshop scope)
- Encryption at rest or in transit (local only, no deployment)
- Rate limiting or DDoS protection (local workshop)
- Input sanitization beyond Zod type checking (doctor records are opaque strings, no HTML rendering)
