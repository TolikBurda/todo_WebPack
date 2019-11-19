const path = require('path');
// const webpack = require('webpack');

module.exports = {
  context : path.resolve(__dirname, 'src'),

  entry: './app-component.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }

  // plugins: [
  //   // new webpack.HotModuleReplacementPlugin()
  // ]
  // watch: true
};