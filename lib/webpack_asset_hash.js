'use strict';

var fs   = require('fs');
var path = require('path');

var defaultFile = path.join(__dirname, '..', 'webpack.asset_hash.json');

var WebPackAssetHashPlugin = function(targetFile) {
  this.targetFile = targetFile || defaultFile;
};

WebPackAssetHashPlugin.prototype.apply = function (compiler) {
  var targetFile  = this.targetFile;

  compiler.plugin('done', function (stats) {
    var assetNameMappings = JSON.stringify(stats.toJson().assetsByChunkName);
    fs.writeFileSync(targetFile, assetNameMappings);
  });
};


var WebPackAssetHashUtils = {
  filename: function(asset, environment, sourceFile) {
    if (environment == 'production') {
      // var assetNameMappings = require(sourceFile || defaultFile);
      var assetNameMappings = JSON.parse(fs.readFileSync(sourceFile || defaultFile, 'utf8'));
      return '/js/' + assetNameMappings[asset];
    } else {
      return '/js/' + asset + '.js';
    }
  }
}

module.exports.Plugin = WebPackAssetHashPlugin;
module.exports.Utils = WebPackAssetHashUtils;
