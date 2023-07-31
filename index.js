import process from 'node:process'
import run, * as cli from './src/index.js'
import { basename } from 'node:path'
import { pathToFileURL } from 'node:url'

export default cli

// Auto-Run the CLI if this file is not imported
if (basename(pathToFileURL(process.argv[1]).href) === 'riot') {
  /* c8 ignore next */
  run(process.argv)
}
