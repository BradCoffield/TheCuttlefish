<template>
  <div id="relevant-topics" class="field">
    <b-field label="Excellent For">
      <ul v-if="topicsTopLevel.length > 0">
        <li v-for="(item, index)
    in topicsTopLevel" :key="index">
          {{item}}
          <br>

          <!-- OLD WAY<button
            @click="manageState(i)"
            class="button lil-space-here is-small"
             
            v-for="(i, idex) in topics[item]"
            :key="idex"
          >{{i}}</button> -->
        </li>
      </ul>
    </b-field>
    <b-field label="Good For">
      <!-- <ul v-if="contentTypesController.length > 0">
        <li style="display:inline" v-for="(item, index)
    in contentTypesController" :key="index">
          <button
            class="button lil-space-here is-small"
            :class="{'is-success':item.selected, 'is-text':!item.selected}"
            @click="item.selected=!item.selected"
          >{{item.name}}</button>
        </li>
      </ul>-->
    </b-field>
  </div>
</template>


<script>
import firebase from "@/Firebase";
export default {
  data() {
    return {
      topics: [],
      topicsEnhanced: [],
      topicsTopLevel: [],
      topicsSelected: []
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
          this.topicsTopLevel.push(prop);
       
       this.topicsEnhanced.push({[prop]: this.topics[prop].map(item => {
          let rObj = {};
          rObj.name = item;
          rObj.selected = false;
          console.log(rObj);
          return rObj;
        })})
       
      //  this.topics[prop];
       
        }

// TODO: Take topics and recreate it exactly but instead of subarrays of strings they will be objects with name/selected
// I feel like I'll use map. And prob map outside then push into the new array





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
      // NOTE: this works to return 3 which is the proper index. I can use this index to then select the proper one of the array and change its value.
      // var array1 = [
      //   { name: 5, selected: true },
      //   12,
      //   { name: 8, selected: true },
      //   130,
      //   44
      // ];
      // function findFirstLargeNumber(element) {
      //   return element.name === 8;
      // }
      // console.log(array1.findIndex(findFirstLargeNumber));

      function findTopicInArray(element) {
        return element.name === topic;
      }
      // console.log(this.topicsSelected)
      let oneIWant = this.topicsSelected.findIndex(findTopicInArray);

      if (this.topicsSelected[oneIWant].selected === true) {
        this.topicsSelected[oneIWant].selected = false;
      } else {
        this.topicsSelected[oneIWant].selected = true;
      }
      console.log(this.topicsSelected[oneIWant].name,this.topicsSelected[oneIWant].selected );
    }
  }
};
</script>
