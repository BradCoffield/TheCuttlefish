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

      <b-field label="Excellent For">
        <ul v-if="topicsExcellentForEnhanced.length > 0">
          <li v-for="(item, index) in topicsExcellentForEnhanced" :key="index">
            {{item.name}}
            <br>
            <button
              :class="{'is-success':i.selected, 'is-text':!i.selected}"
              class="button lil-space-here is-small"
              @click="i.selected=!i.selected"
              v-for="(i, idex) in item.subtopics"
              :key="idex"
            >{{i.name}}</button>
          </li>
        </ul>
      </b-field>
      <b-field label="Good For">
        <ul v-if="topicsGoodForEnhanced.length > 0">
          <li v-for="(item, index) in topicsGoodForEnhanced" :key="index">
            {{item.name}}
            <br>
            <button
              :class="{'is-success':i.selected, 'is-text':!i.selected}"
              class="button lil-space-here is-small"
              @click="i.selected=!i.selected"
              v-for="(i, idex) in item.subtopics"
              :key="idex"
            >{{i.name}}</button>
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
import relevantTopics from "../components/editDatabases/RelevantTopics";
export default {
  name: "editDatabase",
  data() {
    return {
      key: this.$route.params.id,
      database: {},
      contentTypes: [],
      contentTypesController: [],
      contentTypesFromFirestore: [],
      docData: {},
      topics: [],
      topicsEfSelected: [],
      topicsGfSelected: [],
      topicsExcellentForEnhanced: [],
      topicsGoodForEnhanced: [],
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
          // console.log(rObj);
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
    const ref2 = firebase
      .firestore()
      .collection("topic-areas")
      .doc("forDatabases");

    ref2.get().then(doc => {
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
    }).then(val => {
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
    sendUpdate(evt) {
      this.prepCTforSubmit();
      this.prepTopicsforSubmit();
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
    },
    prepTopicsforSubmit(){
      //clears out the relevant database obj and checks what buttons are selected and adds them to it for submitting.
      this.database.goodFor = [];
      this.database.excellentFor = [];
       this.topicsExcellentForEnhanced.forEach(i => {
         i.subtopics.forEach(q => {
               if (q.selected === true){
                 this.database.excellentFor.push(q.name);
               }

         })
       })
       this.topicsGoodForEnhanced.forEach(i => {
         i.subtopics.forEach(q => {
               if (q.selected === true){
                 this.database.goodFor.push(q.name);
               }

         })
       })
      
    }
  },
  components: { relevantTopics }
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

.form-buttons {
  margin-bottom: 2rem;
}
</style>
