// .eslintrc.js
module.exports = {
  parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
  // 解析选项
  parserOptions: {
    // ecmaVersion: 6, // ES 语法版本
    ecmaVersion: 2020, // 或更高版本
    sourceType: "module", // ES 模块化
    // ecmaFeatures: {
    //   // ES 其他特性
    //   jsx: true, // 如果是 React 项目，就需要开启 jsx 语法
    // },
  },
  plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  // 继承其他规则--继承 Eslint 规则
  extends: ["eslint:recommended"],
  // 环境配置
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
    es6: true, // 启用除模块之外的所有 ECMAScript 6 功能
  },
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
  // 具体检查规则
  rules: {
    // "no-var": "warn", // 不能使用 var 定义变量
  },
};
