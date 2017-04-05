var bundle = __dirname + "/bundle.js";
var adminBundle = __dirname + "/admin-bundle.js";
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules/angular-ui-bootstrap/dist/');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: {
  	bundle: bundle,
  	adminBundle: adminBundle
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!resolve-url!sass-loader?sourceMap' })
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
          },
          {
              test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
              loader: 'file-loader'
          }
      ]
  },
  plugins: [
      new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
  ]
}