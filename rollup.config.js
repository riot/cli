import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import {nodeResolve} from '@rollup/plugin-node-resolve'

export default {
  input: 'index.js',
  external: ['rollup'],
  output: {
    banner: '#!/usr/bin/env node',
    file: 'cli.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    nodeResolve(),
    commonjs()
  ]
}
