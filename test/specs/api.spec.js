require('shelljs/global')

const TAGS_FOLDER = 'test/tags',
  GENERATED_FOLDER = 'test/generated',
  cli = require('../../lib')

describe('API methods', function() {

  this.timeout(10000)

  it('help', () => {
    expect(cli.help()).to.be.a('string')
  })

  it('version', () => {
    expect(cli.version()).to.be(require('riot-compiler/package.json').version)
  })

  it('check', () => {
    var check = cli.check({from: `${TAGS_FOLDER}/wrong-component.tag`})[0]
    expect(check).to.be.an('object')
    expect(check.errors).to.have.length(2)
    expect(cli.check({from: `${TAGS_FOLDER}/component.tag`})).to.have.length(0)
    expect(cli.check({from: `${TAGS_FOLDER}`})[0].file).to.be.a('string')
  })

  it('make', () => {
    expect(cli.make({from: 'some/random/path.tag'}).error).to.be.a('string')
    expect(cli.make({from: `${TAGS_FOLDER}/component.tag`}).error).to.be(false)
    expect(cli.make({
      from: `${TAGS_FOLDER}/component.tag`,
      to: `${GENERATED_FOLDER}/make-component.js`,
      compiler: { modular: true }
    }).error).to.be(false)

    expect(cli.make({
      from: `${TAGS_FOLDER}`,
      to: `${GENERATED_FOLDER}/make-components.js`,
      compiler: { modular: true }
    }).error).to.be(false)

    expect(cli.make({
      from: `${TAGS_FOLDER}/component.tag`,
      compiler: { modular: true, template: 'nope' }
    }).error).to.be('The "nope" html preprocessor was not found. Have you installed it locally?')

    // check if the file exists
    expect(test('-e', `${GENERATED_FOLDER}/make-component.js`)).to.be(true)
    expect(cat(`${GENERATED_FOLDER}/make-component.js`)).to.match(/require/)
    expect(cat(`${GENERATED_FOLDER}/make-components.js`)).to.match(/require/)
    expect(cli.make({from: 'test/tags', to: `${GENERATED_FOLDER}/make.js`}).error).to.be(false)
    // check if the file exists
    expect(test('-e', `${GENERATED_FOLDER}/make.js`)).to.be(true)
  })

  it('watch folder', (done) => {
    var watcher = cli.watch({from: TAGS_FOLDER})

    watcher.on('ready', () => {
      cp(`${TAGS_FOLDER}/component.tag`, `${TAGS_FOLDER}/component-copy.tag`)
      watcher.add(`${TAGS_FOLDER}/component-copy.tag`)
      // hopefully this tag gets compiled after 3 secons
      setTimeout(() => {
        expect(test('-e', `${TAGS_FOLDER}/component-copy.js`)).to.be(true)
        rm(`${TAGS_FOLDER}/component-copy.*`)
        watcher.close()
        done()
      }, 3000)
    })
  })

  it('watch file', (done) => {
    var watcher = cli.watch({
      from: `${TAGS_FOLDER}/component.tag`,
      to: `${GENERATED_FOLDER}/watch-component.js`
    })

    watcher.on('ready', () => {
      cat(`${TAGS_FOLDER}/component.tag`).to(`${TAGS_FOLDER}/component.tag`)
    })

    watcher.on('change', () => {
      setTimeout(() => {
        expect(test('-e', `${GENERATED_FOLDER}/watch-component.js`)).to.be(true)
        watcher.close()
        done()
      })
    })
  })

})