const path = require('path');

module.exports = {
  entry: {
    bundle: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};

