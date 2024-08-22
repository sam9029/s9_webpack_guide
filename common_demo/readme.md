# 搭建 Webpack 通用脚手架配置

## config

- webpack.config.js

通用（合并了生产和开发模式）的配置

关于 `webpack.dev.js` 和 `webpack.prod.js` 可以提取相同配置组成 `webpack.common.js`的

但是我懒不想配置了，直接就在一个文件 `webpack.config.js`在文件里拿环境变量

来判断生产和开发环境的不同配置是否生效即可

但是也可供了完备的  webpack.dev.js 和 webpack.prod.js 配置文件 以供参考

- webpack.dev.js (仅参考--可删)

单独的开发模式的配置

- webpack.prod.js (仅参考--可删)

单独的生产模式的配置

## package.json

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx webpack serve --mode=development", // 开发环境起端口服务热更新调试
    "build:dev": "npx webpack --mode=development", // 开发环境打包
    "build:prod": "npx webpack --mode=production" // 生产环境打包
  },
```
