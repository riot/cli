import { basename, dirname, extname, join, resolve } from 'path'
import chalk from 'chalk'
import compose from 'cumpa'
import glob from 'glob'
import optionatorFactory from 'optionator'
import options from './options'
import pkg from '../package.json'
import riot  from 'rollup-plugin-riot'
import { rollup } from 'rollup'
import { statSync } from 'fs'

const optionator = optionatorFactory(options)
const log = console.log // eslint-disable-line
const logError = compose(log, chalk.red)
const info = compose(log, chalk.cyan)
const isJsFilePath = path => path.slice(-3) === '.js'

export async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    plugins: [
      riot(options.riot)
    ]
  })

  info(`${options.input} -> ${options.output.file}`)

  return await bundle.write(options.output)
}

export function mapOptions(input, options) {
  const componentName = basename(input, extname(input))
  const ext = extname(input).replace('.', '')

  return {
    input,
    sourcemap: options.sourcemap,
    output: {
      format: options.format,
      sourcemap: options.sourcemap,
      name: componentName,
      file: join(generateOutputPath(options, input, componentName))
    },
    riot: { ...options.riot, ext }
  }
}

export function generateOutputPath(options, input, componentName) {
  const fileOutput = options['output'] || process.cwd()
  const generatedOutputFileName = `${componentName}.js`
  const root = dirname(input)

  return isJsFilePath(fileOutput) ?
    fileOutput :
    join(fileOutput, root, generatedOutputFileName)
}

export function loadConfig(options) {
  if (!options.config) return options

  const src = options.config
  const file = resolve(typeof src === 'string' ? src : 'riot.config')

  try {
    return {
      ...options,
      ...require(isJsFilePath(file) ? file : `${file}.js`).default
    }
  } catch (error) {
    logError('It was not possible to load your config file, are you sure the path is correct?')
    throw new Error(error)
  }
}

export async function mapInput(options, input) {
  const stat = statSync(input)
  const compileFile = input => compile(mapOptions(input, options))

  if (stat.isDirectory()) {
    return await Promise.all(
      glob.sync(join(input, '**', `*.${options.extension}`),{}).map(compileFile)
    )
  }

  return await compileFile(input)
}

export function help() {
  const help = optionator.generateHelp()
  log(help)
  return help
}

export async function main(options) {
  switch (true) {
  case options.version:
    log(pkg.version)
    return pkg.version
  case options._.length > 0:
    return await Promise.all(
      options._.map(input => mapInput(options, input))
    )
  default:
    return help()
  }
}

export default async function run(args) {
  return compose(
    main,
    loadConfig,
    optionator.parseArgv,
  )(args)
}