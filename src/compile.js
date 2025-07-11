import { getRollupPlugins } from './util.js'
import { info } from './logger.js'
import { rollup } from 'rollup'

/**
 * Compile riot tags via rollup
 * @typedef { import("rollup").RolloutOuptput } RolloutOuptput
 * @param   {object} options - user options
 * @returns {Array<RolloutOuptput>} rollout output collection
 */
export default async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    plugins: getRollupPlugins(options),
  })

  info(`${options.input} -> ${options.output.file}`)

  return await bundle.write(options.output)
}
