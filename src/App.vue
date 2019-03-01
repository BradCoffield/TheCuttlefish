<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/databases-list">Databases List</router-link>|
      <router-link to="/add-database">Add Database</router-link>|
      <router-link to="/edit-proxy">Edit Proxy</router-link>|
      <router-link to="/manage-content-types">Manage Content Types</router-link>|
      <router-link to="/manage-topic-areas">Manage Topic Areas</router-link>|  <div id="firebaseui-auth-container" ></div><a href="" @click="logOut">Log out</a>
    </div>
   
    

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
</style>
<script>
import firebase from "./Firebase";
import router from "./router";
import * as firebaseui from "firebaseui";
export default {
methods: { 
  logOut() { 
    firebase.auth().signOut();
  } 
},

     created(){
        var uiConfig = {
        signInSuccessUrl: '/databases-list',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         ],
        
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    }

};
</script>

