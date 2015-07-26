/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and
 * recompile as required if the subfolder /webpack-dev-server/ is visited. Visiting the root will
 * not automatically reload.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';

var entryJS = ['Application'];

if(!isProduction) {
  // to avoid adding it to html source
  entryJS.push('webpack-dev-server/client?http://localhost:8080');
  // only-dev-server doesn't auto-reload browser if HMR fails
  entryJS.push('webpack/hot/only-dev-server');
}

module.exports = {

  entry: entryJS,

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'application.js',
    publicPath: '/assets/'
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    historyApiFallback: true
  },

  debug: true,
  devtool: 'sourcemap',

  stats: {
    progress: true,
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.sass',
      '.png',
      '.svg',
      '.gif',
      '.jpg',
      '.jpeg'
    ],
    modulesDirectories: ['src', 'node_modules']
  },

  module: {
    loaders: [{
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      }, {
        test: /\.sass$/,
        loader: 'style!css!autoprefixer!sass?indentedSyntax'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'react-hot!babel?optional[]=runtime&stage=0'
      }, {
        test: /\.coffee$/,
        exclude: /(node_modules)/,
        loader: 'coffee'
      }, {
        test: /\.cjsx$/,
        exclude: /(node_modules)/,
        loader: 'coffee!cjsx'
      }, {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        exclude: /(node_modules)/,
        loader: 'url?limit=1000'
      }
    ]
  },

  plugins: isProduction ? [
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin()
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
