# Vision: Clinic Leave (test exercise)

A throw-away exercise for testing the workshop flow end to end. It is
deliberately tiny: a walking skeleton and two feature Units, so two clones can
claim, build, publish and merge.

## What we are building and for whom

A small API for one clinic. The clinic manager keeps a list of doctors.
Doctors request leave, and the manager approves or rejects it.

## Who uses it

| Role | Can do |
|---|---|
| **Manager** | Add doctors, list doctors, approve or reject leave, list all leave |
| **Doctor** | List doctors, request leave, list their own leave |

Users are identified by the `X-User-Id` and `X-User-Role` request headers
(`manager` or `doctor`). Real sign-in is out of scope.

## In the first release

1. **Doctors.** The manager adds a doctor with a name. Anyone can list the
   doctors. A doctor's `id` is a short text such as `asha`.
2. **Leave.** A doctor requests leave with a start date and an end date (end
   not before start). The request is `pending`. The manager approves or
   rejects it. A doctor lists their own requests; the manager lists all. A
   request for a doctor who is not on the doctors list is refused.

## Not in the first release

- Editing or deleting doctors, cancelling leave
- Overlap checks between leave requests
- Any screen, any deployment, any real data

## Example data for testing

- Doctors: `asha` (Asha Rao), `ben` (Ben Ochieng)
- Leave: `asha`, 2026-12-07 to 2026-12-09, pending

## Note for testers

Two feature Units, each depending only on the walking skeleton: `doctors` and
`leave`. The skeleton creates the in-memory store with both collections and a
test helper to seed them, so `leave` can test against doctors without the
`doctors` Unit's code.
