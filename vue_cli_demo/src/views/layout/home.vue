<template>
  <div class="container__wrapper">
    <h2>vue3-page-template</h2>
    <h2 class="text">test-text</h2>
    <h2 class="my-color">test-my-color-text</h2>
    <button id="dynamicEl">test-dynamic-import-file</button>
  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from 'vue';
import { readEnvArguments } from "@/utils/tools.js";

onMounted(()=>{
  // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log(`[Dev_Log][${'onMounted生命周期'}_]_>>>`)

  readEnvArguments();

  /** 手动指明 文件动态引入 */
  document.getElementById("dynamicEl").addEventListener("click", () => {
      // webpackChunkName: "dynamic"：这是webpack动态导入模块命名的方式

      // "dynamic"将来就会作为[name]的值显示。
      import(/* webpackChunkName: "bundle_dynamic" */ "@/utils/dynamic.js")
        .then((module) => {
          // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          console.log(`[Dev_Log][${"按需加载模块加载成功"}_]_>>>`);
          console.log(module);
          console.log(module.dynamicFn(2, 1));
        })
        .catch((err) => {
          console.log(`[Dev_Log][${"按需加载模块加载成功"}_]_>>>`, err);
        });
    });
})
</script>

<style lang="scss" scoped>
.container__wrapper {
  color: #999;
}
</style>
