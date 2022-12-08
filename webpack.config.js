const path = require('path');
const SentryPlugin = require('@sentry/webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()

    process.env.VUE_APP_ENV !== 'development' && process.env.VUE_SENTRY_DSN && new SentryPlugin({
      release: process.env.VUE_APP_ENV,
      include: path.resolve('dist/js'),
      environment: process.env.VUE_APP_ENV,
    }),
  ].filter(Boolean),
  externals: {}
};
