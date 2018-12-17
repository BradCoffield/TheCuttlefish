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

      <b-field label="Content Types" >
<template v-for="item in contentTypes"  >
  <label class="checkbox" v-bind:key="item">
    <input type="checkbox">
    {{item[0]}}
  </label>
</template>
      </b-field>

     
      <div class="form-buttons">
        <button @click="sendUpdate" class="button is-info"> <span class="mdi mdi-check"></span> Update</button> 
        <button @click="goHome" class="button is-danger"><span class="mdi mdi-cancel"></span> Cancel</button>
      </div>
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
      database: {},
      contentTypes: []
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
    
    const contentTypesDB = firebase
      .firestore()
      .collection("content-types")
      .doc("forDatabases");

    contentTypesDB.get().then(doc => {
      if (doc.exists) {
        this.contentTypes = doc.data();
        return 
      } else {
        alert("No such document!");
      }
    }).then(res => this.fillOutContentTypes());
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
    },
    fillOutContentTypes() {
      console.log('aw shit');
    }
  }
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 2rem;
}
.field {
  padding:1rem;
}
.mdi {
  margin-right:4px;
}
.form-buttons button{
  margin-right:.25rem;
  margin-left:.25rem;
}
</style>
