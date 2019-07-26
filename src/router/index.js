import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/home'
import IndexNav from '@/pages/indexnav'
import Index from '@/pages/index'
import Mine from '@/pages/mine'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: IndexNav,
      children: [{
          path: '/',
          component: Index,
        },
        {
          path: '/mine',
          component: Mine,
        }
      ]
    }]
  }]
})
