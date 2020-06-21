const { smart } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getAbsPath } = require('./utils');
const runtimeVar = require('./runtime-var');
const globalStyle = require('./gloabl-style');
const baseConfig = require('./webpack.base');

const prodConfig = {
  output: { filename: '[name][hash:8].js' },
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        include: [getAbsPath('../src/pages')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { filename: '[name][hash:8].[ext]' },
          },
          { loader: 'css-loader', options: { modules: true } },
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(le|c)ss$/,
        exclude: [getAbsPath('../src/pages')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { filename: '[name][hash:8].[ext]' },
          },
          { loader: 'css-loader'},
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin(runtimeVar.production),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: getAbsPath('../src/assets'), to: getAbsPath('../dist') },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ cache: true, parallel: true, sourceMap: true }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 4,
      automaticNameDelimiter: '_',
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: ({ name }) => `r_${name}`,
    },
  },
};
module.exports = smart(baseConfig, prodConfig);
