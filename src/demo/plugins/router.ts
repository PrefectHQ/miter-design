import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Components from '../views/Components.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/icons',
    name: 'icons',
    component: () => import('../views/Icons.vue') // We don't implement route level code splitting for the components route because we don't want this to load asyncronously
  },
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
