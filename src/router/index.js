import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
  {
    path: '/task',
    name: 'task',
    component: () => import(/* webpackChunkName: "about" */ '../views/task.vue')
  },
  {
    path: '/package',
    name: 'package',
    component: () => import(/* webpackChunkName: "about" */ '../views/package.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import(/* webpackChunkName: "about" */ '../views/me.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
