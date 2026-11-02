# CI/CD Pipeline — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- team.md (Deployment: Local only. No deployment. AI-DLC's CI Pipeline and Operation stages are not used and are dropped from the plan.)
- project.md (Deployment: Local only. No deployment. AI-DLC's CI Pipeline and Operation stages are not used; drop them from the plan.)

## Design

Not applicable for this unit and scope.

There is no CI/CD pipeline. The project is a local workshop. There is no staging environment, no production environment, and no deployment target. All verification is done locally via `npm test`.

The mandated verification command for u2-doctors is: `npm test`

| Pipeline concern | Status | Notes |
|---|---|---|
| Build pipeline | N/A | Local only |
| Test automation | Local — `npm test` | Vitest + Supertest |
| Deployment | N/A | Dropped from plan per team.md and project.md |
| Release management | N/A | No deployment environment |
| Environment promotion | N/A | No environments |
