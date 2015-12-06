
export default {
  from: 'test/tags/component.tag',
  to: 'tags.js',
  compiler: {
    template: 'foo',
    type: 'baz',
    style: 'bar'
  },
  parsers: {
    html: {
      foo: function (html, opts, url) {
        return ''
      }
    },
    css: {
      bar: function(tag, css, opts, url) {
        return ''
      }
    },
    js: {
      baz: function (js, opts, url) {
        return ''
      }
    }
  }
}