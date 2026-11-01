## Summary

- Builds: Walking skeleton — shared infrastructure (store, auth, errors, router stubs, server)
- Touches: package.json, tsconfig.json, vitest.config.ts, .prettierrc, src/shared/*, src/features/*/index.ts, src/app.ts, src/server.ts, test/skeleton/
- Tests: ~10 tests (data model layer × 2, auth middleware × 5 AC-driven + 1 happy-path, integration × 2)

---

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "implement each applicable testable layer, then write and run that layer's tests.",
  "scope": "workshop",
  "test_strategy": "minimal",
  "project_type": "greenfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run that layer's tests.\n- **Framework**: Vitest with Supertest for integration/API tests.\n- **Volume**: Minimal strategy — requirement-driven unit tests (one per requirement, with a happy-path floor per component); existing tests must remain green.\n- **Coverage floor**: No additional coverage floor beyond the Minimal strategy (workshop scope)."
    }
  ],
  "obligations": {
    "strategy": "minimal",
    "strategy_volume": [
      "One verifiable test per requirement at the narrowest effective level.",
      "At least one happy-path unit test per component.",
      "Unit tests are the default; a bugfix/security scope floor may require an integration or E2E regression when that is the narrowest level that reproduces the defect."
    ],
    "scope_floor": [
      "Keep the existing test suite green.",
      "This scope adds no extra new-test floor beyond the selected test strategy."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - implement.",
      "Data model / database behavior - write and run its tests after implementation.",
      "Repository / data access - implement.",
      "Repository / data access - write and run its tests after implementation.",
      "Business logic - implement.",
      "Business logic - write and run its tests after implementation.",
      "API / endpoint - implement.",
      "API / endpoint - write and run its tests after implementation.",
      "Frontend behavior - implement.",
      "Frontend behavior - write and run its tests after implementation.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:a774c9df34d9c58ef36d37955a2f05f3095b539519a632322a06237864903cb7",
  "contract_sha256": "sha256:77ccb22e551a1d944effbb46f14d5230521e667e9f9c9d29ef2fb1eeaf26e1d1"
}
```

---

## Steps

### Step 1 — Project structure and production configuration skeleton
*Testing Contract step: "Project structure and production configuration skeleton."*

- [x] Create `package.json` with all dependencies (express, zod, typescript, tsx, vitest, @vitest/coverage-v8, supertest, @types/supertest, @types/node, uuid, @types/uuid, prettier, eslint)
- [x] Create `tsconfig.json` (strict mode, ES modules, Node 22)
- [x] Create `.prettierrc` (project Prettier config)
- [x] Create `eslint.config.ts` (project ESLint config)
- [x] Create directory structure: `src/shared/`, `src/features/doctors/`, `src/features/leave/`, `test/skeleton/`

Story-to-step traceability: NFR1.1 (Node.js 22, TypeScript 5.x strict, tsx runtime), NFR3.1 (framework setup)

### Step 2 — Bootstrap test runner
*Testing Contract step: "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command."*

- [x] Create `vitest.config.ts` with Supertest-compatible configuration
- [x] Verify the unit-scoped test command runs (even with no test files yet)
- [x] Record exact command in `unit-test-instructions.md`

Story-to-step traceability: NFR3.3 (Vitest test isolation)

### Step 3 — Data model layer — implement
*Testing Contract step: "Data model / database behavior - implement."*

- [x] Create `src/shared/store.ts`:
  - Export `Doctor` interface: `{ id: string; name: string }`
  - Export `LeaveRequest` interface: `{ id: string; doctorId: string; startDate: string; endDate: string; status: 'pending' | 'approved' | 'rejected' }`
  - Export `store` singleton: `{ doctors: Doctor[]; leaveRequests: LeaveRequest[] }`
  - Export `reset()`: clears both collections
  - Export `seed()`: pre-populates both collections with deterministic test fixtures (e.g. one doctor + one leave request)

Story-to-step traceability: FR2.1 (Doctor id + name), FR3.1–FR3.3 (LeaveRequest with status), NFR3.2 (no external persistence), BR2.2

### Step 4 — Data model layer — tests
*Testing Contract step: "Data model / database behavior - write and run its tests after implementation."*

- [x] Create `test/skeleton/store.test.ts`:
  - Happy path: `store.doctors` and `store.leaveRequests` start as arrays (NFR3.1)
  - `reset()` clears both collections (BR2.2 / NFR3.3)
  - `seed()` adds at least one Doctor and one LeaveRequest (NFR3.3)
  - After `reset()` then `seed()`, both collections are non-empty (NFR3.3)
- [x] Run `npx vitest run test/skeleton/store.test.ts` — all tests green

Story-to-step traceability: NFR3.3 (store reset/seed for test isolation)

### Step 5 — Business logic layer — implement
*Testing Contract step: "Business logic - implement."*

- [x] Create `src/shared/errors.ts`:
  - Export `sendUnauthorized(res)`: sends `{ error: "Unauthorized" }` with HTTP 401
  - Export `sendForbidden(res)`: sends `{ error: "Forbidden" }` with HTTP 403
- [x] Create `src/shared/auth.ts`:
  - Export `AuthContext` interface: `{ userId: string; role: 'manager' | 'doctor' }`
  - Augment Express `Request` to carry `auth: AuthContext`
  - Export `requireAuth` middleware: checks X-User-Id (missing/empty → 401, BR1.1), checks X-User-Role (missing/empty → 401, BR1.2), validates role value (not 'manager'|'doctor' → 403, BR1.3), attaches `req.auth`, calls `next()`
  - Export `requireRole(role: 'manager' | 'doctor')` factory: returns middleware that checks `req.auth.role === role` (wrong role → 403, BR1.4)

Story-to-step traceability: AC1.1.1 (BR1.1), AC1.1.2 (BR1.2), AC1.1.3 (BR1.4), AC1.1.4 (BR1.4), AC1.1.5 (BR1.3), NFR2.1–NFR2.4

### Step 6 — Business logic layer — tests
*Testing Contract step: "Business logic - write and run its tests after implementation."*

- [x] Create `test/skeleton/auth.test.ts` with unit tests for `requireAuth` and `requireRole`:
  - AC1.1.1: missing X-User-Id header → 401 (BR1.1)
  - AC1.1.2: missing X-User-Role header → 401 (BR1.2)
  - AC1.1.5: unknown role value → 403 (BR1.3)
  - AC1.1.3: doctor role on manager-required route → 403 (BR1.4)
  - AC1.1.4: manager role on doctor-required route → 403 (BR1.4)
  - Happy path: valid manager headers → `req.auth` attached, `next()` called
- [x] Run `npx vitest run test/skeleton/auth.test.ts` — all 6 tests green

Story-to-step traceability: AC1.1.1, AC1.1.2, AC1.1.3, AC1.1.4, AC1.1.5

### Step 7 — API/endpoint layer — implement
*Testing Contract step: "API / endpoint - implement."*

- [x] Create `src/features/doctors/index.ts`: exports an Express `Router` with no routes registered (empty stub)
- [x] Create `src/features/leave/index.ts`: exports an Express `Router` with no routes registered (empty stub)
- [x] Create `src/app.ts`:
  - Exports `createApp()` factory function (or default export)
  - Creates Express 5 application
  - Applies `requireAuth` middleware globally (all routes)
  - Mounts doctors router at `/doctors`
  - Mounts leave router at `/leave`
- [x] Create `src/server.ts`:
  - Imports app factory
  - Calls `app.listen(3000, "127.0.0.1")` (BR2.1 — port first, then host)

Story-to-step traceability: W1 (server startup), W2 (auth middleware applied globally), BR2.1

### Step 8 — API/endpoint layer — tests
*Testing Contract step: "API / endpoint - write and run its tests after implementation."*

- [x] Create `test/skeleton/app.test.ts` with Supertest integration tests:
  - Happy path: GET `/doctors` with valid manager headers → NOT 401/403 (server started, auth passed, router mounted; 404 on empty stub is acceptable)
  - BR1.1 coverage at integration level: GET `/doctors` with no X-User-Id header → 401
  - BR2.1 coverage: server binds to 127.0.0.1 (verified by the test setup succeeding on loopback)
- [x] Run `npx vitest run test/skeleton/app.test.ts` — all tests green

Story-to-step traceability: W1 (server startup), W2 (auth enforced at integration level), BR2.1

### Step 9 — Documentation and traceability
*Testing Contract step: "Documentation and traceability."*

- [x] Write `code-summary.md` documenting files created, implementation decisions, test coverage summary, and any deviations
- [x] Write `source-manifest.json` listing every application-source path this unit created
- [x] Run `aidlc engine sensor-traceability --stage code-generation --output-path aidlc/spaces/default/intents/261101-clinic-leave/construction/u1-skeleton/code-generation/traceability.json --write-upstream` to generate `traceability.json`
