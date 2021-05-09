const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const components = ['signIn', 'signUp', 'daily', 'validation'];

const webpackConfig = {
  mode: 'development',
  entry: {},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './image/',
            name: '[name].[ext]?[hash]',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    overlay: true,
    hot: true,
  },
  plugins: []
};

components.forEach((value) => {
  webpackConfig.entry[value] = `./scripts/${value}.js`;
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: `${value} HTML`,
      hash: true,
      filename: `${value}.html`,
      chunks: [value],
      template: `./html/${value}.html`,
    })
  );
});

module.exports = webpackConfig;
