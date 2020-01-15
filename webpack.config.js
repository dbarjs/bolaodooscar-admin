const path = require("path");
const merge = require("webpack-merge");

const parts = require("./webpack.parts");

const commonConfig = mode =>
  merge([
    parts.loadHtmlFile(),
    parts.loadStyles(),
    parts.loadJavaScript(),
    parts.loadVueFiles(),
  ]);

const developmentConfig = merge([
  parts.devServer({
    host: "0.0.0.0",
  }),
]);

const productionConfig = merge([]);

module.exports = mode => {
  if (mode === "production") {
    return merge([commonConfig(mode), productionConfig, { mode }]);
  }
  return merge([commonConfig(mode), developmentConfig, { mode }]);
};
