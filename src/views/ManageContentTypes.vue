<template>
  <div class="container">
    <h2 class="title">Manage Content Types</h2>
    <h3 class="title is-4" style="display:inline">For Databases</h3>
    <p style="display:inline;font-size:14px;">&nbsp;(click to edit)</p>

    <ul>
      <li
        v-for="(ct, index) in fromFirestoreObjectified"
        class="pad-half lil-space-here"
        :key="index"
        style="display:inline-block;"
      >
        <div v-if="ct.edit" class="columns ">
          <input
            class="input  "
            v-model="ct.name"
            @blur="ct.edit = false;  "
            @keyup.enter="ct.edit=false;  "
            v-focus
          >
          <button class="button is-success   " @click="ct.edit=false" style="margin-left:5px;">
            <span class="mdi mdi-check"></span>
          </button>
        </div>

        <div v-else>
          <button class="button is-light  " @click="ct.edit = true;">{{ct.name}}</button>
        </div>
      </li>
      <!-- TODO: create an add to the list button. click creates input on save pushes to the fromfirestoreobjectified -->
      <li style="display:inline-block;">
        <button class="button is-white" @click="pushNewEmpty"  >
          <span class="mdi mdi-plus"></span>
        </button>
      </li>
    </ul>
   
    <div class="form-buttons">
        <button @click="sendUpdate" class="button is-info">
          <span class="mdi mdi-check"></span> Update
        </button>
        <button @click="goHome" class="button is-danger">
          <span class="mdi mdi-cancel"></span> Cancel
        </button>
      </div>
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
       
      editButtonEditActive: false
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
      this.fromFirestoreObjectified = this.fromFirestoreObjectified.filter(item => item.name != "");

      //loop over the objectified array and get all the name values.
      this.fromFirestoreObjectified.forEach(i => {
      
        this.readyForFirestore.push(i.name); 
      });
    },
    pushNewEmpty(){
      this.fromFirestoreObjectified.push({name: "", edit: true})
    },
     sendUpdate(evt) {
      this.prepCTforUpdate();
    

      evt.preventDefault();
     this.ref.set(this.readyForFirestore);
    //  this.ref.set(this.readyForFirestore, { merge: true });

      this.$toast.open({
        message: "Database submitted!",
        type: "is-success"
      });
      this.initialData();
      this.$forceUpdate();
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    goHome() {
      router.push("/");
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>

 