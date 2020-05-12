import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
	  path: '/home',
	  name: 'home',
	  component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
	},
  {
    path: '/playmusic',
    name: 'playmusic',
    component: () => import(/* webpackChunkName: "about" */ '../views/play_music.vue')
  },
  {
    path: '/musicplay',
    name: 'musicplay',
    component: () => import(/* webpackChunkName: "about" */ '../views/music_play.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
