import { file } from 'bun';

const packageBase = JSON.parse(file('./package.json'));
const readMe = JSON.parse(file('./README.md'));

// const version = packageBase.version.split('.');
// version[2] = Number(version[2]) + 1;
//
// packageBase.version = version.join('.');

const { scripts, devDependencies, type, ...common } = packageBase;
const packageBuild = common;

await Bun.write('./build/README.md', readMe);
await Bun.write('./build/package.json', JSON.stringify(packageBuild, null, 2));
