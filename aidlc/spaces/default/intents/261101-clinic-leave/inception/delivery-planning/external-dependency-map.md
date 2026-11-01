# External Dependency Map — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- delivery-planning-questions.md (Q5: no external dependencies)

## Assumptions & Open Questions

None.

---

## External Dependencies

None. This is a local workshop project with no external APIs, no third-party integrations, and no approval lead times.

All runtime dependencies are npm packages declared in `package.json` and installed locally. No network calls, no environment-specific secrets, no external service availability required at test or runtime.

---

## npm Packages (build-time only; no lead time)

| Package | Purpose | Version strategy |
|---|---|---|
| express | HTTP server | Latest ^5.x |
| zod | Request validation | Latest ^3.x |
| typescript | Type checking | Latest ^5.x |
| tsx | Runtime (Node.js 22) | Latest ^4.x |
| vitest | Test runner | Latest ^2.x |
| supertest | HTTP test client | Latest ^7.x |
| uuid | UUID generation | Latest ^9.x or Node crypto |

All packages are available on the public npm registry; no private registry, no VPN, no access approval required.
