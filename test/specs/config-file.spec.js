require('shelljs/global')

const
  EXPECTED_FOLDER = 'test/expected',
  GENERATED_FOLDER = 'test/generated',
  trim = function(string) {
    return string.replace(/^\s+|\s+$/gm, '')
  },
  cli = require('../../lib')

describe('External config file', function() {
  it('output the tags using the parsers in the config file', function() {
    cli._cli([
      '--config',
      'test/fixtures/config-parsers'
    ])
    expect(test('-e', `${GENERATED_FOLDER}/config-file/parsers.js`)).to.be(true)
    expect(trim(cat(`${GENERATED_FOLDER}/config-file/parsers.js`)))
      .to
      .be(trim(cat(`${EXPECTED_FOLDER}/config-file/parsers.js`)))
  })
})