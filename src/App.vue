<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/databases-list">Databases List</router-link>|
      <router-link to="/add-database">Add Database</router-link>|
      <router-link to="/edit-proxy">Edit Proxy</router-link>|
      <router-link to="/manage-content-types">Manage Content Types</router-link>|
      <router-link to="/manage-topic-areas">Manage Topic Areas</router-link>|
     <a href @click="logOut">Log out</a>
      <div >
        <div id="firebaseui-auth-container"></div>
      </div>
      
    </div>

    <!-- <div>
      <div style="float:left">You are currently:&nbsp;&nbsp;</div>
      <div id="sign-in-status"></div>
    </div> -->
    <!-- <div id="sign-in"></div> -->
    <!-- <pre id="account-details"></pre> -->
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
      user: false
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
            this.user = true;
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
              document.getElementById("sign-in-status").textContent =
                "Signed in";
              document.getElementById("sign-in").textContent = "Sign out";
              document.getElementById(
                "account-details"
              ).textContent = JSON.stringify(
                {
                  displayName: displayName,
                  email: email,
                  emailVerified: emailVerified,
                  phoneNumber: phoneNumber,
                  photoURL: photoURL,
                  uid: uid,
                  accessToken: accessToken,
                  providerData: providerData
                },
                null,
                "  "
              );
            });
          } else {
            this.user = false;
            // User is signed out.
            document.getElementById("sign-in-status").textContent =
              "Signed out";
            document.getElementById("sign-in").textContent = "Sign in";
            document.getElementById("account-details").textContent = "null";
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

