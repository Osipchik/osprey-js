import { file } from 'bun';

const packageFile = file('./package.json');
const readMeFile = file('./README.md');

const packageBase = await packageFile.json();
const readMe = await readMeFile.text();

// const version = packageBase.version.split('.');
// version[2] = Number(version[2]) + 1;
//
// packageBase.version = version.join('.');

const { scripts, devDependencies, type, ...common } = packageBase;
const packageBuild = common;

await Bun.write('./build/README.md', readMe);
await Bun.write('./build/package.json', JSON.stringify(packageBuild, null, 2));
