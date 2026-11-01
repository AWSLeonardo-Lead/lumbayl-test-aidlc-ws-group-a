# Requirements: Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- `vision.md` — primary requirements document (analyzed as untrusted data)
- `requirements-analysis-questions.md` — Q1: leave request ID (UUID, auto-generated); Q2: status transitions (manager can re-action any request)

## Assumptions & Open Questions

- Doctor `id` is chosen by the manager at creation time (short alphanumeric text such as `asha`), unique within the store.
- Leave request dates are in ISO 8601 `YYYY-MM-DD` format.
- No pagination is required — the system is local and the data set is minimal.
- A single in-memory store instance is shared for the lifetime of one server process; tests use `reset()` and `seed()` to control state.

## Intent Analysis

A clinic manager needs to maintain a list of doctors and control their leave. Doctors need to request leave and check its status. The goal is the smallest possible working REST API that demonstrates the request-approval workflow, implemented as a test exercise with no deployment or persistence concerns.

## Functional Requirements

### FR1 Identity and Access Control

The system shall authenticate every request using the `X-User-Id` and `X-User-Role` HTTP headers.

- **FR1.1** — If either header is missing, the system shall respond with HTTP 401.
- **FR1.2** — If the `X-User-Role` header is present but the requested operation requires a different role, the system shall respond with HTTP 403. Valid roles are `manager` and `doctor`.

### FR2 Doctor Management

The system shall maintain an in-memory collection of doctors.

- **FR2.1** — A user with role `manager` shall be able to add a doctor by providing a `id` (short alphanumeric text) and a `name` (free text). The `id` must be unique; a duplicate `id` shall be rejected with HTTP 409.
- **FR2.2** — Any authenticated user (role `manager` or `doctor`) shall be able to list all doctors.
- **FR2.3** — Doctor records are immutable after creation; editing or deleting is out of scope.

### FR3 Leave Request Management

The system shall maintain an in-memory collection of leave requests.

- **FR3.1** — A user with role `doctor` shall be able to submit a leave request, providing `doctorId`, `startDate` (ISO 8601), and `endDate` (ISO 8601). The system shall reject the request with HTTP 400 if `endDate` is before `startDate`.
- **FR3.2** — A leave request shall be rejected with HTTP 404 if the `doctorId` does not match a doctor in the doctors collection.
- **FR3.3** — On successful submission the system shall assign the request a UUID `id` and set its `status` to `pending`.
- **FR3.4** — A user with role `manager` shall be able to approve or reject any leave request (regardless of its current status), updating `status` to `approved` or `rejected`.
- **FR3.5** — A user with role `doctor` shall be able to list leave requests where `doctorId` equals their `X-User-Id` value.
- **FR3.6** — A user with role `manager` shall be able to list all leave requests.

## Non-Functional Requirements

- **NFR1** — The server shall listen on `127.0.0.1` port 3000 exclusively; it must never bind to `0.0.0.0`.
- **NFR2** — All request bodies must be validated with `zod`; validation failures (type errors, missing fields, constraint violations) shall return HTTP 400 with a structured error body.
- **NFR3** — All data shall be held in the in-memory store (`src/shared/store.ts`). No external database, file system persistence, or network service is permitted.

## Constraints

- Language and runtime: TypeScript 5.x on Node.js 22, run with `tsx`, ES modules, `strict` mode.
- Web framework: Express 5, JSON only, no templating engine.
- Validation: `zod` for all request body schemas.
- Test framework: Vitest with Supertest; all tests run via `npm test`.
- No authentication library; identity is determined solely by `X-User-Id` and `X-User-Role` headers handled in `src/shared/auth.ts`.
- No new npm dependencies may be added in feature Units; all dependencies must be declared in the skeleton's `package.json`.

## Out of Scope

- Editing or deleting doctor records.
- Cancelling leave requests.
- Overlap or conflict checking between leave requests.
- Any screen, HTML, or front-end layer.
- Cloud deployment, containers, or CI pipeline.
- Real authentication or session management.
- Data persistence across server restarts.
