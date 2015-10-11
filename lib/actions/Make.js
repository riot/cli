'use strict'

const
  Action = require('../Action'),
  helpers = require('../helpers'),
  chalk = require('chalk'),
  compiler = global.compiler || require('riot-compiler'),
  path = require('path'),
  sh = require('shelljs')


/**
 * Compile the tags using the riot-compiler
 */
class Make extends Action {
  run(opt) {
    // Generate a list of input/output files

    var from = opt.flow[0] == 'f' ? [opt.from] : helpers.find(this.extRegex, opt.from),
      base = opt.flow[0] == 'f' ? path.dirname(opt.from) : opt.from,
      to = opt.flow[1] == 'f' ? [opt.to] : helpers.remap(this.extRegex, from, opt.to, base)

    // Create any necessary dirs

    var dirs = {}
    to.map((f) => dirs[path.dirname(f)] = 0 )
    sh.mkdir('-p', Object.keys(dirs))

    // Process files
    if (opt.flow[1] == 'f')
      this.toFile(from, to, opt)
    else
      this.toDir(from, to, opt)

    // Print what's been done (unless --silent)

    /* istanbul ignore next */
    if (!opt.compiler.silent) {
      from.map((src, i) => {
        helpers.log(
          chalk.blue(helpers.toRelative(src)) +
          chalk.cyan(' -> ') +
          chalk.green(helpers.toRelative(to[i] || to[0]))
        )
      })
    }

    return true

  }
  toFile(from, to, opt) {
    this.encapsulate(
      from.map((path) => this.parse(path, opt)).join('\n').to(to[0]),
      opt
    )
  }
  toDir(from, to, opt) {
    from.map((from, i) => {
      return this.encapsulate(this.parse(from, opt), opt).to(to[i])
    })
  }
  parse(from, opt) {
    var out
    try {
      out = compiler.compile(sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */''), opt.compiler)
    } catch (e) {
      helpers.err(e)
    }
    return out
  }
  encapsulate(from, opt) {

    if (!opt.compiler.modular) return from

    var out = `
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
  ${ from }
});
      `
    return out

  }
}

module.exports = Make