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

      <b-field label="Content Types">
        <ul>
          <li
            style="display:inline"
            v-if="contentTypesController.length > 0"
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

          <!-- TODO: So, what needs to happen is I need to look at the ajax result of the entire database and look at its contenttyupes array inside that, which lists the content tyeps that apply to that array. and then, like just use the name of the valu eto select contentTypesContoller[value].selected = true to set it to true. -->
          <!-- FIXME: so the problem i'm having right now is that the things are empty when checking. I need to run a promise chain like -> get initial ajax call to populate the form -> populate the content types -> get the data from the initial and compare against the base content types. so, populate all my arrays for sure before preceding.-->
        </ul>
      </b-field>

      <div class="form-buttons">
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
export default {
  name: "editDatabase",
  data() {
    return {
      key: this.$route.params.id,
      database: {},
      contentTypes: [],
      contentTypesController: [],
      contentTypesFromFirestore: []
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
            console.log(i.name, "false");
          }
        });
      });

    // this works to get the data about the individual database and populate the array that populates the form. it is also populating an array with what contentTypes are actually currently attached to the database
    // ref.get().then(doc => {
    //     if (doc.exists) {
    //       this.database = doc.data();
    //       console.log(doc.data());
    //       this.contentTypesFromFirestore = doc.data().content_types;
    //     } else {
    //       alert("No such document!");
    //     }
    //   });

    //this works to get contentTypes from the single-source for general databases content types (a different collection in the database). Then it builds an array of objects with the values and selected.false to build the buttons for selecting in the app.
    // contentTypesDB.get().then(doc => {
    //   if (doc.exists) {
    //     // this.contentTypes = doc.data().forDatabases;
    //     doc.data().forDatabases.forEach(i => {
    //       this.contentTypes.push(i);
    //     });
    //     let contentTypesController = this.contentTypes.map(item => {
    //       let rObj = {};
    //       rObj.name = item;
    //       rObj.selected = false;
    //       return rObj;
    //     });
    //     this.contentTypesController = contentTypesController;
    //   } else {
    //     alert("No such document!");
    //   }
    // });
  },
  // TODO: So, I want to get the valid list of content types from its special db listing, which is the official listing.
  //then populate the array in the data object and in the array a series of objects with like name: and selected:
  //then ajax of the database itself and go over that and if a content-type exists there changed the array:selected to true.
  //the array should originally be populated with selected:false so I don't have to worry about the ones that don't come back
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
 
  }
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  font-size: 2rem;
}
.field {
  padding: 1rem;
}
.mdi {
  margin-right: 4px;
}
.form-buttons button {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}
.lil-space-here {
  margin: 0.5rem;
}
</style>
