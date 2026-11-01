# Team Allocation — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- bolt-plan.md (Bolt 1, 2a, 2b)
- unit-of-work.md (U1–U3)
- unit-of-work-dependency.md (DAG)

## Assumptions & Open Questions

- Two developers available after the skeleton merges to `main`.
- Each developer works in their own clone; branches are short-lived feature branches merged via PR.

---

## Roles

| Role | Responsibility |
|---|---|
| Developer A | Builds Bolt 1 (walking skeleton); then picks up Bolt 2a (doctors) after skeleton lands |
| Developer B | Waits for Bolt 1 to merge; then builds Bolt 2b (leave) in parallel with Developer A |
| Integration Lead | Reviews and merges each PR to `main`; holds main-push rights |

---

## Bolt Assignment

| Bolt | Unit | Assigned To | Gate Before Start |
|---|---|---|---|
| 1 | U1 u1-skeleton | Developer A | None — first work |
| 2a | U2 u2-doctors | Developer A | Bolt 1 merged to `main` |
| 2b | U3 u3-leave | Developer B | Bolt 1 merged to `main` |

---

## Constraints

- Only the integration lead pushes `main`. Feature work always goes through a short-lived branch and a PR.
- Bolts 2a and 2b may not start until Bolt 1 is merged, because the shared store contract (C2) must be stable.
- Neither developer edits the other's feature folder or the shared files after the skeleton lands.
