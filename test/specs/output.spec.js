require('shelljs/global')

const
  EXPECTED_LOGS_DIR = 'test/expected/logs',
  GENERATED_LOGS_DIR = 'test/generated/logs'

describe('output logs', () => {
  ls(EXPECTED_LOGS_DIR).forEach(log => {
    it(log, () => {
      expect(read(`${EXPECTED_LOGS_DIR}/${log}`).trim())
        .to.be(read(`${GENERATED_LOGS_DIR}/${log}`).trim())
    })
  })
})

function read (path) {
  return cat(path).toString().replace(/^\s+|\s+$/gm, '')
}
