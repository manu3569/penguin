var webpack = require('webpack');
var WebPackAssetHashPlugin = require('./webpack_asset_hash').Plugin;
var path = require('path');

module.exports = function(options) {

  var appEntry = [];
  if (options.hotComponents) {
    appEntry.push('webpack-dev-server/client?http://localhost:3001');
    appEntry.push('webpack/hot/only-dev-server');
  }
  appEntry.push(path.join(__dirname, '..', 'app', 'bundles', 'app.js'));

  var entry = {
    app: appEntry,
    vendor: ['react']
  };

  var output = {
    hashDigestLength: 7,
    path: path.join(__dirname, '..', 'build', 'js'),
    filename: options.longTermCaching ? "[name]-[chunkhash].js" : "[name].js"
  };
  if (options.hotComponents) {
    output.publicPath = 'http://localhost:3000/js/';
  }

  var plugins = [];
  if (options.longTermCaching) {
    plugins.push(new WebPackAssetHashPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js'))
  } else {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'))
  }
  if (options.hotComponents) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
  }

  if (options.production) {
    plugins.push(new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }));
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  }
  // plugins.push(new webpack.optimize.DedupePlugin());

  if (options.minimize) {
    plugins.push( new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }

  var loaders = [
    { test: /\.scss$/, loader: "style!css?minimize!sass" },
    //TODO remove react-hot for production
    { test: /\.jsx$/, loader: "react-hot!babel!jsx", exclude: /node_modules/ },
    { test: /\.js$/, loader: "react-hot!babel", exclude: /node_modules/ }
  ];

  return {
    entry: entry,
    output: output,
    // resolve: {
    //   extensions: ['', '.js', '.jsx','.scss']
    // },
    plugins: plugins,
    module: {
      loaders: loaders
    },
    recordsPath: path.join(__dirname, "..", "webpack.records.json")
  };
};

