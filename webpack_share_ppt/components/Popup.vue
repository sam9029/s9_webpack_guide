<template>
  <div class="container__wrapper position-relative">
    <div @click="visible = !visible">
      <slot name="refer">Code</slot>
    </div>
    <div v-if="visible" class="position-absolute top-0 left-[100%] ">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, computed, onMounted } from "vue";

let visible = ref(false);
</script>

<style lang="scss" scoped>
.container__wrapper {
}
</style>
