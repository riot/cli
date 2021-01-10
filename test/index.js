import { expect } from 'chai'
import pkg from '../package.json'
import run from '../src'
import { statSync } from 'fs'

const cli = (options) => run(['node', 'riot', ...options])

describe('riot cli', () => {
  it('cli is a function', () => {
    expect(cli).to.be.a('function')
  })

  it('can print help', async() => {
    expect(await cli(['--help'])).to.be.a('string')
  })

  it('can print version', async() => {
    expect(await cli(['--version'])).to.be.equal(pkg.version)
  })

  it('can compile a component', async() => {
    expect(await cli(['test/fixtures/my-component.riot'])).to.be.ok
  })

  it('can watch a component', async() => {
    const [watcher] = await cli(['-w', 'test/fixtures/my-component.riot'])

    expect(() => watcher.close()).to.not.throw()
  })

  it('can compile to a js file', async() => {
    expect(await cli(['test/fixtures/my-component.riot', '-o', 'test/generated/foo.js'])).to.be.ok
  })

  it('can compile from a folder', async() => {
    expect(await cli(['test', '-o', 'test/generated'])).to.be.ok
    expect(statSync('test/generated/fixtures').isDirectory()).to.be.ok
  })

  it('can compile files having a different extension', async() => {
    expect(await cli([ '--extension', 'html', '-o', 'test/generated', 'test/fixtures'])).to.be.ok
  })

  it('can compile files having a different extension', async() => {
    expect(await cli([ '--extension', 'html', '-o', 'test/generated', 'test/fixtures'])).to.be.ok
  })

  it('throw in case of missing config file', done => {
    cli([ '-c', 'foo']).catch(() => done())
  })

  it('load config file', async() => {
    expect(await cli([ '-c', 'test/riot.config', 'test/fixtures'])).to.be.ok
  })

  it('load config file with extension', async() => {
    expect(await cli([ '-c', 'test/riot.config.js', 'test/fixtures'])).to.be.ok
  })
})
