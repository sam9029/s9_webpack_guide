import App from './App.vue'
import { createSSRApp } from 'vue'

import { createPinia } from 'pinia'
import router from './router/index.ts'
const pinia = createPinia()

import './style.css'

export function createApp() {
  const app = createSSRApp(App).use(router).use(pinia)
  return { app }
}
