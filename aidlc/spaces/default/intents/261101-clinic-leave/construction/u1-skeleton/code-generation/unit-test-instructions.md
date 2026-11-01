# Unit Test Instructions — u1-skeleton

## Test Framework

- **Framework**: Vitest with Supertest
- **Configuration**: `vitest.config.ts` at repo root
- **Test files location**: `test/skeleton/`

## Exact Unit-Scoped Command

Run this unit's tests only (not the whole suite):

```bash
npx vitest run test/skeleton/
```

This command scopes execution to `test/skeleton/` and will not pick up tests from other feature units (`test/doctors/`, `test/leave/`) that do not exist yet.

> **Note on coverage floor**: The Testing Contract specifies no coverage floor for workshop scope beyond keeping the existing suite green. Build and Test checks coverage on the full assembled suite, not on this unit's scoped run. A coverage threshold exit on this unit's run with all tests passing is not a failed test.

## How to Run Tests

1. **Install dependencies first** (greenfield project, no `node_modules` yet):
   ```bash
   npm install
   ```

2. **Run this unit's tests**:
   ```bash
   npx vitest run test/skeleton/
   ```

3. **Run a single test file**:
   ```bash
   npx vitest run test/skeleton/store.test.ts
   npx vitest run test/skeleton/auth.test.ts
   npx vitest run test/skeleton/app.test.ts
   ```

4. **Watch mode during development** (optional, not the verification command):
   ```bash
   npx vitest test/skeleton/
   ```

## Expected Test Files

| File | Layer | Tests | Requirements |
|---|---|---|---|
| `test/skeleton/store.test.ts` | Data model | ~4 | NFR3.1, NFR3.3 (reset/seed) |
| `test/skeleton/auth.test.ts` | Business logic | ~6 | AC1.1.1–AC1.1.5, happy path |
| `test/skeleton/app.test.ts` | API/endpoint | ~3 | W1, W2, BR2.1 (integration) |

**Total: approximately 10–13 tests**

## Expected Coverage Targets

- `src/shared/store.ts`: happy-path coverage of `reset()` and `seed()` (one test per behavior)
- `src/shared/auth.ts`: one test per AC (AC1.1.1–AC1.1.5) plus one happy-path test
- `src/app.ts` / `src/features/*/index.ts`: covered via Supertest integration tests

No line-coverage floor applies for workshop scope; Build and Test verifies coverage across the full assembled suite.

## Mocking and Stubbing Guidance

- **No mocking needed for store**: Tests call `store.reset()` and `store.seed()` directly in `beforeEach`.
- **Auth middleware tests**: Use lightweight mock request/response objects (plain objects with the needed shape) or a minimal Express app created inline — do not import from the full `src/app.ts` in unit-level auth tests.
- **Integration tests** (`app.test.ts`): Use the real app factory (`createApp()` from `src/app.ts`) with Supertest. Call `store.reset()` in `beforeEach`.

## Test Data Management

- The shared store is a module-level singleton. Always call `store.reset()` in `beforeEach` to isolate tests.
- Use `store.seed()` when a test needs pre-existing data.
- Tests must not depend on execution order.

## Notes

- `src/server.ts` is NOT imported in tests — it calls `app.listen()` as a side effect. Tests use `createApp()` directly via Supertest.
- The skeleton's router stubs are empty (no routes registered). A Supertest GET on `/doctors` with valid auth headers returns 404, not 401/403 — this is acceptable and expected at skeleton delivery.
