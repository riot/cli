'use strict'

const
  TEMP_FILE_NAME = /\/[^.~][^~/]+$/, // skip temporary files (created by editors), e.g. /.name.tag, /~name.tag, /name~.tag
  path = require('path'),
  chalk = require('chalk'),
  sh = require('shelljs')

module.exports = {
  find(extRegex, from) {
    return sh.find(from).filter((f) => extRegex.test(f) && TEMP_FILE_NAME.test(f) )
  },
  remap(ext, from, to, base) {
    return from.map((from) => path.join(to, path.relative(base, from).replace(ext, '.js')) )
  },
  toRelative(path) {
    return path.replace(sh.pwd() + '/', '')
  },
  log(msg) {
    if (!global.isSilent) console.log(msg)
  },
  err(msg) {
    msg += '\n'
    if (!global.isSilent) this.log(chalk.red(msg)) || process.exit(1)
    else throw msg
  },
  getVersion() {
    return require('../package.json').version
  }
}
