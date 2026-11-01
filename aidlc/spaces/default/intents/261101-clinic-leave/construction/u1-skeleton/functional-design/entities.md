# Entities — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- unit-of-work.md (U1 u1-skeleton)
- requirements.md (FR2.1, FR3.1–FR3.3, NFR3)
- components.md (Auth, Doctors, Leave, InMemoryStore)
- contract-summary.md (C2 Shared Store Interface)

## Assumptions & Open Questions

None.

---

```yaml
entities:
  - name: Doctor
    description: >
      A registered clinic doctor. Immutable after creation. Owned by the skeleton
      because the shared store (src/shared/store.ts) is skeleton-owned; the Doctors
      feature unit reads and appends this collection but does not redefine the shape.
    attributes:
      - name: id
        type: string
        required: true
        unique: true
        constraints: "Short alphanumeric text (e.g. 'asha'); manager-assigned at creation time"
      - name: name
        type: string
        required: true
        unique: false
        constraints: "Free text; display name only"
    entity_constraints:
      - "id is immutable once assigned"
      - "No update or delete operation exists for Doctor records"
    relationships: []

  - name: LeaveRequest
    description: >
      A leave request submitted by a doctor and actioned by a manager. Owned by the
      skeleton (shared store); the Leave feature unit reads, appends, and mutates
      status on this collection but does not redefine the shape.
    attributes:
      - name: id
        type: string (UUID v4)
        required: true
        unique: true
        constraints: "System-assigned UUID on creation; never user-supplied"
      - name: doctorId
        type: string
        required: true
        unique: false
        references: "Doctor.id"
        constraints: "Must resolve to an existing Doctor.id at submission time"
      - name: startDate
        type: string (ISO 8601 date, YYYY-MM-DD)
        required: true
        unique: false
        constraints: "Must be a valid calendar date"
      - name: endDate
        type: string (ISO 8601 date, YYYY-MM-DD)
        required: true
        unique: false
        constraints: "Must be >= startDate"
      - name: status
        type: enum
        required: true
        unique: false
        allowed_values: [pending, approved, rejected]
        default: pending
        constraints: "Set to 'pending' on creation; updated to 'approved' or 'rejected' by manager"
    entity_constraints:
      - "endDate >= startDate (enforced at submission; HTTP 400 on violation)"
      - "doctorId must reference an existing Doctor (enforced at submission; HTTP 404 on violation)"
      - "id is assigned by the system; never supplied by the caller"
      - "status is 'pending' on creation; manager may update to 'approved' or 'rejected' at any time (re-actioning is allowed)"
    relationships:
      - target: Doctor
        cardinality: many-to-one
        direction: LeaveRequest → Doctor
        description: "Each LeaveRequest belongs to exactly one Doctor via doctorId"
```

---

## Entity Summary

Two entities, both stored in the shared in-memory store owned by u1-skeleton.

| Entity | Owner | Mutable Fields | Key Constraints |
|---|---|---|---|
| Doctor | u1-skeleton (store) | none (immutable) | unique id; name required |
| LeaveRequest | u1-skeleton (store) | status | id=UUID (system); endDate≥startDate; doctorId must exist |

The store exposes `doctors: Doctor[]` and `leaveRequests: LeaveRequest[]`, with `reset()` and `seed()` for test control. Feature units import these types from `src/shared/store.ts`; they never redefine them.
