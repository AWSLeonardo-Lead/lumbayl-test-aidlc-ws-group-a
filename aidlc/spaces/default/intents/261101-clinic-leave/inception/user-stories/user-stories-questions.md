# User Stories — Story Plan

> Project: clinic-leave | Depth: Minimal | No open questions — requirements are complete.

## Personas

Two personas derived from the requirements:
1. **Clinic Manager** — manages doctors and controls leave approvals.
2. **Doctor** — submits leave requests and tracks their status.

## Story Breakdown Approach

Breakdown by **feature area / user role workflow**:
- **US1** — Identity and Access (cross-cutting auth/authz)
- **US2** — Doctor Management (manager adds, all staff list)
- **US3** — Leave Request Management (doctor submits/views; manager approves/rejects/lists)

## Story Count and Priority

8 stories total, all Must Have (workshop scope — every requirement is core).

## INVEST Notes

Stories are kept at one-endpoint granularity: each story is independently testable via Supertest,
delivers visible API behaviour to a persona, and maps to one or two functional requirements.
