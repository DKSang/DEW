const fs = require('node:fs');
const path = require('node:path');
const prompts = require('@clack/prompts');
const pc = require('picocolors');

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    throw new Error(`Missing source directory: ${source}`);
  }

  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function listSkillDirs(root) {
  if (!fs.existsSync(root)) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    const hasSkill = entries.some((entry) => entry.isFile() && entry.name === 'SKILL.md');

    if (hasSkill) {
      result.push(current);
      continue;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        stack.push(path.join(current, entry.name));
      }
    }
  }

  return result.sort();
}

function copyAgentSkills(sourceRoot, agentsSkillsRoot) {
  fs.mkdirSync(agentsSkillsRoot, { recursive: true });
  const skillDirs = [
    ...listSkillDirs(path.join(sourceRoot, 'core-skills')),
    ...listSkillDirs(path.join(sourceRoot, 'dew-skills')),
  ];

  for (const skillDir of skillDirs) {
    const skillName = path.basename(skillDir);
    copyDirectory(skillDir, path.join(agentsSkillsRoot, skillName));
  }

  return skillDirs.length;
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8').trim() : '';
}

function buildHelpCatalog(sourceRoot, outputPath) {
  const catalogs = [
    path.join(sourceRoot, 'core-skills', 'module-help.csv'),
    path.join(sourceRoot, 'dew-skills', 'module-help.csv'),
  ];

  const lines = [];
  for (const catalog of catalogs) {
    const content = readIfExists(catalog);
    if (!content) continue;
    const [header, ...rows] = content.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) lines.push(header);
    lines.push(...rows);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');
  return Math.max(lines.length - 1, 0);
}

function writeConfig(targetRoot, answers) {
  const configPath = path.join(targetRoot, '_dew', 'config.yaml');
  const content = [
    `user_name: "${answers.userName}"`,
    `project_name: "${answers.projectName}"`,
    `communication_language: "${answers.communicationLanguage}"`,
    `document_output_language: "${answers.documentOutputLanguage}"`,
    `output_folder: "${answers.outputFolder}"`,
    `planning_artifacts: "${answers.outputFolder}/planning-artifacts"`,
    `implementation_artifacts: "${answers.outputFolder}/implementation-artifacts"`,
    `evidence_artifacts: "${answers.outputFolder}/evidence-artifacts"`,
    `learning_artifacts: "${answers.outputFolder}/learning-artifacts"`,
    'project_knowledge: "docs"',
    'guided_interview_mode: "true"',
    'question_batch_size: "1"',
    'beginner_prompt_style: "true"',
    '',
  ].join('\n');

  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, content, 'utf8');
}

function createRuntimeDirs(targetRoot, outputFolder) {
  const dirs = [
    '_dew',
    '_dew/_config',
    '_dew/custom',
    '_dew/scripts',
    outputFolder,
    `${outputFolder}/planning-artifacts`,
    `${outputFolder}/implementation-artifacts`,
    `${outputFolder}/evidence-artifacts`,
    `${outputFolder}/learning-artifacts`,
    '.agents/skills',
    'docs',
  ];

  for (const dir of dirs) {
    fs.mkdirSync(path.join(targetRoot, dir), { recursive: true });
  }

  return dirs;
}

function installRuntimeScripts(packageRoot, targetRoot) {
  const runtimeScriptsRoot = path.join(packageRoot, 'tools', 'runtime', 'scripts');
  const targetScriptsRoot = path.join(targetRoot, '_dew', 'scripts');

  if (fs.existsSync(runtimeScriptsRoot)) {
    copyDirectory(runtimeScriptsRoot, targetScriptsRoot);
  }

  return fs.existsSync(targetScriptsRoot)
    ? fs.readdirSync(targetScriptsRoot).filter((file) => fs.statSync(path.join(targetScriptsRoot, file)).isFile()).length
    : 0;
}

function installGuidedInterviewPolicy(sourceRoot, targetRoot) {
  const sourcePolicy = path.join(sourceRoot, 'dew-skills', 'shared', 'guided-interview-policy.md');
  const targetPolicy = path.join(targetRoot, '_dew', 'guided-interview-policy.md');

  if (fs.existsSync(sourcePolicy)) {
    fs.copyFileSync(sourcePolicy, targetPolicy);
    return true;
  }

  return false;
}

function printBanner() {
  console.log(pc.cyan('╭────────────────────────────────────────────────────────────╮'));
  console.log(pc.cyan('│                      ██████╗ ███████╗██╗    ██╗           │'));
  console.log(pc.cyan('│                      ██╔══██╗██╔════╝██║    ██║           │'));
  console.log(pc.cyan('│                      ██║  ██║█████╗  ██║ █╗ ██║           │'));
  console.log(pc.cyan('│                      ██║  ██║██╔══╝  ██║███╗██║           │'));
  console.log(pc.cyan('│                      ██████╔╝███████╗╚███╔███╔╝           │'));
  console.log(pc.cyan('│                      ╚═════╝ ╚══════╝ ╚══╝╚══╝            │'));
  console.log(pc.cyan('│                 Data Engineering Workflow                  │'));
  console.log(pc.cyan('╰────────────────────────────────────────────────────────────╯'));
  console.log('');
  console.log(pc.dim('Evidence-driven data engineering. Inspired by BMAD-style skills.'));
  console.log('');
}

