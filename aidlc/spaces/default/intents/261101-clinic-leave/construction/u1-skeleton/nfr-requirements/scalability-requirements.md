# Scalability Requirements — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR3)

## Assumptions & Open Questions

None.

---

## Scalability Requirements

This is a local workshop project. No scaling, load handling, or capacity planning applies.

| ID | Requirement | Detail | Source |
|---|---|---|---|
| NFR3.1 | Single-process, in-memory store | All data lives in a single Node.js process; no distributed store, no sharding, no replication | NFR3 |

No further scalability requirements apply.
