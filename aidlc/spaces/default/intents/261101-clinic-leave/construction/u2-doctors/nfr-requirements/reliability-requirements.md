# Reliability Requirements — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR3)

## Assumptions & Open Questions

None.

## Requirements

Not applicable for this unit and scope.

The project is a local workshop with no deployment environment. There are no availability SLAs, no fault-tolerance requirements, and no disaster recovery considerations. Data is held in the in-memory store; `store.reset()` and `store.seed()` provide deterministic state for tests.

| ID | Category | Requirement | Status |
|---|---|---|---|
| N/A | Availability | No SLA target | Local only; process restart is acceptable |
| N/A | Fault tolerance | No fault tolerance | No production environment |
| N/A | Data durability | No persistence | In-memory store; data intentionally non-durable |
| N/A | Graceful degradation | No degradation strategy | No external dependencies in this unit |
