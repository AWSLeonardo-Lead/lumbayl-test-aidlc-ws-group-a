# Unit of Work — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- components.md (Auth, Doctors, Leave)
- requirements.md (FR1–FR3, NFR1–NFR3)
- stories.md (US1–US3)
- project.md (walking skeleton always; feature Units own their folder; no shared-file edits in feature Units)

## Assumptions & Open Questions

- Two developers build U2 and U3 in parallel, each in their own clone of the repository, each on their own feature branch, after U1 lands on `main`.
- No unit edits shared files (`package.json`, `src/app.ts`, `src/server.ts`, `src/shared/*`, test setup) — those are created once in U1 and are thereafter read-only for feature units.

---

## Unit Definitions

| Unit ID | Directory | Kind | Description | Complexity |
|---|---|---|---|---|
| U1 | u1-skeleton | service | Walking skeleton — shared foundation required by all feature units | M |
| U2 | u2-doctors | service | Doctors feature — add and list doctor records | S |
| U3 | u3-leave | service | Leave feature — submit, action, and list leave requests | M |

---

## Unit Responsibilities

### U1 — u1-skeleton (Walking Skeleton)

**Owns:**
- `package.json` — all dependencies for the entire project (express, zod, tsx, vitest, supertest, and their types)
- `src/app.ts` — Express app factory mounting both feature routers from their folders (each as an empty router at this stage)
- `src/server.ts` — server entry point listening on 127.0.0.1:3000
- `src/shared/store.ts` — in-memory store with `doctors` and `leaveRequests` collections, `reset()`, and `seed()`
- `src/shared/auth.ts` — `requireRole(role)` middleware factory; reads `X-User-Id` and `X-User-Role`; returns 401 on missing headers, 403 on wrong role
- `src/shared/errors.ts` — shared error response utilities
- `vitest.config.ts` — Vitest configuration
- `tsconfig.json`, `.prettierrc`, `eslint.config.*` — project tooling configuration

**Delivers:** A running Express server (npm start / tsx src/server.ts) and a passing test suite (npm test) that exercises the empty routers end-to-end. The auth middleware must be wired and testable; the store must pass reset/seed round-trips.

**Deployment model:** Standalone — the only runnable unit until feature units land.

**Implementation notes:**
- Must bind to `127.0.0.1` only, never `0.0.0.0` (NFR1)
- Zod is required as a shared dependency (NFR2)
- The skeleton test verifies the server starts, both routers respond, and auth rejects missing headers

---

### U2 — u2-doctors (Doctors Feature)

**Owns:**
- `src/features/doctors/` — doctors router and handler logic
- `test/doctors/` — integration tests for the doctors endpoints

**Delivers:**
- `POST /doctors` (manager-only): create a doctor with `id` and `name`; enforce unique id (409); validate body with zod (400); return 201 with the created doctor
- `GET /doctors` (any authenticated user): list all doctors; return 200 with array

**Deployment model:** Embedded in the shared Express app (its router is mounted by `src/app.ts`).

**Implementation notes:**
- Reads and writes the `doctors` collection in `src/shared/store.ts`
- Does not import from `src/features/leave/`
- Does not edit `src/app.ts`, `package.json`, or any `src/shared/` file

---

### U3 — u3-leave (Leave Feature)

**Owns:**
- `src/features/leave/` — leave router and handler logic
- `test/leave/` — integration tests for the leave endpoints

**Delivers:**
- `POST /leave` (doctor-only): submit a leave request; validate date range (endDate ≥ startDate → 400); validate doctorId exists (404); assign UUID id and status=pending; return 201
- `PATCH /leave/:id` (manager-only): update status to `approved` or `rejected`; validate id exists (404); validate status value (400); return 200 with updated request
- `GET /leave` (doctor: own requests; manager: all): return 200 with filtered array

**Deployment model:** Embedded in the shared Express app.

**Implementation notes:**
- Reads `doctors` and writes `leaveRequests` collections in `src/shared/store.ts`
- Does not import from `src/features/doctors/`
- Does not edit `src/app.ts`, `package.json`, or any `src/shared/` file
