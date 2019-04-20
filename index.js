#!/usr/bin/env node

require = require('esm')(module) // eslint-disable-line
const cli = require('./src/index.js')

// Run from CLI or as Node module
if (module.parent) {
  module.exports = cli
/* istanbul ignore next */
} else cli.default(process.argv.slice(2))
