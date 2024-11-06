<template>
  <div class="card">
    <button type="button" @click="handleAdd">count is {{ count }}</button>
  </div>

  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
import { computed } from "vue";

// defineProps<{ msg: string }>()

import { useAppStore } from "@/store/app";

const appStore = useAppStore();

const count = computed(() => appStore.count);

const handleAdd = () => {
  appStore.increment();
};
</script>

<style scoped></style>
