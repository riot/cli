require('shelljs/global')

const EXPECTED_LOGS_DIR = 'test/expected/logs',
  cli = require('../../lib')

describe('API methods', () => {

  it('help', () => {
    expect(cli.help()).to.be.a('string')
  })

  it('version', () => {
    expect(cli.version()).to.be(require('../../package.json').version)
  })

  it('check', () => {
    expect(cli.check({from: 'test/tags/wrong-component.tag'})).to.be.an('array')
    expect(cli.check({from: 'test/tags/wrong-component.tag'})).to.have.length(2)
    expect(cli.check({from: 'test/tags/component.tag'})).to.have.length(0)
  })

  it('make', () => {
    expect(cli.make({from: 'some/random/path.tag'}).error).to.be.a('string')
    expect(cli.make({from: 'test/tags/component.tag'}).error).to.be(false)
    expect(cli.make({from: 'test/tags/component.tag', to: 'test/expected/make-component.js'}).error).to.be(false)
    // check if the file exists
    expect(test('-e', 'test/expected/make-component.js')).to.be(true)
    expect(cli.make({from: 'test/tags', to: 'test/expected/make.js'}).error).to.be(false)
    // check if the file exists
    expect(test('-e', 'test/expected/make.js')).to.be(true)
  })

})