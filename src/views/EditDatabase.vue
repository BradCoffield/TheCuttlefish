<template>
  <div class="container">
    <h2 class="title">Edit Database</h2>
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
        <b-switch v-model="database.use_proxy"></b-switch>
      </b-field>

      <b-field label="Vendor">
        <b-input v-model="database.vendor"></b-input>
      </b-field>

      <b-field label="Featureable?">
        <b-switch v-model="database.featurable">{{ database.featurable }}</b-switch>
      </b-field>

      <b-field label="Content Types">
        <ul v-if="contentTypesController.length > 0">
          <li
            style="display:inline"
            v-for="(item, index)
         in contentTypesController"
            :key="index"
          >
            <button
              class="button lil-space-here is-small"
              :class="{'is-success':item.selected, 'is-text':!item.selected}"
              @click="item.selected=!item.selected"
            >{{item.name}}</button>
          </li>
        </ul>
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
import _ from "lodash";
// import contentTypesList from "../components/editDatabases/EditDatabasesContentTypes";
export default {
  name: "editDatabase",
  data() {
    return {
      key: this.$route.params.id,
      database: {},
      contentTypes: [],
      contentTypesController: [],
      contentTypesFromFirestore: [],
      docData: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("databases")
      .doc(this.$route.params.id);

    const contentTypesDB = firebase
      .firestore()
      .collection("content-types")
      .doc("forDatabases");

    let theDatabaseRaw = ref.get().then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        alert("No such document!");
      }
    });

    let singleSourceContentTypes = contentTypesDB.get().then(doc => {
      if (doc.exists) {
        return doc.data().forDatabases;
      } else {
        alert("No such document!");
      }
    });

    //Needed a promise.all to make sure certain things resolved before other things tried to do their thang.
    Promise.all([theDatabaseRaw, singleSourceContentTypes])
      .then(values => {
        this.database = values[0];
        this.contentTypesFromFirestore = values[0].content_types;

        this.contentTypesController = values[1].map(item => {
          let rObj = {};
          rObj.name = item;
          rObj.selected = false;
          return rObj;
        });
        // console.log(this.contentTypesController);
        return;
      })
      .then(() => {
        //so....
        //contentTypesFromFirestore is an array with the buttons I want selected.
        //contentTypesController is the array that has all the possible CTs and which control the state of the buttons

        //below iterates over the Controller objects and, using lodash, if the object.name is included in Firestore then change its selected (i.selected) to true
        this.contentTypesController.forEach(i => {
          if (_.includes(this.contentTypesFromFirestore, i.name)) {
            i.selected = true;
          } else {
            // console.log(i.name, "false");
          }
        });
      });
  },

  methods: {
    sendUpdate(evt) {
      this.prepCTforSubmit();
      // alert("successss!");
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("databases")
        .doc(this.$route.params.id)
        .set(this.database, { merge: true });
      // updateRef();
    },
    goHome() {
      router.push("/databases-list");
    },
    prepCTforSubmit() {
      //empty the array to get ready for all the new values!
      this.database.content_types = [];
      //loop over the array that has the current selections for what the user wants.
      this.contentTypesController.forEach(i => {
        let z = 0;
        if (i.selected) {
          this.database.content_types.push(i.name);
          console.log(this.database.content_types);
        }
        z++;
      });
    }
  },
  components: {}
};
</script>

<style scoped>
/* h2 {
  font-weight: bold;
  font-size: 2rem;
} */
.field {
  padding: 1rem;
}

.lil-space-here {
  margin: 0.5rem;
}
.form-buttons {
  margin-bottom: 2rem;
}
</style>
