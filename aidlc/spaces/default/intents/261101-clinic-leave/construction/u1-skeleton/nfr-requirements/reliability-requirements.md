# Reliability Requirements — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR3)

## Assumptions & Open Questions

None.

---

## Reliability Requirements

This is a local workshop project. No SLA, availability target, fault-tolerance, or disaster-recovery requirement applies.

| ID | Requirement | Detail | Source |
|---|---|---|---|
| NFR3.2 | In-memory only; no persistence | Data does not survive a server restart — this is by design; no backup or recovery mechanism is needed or provided | NFR3 |
| NFR3.3 | Test isolation via reset() | Tests must call `store.reset()` before each case; the store must reliably clear both collections | NFR3 |

No further reliability requirements apply.
