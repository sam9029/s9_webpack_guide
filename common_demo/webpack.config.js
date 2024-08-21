/**
 * webpack.config.js 配置参考标准
 */

/** nodejs -- path文件路径模块 */
const path = require("path");

/** eslint代码检测 */
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
/** html文件处理  */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** css文件提取处理 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/** css文件压缩处理 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
/** 预加载插件 */
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
/** 可视化依赖分析插件 */
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//#region 工具函数集
const isProduction = process.env.NODE_ENV === "production";

/**
 * @description 获取处理css样式的loaders工具配置函数, 配置了基础的loader，同时接收传参自定义loader
 * @param {Array} preProcessorList []
 * @returns
 */
const setStyleLoaders = (preProcessorList = []) => {
  return [
    // [生产模式]下单独提取css文件loader并压缩; [开发模式]仅提取JS样式为CSS的style文件引入即可
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    // 基础css-loader
    "css-loader",
    // css代码兼容处理loader配置
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    // 外部传入自定义 loader
    ...preProcessorList,
  ].filter(Boolean); // 筛选所有存在的loader
};
//#endregion

//#region 配置
module.exports = {
  /** 入口文件 */
  entry: "./src/main.js",

  /** 输出文件配置 */
  output: {
    // 输出到本地根目录，所有输出文件的跟目录 ，dist文件夹下
    path: path.resolve(__dirname, "dist"),
    // 注意这里配置的是所有JS文件的输出路径，其他类型单独在 module-rules中配置
    /**
     * [name]: 文件原名称 * [contenthash:8]: 文件内容哈希值取8位
     * [hash:8]: 随机hash值取8位 * [ext]: 使用之前的文件扩展名 * [query]: 添加之前的query参数
     * */
    filename: "static/js/[name].[contenthash:8].js", // 将 js 文件输出到 static/js 目录中, [name] 即为对应引入的文件名
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // import()动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    // 自动将上次打包目录资源清空
    clean: true,
  },

  /** 路径别名 */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
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
            use: setStyleLoaders(), // 结果为： [MiniCssExtractPlugin.loader, "css-loader"],
          },

          /** 处理 less 文件 */
          {
            test: /\.less$/,
            use: setStyleLoaders(["less-loader"]), // 结果为： [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
          },

          /** 处理 scss or sass 文件 */
          {
            test: /\.s[ac]ss$/,
            use: setStyleLoaders(["sass-loader"]), // 结果为： [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },

          /** 处理 图片资源 */
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset", // 资源类型为 asset，Webpack 会根据文件类型选择合适的加载器进行处理, 比如 url-loader
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: { filename: "static/imgs/[hash:8][ext][query]" }, // 由 assetModuleFilename 统一设置
          },

          /** 字体资源输出目录 */
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: { filename: "static/media/[hash:8][ext][query]" }, // 由 assetModuleFilename 统一设置
          },

          /** 媒体资源输出目录 */
          {
            test: /\.(mp4|mp3|avi)$/,
            type: "asset/resource",
            // generator: { filename: "static/media/[hash:8][ext][query]" }, // 由 assetModuleFilename 统一设置
          },

          /** JS 文件的 babel 处理代码语法兼容性 */
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                },
              },
            ],
          },
        ],
      },
    ],
  },

  /** plugins */
  plugins: [
    /** eslint 检测 */
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "node_modules/.cache/.eslintcache"
      ),
    }),
    /** 模板 html 处理 */
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js、css等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    /** css文件提取处理 --- [生产模式]下压缩 */
    isProduction &&
      new MiniCssExtractPlugin({
        // 定义输出文件名和目录
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
    /** css压缩  */
    new CssMinimizerPlugin(),
    /** 可视化依赖分析配置 */
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: 'auto', // 自动使用未使用的端口 或者 '6789'自行设置
      openAnalyzer: true,
      generateStatsFile: false,
      statsOptions: null,
      logLevel: "info",
    }),
    /** 预加载文件资源配置 */
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],

  optimization: {
    chunkIds: "named",
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
      minSize: 20000, // 分割代码最小的大小
      minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 30, // 入口js文件最大并行请求数量
      enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      /*  缓存组：哪些文件模块要打包到一个组 */
      cacheGroups: {
        defaultVendors: {
          // 指定chunks名称
          filename: "static/js/bundle_libs.js", // 指定打包到文件夹
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 权重（越大越高）
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        },
        default: {
          filename: "static/js/bundle_[contenthash:8].js", // 指定打包到文件夹
          // 其他没有写的配置会使用上面的默认值
          minChunks: 1, // 这里的minChunks权重更大
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // 阻止宿主文件引入依赖文件却因为依赖文件发生改变导致自身打包后名称改变
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },

  /** 配置开发服务器 */
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 热更新
    compress: true, // 压缩
  },

  /** 资源(asset)和入口起点超过指定文件限制 */
  performance: {
    // 入口文件的最大体积控制(单位: bytes)
    maxEntrypointSize: 5 * 1024 * 1024, // 5MB
    // 单个资源体积控制(单位: bytes)
    maxAssetSize: 5 * 1024 * 1024, // 5MB
  },

  /** mode: 环境模式由package.json脚本命令手动控制 */
};
//#endregion
