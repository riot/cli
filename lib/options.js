const helpers = require('./helpers')

module.exports = {
  prepend: `\nBuilds .tag files to .js \n\nOptions:`,
  append: `
Build a single .tag file:

  riot foo.tag           To a same named file (foo.js)
  riot foo.tag bar.js    To a different named file (bar.js)
  riot foo.tag bar       To a different dir (bar/foo.js)

Build all .tag files in a directory:

  riot foo/bar           To a same directory (foo/**/*.js)
  riot foo/bar baz       To a different directory (baz/**/*.js)
  riot foo/bar baz.js    To a single concatenated file (baz.js)

Examples for options:

  riot foo bar
  riot --w foo bar
  riot --watch foo bar
  riot --compact foo bar
  riot foo bar --compact
  riot test.tag --type coffeescript --expr

Version ${ helpers.getVersion() }
`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'You\'re reading it'
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Print Riot\'s version'
    },
    {
      option: 'watch',
      alias: 'w',
      type: 'Boolean',
      description: 'Watch for changes'
    },
    {
      option: 'compact',
      alias: 'c',
      type: 'Boolean',
      description: 'Minify </p> <p> to </p><p>'
    },
    {
      option: 'type',
      alias: 't',
      type: 'String',
      description: 'JavaScript pre-processor. Built-in support for: es6, coffeescript, typescript, livescript, none'
    },
    {
      option: 'check',
      type: 'Boolean',
      description: 'Check the syntax errors on a single tag'
    },
    {
      option: 'modular',
      alias: 'm',
      type: 'Boolean',
      description: 'AMD and CommonJS'
    },
    {
      option: 'silent',
      alias: 's',
      type: 'Boolean',
      default: false,
      description: 'Silence build output'
    },
    {
      option: 'template',
      type: 'String',
      description: 'HTML pre-processor. Built-in support for: jade'
    },
    {
      option: 'whitespace',
      type: 'Boolean',
      description: 'Preserve newlines and whitepace'
    },
    {
      option: 'brackets',
      type: 'String',
      description: 'Change brackets used for expressions. Defaults to { }'
    },
    {
      option: 'expr',
      type: 'Boolean',
      description: 'Run expressions trough parser defined with --type'
    },
    {
      option: 'ext',
      type: 'String',
      default: 'tag',
      description: 'Change tag file extension. Defaults to .tag'
    }
  ]
}