'use strict'

const Task = require('../Task'),
  analyzer = require('../analyzer'),
  sh = require('shelljs'),
  chalk = require('chalk'),
  log = require('../helpers').log

class Check extends Task {
  run(opt) {
    //TODO: analyze each file separatedly
    var from = opt.flow[0] == 'f' ? [opt.from] : sh.find(opt.from),
      source = sh.cat(from).replace(/^\uFEFF/g, /* strips BOM */''),
      errors = analyzer(source).filter((result) => result.error )

    if (errors.length) {
      log(chalk.white.bgRed(' Riot Tag Syntax Error '))
      errors.map((result) => {
        log(chalk.yellow(result.line + '| ') + result.source)
        log(chalk.red('^^^ ' + result.error))
      })
      log(chalk.yellow('Total error: ' + errors.length))
    } else {
      log(chalk.green('No syntax error. Ready to compile :)'))
    }
    return errors
  }
}

module.exports = Check