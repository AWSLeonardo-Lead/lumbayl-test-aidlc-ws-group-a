# Unit Test Instructions — u2-doctors

## Test Framework

Vitest with Supertest (already configured in the project's `vitest.config.ts`; no new dependencies or configuration needed).

## Exact Unit-Scoped Command

```bash
npx vitest run test/doctors/doctors.test.ts
```

This command runs only u2-doctors tests. Use it during implementation (Step 3) and to verify the unit in isolation.

## Full Suite Command (scope floor check)

```bash
npm test
```

Run this after the unit-scoped command passes to verify the scope floor: the existing skeleton tests must remain green. Build and Test checks the full suite at integration time.

## Test File

`test/doctors/doctors.test.ts`

## Setup and Teardown

```typescript
import { reset } from '../../src/shared/store.js';
beforeEach(() => reset());
```

Call `reset()` before each test to ensure isolation. Do NOT call `seed()` unless a specific test needs seeded data — seed state can interfere with tests that check an empty store.

## Test Scope — Minimal Strategy

7 integration tests, one per acceptance criterion:

| # | AC | What it verifies |
|---|---|---|
| 1 | AC2.1.1 | POST valid doctor as manager → 201 + `{ id, name }` |
| 2 | AC2.1.2 | POST duplicate id → 409 |
| 3 | AC2.1.3 | POST as doctor role → 403 |
| 4 | AC2.1.4 | POST missing name → 400 |
| 5 | AC2.2.1 | GET with one doctor → 200 + non-empty array |
| 6 | AC2.2.2 | GET with empty store → 200 + `[]` |
| 7 | AC2.2.3 | GET without auth headers → 401 |

## Auth Headers

Set headers on each request using supertest's `.set()`:

```typescript
.set('x-user-id', 'user1')
.set('x-user-role', 'manager')   // or 'doctor'
```

Omit both headers for the unauthenticated test (AC2.2.3).

## Mocking / Stubbing

None. Tests use the real in-memory store via `reset()`. No mocking of Express, the store, or auth middleware.

## Expected Coverage

No coverage floor for workshop scope. Build and Test checks the full suite green after all units land.
