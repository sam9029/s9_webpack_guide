import { createMemoryHistory, createRouter } from "vue-router";
/** createWebHashHistory Hash 模式 */
/** createMemoryHistory Memory 模式 */
/** createWebHistory HTML5 模式 */

import HomeView from "@/views/layout/home.vue";
import AboutView from "@/views/layout/about.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
