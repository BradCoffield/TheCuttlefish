<template>
  <div class="container">
    <h2 class="title">Add New Database</h2>
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
        <b-switch v-model="database.featurable"></b-switch>
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
              class="button lil-space-here "
              :class="{'is-success':item.selected, 'is-text':!item.selected}"
              @click="item.selected=!item.selected"
            >{{item.name}}</button>
          </li>
        </ul>
      </b-field>

      <b-field label="Excellent For">
        <ul class="ml-1 mt-1" v-if="topicsExcellentForEnhanced.length > 0">
          <li v-for="(item, index) in topicsExcellentForEnhanced" :key="index">
            <span class="sub-label">{{item.name}}</span>
            <br>
            <button
              :class="{'is-success':i.selected, 'is-text':!i.selected}"
              class="button lil-space-here  "
              @click="i.selected=!i.selected"
              v-for="(i, idex) in item.subtopics"
              :key="idex"
            >{{i.name}}</button>
          </li>
        </ul>
      </b-field>
      <b-field label="Good For">  
        <ul class="ml-1 mt-1" v-if="topicsGoodForEnhanced.length > 0">
          <li v-for="(item, index) in topicsGoodForEnhanced" :key="index">
            <span class="sub-label">{{item.name}}</span>
            <br>
            <button
              :class="{'is-success':i.selected, 'is-text':!i.selected}"
              class="button lil-space-here  "
              @click="i.selected=!i.selected"
              v-for="(i, idex) in item.subtopics"
              :key="idex"
            >{{i.name}}</button>
          </li>
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
export default {
  name: "addDatabase",
  data() {
    return {
      database: {},
      contentTypes: [],
      contentTypesController: [],
      contentTypesFromFirestore: [],
      docData: {},
      topics: [],
      topicsEfSelected: [],
      topicsGfSelected: [],
      topicsExcellentForEnhanced: [],
      topicsGoodForEnhanced: []
    };
  },
  created() {
    //need to initialize with proper types all the aspects of database
    this.initialData();

    //need to get the raw list of content types from its area of firestore
    const contentTypesDB = firebase
      .firestore()
      .collection("content-types")
      .doc("forDatabases");

    contentTypesDB.get().then(doc => {
      if (doc.exists) {
        console.log("hey hi", doc.data());
        this.contentTypesController = doc.data().forDatabases.map(item => {
          let rObj = {};
          rObj.name = item;
          rObj.selected = false;
          // console.log(rObj);
          return rObj;
        });
      } else {
        alert("No such document!");
      }
    });

    const ref2 = firebase
      .firestore()
      .collection("topic-areas")
      .doc("forDatabases");

    ref2
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          this.topics = doc.data();
          console.log(this.topics);

          for (const prop in this.topics) {
            //create an array that matches "topics" except has objects with name/selected
            this.topicsExcellentForEnhanced.push({
              name: prop,
              subtopics: this.topics[prop].map(item => {
                let rObj = {};
                rObj.name = item;
                rObj.selected = false;
                // console.log(rObj);
                return rObj;
              })
            });
            this.topicsGoodForEnhanced.push({
              name: prop,
              subtopics: this.topics[prop].map(item => {
                let rObj = {};
                rObj.name = item;
                rObj.selected = false;
                // console.log(rObj);
                return rObj;
              })
            });
          }
        } else {
          alert("No such document!");
        }
      })
      .then(val => {
        this.topicsExcellentForEnhanced.forEach(i => {
          //for each unit look at its subtopics and for each of those compare its name to what came back from firestore and if there's a match switch it to selected otherwise do nothing.
          i.subtopics.forEach(j => {
            if (_.includes(this.database.excellentFor, j.name)) {
              // console.log("yay");
              j.selected = true;
            } else {
              // console.log(j.name, "false");
            }
          });
        });
        this.topicsGoodForEnhanced.forEach(i => {
          //for each unit look at its subtopics and for each of those compare its name to what came back from firestore and if there's a match switch it to selected otherwise do nothing.
          i.subtopics.forEach(j => {
            if (_.includes(this.database.goodFor, j.name)) {
              // console.log("yay");
              j.selected = true;
            } else {
              // console.log(j.name, "false");
            }
          });
        });
      });
  },
  methods: {
    initialData() {
      this.database.name = "";
      this.database.description = "";
      this.database.url = "";
      this.database.use_proxy = false;
      this.database.vendor = "";
      this.database.featurable = false;
      this.database.content_types = [];
      this.database.excellentFor = [];
      this.database.goodFor = [];
      // this.contentTypesController = [];
      // this.topicsExcellentForEnhanced = [];
      // this.topicsGoodForEnhanced = [];
      if (this.topicsExcellentForEnhanced.length > 0) {
        this.topicsExcellentForEnhanced.forEach(i => {
          i.subtopics.forEach(j => {
            j.selected = false;
          });
        });
      }
      if (this.topicsGoodForEnhanced.length > 0) {
        this.topicsGoodForEnhanced.forEach(i => {
          i.subtopics.forEach(j => {
            j.selected = false;
          });
        });
      }
      if (this.contentTypesController.length > 0) {
        this.contentTypesController.forEach(i => {
          i.selected = false;
        });
      }
    },

    sendUpdate(evt) {
      this.prepCTforSubmit();
      this.prepTopicsforSubmit();

      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("databases")
        .doc(this.database.name)
        .set(this.database, { merge: true });

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
    },
    prepTopicsforSubmit() {
      //clears out the relevant database obj and checks what buttons are selected and adds them to it for submitting.
      this.database.goodFor = [];
      this.database.excellentFor = [];
      this.topicsExcellentForEnhanced.forEach(i => {
        i.subtopics.forEach(q => {
          if (q.selected === true) {
            this.database.excellentFor.push(q.name);
          }
        });
      });
      this.topicsGoodForEnhanced.forEach(i => {
        i.subtopics.forEach(q => {
          if (q.selected === true) {
            this.database.goodFor.push(q.name);
          }
        });
      });
    }
  }
};
</script>
