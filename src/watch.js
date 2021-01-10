import { info } from './logger'
import riot  from 'rollup-plugin-riot'
import { watch as rollupWatch } from 'rollup'

/**
 * Watch riot tags via rollup
 * @param {Object} options - user options
 * @return {Array<chokidar>} chokidar istances
 */
export default async function watch(options) {
  info('Watching...', options.input)

  const { input , output } = options

  return rollupWatch({
    input,
    output,
    plugins: [
      riot(options.riot)
    ],
    watch: {}
  })
}
