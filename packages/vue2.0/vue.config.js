const {
  defineConfig
} = require('@vue/cli-service');
const { name } = require('./package.json');
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`
      // uni: `webpackJsonp_${name}`,
    },
  },
});
