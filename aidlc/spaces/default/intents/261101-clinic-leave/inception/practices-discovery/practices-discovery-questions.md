# Practices Discovery — Interview Questions

> Project: clinic-leave
> Depth: Minimal (2–4 questions)
> Scope: workshop
> Pre-answered defaults are drawn from org.md and project.md where the practice is already partially settled.
> Leave `[Answer]:` blank until the human responds.

---

## Q1. [DevOps] Way of Working: Individual branching workflow

The project uses `main` as the integration branch, lands changes with merge commits, and only the integration lead pushes `main`. For an individual developer's day-to-day feature work, what workflow should be used?

A. Short-lived feature branches merged to `main` via pull request (recommended — keeps `main` clean, enables review)
B. Work directly on `main` in each developer's own clone, push when ready (no PR)
C. Feature branches with no PR review required — push the branch and merge when ready

X. Other (please specify)

[Answer]: A

---

## Q2. [Developer] Testing Posture: Test methodology

For this TypeScript/Vitest project, what testing methodology should the team follow?

A. Test-after: implement first, then write tests for each layer (recommended default — matches org.md and workshop scope)
B. TDD: write failing tests first, then implement to make them pass
C. BDD: write Given/When/Then scenarios before implementation

X. Other (please specify)

[Answer]: A

---

## Q3. [Developer] Code Style: Formatting and linting tooling

No formatter or linter configuration exists in the repository yet. What code style tooling should be set up for this TypeScript project?

A. Prettier for formatting + ESLint for linting (recommended — matches org.md default for JS/TS projects)
B. Prettier only (formatting, no linting)
C. No automated formatter or linter (rely on editor defaults and manual review)

X. Other (please specify)

[Answer]: A
