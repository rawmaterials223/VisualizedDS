import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/home.vue').default
    },
    {
      path: '/Sort',
      name: 'Sort',
      component: () => import('@/views/Sort.vue')
    },
    {
      path: '/Joseph',
      name: 'Joseph',
      component: () => import('@/views/Joseph.vue')
    }
  ]
})
