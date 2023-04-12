const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['nextWorkDev'] =
  'node --require ./nextWork/nextWork.js ./node_modules/.bin/next dev';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
