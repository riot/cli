riot.tag2('exclude', '<p>{msg}</p>', 'exclude p,[riot-tag="exclude"] p { color: red; }', '', function(opts) {

  this.msg = 'hi'

}, '{ }');