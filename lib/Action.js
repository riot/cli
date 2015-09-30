'use strict'

class Action {
  constructor(opt) {
    // Run only once

    if (init.called) return
    init.called = true

    if (!opt.ext) opt.ext = 'tag'
    opt.ext = RegExp('\\.' + opt.ext + '$')

    // If no target dir, default to source dir

    if (!opt.to) opt.to = opt.ext.test(opt.from) ? ph.dirname(opt.from) : opt.from

    // Resolve to absolute paths

    opt.from = ph.resolve(opt.from)
    opt.to = ph.resolve(opt.to)

    // Throw if source path doesn't exist

    if (!sh.test('-e', opt.from)) err('Source path does not exist')

    // Determine the input/output types

    opt.flow = (opt.ext.test(opt.from) ? 'f' : 'd') + (/\.js$/.test(opt.to) ? 'f' : 'd')

  }
}

module.exports = Action