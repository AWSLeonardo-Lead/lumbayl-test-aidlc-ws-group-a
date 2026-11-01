# Bolt Plan — Clinic Leave API

A Bolt is one build pass over a piece of the work, ending in something that runs and can be verified. This plan has three Bolts.

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1–FR3, NFR1–NFR3)
- components.md (Auth, Doctors, Leave, InMemoryStore)
- unit-of-work.md (U1–U3)
- unit-of-work-dependency.md (DAG)
- team-practices.md (walking skeleton on; merge-commit to main via PR)

## Assumptions & Open Questions

- Bolt 1 merges to `main` before Bolt 2a and 2b branch. The store contract (C2) is frozen at that point.
- Bolts 2a and 2b are built by two developers in their own clones simultaneously. Their branches land on `main` independently via PR; neither branch edits the other's files.

---

## Bolt Sequence

### Bolt 1 — Walking Skeleton ⚙️

**Unit:** U1 (u1-skeleton)
**Walking skeleton:** Yes — this Bolt delivers the smallest working end-to-end slice that proves the shared foundation hangs together.

**Definition of Done:**
- [ ] `package.json` declares all project dependencies
- [ ] `src/app.ts` mounts both feature routers (each exporting an empty Express router from their own folder)
- [ ] `src/server.ts` starts the server on `127.0.0.1:3000`
- [ ] `src/shared/store.ts` exposes `doctors`, `leaveRequests`, `reset()`, `seed()`
- [ ] `src/shared/auth.ts` exports `requireRole`; returns 401 on missing headers, 403 on wrong role
- [ ] `src/shared/errors.ts` exports shared error-response utilities
- [ ] Vitest + Supertest configured; `npm test` passes
- [ ] Skeleton tests verify: server starts, both routers respond (even if empty), auth middleware returns 401/403 correctly
- [ ] Linter and formatter clean
- [ ] Branch merged to `main` via PR

**Confidence hypothesis:** The shared foundation compiles, starts, and passes the auth contract tests before any feature code is written.

**Expected demo:** `npm test` exits green. `curl` to an empty route returns a predictable response. Auth headers are enforced.

---

### Bolt 2a — Doctors Feature 🏥

**Unit:** U2 (u2-doctors)
**Depends on:** Bolt 1 (u1-skeleton merged to `main`)
**Runs in parallel with:** Bolt 2b

**Definition of Done:**
- [ ] `src/features/doctors/` implements POST /doctors and GET /doctors
- [ ] POST /doctors: manager-only; creates doctor; enforces unique id (409); validates body (400); returns 201
- [ ] GET /doctors: any authenticated user; returns all doctors; returns 200
- [ ] `test/doctors/` passes with Vitest + Supertest
- [ ] No edits to `src/shared/*`, `src/app.ts`, `package.json`, or `src/features/leave/`
- [ ] Branch merged to `main` via PR

**Confidence hypothesis:** The doctors domain compiles and all acceptance criteria for US2.1 and US2.2 pass as integration tests.

**Expected demo:** `npm test` green including doctors tests. `POST /doctors` with a manager header returns 201.

---

### Bolt 2b — Leave Feature 🗓️

**Unit:** U3 (u3-leave)
**Depends on:** Bolt 1 (u1-skeleton merged to `main`)
**Runs in parallel with:** Bolt 2a

**Definition of Done:**
- [ ] `src/features/leave/` implements POST /leave, PATCH /leave/:id, GET /leave
- [ ] POST /leave: doctor-only; validates dates (400); validates doctorId (404); assigns UUID; returns 201 with status=pending
- [ ] PATCH /leave/:id: manager-only; validates id (404); validates status value (400); returns 200; re-actioning allowed
- [ ] GET /leave: doctor sees own; manager sees all; returns 200
- [ ] `test/leave/` passes with Vitest + Supertest
- [ ] No edits to `src/shared/*`, `src/app.ts`, `package.json`, or `src/features/doctors/`
- [ ] Branch merged to `main` via PR

**Confidence hypothesis:** The leave domain compiles and all acceptance criteria for US3.1–US3.5 pass as integration tests.

**Expected demo:** `npm test` green including leave tests. `POST /leave` with a doctor header returns 201 with a UUID.

---

## Bolt Summary

| Bolt | Unit | Depends On | Parallel With | Kind |
|---|---|---|---|---|
| 1 | U1 u1-skeleton | — | — | Walking skeleton |
| 2a | U2 u2-doctors | Bolt 1 | Bolt 2b | Feature |
| 2b | U3 u3-leave | Bolt 1 | Bolt 2a | Feature |
