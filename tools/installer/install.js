const fs = require('node:fs');
const path = require('node:path');

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

function installDew(options = {}) {
  const targetRoot = path.resolve(options.directory || process.cwd());
  const packageRoot = path.resolve(__dirname, '../..');
  const sourceRoot = path.join(packageRoot, 'src');
  const targetSrcRoot = path.join(targetRoot, 'src');

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Package source folder not found: ${sourceRoot}`);
  }

  fs.mkdirSync(targetSrcRoot, { recursive: true });

  if (!options.skipCore) {
    copyDirectory(path.join(sourceRoot, 'core-skills'), path.join(targetSrcRoot, 'core-skills'));
  }

  copyDirectory(path.join(sourceRoot, 'dew-skills'), path.join(targetSrcRoot, 'dew-skills'));

  const installed = [options.skipCore ? null : 'src/core-skills', 'src/dew-skills'].filter(Boolean);

  console.log('DEW installation complete.');
  console.log(`Target: ${targetRoot}`);
  console.log('Installed:');
  for (const item of installed) {
    console.log(`- ${item}`);
  }
  console.log('Next: run `dew list` or inspect src/dew-skills/module-help.csv.');
}

module.exports = { installDew, copyDirectory };
