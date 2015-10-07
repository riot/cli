'use strict'

const Action = require('../Action'),
  analyzer = require('../analyzer'),
  sh = require('shelljs'),
  chalk = require('chalk'),
  log = require('../helpers').log

class Check extends Action {
  run(opt) {
    //TODO: analyze each file separatedly
    var from = opt.flow[0] == 'f' ? [opt.from] : sh.find(opt.from)
    var source = sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */'')
    var errors = analyzer(source).filter(function(result) { return result.error })

    if (errors.length) {
      log(chalk.white.bgRed(' Riot Tag Syntax Error '))
      errors.map(function(result) {
        log(chalk.gray(result.line + '| ') + result.source)
        log(chalk.red('^^^ ' + result.error))
      })
      log(chalk.gray('Total error: ' + errors.length))
    } else {
      log(chalk.green('No syntax error. Ready to compile :)'))
    }
  }
}

module.exports = Check