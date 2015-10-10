'use strict'

const
  Action = require('../Action'),
  Make = require('./Make'),
  chalk = require('chalk'),
  helpers = require('../helpers'),
  path = require('path'),
  chokidar = require('chokidar')

class Watch extends Action {
  run(opt) {

    new Make(opt)

    var glob = opt.flow[0] == 'f' ? opt.from : path.join(opt.from, '**/*.'+opt.ext)

    chokidar
      .watch(glob, { ignoreInitial: true })
      .on('ready', function() { helpers.log('Watching ' + helpers.toRelative(glob)) })
      .on('all', function() { new Make(opt) })
  }
}

module.exports = Watch