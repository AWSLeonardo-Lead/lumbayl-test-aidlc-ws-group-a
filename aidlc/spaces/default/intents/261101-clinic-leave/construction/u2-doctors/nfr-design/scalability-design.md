# Scalability Design — u2-doctors

## Sources

- [desc] Initial description: Read ./vision.md and build what it describes
- [scope] Workflow-selected scope: workshop
- scalability-requirements.md (N/A)

## Design

Not applicable for this unit and scope.

Horizontal scaling, load balancing, and data partitioning patterns are not required. The project is a single-process local workshop. The in-memory `doctors` array scales trivially within one process; multi-process or distributed scaling is out of scope.
