const path = require('path');
const address = require('address');

process.env.VUE_APP_WEB_API = process.env.VUE_APP_WEB_API.replace('localhost', address.ip());

module.exports = {
  lintOnSave: false,
  configureWebpack: require('./webpack.config'),
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader');

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
        .loader('style-vw-loader')
        .options({
          unitToConvert: 'px',
          viewportWidth: 1920,
          unitPrecision: 5,
          viewportUnit: 'rem',
          fontViewportUnit: 'rem',
          minPixelValue: 1
        });
  },
  publicPath: '/',
  runtimeCompiler: true,
  css: {
    sourceMap: true,
  },
  lintOnSave: true,
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/theme.scss'),
        path.resolve(__dirname, 'src/styles/z-index-fn.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss')
      ]
    }
  },
  devServer: {
    port: process.env.PORT,
    proxy: {
      '/app_api': {
        target: process.env.VUE_APP_WEB_API,
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
  ]
};
