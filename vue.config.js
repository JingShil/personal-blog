const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir:'static',
  outputDir:"dist",
  indexPath: 'index.html',
  lintOnSave:false,
  parallel:false,
})

// module.exports = {

//   publicPath:process.env.NODE_ENV=="production"?"./":"/",

// }


// module.exports = {
//   assetsDir: 'static',
//   parallel: false,
//   publicPath: './',
  
// }