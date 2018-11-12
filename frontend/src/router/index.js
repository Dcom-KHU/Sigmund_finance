import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import userList from '@/components/userList/userList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    }
  ]
})
