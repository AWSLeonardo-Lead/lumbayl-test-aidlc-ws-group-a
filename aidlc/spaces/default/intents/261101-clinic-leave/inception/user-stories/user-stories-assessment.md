# User Stories Assessment — clinic-leave

## Decision: Execute

## Rationale

User stories add clear value here: the Clinic Leave API has two distinct user personas (manager, doctor) with non-overlapping capabilities, a multi-step approval workflow, and role-based access rules. Structuring the requirements as persona-driven stories makes acceptance criteria concrete and maps directly to the feature Units planned for Construction.

## Factors Considered

- **Multiple personas**: manager and doctor have different goals, permissions, and API surfaces.
- **Business logic workflow**: leave request → pending → approved/rejected is a stateful, human-driven flow that benefits from story-level acceptance criteria.
- **Minimal depth / workshop scope**: stories are kept small; the set maps 1:1 to the functional requirements so no story bloat occurs.
- **Clear requirements**: requirements.md is complete; stories refine, not replace, the requirements.

## Key Areas Where Stories Add Value

- Clarifying who can do what (role enforcement expressed as user goals, not just rules).
- Writing testable acceptance criteria for the approval workflow edge cases (e.g., re-actioning an already-approved request).
- Anchoring the two feature Units (doctors, leave) to user value before Construction begins.
