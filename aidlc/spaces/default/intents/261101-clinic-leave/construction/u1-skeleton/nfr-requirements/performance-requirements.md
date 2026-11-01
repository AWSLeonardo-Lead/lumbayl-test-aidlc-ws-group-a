# Performance Requirements — u1-skeleton

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR1, NFR2, NFR3)
- functional-spec.md (W1–W4)

## Assumptions & Open Questions

None.

---

## Performance Targets

This is a local workshop project. No SLA, throughput target, or latency budget applies. The server runs on the developer's machine, handles one developer at a time, and has no concurrent load requirements.

| ID | Requirement | Target | Source |
|---|---|---|---|
| NFR1.1 | Server bind address | Must listen exclusively on 127.0.0.1:3000; no external network interface | NFR1 |

No further performance requirements are applicable to this scope.
