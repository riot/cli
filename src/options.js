import pkg from './pkg.js'

export default {
  prepend: '\nBuilds .riot files to .js\n\nOptions:',
  append: `
Build a single .riot file:
  riot foo.riot          To a same named file (foo.js)
  riot foo.riot -o bar   To a different dir (bar/foo.js)

Build all .riot files in a directory:
  riot foo/bar            To a same directory (foo/bar/**/*.js)
  riot foo/bar -o baz     To a different directory (baz/foo/bar/**/*.js)

Examples for options:
  riot --format umd foo.riot
  riot --sourcemap inline foo.riot

Version ${pkg.version}
`,
  options: [
    {
      option: 'output',
      alias: 'o',
      description:
        'Output directory where your javascript files will be generated',
      type: 'String',
    },
    {
      option: 'format',
      default: 'esm',
      alias: 'f',
      enum: ['amd', 'cjs', 'esm', 'iife', 'umd'],
      description: 'Specify output format',
      type: 'String',
    },
    {
      option: 'extension',
      default: 'riot',
      alias: 'e',
      description: 'Change riot components file extension',
      type: 'String',
    },
    {
      option: 'sourcemap',
      default: false,
      enum: ['inline', 'file'],
      alias: 's',
      description: 'Add inline or a file sourcemaps to the generated files',
      type: 'String',
    },
    {
      option: 'config',
      default: '',
      alias: 'c',
      description:
        'Specify the path to a configuration file to compile your tags',
      type: 'String',
    },
    {
      option: 'watch',
      default: false,
      alias: 'w',
      description: 'Watch for changes',
      type: 'Boolean',
    },
    {
      option: 'version',
      default: '',
      alias: 'v',
      description: 'Print the cli version',
      type: 'Boolean',
    },
    {
      option: 'help',
      alias: 'h',
      description: "You're reading it",
      type: 'Boolean',
    },
  ],
}
