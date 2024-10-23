/* 引入Vue框架 */
import { createApp } from "vue/dist/vue.esm-bundler";
/** Vue入口文件 */
import App from "./app.vue";
/** 路由页面 */
import router from "./router/index.js";
/** pinia状态管理 */
import { createPinia } from "pinia";
/** 日期时间处理依赖 */
// import '@/utils/date.js'


/* 引入 CSS 资源，Webpack才会对其打包 */
import "@/assets/style/index.css";
import "@/assets/style/index.scss";

/** 引入测试函数 */
import "@/utils/testCode.js";

//NODE_ENV 在环境文件中没有，但是是有cross-env 在npm run 注入的
console.warn(`[Dev_Log][${'envMode'}_]_>>>`, process.env.NODE_ENV)
console.warn(`[Dev_Log][${'base_api'}_]_>>>`, process.env.VUE_APP_BASE_URL)

/**
 * 创建Vue实例
 * 使用vue-router
 * 并挂载（mount）到id为app的DOM元素上*/
const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).mount("#app");
