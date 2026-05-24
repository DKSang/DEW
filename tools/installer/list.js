const fs = require('node:fs');
const path = require('node:path');

function readCatalog(modulePath) {
  const catalogPath = path.join(modulePath, 'module-help.csv');
  if (!fs.existsSync(catalogPath)) {
    return { catalogPath, rows: [] };
  }
  const content = fs.readFileSync(catalogPath, 'utf8').trim();
  const rows = content.split(/\r?\n/).slice(1).filter(Boolean);
  return { catalogPath, rows };
}

function listModules() {
  const packageRoot = path.resolve(__dirname, '../..');
  const srcRoot = path.join(packageRoot, 'src');
  const modules = ['core-skills', 'dew-skills'];

  console.log('Bundled DEW modules:');

  for (const moduleName of modules) {
    const modulePath = path.join(srcRoot, moduleName);
    const moduleYaml = path.join(modulePath, 'module.yaml');
    const exists = fs.existsSync(moduleYaml);
    const { rows } = readCatalog(modulePath);
    console.log(`- ${moduleName}: ${exists ? 'present' : 'missing'} (${rows.length} catalog rows)`);
  }
}

module.exports = { listModules };
