module.exports = Object.freeze({
  TEMP_FILE_NAME: /\/[^.~][^~/]+$/,

  // cli messages
  NO_FILE_FOUND: 'Source path does not exist',
  PREPROCESSOR_NOT_FOUND: function(type, id) {
    return `The "${id}" ${type} preprocessor was not found. Have you installed it locally?`
  },

  // modular output fragments
  MODULAR_START_FRAG: `
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
`,
  MODULAR_END_FRAG: '});'
})