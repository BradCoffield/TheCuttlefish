import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
 
import DatabasesList from './views/DatabasesList.vue'
import DatabasesListFancy from './views/DatabasesList-FANCY.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/databases-list',
      name: 'databases list',
      component: DatabasesList
    },
    {
      path: '/databases-list-fancy',
      name: 'databases list fancy',
      component: DatabasesListFancy
    },
    
  ]
})
