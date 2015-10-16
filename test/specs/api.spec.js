require('shelljs/global')

const TAGS_FOLDER = 'test/tags/',
  cli = require('../../lib')

describe('API methods', () => {
  // remove the useless stuff
  after(() => rm(`${TAGS_FOLDER}component-copy.*`))

  it('help', () => {
    expect(cli.help()).to.be.a('string')
  })

  it('version', () => {
    expect(cli.version()).to.be(require('../../package.json').version)
  })

  it('check', () => {
    expect(cli.check({from: `${TAGS_FOLDER}wrong-component.tag`})).to.be.an('array')
    expect(cli.check({from: `${TAGS_FOLDER}wrong-component.tag`})).to.have.length(2)
    expect(cli.check({from: `${TAGS_FOLDER}component.tag`})).to.have.length(0)
  })

  it('make', () => {
    expect(cli.make({from: 'some/random/path.tag'}).error).to.be.a('string')
    expect(cli.make({from: `${TAGS_FOLDER}component.tag`}).error).to.be(false)
    expect(cli.make({from: `${TAGS_FOLDER}component.tag`, to: 'test/expected/make-component.js'}).error).to.be(false)
    // check if the file exists
    expect(test('-e', 'test/expected/make-component.js')).to.be(true)
    expect(cli.make({from: 'test/tags', to: 'test/expected/make.js'}).error).to.be(false)
    // check if the file exists
    expect(test('-e', 'test/expected/make.js')).to.be(true)
  })

  it('watch', (done) => {
    var watcher = cli.watch({from: TAGS_FOLDER})

    watcher
      .on('ready', () => {
        cp(`${TAGS_FOLDER}component.tag`, `${TAGS_FOLDER}component-copy.tag`)
        watcher.add(`${TAGS_FOLDER}component-copy.tag`)
      })
      .on('all', () => {
        expect(test('-e', `${TAGS_FOLDER}component-copy.js`)).to.be(true)
        watcher.close()
        done()
      })
  })

})