import { info } from './logger'
import riot  from 'rollup-plugin-riot'
import { rollup } from 'rollup'

/**
 * Compile riot tags via rollup
 * @param   {Object} options - user options
 * @returns {Promise<RollupOutput|RollupBuild>} rollup output collection or rollup build
 */
export default async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    watch: options.watch,
    plugins: [
      riot(options.riot)
    ]
  })

  info(`${options.input} -> ${options.output.file}`)

  return options.watch ? bundle : bundle.write(options.output)
}
