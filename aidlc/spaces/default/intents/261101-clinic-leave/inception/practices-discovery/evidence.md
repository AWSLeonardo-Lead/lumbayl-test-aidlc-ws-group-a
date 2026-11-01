# Practices Discovery Evidence — clinic-leave

## What Was Inspected

| Source | Layer | Status |
|--------|-------|--------|
| `aidlc/spaces/default/memory/org.md` | org (framework defaults) | Read; used as base |
| `aidlc/spaces/default/memory/team.md` | team | Read; all sections empty (template placeholders only) |
| `aidlc/spaces/default/memory/project.md` | project (overrides) | Read; multiple sections populated |
| `aidlc/spaces/default/memory/phases/inception.md` | phase | Read; applied to inception quality standards |
| `aidlc/spaces/default/knowledge/aidlc-shared/technical-environment.md` | team knowledge | Referenced for tech stack confirmation |
| `inception/practices-discovery/practices-discovery-questions.md` | human interview | Read; all three questions answered |

## Decisions Made

### Way of Working
`project.md` carries a fully populated `## Way of Working` section. It supersedes the org.md default (squash-merge trunk-based). The project uses merge commits, not squash; parallel clone-based development; integration lead controls `main`.

**Q1 answer (interview)**: Short-lived feature branches merged to `main` via pull request (option A). This resolves the open question from inspection: developers use feature branches with PR review, not direct pushes to `main`. Added to team-practices.md and discovered-rules.md.

### Walking Skeleton
`project.md` carries an explicit `## Walking Skeleton` section that mandates skeleton-first development with a specific file list. No ambiguity; the decision is fully settled. No interview question needed.

### Testing Posture
`project.md` `## Testing Posture` is empty (template placeholder). `team.md` `## Testing Posture` is also empty. The org.md default applies: test-after, Minimal strategy (matching workshop scope).

**Q2 answer (interview)**: Test-after methodology confirmed (option A). Matches the org.md default and the pre-populated values in team-practices.md. No change required.

### Deployment
`project.md` `## Deployment` is explicitly "Local only. No deployment." Fully settled; no interview question needed.

### Code Style
`project.md` `## Code Style` is empty. `team.md` `## Code Style` is empty. The org.md default (Prettier + ESLint, language-idiomatic naming) applies.

**Q3 answer (interview)**: Prettier for formatting + ESLint for linting confirmed (option A). Matches the pre-populated values in team-practices.md. No change required.

## Unresolved Uncertainty

None. All three open questions from inspection have been resolved by the human interview.

### Previously Open — Now Resolved

| Question | Resolution |
|----------|-----------|
| Q1 — individual branching workflow | Short-lived feature branches + PR merge (answered 2026-11-01) |
| Q2 — test methodology | Test-after; implement first, then write tests (answered 2026-11-01) |
| Q3 — code style tooling | Prettier (formatting) + ESLint (linting) (answered 2026-11-01) |

## Assumptions & Open Questions

None.
