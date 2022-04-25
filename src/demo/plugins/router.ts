import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Components from '../views/Components.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'components',
    component: Components
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
