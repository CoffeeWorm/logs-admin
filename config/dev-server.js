const config = {
  watchContentBase: true,
  disableHostCheck: true,
  hot: true,
  open: true,
  openPage: 'http://localhost:8080/',
  port: 8080,
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://localhost/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
};

module.exports = config;
