# Team-Level Rules

> This team's affirmed practices and corrections. Loaded after `org.md` as
> strict-additive guidance; contradictions with broader policy are rejected.
> Populated by the practices-discovery affirmation gate. Edit at the gate,
> not directly.

## Way of Working

The integration branch is `main`. Individual developers work in short-lived feature branches and land changes on `main` via pull request; branches are not pushed directly to `main` for feature work. Land with merge commits only; never squash or rebase on landing. Only the integration lead pushes `main`.

Units are built in parallel — each developer in their own clone, each in their own short-lived feature branch — and land on `main` through AI-DLC's pinned merge gate after PR review.

For AI-DLC Construction worktrees, the base branch is `main` and the merge target is `main`. Each Bolt branch is merged (merge commit) into `main` as one landing named by the Bolt slug; the Bolt's own commits remain on the source branch until the worktree is discarded.

## Walking Skeleton

Always build a walking skeleton first. The skeleton is the first Unit and must create every file that more than one Unit needs:

- `package.json` with all dependencies
- `src/app.ts` mounting both feature routers from their own folders (an empty router in each)
- `src/server.ts`
- `src/shared/store.ts` with both in-memory collections plus `reset()` and `seed()`
- `src/shared/auth.ts`
- `src/shared/errors.ts`
- The test setup (Vitest + Supertest configuration)

After the skeleton is verified, feature Units only add files inside their own feature folder (`src/features/<feature>/`) and their own test folder (`test/<feature>/`).

## Testing Posture

- **Methodology**: test-after
- **Ordering**: implement each applicable testable layer, then write and run that layer's tests.
- **Framework**: Vitest with Supertest for integration/API tests.
- **Volume**: Minimal strategy — requirement-driven unit tests (one per requirement, with a happy-path floor per component); existing tests must remain green.
- **Coverage floor**: No additional coverage floor beyond the Minimal strategy (workshop scope).

## Guard Policy

<!-- Affirmed by the team. Mode: strict, relaxed, or off. Strict here holds for every intent, whatever one person asks in chat; relaxed or off here applies to every intent whose policy came from its scope, unless project.md or the person sets another; changing this line changes it. A section under the retired Change Control heading, written by an earlier release, is still read. -->

## Deployment

Local only. No deployment. There is no staging or production environment for this project. AI-DLC's CI Pipeline and Operation stages are not used and are dropped from the plan.

## Code Style

- **Language**: TypeScript (Node.js 22, tsx runtime)
- **Formatter**: Prettier — configured via `.prettierrc` in the repo root.
- **Linter**: ESLint — configured via `eslint.config.*` or `.eslintrc.*` in the repo root. Lint failures block the build.
- **Naming conventions**: camelCase for variables and functions, PascalCase for types and interfaces, kebab-case for file names — TypeScript/Node.js idiom.
- **Framework**: Express 5 with zod for request validation.
## Forbidden

<!-- Team-specific forbidden patterns -->

## Mandated

<!-- Team-specific mandates -->

## Corrections

<!-- Self-learning loop appends here. -->
