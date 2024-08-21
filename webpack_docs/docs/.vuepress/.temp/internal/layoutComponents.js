import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/MyTest/project/sam9029_code_life/test/webpack_practice/Courseware/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("C:/MyTest/project/sam9029_code_life/test/webpack_practice/Courseware/webpack_docs/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
