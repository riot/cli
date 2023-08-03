import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { log, logError, panic } from './logger.js'
import compile from './compile.js'
import compose from 'cumpa'
import { glob } from 'glob'
import help from './help.js'
import optionatorFactory from 'optionator'
import options from './options.js'
import { statSync } from 'node:fs'
import pkg from '../package.json'
import watch from './watch.js'

const optionator = optionatorFactory(options)
const isJsFilePath = (path) => path.slice(-3) === '.js'

/**
 * Map the user options to valid rollup options
 * @param   {string} input - source file path
 * @param   {string} userInputPath - path provided by the user
 * @param   {Object} options - user options
 * @returns {Object} RollupOptions object
 */
export function mapOptions(input, userInputPath, options) {
  const componentName = basename(input, extname(input))

  return {
    input,
    sourcemap: options.sourcemap,
    watch: options.watch,
    output: {
      format: options.format,
      sourcemap: options.sourcemap,
      name: componentName,
      file: join(
        generateOutputPath(options, input, userInputPath, componentName),
      ),
    },
    riot: { ...options.riot, ext: options.extension },
  }
}

/**
 * Generate the output where the javascript files will be created
 * @param   {Object} options - user options
 * @param   {string} input - current source path
 * @param   {string} userInputPath - path provided by the user
 * @param   {string} componentName - component name inferred from the file name
 * @returns {string} path where the js file will be generated
 */
export function generateOutputPath(
  options,
  input,
  userInputPath,
  componentName,
) {
  const fileOutput = options['output'] || process.cwd()
  const generatedOutputFileName = `${componentName}.js`
  const root =
    userInputPath !== input
      ? relative(userInputPath, dirname(input))
      : dirname(input)

  return isJsFilePath(fileOutput)
    ? fileOutput
    : join(fileOutput, root, generatedOutputFileName)
}

/**
 * Load the riot.config.js file
 * @param   {Object} options - user options
 * @returns {Object} user options merged with the riot.config.js export
 */
export async function loadConfig(options) {
  if (!options.config) return options

  const src = options.config
  /* istanbul ignore next */
  const file = resolve(typeof src === 'string' ? src : 'riot.config')

  try {
    return {
      ...options,
      ...(await import(isJsFilePath(file) ? file : `${file}.js`)).default,
    }
  } catch (error) {
    logError(
      'It was not possible to load your config file, are you sure the path is correct?',
    )
    panic(error)
  }
}

/**
 * Generate the output javascript files
 * @param   {Object} options - user options
 * @param   {string} input - input path
 * @returns {Array<RollytOutput>} generated files
 */
export async function generateOutput(options, input) {
  const stat = statSync(input)
  const compileFile = (filePath) => {
    const opts = mapOptions(filePath, input, options)

    if (options.watch) return watch(opts)

    return compile(opts)
  }

  if (stat.isDirectory()) {
    return await Promise.all(
      glob
        .sync(join(input, '**', `*.${options.extension}`), {})
        .map(compileFile),
    )
  }

  return compileFile(input)
}

/**
 * Parse the user options and dispatch the cli tasks
 * @param   {Object} cliOptions user options passed via CLI
 * @returns {*} task output
 */
export async function main(cliOptions) {
  const options = await loadConfig(cliOptions)

  switch (true) {
    case options.version:
      log(pkg.version)
      return pkg.version
    case options._.length > 0:
      return await Promise.all(
        options._.map((input) => generateOutput(options, input)),
      )
    default:
      return help(optionator)
  }
}

// export compiler extension functions
export { registerPreprocessor, registerPostprocessor } from '@riotjs/compiler'

export default async function run(args) {
  return compose(main, optionator.parseArgv)(args).catch(panic)
}
