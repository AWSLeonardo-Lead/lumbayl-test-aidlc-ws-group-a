# Performance Design — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- performance-requirements.md (N/A)

## Design

Not applicable for this unit and scope.

Performance optimisation patterns (caching, connection pooling, async processing) are not required. The project is a local workshop with no deployment environment and no throughput targets. All doctor data is held in a plain in-memory array; reads and writes are synchronous O(n) operations over a dataset bounded by the test seed, which is acceptable.
