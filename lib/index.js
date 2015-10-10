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

// Include the available actions
const
  Check       = require('./actions/Check'),
  Make        = require('./actions/Make'),
  Watch       = require('./actions/Watch'),
  chalk       = require('chalk'),
  helpers     = require('./helpers'),
  options     = require('./options'),
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
    watch(opt) { return new Watch(opt) }
  }


function cli() {

  // Get CLI arguments

  var args

  // there was an error parsing the options
  try {
    args = optionator.parse(process.argv, options)
  } catch (e) {
    helpers.log(chalk.red(e))
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
    extRegex: RegExp('\\.' + args.ext + '$'),
    from: args._.shift(),
    to: args._.shift()
  }

  // Call matching method

  var method = Object.keys(API).filter(function(v) { return args[v] })[0]
    || ( opt.from ? 'make' : 'help' )

  // detect the i/o flow
  // [directory, directory]
  // [file, directory]
  // [directory, file]
  // [file, file]
  opt.flow = (RegExp('\\.' + opt.extRegex + '$').test(opt.from) ? 'f' : 'd') + (/\.js$/.test(opt.to) ? 'f' : 'd')

  // create isSilent as global variable
  global.isSilent = args.silent

  return API[method](opt)

}


// Run from CLI or as Node module

if (module.parent) {
  module.exports = API
  global.isSilent = true
} else cli()
