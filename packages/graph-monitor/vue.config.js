const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*"
    },
  },
  lintOnSave:false,
  transpileDependencies: true,
});
