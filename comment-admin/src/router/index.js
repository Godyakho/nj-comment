import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import List from '@/components/list'
import PageNot from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '*',
      name: '404',
      component: PageNot
    }
  ]
})
