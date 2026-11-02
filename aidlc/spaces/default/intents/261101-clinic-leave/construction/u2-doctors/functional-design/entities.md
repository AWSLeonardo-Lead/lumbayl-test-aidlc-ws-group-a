# Entities — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR2.1–FR2.3, NFR2)
- components.md (Doctors component, Doctor entity)
- contract-summary.md (C1 REST contract, C2 shared store interface)

## Assumptions & Open Questions

None.

---

## Entity Definitions

```yaml
entities:
  - name: Doctor
    description: >
      A clinic doctor record created by a manager and stored in the shared
      in-memory collection. Immutable after creation.
    attributes:
      - name: id
        type: string
        required: true
        unique: true
        notes: >
          Short alphanumeric text chosen by the manager at creation time
          (e.g. "asha"). Uniqueness is enforced across the doctors collection.
          Immutable after creation.
      - name: name
        type: string
        required: true
        unique: false
        notes: >
          Free-text display name (e.g. "Asha Rao"). No uniqueness constraint.
          Immutable after creation.
    lifecycle:
      created_by: "POST /doctors (manager role required)"
      mutable: false
      deleted: false
    storage:
      collection: doctors
      location: src/shared/store.ts
      access_pattern: append-only
```
