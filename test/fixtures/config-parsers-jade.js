export default {
  from: 'test/tags/parsers/jade.tag',
  to: 'test/generated/config-file/parsers-jade.js',
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