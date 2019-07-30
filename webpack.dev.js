const webpack =require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')


const devConfig = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
    port: 3000  
  },
 
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // htmlWebpackPlugin会在打包结束后,自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
  optimization:{
    usedExports:true
  }  
};


module.exports = merge(commonConfig,devConfig)