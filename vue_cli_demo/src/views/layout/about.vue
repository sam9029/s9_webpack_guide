<template>
  <div class="container__wrapper">
    <h2>about</h2>
    <h3 style="user-select: none">
      <span> store数据counter： {{ appStore.counter }}</span>
      <span style="cursor: pointer" @click="handlePlus">(➕)</span>
    </h3>
    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>
</template>

<script setup lang="js">
import { useAppStore } from '@/stores/app.js'

const appStore = useAppStore()

const handlePlus = ()=> {
  appStore.setCounterPlus();
}
</script>

<style lang="scss" scoped>
.container__wrapper {
}
</style>
