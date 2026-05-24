# DEW

Data Engineering Workflow skills packaged as a BMAD-style installable module.

## Install with npx

```bash
npx dew-method install --directory .
```

This installs:

```text
src/core-skills/
src/dew-skills/
```

## CLI commands

```bash
dew install --directory .
dew list
dew validate
```

## Local development

```bash
npm install
npm run validate:package
npm run pack:dry-run
```

## Package layout

```text
src/
├── core-skills/
└── dew-skills/

tools/
└── installer/
    ├── dew-cli.js
    ├── install.js
    ├── list.js
    └── validate.js
```

## Notes

DEW uses a minimal BMAD-style packaging approach:

- `package.json` exposes `dew` and `dew-method` binaries.
- `tools/installer/dew-cli.js` is the CLI entrypoint.
- `dew install` copies bundled skills into a target project.
- `dew validate` checks required runtime files before publishing.
