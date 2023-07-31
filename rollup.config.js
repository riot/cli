import json from '@rollup/plugin-json'

export default {
  input: 'index.js',
  output: {
    banner: '#!/usr/bin/env node',
    file: 'cli.js',
    format: ['es', 'cjs'],
  },
  plugins: [json()],
}
