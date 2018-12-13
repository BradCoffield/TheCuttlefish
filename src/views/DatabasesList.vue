<template>
  
  <div>
    {{databases}}
  </div>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'BoardList',
  data () {
    return {
      databases: [],
      errors: [],
      ref: firebase.firestore().collection('databases'),
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.databases = [];
      querySnapshot.forEach((doc) => {
        this.databases.push({
          key: doc.id,
          name: doc.data().name,
          contentTypes: doc.data().content_types,
          description: doc.data().description,
          excellentFor: doc.data().excellent_for,
          goodFor: doc.data().good_for,
          url: doc.data().url,
          vendor: doc.data().vendor

        });
      });
    });
  },
  methods: {
    details (board) {
      router.push({ name: 'ShowBoard', params: { id: board.key }})
    }
  }
}
</script>

 