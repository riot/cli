import {babel} from '@rollup/plugin-babel'
import {info} from './logger'
import riot from 'rollup-plugin-riot'
import {watch as rollupWatch} from 'rollup'

/**
 * Watch riot tags via rollup
 * @param {Object} options - user options
 * @return {Array<chokidar>} chokidar instances
 */
export default async function watch(options) {
  info('Watching...', options.input)

  const {input, output} = options

  return rollupWatch({
    input,
    output,
    plugins: [
      riot(options.riot),
      babel({
        presets: [['@babel/preset-typescript', {
          allExtensions: true
        }]],
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts', '.riot', '.html']
      })
    ],
    watch: {}
  })
}
