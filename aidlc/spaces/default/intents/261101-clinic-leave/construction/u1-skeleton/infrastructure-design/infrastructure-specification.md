# Infrastructure Specification — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- logical-components.md (u1-skeleton components)
- performance-design.md, security-design.md, scalability-design.md, reliability-design.md
- functional-spec.md (W1)
- components.md (Auth, InMemoryStore)
- contract-summary.md (C1, C2)

## Assumptions & Open Questions

None.

---

## Infrastructure

This is a local workshop project. There is no cloud infrastructure, no deployment environment, and no external services. The entire system runs as a single Node.js process on the developer's machine.

| Component | Runtime | Host | Network | Notes |
|---|---|---|---|---|
| Clinic Leave API | Node.js 22 process | Developer's machine (localhost) | 127.0.0.1:3000 | Started via `npm run dev` or `tsx src/server.ts` |
| Shared in-memory store | Node.js module (in-process) | Same process as API | N/A | No external persistence |

No cloud services, containers, databases, load balancers, CDNs, or managed services are used.
