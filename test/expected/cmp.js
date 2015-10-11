var riot = require('riot')

riot.tag('valid-tag', '<h1>{ title }</h1> <p>{ message }</p>', function(opts) {
<invalid-flagment
  this.title = 'Hello world!'
  this.message = 'I am hungry...'

});

<invalid-t
  <h1>{ title }</h1>
  <p>{ message }</p>

  this.title = 'Hello world!'
  this.message = 'I am hungry...'
</invalid-t

console.log('end of file')

<tag-not-closed>
  <p>Hello!</p>

<tag-unmatch>
  <p>Hello!</p>
  </tag-unmatch>
</tag-unmatched>

var riot = require('riot')

riot.tag('valid-tag', '<h1>{ title }</h1> <p>{ message }</p>', function(opts) {

  this.title = 'Hello world!'
  this.message = 'I am hungry...'

});

riot.tag('line-tag', 'Hello { opts.message }!', function(opts) {
});

riot.tag('tag-with-style', '<p>Hi!</p>', 'tag-with-style p, [riot-tag="tag-with-style"] p{ color: red }', function(opts) {

});

riot.tag('tag-with-script', '<h1>{ title }</h1> <p>{ message }</p>', function(opts) {
    this.title = 'Hello world!'
    this.message = 'I am hungry...'
  
});

console.log('end of file')

riot.tag('without-indent', 'riot.tag(\'p\', \'Without indent\', function(opts) { }); <div> Without indent</div>', function(opts) {

});

riot.tag('component-2', '<div each="{ items }">{ item }</div>', function(opts) {

  this.items = ['bla', 'bla', 'bla']

});
riot.tag('component', '<p>{ opts.msg }</p>', function(opts) {

});
riot.tag('wrong-componen', '<div each="{ items }">{ item }</div>', 't', function(opts) {

});