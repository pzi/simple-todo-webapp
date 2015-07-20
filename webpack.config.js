/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and
 * recompile as required if the subfolder /webpack-dev-server/ is visited. Visiting the root will
 * not automatically reload.
 */
'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    Application: [
      'webpack-dev-server/client?http://localhost:8080', // to avoid adding it to html source
      'webpack/hot/only-dev-server', // only-dev-server doesn't auto-reload browser if HMR fails
      'Application' // my app entry point
    ]
  },

  output: {
    path: './build',
    filename: 'application.js',
    publicPath: '/assets/'
  },

  devServer: {
    contentBase: './src',
    hot: true
  },

  debug: true,
  devtool: 'sourcemap',

  stats: {
    progress: true,
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass'],
    modulesDirectories: ['src', 'node_modules']
  },

  module: {
    loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.sass$/,
        loader: 'style!css!sass?indentedSyntax'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'react-hot!babel?optional[]=runtime&stage=0'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
