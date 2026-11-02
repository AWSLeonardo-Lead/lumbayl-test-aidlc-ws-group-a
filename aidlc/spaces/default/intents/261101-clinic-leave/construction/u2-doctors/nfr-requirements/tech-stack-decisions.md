# Tech Stack Decisions — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (Constraints section)
- team.md (Code Style, Tech Stack)
- project.md (Tech Stack)

## Assumptions & Open Questions

All tech stack decisions for this unit were made during the walking skeleton (U1) and affirmed in team and project rules. This document records them as-decided; no new decisions are introduced in u2-doctors.

## Decisions

| Component | Decision | Rationale |
|---|---|---|
| Language | TypeScript 5.x, strict mode | Team and project rule; type safety for the workshop |
| Runtime | Node.js 22, tsx | Team rule; tsx avoids a compile step for local development |
| Web framework | Express 5 | Team rule; widely understood, matches the workshop brief |
| Request validation | Zod | NFR2; required for all request bodies |
| Data store | In-memory array via `src/shared/store.ts` | NFR3; no external dependency, reset-safe for tests |
| Auth | Header-only (`X-User-Id`, `X-User-Role`) via `src/shared/auth.ts` | FR1; no auth library, headers only |
| Test framework | Vitest + Supertest | Team rule; fast unit/integration tests without a running server process |
| Module format | ES modules | Team and project convention |

## No New Dependencies

u2-doctors adds no new npm dependencies. All required packages (express, zod, vitest, supertest, and their types) were declared in the skeleton's `package.json`. Feature units must not add new dependencies (project.md Constraints).
