import fs from 'fs';
import esbuild from 'esbuild';
import { globSync } from 'glob';

// const entryPoints = globSync('./packages/**/*.ts')

// await esbuild.build({
//   entryPoints: entryPoints,
//   bundle: true,
//   minify: true,
//   format: 'esm',
//   sourcemap: true,
//   outdir: 'build',
//   platform: 'node',
//   target: 'node14',
//   keepNames: true,
// });

const packageBase = JSON.parse(fs.readFileSync('./package.json'));

const version = packageBase.version.split('.');
version[2] = Number(version[2]) + 1;

packageBase.version = version.join('.');

const { scripts, devDependencies, type, ...common } = packageBase;
const packageBuild = common;

fs.writeFileSync('./build/package.json', JSON.stringify(packageBuild, null, 2));
fs.writeFileSync('./package.json', JSON.stringify(packageBase, null, 2));
