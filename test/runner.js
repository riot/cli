describe('Cli Tests', function() {
  global.expect = require('expect.js')
  require('./specs/output.spec')
  require('./specs/api.spec')
})
