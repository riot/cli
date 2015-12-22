'use strict'

const
  helpers = require('./helpers'),
  path = require('path'),
  sh = require('shelljs'),
  compiler = global.compiler || require('riot-compiler'),
  constants = require('./const'),
  NO_FILE_FOUND = constants.NO_FILE_FOUND,
  PREPROCESSOR_NOT_FOUND = constants.PREPROCESSOR_NOT_FOUND

/**
 * Base class that will extended to handle all the cli tasks
 */
class Task {
  constructor(opt) {
    // Run only once

    /* istanbul ignore next */
    if (this.called) return
    this.called = true

    // make sure the parsers object is always valid
    opt.parsers = helpers.extend(opt.parsers || {}, { html: {}, js: {}, css: {} })

    // validate the compiler options
    this.error = opt.compiler ? this.validate(opt.compiler, opt.parsers) : false

    // create a regex to figure out whether our user
    // wants to compile a single tag or some tags in a folder
    this.extRegex = new RegExp(`\\.${opt.ext || 'tag' }$`)

    // If no target dir, default to source dir

    if (!opt.to)
      opt.to = this.extRegex.test(opt.from) ? path.dirname(opt.from) : opt.from

    // Resolve to absolute paths

    opt.from = path.resolve(opt.from)
    opt.to = path.resolve(opt.to)

    // Check if the path exsists
    if (!sh.test('-e', opt.from)) this.error = NO_FILE_FOUND

    // throw the error only in the cli
    if (this.error) {
      /* istanbul ignore next */
      if (opt.isCli)
        helpers.err(this.error)
      else return this.error
    }

    // Determine the input/output types

    // [directory, directory]
    // [file, directory]
    // [directory, file]
    // [file, file]
    opt.flow = (this.extRegex.test(opt.from) ? 'f' : 'd') +
               (/\.(js|html|css)$/.test(opt.to) ? 'f' : 'd')

    // make sure to set always the compiler options
    if (!opt.compiler) opt.compiler = {}

    // each run method could return different stuff
    return this.run(opt)

  }
  /**
   * Check whether the parser is available
   * @param   { String }  name - parser id ( the require call )
   * @returns {Boolean} - have you this node dependency locally installed?
   */
  has(name) {
    return !!compiler.parsers._req(name)
  }
  /**
   * Validate the compiler options checking whether the local dependencies
   * are installed
   * @param { Object } opt - compiler options
   * @param { Object } parsers - custom parser options
   * @returns {String|Boolean} - false if there are no errors
   */
  validate(opt, parsers) {
    var template = opt.template,
      type = opt.type,
      style = opt.style

    if (template && !parsers.html[template] && !this.has(template))
      return PREPROCESSOR_NOT_FOUND('html', template)
    else if (type && !parsers.js[type] && !this.has(type))
      return PREPROCESSOR_NOT_FOUND('javascript', type)
    else if (style && !parsers.css[style] && !this.has(style))
      return PREPROCESSOR_NOT_FOUND('css', type)

    return false
  }
}

module.exports = Task