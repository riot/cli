import process from 'node:process'
import run, * as cli from './src/index.js'

export default cli

// Auto-Run the CLI if this file is not imported
if (process.mainModule) {
  /* c8 ignore next */
  run(process.argv)
}
