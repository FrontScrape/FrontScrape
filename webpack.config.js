var webpack = require("webpack");
// const remote = window.require('electron').remote;

module.exports = {

  // This is the entry point or start of our react applicaton
  entry: "./app/app.js",

  // The plain compiled Javascript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This section desribes the transformations we will perform
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          // These are the specific transformations we'll be using.
          presets: ["react", "es2015", "stage-0"]
        }
      }
    ]
  }
  // ,
  // // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // // Without this the console says all errors are coming from just coming from bundle.js
  // devtool: "eval-source-map",
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin()
  // ]
};