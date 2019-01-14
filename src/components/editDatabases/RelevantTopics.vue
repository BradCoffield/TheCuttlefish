<template>
  <div id="relevant-topics" class="field">
    <b-field label="Excellent For">
       <ul v-if="topicsExcellentForEnhanced.length > 0">
        <li v-for="(item, index) in topicsExcellentForEnhanced" :key="index">
          {{item.name}}
          <br>
          <button  :class="{'is-success':i.selected, 'is-text':!i.selected}"
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
          <button  :class="{'is-success':i.selected, 'is-text':!i.selected}"
            class="button lil-space-here is-small"
            
             @click="i.selected=!i.selected"
            v-for="(i, idex) in item.subtopics"
            :key="idex"
          >{{i.name}}</button>
        </li>
      </ul>  
    </b-field>
  </div>
</template>


<script>
import firebase from "@/Firebase";
export default {
  data() {
    return {
      topics: [],
      topicsTopLevel: [],
      topicsSelected: [],
      topicsExcellentForEnhanced: [],
      topicsGoodForEnhanced:[]
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("topic-areas")
      .doc("forDatabases");

    ref.get().then(doc => {
      if (doc.exists) {
        console.log(doc.data());
        this.topics = doc.data();
        console.log(this.topics);

        for (const prop in this.topics) {
          //create an array with just the top level topics
          this.topicsTopLevel.push(prop);
          //create an array that matches "topics" except has objects with name/selected
          this.topicsExcellentForEnhanced.push({
            name: prop,
            subtopics: this.topics[prop].map(item => {
              let rObj = {};
              rObj.name = item;
              rObj.selected = false;
              console.log(rObj);
              return rObj;
            })
          });
          this.topicsGoodForEnhanced.push({
            name: prop,
            subtopics: this.topics[prop].map(item => {
              let rObj = {};
              rObj.name = item;
              rObj.selected = false;
              console.log(rObj);
              return rObj;
            })
          });
          // this.topicsEnhanced.push({
          //   [prop]: this.topics[prop].map(item => {
          //     let rObj = {};
          //     rObj.name = item;
          //     rObj.selected = false;
          //     console.log(rObj);
          //     return [rObj];
          //   })
          // });

          //  this.topics[prop];
        }

        // the following gets the data, creates a new array of just the topics and then creates another array with the actual areas and selected. problem is, working with the fucking buttons so i'm gonna try something new.
        // ref.get().then(doc => {
        //   if (doc.exists) {
        //     console.log(doc.data());
        //     this.topics = doc.data();
        //     console.log(this.topics);

        //     for (const prop in this.topics) {
        //       this.topicsTopLevel.push(prop);
        //     }
        //     this.topicsTopLevel.forEach(element => {
        //       this.topics[element].forEach(el => {
        //         // console.log("b", el);
        //         this.topicsSelected.push({ name: el, selected: false });
        //         // console.log(this.topicsSelected);
        //       });
        //     });
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    manageState(topic) {
      //topic is the button pressed. This checks to see if what's passed to it is equal to that.
      function findTopicInArray(element) {
        return element.name === topic;
      }
      //findIndex for what matches true above.
      let oneIWant = this.topicsSelected.findIndex(findTopicInArray);
      //use that index to find the topic in our array and switch its state
      if (this.topicsSelected[oneIWant].selected === true) {
        this.topicsSelected[oneIWant].selected = false;
      } else {
        this.topicsSelected[oneIWant].selected = true;
      }
    }
  }
};
</script>
