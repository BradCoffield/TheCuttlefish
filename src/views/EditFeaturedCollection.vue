<template>
  <div class="container">
    <h2 class="title">Edit Featured Collection</h2>
    <section>
  
      <b-field label="Name">
        <b-input v-model="featuredCollection.name"></b-input>
      </b-field>

      <b-field label="Description">
        <textarea class="textarea" v-model="featuredCollection.description"></textarea>
      </b-field>

      <b-field label="URL">
        <b-input v-model="featuredCollection.url"></b-input>
      </b-field>
   
      <b-field label="Image URL">
        <b-input v-model="featuredCollection.image"></b-input>
      </b-field>

      <b-field label="Image Alt Text">
        <b-input v-model="featuredCollection.imageAlt"></b-input>
      </b-field>

      <b-field label="Button Label">
        <b-input v-model="featuredCollection.buttonLabel"></b-input>
      </b-field>



      

      <div class="form-buttons">
        <!-- <button @click="prepCTforSubmit" class="button is-info"> -->
          
        <button @click="goHome" class="button is-danger">
          <span class="mdi mdi-cancel"></span> Cancel
        </button>
        <button @click="sendUpdate" class="button is-info">
          <span class="mdi mdi-check"></span> Update
        </button>
        <br>
        <button class="button mt-2r " @click="deleteWarningActive = true">
          <span class="mdi mdi-alert-octagram"></span>Delete Collection
        </button>
      
      </div>
    </section>
    <b-modal :active.sync="deleteWarningActive" :width="640" scroll="keep">
      <div class="card">
        <!-- <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="/static/img/placeholder-1280x960.png" alt="Image">
                    </figure>
        </div>-->
        <div class="card-content">
          <div class="media">
            <!-- <div class="media-left">
                            <figure class="image is-48x48">
                              
                            </figure>
            </div>-->
            <div class="media-content">
              <p class="title is-4">
                <span class="mdi mdi-alert-octagram has-text-danger fs24"></span>
                Delete Collection: {{featuredCollection.name}}
              </p>
            </div>
          </div>

          <div
            class="content mt-2"
          >Hey, no judgement, but are you sure you want to do this? It can't be undone.
            <div class="has-text-right mt-2">
              <button class="button is-text" @click="deleteWarningActive = false">Cancel</button>
              <button class="button is-danger" @click="deleteThisDatabase">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
import _ from "lodash";
 
export default {
  name: "editFeaturedCollection",
  data() {
    return {
      key: this.$route.params.id,
      featuredCollection: {},
      
      deleteWarningActive: false
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("featured-collections")
      .doc(this.$route.params.id);

    let theCollectionRaw = ref.get().then(doc => {
      if (doc.exists) {
        console.log(doc.data());
        return doc.data();
      } else {
        alert("No such document!");
      }
    });

  

    //Needed a promise.all to make sure certain things resolved before other things tried to do their thang.
    Promise.all([theCollectionRaw])
      .then(values => {
        console.log(values);
        this.featuredCollection = values[0];
       
 
        // console.log(this.contentTypesController);
        return;
      })
  
 
  },

  methods: {
    sendUpdate(evt) {
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("featured-collections")
        .doc(this.$route.params.id)
        .set(this.featuredCollection, { merge: true });
      
      this.goHome();
      // updateRef();
    },
    goHome() {
      router.push("/list-featured-collections");
    },
 
  
    deleteThisDatabase() {
      firebase
        .firestore()
        .collection("featured-collections")
        .doc(this.$route.params.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
          //  this.$toast.open({
          //     message: "Database Deleted!",
          //     type: "is-success"
          //   });
 router.push("/list-featured-collections")
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
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
.mdi-alert-octagram.fs24 {
  font-size: 24px;
}
</style>
