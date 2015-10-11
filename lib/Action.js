'use strict'

const
  helpers = require('./helpers'),
  path = require('path'),
  sh = require('shelljs'),
  NO_FILE_FOUND = 'Source path does not exist'

/**
 * Base class that will extended to handle all the cli tasks
 */
class Action {
  constructor(opt) {
    // Run only once

    /* istanbul ignore next */
    if (this.called) return
    this.called = true
    this.error = false

    // create a regex to figure out whether our user
    // wants to compile a single tag or some tags in a folder
    this.extRegex = RegExp('\\.' + opt.ext + '$')

    // If no target dir, default to source dir

    if (!opt.to) opt.to = this.extRegex.test(opt.from) ? path.dirname(opt.from) : opt.from

    // Resolve to absolute paths

    opt.from = path.resolve(opt.from)
    opt.to = path.resolve(opt.to)

    // Throw if source path doesn't exist

    if (!sh.test('-e', opt.from)) {
      /* istanbul ignore next */
      if (opt.isCli)
        helpers.err(NO_FILE_FOUND)
      else {
        this.error = NO_FILE_FOUND
        return
      }
    }

    // Determine the input/output types

    // [directory, directory]
    // [file, directory]
    // [directory, file]
    // [file, file]
    opt.flow = (this.extRegex.test(opt.from) ? 'f' : 'd') + (/\.js$/.test(opt.to) ? 'f' : 'd')

    // make sure to set always the compiler options
    if (!opt.compiler) opt.compiler = {}

    // each run method could return different stuff
    return this.run(opt)

  }
}

module.exports = Action