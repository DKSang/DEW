# DEW Usage Guide

## Recommended Workflow
The Data Engineering Workflow follows a strict logical sequence to ensure evidence-based development:

### Phase 1: Analysis (Analysis of requirements)
- `dew-project-brief` (Start here)
- `dew-business-discovery`
- `dew-kpi-discovery`

### Phase 2: Plan Workflows (Feasibility & Validation)
- `dew-data-product-prd`
- `dew-kpi-feasibility`
- `dew-source-discovery`
- `dew-source-assessment`
- `dew-source-validation`
- `dew-requirement-gate` (Critical approval gate)

### Phase 3: Solutioning (Detailed Design)
- `dew-data-architecture`
- `dew-storage-design`
- `dew-ingestion-design`
- `dew-transformation-design`
- `dew-data-model-design`
- `dew-data-quality-design`
- `dew-serving-design`
- `dew-governance-security-design`
- `dew-dataops-design`
- `dew-create-epics-and-stories` (Handoff to code)

### Phase 4: Implementation (Execution)
- `dew-sprint-planning`
- `dew-create-data-story`
- `dew-dev-story` (Coding and evidence)
- `dew-code-review`
- `dew-story-validation`
- `dew-e2e-validation`
- `dew-release-readiness`
- `dew-project-documentation`

## How to Handle HALT
When a skill triggers a **HALT**, it means a critical piece of information or evidence is missing.
1. Use `dew-halt-resolver` to understand the risk.
2. Provide the missing context or evidence.
3. Resume the workflow.

## How to Handle Gates
Gates (e.g., `Requirement Gate`) are human-in-the-loop checkpoints.
- You must review the options and recommendations.
- Provide a choice (e.g., "A. Approve") to proceed.

## Recommended Project Modes
- **Learning mode**: DEW will explain FDE concepts and trade-offs.
- **Production mode**: Focused on speed and evidence compliance.
