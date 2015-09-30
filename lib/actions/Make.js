'use strict'

const
  Action = require('../Action'),
  helpers = require('../helpers'),
  path = require('path'),
  sh = require('shelljs')

class Make extends Action {
  run() {
    // Generate a list of input/output files

    var from = opt.flow[0] == 'f' ? [opt.from] : find(opt.from),
      base = opt.flow[0] == 'f' ? path.dirname(opt.from) : opt.from,
      to = opt.flow[1] == 'f' ? [opt.to] : remap(from, opt.to, base)

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
      (function(tagger) {\n
          if (typeof define === \'function\' && define.amd) {\n
            define(function(require, exports, module) { tagger(require(\'riot\'), require, exports, module)})\n
          } else if (typeof module !== \'undefined\' && typeof module.exports !== \'undefined\') {\n
            tagger(require(\'riot\'), require, exports, module)\n
          } else {\n
            tagger(window.riot)\n
          }\n
        })(function(riot, require, exports, module) {\n
          ${ from }
        \n});
      `
      return out
    }

    function parse(from) { return compiler.compile(sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */''), opt.compiler) }
    function toFile(from, to) { encapsulate(from.map(function (path) { return parse(path) }).join('\n')).to(to[0]) }
    function toDir(from, to) { from.map(function(from, i) { encapsulate(parse(from)).to(to[i]) }) }
    ;(opt.flow[1] == 'f' ? toFile : toDir)(from, to)

    // Print what's been done (unless --silent)

    if (!opt.compiler.silent) {
      from.map(function(src, i) {
        log(helpers.toRelative(src) + ' -> ' + helpers.toRelative(to[i] || to[0]))
      })
    }
  }
}

module.exports = Make