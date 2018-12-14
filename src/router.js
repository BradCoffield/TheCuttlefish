import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
 
import DatabasesList from './views/DatabasesList.vue'
import AddDatabase from './views/AddDatabase.vue'
import EditDatabase from './views/EditDatabase.vue'
 

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
      path: '/add-database',
      name: 'Add Database',
      component: AddDatabase
    },
    {
      path: '/edit-database/:id',
      name: 'Edit Database',
      component: EditDatabase
    },
   
    
  ]
})
