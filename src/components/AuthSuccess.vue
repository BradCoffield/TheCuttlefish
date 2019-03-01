<template> 
  <div> 
    <h1>Signup succeeded</h1> 
    <button @click="logOutNow">Log out</button> 
    <hr> 
    <img :src="photo" style=”height: 120px”> <br> 
    <p>{{name}}</p> 
    <p>{{email}}</p> 
    <p>{{userId}}</p> 
    <hr> 
    <pre>{{user}}</pre> 
  </div>
</template>
<script>
import firebase from "../Firebase";
import router from "../router";
export default {
 data(){
   return {
     photo: "",
     userId: "",
     name: "",
     email: "",
     user: {}
   }
 },
 created() { 
  this.user = firebase.auth().currentUser; 
  if(this.user) { 
    this.name = this.user.displayName; 
    this.email = this.user.email; 
    this.photo = this.user.photoURL; 
    this.userId = this.user.uid; 
  } 
},methods: { 
  logOutNow() { 
    firebase.auth().signOut();
  } 
},
};
</script>