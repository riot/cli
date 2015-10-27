#!/usr/bin/env node

'use strict'

//
// Use in CLI:
//
//   Type "riot" for help.
//
// Use in Node:
//
//   var riot = require('riot/compiler')
//   riot.make({ from: 'foo', to: 'bar', compact: true })
//   riot.watch({ from: 'foo.tag', to: 'bar.js' })
//

// Include the available tasks
const
  Check       = require('./tasks/Check'),
  Make        = require('./tasks/Make'),
  Watch       = require('./tasks/Watch'),
  helpers     = require('./helpers'),
  options     = require('./options'),
  chalk       = require('chalk'),
  optionator  = require('optionator')(options),
  API         =
  {
    help() {
      var h = optionator.generateHelp()
      helpers.log(h)
      return h
    },
    version() {
      var v = helpers.getVersion()
      helpers.log(v)
      return v
    },
    check(opt) { return new Check(opt) },
    make(opt) { return new Make(opt) },
    watch(opt) { return new Watch(opt) },
    // this could be handy to someone who wants to have
    // also access to the private cli parser function
    _cli: cli
  }

/* istanbul ignore next */
function cli() {

  // Get CLI arguments

  var args

  // was an error thrown parsing the options?
  try {
    args = optionator.parse(process.argv, options)
  } catch (e) {
    helpers.err(e)
    return e
  }

  // Translate args into options hash

  var opt = {
    compiler: {
      compact: args.compact,
      template: args.template,
      type: args.type,
      brackets: args.brackets,
      expr: args.expr,
      modular: args.modular,
      silent: args.silent,
      whitespace: args.whitespace
    },
    ext: args.ext,
    colors: args.colors,
    from: args._.shift(),
    to: args._.shift()
  }

  // Call matching method
  var method = Object.keys(API).filter((v) => args[v] )[0] || ( opt.from ? 'make' : 'help' )

  // check whether the output should be colorized
  chalk.constructor({enabled: !!opt.colors })

  // create isSilent as global variable
  global.isSilent = args.silent

  // flag used to detect wheter a task is triggered via command line or not
  opt.isCli = true

  return API[method](opt)

}


// Run from CLI or as Node module

if (module.parent) {
  module.exports = API
  global.isSilent = true
/* istanbul ignore next */
} else cli()


