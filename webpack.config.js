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

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'Application'
  ],

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
    extensions: ['', '.js', '.jsx', '.coffee', '.cjsx', '.css', '.sass', '.png', '.svg', '.gif', '.jpg', '.jpeg'],
    modulesDirectories: ['src', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      }, {
        test: /\.sass$/,
        loader: 'style!css!autoprefixer!sass?indentedSyntax'
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'react-hot!babel?optional[]=runtime&stage=0'
      }, {
        test: /\.(cjsx)$/,
        exclude: /(node_modules)/,
        loaders: 'coffee!cjsx'
      }, {
        test: /\.(coffee)$/,
        exclude: /(node_modules)/,
        loaders: 'coffee'
      }, {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        exclude: /(node_modules)/,
        loaders: 'url?limit=1000'
      }
    ]
  },

  plugins: isProduction ? [
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
