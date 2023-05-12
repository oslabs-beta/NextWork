const { readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const packageJsonPath = path.resolve(process.cwd(), '../../package.json');
const json = readFileSync(packageJsonPath);
const packageJson = JSON.parse(json);

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['nextWorkDev'] =
  'node --require ./node_modules/next-work/dist/nextWork.js ./node_modules/.bin/next dev';

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
