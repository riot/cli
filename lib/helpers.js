'use strict'

const
  TEMP_FILE_NAME = /\/[^.~][^~/]+$/, // skip temporary files (created by editors), e.g. /.name.tag, /~name.tag, /name~.tag
  path = require('path'),
  chalk = require('chalk'),
  sh = require('shelljs')

module.exports = {
  /**
   * Find any file in certain folder
   * @param   { RegExp } extRegex - regular expression containing the file extension
   * @param   { String } from - files path
   * @returns { Array } array containing the files found
   */
  find(extRegex, from) {
    return sh.find(from).filter((f) => extRegex.test(f) && TEMP_FILE_NAME.test(f) )
  },
  /**
   * Loop files paths strings contained in an array remapping them to ad different location
   * @param   { RegExp } extRegex - regular expression containing the file extension
   * @param   { String } from - path where the files are located
   * @param   { String } to - path where the new files must be created
   * @param   { String } base - base path
   * @param   { String } extension - base path
   * @returns { Array } array containing all the paths to the new files that must be created
   */
  remap(extRegex, from, to, base, extension) {
    return from
      .map((from) => path.join(to, path.relative(base, from)
      .replace(extRegex, `.${extension || 'js'}`)))
  },
  /**
   * Relative path to where the command line gets executed
   * @param   { String } path - the whole file path where a file is located on the machine
   * @returns { String } path relative to the current folder where the command line gets executed
   */
  toRelative(path) {
    return path.replace(sh.pwd() + '/', '')
  },
  /**
   * Helper to output stuff in the terminal
   * @param   { * } msg - normally this should be a string
   */
  log(msg) {
    /* istanbul ignore next */
    if (!global.isSilent) console.log(msg)
  },
  /**
   * Throw an error and kill the process
   * @param   { String } msg - error message
   */
  err(msg) {
    msg += '\n'
    /* istanbul ignore next */
    if (!global.isSilent) this.log(chalk.red(msg)) || process.exit(1)
    else throw msg
  },
  /**
   * Get the current riot-cli release
   * @returns { String } this should always return the riot version in use unless riot-cli gets used as standalone module
   */
  getVersion() {
    var ver
    // try to get the riot version
    // assuming that this module is located in node_modules/riot-cli/lib
    try {
      ver = require('../../../package.json').version
    } catch (e) {
      // otherwise fall back to the riot-compiler version
      ver = require('riot-compiler/package.json').version
    }
    return ver
  }
}
