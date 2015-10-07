'use strict'

const
  TEMP_FILE_NAME = /\/[^.~][^~/]+$/, // skip temporary files (created by editors), e.g. /.name.tag, /~name.tag, /name~.tag
  path = require('path'),
  sh = require('shelljs')

module.exports = {
  find(extRegex, from) {
    return sh.find(from).filter(function(f) {
      return extRegex.test(f) && TEMP_FILE_NAME.test(f)
    })
  },
  remap(ext, from, to, base) {
    return from.map(function(from) {
      return path.join(to, path.relative(base, from).replace(ext, '.js'))
    })
  },
  toRelative(path) {
    return path.replace(sh.pwd() + '/', '')
  },
  log(msg, isSilent) {
    if (!isSilent) console.log(msg)
  },
  err(msg, isSilent) {
    msg += '\n'
    if (!isSilent) this.log(msg, isSilent) || process.exit(1)
    else throw msg
  },
  getVersion() {
    return require('../package.json').version
  }
}
