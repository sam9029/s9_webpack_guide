/**
 * webpack.config.js 配置参考标准
 */

/** nodejs -- path文件路径模块 */
const path = require("path");
/** html文件处理  */
const HtmlWebpackPlugin = require("html-webpack-plugin");

//#region 工具函数集
const isProduction = process.env.NODE_ENV === "production";

//#region 配置
module.exports = {
  /** 入口文件 */
  entry: "./src/main.js",

  /** 输出文件配置 */
  output: {
    // 输出到本地根目录，所有输出文件的跟目录 ，dist文件夹下
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[contenthash:8].js", // 将 js 文件输出到 static/js 目录中, [name] 即为对应引入的文件名
    // 自动将上次打包目录资源清空
    clean: true,
  },

  /** module  */
  module: {
    rules: [
      {
        // 指示所有文件仅能匹配一个 loader，加快编译速度
        oneOf: [
          /** 处理 CSS 文件 */
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"], // 结果为： [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
    ],
  },

  /** plugins */
  plugins: [
    /** 模板 html 处理 */
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js、css等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
    },
  },

  /** 配置开发服务器 */
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    hot: true, // 热更新
  },

  /** mode: 环境模式由package.json脚本命令手动控制 */
  mode: isProduction ? "production" : "development",
};
//#endregion
