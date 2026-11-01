# Performance Design — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- performance-requirements.md (NFR1.1)
- tech-stack-decisions.md

## Assumptions & Open Questions

None.

---

## Performance Design

This is a local workshop project. No caching, connection pooling, CDN, or async processing is required. The performance design is limited to the server binding constraint.

| NFR | Design Decision |
|---|---|
| NFR1.1 (127.0.0.1:3000) | `app.listen(3000, "127.0.0.1")` — explicit host and port in `src/server.ts`; no environment variable override; no 0.0.0.0 fallback |

No further performance design applies.
