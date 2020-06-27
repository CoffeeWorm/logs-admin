const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { getAbsPath } = require('./utils');
const globalStyle = require('./gloabl-style');

module.exports = {
  entry: { index: getAbsPath('../src/index.js') },
  output: {
    filename: '[name].js',
    path: getAbsPath('../dist/'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': getAbsPath('../src'),
      '@@': getAbsPath('../src/components'),
    },
    modules: ['node_modules', getAbsPath('../src')],
    extensions: ['.jsx', '.js', '.json', '.css', '.less'],
  },
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [getAbsPath('../node_modules/')],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(le|c)ss$/,
        include: [getAbsPath('../src/pages')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { filename: '[name].[ext]' },
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
            options: { filename: '[name].[ext]' },
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
              sourceMap: true,
            },
          },
        ],
      },
      { test: /\.png|jpg|jpeg|gif|svg$/, loader: 'file-loader' },
      {
        test: /\.png|jpg|jpeg|gif|svg$/,
        loader: 'url-loader',
        options: { limit: 8 * 1024 },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: getAbsPath('../src/index.html'),
      inject: true,
    }),
    new MiniCssExtractPlugin({ hmr: true }),
  ],
};
