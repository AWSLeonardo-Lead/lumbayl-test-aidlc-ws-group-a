# Observability Requirements — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR1–NFR3)

## Assumptions & Open Questions

None.

## Requirements

Minimal — local workshop only.

| ID | Category | Requirement | Implementation |
|---|---|---|---|
| N/A | Logging | No structured logging required | Express default request logging acceptable |
| N/A | Metrics | No metrics collection | No monitoring infrastructure |
| N/A | Tracing | No distributed tracing | Single-process, no external services |
| N/A | Alerting | No alerting | No deployment environment |

## Test Observability

Test output from Vitest + Supertest provides sufficient observability for the workshop context. Each test run produces a pass/fail report that covers the doctor endpoints. This is the only observability mechanism required.
