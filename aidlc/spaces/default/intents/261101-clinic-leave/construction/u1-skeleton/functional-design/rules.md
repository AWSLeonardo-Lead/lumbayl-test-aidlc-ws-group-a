# Business Rules — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1.1, FR1.2, NFR1, NFR2, NFR3)
- contract-summary.md (C2)

## Assumptions & Open Questions

None.

---

```yaml
rules:
  - id: BR1.1
    statement: "A request missing the X-User-Id header is rejected with HTTP 401."
    category: authorization
    applies_to: Auth middleware (all endpoints)
    trigger: Every inbound HTTP request
    logic: >
      IF X-User-Id header is absent or empty
      THEN respond { error: "Unauthorized" } with HTTP 401 and do not proceed to route handler
    violation_behaviour: HTTP 401 with JSON error body
    source: FR1.1

  - id: BR1.2
    statement: "A request missing the X-User-Role header is rejected with HTTP 401."
    category: authorization
    applies_to: Auth middleware (all endpoints)
    trigger: Every inbound HTTP request
    logic: >
      IF X-User-Role header is absent or empty
      THEN respond { error: "Unauthorized" } with HTTP 401 and do not proceed to route handler
    violation_behaviour: HTTP 401 with JSON error body
    source: FR1.1

  - id: BR1.3
    statement: "A request whose X-User-Role value is not 'manager' or 'doctor' is rejected with HTTP 403."
    category: authorization
    applies_to: Auth middleware (all endpoints)
    trigger: Request with both headers present
    logic: >
      IF X-User-Role value is neither "manager" nor "doctor"
      THEN respond { error: "Forbidden" } with HTTP 403 and do not proceed to route handler
    violation_behaviour: HTTP 403 with JSON error body
    source: FR1.2

  - id: BR1.4
    statement: "A request whose X-User-Role does not match the required role for an endpoint is rejected with HTTP 403."
    category: authorization
    applies_to: Role-restricted endpoints (requireRole middleware)
    trigger: Request reaching a role-guarded route handler
    logic: >
      IF the endpoint requires role R
      AND X-User-Role ≠ R
      THEN respond { error: "Forbidden" } with HTTP 403 and do not proceed to route handler
    violation_behaviour: HTTP 403 with JSON error body
    source: FR1.2

  - id: BR2.1
    statement: "The server must listen exclusively on 127.0.0.1, never on 0.0.0.0."
    category: constraint
    applies_to: src/server.ts
    trigger: Server startup
    logic: >
      Bind the TCP socket to host "127.0.0.1" and port 3000.
      Never use "0.0.0.0" or omit the host (which defaults to 0.0.0.0 in Node.js).
    violation_behaviour: Non-conforming server startup is a defect caught by tests
    source: NFR1

  - id: BR2.2
    statement: "All data lives in the shared in-memory store; no external persistence is permitted."
    category: constraint
    applies_to: src/shared/store.ts and all feature units
    trigger: Any read or write operation on doctors or leaveRequests
    logic: >
      All reads and writes go through store.doctors and store.leaveRequests.
      No file I/O, no database connections, no HTTP calls to external services.
      store.reset() clears both collections; store.seed() pre-populates them.
    violation_behaviour: Any external I/O is a defect
    source: NFR3
```

---

## Rules Summary

| ID | Category | Statement |
|---|---|---|
| BR1.1 | authorization | Missing X-User-Id → 401 |
| BR1.2 | authorization | Missing X-User-Role → 401 |
| BR1.3 | authorization | Unknown role value → 403 |
| BR1.4 | authorization | Wrong role for endpoint → 403 |
| BR2.1 | constraint | Server listens on 127.0.0.1:3000 only |
| BR2.2 | constraint | All data in shared in-memory store; no external persistence |
