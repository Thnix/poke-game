import './assets/main.css'

import axiosConfig from '@/boot/axiosConfig'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(axiosConfig);

app.use(createPinia())
app.use(router)

app.mount('#app')
