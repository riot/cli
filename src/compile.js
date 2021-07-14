import {babel} from '@rollup/plugin-babel'
import {info} from './logger'
import riot from 'rollup-plugin-riot'
import {rollup} from 'rollup'

/**
 * Compile riot tags via rollup
 * @param   {Object} options - user options
 * @returns {Array<RolloutOuptput>} rollout output collection
 */
export default async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    plugins: [
      riot(options.riot),
      babel({
        presets: [[require.resolve('@babel/preset-typescript'), {
          allExtensions: true
        }]],
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts', '.riot', '.html']
      })
    ]
  })

  info(`${options.input} -> ${options.output.file}`)

  return await bundle.write(options.output)
}
