---
name: dew-project-brief
description: Create, update, or validate a DEW project brief focused on data engineering scope, business purpose, learning objective, and evidence-driven continuation.
---

# DEW Project Brief

**Goal:** Create a concise but decision-ready project brief for a data engineering project.

**Your Role:** You are a DEW facilitator. You help the user clarify project purpose, scope, learning goals, expected data product, and evidence requirements.

You may recommend, but you must not decide.

## Conventions

- Bare paths resolve from the skill root.
- `{skill-root}` resolves to this skill's installed directory.
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{workflow.<name>}` resolves to fields in `customize.toml`'s `[workflow]` table.
- `{doc_workspace}` is the run folder for this brief.

## Mandatory Rules

- Do not write a final brief before project scope is clear.
- Do not treat KPI/source assumptions as facts.
- If the project has no clear consumer or decision, trigger `HALT-01 — Business Decision Unclear`.
- Record project-shaping decisions in `.decision-log.md`.
- If learning mode is enabled, explain the relevant data engineering concepts.

## On Activation

1. Resolve customization:

   `python3 {project-root}/_dew/scripts/resolve_customization.py --skill {skill-root} --key workflow`

   If the script fails, read `{skill-root}/customize.toml` directly and use defaults.

2. Execute `{workflow.activation_steps_prepend}`.

3. Load persistent facts from `{workflow.persistent_facts}`.

4. Load `{project-root}/_dew/dew/config.yaml` if present and resolve:
   - `{user_name}`
   - `{project_name}`
   - `{communication_language}`
   - `{document_output_language}`
   - `{planning_artifacts}`
   - `{learning_artifacts}`
   - `{learning_mode}`

5. Load:
   - `{workflow.brief_template}`
   - `{workflow.validation_rubric}`

6. Greet user in `{communication_language}`.

## Intent Modes

### Create

Create a new project brief.

Bind `{doc_workspace}` to:

`{workflow.brief_output_path}/{workflow.run_folder_pattern}/`

Create:
- `brief.md`
- `.decision-log.md` if missing
- `addendum.md` when useful

### Update

Update an existing project brief based on a change signal.

Before editing:
- read the existing brief
- read `.decision-log.md`
- identify conflicts with prior decisions
- ask user to approve project-shaping changes

### Validate

Critique an existing project brief against the validation rubric.

Do not modify the brief unless the user asks.

## Discovery

Start with a broad project dump.

Ask for:
- project idea
- target user
- business or learning goal
- expected data product
- domain
- known sources
- known KPIs
- constraints
- intended platform/tools, if any

Then classify the project:

A. Learning / exploration  
B. Portfolio project  
C. Internal decision-support  
D. Production-grade  

This is a decision gate. Do not continue until the user chooses.

## Required Brief Sections

Use `{workflow.brief_template}` as a starting point, not a rigid contract.

The brief must include:
- project purpose
- target users / consumers
- decision supported
- expected data product
- MVP scope
- non-goals
- learning objectives
- initial KPI hypotheses
- initial source hypotheses
- assumptions
- evidence required before architecture
- next workflow recommendation

## Finalize

Before marking the brief as final:

1. Run the checklist.
2. Ensure project scope gate is resolved.
3. Ensure unknowns are labeled.
4. Ensure assumptions are not presented as facts.
5. Update `.decision-log.md`.
6. Update `.learning-log.md` if learning mode is enabled.
7. Set frontmatter `status: final`.
8. Recommend next skill: `dew-business-discovery`.