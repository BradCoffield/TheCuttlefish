<template>
    <section>
     <img src="../assets/cuttlefish01.png" alt="" id="mascot">
      <!-- <input class="c-button" type="button" style="float:right;font-size: 14px;" value="Sign Out" @click="signOut" />
  <input class="c-button" type="button" style="float:right;font-size: 14px;" value="Sign-In" @click="signIn" /> -->
  <!-- <div id="firebaseui-auth-container"></div>
  <div id="sign-in-status"></div>
    <div id="sign-in"></div>
    <div id="account-details"></div> -->
    </section>
</template>

 
<style>
#mascot {display: block;margin: 0 auto;}
</style>
// <script>
// import firebase from "../Firebase";
// import router from "../router";
// import * as firebaseui from 'firebaseui'
// export default {
//     methods:{
//       initApp() {
//         firebase.auth().onAuthStateChanged(function(user) {
//           if (user) {
//             // User is signed in.
//             var displayName = user.displayName;
//             var email = user.email;
//             var emailVerified = user.emailVerified;
//             var photoURL = user.photoURL;
//             var uid = user.uid;
//             var phoneNumber = user.phoneNumber;
//             var providerData = user.providerData;
//             user.getIdToken().then(function(accessToken) {
//               document.getElementById('sign-in-status').textContent = 'Signed in';
//               document.getElementById('sign-in').textContent = 'Sign out';
//               document.getElementById('account-details').textContent = JSON.stringify({
//                 displayName: displayName,
//                 email: email,
//                 emailVerified: emailVerified,
//                 phoneNumber: phoneNumber,
//                 photoURL: photoURL,
//                 uid: uid,
//                 accessToken: accessToken,
//                 providerData: providerData
//               }, null, '  ');
//             });
//           } else {
//             // User is signed out.
//             document.getElementById('sign-in-status').textContent = 'Signed out';
//             document.getElementById('sign-in').textContent = 'Sign in';
//             document.getElementById('account-details').textContent = 'null';
//           }
//         }, function(error) {
//           console.log(error);
//         });
//       }
//     }, 
//     created(){
//         var uiConfig = {
//         signInSuccessUrl: '/databases-list',
//         signInOptions: [
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID,
 
//         ],
//         // tosUrl: 'https://www.google.com',
//         // // Privacy policy url/callback.
//         // privacyPolicyUrl: function() {
//         //   window.location.assign('https://www.espn.com');
//         // }
//       };

//       // Initialize the FirebaseUI Widget using Firebase.
//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       // The start method will wait until the DOM is loaded.
//       ui.start('#firebaseui-auth-container', uiConfig);
//     }
// }
// </script>
