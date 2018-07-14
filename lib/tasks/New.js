'use strict'

const
  helpers = require('../helpers'),
  chalk = require('chalk'),
  path = require('path'),
  constants = require('./../const'),
  TAG_TEMPLATE = constants.TAG_TEMPLATE,
  TAG_CREATED_CORRECTLY = constants.TAG_CREATED_CORRECTLY

/**
 * Create an empty tag template
 * @param   { Object } opt - cli options
 * @returns { Boolean } true if everything went fine
 */
module.exports = function(opt) {
  var tagName = path.basename(opt.new),
    out = helpers.toRelative(`${opt.new}.${opt.ext}`)

  helpers.mkdir(path.dirname(opt.new))

  helpers.writeFile(TAG_TEMPLATE(tagName), out)

  helpers.log(chalk.green(TAG_CREATED_CORRECTLY(out)))

  return true
}