const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: './src/js/main.js'
  },
  output: {
    path: "D:\\KeshavSoft\\knode\\Multi\\2022\\october\\8-1\\KJson\\public\\js",
    filename: '[name].js',
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "kkkkkkk",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\`.html$/,
        use: ["html-loader"]
      }
    ]
  }
};