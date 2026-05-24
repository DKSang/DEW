# DEW

Data Engineering Workflow packaged as a DEW-native installable skill system.

## Before npm publish

Use the repo or a packed tarball locally:

```bash
git clone https://github.com/DKSang/DEW.git
cd DEW
npm install
node tools/installer/dew-cli.js install --directory ../my-project
```

Or during development:

```bash
npm link
dew install --directory ../my-project
```

## After npm publish

```bash
npx dew-method install --directory .
```

## Installed project layout

`dew install` creates a DEW-native runtime layout:

```text
your-project/
├── _dew/
│   ├── config.yaml
│   ├── _config/
│   │   └── dew-help.csv
│   ├── custom/
│   ├── scripts/
│   └── modules/
│       ├── core-skills/
│       └── dew-skills/
│
├── _dew-output/
│   ├── planning-artifacts/
│   ├── implementation-artifacts/
│   ├── evidence-artifacts/
│   └── learning-artifacts/
│
├── .agents/
│   └── skills/
│       ├── dew-help/
│       ├── dew-customize/
│       └── ...
│
└── docs/
```

## CLI commands

```bash
dew install --directory .
dew install --directory . --yes
dew install --directory . --user-name Dksang --communication-language Vietnamese
dew list
dew validate
```

## Local package checks

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

DEW uses its own runtime naming:

- `_dew/` for runtime config, module copies, custom overrides, and generated catalog.
- `_dew-output/` for planning, implementation, evidence, and learning artifacts.
- `.agents/skills/` for agent-consumable skill folders.
- `docs/` for long-term project knowledge.

BMAD inspired the install experience, but DEW uses DEW-branded folders and skill names such as `dew-help`, `dew-customize`, and `dew-review-adversarial`.
