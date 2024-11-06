<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink class="mx-10" to="/">Go to Home</RouterLink>
    <RouterLink class="mx-10" to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.log(`[Dev_Log][${"import"}_]_>>>`, import.meta.env);
</script>

<style scoped>
.mx-10 {
  margin: 0 10px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
