# Functional Spec — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- entities.md (Doctor entity — source of truth)
- rules.md (BR2.1–BR2.7 — source of truth)
- requirements.md (FR1.1, FR1.2, FR2.1–FR2.3, NFR2)
- stories.md (US2.1, US2.2)
- contract-summary.md (C1, C2)

## Assumptions & Open Questions

None.

---

## Workflows

### WF2.1 — Add a Doctor (POST /doctors)

**Actor:** Manager  
**Precondition:** Server running; doctors collection accessible via store.

```
1. Request arrives: POST /doctors
2. Auth check (requireRole("manager")):
   a. X-User-Id or X-User-Role absent → HTTP 401  [BR2.6]
   b. X-User-Role !== "manager"       → HTTP 403  [BR2.1]
3. Zod schema validation on request body:
   - Required: id (string), name (string)
   - Invalid or missing field          → HTTP 400  [BR2.3]
4. Uniqueness check: store.doctors.find(d => d.id === body.id)
   - id already exists                 → HTTP 409  [BR2.2]
5. Append { id, name } to store.doctors
6. Return HTTP 201 with { id, name }               [BR2.4]
```

**Success response shape:** `{ id: string, name: string }`

---

### WF2.2 — List All Doctors (GET /doctors)

**Actor:** Any authenticated user (manager or doctor)  
**Precondition:** Server running; doctors collection accessible via store.

```
1. Request arrives: GET /doctors
2. Auth check — header presence only (both X-User-Id and X-User-Role required);
   any role is accepted (no 403 for GET /doctors per C1 contract):
   a. X-User-Id or X-User-Role absent → HTTP 401  [BR2.6]
   Note: implement as a single call to requireRole with both accepted roles, or
   as inline header-presence middleware; do NOT chain two requireRole calls that
   would each reject the other role.
3. Read store.doctors (returns [] when empty)
4. Return HTTP 200 with Doctor[]                    [BR2.5]
```

**Success response shape:** `Doctor[]` (may be empty array)

---

## Entity-Relationship Diagram (derived from entities.md)

```
┌─────────────────────────┐
│         Doctor          │
├─────────────────────────┤
│ id   : string  (PK)     │
│ name : string           │
└─────────────────────────┘

Note: Doctor has no foreign-key relationships within this unit.
      The Leave unit reads the doctors collection for doctorId
      validation, but that dependency flows via store.ts only —
      never via direct import of this feature's code.
```

---

## Rules Summary (derived from rules.md)

| Rule  | Trigger                               | HTTP outcome |
|-------|---------------------------------------|--------------|
| BR2.1 | POST /doctors, role ≠ manager         | 403          |
| BR2.2 | POST /doctors, duplicate id           | 409          |
| BR2.3 | POST /doctors, invalid/missing body   | 400          |
| BR2.4 | POST /doctors, valid + unique         | 201 + body   |
| BR2.5 | GET /doctors, authenticated           | 200 + array  |
| BR2.6 | Any endpoint, missing auth header(s)  | 401          |
| BR2.7 | No mutation endpoints exposed         | —            |
