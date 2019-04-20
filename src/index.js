import { basename, dirname, extname, join, resolve } from 'path'
import chalk from 'chalk'
import compose from 'cumpa'
import glob from 'glob'
import minimist from 'minimist'
import pkg from '../package.json'
import riot  from 'rollup-plugin-riot'
import { rollup } from 'rollup'

const log = console.log // eslint-disable-line
const logError = compose(log, chalk.red)
const info = compose(log, chalk.cyan)

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

export function mapOptions(input, index, options) {
  const componentName = basename(input, extname(input))
  const ext = extname(input).replace('.', '')


  return {
    input,
    sourcemap: options.sourcemap,
    plugins: options.plugins,
    output: {
      format: options.format,
      sourcemap: options.sourcemap,
      name: componentName,
      file: join(generateOutputPath(options, index, input, componentName))
    },
    riot: {
      ext
    }
  }
}

export function generateOutputPath(options, index, input, componentName) {
  const fileOutput = options['output'][index] || options['output'][0]
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
    riot --input foo.riot                 To a same named file (foo.js)
    riot --input foo.riot --output bar.js       To a different named file (bar.js)
    riot --input foo.riot --output bar/foo.js   To a different dir (bar/foo.js)
  Build all .riot files in a directory:
    riot --input-dir foo/bar                  To a same directory (foo/bar/**/*.js)
    riot --input-dir foo/bar --output baz     To a different directory (baz/**/*.js)

  Examples for options:
    riot --format umd -i foo.riot
    riot --sourcemap inline -i foo.riot

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
  case Boolean(options['input-dir']):
    return await Promise.all(
      glob.sync(join(options['input-dir'], '**', `*.${options.ext}`),{}).map(compileFile)
    )
  case options.input.length > 0:
    return await Promise.all(options._.map(compileFile))
  default:
    return compose(log, help)()
  }
}

export default async function run(args) {
  compose(
    main,
    minimist
  )(args, {
    string: ['ext', 'format', 'input-dir', 'config', 'sourcemap'],
    boolean: ['version', 'help'],
    array: ['input', 'output'],
    default: {
      ext: 'riot',
      dir: '',
      input: [],
      output: [],
      sourcemap: false,
      config: '',
      format: 'esm'
    },
    alias: {
      e: 'ext',
      i: 'input',
      o: 'output',
      s: 'sourcemap',
      c: 'config',
      v: 'version',
      f: 'format',
      d: 'input-dir'
    },
    unknown(...args) {
      logError('Unknown param', ...args)
      process.exit(1)
    }
  })
}