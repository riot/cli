export default {
  input: 'index.js',
  output: [
    {
      banner: '#!/usr/bin/env node',
      file: 'cli.js',
      format: 'es',
    },
    {
      banner: '#!/usr/bin/env node',
      file: 'cli.cjs',
      format: 'cjs',
    },
  ],
}
