# Infrastructure Specification — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- logical-components.md (DoctorsRouter, DoctorsHandler, DoctorSchema — all in-process)
- team.md (Deployment: Local only. No deployment.)
- project.md (Deployment: Local only. No deployment.)

## Assumptions & Open Questions

None.

## Specification

Not applicable for this unit and scope.

u2-doctors has no infrastructure requirements. The Doctors feature runs as part of the shared Express process started by `src/server.ts` (owned by u1-skeleton). There are no cloud services, no containers, no databases, no load balancers, and no networking resources to provision.

| Resource type | Requirement | Status |
|---|---|---|
| Compute | None — in-process Express handler | N/A |
| Database | None — in-memory store | N/A |
| Networking | None — local only | N/A |
| Storage | None — no persistence | N/A |
| IAM / access control | None — header-based auth, no cloud identity | N/A |
| Secrets management | None — no secrets | N/A |
