'use strict'

const
  Task = require('../Task'),
  helpers = require('../helpers'),
  chalk = require('chalk'),
  compiler = global.compiler || require('riot-compiler'),
  path = require('path'),
  sh = require('shelljs'),
  START_FRAG = `
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
`,
  END_FRAG = '});'


/**
 * Compile the tags using the riot-compiler
 */
class Make extends Task {
  run(opt) {
    // Generate a list of input/output files

    var from = opt.flow[0] == 'f' ? [opt.from] : helpers.find(this.extRegex, opt.from),
      base = opt.flow[0] == 'f' ? path.dirname(opt.from) : opt.from,
      to = opt.flow[1] == 'f' ? [opt.to] : helpers.remap(this.extRegex, from, opt.to, base, opt.export)

    // Create any necessary dirs

    var dirs = {}
    to.map((f) => dirs[path.dirname(f)] = 0 )
    sh.mkdir('-p', Object.keys(dirs))

    // extend the compiler parsers
    if (opt.parsers)
      helpers.extend(compiler.parsers, opt.parsers)

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
  /**
   * Write all the tags compiled in a single file on the file system
   * @param   { Array } from - source files array
   * @param   { String } to - output path
   * @param   { Object } opt - cli options
   */
  toFile(from, to, opt) {
    this.encapsulate(
      from.map((path) => this.parse(path, opt)).join('\n'),
      opt
    ).to(to[0])
  }
  /**
   * Write all the tags compiled in several files on the file system
   * @param   { Array } from - source files array
   * @param   { Array } to - output folder
   * @param   { Object } opt - cli options
   */
  toDir(from, to, opt) {
    from.map((from, i) => {
      return this.encapsulate(this.parse(from, opt), opt).to(to[i])
    })
  }
  /**
   * Compile the source files using the riot-compiler
   * @param   { String } from - source files array
   * @param   { Object } opt - cli options
   * @returns { String } riot-compiler output
   */
  parse(from, opt) {
    var out
    try {
      out = compiler.compile(sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */''), opt.compiler, from)
      // take only the css
    } catch (e) {
      helpers.err(e)
    }
    if (opt.export)
      return out.reduce((prev, curr) => prev + curr[opt.export], '')
    else return out
  }
  /**
   * Wrap the generated tags using a default UMD wrapper
   * @param   { String } from - source files array
   * @param   { Object } opt - cli options
   * @returns { String } wrapped output
   */
  encapsulate(from, opt) {

    if (!opt.compiler.modular) return from
    var out = `${START_FRAG}${from}${END_FRAG}`
    return out
  }
}

module.exports = Make