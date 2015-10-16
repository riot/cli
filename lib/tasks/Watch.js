'use strict'

const
  Task = require('../Task'),
  Make = require('./Make'),
  chalk = require('chalk'),
  helpers = require('../helpers'),
  path = require('path'),
  chokidar = require('chokidar')

/**
 * Watch the source file to run a Make command anytime there's a change
 */
class Watch extends Task {
  run(opt) {

    // run the first make
    new Make(opt)

    var glob = opt.flow[0] == 'f' ? opt.from : path.join(opt.from, '**/*.'+opt.ext)

    return chokidar
      .watch(glob, { ignoreInitial: true })
      .on('ready', () => helpers.log(chalk.cyan('Watching ' + helpers.toRelative(glob))))
      .on('all', () => new Make(opt))

  }
}

module.exports = Watch