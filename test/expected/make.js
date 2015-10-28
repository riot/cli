var riot = require('riot')

riot.tag2('valid-tag', '<h1>{title}</h1> <p>{message}</p>', '', '', function(opts) {
<invalid-flagment
  this.title = 'Hello world!'
  this.message = 'I am hungry...'
}, '{ }');

<invalid-t
riot.tag2('h1', '', '', '', function(opts) {
{ title }
});
riot.tag2('p', '', '', '', function(opts) {
{ message }
});

  this.title = 'Hello world!'
  this.message = 'I am hungry...'
</invalid-t

console.log('end of file')

riot.tag2('line', '<div >', '', '', function(opts) {
});
<tag-not-closed>
riot.tag2('p', '', '', '', function(opts) {
Hello!
});

riot.tag2('tag-unmatch', '<p>Hello!</p>', '', '', function(opts) {
});
</tag-unmatched>

var riot = require('riot')

riot.tag2('valid-tag', '<h1>{title}</h1> <p>{message}</p>', '', '', function(opts) {

  this.title = 'Hello world!'
  this.message = 'I am hungry...'
}, '{ }');

riot.tag2('tag-with-style', '<p>Hi!</p>', 'tag-with-style p,[riot-tag="tag-with-style"] p { color: red }', '', function(opts) {
});

riot.tag2('tag-with-script', '<h1>{title}</h1> <p>{message}</p>', '', '', function(opts) {
    this.title = 'Hello world!'
    this.message = 'I am hungry...'
}, '{ }');

console.log('end of file')

riot.tag2('component-2', '<div each="{items}">{item}</div>', '', '', function(opts) {

  this.items = ['bla', 'bla', 'bla']
}, '{ }');
riot.tag2('component', '<p>{opts.msg}</p>', '', '', function(opts) {
}, '{ }');
riot.tag2('wrong-componen', '<div each="{items}">{item}</div>', '', 't', function(opts) {
}, '{ }');