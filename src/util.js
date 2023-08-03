import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { createRequire } from 'node:module'
import riot from 'rollup-plugin-riot'

const require = createRequire(import.meta.url)

export function getRollupPlugins(options) {
  return [
    json(options.json),
    riot(options.riot),
    nodeResolve(options.resolve),
    commonjs(options.commonjs),
    babel({
      presets: [
        [
          require.resolve('@babel/preset-typescript'),
          {
            allExtensions: true,
          },
        ],
      ],
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts', '.riot', '.html'],
      ...options.babel,
    }),
  ]
}
