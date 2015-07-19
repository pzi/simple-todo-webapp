/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and
 * recompile as required if the subfolder /webpack-dev-server/ is visited. Visiting the root will
 * not automatically reload.
 */
"use strict";

module.exports = {
  entry: "./src/components/App.jsx",

  output: {
      path: "./build",
      filename: "application.js",
      publicPath: "/assets/"
  },

  devServer: {
    contentBase: "./src"
  },

  debug: true,
  devtool: "sourcemap",

  stats: {
    progress: true,
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ["", ".js", ".jsx", '.css', '.sass']
  },

  module: {
    loaders: [{
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.sass$/,
        loader: "style!css!sass?indentedSyntax"
      }, {
        test: require.resolve("react"),
        loader: "imports",
        query: {
          shim: "es5-shim/es5-shim",
          sham: "es5-shim/es5-sham"
        }
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  }
};
