# Delivery Planning — Questions

> Project: clinic-leave | Depth: Minimal | Skeleton: on

## Q1. What should we build first?

Walking-skeleton-first: build the smallest working end-to-end slice (U1) first, then the two feature Bolts in parallel. This proves the shared foundation works before feature work starts.

[Answer]: Walking skeleton first (U1), then U2 and U3 in parallel once the skeleton is merged.

## Q2. Formal sequencing model?

Walking-skeleton-first is the primary heuristic. No WSJF scoring needed — the DAG has one topological constraint (U1 before U2/U3) and two equally-valued independent features.

[Answer]: Skeleton-first. No formal WSJF scoring required for this project.

## Q3. Bolt size?

One Unit per Bolt — the three units (skeleton, doctors, leave) map cleanly to three Bolts. No bundling needed.

[Answer]: One Unit per Bolt.

## Q4. Parallel or serial?

Bolt 1 (skeleton) must complete before Bolts 2a and 2b. Bolts 2a (doctors) and 2b (leave) are independent and can be built in parallel by two developers, each in their own clone.

[Answer]: Serial for Bolt 1; Bolts 2a and 2b in parallel.

## Q5. External dependencies?

None. Local workshop project, no external APIs, no third-party integrations, no approval lead times.

[Answer]: No external dependencies.

## Q6. Biggest risk?

The shared store contract (C2). If the skeleton's store shape changes after feature units branch, both feature units break. Mitigation: C2 is owned exclusively by U1 and is locked before feature units start.

[Answer]: Store contract stability. Mitigated by C2 ownership rule.
