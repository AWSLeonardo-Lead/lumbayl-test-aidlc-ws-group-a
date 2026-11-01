# Security Design — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- security-requirements.md (NFR2.1–NFR2.5)
- performance-requirements.md (NFR1.1)
- functional-spec.md (W2, W3)
- contract-summary.md (C1)

## Assumptions & Open Questions

None.

---

## Authentication and Authorization Architecture

### Design: Header-based identity assertion (NFR2.1, NFR2.2, NFR2.4)

A single Express middleware function (`requireAuth`) runs on every route. It reads `X-User-Id` and `X-User-Role` from the request headers, validates their presence and the role value, then attaches the resolved identity to the request object. No external library, no JWT, no session.

```
// Interface-level sketch (implementation in code-generation)
interface AuthContext {
  userId: string;
  role: 'manager' | 'doctor';
}
// req.auth is set by requireAuth; route handlers read req.auth.role
```

A second composable middleware (`requireRole(role)`) enforces role at the route level. It is applied per-route, not globally, so the guard is co-located with the route it protects.

**Auth flow (from functional-spec W2/W3):**
1. `requireAuth`: missing `X-User-Id` → 401; missing `X-User-Role` → 401; role not in `['manager', 'doctor']` → 403; else attach context, `next()`.
2. `requireRole('manager')` or `requireRole('doctor')`: `req.auth.role !== required` → 403; else `next()`.

### Design: Input validation (NFR2.3)

All request body validation is performed with `zod` schemas at the route handler entry point. A shared error helper (in `src/shared/errors.ts`) formats zod validation errors into `{ error: string }` with HTTP 400. No route handler reads a body field without first validating it through a schema.

### Design: Localhost binding (NFR1.1, NFR2.5)

`src/server.ts` passes `"127.0.0.1"` as the host argument to `app.listen`. The test suite asserts that requests from an external IP are refused (or the test runner confirms the bind address by inspecting the server address object).

---

## Threat Model (workshop scope)

| Threat | Mitigated by |
|---|---|
| Missing identity headers | requireAuth → 401 (NFR2.1) |
| Wrong role accessing protected endpoint | requireRole → 403 (NFR2.2) |
| Unknown/spoofed role value | requireAuth role validation → 403 |
| Malformed request body | zod schema validation → 400 (NFR2.3) |
| Accidental external network exposure | 127.0.0.1 bind (NFR2.5) |

No secrets, credentials, or sensitive data are stored or transmitted. No CSRF, XSS, or session-fixation vectors exist in this API-only, no-browser project.
