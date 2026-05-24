# DEW Troubleshooting

## Issue: Skill cannot find artifact
**Cause**: The previous skill was not finished or variables in `module.yaml` are pointing to wrong paths.
**Fix**: 
1. Run `dew-evidence-check` to see what is missing.
2. Check `_dew/dew/config.yaml` paths.

## Issue: HALT-17 Implementation Not Ready
**Cause**: You are trying to create stories before the design is validated at the `Requirement Gate`.
**Fix**: Complete the design phase and pass the `Requirement Gate` first.

## Issue: Missing evidence (HALT-18)
**Cause**: Code was written but no run logs or output samples were captured.
**Fix**: Use `dew-dev-story` to re-run validation and produce the required evidence files.
