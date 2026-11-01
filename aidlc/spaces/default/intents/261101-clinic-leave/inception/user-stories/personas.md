# Personas — Clinic Leave API

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1.2: roles manager, doctor; FR2, FR3 role requirements)

## Assumptions & Open Questions

None.

---

## Persona 1: Clinic Manager

**Name**: Morgan (representative name)
**Role**: Clinic Manager
**Headers**: `X-User-Role: manager`

### Goals
- Maintain an accurate roster of doctors in the system.
- Review and action leave requests promptly so scheduling is not disrupted.
- Have a single view of all outstanding leave requests.

### Pain Points
- Having to track leave requests manually or outside the system.
- Uncertainty about which requests are still pending action.

### Context
Morgan manages day-to-day clinic operations. They interact with the API as an administrator: adding doctors when someone joins the clinic and approving or rejecting leave as requests come in.

### Priority
**Primary persona** — owns the approval workflow and doctor management.

---

## Persona 2: Doctor

**Name**: Dr. Asha / Dr. Ben (representative names from vision.md)
**Role**: Doctor
**Headers**: `X-User-Role: doctor`

### Goals
- Submit leave requests without friction.
- Know the status of each request without needing to ask the manager directly.

### Pain Points
- Not knowing whether a submitted request has been seen or actioned.
- Having to submit requests through informal channels (email, chat).

### Context
Doctors interact with the API to submit their own leave and check status. They can see their own requests only — they cannot see other doctors' requests or manage doctor records.

### Priority
**Secondary persona** — drives the submission side of the workflow.

---

## Persona Relationships

| Persona | Creates doctors? | Submits leave? | Views all leave? | Actions leave? |
|---|---|---|---|---|
| Manager | Yes | No | Yes | Yes |
| Doctor | No | Yes (own) | No (own only) | No |
