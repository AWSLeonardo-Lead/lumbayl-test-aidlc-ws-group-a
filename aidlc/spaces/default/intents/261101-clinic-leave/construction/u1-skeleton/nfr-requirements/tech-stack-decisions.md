# Tech Stack Decisions — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (Constraints section)
- contract-summary.md (C1, C2)

## Assumptions & Open Questions

None.

---

## Technology Selections

The tech stack is fixed by the project constraints (requirements.md §Constraints). No decisions remain open.

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript 5.x, strict mode | Workshop requirement; type safety catches entity shape mismatches between skeleton and feature units |
| Runtime | Node.js 22 + tsx | Workshop requirement; tsx enables direct TypeScript execution without a build step |
| Web framework | Express 5 | Workshop requirement; minimal API surface, stable, familiar |
| Request validation | zod | Workshop requirement (NFR2); provides typed schemas that align directly with TypeScript types |
| Test framework | Vitest | Workshop requirement; fast, ESM-native, compatible with Node.js 22 |
| HTTP test client | Supertest | Workshop requirement; drives Express integration tests without a running port |
| UUID generation | Node.js `crypto.randomUUID()` | Built-in since Node.js 15.6; no npm package needed for UUIDs |
| Formatter | Prettier | Workshop requirement |
| Linter | ESLint | Workshop requirement; lint failures block the build |
| Persistence | None (in-memory only) | Workshop requirement (NFR3); `src/shared/store.ts` holds all state |
| Deployment | None | Local only; no Docker, no cloud |

## Package Manifest Responsibilities

All npm dependencies must be declared in the skeleton's `package.json`. Feature units (`u2-doctors`, `u3-leave`) must not add new npm dependencies.

## Module Format

ES modules (`"type": "module"` in `package.json`), consistent with Node.js 22 and tsx.
