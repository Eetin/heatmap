var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './app'
  ],
  output: {
    path: __dirname,
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/app',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        include: __dirname + '/app',
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      }
    ]
  },
  devtool: "source-map",
  node: {
    fs: "empty"
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin("styles.css", { allChunks: true })
  ]
};