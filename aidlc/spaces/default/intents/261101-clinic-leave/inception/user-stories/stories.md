# User Stories — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1–FR3, NFR1–NFR3)
- personas.md (Manager, Doctor)
- user-stories-questions.md (story plan)

## Assumptions & Open Questions

None.

---

## US1 — Identity and Access

### US1.1 — Request authentication
**As a** clinic staff member (manager or doctor),
**I want** every API request to require my `X-User-Id` and `X-User-Role` headers,
**so that** only valid clinic staff can access the system and each action is tied to an identity.

**Priority**: Must Have

**INVEST notes**: Independent (all endpoints call the same auth middleware); Testable (absent headers return 401, wrong role returns 403).

**Acceptance Criteria**:

- **AC1.1.1**
  Given a request with a missing `X-User-Id` header
  When the request hits any endpoint
  Then the server responds with HTTP 401

- **AC1.1.2**
  Given a request with a missing `X-User-Role` header
  When the request hits any endpoint
  Then the server responds with HTTP 401

- **AC1.1.3**
  Given a request with both `X-User-Id` and `X-User-Role: doctor`
  When the request targets a manager-only endpoint (e.g., add doctor)
  Then the server responds with HTTP 403

- **AC1.1.4**
  Given a request with both `X-User-Id` and `X-User-Role: manager`
  When the request targets a doctor-only endpoint (e.g., submit leave)
  Then the server responds with HTTP 403

- **AC1.1.5**
  Given a request with `X-User-Role: unknown-role`
  When the request targets any endpoint
  Then the server responds with HTTP 403

**Dependencies**: None (foundational story).

---

## US2 — Doctor Management

### US2.1 — Add a doctor
**As a** manager,
**I want** to register a new doctor by providing their ID and name,
**so that** they can be recognised by the system and submit leave requests.

**Priority**: Must Have

**INVEST notes**: Small (single POST endpoint); Testable (duplicate ID returns 409, success returns 201 with the new doctor).

**Acceptance Criteria**:

- **AC2.1.1**
  Given I am authenticated as a manager
  When I POST a valid `{ id: "asha", name: "Asha Rao" }` to the doctors endpoint
  Then the server responds with HTTP 201 and the created doctor object

- **AC2.1.2**
  Given doctor `asha` already exists
  When I POST `{ id: "asha", name: "Another Name" }` as a manager
  Then the server responds with HTTP 409

- **AC2.1.3**
  Given I am authenticated as a doctor
  When I POST a new doctor
  Then the server responds with HTTP 403

- **AC2.1.4**
  Given I am authenticated as a manager
  When I POST a body missing the `name` field
  Then the server responds with HTTP 400

**Dependencies**: US1.1.

---

### US2.2 — List all doctors
**As a** clinic staff member (manager or doctor),
**I want** to retrieve the full list of registered doctors,
**so that** I can see who is in the system.

**Priority**: Must Have

**INVEST notes**: Independent; Testable (happy path returns array, empty store returns empty array).

**Acceptance Criteria**:

- **AC2.2.1**
  Given at least one doctor exists
  When I GET the doctors list as a manager or doctor
  Then the server responds with HTTP 200 and an array of doctor objects

- **AC2.2.2**
  Given no doctors have been added
  When I GET the doctors list
  Then the server responds with HTTP 200 and an empty array

- **AC2.2.3**
  Given I am unauthenticated (missing headers)
  When I GET the doctors list
  Then the server responds with HTTP 401

**Dependencies**: US1.1.

---

## US3 — Leave Request Management

### US3.1 — Submit a leave request
**As a** doctor,
**I want** to submit a leave request with a start date and end date,
**so that** the manager can review and approve my absence.

**Priority**: Must Have

**INVEST notes**: Small (single POST); Testable (success returns 201 with UUID and status pending; invalid dates return 400; unknown doctorId returns 404).

**Acceptance Criteria**:

- **AC3.1.1**
  Given I am authenticated as doctor `asha` and `asha` exists in the doctors store
  When I POST `{ doctorId: "asha", startDate: "2026-12-07", endDate: "2026-12-09" }`
  Then the server responds with HTTP 201 and a leave request object with a UUID `id` and `status: "pending"`

