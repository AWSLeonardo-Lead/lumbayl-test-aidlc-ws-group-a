# Risk and Sequencing Rationale — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- bolt-plan.md, team-allocation.md, delivery-planning-questions.md

## Assumptions & Open Questions

None.

---

## Sequencing Rationale

Walking-skeleton-first is the primary heuristic. The unit DAG has one topological constraint — U1 before U2 and U3 — and two equally-valued, independent feature units. Building the skeleton first:

1. Proves the shared foundation (store contract, auth middleware, server start) works before feature work starts.
2. Freezes the shared store contract (C2) so both feature developers get a stable interface.
3. Lets feature Bolts 2a and 2b run in parallel immediately after, maximising developer throughput.

No formal WSJF scoring is required because there is no value-ordering problem: the DAG already determines the only sequencing decision.

---

## Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Shared store contract changes after feature units branch | Low | High | C2 is exclusively owned by U1. Any change to `src/shared/store.ts` requires a new skeleton PR that lands on `main` before feature work continues. |
| R2 | Feature units edit shared files accidentally | Low | Medium | `project.md` and `team.md` both carry a NEVER rule. Code generation picks it up; code review catches violations. |
| R3 | Feature units import each other's code | Low | Medium | NEVER rule in `project.md`. Cross-feature reads go through `src/shared/store.ts` only. |
| R4 | Merge conflict between Bolts 2a and 2b | Very Low | Low | Their source folders are disjoint (`src/features/doctors/` and `src/features/leave/`). They only conflict if someone edits a shared file, which R2 blocks. |

---

## Decision

Sequence: Bolt 1 → (Bolt 2a ∥ Bolt 2b). This is the only sequencing that satisfies the DAG and makes best use of two parallel developers.
