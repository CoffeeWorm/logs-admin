const { smart } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const runtimeVar = require('./runtime-var');
const baseConfig = require('./webpack.base');
const devServer = require('./dev-server');

const devConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          failOnError: true,
          cache: true,
        },
      },
    ],
  },
  plugins: [new DefinePlugin(runtimeVar.development)],
  devServer,
};
module.exports = smart(devConfig, baseConfig);