- **AC3.1.2**
  Given I am authenticated as a doctor
  When I POST a leave request where `endDate` is before `startDate`
  Then the server responds with HTTP 400

- **AC3.1.3**
  Given I am authenticated as a doctor
  When I POST a leave request with a `doctorId` that does not exist in the doctors store
  Then the server responds with HTTP 404

- **AC3.1.4**
  Given I am authenticated as a manager
  When I POST a leave request
  Then the server responds with HTTP 403

- **AC3.1.5**
  Given I am authenticated as a doctor
  When I POST a leave request missing the `startDate` field
  Then the server responds with HTTP 400

**Dependencies**: US1.1, US2.1.

---

### US3.2 — View my leave requests
**As a** doctor,
**I want** to list my own leave requests,
**so that** I can track the status of each request without asking the manager.

**Priority**: Must Have

**Acceptance Criteria**:

- **AC3.2.1**
  Given I am authenticated as doctor `asha` and have submitted leave requests
  When I GET the leave requests endpoint
  Then the server responds with HTTP 200 and only requests where `doctorId` equals `asha`

- **AC3.2.2**
  Given I am authenticated as a doctor with no submitted requests
  When I GET the leave requests endpoint
  Then the server responds with HTTP 200 and an empty array

**Dependencies**: US1.1, US3.1.

---

### US3.3 — Approve a leave request
**As a** manager,
**I want** to approve a leave request by its ID,
**so that** the doctor knows their leave is confirmed.

**Priority**: Must Have

**Acceptance Criteria**:

- **AC3.3.1**
  Given a leave request with `status: "pending"` exists
  When I PATCH/PUT that request as a manager with `{ status: "approved" }`
  Then the server responds with HTTP 200 and the updated request with `status: "approved"`

- **AC3.3.2**
  Given a leave request with `status: "rejected"` exists
  When I PATCH/PUT that request as a manager with `{ status: "approved" }`
  Then the server responds with HTTP 200 and the updated request with `status: "approved"` (re-actioning is allowed)

- **AC3.3.3**
  Given I am authenticated as a doctor
  When I attempt to approve a leave request
  Then the server responds with HTTP 403

**Dependencies**: US1.1, US3.1.

---

### US3.4 — Reject a leave request
**As a** manager,
**I want** to reject a leave request by its ID,
**so that** the doctor knows their request was denied and can plan accordingly.

**Priority**: Must Have

**Acceptance Criteria**:

- **AC3.4.1**
  Given a leave request with `status: "pending"` exists
  When I PATCH/PUT that request as a manager with `{ status: "rejected" }`
  Then the server responds with HTTP 200 and the updated request with `status: "rejected"`

- **AC3.4.2**
  Given a leave request with `status: "approved"` exists
  When I PATCH/PUT that request as a manager with `{ status: "rejected" }`
  Then the server responds with HTTP 200 and the updated request with `status: "rejected"` (re-actioning is allowed)

- **AC3.4.3**
  Given the request ID does not exist
  When I PATCH/PUT as a manager
  Then the server responds with HTTP 404

**Dependencies**: US1.1, US3.1.

---

### US3.5 — List all leave requests
**As a** manager,
**I want** to view all leave requests across all doctors,
**so that** I can identify and action any pending requests.

**Priority**: Must Have

**Acceptance Criteria**:

- **AC3.5.1**
  Given leave requests from multiple doctors exist
  When I GET the leave requests endpoint as a manager
  Then the server responds with HTTP 200 and an array containing all requests from all doctors

- **AC3.5.2**
  Given no leave requests have been submitted
  When I GET the leave requests endpoint as a manager
  Then the server responds with HTTP 200 and an empty array

**Dependencies**: US1.1, US3.1.

---

## Story Summary

| ID | Title | Persona | Priority |
|---|---|---|---|
| US1.1 | Request authentication | All staff | Must Have |
| US2.1 | Add a doctor | Manager | Must Have |
| US2.2 | List all doctors | All staff | Must Have |
| US3.1 | Submit a leave request | Doctor | Must Have |
| US3.2 | View my leave requests | Doctor | Must Have |
| US3.3 | Approve a leave request | Manager | Must Have |
| US3.4 | Reject a leave request | Manager | Must Have |
| US3.5 | List all leave requests | Manager | Must Have |
