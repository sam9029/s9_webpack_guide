<template>
  <Layout />
</template>

<script setup lang="js">
import Layout from '@/views/layout/index.vue'
//NODE_ENV 在环境文件中没有，但是是有cross-env 在npm run 注入的
console.warn(`[Dev_Log][${'envMode'}_]_>>>`, process.env.NODE_ENV)
console.warn(`[Dev_Log][${'base_api'}_]_>>>`, process.env.VUE_APP_BASE_URL)
</script>

<style lang="scss" scoped></style>
