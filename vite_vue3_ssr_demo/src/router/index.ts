import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "../components/HelloWorld.vue";
import AboutView from "../components/About.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
