# Discovered Rules — clinic-leave

> Hard constraints sourced from project.md. These are pre-affirmed rules that
> apply to every stage in this workflow. They are reproduced here for stage
> context; the canonical source remains `aidlc/spaces/default/memory/project.md`.

## Mandated

ALWAYS keep a feature Unit's source in `src/features/<feature>/` and its tests in `test/<feature>/` (affirmed for the test)

ALWAYS make each feature Unit depend only on the walking skeleton in the Unit DAG (affirmed for the test)

ALWAYS read another feature's data through `src/shared/store.ts`, never by importing another feature's code (affirmed for the test)

ALWAYS land changes on `main` with merge commits only; never squash or rebase on landing (from project.md Way of Working)

ALWAYS use a short-lived feature branch and open a pull request to merge feature work into `main`; never push feature work directly to `main` (Q1 interview answer)

ALWAYS listen on 127.0.0.1 only; never bind the server to 0.0.0.0 (from project.md Forbidden — listed here as positive mandate for clarity)

## Forbidden

NEVER edit shared files (package.json, src/app.ts, src/server.ts, src/shared/*, test setup) in a feature Unit; only the walking skeleton creates them (affirmed for the test)

NEVER edit files in another feature Unit's folder (affirmed for the test)

NEVER bind the server to 0.0.0.0; listen on 127.0.0.1 only (affirmed for the test)

NEVER push feature work directly to `main`; all feature work must go through a short-lived branch and a pull request (Q1 interview answer)

NEVER deploy or run CI Pipeline / Operation stages — this project is local only; those stages are dropped from the plan (from project.md Deployment)

## Sources

- [memory:M1] `aidlc/spaces/default/memory/project.md` — `## Forbidden` section
- [memory:M2] `aidlc/spaces/default/memory/project.md` — `## Mandated` section
- [memory:M3] `aidlc/spaces/default/memory/project.md` — `## Way of Working` section
- [memory:M4] `aidlc/spaces/default/memory/project.md` — `## Deployment` section
- [Q1] Human interview — Q1 answer: short-lived feature branches merged to `main` via pull request
- [Q2] Human interview — Q2 answer: test-after methodology
- [Q3] Human interview — Q3 answer: Prettier (formatting) + ESLint (linting)
