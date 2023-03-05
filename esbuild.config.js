import esbuild from 'esbuild';
import { globSync } from 'glob';

const entryPoints = globSync('./packages/**/*.ts')

esbuild.buildSync({
  entryPoints: entryPoints,
  bundle: true,
  minify: true,
  format: 'cjs',
  sourcemap: true,
  outdir: 'build',
  platform: 'node',
  target: 'node14',
  keepNames: true,
})
