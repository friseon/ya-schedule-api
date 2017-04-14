var bundle = __dirname + "/bundle.js";
var adminBundle = __dirname + "/admin-bundle.js";
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules/angular-ui-bootstrap/dist/');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: {
  	bundle: bundle
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','postcss-loader'] })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','postcss-loader','sass-loader'] })
        }, 
        {
          test: /\.woff2?$|\.ttf$|\.eot$/,
          loader: "file-loader?name=/fonts/[name].[ext]"
        },
        {
          test: /\.svg$|\.png|\.jpe?g|\.gif$/,
          loader: "file-loader?name=/img/[name].[ext]"
        }
      ]
  },
  plugins: [
        new ExtractTextPlugin({
          filename: 'index.css',
          disable: false,
          allChunks: true
        })
  ]
}