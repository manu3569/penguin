'use strict';

var React = require('react');
var WebPackAssetHashUtils = require('../../lib/webpack_asset_hash').Utils;

var IndexPage = React.createClass({

  render: function() {
    var environment = this.props.environment || 'development';
    var vendorScript = WebPackAssetHashUtils.filename('vendor', environment);
    var appScript = WebPackAssetHashUtils.filename('app', environment);

    var App = React.createFactory(require('../components/App.react.jsx'));
    var body = React.renderToString(App());

    return (
      <html lang='en'>
        <head>
          <title></title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'/>
          <script src={vendorScript}></script>
          <script src={appScript}></script>
        </head>
        <body dangerouslySetInnerHTML={{__html: body}} />
      </html>
    );
  }
});

module.exports = IndexPage;
