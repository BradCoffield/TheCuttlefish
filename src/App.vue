<template>
  <div id="app">
   <template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <!-- <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                > --><span id="library-logo-text" style="font-weight:bold">RMC Library Data Manager</span>
            </b-navbar-item>
        </template>
        <template slot="start">
          
       
            <b-navbar-dropdown label="Databases">
                <b-navbar-item  >
                    <router-link to="/databases-list">Databases List</router-link>
                </b-navbar-item>
                <b-navbar-item  >
                      <router-link to="/add-database">Add Database</router-link>
                </b-navbar-item>
                 <hr class="navbar-divider">
                <b-navbar-item> <router-link to="/edit-proxy">Edit Proxy</router-link></b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-dropdown label="Metadata">
                <b-navbar-item  >
                    <router-link to="/manage-content-types">Content Types</router-link>
                </b-navbar-item>
                <b-navbar-item  >
                      <router-link to="/manage-topic-areas">Topic Areas</router-link>
                </b-navbar-item>
            </b-navbar-dropdown>
                <b-navbar-dropdown label="Visualizations">
                <b-navbar-item  >
                    <router-link to="/visualize-database-content-types">Database Content Types</router-link>
                </b-navbar-item>
                <b-navbar-item  >
                      <router-link to="/visualize-database-topic-areas">Database Topic Areas</router-link>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                      <div id="firebaseui-auth-container"></div>    <div id="sign-in-status"></div><a href @click="logOut">&nbsp;| Log out</a> 
                    <!-- <a class="button is-light">
                        Log in
                    </a> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

    <div id="nav">
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/databases-list">Databases List</router-link>|
      <router-link to="/add-database">Add Database</router-link>|
      <router-link to="/edit-proxy">Edit Proxy</router-link>|
      <router-link to="/manage-content-types">Manage Content Types</router-link>|
      <router-link to="/manage-topic-areas">Manage Topic Areas</router-link>|
     <a href @click="logOut">Log out</a> -->
      <div >
        <!-- <div id="firebaseui-auth-container"></div> -->
      </div>
      
    </div>

     <div>
     
      <div id="sign-in-status"></div>
    </div> 
    <!-- <div id="sign-in"></div>  
    <pre id="account-details"></pre> -->
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
  data() {
    return {
      userName: "",
      userEmail:""
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  },

  created() {
      var uiConfig = {
        signInSuccessUrl: "/databases-list",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
      };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);

    let initApp = (function() {
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
           
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
      
            console.log(email)
            user.getIdToken().then(function(accessToken) {
               
              document.getElementById("sign-in-status").textContent =
                `Signed in as ${email}`;
              // document.getElementById("sign-in").textContent = "Sign out";
              // document.getElementById(
              //   "account-details"
              // ).textContent = JSON.stringify(
              //   {
              //     displayName: displayName,
              //     email: email,
              //     emailVerified: emailVerified,
              //     phoneNumber: phoneNumber,
              //     photoURL: photoURL,
              //     uid: uid,
              //     accessToken: accessToken,
              //     providerData: providerData
              //   },
              //   null,
              //   "  "
              // );
            });
          } else {
        
            // User is signed out.
            // document.getElementById("sign-in-status").textContent =
            //   "Signed out";
            // document.getElementById("sign-in").textContent = "Sign in";
            // document.getElementById("account-details").textContent = "null";
          }
        },
        function(error) {
          console.log(error);
        }
      );
    })();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap');
h1, h2, h3, h4 {font-family: 'Raleway', sans-serif;}
p, span, tbody, .th-wrap, a, .button, .label {font-family: 'Raleway', sans-serif;}
</style> 