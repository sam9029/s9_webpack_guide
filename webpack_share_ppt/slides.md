---
# You can also start simply with 'default'
theme: Default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: ./001.png
# some information about your slides (markdown enabled)
title: Webpack
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# <img style='display:inline;width:80px;height:80px' src='./webpack.svg' />Webpack


现代 JavaScript 应用程序的静态模块打包工具

`模块化` `代码分割` `热更新` `树摇优化` `插件系统`

<style>
h1 {
  font-size: 64px !important;
  font-weight: bold;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>


---
transition: slide-left
---

# 前端工程项目文件结构

<div class='flex flex-justify-between'>
<div class='flex-1 mr10'>
<h5> 传统的网页项目文件结构 </h5>

```js
- js
  - moduleA.js
  - moduleB.js
- index.html # 网页结构
- style.css # 网页样式
- demo.js # 业务代码
```

> webpack 构建编译后的目标结构

·

> 由于现在的前端项目开发的文件结构越来越繁杂<br/>
> 如何将项目代码文件构建编译成
>`体积最小、性能最优`的客户端可执行文件已经变成了一种极其专业和复杂的工作<br/>
> webpack就是用来做这个工作的

</div>
<div class='flex-1 mr10'>
<h5> 现在前端工程项目文件结构 </h5>

```js {5,14,22}
- node_modules #依赖文件夹
- dist #构建后的资源文件夹
- public #公共文件夹
  - favicon.ico
  - index.html #html入口
- src
  - api #api接口文件夹
  - assets #资源文件夹
  - router #路由文件夹
  - stores #全局状态文件夹
  - utils #工具类文件夹
  - views #页面资源文件夹
  - app.vue #app.vue Vue实例入口文件
  - main.js #项目入口文件
- .env.development #开发环境变量
- .env.production #生产环境变量
- .eslintignore #eslint检查忽略
- .eslintrc.js #eslint检查文件
- babel.config.js #babeljs
- package-lock.json
- package.json #项目信息&依赖管理
- webpack.config.js #webpack配置文件
- readme.md
```

</div>
<div class='flex-1'>
  <h5> 小果繁星后台代码文件结构（VueCli） </h5>
  <CoverPreview :files="['./003.png']" />
</div>
</div>

<style>
  .file_structure{
    width: 300px;
    height: 430px;
  }
</style>

---
layout: two-cols
transition: slide-left
---

#

<div class='pr10'>
<CoverPreview :files="['./002.png']" />


</div>

::right::

# 浏览器网页运行所需文件

webpack打包后的文件就是`浏览器网页运行所需文件`

```js
- demo // 基本结构
  - index.html # 网页结构
  - style.css # 网页样式
  - demo.js # 业务代码
```

**Webpack的作用：** 将`前端项目`中不同类型的文件`（如JavaScript业务代码、CSS样式代码文件、图片媒体文件等）`视作模块，打包编译成`体积最小、性能最优`的网页静态资源文件

> 前端项目代码文件包含
>
> - 业务/依赖代码： `.js`,
> - 框架代码文件：`.vue, .jsx`
> - 预处理样式： `.less, .sass`,
> - 图像文件: `jpg、png`，媒体文件: `mp4、mp3`
> - 字体文件: `tff`
> - 等(除开代码文件，还有项目配置文件)

<style>
  .broswer_file{
    height:350px;
  }
</style>


---
theme: Default
title: Webpack
class: flex flex-col justify-center flex-items-center 
drawings:
persist: false
transition: slide-left
mdc: true
---

<h1> 前端工程化的两大特征 </h1>

- **JavaSciprt模块化规范探索**
- **前端项目的工程化演变**

`webpack 的基于这两种场景发挥作用， 它出现就伴随了这两特征，并且和其一同发展`

---
layout: two-cols
transition: slide-left
---

# 模块化
模块化--前端开发模式演变

**阶段1-文件划分方式**

```js
└─ 文件划分阶段
  ├── module-a.js // 模块a
  ├── module-b.js // 模块b
  └── index.html
```
```js{5-9}
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    //...
  </script>
</body>
</html>
```

::right::

<div class='ml5'>

```js
// module-a.js
function foo() {
  console.log("moduleA#foo");
}
```

```js
// module-b.js
var data = "something";
```

**弊端**：
> - 模块一旦多了过后，容易产生命名冲突；
> - 全局作用域问题，所有成员都可以在模块外部（全局）被访问或者修改；
> - 无法管理模块与模块之间的依赖关系


- 阶段2-命名空间方式 (`防止重名覆盖`)
- 阶段3-立即执行函数 IIFE 方式 (`私有变量，防篡改`)
- 阶段4-IIFE 依赖参数 (`清晰依赖`)

> 社区规范出现 CommonJS 和 浏览器的AMD模块化<br/>
> nodeJS 支持CommonJS模块化，JS的ES6官方推出ESM模块化

</div>


---
transition: slide-left
--- 

# 工程化开发
前端开发模式演变

> - 前端生态各种依赖工具的繁荣 `Jquery、boostrap、lodash、...`
> - MVVM框架 <img style='display:inline;width:20px;height:20px' src='./vue.ico' /> `Vue、React` 等

<span class='font-size-3 color-gray-500'>入门与开发的成本极大的下降</span><br/>
<span class='font-size-3 color-gray-500'>开发效率的不断提升</span>

生态繁荣也带来了一系列繁杂的工作流程

> - 对HTML、CSS、JS代码、图片等资源进行压缩, 删除冗余代码
> - (依赖和代码在不同浏览器实现)解决CSS、JS代码的浏览器兼容性问题（`Babel`）
> - 将较大的文件分离成多个较小的文件（`代码分割`）、将较小的文件进行合并
> - 对第三方依赖模块进行抽离, 剔除未使用的引入依赖（`树摇优化`）
> - 对 .jsx、.tsx、.vue、.less、.sass等文件进行解析，转换成浏览器能识别的代码（`loader解析`）
> - 代码语法风格检测、环境变量插入等工程化流程概念（`Eslint、env文件环境变量编译`）




---
transition: slide-left
--- 

# 构建工具出现

> Grunt、Gulp、RollUp （对于依赖库和工具开发友好）

<img style='display:inline;width:20px;height:20px' src='./webpack.svg' />Webpack `网页应用构建工具的最佳选择`
<br/><span class='font-size-3 color-gray-500'>2012年 由Tobias Koppers(托拜斯·科珀斯) fork仓库 modules-webmake 加入`代码分割[code splitting]`功能，取名webpack;</span>
<br/><span class='font-size-3 color-gray-500'>2014年 在 OSCON 大会上 Google的 Instagram 团队宣布自己使用Webpack进行`Code Splitting`, 引起关注，大量前端开发投入Webpack生态 </span>

**特性**

> `loader文件编译`
> 
> `plugin插件系统`
> 
> `代码拆分(Code Splitting)`
> 
> `热更新（Hot Module Replacement (HMR)）`
> 
> `树摇优化`

<br />

下一代的前端工具链，为开发提供极速响应

>  `Vite` （Vuejs作者尤雨溪推出）的强势崛起



---
layout: two-cols
transition: slide-left
---

# Webpack 主要功能

> 项目 `webpack_gudie` 演示

**代码分割(Code Splitting)**: Webpack 支持将代码拆分成多个模块，按需加载，实现按需加载和提升应用性能。<br><br>
**热更新(Hot Module Replacement)**: 开发模式下代码变动后对页面的实时更新。<br><br>
**树摇优化**: webpack通过入口文件分析依赖引入，一层一层的找到引入的依赖，将未引用部分依赖模块抛弃。<br>

**文件转换**: 通过加载器`Loader`的使用，可以将其他类型的文件(如 CSS、LESS、图片等)转换为有效的模块<br><br>
**插件系统**: Webpack 提供了丰富的`plugin`插件系统，可以通过插件实现各种功能的扩展，例如压缩代码自动生成 HTML 文件等。<br>

::right::
<div class='ml5'>

```js
// npm i webpack webpack-cli
// webpack.config.js
module.exports = {
  entry:'./src/main.js',
  output:{}, 
  module: {
    rules: []
  },
  plugins:[],
  optimization:{},
  mode: "production", // "development",
}
```

<CoverPreview :files="['./001.png']" />



</div>


---
layout: two-cols
transition: slide-left
---

# Webpack 原理

- Webpack CLI 启动打包流程、载入 Webpack 核心模块，创建 Compiler 对象（负责完成整个项目的构建工作）
- 使用 Compiler 对象开始编译整个项目
- 从入口文件开始，生成代码内容的AST抽象语法树
- 解析AST抽象语法树解析模块依赖，形成依赖关系树
- 递归依赖树，将每个模块交给对应的 Loader 处理
- 合并 Loader 处理完的结果，最后将加载的结果放入 bundle（打包结果）中
- 根据配置进行代码分割, 将打包结果输出到 dist 目录。



::right::
<div class='ml5'>

<CoverPreview :files="['./004.gif']" width='300px' height='200px'/>

- Plugins 插件原理：
Webpack 在其构建过程中提供了许多钩子（hooks），这些钩子是特定事件发生时的回调函数。插件可以通过这些钩子介入构建过程。

<br/>

> https://astexplorer.net/
</div>

---
transition: slide-left
---

# 小果繁星webpack配置解析

<div class='flex flex-justify-between'>
<div class='flex-1 mr10'>


<h3> 静态JS脚本的CDN(内容分发网络)引入 </h3> 

**主要处理**

- 项目依赖的静态资源脚本
  - 如：Vue框架、ElementUI、Axios、等


**优点**

> - 减少网站部署服务器网络请求、占用服务器内存资源、资源的访问影响API接口访问稳定性
> - CDN就近节点请求、提高脚本资源访问速度
> - 提升网站加载速度、增强用户体验


</div>
<div class='flex-1 mr10'>

```js
/** 依赖引入... */
const cdn = {
  externals: {
    vue: "Vue",
    /** 其他... */
  },
  // cdn的js链接
  js: [
    "https://koc-img.lizhibj.cn/cdn/js/vue.min.js", 
    /** 其他... */ ],
};
module.exports = {
  configureWebpack: {
    externals: cdn.externals, /** 外部扩展  */
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    /** 其他... */
  },
};
```


</div>
</div>


---
transition: slide-left
---

<div class='flex flex-justify-between'>
<div class='flex-1 mr10'>

<h3> 代码分割CodeSplit </h3> 

**主要处理**

- 项目代码的chunk文件大小
  - 减小加载的静态资源（JS，CSS文件）数量，提升加载速度
  - 拆分可动态引入的代码文件，优化客户端加载性能

- 未改变的资源文件
  - 加快构建编译速度
  - 客户端二次刷新时避免重复请求相同文件、复用本地的强缓存、减少资源网络请求


</div>
<div class='flex-1 mr10'>

```js
config.optimization.splitChunks({
  chunks: "all",
  cacheGroups: {
    libs: {
      name: "chunk-libs",
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: "initial",
    },
    commons: {
      name: "chunk-commons",
      test: resolve("src/components"), // can customize your rules
      minChunks: 1,
      priority: 5,
      reuseExistingChunk: true,
    },
  },
});
```


</div>
</div>





---
layout: two-cols
layoutClass: gap-16
---

# 谢谢

[Documentation](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/resources/showcases)

<!-- 
> [**Webpack 诞生记**](https://zhuanlan.zhihu.com/p/71640308)<br/>
> 纯历史发展

> [**webpack以及模块化的发展**](https://zhuanlan.zhihu.com/p/465000610) <br/>
> 简单明了，指出 Webpack的出现主要是 究竟解决了什么问题

> [**探索 Webpack 运行机制与核心工作原理**](https://blog.csdn.net/weixin_45857341/article/details/136106756) <br/>
> 每个字都明白，组合在一起看不懂，有源码讲解，但我不知道对应的功能概念（后期深入原理可看）

> [**webpack原理，webpack源码解析，超详细**](https://blog.csdn.net/dxh9231028/article/details/132484535) <br/>
> 更详细的源码讲解，由webpack处理的代码执行流程链（后期深入原理可看
-->

<!-- <PoweredBySlidev mt-10 /> -->


<!-- 
我看主要是webpack的功能和原理，讲的内容要大家能听懂
最后一张是小果繁星的webpack 解析，里面可以把相关代码贴一下，方便讲解
里面有静态JS的配置，贴合我们项目可以讲一下这样做的优点

1：在讲解 Webpack 的功能时，建议更明确地区分核心概念，例如模块打包、代码拆分和缓存。可以结合实际项目说明其使用场景
2：静态 JS 的配置时，建议突出 Webpack 处理静态资源（如图片、CSS、字体）的优点，尤其是如何优化加载和性能
3：模块热更新：可以强调如何设置 HMR，以及在实际开发中的好处，例如减少刷新时间，提升开发效率。
4：在讨论优化方面，可以提到 Tree Shaking、Code Splitting、懒加载等功能的实际操作和在项目中的应用效果
 -->