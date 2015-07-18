/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and
 * recompile as required if the subfolder /webpack-dev-server/ is visited. Visiting the root will
 * not automatically reload.
 */
"use strict";

module.exports = {
  entry: "./src/components/App.js",

  output: {
      path: "./build",
      filename: "application.js",
      publicPath: "/assets/"
  },

  devServer: {
    contentBase: "./src"
  },

  stats: {
    progress: true,
    colors: true,
    reasons: true
  },

  module: {
    loaders: [
        { test: /\.css$/, loader: "style!css" }
    ]
  }
};
