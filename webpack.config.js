const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry : path.resolve(__dirname, './src/index.js'),
  output : {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer : {
    historyApiFallback: true,
    publicPath: '/build/',
    proxy : {
      '/api/**' : 'http://localhost:3000/'
    },
    port : 8080,
    hot : true
  },
  mode : process.env.NODE_ENV,
  plugins : [new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()],
  module : {
    rules : [
      {
        test: /\.jsx?/,
        exclude : /node-modules/,
        use : {
          loader : 'babel-loader',
          options : { presets : ['@babel/preset-env', '@babel/preset-react']},
        }
      },
      {
        test: /\.s?css$/,
        use : [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}