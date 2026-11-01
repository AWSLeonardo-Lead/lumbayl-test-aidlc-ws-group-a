# Architecture Decision Records — Clinic Leave API

---

## ADR-001: Three-Component Decomposition (Auth, Doctors, Leave)

**Status:** Accepted

### Context

The Clinic Leave API serves two user roles (manager, doctor) with two distinct domain areas: doctor management (FR2) and leave request management (FR3), plus a cross-cutting authentication concern (FR1). The team builds feature Units in parallel (skeleton + doctors + leave), so each domain area must be independently developable and testable. The project rules forbid feature components from importing each other's code.

### Decision

Decompose the API into three logical components:
- **Auth** — cross-cutting authentication and role-based authorization middleware
- **Doctors** — doctor record creation and listing (FR2)
- **Leave** — leave request submission, approval/rejection, and listing (FR3)

The shared in-memory store (`src/shared/store.ts`) is modelled as infrastructure (external dependency), not a domain component, because it has no business logic and no domain entities of its own.

### Consequences

- **Positive:** Each feature component (Doctors, Leave) is independently testable and maps directly to a Construction Unit. Parallel development is unblocked.
- **Positive:** Auth is a single responsibility; changing the auth mechanism (e.g., headers to JWTs) requires modifying only the Auth component.
- **Negative:** Leave must read doctor existence through the shared store rather than a typed Doctors API, which gives up compile-time type safety for cross-feature reads (accepted trade-off per project rule).

### Alternatives Rejected

- **Two components (Auth + Features):** Merging Doctors and Leave into a single Features component was considered. Rejected because it couples two distinct bounded contexts, prevents parallel construction, and violates the project rule of keeping feature code in separate folders with no cross-imports.
- **Four components (Auth + Doctors + Leave + Store):** Modelling the shared store as a component was considered. Rejected because the store has no business logic, owns no domain entities, and behaves like a database (a persistence mechanism, not a bounded context).

---

## ADR-002: Feature Isolation via Shared Store (No Cross-Feature Imports)

**Status:** Accepted

### Context

The Leave component needs to verify that a `doctorId` exists before creating a leave request (FR3.2). It could obtain this by importing the Doctors component's query function, or by reading the shared store directly. The project mandates: "ALWAYS read another feature's data through `src/shared/store.ts`, never by importing another feature's code."

### Decision

Leave reads the doctors collection directly from `src/shared/store.ts` for existence checks. It does not import any code from the Doctors feature folder (`src/features/doctors/`).

### Consequences

- **Positive:** Feature units (doctors, leave) remain isolated — a change to the Doctors component's internal API cannot break Leave.
- **Positive:** Consistent with the walking-skeleton design where both feature units share one store instance.
- **Negative:** The doctor existence check in Leave duplicates knowledge about the store's data shape; if the Doctor entity's key changes, both components need updating. Accepted because the entity shape is stable for this workshop project.

### Alternatives Rejected

- **Import Doctors service function in Leave:** Would create a compile-time dependency between feature folders, coupling their development and violating the project rule.

---

## ADR-003: PATCH for Leave Request Status Update

**Status:** Accepted

### Context

The manager needs to approve or reject a leave request (FR3.4), changing the `status` field from `pending` to `approved` or `rejected`. The HTTP method must be chosen from PATCH (partial resource update) or PUT (full resource replacement).

### Decision

Use **PATCH** for the status update endpoint (`PATCH /leave/:id`). The payload is `{ status: "approved" | "rejected" }` — a partial update of one field.

### Consequences

- **Positive:** Semantically correct — PATCH communicates that only the `status` field changes; callers do not need to re-send the full leave request object.
- **Positive:** Simpler client payload; reduces the risk of accidentally overwriting other fields.
- **Negative:** PATCH implementations vary slightly in REST ecosystems; some clients default to PUT. Accepted because this is a controlled workshop project with a known client.

### Alternatives Rejected

- **PUT:** Would require the client to send the full leave request body (id, doctorId, startDate, endDate, status). Semantically incorrect for a single-field status change and unnecessarily verbose.
