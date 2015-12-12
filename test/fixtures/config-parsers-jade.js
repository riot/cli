export default {
  from: 'test/tags/parsers/',
  to: 'test/generated/config-file/parsers-jade.js',
  ext: 'jade',
  compiler: {
    template: 'myJade',
  },
  parsers: {
    html: {
      myJade: function (html, opts, url) {
        return require('jade').render(html, {
          pretty: true,
          filename: url,
          doctype: 'html'
        })
      }
    }
  }
}