<template>
          <b-field label="Content Types">
            

    <ul v-if="basicListOfCT.length > 0">
      <li
        style="display:inline"
        
        v-for="(item, index)
     in basicListOfCT"
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
</template>

<script>
export default {
    data(){
        return{
            name: "Brad"
        }
    },
    props: ['basicListOfCT', 'contentTypesToSelect']
}
</script>

<style scoped>
.lil-space-here {
  margin: 0.5rem;
}
</style>
