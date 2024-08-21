import _ from "lodash";

import { intt, intt2, testFind, testIncludes } from "./js/index";
import { handleTestIgnore } from "./testIgnore/index";
import { sum1 } from "@/js/math.js";

// 引入 font字体资源，Webpack才会对其打包
import "./font/iconfont.css";
// 引入 Css 资源，Webpack才会对其打包
import "./style/index.css";
import "./style/less.less";
import "./style/sass.scss";
import bearEatFish from "@/assets/bearEatFish.mp4";

let mode = process.env.NODE_ENV;
// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.log(`[Dev_Log][${"mode---"}_]_>>>`, mode);

// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.log(`[Dev_Log][${"entry: main_js"}_]_>>>`);
console.log(`[Dev_Log][${"entry: main_js"}_]_>>>`);
console.log(`[Dev_Log][${"entry: main_js"}_]_>>>`);
console.log(`[Dev_Log][${"entry: main_js"}_]_>>>`);
console.log(`[Dev_Log][${"entry: main_js"}_]_>>>`);
sum1();
intt(1, 2);
intt2([1, 2]);
testFind();
testIncludes();
handleTestIgnore();

/** 视频引入 */
const videoEl = document.createElement("video");
videoEl.src = bearEatFish;
videoEl.style.width = "320px";
videoEl.style.height = "160px";
videoEl.controls = true;
document.getElementById("video").append(videoEl);

/** 依赖库引入 */
let num = 0;
num = _.sum(10, 0);
// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.log(`[Dev_Log][${"num"}_]_>>>`, num);

/** 手动指明 文件动态引入 */
document.getElementById("dynamicEl").addEventListener("click", () => {
  // eslint会对动态导入语法报错，需要修改eslint配置文件（plugins: ["import"], // 解决动态导入import语法报错问题），提前下载 npm i eslint-plugin-import -D
  // webpackChunkName: "dynamic"：这是webpack动态导入模块命名的方式
  // "dynamic"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "bundle_dynamic" */ "./js/dynamic.js")
    .then((module) => {
      // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      console.log(`[Dev_Log][${"按需加载JS模块加载成功"}_]_>>>`);
      console.log(module);
      console.log(module.dynamicFn(2, 1));
    })
    .catch((err) => {
      console.log(`[Dev_Log][${"按需加载JS模块加载成功"}_]_>>>`, err);
    });

  import(/* webpackChunkName: "bundle_dynamic" */ "./style/dynamic.css")
    .then((module) => {
      // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      console.log(`[Dev_Log][${"按需加载CSS模块加载成功"}_]_>>>`);
      console.log(module);
      console.log(module.dynamicFn(2, 1));
    })
    .catch((err) => {
      console.log(`[Dev_Log][${"按需加载CSS模块加载成功"}_]_>>>`, err);
    });
});

// 添加promise代码
// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.log(`[Dev_Log][${"new Promise"}_]_>>>`, new Promise(() => {}));
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});
