<template>
  <div class="container">
    <h2>Edit Database</h2>
    <section>
      <b-field label="Name">
        <b-input v-model="database.name"></b-input>
      </b-field>

      <b-field label="Description">
        <textarea class="textarea" v-model="database.description"></textarea>
      </b-field>

      <b-field label="URL">
        <b-input v-model="database.url"></b-input>
      </b-field>
      <b-field label="Use proxy?">
          <b-switch v-model="database.urlproxied">{{ database.urlproxied }}</b-switch>
      </b-field>
      


      <b-field label="Vendor">
        <b-input v-model="database.vendor"></b-input>
      </b-field>

      <b-field label="Featureable?">
        <b-switch v-model="database.featurable">{{ database.featurable }}</b-switch>
      </b-field>

      <b-field label="Message">
        <b-input maxlength="200" type="textarea"></b-input>
      </b-field>
      <button @click="sendUpdate" class="button is-info">Update</button>
      <button @click="goHome" class="button is-danger">Cancel</button>
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
    sendUpdate(evt) {
      alert("successss!");
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("databases")
        .doc(this.$route.params.id);
    },
    goHome() {
      router.push("/databases-list");
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 2rem;
}
</style>
