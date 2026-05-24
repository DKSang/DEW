---
title: "DEW Example Project Walkthrough"
status: final
created: 2026-05-24
updated: 2026-05-24
workflow: dew
phase: "4-implementation"
stepsCompleted:
  - step-01-init
  - step-02-select-example-scenario
  - step-03-create-quickstart-flow
decisionGates:
  GATE-34-example-quality:
    status: approved
---

# DEW Example Project Walkthrough: Weather Advisory

## 0. Purpose
This walkthrough demonstrates how to use DEW on a small "Weather Advisory" project.

## 1. Scenario: Simple Weather Data Product
- **Goal**: Create a data product that provides daily weather summaries for farmers using the Open-Meteo API.
- **Consumer**: Agricultural advisors.

## 2. Minimal Workflow (Quickstart)

### Step 1: Initialize
`dew-project-brief` -> Define goal: "Provide daily temp/rain summaries for district X."

### Step 2: Discovery
`dew-kpi-discovery` -> KPI: `Avg Daily Temperature`, `Total Rainfall`.
`dew-source-discovery` -> Source: `Open-Meteo API`.

### Step 3: Validation
`dew-kpi-feasibility` -> Check if API provides rain/temp. (Yes).
`dew-source-validation` -> Check API access. Capture sample. (Success).

### Step 4: Requirement Gate
`dew-requirement-gate` -> **Approval**: "KPIs are feasible, Source is reliable. Proceed to architecture."

### Step 5: Design
`dew-data-architecture` -> Design Bronze (JSON response) -> Silver (Parquet with types) -> Gold (Daily stats).
`dew-data-quality-design` -> Rule: `Rainfall >= 0`, `Temp in range (-50, 50)`.

### Step 6: Implementation
`dew-create-data-story` -> "Ingest Open-Meteo to Bronze".
`dew-dev-story` -> Write Python script + Capture run log (Evidence).
`dew-story-validation` -> Check row counts and JSON schema.

### Step 7: Release
`dew-e2e-validation` -> Validate E2E flow from API to Gold.
`dew-release-readiness` -> **Final Decision**: "Release Weather Advisory v1.0.0".

## 3. Example Artifact Map

| DEW Step | Artifact | Example Content |
|---|---|---|
| Project Brief | `project-brief.md` | "Daily weather summaries for farmer advisors." |
| KPI Feasibility | `kpi-feasibility-report.md` | "Open-Meteo provides all required fields." |
| Requirement Gate | `requirement-gate-report.md` | "GO: Requirements validated." |
| Data Story | `1.1-ingest-weather.md` | "As a DE, I want to ingest API data..." |
| E2E Validation | `e2e-validation-report.md` | "All layers verified with valid samples." |

## 4. Expected Learning
- How to separate **Analysis** from **Design**.
- Why **Evidence** is required at every stage.
- How to handle **Gates** to prevent "hallucinated" data products.
