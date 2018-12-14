<template>
  <div class="container">
    <h2>Edit Database</h2>
     <section>
        <b-field label="Name">
            <b-input v-model="database.name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            type="is-success"
            message="This username is available">
            <b-input value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>

        <b-field label="Message">
            <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
        <button @click="sendUpdate" class="button is-info">Update</button>
        <button @click="goHome"  class="button is-danger">Cancel</button>
    </section>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
export default {
  name: "editDatabase",
  data() {
    return {
      key: this.$route.params.id,
      database: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("databases")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.database = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
      sendUpdate(evt){
          alert('successss!')
          evt.preventDefault();
          const updateRef = firebase.firestore().collection('databases').doc(this.$route.params.id);

      },
      goHome(){
          router.push('/databases-list')
      }
  }
};
</script>

<style>
h2 {
  font-weight: bold;
  font-size: 2rem;
}
</style>
