// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 公共路径，如果你的仓库名为 'my-vue-app'，这里就设为 '/my-vue-app/'
  // 如果是自定义域名或直接部署到 username.github.io，设为 '/'
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bir_lar/'  // 改成你的仓库名
    : '/',
    
  // 可选：配置构建输出目录
  outputDir: 'dist',
  
  // 可选：解决路由 history 模式 404 问题
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].minify = {
          ...args[0].minify,
          removeAttributeQuotes: false // 解决某些路径问题
        }
        return args
      })
    }
  }
})