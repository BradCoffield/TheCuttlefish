<template>
  <section>
    <!-- <b-field grouped group-multiline>
      <div class="control">
        <b-switch v-model="isBordered">Bordered</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isStriped">Striped</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isNarrowed">Narrowed</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isHoverable">Hoverable</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isFocusable">Focusable</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isLoading">Loading state</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="isEmpty">Empty</b-switch>
      </div>
      <div class="control">
        <b-switch v-model="hasMobileCards">Mobile cards
          <small>(collapsed rows)</small>
        </b-switch>
      </div>
    </b-field> -->

    <b-table
      :data="isEmpty ? [] : data"
      :bordered="isBordered"
      :striped=true
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards=true
      detailed
      paginated
      per-page="10"
             
    >
      <template slot-scope="props">
        <!-- <b-table-column field="id" label="Key" width="40" numeric>
                    {{ props.row.key }}
        </b-table-column>-->
        <b-table-column field="database_name" label="Database" width="350" sortable>{{ props.row.name }}</b-table-column>

        <b-table-column field="description" label="Description" width="550" >{{ props.row.description }}</b-table-column>

        <b-table-column
          field="excellent_for"
          label="Excellent For"
        >{{ props.row.excellentFor.join(", ") }}</b-table-column>

        <b-table-column field="good_for" label="Good For">{{ props.row.goodFor.join(", ") }}</b-table-column>

        <!-- <b-table-column field="date" label="Date" centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
        </b-table-column>-->
      
       <b-table-column field="url" label="URL"  >{{ props.row.url }}</b-table-column>
       <b-table-column field="content_types" label="Content Types"  >{{ props.row.contentTypes.join(", ") }}</b-table-column>
       <b-table-column field="vendor" label="Vendor"  >{{ props.row.vendor }}</b-table-column>
       <b-table-column field="featureable" label="Featureable"  >{{ props.row.featureable }}</b-table-column>

      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="/static/img/placeholder-128x128.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                <small>@{{ props.row.user.first_name }}</small>
                <small>31m</small>
                <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </div>
          </div>
        </article>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
          <template slot="detail" slot-scope="props">
{{excellentFor}}
            hi
          </template>
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
      ref: firebase.firestore().collection("databases"),
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      defaultOpenedDetails: [1]
    };
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      this.data = [];
      querySnapshot.forEach(doc => {
        this.data.push({
          key: doc.id,
          name: doc.data().name,
          contentTypes: doc.data().content_types,
          description: doc.data().description,
          excellentFor: doc.data().excellent_for,
          goodFor: doc.data().good_for,
          url: doc.data().url,
          vendor: doc.data().vendor,
          featureable: doc.data().featurable
        });
      });
    });
  },
  methods: {
    details(board) {
      router.push({ name: "ShowBoard", params: { id: board.key } });
    }
  }
};
</script>

 