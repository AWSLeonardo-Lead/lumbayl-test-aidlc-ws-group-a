# Units Generation — Decomposition Plan

> Project: clinic-leave | Depth: Minimal | Skeleton: on

## Unit Boundary Strategy

Feature-by-feature, skeleton-first. Each feature (doctors, leave) is a separate Unit that depends only on the skeleton. The project rules mandate this shape explicitly.

## Proposed Units

| # | ID | Directory | Kind | Description | Complexity |
|---|---|---|---|---|---|
| 1 | U1 | u1-skeleton | service | Walking skeleton — all shared files required by more than one Unit: package.json, src/app.ts, src/server.ts, src/shared/store.ts, src/shared/auth.ts, src/shared/errors.ts, Vitest+Supertest setup | M |
| 2 | U2 | u2-doctors | service | Doctors feature — POST /doctors, GET /doctors, Doctors tests | S |
| 3 | U3 | u3-leave | service | Leave feature — POST /leave, PATCH /leave/:id, GET /leave, Leave tests | M |

## Dependency DAG

```
u1-skeleton
    ├── u2-doctors (depends on u1-skeleton)
    └── u3-leave   (depends on u1-skeleton)
```

u2-doctors and u3-leave are **independent** of each other and may be built in parallel.

## Deployment Model

Single monolithic Express application. All units deploy together. The skeleton creates the shared app entry point; feature units add routes to it.

## Walking Skeleton

U1 (u1-skeleton) is the integrated slice. It must create a running Express app with both feature routers mounted (each initially empty) and a passing test suite. Later units add their routes inside their own feature folders only.

[Answer]: Approve Plan. Two people build in parallel (one clone each) after the skeleton lands. Each feature Unit owns its own source folder, does not touch shared files or the other Unit's files.
