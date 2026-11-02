# Performance Requirements — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR1–NFR3)
- functional-spec.md (WF2.1, WF2.2)

## Assumptions & Open Questions

- This project is local only with no deployment; no production SLAs apply.
- Performance targets are scoped to the local test harness and manual verification.

## Requirements

| ID | Category | Requirement | Target | Notes |
|---|---|---|---|---|
| N/A | Response time | No formal SLA | Acceptable for local `npm test` execution | workshop scope, local only |
| N/A | Throughput | No throughput target | Single-user local testing only | workshop scope, local only |
| N/A | Resource utilization | No resource constraints | Standard Node.js process | no deployment environment |

## Rationale

The project is a local workshop with no staging or production environment (team.md Deployment, project.md Deployment). Performance requirements are not applicable for this scope. The in-memory store (NFR3) ensures all doctor reads and writes are O(n) array operations, which is adequate for the test dataset size.
