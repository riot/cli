import { info } from './logger'
import riot  from 'rollup-plugin-riot'
import { rollup } from 'rollup'

/**
 * Compile riot tags via rollup
 * @param   {Object} options - user options
 * @returns {Array<RolloutOuptput>} rollout output collection
 */
export default async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    plugins: [
      riot(options.riot)
    ]
  })

  info(`${options.input} -> ${options.output.file}`)

  return await bundle.write(options.output)
}