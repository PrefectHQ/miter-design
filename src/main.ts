import { createApp } from 'vue'

// Global and functional styles
import '@/styles/main.scss'

import App from './App.vue'
import * as Components from '@/components'

const app = createApp(App)

app.component('Button', Components.Button)
app.mount('#app')
