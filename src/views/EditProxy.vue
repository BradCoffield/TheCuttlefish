<template>
  <div class="container">
    <h2 class="title">Edit Proxy</h2>
    <section>
      <b-field label="Proxy URL">
        <b-input v-model="proxyUrl"></b-input>
      </b-field>

      <div class="form-buttons">
        <!-- <button @click="prepCTforSubmit" class="button is-info"> -->
        <button @click="sendUpdate" class="button is-info">
          <span class="mdi mdi-check"></span> Update
        </button>
        <button @click="goHome" class="button is-danger">
          <span class="mdi mdi-cancel"></span> Cancel
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
export default {
  data() {
    return {
      proxyUrl: "hey there"
    };
  },
  created() {
    console.log("created!");
     const ref = firebase
      .firestore()
      .collection("proxy-server-url")
      .doc('proxyUrl');


  },
  methods: {
    sendUpdate(evt) {
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("databases")
        .doc(this.$route.params.id)
        .set(this.database, { merge: true });
      
    },
    goHome() {
      router.push("/");
    }
  }
};
</script>

