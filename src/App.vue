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
             <b-navbar-dropdown label="Featured Collections">
               <b-navbar-item  >
                    <router-link to="/list-featured-collections">Featured Collections List</router-link>
                </b-navbar-item>
               <b-navbar-item  >
                    <router-link to="/add-featured-collection">Add Featured Collection</router-link>
                </b-navbar-item>
             </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                   
                      <div id="firebaseui-auth-container"></div>   
                       <div id="sign-in-status"></div><a @click="logOut" id="logoutlink">&nbsp;| Log out</a> 
                    <!-- <a class="button is-light">
                        Log in
                    </a> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

    

     <div>
     
      <!-- <div id="sign-in-status"></div> -->
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
      userEmail:"",
      
    
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
         let bb = document.getElementById("logoutlink")
              bb.style.display = "none"
                   let aa = document.getElementById("firebaseui-auth-container")
              aa.style.display = "block"
    }
  },

  created() {
       let loggedStatus = this.loggedStatus;
            //  console.log( firebase.auth().currentUser)

      var uiConfig = {
        signInSuccessUrl: "/databases-list",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
      };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);

    let initApp = (function() {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

     
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
              
              document.getElementById("sign-in-status").innerHTML =
                `${email}  `;
              
              let aa = document.getElementById("firebaseui-auth-container")
              aa.style.display = "none"
              
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
            // document.getElementById("sign-in-status").innerHTML =
            //   "Signed out";
              let bb = document.getElementById("logoutlink")
              bb.style.display = "none"
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
.container{margin-top:3rem!important;}
.table-wrapper {margin-top:3rem!important;}
.navbar{background: #d2d2d4!important;}
</style> 