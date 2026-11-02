# Business Rules — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1.1, FR1.2, FR2.1–FR2.3, NFR2)
- stories.md (US2.1 AC2.1.1–AC2.1.4, US2.2 AC2.2.1–AC2.2.3)

## Assumptions & Open Questions

None.

---

## Rule Definitions

```yaml
rules:
  - id: BR2.1
    name: Manager role required to add a doctor
    description: >
      Only a request carrying X-User-Role: manager may call POST /doctors.
      Any other role value (e.g. "doctor") results in HTTP 403 Forbidden.
    trigger: POST /doctors with non-manager role
    outcome: HTTP 403
    sources: [FR2.1, FR1.2, AC2.1.3]

  - id: BR2.2
    name: Doctor id must be unique
    description: >
      Before inserting a new doctor, the store is checked for an existing
      record with the same id. A duplicate results in HTTP 409 Conflict; no
      record is written.
    trigger: POST /doctors with an id that already exists in the doctors collection
    outcome: HTTP 409
    sources: [FR2.1, AC2.1.2]

  - id: BR2.3
    name: POST body validated with Zod
    description: >
      The request body for POST /doctors must be a JSON object containing
      id (non-empty string) and name (non-empty string). Any missing field,
      wrong type, or additional constraint violation causes Zod to return
      HTTP 400 Bad Request with a structured error body before any store
      access occurs.
    trigger: POST /doctors with invalid or incomplete body
    outcome: HTTP 400
    sources: [NFR2, FR2.1, AC2.1.4]

  - id: BR2.4
    name: Successful creation returns the doctor record
    description: >
      When validation and uniqueness checks pass, the doctor is appended to
      the in-memory collection and the created record (id, name) is returned
      as the HTTP 201 response body.
    trigger: POST /doctors with valid body and unique id by a manager
    outcome: HTTP 201 with { id, name }
    sources: [FR2.1, AC2.1.1]

  - id: BR2.5
    name: Any authenticated user may list all doctors
    description: >
      GET /doctors is available to any request that carries both X-User-Id
      and X-User-Role headers, regardless of role. It returns the full
      doctors array (possibly empty) as HTTP 200.
    trigger: GET /doctors with valid auth headers
    outcome: HTTP 200 with Doctor[]
    sources: [FR2.2, AC2.2.1, AC2.2.2]

  - id: BR2.6
    name: Authentication required on all endpoints
    description: >
      If either X-User-Id or X-User-Role header is absent, any endpoint in
      this unit returns HTTP 401 Unauthorized before any business logic runs.
      Enforced by requireRole() from src/shared/auth.ts.
    trigger: Request missing X-User-Id or X-User-Role
    outcome: HTTP 401
    sources: [FR1.1, AC2.2.3]

  - id: BR2.7
    name: Doctor records are immutable after creation
    description: >
      There are no update or delete operations for the doctors collection.
      Records inserted by POST /doctors are permanent for the lifetime of
      the server process.
    trigger: N/A — absence of mutation endpoints
    outcome: No PATCH, PUT, or DELETE for /doctors
    sources: [FR2.3]
```
