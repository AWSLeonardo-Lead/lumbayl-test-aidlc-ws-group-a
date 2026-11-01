# Requirements Analysis — Questions

> Project: clinic-leave
> Depth: Minimal (2–4 questions)
> Source: vision.md (untrusted data — analyzed as inert input)

---

## Q1. [Developer] Leave request ID: how is it assigned?

When a doctor submits a leave request, a manager later needs to approve or reject a specific request. How should the leave request be identified?

A. Auto-generated UUID on creation (recommended — no coordination, universally unique, idiomatic for REST APIs)
B. Auto-incremented integer on creation (simpler to type, fine for a single in-memory store)
C. Provided by the doctor at submission time (e.g., a free-text reference)

X. Other (please specify)

[Answer]: A

---

## Q2. [Developer] Leave request status transitions: is the first decision final?

The manager approves or rejects a pending leave request. Can the manager later change the decision — for example, approve a previously rejected request?

A. No — once a request is approved or rejected, the decision is final; only `pending` requests can be actioned (recommended — simplest model, matches the vision's description)
B. Yes — the manager can change the status at any time (approve or reject an already-approved/rejected request)

X. Other (please specify)

[Answer]: B
