# Code Summary — u2-doctors

## Files Created / Modified

| Action | File |
|---|---|
| Modified | `src/features/doctors/index.ts` — replaced empty stub with full router |
| Created | `test/doctors/doctors.test.ts` — 7 integration tests, one per AC |

## Key Decisions

- **Zod validation inline**: `DoctorSchema` is defined directly in the router file; no separate schema module is needed at this scale.
- **`safeParse` over `parse`**: Using `safeParse` avoids a thrown exception and gives a clean 400 response with Zod issue details.
- **No extra middleware on GET**: `requireAuth` is applied globally in `app.ts`; the GET route needs no additional middleware — all 401 cases are handled before reaching the route handler.
- **`requireRole("manager")` only on POST**: Matches AC2.1.3 (doctor role → 403) and the architectural note that GET is open to any authenticated user.
- **`store.doctors` read/write directly**: Feature code accesses the shared store, not another feature's module, per the ALWAYS mandate in project.md.

## Test Summary

All 7 acceptance-criterion tests pass via `npx vitest run test/doctors/doctors.test.ts`. The full suite (21 tests across 4 files) passes via `npm test`.

| Test | AC | Result |
|---|---|---|
| POST as manager returns 201 with doctor body | AC2.1.1 | PASS |
| POST duplicate id returns 409 | AC2.1.2 | PASS |
| POST as doctor role returns 403 | AC2.1.3 | PASS |
| POST missing name returns 400 | AC2.1.4 | PASS |
| GET after seed returns 200 non-empty array | AC2.2.1 | PASS |
| GET after reset returns 200 empty array | AC2.2.2 | PASS |
| GET without auth headers returns 401 | AC2.2.3 | PASS |
