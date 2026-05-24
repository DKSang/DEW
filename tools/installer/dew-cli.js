#!/usr/bin/env node

const { program } = require('commander');
const { installDew } = require('./install');
const { listModules } = require('./list');
const { validatePackage } = require('./validate');
const packageJson = require('../../package.json');

program
  .name('dew')
  .description('DEW CLI - Data Engineering Workflow installer')
  .version(packageJson.version);

program
  .command('install')
  .description('Install DEW runtime, modules, output folders, and agent skills into a project')
  .option('-d, --directory <path>', 'Installation directory', process.cwd())
  .option('-y, --yes', 'Accept defaults and run non-interactively')
  .option('--user-name <name>', 'Name for DEW agents to use')
  .option('--project-name <name>', 'Project name')
  .option('--communication-language <lang>', 'Language for agent communication')
  .option('--document-output-language <lang>', 'Language for document output')
  .option('--output-folder <path>', 'Output folder path relative to project root', '_dew-output')
  .action((options) => {
    installDew(options).catch((error) => {
      console.error(`DEW installation failed: ${error.message}`);
      if (error.stack) console.error(error.stack);
      process.exit(1);
    });
  });

program
  .command('list')
  .description('List bundled DEW modules and skill catalogs')
  .action(() => {
    listModules();
  });

program
  .command('validate')
  .description('Validate package runtime files before publishing')
  .action(() => {
    validatePackage();
  });

program.parse(process.argv);

if (process.argv.slice(2).length === 0) {
  program.outputHelp();
}
