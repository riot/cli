require('shelljs/global')

const
  EXPECTED_LOGS_DIR = 'test/expected/logs',
  GENERATED_LOGS_DIR = 'test/generated/logs'

const VERSION_REGEX = /Version[\S|\s]+/

describe('output logs', () => {
  ls(EXPECTED_LOGS_DIR).forEach(log => {
    it(log, () => {
      expect(read(`${EXPECTED_LOGS_DIR}/${log}`).trim().replace(VERSION_REGEX, ''))
        .to.be(read(`${GENERATED_LOGS_DIR}/${log}`).trim().replace(VERSION_REGEX, ''))
    })
  })
})

function read (path) {
  return cat(path).toString().replace(/^\s+|\s+$/gm, '')
}
