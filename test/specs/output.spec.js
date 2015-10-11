require('shelljs/global')

const EXPECTED_LOGS_DIR = 'test/expected/logs',
  FIXTURES_LOGS_DIR = 'test/fixtures/logs'

describe('output logs', () => {
  it('All the cli output logs are fine', () => {
    var logs = ls(EXPECTED_LOGS_DIR)
    logs.forEach((log) => {
      expect(cat(`${EXPECTED_LOGS_DIR}/${log}`)).to.be(cat(`${FIXTURES_LOGS_DIR}/${log}`))
    })
  })
})