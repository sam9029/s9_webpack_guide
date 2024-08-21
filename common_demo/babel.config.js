// babel.config.js
module.exports = {
  // 预设
  presets: [
    [
      "@babel/preset-env",
      {
        /* 配置 corejs 的自动按需引入 */
        useBuiltIns: "usage",
        corejs: { version: "3", proposals: true },
      },
    ],
  ],
  // 插件
  plugins: ["@babel/plugin-transform-runtime"], // 统一引入babel辅助代码-减少代码体积
};
