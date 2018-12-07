import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import userList from '@/components/list/userList'
import financeList from '@/components/list/financeList'
import debtList from '@/components/list/debtList'

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
    },
    {
      path: '/financeList',
      name: 'financeList',
      component: financeList
    },
    {
      path: '/debtList',
      name: 'debtList',
      component: debtList
    }
  ]
})
