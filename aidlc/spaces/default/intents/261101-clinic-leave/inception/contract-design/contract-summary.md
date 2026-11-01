# Contract Summary — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- unit-of-work.md (U1–U3)
- unit-of-work-dependency.md (DAG)
- components.md (Auth, Doctors, Leave, InMemoryStore)
- requirements.md (FR1–FR3, NFR1–NFR3)

## Assumptions & Open Questions

- All request and response bodies are JSON (`Content-Type: application/json`).
- Identity is asserted via headers only; no session state, no JWT verification, no real authentication library.
- Error responses always include a `{ error: string }` body.

---

## Contracts Table

| # | Provider Unit | Consumer | Mechanism | Owner |
|---|---|---|---|---|
| C1 | U1 + U2 + U3 (Clinic Leave API) | External: HTTP clients (clinic staff) | Synchronous REST / HTTP JSON | U1 (server/app); U2 (/doctors paths); U3 (/leave paths) |
| C2 | U1 (u1-skeleton) | U2 (u2-doctors), U3 (u3-leave) | Shared TypeScript module (compile-time import) | U1 exclusively |

---

## C1 — External REST API Contract

```yaml
openapi: "3.0.3"
info:
  title: Clinic Leave API
  version: "1.0.0"
  description: REST API for managing clinic doctors and leave requests.

servers:
  - url: http://127.0.0.1:3000

components:
  parameters:
    XUserId:
      name: X-User-Id
      in: header
      required: true
      schema:
        type: string
      description: The caller's user ID (e.g. "asha", "morgan").
    XUserRole:
      name: X-User-Role
      in: header
      required: true
      schema:
        type: string
        enum: [manager, doctor]
      description: The caller's role. Must be "manager" or "doctor".

  schemas:
    Doctor:
      type: object
      required: [id, name]
      properties:
        id:
          type: string
          description: Short alphanumeric identifier chosen by the manager.
        name:
          type: string
          description: Doctor's display name.

    LeaveRequest:
      type: object
      required: [id, doctorId, startDate, endDate, status]
      properties:
        id:
          type: string
          format: uuid
          description: UUID assigned on creation.
        doctorId:
          type: string
          description: The id of the doctor who submitted the request.
        startDate:
          type: string
          format: date
          description: First day of leave (YYYY-MM-DD).
        endDate:
          type: string
          format: date
          description: Last day of leave (YYYY-MM-DD). Must be >= startDate.
        status:
          type: string
          enum: [pending, approved, rejected]

    CreateDoctorRequest:
      type: object
      required: [id, name]
      properties:
        id:
          type: string
        name:
          type: string

    SubmitLeaveRequest:
      type: object
      required: [doctorId, startDate, endDate]
      properties:
        doctorId:
          type: string
        startDate:
          type: string
          format: date
        endDate:
          type: string
          format: date

    UpdateLeaveStatusRequest:
      type: object
      required: [status]
      properties:
        status:
          type: string
          enum: [approved, rejected]

    ErrorResponse:
      type: object
      required: [error]
      properties:
        error:
          type: string

  responses:
    Unauthorized:
      description: Missing X-User-Id or X-User-Role header.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    Forbidden:
      description: Role does not match the required role for this operation.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    BadRequest:
      description: Validation failure (zod) or invalid field value.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFound:
      description: Requested resource does not exist.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    Conflict:
      description: Duplicate unique identifier.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

paths:
  /doctors:
    post:
      summary: Add a doctor (manager only)
      parameters:
        - $ref: '#/components/parameters/XUserId'
        - $ref: '#/components/parameters/XUserRole'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateDoctorRequest'
      responses:
        "201":
          description: Doctor created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Doctor'
        "400":
          $ref: '#/components/responses/BadRequest'
        "401":
          $ref: '#/components/responses/Unauthorized'
        "403":
          $ref: '#/components/responses/Forbidden'
        "409":
          $ref: '#/components/responses/Conflict'

    get:
      summary: List all doctors (any authenticated user)
      parameters:
        - $ref: '#/components/parameters/XUserId'
        - $ref: '#/components/parameters/XUserRole'
      responses:
        "200":
          description: Array of all doctors.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Doctor'
        "401":
          $ref: '#/components/responses/Unauthorized'

  /leave:
    post:
      summary: Submit a leave request (doctor only)
      parameters:
        - $ref: '#/components/parameters/XUserId'
        - $ref: '#/components/parameters/XUserRole'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitLeaveRequest'
      responses:
        "201":
          description: Leave request created with status pending.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LeaveRequest'
        "400":
          $ref: '#/components/responses/BadRequest'
        "401":
          $ref: '#/components/responses/Unauthorized'
        "403":
          $ref: '#/components/responses/Forbidden'
        "404":
          $ref: '#/components/responses/NotFound'

    get:
      summary: List leave requests (doctor sees own; manager sees all)
      parameters:
        - $ref: '#/components/parameters/XUserId'
        - $ref: '#/components/parameters/XUserRole'
      responses:
        "200":
          description: Array of leave requests.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/LeaveRequest'
        "401":
          $ref: '#/components/responses/Unauthorized'

  /leave/{id}:
    patch:
      summary: Approve or reject a leave request (manager only)
      parameters:
        - $ref: '#/components/parameters/XUserId'
        - $ref: '#/components/parameters/XUserRole'
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateLeaveStatusRequest'
      responses:
        "200":
          description: Leave request updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LeaveRequest'
        "400":
          $ref: '#/components/responses/BadRequest'
        "401":
          $ref: '#/components/responses/Unauthorized'
        "403":
          $ref: '#/components/responses/Forbidden'
        "404":
          $ref: '#/components/responses/NotFound'
```

---

## C2 — Shared Store Interface Contract

```yaml
# Shared TypeScript store contract — owned by U1 (src/shared/store.ts)
# Feature units (U2, U3) import from this module; they never redefine these shapes.

entities:
  Doctor:
    fields:
      id: string        # unique alphanumeric; manager-assigned
      name: string      # free text display name

  LeaveRequest:
    fields:
      id: string        # UUID; assigned on creation
      doctorId: string  # references Doctor.id
      startDate: string # YYYY-MM-DD
      endDate: string   # YYYY-MM-DD; >= startDate
      status: pending | approved | rejected

store_interface:
  doctors: Doctor[]                  # append-only collection (immutable after insert)
  leaveRequests: LeaveRequest[]      # mutable; status field is updated by manager
  reset(): void                      # clears both collections; used in test teardown
  seed(doctors: Doctor[], leaveRequests: LeaveRequest[]): void  # pre-populate for tests
```

---

## Contract Ownership Rules

- **C1 (External REST API):** U1 owns the server binding (127.0.0.1:3000), app factory, and auth/error envelope. U2 owns the `/doctors` path spec. U3 owns the `/leave` and `/leave/:id` path specs. No unit may change another unit's paths.
- **C2 (Shared Store Interface):** U1 exclusively. U2 and U3 import the store; they never redefine `Doctor`, `LeaveRequest`, or the store interface. Any change to the store interface requires a skeleton-unit change that lands on `main` before the feature units build.
- **Breaking changes:** Not applicable — single workshop project, no versioning required.
- **Additive changes:** Feature units may add fields to their own request bodies; consumers ignore unknown fields.

---

## Open Questions

| Contract | Question | Blocks |
|---|---|---|
| (none) | All contract points resolved | — |
