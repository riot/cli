import { getRollupPlugins } from './util.js'
import { info } from './logger.js'
import { watch as rollupWatch } from 'rollup'

/**
 * Watch riot tags via rollup
 * @typedef { import("chokidar") } chokidar
 * @param {object} options - user options
 * @returns {Array<chokidar>} chokidar instances
 */
export default async function watch(options) {
  info('Watching...', options.input)

  const { input, output } = options

  return rollupWatch({
    input,
    output,
    plugins: getRollupPlugins(options),
    watch: {},
  })
}
