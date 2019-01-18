<template>
  <div class="container">
    <h2 class="title">Manage Content Types</h2>
    <h3 class="title is-4" style="display:inline">For Databases</h3>
    <p style="display:inline">(click to edit)</p>

    <ul>
      <li
        v-for="(ct, index) in fromFirestoreObjectified"
        class="pad-half lil-space-here"
        :key="index"
        style="display:inline-block;"
      >
        <div v-if="ct.edit">
          <input style="float:left;"
            class="input"
            v-model="ct.name"
            @blur="ct.edit = false;  "
            @keyup.enter="ct.edit=false;  "
          >
          <button class="button   is-success" @click="ct.edit=false">
            <span class="mdi mdi-check" style="font-size:18px;float:left;"></span>
          </button>
        </div>

        <div v-else>
          <button class="button is-info" @click="ct.edit = true;">{{ct.name}}</button>
        </div>
      </li>
    </ul>
 
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "manageContentTypes",
  data() {
    return {
      ref: firebase
        .firestore()
        .collection("content-types")
        .doc("forDatabases"),
      fromFirestore: [],
      fromFirestoreObjectified: [],
      readyForFirestore: [],
      isComponentModalActive: false,
      todos: [
        { title: "one value", edit: false },
        { title: "one value", edit: false },
        { title: "otro titulo", edit: false }
      ]
    };
  },
  created() {
    this.ref.get().then(doc => {
      if (doc.exists) {
        this.fromFirestore = doc.data().forDatabases.sort();
        this.fromFirestoreObjectified = doc
          .data()
          .forDatabases.sort()
          .map(el => {
            return { name: el, edit: false };
          });
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    prepCTforUpdate() {
      //loop over the objectified array and get all the name values.
      this.fromFirestoreObjectified.forEach(i => {
        this.readyForFirestore.push(i.name);
      });
    }
  }
};
</script>

