# Reliability Design — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- reliability-requirements.md (N/A)

## Design

Not applicable for this unit and scope.

Resilience patterns (circuit breakers, retry policies, health checks, failover) are not required. The project is a local workshop with no external dependencies and no deployment environment. The in-memory store has no failure modes beyond the process itself; `store.reset()` provides deterministic test isolation.
