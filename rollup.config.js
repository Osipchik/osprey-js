import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
// import terser from '@rollup/plugin-terser';
const packageJson = require('./package.json');
import { getFolders } from './scripts/buildUtils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const plugins = [
  json(),
  peerDepsExternal(),
  resolve(),
  replace({
    __IS_DEV__: process.env.NODE_ENV === 'development',
    preventAssignment: true,
  }),
  commonjs(),
  typescript(),
  // terser(),
];

const subfolderPlugins = (folderName) => [
  ...plugins,
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${folderName}`,
      private: true,
      main: '../cjs/index.js',
      module: './index.js',
      types: './index.d.ts',
    },
  }),
];
const folderBuilds = getFolders('./packages').map((folder) => {
  return {
    input: `packages/${folder}/index.ts`,
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
      format: 'esm',
    },
    plugins: subfolderPlugins(folder),
  };
});

export default [
  {
    input: ['packages/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
    external: ['node'],
  },
  ...folderBuilds,
  {
    input: ['packages/index.ts'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
    external: ['node'],
  },
  {
    input: './packages/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts.default(),
    ],
  }
];
