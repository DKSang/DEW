---
title: "DEW Installation Guide"
status: final
created: 2026-05-24
updated: 2026-05-24
workflow: dew
phase: "4-implementation"
stepsCompleted:
  - step-01-init
  - step-02-load-package-context
  - step-03-create-installation-guide
decisionGates:
  GATE-33-installation-docs:
    status: approved
---

# DEW Installation Guide: v1.0.0

## 0. Purpose
This guide explains how to install the Data Engineering Workflow (DEW) skill module.

## 1. Prerequisites
- **Gemini CLI** (or compatible BMAD runtime).
- **BMad Core Module** installed in `src/core-skills/`.
- Python 3.8+ (for utility scripts if needed).

## 2. Repository Layout
```text
src/
├── core-skills/ (Foundational utilities)
└── dew-skills/  (Professional Data Engineering Workflow)
    ├── module.yaml
    ├── module-help.csv
    ├── 1-analysis/
    ├── 2-plan-workflows/
    ├── 3-solutioning/
    └── 4-implementation/
```

## 3. Installation Options

### Option A — Use repo as skill source
The easiest way is to keep the `src/` folder as your main skill source.
1. Ensure `module.yaml` in `dew-skills` has `requires: core`.
2. The runtime will automatically pick up both modules.

### Option B — Copy module into agent skills directory
If you want to install it globally:
1. Copy the `dew-skills` folder to your agent's global skills path.
2. Ensure `core-skills` is also present in that path.

## 4. Configuration
Expected configuration directory:
```text
_dew/
├── dew/
│   └── config.yaml (Main settings)
├── custom/ (Your TOML overrides)
└── ... (Artifact folders)
```

## 5. Verify Installation
Run the following command in chat:
`bmad-help`

You should see **Data Engineering Workflow** listed in the available modules.

## 6. First Run
Recommended first skill to start a project:
`dew-project-brief`

## 7. Upgrade Notes
- Initial release (v1.0.0). No previous versions to migrate from.

## 8. Known Caveats
- Optimized for Windows environment (PowerShell).
- Best with LLMs supporting large context windows.
