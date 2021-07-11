// allow modules import syntax
import run, * as cli from './src/index'

// Run from CLI or as Node module
if (module.parent) {
  module.exports = cli
  /* istanbul ignore next */
} else run(process.argv)
