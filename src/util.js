import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import riot from 'rollup-plugin-riot'

export function getRollupPlugins(options) {
  return [
    riot(options.riot),
    nodeResolve(options.resolve),
    commonjs(options.commonjs),
    babel({
      presets: [[require.resolve('@babel/preset-typescript'), {
        allExtensions: true
      }]],
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts', '.riot', '.html'],
      ...options.babel
    })
  ]
}