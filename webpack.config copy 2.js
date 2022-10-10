const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: './src/js/main.js'
  },
  output: {
    path: "C:\\KeshavSoft\\nodejs\\multi\\2022\\oct\\8\\KJson\\public\\js",
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