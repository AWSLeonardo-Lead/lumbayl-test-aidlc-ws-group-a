# Reliability Design — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- reliability-requirements.md (NFR3.2, NFR3.3)
- tech-stack-decisions.md

## Assumptions & Open Questions

None.

---

## Reliability Design

| NFR | Design Decision |
|---|---|
| NFR3.2 (in-memory only; no persistence) | No persistence layer; data is intentionally ephemeral; no backup, no recovery — by design |
| NFR3.3 (test isolation via reset()) | `store.reset()` clears both `doctors` and `leaveRequests` arrays in-place; `store.seed()` populates them; both are synchronous; Vitest `beforeEach` calls `reset()` to guarantee isolation between tests |

No circuit breakers, retry policies, health checks, or failover strategies apply.
