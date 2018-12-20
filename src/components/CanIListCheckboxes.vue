<template>
 
    <div><h3>
        {{heading}}
    </h3>
    
    <h4>try again!</h4>
    <ul>
        <li v-for="item in contentTypes">{{item.name}}, {{item.checked}}</li>
    </ul>
    <ul>
         <li v-for="item in contentTypes">
            <button class="button" :class="{'is-success':item.checked, 'is-light':!item.checked}" @click="item.checked=!item.checked">{{item.name}}, {{item.checked}}</button>
        </li>
    </ul>
    
  
    </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
export default {
    data(){
        return{
            heading: "Let's v-for thangs",
            contentTypes: []
            
        }
    },
    created(){
        setTimeout(() => this.contentTypes = [{name: 'ct-uno', checked: false}, {name: 'ct-dos', checked: true},{name: 'ct-tres', checked: true},{name: 'ct-quatro', checked: true}],1000)         
        setTimeout(() => this.contentTypes = [{name: 'ct-tits', checked: false}, {name: 'ct-teets', checked: true},{name: 'ct-tres', checked: true},{name: 'ct-quatro', checked: true}],2000)         
       
    }
}
</script>

<style scoped>
*{text-align: center!important}
h4 {font-weight: bold!important}
</style>
