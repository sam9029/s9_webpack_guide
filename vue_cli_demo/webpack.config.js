/** node模块 文件路径path */
const path = require("path");
/** 项目全局变量设置 */
const { DefinePlugin } = require("webpack");
/** 环境变量申明 */
const Dotenv = require("dotenv-webpack");
/** eslint代码检测 */
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
/** VUE模板处理Plugin */
const VueLoaderPlugin = require("vue-loader/dist/index").VueLoaderPlugin;
/** 拷贝资源Plugin*/
const CopyPlugin = require("copy-webpack-plugin");
/** 模板html处理 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** css文件提取处理 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/** css文件压缩处理 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
/** 代码处理--剔除冗余代码 */
const TerserPlugin = require("terser-webpack-plugin");
/** 按需引入插件 */
const AutoImport = require("unplugin-auto-import/webpack").default;
const Components = require("unplugin-vue-components/webpack").default;
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
/** 可视化依赖分析插件 */
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/**
 * 环境判断
 *  */
const envMode = process.env.NODE_ENV;
const isProduction = envMode === "production";

/**
 * 注入环境变量--仅供webpack.config.js使用，项目文件中无法使用
 *  */
require("dotenv").config({ path: `.env.${envMode}` });

/**
 * @description 获取处理css样式的loaders工具配置函数, 配置了基础的loader，同时接收传参自定义loader
 * @param {Array} preProcessorLoader []
 * @returns
 */
const setStyleLoaders = (preProcessorLoader = []) => {
  return [
    // [生产模式]下单独提取css文件loader并压缩;
    MiniCssExtractPlugin.loader,
    // 基础css-loader
    "css-loader",
    // css代码兼容处理loader配置
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 兼容预设的配置, 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    // 外部传入自定义 loader
    ...preProcessorLoader,
  ].filter(Boolean); // 筛选所有存在的loader
};

/**
 * 配置项
 * */
module.exports = {
  /** 入口文件 */
  entry: "./src/main.js",

  /** 构建打包输出文件 */
  output: {
    /** 输出路径 */
    path: path.resolve(__dirname, "dist"), // __dirname:当前文件夹（webpack.config.js所在文件夹）
    /** 文件输出名称 */
    filename: "static/js/[name].[contenthash:6].js", // [name] 表示取文件本身名称，是一种webpack内置的快捷语法，参考https://www.webpackjs.com/configuration/output/#template-strings
    /** 图片、字体等资源命名方式（注意用hash） */
    assetModuleFilename: "static/media/[name].[hash:6][ext]",
    // 自动将上次打包目录资源清空
    clean: true,
  },

  /**  resolve 配置  */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 把 src 这个常用目录修改为 @
    },
    extensions: [".js", ".vue"], //配置了这些我们就不写那些后缀名啦
  },

  /** loader */
  module: {
    rules: [
      /** 处理 Vue 文件， vue-loader 不支持 oneOf */
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },

      /** 处理 CSS 文件 */
      {
        test: /\.css$/,
        use: setStyleLoaders(),
      },

      /** 处理 SCSS 文件 */
      {
        test: /\.s[ac]ss$/,
        use: setStyleLoaders([
          {
            loader: "sass-loader",
            /** elemenplus-自定义CSS主题配置 */
            options: {
              additionalData: `@use "@/assets/style/element/theme.scss" as *;`,
            },
          },
        ]),
      },

      /** 处理图片文件 */
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        type: "asset", // 资源类型为 asset，Webpack 会根据文件类型选择合适的加载器进行处理, 比如 url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
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
      },

      /** 字体资源输出目录 */
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },

      /** 媒体资源输出目录 */
      {
        test: /\.(mp4|mp3|avi)$/,
        type: "asset/resource",
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

  /** 插件 */
  plugins: [
    /** 环境变量配置---供项目文件中使用, 该文件webpack.config.js无法使用 */
    new Dotenv({
      path: path.resolve(__dirname, `.env.${envMode}`), // 指定引入的.env文件的路径
    }),

    /** 解决页面vue相关警告 */
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
    }),

    /** Eslint代码检查  */
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),

    /** vue文件处理 */
    new VueLoaderPlugin(),

    /** 按需引入插件 */
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),

    /** 模板 html 处理 */
    new HtmlWebpackPlugin({
      /**
       * 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js、css等资源
       * 以 public/index.html 为模板创建文件
       * */
      template: path.resolve(__dirname, "public/index.html"),
      title: process.env.VUE_APP_TITLE,
    }),

    /** css文件提取处理 --- */
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:6].css", // 定义输出静态文件名和目录
      chunkFilename: "static/css/[name].[contenthash:6].chunk.css", // 定义输出动态引入文件名和目录
    }),

    /** css压缩  */
    new CssMinimizerPlugin(),

    /** 复制public资源到index里面 */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"), //将public包含index文件
          to: path.resolve(__dirname, "./dist"), //复制到dist目录下
          globOptions: {
            // 忽略index.html文件
            ignore: ["**/index.html"],
          },
        },
      ],
    }),

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
  ],

  optimization: {
    chunkIds: "named",

    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            /** true 表示剔除所有 console.*; 亦可以使用： ['log','info'] 表示仅仅剔除 log和info */
            drop_console: ["log", "info"],
          },
        },
      }),
    ],

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
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块:指定依赖库的文件node_modules
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
  },

  /** 配置开发服务器 */
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 热更新
    compress: true, // 压缩
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: true, // 解决前端路由刷新404问题
    /** 开发环境-接口代理 */
    proxy: [
      {
        context: [process.env.VUE_APP_BASE_URL],
        target: process.env.VUE_APP_API_URL, // 真正请求的接口地址
        // 重写目标路径
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_URL]: "",
        },
        // 默认情况下，changeOrigin 设置为 false，这意味着代理请求中的 Host 头将保持与原始请求相同。如果你将其设置为 true，代理服务器会将 Host 头更改为代理目标服务器的主机名
        changeOrigin: true,
      },
    ],
  },

  /** mode: 环境模式由package.json脚本命令手动控制 */
  mode: envMode,

  /** 源码映射--SourceMap */
  // devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
};
