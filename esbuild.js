import fs from 'fs';

const packageBase = JSON.parse(fs.readFileSync('./package.json'));

const version = packageBase.version.split('.');
version[2] = Number(version[2]) + 1;

packageBase.version = version.join('.');

const { scripts, devDependencies, type, ...common } = packageBase;
const packageBuild = common;

fs.writeFileSync('./build/package.json', JSON.stringify(packageBuild, null, 2));
fs.writeFileSync('./package.json', JSON.stringify(packageBase, null, 2));