async function collectAnswers(options, targetRoot) {
  const directoryName = path.basename(targetRoot);

  if (options.yes) {
    return {
      userName: options.userName || 'DEW User',
      projectName: options.projectName || directoryName,
      communicationLanguage: options.communicationLanguage || 'English',
      documentOutputLanguage: options.documentOutputLanguage || 'English',
      outputFolder: options.outputFolder || '_dew-output',
    };
  }

  const userName = await prompts.text({
    message: 'What should DEW agents call you?',
    placeholder: 'DEW User',
    defaultValue: options.userName || 'DEW User',
  });
  if (prompts.isCancel(userName)) process.exit(0);

  const projectName = await prompts.text({
    message: 'What is your data project called?',
    placeholder: directoryName,
    defaultValue: options.projectName || directoryName,
  });
  if (prompts.isCancel(projectName)) process.exit(0);

  const communicationLanguage = await prompts.text({
    message: 'What language should DEW agents use when chatting with you?',
    defaultValue: options.communicationLanguage || 'English',
  });
  if (prompts.isCancel(communicationLanguage)) process.exit(0);

  const documentOutputLanguage = await prompts.text({
    message: 'Preferred document output language?',
    defaultValue: options.documentOutputLanguage || 'English',
  });
  if (prompts.isCancel(documentOutputLanguage)) process.exit(0);

  const outputFolder = await prompts.text({
    message: 'Where should output files be saved?',
    defaultValue: options.outputFolder || '_dew-output',
  });
  if (prompts.isCancel(outputFolder)) process.exit(0);

  return { userName, projectName, communicationLanguage, documentOutputLanguage, outputFolder };
}

async function installDew(options = {}) {
  printBanner();

  const targetRoot = path.resolve(options.directory || process.cwd());
  const packageRoot = path.resolve(__dirname, '../..');
  const sourceRoot = path.join(packageRoot, 'src');

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Package source folder not found: ${sourceRoot}`);
  }

  console.log(`Installation directory: ${targetRoot}`);
  fs.mkdirSync(targetRoot, { recursive: true });

  if (!options.yes) {
    const confirmInstall = await prompts.confirm({
      message: 'Install DEW to this directory?',
      initialValue: true,
    });
    if (prompts.isCancel(confirmInstall) || !confirmInstall) {
      console.log('Installation cancelled.');
      process.exit(0);
    }
  }

  const answers = await collectAnswers(options, targetRoot);
  const createdDirs = createRuntimeDirs(targetRoot, answers.outputFolder);

  copyDirectory(path.join(sourceRoot, 'core-skills'), path.join(targetRoot, '_dew', 'modules', 'core-skills'));
  copyDirectory(path.join(sourceRoot, 'dew-skills'), path.join(targetRoot, '_dew', 'modules', 'dew-skills'));

  const helpRows = buildHelpCatalog(sourceRoot, path.join(targetRoot, '_dew', '_config', 'dew-help.csv'));
  writeConfig(targetRoot, answers);
  const runtimeScriptCount = installRuntimeScripts(packageRoot, targetRoot);
  const hasGuidedPolicy = installGuidedInterviewPolicy(sourceRoot, targetRoot);
  const skillCount = copyAgentSkills(sourceRoot, path.join(targetRoot, '.agents', 'skills'));

  console.log('');
  console.log(pc.green('DEW is ready to use!'));
  console.log(`  ✓ Runtime: _dew`);
  console.log(`  ✓ Output folder: ${answers.outputFolder}`);
  console.log(`  ✓ Runtime scripts: ${runtimeScriptCount} script(s) → _dew/scripts`);
  console.log(`  ✓ Guided interview policy: ${hasGuidedPolicy ? 'installed' : 'not found'}`);
  console.log(`  ✓ Agent skills: ${skillCount} skills → .agents/skills`);
  console.log(`  ✓ Help catalog: ${helpRows} rows → _dew/_config/dew-help.csv`);
  console.log('');
  console.log('Created directories:');
  for (const dir of createdDirs) {
    console.log(`  - ${dir}`);
  }
  console.log('');
  console.log('Get started:');
  console.log('  1. Open your AI agent from the project folder.');
  console.log('  2. Invoke the dew-help skill and ask what to do next.');
}

module.exports = { installDew, copyDirectory, buildHelpCatalog, copyAgentSkills, installRuntimeScripts };
