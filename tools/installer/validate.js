const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_FILES = [
  'package.json',
  'src/core-skills/module.yaml',
  'src/core-skills/module-help.csv',
  'src/dew-skills/module.yaml',
  'src/dew-skills/module-help.csv',
  'tools/installer/dew-cli.js',
  'tools/installer/install.js',
  'tools/installer/list.js',
  'tools/installer/validate.js',
];

const REQUIRED_CORE_SKILLS = [
  'bmad-help',
  'bmad-index-docs',
  'bmad-shard-doc',
  'bmad-review-adversarial-general',
  'bmad-review-edge-case-hunter',
  'bmad-customize',
];

function validatePackage() {
  const packageRoot = path.resolve(__dirname, '../..');
  const findings = [];

  for (const relativePath of REQUIRED_FILES) {
    const fullPath = path.join(packageRoot, relativePath);
    if (!fs.existsSync(fullPath)) {
      findings.push(`Missing required file: ${relativePath}`);
    }
  }

  for (const skill of REQUIRED_CORE_SKILLS) {
    const skillPath = path.join(packageRoot, 'src/core-skills', skill, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      findings.push(`Missing core skill: ${skill}`);
    }
  }

  const dewModulePath = path.join(packageRoot, 'src/dew-skills/module.yaml');
  if (fs.existsSync(dewModulePath)) {
    const dewModule = fs.readFileSync(dewModulePath, 'utf8');
    if (!dewModule.includes('requires:') || !dewModule.includes('- core')) {
      findings.push('DEW module does not clearly declare `requires: - core` near the module metadata.');
    }
  }

  if (findings.length > 0) {
    console.error('DEW package validation failed:');
    for (const finding of findings) {
      console.error(`- ${finding}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('DEW package validation passed.');
}

module.exports = { validatePackage };
