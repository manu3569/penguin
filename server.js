'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var compression = require('compression')

var React = require('react');
require('node-jsx').install();
require("babel/register");

var environment = process.env.NODE_ENV || 'development';

if (environment == 'development') {
  var debug            = require('debug')('app');
  var webpack          = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig    = require('./webpack.development.config');
  var livereload       = require('livereload');
  var fs               = require('fs');

  // Run the webpack dev server
  var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: 'http://localhost:3000',
    noInfo: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }).listen(3001, 'localhost', function (err, result) {
    if (err) console.log(err);
    else  debug('Webpack server listening on port 3001');
  });
  app.use('/js', function (req, res) {
    res.redirect('http://localhost:3001' + req.path);
  });
}

app.use(morgan('combined'));
app.use(compression());

app.get('/', function(req, res) {
  res.set({'Content-Type': 'text/html; charset=utf-8'});
  var IndexPage = React.createFactory(require('./app/pages/IndexPage.react.jsx'));
  res.send('<!DOCTYPE html>' + React.renderToString(IndexPage({environment: environment})));
});

app.use("/", express.static(__dirname + "/build/"));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s in %s mode', host, port, environment);
});
