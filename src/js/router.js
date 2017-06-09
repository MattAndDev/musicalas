// ============================================
// Router
// ============================================


import Vue from 'vue'
import Router from 'vue-router'
import Play from 'views/play.vue'
import Entry from 'views/entry.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    }
  ]
})
