'use strict'

const
  helpers = require('./helpers'),
  path = require('path'),
  sh = require('shelljs')


class Action {
  constructor(opt) {
    // Run only once

    if (this.called) return
    this.called = true

    // If no target dir, default to source dir

    if (!opt.to) opt.to = opt.extRegex.test(opt.from) ? path.dirname(opt.from) : opt.from

    // Resolve to absolute paths

    opt.from = path.resolve(opt.from)
    opt.to = path.resolve(opt.to)

    // Throw if source path doesn't exist

    if (!sh.test('-e', opt.from)) helpers.err('Source path does not exist')

    // Determine the input/output types

    opt.flow = (opt.extRegex.test(opt.from) ? 'f' : 'd') + (/\.js$/.test(opt.to) ? 'f' : 'd')

    this.run(opt)

  }
}

module.exports = Action