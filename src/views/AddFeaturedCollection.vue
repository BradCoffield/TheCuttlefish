<template>
  <div class="container">
    <h2 class="title">Add New Featured Collection</h2>
    <section>
      <b-field label="Name">
        <b-input v-model="featuredCollection.name"></b-input>
      </b-field>

      <b-field label="Description">
        <textarea class="textarea" v-model="featuredCollection.description"></textarea>
      </b-field>

      <b-field label="URL">
        <b-input v-model="featuredCollection.url"></b-input>
      </b-field>

      <b-field label="Image URL">
        <b-input v-model="featuredCollection.image"></b-input>
      </b-field>

      <b-field label="Image Alt Text">
        <b-input v-model="featuredCollection.imageAlt"></b-input>
      </b-field>

      <b-field label="Button Label">
        <b-input v-model="featuredCollection.buttonLabel"></b-input>
      </b-field>

      <div class="form-buttons">
        <button @click="goHome" class="button is-danger">
          <span class="mdi mdi-cancel"></span> Cancel
        </button>
        <button @click="sendUpdate" class="button is-info">
          <span class="mdi mdi-check"></span> Add
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
export default {
  name: "addFeaturedCollection",
  data() {
    return {
      featuredCollection: {},
      ref: firebase.firestore().collection("featured-collections")
    };
  },
  created() {},
  methods: {
    initialData() {
    
      //all this just resets the form to base clear state
      this.featuredCollection.name = "";
      this.featuredCollection.description = "";
      this.featuredCollection.image = "";
      this.featuredCollection.url = "";
      this.featuredCollection.imageAlt = "";
      this.featuredCollection.buttonLabel = "";
    },
    sendUpdate(evt) {
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("featured-collections")
        .doc(this.featuredCollection.name)
        .set(this.featuredCollection, { merge: true });

     
      this.initialData();
      this.$forceUpdate();
      // router.push('/add-featured-collection')
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    goHome() {
      router.push("/");
    }
  }
};
</script>
