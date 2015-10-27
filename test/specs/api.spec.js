require('shelljs/global')

const TAGS_FOLDER = 'test/tags/',
  cli = require('../../lib')

describe('API methods', function() {

  this.timeout(10000)

  // remove the useless stuff
  after(() => rm(`${TAGS_FOLDER}component-copy.*`))

  it('help', () => {
    expect(cli.help()).to.be.a('string')
  })

  it('version', () => {
    expect(cli.version()).to.be(require('riot-compiler/package.json').version)
  })

  it('check', () => {
    var check = cli.check({from: `${TAGS_FOLDER}wrong-component.tag`})[0]
    expect(check).to.be.an('object')
    expect(check.errors).to.have.length(2)
    expect(cli.check({from: `${TAGS_FOLDER}component.tag`})).to.have.length(0)
    expect(cli.check({from: `${TAGS_FOLDER}`})[0].file).to.be.a('string')
  })

  it('make', () => {
    expect(cli.make({from: 'some/random/path.tag'}).error).to.be.a('string')
    expect(cli.make({from: `${TAGS_FOLDER}component.tag`}).error).to.be(false)
    expect(cli.make({
      from: `${TAGS_FOLDER}component.tag`,
      to: 'test/expected/make-component.js',
      compiler: { modular: true }
    }).error).to.be(false)

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
        // hoping that this file gets compiled after 3 seconds
        setTimeout(() => {
          expect(test('-e', `${TAGS_FOLDER}component-copy.js`)).to.be(true)
          watcher.close()
          done()
        }, 3000)
      })

  })

})