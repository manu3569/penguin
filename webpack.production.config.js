module.exports = require("./lib/webpack_config_builder.js")({
  production: true, // makes react lib smaller
  longTermCaching: true,
  minimize: true
});
