/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and
 * recompile as required using the Hot Module Reloader HMR.
 * Note: The injected `only-dev-server` script doesn't auto-reload browser if HMR fails.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  entry: (function(){
    var entry = isProduction ? [] : [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ];
    entry.push('Application');
    return entry;
  })(),

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'application.js',
    publicPath: '/simple-todo-webapp/assets/'
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: !isProduction,
    historyApiFallback: true
  },

  debug: true,
  devtool: isProduction ? null : 'sourcemap',

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
    root: [ path.join(__dirname, 'src') ]
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
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      '__DEV__': process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    new CompressionPlugin(),
    new StatsPlugin('stats.json', { chunkModules: true })
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
