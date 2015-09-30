'use strict'

const
  Action = require('../Action'),
  Make = require('./Make'),
  helpers = require('../helpers'),
  path = require('path'),
  chokidar = require('chokidar')

class Watch extends Action {
  run() {
    Make(opt)

    var glob = opt.flow[0] == 'f' ? opt.from : path.join(opt.from, '**/*.'+opt.ext)

    chokidar
      .watch(glob, { ignoreInitial: true })
      .on('ready', function() { log('Watching ' + helpers.toRelative(glob)) })
      .on('all', function() { Make(opt) })
  }
}

module.exports = Watch