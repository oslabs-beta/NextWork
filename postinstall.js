import * as fs from 'node:fs';
import * as path from 'node:path';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
import packageJson from packageJsonPath;

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['nextWorkDev'] =
  'node --require ./node_modules/next-work/lib/nextWork.js ./node_modules/.bin/next dev';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
