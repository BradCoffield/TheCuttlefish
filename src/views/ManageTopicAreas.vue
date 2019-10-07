<template>
  <div class="container">
    <!-- <button class="button" @click="prepTopicsforSubmit">hi</button> -->
    <h2 class="title">Manage Topic Areas</h2>
    <h3 class="title is-4" style="display:inline">For Databases</h3>
    <p style="display:inline;font-size:14px;">&nbsp;(click to edit)</p>
    <ul class="ml-1 mt-1" v-if="topicsEnhanced.length > 0">
      <li v-for="(item, index) in topicsEnhanced" :key="index" class="pad-half lil-space-here">
        <span class="sub-label">{{item.name}}</span> 
        <br>
        <ul style="display:flex">
          <li v-for="(i, idex) in item.subtopics" :key="idex">
            <div v-if="i.edit" class="mt-1 pad-1 noisebackground">
              <input class="input" v-model="i.name" v-focus>
              <div class="form-buttons">
                <button
                  class="button is-danger"
                  @click="i.name = ''; clearEmpties()"
                  v-if="i.name"
                >Delete</button>
                <!-- <button class="button is-danger" @click="deleteThisOne(item.name, i.name)" v-if="i.name">Delete</button> -->
                <button class="button is-success" @click="i.edit=false" style="margin-left:5px;">
                  <span class="mdi mdi-check"></span>
                </button>
              </div>
            </div>
            <div v-else>
              <button class="button is-text mt-1" @click="i.edit = true;">{{i.name}}</button>
            </div>
          </li>
           
       <button class="button is-small is-white mt-1 " @click="pushNewEmpty(index)">
          <span class="mdi  ">Add new {{item.name}} topic area</span>
        </button>
       
        </ul>
      </li>
    </ul>
    <div class="form-buttons">
     
      <button @click="goHome" class="button is-danger">
        <span class="mdi mdi-cancel"></span> Cancel
      </button> <button @click="sendUpdate" class="button is-info">
        <span class="mdi mdi-check"></span> Update
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
export default {
  name: "manageTopicAreas",
  data() {
    return {
      ref: firebase
        .firestore()
        .collection("topic-areas")
        .doc("forDatabases"),
      topics: {},
      topicsEnhanced: [],
      topicsForSubmit: {}
    };
  },
  created() {
    this.ref.get().then(doc => {
      if (doc.exists) {
        // console.log(doc.data());
        this.topics = doc.data();
        // console.log(this.topics);
        for (const prop in this.topics) {
          //create an array that has objects with name/edit
          this.topicsEnhanced.push({
            name: prop,
            subtopics: this.topics[prop].map(item => {
              let rObj = {};
              rObj.name = item;
              rObj.edit = false;
              // console.log(rObj);
              return rObj;
            })
          });
        }
      } else {
        alert("Error!");
      }
    });
  },
  methods: {
    clearEmpties() {
      this.topicsEnhanced.forEach(top => {
        top.subtopics = top.subtopics.filter(item => item.name != "");
      });
    },
     pushNewEmpty(top) {
      this.topicsEnhanced[top].subtopics.push({ name: "", edit: true });
    
    },
    sendUpdate(evt) {
      this.prepTopicsforSubmit();
      evt.preventDefault();

      this.ref
        .set(this.topicsForSubmit, { merge: true })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      this.$toast.open({
        message: "Topic Areas Updated!",
        type: "is-success"
      });

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    goHome() {
      router.push("/");
    },
    prepTopicsforSubmit() {
      //creates an object of objects with the new values in the same format as the database desires.
      this.topicsEnhanced.forEach(i => {
        let tempString = "";
        let tempArr = [];
        tempString = i.name;
        //   console.log(tempString);
        i.subtopics.forEach(q => {
          tempArr.push(q.name);
        });
        this.topicsForSubmit[tempString] = tempArr;
      });
    }
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
