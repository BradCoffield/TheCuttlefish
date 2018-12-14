<template>
<div><h2>Edit Database</h2>

<div>{{key}}</div></div>
</template>

<script>
import firebase from '../Firebase'
import router from '../router'
export default {
    name: 'editDatabase',
    data(){
        return{
            key: this.$route.params.id,
            database: {}
        }
    },
    created () {
    const ref = firebase.firestore().collection('databases').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.database = doc.data();
        
      } else {
        alert("No such document!");
      }
    });
  },
}
</script>

<style>
h2 {font-weight: bold;font-size:2rem;}
</style>
