---
name: bmad-help
description: 'Analyzes current state and user query to answer BMad/DEW questions or recommend the next skill(s) to use.'
---

# BMad Help

## Purpose

Help the user understand where they are in the installed workflow and what to do next.

## Desired Outcomes

When this skill completes, the user should:

1. Know where they are — which module and phase they are in, and what has already been completed.
2. Know what to do next — the next recommended and/or required step, with clear reasoning.
3. Know how to invoke it — skill name, menu code, and args when available.
4. Get offered a quick start when a single next skill is clear.
5. Feel oriented, not overwhelmed.
6. Get grounded answers to general module questions using registered module docs.

## Data Sources

- Catalog: `{project-root}/_bmad/_config/bmad-help.csv` — assembled manifest of all installed module skills.
- Config: `config.yaml` and `user-config.yaml` files in `{project-root}/_bmad/` and subfolders.
- Artifacts: Files matching `outputs` patterns at resolved `output-location` paths.
- Project knowledge: If `project_knowledge` resolves to an existing path, read it for grounding context.
- Module docs: Rows with `_meta` in the `skill` column may point to documentation such as `llms.txt`.

## CSV Interpretation

Catalog format:

```csv
module,skill,display-name,menu-code,description,action,args,phase,preceded-by,followed-by,required,output-location,outputs
```

Phases:
- `anytime` — available regardless of workflow state.
- Numbered phases flow in order.

Sequencing:
- `preceded-by` — skills that should ideally complete before this one.
- `followed-by` — skills that should ideally run after this one.
- Format: `skill-name` or `skill-name:action`.

Required gates:
- `required=true` items must complete before moving meaningfully to later phases.

Completion detection:
- Search resolved output paths for `outputs` patterns.
- Fuzzy-match found files to catalog rows.
- Accept explicit user statements when grounded in context.

## Response Format

For each recommended item, present:

- `[menu-code]` **Display name**
- Skill name in backticks
- Description
- Args if available
- Why it is recommended now

Show optional items first, then the next required item. Keep the response focused.

## Constraints

- Present output in `{communication_language}` when available.
- Recommend running each skill in a fresh context window.
- Match the user's tone.
- Never fabricate project-specific status.
