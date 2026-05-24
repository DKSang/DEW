---
name: bmad-review-edge-case-hunter
description: 'Walk branching paths and boundary conditions in content, reporting only unhandled edge cases.'
---

# Edge Case Hunter Review

**Goal:** Find unhandled edge cases by systematically walking branches and boundaries.

Do not comment on whether the content is generally good or bad. Report only missing handling.

## Inputs

- `content` — diff, full file, function, spec, story, or data artifact.
- `also_consider` optional — specific risk areas to include.

## Execution

### Step 1 — Receive Content

- Load content strictly from provided input.
- If content is empty or undecodable, return a finding that valid content is required and stop.
- Identify scope: diff, full file, function, spec, or artifact.

### Step 2 — Exhaustive Path Analysis

Walk:
- conditionals
- loops
- error paths
- early returns
- null/empty values
- min/max boundaries
- missing default cases
- invalid types
- timeout/retry gaps
- concurrent/race conditions where applicable

For DEW/data engineering artifacts, also walk:
- missing source rows
- duplicate rows
- late-arriving data
- schema drift
- partial source refresh
- freshness miss
- grain mismatch
- DQ false positive/negative
- failed backfill/replay
- serving user misinterpretation

### Step 3 — Validate Completeness

Revisit each edge class and keep only unhandled conditions.

### Step 4 — Present Findings

Return a JSON array of objects:

```json
[
  {
    "location": "artifact or file section",
    "trigger_condition": "short edge condition",
    "guard_snippet": "minimal guard or mitigation",
    "potential_consequence": "what could go wrong"
  }
]
```

An empty array `[]` is valid only after exhaustive review.

## HALT Conditions

- If content is empty or undecodable, stop and request valid content.
