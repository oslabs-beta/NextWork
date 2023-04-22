const { readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const packageJsonPath = path.resolve(process.cwd(), '../../package.json');
const json = readFileSync(packageJsonPath);
const packageJson = JSON.parse(json);

packageJson.scripts = packageJson.scripts || {};

if (packageJson.scripts.hasOwnProperty('nextWorkDev')) {
  delete packageJson.scripts['nextWorkDev'];
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
