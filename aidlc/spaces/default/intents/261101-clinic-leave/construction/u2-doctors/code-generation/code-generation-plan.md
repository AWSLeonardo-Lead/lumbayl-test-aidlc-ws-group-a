# Code Generation Plan — u2-doctors

## Summary

- Builds: Doctors feature — POST /doctors (manager-only, Zod-validated) and GET /doctors (any authenticated user)
- Touches: `src/features/doctors/index.ts` (edit skeleton stub), `test/doctors/doctors.test.ts` (create)
- Tests: 7 integration tests via Vitest + Supertest, one per acceptance criterion (AC2.1.1–AC2.1.4, AC2.2.1–AC2.2.3)

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

## Context

- **Unit**: u2-doctors
- **Owns**: `src/features/doctors/` and `test/doctors/`
- **Must not touch**: `src/app.ts`, `src/server.ts`, `src/shared/*`, `package.json`, `test/skeleton/`, `src/features/leave/`
- **Skeleton provides**: `requireAuth` (global middleware in app.ts — 401/403 already handled for all routes), `requireRole(role)` (from `src/shared/auth.ts`), `store.doctors` (from `src/shared/store.ts`), `reset()`/`seed()` (for test isolation)
- **Key architecture note**: `requireAuth` is applied globally in `app.ts`. The 401 for missing headers is already handled before any feature route runs. GET /doctors needs no additional middleware — any authenticated user passes through automatically.
- **Stub to edit**: `src/features/doctors/index.ts` — currently exports an empty `doctorsRouter`; add routes to it without modifying any other file

---

## Plan Steps

### Step 1: Verify test runner is available for this unit
- [x] Run `npx vitest run test/doctors/` — expect zero-test pass (no test file yet) or a "no test files found" result. Confirms the runner is available before writing tests.
- **Traceability**: setup prerequisite

### Step 2: Implement API/endpoint layer — `src/features/doctors/index.ts`
- [x] Add Zod `DoctorSchema` inline: `z.object({ id: z.string().min(1), name: z.string().min(1) })`
- [x] Add `POST /doctors` route:
  - Apply `requireRole("manager")` middleware (→ 403 if role ≠ manager)
  - Parse and validate body with `DoctorSchema.parse()`; catch ZodError → 400 with `{ error: "Validation failed", details: ... }`
  - Check `store.doctors.find(d => d.id === body.id)`; if found → 409 `{ error: "Doctor already exists" }`
  - Append `{ id: body.id, name: body.name }` to `store.doctors`
  - Respond 201 `{ id, name }`
- [x] Add `GET /doctors` route:
  - No additional middleware (global `requireAuth` already enforces 401)
  - Respond 200 `store.doctors` (array, may be empty)
- **Traceability**: AC2.1.1, AC2.1.2, AC2.1.3, AC2.1.4 (POST); AC2.2.1, AC2.2.2, AC2.2.3 (GET); BR2.1, BR2.2, BR2.3, BR2.4, BR2.5, BR2.6; FR2.1, FR2.2; NFR2.1, NFR2.2, NFR2.3

### Step 3: Write and run API/endpoint integration tests — `test/doctors/doctors.test.ts`
- [x] Import `createApp` from `src/app.ts`, `reset` from `src/shared/store.ts`, and supertest
- [x] `beforeEach`: call `reset()`
- [x] **AC2.1.1** (happy path — POST): POST `{ id: "asha", name: "Asha Rao" }` as manager → expect 201 with `{ id: "asha", name: "Asha Rao" }`
- [x] **AC2.1.2** (duplicate id): POST same id twice → second → expect 409
- [x] **AC2.1.3** (wrong role POST): POST as doctor → expect 403
- [x] **AC2.1.4** (missing name): POST `{ id: "asha" }` as manager → expect 400
- [x] **AC2.2.1** (happy path — GET): seed one doctor, GET → expect 200 with non-empty array
- [x] **AC2.2.2** (empty list): `reset()`, GET → expect 200 `[]`
- [x] **AC2.2.3** (unauthenticated GET): GET with no headers → expect 401
- [x] Run `npx vitest run test/doctors/doctors.test.ts` — all 7 tests must pass
- **Traceability**: all 7 ACs above; verifies `keepExistingSuiteGreen` scope floor (skeleton tests must still pass — run `npm test` as final check)

### Step 4: Final green-suite check
- [x] Run `npm test` to verify the full suite (skeleton + doctors) remains green
- **Traceability**: scope floor "keep the existing test suite green"

### Step 5: Write plan and summary files (Step 5 artifacts)
- [x] Write `code-summary.md` documenting files created/modified, key decisions, test summary
- [x] Write `source-manifest.json` listing `src/features/doctors/index.ts` and `test/doctors/doctors.test.ts`
- [x] Write `traceability.json` mapping all ACs, BRs, and NFRs
