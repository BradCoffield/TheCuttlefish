<template>
  <section>
    <h2 class="title">Featured Collections List</h2>
    <b-table :data="data" :striped="true" :mobile-cards="true" detailed :loading="isLoading">
      <template slot-scope="props">
        <!-- <b-table-column field="id" label="Key" width="40" numeric>
                    {{ props.row.key }}
        </b-table-column>-->
        <b-table-column field="database_name" label="Collection" width="350">{{ props.row.name }}</b-table-column>

        <b-table-column
          field="description"
          label="Description"
          width="550"
        >{{ props.row.description }}</b-table-column>

        <b-table-column field="url" label="URL">{{ props.row.url }}</b-table-column>
    <b-table-column field="image" label="Image">{{ props.row.image }}</b-table-column>
        <b-table-column field="imageAlt" label="Image Alt">{{ props.row.imageAlt }}</b-table-column>
        <b-table-column field="buttonLabel" label="Button Label">{{ props.row.buttonLabel }}</b-table-column>

        <b-table-column field="editButton" label=" ">
          <button class="button is-light" @click.stop="editDatabase(props.row.key)">Edit</button>
          <!-- <button @click="alerrrt(props.row.key)">Edit</button> -->
        </b-table-column>
      </template>

      <!-- <template slot="detail" slot-scope="props">
        <div>
          <span class="bold">Excellent for:</span>
          {{ props.row.excellentFor.join(", ")}}
        </div>
        <div>
          <span class="bold">Good for:</span>
          {{ props.row.goodFor.join(", ")}}
        </div>
        <div>
          <span class="bold">Content Types:</span>
          {{ props.row.contentTypes.join(", ")}}
        </div>
      </template> -->
    </b-table>
  </section>
</template>


<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  data() {
    return {
      data: [],
      errors: [],
      ref: firebase.firestore().collection("featured-collections"),
      defaultOpenedDetails: [1]
    };
  },
  created() {
    this.isLoading = true;
    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        this.data.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          url: doc.data().url,
          buttonLabel: doc.data().buttonLabel,
          image: doc.data().image,
          imageAlt: doc.data().imageAlt
        });
      });
      this.isLoading = false;
    });
  },
  methods: {
    details(board) {
      router.push({ name: "ShowBoard", params: { id: board.key } });
    },
    alerrrt(e) {
      alert(e);
    },
    editDatabase(id) {
      router.push({
        name: "editFeaturedCollection",
        params: { id: id }
      });
    }
  }
};
</script>

 <style>
#table-goodFor {
  font-size: 12px;
}
/* .table.is-striped tbody tr:not(.is-selected):nth-child(2n) {
  background-color: #ececec !important;
} */
.mdi.mdi-chevron-right {
  color: goldenrod;
}
section {
  margin-top: 3rem;
}
</style>
 