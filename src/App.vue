<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
       
      <router-link to="/databases-list">Databases List</router-link> |
      <router-link to="/add-database">Add Database</router-link> |
      <router-link to="/edit-proxy">Edit Proxy</router-link> |
      <router-link to="/manage-content-types">Manage Content Types</router-link> |
      <router-link to="/manage-topic-areas">Manage Topic Areas</router-link> |

  
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">

</style>
