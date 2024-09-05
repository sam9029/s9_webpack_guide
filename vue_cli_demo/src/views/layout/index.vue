<template>
  <div class="app-layout__wrapper">
    <div class="nav__wrapper">
      <div>
        <routerLink class="nav_btn" to="/home">HOME</routerLink>
        <routerLink class="nav_btn" to="/about">ABOUT</routerLink>
      </div>

      <div style="margin: 10px 0">
        <span> 全局store数据counter： {{ appStore.counter }}</span>
      </div>

      <div style="border: 1px solid silver">
        <routerView />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { testGetApi, testPostApi } from '@/api/test/index.js'

import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()

testGetApi();
testPostApi();
</script>

<style lang="scss" scoped>
.app-layout__wrapper {
  .nav__wrapper {
    :deep {
      .nav_btn {
        margin-right: 20px;
        padding: 10px;
        border-radius: 6px;
        background-color: #fff;
        color: #000;
        text-decoration: none;
      }
      .router-link-active {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
