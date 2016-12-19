'use strict'

require('shelljs/global')

const
  EXPECTED = 'test/expected/stdinout',
  GENERATED = 'test/generated/stdinout',
  cli = require('../../lib')

describe('stdin, stdout', () => {
  it('stdin -> stdout', () => {
    expect(read(`${EXPECTED}/a.js`)).to.be(read(`${GENERATED}/a.js`))
  })

  it('file -> stdout', () => {
    expect(read(`${EXPECTED}/b.js`)).to.be(read(`${GENERATED}/b.js`))
  })

  it('stdin -> file', () => {
    expect(read(`${EXPECTED}/c.js`)).to.be(read(`${GENERATED}/c.js`))
  })

  it('appends output.js to dir name', () => {
    expect(read(`${EXPECTED}/output.js`)).to.be(read(`${GENERATED}/output.js`))
  })

  after(() => {
    rm(`${GENERATED}/*`)
  })
})

function read (path) {
  return cat(path).toString().replace(/^\s+|\s+$/gm, '')
}
