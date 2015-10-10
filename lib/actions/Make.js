'use strict'

const
  Action = require('../Action'),
  helpers = require('../helpers'),
  chalk = require('chalk'),
  compiler = global.compiler || require('riot-compiler'),
  path = require('path'),
  sh = require('shelljs')

class Make extends Action {
  run(opt) {
    // Generate a list of input/output files

    var from = opt.flow[0] == 'f' ? [opt.from] : helpers.find(opt.extRegex, opt.from),
      base = opt.flow[0] == 'f' ? path.dirname(opt.from) : opt.from,
      to = opt.flow[1] == 'f' ? [opt.to] : helpers.remap(opt.extRegex, from, opt.to, base)

    // Create any necessary dirs

    var dirs = {}
    to.map(function(f) { dirs[path.dirname(f)] = 0 })
    sh.mkdir('-p', Object.keys(dirs))

    // Process files

    function encapsulate(from) {
      if (!opt.compiler.modular) {
        return from
      }

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

    function parse(from) {
      var out
      try {
        out = compiler.compile(sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */''), opt.compiler)
      } catch (e) {
        helpers.err(e)
      }

      return out

    }
    function toFile(from, to) { encapsulate(from.map(function (path) { return parse(path) }).join('\n')).to(to[0]) }
    function toDir(from, to) { from.map(function(from, i) { encapsulate(parse(from)).to(to[i]) }) }
    ;(opt.flow[1] == 'f' ? toFile : toDir)(from, to)

    // Print what's been done (unless --silent)

    if (!opt.compiler.silent) {
      from.map(function(src, i) {
        helpers.log(
          chalk.blue(helpers.toRelative(src)) +
          ' -> ' +
          chalk.green(helpers.toRelative(to[i] || to[0]))
        )
      })
    }
  }
}

module.exports = Make