#!/usr/bin/env node

const { program } = require('commander');
const path = require('node:path');
const fs = require('node:fs');
const { installDew } = require('./install');
const { listModules } = require('./list');
const { validatePackage } = require('./validate');
const packageJson = require('../../package.json');

program
  .name('dew')
  .description('DEW CLI - Data Engineering Workflow skill installer')
  .version(packageJson.version);

program
  .command('install')
  .description('Install DEW skills into a project')
  .option('-d, --directory <path>', 'Installation directory', process.cwd())
  .option('--skip-core', 'Install only dew-skills without core-skills')
  .option('-y, --yes', 'Accept defaults and run non-interactively')
  .action((options) => {
    installDew(options);
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
