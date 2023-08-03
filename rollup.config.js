import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'cli.js',
      format: 'es',
    },
    {
      file: 'cli.cjs',
      format: 'cjs',
    },
  ],
  plugins: [
    // make sure that the json file gets bundled
    json({
      preferConst: true,
    }),
    resolve({
      resolveOnly: ['package.json'],
    }),
    commonjs(),
  ],
}
