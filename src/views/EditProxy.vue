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
      proxyUrl: "",
      ref: firebase.firestore().collection("proxyServerUrl")
    };
  },
  created() {
    console.log("created!");

    this.ref.onSnapshot(querySnapshot => {
      console.log(querySnapshot);

      querySnapshot.forEach(doc => {
        let response = doc.data();
        this.proxyUrl = doc.data().proxyURL;
      });
    });
  },
  methods: {
    sendUpdate(evt) {
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("proxyServerUrl")
        .doc("proxyUrl")
        .set({proxyURL: this.proxyUrl}, { merge: true });
    },
    goHome() {
      router.push("/");
    }
  }
};
</script>

