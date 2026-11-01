# Security Requirements — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (FR1.1, FR1.2, NFR2)
- rules.md (BR1.1–BR1.4)
- functional-spec.md (W2, W3)

## Assumptions & Open Questions

None.

---

## Security Requirements

| ID | Requirement | Detail | Source |
|---|---|---|---|
| NFR2.1 | Header-based identity assertion | Every request must carry `X-User-Id` and `X-User-Role`; either missing → HTTP 401 | FR1.1 |
| NFR2.2 | Role-based access control | Valid roles are `manager` and `doctor` only; unknown role → HTTP 403; wrong role for endpoint → HTTP 403 | FR1.2 |
| NFR2.3 | Input validation | All request bodies validated with `zod`; type errors, missing fields, and constraint violations → HTTP 400 with structured error body | NFR2 |
| NFR2.4 | No real authentication library | Identity is determined solely by headers; no JWT, session, or token library is used or required | requirements.md Constraints |
| NFR2.5 | Localhost only | Server must never bind to `0.0.0.0`; only `127.0.0.1:3000` is acceptable | NFR1 |

## Threat Considerations

This is a local workshop project with no external access. Threat surface is limited to:
- Malformed or missing identity headers — mitigated by BR1.1–BR1.4
- Malformed request bodies — mitigated by zod validation (NFR2.3)
- Accidental external binding — mitigated by NFR2.5 / BR2.1

No secrets, credentials, or persistent data are involved. No compliance framework applies.
