# Scalability Requirements — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- requirements.md (NFR3)

## Assumptions & Open Questions

None.

## Requirements

Not applicable for this unit and scope.

The project is a local workshop with a single-process in-memory store (NFR3). There are no concurrency targets, load projections, or horizontal scaling requirements. The `doctors` collection is an in-memory array with no size limit; it is reset between test runs via `store.reset()`.

| ID | Category | Requirement | Status |
|---|---|---|---|
| N/A | Concurrency | No concurrent request targets | Local single-user testing only |
| N/A | Data growth | No data growth projections | store.reset() between tests |
| N/A | Horizontal scaling | No scaling strategy | No deployment environment |
