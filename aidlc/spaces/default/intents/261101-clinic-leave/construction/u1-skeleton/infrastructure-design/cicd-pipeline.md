# CI/CD Pipeline Design — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- team.md Deployment (local only; CI Pipeline and Operation stages dropped from plan)

## Assumptions & Open Questions

None.

---

## CI/CD Pipeline

This is a local workshop project. There is no CI/CD pipeline, no staging environment, and no production deployment. The project.md Deployment section mandates: "Local only. No deployment. AI-DLC's CI Pipeline and Operation stages are not used."

**Build verification is local only:**

```
npm install      # install dependencies
npm test         # run Vitest suite (the Construction Verification Command)
```

No pipeline configuration files (e.g., `.github/workflows/`, `buildspec.yml`) are produced for this project.
