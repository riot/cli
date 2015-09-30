'use strict'

const TEMP_FILE_NAME = /\/[^.~][^~/]+$/ // skip temporary files (created by editors), e.g. /.name.tag, /~name.tag, /name~.tag

var ph = require('path'),
  sh = require('shelljs')

module.exports = {
  find(ext, from) {
    return sh.find(from).filter(function(f) {
      return ext.test(f) && TEMP_FILE_NAME.test(f)
    })
  },
  remap(ext, from, to, base) {
    return from.map(function(from) {
      return ph.join(to, ph.relative(base, from).replace(ext, '.js'))
    })
  },
  toRelative(path) {
    return path.replace(sh.pwd() + '/', '')
  },
  log(msg) {
    if (!log.silent) console.log(msg)
  },
  err(msg) {
    msg += '\n'
    if (!log.silent) log(msg) || process.exit(1)
    else throw msg
  }
}
