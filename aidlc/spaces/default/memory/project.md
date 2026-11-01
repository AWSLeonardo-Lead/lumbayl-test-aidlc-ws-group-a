# Project-Level Rules

> Project-specific specialisation and corrections. Loaded after `org.md` and
> `team.md` as strict-additive guidance; contradictions with broader policy
> are rejected. Populated by practices-discovery and the self-learning loop.
>
> Use sparingly: most teams don't need a project layer. Reach for it
> only when this specific project needs stable, durable guidance beyond the
> team practice (for example, package-specific release checks or an additional
> regression suite for a legacy component).

## Way of Working

The integration branch is `main`. Units are built in parallel by different
people, each in their own clone, and land on `main` through AI-DLC's pinned
merge gate. Land with merge commits only; never squash or rebase on landing.
Only the integration lead pushes `main`.

## Walking Skeleton

Always build a walking skeleton first for this project. The skeleton is the
first Unit and must create every file that more than one Unit needs: the
package manifest with all dependencies, src/app.ts mounting both feature
routers from their own folders (an empty router in each), src/server.ts,
src/shared/store.ts with both in-memory collections plus reset() and seed(),
src/shared/auth.ts, src/shared/errors.ts, and the test setup. After the
skeleton, feature Units only add files inside their own feature and test
folders.

## Testing Posture

<!-- Project-specific specialisation. -->

## Guard Policy

<!-- Project-specific. Mode: strict, relaxed, or off. Strict here holds for every intent, whatever one person asks in chat; relaxed or off here applies to every intent whose policy came from its scope, unless the person sets another; changing this line changes it. A section under the retired Change Control heading, written by an earlier release, is still read. -->

## Deployment

Local only. No deployment. AI-DLC's CI Pipeline and Operation stages are not
used; drop them from the plan.

## Code Style

<!-- Project-specific specialisation. -->

## Tech Stack

TypeScript on Node.js 22 with tsx, Express 5, zod, Vitest with Supertest,
in-memory store. Local only. See knowledge/aidlc-shared/technical-environment.md.

## Decided

<!-- Decisions made in earlier stages that should not be re-asked. -->
<!-- Format: DECIDED: [decision] (Stage [slug], [date]) -->

## Scope Overrides

<!-- Custom scope rules for this project. -->

## Forbidden

NEVER edit shared files (package.json, src/app.ts, src/server.ts, src/shared/*, test setup) in a feature Unit; only the walking skeleton creates them (affirmed for the test)
NEVER edit files in another feature Unit's folder (affirmed for the test)
NEVER bind the server to 0.0.0.0; listen on 127.0.0.1 only (affirmed for the test)

NEVER push feature work directly to `main`; all feature work must go through a short-lived branch and a pull request (Q1 interview answer) (affirmed 2026-11-01)

NEVER deploy or run CI Pipeline / Operation stages — this project is local only; those stages are dropped from the plan (from project.md Deployment) (affirmed 2026-11-01)

## Mandated

ALWAYS keep a feature Unit's source in `src/features/<feature>/` and its tests in `test/<feature>/` (affirmed for the test)
ALWAYS make each feature Unit depend only on the walking skeleton in the Unit DAG (affirmed for the test)
ALWAYS read another feature's data through `src/shared/store.ts`, never by importing another feature's code (affirmed for the test)

ALWAYS land changes on `main` with merge commits only; never squash or rebase on landing (from project.md Way of Working) (affirmed 2026-11-01)

ALWAYS use a short-lived feature branch and open a pull request to merge feature work into `main`; never push feature work directly to `main` (Q1 interview answer) (affirmed 2026-11-01)

ALWAYS listen on 127.0.0.1 only; never bind the server to 0.0.0.0 (from project.md Forbidden — listed here as positive mandate for clarity) (affirmed 2026-11-01)

## Corrections

<!-- Project-specific corrections from human feedback. -->
<!-- Format: NEVER/ALWAYS [behavior] (learned [date]) -->
