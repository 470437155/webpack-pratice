const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: "all", //async只对异步生效,all对所有生效
      minSize: 30000, //大于这个字节数才做代码分割
      maxSize:0,//对大文件进行拆分,一般不用
      minChunks: 1,//当一个模块至少被引用n次的才分割
      maxAsyncRequests: 5,//只对入口文件的前五个做分割
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",//文件生成后名字的连接符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // filename: "vendors.js"
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,//如果一个模块已经被打包过了,那么就会被忽略
          filename:'common.js'
        }
      }
    }
  },
  output: {
    // publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
