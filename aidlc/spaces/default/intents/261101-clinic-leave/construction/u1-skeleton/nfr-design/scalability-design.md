# Scalability Design — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- scalability-requirements.md (NFR3.1)
- tech-stack-decisions.md

## Assumptions & Open Questions

None.

---

## Scalability Design

| NFR | Design Decision |
|---|---|
| NFR3.1 (single-process in-memory store) | Single Node.js process; stateless Express handlers; all state in module-level store object in `src/shared/store.ts`; no horizontal scaling, no sharding, no queue |

No further scalability design applies to this workshop scope.
