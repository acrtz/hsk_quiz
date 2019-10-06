process.env.NODE_ENV = "production"
// TODO: make sure bundle analyzer is not included in production
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

const webpackConfigProd = require("react-scripts/config/webpack.config.prod")

webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "report.html",
  })
)

require("react-scripts/scripts/build")