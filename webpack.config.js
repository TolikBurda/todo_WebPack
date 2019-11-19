const path = require('path');

module.exports = {
  context : path.resolve(__dirname, 'src'),

  entry: './app-component.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.')
  }
};