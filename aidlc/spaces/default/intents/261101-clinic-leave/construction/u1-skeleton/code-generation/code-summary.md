# Code Summary — u1-skeleton

## Files Created

### Configuration / Build
| File | Purpose |
|---|---|
| `package.json` | Project manifest with all dependencies for the full project |
| `tsconfig.json` | TypeScript strict mode, ES modules, `bundler` resolution for tsx/vitest compatibility |
| `.prettierrc` | Prettier formatting: singleQuote, semi, trailingComma: es5, printWidth: 100 |
| `eslint.config.ts` | ESLint flat config with TypeScript parser |
| `vitest.config.ts` | Vitest test runner configured for Node environment, `test/**/*.test.ts` glob |

### Shared Infrastructure (`src/shared/`)
| File | Purpose |
|---|---|
| `src/shared/store.ts` | In-memory singleton store with `Doctor` and `LeaveRequest` interfaces, `reset()` and `seed()` |
| `src/shared/errors.ts` | `sendUnauthorized(res)` → 401, `sendForbidden(res)` → 403 |
| `src/shared/auth.ts` | `requireAuth` middleware, `requireRole(role)` factory, `AuthContext` interface, Express Request augmentation |

### Feature Stubs (`src/features/`)
| File | Purpose |
|---|---|
| `src/features/doctors/index.ts` | Empty Express Router stub — routes added by u2-doctors |
| `src/features/leave/index.ts` | Empty Express Router stub — routes added by u3-leave |

### Application Entry Points
| File | Purpose |
|---|---|
| `src/app.ts` | `createApp()` factory — Express app with json parser, global `requireAuth`, feature routers mounted |
| `src/server.ts` | Entry point: calls `app.listen(3000, "127.0.0.1")` — never imported in tests |

### Tests (`test/skeleton/`)
| File | Layer | Tests |
|---|---|---|
| `test/skeleton/store.test.ts` | Data model | 4 |
| `test/skeleton/auth.test.ts` | Business logic | 7 |
| `test/skeleton/app.test.ts` | API/endpoint integration | 3 |

**Total: 14 tests, all passing.**

## Implementation Decisions

1. **`moduleResolution: bundler`** — Used instead of `NodeNext` to avoid requiring `.js` extensions on every import; tsx and vitest both handle this cleanly.
2. **`uuid` package omitted** — `crypto.randomUUID()` is built-in to Node.js 22 (per NFR tech-stack-decisions.md). Feature units use it directly without a package dependency.
3. **Express Request augmentation** — `auth?: AuthContext` declared in `globals.d.ts`-style via `declare global` in `auth.ts`. Optional (`?`) because `auth` is not present before `requireAuth` runs; downstream middleware and routes access it safely after the guard.
4. **auth.test.ts has 7 tests** — Plan specified 6 (5 AC-driven + 1 happy-path). Added one extra happy-path test for `requireRole` to satisfy the minimal strategy's "at least one happy-path per component" obligation.
5. **Store is a plain mutable singleton** — matches the spec exactly; `reset()` and `seed()` are simple array operations. No class or repository abstraction added at skeleton stage.
6. **Server binding** — `app.listen(3000, '127.0.0.1')` — port first, then host, never `0.0.0.0` (BR2.1).

## Test Coverage Summary

| Requirement | Test | File |
|---|---|---|
| NFR3.1 — store arrays | `store.doctors` and `store.leaveRequests` start as arrays | store.test.ts |
| NFR3.3 / BR2.2 — reset | `reset()` clears both collections | store.test.ts |
| NFR3.3 — seed | `seed()` adds at least one Doctor and one LeaveRequest | store.test.ts |
| NFR3.3 — reset+seed | after reset then seed, both non-empty | store.test.ts |
| BR1.1 (AC1.1.1) | missing X-User-Id → 401 | auth.test.ts |
| BR1.2 (AC1.1.2) | missing X-User-Role → 401 | auth.test.ts |
| BR1.3 (AC1.1.5) | unknown role → 403 | auth.test.ts |
| BR1.4 (AC1.1.3) | doctor on manager route → 403 | auth.test.ts |
| BR1.4 (AC1.1.4) | manager on doctor route → 403 | auth.test.ts |
| happy path | valid headers → auth attached, next() called | auth.test.ts |
| requireRole happy | correct role → next() called | auth.test.ts |
| W1/W2 integration | valid auth passes, 404 on empty stub | app.test.ts |
| BR1.1 integration | no X-User-Id → 401 at HTTP level | app.test.ts |
| BR2.1 | Supertest loopback connects successfully | app.test.ts |

## Deviations

None. All plan steps completed as specified. The only minor deviation is 7 auth tests instead of the planned 6 — the extra test adds a happy-path for `requireRole`, which the minimal strategy requires.
