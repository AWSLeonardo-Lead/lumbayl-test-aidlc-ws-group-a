# Technical Environment: Clinic Leave (test exercise)

Saved as `aidlc/spaces/default/knowledge/aidlc-shared/technical-environment.md`
in the test repository. Every stage reads it. Kept as small as possible so the
whole flow runs quickly.

## 1. Language and version

TypeScript 5.x on Node.js 22. ES modules. `strict` mode on. Run with `tsx`;
no build step.

## 2. Package manager

npm. One `package.json`, created by the walking skeleton with every
dependency. Feature Units add none.

## 3. Web framework

Express 5, JSON only. No screens.

## 4. Deployment

Local only. `npm start` runs the server on `127.0.0.1`, port 3000 (never
`0.0.0.0`). No cloud, no containers, no AWS services.

## 5. Tests

Vitest with Supertest. `npm test` runs everything. Each Unit's tests live in
`test/<feature>/`.

## 6. Data

No database. The skeleton's `src/shared/store.ts` holds two in-memory
collections, `doctors` and `leave`, with `reset()` and `seed()` for tests.
Feature code reads and writes only through it.

## 7. Prohibited

| Prohibited | Use instead |
|---|---|
| Any database, ORM or external service | `src/shared/store.ts` |
| Authentication libraries | The `X-User-Id` and `X-User-Role` headers, read by the skeleton's `src/shared/auth.ts` |
| New dependencies in a feature Unit | Ask the lead |

## 8. Layout

```text
src/
  app.ts               # skeleton: Express app, mounts both feature routers
  server.ts            # skeleton: listens on 127.0.0.1
  shared/
    store.ts           # skeleton: in-memory doctors and leave, reset(), seed()
    auth.ts            # skeleton: req.user from headers, requireRole()
    errors.ts          # skeleton: error handler, zod errors become 400
  features/
    doctors/router.ts  # doctors Unit (skeleton creates an empty router)
    leave/router.ts    # leave Unit (skeleton creates an empty router)
test/
  setup.ts             # skeleton: resets the store before each test
  doctors/
  leave/
```

Validate every request body with `zod`. Missing headers get 401; the wrong
role gets 403.
