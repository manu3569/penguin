var React = require('react');
// var ApplicationDispatcher = require('t11e-appcore').ApplicationDispatcher;

// // Force store to load
// require('../stores');

var App = React.createFactory(require('../components/App.react.jsx'));

require('domready')(function() {
  React.render(App(), document.body);
  // ApplicationDispatcher.action('applicationStart');
});


