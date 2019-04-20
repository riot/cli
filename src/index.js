import { basename, dirname, extname, join, resolve } from 'path'
import chalk from 'chalk'
import compose from 'cumpa'
import curry from 'curri'
import glob from 'glob'
import merge from 'lodash.merge'
import minimist from 'minimist'
import pkg from '../package.json'
import riot  from 'rollup-plugin-riot'
import { rollup } from 'rollup'

const log = console.log // eslint-disable-line
const logError = compose(log, chalk.red)

const defaults = {
  plugins: [],
  ext: 'riot',
  dir: false,
  output: {
    sourcemap: false,
    format: 'esm'
  }
}

export async function compile(options) {
  const bundle = await rollup({
    input: options.input,
    plugins: [
      ...options.plugins,
      riot(options.riot)
    ]
  })

  return await bundle.write(options.output)
}

export function mapOptions(input, index, options) {
  const componentName = basename(input, extname(input))
  const ext = extname(input).replace('.', '')

  return {
    input,
    sourcemap: options.sourcemap,
    plugins: options.plugins,
    output: {
      ...options.output,
      format: options.format || options.output.format,
      sourcemap: options.sourcemap || options.output.sourcemap,
      name: componentName,
      file: join(generateOutputPath(options, index, input, componentName))
    },
    riot: {
      ext
    }
  }
}

export function generateOutputPath(options, index, input, componentName) {
  const fileOutput = options['--'][index] || options['--'][0]
  const generatedOutputFileName = `${componentName}.js`
  const root = dirname(input)

  if (fileOutput) {
    return isJsFilePath(fileOutput) ?
      join(root, fileOutput) :
      join(fileOutput, root, generatedOutputFileName)
  }

  return join(root, generatedOutputFileName)
}

export function help() {
  return `
  Build a single .riot file:
    riot foo.riot                 To a same named file (foo.js)
    riot foo.riot -- bar.js       To a different named file (bar.js)
    riot foo.riot -- bar/foo.js   To a different dir (bar/foo.js)
  Build all .riot files in a directory:
    riot --dir foo/bar            To a same directory (foo/bar/**/*.js)
    riot --dir foo/bar -- baz     To a different directory (baz/**/*.js)

  Examples for options:
    riot --format umd foo.riot
    riot --sourcemap inline foo.riot

  Version ${pkg.version}
`
}

export function isJsFilePath(path) {
  return path.slice(-3) === '.js'
}

export function loadConfig(src) {
  const file = resolve(typeof src === 'string' ? src : 'riot.config')

  try {
    return require(isJsFilePath(file) ? file : `${file}.js`).default
  } catch (error) {
    logError('It was not possible to load your config file, are you sure the path is correct?')
    throw new Error(error)
  }
}

export async function main(options) {
  const compileFile = (input, index) => compile(mapOptions(input, index, options))

  switch (true) {
  case options.version:
    return log(pkg.version)
  case Boolean(options.config):
    return await compose(compile, loadConfig)(options.config)
  case Boolean(options.dir):
    return await Promise.all(
      glob.sync(join(options.dir, '**', `*.${options.ext}`),{}).map(compileFile))
  case options._.length > 0:
    return await Promise.all(
      options._.map(compileFile)
    )
  default:
    return compose(log, help)()
  }
}

export default async function run(args) {
  compose(
    main,
    curry((a, b) => merge(a, b))(defaults),
    minimist
  )(args, {
    '--': true,
    alias: {
      c: 'config',
      v: 'version',
      f: 'format',
      d: 'dir'
    }
  })
}